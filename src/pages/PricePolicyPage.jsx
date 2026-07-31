import ArticleLayout from "../components/layout/ArticleLayout.jsx";
import { useLocale } from "../i18n/LocaleContext.jsx";

// Pillar: Behind the Make. States the fixed price, cash-on-delivery-only
// payment, and single-SKU pricing (one price regardless of Black/Bone) as a
// policy, not a cost breakdown — we have no verifiable COGS/margin split to
// publish, and CLAUDE.md forbids inventing one.
//
// BLOCKED: src/i18n/content/en.js:101 and the matching ar.js line currently
// publish "6,500 – 7,000 EGP", a range that contradicts CLAUDE.md's fixed
// 6,500 EGP rule and disagrees with schema.ts's hard-coded 6500. Do not
// write this page's body copy until that's resolved — see
// docs/content-plan.md's blocking issue.
export default function PricePolicyPage() {
  const { t } = useLocale();
  const p = t.pages.pricePolicy;

  return (
    <ArticleLayout>
      <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
        {p.eyebrow}
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-bone md:text-5xl">
        {p.h1}
      </h1>

      {/* TODO: body copy, once the price bug above is fixed. What's
          included (the spec as published on the Specification page), what's
          deliberately not offered (installments, discounts), COD only. Link
          back to the Specification page's price row and out to #order. */}
    </ArticleLayout>
  );
}
