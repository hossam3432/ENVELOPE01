import TraceBorder from "../ui/TraceBorder.jsx";
import { PANEL } from "../ui/panel.js";

const SPECS = [
  {
    label: "Substance",
    value: "1.2mm full-grain leather, matte.",
    truth: "Ages naturally. Never peels.",
  },
  {
    label: "Geometry",
    value: "One flat panel per face, folded into four facets.",
    truth: "Creases skived to 0.7mm so they never crack white.",
  },
  {
    label: "Structure",
    value: "No rigid board — 120mm gusset, reinforced flat base.",
    truth: "Stands unaided when empty.",
  },
  {
    label: "Closure",
    value: "#8 metal U-zip, ≈600mm track, twin sliders.",
    truth: "15mm down each gusset. Opens from either end.",
  },
  {
    label: "Hardware",
    value: "Brushed steel fittings, D-rings, sliders and feet.",
    truth: "Chosen for what the hand registers, not plating grade.",
  },
  {
    label: "Construction",
    value: "7–9 SPI (Stitches Per Inch).",
    truth: "Tolerance ±2mm on every dimension we publish.",
  },
  {
    label: "Mass",
    value: "1.15–1.30kg empty, strap attached.",
    truth: "≈18 litres usable.",
  },
];

function SpecRow({ spec, index }) {
  return (
    <div className="rule-b group grid grid-cols-12 items-baseline gap-4 py-2 hover:[--rule-color:#a8a6a080]">
      <span className="col-span-2 text-[11px] md:text-xs tracking-vast text-silver-dim md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="col-span-10 text-[11px] md:text-xs uppercase tracking-vast text-silver md:col-span-2">
        {spec.label}
      </span>
      <p className="col-span-10 col-start-3 mt-1 font-serif text-lg leading-snug text-bone md:col-span-5 md:col-start-4 md:mt-0 md:text-xl">
        {spec.value}
      </p>
      <p className="col-span-10 col-start-3 text-[12px] font-light uppercase leading-snug tracking-[0.16em] text-silver-dim md:col-span-4 md:col-start-9 md:text-right">
        {spec.truth}
      </p>
    </div>
  );
}

export default function MaterialTruth() {
  return (
    <>
      <section id="anatomy" data-panel className={PANEL}>
        <div className="max-w-3xl">
          <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
            04 &mdash; Material Truth
          </p>
          <h2 className="mt-2 font-serif text-3xl leading-tight text-bone md:text-4xl">
            The Anatomy of a Daily Investment.
          </h2>
          <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-silver">
            True luxury is absolute transparency. Every material and dimension
            below is published, so you can check it against anything else
            you're considering.
          </p>
        </div>

        <div className="rule-t mt-5 md:mt-6">
          {SPECS.map((spec, i) => (
            <SpecRow key={spec.label} spec={spec} index={i} />
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
              Fig. 09 &mdash; Delivery Protocol
            </p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl">
              The Handover.
            </h3>
          </div>
          <p className="text-base font-light leading-loose text-silver md:col-span-6 md:col-start-6 md:text-lg">
            Every Envelope 01 piece arrives in a rigid bone-colored box, enclosed
            in a protective cotton dust bag with the full specification card.
            Payment is collected on delivery &mdash; nothing is charged
            before then.
          </p>
        </div>
      </div>
      </section>
    </>
  );
}
