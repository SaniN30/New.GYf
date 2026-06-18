"use client";

import { useReveal } from "@/lib/useReveal";

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
  useReveal();

  return (
    <section id="how-it-works">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p className="eyebrow reveal">How it Works</p>
        <h2
          className="reveal reveal-d1"
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 500,
            color: "var(--text)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "480px",
          }}
        >
          Dressed in three steps.
        </h2>

        <div className="steps-grid">
          {steps.map(({ num, title, body, icon }, i) => (
            <div key={num} className={`step reveal reveal-d${i + 1}`}>
              <div style={{ color: "var(--accent)", marginBottom: "0.25rem" }}>{icon}</div>
              <div className="step-num">{num}</div>
              <div className="step-title">{title}</div>
              <div className="step-body">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
