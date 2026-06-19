import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gyf: {
          purple: '#7C3AED',
          'purple-light': '#8B5CF6',
          'purple-pale': '#F5F3FF',
          pink: '#EC4899',
          bg: '#FFFFFF',
          surface: '#F5F3FF',
          text: '#0F0A1E',
          muted: '#6B7280',
        }
      },
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    }
  },
  plugins: [],
}
export default config
