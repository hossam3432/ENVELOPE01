// Runs after `vite build`. Serves the built `dist/` with Vite's own preview
// server, loads each locale route (/en/, /ar/) in headless Chromium so React
// mounts exactly as it does for a real visitor, then writes the resulting
// DOM plus injected JSON-LD to dist/en/index.html and dist/ar/index.html.
// The JS bundle tag stays in each output, so browsers still hydrate into the
// interactive app — this only changes what a non-JS crawler sees.
//
// dist/index.html itself is then overwritten with a small static redirect
// page (see buildRootFallbackHtml below) — the real redirect for production
// is public/_redirects (`/ /en/ 302`), honored by Cloudflare Pages at the
// edge before any static file is served; this file is only a fallback for
// environments that don't run through that edge (a different static host,
// or opening the file directly).
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import puppeteer from "puppeteer";
import { SITE_URL, buildAllSchemas } from "../src/seo/schema.ts";
import { LOCALES, HREFLANG, DEFAULT_LOCALE } from "../src/i18n/locales.js";
import { ROUTES } from "../src/routes.js";

const PORT = 48173;
const PREVIEW_URL = `http://localhost:${PORT}/`;
const DIST_DIR = resolve("dist");
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
// Selected via the stable `data-plate-thumb` attribute rather than the
// (localized, so language-dependent) aria-label text.
async function collectGalleryImageUrls(page) {
  const buttons = await page.$$("button[data-plate-thumb]");
  const urls = [];

  for (const button of buttons) {
    await button.click();
    const src = await page.evaluate(
      () => document.querySelector('[role="group"] img')?.src
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

async function prerenderLocale(browser, locale) {
  console.log(`[prerender] (${locale}) launching page...`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${PREVIEW_URL}${locale}/`, { waitUntil: "networkidle0" });
  console.log(`[prerender] (${locale}) navigated, waiting for React mount...`);

  await page.waitForFunction(
    () => document.querySelector("main")?.children.length > 0
  );
  console.log(`[prerender] (${locale}) mounted, collecting gallery images...`);

  const imageUrls = (await collectGalleryImageUrls(page)).map(toSiteUrl);
  console.log(`[prerender] (${locale}) collected ${imageUrls.length} image urls`);

  await scrollThroughPage(page);
  console.log(`[prerender] (${locale}) scrolled, capturing DOM...`);

  const html = await page.evaluate(
    () => "<!doctype html>\n" + document.documentElement.outerHTML
  );

  const schemas = buildAllSchemas(imageUrls, locale);
  const finalHtml = injectJsonLd(html, schemas);

  const outDir = resolve(DIST_DIR, locale);
  await mkdir(outDir, { recursive: true });
  const outFile = resolve(outDir, "index.html");
  await writeFile(outFile, finalHtml, "utf-8");
  console.log(
    `Prerendered ${PREVIEW_URL}${locale}/ -> dist/${locale}/index.html (${finalHtml.length} bytes, ${imageUrls.length} product images, ${schemas.length} JSON-LD blocks)`
  );

  await page.close();
}

// Content pages beyond the homepage (docs/content-plan.md) — a plain HTML
// snapshot, no JSON-LD injected yet, since buildProductSchema is homepage/
// gallery-specific and these pages have no body copy to describe honestly
// yet. Add page-appropriate schema (Article, FAQPage, ...) once they do.
// Runs after the homepage passes below, writing dist/<locale>/<slug>/
// index.html — <SEO> already renders `noindex` for any route whose `ready`
// flag in src/routes.js is still false, so these ship crawlable-but-excluded
// until that flips.
async function prerenderRoute(browser, locale, route) {
  const slug = route.slugs[locale];
  const urlPath = `${locale}/${slug}/`;
  console.log(`[prerender] (${locale}) ${route.key} — launching page...`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${PREVIEW_URL}${urlPath}`, { waitUntil: "networkidle0" });

  await page.waitForFunction(
    () => document.querySelector("main")?.children.length > 0
  );
  await scrollThroughPage(page);

  const html = await page.evaluate(
    () => "<!doctype html>\n" + document.documentElement.outerHTML
  );

  const outDir = resolve(DIST_DIR, locale, slug);
  await mkdir(outDir, { recursive: true });
  const outFile = resolve(outDir, "index.html");
  await writeFile(outFile, html, "utf-8");
  console.log(
    `Prerendered ${PREVIEW_URL}${urlPath} -> dist/${locale}/${slug}/index.html (${html.length} bytes) [robots: ${route.ready ? "index" : "noindex"}]`
  );

  await page.close();
}

// / is never a real page (see public/_redirects for the edge-level 302 to
// /en/) — this is a plain static fallback for hosts/tools that don't honor
// that redirect, carrying the same hreflang trio every real page has.
function buildRootFallbackHtml() {
  const targets = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${SITE_URL}${locale}/`])
  );
  const hreflangLinks = LOCALES.map(
    (locale) => `    <link rel="alternate" hreflang="${HREFLANG[locale]}" href="${targets[locale]}" />`
  ).join("\n");

  return `<!doctype html>
<html lang="${DEFAULT_LOCALE}">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${targets[DEFAULT_LOCALE]}" />
    <link rel="canonical" href="${targets[DEFAULT_LOCALE]}" />
${hreflangLinks}
    <link rel="alternate" hreflang="x-default" href="${targets[DEFAULT_LOCALE]}" />
    <title>ENVELOPE 01</title>
  </head>
  <body>
    <p><a href="${targets[DEFAULT_LOCALE]}">Continue to ENVELOPE 01 &rarr;</a></p>
  </body>
</html>
`;
}

async function main() {
  const server = await startPreviewServer();

  // Everything below is inside this try/finally: if puppeteer.launch()
  // itself throws, `server` still gets killed rather than orphaned holding
  // the port for every subsequent run.
  try {
    const browser = await puppeteer.launch();

    try {
      for (const locale of LOCALES) {
        await prerenderLocale(browser, locale);
      }
      for (const locale of LOCALES) {
        for (const route of ROUTES) {
          await prerenderRoute(browser, locale, route);
        }
      }
    } finally {
      await browser.close();
    }

    const rootFile = resolve(DIST_DIR, "index.html");
    await writeFile(rootFile, buildRootFallbackHtml(), "utf-8");
    console.log("Wrote dist/index.html (redirect fallback to /en/)");
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
