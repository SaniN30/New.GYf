# GYF Landing Page — Build Spec
> Target: Match Cluely.com's exact design quality

## Stack
- Next.js 14 App Router, Tailwind CSS, Framer Motion
- Path: gyf-v2/app/
- Logo: /assets/logo-new.png (RGBA, NO CSS filters)

## Design System
- Background: #FFFFFF
- Dark sections/buttons: #0A0A0A
- Accent: #7C3AED (purple), #EC4899 (pink)
- Font: Inter (black/900 for headlines, 600 for buttons, 400 for body)
- Headline tracking: -0.03em
- Section padding: py-24 minimum
- Max content width: max-w-6xl (1200px)
- Border radius: rounded-3xl for cards (24px)

## Page Sections (in order)
1. Navbar — white bg, logo(36px)+name left, 3 links center, black pill CTA right
2. Hero — white bg, massive headline, 2 CTAs, dark floating app mockup
3. StatsRow — light gray bg, 3 huge stats
4. StylistFeature — FULL dark #0A0A0A section, 4 solid colored cards
5. PerceptionLayer — light gray bg, macOS-chrome split panel demo
6. WhatWeDo — white bg, 3 feature cards
7. HowItWorks — light gray bg, numbered steps
8. Vision — white bg, centered quote
9. TheArc — light gray bg, timeline
10. About — white bg
11. CTABanner — dark #0A0A0A, email form
12. Footer — white bg, 3-column links

## Critical Rules
- Logo: ALWAYS /assets/logo-new.png, NEVER brightness-0/invert filters
- No emoji-only cards — real text content
- Buttons: black (#0A0A0A) primary, outlined secondary — NOT gradient pills
- Product mockup in hero must look like a real dark app UI
- Section backgrounds ALTERNATE: white → gray → dark → gray → white
