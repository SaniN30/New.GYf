"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { responsiveTransition } from "@/lib/motion";
import { Pressable } from "@/components/primitives/Pressable";

interface RefineSheetProps {
  onClose: () => void;
}

interface SliderRowProps {
  label: string;
  unit: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}

function SliderRow({ label, unit, min, max, value, onChange, format }: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const display = format ? format(value) : `${value}${unit}`;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          className="text-sm font-medium"
          style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
        >
          {label}
        </span>
        <span
          className="text-sm"
          style={{
            fontFamily: "var(--font-mono, 'Fragment Mono', monospace)",
            color: "var(--accent-primary)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {display}
        </span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full" style={{ background: "var(--hairline)" }} />
        <div
          className="absolute left-0 h-1.5 rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(to right, var(--accent-warm), var(--accent-primary))",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-x-0 opacity-0 h-6 cursor-pointer"
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={display}
        />
      </div>
    </div>
  );
}

export function RefineSheet({ onClose }: RefineSheetProps) {
  const prefersReduced = useReducedMotion();
  const [budget, setBudget] = useState(10000);
  const [styleMatch, setStyleMatch] = useState(70);
  const [occasionFit, setOccasionFit] = useState(80);

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center"
      style={{ background: "var(--scrim)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Refine your results"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { ...responsiveTransition, duration: 0.3 } }}
        exit={{ y: "100%", transition: responsiveTransition }}
        className="w-full max-w-sm rounded-t-2xl flex flex-col"
        style={{ background: "var(--canvas)", maxHeight: "70dvh" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div
            className="w-10 h-1 rounded-full"
            style={{ background: "var(--hairline)" }}
          />
        </div>

        <div className="px-4 py-3 flex items-center justify-between">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
          >
            Refine results
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)", opacity: 0.5 }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-6">
          <SliderRow
            label="Budget"
            unit=""
            min={500}
            max={20000}
            value={budget}
            onChange={setBudget}
            format={(v) => `₹${v.toLocaleString("en-IN")}`}
          />
          <SliderRow
            label="Style Match"
            unit="%"
            min={0}
            max={100}
            value={styleMatch}
            onChange={setStyleMatch}
          />
          <SliderRow
            label="Occasion Fit"
            unit="%"
            min={0}
            max={100}
            value={occasionFit}
            onChange={setOccasionFit}
          />
        </div>

        <div className="px-4 pb-6">
          <Pressable
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-medium text-white"
            style={{
              background: "var(--accent-primary)",
              border: "none",
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
            }}
          >
            Apply
          </Pressable>
        </div>
      </motion.div>
    </div>
  );
}
