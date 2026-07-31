import ProductGallery from "./ProductGallery.jsx";
import { PANEL } from "../ui/panel.js";
import useIsNarrow from "../../hooks/useIsNarrow.js";
import CalloutLegend from "../ui/CalloutLegend.jsx";
import { useLocale } from "../../i18n/LocaleContext.jsx";

const delay = (s) => ({ animationDelay: `${s}s` });

// Pure dimension figures use the mono face; descriptive labels use the sans
// face — both self-hosted, see index.css.
const NOTE = {
  fontSize: 10,
  letterSpacing: "0.14em",
  fontFamily: "'IBM Plex Mono', monospace",
};

const NOTE_SM = {
  fontSize: 9,
  letterSpacing: "0.1em",
  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
};

const DIM = {
  fontSize: 12,
  letterSpacing: "0.16em",
  fontFamily: "'IBM Plex Mono', monospace",
};

const CALLOUT = {
  fontSize: 11,
  letterSpacing: "0.14em",
  fontFamily: "'IBM Plex Sans Arabic', sans-serif",
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
   120 deep × 310 high, zip running 15 down from the top edge. */
function GussetElevation() {
  const { t } = useLocale();
  const p = t.product;
  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={p.gussetAriaLabel}
      className="bp-sheet mx-auto block max-h-[52dvh] w-full text-silver"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      {/* Gusset silhouette — 120 × 310. The envelope facets fold over the
          top, so the profile tapers to the zip crown rather than squaring off. */}
      <path
        className="bp-draw"
        style={delay(0.1)}
        pathLength="1"
        d="M193 90 H207 C218 92 228 100 236 108 C244 115 249 118 249 128 V293 A12 12 0 0 1 237 307 H163 A12 12 0 0 1 151 293 V128 C151 118 156 115 164 108 C172 100 182 92 193 90 Z"
      />

      {/* Handle, edge on — one per face, overlapping in this view */}
      <path
        className="bp-draw"
        style={delay(0.6)}
        pathLength="1"
        d="M195 90 V27 A5 5 0 0 1 205 27 V90"
      />

      {/* Zip run down the gusset — 15, terminating in a leather garage */}
      <g className="bp-fade" style={delay(1.0)} strokeWidth="0.9">
        <path d="M200 90 V153" />
        <rect x="195" y="153" width="10" height="12" rx="2" />
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
        <rect x="162" y="126" width="12" height="16" rx="2" />
        <circle cx="168" cy="149" r="7" />
      </g>

      {/* Two of the four feet */}
      <g className="bp-fade" style={delay(1.4)} strokeWidth="0.9">
        <rect x="163" y="307" width="11" height="6" rx="1" />
        <rect x="226" y="307" width="11" height="6" rx="1" />
        <path d="M130 313 H270" opacity="0.5" />
      </g>

      {/* 15 zip run */}
      <g className="bp-fade" style={delay(1.6)} strokeWidth="0.8">
        <path d="M132 90 V153" />
        <path d="M126 90 H138" />
        <path d="M126 153 H138" />
        <text
          x="120"
          y="124"
          textAnchor="end"
          fill="currentColor"
          stroke="none"
          style={NOTE}
        >
          {p.gussetZipNote}
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
          {p.gussetHeightNote}
        </text>
      </g>

      {/* 120 depth */}
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
          {p.gussetDepthNote}
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
          <tspan x="284">{p.gussetFoldNoteLine1}</tspan>
          <tspan x="284" dy="12" opacity="0.75">
            {p.gussetFoldNoteLine2}
          </tspan>
        </text>
      </g>
    </svg>
  );
}

/* View 15 — scale reference, 0.7 px per mm. The 16″ laptop is drawn as a
   hidden outline inside the bag: 356 × 249 closed, seated 25 below the zip.

   On a phone the sheet crops to the body and the width dimension — the
   three leader callouts exist to label facts the paragraph below the figure
   already states in full. */
const SCALE_BOX = "0 0 720 370";
const SCALE_BOX_NARROW = "160 15 400 360";

function ScaleReference({ narrow }) {
  const { t } = useLocale();
  const p = t.product;
  return (
    <svg
      viewBox={narrow ? SCALE_BOX_NARROW : SCALE_BOX}
      role="img"
      aria-label={p.scaleAriaLabel}
      className="bp-sheet mx-auto block max-h-[52dvh] w-full text-silver"
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

      {/* Handle — one per face */}
      <path
        className="bp-draw"
        style={delay(1.0)}
        pathLength="1"
        strokeWidth="1"
        d="M322 90 C322 20 392 20 392 90"
      />

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
          {p.scaleWidthNote}
        </text>
      </g>

      {!narrow && (
        <>
          <Callout
            at={2.1}
            leader="M300 99 L180 120 L20 120"
            dot={[300, 99]}
            x={20}
            y={99}
            lines={p.scaleCalloutsAbove[0].lines}
          />
          <Callout
            at={2.2}
            leader="M233 210 L160 240 L20 240"
            dot={[233, 210]}
            x={20}
            y={219}
            lines={p.scaleCalloutsBelow[0].lines}
          />
          <Callout
            at={2.3}
            leader="M482 230 L560 255 L700 255"
            dot={[482, 230]}
            x={700}
            y={234}
            anchor="end"
            lines={p.scaleCalloutsBelow[1].lines}
          />
        </>
      )}
    </svg>
  );
}

