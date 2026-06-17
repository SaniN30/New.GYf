"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, viewportOnce } from "@/lib/animations";

export default function Vision() {
  return (
    <section id="vision" className="py-40 px-6 bg-bg border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="uppercase tracking-widest text-text-muted mb-10"
          style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.65rem" }}
        >
          Our Mission
        </motion.p>

        <motion.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-text-primary font-light mb-10"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 4.5vw, 4rem)",
            fontStyle: "italic",
            lineHeight: 1.15,
          }}
        >
          &ldquo;A personal stylist for everyone.
          <br />
          Free. Instant. And genuinely yours.&rdquo;
        </motion.blockquote>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-4"
        >
          <p
            className="text-text-muted max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem", lineHeight: 1.8 }}
          >
            The expertise of a professional stylist has always been a luxury for the few. GYF makes
            that intelligence universal.
          </p>
          <p
            className="text-text-muted max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem", lineHeight: 1.8 }}
          >
            Not by simplifying style. By learning it — deeply, personally, and for every person who
            deserves to feel confidently dressed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
