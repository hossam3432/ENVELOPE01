import { Helmet } from "react-helmet-async";
import { getRouteMeta } from "./meta.ts";

const BRAND = "ENVELOPE";

export default function SEO() {
  const meta = getRouteMeta(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <meta name="robots" content={meta.robots} />

      <meta property="og:type" content={meta.openGraph.type} />
      <meta property="og:site_name" content={BRAND} />
      <meta property="og:title" content={meta.openGraph.title} />
      <meta property="og:description" content={meta.openGraph.description} />
      <meta property="og:url" content={meta.openGraph.url} />
      <meta property="og:locale" content={meta.openGraph.locale} />
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
