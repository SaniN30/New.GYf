# GYF Design System — Tailor's Bench
## v3.0.0 · Onboarding & Cold-Start Surface

> Source of truth: `design-tokens.json`. Every hex value and motion duration lives there. Any PR introducing a raw color or magic duration outside `tokens.ts` fails review.

---

## The Identity in One Sentence

GYF looks like a tailor's workbench — warm linen canvas, precise ink annotations, a single thread of Rani Pink running through it — not a fashion e-commerce app, not a SaaS dashboard, and emphatically not the AI-default dark-mode with purple gradients.

---

## Color — "Tailor's Bench"

| Token | Hex | Role | When NOT to use |
|---|---|---|---|
| `canvas` | `#E3E0D8` | Primary background (Loom Grey) | Never on text |
| `ink` | `#1B2233` | Primary text + conversion screen bg (Vat Indigo) | Not as default page background — earned at one transition point only |
| `accent-primary` | `#C2185B` | CTAs, confidence badge, Stitch Line (Rani Pink) | Not for decorative use |
| `accent-primary-press` | `#9E1149` | Pressed/active state of accent-primary only | Not for idle state |
| `accent-warm` | `#D98E04` | Badges, highlights (Haldi Gold) | Not directly as focus ring — use `accent-warm-glow` |
| `accent-warm-glow` | `rgba(217,142,4,0.35)` | Focus rings only — soft blur, never hard outline | Not as fill or border |
| `positive` | `#5B7339` | Saved/confirmed states (Mehendi Green) | Not as primary action color |
| `hairline` | `#BCB2A0` | Borders, dividers, tape ticks (Raw Thread) | Not for text |
| `surface-elevated` | `#EDEAE2` | Cards lifted off canvas on hover/drag | Not as page background |
| `scrim` | `rgba(27,34,51,0.45)` | Sheet/modal backdrops | Not as button or text color |
| `shimmer-base` | `#D8D4CA` | Skeleton loading base | Replace with content on load |
| `shimmer-sweep` | `#F0EDE5` | Skeleton loading sweep | Replace with content on load |

### Light/Dark Split Rule
- **Welcome → Cold-Start Reveal (§4.1–4.5):** always `canvas` background
- **Guest→Account Conversion + returning-user sign-in:** `ink` background — this is a deliberate structural signal, not a dark-mode toggle
- No other surface uses `ink` as page background

### Anti-Generic Checks
- ✗ No gradient backgrounds (not even subtle ones)
- ✗ No glassmorphism (`backdrop-filter: blur` is forbidden outside approved exceptions)
- ✗ No purple/blue AI defaults
- ✗ No generic shimmer (grey `#E0E0E0` sweep) — always use `shimmer-base`/`shimmer-sweep`
- ✓ `canvas` is warm linen, not white, not `#F5F5F5`

---

## Typography

### Typefaces

| Role | Face | Where |
|---|---|---|
| Display | **Fraunces** (variable, soft axis) | Hero moments only: Welcome headline, Stylist's Notes title |
| Body / UI | **General Sans** | Every control, label, paragraph, button |
| Utility / Data | **Fragment Mono** | Confidence %, counters, prices, OTP countdown, STEP X OF Y |

### Type Scale (CSS Custom Properties)

```css
--text-display-l:  clamp(2.25rem, 6vw, 3.5rem);   /* Fraunces, -2% tracking */
--text-display-s:  clamp(1.5rem, 4vw, 2rem);       /* Fraunces, -1% tracking */
--text-body-l:     1.125rem;                        /* General Sans, 1.5 lh */
--text-body:       1rem;                            /* General Sans, 1.5 lh */
--text-caption:    0.875rem;                        /* General Sans, 1.4 lh */
--text-mono:       0.9375rem;                       /* Fragment Mono, tabular-nums */
```

### Rules
- Fraunces is **never** used for body copy or UI controls
- Fragment Mono is **always** `tabular-nums` — it carries numbers, never prose
- No mixing display faces within a single UI element

---

## Motion — Four Tiers

The motion system has a strict hierarchy. Breaking tier discipline (e.g. using a Tier 1 signature animation for a secondary purpose) is a review failure.

### Tier 0 — Settle (universal floor)
Every interactive element. The minimum contract.

