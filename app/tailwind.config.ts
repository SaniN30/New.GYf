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
        gyf: {
          bg: '#08080C',
          surface: '#0F0F18',
          'surface-2': '#16162A',
          accent: '#A855F7',
          pink: '#EC4899',
          text: '#F8F8FF',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        float: 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

export default config;
