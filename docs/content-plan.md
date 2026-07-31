# Content Architecture — Beyond the Homepage

Supports `docs/keyword-map.md`. Scope: four new indexable pages, what each one
proves, and the routing/SEO/build plumbing needed to ship them. Body copy is not
written here — every page below ships with a `TODO` placeholder in
`src/i18n/content/en.js` / `ar.js` and stays `noindex` until that copy lands.

## Format decision

The site has no router and no MDX pipeline today — it's a single SPA per locale,
hand-built from JSX pulling strings out of `src/i18n/content/{en,ar}.js`, snapshotted
by `scripts/prerender.mjs`. Two ways to add four new pages: bring in an MDX toolchain
(nicer prose authoring, but new build dependencies and a new content pipeline), or
extend the existing pattern (JSX component + content-file entries, zero new
dependencies). **Decision: extend the existing pattern.** New pages are `.jsx`
components under `src/pages/`, sharing a new `ArticleLayout` shell, with copy sourced
from a new `pages` key in `en.js`/`ar.js` — same mechanism as every other string on the
site, so a future editor doesn't need to learn a second content system.

## The four pillars

- **Function proof** — does the product do what it claims (fit, load, structure).
- **Material truth** — what it's made of, at what grade, and how that's checked.
- **Behind the make** — production/business-model facts stated plainly, not craft
  storytelling.
- **Competence notes** — how-to content that lets a buyer verify a claim themselves;
  doubles as the comparative-tier asset in the keyword map.

## Evaluation of the four candidates

| Candidate | Verdict | Why |
|---|---|---|
| Full specification page | **Build first.** | Highest-value asset on the site — the one page every spec-anchored query, and every other new page, should resolve to. Nothing here needs inventing; it consolidates numbers already published across `#specs`, `#anatomy`, `#interior`. |
| "How to identify full-grain leather" | **Build second.** | Directly serves Tier 2 of the keyword map. Must stay in observable, testable criteria (grain irregularity, edge finish, absorbency) — no lab claims we haven't run, and never the phrase "genuine leather" / "جلد أصلي" per CLAUDE.md, even though that's exactly what searchers type. |
| Hardware (316L) page | **Build third, scope tightly.** | Grounded in `HARDWARE = "316L Brushed stainless steel"` (`src/seo/schema.ts:29`). Explain what the grade means as a material fact (composition, standard corrosion-resistance class). Do **not** extend into an untested performance claim like "will never rust" — we haven't tested that, CLAUDE.md says write nothing rather than an unverifiable adjective. |
| Price-transparency page, as briefed | **Reject as briefed; approve reframed.** | "What 6,500 EGP buys," read as a cost breakdown, would require margin/COGS numbers (leather cost vs. labor vs. hardware) that don't exist anywhere in the repo or brand docs — inventing them is exactly what CLAUDE.md's SEO rules forbid. Reframed as a **Fixed-Price Policy** page instead: one price, COD only, one SKU at that price regardless of colorway, no installment plan, no discount — all of which are already true and already stated in fragments (`meta.ts:72`, `schema.ts:142-150`). **Blocked** until the price bug below is fixed. |

**⚠ Blocking issue carried over from `docs/keyword-map.md`:** `src/i18n/content/en.js:101`
and the matching line in `ar.js` publish `"6,500 – 7,000 EGP"`, a range, which
contradicts CLAUDE.md's fixed-price rule and disagrees with `schema.ts`'s hard-coded
`6500`. The Fixed-Price Policy page cannot be written honestly until this is resolved
one way or the other — fix the on-page price, or tell me which figure is actually
correct.

---

## Page 1 — Full Specification (Function Proof)

- **URL**: `/en/specification/` · `/ar/المواصفات/`
- **H1 (placeholder)**: EN "Model No. 0.1 — Full Specification" · AR "الموديل رقم ٠٫١ — المواصفات الكاملة"
- **Query it answers**: Tier 1/2 crossover — "leather briefcase specification Egypt," "مواصفات شنطة جلد رجالي," and every price- or dimension-anchored query in the keyword map that currently has no single canonical landing spot.
- **Claim it rests on**: the full spec table as already published — `External 420 × 310 × 120 mm`, `Volume ≈18 L`, `Weight 1.15–1.30 kg empty`, `Fit 16″ laptop, upright`, `Closure #8 metal U-zip, ≈600 mm track, twin sliders`, `Strap detachable, 18 mm, adjusts 850–1350 mm`, `Leather full-grain, matte, 1.2 mm`, `Hardware 316L brushed stainless steel`, `Construction 7–9 SPI` (`FlagshipShowcase.jsx` `specItems`, `MaterialTruth.jsx` `specs`). No new number gets invented here — this page is a consolidation, not a new source of truth.
- **Internal links in**: homepage `#specs` and `#anatomy` ("Full specification →"), and from Pages 2–4 wherever they cite a spec row.
- **Internal links out**: Page 3 (hardware, from the Hardware row), Page 2 (leather guide, from the Leather row), Page 4 (price policy, from the price line), homepage `#order` (buy CTA).

## Page 2 — How to Identify Full-Grain Leather (Competence Notes)

