"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ambientPulse, ambientPulseReduced } from "@/lib/motion";
import type { ManualStep } from "@/lib/onboarding-state";
import { MANUAL_STEPS } from "@/lib/onboarding-state";

interface TapeProgressProps {
  currentStep: ManualStep | null;
  className?: string;
}

/**
 * Segmented tape-progress bar for the manual attribute flow.
 * States: step 1…n (upcoming), current (active), complete (passed), ambient-glow (Tier 3).
 * aria-current marks the active step for screen readers.
 */
export function TapeProgress({ currentStep, className = "" }: TapeProgressProps) {
  const prefersReduced = useReducedMotion();
  const currentIdx = currentStep ? MANUAL_STEPS.indexOf(currentStep) : -1;

  return (
    <nav
      aria-label="Onboarding progress"
      className={`flex items-center gap-1 ${className}`}
    >
      {MANUAL_STEPS.map((step, idx) => {
        const isComplete = idx < currentIdx;
        const isCurrent  = idx === currentIdx;
        const isUpcoming = idx > currentIdx;

        return (
          <motion.div
            key={step}
            role="listitem"
            aria-current={isCurrent ? "step" : undefined}
            aria-label={`Step ${idx + 1}${isComplete ? " (complete)" : isCurrent ? " (current)" : ""}`}
            variants={isCurrent && !prefersReduced ? ambientPulse : ambientPulseReduced}
            animate="idle"
            className={[
              "h-[3px] flex-1 rounded-full transition-colors",
              isComplete ? "bg-[var(--accent-primary)]" : "",
              isCurrent  ? "bg-[var(--accent-primary)]" : "",
              isUpcoming ? "bg-[var(--hairline)]" : "",
            ].join(" ")}
            style={isCurrent ? {
              boxShadow: "0 0 6px 1px var(--accent-warm-glow)",
            } : undefined}
          />
        );
      })}
    </nav>
  );
}
