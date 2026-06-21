import type { Config } from "tailwindcss";

// Values are kept in sync with lib/tokens.ts.
// Tailwind v4 PostCSS cannot dynamically import TS modules at build time,
// so the color values are inlined here. lib/tokens.ts remains the
// authoritative reference for runtime use in components and Framer Motion.
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current:     "currentColor",
      white:       "#ffffff",
      black:       "#000000",
      canvas:             "#E3E0D8",
      ink:                "#1B2233",
      "accent-primary":   "#C2185B",
      "accent-warm":      "#D98E04",
      positive:           "#5B7339",
      hairline:           "#BCB2A0",
      "surface-elevated": "#EDEAE2",
    },
    fontFamily: {
      display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
      body:    ["var(--font-body)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      mono:    ["var(--font-mono)", "Fragment Mono", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};

export default config;
