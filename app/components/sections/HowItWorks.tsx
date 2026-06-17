"use client";

import { motion } from "framer-motion";
import { slideLeft, fadeIn, staggerContainer, viewportOnce } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Tell GYF about yourself",
    body: "Upload a photo or describe your body type, skin tone, budget, and occasions you dress for. Nothing is locked in — you can update anytime.",
  },
  {
    number: "02",
    title: "GYF builds your first outfit",
    body: "A complete look — top, bottom, footwear — chosen for your specific body and taste, with a clear stylist's explanation for every choice.",
  },
  {
    number: "03",
    title: "It gets smarter with you",
    body: "Every save, skip, and reaction trains your personal taste model. GYF matures — like a stylist who knows you better the longer they work with you.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 px-6 bg-surface border-t border-border">
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
            How It Works
          </p>
          <h2
            className="text-text-primary font-light"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
            }}
          >
            From first look to lasting style.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col divide-y divide-border"
        >
          {steps.map(({ number, title, body }) => (
            <motion.div
              key={number}
              variants={slideLeft}
              className="py-10 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12"
            >
              <span
                className="shrink-0 text-text-muted select-none"
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1,
                  opacity: 0.3,
                }}
              >
                {number}
              </span>
              <div className="flex flex-col gap-3">
                <h3
                  className="text-text-primary font-light"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-text-muted max-w-lg"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", lineHeight: 1.8 }}
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
