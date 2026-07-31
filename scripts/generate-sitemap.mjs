// Generates dist/sitemap.xml from the route manifest — src/routes.js and
// src/i18n/locales.js are the only sources of truth for what URLs exist.
// Never hand-list a URL here: add a route to src/routes.js (and flip its
// `ready` flag when it has real content) and it appears on the next build
// with correct hreflang alternates, or don't and it stays out, automatically.
//
// Runs after `vite build` (see package.json) — writes straight into dist/,
// which is why public/sitemap.xml no longer exists: a static file there
// would just be a second, stale copy of what this script derives fresh
// every build.
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { LOCALES, DEFAULT_LOCALE, HREFLANG } from "../src/i18n/locales.js";
import { ROUTES } from "../src/routes.js";

const SITE_URL = "https://envelope01.com";
const DIST_DIR = resolve("dist");

function homePath(locale) {
  return `${SITE_URL}/${locale}/`;
}

function routePath(locale, route) {
  return `${SITE_URL}/${locale}/${route.slugs[locale]}/`;
}

// One sitemap entry: its own <loc>, plus an <xhtml:link> alternate for
// every locale (including itself, per Google's hreflang spec — every
// locale variant lists every other variant AND itself) and one x-default.
function buildEntry({ loc, alternates, priority }) {
  const alternateLinks = LOCALES.map(
    (locale) =>
      `    <xhtml:link rel="alternate" hreflang="${HREFLANG[locale]}" href="${alternates[locale]}" />`
  ).join("\n");

  return `  <url>
    <loc>${loc}</loc>
${alternateLinks}
    <xhtml:link rel="alternate" hreflang="x-default" href="${alternates[DEFAULT_LOCALE]}" />
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Build-time timestamp, not per-page — see docs/seo-audit.md finding 6:
// Search Console uses lastmod to prioritize recrawl, and "this build ran at
// X" is an honest signal even without per-route git history wired in.
const LASTMOD = new Date().toISOString().slice(0, 10);

function buildSitemap() {
  const entries = [];

  // Homepage, one per locale — always present, always indexable.
  const homeAlternates = Object.fromEntries(
    LOCALES.map((locale) => [locale, homePath(locale)])
  );
  for (const locale of LOCALES) {
    entries.push(
      buildEntry({ loc: homePath(locale), alternates: homeAlternates, priority: "1.0" })
    );
  }

  // Content routes — only ones with `ready: true` (see src/routes.js).
  // Stub/TODO pages carry `noindex` (src/seo/meta.ts) and have no business
  // in a sitemap: submitting a noindex URL for crawling is a contradictory
  // signal Search Console explicitly flags.
  for (const route of ROUTES) {
    if (!route.ready) continue;
    const routeAlternates = Object.fromEntries(
      LOCALES.map((locale) => [locale, routePath(locale, route)])
    );
    for (const locale of LOCALES) {
      entries.push(
        buildEntry({
          loc: routePath(locale, route),
          alternates: routeAlternates,
          priority: "0.7",
        })
      );
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
}

async function main() {
  const xml = buildSitemap();
  const outFile = resolve(DIST_DIR, "sitemap.xml");
  await writeFile(outFile, xml, "utf-8");
  const urlCount = (xml.match(/<url>/g) || []).length;
  console.log(`Wrote dist/sitemap.xml (${urlCount} URLs, ${xml.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
