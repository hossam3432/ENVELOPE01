const SPEC_ITEMS = [
  { label: "Fit", value: "13–15\" laptop, upright" },
  { label: "Closure", value: "Zip" },
  { label: "Carry", value: "Dual top handles + detachable crossbody strap" },
  { label: "Colorway", value: "Graphite / Bone" },
];

export default function FlagshipShowcase() {
  return (
    <section id="product" className="rule-b px-6 py-24 md:px-12 md:py-32">
      <div className="max-w-3xl">
        <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          02 &mdash; The Standing Collection
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-bone md:text-6xl">
          One Model. Built to Carry a Full Day.
        </h2>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-silver">
          A structured tote, unisex, sized for a laptop and a real commute.
          No editions, no waitlist &mdash; made, sold, and restocked like a
          normal product.
        </p>
      </div>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
        <div className="relative flex aspect-square items-center justify-center border border-silver-dim/20 bg-carbon-soft">
          <span className="absolute top-4 left-4 text-[11px] uppercase tracking-vast text-silver-dim">
            Fig. 01
          </span>
          <span className="absolute top-4 right-4 border border-bone/40 px-2 py-1 text-[11px] uppercase tracking-vast text-bone">
            Standing Collection
          </span>
          <span className="font-serif text-6xl text-bone-dim">N&deg;1</span>
          <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-vast text-silver-dim">
            Cairo, EG
          </span>
        </div>

        <div>
          <h3 className="font-serif text-2xl text-bone md:text-3xl">
            The [Placeholder] Tote
          </h3>
          <p className="mt-3 text-xs md:text-[13px] font-light uppercase leading-relaxed tracking-[0.18em] text-silver">
            Full-grain leather. Structured base. Padded interior laptop
            sleeve.
          </p>

          <dl className="rule-t mt-8 divide-y divide-silver-dim/15">
            {SPEC_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 py-4"
              >
                <dt className="text-[11px] uppercase tracking-vast text-silver-dim">
                  {item.label}
                </dt>
                <dd className="text-right text-sm text-bone md:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 font-serif text-3xl text-bone">
            6,500 &ndash; 7,000 EGP
          </p>

          <a
            href="#order"
            className="mt-8 inline-block border border-bone/60 px-8 py-4 text-xs md:text-[13px] uppercase tracking-vast text-bone transition-colors duration-300 hover:bg-bone hover:text-carbon"
          >
            Request to Order
          </a>
        </div>
      </div>
    </section>
  );
}