/* View 12 — the detachable strap, laid flat. 18 wide, swivel clip at each
   end, centre slide adjuster, adjusting 850–1350. */
function StrapFlat() {
  const { t } = useLocale();
  const p = t.product;
  return (
    <svg
      viewBox="0 0 720 150"
      role="img"
      aria-label={p.strapAriaLabel}
      className="bp-sheet w-full text-silver"
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
          {p.strapRangeNote}
        </text>
      </g>

      {/* 18 wide */}
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
          {p.strapWideNote}
        </text>
      </g>
    </svg>
  );
}

export default function FlagshipShowcase() {
  const narrow = useIsNarrow();
  const { t } = useLocale();
  const p = t.product;

  return (
    <>
      {/* The product itself, plates only — specs get their own panel next */}
      <section id="product" data-panel className={PANEL}>
        <div className="max-w-3xl">
          <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
            {p.collectionEyebrow}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-bone md:text-4xl">
            {p.collectionH2}
          </h2>
        </div>

        <div className="mx-auto mt-6 w-full max-w-3xl md:mt-10 lg:max-w-5xl xl:max-w-6xl">
          <ProductGallery />
        </div>
      </section>

      {/* Model 001 specs — its own panel, following the plates */}
      <section id="specs" data-panel className={PANEL}>
        <div className="max-w-3xl">
          <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
            {p.collectionEyebrow}
          </p>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-bone md:text-4xl">
            {p.modelH2}
          </h2>
          <p className="mt-4 text-[11px] md:text-xs font-light uppercase leading-relaxed tracking-[0.18em] text-silver">
            {p.modelIntro}
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-3xl">
          <dl className="rule-t divide-y divide-silver-dim/15">
            {p.specItems.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 py-2"
              >
                <dt className="shrink-0 text-[11px] uppercase tracking-vast text-silver-dim">
                  {item.label}
                </dt>
                <dd className="text-end font-mono text-sm text-bone md:text-base">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-3 text-[11px] font-light uppercase leading-loose tracking-[0.14em] text-silver-dim">
            {p.toleranceNote}
          </p>

          <div className="mt-6 flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-8">
            <p className="font-mono text-2xl text-bone md:text-3xl">
              {p.price}
            </p>
            <a
              href="#order"
              className="inline-block border border-bone/60 px-6 py-2.5 text-xs uppercase tracking-vast text-bone transition-colors duration-300 hover:bg-bone hover:text-carbon"
            >
              {p.cta}
            </a>
          </div>
        </div>
      </section>

      {/* The gusset, drawn — the plate above shows the same view photographed */}
      <section id="gusset" data-panel className={PANEL}>
        <div className="flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          <p>{p.gussetFigCaption}</p>
          <p className="hidden md:block">{p.gussetDepthLabel}</p>
        </div>
        <div className="mx-auto mt-6 w-full max-w-sm md:max-w-md">
          <GussetElevation />
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-silver">
          {p.gussetBody}
        </p>
      </section>

      {/* Scale reference — does the laptop actually fit */}
      <section id="scale" data-panel className={PANEL}>
        <div className="flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          <p>{p.scaleFigCaption}</p>
          <p className="hidden md:block">{p.scaleSubLabel}</p>
        </div>
        <CalloutLegend items={p.scaleCalloutsAbove} className="mx-auto mt-6 w-full max-w-3xl" />

        <div className="mt-6">
          <div className="mx-auto w-full max-w-3xl">
            <ScaleReference narrow={narrow} />
          </div>
        </div>

        <CalloutLegend items={p.scaleCalloutsBelow} className="mx-auto mt-6 w-full max-w-3xl" />

        <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-silver">
          {p.scaleBody}
        </p>
      </section>

      {/* The strap */}
      <section id="strap" data-panel className={PANEL}>
        <div className="flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          <p>{p.strapFigCaption}</p>
          <p className="hidden md:block">{p.strapSubLabel}</p>
        </div>
        <div className="mt-6">
          <div className="mx-auto w-full max-w-3xl">
            <StrapFlat />
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-silver">
          {p.strapBody}
        </p>
      </section>
    </>
  );
}
