// Single source of truth for all design tokens.
// No component, config, or stylesheet may hardcode a hex value or duration — import from here.

export const colors = {
  // Tailor's Bench palette
  canvas:          '#E3E0D8', // Loom Grey — primary background
  ink:             '#1B2233', // Vat Indigo — primary text + dark conversion surface
  'accent-primary': '#C2185B', // Rani Pink — CTAs, confidence badge, Stitch Line
  'accent-warm':   '#D98E04', // Haldi Gold — badges, highlights, focus rings
  positive:        '#5B7339', // Mehendi Green — saved / confirmed states
  hairline:        '#BCB2A0', // Raw Thread — borders, dividers, tape ticks

  // Interaction-state tokens
  'accent-primary-press': '#9E1149',           // Rani Pink −15% lightness for active/pressed
  'accent-warm-glow':     'rgba(217,142,4,0.35)', // Focus ring blur/glow, never a hard outline
  'surface-elevated':     '#EDEAE2',           // Cards lifted off canvas on hover/drag
  scrim:                  'rgba(27,34,51,0.45)', // Sheet/modal backdrop, derived from ink
  'shimmer-base':         '#D8D4CA',           // Skeleton base, warm not grey
  'shimmer-sweep':        '#F0EDE5',           // Skeleton sweep highlight
} as const;

export const fonts = {
  display: ['Fraunces', 'Georgia', 'serif'],          // Hero moments only
  body:    ['General Sans', 'system-ui', 'sans-serif'], // All controls, labels, paragraphs
  mono:    ['Fragment Mono', 'monospace'],             // Confidence %, counters, prices
} as const;

// Type scale as tokens — clamp values for responsive sizing
export const typeScale = {
  'display-l': 'clamp(2.25rem, 6vw, 3.5rem)',  // Fraunces, −2% tracking
  'display-s': 'clamp(1.5rem, 4vw, 2rem)',     // Fraunces, −1% tracking
  'body-l':    '1.125rem',                     // General Sans, 1.5 line-height
  body:        '1rem',                         // General Sans, 1.5 line-height
  caption:     '0.875rem',                     // General Sans, 1.4 line-height
  mono:        '0.9375rem',                    // Fragment Mono, tabular-nums
} as const;

// Motion tiers — all durations in seconds for Framer Motion
export const motion = {
  // Tier 0 — Settle: button press, card lift; every interactive element
  settle: {
    duration: 0.12,
    ease: 'easeOut' as const,
  },
  // Tier 2 — Responsive: live preview, crossfades, badge count-up; input-coupled
  responsive: {
    duration: 0.18,
    ease: [0.2, 0, 0, 1] as [number, number, number, number],
  },
  // Tier 3 — Ambient: idle-state micro-motion; ≤5% opacity/scale delta, never input-coupled
  ambient: {
    duration: 2.0,
    ease: 'easeInOut' as const,
  },
  // Tier 1 — Signature: Stitch Line only; one per surface, never reused
  signature: {
    duration: 0.75, // 600–900ms range center
    ease: [0.25, 0.1, 0.0, 1.0] as [number, number, number, number], // hand-wobble curve
  },
} as const;

export type ColorToken = keyof typeof colors;
export type MotionTier = keyof typeof motion;
