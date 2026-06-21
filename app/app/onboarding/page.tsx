"use client";

import { useReducer, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  onboardingReducer,
  initialState,
  rehydrateState,
  persistState,
} from "@/lib/onboarding-state";
import { WelcomeScreen } from "@/components/onboarding/WelcomeScreen";
import { ManualAttributeSheet } from "@/components/onboarding/ManualAttributeSheet";
import { PhotoCaptureSheet } from "@/components/onboarding/PhotoCaptureSheet";
import { GeneratingScreen } from "@/components/onboarding/GeneratingScreen";
import { RevealScreen } from "@/components/onboarding/RevealScreen";
import { track } from "@/lib/analytics";

type AppScreen = "welcome" | "manual" | "photo" | "generating" | "reveal";

export default function OnboardingPage() {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  const [screen, setScreen] = useState<AppScreen>("welcome");
  const [hydrated, setHydrated] = useState(false);

  // UC13: rehydrate on mount — no flash of Welcome for returning users
  useEffect(() => {
    const saved = rehydrateState();
    if (saved) {
      // Replay the path/step from saved state
      if (saved.path === "manual" && saved.step !== null) {
        dispatch({ type: "SELECT_PATH", path: "manual" });
        // Advance to the saved step
        const savedStep = saved.step;
        const idx = ["skin-tone", "body-type", "style", "budget", "occasion"].indexOf(savedStep);
        for (let i = 0; i < idx; i++) dispatch({ type: "NEXT_STEP" });
        // Restore attributes
        if (saved.attributes.skinTone) dispatch({ type: "SET_SKIN_TONE", value: saved.attributes.skinTone });
        if (saved.attributes.bodyType) dispatch({ type: "SET_BODY_TYPE", value: saved.attributes.bodyType });
        saved.attributes.styles.forEach((s) => dispatch({ type: "TOGGLE_STYLE", value: s }));
        if (saved.attributes.budgetMin !== null && saved.attributes.budgetMax !== null)
          dispatch({ type: "SET_BUDGET", min: saved.attributes.budgetMin, max: saved.attributes.budgetMax });
        if (saved.attributes.occasion) dispatch({ type: "SET_OCCASION", value: saved.attributes.occasion });
        if (saved.attributes.vibe) dispatch({ type: "SET_VIBE", value: saved.attributes.vibe });
        setScreen("manual");
      } else if (saved.path === "photo") {
        dispatch({ type: "SELECT_PATH", path: "photo" });
        setScreen("photo");
      }
    }
    setHydrated(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on every state change
  useEffect(() => {
    if (hydrated) persistState(state);
  }, [state, hydrated]);

  if (!hydrated) return null;

  function handleSelectPath(path: "photo" | "manual") {
    dispatch({ type: "SELECT_PATH", path });
    track({ event: "onboarding.path_selected", path });
    setScreen(path);
  }

  function handleManualComplete() {
    setScreen("generating");
  }

  function handlePhotoComplete(uri: string) {
    dispatch({ type: "SET_PHOTO", uri });
    setScreen("generating");
  }

  function handleGeneratingComplete() {
    setScreen("reveal");
  }

  function handleOccasionChange(v: string) {
    dispatch({ type: "SET_OCCASION", value: v });
  }

  function handleRegenerate() {
    setScreen("generating");
  }

  return (
    <div
      className="min-h-[100dvh] w-full"
      style={{ background: "var(--canvas)" }}
    >
      <AnimatePresence mode="wait">
        {screen === "welcome" && (
          <WelcomeScreen key="welcome" onSelectPath={handleSelectPath} />
        )}

        {screen === "generating" && (
          <GeneratingScreen key="generating" onComplete={handleGeneratingComplete} />
        )}

        {screen === "reveal" && (
          <RevealScreen
            key="reveal"
            occasion={state.attributes.occasion}
            onOccasionChange={handleOccasionChange}
            onRegenerate={handleRegenerate}
          />
        )}
      </AnimatePresence>

      {/* Sheets rendered as overlays (not inside AnimatePresence so they layer correctly) */}
      {screen === "manual" && (
        <AnimatePresence>
          <div key="manual-bg" className="min-h-[100dvh]" style={{ background: "var(--canvas)" }} />
          <ManualAttributeSheet
            key="manual"
            state={state}
            dispatch={dispatch}
            onComplete={handleManualComplete}
          />
        </AnimatePresence>
      )}

      {screen === "photo" && (
        <AnimatePresence>
          <div key="photo-bg" className="min-h-[100dvh]" style={{ background: "var(--canvas)" }} />
          <PhotoCaptureSheet
            key="photo"
            onComplete={handlePhotoComplete}
            onClose={() => setScreen("welcome")}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
