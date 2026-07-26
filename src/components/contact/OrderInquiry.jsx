import { useEffect, useRef, useState } from "react";
import TraceBorder from "../ui/TraceBorder.jsx";

// Form fade-out duration. Must match the duration utility on the <form>.
const FORM_EXIT_MS = 450;

const FIELD_BASE =
  "w-full border-b border-silver-dim/40 bg-transparent pt-4 pb-3 font-serif text-xl text-bone outline-none transition-colors duration-300 placeholder:text-silver/80 focus:border-bone md:text-2xl";

function Field({ index, label, children }) {
  return (
    <div className="rule-t grid gap-2 py-8 md:grid-cols-12 md:gap-6 md:py-10">
      <span className="text-[11px] md:text-xs tracking-vast text-silver-dim md:col-span-1">
        {index}
      </span>
      <label className="block md:col-span-11">
        <span className="block text-xs uppercase leading-relaxed tracking-[0.18em] text-silver md:text-[13px]">
          {label}
        </span>
        {children}
      </label>
    </div>
  );
}

export default function OrderInquiry() {
  // idle -> exiting (form fading out) -> sent (confirmation shown)
  const [status, setStatus] = useState("idle");
  const exitTimer = useRef(null);

  useEffect(() => () => clearTimeout(exitTimer.current), []);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("exiting");
    exitTimer.current = setTimeout(() => setStatus("sent"), FORM_EXIT_MS);
  };

  return (
    <section id="order" className="rule-b px-6 py-24 md:px-12 md:py-32">
      <div className="max-w-3xl">
        <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
          05 &mdash; Order
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-bone md:text-6xl">
          Request to Order.
        </h2>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-silver">
          Leave your details and preferred color. No deposit, no serial
          number &mdash; we confirm everything over WhatsApp before you pay
          on delivery.
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-3xl md:mt-20">
        {status === "sent" ? (
          <div role="status" aria-live="polite" className="fade-rise py-6">
            <p className="text-[11px] md:text-xs uppercase tracking-vast text-silver-dim">
              Request Received
            </p>
            <p className="mt-6 font-serif text-3xl leading-tight text-bone md:text-4xl">
              Thanks &mdash; we&rsquo;ll message you on WhatsApp shortly.
            </p>
            <p className="mt-6 max-w-md text-base font-light leading-relaxed text-silver">
              We&rsquo;ll confirm color, price, and delivery timing before
              anything is charged.
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className={`transition-opacity duration-[450ms] ease-out ${
              status === "exiting" ? "pointer-events-none opacity-0" : ""
            }`}
          >
            <Field index="01" label="Full Name">
              <input
                type="text"
                name="fullName"
                required
                autoComplete="name"
                placeholder="Your name"
                className={FIELD_BASE}
              />
            </Field>

            <Field index="02" label="WhatsApp Number">
              <input
                type="tel"
                name="whatsapp"
                required
                autoComplete="tel"
                inputMode="tel"
                pattern="^[+0-9][0-9 ()-]{7,}$"
                placeholder="+20 —"
                className={FIELD_BASE}
              />
            </Field>

            <div className="rule-t grid gap-2 py-8 md:grid-cols-12 md:gap-6 md:py-10">
              <span className="text-[11px] md:text-xs tracking-vast text-silver-dim md:col-span-1">
                03
              </span>
              <div className="md:col-span-11">
                <span className="block text-xs uppercase leading-relaxed tracking-[0.18em] text-silver md:text-[13px]">
                  Preferred Color
                </span>
                <div className="mt-4 flex gap-4">
                  {["Graphite", "Bone"].map((color) => (
                    <label
                      key={color}
                      className="flex cursor-pointer items-center gap-2 border border-silver-dim/40 px-5 py-3 text-sm text-bone transition-colors duration-300 has-[:checked]:border-bone has-[:checked]:bg-bone/10"
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        defaultChecked={color === "Graphite"}
                        className="accent-bone"
                      />
                      {color}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="rule-t pt-10">
              <button
                type="submit"
                className="trace-box trace-box-loop w-full cursor-pointer bg-carbon px-8 py-5 text-xs md:text-[13px] uppercase tracking-vast text-bone transition-colors duration-300 hover:bg-white/5 md:w-auto"
              >
                <TraceBorder />
                Send Request
              </button>
              <p className="mt-6 max-w-md text-xs md:text-[13px] font-light leading-loose text-silver-dim">
                Payment on delivery via Aramex. Nothing is charged now.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
