# Keyword Map — ENVELOPE Model No. 0.1

Single-SKU site, two locale routes: `/en/` and `/ar/` (see `public/sitemap.xml`). There
are no separate URLs per topic — the site is one scrolling page per locale with
anchored sections (`id="..."` in the component files). "Target page" below means
**route + anchor**, e.g. `/en/#specs`.

## Method and caveat

No search-volume data was used or estimated — none is available to this task. Queries
within each tier are **ranked by strategic fit**: how directly the query matches a
verifiable spec we already publish, and how close the searcher is to the transactional
moment. This is a fit ranking, not a demand ranking. Before media spend or content
build-out, run these strings through a real keyword tool (Google Keyword Planner,
Google Trends EG, or a paid tool with Arabic-Egypt coverage) to get actual volume —
Egyptian Arabic search behavior (Franco-Arabic, dialectal spelling) is undertooled and
estimates from generic Arabic keyword tools will be unreliable regardless.

Per CLAUDE.md: every "spec claim that answers it" cell below is copied verbatim from
current on-page source (`src/i18n/content/en.js`, cross-checked against
`src/seo/schema.ts`). Nothing here is invented. Where the site currently disagrees with
itself, it's flagged inline rather than silently resolved.

**⚠ Price discrepancy found while building this map:** `src/i18n/content/en.js:101`
publishes `"6,500 – 7,000 EGP"` as the on-page price, but `CLAUDE.md` mandates a single
fixed price of 6,500 EGP with no range, discount, or "was/now" framing, and
`src/seo/schema.ts` / `src/seo/meta.ts` both hard-code `6500`. This is a live
brand-guardrail violation, not a keyword-map decision — every price-anchored query
below is mapped assuming the CLAUDE.md figure (6,500 EGP flat) is the one that ships.
Flagging for a fix in `src/i18n/content/en.js` and `ar.js` before any of this content
goes live with paid traffic behind it.

## Site inventory (target anchors referenced throughout)

| Anchor | Section | Content |
|---|---|---|
| `#product` / `#specs` | Model 001 overview + spec table | External size, volume, weight, fit, closure, handles, strap, leather, colorway, hardware, base |
| `#gusset` | Gusset elevation | 120 mm gusset depth, structure |
| `#scale` | Scale reference | 16″ laptop fit, in situ |
| `#strap` | Strap detail | Detachable strap, 18 mm, 850–1350 mm |
| `#interior` | Interior plan | Compartment layout, clear dimensions |
| `#fittings` | Interior fittings | Snap, hinge, snap offset hardware |
| `#front-pocket` | Front pocket | Envelope-panel pocket dimensions |
| `#anatomy` | Material Truth | Substance, geometry, structure, closure, hardware, construction, mass — spec + "truth" pairs |
| `#handover` | Handover statement | Brand/craft framing |
| `#order` | Order Inquiry | Colorways, COD, WhatsApp inquiry form |

None of these are indexable as separate URLs today (no per-anchor canonical, no
fragment-based sitemap entries). Tier 3 below depends on that changing — see its note.

---

## Tier 1 — Transactional

Buyer is actively shopping for a leather laptop bag/briefcase in Egypt. Arabic ranked
above English per brief; Franco-Arabic and common misspellings included since this is
how a large share of Cairo/Giza/Alexandria mobile search actually types.

