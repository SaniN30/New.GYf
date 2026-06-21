// Analytics event stubs — typed event emitters (console.log in dev, replace with real SDK in prod).

export type AnalyticsEvent =
  | { event: "onboarding.path_selected";               path: "photo" | "manual" }
  | { event: "onboarding.attribute_live_preview_viewed"; styles: string[] }
  | { event: "reveal.outfit_swiped";                   outfitId: string; direction: "left" | "right" }
  | { event: "reveal.action_taken";                    action: "save" | "add_to_cart" | "not_for_me"; outfitId: string }
  | { event: "reveal.compare_mode_opened";             outfitId: string }
  | { event: "onboarding.guest_convert_triggered";     trigger: "save" | "add_to_cart" }
  | { event: "onboarding.account_created";             method: "phone" }
  | { event: "onboarding.photo_uploaded";              fileSizeKb: number }
  | { event: "onboarding.color_extraction_shown";      dominantColors: string[] };

export function track(payload: AnalyticsEvent): void {
  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics]", payload.event, payload);
  }
  // TODO(prod): replace with real analytics SDK call
}
