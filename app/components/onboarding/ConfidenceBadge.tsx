"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { motion as tokens } from "@/lib/tokens";

interface ConfidenceBadgeProps {
  value: number; // 0–100
}

export function ConfidenceBadge({ value }: ConfidenceBadgeProps) {
  const prefersReduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(value);
  const prevRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;

    if (prefersReduced || from === to) {
      setDisplayed(to);
      return;
    }

    const startTime = performance.now();
    const dur = tokens.responsive.duration * 1000;

    function tick(now: number) {
      const t = Math.min((now - startTime) / dur, 1);
      setDisplayed(Math.round(from + (to - from) * t));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayed(to);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, prefersReduced]);

  return (
    <span
      aria-live="polite"
      aria-label={`${displayed}% confidence`}
      className="inline-flex items-center px-2 py-0.5 rounded-full text-white"
      style={{
        background: "var(--accent-primary)",
        fontFamily: "var(--font-mono, 'Fragment Mono', monospace)",
        fontSize: "0.75rem",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {displayed}%
    </span>
  );
}
