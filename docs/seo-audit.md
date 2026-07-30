# ENVELOPE 01 — SEO / Indexability Audit

Scope: `envelope01.com`, Vite 7 + React 19 SPA, single route (`/`), deployed static to
Cloudflare Pages (`dist/`). No code was changed for this audit. Findings are ranked by
impact on organic discovery; each includes severity, file/line, and the specific fix.

**Sitemap says one page. That's the real constraint here.** The site is architecturally
a single URL with in-page anchors — there is no router, no `/product`, no `/interior`.
Every finding below has to be read against that: some things that would be "missing
per-route metadata" on a multi-page site are non-issues here, and some things that
would be minor on a multi-page site (like the single H1) are actually fine specifically
*because* there's only one page. I've called that out inline where it changes the
severity.

---

## 1. Rendering — is content client-side-only JS?

**Yes, entirely. This is the top-priority finding.**

The build output (`dist/index.html:76-81`) and dev entry (`index.html:76-82`,
[main.jsx](../src/main.jsx)) both confirm: the server response for `/` is

```html
<body>
  <!-- GTM noscript iframe -->
  <div id="root"></div>
  <script type="module" crossorigin src="/assets/index-BHS8eRA9.js"></script>
</body>
```

No content — no `<h1>`, no product name, no price, no spec text, no images — exists in
the HTML a crawler receives before JS executes. Everything in `<main>` (hero, gallery,
interior plan, material specs, order form) is mounted by React ([App.jsx:22-57](../src/App.jsx)) only
after the ~small JS bundle downloads, parses, and runs.

- **Severity: Blocker**
- **File:** `dist/index.html` (build output); source entry [index.html:81-82](../index.html), [src/main.jsx](../src/main.jsx)
- **Why it matters:** Googlebot can render JS but does so as a second, deferred rendering
  wave (historically minutes to days behind initial crawl/indexing of the raw HTML), and
  only if the render queue isn't backed up or budget-constrained. Every other crawler
  that matters for discovery — Bingbot's JS rendering is far less reliable, link-preview
  bots (Slack, Discord, WhatsApp, LinkedIn), most SEO audit/backlink tools, and the
  Wayback Machine — either don't execute JS at all or don't wait for React to hydrate.
  For all of those, this page is blank.
- **Fix:** Pre-render or SSR the single route at build time. Given this is a static,
  content-stable single page (not an app with per-user state), the lowest-risk path is
  a build-time prerender step — e.g. `vite-plugin-ssg`, `vite-plugin-prerender`, or a
  small Puppeteer/Playwright script in the `build` npm script that renders `dist/index.html`
  after `vite build` and overwrites it with the fully-rendered markup, leaving the JS
  bundle in place for hydration. Full SSR (a Cloudflare Pages Function that renders
  React on request) is unnecessary here since the page has no per-request data — static
  prerendering gets 100% of the indexability benefit for a fraction of the complexity.
- **Confirms:** `og:title`/`og:description`/`og:url` (static, in `<head>`) already work
  for link previews — it's specifically the `<main>` body content that's invisible.

---

## 2. Per-route title / meta description / canonical / Open Graph

Only one route exists, so "duplication across routes" doesn't apply — but here's what's
in the single `<head>` ([index.html:6-22](../index.html)):

| Tag | Present | Value / issue |
|---|---|---|
| `<title>` | ✅ | `ENVELOPE 01 — Engineered Form` |
| meta description | ✅ | Present, matches spec table (420×310×140mm — see note below) |
| canonical | ✅ | `https://envelope01.com/` |
| `og:type`, `og:site_name`, `og:title`, `og:url`, `og:description` | ✅ | Present |
| `og:image` | ❌ **Missing** | No image tag at all |
| `twitter:card` | ✅ (but broken) | `summary_large_image` set, but no `twitter:image` and no `og:image` to fall back to |
| `twitter:title` / `twitter:description` | — | Not set, but would inherit from `og:*` if the card rendered at all |

