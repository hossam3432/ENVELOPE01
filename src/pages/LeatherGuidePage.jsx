import ArticleLayout from "../components/layout/ArticleLayout.jsx";
import { useLocale } from "../i18n/LocaleContext.jsx";

// Pillar: Competence Notes (comparative-tier asset in docs/keyword-map.md).
// Teaches a buyer a repeatable way to check for full-grain leather, then
// states our leather meets it at the published thickness. Guardrail: never
// write "genuine leather" or "جلد أصلي" as a claim anywhere on this page —
// CLAUDE.md prohibits it outright, and this is the page most likely to
// attract it by habit since it's the exact phrase competitors use. Answer
// with the verifiable spec ("full-grain, 1.2 mm") instead of the searcher's
// own marketing phrase. See docs/content-plan.md, Page 2.
export default function LeatherGuidePage() {
  const { t } = useLocale();
  const p = t.pages.leatherGuide;

  return (
    <ArticleLayout>
      <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
        {p.eyebrow}
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-bone md:text-5xl">
        {p.h1}
      </h1>

      {/* TODO: body copy. Observable, testable verification criteria only
          (grain irregularity, edge finish, absorbency) — no claims about
          out-testing competitors, no lab results we haven't run. Link back
          to the Specification page's Leather row and out to the Hardware
          page as a sibling verification piece. */}
    </ArticleLayout>
  );
}
