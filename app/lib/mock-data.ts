// Mock data for onboarding UI — 3 outfits × 3 alternatives each, stylist notes, chip options.

export interface LookCardData {
  id: string;
  color: string;       // CSS color for mock rect
  garmentLabel: string;
  confidence: number;  // 72–94
}

export interface OutfitGroupData {
  id: string;
  label: string;
  alternatives: LookCardData[];
  stylistNote: string;
}

export const LOOK_CARDS: LookCardData[] = [
  { id: "lc-1a", color: "#C4A882", garmentLabel: "Linen Kurta", confidence: 87 },
  { id: "lc-1b", color: "#8B6F5E", garmentLabel: "Straight-Cut Trousers", confidence: 83 },
  { id: "lc-1c", color: "#D4B896", garmentLabel: "Cotton Overshirt", confidence: 79 },
  { id: "lc-2a", color: "#6B8E7F", garmentLabel: "Slim Fit Chinos", confidence: 91 },
  { id: "lc-2b", color: "#4A6741", garmentLabel: "Block-Print Shirt", confidence: 88 },
  { id: "lc-2c", color: "#7EA89B", garmentLabel: "Canvas Sneakers", confidence: 94 },
  { id: "lc-3a", color: "#B87333", garmentLabel: "Floral Midi Dress", confidence: 76 },
  { id: "lc-3b", color: "#8C7B6B", garmentLabel: "Strappy Sandals", confidence: 72 },
  { id: "lc-3c", color: "#A0785A", garmentLabel: "Woven Tote", confidence: 81 },
];

export const OUTFIT_GROUPS: OutfitGroupData[] = [
  {
    id: "og-1",
    label: "Outfit 1",
    alternatives: [LOOK_CARDS[0], LOOK_CARDS[1], LOOK_CARDS[2]],
    stylistNote:
      "Warm tones and a relaxed silhouette — this trio works because it doesn't try too hard.",
  },
  {
    id: "og-2",
    label: "Outfit 2",
    alternatives: [LOOK_CARDS[3], LOOK_CARDS[4], LOOK_CARDS[5]],
    stylistNote:
      "Earthy greens ground the look. The block print is doing the heavy lifting so everything else stays quiet.",
  },
  {
    id: "og-3",
    label: "Outfit 3",
    alternatives: [LOOK_CARDS[6], LOOK_CARDS[7], LOOK_CARDS[8]],
    stylistNote:
      "The midi length flatters and the florals keep it festive without overdoing it.",
  },
];

// Chip option sets
export const SKIN_TONE_OPTIONS = [
  { id: "fair",    label: "Fair",     color: "#FAE7D8" },
  { id: "light",   label: "Light",    color: "#F5D4B8" },
  { id: "medium",  label: "Medium",   color: "#E0B899" },
  { id: "olive",   label: "Olive",    color: "#C89B75" },
  { id: "tan",     label: "Tan",      color: "#B07D52" },
  { id: "brown",   label: "Brown",    color: "#8B5A2B" },
  { id: "deep",    label: "Deep",     color: "#6B3A1F" },
  { id: "dark",    label: "Dark",     color: "#3D1C02" },
];

export const BODY_TYPE_OPTIONS = [
  { id: "slim",     label: "Slim" },
  { id: "athletic", label: "Athletic" },
  { id: "average",  label: "Average" },
  { id: "curvy",    label: "Curvy" },
  { id: "plus",     label: "Plus" },
];

export const STYLE_OPTIONS = [
  { id: "casual",     label: "Casual",      previewColor: "#C4A882" },
  { id: "minimal",    label: "Minimal",     previewColor: "#D8D4CA" },
  { id: "streetwear", label: "Streetwear",  previewColor: "#4A4A4A" },
  { id: "classic",    label: "Classic",     previewColor: "#2C3E6B" },
  { id: "bohemian",   label: "Bohemian",    previewColor: "#B87333" },
  { id: "festive",    label: "Festive",     previewColor: "#C2185B" },
  { id: "preppy",     label: "Preppy",      previewColor: "#6B8E7F" },
  { id: "edgy",       label: "Edgy",        previewColor: "#1B2233" },
];

export const OCCASION_OPTIONS = [
  { id: "casual",  label: "Casual" },
  { id: "formal",  label: "Formal" },
  { id: "wedding", label: "Wedding" },
  { id: "festive", label: "Festive" },
  { id: "sport",   label: "Sport" },
  { id: "work",    label: "Work" },
];

export const VIBE_EXAMPLE_CHIPS = [
  "Something flowy and relaxed",
  "Sharp but not stiff",
  "Vibrant for the occasion",
];
