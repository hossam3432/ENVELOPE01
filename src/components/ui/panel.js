/* Every full-page panel shares this frame: one viewport tall, contents
   vertically centred, so useSectionScroll can land on it cleanly. Panels
   whose content still exceeds a screen are not clipped — the scroller gives
   them one stop per screen of overflow. */
export const PANEL =
  "rule-b flex min-h-[100dvh] flex-col justify-center px-6 py-10 md:px-12 md:py-12";
