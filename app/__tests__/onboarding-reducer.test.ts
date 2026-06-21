/**
 * Reducer / state-machine unit tests — Phase 5.2
 * Covers all UC0–UC13 transitions as documented in onboarding-state.ts.
 */
import { describe, it, expect } from "vitest";
import {
  onboardingReducer,
  initialState,
  MANUAL_STEPS,
  type OnboardingState,
} from "../lib/onboarding-state";

function dispatch(state: OnboardingState, ...actions: Parameters<typeof onboardingReducer>[1][]): OnboardingState {
  return actions.reduce((s, a) => onboardingReducer(s, a), state);
}

// ─── UC0: Welcome — initial state ────────────────────────────────────────────
describe("UC0 — initial state", () => {
  it("starts with no path, no step, empty attributes", () => {
    expect(initialState.path).toBeNull();
    expect(initialState.step).toBeNull();
    expect(initialState.attributes.styles).toHaveLength(0);
    expect(initialState.sessionId).toMatch(/^gyf-/);
  });
});

// ─── UC1: Path selection ─────────────────────────────────────────────────────
describe("UC1 — path selection", () => {
  it("SELECT_PATH manual → sets step to first step", () => {
    const s = dispatch(initialState, { type: "SELECT_PATH", path: "manual" });
    expect(s.path).toBe("manual");
    expect(s.step).toBe("skin-tone");
  });

  it("SELECT_PATH photo → sets path, step stays null", () => {
    const s = dispatch(initialState, { type: "SELECT_PATH", path: "photo" });
    expect(s.path).toBe("photo");
    expect(s.step).toBeNull();
  });
});

// ─── UC2: Photo upload ───────────────────────────────────────────────────────
describe("UC2 — photo upload", () => {
  it("SET_PHOTO stores uri", () => {
    const s = dispatch(initialState, { type: "SET_PHOTO", uri: "blob:xyz" });
    expect(s.photoUri).toBe("blob:xyz");
  });
});

// ─── UC3: Manual attribute steps ─────────────────────────────────────────────
describe("UC3 — manual attribute flow", () => {
  it("NEXT_STEP advances through all 5 steps in order", () => {
    let s = dispatch(initialState, { type: "SELECT_PATH", path: "manual" });
    for (let i = 0; i < MANUAL_STEPS.length - 1; i++) {
      expect(s.step).toBe(MANUAL_STEPS[i]);
      s = dispatch(s, { type: "NEXT_STEP" });
    }
    expect(s.step).toBe(MANUAL_STEPS[MANUAL_STEPS.length - 1]);
  });

  it("NEXT_STEP past last step sets step to null", () => {
    let s = dispatch(initialState, { type: "SELECT_PATH", path: "manual" });
    for (let i = 0; i < MANUAL_STEPS.length; i++) {
      s = dispatch(s, { type: "NEXT_STEP" });
    }
    expect(s.step).toBeNull();
  });

  it("PREV_STEP goes back one step", () => {
    const s = dispatch(
      initialState,
      { type: "SELECT_PATH", path: "manual" },
      { type: "NEXT_STEP" },
      { type: "PREV_STEP" },
    );
    expect(s.step).toBe("skin-tone");
  });

  it("PREV_STEP at first step stays on first step", () => {
    const s = dispatch(
      initialState,
      { type: "SELECT_PATH", path: "manual" },
      { type: "PREV_STEP" },
    );
    expect(s.step).toBe("skin-tone");
  });
});

