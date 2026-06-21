"use client";

import { motion, useReducedMotion } from "framer-motion";
import { settleVariants, settleVariantsReduced } from "@/lib/motion";
import type { HTMLMotionProps } from "framer-motion";

type PressableVariant = "idle" | "hover" | "focus" | "pressed" | "disabled";

interface PressableProps extends Omit<HTMLMotionProps<"button">, "animate"> {
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared primitive — every tappable element composes this.
 * Tier 0 (Settle): scale 96% on press, lift 2px on hover.
 * Reduced-motion: opacity-only feedback, no scale or translate.
 */
export function Pressable({ disabled = false, className, children, ...props }: PressableProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? settleVariantsReduced : settleVariants;

  return (
    <motion.button
      variants={variants}
      initial="idle"
      animate={disabled ? "disabled" : "idle"}
      whileHover={disabled ? undefined : "hover"}
      whileFocus={disabled ? undefined : "focus"}
      whileTap={disabled ? undefined : "pressed"}
      disabled={disabled}
      aria-disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
