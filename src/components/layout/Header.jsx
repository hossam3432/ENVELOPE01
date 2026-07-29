import { useEffect, useState } from "react";

export default function Header({ menuOpen, onToggleMenu }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const feather = "linear-gradient(to bottom, black 60%, transparent 100%)";

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-bone">
      {/* Frosted-glass layer, feathered at the bottom so it dissolves into
          the page instead of ending in a hard box edge. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 -bottom-8 bg-carbon/80 backdrop-blur-md transition-opacity duration-500 ease-out ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ maskImage: feather, WebkitMaskImage: feather }}
      />
      <div className="relative flex items-baseline justify-between px-6 py-6 md:px-12">
        <a
          href="#top"
          className="font-sans text-2xl font-medium tracking-[0.3em] uppercase"
        >
          Envelope 01
        </a>

        <p className="hidden text-[11px] md:text-xs uppercase tracking-vast text-silver md:block">
          Engineered Form &mdash; Cairo, EG
        </p>

        <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-controls="menu-overlay"
          className="cursor-pointer text-xs md:text-[13px] uppercase tracking-vast transition-colors duration-300 hover:text-silver"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
