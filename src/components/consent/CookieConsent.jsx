import { useEffect, useState } from "react";
import useConsent from "../../hooks/useConsent.js";
import { useLocale } from "../../i18n/LocaleContext.jsx";

function ToggleRow({ label, description, checked, onChange, disabled }) {
  return (
    <div className="rule-t flex items-start justify-between gap-6 py-5">
      <div>
        <p className="text-xs uppercase tracking-vast text-bone">{label}</p>
        <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-silver">
          {description}
        </p>
      </div>
      <label
        className={`relative inline-flex h-6 w-11 shrink-0 items-center ${
          disabled ? "opacity-40" : "cursor-pointer"
        }`}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full border border-silver-dim/50 bg-transparent transition-colors duration-300 peer-checked:border-bone peer-checked:bg-bone" />
        <span className="absolute start-1 h-4 w-4 rounded-full bg-silver-dim transition-transform duration-300 peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5 peer-checked:bg-carbon" />
      </label>
    </div>
  );
}

export default function CookieConsent() {
  const { t } = useLocale();
  const c = t.consent;
  const {
    prefs,
    bannerOpen,
    modalOpen,
    openModal,
    closeModal,
    acceptAll,
    rejectAll,
    savePreferences,
  } = useConsent();

  const [draft, setDraft] = useState(prefs);

  useEffect(() => {
    if (modalOpen) setDraft(prefs);
  }, [modalOpen, prefs]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  return (
    <>
      {bannerOpen && !modalOpen && (
        <div
          role="dialog"
          aria-label={c.bannerAriaLabel}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-silver-dim/40 bg-carbon px-6 py-6 md:px-12 md:py-8"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
                {c.bannerEyebrow}
              </p>
              <p className="mt-3 text-sm font-light leading-relaxed text-silver md:text-[15px]">
                {c.bannerBody}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:shrink-0">
              <button
                type="button"
                onClick={openModal}
                className="cursor-pointer text-xs md:text-[13px] uppercase tracking-vast text-silver-dim underline-offset-4 transition-colors duration-300 hover:text-bone hover:underline"
              >
                {c.customize}
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="cursor-pointer border border-silver-dim/40 px-6 py-3 text-xs md:text-[13px] uppercase tracking-vast text-bone transition-colors duration-300 hover:border-bone"
              >
                {c.rejectAll}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="cursor-pointer bg-bone px-6 py-3 text-xs md:text-[13px] uppercase tracking-vast text-carbon transition-colors duration-300 hover:bg-white"
              >
                {c.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={c.modalAriaLabel}
          className="fixed inset-0 z-50 flex items-end justify-center bg-carbon/80 px-4 pb-4 md:items-center md:px-6"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="relative w-full max-w-lg border border-silver-dim/40 bg-carbon p-6 md:p-10">
            <div className="flex items-start justify-between">
              <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
                {c.modalEyebrow}
              </p>
              <button
                type="button"
                onClick={closeModal}
                aria-label={c.modalClose}
                className="cursor-pointer text-silver-dim transition-colors duration-300 hover:text-bone"
              >
                &#10005;
              </button>
            </div>

            <h3 className="mt-4 font-serif text-2xl leading-tight text-bone md:text-3xl">
              {c.modalH3}
            </h3>

            <div className="mt-2">
              <ToggleRow
                label={c.necessaryLabel}
                description={c.necessaryDesc}
                checked
                disabled
                onChange={() => {}}
              />
              <ToggleRow
                label={c.analyticsLabel}
                description={c.analyticsDesc}
                checked={draft.analytics}
                onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              />
              <ToggleRow
                label={c.adsLabel}
                description={c.adsDesc}
                checked={draft.ads}
                onChange={(v) => setDraft((d) => ({ ...d, ads: v }))}
              />
            </div>

            <div className="rule-t flex flex-wrap gap-4 pt-6">
              <button
                type="button"
                onClick={rejectAll}
                className="cursor-pointer border border-silver-dim/40 px-6 py-3 text-xs uppercase tracking-vast text-bone transition-colors duration-300 hover:border-bone"
              >
                {c.rejectAll}
              </button>
              <button
                type="button"
                onClick={() => savePreferences(draft)}
                className="cursor-pointer bg-bone px-6 py-3 text-xs uppercase tracking-vast text-carbon transition-colors duration-300 hover:bg-white"
              >
                {c.savePreferences}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
