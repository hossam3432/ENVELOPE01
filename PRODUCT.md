# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Private-sector professionals aged 25–40 in Cairo, Giza, and Alexandria
(CLAUDE.md, Market). They are evaluating a work briefcase for daily commute and
office use, carrying a laptop up to 16″ upright alongside documents.

The site's visitor is pre-purchase and evaluating, not browsing: the published
specification table is the primary decision surface, and the order request is
the single conversion action.

Secondary audiences are not confirmed. Do not assume gift buyers, resellers,
international shipping, or corporate/bulk purchasers — none is established
anywhere in the repo or brand documentation.

## Product Purpose

One SKU: a structured black leather work briefcase, Model No. 0.1, with a
folded-envelope front panel that functions as a magnetic-closure pocket.

The website exists so a buyer can verify every material and dimensional claim
before ordering, then request an order. Success is a completed order request
from a buyer who did not have to take an adjective on trust.

## Positioning

Confirmed by the brand owner as the two claims a neighboring Cairo leather-goods
brand could not truthfully copy:

1. **Verifiable published specification.** Every number is stated to the
   millimetre and held consistent across on-page copy, meta description, and
   JSON-LD — external size, ±2 mm tolerance, stitch density in SPI, foam
   thickness, strap adjustment range, zip track length. The category norm is
   adjectives; this is a datasheet.
2. **Bilingual technical rigor.** Full English/Arabic parity with RTL layout,
   Eastern Arabic-Indic numerals on-page and ASCII digits in schema.org values
   (`src/seo/schema.ts`, header comment). Arabic is a primary surface, not a
   translated afterthought.

The folded-envelope construction and the fixed-price/COD posture are real product
facts, recorded below, but were not selected as the differentiating position.

## Operating Context

- Bilingual static site, two locale routes (`/en/`, `/ar/`), prerendered at build
  and served from Cloudflare Pages at `envelope01.com` (`DEPLOY.md`).
- Purchase is cash on delivery. No online payment, no cart, no account.
- Delivery market is Cairo, Giza, Alexandria. No shipping policy beyond that is
  established.
- Buyer contact channels published in schema `sameAs`: Instagram
  `@envelope01`, Facebook `envelope01`. Both were supplied by the brand owner
  and are flagged in `src/seo/schema.ts:46` as unverified against live profiles.

## Capabilities and Constraints

**Product facts**

- One SKU, two colorways: Black and Bone.
- Price: **9,500 EGP, fixed.** Cash on delivery. Never discounted, never framed
  as an offer, never shown with strikethrough or was/now markup.
- Published specification (source of truth: `FlagshipShowcase.jsx` `specItems`,
  `MaterialTruth.jsx` `specs`): external 420 × 310 × 120 mm, ±2 mm tolerance;
  volume ≈18 L; weight 1.15–1.30 kg empty; fit 16″ laptop upright; closure #8
  metal U-zip, ≈600 mm track, twin sliders; handles rolled leather, 250 mm,
  100 mm clear drop; strap detachable, 18 mm, adjusts 850–1350 mm; leather
  full-grain, matte, 1.2 mm; hardware 316L brushed stainless steel; base flat,
  reinforced, four steel feet; construction 7–9 SPI.
- Laptop fit is **16″, confirmed** (brand owner, 2026-08-20). CLAUDE.md's Voice
  section previously used a 15-inch sentence as its illustrative example; it was
  rewritten on that date so the guardrail file cannot be cited against the
  published spec. No specification source changed.

**Open and blocking items — do not treat as settled**

- **Price is published wrong across the site.** Reconfirmed by the brand owner
  on 2026-08-20: the price is 9,500 EGP, fixed. `CLAUDE.md` was corrected to
  match on that date. The published surfaces are still stale and contradict it:
  `src/seo/schema.ts:142` (`price: "6500"`), `src/seo/meta.ts:83–84` (6,500 in
  both locales), `src/i18n/content/en.js:101` / `ar.js:118` ("6,500 – 7,000 EGP",
  a range that also violates the fixed-price rule), and
  `src/i18n/content/en.js:389` / `ar.js:408` (6,500 heading). All six must be
  corrected before any price-anchored page ships. The correction has been
  identified but not applied.
- **Leather thickness disagrees between authorities.** Every specification source
  states 1.2 mm (`specItems`, `MaterialTruth.jsx` `specs`, `meta.ts:83`).
  CLAUDE.md's Voice section uses "Full-grain leather, 1.2–1.4 mm" as its
  illustrative example. Same class of conflict as the laptop-fit figure resolved
  on 2026-08-20, but not yet put to the brand owner. Do not publish 1.4 mm
  anywhere until the range is confirmed or the example is corrected to 1.2 mm.
