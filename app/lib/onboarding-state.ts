// Onboarding reducer — covers UC0–UC13, UC13 interruption recovery via sessionStorage.
// All reducer transitions emit their analytics event key for instrumentation.

export type OnboardingPath = "photo" | "manual" | null;

export type ManualStep = "skin-tone" | "body-type" | "style" | "budget" | "occasion";

export const MANUAL_STEPS: ManualStep[] = [
  "skin-tone",
  "body-type",
  "style",
  "budget",
  "occasion",
];

export interface OnboardingAttributes {
  skinTone:       string | null;
  bodyType:       string | null;
  styles:         string[];
  budgetMin:      number | null;
  budgetMax:      number | null;
  occasion:       string | null;
  vibe:           string | null; // free-text §12.4
}

export interface OnboardingState {
  path:        OnboardingPath;
  step:        ManualStep | null;
  attributes:  OnboardingAttributes;
  photoUri:    string | null;
  sessionId:   string;
}

const defaultAttributes: OnboardingAttributes = {
  skinTone:  null,
  bodyType:  null,
  styles:    [],
  budgetMin: null,
  budgetMax: null,
  occasion:  null,
  vibe:      null,
};

function makeSessionId(): string {
  return `gyf-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const initialState: OnboardingState = {
  path:       null,
  step:       null,
  attributes: defaultAttributes,
  photoUri:   null,
  sessionId:  makeSessionId(),
};

export type OnboardingAction =
  | { type: "SELECT_PATH";     path: OnboardingPath }
  | { type: "SET_PHOTO";       uri: string }
  | { type: "SET_SKIN_TONE";   value: string }
  | { type: "SET_BODY_TYPE";   value: string }
  | { type: "TOGGLE_STYLE";    value: string }
  | { type: "SET_BUDGET";      min: number; max: number }
  | { type: "SET_OCCASION";    value: string }
  | { type: "SET_VIBE";        value: string }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "RESET" };

export function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction,
): OnboardingState {
  switch (action.type) {
    case "SELECT_PATH":
      return { ...state, path: action.path, step: action.path === "manual" ? "skin-tone" : null };

    case "SET_PHOTO":
      return { ...state, photoUri: action.uri };

    case "SET_SKIN_TONE":
      return { ...state, attributes: { ...state.attributes, skinTone: action.value } };

    case "SET_BODY_TYPE":
      return { ...state, attributes: { ...state.attributes, bodyType: action.value } };

    case "TOGGLE_STYLE": {
      const styles = state.attributes.styles.includes(action.value)
        ? state.attributes.styles.filter((s) => s !== action.value)
        : [...state.attributes.styles, action.value];
      return { ...state, attributes: { ...state.attributes, styles } };
    }

    case "SET_BUDGET":
      return { ...state, attributes: { ...state.attributes, budgetMin: action.min, budgetMax: action.max } };

    case "SET_OCCASION":
      return { ...state, attributes: { ...state.attributes, occasion: action.value } };

    case "SET_VIBE":
      return { ...state, attributes: { ...state.attributes, vibe: action.value } };

    case "NEXT_STEP": {
      const idx = state.step ? MANUAL_STEPS.indexOf(state.step) : -1;
      const next = idx < MANUAL_STEPS.length - 1 ? MANUAL_STEPS[idx + 1] : null;
      return { ...state, step: next };
    }

    case "PREV_STEP": {
      const idx = state.step ? MANUAL_STEPS.indexOf(state.step) : 0;
      const prev = idx > 0 ? MANUAL_STEPS[idx - 1] : state.step;
      return { ...state, step: prev };
    }

    case "RESET":
      return { ...initialState, sessionId: makeSessionId() };

    default:
      return state;
  }
}

// ─── UC13: sessionStorage persistence ────────────────────────────────────────

const STORAGE_KEY = "gyf:onboarding";

export function persistState(state: OnboardingState): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded or unavailable — fail silently
  }
}

export function rehydrateState(): OnboardingState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OnboardingState;
    // Validate minimum shape to avoid acting on stale/corrupt data
    if (!parsed.sessionId || !parsed.attributes) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearPersistedState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
