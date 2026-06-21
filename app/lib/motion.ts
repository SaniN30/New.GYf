"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { motion } from "./tokens";
import type { Variants } from "framer-motion";

// Re-export the hook so all components import from one place
export { useFramerReducedMotion as useReducedMotion };

// ─── Framer Motion variant factories tied to token tiers ─────────────────────

/** Tier 0 — Settle: button press / card lift */
export const settleVariants: Variants = {
  idle:     { scale: 1,    y: 0,   opacity: 1,   transition: { duration: motion.settle.duration, ease: motion.settle.ease } },
  hover:    { scale: 1,    y: -2,  opacity: 1,   transition: { duration: motion.settle.duration, ease: motion.settle.ease } },
  focus:    { scale: 1,    y: -2,  opacity: 1,   transition: { duration: motion.settle.duration, ease: motion.settle.ease } },
  pressed:  { scale: 0.96, y: 0,   opacity: 1,   transition: { duration: motion.settle.duration, ease: motion.settle.ease } },
  disabled: { scale: 1,    y: 0,   opacity: 0.4, transition: { duration: motion.settle.duration, ease: motion.settle.ease } },
};

/** Tier 0 — reduced-motion fallback: opacity only, no scale/transform */
export const settleVariantsReduced: Variants = {
  idle:     { opacity: 1   },
  hover:    { opacity: 1   },
  focus:    { opacity: 1   },
  pressed:  { opacity: 0.7 },
  disabled: { opacity: 0.4 },
};

/** Tier 2 — Responsive: crossfades, badge count-up, live preview transitions */
export const responsiveTransition = {
  duration: motion.responsive.duration,
  ease: motion.responsive.ease,
} as const;

/** Tier 3 — Ambient: idle-state pulse / glow; ≤5% delta, looping */
export const ambientPulse: Variants = {
  idle: {
    opacity: [1, 0.95, 1],
    scale: [1, 1.02, 1],
    transition: {
      duration: motion.ambient.duration,
      ease: motion.ambient.ease,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

/** Tier 3 — reduced-motion: no ambient animation */
export const ambientPulseReduced: Variants = {
  idle: { opacity: 1, scale: 1 },
};

/** Tier 1 — Signature: Stitch Line draw — one per surface, never reused */
export const stitchLineVariants: Variants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: motion.signature.duration, ease: motion.signature.ease },
      opacity:    { duration: 0.1 },
    },
  },
};

/** Tier 1 — reduced-motion: instant static line */
export const stitchLineVariantsReduced: Variants = {
  hidden:  { pathLength: 1, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0 } },
};

/**
 * Screen-level enter transition — Tier 2 ceiling for full-screen reveals.
 * Slightly longer than element crossfades (220ms vs 180ms) but still Tier 2.
 */
export const screenEnterTransition = {
  duration: 0.22,
  ease: [0.2, 0, 0, 1],
} as const;
