import { useEffect } from "react";

/* Tracks the cursor and writes it to --mx/--my on the root element, which
   index.css reads to position the body's radial-gradient spotlight. Written
   as CSS custom properties (not React state) so the whole page repaints on
   every pointer move without ever going through React. rAF-throttled to one
   write per frame. */
export default function useMouseSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const apply = () => {
      root.style.setProperty("--mx", `${x}px`);
      root.style.setProperty("--my", `${y}px`);
      frame = null;
    };

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (frame === null) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);
}
