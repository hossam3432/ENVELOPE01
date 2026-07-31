import { useState } from "react";

import TraceBorder from "../ui/TraceBorder.jsx";
import { useLocale } from "../../i18n/LocaleContext.jsx";
import { toArabicIndicDigits } from "../../i18n/digits.js";

// `?w=...&format=avif;webp;jpg&as=picture` (vite-imagetools) generates real
// AVIF + WebP variants at each listed width plus a JPEG fallback at build
// time, and resolves to { sources: { avif, webp, jpeg }, img: { src, w, h } }
// — note the "jpeg" key even though the directive says "jpg" (imagetools
// normalizes the format name). srcset strings are ready to spread into
// <picture>/<source>/<img> below. Widths are capped near each file's native
// resolution (see the -06/-07 pair, shot at 1200 not 1400) so nothing gets
// upscaled.
import front from "../../assets/product/01-front.jpg?w=480;900;1400&format=avif;webp;jpg&as=picture";
import gusset from "../../assets/product/02-gusset.jpg?w=480;900;1400&format=avif;webp;jpg&as=picture";
import top from "../../assets/product/03-top.jpg?w=480;900;1400&format=avif;webp;jpg&as=picture";
import interior from "../../assets/product/04-interior.jpg?w=480;900;1400&format=avif;webp;jpg&as=picture";
import base from "../../assets/product/05-base.jpg?w=480;900;1400&format=avif;webp;jpg&as=picture";
import handle from "../../assets/product/06-handle.jpg?w=480;900;1200&format=avif;webp;jpg&as=picture";
import facet from "../../assets/product/07-facet.jpg?w=480;900;1200&format=avif;webp;jpg&as=picture";
import interiorPacked from "../../assets/product/08-interior-packed.jpg?w=480;900;1400&format=avif;webp;jpg&as=picture";
import strap from "../../assets/product/09-strap.jpg?w=480;900;1400&format=avif;webp;jpg&as=picture";

import frontThumb from "../../assets/product/thumb/01-front.jpg?w=110;220&format=avif;webp;jpg&as=picture";
import gussetThumb from "../../assets/product/thumb/02-gusset.jpg?w=110;220&format=avif;webp;jpg&as=picture";
import topThumb from "../../assets/product/thumb/03-top.jpg?w=110;220&format=avif;webp;jpg&as=picture";
import interiorThumb from "../../assets/product/thumb/04-interior.jpg?w=110;220&format=avif;webp;jpg&as=picture";
import baseThumb from "../../assets/product/thumb/05-base.jpg?w=110;220&format=avif;webp;jpg&as=picture";
import handleThumb from "../../assets/product/thumb/06-handle.jpg?w=110;220&format=avif;webp;jpg&as=picture";
import facetThumb from "../../assets/product/thumb/07-facet.jpg?w=110;220&format=avif;webp;jpg&as=picture";
import interiorPackedThumb from "../../assets/product/thumb/08-interior-packed.jpg?w=110;220&format=avif;webp;jpg&as=picture";
import strapThumb from "../../assets/product/thumb/09-strap.jpg?w=110;220&format=avif;webp;jpg&as=picture";

/* Plates run alongside the Fig. drawings — photographs, not elevations.
   Each note repeats a dimension the site already publishes elsewhere.
   Image assets are locale-independent; title/note/alt text comes from
   t.gallery.plates (same order) in the component below. */
const PLATE_IMAGES = [
  { picture: front, thumb: frontThumb },
  { picture: gusset, thumb: gussetThumb, fit: "contain" },
  { picture: top, thumb: topThumb },
  { picture: interior, thumb: interiorThumb, fit: "contain" },
  { picture: interiorPacked, thumb: interiorPackedThumb, fit: "contain" },
  { picture: base, thumb: baseThumb },
  { picture: handle, thumb: handleThumb },
  { picture: facet, thumb: facetThumb },
  { picture: strap, thumb: strapThumb, fit: "contain" },
];

/* One frame. The <img> is deliberately not keyed — the element persists
   across changes so the browser keeps the old plate on screen until the new
   one has decoded, and the frame never flashes empty mid-change.

   The 0.5pt outline is a trimmed SVG stroke, not a CSS border, and it is
   keyed on the plate number: changing view remounts it, so the line draws
   itself around the new frame. It sits outside the clipping box so the
   hairline isn't sliced in half at the edges. */
