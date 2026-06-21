"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pressable } from "@/components/primitives/Pressable";
import { responsiveTransition } from "@/lib/motion";
import { OCCASION_OPTIONS } from "@/lib/mock-data";

interface QuickEditSheetProps {
  currentOccasion: string | null;
  onSelect: (occasion: string) => void;
  onClose: () => void;
}

export function QuickEditSheet({ currentOccasion, onSelect, onClose }: QuickEditSheetProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center"
      style={{ background: "var(--scrim)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Change occasion"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { ...responsiveTransition, duration: 0.25 } }}
        exit={{ y: "100%", transition: responsiveTransition }}
        className="w-full max-w-sm rounded-t-2xl flex flex-col"
        style={{ background: "var(--canvas)" }}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--hairline)" }} />
        </div>

        <div className="px-4 py-3 flex items-center justify-between">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
          >
            Change occasion
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)", opacity: 0.5 }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-4 pb-6 flex flex-wrap gap-2">
          {OCCASION_OPTIONS.map((opt) => {
            const selected = currentOccasion === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                aria-pressed={selected}
                className="px-4 py-2 rounded-full text-sm font-medium focus-visible:outline-none"
                style={{
                  fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                  background: selected ? "var(--accent-primary)" : "var(--surface-elevated)",
                  color: selected ? "#fff" : "var(--ink)",
                  border: selected ? "1.5px solid var(--accent-primary)" : "1.5px solid var(--hairline)",
                  cursor: "pointer",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="px-4 pb-6">
          <Pressable
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-medium"
            style={{
              background: "var(--surface-elevated)",
              border: "1.5px solid var(--hairline)",
              color: "var(--ink)",
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
            }}
          >
            Cancel
          </Pressable>
        </div>
      </motion.div>
    </div>
  );
}
