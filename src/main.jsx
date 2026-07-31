import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import OgImagePage from "./pages/OgImagePage.jsx";
import { LocaleProvider } from "./i18n/LocaleContext.jsx";
import { getLocaleFromPath, LOCALE_DIR, stripLocalePrefix } from "./i18n/locales.js";
import { getRouteBySlug } from "./routes.js";
import { ROUTE_COMPONENTS } from "./routes-components.js";

// Not a real, locale-prefixed page — a fixed 1200x630 layout scripts/
// generate-og-image.mjs screenshots at build time to produce public/og.jpg
// (see src/seo/meta.ts's OG_IMAGE). Disallowed in public/robots.txt.
// Bypasses locale/route resolution entirely: the wordmark this renders is
// the same in both locales, so there's nothing for that logic to do here.
if (window.location.pathname === "/__og-image__/") {
  createRoot(document.getElementById("root")).render(<OgImagePage />);
} else {
  // / is never a real page — it only exists to redirect to /en/.
  // Cloudflare's public/_redirects handles that at the edge in production;
  // this is the client-side fallback for dev/other static hosts that don't
  // honor it.
  if (window.location.pathname === "/") {
    window.location.replace(
      `/en/${window.location.search}${window.location.hash}`
    );
  }

  const locale = getLocaleFromPath(window.location.pathname);

  // Set before React commits so there's no flash of the wrong lang/dir
  // while the bundle parses — <SEO> (via Helmet) sets the same attributes
  // again once mounted, and that's what scripts/prerender.mjs bakes into
  // the static HTML, but this covers the gap on a real (non-prerendered)
  // page load.
  document.documentElement.lang = locale;
  document.documentElement.dir = LOCALE_DIR[locale] ?? "ltr";

  // Everything after the locale prefix picks the page: "/" renders the
  // homepage, anything matching a slug in src/routes.js renders that
  // route's component, anything else renders NotFoundPage — which
  // scripts/prerender.mjs also screenshots to produce the static
  // dist/404.html + dist/<locale>/404.html Cloudflare Pages serves with a
  // real 404 status for any unmatched request path.
  // location.pathname comes back percent-encoded for the non-ASCII Arabic
  // slugs (e.g. "%D8%A7..."), but routes.js stores the raw Arabic string —
  // decode before comparing, or every /ar/ content page 404s into
  // NotFoundPage silently.
  const bareSlug = decodeURIComponent(
    stripLocalePrefix(window.location.pathname)
  ).replace(/^\/|\/$/g, "");
  const route = bareSlug ? getRouteBySlug(locale, bareSlug) : null;
  const Page = route ? ROUTE_COMPONENTS[route.key] : bareSlug ? NotFoundPage : App;

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <HelmetProvider>
        {/* Covers two independent suspensions: LocaleProvider loading this
            locale's content chunk, and Page being a lazy route component
            (src/routes-components.js) — must sit above LocaleProvider, not
            just Page, since LocaleProvider itself suspends now. */}
        <Suspense fallback={null}>
          <LocaleProvider locale={locale}>
            <Page />
          </LocaleProvider>
        </Suspense>
      </HelmetProvider>
    </StrictMode>
  );
}
