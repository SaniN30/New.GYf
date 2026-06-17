"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "@/lib/animations";

const phases = [
  {
    number: "Phase 1",
    title: "The Intelligent Stylist",
    body: "An AI that builds personalized, explained outfits from day one and learns from real user behavior immediately.",
    active: true,
  },
  {
    number: "Phase 2",
    title: "The Personal Taste Engine",
    body: "GYF knows your style deeply enough that its picks feel uncannily you. It styles around your real wardrobe.",
    active: false,
  },
  {
    number: "Phase 3",
    title: "The Shopping Companion",
    body: "GYF shops with you — across brands and retailers — recommending the smartest things to buy within your budget.",
    active: false,
  },
  {
    number: "Phase 4",
    title: "The Visualization Layer",
    body: "See any look realistically on yourself before committing — removing the last barrier between inspiration and confidence.",
    active: false,
  },
  {
    number: "Phase 5",
    title: "The Ambient Stylist",
    body: "GYF becomes the default way people decide what to wear and what to buy. A trusted companion for every fashion decision.",
    active: false,
  },
];

export default function TheArc() {
  return (
    <section id="the-arc" className="py-32 px-6 bg-bg border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16"
        >
          <p
            className="uppercase tracking-widest text-text-muted mb-4"
            style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.65rem" }}
          >
            The Arc
          </p>
          <h2
            className="text-text-primary font-light"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
            }}
          >
            Where GYF is going.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col"
        >
          {phases.map(({ number, title, body, active }) => (
            <motion.div
              key={number}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-6 sm:gap-10 py-8 border-b border-border last:border-b-0"
            >
              <div className="shrink-0 flex sm:flex-col items-start gap-3">
                <span
                  className="w-24 shrink-0"
                  style={{
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: active ? "var(--color-accent)" : "var(--color-text-muted)",
                  }}
                >
                  {number}
                </span>
                {active && (
                  <span
                    className="text-[9px] uppercase tracking-widest px-2 py-0.5 border shrink-0"
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      color: "var(--color-accent)",
                      borderColor: "var(--color-accent)",
                      opacity: 0.8,
                    }}
                  >
                    Now
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
                    fontWeight: active ? 500 : 300,
                    lineHeight: 1.2,
                    color: active ? "var(--color-text-primary)" : "var(--color-text-muted)",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.875rem",
                    lineHeight: 1.8,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
