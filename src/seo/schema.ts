// JSON-LD builders for both locale routes. Every value here is copied
// verbatim from published on-page copy (FlagshipShowcase's spec table,
// MaterialTruth's spec rows, OrderInquiry's colorways, as sourced through
// src/i18n/content/*.js) — nothing is restated or rounded. Fields with no
// confirmed on-page or business value (a real WhatsApp number, a
// price-valid-until date) are omitted rather than filled with a
// placeholder, per CLAUDE.md's SEO rules.
//
// Numerals: every numeric field below (size, price, etc.) stays in ASCII
// digits regardless of locale. This is a deliberate difference from the
// visible /ar/ page, which uses Eastern Arabic-Indic numerals — schema.org
// values are machine-read (structured-data validators, price comparison,
// rich results), so they follow the machine-readable convention rather than
// the on-page numeral-style decision. Don't "fix" this to match the page.
//
// Consumed at build time by scripts/prerender.mjs, which injects the
// output as <script type="application/ld+json"> tags into the prerendered
// dist/en/index.html and dist/ar/index.html — never by client-side JS, so
// the markup is present for crawlers that don't execute anything.

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

const PRODUCT_DESCRIPTION: Record<string, string> = {
  en: "One flat panel per face, folded into four facets. U-zip main compartment. Padded 16″ sleeve. Stands on its own.",
  ar: "لوح مسطح واحد لكل وجه، مطوي إلى أربعة أوجه. حجرة رئيسية بسحاب على شكل U. جيب مبطن للابتوب 16 بوصة. تقف بمفردها.",
};

const COLORS_LOCALIZED: Record<string, string[]> = {
  en: COLORS,
  ar: ["أسود", "عاجي"],
};

// Supplied directly by the brand owner (not present in the repo) — verify
// these resolve to the live profiles before shipping, the same way the
// SEO audit flags the www→apex redirect as a live-only check.
const SAME_AS = [
  "https://www.instagram.com/envelope01/",
  "https://www.facebook.com/envelope01",
];

function localePath(locale: string) {
  return `${SITE_URL}${locale}/`;
}

export function buildOrganizationSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: localePath(locale),
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

export function buildWebsiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ENVELOPE 01",
    url: localePath(locale),
    inLanguage: locale,
  };
}

export function buildBreadcrumbSchema(locale: string) {
  const homeName = locale === "ar" ? "الرئيسية" : "Home";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeName, item: localePath(locale) },
      {
        "@type": "ListItem",
        position: 2,
        name: PRODUCT_NAME,
        item: `${localePath(locale)}#product`,
      },
    ],
  };
}

export function buildProductSchema(imageUrls: string[], locale: string) {
  const colors = COLORS_LOCALIZED[locale] ?? COLORS;
  const propertyName = (en: string, ar: string) => (locale === "ar" ? ar : en);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT_NAME,
    brand: { "@type": "Brand", name: BRAND_NAME },
    description: PRODUCT_DESCRIPTION[locale] ?? PRODUCT_DESCRIPTION.en,
    image: imageUrls,
    material: LEATHER,
    color: colors,
    size: EXTERNAL_SIZE,
    url: `${localePath(locale)}#product`,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: propertyName("Leather", "الجلد"),
        value: LEATHER,
      },
      {
        "@type": "PropertyValue",
        name: propertyName("Hardware", "التجهيزات"),
        value: HARDWARE,
      },
      {
        "@type": "PropertyValue",
        name: propertyName("Stitch Density", "كثافة الغرز"),
        value: STITCH_DENSITY,
      },
      {
        "@type": "PropertyValue",
        name: propertyName("Laptop Fit", "ملاءمة اللابتوب"),
        value: LAPTOP_FIT,
      },
    ],
    offers: {
      "@type": "Offer",
      price: "6500",
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
      url: `${localePath(locale)}#order`,
      // priceValidUntil intentionally omitted: no confirmed expiry date
      // exists anywhere in the repo or brand docs, and CLAUDE.md's SEO
      // rules explicitly forbid inventing availability dates to fill a
      // schema field. Add a real ISO date once one exists.
    },
  };
}

export function buildAllSchemas(imageUrls: string[], locale: string) {
  return [
    buildOrganizationSchema(locale),
    buildWebsiteSchema(locale),
    buildBreadcrumbSchema(locale),
    buildProductSchema(imageUrls, locale),
  ];
}
