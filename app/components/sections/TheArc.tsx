"use client";

import { useState } from "react";

const phases = [
  {
    number: "01",
    title: "The Intelligent Stylist",
    body: "Personalized, explained outfits from day one. Learns from real user behavior immediately.",
    status: "now",
  },
  {
    number: "02",
    title: "The Personal Taste Engine",
    body: "GYF knows your style deeply. It styles around your real wardrobe and adapts continuously.",
    status: "soon",
  },
  {
    number: "03",
    title: "The Shopping Companion",
    body: "Shops with you across brands and retailers — recommending the smartest additions to your wardrobe.",
    status: "roadmap",
  },
  {
    number: "04",
    title: "The Visualisation Layer",
    body: "See any look realistically on yourself before committing. Inspiration becomes confidence.",
    status: "roadmap",
  },
  {
    number: "05",
    title: "The Ambient Stylist",
    body: "The default way people decide what to wear. A compounding intelligence, present wherever fashion decisions happen.",
    status: "future",
  },
];

const statusColor: Record<string, string> = {
  now: "var(--accent)",
  soon: "rgba(255,255,255,0.35)",
  roadmap: "rgba(255,255,255,0.25)",
  future: "rgba(255,255,255,0.18)",
};

export default function TheArc() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      style={{
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,5rem)",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--mid)",
            marginBottom: "1.5rem",
          }}
        >
          The Arc
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 500,
            color: "var(--text)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "480px",
            marginBottom: "4rem",
          }}
        >
          Where GYF is going.
        </h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {phases.map(({ number, title, body, status }, i) => (
            <div
              key={number}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "4rem 1fr",
                gap: "2rem",
                padding: "2rem 0",
                borderBottom: "1px solid var(--rule)",
                cursor: "default",
                opacity: hovered === null ? 1 : hovered === i ? 1 : 0.4,
                transition: "opacity 0.2s ease",
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  color: statusColor[status],
                  paddingTop: "4px",
                  transition: "color 0.2s",
                }}
              >
                {number}
              </span>

              {/* Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                      fontWeight: status === "now" ? 500 : 400,
                      color: status === "now" ? "var(--text)" : "var(--mid)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                      transition: "color 0.2s",
                    }}
                  >
                    {title}
                  </span>
                  {status === "now" && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "8px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        border: "1px solid rgba(200,169,110,0.35)",
                        padding: "3px 10px",
                        borderRadius: "2px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Now
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--mid)",
                    lineHeight: 1.75,
                    margin: 0,
                    maxWidth: "640px",
                  }}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
