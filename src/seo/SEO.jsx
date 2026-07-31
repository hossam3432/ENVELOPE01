import { Helmet } from "react-helmet-async";
import { getRouteMeta } from "./meta.ts";
import { useLocale } from "../i18n/LocaleContext.jsx";
import { HREFLANG } from "../i18n/locales.js";
import { FONT_PRELOADS } from "../i18n/fonts.js";

const BRAND = "ENVELOPE";

export default function SEO() {
  const { locale, dir } = useLocale();
  const meta = getRouteMeta(
    typeof window !== "undefined" ? window.location.pathname : `/${locale}/`
  );
  const preloads = FONT_PRELOADS[locale] ?? FONT_PRELOADS.en;

  return (
    <Helmet htmlAttributes={{ lang: locale, dir }}>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <meta name="robots" content={meta.robots} />

      {/* Self + counterpart + x-default — required on every page per the
          bilingual SEO spec, baked into the pre-rendered HTML by
          scripts/prerender.mjs. */}
      <link rel="alternate" hrefLang={HREFLANG.en} href={meta.alternates.en} />
      <link rel="alternate" hrefLang={HREFLANG.ar} href={meta.alternates.ar} />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={meta.alternates.xDefault}
      />

      {preloads.map((href) => (
        <link
          key={href}
          rel="preload"
          as="font"
          type="font/woff2"
          href={href}
          crossOrigin="anonymous"
        />
      ))}

      <meta property="og:type" content={meta.openGraph.type} />
      <meta property="og:site_name" content={BRAND} />
      <meta property="og:title" content={meta.openGraph.title} />
      <meta property="og:description" content={meta.openGraph.description} />
      <meta property="og:url" content={meta.openGraph.url} />
      <meta property="og:locale" content={meta.openGraph.locale} />
      <meta
        property="og:locale:alternate"
        content={meta.openGraph.alternateLocale}
      />
      {meta.openGraph.image ? (
        <meta property="og:image" content={meta.openGraph.image} />
      ) : null}

      <meta name="twitter:card" content={meta.twitter.card} />
      <meta name="twitter:title" content={meta.twitter.title} />
      <meta name="twitter:description" content={meta.twitter.description} />
      {meta.twitter.image ? (
        <meta name="twitter:image" content={meta.twitter.image} />
      ) : null}
    </Helmet>
  );
}