function Plate({ plate, number, className = "" }) {
  return (
    <figure className={className}>
      {/* Padding on the relative box, not the image, so the traced
          border sits with clearance around the plate instead of hugging it.
          w-fit lets the box shrink to the (height-driven) square below,
          instead of stretching to the column and leaving the trace border
          floating around empty space. */}
      <div className="relative w-fit mx-auto p-3 md:p-4">
        {/* Sized off the viewport height, not a fixed width, so the plate
            never pushes this section past one screen on a short display. */}
        <div className="aspect-square h-[26dvh] max-h-[360px] min-h-[160px] w-auto max-w-full overflow-hidden bg-carbon-soft lg:h-[46dvh] lg:max-h-[600px]">
          <picture>
            <source srcSet={plate.picture.sources.avif} type="image/avif" />
            <source srcSet={plate.picture.sources.webp} type="image/webp" />
            <img
              src={plate.picture.img.src}
              srcSet={plate.picture.sources.jpeg}
              sizes="(min-width: 1024px) 46vh, 26vh"
              alt={plate.alt}
              width={plate.picture.img.w}
              height={plate.picture.img.h}
              loading="lazy"
              decoding="async"
              className={`h-full w-full object-center ${
                plate.fit === "contain" ? "object-contain" : "object-cover"
              }`}
            />
          </picture>
        </div>
        <TraceBorder
          key={number}
          className="trace-on-mount text-bone/70"
          strokeWidth={0.67}
        />
      </div>
      <figcaption className="mt-2 text-center text-[11px] uppercase tracking-vast text-silver-dim">
        {plate.plateWord} {plate.numberLabel} &mdash; {plate.title}
      </figcaption>
    </figure>
  );
}

function formatIndex(n, locale) {
  const padded = String(n).padStart(2, "0");
  return locale === "ar" ? toArabicIndicDigits(padded) : padded;
}

export default function ProductGallery() {
  const [index, setIndex] = useState(0);
  const { t, locale } = useLocale();
  const g = t.gallery;
  const plates = PLATE_IMAGES.map((image, i) => ({
    ...image,
    ...g.plates[i],
    plateWord: g.plateWord,
    numberLabel: formatIndex(i + 1, locale),
  }));
  const plate = plates[index];

  const step = (delta) =>
    setIndex((i) => (i + delta + plates.length) % plates.length);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-[11px] uppercase tracking-vast text-silver-dim">
        <p>{g.plateLabel}</p>
        <p className="shrink-0 font-mono">
          {formatIndex(index + 1, locale)} / {formatIndex(plates.length, locale)}
        </p>
      </div>

      {/* One large plate, centered above the thumbnail strip. */}
      <div
        role="group"
        aria-label={g.groupAriaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mx-auto mt-3 w-full outline-none focus-visible:[&_.aspect-square]:border-bone/60"
      >
        <Plate plate={plate} number={index + 1} />
      </div>

      <div className="mt-3 grid grid-cols-9 gap-2">
        {plates.map((item, i) => (
          <button
            key={item.picture.img.src}
            type="button"
            data-plate-thumb
            onClick={() => setIndex(i)}
            aria-label={`${item.plateWord} ${item.numberLabel} — ${item.title}`}
            aria-current={i === index ? "true" : undefined}
            className={`aspect-square overflow-hidden border bg-carbon-soft p-1 transition-opacity duration-300 ${
              i === index
                ? "border-bone/70 opacity-100"
                : "border-silver-dim/20 opacity-50 hover:opacity-90"
            }`}
          >
            {/* contain, not cover — the whole plate is visible in the strip */}
            <picture>
              <source srcSet={item.thumb.sources.avif} type="image/avif" />
              <source srcSet={item.thumb.sources.webp} type="image/webp" />
              <img
                src={item.thumb.img.src}
                srcSet={item.thumb.sources.jpeg}
                sizes="(min-width: 1280px) 128px, (min-width: 1024px) 113px, (min-width: 768px) 85px, 11vw"
                alt=""
                width={item.thumb.img.w}
                height={item.thumb.img.h}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain object-center"
              />
            </picture>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4 text-[11px] uppercase tracking-vast text-silver-dim">
        <p className="max-w-[30ch] leading-relaxed normal-case tracking-[0.12em] text-silver">
          {plate.note}
        </p>
        <p className="shrink-0">{g.locationTag}</p>
      </div>
    </div>
  );
}
