// Single source of truth for per-route SEO metadata. Consumed by <SEO /> via
// react-helmet-async, which writes these into <head> at render time — the
// build's `scripts/prerender.mjs` step then serializes the full post-render
// DOM (including <head>) into dist/index.html, so these tags land in the
// static HTML a non-JS crawler receives, not just in the live DOM.
//
// Voice/content rules for every field here: CLAUDE.md ("Brand & SEO
// Guardrails"). Do not add a claim to any field below that isn't already
// verifiable on-page (see docs/seo-audit.md finding 3 for why that matters).

export interface OpenGraphMeta {
  title: string;
  description: string;
  image?: string;
  url: string;
  type: "website" | "article" | "product";
  locale: string;
}

export interface TwitterMeta {
  card: "summary" | "summary_large_image";
  title: string;
  description: string;
  image?: string;
}

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
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

const HOME_TITLE = "ENVELOPE — Structured Leather Work Briefcase | Cairo";

// Order per CLAUDE.md voice rules: leather grade + thickness, laptop fit,
// closure type, price. Values sourced from the published spec table
// (src/components/product/FlagshipShowcase.jsx SPECS) and CLAUDE.md's fixed
// price — not invented.
const HOME_DESCRIPTION =
  "Full-grain leather, 1.2 mm. Fits a 16-inch laptop upright. Folded-envelope front panel with magnetic closure. 6,500 EGP, cash on delivery only.";

export const routes = {
  home: {
    path: "/",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: `${SITE_URL}/`,
    openGraph: {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      image: OG_IMAGE,
      url: `${SITE_URL}/`,
      type: "website",
      locale: "en_EG",
    },
    twitter: {
      card: OG_IMAGE ? "summary_large_image" : "summary",
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      image: OG_IMAGE,
    },
    robots: "index, follow",
  },
} satisfies Record<string, RouteMeta>;

export type RouteKey = keyof typeof routes;

const routeList = Object.values(routes);

export function getRouteMeta(pathname: string): RouteMeta {
  return routeList.find((route) => route.path === pathname) ?? routes.home;
}
