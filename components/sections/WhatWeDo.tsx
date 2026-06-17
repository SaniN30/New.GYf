"use client";

import { motion } from "framer-motion";
import { Eye, Brain, Layers } from "lucide-react";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "@/lib/animations";

const features = [
  {
    icon: Eye,
    title: "Sees",
    subtitle: "Visual Intelligence",
    body: "Understands clothing visually — vibe, color harmony, silhouette, texture. Not just tags and rules.",
  },
  {
    icon: Brain,
    title: "Learns",
    subtitle: "Personal Taste Modeling",
    body: "Builds a living model of your preferences from every interaction, not just onboarding. Gets more you over time.",
  },
  {
    icon: Layers,
    title: "Builds",
    subtitle: "Complete Outfits",
    body: "Delivers top, bottom, and footwear — coordinated as one look — with a stylist's explanation for each choice.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-32 px-6 bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto">
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
            What GYF Does
          </p>
          <h2
            className="text-text-primary font-light max-w-xl"
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
          >
            Three pillars of intelligent styling.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border"
        >
          {features.map(({ icon: Icon, title, subtitle, body }) => (
            <motion.div key={title} variants={fadeUp} className="card p-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-accent" strokeWidth={1.5} />
                <span
                  className="uppercase tracking-widest text-text-muted"
                  style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.6rem" }}
                >
                  {subtitle}
                </span>
              </div>
              <h3
                className="text-text-primary font-light"
                style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", lineHeight: 1 }}
              >
                {title}
              </h3>
              <p
                className="text-text-muted"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", lineHeight: 1.8 }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
