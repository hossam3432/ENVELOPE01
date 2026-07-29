import { useEffect } from "react";

// One gesture moves one screen. Slow enough to read as a deliberate
// transition rather than a jump.
const DURATION_MS = 1150;

// Panels shorter than this much over a viewport are treated as fitting.
const FIT_SLACK_PX = 8;

// Ignore trackpad momentum tails and sub-pixel wheel noise.
const WHEEL_THRESHOLD = 4;
const COOLDOWN_MS = 120;

const SWIPE_THRESHOLD_PX = 50;

const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Full-page scrolling. Each `[data-panel]` element is a stop; one wheel
 * notch, arrow key or swipe advances exactly one stop, animated with an
 * ease-in-out curve.
 *
 * A panel taller than the viewport is not skipped over — it contributes one
 * stop per viewport-height of overflow, so its content is still reachable a
 * screen at a time before the next panel arrives.
 *
 * Under prefers-reduced-motion the hook does nothing and the browser's own
 * scrolling (with CSS scroll-snap) takes over.
 */
export default function useSectionScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let stops = [];
    let animating = false;
    let lockedUntil = 0;
    let rafId = 0;

    const maxScroll = () =>
      Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );

    // A panel that overflows the viewport becomes several stops, one per
    // screen, with the last one bottom-aligned so nothing is cut off.
    const buildStops = () => {
      const vh = window.innerHeight;
      const limit = maxScroll();
      const next = [];

      for (const panel of document.querySelectorAll("[data-panel]")) {
        const top = panel.offsetTop;
        const height = panel.offsetHeight;

        if (height <= vh + FIT_SLACK_PX) {
          next.push(top);
          continue;
        }

        const bottomAligned = top + height - vh;
        for (let y = top; y < bottomAligned - FIT_SLACK_PX; y += vh) {
          next.push(y);
        }
        next.push(bottomAligned);
      }

      stops = [...new Set(next.map((y) => Math.round(Math.min(y, limit))))].sort(
        (a, b) => a - b
      );
    };

    const nearestIndex = () => {
      const y = window.scrollY;
      let best = 0;
      let bestDistance = Infinity;
      stops.forEach((stop, i) => {
        const distance = Math.abs(stop - y);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      return best;
    };

    const animateTo = (target) => {
      const from = window.scrollY;
      const to = Math.max(0, Math.min(target, maxScroll()));
      const distance = to - from;
      if (Math.abs(distance) < 1) return;

      animating = true;
      const start = performance.now();

      const step = (now) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        window.scrollTo(0, from + distance * easeInOut(t));
        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          animating = false;
          lockedUntil = performance.now() + COOLDOWN_MS;
        }
      };

      rafId = requestAnimationFrame(step);
    };

    const go = (direction) => {
      if (animating || performance.now() < lockedUntil) return;
      const index = nearestIndex();
      const target = index + direction;
      if (target < 0 || target >= stops.length) return;
      animateTo(stops[target]);
    };

    const onWheel = (event) => {
      if (event.ctrlKey) return; // pinch-zoom
      if (menuIsOpen()) return;
      if (scrollableAncestor(event.target, event.deltaY)) return;

      event.preventDefault();
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      go(event.deltaY > 0 ? 1 : -1);
    };

    // Horizontally scrollable boxes (the wide technical drawings) and any
    // other inner scroller keep their own gestures.
    const scrollableAncestor = (node, deltaY) => {
      let el = node instanceof Element ? node : null;
      while (el && el !== document.body) {
        const style = getComputedStyle(el);
        const scrolls =
          /(auto|scroll)/.test(style.overflowY) &&
          el.scrollHeight > el.clientHeight + 1;
        if (scrolls) {
          const atTop = el.scrollTop <= 0;
          const atBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
          if (!(deltaY > 0 ? atBottom : atTop)) return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const menuIsOpen = () => {
      const overlay = document.getElementById("menu-overlay");
      return overlay ? overlay.getAttribute("aria-hidden") === "false" : false;
    };

    const onKeyDown = (event) => {
      if (menuIsOpen()) return;
      const tag = event.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          event.preventDefault();
          go(1);
          break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          go(-1);
          break;
        case "Home":
          event.preventDefault();
          animateTo(stops[0] ?? 0);
          break;
        case "End":
          event.preventDefault();
          animateTo(stops[stops.length - 1] ?? maxScroll());
          break;
        default:
          break;
      }
    };

    let touchY = null;
    const onTouchStart = (event) => {
      touchY = event.touches[0].clientY;
    };
    const onTouchEnd = (event) => {
      if (touchY === null || menuIsOpen()) return;
      const delta = touchY - event.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
      if (scrollableAncestor(event.target, delta)) return;
      go(delta > 0 ? 1 : -1);
    };
    const onTouchMove = (event) => {
      if (menuIsOpen()) return;
      if (scrollableAncestor(event.target, event.touches[0].clientY)) return;
      event.preventDefault();
    };

    // In-page anchors animate to their panel instead of jumping.
    const onClick = (event) => {
      const link = event.target?.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      buildStops();
      const top = target.offsetTop;
      const closest = stops.reduce(
        (best, stop) =>
          Math.abs(stop - top) < Math.abs(best - top) ? stop : best,
        stops[0] ?? 0
      );
      animateTo(closest);
    };

    const onResize = () => {
      if (animating) return;
      buildStops();
    };

    buildStops();
    // Late-loading images change panel heights.
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
