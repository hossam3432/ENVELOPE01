import ArticleLayout from "../components/layout/ArticleLayout.jsx";
import { useLocale } from "../i18n/LocaleContext.jsx";

// Pillar: Material Truth. Explains the 316L stainless designation as a
// material-grade fact (schema.ts's HARDWARE = "316L Brushed stainless
// steel") and how a buyer can verify it. Guardrail: state the grade, not an
// untested performance claim — "316L" is a defined alloy standard; "will
// never rust" is not something we've tested and CLAUDE.md says write
// nothing rather than an unverifiable adjective. See docs/content-plan.md,
// Page 3.
export default function HardwarePage() {
  const { t } = useLocale();
  const p = t.pages.hardware;

  return (
    <ArticleLayout>
      <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
        {p.eyebrow}
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-bone md:text-5xl">
        {p.h1}
      </h1>

      {/* TODO: body copy. What 316L means as an alloy spec, how to check a
          fitting for it, then link back to the Specification page's
          Hardware row and out to #order. */}
    </ArticleLayout>
  );
}
