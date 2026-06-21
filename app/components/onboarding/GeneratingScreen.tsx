"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { stitchLineVariants, stitchLineVariantsReduced, responsiveTransition } from "@/lib/motion";
import { OUTFIT_GROUPS } from "@/lib/mock-data";

interface GeneratingScreenProps {
  onComplete: () => void;
}

type CopyPhase = "reading" | "matching" | "stitching" | "moment";

const COPY: Record<CopyPhase, string> = {
  reading:  "Reading your tone",
  matching: "Matching silhouettes",
  stitching:"Stitching the look",
  moment:   "This one's taking a moment — nearly there",
};

export function GeneratingScreen({ onComplete }: GeneratingScreenProps) {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<CopyPhase>("reading");
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Copy progression (status phases shown during generation)
    const t1 = setTimeout(() => setPhase("matching"),  1500);
    const t2 = setTimeout(() => setPhase("stitching"), 3000);
    // UC12 degraded/fallback (for real network; mock completes at 5s so these are visible in slow test)
    const t3 = setTimeout(() => setPhase("moment"),    4000);  // >4s: acknowledge delay
    const t4 = setTimeout(() => setShowFallback(true), 10000); // >10s: show fallback cards
    // Mock reveal — long enough to show all 3 copy phases naturally
    const t5 = setTimeout(() => onComplete(),          5000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onComplete]);

  const svgVariants = prefersReduced ? stitchLineVariantsReduced : stitchLineVariants;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[100dvh] w-full max-w-sm mx-auto px-6 gap-10"
      style={{ background: "var(--canvas)" }}
      role="status"
      aria-live="polite"
      aria-label="Generating your outfit"
    >
      {/* Stitch Line SVG — Tier 1 Signature, one use only */}
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M20 60 C20 30, 50 10, 60 40 C70 70, 100 50, 100 60 C100 80, 80 100, 60 90 C40 80, 30 100, 20 80 C10 60, 30 40, 50 50 C70 60, 90 30, 80 20"
          stroke="var(--accent-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={svgVariants}
          initial="hidden"
          animate="visible"
        />
        {/* Needle dot */}
        <motion.circle
          cx="80"
          cy="20"
          r="4"
          fill="var(--accent-primary)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.6 } }}
        />
      </motion.svg>

      {/* Status copy */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0, transition: responsiveTransition }}
          exit={{ opacity: 0, y: prefersReduced ? 0 : -8, transition: responsiveTransition }}
          className="text-center text-base font-medium"
          style={{
            fontFamily: "var(--font-body, 'General Sans', sans-serif)",
            color: "var(--ink)",
          }}
        >
          {COPY[phase]}
        </motion.p>
      </AnimatePresence>

      {/* Fallback section at 10s */}
      <AnimatePresence>
        {showFallback && (
          <motion.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0, transition: responsiveTransition }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 w-full"
          >
            <p
              className="text-center text-xs"
              style={{
                fontFamily: "var(--font-mono, 'Fragment Mono', monospace)",
                color: "var(--ink)",
                opacity: 0.5,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Still personalising for you
            </p>
            <p
              className="text-center text-xs font-medium"
              style={{
                fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                color: "var(--ink)",
                opacity: 0.6,
              }}
            >
              Popular for this occasion
            </p>
            <div className="flex gap-3 justify-center">
              {OUTFIT_GROUPS.slice(0, 2).map((og) => (
                <div
                  key={og.id}
                  className="rounded-xl skeleton"
                  style={{ width: 100, height: 140 }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
