/**
 * An outline that traces itself around its parent box on reveal.
 *
 * Drawn as an SVG rect rather than a CSS border so the stroke can be
 * trimmed. The parent must carry `trace-box` (and `trace-box-loop` to
 * re-trace on a 10s cycle); `useDrawReveal` starts it on scroll.
 *
 * `className` lands on the rect, so a text-color utility retints the
 * stroke via currentColor. `strokeWidth` is in px and does not scale with
 * the box — 0.67 is a 0.5pt hairline.
 *
 * Remount it (give it a `key` that changes) to re-run the trace.
 */
export default function TraceBorder({ className = "", strokeWidth = 1 }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <rect
        className={`trace-box-rect ${className}`}
        x="0"
        y="0"
        width="100"
        height="100"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
        pathLength="1"
      />
    </svg>
  );
}
