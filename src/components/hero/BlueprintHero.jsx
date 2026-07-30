import { PANEL } from "../ui/panel.js";
import useIsNarrow from "../../hooks/useIsNarrow.js";

const delay = (s) => ({ animationDelay: `${s}s` });

const LABEL = {
  fontSize: 12,
  letterSpacing: "0.16em",
  fontFamily: "'Space Grotesk', sans-serif",
};

const CALLOUT = {
  fontSize: 11,
  letterSpacing: "0.14em",
  fontFamily: "'Space Grotesk', sans-serif",
};

const TITLE_CELL = {
  fontSize: 10,
  letterSpacing: "0.14em",
  fontFamily: "'Space Grotesk', sans-serif",
};

const SERIAL = {
  fontSize: 34,
  letterSpacing: "0.2em",
  fontFamily: "'Space Grotesk', sans-serif",
};

/* Sheet geometry. The elevation is drawn at 6/7 px per mm, so the 420 mm
   width of the bag is exactly 360 units and every callout number below is
   the real confirmed dimension. */
const BAG = { left: 180, right: 540, top: 176, bottom: 442 };
const CX = 360;
const CY = 309;

// Leader line + dot + one or two lines of text, right- or left-anchored.
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

/* On a phone the sheet crops to just the drawing — body, handle, and the two
   dimension lines. The wide margins in the full sheet exist to carry leader
   callouts and the title block, and at phone width those would render at
   around 6 CSS pixels. Their information already lives in QUICK_SPECS below
   the figure, so cropping past them loses nothing. */
const SHEET_BOX = "0 0 720 640";
const SHEET_BOX_NARROW = "130 78 480 444";

