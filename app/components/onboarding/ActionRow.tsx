"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pressable } from "@/components/primitives/Pressable";
import { responsiveTransition } from "@/lib/motion";
import { track } from "@/lib/analytics";

interface ActionRowProps {
  outfitId: string;
  onSave: () => void;
  onAddToCart: () => void;
}

const DISMISS_REASONS = ["Not my style", "Wrong occasion", "Too pricey", "Doesn't suit me"];

export function ActionRow({ outfitId, onSave, onAddToCart }: ActionRowProps) {
  const prefersReduced = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  function handleNotForMe() {
    setShowReasons(true);
    track({ event: "reveal.action_taken", action: "not_for_me", outfitId });
  }

  function handleReason(reason: string) {
    setDismissed(true);
    setShowReasons(false);
    setToast(`Noted: ${reason}`);
  }

  function handleUndo() {
    setDismissed(false);
    setToast(null);
  }

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  if (dismissed && !toast) return null;

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      {!dismissed && (
        <div className="flex gap-2">
          <Pressable
            onClick={() => { track({ event: "reveal.action_taken", action: "save", outfitId }); onSave(); }}
            className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
            style={{
              background: "var(--positive)",
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
              border: "none",
            }}
          >
            Save
          </Pressable>
          <Pressable
            onClick={() => { track({ event: "reveal.action_taken", action: "add_to_cart", outfitId }); onAddToCart(); }}
            className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
            style={{
              background: "var(--accent-primary)",
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
              border: "none",
            }}
          >
            Add to cart
          </Pressable>
          <Pressable
            onClick={handleNotForMe}
            className="flex-1 py-3 rounded-xl text-sm font-medium"
            style={{
              background: "transparent",
              border: "1.5px solid var(--hairline)",
              color: "var(--ink)",
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
            }}
          >
            Not for me
          </Pressable>
        </div>
      )}

      <AnimatePresence>
        {showReasons && (
          <motion.div
            key="reasons"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", transition: responsiveTransition }}
            exit={{ opacity: 0, height: 0, transition: responsiveTransition }}
            className="overflow-hidden"
          >
            <p
              className="text-xs mb-2 opacity-60"
              style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
            >
              What didn&apos;t work?
            </p>
            <div className="flex flex-wrap gap-2">
              {DISMISS_REASONS.map((r) => (
                <button
                  key={r}
                  onClick={() => handleReason(r)}
                  className="px-3 py-1.5 rounded-full text-xs"
                  style={{
                    border: "1.5px solid var(--hairline)",
                    background: "transparent",
                    color: "var(--ink)",
                    fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                    cursor: "pointer",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
            animate={{ opacity: 1, y: 0, transition: responsiveTransition }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : 16, transition: responsiveTransition }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "var(--ink)", maxWidth: "calc(100vw - 32px)" }}
          >
            <span
              className="text-sm"
              style={{
                color: "var(--canvas)",
                fontFamily: "var(--font-mono, 'Fragment Mono', monospace)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {toast}
            </span>
            <button
              onClick={handleUndo}
              className="text-xs underline opacity-80"
              style={{
                color: "var(--canvas)",
                fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
