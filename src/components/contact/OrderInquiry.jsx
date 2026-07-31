import { useEffect, useRef, useState } from "react";
import TraceBorder from "../ui/TraceBorder.jsx";
import { PANEL } from "../ui/panel.js";
import { useLocale } from "../../i18n/LocaleContext.jsx";
import { toArabicIndicDigits } from "../../i18n/digits.js";

// Form fade-out duration. Must match the duration utility on the <form>.
const FORM_EXIT_MS = 450;

// Literal leather swatch colours shown in the chip, keyed by theme (the
// value written to data-colorway on <html>, matching the colorway block in
// index.css). Localized names come from t.order.colorways.
const SWATCHES = {
  black: "#000000",
  bone: "#f4f1ea",
};

const FIELD_BASE =
  "w-full border-b border-silver-dim/40 bg-transparent pt-3 pb-2 font-serif text-lg text-bone outline-none transition-colors duration-300 placeholder:text-silver/80 focus:border-bone md:text-xl";

function Field({ index, label, children }) {
  return (
    <div className="rule-t grid gap-2 py-2.5 md:grid-cols-12 md:gap-6 md:py-3">
      <span className="text-[11px] md:text-xs tracking-vast text-silver-dim md:col-span-1">
        {index}
      </span>
      <label className="block md:col-span-11">
        <span className="block text-xs uppercase leading-relaxed tracking-[0.18em] text-silver md:text-[13px]">
          {label}
        </span>
        {children}
      </label>
    </div>
  );
}

export default function OrderInquiry() {
  const { t, locale } = useLocale();
  const o = t.order;
  const fieldIndex = (n) => {
    const padded = String(n).padStart(2, "0");
    return locale === "ar" ? toArabicIndicDigits(padded) : padded;
  };

  // idle -> exiting (form fading out) -> sent (confirmation shown)
  const [status, setStatus] = useState("idle");
  const [colorway, setColorway] = useState(o.colorways[0]);
  const exitTimer = useRef(null);

  useEffect(() => () => clearTimeout(exitTimer.current), []);

  // Show the customer the bag's colour by wearing it: the choice repaints
  // the whole page, not just this control. Transitions are suppressed across
  // the flip (see the colorway block in index.css) and restored two frames
  // later, once the new palette has painted.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-colorway-swapping", "");
    root.dataset.colorway = colorway.theme;

    // Read layout to flush the style recalculation while transitions are
    // still off, so the new palette is adopted outright instead of animated.
    // Synchronous on purpose: rAF is suspended in a backgrounded tab, which
    // would leave transitions disabled for as long as the tab stayed hidden.
    void root.offsetHeight;
    root.removeAttribute("data-colorway-swapping");
  }, [colorway]);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("exiting");
    exitTimer.current = setTimeout(() => setStatus("sent"), FORM_EXIT_MS);
  };

  return (
    <section id="order" data-panel className={PANEL}>
      <div className="max-w-3xl">
        <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          {o.eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-4xl leading-tight text-bone md:text-5xl">
          {o.h2}
        </h2>
        <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-silver">
          {o.intro}
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl md:mt-8">
        {status === "sent" ? (
          <div role="status" aria-live="polite" className="fade-rise py-6">
            <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
              {o.sentEyebrow}
            </p>
            <p className="mt-6 font-serif text-3xl leading-tight text-bone md:text-4xl">
              {o.sentH}
            </p>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-silver">
              {o.sentBody}
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className={`transition-opacity duration-[450ms] ease-out ${
              status === "exiting" ? "pointer-events-none opacity-0" : ""
            }`}
          >
            <Field index={fieldIndex(1)} label={o.fullNameLabel}>
              <input
                type="text"
                name="fullName"
                required
                autoComplete="name"
                placeholder={o.fullNamePlaceholder}
                className={FIELD_BASE}
              />
            </Field>

            <Field index={fieldIndex(2)} label={o.whatsappLabel}>
              <input
                type="tel"
                name="whatsapp"
                required
                autoComplete="tel"
                inputMode="tel"
                pattern="^[+0-9][0-9 ()-]{7,}$"
                placeholder={o.whatsappPlaceholder}
                className={FIELD_BASE}
              />
            </Field>

            <div className="rule-t grid gap-2 py-2.5 md:grid-cols-12 md:gap-6 md:py-3">
              <span className="font-mono text-[11px] md:text-xs tracking-vast text-silver-dim md:col-span-1">
                {fieldIndex(3)}
              </span>
              <div className="md:col-span-11">
                <span className="block text-xs uppercase leading-relaxed tracking-[0.18em] text-silver md:text-[13px]">
                  {o.colorLabel}
                </span>
                <div className="mt-3 flex gap-4">
                  {o.colorways.map((option) => (
                    <label
                      key={option.name}
                      className="flex cursor-pointer items-center gap-3 border border-silver-dim/40 px-5 py-2.5 text-sm text-bone transition-colors duration-300 has-[:checked]:border-bone has-[:checked]:bg-bone/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-bone"
                    >
                      <input
                        type="radio"
                        name="color"
                        value={option.name}
                        checked={colorway.name === option.name}
                        onChange={() => setColorway(option)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 rounded-full border border-silver-dim/60"
                        style={{ backgroundColor: SWATCHES[option.theme] }}
                      />
                      {option.name}
                    </label>
                  ))}
                </div>
                <p className="mt-3 text-[11px] uppercase leading-relaxed tracking-[0.16em] text-silver-dim">
                  {o.colorNote}
                </p>
              </div>
            </div>

            <div className="rule-t pt-3">
              <button
                type="submit"
                className="trace-box trace-box-loop w-full cursor-pointer bg-carbon px-8 py-3 text-xs md:text-[13px] uppercase tracking-vast text-bone transition-colors duration-300 hover:bg-white/5 md:w-auto"
              >
                <TraceBorder />
                {o.submit}
              </button>
              <p className="mt-3 max-w-md text-xs md:text-[13px] font-light leading-loose text-silver-dim">
                {o.paymentNote}
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