function ElevationSheet({ narrow }) {
  return (
    <svg
      viewBox={narrow ? SHEET_BOX_NARROW : SHEET_BOX}
      role="img"
      aria-label="Technical front elevation of Model 001, the folded briefcase: 420 by 310 by 140 millimetres, four triangular facets radiating from a centre point, U-shaped zip, one rolled top handle per face."
      className="mx-auto block max-h-[58dvh] w-full text-silver"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {/* Sheet registration marks */}
      <g className="bp-fade" style={delay(0)} strokeWidth="1">
        <path d="M16 32 V16 H32" />
        <path d="M688 16 H704 V32" />
        <path d="M704 608 V624 H688" />
        <path d="M32 624 H16 V608" />
      </g>

      {/* Centre lines — dash-dot, drafting convention */}
      <g
        className="bp-fade"
        style={delay(0.15)}
        strokeWidth="0.7"
        strokeDasharray="14 4 2 4"
        opacity="0.5"
      >
        <path d={`M${CX} 190 V462`} />
        <path d={`M156 ${CY} H564`} />
      </g>

      {/* Body outline — 420 × 310 external */}
      <path
        className="bp-draw"
        style={delay(0.3)}
        pathLength="1"
        d={`M188 ${BAG.top} H532 A8 8 0 0 1 ${BAG.right} 184 V434 A8 8 0 0 1 532 ${BAG.bottom} H188 A8 8 0 0 1 ${BAG.left} 434 V184 A8 8 0 0 1 188 ${BAG.top} Z`}
      />

      {/* Four triangular facets radiating from the centre point */}
      <path
        className="bp-draw"
        style={delay(1.0)}
        pathLength="1"
        strokeWidth="1"
        d={`M${BAG.left} ${BAG.top} L${CX} ${CY} L${BAG.right} ${BAG.top}`}
      />
      <path
        className="bp-draw"
        style={delay(1.15)}
        pathLength="1"
        strokeWidth="1"
        d={`M${BAG.left} ${BAG.bottom} L${CX} ${CY} L${BAG.right} ${BAG.bottom}`}
      />

      {/* Main zip — full width of the top edge */}
      <path
        className="bp-draw"
        style={delay(1.5)}
        pathLength="1"
        strokeWidth="0.9"
        d={`M186 ${BAG.top} H534`}
      />

      {/* Handle — one per face. 250 overall, 100 clear drop, rolled Ø14 */}
      <path
        className="bp-draw"
        style={delay(1.7)}
        pathLength="1"
        d="M292 176 C292 90 428 90 428 176"
      />
      <path
        className="bp-draw"
        style={delay(2.05)}
        pathLength="1"
        strokeWidth="0.8"
        d="M304 176 C304 104 416 104 416 176"
      />

      {/* Brushed steel handle fittings + twin sliders parked at centre */}
      <g className="bp-fade" style={delay(2.3)} strokeWidth="0.9">
        <rect x="286" y="168" width="12" height="20" rx="1.5" />
        <rect x="422" y="168" width="12" height="20" rx="1.5" />
        <path d="M352 176 V182" />
        <rect x="343" y="182" width="9" height="15" rx="2" />
        <path d="M368 176 V182" />
        <rect x="368" y="182" width="9" height="15" rx="2" />
      </g>

      {/* D-rings at the top of each gusset */}
      <g className="bp-fade" style={delay(2.45)} strokeWidth="0.9">
        <circle cx="174" cy="204" r="6" />
        <circle cx="546" cy="204" r="6" />
      </g>

      {/* Concealed magnetic snap at the flap tip */}
      <g className="bp-fade" style={delay(2.55)} strokeWidth="0.9">
        <circle cx={CX} cy={CY} r="8" />
        <circle cx={CX} cy={CY} r="2" fill="currentColor" stroke="none" />
      </g>

      {/* Ground line + four steel feet */}
      <g className="bp-fade" style={delay(2.6)} strokeWidth="0.8">
        <rect x="196" y="442" width="16" height="8" rx="1" />
        <rect x="508" y="442" width="16" height="8" rx="1" />
        <path d="M132 450 H588" opacity="0.55" />
      </g>

      {/* Width — 420 */}
      <g className="bp-fade" style={delay(3.0)} strokeWidth="0.8">
        <path d="M180 486 H540" />
        <path d="M180 479 V493" />
        <path d="M540 479 V493" />
        <text
          x={CX}
          y="510"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={LABEL}
        >
          420
        </text>
      </g>

      {/* Height — 310 */}
      <g className="bp-fade" style={delay(3.05)} strokeWidth="0.8">
        <path d="M566 176 V442" />
        <path d="M559 176 H573" />
        <path d="M559 442 H573" />
        <text
          transform={`rotate(90 590 ${CY})`}
          x="590"
          y={CY}
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={LABEL}
        >
          310
        </text>
      </g>

      <Callout
        at={3.2}
        leader="M240 176 L200 126 L20 126"
        dot={[240, 176]}
        x={20}
        y={118}
        lines={["#8 U-ZIP · TWIN SLIDER"]}
      />
      <Callout
        at={3.3}
        leader="M168 200 L110 170 L20 170"
        dot={[174, 204]}
        x={20}
        y={162}
        lines={["D-RING ×2"]}
      />
      <Callout
        at={3.4}
        leader={`M352 ${CY} L160 262 L20 262`}
        dot={[352, CY]}
        x={20}
        y={236}
        lines={["MAGNETIC SNAP Ø18", "CONCEALED, FLAP TIP"]}
      />
      <Callout
        at={3.6}
        leader="M200 449 L120 466 L20 466"
        dot={[200, 449]}
        x={20}
        y={458}
        lines={["STEEL FEET ×4"]}
      />
      <Callout
        at={3.45}
        leader="M431 172 L510 112 L700 112"
        dot={[428, 174]}
        x={700}
        y={104}
        anchor="end"
        lines={["BRUSHED STEEL FITTING"]}
      />
      <Callout
        at={3.55}
        leader="M270 375 L120 420 L20 420"
        dot={[270, 375]}
        x={20}
        y={385}
        lines={["FOUR FOLDED FACETS", "CREASE SKIVED 0.7"]}
      />

      {/* Title block */}
      <g className="bp-fade" style={delay(3.8)} strokeWidth="0.8">
        <path d="M40 524 H690 V600 H40 Z" />
        <path d="M150 524 V600" />
        <path d="M390 524 V600" />
        <path d="M545 524 V600" />

        <text
          x="95"
          y="545"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={TITLE_CELL}
          opacity="0.7"
        >
          MODEL
        </text>
        <text
          x="95"
          y="583"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={SERIAL}
        >
          001
        </text>

        <text
          x="166"
          y="552"
          fill="currentColor"
          stroke="none"
          style={TITLE_CELL}
        >
          <tspan x="166">FOLDED BRIEFCASE</tspan>
          <tspan x="166" dy="15" opacity="0.7">
            VIEW 1 — FRONT ELEVATION
          </tspan>
          <tspan x="166" dy="15" opacity="0.7">
            DIMENSIONS IN MM · TOL ±2
          </tspan>
        </text>

        <text
          x="404"
          y="552"
          fill="currentColor"
          stroke="none"
          style={TITLE_CELL}
        >
          <tspan x="404">420 × 310 × 140 MM</tspan>
          <tspan x="404" dy="15" opacity="0.7">
            ≈18 L, 1.15–1.30 KG
          </tspan>
          <tspan x="404" dy="15" opacity="0.7">
            FULL-GRAIN 1.2–1.4
          </tspan>
        </text>

        <text
          x="559"
          y="552"
          fill="currentColor"
          stroke="none"
          style={TITLE_CELL}
        >
          <tspan x="559">ZIP TRACK ≈600</tspan>
          <tspan x="559" dy="15" opacity="0.7">
            90 PER GUSSET
          </tspan>
          <tspan x="559" dy="15" opacity="0.7">
            STITCH 7–9 SPI
          </tspan>
        </text>
      </g>
    </svg>
  );
}

