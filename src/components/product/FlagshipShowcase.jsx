const delay = (s) => ({ animationDelay: `${s}s` });

const NOTE = {
  fontSize: 10,
  letterSpacing: "0.14em",
  fontFamily: "'Space Grotesk', sans-serif",
};

const NOTE_SM = {
  fontSize: 9,
  letterSpacing: "0.1em",
  fontFamily: "'Space Grotesk', sans-serif",
};

const DIM = {
  fontSize: 12,
  letterSpacing: "0.16em",
  fontFamily: "'Space Grotesk', sans-serif",
};

const CALLOUT = {
  fontSize: 11,
  letterSpacing: "0.14em",
  fontFamily: "'Space Grotesk', sans-serif",
};

function Callout({ leader, dot, x, y, anchor = "start", lines, at }) {
  return (
    <g className="bp-fade" style={delay(at)} strokeWidth="0.8">
      <path d={leader} />
      <circle
        cx={dot[0]}
        cy={dot[1]}
        r="2.5"
        fill="currentColor"
        stroke="none"
      />
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fill="currentColor"
        stroke="none"
        style={CALLOUT}
      >
        {lines.map((line, i) => (
          <tspan key={line} x={x} dy={i === 0 ? 0 : 13}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

/* View 3 — right gusset, drawn at 0.7 px per mm.
   140 deep × 310 high, zip running 90 down from the top edge. */
function GussetElevation() {
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Right gusset elevation: 140 millimetre depth, zip running 90 millimetres down from the top edge to a leather garage above the facet fold line, D-ring at the top, two of the four steel feet visible."
      className="h-full w-full text-silver"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      {/* Gusset panel — 140 × 310 */}
      <path
        className="bp-draw"
        style={delay(0.1)}
        pathLength="1"
        d="M156 90 H244 A5 5 0 0 1 249 95 V302 A5 5 0 0 1 244 307 H156 A5 5 0 0 1 151 302 V95 A5 5 0 0 1 156 90 Z"
      />

      {/* Handles, edge on */}
      <path
        className="bp-draw"
        style={delay(0.6)}
        pathLength="1"
        d="M195 90 V27 A5 5 0 0 1 205 27 V90"
      />

      {/* Zip run down the gusset — 90, terminating in a leather garage */}
      <g className="bp-fade" style={delay(1.0)} strokeWidth="0.9">
        <path d="M200 90 V150" />
        <rect x="195" y="150" width="10" height="12" rx="2" />
        <rect x="196" y="96" width="8" height="13" rx="2" />
      </g>

      {/* Facet fold line — the zip terminus must stay above it */}
      <path
        className="bp-fade"
        style={delay(1.2)}
        strokeWidth="0.9"
        d="M151 182 H249"
      />

      {/* D-ring on a leather tab */}
      <g className="bp-fade" style={delay(1.3)} strokeWidth="0.9">
        <path d="M168 90 V100" />
        <circle cx="168" cy="106" r="6" />
      </g>

      {/* Two of the four feet */}
      <g className="bp-fade" style={delay(1.4)} strokeWidth="0.9">
        <rect x="157" y="307" width="11" height="6" rx="1" />
        <rect x="232" y="307" width="11" height="6" rx="1" />
        <path d="M130 313 H270" opacity="0.5" />
      </g>

      {/* 90 zip run */}
      <g className="bp-fade" style={delay(1.6)} strokeWidth="0.8">
        <path d="M132 90 V150" />
        <path d="M126 90 H138" />
        <path d="M126 150 H138" />
        <text
          x="120"
          y="124"
          textAnchor="end"
          fill="currentColor"
          stroke="none"
          style={NOTE}
        >
          90
        </text>
      </g>

      {/* 310 height */}
      <g className="bp-fade" style={delay(1.65)} strokeWidth="0.8">
        <path d="M98 90 V307" />
        <path d="M92 90 H104" />
        <path d="M92 307 H104" />
        <text
          transform="rotate(90 80 198)"
          x="80"
          y="198"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={DIM}
        >
          310
        </text>
      </g>

      {/* 140 depth */}
      <g className="bp-fade" style={delay(1.7)} strokeWidth="0.8">
        <path d="M151 340 H249" />
        <path d="M151 334 V346" />
        <path d="M249 334 V346" />
        <text
          x="200"
          y="364"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={DIM}
        >
          140
        </text>
      </g>

      {/* Fold-line note */}
      <g className="bp-fade" style={delay(1.9)} strokeWidth="0.8">
        <path d="M249 182 L280 220 L392 220" />
        <text
          x="284"
          y="200"
          fill="currentColor"
          stroke="none"
          style={NOTE_SM}
        >
          <tspan x="284">FACET FOLD —</tspan>
          <tspan x="284" dy="12" opacity="0.75">
            ZIP ENDS ABOVE IT
          </tspan>
        </text>
      </g>
    </svg>
  );
}

/* View 15 — scale reference, 0.7 px per mm. The 16″ laptop is drawn as a
   hidden outline inside the bag: 356 × 249 closed, seated 25 below the zip. */
function ScaleReference() {
  return (
    <svg
      viewBox="0 0 720 370"
      role="img"
      aria-label="Scale reference: a closed 16-inch laptop, 356 by 249 millimetres, shown as a hidden outline inside the 420 by 310 millimetre body, seated 25 millimetres below the zip line."
      className="w-full text-silver"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {/* Body */}
      <path
        className="bp-draw"
        style={delay(0.1)}
        pathLength="1"
        d="M217 90 H497 A7 7 0 0 1 504 97 V300 A7 7 0 0 1 497 307 H217 A7 7 0 0 1 210 300 V97 A7 7 0 0 1 217 90 Z"
      />

      {/* Facets */}
      <g className="bp-draw" style={delay(0.7)} strokeWidth="0.9">
        <path pathLength="1" d="M210 90 L357 198 L504 90" />
        <path pathLength="1" d="M210 307 L357 198 L504 307" />
      </g>

      {/* Handles */}
      <g className="bp-draw" style={delay(1.0)} strokeWidth="1">
        <path pathLength="1" d="M294 90 C294 20 346 20 346 90" />
        <path pathLength="1" d="M368 90 C368 20 420 20 420 90" />
      </g>

      {/* Feet and ground */}
      <g className="bp-fade" style={delay(1.3)} strokeWidth="0.8">
        <rect x="222" y="307" width="12" height="6" rx="1" />
        <rect x="480" y="307" width="12" height="6" rx="1" />
        <path d="M180 313 H534" opacity="0.5" />
      </g>

      {/* 16″ laptop, closed — hidden outline */}
      <rect
        className="bp-fade"
        style={delay(1.5)}
        x="233"
        y="108"
        width="249"
        height="174"
        strokeWidth="0.9"
        strokeDasharray="6 4"
      />

      {/* 420 */}
      <g className="bp-fade" style={delay(1.9)} strokeWidth="0.8">
        <path d="M210 336 H504" />
        <path d="M210 330 V342" />
        <path d="M504 330 V342" />
        <text
          x="357"
          y="358"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={DIM}
        >
          420
        </text>
      </g>

      <Callout
        at={2.1}
        leader="M300 99 L180 120 L20 120"
        dot={[300, 99]}
        x={20}
        y={99}
        lines={["25 CLEARANCE", "BELOW THE ZIP LINE"]}
      />
      <Callout
        at={2.2}
        leader="M233 210 L160 240 L20 240"
        dot={[233, 210]}
        x={20}
        y={219}
        lines={["PADDED SLEEVE", "370 × 265, 6 MM FOAM"]}
      />
      <Callout
        at={2.3}
        leader="M482 230 L560 255 L700 255"
        dot={[482, 230]}
        x={700}
        y={234}
        anchor="end"
        lines={["16″ LAPTOP, CLOSED", "356 × 249"]}
      />
    </svg>
  );
}

/* View 12 — the detachable strap, laid flat. 20 wide, swivel clip at each
   end, centre slide adjuster, adjusting 850–1350. */
function StrapFlat() {
  return (
    <svg
      viewBox="0 0 720 150"
      role="img"
      aria-label="The detachable shoulder strap laid flat: 20 millimetres wide, brushed steel swivel clip at each end, centre slide adjuster, adjusting from 850 to 1350 millimetres."
      className="w-full text-silver"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {/* Strap body */}
      <path
        className="bp-draw"
        style={delay(0.1)}
        pathLength="1"
        d="M118 53 H602 V73 H118 Z"
      />

      {/* Swivel clips */}
      <g className="bp-fade" style={delay(0.9)} strokeWidth="0.9">
        <circle cx="72" cy="63" r="11" />
        <path d="M83 57 H100 A5 5 0 0 1 105 62 V64 A5 5 0 0 1 100 69 H83 Z" />
        <path d="M105 55 H118 V71 H105 Z" />
        <circle cx="648" cy="63" r="11" />
        <path d="M637 57 H620 A5 5 0 0 0 615 62 V64 A5 5 0 0 0 620 69 H637 Z" />
        <path d="M615 55 H602 V71 H615 Z" />
      </g>

      {/* Centre slide adjuster */}
      <g className="bp-fade" style={delay(1.1)} strokeWidth="0.9">
        <rect x="336" y="47" width="48" height="32" rx="3" />
        <path d="M360 47 V79" />
      </g>

      {/* 850–1350 */}
      <g className="bp-fade" style={delay(1.4)} strokeWidth="0.8">
        <path d="M61 110 H659" />
        <path d="M61 104 V116" />
        <path d="M659 104 V116" />
        <text
          x="360"
          y="134"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={DIM}
        >
          850 – 1350
        </text>
      </g>

      {/* 20 wide */}
      <g className="bp-fade" style={delay(1.5)} strokeWidth="0.8">
        <path d="M200 53 L160 24 L40 24" />
        <circle cx="200" cy="53" r="2.5" fill="currentColor" stroke="none" />
        <text
          x="40"
          y="16"
          fill="currentColor"
          stroke="none"
          style={CALLOUT}
        >
          20 WIDE
        </text>
      </g>
    </svg>
  );
}

const SPEC_ITEMS = [
  { label: "External", value: "420 × 310 × 140 mm" },
  { label: "Volume", value: "≈18 L" },
  { label: "Weight", value: "1.15–1.30 kg, empty" },
  { label: "Fit", value: "16″ laptop, upright" },
  { label: "Closure", value: "#8 metal U-zip, ≈600 mm track, twin sliders" },
  { label: "Handles", value: "Rolled leather, 250 mm, 100 mm clear drop" },
  { label: "Strap", value: "Detachable, 20 mm, adjusts 850–1350 mm" },
  { label: "Leather", value: "Full-grain, matte, 1.2–1.4 mm" },
  { label: "Hardware", value: "Brushed steel throughout" },
  { label: "Base", value: "Flat, reinforced, four steel feet" },
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
          A structured briefcase, unisex, sized around a 16&Prime; laptop and
          a real commute. No editions, no waitlist &mdash; made, sold, and
          restocked like a normal product.
        </p>
      </div>

      <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
        <div className="relative flex aspect-square items-center justify-center border border-silver-dim/20 bg-carbon-soft p-6">
          <span className="absolute top-4 left-4 text-[11px] uppercase tracking-vast text-silver-dim">
            Fig. 03
          </span>
          <span className="absolute top-4 right-4 border border-bone/40 px-2 py-1 text-[11px] uppercase tracking-vast text-bone">
            Right Gusset
          </span>
          <GussetElevation />
          <span className="absolute bottom-4 left-4 text-[11px] uppercase tracking-vast text-silver-dim">
            Cairo, EG
          </span>
        </div>

        <div>
          <h3 className="font-serif text-2xl text-bone md:text-3xl">
            Model 0.1 &mdash; The Folded Briefcase
          </h3>
          <p className="mt-3 text-xs md:text-[13px] font-light uppercase leading-relaxed tracking-[0.18em] text-silver">
            One flat panel per face, folded into four facets. U-zip main
            compartment. Padded 16&Prime; sleeve. Stands on its own.
          </p>

          <dl className="rule-t mt-8 divide-y divide-silver-dim/15">
            {SPEC_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 py-4"
              >
                <dt className="shrink-0 text-[11px] uppercase tracking-vast text-silver-dim">
                  {item.label}
                </dt>
                <dd className="text-right text-sm text-bone md:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs font-light leading-loose tracking-[0.14em] text-silver-dim uppercase">
            All external, in millimetres. Tolerance &plusmn;2 mm.
          </p>

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

      {/* Scale reference — does the laptop actually fit */}
      <div className="rule-t mt-20 pt-14 md:mt-28">
        <div className="flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          <p>Fig. 15 &mdash; Scale Reference</p>
          <p className="hidden md:block">16&Prime; Laptop In Situ</p>
        </div>
        <div className="-mx-6 mt-8 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0">
          <div className="mx-auto w-full max-w-3xl min-w-[600px]">
            <ScaleReference />
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-silver">
          A closed 16&Prime; laptop is 356 mm wide and 249 mm high. The padded
          sleeve is 370 &times; 265, and the laptop seats 25 mm below the zip
          line &mdash; so the track never runs across the lid when you close
          the bag.
        </p>
      </div>

      {/* The strap */}
      <div className="rule-t mt-16 pt-14 md:mt-24">
        <div className="flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          <p>Fig. 12 &mdash; Strap, Laid Flat</p>
          <p className="hidden md:block">Detachable</p>
        </div>
        <div className="-mx-6 mt-8 overflow-x-auto px-6 md:mx-0 md:overflow-visible md:px-0">
          <div className="mx-auto w-full max-w-3xl min-w-[560px]">
            <StrapFlat />
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-silver">
          20 mm leather, brushed steel swivel clips at both ends, centre slide
          adjuster. It adjusts from 850 to 1350 mm &mdash; a 55 cm maximum
          drop, which is crossbody on a tall wearer. Unclip it and the bag is
          a briefcase again.
        </p>
      </div>
    </section>
  );
}
