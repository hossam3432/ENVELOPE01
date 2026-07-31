import { lazy } from "react";

// Route key -> page component. Kept separate from src/routes.js (pure data)
// so that file can be imported from src/seo/meta.ts without pulling these
// components — and their ArticleLayout -> SEO.jsx -> meta.ts chain — into
// an import cycle. Only src/main.jsx needs this mapping.
//
// Lazy-loaded: none of these pages render on the homepage route, so they
// (and the ArticleLayout chain each one drags in) have no business sitting
// in the main bundle every visitor downloads to see the homepage. Each key
// becomes its own chunk, fetched only when that route's slug is hit —
// src/main.jsx renders whichever component this resolves to inside a
// <Suspense>.
export const ROUTE_COMPONENTS = {
  specification: lazy(() => import("./pages/SpecificationPage.jsx")),
  "identify-full-grain-leather": lazy(() =>
    import("./pages/LeatherGuidePage.jsx")
  ),
  hardware: lazy(() => import("./pages/HardwarePage.jsx")),
  "price-policy": lazy(() => import("./pages/PricePolicyPage.jsx")),
};