- **URL**: `/en/how-to-identify-full-grain-leather/` · `/ar/التعرف-على-جلد-كامل-الحبة/`
- **H1 (placeholder)**: EN "How to Identify Full-Grain Leather" · AR "كيف تتعرف على جلد كامل الحبة"
- **Query it answers**: Tier 2 rank 1–2 — "full-grain vs corrected-grain leather," "جلد كامل الحبة يعني ايه," "الفرق بين الجلد الطبيعي والجلد الصناعي."
- **Claim it rests on**: `LEATHER = "Full-grain, matte, 1.2 mm"` (`schema.ts:28`) plus the Substance/Geometry rows in `MaterialTruth.jsx` ("Ages naturally. Never peels." / "Creases skived to 0.7mm so they never crack white."). The page teaches a buyer a verification method, then states our leather meets it at the published thickness — it does not claim to out-test competitors, only to show a repeatable check.
- **Internal links in**: Page 1's Leather row, homepage `#anatomy` Substance row.
- **Internal links out**: Page 1 (spec source), Page 3 (sibling verification piece), homepage `#order`.
- **Guardrail**: never write "genuine leather" or "جلد أصلي" as a claim anywhere on this page, including headings, alt text, and any schema added later — CLAUDE.md prohibition, and this is the one page most likely to attract it by habit since it's the exact phrase competitors use.

## Page 3 — 316L Stainless Hardware: Specification and Verification (Material Truth)

- **URL**: `/en/316-stainless-hardware/` · `/ar/تجهيزات-استانلس-ستيل-316/`
- **H1 (placeholder)**: EN "316L Stainless Hardware — Specification and Verification" · AR "تجهيزات استانلس ستيل ٣١٦L — المواصفات والتحقق"
- **Query it answers**: Tier 2 rank 3–4 — "316L stainless steel hardware meaning," "تجهيزات ستانلس ستيل ٣١٦ للشنط."
- **Claim it rests on**: `HARDWARE = "316L Brushed stainless steel"` (`schema.ts:29`) and the Hardware row in `MaterialTruth.jsx` ("Chosen for what the hand registers, not plating grade."). Explain the 316L designation as a material-grade fact (a defined alloy standard); do not extend it into a corrosion/durability guarantee that hasn't been tested.
- **Internal links in**: Page 1's Hardware row, homepage `#anatomy` Hardware row.
- **Internal links out**: Page 1, homepage `#order`.

## Page 4 — Fixed-Price Policy (Behind the Make)

- **URL**: `/en/fixed-price-policy/` · `/ar/سياسة-السعر-الثابت/`
- **H1 (placeholder)**: EN "6,500 EGP — What the Price Includes" · AR "٦٬٥٠٠ جنيه — ما يشمله السعر"
- **Query it answers**: Tier 1 rank 4 — "سعر شنطة جلد رجالي," "leather bag price Egypt."
- **Claim it rests on**: the fixed price itself (once the range bug above is resolved), cash-on-delivery-only (`meta.ts:72` "٦٬٥٠٠ جنيه مصري، الدفع عند الاستلام فقط"), and single-SKU pricing (`schema.ts` offers block — one price regardless of the Black/Bone colorway choice). States what's included (the bag as specified on Page 1) and what's explicitly not offered (no installment plan, no discount) — a policy statement, not a cost breakdown.
- **Internal links in**: Page 1's price line, homepage `#order` ("why one price →").
- **Internal links out**: Page 1, homepage `#order` (the actual inquiry form).
- **Blocked on**: the price-range bug fix (see above).

---

## Technical scaffolding

Route data lives in two files, split deliberately to avoid an import cycle
(`meta.ts` → routes → page components → `ArticleLayout` → `SEO.jsx` → `meta.ts`):

- `src/routes.js` — pure data: key, pillar, per-locale slug, and a `ready` flag. Safe
  for `src/seo/meta.ts` to import.
- `src/routes-components.js` — maps each route key to its page component. Only
  `src/main.jsx` imports this one.

`src/main.jsx` now resolves the pathname against `routes.js` after stripping the
locale prefix; no match falls back to the homepage (`App`). A real 404 route is not
built here — flagging it as a follow-up once there's more than one page.

`src/seo/meta.ts` gained a per-route branch: title/description come from new
`ROUTE_TITLE`/`ROUTE_DESCRIPTION` records (currently `"TODO"` for all four pages, per
CLAUDE.md's placeholder rule) and `robots` is `"noindex, follow"` for any route whose
`ready` flag is `false`. Flip `ready: true` in `src/routes.js` and fill in the matching
title/description in `meta.ts` in the same pass that ships each page's body copy — not
before.

`scripts/prerender.mjs` now loops `ROUTES × LOCALES` after the existing homepage pass
and writes `dist/<locale>/<slug>/index.html` for each. Sub-pages are prerendered as a
plain HTML snapshot with no JSON-LD injected yet (the existing `buildProductSchema`
call is homepage/gallery-specific) — add page-appropriate schema (`Article`,
`FAQPage`, etc.) once there's real copy to describe.

**Not done here, do before any page goes live:**
1. Fix the price-range bug (blocks Page 4 outright, and Page 1's price row).
2. Write the body copy + real title/description in `meta.ts`.
3. Flip that route's `ready` flag to `true` in `src/routes.js`.
4. Add the page's two URLs (en + ar) to `public/sitemap.xml` — intentionally not
   added yet, since listing a `noindex` page in the sitemap is self-contradictory.
5. Menu/nav follow-up: `MenuOverlay`'s links (`t.menu.links` in `en.js`/`ar.js`) are
   bare `#anchor` fragments meant for the homepage. From a sub-page they currently
   resolve to nothing. Not changed in this scaffold — worth deciding deliberately
   (locale-prefixed absolute links vs. a sub-page-aware nav) rather than as a
   side-effect of adding four pages.
