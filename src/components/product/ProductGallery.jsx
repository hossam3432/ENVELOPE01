import { useState } from "react";

import front from "../../assets/product/01-front.jpg";
import gusset from "../../assets/product/02-gusset.jpg";
import top from "../../assets/product/03-top.jpg";
import interior from "../../assets/product/04-interior.jpg";
import base from "../../assets/product/05-base.jpg";
import handle from "../../assets/product/06-handle.jpg";
import facet from "../../assets/product/07-facet.jpg";

import frontThumb from "../../assets/product/thumb/01-front.jpg";
import gussetThumb from "../../assets/product/thumb/02-gusset.jpg";
import topThumb from "../../assets/product/thumb/03-top.jpg";
import interiorThumb from "../../assets/product/thumb/04-interior.jpg";
import baseThumb from "../../assets/product/thumb/05-base.jpg";
import handleThumb from "../../assets/product/thumb/06-handle.jpg";
import facetThumb from "../../assets/product/thumb/07-facet.jpg";

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
];

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
        <p>
          Pl. {String(index + 1).padStart(2, "0")} &mdash; {plate.title}
        </p>
        <p className="shrink-0">
          {String(index + 1).padStart(2, "0")} / {String(PLATES.length).padStart(2, "0")}
        </p>
      </div>

      <div
        role="group"
        aria-label="Model 001 photographs — use the left and right arrow keys to change plate"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mt-3 aspect-square overflow-hidden border border-silver-dim/20 bg-carbon-soft outline-none focus-visible:border-bone/60"
      >
        {/* No key here on purpose — swapping src in place keeps the previous
            plate on screen until the next one has decoded, so the frame never
            flashes empty mid-change. */}
        <img
          src={plate.src}
          alt={plate.alt}
          width="1400"
          height="1875"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {PLATES.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Plate ${i + 1} — ${item.title}`}
            aria-current={i === index ? "true" : undefined}
            className={`aspect-square overflow-hidden border transition-opacity duration-300 ${
              i === index
                ? "border-bone/70 opacity-100"
                : "border-silver-dim/20 opacity-50 hover:opacity-90"
            }`}
          >
            <img
              src={item.thumb}
              alt=""
              width="220"
              height="295"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
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