- **No order capture exists.** `src/components/contact/OrderInquiry.jsx:69`
  calls `preventDefault()` and shows the success state on a 450 ms timer. There
  is no fetch, no mailto, no endpoint — every order request submitted today is
  silently discarded while the buyer is told it was received. Intended
  resolution, per the brand owner: an email relay or form backend. The endpoint
  is not chosen and not built.
- **Four content pages are routed but not live.** `src/routes.js` defines
  specification, identify-full-grain-leather, hardware, and price-policy, all
  `ready: false` with TODO body copy. Go-live conditions are in
  `docs/content-plan.md`; the price-policy page is additionally blocked on the
  price correction above.

**Technical constraints**

- No router library and no MDX pipeline. New pages are `.jsx` under
  `src/pages/` sharing `ArticleLayout`, with copy in `src/i18n/content/{en,ar}.js`
  — a decision recorded in `docs/content-plan.md` to avoid a second content
  system.
- Static build only: no server code, no environment variables, no bindings
  (`DEPLOY.md`).
- Schema is generated at build time by `scripts/prerender.mjs` and injected into
  the prerendered HTML, never by client-side JS.

## Brand Commitments

Binding, from `CLAUDE.md`:

- Brand: ENVELOPE. Product: Model No. 0.1. Domain: envelope01.com.
- **Voice:** declarative and evidence-first, closer to a product datasheet than
  to fashion copy. State the specification; let the reader draw the conclusion.
  Governs all copy, meta descriptions, alt text, headings, and schema.
- **Never** use the phrase "genuine leather" or "جلد أصلي" as a quality claim
  anywhere, including meta tags, alt text, and structured data. This is the
  phrase searchers type, and the prohibition holds regardless.
- **Never** write discount, sale, urgency, scarcity, or countdown language.
- **Never** write a material or construction claim that is not verifiable. Where
  a number is not confirmed, write nothing rather than an adjective.
- No model photography, no lifestyle-aspirational copy, no exclamation marks.
- Every claim in a title, description, or schema field must match the published
  specification table exactly. Schema and on-page content must never disagree.
- Placeholder values stay obviously marked TODO. Never invent specifications,
  review counts, ratings, or availability dates to fill a schema field.

Typography is committed in code: IBM Plex Mono and IBM Plex Sans Arabic
(`package.json` dependencies, `src/i18n/fonts.js`).

## Evidence on Hand

**Present**

- Nine product photographs with generated thumbnails, `src/assets/product/`
  (`01-front`, `02-gusset`, `03-top`, `04-interior`, `05-base`, `06-handle`,
  `07-facet`, `08-interior-packed`, `09-strap`). Object photography only,
  consistent with the no-model rule.
- Full specification table, published and internally consistent.
- `docs/keyword-map.md`, `docs/content-plan.md`, `docs/seo-audit.md` — search
  strategy, page architecture with go-live checklists, and audit findings.
- Generated OG image and sitemap (`scripts/generate-og-image.mjs`,
  `scripts/generate-sitemap.mjs`).

**Absent — must not be fabricated**

- No laboratory or field test results. No abrasion, tensile, colorfastness, or
  corrosion testing has been run. Claims like "will never rust" are explicitly
  out of bounds (`docs/content-plan.md`).
- No customer reviews, ratings, testimonials, case studies, or press.
- No verified business WhatsApp number (`src/seo/schema.ts:69`).
- No `priceValidUntil` date, deliberately omitted from schema rather than
  invented.
- No production, sourcing, margin, or COGS figures — which is why the
  price-transparency page was rejected as briefed and reframed as a fixed-price
  policy page.

## Product Principles

1. **A number or nothing.** Where a measurement is not confirmed, write nothing.
   An adjective is never a substitute for a specification.
2. **One value per fact.** On-page copy, meta description, and JSON-LD state the
   same figure. When they disagree, that is a bug, not a variation.
3. **Equip the buyer to verify.** Content teaches a check the reader can perform
   themselves, then reports where this product lands against it. Persuasion is a
   by-product of evidence, never the mechanism.
4. **Both languages are primary.** Arabic carries the same technical precision,
   structure, and completeness as English, with its own numeral and layout
   conventions honored rather than transliterated.
5. **The commercial posture is fixed and stated plainly.** One SKU, one price,
   cash on delivery. No range, no discount, no installments, no scarcity.

## Accessibility & Inclusion

No formal conformance standard has been established for this project — recorded
as undecided rather than assumed.

Existing practice to preserve:

- Full RTL support with locale-aware layout (`src/i18n/`).
- The technical drawings carry descriptive `aria-label` text conveying the same
  dimensional information as the visual callouts (see `gussetAriaLabel`,
  `scaleAriaLabel` in `src/i18n/content/en.js`) — the drawings are load-bearing
  content, not decoration, and any replacement must keep this parity.
- Numerals localize on-page (Eastern Arabic-Indic) while schema.org values stay
  ASCII for machine consumers.
