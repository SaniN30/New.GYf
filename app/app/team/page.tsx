"use client";

import { useState } from "react";
import CTABanner from "@/components/sections/CTABanner";

const team = [
  {
    name: "Sanidhya Nautiyal",
    role: "Co-founder & CEO",
    bio: "Sanidhya leads GYF's product vision, strategy, and growth. Driven by the belief that great personal style shouldn't be a luxury, he's building the intelligence layer that makes every person their own stylist — free, instant, and deeply personal.",
    initials: "SN",
  },
  {
    name: "Atharv Motghare",
    role: "Co-founder & CTO",
    bio: "Atharv architects the AI and engineering backbone of GYF. He translates complex machine learning research into real, scalable products — from visual style understanding to personal taste modelling — ensuring GYF's intelligence compounds with every user interaction.",
    initials: "AM",
  },
  {
    name: "Aryan Kumar",
    role: "Lead Engineer",
    bio: "Aryan drives GYF's frontend and fullstack engineering. He crafts the interfaces and systems that make GYF feel as sharp as it looks — high-quality, performant, and built to scale.",
    initials: "AK",
  },
];

const values = [
  {
    label: "AI-First",
    body: "Intelligence is the foundation of everything we build — not a feature added later.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    label: "Trust-First",
    body: "Every recommendation is explainable and honest about its confidence. Transparency and sophistication advance together.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: "People-First",
    body: "Deeply personal, private by design, and built to feel like it was made specifically for you.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    label: "Quality-First",
    body: "We evaluate continuously so recommendation quality provably improves — we never silently regress.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
];

export default function TeamPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  return (
    <div>
      {/* Page header */}
      <div
        className="page-header"
        style={{
          paddingTop: "140px",
          paddingBottom: "4rem",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
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
          The Team
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 400,
            color: "var(--text)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "700px",
            marginBottom: "1.5rem",
          }}
        >
          Meet the people building GYF.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            color: "var(--mid)",
            maxWidth: "520px",
            lineHeight: 1.7,
          }}
        >
          A small, focused team on a big mission — making the intelligence of a personal stylist available to everyone, free and instant.
        </p>
      </div>

      {/* Team grid */}
      <section style={{ padding: "0 clamp(1.5rem, 5vw, 5rem) 6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1px",
              background: "var(--rule)",
              border: "1px solid var(--rule)",
            }}
          >
            {team.map(({ name, role, bio, initials }, i) => (
              <div
                key={name}
                onMouseEnter={() => setHoveredMember(i)}
                onMouseLeave={() => setHoveredMember(null)}
                style={{
                  background: hoveredMember === i ? "var(--wash)" : "var(--bg)",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  transition: "background 0.22s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "2px",
                    height: "100%",
                    background: "var(--accent)",
                    transform: hoveredMember === i ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "top",
                    transition: "transform 0.3s ease",
                  }}
                />
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: hoveredMember === i ? "var(--accent)" : "var(--surface)",
                    border: "1px solid var(--rule)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: hoveredMember === i ? "var(--bg)" : "var(--mid)",
                    letterSpacing: "0.02em",
                    transition: "all 0.25s ease",
                  }}
                >
                  {initials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "1.3rem",
                      fontWeight: 400,
                      color: "var(--text)",
                      letterSpacing: "-0.01em",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    {role}
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.9rem",
                    color: "var(--mid)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {bio}
                </p>
              </div>
            ))}

            {/* Open roles card */}
            <div
              style={{
                border: "none",
                background: "var(--surface)",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mid)",
                }}
              >
                We&apos;re growing
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                }}
              >
                Want to help build the future of personal style?
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.9rem",
                  color: "var(--mid)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                We&apos;re looking for people who care deeply about AI, fashion, and building products that genuinely improve people&apos;s lives.
              </p>
              <a
                href="mailto:gyf1ltd@gmail.com"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  textDecoration: "none",
                  marginTop: "0.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section
        style={{
          padding: "5rem clamp(1.5rem, 5vw, 5rem)",
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
              marginBottom: "3rem",
            }}
          >
            What we stand for
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1px",
              background: "var(--rule)",
              border: "1px solid var(--rule)",
            }}
          >
            {values.map(({ label, body, icon }, i) => (
              <div
                key={label}
                onMouseEnter={() => setHoveredValue(i)}
                onMouseLeave={() => setHoveredValue(null)}
                style={{
                  background: hoveredValue === i ? "var(--wash)" : "var(--bg)",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  transition: "background 0.22s ease",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "var(--accent)",
                    transform: hoveredValue === i ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.3s ease",
                  }}
                />
                <span
                  style={{
                    color: hoveredValue === i ? "var(--accent)" : "var(--mid)",
                    transition: "color 0.22s",
                    display: "flex",
                  }}
                >
                  {icon}
                </span>
                <div
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.05rem",
                    fontWeight: 500,
                    color: "var(--text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {label}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--mid)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
