// Single source of truth for per-route, per-locale SEO metadata. Consumed by
// <SEO /> via react-helmet-async, which writes these into <head> at render
// time — the build's `scripts/prerender.mjs` step then serializes the full
// post-render DOM (including <head>) into dist/en/index.html and
// dist/ar/index.html, so these tags land in the static HTML a non-JS
// crawler receives, not just in the live DOM.
//
// Voice/content rules for every field here: CLAUDE.md ("Brand & SEO
// Guardrails"). Do not add a claim to any field below that isn't already
// verifiable on-page (see docs/seo-audit.md finding 3 for why that matters).
// The Arabic description is a direct translation of the English one, not a
// separately-composed one — same figures, same claims, same order.

import { LOCALES, DEFAULT_LOCALE, LOCALE_OG, getLocaleFromPath, stripLocalePrefix } from "../i18n/locales.js";
import { getRouteBySlug } from "../routes.js";

export interface OpenGraphMeta {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: "website" | "article" | "product";
  locale: string;
  alternateLocale: string;
}

export interface TwitterMeta {
  card: "summary" | "summary_large_image";
  title: string;
  description: string;
  image?: string;
}

export interface AlternateLinks {
  en: string;
  ar: string;
  xDefault: string;
}

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  alternates: AlternateLinks;
  openGraph: OpenGraphMeta;
  twitter: TwitterMeta;
  robots: string;
}

const SITE_URL = "https://envelope01.com";

// TODO: no 1200x630 og:image asset exists yet (docs/seo-audit.md, finding 2 —
// twitter:card is currently invalid without one). Once a cropped product
// plate is exported to public/og.jpg, set this to `${SITE_URL}/og.jpg` and
// flip the twitter card below to "summary_large_image".
const OG_IMAGE: string | undefined = undefined;

// Order per CLAUDE.md voice rules: leather grade + thickness, laptop fit,
// closure type, price. Values sourced from the published spec table
// (src/components/product/FlagshipShowcase.jsx SPEC_ITEMS via
// src/i18n/content/*.js) and CLAUDE.md's fixed price — not invented. The
// Arabic string mirrors the English one figure-for-figure; only the
// numeral script differs (Eastern Arabic-Indic, matching the rest of the
// /ar/ route), which is why the digits below are literals rather than
// re-derived — this file is the SEO layer, not where the digit-conversion
// helper lives (see src/i18n/digits.js for that).
const HOME_TITLE: Record<string, string> = {
  en: "ENVELOPE — Structured Leather Work Briefcase | Cairo",
  ar: "ENVELOPE — حقيبة عمل جلدية إنشائية | القاهرة",
};

const HOME_DESCRIPTION: Record<string, string> = {
  en: "Full-grain leather, 1.2 mm. Fits a 16-inch laptop upright. Folded-envelope front panel with magnetic closure. 6,500 EGP, cash on delivery only.",
  ar: "جلد كامل الحبة، ١٫٢ مم. يتسع للابتوب ١٦ بوصة بشكل رأسي. لوح أمامي مطوي على شكل مظروف بإغلاق مغناطيسي. ٦٬٥٠٠ جنيه مصري، الدفع عند الاستلام فقط.",
};

// Per-route title/description for the standalone content pages proposed in
// docs/content-plan.md, keyed the same way as ROUTES in src/routes.js.
// TODO values per CLAUDE.md's placeholder rule — do not invent real copy
// here. Fill each pair in in the same pass that writes that page's body
// copy, then flip the matching entry's `ready` flag in src/routes.js so
// robots switches to "index, follow" below.
const ROUTE_TITLE: Record<string, Record<string, string>> = {
  specification: { en: "TODO", ar: "TODO" },
  "identify-full-grain-leather": { en: "TODO", ar: "TODO" },
  hardware: { en: "TODO", ar: "TODO" },
  "price-policy": { en: "TODO", ar: "TODO" },
};

const ROUTE_DESCRIPTION: Record<string, Record<string, string>> = {
  specification: { en: "TODO", ar: "TODO" },
  "identify-full-grain-leather": { en: "TODO", ar: "TODO" },
  hardware: { en: "TODO", ar: "TODO" },
  "price-policy": { en: "TODO", ar: "TODO" },
};

function homePath(locale: string) {
  return `${SITE_URL}/${locale}/`;
}

function routePath(locale: string, slug: string) {
  return `${SITE_URL}/${locale}/${slug}/`;
}

export function getRouteMeta(pathname: string): RouteMeta {
  const locale = getLocaleFromPath(pathname);
  const alternateLocale = LOCALES.find((l) => l !== locale) ?? DEFAULT_LOCALE;

  // pathname is percent-encoded for the non-ASCII Arabic slugs — decode
  // before comparing against routes.js's raw Arabic strings (see the same
  // fix/comment in src/main.jsx).
  const slug = decodeURIComponent(stripLocalePrefix(pathname)).replace(
    /^\/|\/$/g,
    ""
  );
  const route = slug ? getRouteBySlug(locale, slug) : null;

  const title = route
    ? ROUTE_TITLE[route.key]?.[locale] ?? ROUTE_TITLE[route.key]?.[DEFAULT_LOCALE]
    : HOME_TITLE[locale] ?? HOME_TITLE[DEFAULT_LOCALE];
  const description = route
    ? ROUTE_DESCRIPTION[route.key]?.[locale] ?? ROUTE_DESCRIPTION[route.key]?.[DEFAULT_LOCALE]
    : HOME_DESCRIPTION[locale] ?? HOME_DESCRIPTION[DEFAULT_LOCALE];

  const canonical = route ? routePath(locale, route.slugs[locale]) : homePath(locale);
  const alternates = route
    ? {
        en: routePath("en", route.slugs.en),
        ar: routePath("ar", route.slugs.ar),
        xDefault: routePath(DEFAULT_LOCALE, route.slugs[DEFAULT_LOCALE]),
      }
    : {
        en: homePath("en"),
        ar: homePath("ar"),
        xDefault: homePath(DEFAULT_LOCALE),
      };

  return {
    title,
    description,
    canonical,
    alternates,
    openGraph: {
      title,
      description,
      image: OG_IMAGE,
      url: canonical,
      type: "website",
      locale: LOCALE_OG[locale] ?? LOCALE_OG[DEFAULT_LOCALE],
      alternateLocale: LOCALE_OG[alternateLocale] ?? LOCALE_OG[DEFAULT_LOCALE],
    },
    twitter: {
      card: OG_IMAGE ? "summary_large_image" : "summary",
      title,
      description,
      image: OG_IMAGE,
    },
    // Stub content pages stay noindex until their `ready` flag flips in
    // src/routes.js — publishing an empty TODO page to the index would be
    // worse than not having the page at all.
    robots: route && !route.ready ? "noindex, follow" : "index, follow",
  };
}
