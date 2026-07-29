import { useState } from "react";
import Header from "./components/layout/Header.jsx";
import MenuOverlay from "./components/layout/MenuOverlay.jsx";
import BlueprintHero from "./components/hero/BlueprintHero.jsx";
import FlagshipShowcase from "./components/product/FlagshipShowcase.jsx";
import InteriorPlan from "./components/interior/InteriorPlan.jsx";
import MaterialTruth from "./components/anatomy/MaterialTruth.jsx";
import OrderInquiry from "./components/contact/OrderInquiry.jsx";
import useDrawReveal from "./hooks/useDrawReveal.js";
import useSectionScroll from "./hooks/useSectionScroll.js";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useDrawReveal();
  useSectionScroll();

  return (
    <div id="top" className="relative min-h-screen bg-carbon text-bone">
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <BlueprintHero />
        <FlagshipShowcase />
        <InteriorPlan />
        <MaterialTruth />
        <OrderInquiry />
      </main>

      <footer
        data-panel
        className="flex items-center justify-between px-6 py-10 text-[11px] md:text-xs uppercase tracking-vast text-silver-dim md:px-12"
      >
        <p>&copy; {new Date().getFullYear()} Envelope 01</p>
        <p>Engineered in Egypt</p>
      </footer>
    </div>
  );
}
