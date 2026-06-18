"use client";

import { useState } from "react";

const phases = [
  {
    num: "01",
    title: "Intelligent Stylist",
    body: "AI that builds personalized, explained outfits from day one. Occasion-aware, region-aware, cold-start ready. Learns from real user behavior immediately — zero friction from the very first screen.",
    badge: "launch",
    badgeLabel: "Launching",
  },
  {
    num: "02",
    title: "Personal Taste Engine",
    body: "GYF knows your style deeply enough that picks feel uncannily you. Styles around your real wardrobe. Adapts to context — weather, event, mood. Earns badges, builds your profile.",
    badge: "soon",
    badgeLabel: "Coming Soon",
  },
  {
    num: "03",
    title: "Shopping Companion",
    body: "GYF shops with you across brands and retailers — recommending not just looks but the smartest things to buy to complete your wardrobe, within your budget.",
    badge: "soon",
    badgeLabel: "Roadmap",
  },
  {
    num: "04",
    title: "Visualisation Layer",
    body: "See any full look — top, bottom, footwear — realistically rendered on your own body before committing. Removing the last barrier between inspiration and confidence.",
    badge: "soon",
    badgeLabel: "Roadmap",
  },
  {
    num: "05",
    title: "Ambient Stylist",
    body: "GYF becomes the default way people decide what to wear and what to buy. A trusted companion present wherever fashion decisions happen — getting smarter for every person it dresses, forever.",
    badge: "future",
    badgeLabel: "Future",
  },
];

export default function Vision() {
  const [active, setActive] = useState(0);

  return (
    <section id="vision">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p className="eyebrow">The Arc</p>
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
          A stylist that compounds.
        </h2>

        <div className="hiw-layout">
          {/* Left: phase list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {phases.map(({ num, title, badge, badgeLabel }, i) => (
              <button
                key={num}
                onClick={() => setActive(i)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  padding: "1.5rem 0",
                  paddingLeft: active === i ? "1.25rem" : "0",
                  borderBottom: "1px solid var(--rule)",
                  borderLeft: `3px solid ${active === i ? "var(--accent)" : "transparent"}`,
                  transition: "all 0.25s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                    fontWeight: 400,
                    color: active === i ? "rgba(200,169,110,0.45)" : "rgba(255,255,255,0.1)",
                    lineHeight: 1,
                    minWidth: "2.8rem",
                    transition: "color 0.25s ease",
                  }}
                >
                  {num}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", textAlign: "left" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                      fontWeight: active === i ? 500 : 400,
                      color: active === i ? "var(--text)" : "var(--mid)",
                      lineHeight: 1.3,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "8.5px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: badge === "launch" ? "var(--accent)" : "var(--mid)",
                      opacity: badge === "launch" ? 1 : 0.6,
                    }}
                  >
                    {badgeLabel}
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
              {phases[active].num}
            </span>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "8.5px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: phases[active].badge === "launch" ? "var(--accent)" : "var(--mid)",
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                {phases[active].badgeLabel}
              </span>
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
                {phases[active].title}
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
                {phases[active].body}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {phases.map((_, i) => (
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
    </section>
  );
}