- **Severity: High** (og:image missing)
- **File:** [index.html:22](../index.html) (twitter:card tag, no image sibling); no `og:image` tag anywhere in `<head>`
- **Why it matters:** `twitter:card=summary_large_image` without an image is an invalid
  combination — most validators (Twitter/X Card Validator, Facebook Sharing Debugger,
  LinkedIn Post Inspector) will either reject the card or fall back to a blank/generic
  preview. Every share of the homepage link on WhatsApp, LinkedIn, or X — the exact
  channels a Cairo/Giza/Alexandria private-sector audience uses — loses the product shot.
  This is also flagged as a known TODO in [DEPLOY.md:59-61](../DEPLOY.md): *"Social previews still have no image."*
- **Fix:** Add `<meta property="og:image" content="https://envelope01.com/og.jpg">` (absolute
  URL required) and `<meta name="twitter:image" content="...">`, plus `og:image:width` /
  `og:image:height` for faster preview rendering. Recommended size 1200×630. Source the
  image from an existing plate (e.g. `01-front.jpg`) rather than commissioning new
  photography, per the brand's no-lifestyle-photography constraint in `CLAUDE.md`.

**Spec-consistency check (per CLAUDE.md's SEO rule that schema/meta must match the
published spec table exactly):**

- **Severity: Medium**
- **File:** [index.html:9](../index.html) and [index.html:20](../index.html) (meta description + og:description)
- **Issue:** Both say `420 × 310 × 140 mm`. The on-page spec table in
  [FlagshipShowcase.jsx:392](../src/components/product/FlagshipShowcase.jsx) and the hero drawing's `aria-label` in
  [BlueprintHero.jsx:104](../src/components/hero/BlueprintHero.jsx) both say **120 mm** depth, not 140. `MaterialTruth.jsx`
  doesn't restate the external dimensions, so it doesn't contradict either, but the two
  places that do state a depth (spec table, hero SVG label) agree with each other and
  disagree with the meta tags.
- **Fix:** Change `140` → `120` in both the `<meta name="description">` and
  `<meta property="og:description">` values in `index.html`, or confirm which number is
  actually correct and update whichever side is wrong — but per the CLAUDE.md rule,
  meta and on-page content must not disagree, and right now they do.

---

## 3. robots.txt, sitemap.xml, favicon, noindex directives

- **robots.txt** ([public/robots.txt](../public/robots.txt)): `User-agent: * / Allow: /`, points to
  `https://envelope01.com/sitemap.xml`. Clean, no blocker.
- **sitemap.xml** ([public/sitemap.xml](../public/sitemap.xml)): One `<url>` entry for `/`, `changefreq: monthly`,
  `priority: 1.0`. Correct for a single-page site. No `lastmod` — low-severity gap
  (Search Console uses `lastmod` to prioritize recrawl; without it, Google falls back to
  its own change-detection heuristics, which is fine but slightly slower to pick up
  copy/price edits).
  - **Severity: Low.** **Fix:** add `<lastmod>` and bump it on meaningful content
    changes (or generate it from the build timestamp).
- **noindex:** none found anywhere — no `<meta name="robots">` tag in `index.html`, no
  `X-Robots-Tag` header in [public/_headers](../public/_headers). Confirmed clean.
- **Favicon:** Only `favicon.svg` ([public/favicon.svg](../public/favicon.svg)), referenced via a single
  `<link rel="icon" type="image/svg+xml">` ([index.html:12](../index.html)). No PNG fallback
  (`favicon-32x32.png`, `favicon-16x16.png`), no `apple-touch-icon.png`, no
  `manifest.json`/`site.webmanifest`.
  - **Severity: Low.** SVG favicons are supported by current Chrome/Firefox/Edge and by
    Google's search-result favicon requirements (Google explicitly documents SVG
    support), but Safari (as of recent versions) and any bookmarking/PWA-install flow
    still want a PNG and an `apple-touch-icon`. Doesn't block indexing; affects polish
    of the search-result favicon on some browsers and "add to home screen" appearance.
  - **Fix:** Generate a 32×32/16×16 PNG pair and a 180×180 `apple-touch-icon.png` from
    the existing SVG monogram, add the corresponding `<link>` tags.

