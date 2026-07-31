import TraceBorder from "../ui/TraceBorder.jsx";
import { PANEL } from "../ui/panel.js";
import { useLocale } from "../../i18n/LocaleContext.jsx";
import { toArabicIndicDigits } from "../../i18n/digits.js";

function SpecRow({ spec, index, locale }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <div className="rule-b group grid grid-cols-12 items-baseline gap-4 py-2 hover:[--rule-color:#a8a6a080]">
      <span className="col-span-2 font-mono text-[11px] md:text-xs tracking-vast text-silver-dim md:col-span-1">
        {locale === "ar" ? toArabicIndicDigits(number) : number}
      </span>
      <span className="col-span-10 text-[11px] md:text-xs uppercase tracking-vast text-silver md:col-span-2">
        {spec.label}
      </span>
      <p className="col-span-10 col-start-3 mt-1 font-serif text-lg leading-snug text-bone md:col-span-5 md:col-start-4 md:mt-0 md:text-xl">
        {spec.value}
      </p>
      <p className="col-span-10 col-start-3 text-[12px] font-light uppercase leading-snug tracking-[0.16em] text-silver-dim md:col-span-4 md:col-start-9 md:text-end">
        {spec.truth}
      </p>
    </div>
  );
}

export default function MaterialTruth() {
  const { t, locale } = useLocale();
  const a = t.anatomy;

  return (
    <>
      <section id="anatomy" data-panel className={PANEL}>
        <div className="max-w-3xl">
          <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
            {a.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-3xl leading-tight text-bone md:text-4xl">
            {a.h2}
          </h2>
          <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-silver">
            {a.intro}
          </p>
        </div>

        <div className="rule-t mt-5 md:mt-6">
          {a.specs.map((spec, i) => (
            <SpecRow key={spec.label} spec={spec} index={i} locale={locale} />
          ))}
        </div>
      </section>

      {/* The Handover — traced-outline panel */}
      <section id="handover" data-panel className={PANEL}>
      <div className="trace-box bg-carbon px-6 py-12 text-bone md:px-14 md:py-16">
        <TraceBorder className="text-bone/25" />
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
              {a.handoverFig}
            </p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl">
              {a.handoverH3}
            </h3>
          </div>
          <p className="text-base font-light leading-loose text-silver md:col-span-6 md:col-start-6 md:text-lg">
            {a.handoverBody}
          </p>
        </div>
      </div>
      </section>
    </>
  );
}
