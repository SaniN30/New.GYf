"use client";

import { useState } from "react";

const pillars = [
  {
    num: "01",
    title: "Visual Style Intelligence",
    body: "Sees and understands clothing the way a stylist does — reading aesthetic, vibe, colour harmony, silhouette, and texture directly from imagery. Coordination based on real visual harmony, not metadata.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Deep Personal Taste Modelling",
    body: "A living, individual representation of each user's preferences — updated continuously, deepening far beyond onboarding. Anticipates what you will love before you have seen it.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Collective Intelligence",
    body: "Learns from how thousands of people react to combinations — discovering styling patterns no rulebook contains. Those insights are distilled and tailored back to you specifically, privately.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Trust as a Feature",
    body: "Every recommendation is explainable and honest about its confidence. Sophistication and transparency advance together — always. Trust is the product, not a feature bolted on later.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function Intelligence() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="intelligence" style={{ background: "var(--text)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          className="eyebrow"
          style={{ color: "var(--accent)" }}
        >
          The Intelligence
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 500,
            color: "var(--bg)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "520px",
            marginBottom: "4rem",
          }}
        >
          Intelligence as the foundation —{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>not a feature added later.</em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
          }}
        >
          {pillars.map(({ num, title, body, icon }, i) => (
            <div
              key={num}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                background: active === i ? "rgba(255,255,255,0.06)" : "var(--text)",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                cursor: "default",
                transition: "background 0.25s ease",
                borderLeft: active === i ? "2px solid var(--accent)" : "2px solid transparent",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    fontWeight: 400,
                    color: active === i ? "rgba(200,169,110,0.3)" : "rgba(255,255,255,0.08)",
                    lineHeight: 1,
                    transition: "color 0.25s ease",
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    color: active === i ? "var(--accent)" : "rgba(255,255,255,0.25)",
                    transition: "color 0.25s ease",
                  }}
                >
                  {icon}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                  fontWeight: 500,
                  color: active === i ? "var(--bg)" : "rgba(13,13,13,0.9)",
                  lineHeight: 1.3,
                  transition: "color 0.2s",
                }}
              >
                {title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.875rem",
                  color: active === i ? "rgba(13,13,13,0.65)" : "rgba(13,13,13,0.45)",
                  lineHeight: 1.75,
                  margin: 0,
                  transition: "color 0.2s",
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
