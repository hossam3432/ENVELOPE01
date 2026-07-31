// JSON-LD builders for the single-page site. Every value here is copied
// verbatim from published on-page copy (FlagshipShowcase's spec table,
// MaterialTruth's spec rows, OrderInquiry's colorways) — nothing is
// restated or rounded. Fields with no confirmed on-page or business value
// (a real WhatsApp number, a price-valid-until date) are omitted rather
// than filled with a placeholder, per CLAUDE.md's SEO rules.
//
// Consumed at build time by scripts/prerender.mjs, which injects the
// output as <script type="application/ld+json"> tags into the prerendered
// dist/index.html — never by client-side JS, so the markup is present for
// crawlers that don't execute anything.

export const SITE_URL = "https://envelope01.com/";
const BRAND_NAME = "ENVELOPE";
const PRODUCT_NAME = "Model No. 0.1";

// Verified against FlagshipShowcase.jsx's SPEC_ITEMS dl and MaterialTruth.jsx's
// SPECS rows — the two places on the page that state these numbers.
const EXTERNAL_SIZE = "420 × 310 × 120 mm";
const LEATHER = "Full-grain, matte, 1.2 mm";
const HARDWARE = "316L Brushed stainless steel";
const STITCH_DENSITY = "7–9 SPI (Stitches Per Inch)";
const LAPTOP_FIT = "16″ laptop, upright";
const COLORS = ["Black", "Bone"];

// Copied verbatim from the paragraph under the "Model 001 — The Folded
// Briefcase" heading (FlagshipShowcase.jsx), not written fresh for schema.
const PRODUCT_DESCRIPTION =
  "One flat panel per face, folded into four facets. U-zip main compartment. Padded 16″ sleeve. Stands on its own.";

// Supplied directly by the brand owner (not present in the repo) — verify
// these resolve to the live profiles before shipping, the same way the
// SEO audit flags the www→apex redirect as a live-only check.
const SAME_AS = [
  "https://www.instagram.com/envelope01/",
  "https://www.facebook.com/envelope01",
];

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: SITE_URL,
    // favicon.svg is the only brand-mark asset in the repo. Google's
    // structured-data guidelines don't list SVG as a supported logo
    // format — swap for a PNG once one exists (same gap as the SEO
    // audit's favicon finding).
    logo: `${SITE_URL}favicon.svg`,
    areaServed: "EG",
    sameAs: SAME_AS,
    // No business WhatsApp number is published anywhere on the site or in
    // the repo — only a form field where the customer enters their own
    // number. Omitted rather than invented; add contactPoint once a real
    // number exists.
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ENVELOPE 01",
    url: SITE_URL,
    inLanguage: ["en"],
  };
}

export function buildBreadcrumbSchema() {
  // The site is architecturally one URL (no router — see docs/seo-audit.md
  // Finding 6), so the second crumb points at the in-page #product anchor
  // rather than a distinct route. That's an accurate description of the
  // structure, not a fabricated one.
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: PRODUCT_NAME,
        item: `${SITE_URL}#product`,
      },
    ],
  };
}

export function buildProductSchema(imageUrls: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT_NAME,
    brand: { "@type": "Brand", name: BRAND_NAME },
    description: PRODUCT_DESCRIPTION,
    image: imageUrls,
    material: LEATHER,
    color: COLORS,
    size: EXTERNAL_SIZE,
    url: `${SITE_URL}#product`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Leather", value: LEATHER },
      { "@type": "PropertyValue", name: "Hardware", value: HARDWARE },
      {
        "@type": "PropertyValue",
        name: "Stitch Density",
        value: STITCH_DENSITY,
      },
      { "@type": "PropertyValue", name: "Laptop Fit", value: LAPTOP_FIT },
    ],
    offers: {
      "@type": "Offer",
      price: "6500",
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}#order`,
      // priceValidUntil intentionally omitted: no confirmed expiry date
      // exists anywhere in the repo or brand docs, and CLAUDE.md's SEO
      // rules explicitly forbid inventing availability dates to fill a
      // schema field. Add a real ISO date once one exists.
    },
  };
}

export function buildAllSchemas(imageUrls: string[]) {
  return [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildBreadcrumbSchema(),
    buildProductSchema(imageUrls),
  ];
}