```
Duration: 100–140ms
Easing:   ease-out
Effect:   scale to 96% on press, lift 2px on hover
```

**Reduced-motion fallback:** opacity-only feedback, no scale.

### Tier 2 — Responsive (input-coupled only)
Triggered by user input. Must feel instant, never "loading."

```
Duration: 120–220ms
Easing:   cubic-bezier(0.2, 0, 0, 1)
Examples: garment crossfade, confidence badge count-up, slider fill sweep, swipe reveal
```

Copy rule: describe what's visible, not the mechanism — "Updating your look" not "Recalculating."

**Reduced-motion fallback:** instant state swaps. No crossfade, no count-up — value just changes.

### Tier 3 — Ambient (presence, not decoration)
Timer-driven only. Capped at ≤5% scale/opacity delta so it reads as felt presence, not animation.

```
Duration: 1.6–2.4s loop
Easing:   ease-in-out
Examples: pre-reveal badge pulse, tape tick glow
Max delta: 5% scale or opacity
```

**Reduced-motion fallback:** disabled entirely.

### Tier 1 — Signature (one per surface)
The Stitch Line draw. The only Tier 1 element. Never reused for a secondary purpose.

```
Duration: 600–900ms
Easing:   custom hand-wobble curve
Target:   60fps minimum; auto-downgrade to reduced-motion if frame budget insufficient
```

**Reduced-motion fallback:** instant static line.

---

## Component States (full inventory)

Every component ships with all states covered in Storybook — especially `degraded` and `error`, which are the first skipped and first to break in production.

| Component | Required States |
|---|---|
| `Pressable` | idle, hover, focus, press, disabled |
| `TapeProgress` | step-1…n, current, complete, ambient-glow |
| `PathChoiceCard` | idle, pointer-tilt (max 2°), pressed, selected |
| `PhotoCaptureSheet` | empty, uploading, reading, color-extract, result |
| `AttributePicker` | (5 variants: skin tone, body type, style, budget, occasion) |
| `LivePreviewRail` | idle, crossfading |
| `GeneratingState` | in-progress, degraded (>4s), fallback (>10s) |
| `LookCard` | default, pressed, swapped, comparing |
| `OutfitGroup` | revealing, idle, editing, refining |
| `ConfidenceBadge` | static, counting |
| `RefineSheet` | closed, open, dragging |
| `StylistNotesPanel` | (single state — personality voice only) |
| `QuickEditSheet` | open, closed |
| `ActionRow` | default, saved, carted, dismissed + undo |
| `GuestConvertSheet` | triggered, phone-entry, otp |

---

## Accessibility

- **Contrast:** AA minimum, verified — not assumed
- **Focus rings:** `accent-warm-glow` soft blur — never a hard 2px outline
- **Keyboard:** full path through every screen and sheet
- **`aria-current`:** on `TapeProgress` steps
- **`aria-live="polite"`:** required on `LivePreviewRail` and `ConfidenceBadge` — verified with a real screen reader, not just axe-core
- **Reduced motion:** all four tiers have defined fallbacks (not just Tier 1)

---

## Async State Contract

Every async boundary (photo read, generation, save/cart) must implement this typed contract — no ad-hoc handling:

```ts
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading'; startedAt: number }
  | { status: 'degraded'; startedAt: number }   // >4s — UC12
  | { status: 'success'; data: T }
  | { status: 'error'; reason: 'network' | 'model' | 'validation'; retry: () => void };
```

---

## What This Design System Is Not

| Forbidden pattern | Why |
|---|---|
| `backdrop-filter: blur` everywhere | Glassmorphism is AI-default slop |
| `background: linear-gradient(135deg, ...)` decorative | Gradient on everything signals no design decisions |
| Generic `#E0E0E0` shimmer | Must use `shimmer-base`/`shimmer-sweep` |
| `box-shadow` focus rings | Use `accent-warm-glow` blur only |
| Fraunces as a body or UI font | Display only — General Sans is the workhorse |
| `ink` as a default dark mode | Earned at exactly one transition point |
| Animations triggered by timers above 5% delta | Tier 3 cap — presence, not performance |
| The Stitch Line used for secondary animations | One use, one meaning |
