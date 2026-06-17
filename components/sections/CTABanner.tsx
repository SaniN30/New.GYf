"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";

export default function CTABanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section id="early-access" className="py-40 px-6 bg-bg border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,175,122,0.05) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="uppercase tracking-widest text-text-muted mb-8" style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.65rem" }}>
          Early Access
        </motion.p>

        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="text-text-primary font-light mb-6" style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 1 }}>
          Be dressed by intelligence.
        </motion.h2>

        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} className="text-text-muted mb-12 max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
          Join the waitlist. Be among the first to experience an AI stylist that truly knows you.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20px" }}>
          {submitted ? (
            <div className="flex flex-col items-center gap-3">
              <p className="text-text-primary" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontStyle: "italic" }}>
                You&apos;re on the list.
              </p>
              <p className="text-text-muted" style={{ fontFamily: "var(--font-inter)", fontSize: "0.8125rem" }}>
                We&apos;ll be in touch when your spot is ready.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full sm:w-72 px-5 py-3 bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem" }}
              />
              <button type="submit" className="btn-solid flex items-center gap-2 w-full sm:w-auto justify-center">
                Join Waitlist <ArrowRight size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
