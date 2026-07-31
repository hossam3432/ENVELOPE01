// Canonical English copy — every visible string on the site, nested by
// section so it's easy to cross-check against the Arabic counterpart in
// ar.js string-for-string. This file is the source of truth: ar.js derives
// its numeric figures from the literal numbers here (see digits.js) so the
// two languages can't quietly drift apart on a spec value.

const en = {
  header: {
    wordmark: "Envelope 01",
    tagline: "Engineered Form — Cairo, EG",
    menuOpen: "Menu",
    menuClose: "Close",
  },

  menu: {
    links: [
      { index: "01", label: "The Manifesto", href: "#manifesto" },
      { index: "02", label: "Model 001", href: "#product" },
      { index: "03", label: "The Interior", href: "#interior" },
      { index: "04", label: "Material Truth", href: "#anatomy" },
      { index: "05", label: "Order", href: "#order" },
    ],
    tagline: "Structural leather objects",
    est: "Est. Cairo",
  },

  hero: {
    calloutsAbove: [
      { lines: ["#8 U-ZIP · TWIN SLIDER"] },
      { lines: ["D-RING ×2"] },
      { lines: ["BRUSHED STEEL FITTING"] },
    ],
    calloutsBelow: [
      { lines: ["MAGNETIC SNAP Ø18", "CONCEALED, FLAP TIP"] },
      { lines: ["STEEL FEET ×4"] },
      { lines: ["FOUR FOLDED FACETS", "CREASE SKIVED 0.7"] },
    ],
    sheetAriaLabel:
      "Technical front elevation of Model 001, the folded briefcase: 420 by 310 by 120 millimetres, four triangular facets radiating from a centre point, U-shaped zip, one rolled top handle per face.",
    widthNote: "420",
    heightNote: "310",
    titleBlock: {
      model: "MODEL",
      serial: "001",
      type: "FOLDED BRIEFCASE",
      view: "VIEW 1 — FRONT ELEVATION",
      dims: "DIMENSIONS IN MM · TOL ±2",
      col2Line1: "420 × 310 × 120 MM",
      col2Line2: "≈18 L, 1.15–1.30 KG",
      col2Line3: "FULL-GRAIN 1.2",
      col3Line1: "ZIP TRACK ≈600",
      col3Line2: "15 PER GUSSET",
      col3Line3: "STITCH 7–9 SPI",
    },
    titleBlockDetails: {
      model: "Model",
      serial: "001",
      type: "Folded Briefcase",
      view: "View 1 — Front Elevation",
      dims: "Dimensions in mm · Tol ±2",
    },
    figCaption: "Fig. 01 — Model 001, Front Elevation",
    tolerance: "Tolerance ±2 MM — Design Intent",
    quickSpecs: [
      { label: "External", value: "420 × 310 × 120" },
      { label: "Volume", value: "≈18 L" },
      { label: "Weight", value: "1.15–1.30 kg" },
      { label: "Fits", value: "16″ laptop" },
      { label: "Leather", value: "Full-grain 1.2mm" },
    ],
    statementH1: "Structured elegance for the modern workday.",
    statementBody:
      "One flat panel, folded into four triangular facets that meet at a single point. A 16″ laptop, a full day's carry, and a shape that stands on its own. No excess. Just pure structural geometry.",
    statementCta: "View the Briefcase",
    manifestoEyebrow: "Manifesto",
    manifestoH2: "We do not decorate. We construct.",
    manifestoBody:
      "In a market of identical bags, we asked what happens when structure becomes the only signature. Each piece is cut, folded, and finished by hand in small Egyptian workshops, built for the private-sector professional who values order and quiet authority.",
  },

  product: {
    collectionEyebrow: "02 — The Standing Collection",
    collectionH2: "One Model. Built to Carry a Full Day.",
    modelH2: "Model 001 — The Folded Briefcase",
    modelIntro:
      "One flat panel per face, folded into four facets. U-zip main compartment. Padded 16″ sleeve. Stands on its own.",
    specItems: [
      { label: "External", value: "420 × 310 × 120 mm" },
      { label: "Volume", value: "≈18 L" },
      { label: "Weight", value: "1.15–1.30 kg, empty" },
      { label: "Fit", value: "16″ laptop, upright" },
      { label: "Closure", value: "#8 metal U-zip, ≈600 mm track, twin sliders" },
      { label: "Handles", value: "Rolled leather, 250 mm, 100 mm clear drop" },
      { label: "Strap", value: "Detachable, 18 mm, adjusts 850–1350 mm" },
      { label: "Leather", value: "Full-grain, matte, 1.2 mm" },
      { label: "Colorway", value: "Black or Bone" },
      { label: "Hardware", value: "316L Brushed stainless steel" },
      { label: "Base", value: "Flat, reinforced, four steel feet" },
    ],
    toleranceNote: "All external, in millimetres. Tolerance ±2 mm.",
    price: "6,500 – 7,000 EGP",
    cta: "Request to Order",

    gussetFigCaption: "Fig. 03 — Right Gusset, Elevation",
    gussetDepthLabel: "120 Deep",
    gussetAriaLabel:
      "Right gusset elevation: 120 millimetre depth, zip running 15 millimetres down from the top edge to a leather garage above the facet fold line, D-ring at the top, two of the four steel feet visible.",
    gussetZipNote: "15",
    gussetHeightNote: "310",
    gussetDepthNote: "120",
    gussetFoldNoteLine1: "FACET FOLD —",
    gussetFoldNoteLine2: "ZIP ENDS ABOVE IT",
    gussetBody:
      "The zip turns 15 mm down each gusset and stops in a leather garage above the facet fold line — so the track never crosses a crease, and the bag opens from either end without fighting the fold.",

    scaleFigCaption: "Fig. 15 — Scale Reference",
    scaleSubLabel: "16″ Laptop In Situ",
    scaleAriaLabel:
      "Scale reference: a closed 16-inch laptop, 356 by 249 millimetres, shown as a hidden outline inside the 420 by 310 millimetre body, seated 25 millimetres below the zip line.",
    scaleWidthNote: "420",
    scaleCalloutsAbove: [{ lines: ["25 CLEARANCE", "BELOW THE ZIP LINE"] }],
    scaleCalloutsBelow: [
      { lines: ["PADDED SLEEVE", "370 × 265, 6 MM FOAM"] },
      { lines: ["16″ LAPTOP, CLOSED", "356 × 249"] },
    ],
    scaleBody:
      "A closed 16″ laptop is 356 mm wide and 249 mm high. The padded sleeve is 370 × 265, and the laptop seats 25 mm below the zip line — so the track never runs across the lid when you close the bag.",

    strapFigCaption: "Fig. 12 — Strap, Laid Flat",
    strapSubLabel: "Detachable",
    strapAriaLabel:
      "The detachable shoulder strap laid flat: 18 millimetres wide, brushed steel swivel clip at each end, centre slide adjuster, adjusting from 850 to 1350 millimetres.",
    strapRangeNote: "850 – 1350",
    strapWideNote: "18 WIDE",
    strapBody:
      "18 mm leather, brushed steel swivel clips at both ends, centre slide adjuster. It adjusts from 850 to 1350 mm — a 55 cm maximum drop, which is crossbody on a tall wearer. Unclip it and the bag is a briefcase again.",
  },

  gallery: {
    plateLabel: "Plates",
    plateWord: "Pl.",
    groupAriaLabel:
      "Model 001 photographs — use the left and right arrow keys to change plate",
    locationTag: "Cairo, EG",
    plates: [
      {
        title: "Front Elevation",
        note: "420 × 310. One flat panel per face, folded into four facets.",
        alt: "The Model 001 briefcase photographed square on: a black full-grain leather front panel creased into four facets around a central envelope flap, twin rolled handles, twin zip sliders at the top edge.",
      },
      {
        title: "Right Gusset",
        note: "120 deep. The zip runs 15 down, D-ring above the fold line.",
        alt: "The briefcase seen from the right side: a 120 millimetre gusset, the metal zip turning down from the top edge, a brushed steel D-ring on a leather tab.",
      },
      {
        title: "Top, Closed",
        note: "≈600 mm U-zip track, twin sliders. 100 mm clear handle drop.",
        alt: "The briefcase from directly above, closed: the metal zip track running the length of the top edge with two sliders parked centre, the rolled handles held by brushed steel keepers.",
      },
      {
        title: "Interior, Zip Open",
        note: "Padded 16″ sleeve, 370 × 265. Cotton canvas lining throughout.",
        alt: "The briefcase from above with the zip fully open, showing the cotton canvas lining, the padded laptop sleeve across the back wall and a slim card pocket on the right.",
      },
      {
        title: "Interior, Packed",
        note: "A 16″ laptop, charging gear, and daily carry — all seated, nothing loose.",
        alt: "The briefcase open and packed on a desk: a laptop in the padded sleeve, cables and a power bank in the mesh pockets, earbuds, a notebook, pen, keys, phone, and a water bottle in the main compartment.",
      },
      {
        title: "Base",
        note: "Flat, reinforced base on four steel feet. Stands unaided, empty.",
        alt: "The underside of the briefcase: a flat reinforced base panel with a brushed steel foot set into each of the four corners.",
      },
      {
        title: "Handle Anchor",
        note: "Rolled leather through brushed steel. 7–9 stitches per inch.",
        alt: "Close detail of a rolled leather handle passing through a brushed steel keeper, stitched down to the body panel.",
      },
      {
        title: "Facet Corner",
        note: "Creases skived to 0.7 mm at the fold, so they never crack white.",
        alt: "Close detail of a folded corner where three facets meet, with the zip terminating in a leather garage just below.",
      },
      {
        title: "Strap, Detached",
        note: "18 mm leather, brushed steel swivel clips. Adjusts 850–1350 mm.",
        alt: "The detachable shoulder strap laid flat: leather with a centre slide adjuster and a brushed steel swivel clip at each end.",
      },
    ],
  },

  interior: {
    eyebrow: "03 — The Interior",
    h2: "Medium compartmented. Hybrid materials.",
    intro:
      "Full-grain leather shell, with a two-material interior: woven cotton canvas across the main compartment, and a synthetic microfibre suede on the laptop sleeve and organiser panel. Leather is specified where it carries load or takes wear. A full leather lining would add close to 200 g to a 1.2 kg bag without changing how it performs — weight better spent elsewhere.",
    figCaption: "Fig. 05 — Top Down, Zip Fully Open",
    planLabel: "Plan — Millimetres",
    ariaLabel:
      "Top-down plan of Model 001 with the U-zip fully open: padded laptop sleeve on the back wall, leather-faced organiser panel on the front wall, key leash on the left gusset, and a full-height central divider splitting the main compartment in two.",
    centralDividerLabel: "CENTRAL DIVIDER",
    widthNote: "420",
    depthNote: "120",
    calloutsAbove: [
      { lines: ["PADDED LAPTOP SLEEVE", "370 × 265, 6 MM FOAM"] },
      { lines: ["CHARCOAL WOVEN LINING"] },
    ],
    calloutsBelow: [
      { lines: ["KEY LEASH"] },
      { lines: ["ORGANISER PANEL", "LEATHER-FACED"] },
      { lines: ["ZIPPED VALUABLES", "200 × 150, FRONT WALL"] },
    ],
    surfacesLabel: "Surfaces",
    surfaces: [
      { surface: "Body lining — walls and base", material: "Dense woven, opaque, dark charcoal" },
      { surface: "Organiser panel face", material: "Leather, same hide as the shell" },
      { surface: "Pocket mouths and slot edges", material: "Leather-trimmed, edge-finished" },
      { surface: "Laptop sleeve", material: "Woven, 6 mm foam, leather-trimmed mouth" },
      { surface: "Central divider", material: "Full height, same lining as body" },
    ],
    clearDimsLabel: "Interior clear dimensions",
    clearDims: [
      { label: "Main compartment", value: "400 × 290 × 130" },
      { label: "Laptop sleeve", value: "370 × 265" },
      { label: "Front pocket", value: "400 × 110" },
    ],
    pocketsLabel: "Pockets",
    pockets: [
      { name: "Padded laptop sleeve", where: "Back wall", spec: "370 × 265, retention strap with magnetic tab" },
      { name: "Zipped valuables pocket", where: "Front wall, upper", spec: "200 × 150, leather-faced" },
      { name: "Pen slots ×2", where: "Organiser", spec: "Leather" },
      { name: "Card slot ×1", where: "Organiser", spec: "Leather" },
      { name: "Open slip ×2", where: "Organiser", spec: "Woven, leather-trimmed mouth" },
      { name: "Key leash", where: "Left gusset", spec: "Leather tab, brushed steel clip" },
    ],
    frontPocketFig: "Fig. 13 — Front Pocket",
    frontPocketH3: "The flap is not decoration.",
    frontPocketBody:
      "The upper facet of the front panel is a working flap. It folds down on an 18 mm concealed magnetic snap onto a shallow organiser: one tall slot, three card slots, one flat slip, 110 mm deep.",
    frontPocketRows: [
      {
        label: "Snap",
        value:
          "18 mm concealed, steel backing washer both sides, 30 mm bonded leather patch behind each half",
      },
      {
        label: "Hinge",
        value:
          "Skived to 0.7 mm across the fold, bonded reinforcement strip behind — full thickness cracks white within months",
      },
      {
        label: "Snap offset",
        value:
          "Minimum 40 mm from the card slots, so the magnet never sits against a stripe card or a keycard",
      },
    ],
    frontPocketFooter:
      "Carry a card and a receipt here. Your phone belongs in the main compartment — that one stays zipped, which is the point that matters on a crowded commute.",
  },

  anatomy: {
    eyebrow: "04 — Material Truth",
    h2: "The Anatomy of a Daily Investment.",
    intro:
      "True luxury is absolute transparency. Every material and dimension below is published, so you can check it against anything else you're considering.",
    specs: [
      {
        label: "Substance",
        value: "1.2mm full-grain leather, matte.",
        truth: "Ages naturally. Never peels.",
      },
      {
        label: "Geometry",
        value: "One flat panel per face, folded into four facets.",
        truth: "Creases skived to 0.7mm so they never crack white.",
      },
      {
        label: "Structure",
        value: "No rigid board — 120mm gusset, reinforced flat base.",
        truth: "Stands unaided when empty.",
      },
      {
        label: "Closure",
        value: "#8 metal U-zip, ≈600mm track, twin sliders.",
        truth: "15mm down each gusset. Opens from either end.",
      },
      {
        label: "Hardware",
        value: "Brushed steel fittings, D-rings, sliders and feet.",
        truth: "Chosen for what the hand registers, not plating grade.",
      },
      {
        label: "Construction",
        value: "7–9 SPI (Stitches Per Inch).",
        truth: "Tolerance ±2mm on every dimension we publish.",
      },
      {
        label: "Mass",
        value: "1.15–1.30kg empty, strap attached.",
        truth: "≈18 litres usable.",
      },
    ],
    handoverFig: "Fig. 09 — Delivery Protocol",
    handoverH3: "The Handover.",
    handoverBody:
      "Every Envelope 01 piece arrives in a rigid bone-colored box, enclosed in a protective cotton dust bag with the full specification card. Payment is collected on delivery — nothing is charged before then.",
  },

  order: {
    eyebrow: "05 — Order",
    h2: "Request to Order.",
    intro:
      "Leave your details and preferred color. No deposit, no serial number — we confirm everything over WhatsApp before you pay on delivery.",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "Your name",
    whatsappLabel: "WhatsApp Number",
    whatsappPlaceholder: "+20 —",
    colorLabel: "Preferred Color",
    colorNote: "The page takes on the colour you choose.",
    colorways: [
      { name: "Black", theme: "black" },
      { name: "Bone", theme: "bone" },
    ],
    submit: "Send Request",
    paymentNote: "Payment on delivery via Aramex. Nothing is charged now.",
    sentEyebrow: "Request Received",
    sentH: "Thanks — we'll message you on WhatsApp shortly.",
    sentBody:
      "We'll confirm color, price, and delivery timing before anything is charged.",
  },

  consent: {
    bannerAriaLabel: "Cookie consent",
    bannerEyebrow: "Privacy",
    bannerBody:
      "We use cookies to measure site performance and personalize advertising. Choose what you allow — change this anytime via Cookie Settings.",
    customize: "Customize",
    rejectAll: "Reject All",
    acceptAll: "Accept All",
    modalAriaLabel: "Cookie preferences",
    modalClose: "Close",
    modalEyebrow: "Cookie Preferences",
    modalH3: "Manage Consent",
    necessaryLabel: "Strictly Necessary",
    necessaryDesc: "Required for the site to function. Always active.",
    analyticsLabel: "Analytics",
    analyticsDesc:
      "Helps us understand how visitors use the site (Google Analytics).",
    adsLabel: "Advertising",
    adsDesc:
      "Used to personalize ads and measure campaign performance (Google Ads).",
    savePreferences: "Save Preferences",
  },

  footer: {
    tagline: "Engineered in Egypt",
    cookieSettings: "Cookie Settings",
  },

  // Standalone content pages beyond the homepage (src/pages/*.jsx) — see
  // docs/content-plan.md for the brief each one is built against.
  // metaTitle/metaDescription are placeholders read directly by a future
  // src/seo/meta.ts update, not yet wired up. H1/eyebrow are placeholders
  // too: replace them together with the body copy, not before, so the two
  // never say something the homepage spec table disagrees with.
  pages: {
    specification: {
      eyebrow: "Reference",
      h1: "Model No. 0.1 — Full Specification",
      metaTitle: "TODO",
      metaDescription: "TODO",
    },
    leatherGuide: {
      eyebrow: "Competence Notes",
      h1: "How to Identify Full-Grain Leather",
      metaTitle: "TODO",
      metaDescription: "TODO",
    },
    hardware: {
      eyebrow: "Material Truth",
      h1: "316L Stainless Hardware — Specification and Verification",
      metaTitle: "TODO",
      metaDescription: "TODO",
    },
    pricePolicy: {
      eyebrow: "Behind the Make",
      h1: "6,500 EGP — What the Price Includes",
      metaTitle: "TODO",
      metaDescription: "TODO",
    },
    // Rendered by src/pages/NotFoundPage.jsx for any locale-prefixed path
    // that matches no slug in src/routes.js — see src/main.jsx. Meta
    // title/description for this same page live in src/seo/meta.ts
    // (NOT_FOUND_TITLE/NOT_FOUND_DESCRIPTION), not here — this is on-page
    // copy, that's the SEO-specific phrasing.
    notFound: {
      eyebrow: "Error",
      h1: "This Page Doesn't Exist",
      body: "The link you followed doesn't match anything ENVELOPE publishes. Model No. 0.1 — the structured leather work briefcase — is on the homepage.",
      cta: "View the Briefcase",
    },
  },
};

export default en;
