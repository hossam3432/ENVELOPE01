// Single source of truth for supported locales and path-prefix parsing.
// URL structure is /en/... and /ar/..., never a query string or cookie —
// the pathname prefix is the only thing that decides locale.

export const LOCALES = ["en", "ar"];
export const DEFAULT_LOCALE = "en";

export const LOCALE_DIR = {
  en: "ltr",
  ar: "rtl",
};

// en_EG / ar_EG — used for og:locale and og:locale:alternate.
export const LOCALE_OG = {
  en: "en_EG",
  ar: "ar_EG",
};

export const HREFLANG = {
  en: "en-EG",
  ar: "ar-EG",
};

export function getLocaleFromPath(pathname) {
  const [, first] = pathname.split("/");
  return LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}

// Strips a leading /en or /ar segment, always returning a path starting
// with "/" (so `localizedPath` can cleanly prepend the target locale).
export function stripLocalePrefix(pathname) {
  const [, first, ...rest] = pathname.split("/");
  if (!LOCALES.includes(first)) return pathname;
  const remainder = rest.join("/");
  return remainder ? `/${remainder}` : "/";
}

export function localizedPath(locale, pathname) {
  const bare = stripLocalePrefix(pathname);
  return bare === "/" ? `/${locale}/` : `/${locale}${bare}`;
}
