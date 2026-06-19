import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: '#0A0A0A',
        'ink-soft': '#3D3D3D',
        'ink-muted': '#6B7280',
        'ink-faint': '#9CA3AF',
        'surface': '#F9FAFB',
        'purple-brand': '#7C3AED',
        'pink-brand': '#EC4899',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
export default config
