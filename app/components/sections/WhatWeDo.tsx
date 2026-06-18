"use client";

import { useState } from "react";

const features = [
  {
    title: "Complete Outfit Generation",
    body: "Top, bottom, and footwear assembled as one coordinated look — never single items in isolation. Each outfit comes with a diverse ranked set of options and an honest confidence signal.",
    tag: "Core",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: "Visual Style Intelligence",
    body: "Perceives garments the way a stylist does — reading vibe, colour harmony, silhouette, texture, and formality directly from imagery. Coordination based on real visual harmony, not product tags.",
    tag: "AI Vision",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
      </svg>
    ),
  },
  {
    title: "Deep Taste Modelling",
    body: "Builds a continuously-updating model of your taste, body, budget, and occasions from every interaction. Deepens far beyond onboarding — matures like a fine wine the more you use it.",
    tag: "Personalisation",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    title: "See It On You",
    body: "Select a top, bottom, and footwear and see all three rendered photo-realistically on your own body — giving you a genuinely accurate idea of what fit and which garments actually look good on you.",
    tag: "Try-On",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
      </svg>
    ),
  },
  {
    title: "Inspiration & Social",
    body: "LTK-inspired shoppable looks and creator feeds. Follow someone's style and see it re-rendered for your own skin tone, body type, and preferences — never blindly copied, always personally yours.",
    tag: "Social",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Shop the Look",
    body: "Every article carries an affiliate link to the retailer's own product page. From inspiration to ownership in one tap — no markups, no middleman, no hidden costs.",
    tag: "Commerce",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
  },
];

export default function WhatWeDo() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="features" style={{ background: "var(--surface)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p className="eyebrow">Features</p>
        <h2
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 500,
            color: "var(--text)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "520px",
            marginBottom: "3.5rem",
          }}
        >
          Everything you need to get dressed with{" "}
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>confidence.</em>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1px",
            background: "var(--rule)",
            border: "1px solid var(--rule)",
          }}
        >
          {features.map(({ title, body, tag, icon }, i) => (
            <div
              key={title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? "var(--wash)" : "var(--surface)",
                padding: "2.25rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "background 0.22s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Accent line on hover */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background: "var(--accent)",
                  transform: hovered === i ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease",
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: hovered === i ? "var(--accent)" : "var(--accent-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: hovered === i ? "var(--bg)" : "var(--accent)",
                  transition: "all 0.25s ease",
                }}
              >
                {icon}
              </div>

              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "var(--text)",
                  lineHeight: 1.3,
                }}
              >
                {title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.875rem",
                  color: "var(--mid)",
                  lineHeight: 1.75,
                  flex: 1,
                  margin: 0,
                }}
              >
                {body}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "9px",
                  color: hovered === i ? "var(--accent)" : "var(--mid)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
