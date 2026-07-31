// Pure route metadata for the standalone content pages proposed in
// docs/content-plan.md — key, content pillar, per-locale slug, and whether
// the page is ready to be indexed. Deliberately has no component imports so
// src/seo/meta.ts can import this without pulling every page component (and
// their ArticleLayout -> SEO.jsx -> meta.ts chain) into an import cycle.
// See src/routes-components.js for the key -> component mapping used by
// src/main.jsx.

export const ROUTES = [
  {
    key: "specification",
    pillar: "function-proof",
    slugs: { en: "specification", ar: "المواصفات" },
    // Flip to true only once real body copy + meta.ts title/description
    // ship together — see docs/content-plan.md's go-live checklist.
    ready: false,
  },
  {
    key: "identify-full-grain-leather",
    pillar: "competence-notes",
    slugs: { en: "how-to-identify-full-grain-leather", ar: "التعرف-على-جلد-كامل-الحبة" },
    ready: false,
  },
  {
    key: "hardware",
    pillar: "material-truth",
    slugs: { en: "316-stainless-hardware", ar: "تجهيزات-استانلس-ستيل-316" },
    ready: false,
  },
  {
    key: "price-policy",
    pillar: "behind-the-make",
    slugs: { en: "fixed-price-policy", ar: "سياسة-السعر-الثابت" },
    // Also blocked on the price-range bug flagged in docs/content-plan.md —
    // do not flip this before that's resolved.
    ready: false,
  },
];

export function getRouteBySlug(locale, slug) {
  return ROUTES.find((route) => route.slugs[locale] === slug) ?? null;
}

export function getRouteByKey(key) {
  return ROUTES.find((route) => route.key === key) ?? null;
}
