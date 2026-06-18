"use client";

import { useReveal } from "@/lib/useReveal";

const problems = [
  { num: "01", text: "A full closet, yet nothing to wear — every single morning, the same quiet decision fatigue before the day has even started." },
  { num: "02", text: "Shopping apps show single items but never how to wear them together. You are left assembling outfits alone, with no system and no context." },
  { num: "03", text: "Constant doubt: does this match? Is this right for the occasion? Does it actually flatter me? Style is learnable — but no one taught you how." },
  { num: "04", text: "A personal stylist — someone who knows what flatters you, what coordinates, and what is worth buying — has always been a luxury for the few." },
];

export default function Problem() {
  useReveal();

  return (
    <section
      id="problem"
      style={{ background: "var(--text)", color: "var(--bg)" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p className="eyebrow reveal" style={{ color: "var(--gold)" }}>The Problem</p>
        <h2
          className="reveal reveal-d1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 300,
            color: "var(--bg)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "560px",
          }}
        >
          Everyone lives the same quiet friction. The market sells items. GYF delivers <em style={{ color: "var(--gold)", fontStyle: "italic" }}>outfits, confidence, and taste.</em>
        </h2>

        <div className="problem-grid">
          {problems.map(({ num, text }, i) => (
            <div key={num} className={`problem-card reveal reveal-d${i + 1}`}>
              <p className="problem-num">{num}</p>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
