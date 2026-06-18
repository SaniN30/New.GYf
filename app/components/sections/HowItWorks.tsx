"use client";

import { useState } from "react";

const steps = [
  {
    num: "01",
    title: "Tell GYF about yourself",
    body: "Upload a photo and GYF auto-deduces your body type and skin tone — or set everything manually. Budget, occasion, preferred styling. Nothing is locked in; update any preference at any time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "GYF builds your first outfit",
    body: "A complete look — top, bottom, footwear — coordinated as one outfit for your specific body, skin tone, budget, and occasion. Every single choice comes with a clear, human-readable stylist explanation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "It gets smarter with you",
    body: "Every save, skip, and reaction trains your personal taste model. The more you use GYF, the more it feels uncannily, uniquely you — a stylist who has known you for years.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p className="eyebrow">How it Works</p>
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
          Dressed in three steps.
        </h2>

        <div className="hiw-layout">
          {/* Left: step list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map(({ num, title, icon }, i) => (
              <button
                key={num}
                onClick={() => setActive(i)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  padding: "1.75rem 0",
                  paddingLeft: active === i ? "1.25rem" : "0",
                  borderBottom: "1px solid var(--rule)",
                  borderLeft: `3px solid ${active === i ? "var(--accent)" : "transparent"}`,
                  transition: "all 0.25s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 400,
                    color: active === i ? "rgba(200,169,110,0.45)" : "rgba(255,255,255,0.1)",
                    lineHeight: 1,
                    minWidth: "3rem",
                    transition: "color 0.25s ease",
                  }}
                >
                  {num}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", textAlign: "left" }}>
                  <span style={{ color: active === i ? "var(--accent)" : "var(--mid)", transition: "color 0.2s", display: "flex" }}>
                    {icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
                      fontWeight: active === i ? 500 : 400,
                      color: active === i ? "var(--text)" : "var(--mid)",
                      lineHeight: 1.3,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right: detail card */}
          <div
            style={{
              position: "sticky",
              top: "7rem",
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: "2px",
              padding: "clamp(2rem, 4vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "clamp(4rem, 8vw, 7rem)",
                fontWeight: 400,
                color: "rgba(200,169,110,0.12)",
                lineHeight: 1,
              }}
            >
              {steps[active].num}
            </span>
            <div style={{ color: "var(--accent)" }}>{steps[active].icon}</div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
                  fontWeight: 500,
                  color: "var(--text)",
                  lineHeight: 1.25,
                  marginBottom: "1rem",
                }}
              >
                {steps[active].title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--mid)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {steps[active].body}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    width: active === i ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: active === i ? "var(--accent)" : "var(--rule)",
                    transition: "all 0.25s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hiw-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 6vw, 7rem);
          align-items: start;
        }
        @media (max-width: 700px) {
          .hiw-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
