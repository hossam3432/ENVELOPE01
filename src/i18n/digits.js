// Converts ASCII digits to Eastern Arabic-Indic numerals (٠-٩). Used only
// while authoring src/i18n/content/ar.js, so every Arabic numeral is derived
// mechanically from the same literal figure that appears in the English
// content and in src/seo/schema.ts — the digits can't drift out of sync with
// the published spec table by a typo. Punctuation (× · – , .) passes through
// unchanged; call arabicDecimal/arabicThousands first if a string needs the
// Arabic decimal separator (٫) or thousands separator (٬) instead of . or ,.

const EASTERN_ARABIC_INDIC = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export function toArabicIndicDigits(value) {
  return String(value).replace(/[0-9]/g, (d) => EASTERN_ARABIC_INDIC[Number(d)]);
}

// "1.2" -> "١٫٢" (Arabic decimal separator, U+066B)
export function arabicDecimal(value) {
  return toArabicIndicDigits(value).replace(/\./g, "٫");
}

// "6,500" -> "٦٬٥٠٠" (Arabic thousands separator, U+066C)
export function arabicThousands(value) {
  return toArabicIndicDigits(value).replace(/,/g, "٬");
}
