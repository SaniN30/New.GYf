"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, viewportOnce } from "@/lib/animations";

export default function Problem() {
  return (
    <section className="py-32 px-6 bg-surface border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="uppercase tracking-widest text-text-muted mb-8"
          style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.65rem" }}
        >
          The Problem
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-text-primary mb-8"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontStyle: "italic",
            fontWeight: 300,
            lineHeight: 1.05,
          }}
        >
          &ldquo;A full closet.
          <br />
          And nothing to wear.&rdquo;
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-4"
        >
          <p
            className="text-text-muted max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.875rem, 1.4vw, 1rem)", lineHeight: 1.8 }}
          >
            Everyone knows this feeling. Shopping apps show individual items but
            never how to wear them together. Every morning brings the same quiet
            friction: Does this match? Is it right for the occasion?
          </p>
          <p
            className="text-text-muted max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.875rem, 1.4vw, 1rem)", lineHeight: 1.8 }}
          >
            A personal stylist — someone who knows what flatters you — has always
            been a luxury for the few. GYF was built to end that.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
