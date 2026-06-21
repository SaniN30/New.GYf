"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { responsiveTransition, settleVariants, settleVariantsReduced } from "@/lib/motion";
import { ConfidenceBadge } from "./ConfidenceBadge";
import type { LookCardData } from "@/lib/mock-data";

interface LookCardProps {
  card: LookCardData;
  isSwapped?: boolean;
  onClick?: () => void;
}

export function LookCard({ card, isSwapped = false, onClick }: LookCardProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? settleVariantsReduced : settleVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.button
        key={card.id}
        onClick={onClick}
        variants={variants}
        initial={isSwapped ? { opacity: 0, y: prefersReduced ? 0 : 8 } : "idle"}
        animate="idle"
        whileHover="hover"
        whileTap="pressed"
        exit={{ opacity: 0, y: prefersReduced ? 0 : -8, transition: responsiveTransition }}
        transition={responsiveTransition}
        className="relative flex-shrink-0 rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-warm)]"
        style={{
          width: 160,
          height: 220,
          background: "var(--surface-elevated)",
          cursor: "pointer",
        }}
        aria-label={`${card.garmentLabel}, ${card.confidence}% match`}
      >
        {/* Mock garment rect */}
        <div
          className="absolute inset-0"
          style={{ background: card.color, opacity: 0.85 }}
        />
        {/* Corner-fold treatment */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0"
          style={{
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 24px 24px 0",
            borderColor: `transparent var(--canvas) transparent transparent`,
          }}
        />
        {/* Garment label */}
        <div
          className="absolute inset-x-0 bottom-8 px-3"
          style={{ color: "var(--ink)" }}
        >
          <span
            className="block text-xs font-medium leading-tight"
            style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)" }}
          >
            {card.garmentLabel}
          </span>
        </div>
        {/* Confidence badge */}
        <div className="absolute bottom-2 left-2">
          <ConfidenceBadge value={card.confidence} />
        </div>
      </motion.button>
    </AnimatePresence>
  );
}
