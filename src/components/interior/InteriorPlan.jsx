import TraceBorder from "../ui/TraceBorder.jsx";
import { PANEL } from "../ui/panel.js";
import useIsNarrow from "../../hooks/useIsNarrow.js";
import CalloutLegend from "../ui/CalloutLegend.jsx";
import { useLocale } from "../../i18n/LocaleContext.jsx";

const delay = (s) => ({ animationDelay: `${s}s` });

const CALLOUT = {
  fontSize: 11,
  letterSpacing: "0.14em",
  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
};

const DIM = {
  fontSize: 12,
  letterSpacing: "0.16em",
  fontFamily: "'IBM Plex Mono', monospace",
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
   420 × 120 mouth is 504 × 168 units.

   On a phone the sheet crops to the mouth and its two dimension lines —
   the five leader callouts ringing it exist to label surfaces the SURFACES
   and POCKETS tables below already spell out in full sentences. */
const PLAN_BOX = "0 0 720 360";
const PLAN_BOX_NARROW = "80 20 610 260";

function InteriorPlanSheet({ narrow }) {
  const { t } = useLocale();
  const it = t.interior;
  return (
    <svg
      viewBox={narrow ? PLAN_BOX_NARROW : PLAN_BOX}
      role="img"
      aria-label={it.ariaLabel}
      className="bp-sheet mx-auto block max-h-[38dvh] w-full text-silver"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      {/* Mouth — 420 × 120 opened square */}
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

      {/* Central divider — full height, splits the main compartment in two */}
      <path
        className="bp-draw"
        style={delay(1.35)}
        pathLength="1"
        strokeWidth="0.9"
        d="M360 124 V224"
      />

      <text
        className="bp-fade"
        style={delay(2.4)}
        x="460"
        y="178"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        opacity="0.75"
        fontSize="11"
        letterSpacing="0.2em"
      >
        {it.centralDividerLabel}
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
          {it.widthNote}
        </text>
      </g>

      {/* 120 depth */}
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
          {it.depthNote}
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
            lines={it.calloutsAbove[0].lines}
          />
          <Callout
            at={2.1}
            leader="M200 238 L140 306 L20 306"
            dot={[200, 238]}
            x={20}
            y={285}
            lines={it.calloutsBelow[1].lines}
          />
          <Callout
            at={2.2}
            leader="M133 168 L70 206 L20 206"
            dot={[133, 168]}
            x={20}
            y={198}
            lines={it.calloutsBelow[0].lines}
          />
          <Callout
            at={2.25}
            leader="M470 254 L560 322 L700 322"
            dot={[470, 254]}
            x={700}
            y={301}
            anchor="end"
            lines={it.calloutsBelow[2].lines}
          />
          <Callout
            at={2.3}
            leader="M604 140 L656 40 L700 40"
            dot={[604, 140]}
            x={700}
            y={32}
            anchor="end"
            lines={it.calloutsAbove[1].lines}
          />
        </>
      )}
    </svg>
  );
}

export default function InteriorPlan() {
  const narrow = useIsNarrow();
  const { t } = useLocale();
  const it = t.interior;

  return (
    <>
      {/* The plan, and why the interior is built this way */}
      <section id="interior" data-panel className={PANEL}>
        <div className="max-w-3xl">
          <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
            {it.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-bone md:text-5xl">
            {it.h2}
          </h2>
          <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-silver">
            {it.intro}
          </p>
        </div>

        <div className="mt-6 md:mt-8">
          <div className="flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
            <p>{it.figCaption}</p>
            <p className="hidden md:block">{it.planLabel}</p>
          </div>
          <CalloutLegend items={it.calloutsAbove} className="mx-auto mt-4 w-full max-w-3xl" />

          <div className="mt-4">
            <div className="mx-auto w-full max-w-3xl">
              <InteriorPlanSheet narrow={narrow} />
            </div>
          </div>

          <CalloutLegend items={it.calloutsBelow} className="mx-auto mt-4 w-full max-w-3xl" />
        </div>
      </section>

      {/* Every surface and every pocket, published */}
      <section id="fittings" data-panel className={PANEL}>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-[11px] uppercase tracking-vast text-silver-dim">
            {it.surfacesLabel}
          </p>
          <dl className="rule-t mt-4 divide-y divide-silver-dim/15">
            {it.surfaces.map((row) => (
              <div key={row.surface} className="py-3">
                <dt className="text-sm text-bone md:text-base">{row.surface}</dt>
                <dd className="mt-1 text-xs font-light uppercase leading-relaxed tracking-[0.16em] text-silver">
                  {row.material}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-[11px] uppercase tracking-vast text-silver-dim">
            {it.clearDimsLabel}
          </p>
          <dl className="rule-t mt-4 divide-y divide-silver-dim/15">
            {it.clearDims.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="text-[11px] uppercase tracking-vast text-silver-dim">
                  {row.label}
                </dt>
                <dd className="font-mono text-sm text-bone md:text-base">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-vast text-silver-dim">
            {it.pocketsLabel}
          </p>
          <dl className="rule-t mt-4 divide-y divide-silver-dim/15">
            {it.pockets.map((row) => (
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
      <div className="trace-box bg-carbon px-6 py-8 text-bone md:px-14 md:py-10">
        <TraceBorder className="text-bone/25" />
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
              {it.frontPocketFig}
            </p>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl">
              {it.frontPocketH3}
            </h3>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-base font-light leading-loose text-silver md:text-lg">
              {it.frontPocketBody}
            </p>
            <dl className="rule-t mt-5 divide-y divide-silver-dim/15">
              {it.frontPocketRows.map((row) => (
                <div key={row.label} className="py-2.5">
                  <dt className="text-[11px] uppercase tracking-vast text-silver-dim">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm font-light leading-relaxed text-bone">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs font-light uppercase leading-loose tracking-[0.16em] text-silver-dim">
              {it.frontPocketFooter}
            </p>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
