/**
 * Mobile-only readout of a drawing's leader-line callouts.
 *
 * On phones the technical sheets crop to just the object (see
 * useIsNarrow) — the wide margins that carry the leader lines and their
 * labels don't exist at that width, so the callouts are cropped along with
 * them. This repeats the same text as ordinary HTML, placed above or below
 * the figure by the caller. Being plain flowed text, it can't run off the
 * viewport the way the SVG annotations did at phone width.
 *
 * Hidden from `md` up, where the full sheet (and its real leader lines)
 * takes over.
 */
export default function CalloutLegend({ items, className = "" }) {
  return (
    <dl className={`grid grid-cols-1 gap-x-6 gap-y-3 min-[420px]:grid-cols-2 md:hidden ${className}`}>
      {items.map((item) => (
        <div key={item.lines[0]}>
          <dt className="text-[11px] uppercase tracking-[0.14em] text-silver">
            {item.lines[0]}
          </dt>
          {item.lines[1] && (
            <dd className="mt-0.5 text-[10px] uppercase leading-relaxed tracking-[0.12em] text-silver-dim">
              {item.lines[1]}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}
