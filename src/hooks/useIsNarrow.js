import { useEffect, useState } from "react";

// Matches Tailwind's `md` breakpoint, so the drawings switch at the same
// width the surrounding layout does.
const NARROW = "(max-width: 767px)";

/**
 * True on phone-width screens.
 *
 * The technical drawings use it to crop to a tighter viewBox and drop their
 * callouts: at full sheet width a phone would render the 11-unit label text
 * at about 6 CSS pixels, and the object itself would be squeezed into the
 * middle third by margins that exist only to hold annotations.
 */
export default function useIsNarrow() {
  const [narrow, setNarrow] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(NARROW).matches
  );

  useEffect(() => {
    const query = window.matchMedia(NARROW);
    const sync = () => setNarrow(query.matches);
    sync();

    // `change` is the primary signal, but some embedded / automated
    // viewports resize without firing it — `resize` is the fallback so the
    // crop still tracks the breakpoint there.
    query.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return narrow;
}