---

## 4. Heading hierarchy (H1 count per route)

One route, and it's correctly structured:

| Section | Heading | Level |
|---|---|---|
| `#statement` | "Structured elegance for the modern workday." | **H1** ([BlueprintHero.jsx:464](../src/components/hero/BlueprintHero.jsx)) |
| `#manifesto` | "We do not decorate. We construct." | H2 ([BlueprintHero.jsx:492](../src/components/hero/BlueprintHero.jsx)) |
| `#product` | "One Model. Built to Carry a Full Day." | H2 ([FlagshipShowcase.jsx:409](../src/components/product/FlagshipShowcase.jsx)) |
| `#specs` | "Model 001 — The Folded Briefcase" | H2 ([FlagshipShowcase.jsx:425](../src/components/product/FlagshipShowcase.jsx)) |
| `#interior` | "Medium compartmented. Hybrid materials." | H2 ([InteriorPlan.jsx:281](../src/components/interior/InteriorPlan.jsx)) |
| `#front-pocket` | "The flap is not decoration." | H3 ([InteriorPlan.jsx:379](../src/components/interior/InteriorPlan.jsx)) |
| `#anatomy` | "The Anatomy of a Daily Investment." | H2 ([MaterialTruth.jsx:69](../src/components/anatomy/MaterialTruth.jsx)) |
| `#handover` | "The Handover." | H3 ([MaterialTruth.jsx:95](../src/components/anatomy/MaterialTruth.jsx)) |
| `#order` | "Request to Order." | H2 ([OrderInquiry.jsx:72](../src/components/contact/OrderInquiry.jsx)) |

**Exactly one H1, no skipped levels (H1 → H2 → H3, never H1 → H3), no zero-H1 or
multi-H1 route.**

- **Severity: none — this is compliant.** Flagging only because it's an explicit audit
  item: there's nothing to fix here. The one soft note is that the H1 sits in the
  *second* full-screen panel (`#statement`), after the wordless technical-drawing panel
  (`#blueprint`), so the very first screenful of rendered content (once rendering is
  fixed per Finding 1) has no heading at all — that's normal and not a violation (H1
  doesn't have to be the first element on the page), just worth knowing it's not
  above-the-fold text.

---

## 5. Image handling

All product photography is JPEG, served via Vite's asset pipeline
([ProductGallery.jsx:5-23](../src/components/product/ProductGallery.jsx)), 9 full images + 9 thumbnails, verified
dimensions:

| File | Actual px | `width`/`height` attrs | Match? |
|---|---|---|---|
| `01-front.jpg` | 1400×1875 | `1400`/`1875` ([ProductGallery.jsx:120-121](../src/components/product/ProductGallery.jsx)) | ✅ |
| `thumb/01-front.jpg` | 220×295 | `220`/`295` ([ProductGallery.jsx:196-197](../src/components/product/ProductGallery.jsx)) | ✅ |

(Spot-checked the pattern is consistent across the `PLATES` array — every entry sets
literal `width`/`height` that match the source files, so CLS from image load is not an
issue.)

