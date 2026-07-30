import { useEffect, useState } from "react";

// Matches Tailwind's `lg` breakpoint, so the blueprint sheet can switch to
// its larger, sidebar-flanked layout at the same width the surrounding grid
// does.
const WIDE = "(min-width: 1024px)";

/**
 * True on desktop-width screens (lg and up).
 */
export default function useIsWide() {
  const [wide, setWide] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(WIDE).matches
  );

  useEffect(() => {
    const query = window.matchMedia(WIDE);
    const sync = () => setWide(query.matches);
    sync();

    query.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return wide;
}
