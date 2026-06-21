import type { Config } from "tailwindcss";
import { colors, fonts } from "./lib/tokens";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Replace Tailwind defaults entirely — all values come from tokens.ts
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      canvas:             colors.canvas,
      ink:                colors.ink,
      "accent-primary":   colors["accent-primary"],
      "accent-warm":      colors["accent-warm"],
      positive:           colors.positive,
      hairline:           colors.hairline,
      "surface-elevated": colors["surface-elevated"],
    },
    fontFamily: {
      display: fonts.display,
      body:    fonts.body,
      mono:    fonts.mono,
    },
    extend: {},
  },
  plugins: [],
};

export default config;
