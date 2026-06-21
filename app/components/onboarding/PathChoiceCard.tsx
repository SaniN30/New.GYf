"use client";

import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { settleVariants, settleVariantsReduced } from "@/lib/motion";

interface PathChoiceCardProps {
  icon: string;
  title: string;
  description: string;
  onSelect: () => void;
  selected?: boolean;
}

export function PathChoiceCard({
  icon,
  title,
  description,
  onSelect,
  selected = false,
}: PathChoiceCardProps) {
  const prefersReduced = useReducedMotion();
  const [isPressed, setIsPressed] = useState(false);
  const variants = prefersReduced ? settleVariantsReduced : settleVariants;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-60, 60], prefersReduced ? [0, 0] : [2, -2]);
  const rotateY = useTransform(mx, [-60, 60], prefersReduced ? [0, 0] : [-2, 2]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }

  function handlePointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      className="flex-1"
      style={{ perspective: 600 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.button
        variants={variants}
        initial="idle"
        animate={isPressed ? "pressed" : "idle"}
        whileHover="hover"
        whileFocus="focus"
        whileTap="pressed"
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onClick={onSelect}
        style={{
          rotateX,
          rotateY,
          background: "var(--surface-elevated)",
          border: selected
            ? "2px solid var(--accent-primary)"
            : "1.5px solid var(--hairline)",
          borderRadius: 16,
          width: "100%",
          padding: "16px 12px",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
        className="focus-visible:outline-none"
        aria-pressed={selected}
      >
        <span
          role="img"
          aria-hidden="true"
          style={{
            fontSize: 24,
            color: selected ? "var(--accent-primary)" : "var(--ink)",
          }}
        >
          {icon}
        </span>
        <span
          className="block font-medium text-sm"
          style={{
            fontFamily: "var(--font-body, 'General Sans', sans-serif)",
            color: selected ? "var(--accent-primary)" : "var(--ink)",
          }}
        >
          {title}
        </span>
        <span
          className="block text-xs"
          style={{
            fontFamily: "var(--font-body, 'General Sans', sans-serif)",
            color: "var(--ink)",
            opacity: 0.6,
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </motion.button>
    </div>
  );
}
