import { useState } from "react";

import TraceBorder from "../ui/TraceBorder.jsx";

import front from "../../assets/product/01-front.jpg";
import gusset from "../../assets/product/02-gusset.jpg";
import top from "../../assets/product/03-top.jpg";
import interior from "../../assets/product/04-interior.jpg";
import base from "../../assets/product/05-base.jpg";
import handle from "../../assets/product/06-handle.jpg";
import facet from "../../assets/product/07-facet.jpg";
import interiorPacked from "../../assets/product/08-interior-packed.jpg";
import strap from "../../assets/product/09-strap.jpg";

import frontThumb from "../../assets/product/thumb/01-front.jpg";
import gussetThumb from "../../assets/product/thumb/02-gusset.jpg";
import topThumb from "../../assets/product/thumb/03-top.jpg";
import interiorThumb from "../../assets/product/thumb/04-interior.jpg";
import baseThumb from "../../assets/product/thumb/05-base.jpg";
import handleThumb from "../../assets/product/thumb/06-handle.jpg";
import facetThumb from "../../assets/product/thumb/07-facet.jpg";
import interiorPackedThumb from "../../assets/product/thumb/08-interior-packed.jpg";
import strapThumb from "../../assets/product/thumb/09-strap.jpg";

/* Plates run alongside the Fig. drawings — photographs, not elevations.
   Each note repeats a dimension the site already publishes elsewhere. */
const PLATES = [
  {
    src: front,
    thumb: frontThumb,
    title: "Front Elevation",
    note: "420 × 310. One flat panel per face, folded into four facets.",
    alt: "The Model 001 briefcase photographed square on: a black full-grain leather front panel creased into four facets around a central envelope flap, twin rolled handles, twin zip sliders at the top edge.",
  },
  {
    src: gusset,
    thumb: gussetThumb,
    title: "Right Gusset",
    note: "140 deep. The zip runs 90 down, D-ring above the fold line.",
    alt: "The briefcase seen from the right side: a 140 millimetre gusset, the metal zip turning down from the top edge, a brushed steel D-ring on a leather tab.",
    fit: "contain",
  },
  {
    src: top,
    thumb: topThumb,
    title: "Top, Closed",
    note: "≈600 mm U-zip track, twin sliders. 100 mm clear handle drop.",
    alt: "The briefcase from directly above, closed: the metal zip track running the length of the top edge with two sliders parked centre, the rolled handles held by brushed steel keepers.",
  },
  {
    src: interior,
    thumb: interiorThumb,
    title: "Interior, Zip Open",
    note: "Padded 16″ sleeve, 370 × 265. Cotton canvas lining throughout.",
    alt: "The briefcase from above with the zip fully open, showing the cotton canvas lining, the padded laptop sleeve across the back wall and a slim card pocket on the right.",
    fit: "contain",
  },
  {
    src: interiorPacked,
    thumb: interiorPackedThumb,
    title: "Interior, Packed",
    note: "A 16″ laptop, charging gear, and daily carry — all seated, nothing loose.",
    alt: "The briefcase open and packed on a desk: a laptop in the padded sleeve, cables and a power bank in the mesh pockets, earbuds, a notebook, pen, keys, phone, and a water bottle in the main compartment.",
    fit: "contain",
  },
  {
    src: base,
    thumb: baseThumb,
    title: "Base",
    note: "Flat, reinforced base on four steel feet. Stands unaided, empty.",
    alt: "The underside of the briefcase: a flat reinforced base panel with a brushed steel foot set into each of the four corners.",
  },
  {
    src: handle,
    thumb: handleThumb,
    title: "Handle Anchor",
    note: "Rolled leather through brushed steel. 7–9 stitches per inch.",
    alt: "Close detail of a rolled leather handle passing through a brushed steel keeper, stitched down to the body panel.",
  },
  {
    src: facet,
    thumb: facetThumb,
    title: "Facet Corner",
    note: "Creases skived to 0.7 mm at the fold, so they never crack white.",
    alt: "Close detail of a folded corner where three facets meet, with the zip terminating in a leather garage just below.",
  },
  {
    src: strap,
    thumb: strapThumb,
    title: "Strap, Detached",
    note: "20 mm leather, brushed steel swivel clips. Adjusts 850–1350 mm.",
    alt: "The detachable shoulder strap laid flat: leather with a centre slide adjuster and a brushed steel swivel clip at each end.",
    fit: "contain",
  },
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
        <div className="aspect-square h-[26dvh] max-h-[360px] min-h-[160px] w-auto max-w-full overflow-hidden bg-carbon-soft">
          <img
            src={plate.src}
            alt={plate.alt}
            width="1400"
            height="1875"
            decoding="async"
            className={`h-full w-full object-center ${
              plate.fit === "contain" ? "object-contain" : "object-cover"
            }`}
          />
        </div>
        <TraceBorder
          key={number}
          className="trace-on-mount text-bone/70"
          strokeWidth={0.67}
        />
      </div>
      <figcaption className="mt-2 text-center text-[11px] uppercase tracking-vast text-silver-dim">
        Pl. {String(number).padStart(2, "0")} &mdash; {plate.title}
      </figcaption>
    </figure>
  );
}

export default function ProductGallery() {
  const [index, setIndex] = useState(0);
  const plate = PLATES[index];

  const step = (delta) =>
    setIndex((i) => (i + delta + PLATES.length) % PLATES.length);

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
        <p>Plates</p>
        <p className="shrink-0">
          {String(index + 1).padStart(2, "0")} / {String(PLATES.length).padStart(2, "0")}
        </p>
      </div>

      {/* One large plate, centered above the thumbnail strip. */}
      <div
        role="group"
        aria-label="Model 001 photographs — use the left and right arrow keys to change plate"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mx-auto mt-3 w-full outline-none focus-visible:[&_.aspect-square]:border-bone/60"
      >
        <Plate plate={plate} number={index + 1} />
      </div>

      <div className="mt-3 grid grid-cols-9 gap-2">
        {PLATES.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Plate ${i + 1} — ${item.title}`}
            aria-current={i === index ? "true" : undefined}
            className={`aspect-square overflow-hidden border bg-carbon-soft p-1 transition-opacity duration-300 ${
              i === index
                ? "border-bone/70 opacity-100"
                : "border-silver-dim/20 opacity-50 hover:opacity-90"
            }`}
          >
            {/* contain, not cover — the whole plate is visible in the strip */}
            <img
              src={item.thumb}
              alt=""
              width="220"
              height="295"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain object-center"
            />
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-4 text-[11px] uppercase tracking-vast text-silver-dim">
        <p className="max-w-[30ch] leading-relaxed normal-case tracking-[0.12em] text-silver">
          {plate.note}
        </p>
        <p className="shrink-0">Cairo, EG</p>
      </div>
    </div>
  );
}