| Rank | Target | Primary query | Supporting queries | Spec claim that answers it |
|---|---|---|---|---|
| 1 | `/ar/#order` | **شنطة جلد رجالي للاب توب** | شنطة لاب توب جلد \| شنطة جلد رجالي أوفيس \| شنطة سكرتارية جلد رجالي \| shanta jeld ragoly \| shanta laptop jeld \| شنطه جلد رجالى (missing ة) | "جلد كامل الحبة، ١٫٢ مم. يتسع للابتوب ١٦ بوصة بشكل رأسي" (full-grain 1.2 mm, fits 16″ laptop upright) |
| 2 | `/en/#order` | **leather laptop briefcase Egypt** | leather work bag Cairo \| men's leather briefcase Egypt \| leather laptop bag 16 inch Egypt | "Full-grain leather, 1.2 mm. Fits a 16-inch laptop upright." (`src/seo/meta.ts` HOME_DESCRIPTION) |
| 3 | `/ar/#order` | **الدفع عند الاستلام شنطة جلد** (COD leather bag) | شراء شنطة جلد اونلاين مصر \| اشتري شنطة جلد بالتقسيط (misfit — do not target, we don't offer installments) \| دفع عند الاستلام شنط رجالي | "الدفع عند الاستلام فقط" (cash on delivery only) — COD is the dominant trust signal for EG e-commerce; this query cluster converts higher than generic "buy leather bag" |
| 4 | `/ar/#order` | **سعر شنطة جلد رجالي** (price of men's leather bag) | شنطة جلد رجالي السعر \| كام سعر شنطة الاب توب الجلد | 6,500 EGP flat — *contingent on the price-discrepancy fix above; do not publish content anchored to this query until `en.js`/`ar.js` match CLAUDE.md* |
| 5 | `/ar/#order` `/en/#order` | **شنطة جلد القاهرة** / leather bag Cairo | شنطة جلد الجيزة \| شنطة جلد اسكندرية \| leather briefcase Giza \| leather bag Alexandria delivery | Market line: Cairo, Giza, Alexandria (CLAUDE.md) — no on-page copy currently states delivery cities explicitly; **TODO**: confirm whether `#order` should state serviceable cities before this query is targeted with paid spend |
| 6 | `/en/#specs` | **16 inch laptop briefcase Egypt** | briefcase fits 16 inch laptop \| structured leather bag laptop compartment | "Fit — 16″ laptop, upright" (`specItems`) |
| 7 | `/ar/#product` | **شنطة جلد تقف بمفردها** (bag that stands on its own — a differentiator query, low volume, high fit) | شنطة جلد مفيهاش كرتونة (no cardboard/rigid board) | "لا يوجد لوح صلب — حافة ١٢٠ مم، قاعدة مسطحة معززة" (No rigid board — 120 mm gusset, reinforced flat base) |

Note on the banned phrase: Egyptian shoppers commonly type **"جلد طبيعي"** or **"جلد
أصلي"** when they mean "not synthetic/pleather." These are legitimate queries to rank
for — but CLAUDE.md prohibits "جلد أصلي" (and "genuine leather") as a claim anywhere on
the site. The resolution is to let the *specification* answer the query ("Full-grain
leather, 1.2 mm") rather than echoing the searcher's phrase back as a marketing claim.
"جلد طبيعي" is not itself a banned string, but keep any content targeting it strictly
in spec language, not "طبيعي ١٠٠٪" or similar unverifiable framing.

---

## Tier 2 — Comparative

Researching leather grades, corrected vs. full-grain, hardware quality — closer to
consideration than purchase, but high fit because our whole spec table exists to win
exactly this comparison.

| Rank | Target | Primary query | Supporting queries | Spec claim that answers it |
|---|---|---|---|---|
| 1 | `/en/#anatomy` | **full-grain vs corrected-grain leather** | what is full-grain leather \| full grain leather bag meaning \| is full-grain leather better | "1.2mm full-grain leather, matte." / "Ages naturally. Never peels." (`a.specs[0]`, Substance row) |
| 2 | `/ar/#anatomy` | **جلد كامل الحبة يعني ايه** (what does full-grain mean) | الفرق بين الجلد الطبيعي والجلد الصناعي \| جلد فل جرين ولا كوريكتد جرين | Same Substance row, Arabic equivalent in `ar.js` |
| 3 | `/en/#anatomy` | **leather bag hardware grade** | 316L stainless steel hardware meaning \| brushed steel vs plated hardware bag | "Brushed steel fittings, D-rings, sliders and feet." / "Chosen for what the hand registers, not plating grade." (Hardware row) + `316L Brushed stainless steel` (`schema.ts` HARDWARE) |
| 4 | `/ar/#anatomy` | **تجهيزات ستانلس ستيل ٣١٦ للشنط** (316 stainless steel bag hardware) | تجهيزات الشنطة ستانلس ولا مطلي (hardware stainless or plated) | Same Hardware row, Arabic |
| 5 | `/en/#anatomy` | **how many stitches per inch is good leather stitching** | leather bag stitch density \| SPI leather bag quality | "7–9 SPI (Stitches Per Inch)." / "Tolerance ±2mm on every dimension we publish." (Construction row) — niche, technical-buyer query, low volume expected but near-zero competition |
| 6 | `/en/#anatomy` | **leather bag crease cracking** | leather bag folds cracking white \| full grain leather creasing | "Creases skived to 0.7mm so they never crack white." (Geometry row) |

---

## Tier 3 — Problem-led

The functional-failure trigger: "my current bag doesn't fit the laptop / strap is
failing / bag lost its shape." This is a replacement-purchase intent — high commercial
value, but **the site currently has no content built to answer it directly**. The spec
table answers these implicitly (by stating tolerances and construction) but nothing on
`/en/` or `/ar/` speaks to the failure mode in the searcher's own words.

| Rank | Target (proposed) | Primary query | Supporting queries | Spec claim that answers it |
|---|---|---|---|---|
| 1 | **TODO: new FAQ block on `/ar/#specs` or `/ar/#scale`** | **الشنطة مش بتاخد اللاب توب** (bag doesn't fit the laptop) | شنطة اللاب توب ضيقة \| ازاي اعرف الشنطة هتاخد اللاب توب بتاعي \| مقاس شنطة للاب توب ١٦ بوصة | "16″ laptop, upright" + interior clear dim "Laptop sleeve — 370 × 265" (`InteriorPlan.jsx clearDims`) — this is the one tier where the existing `#scale` section (laptop drawn in situ) already does the visual proof; it just isn't indexed as an answer to the failure-mode phrasing |
| 2 | **TODO: same FAQ block** | **leather bag laptop doesn't fit** | briefcase too small for 16 inch laptop \| does this bag fit a 15 inch laptop (answer: spec is stated for 16″ only — do not imply 15″ fit, no 15″ tolerance is published) | Same as above. **Do not** extend this to 15-inch claims — no 15″ dimension is published anywhere in the spec table, so per CLAUDE.md, write nothing rather than infer it |
| 3 | **TODO: new FAQ block near `#strap`** | **حزام شنطة الجلد بيتقطع** (leather bag strap tearing/breaking) | شنطة الحزام بيتفك \| حزام شنطة قابل للفك | "Detachable, 18 mm, adjusts 850–1350 mm" (Strap row) — detachability and the adjuster are the answerable facts; do **not** publish an unverified durability/tensile claim to answer a "does it break" query |
| 4 | **TODO: new FAQ block near `#anatomy`** | **الشنطة الجلد بتفقد شكلها** (leather bag loses its shape) | شنطة جلد بتتعوج لما تفضى \| شنطة مش واقفة لوحدها | "No rigid board — 120mm gusset, reinforced flat base." / "Stands unaided when empty." (Structure row) — this is a direct, already-verified answer; just not surfaced under the problem phrasing |
| 5 | **TODO: new FAQ block** | **leather bag doesn't stand up on its own** | briefcase collapses when empty \| structured bag vs floppy leather bag | Same Structure row as above |
| 6 | **TODO: new FAQ block** | **سوستة الشنطة بتتعلق** (bag zipper jams) | سوستة الشنطة اتقطعت \| زيب الشنطة بيتكسر | "#8 metal U-zip, ≈600 mm track, twin sliders" (Closure row) — only answers "what zip hardware is it," not a jam-prevention claim; don't overreach here |

Recommendation: build one bilingual FAQ/PAA block (`FAQPage` schema candidate) that
answers these six failure modes directly, linking each answer to the existing spec
row/anchor it's sourced from. This closes the only real content gap in the map — every
other tier already has a page that can rank, this one doesn't yet.

---

## Tier 4 — Brand

**Flag: "ENVELOPE" is a highly ambiguous brand string.** It collides with (a) the
generic English word for a paper envelope, and (b) an existing Norwegian menswear/fashion
label also trading as "Envelope" per the brief. Un-qualified "envelope" or "ENVELOPE
bag" queries are not ownable and should not be a target. Every brand query we actually
pursue needs a qualifier — the product name, the domain string, or a geo term.

| Rank | Target | Primary query | Supporting queries | Notes |
|---|---|---|---|---|
| 1 | `/en/` `/ar/` (homepage) | **envelope01** | envelope01.com \| envelope 01 | Exact-match domain string — the single most ownable query we have. `title` tag already targets this pattern (`ENVELOPE — Structured Leather Work Briefcase \| Cairo`) |
| 2 | `/en/` | **ENVELOPE leather bag Egypt** | ENVELOPE briefcase Cairo \| ENVELOPE 01 Egypt \| envelope bag Cairo | Qualifies brand with geo + category to disambiguate from the Norwegian label and from generic "envelope" |
| 3 | `/ar/` | **envelope01 مصر** | envelope مصر شنطة \| envelope01 شنطة جلد \| envelope القاهرة | Franco/English brand token kept as-is (do not transliterate to Arabic script — searchers in this market type Latin-script brand names directly, e.g. "ZARA مصر" pattern) |
| 4 | `/en/#product` | **Model No. 0.1 ENVELOPE** | ENVELOPE Model 001 \| envelope01 model 0.1 | Product-name-qualified variant, lowest volume but zero ambiguity/competition |
| 5 | — do not target | ~~envelope bag~~ / ~~envelope~~ (unqualified) | — | Explicitly excluded: dominated by paper-envelope retailers and the Norwegian fashion label. Any ranking effort here is wasted relative to the qualified variants above |

Qualified strings to standardize on across title tags, `sameAs`, and outreach anchor
text: **"envelope01"**, **"ENVELOPE 01"**, **"ENVELOPE Egypt"**, **"ENVELOPE Cairo"** —
pick one primary qualifier (recommend `envelope01`, since it's already the domain and
matches `src/seo/schema.ts`'s `SITE_URL`) and use it consistently instead of splitting
brand equity across four variants.
