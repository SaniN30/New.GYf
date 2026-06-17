"use client";

import { motion } from "framer-motion";
import { Scan, Fingerprint, Users, Shield } from "lucide-react";
import { fadeUp, fadeIn, staggerContainer, viewportOnce } from "@/lib/animations";

const pillars = [
  {
    icon: Scan,
    title: "Visual Intelligence",
    body: "Sees clothing like a stylist — reading vibe, color harmony, silhouette, and texture directly from images, not just product labels.",
  },
  {
    icon: Fingerprint,
    title: "Personal Taste Modeling",
    body: "Builds a living model of your preferences. Anticipates what you'll love before you see it and refines with every signal.",
  },
  {
    icon: Users,
    title: "Collective Learning",
    body: "Patterns discovered across thousands of users, distilled back into recommendations that are personal to you specifically.",
  },
  {
    icon: Shield,
    title: "Honest Confidence",
    body: "Every outfit comes with a reason. GYF is transparent about what it knows and what it's still learning. Trust is the product.",
  },
];

export default function Intelligence() {
  return (
    <section className="py-32 px-6 bg-surface border-t border-border">
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
            The Intelligence
          </p>
          <h2
            className="text-text-primary font-light max-w-xl"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
            }}
          >
            Four pillars of an AI stylist that earns trust.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border"
        >
          {pillars.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={fadeUp} className="card p-10 flex flex-col gap-5">
              <Icon size={20} className="text-accent" strokeWidth={1.5} />
              <h3
                className="text-text-primary"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
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
