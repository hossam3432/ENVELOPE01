/**
 * A 1px outline that traces itself around its parent box on reveal.
 *
 * Drawn as an SVG rect rather than a CSS border so the stroke can be
 * trimmed. The parent must carry `trace-box` (and `trace-box-loop` to
 * re-trace on a 10s cycle); `useDrawReveal` starts it on scroll.
 *
 * `className` lands on the rect, so a text-color utility retints the
 * stroke via currentColor.
 */
export default function TraceBorder({ className = "" }) {
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
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        pathLength="1"
      />
    </svg>
  );
}
