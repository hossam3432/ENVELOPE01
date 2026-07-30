import { useEffect } from "react";

// Horizontal rules, traced button borders, and the blueprint diagrams all
// draw themselves on reveal.
const DRAW_SELECTOR = ".rule-t, .rule-b, .trace-box, .bp-sheet";

/**
 * Adds `is-drawn` to any self-drawing element once it scrolls into view.
 * Call once from the app root — a single observer handles all of them
 * rather than threading a ref through each one.
 */
export default function useDrawReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-drawn");
          // Trigger once — the CSS owns any looping from here.
          observer.unobserve(entry.target);
        }
      },
      // Hold off until the element is clear of the fold, so it doesn't
      // finish drawing off-screen.
      { rootMargin: "0px 0px -12% 0px" }
    );

    const observe = (node) => {
      if (node.nodeType !== 1) return;
      if (node.matches(DRAW_SELECTOR)) observer.observe(node);
      node.querySelectorAll(DRAW_SELECTOR).forEach((el) => observer.observe(el));
    };

    observe(document.body);

    // Elements can mount after the first pass — the registry form swaps its
    // fields for a confirmation panel — so pick up anything added later.
    const mutations = new MutationObserver((records) => {
      for (const record of records) record.addedNodes.forEach(observe);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}
