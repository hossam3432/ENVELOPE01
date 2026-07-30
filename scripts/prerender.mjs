// Runs after `vite build`. Serves the built `dist/` with Vite's own preview
// server, loads it in headless Chromium so React mounts exactly as it does
// for a real visitor, then overwrites dist/index.html with the resulting
// DOM. The JS bundle tag stays in the output, so browsers still hydrate
// into the interactive app — this only changes what a non-JS crawler sees.
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import puppeteer from "puppeteer";

const PORT = 4319;
const URL = `http://localhost:${PORT}/`;
const DIST_INDEX = resolve("dist/index.html");

function startPreviewServer() {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn(
      "npx",
      ["vite", "preview", "--port", String(PORT), "--strictPort"],
      { shell: true }
    );

    let ready = false;
    proc.stdout.on("data", (data) => {
      if (!ready && data.toString().includes("Local:")) {
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

async function main() {
  const server = await startPreviewServer();
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(URL, { waitUntil: "networkidle0" });

    await page.waitForFunction(
      () => document.querySelector("main")?.children.length > 0
    );

    await scrollThroughPage(page);

    const html = await page.evaluate(
      () => "<!doctype html>\n" + document.documentElement.outerHTML
    );

    await writeFile(DIST_INDEX, html, "utf-8");
    console.log(`Prerendered ${URL} -> dist/index.html (${html.length} bytes)`);
  } finally {
    await browser.close();
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
