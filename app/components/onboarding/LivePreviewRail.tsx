"use client";

import { AnimatePresence, motion } from "framer-motion";
import { responsiveTransition } from "@/lib/motion";

interface LivePreviewRailProps {
  selectedStyles: string[];
  // previewColors keyed by style id
  previewColorMap: Record<string, string>;
}

export function LivePreviewRail({ selectedStyles, previewColorMap }: LivePreviewRailProps) {
  const displayStyles = selectedStyles.slice(0, 2);

  return (
    <div
      aria-live="polite"
      aria-label="Live outfit preview"
      className="flex gap-3 items-center py-3"
    >
      <span className="sr-only">Updating your look</span>
      <AnimatePresence mode="popLayout">
        {displayStyles.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: responsiveTransition }}
            exit={{ opacity: 0, transition: responsiveTransition }}
            className="flex gap-3"
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                className="rounded-lg skeleton"
                style={{ width: 72, height: 96 }}
              />
            ))}
          </motion.div>
        ) : (
          displayStyles.map((styleId) => (
            <motion.div
              key={styleId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: responsiveTransition }}
              exit={{ opacity: 0, y: -8, transition: responsiveTransition }}
              className="rounded-lg flex-shrink-0"
              style={{
                width: 72,
                height: 96,
                background: previewColorMap[styleId] ?? "var(--surface-elevated)",
              }}
              aria-label={`Preview: ${styleId}`}
            />
          ))
        )}
      </AnimatePresence>
      {displayStyles.length > 0 && (
        <span
          className="text-xs opacity-60"
          style={{
            fontFamily: "var(--font-body, 'General Sans', sans-serif)",
            color: "var(--ink)",
          }}
        >
          Updating your look
        </span>
      )}
    </div>
  );
}
