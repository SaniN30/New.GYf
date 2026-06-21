"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { TapeProgress } from "@/components/primitives/TapeProgress";
import { Pressable } from "@/components/primitives/Pressable";
import { LivePreviewRail } from "./LivePreviewRail";
import { responsiveTransition } from "@/lib/motion";
import { MANUAL_STEPS } from "@/lib/onboarding-state";
import type { OnboardingState, OnboardingAction, ManualStep } from "@/lib/onboarding-state";
import {
  SKIN_TONE_OPTIONS,
  BODY_TYPE_OPTIONS,
  STYLE_OPTIONS,
  OCCASION_OPTIONS,
  VIBE_EXAMPLE_CHIPS,
} from "@/lib/mock-data";
import { track } from "@/lib/analytics";

interface ManualAttributeSheetProps {
  state: OnboardingState;
  dispatch: (action: OnboardingAction) => void;
  onComplete: () => void;
}

// ─── Step: Skin Tone ─────────────────────────────────────────────────────────

function SkinToneStep({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p
        className="text-sm opacity-60"
        style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
      >
        Choose your skin tone
      </p>
      <div className="grid grid-cols-4 gap-3">
        {SKIN_TONE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            aria-pressed={value === opt.id}
            className="flex flex-col items-center gap-2 focus-visible:outline-none"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span
              className="rounded-full block"
              style={{
                width: 40,
                height: 40,
                background: opt.color,
                border:
                  value === opt.id
                    ? "3px solid var(--accent-primary)"
                    : "2px solid var(--hairline)",
                boxShadow:
                  value === opt.id ? "0 0 0 2px var(--canvas), 0 0 0 4px var(--accent-primary)" : "none",
              }}
            />
            <span
              className="text-xs"
              style={{
                fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                color: "var(--ink)",
                opacity: value === opt.id ? 1 : 0.6,
              }}
            >
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step: Body Type ─────────────────────────────────────────────────────────

function BodyTypeStep({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p
        className="text-sm opacity-60"
        style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
      >
        Select your body type
      </p>
      <div className="flex flex-wrap gap-2">
        {BODY_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            aria-pressed={value === opt.id}
            className="px-4 py-2 rounded-full text-sm font-medium focus-visible:outline-none"
            style={{
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
              background:
                value === opt.id ? "var(--accent-primary)" : "var(--surface-elevated)",
              color: value === opt.id ? "#fff" : "var(--ink)",
              border:
                value === opt.id
                  ? "1.5px solid var(--accent-primary)"
                  : "1.5px solid var(--hairline)",
              cursor: "pointer",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step: Style ─────────────────────────────────────────────────────────────

function StyleStep({
  values,
  onChange,
}: {
  values: string[];
  onChange: (v: string) => void;
}) {
  const previewColorMap: Record<string, string> = Object.fromEntries(
    STYLE_OPTIONS.map((o) => [o.id, o.previewColor])
  );

  return (
    <div className="flex flex-col gap-4">
      <p
        className="text-sm opacity-60"
        style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
      >
        Pick styles you love (multi-select)
      </p>
      <div className="flex flex-wrap gap-2">
        {STYLE_OPTIONS.map((opt) => {
          const selected = values.includes(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              aria-pressed={selected}
              className="px-4 py-2 rounded-full text-sm font-medium focus-visible:outline-none"
              style={{
                fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                background: selected ? "var(--accent-primary)" : "var(--surface-elevated)",
                color: selected ? "#fff" : "var(--ink)",
                border: selected
                  ? "1.5px solid var(--accent-primary)"
                  : "1.5px solid var(--hairline)",
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <LivePreviewRail selectedStyles={values} previewColorMap={previewColorMap} />
    </div>
  );
}

// ─── Step: Budget ─────────────────────────────────────────────────────────────

const BUDGET_MIN = 500;
const BUDGET_MAX = 20000;

function BudgetStep({
  min,
  max,
  onChange,
}: {
  min: number | null;
  max: number | null;
  onChange: (min: number, max: number) => void;
}) {
  const currentMax = max ?? BUDGET_MAX;

  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-sm opacity-60"
        style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
      >
        Set your outfit budget
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <span
            className="text-xs opacity-50"
            style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
          >
            ₹{BUDGET_MIN.toLocaleString("en-IN")}
          </span>
          <span
            className="text-xl font-semibold"
            style={{
              fontFamily: "var(--font-mono, 'Fragment Mono', monospace)",
              color: "var(--accent-primary)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ₹{currentMax.toLocaleString("en-IN")}
          </span>
          <span
            className="text-xs opacity-50"
            style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
          >
            ₹{BUDGET_MAX.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="relative h-6 flex items-center">
          {/* Track */}
          <div
            className="absolute inset-x-0 h-1.5 rounded-full"
            style={{ background: "var(--hairline)" }}
          />
          {/* Fill */}
          <div
            className="absolute left-0 h-1.5 rounded-full"
            style={{
              width: `${((currentMax - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100}%`,
              background: "linear-gradient(to right, var(--accent-warm), var(--accent-primary))",
            }}
          />
          <input
            type="range"
            min={BUDGET_MIN}
            max={BUDGET_MAX}
            step={500}
            value={currentMax}
            onChange={(e) => onChange(BUDGET_MIN, Number(e.target.value))}
            className="absolute inset-x-0 opacity-0 h-6 cursor-pointer"
            aria-label="Maximum budget"
            aria-valuemin={BUDGET_MIN}
            aria-valuemax={BUDGET_MAX}
            aria-valuenow={currentMax}
            aria-valuetext={`₹${currentMax.toLocaleString("en-IN")}`}
          />
        </div>
        <p
          className="text-xs opacity-50 text-center"
          style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
        >
          Drag to set maximum spend per outfit
        </p>
      </div>
    </div>
  );
}

// ─── Step: Occasion ───────────────────────────────────────────────────────────

function OccasionStep({
  value,
  vibe,
  onChangeOccasion,
  onChangeVibe,
}: {
  value: string | null;
  vibe: string | null;
  onChangeOccasion: (v: string) => void;
  onChangeVibe: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p
        className="text-sm opacity-60"
        style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
      >
        What&apos;s the occasion?
      </p>
      <div className="flex flex-wrap gap-2">
        {OCCASION_OPTIONS.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChangeOccasion(opt.id)}
              aria-pressed={selected}
              className="px-4 py-2 rounded-full text-sm font-medium focus-visible:outline-none"
              style={{
                fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                background: selected ? "var(--accent-primary)" : "var(--surface-elevated)",
                color: selected ? "#fff" : "var(--ink)",
                border: selected
                  ? "1.5px solid var(--accent-primary)"
                  : "1.5px solid var(--hairline)",
                cursor: "pointer",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <p
        className="text-xs opacity-40"
        style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
      >
        You can change this anytime
      </p>
      {/* Vibe free-text + example chips */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="vibe-input"
          className="text-xs font-medium"
          style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)", opacity: 0.7 }}
        >
          Describe your vibe (optional)
        </label>
        <input
          id="vibe-input"
          type="text"
          value={vibe ?? ""}
          onChange={(e) => onChangeVibe(e.target.value)}
          placeholder="Something flowy and relaxed..."
          className="rounded-xl px-3 py-2 text-sm focus-visible:outline-none"
          style={{
            background: "var(--surface-elevated)",
            border: "1.5px solid var(--hairline)",
            color: "var(--ink)",
            fontFamily: "var(--font-body, 'General Sans', sans-serif)",
          }}
        />
        <div className="flex flex-wrap gap-2">
          {VIBE_EXAMPLE_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => onChangeVibe(chip)}
              className="px-3 py-1 rounded-full text-xs focus-visible:outline-none"
              style={{
                background: "var(--surface-elevated)",
                border: "1.5px solid var(--hairline)",
                color: "var(--ink)",
                fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                cursor: "pointer",
                opacity: vibe === chip ? 1 : 0.65,
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────

const STEP_LABELS: Record<ManualStep, string> = {
  "skin-tone": "Skin Tone",
  "body-type": "Body Type",
  "style":     "Style",
  "budget":    "Budget",
  "occasion":  "Occasion",
};

export function ManualAttributeSheet({
  state,
  dispatch,
  onComplete,
}: ManualAttributeSheetProps) {
  const prefersReduced = useReducedMotion();
  const [direction, setDirection] = useState<1 | -1>(1);

  const stepIdx = state.step ? MANUAL_STEPS.indexOf(state.step) : 0;

  function handleNext() {
    if (state.step === "occasion") {
      onComplete();
      return;
    }
    setDirection(1);
    dispatch({ type: "NEXT_STEP" });
  }

  function handleBack() {
    setDirection(-1);
    dispatch({ type: "PREV_STEP" });
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReduced ? 0 : dir * 32,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: responsiveTransition,
    },
    exit: (dir: number) => ({
      x: prefersReduced ? 0 : dir * -32,
      opacity: 0,
      transition: responsiveTransition,
    }),
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-40 flex items-end justify-center"
      style={{ background: "var(--scrim)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Manual attribute selection"
    >
      {/* Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { ...responsiveTransition, duration: 0.3 } }}
        exit={{ y: "100%", transition: responsiveTransition }}
        className="w-full max-w-sm rounded-t-2xl flex flex-col"
        style={{
          background: "var(--canvas)",
          maxHeight: "90dvh",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div className="px-4 pt-5 pb-4 flex flex-col gap-3">
          <TapeProgress currentStep={state.step} />
          <div className="flex items-center justify-between">
            <span
              className="text-mono text-xs tracking-widest uppercase"
              style={{
                fontFamily: "var(--font-mono, 'Fragment Mono', monospace)",
                color: "var(--ink)",
                opacity: 0.5,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Step {stepIdx + 1} of {MANUAL_STEPS.length}
            </span>
            <span
              className="text-sm font-medium"
              style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
            >
              {state.step ? STEP_LABELS[state.step] : ""}
            </span>
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4" style={{ minHeight: 0 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={state.step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {state.step === "skin-tone" && (
                <SkinToneStep
                  value={state.attributes.skinTone}
                  onChange={(v) => dispatch({ type: "SET_SKIN_TONE", value: v })}
                />
              )}
              {state.step === "body-type" && (
                <BodyTypeStep
                  value={state.attributes.bodyType}
                  onChange={(v) => dispatch({ type: "SET_BODY_TYPE", value: v })}
                />
              )}
              {state.step === "style" && (
                <StyleStep
                  values={state.attributes.styles}
                  onChange={(v) => {
                    dispatch({ type: "TOGGLE_STYLE", value: v });
                    track({
                      event: "onboarding.attribute_live_preview_viewed",
                      styles: state.attributes.styles.includes(v)
                        ? state.attributes.styles.filter((s) => s !== v)
                        : [...state.attributes.styles, v],
                    });
                  }}
                />
              )}
              {state.step === "budget" && (
                <BudgetStep
                  min={state.attributes.budgetMin}
                  max={state.attributes.budgetMax}
                  onChange={(min, max) => dispatch({ type: "SET_BUDGET", min, max })}
                />
              )}
              {state.step === "occasion" && (
                <OccasionStep
                  value={state.attributes.occasion}
                  vibe={state.attributes.vibe}
                  onChangeOccasion={(v) => dispatch({ type: "SET_OCCASION", value: v })}
                  onChangeVibe={(v) => dispatch({ type: "SET_VIBE", value: v })}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer navigation */}
        <div className="px-4 pb-6 pt-2 flex items-center gap-3 border-t" style={{ borderColor: "var(--hairline)" }}>
          {stepIdx > 0 && (
            <button
              onClick={handleBack}
              className="text-sm focus-visible:outline-none"
              style={{
                fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                color: "var(--ink)",
                opacity: 0.6,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "12px 0",
              }}
            >
              Back
            </button>
          )}
          <Pressable
            onClick={handleNext}
            className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
            style={{
              background: "var(--accent-primary)",
              border: "none",
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
            }}
          >
            {state.step === "occasion" ? "Generate my look" : "Next"}
          </Pressable>
        </div>
      </motion.div>
    </div>
  );
}
