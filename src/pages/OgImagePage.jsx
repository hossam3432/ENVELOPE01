import front from "../assets/product/01-front.jpg";

// Rendered at exactly 1200x630 (the standard og:image / twitter:image
// summary_large_image size) and screenshotted by
// scripts/generate-og-image.mjs to produce public/og.jpg. Not part of the
// public site — see src/main.jsx's "/__og-image__/" special case and
// public/robots.txt's matching Disallow.
//
// Deliberately plain <img>, not the responsive <picture> ProductGallery.jsx
// uses — this render only ever happens once, at build time, at one fixed
// size, so there's nothing to make responsive.
//
// Wordmark treatment mirrors src/components/layout/Header.jsx exactly
// (font-sans, uppercase, tracking-[0.3em], bone-on-carbon) at a size scaled
// for a 1200px canvas instead of a viewport header bar — same identity, same
// proportion of letter-spacing to type size, just bigger.
export default function OgImagePage() {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-carbon">
      <img
        src={front}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        style={{ objectPosition: "center 30%" }}
      />

      {/* Solid at the bottom, fading up into the photo — keeps the wordmark
          on a flat field it's guaranteed to read against regardless of what
          the crop underneath happens to show. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[280px]"
        style={{
          background:
            "linear-gradient(to top, #000000 45%, transparent 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 px-16 pb-14">
        <p
          className="text-bone"
          style={{
            fontFamily: "'IBM Plex Sans Arabic', 'Helvetica Neue', sans-serif",
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          ENVELOPE
        </p>
        <p
          className="mt-4 text-silver"
          style={{
            fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
            fontSize: 20,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          Model No. 0.1
        </p>
      </div>
    </div>
  );
}
