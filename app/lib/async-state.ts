// Typed contract for every async boundary in the app.
// All async operations (photo read, generation, save/cart) must use this —
// so degraded/error/fallback states can never be skipped during build.

export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading";  startedAt: number }
  | { status: "degraded"; startedAt: number }   // UC12: >4s stall visible to user
  | { status: "success";  data: T }
  | { status: "error";    reason: "network" | "model" | "validation"; retry: () => void };

// Time thresholds matching the spec
export const DEGRADED_THRESHOLD_MS  = 4_000;
export const FALLBACK_THRESHOLD_MS  = 10_000;

export function isLoading<T>(s: AsyncState<T>): s is Extract<AsyncState<T>, { status: "loading" | "degraded" }> {
  return s.status === "loading" || s.status === "degraded";
}

export function isDegraded<T>(s: AsyncState<T>): boolean {
  if (s.status !== "loading" && s.status !== "degraded") return false;
  return Date.now() - s.startedAt >= DEGRADED_THRESHOLD_MS;
}

export function isFallback<T>(s: AsyncState<T>): boolean {
  if (s.status !== "loading" && s.status !== "degraded") return false;
  return Date.now() - s.startedAt >= FALLBACK_THRESHOLD_MS;
}
