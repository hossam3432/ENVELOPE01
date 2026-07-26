import TraceBorder from "../ui/TraceBorder.jsx";

const SPECS = [
  {
    label: "Substance",
    value: "1.2–1.4mm Full-Grain Leather.",
    truth: "Ages naturally. Never peels.",
  },
  {
    label: "Structure",
    value: "No rigid board — leather firmness and lining stiffness.",
    truth: "Stands unaided when empty.",
  },
  {
    label: "Hardware",
    value: "Brushed steel zip pulls, D-rings and feet.",
    truth: "Chosen for what the hand registers, not plating grade.",
  },
  {
    label: "Construction",
    value: "7–9 SPI (Stitches Per Inch).",
    truth: "Consistent stitch spacing throughout.",
  },
];

function SpecRow({ spec, index }) {
  return (
    <div className="rule-b group grid grid-cols-12 items-baseline gap-4 py-8 hover:[--rule-color:#a8a6a080] md:py-10">
      <span className="col-span-2 text-[11px] md:text-xs tracking-vast text-silver-dim md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="col-span-10 text-[11px] md:text-xs uppercase tracking-vast text-silver md:col-span-2">
        {spec.label}
      </span>
      <p className="col-span-10 col-start-3 mt-2 font-serif text-2xl leading-snug text-bone md:col-span-5 md:col-start-4 md:mt-0 md:text-3xl">
        {spec.value}
      </p>
      <p className="col-span-10 col-start-3 text-[13px] font-light uppercase leading-relaxed tracking-[0.16em] text-silver-dim md:col-span-4 md:col-start-9 md:text-right">
        {spec.truth}
      </p>
    </div>
  );
}

export default function MaterialTruth() {
  return (
    <section
      id="anatomy"
      className="rule-b px-6 py-24 md:px-12 md:py-32"
    >
      <div className="max-w-3xl">
        <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          03 &mdash; Material Truth
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-bone md:text-6xl">
          The Anatomy of a Daily Investment.
        </h2>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-silver">
          True luxury is absolute transparency. Every material and dimension
          below is published, so you can check it against anything else
          you're considering.
        </p>
      </div>

      <div className="rule-t mt-14 md:mt-20">
        {SPECS.map((spec, i) => (
          <SpecRow key={spec.label} spec={spec} index={i} />
        ))}
      </div>

      {/* The Handover — traced-outline panel */}
      <div className="trace-box mt-14 bg-carbon px-6 py-14 text-bone md:mt-20 md:px-14 md:py-20">
        <TraceBorder className="text-white/25" />
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
  );
}
