import TraceBorder from "../ui/TraceBorder.jsx";
import { PANEL } from "../ui/panel.js";
import useIsNarrow from "../../hooks/useIsNarrow.js";
import CalloutLegend from "../ui/CalloutLegend.jsx";

// Same five facts the plan's leader lines point out, grouped by where they
// sit on the sheet — the two top-edge labels above the figure on a phone,
// the three lower ones below it.
const CALLOUTS_ABOVE = [
  { lines: ["PADDED LAPTOP SLEEVE", "370 × 265, 6 MM FOAM"] },
  { lines: ["CHARCOAL WOVEN LINING"] },
];
const CALLOUTS_BELOW = [
  { lines: ["KEY LEASH"] },
  { lines: ["ORGANISER PANEL", "LEATHER-FACED"] },
  { lines: ["ZIPPED VALUABLES", "200 × 150, FRONT WALL"] },
];

const delay = (s) => ({ animationDelay: `${s}s` });

const CALLOUT = {
  fontSize: 11,
  letterSpacing: "0.14em",
  fontFamily: "'Space Grotesk', sans-serif",
};

const DIM = {
  fontSize: 12,
  letterSpacing: "0.16em",
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

/* View 5 — top down, zip fully open. Drawn at 1.2 px per mm, so the
   420 × 140 mouth is 504 × 168 units.

   On a phone the sheet crops to the mouth and its two dimension lines —
   the five leader callouts ringing it exist to label surfaces the SURFACES
   and POCKETS tables below already spell out in full sentences. */
const PLAN_BOX = "0 0 720 360";
const PLAN_BOX_NARROW = "80 20 610 260";

function InteriorPlanSheet({ narrow }) {
  return (
    <svg
      viewBox={narrow ? PLAN_BOX_NARROW : PLAN_BOX}
      role="img"
      aria-label="Top-down plan of Model 001 with the U-zip fully open: padded laptop sleeve on the back wall, leather-faced organiser panel on the front wall, key leash on the left gusset, and no central divider."
      className="mx-auto block max-h-[46dvh] w-full text-silver"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {/* Mouth — 420 × 140 opened square */}
      <path
        className="bp-draw"
        style={delay(0.1)}
        pathLength="1"
        d="M108 90 H612 V258 H108 Z"
      />

      {/* Lining line — walls and base */}
      <path
        className="bp-draw"
        style={delay(0.7)}
        pathLength="1"
        strokeWidth="0.9"
        d="M116 98 H604 V250 H116 Z"
      />

      {/* Padded laptop sleeve, back wall */}
      <g className="bp-fade" style={delay(1.1)} strokeWidth="0.9">
        <path d="M138 98 V124 H582 V98" />
      </g>

      {/* Organiser panel, front wall — 2 slips, 2 pen slots, 1 card slot */}
      <g className="bp-fade" style={delay(1.3)} strokeWidth="0.9">
        <path d="M138 250 V224 H582 V250" />
        <path d="M232 224 V250" />
        <path d="M326 224 V250" />
        <path d="M356 224 V250" />
        <path d="M386 224 V250" />
        <path d="M488 224 V250" />
      </g>

      {/* Zipped valuables pocket, front wall — concealed behind the organiser */}
      <path
        className="bp-fade"
        style={delay(1.45)}
        strokeWidth="0.75"
        strokeDasharray="5 4"
        d="M350 254 H590"
      />

      {/* Key leash, left gusset */}
      <g className="bp-fade" style={delay(1.5)} strokeWidth="0.9">
        <path d="M116 168 H128" />
        <circle cx="133" cy="168" r="5" />
      </g>

      {/* Both sliders parked at the foot of the gusset tracks */}
      <g className="bp-fade" style={delay(1.55)} strokeWidth="0.9">
        <rect x="96" y="162" width="12" height="12" rx="2" />
        <rect x="612" y="162" width="12" height="12" rx="2" />
      </g>

      <text
        className="bp-fade"
        style={delay(2.4)}
        x="360"
        y="178"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        opacity="0.75"
        fontSize="11"
        letterSpacing="0.2em"
      >
        NO CENTRAL DIVIDER
      </text>

      {/* 420 across the mouth */}
      <g className="bp-fade" style={delay(1.8)} strokeWidth="0.8">
        <path d="M108 68 H612" />
        <path d="M108 62 V74" />
        <path d="M612 62 V74" />
        <text
          x="360"
          y="52"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={DIM}
        >
          420
        </text>
      </g>

      {/* 140 depth */}
      <g className="bp-fade" style={delay(1.85)} strokeWidth="0.8">
        <path d="M650 90 V258" />
        <path d="M644 90 H656" />
        <path d="M644 258 H656" />
        <text
          transform="rotate(90 672 174)"
          x="672"
          y="174"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          style={DIM}
        >
          140
        </text>
      </g>

      {!narrow && (
        <>
          <Callout
            at={2.0}
            leader="M200 110 L140 40 L20 40"
            dot={[200, 110]}
            x={20}
            y={19}
            lines={["PADDED LAPTOP SLEEVE", "370 × 265, 6 MM FOAM"]}
          />
          <Callout
            at={2.1}
            leader="M200 238 L140 306 L20 306"
            dot={[200, 238]}
            x={20}
            y={285}
            lines={["ORGANISER PANEL", "LEATHER-FACED"]}
          />
          <Callout
            at={2.2}
            leader="M133 168 L70 206 L20 206"
            dot={[133, 168]}
            x={20}
            y={198}
            lines={["KEY LEASH"]}
          />
          <Callout
            at={2.25}
            leader="M470 254 L560 322 L700 322"
            dot={[470, 254]}
            x={700}
            y={301}
            anchor="end"
            lines={["ZIPPED VALUABLES", "200 × 150, FRONT WALL"]}
          />
          <Callout
            at={2.3}
            leader="M604 140 L656 40 L700 40"
            dot={[604, 140]}
            x={700}
            y={32}
            anchor="end"
            lines={["CHARCOAL WOVEN LINING"]}
          />
        </>
      )}
    </svg>
  );
}

const SURFACES = [
  {
    surface: "Body lining — walls and base",
    material: "Dense woven, opaque, dark charcoal",
  },
  { surface: "Organiser panel face", material: "Leather, same hide as the shell" },
  { surface: "Pocket mouths and slot edges", material: "Leather-trimmed, edge-finished" },
  { surface: "Laptop sleeve", material: "Woven, 6 mm foam, leather-trimmed mouth" },
];

const POCKETS = [
  { name: "Padded laptop sleeve", where: "Back wall", spec: "370 × 265, retention strap with magnetic tab" },
  { name: "Zipped valuables pocket", where: "Front wall, upper", spec: "200 × 150, leather-faced" },
  { name: "Pen slots ×2", where: "Organiser", spec: "Leather" },
  { name: "Card slot ×1", where: "Organiser", spec: "Leather" },
  { name: "Open slip ×2", where: "Organiser", spec: "Woven, leather-trimmed mouth" },
  { name: "Key leash", where: "Left gusset", spec: "Leather tab, brushed steel clip" },
];

const CLEAR_DIMS = [
  { label: "Main compartment", value: "400 × 290 × 130" },
  { label: "Laptop sleeve", value: "370 × 265" },
  { label: "Front pocket", value: "400 × 110" },
];

export default function InteriorPlan() {
  const narrow = useIsNarrow();

  return (
    <>
      {/* The plan, and why the interior is built this way */}
      <section id="interior" data-panel className={PANEL}>
        <div className="max-w-3xl">
          <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
            03 &mdash; The Interior
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-bone md:text-5xl">
            Medium compartmented. Hybrid materials.
          </h2>
          <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-silver">
            Not all-leather, not all-nylon. A full leather lining adds close to
            200 g on a 1.2 kg bag, on surfaces you touch once a day and look at
            rarely. All-nylon reads cheap the moment the bag is opened &mdash;
            which is the moment you decide whether the price was justified.
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <div className="flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
            <p>Fig. 05 &mdash; Top Down, Zip Fully Open</p>
            <p className="hidden md:block">Plan &mdash; Millimetres</p>
          </div>
          <CalloutLegend items={CALLOUTS_ABOVE} className="mx-auto mt-6 w-full max-w-3xl" />

          <div className="mt-6">
            <div className="mx-auto w-full max-w-3xl">
              <InteriorPlanSheet narrow={narrow} />
            </div>
          </div>

          <CalloutLegend items={CALLOUTS_BELOW} className="mx-auto mt-6 w-full max-w-3xl" />
        </div>
      </section>

      {/* Every surface and every pocket, published */}
      <section id="fittings" data-panel className={PANEL}>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-[11px] uppercase tracking-vast text-silver-dim">
            Surfaces
          </p>
          <dl className="rule-t mt-4 divide-y divide-silver-dim/15">
            {SURFACES.map((row) => (
              <div key={row.surface} className="py-3">
                <dt className="text-sm text-bone md:text-base">{row.surface}</dt>
                <dd className="mt-1 text-xs font-light uppercase leading-relaxed tracking-[0.16em] text-silver">
                  {row.material}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-[11px] uppercase tracking-vast text-silver-dim">
            Interior clear dimensions
          </p>
          <dl className="rule-t mt-4 divide-y divide-silver-dim/15">
            {CLEAR_DIMS.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="text-[11px] uppercase tracking-vast text-silver-dim">
                  {row.label}
                </dt>
                <dd className="text-sm text-bone md:text-base">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-vast text-silver-dim">
            Pockets
          </p>
          <dl className="rule-t mt-4 divide-y divide-silver-dim/15">
            {POCKETS.map((row) => (
              <div key={row.name} className="py-3">
                <dt className="flex items-baseline justify-between gap-4 text-sm text-bone md:text-base">
                  <span>{row.name}</span>
                  <span className="shrink-0 text-[11px] uppercase tracking-vast text-silver-dim">
                    {row.where}
                  </span>
                </dt>
                <dd className="mt-1 text-xs font-light uppercase leading-relaxed tracking-[0.16em] text-silver">
                  {row.spec}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        </div>
      </section>

      {/* Front pocket — the one moving part on the bag */}
      <section id="front-pocket" data-panel className={PANEL}>
      <div className="trace-box bg-carbon px-6 py-12 text-bone md:px-14 md:py-16">
        <TraceBorder className="text-bone/25" />
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
              Fig. 13 &mdash; Front Pocket
            </p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl">
              The flap is not decoration.
            </h3>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-base font-light leading-loose text-silver md:text-lg">
              The upper facet of the front panel is a working flap. It folds
              down on an 18 mm concealed magnetic snap onto a shallow
              organiser: one tall slot, three card slots, one flat slip,
              110 mm deep.
            </p>
            <dl className="rule-t mt-8 divide-y divide-silver-dim/15">
              {[
                {
                  label: "Snap",
                  value:
                    "18 mm concealed, steel backing washer both sides, 30 mm bonded leather patch behind each half",
                },
                {
                  label: "Hinge",
                  value:
                    "Skived to 0.7 mm across the fold, bonded reinforcement strip behind — full thickness cracks white within months",
                },
                {
                  label: "Snap offset",
                  value:
                    "Minimum 40 mm from the card slots, so the magnet never sits against a stripe card or a keycard",
                },
              ].map((row) => (
                <div key={row.label} className="py-4">
                  <dt className="text-[11px] uppercase tracking-vast text-silver-dim">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-sm font-light leading-relaxed text-bone">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-xs font-light uppercase leading-loose tracking-[0.16em] text-silver-dim">
              Carry a card and a receipt here. Your phone belongs in the main
              compartment &mdash; that one stays zipped, which is the point
              that matters on a crowded commute.
            </p>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