const QUICK_SPECS = [
  { label: "External", value: "420 × 310 × 140" },
  { label: "Volume", value: "≈18 L" },
  { label: "Weight", value: "1.15–1.30 kg" },
  { label: "Fits", value: "16″ laptop" },
];

export default function BlueprintHero() {
  const narrow = useIsNarrow();

  return (
    <>
      {/* Panel 1 — the drawing */}
      <section
        id="blueprint"
        data-panel
        className="rule-b relative flex min-h-[100dvh] flex-col justify-center px-6 pt-24 pb-12 md:px-12"
      >
        <div className="flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          <p>Fig. 01 &mdash; Model 001, Front Elevation</p>
          <p className="hidden md:block">
            Tolerance &plusmn;2 MM &mdash; Design Intent
          </p>
        </div>

        <div className="mt-8 md:mt-4">
          <div className="mx-auto w-full max-w-3xl">
            <ElevationSheet narrow={narrow} />
          </div>
        </div>

        <dl className="mx-auto mt-6 grid w-full max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t border-silver-dim/20 pt-6 md:grid-cols-4">
          {QUICK_SPECS.map((spec) => (
            <div key={spec.label}>
              <dt className="text-[11px] uppercase tracking-vast text-silver-dim">
                {spec.label}
              </dt>
              <dd className="mt-2 font-serif text-lg text-bone md:text-xl">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Panel 2 — the headline */}
      <section
        id="statement"
        data-panel
        className={PANEL}
      >
        <div className="max-w-4xl">
          <h1 className="font-serif text-4xl leading-[1.15] text-bone md:text-6xl">
            Structured elegance for the modern workday.
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-silver">
            One flat panel, folded into four triangular facets that meet at a
            single point. A 16&Prime; laptop, a full day&rsquo;s carry, and a
            shape that stands on its own. No external logos. No excess. Just
            pure structural geometry.
          </p>
          <a
            href="#product"
            className="mt-10 inline-block border border-bone/60 px-8 py-4 text-xs md:text-[13px] uppercase tracking-vast text-bone transition-colors duration-300 hover:bg-bone hover:text-carbon"
          >
            View the Briefcase
          </a>
        </div>
      </section>

      {/* Panel 3 — the manifesto */}
      <section
        id="manifesto"
        data-panel
        className={PANEL}
      >
        <div className="max-w-4xl">
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
    </>
  );
}
