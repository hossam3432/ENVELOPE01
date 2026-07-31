import { useEffect } from "react";
import { useLocale } from "../../i18n/LocaleContext.jsx";

export default function MenuOverlay({ open, onClose }) {
  const { t } = useLocale();
  const LINKS = t.menu.links;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      id="menu-overlay"
      aria-hidden={!open}
      className={`fixed inset-0 z-40 flex flex-col justify-between bg-carbon px-6 pt-32 pb-10 transition-opacity duration-500 md:px-12 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <nav aria-label="Primary">
        <ul className="border-t border-silver-dim/30">
          {LINKS.map(({ index, label, href }) => (
            <li key={href} className="border-b border-silver-dim/30">
              <a
                href={href}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className="group flex items-baseline gap-6 py-6 md:gap-12 md:py-8"
              >
                <span className="text-[11px] md:text-xs tracking-vast text-silver-dim">
                  {index}
                </span>
                <span className="font-serif text-4xl font-normal text-bone transition-colors duration-300 group-hover:text-silver md:text-6xl">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-end justify-between text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
        <p>{t.menu.tagline}</p>
        <p>{t.menu.est}</p>
      </div>
    </div>
  );
}
