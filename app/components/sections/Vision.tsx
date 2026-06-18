"use client";

import { useReveal } from "@/lib/useReveal";

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
    badge: "soon",
    badgeLabel: "Future",
  },
];

export default function Vision() {
  useReveal();

  return (
    <section id="vision">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <p className="eyebrow reveal">The Arc</p>
        <h2
          className="reveal reveal-d1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 300,
            color: "var(--text)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: "480px",
            marginBottom: "3.5rem",
          }}
        >
          A stylist that compounds.
        </h2>

        <div className="vision-grid">
          {/* Phases */}
          <div>
            {phases.map(({ num, title, body, badge, badgeLabel }, i) => (
              <div key={num} className={`phase reveal reveal-d${i + 1}`}>
                <span className="phase-num">{num}</span>
                <div>
                  <div className="phase-title">{title}</div>
                  <div className="phase-body">{body}</div>
                  <span className={`phase-badge ${badge}`}>{badgeLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky quote card */}
          <div>
            <div className="vision-quote-card reveal reveal-d2">
              <div className="vision-quote-mark">&ldquo;</div>
              <p className="vision-quote-text">
                A personal stylist — someone who knows what flatters you, what coordinates, and what is worth buying — has always been a luxury for the few. GYF makes that intelligence universal: free, instant, and personal to everyone.
              </p>
              <div className="vision-quote-rule" />
              <p className="vision-quote-attr">GYF Vision, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
