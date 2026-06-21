"use client";

import { useState } from "react";
import { LookCard } from "./LookCard";
import type { OutfitGroupData } from "@/lib/mock-data";
import { track } from "@/lib/analytics";

interface OutfitGroupProps {
  group: OutfitGroupData;
}

export function OutfitGroup({ group }: OutfitGroupProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [swapped, setSwapped] = useState(false);

  function handleSwipe() {
    const next = (currentIdx + 1) % group.alternatives.length;
    setCurrentIdx(next);
    setSwapped(true);
    track({ event: "reveal.outfit_swiped", outfitId: group.id, direction: "left" });
  }

  const card = group.alternatives[currentIdx];

  return (
    <div className="flex flex-col gap-2">
      <span
        className="px-4 text-xs font-medium"
        style={{
          fontFamily: "var(--font-body, 'General Sans', sans-serif)",
          color: "var(--ink)",
          opacity: 0.6,
        }}
      >
        {group.label}
      </span>
      <div className="flex gap-3 px-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none">
        {card && (
          <div className="snap-start flex-shrink-0">
            <LookCard card={card} isSwapped={swapped} onClick={handleSwipe} />
          </div>
        )}
        {/* Placeholder cards showing the other alternatives dimmed */}
        {group.alternatives
          .filter((_, i) => i !== currentIdx)
          .map((alt) => (
            <div key={alt.id} className="snap-start flex-shrink-0 opacity-30">
              <LookCard card={alt} />
            </div>
          ))}
      </div>
      <p
        className="px-4 text-xs opacity-40"
        style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
      >
        Tap to swap this piece
      </p>
    </div>
  );
}
