import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0D0D0D",
        surface: "#161616",
        "surface-2": "#1F1F1F",
        border: "#2A2A2A",
        "text-primary": "#F0F0F0",
        "text-muted": "#888888",
        accent: "#C8C8C8",
        "accent-warm": "#D4AF7A",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      fontSize: {
        display: ["clamp(3.5rem,9vw,8.5rem)", { lineHeight: "0.95" }],
        headline: ["clamp(2.25rem,4.5vw,4rem)", { lineHeight: "1.05" }],
        title: ["clamp(1.375rem,2.2vw,1.875rem)", { lineHeight: "1.2" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
      },
      letterSpacing: {
        widest: "0.2em",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,200,200,0.06) 0%, transparent 70%)",
        "radial-warm":
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,122,0.08) 0%, transparent 70%)",
      },
      animation: {
        "scroll-line": "scrollLine 2s ease-in-out infinite",
      },
      keyframes: {
        scrollLine: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "51%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
