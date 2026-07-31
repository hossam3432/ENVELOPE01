// Resolves the actual hashed build URLs for the font files we preload, via
// Vite's `?url` import (the same mechanism ProductGallery.jsx uses for
// photos) — so the preload <link> always points at the real asset path
// instead of a guessed one. The @font-face rules themselves come from
// @fontsource's per-weight CSS (imported in index.css), which already
// declares a correct unicode-range per subset; this file only decides which
// one file is worth eagerly preloading above the fold for each locale.
import arabicSans400 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2?url";
import latinSans400 from "@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-400-normal.woff2?url";
import mono400 from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2?url";

// One primary weight (400) per script, plus mono (used for spec figures on
// both locales) — matches "preload the primary weights" without preloading
// every weight the site happens to use.
export const FONT_PRELOADS = {
  en: [latinSans400, mono400],
  ar: [arabicSans400, mono400],
};
