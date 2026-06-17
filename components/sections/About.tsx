"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, viewportOnce } from "@/lib/animations";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-surface border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewportOnce} className="mb-10">
          <p className="uppercase tracking-widest text-text-muted mb-4" style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.65rem" }}>
            About
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h2 className="text-text-primary font-light mb-8" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
              Why We Built This
            </h2>
            <div className="space-y-5">
              <p className="text-text-muted" style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem", lineHeight: 1.85 }}>
                We built GYF because the daily friction of getting dressed shouldn&apos;t require expertise most people don&apos;t have time to develop.
              </p>
              <p className="text-text-muted" style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem", lineHeight: 1.85 }}>
                Style is learnable. Taste can be modeled. The intelligence to help someone look and feel their best — confidently, effortlessly — should be available to everyone, not just those who can afford a personal stylist.
              </p>
              <p className="text-text-muted" style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem", lineHeight: 1.85 }}>
                We built the learner.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="flex flex-col gap-8">
            {[
              { label: "AI-First", body: "Intelligence is the foundation, not a feature bolted on later. Every line of GYF is built around the model." },
              { label: "Trust-First", body: "Every recommendation is explainable and honest about its confidence. Sophistication and transparency advance together." },
              { label: "People-First", body: "Deeply personal, private, and designed to feel like it was built specifically for you." },
            ].map(({ label, body }) => (
              <div key={label} className="border-l border-border pl-6">
                <p className="uppercase tracking-widest text-accent mb-2" style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.6rem" }}>
                  {label}
                </p>
                <p className="text-text-muted" style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", lineHeight: 1.8 }}>
                  {body}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
