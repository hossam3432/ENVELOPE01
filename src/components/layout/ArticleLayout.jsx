import { useState } from "react";
import Header from "./Header.jsx";
import MenuOverlay from "./MenuOverlay.jsx";
import CookieConsent from "../consent/CookieConsent.jsx";
import { OPEN_PREFERENCES_EVENT } from "../../hooks/useConsent.js";
import SEO from "../../seo/SEO.jsx";
import { useLocale } from "../../i18n/LocaleContext.jsx";

// Shared chrome for standalone content pages (src/pages/*) — same header,
// menu, and cookie consent as the homepage, but normal document flow
// instead of the homepage's full-viewport scroll-snap panels: these are
// long-form reference pages, not blueprint plates, so useSectionScroll /
// useDrawReveal / useMouseSpotlight (all homepage-only, wired in App.jsx)
// are deliberately not used here. No `data-panel` on the footer either —
// that attribute opts an element into the reduced-motion scroll-snap
// fallback in src/index.css, which only makes sense on a page built entirely
// out of full-screen panels.
export default function ArticleLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLocale();

  return (
    <div id="top" className="relative min-h-screen bg-carbon text-bone">
      <SEO />
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:px-12">
        {children}
      </main>

      <footer className="flex items-center justify-between px-6 py-10 text-[11px] md:text-xs uppercase tracking-vast text-silver-dim md:px-12">
        <p>&copy; {new Date().getFullYear()} Envelope 01</p>
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
          }
          className="cursor-pointer transition-colors duration-300 hover:text-bone"
        >
          {t.footer.cookieSettings}
        </button>
        <p>{t.footer.tagline}</p>
      </footer>

      <CookieConsent />
    </div>
  );
}
