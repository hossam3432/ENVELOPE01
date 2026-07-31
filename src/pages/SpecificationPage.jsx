import ArticleLayout from "../components/layout/ArticleLayout.jsx";
import { useLocale } from "../i18n/LocaleContext.jsx";

// Pillar: Function Proof. The master, indexable spec sheet — every
// dimension, tolerance, and material fact already published piecemeal
// across the homepage (#specs, #anatomy, #interior) consolidated onto one
// page. Every other content page links back here for the source figure;
// this page should never restate a number that disagrees with
// FlagshipShowcase.jsx's specItems or MaterialTruth.jsx's specs.
// See docs/content-plan.md, Page 1, for the full brief.
export default function SpecificationPage() {
  const { t } = useLocale();
  const p = t.pages.specification;

  return (
    <ArticleLayout>
      <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
        {p.eyebrow}
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-bone md:text-5xl">
        {p.h1}
      </h1>

      {/* TODO: body copy. Full spec table (reuse the same figures as
          FlagshipShowcase's specItems and MaterialTruth's specs — do not
          retype them by hand), then links out to the hardware and
          leather-guide pages from the relevant rows, and to #order for the
          buy CTA. */}
    </ArticleLayout>
  );
}
