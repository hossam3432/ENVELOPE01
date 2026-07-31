import { createContext, useContext, useMemo, use } from "react";
import { LOCALE_DIR } from "./locales.js";

const LocaleContext = createContext(null);

// Every string on the site comes from one of these two files (~18KB en,
// ~25KB ar) — importing both eagerly, as this used to, ships the locale
// nobody asked for on every single request. Loaded dynamically instead, and
// cached per locale outside the component so `use()` below always gets the
// same promise for a given locale rather than a fresh one each render
// (`use()` requires a stable promise — this is the same caching trick
// React.lazy() uses internally). The caller (src/main.jsx) wraps
// <LocaleProvider> in a <Suspense> for the brief wait on this fetch.
const contentPromises = {};
function loadContent(locale) {
  if (!contentPromises[locale]) {
    contentPromises[locale] =
      locale === "ar" ? import("./content/ar.js") : import("./content/en.js");
  }
  return contentPromises[locale];
}

export function LocaleProvider({ locale, children }) {
  const { default: t } = use(loadContent(locale));
  const value = useMemo(
    () => ({ locale, dir: LOCALE_DIR[locale] ?? "ltr", t }),
    [locale, t]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
