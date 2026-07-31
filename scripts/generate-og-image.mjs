// Produces public/og.jpg from the actual product photography + the site's
// real fonts/colors, rather than a hand-designed image someone has to
// remember to update — see src/pages/OgImagePage.jsx for the 1200x630
// layout this screenshots (background photo + wordmark bar, styled exactly
// like src/components/layout/Header.jsx).
//
// Runs against the Vite *dev* server, not `vite preview` — this has to run
// before `vite build` (see package.json's "build" script) so the resulting
// file lands in public/ in time for that same build's public-dir copy step
// to carry it into dist/, and the dev server needs no prior build to serve
// from source.
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import puppeteer from "puppeteer";
import sharp from "sharp";

const PORT = 48192;
const PAGE_URL = `http://localhost:${PORT}/__og-image__/`;
const OUT_FILE = resolve("public/og.jpg");
const WIDTH = 1200;
const HEIGHT = 630;
const VITE_BIN = fileURLToPath(
  new URL("../node_modules/vite/bin/vite.js", import.meta.url)
);

// Same spawn approach as scripts/prerender.mjs (direct process.execPath +
// vite's bin script, not `npx`/`shell: true`) — that file's comment
// documents why: on Windows, shell:true routes through cmd.exe and the
// process was exiting immediately with a bogus code instead of starting.
function startDevServer() {
  return new Promise((resolvePromise, reject) => {
    const proc = spawn(process.execPath, [
      VITE_BIN,
      "--port",
      String(PORT),
      "--strictPort",
    ]);

    let ready = false;
    proc.stdout.on("data", (data) => {
      process.stdout.write(data);
      if (!ready && data.toString().includes("Local")) {
        ready = true;
        resolvePromise(proc);
      }
    });
    proc.stderr.on("data", (data) => process.stderr.write(data));
    proc.on("error", reject);
    proc.on("exit", (code) => {
      if (!ready) reject(new Error(`vite dev server exited early (code ${code})`));
    });
  });
}

async function main() {
  const server = await startDevServer();

  try {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });
      await page.goto(PAGE_URL, { waitUntil: "networkidle0" });
      await page.evaluate(() => document.fonts.ready);

      const pngBuffer = await page.screenshot({ type: "png" });

      // Screenshotted at deviceScaleFactor 2 (2400x1260) for crisp text/
      // edges, then downsampled to the real 1200x630 og:image spec size and
      // re-encoded as JPEG — smaller than PNG for a photo-backed image, and
      // og:image/twitter:image both accept JPEG.
      await sharp(pngBuffer)
        .resize(WIDTH, HEIGHT)
        .jpeg({ quality: 85 })
        .toFile(OUT_FILE);

      await page.close();
    } finally {
      await browser.close();
    }
  } finally {
    server.kill();
  }

  console.log(`Wrote public/og.jpg (${WIDTH}x${HEIGHT})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