// ─── UC4: Attribute mutations ─────────────────────────────────────────────────
describe("UC4 — attribute mutations", () => {
  it("SET_SKIN_TONE stores tone", () => {
    const s = dispatch(initialState, { type: "SET_SKIN_TONE", value: "medium" });
    expect(s.attributes.skinTone).toBe("medium");
  });

  it("SET_BODY_TYPE stores type", () => {
    const s = dispatch(initialState, { type: "SET_BODY_TYPE", value: "athletic" });
    expect(s.attributes.bodyType).toBe("athletic");
  });

  it("TOGGLE_STYLE adds new style", () => {
    const s = dispatch(initialState, { type: "TOGGLE_STYLE", value: "casual" });
    expect(s.attributes.styles).toContain("casual");
  });

  it("TOGGLE_STYLE removes existing style", () => {
    const s = dispatch(
      initialState,
      { type: "TOGGLE_STYLE", value: "casual" },
      { type: "TOGGLE_STYLE", value: "casual" },
    );
    expect(s.attributes.styles).not.toContain("casual");
  });

  it("TOGGLE_STYLE supports multi-select", () => {
    const s = dispatch(
      initialState,
      { type: "TOGGLE_STYLE", value: "casual" },
      { type: "TOGGLE_STYLE", value: "bohemian" },
    );
    expect(s.attributes.styles).toContain("casual");
    expect(s.attributes.styles).toContain("bohemian");
    expect(s.attributes.styles).toHaveLength(2);
  });

  it("SET_BUDGET stores min and max", () => {
    const s = dispatch(initialState, { type: "SET_BUDGET", min: 500, max: 8000 });
    expect(s.attributes.budgetMin).toBe(500);
    expect(s.attributes.budgetMax).toBe(8000);
  });

  it("SET_OCCASION stores occasion", () => {
    const s = dispatch(initialState, { type: "SET_OCCASION", value: "casual" });
    expect(s.attributes.occasion).toBe("casual");
  });

  it("SET_VIBE stores free-text vibe", () => {
    const s = dispatch(initialState, { type: "SET_VIBE", value: "something flowy" });
    expect(s.attributes.vibe).toBe("something flowy");
  });
});

// ─── UC5: Occasion quick-edit (re-use SET_OCCASION) ──────────────────────────
describe("UC5 — occasion quick-edit", () => {
  it("SET_OCCASION overwrites previous occasion without touching other attributes", () => {
    const s = dispatch(
      initialState,
      { type: "SET_SKIN_TONE", value: "medium" },
      { type: "SET_OCCASION", value: "casual" },
      { type: "SET_OCCASION", value: "formal" },
    );
    expect(s.attributes.occasion).toBe("formal");
    expect(s.attributes.skinTone).toBe("medium"); // unchanged
  });
});

// ─── UC13: RESET / interruption recovery ─────────────────────────────────────
describe("UC13 — reset / interruption recovery", () => {
  it("RESET clears all state and generates a new sessionId", () => {
    const mid = dispatch(
      initialState,
      { type: "SELECT_PATH", path: "manual" },
      { type: "SET_SKIN_TONE", value: "tan" },
      { type: "SET_OCCASION", value: "wedding" },
    );
    const reset = dispatch(mid, { type: "RESET" });

    expect(reset.path).toBeNull();
    expect(reset.step).toBeNull();
    expect(reset.attributes.skinTone).toBeNull();
    expect(reset.attributes.occasion).toBeNull();
    expect(reset.sessionId).not.toBe(mid.sessionId);
  });

  it("state is immutable — original is not mutated by dispatch", () => {
    const before = { ...initialState };
    dispatch(initialState, { type: "SET_SKIN_TONE", value: "tan" });
    expect(initialState.attributes.skinTone).toBe(before.attributes.skinTone);
  });
});

// ─── Full manual flow (UC0→UC3→reveal) ───────────────────────────────────────
describe("Full manual flow", () => {
  it("completes all 5 steps and arrives at null step (generate phase)", () => {
    let s = dispatch(initialState, { type: "SELECT_PATH", path: "manual" });
    s = dispatch(s, { type: "SET_SKIN_TONE", value: "medium" }, { type: "NEXT_STEP" });
    s = dispatch(s, { type: "SET_BODY_TYPE", value: "athletic" }, { type: "NEXT_STEP" });
    s = dispatch(s, { type: "TOGGLE_STYLE", value: "casual" }, { type: "NEXT_STEP" });
    s = dispatch(s, { type: "SET_BUDGET", min: 500, max: 8000 }, { type: "NEXT_STEP" });
    s = dispatch(s, { type: "SET_OCCASION", value: "casual" }, { type: "NEXT_STEP" });

    expect(s.step).toBeNull();
    expect(s.attributes.skinTone).toBe("medium");
    expect(s.attributes.bodyType).toBe("athletic");
    expect(s.attributes.styles).toContain("casual");
    expect(s.attributes.budgetMax).toBe(8000);
    expect(s.attributes.occasion).toBe("casual");
  });
});
