const delay = (s) => ({ animationDelay: `${s}s` });

const LABEL_STYLE = {
  fontSize: 12,
  letterSpacing: "0.18em",
  fontFamily: "'Space Grotesk', sans-serif",
};

function BlueprintSVG() {
  return (
    <svg
      viewBox="0 0 640 560"
      role="img"
      aria-label="Technical blueprint drawing of the Envelope 01 N°1 structured tote"
      className="w-full text-silver"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {/* Corner registration marks */}
      <g className="bp-fade" style={delay(0)} strokeWidth="1">
        <path d="M16 32 V16 H32" />
        <path d="M608 16 H624 V32" />
        <path d="M624 528 V544 H608" />
        <path d="M32 544 H16 V528" />
      </g>

      {/* Bag body — structural trapezoid */}
      <path
        className="bp-draw"
        style={delay(0.2)}
        pathLength="1"
        d="M170 200 L470 200 L500 470 L140 470 Z"
      />

      {/* Top opening sag line */}
      <path
        className="bp-draw"
        style={delay(1.2)}
        pathLength="1"
        d="M170 200 C230 218 410 218 470 200"
      />

      {/* Gusset fold lines */}
      <path
        className="bp-draw"
        style={delay(1.5)}
        pathLength="1"
        d="M170 200 L205 470"
        strokeWidth="0.8"
      />
      <path
        className="bp-draw"
        style={delay(1.5)}
        pathLength="1"
        d="M470 200 L435 470"
        strokeWidth="0.8"
      />

      {/* Handles */}
      <path
        className="bp-draw"
        style={delay(1.8)}
        pathLength="1"
        d="M250 200 C250 118 390 118 390 200"
      />
      <path
        className="bp-draw"
        style={delay(2.0)}
        pathLength="1"
        d="M262 200 C262 132 378 132 378 200"
        strokeWidth="0.8"
      />

      {/* Stitch lines (dashed — fade in rather than draw) */}
      <g
        className="bp-fade"
        style={delay(2.6)}
        strokeWidth="0.8"
        strokeDasharray="4 4"
      >
        <path d="M178 214 L462 214" />
        <path d="M148 456 L492 456" />
      </g>

      {/* Center crosshair */}
      <g className="bp-fade" style={delay(2.9)} strokeWidth="0.8">
        <circle cx="320" cy="340" r="10" />
        <path d="M320 322 V358 M302 340 H338" />
      </g>

      {/* Bottom dimension line — width */}
      <g className="bp-fade" style={delay(3.1)} strokeWidth="0.8">
        <path d="M140 505 L500 505" />
        <path d="M140 498 V512" />
        <path d="M500 498 V512" />
        <text
          x="320"
          y="530"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={LABEL_STYLE}
        >
          480 MM
        </text>
      </g>

      {/* Right dimension line — height */}
      <g className="bp-fade" style={delay(3.3)} strokeWidth="0.8">
        <path d="M540 200 L540 470" />
        <path d="M533 200 H547" />
        <path d="M533 470 H547" />
        <text
          transform="rotate(90 562 335)"
          x="562"
          y="335"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={LABEL_STYLE}
        >
          270 MM
        </text>
      </g>

      {/* Callout — brushed-steel fitting */}
      <g className="bp-fade" style={delay(3.5)} strokeWidth="0.8">
        <path d="M390 150 L455 96 L580 96" />
        <circle cx="390" cy="150" r="2.5" fill="currentColor" stroke="none" />
        <text
          x="580"
          y="88"
          textAnchor="end"
          fill="currentColor"
          stroke="none"
          style={LABEL_STYLE}
        >
          BRUSHED STEEL
        </text>
      </g>

      {/* Callout — hand-painted edge */}
      <g className="bp-fade" style={delay(3.7)} strokeWidth="0.8">
        <path d="M152 430 L84 400 L84 330" />
        <circle cx="152" cy="430" r="2.5" fill="currentColor" stroke="none" />
        <text
          x="84"
          y="318"
          textAnchor="start"
          fill="currentColor"
          stroke="none"
          style={LABEL_STYLE}
        >
          1.4 MM EDGE
        </text>
      </g>
    </svg>
  );
}

export default function BlueprintHero() {
  return (
    <section
      id="blueprint"
      className="rule-b relative flex min-h-screen flex-col justify-center px-6 pt-28 pb-24 md:px-12"
    >
      <div className="flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
        <p>Fig. 01 &mdash; Structural Object N&deg;1</p>
        <p className="hidden md:block">Scale 1:4 &mdash; Graphite / Bone / Steel</p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-xl md:mt-6">
        <BlueprintSVG />
      </div>

      <div className="mt-16 max-w-4xl md:mt-10">
        <h1 className="font-serif text-4xl leading-[1.15] text-bone md:text-6xl">
          Structured elegance for the modern workday.
        </h1>
        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-silver">
          Minimal leather essentials designed to hold your laptop, organize
          your life, and age beautifully. No external logos. No excess. Just
          pure structural geometry.
        </p>
        <a
          href="#product"
          className="mt-10 inline-block border border-bone/60 px-8 py-4 text-xs md:text-[13px] uppercase tracking-vast text-bone transition-colors duration-300 hover:bg-bone hover:text-carbon"
        >
          View the Tote
        </a>
      </div>

      <div className="rule-t mt-24 max-w-4xl pt-14 md:mt-32">
        <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          Manifesto
        </p>
        <h2 className="mt-6 font-serif text-3xl leading-tight text-bone md:text-5xl">
          We do not decorate. We construct.
        </h2>
        <p className="mt-8 max-w-2xl text-base font-light leading-loose text-silver">
          In a market of identical bags, we asked what happens when structure
          becomes the only signature. Each piece is cut, folded, and finished
          by hand in small Egyptian workshops, built for the private-sector
          professional who values order and quiet authority. One model, made
          and sold on an ongoing basis &mdash; not a limited run.
        </p>
      </div>
    </section>
  );
}
