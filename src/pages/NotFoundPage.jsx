import ArticleLayout from "../components/layout/ArticleLayout.jsx";
import { useLocale } from "../i18n/LocaleContext.jsx";

// Rendered by src/main.jsx for any locale-prefixed path that matches no
// slug in src/routes.js. Also what scripts/prerender.mjs screenshots to
// produce the static dist/404.html, dist/en/404.html, dist/ar/404.html
// Cloudflare Pages serves (with a real 404 HTTP status) for any unmatched
// request path — see that script for how the mapping to those file names
// works. <SEO /> (via ArticleLayout) picks up noindex + a self-referencing
// canonical for this page automatically from src/seo/meta.ts's `notFound`
// branch, keyed off the same "no route matched" condition.
export default function NotFoundPage() {
  const { t, locale } = useLocale();
  const nf = t.pages.notFound;

  return (
    <ArticleLayout>
      <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
        {nf.eyebrow}
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-bone md:text-5xl">
        {nf.h1}
      </h1>
      <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-silver">
        {nf.body}
      </p>
      <a
        href={`/${locale}/#product`}
        className="mt-10 inline-block border border-bone/60 px-8 py-4 text-xs md:text-[13px] uppercase tracking-vast text-bone transition-colors duration-300 hover:bg-bone hover:text-carbon"
      >
        {nf.cta}
      </a>
    </ArticleLayout>
  );
}
