"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { OutfitGroup } from "./OutfitGroup";
import { StylistNotesPanel } from "./StylistNotesPanel";
import { ActionRow } from "./ActionRow";
import { QuickEditSheet } from "./QuickEditSheet";
import { GuestConvertSheet } from "./GuestConvertSheet";
import { OUTFIT_GROUPS, OCCASION_OPTIONS } from "@/lib/mock-data";
import { screenEnterTransition } from "@/lib/motion";
import { track } from "@/lib/analytics";

interface RevealScreenProps {
  occasion: string | null;
  onOccasionChange: (v: string) => void;
  onRegenerate: () => void;
}

export function RevealScreen({ occasion, onOccasionChange, onRegenerate }: RevealScreenProps) {
  const prefersReduced = useReducedMotion();
  const [quickEditOpen, setQuickEditOpen] = useState(false);
  const [guestConvertOpen, setGuestConvertOpen] = useState(false);
  const [guestTrigger, setGuestTrigger] = useState<"save" | "add_to_cart">("save");

  const activeGroup = OUTFIT_GROUPS[0];
  const occasionLabel =
    OCCASION_OPTIONS.find((o) => o.id === occasion)?.label ?? "Casual";

  function handleSave() {
    setGuestTrigger("save");
    setGuestConvertOpen(true);
    track({ event: "onboarding.guest_convert_triggered", trigger: "save" });
  }

  function handleAddToCart() {
    setGuestTrigger("add_to_cart");
    setGuestConvertOpen(true);
    track({ event: "onboarding.guest_convert_triggered", trigger: "add_to_cart" });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: prefersReduced ? 0 : 24 }}
        animate={{ opacity: 1, y: 0, transition: screenEnterTransition }}
        className="flex flex-col min-h-[100dvh] w-full max-w-sm mx-auto pb-6 gap-6 overflow-y-auto"
        style={{ background: "var(--canvas)" }}
      >
        {/* Header */}
        <div className="px-4 pt-8">
          <h2
            className="text-display-s"
            style={{
              fontFamily: "var(--font-display, 'Fraunces', Georgia, serif)",
              color: "var(--ink)",
            }}
          >
            Your looks
          </h2>
          {/* Occasion chip */}
          <button
            onClick={() => setQuickEditOpen(true)}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium focus-visible:outline-none"
            style={{
              background: "var(--surface-elevated)",
              border: "1.5px solid var(--hairline)",
              color: "var(--ink)",
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
              cursor: "pointer",
            }}
            aria-label={`Occasion: ${occasionLabel}. Tap to change.`}
          >
            <span>{occasionLabel}</span>
            <span style={{ opacity: 0.5 }}>✏️</span>
          </button>
        </div>

        {/* Stylist note */}
        <StylistNotesPanel note={activeGroup.stylistNote} />

        {/* Outfit groups */}
        <div className="flex flex-col gap-8">
          {OUTFIT_GROUPS.map((group) => (
            <OutfitGroup key={group.id} group={group} />
          ))}
        </div>

        {/* Action row */}
        <ActionRow
          outfitId={activeGroup.id}
          onSave={handleSave}
          onAddToCart={handleAddToCart}
        />
      </motion.div>

      {/* Quick edit sheet */}
      {quickEditOpen && (
        <QuickEditSheet
          currentOccasion={occasion}
          onSelect={(v) => {
            onOccasionChange(v);
            setQuickEditOpen(false);
            onRegenerate();
          }}
          onClose={() => setQuickEditOpen(false)}
        />
      )}

      {/* Guest convert sheet */}
      {guestConvertOpen && (
        <GuestConvertSheet
          trigger={guestTrigger}
          onClose={() => setGuestConvertOpen(false)}
        />
      )}
    </>
  );
}
