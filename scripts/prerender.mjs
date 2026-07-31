// Runs after `vite build`. Serves the built `dist/` with Vite's own preview
// server, loads it in headless Chromium so React mounts exactly as it does
// for a real visitor, then overwrites dist/index.html with the resulting
// DOM plus injected JSON-LD. The JS bundle tag stays in the output, so
// browsers still hydrate into the interactive app — this only changes what
// a non-JS crawler sees.
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import puppeteer from "puppeteer";
import { SITE_URL, buildAllSchemas } from "../src/seo/schema.ts";

const PORT = 48173;
const PREVIEW_URL = `http://localhost:${PORT}/`;
const DIST_INDEX = resolve("dist/index.html");
const VITE_BIN = fileURLToPath(
  new URL("../node_modules/vite/bin/vite.js", import.meta.url)
);

// Spawned via process.execPath + vite's bin script directly, not `npx`/
// `shell: true` — on Windows that path goes through cmd.exe and was
// exiting immediately with a bogus code instead of starting the server.
function startPreviewServer() {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn(process.execPath, [
      VITE_BIN,
      "preview",
      "--port",
      String(PORT),
      "--strictPort",
    ]);

    let ready = false;
    proc.stdout.on("data", (data) => {
      process.stdout.write(data);
      // Vite bolds "Local" with an ANSI code inserted before the colon
      // (`Local\x1b[22m:`), so matching the literal substring "Local:"
      // never fires and this promise hangs forever. Match the word alone.
      if (!ready && data.toString().includes("Local")) {
        ready = true;
        resolvePromise(proc);
      }
    });
    proc.stderr.on("data", (data) => process.stderr.write(data));
    proc.on("error", reject);
    proc.on("exit", (code) => {
      if (!ready) reject(new Error(`vite preview exited early (code ${code})`));
    });
  });
}

// The gallery only mounts one full-size plate at a time (see
// ProductGallery.jsx's `index` state) — the other eight only exist as small
// thumbnails until clicked. Clicking through each thumbnail button is the
// only way to read every plate's real, hashed build URL out of the DOM.
async function collectGalleryImageUrls(page) {
  const buttons = await page.$$('button[aria-label^="Plate "]');
  const urls = [];

  for (const button of buttons) {
    await button.click();
    const src = await page.evaluate(
      () =>
        document.querySelector('[aria-label^="Model 001 photographs"] img')
          ?.src
    );
    if (src && !urls.includes(src)) urls.push(src);
  }

  if (buttons.length) await buttons[0].click();
  return urls;
}

function toSiteUrl(localUrl) {
  return new URL(new URL(localUrl).pathname, SITE_URL).toString();
}

// Steps through the full scroll height so the IntersectionObserver-driven
// reveal animations (see useDrawReveal) flip `is-drawn` before the snapshot
// is taken, matching what a scrolled-through visitor would see.
async function scrollThroughPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolveScroll) => {
      const step = 400;
      let total = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolveScroll();
        }
      }, 50);
    });
  });
}

function injectJsonLd(html, schemas) {
  const scripts = schemas
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`
    )
    .join("\n    ");
  return html.replace("</head>", `    ${scripts}\n  </head>`);
}

async function main() {
  const server = await startPreviewServer();

  // Everything below is inside this try/finally: if puppeteer.launch()
  // itself throws, `server` still gets killed rather than orphaned holding
  // the port for every subsequent run.
  try {
    const browser = await puppeteer.launch();

    try {
      console.log("[prerender] launching page...");
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.goto(PREVIEW_URL, { waitUntil: "networkidle0" });
      console.log("[prerender] navigated, waiting for React mount...");

      await page.waitForFunction(
        () => document.querySelector("main")?.children.length > 0
      );
      console.log("[prerender] mounted, collecting gallery images...");

      const imageUrls = (await collectGalleryImageUrls(page)).map(toSiteUrl);
      console.log(`[prerender] collected ${imageUrls.length} image urls`);

      await scrollThroughPage(page);
      console.log("[prerender] scrolled, capturing DOM...");

      const html = await page.evaluate(
        () => "<!doctype html>\n" + document.documentElement.outerHTML
      );

      const schemas = buildAllSchemas(imageUrls);
      const finalHtml = injectJsonLd(html, schemas);

      await writeFile(DIST_INDEX, finalHtml, "utf-8");
      console.log(
        `Prerendered ${PREVIEW_URL} -> dist/index.html (${finalHtml.length} bytes, ${imageUrls.length} product images, ${schemas.length} JSON-LD blocks)`
      );
    } finally {
      await browser.close();
    }
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
