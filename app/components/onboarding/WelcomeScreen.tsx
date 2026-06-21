"use client";

import { useMotionValue, useTransform, motion, useReducedMotion } from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { PathChoiceCard } from "./PathChoiceCard";
import type { OnboardingPath } from "@/lib/onboarding-state";

interface WelcomeScreenProps {
  onSelectPath: (path: NonNullable<OnboardingPath>) => void;
}

// Mock look card data for the collage
const COLLAGE_CARDS = [
  { id: "c1", color: "#C4A882", label: "Linen Kurta",         rotate: -3, x: -30, y: 0,    z: 10 },
  { id: "c2", color: "#6B8E7F", label: "Slim Chinos",         rotate:  4, x:  60, y: 20,   z: 20 },
  { id: "c3", color: "#B87333", label: "Floral Midi",         rotate: -2, x:  10, y: 60,   z: 5  },
  { id: "c4", color: "#4A6741", label: "Block-Print Shirt",   rotate:  3, x: -60, y: 40,   z: 15 },
  { id: "c5", color: "#8B6F5E", label: "Straight Trousers",   rotate: -4, x:  40, y: -20,  z: 8  },
];

function CollageLookCard({
  color,
  label,
  rotate,
  x,
  y,
  z,
}: {
  color: string;
  label: string;
  rotate: number;
  x: number;
  y: number;
  z: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute corner-fold rounded-xl overflow-hidden shadow-md"
      style={{
        width: 120,
        height: 165,
        background: color,
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
        zIndex: z,
        left: "50%",
        top: "50%",
        marginLeft: -60,
        marginTop: -82,
      }}
    >
      <div
        className="absolute inset-x-0 bottom-8 px-2"
        style={{ color: "var(--ink)", opacity: 0.85 }}
      >
        <span
          className="block text-xs font-medium leading-tight"
          style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)" }}
        >
          {label}
        </span>
      </div>
      {/* corner fold triangle */}
      <div
        className="absolute top-0 right-0"
        style={{
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "0 18px 18px 0",
          borderColor: `transparent var(--canvas) transparent transparent`,
        }}
      />
    </div>
  );
}

export function WelcomeScreen({ onSelectPath }: WelcomeScreenProps) {
  const prefersReduced = useReducedMotion();
  const containerX = useMotionValue(0);
  const containerY = useMotionValue(0);
  const rotateX = useTransform(containerY, [-150, 150], prefersReduced ? [0, 0] : [3, -3]);
  const rotateY = useTransform(containerX, [-150, 150], prefersReduced ? [0, 0] : [-3, 3]);

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    containerX.set(e.clientX - rect.left - rect.width / 2);
    containerY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handlePointerLeave() {
    containerX.set(0);
    containerY.set(0);
  }

  return (
    <div
      className="flex flex-col min-h-[100dvh] w-full max-w-sm mx-auto"
      style={{ background: "var(--canvas)" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Top collage area — 55% of screen */}
      <div className="relative flex-shrink-0" style={{ height: "55dvh", overflow: "hidden" }}>
        <motion.div
          className="absolute inset-0"
          style={{ rotateX, rotateY, perspective: 600, transformStyle: "preserve-3d" }}
        >
          {COLLAGE_CARDS.map((card) => (
            <CollageLookCard key={card.id} {...card} />
          ))}
        </motion.div>
        {/* Gradient scrim to blend into canvas */}
        <div
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--canvas))",
          }}
        />
      </div>

      {/* Text + CTAs */}
      <div className="flex flex-col flex-1 px-6 pb-8 gap-6 justify-end">
        <div>
          <h1
            className="text-display-l"
            style={{
              fontFamily: "var(--font-display, 'Fraunces', Georgia, serif)",
              color: "var(--ink)",
            }}
          >
            Outfits that know you.
          </h1>
          <p
            className="mt-3 text-body-l"
            style={{
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
              color: "var(--ink)",
              opacity: 0.7,
            }}
          >
            Your first look is ready before you even start.
          </p>
        </div>

        <div className="flex gap-3">
          <PathChoiceCard
            icon="📸"
            title="Use a photo"
            description="We&apos;ll read your tones automatically"
            onSelect={() => onSelectPath("photo")}
          />
          <PathChoiceCard
            icon="✏️"
            title="Tell us directly"
            description="Pick your attributes in 5 steps"
            onSelect={() => onSelectPath("manual")}
          />
        </div>
      </div>
    </div>
  );
}