- **Format — Severity: Medium.** File: [src/assets/product/*.jpg](../src/assets/product/). All
  9 hero plates are JPEG only (112 KB–270 KB each, `06-handle.jpg` is the largest at
  270 KB). No WebP/AVIF variants. **Fix:** Generate AVIF/WebP versions at build time
  (e.g. `vite-imagetools` or `@squoosh/lib` in a prebuild step) and serve via `<picture>`
  with JPEG fallback, or let a Cloudflare Images / Polish transform handle it at the
  edge. This is a Core Web Vitals (LCP) lever more than a pure-indexability one, but
  page-experience signals do factor into ranking, and `01-front.jpg` (180 KB) is the
  first image painted in the fold-2 panel.
- **Loading strategy — Severity: Low.** File: [ProductGallery.jsx:117-126](../src/components/product/ProductGallery.jsx).
  The single large "current plate" `<img>` has no `loading` attribute (defaults to
  eager, which is correct since it's above-the-fold-ish content) but also no
  `fetchpriority="high"`, while the 9 thumbnail `<img>`s correctly use
  `loading="lazy"` ([ProductGallery.jsx:198](../src/components/product/ProductGallery.jsx)). Not wrong, just
  leaves an easy LCP win on the table. **Fix:** add `fetchpriority="high"` to the first
  plate's `<img>` only.
- **Alt text — Severity: none, this is done well.** Every content image has a
  specific, descriptive `alt` (e.g. [ProductGallery.jsx:33](../src/components/product/ProductGallery.jsx):
  *"The Model 001 briefcase photographed square on: a black full-grain leather front
  panel creased into four facets..."*). Decorative thumbnail duplicates correctly use
  `alt=""` ([ProductGallery.jsx:195](../src/components/product/ProductGallery.jsx)) since the parent `<button>`
  already carries an `aria-label` ([ProductGallery.jsx:184](../src/components/product/ProductGallery.jsx)). The
  technical-drawing SVGs use `role="img"` with a full-sentence `aria-label` in place of
  alt (e.g. [BlueprintHero.jsx:104](../src/components/hero/BlueprintHero.jsx)) — correct pattern for inline SVG.
  One check specific to this repo's brand rule: none of the alt text uses "genuine
  leather" — confirmed clean (`full-grain leather` is used throughout, which is the
  CLAUDE.md-compliant phrasing).
- **SVG micro-copy visibility — Severity: Low, informational.** The technical-drawing
  callout labels and dimension numbers (e.g. "D-RING ×2", "420", "310") are rendered as
  SVG `<text>` inside elements with `.bp-fade`/`.bp-draw` classes that start at
  `opacity: 0` ([src/index.css:255-256](../src/index.css)) and only animate to `opacity: 1` once an
  `IntersectionObserver` adds `.is-drawn` on scroll-into-view
  ([useDrawReveal.js:16-23](../src/hooks/useDrawReveal.js)). This text is present in the DOM at all
  times (not `display:none`), and it's redundant with the SVG's own `aria-label` and the
  visible `<dl>` spec tables next to each drawing, so there's no unique content at risk
  — but it's worth knowing this pattern exists if any *future* section puts non-redundant
  copy behind the same reveal-on-scroll mechanic, since text sitting at `opacity: 0`
  until a scroll-triggered class flip is a recognized (if now largely defused) SEO
  gray area.

---

## 6. Route structure and URL patterns

- **One URL total: `/`.** No router (confirmed: `react-router` is not in
  `package.json` dependencies), no `/product`, no `/about`. Navigation
  ([MenuOverlay.jsx:3-9](../src/components/layout/MenuOverlay.jsx), [Header.jsx:28](../src/components/layout/Header.jsx)) is entirely
  in-page hash anchors (`#manifesto`, `#product`, `#interior`, `#anatomy`, `#order`,
  `#top`).
- **Trailing slash / case consistency:** canonical (`index.html:11`), `og:url`
  (`index.html:17`), and the sitemap's `<loc>` all agree on
  `https://envelope01.com/` — trailing slash, lowercase, apex domain. No
  inconsistency found.
- **No `_redirects` file** ([DEPLOY.md:76-77](../DEPLOY.md) documents this as intentional: unknown
  paths should 404, not silently serve the homepage) — reasonable for a single-page
  site and avoids soft-404 duplicate-content issues that a catch-all-to-homepage
  redirect would create.
- **www vs apex:** DEPLOY.md states Cloudflare will redirect `www.envelope01.com` →
  apex once the custom domain is added ([DEPLOY.md:52-53](../DEPLOY.md)), which is correct
  behavior, but this couldn't be verified from the repo alone since it depends on live
  Cloudflare dashboard config, not code.
  - **Severity: Low (verify only).** **Action:** once the domain is live, confirm
    `www.envelope01.com` actually 301s to the apex (not a 200 duplicate) — this is a
    dashboard check, not a code fix.
- **Single-URL architecture itself — informational, not a defect.** Worth naming
  explicitly since it's the single biggest structural fact shaping every other finding
  in this report: with one indexable URL, there is no long-tail surface (can't rank a
  distinct page for "16 inch laptop briefcase interior" vs. "full grain leather
  briefcase price Cairo") and no way to build internal links between distinct pages.
  That's a legitimate content-strategy trade-off for a one-SKU brand and not something
  to "fix" reflexively, but it does mean Finding 1 (client-rendered content) matters
  more than it would on a multi-page site — there is no second chance for a crawler to
  find this content anywhere else on the domain.

---

## 7. Client-side redirects, hash routing, JS-gated content

- **No client-side redirects** — no `window.location` reassignment, no
  `<meta http-equiv="refresh">` anywhere in the codebase.
- **Hash-based in-page navigation only** (see Finding 6) — these are anchor jumps
  within the single document, not a hash-routing framework simulating multiple pages
  (e.g. no `#/product` pseudo-routes). This is not an SEO problem in itself since there's
  only one canonical document either way, but it reinforces Finding 1: since all nine
  content sections live in that one document and are mounted by JS, a crawler that
  doesn't execute JS gets zero of them, not "gets the ones before the fold and misses
  the rest."
- **JS-gated content a crawler cannot reach:** beyond the top-level rendering gate
  (Finding 1), the order form's confirmation state
  ([OrderInquiry.jsx:83-95](../src/components/contact/OrderInquiry.jsx)) is correctly gated behind user
  interaction (`status === "sent"`) — that's appropriate; a "thank you" panel isn't
  content that should be indexed instead of the form. No other content found gated
  behind clicks/tabs/accordions that should be crawlable but isn't.

---

## Summary, ranked by impact on organic discovery

| # | Finding | Severity | Fix effort |
|---|---|---|---|
| 1 | Entire page is client-rendered; crawlers without JS execution see empty `<body>` | **Blocker** | Medium — add a build-time prerender step |
| 2 | `og:image` / `twitter:image` missing entirely (twitter:card is invalid without one) | **High** | Low — one image + two meta tags |
| 3 | Meta description / og:description say "140 mm" depth; spec table and hero drawing say "120 mm" | **Medium** | Trivial — fix the number in `index.html` |
| 4 | Product images are JPEG-only, no WebP/AVIF; largest is 270 KB | **Medium** | Medium — add an image-optimization build step |
| 5 | No `favicon.ico`/PNG fallback or `apple-touch-icon` | **Low** | Low |
| 6 | `sitemap.xml` has no `<lastmod>` | **Low** | Trivial |
| 7 | First gallery plate has no `fetchpriority="high"` | **Low** | Trivial |
| 8 | www→apex redirect not verifiable from code, needs a live check post-launch | **Low** | N/A (ops task) |
| — | Heading hierarchy (H1 count) | **Compliant, no action** | — |
| — | Alt text coverage | **Compliant, no action** | — |
| — | robots.txt / noindex directives | **Compliant, no action** | — |

**If only one thing gets fixed:** Finding 1. Everything else — the og:image, the spec
mismatch, image formats — only matters to a crawler that can actually see the page's
content in the first place, and right now most can't.

---

*This report does not modify any code, per the task scope. No specification numbers,
review counts, or dates were invented to fill any gap — where a value wasn't confirmed
in the source, this report says so rather than guessing.*
