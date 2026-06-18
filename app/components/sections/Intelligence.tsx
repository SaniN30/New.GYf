"use client";

import { useReveal } from "@/lib/useReveal";

const pillars = [
  {
    num: "01",
    title: "Visual Style Intelligence",
    body: "Sees and understands clothing the way a stylist does — reading aesthetic, vibe, colour harmony, silhouette, and texture directly from imagery. Coordination based on real visual harmony, not metadata.",
  },
  {
    num: "02",
    title: "Deep Personal Taste Modelling",
    body: "A living, individual representation of each user's preferences — updated continuously, deepening far beyond onboarding. Anticipates what you will love before you have seen it.",
  },
  {
    num: "03",
    title: "Collective Intelligence",
    body: "Learns from how thousands of people react to combinations — discovering styling patterns no rulebook contains. Those insights are distilled and tailored back to you specifically, privately.",
  },
  {
    num: "04",
    title: "Trust as a Feature",
    body: "Every recommendation is explainable and honest about its confidence. Sophistication and transparency advance together — always. Trust is the product, not a feature bolted on later.",
  },
];

export default function Intelligence() {
  useReveal();

  return (
    <section id="intelligence" style={{ background: "var(--text)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p className="eyebrow reveal" style={{ color: "var(--gold)" }}>The Intelligence</p>
        <h2
          className="reveal reveal-d1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 300,
            color: "var(--bg)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "520px",
          }}
        >
          GYF&apos;s core differentiation. Intelligence as the foundation —{" "}
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>not a feature added later.</em>
        </h2>

        <div className="intel-grid">
          {pillars.map(({ num, title, body }, i) => (
            <div key={num} className={`reveal reveal-d${i + 1}`}>
              <div className="intel-num">{num}</div>
              <div className="intel-title">{title}</div>
              <div className="intel-body">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
