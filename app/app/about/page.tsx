'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

/* ─── data ─── */
const PILLARS = [
  {
    index: '01',
    title: 'The problem we saw',
    accent: '#6366f1',
    body: 'A full wardrobe and nothing to wear. Apps that show items but never how to wear them together. Constant doubt — does this match? Is it right for the occasion? Does it suit me? A personal stylist has always been a luxury. We decided to make that intelligence free, instant, and personal to everyone.',
  },
  {
    index: '02',
    title: 'Why AI-first from day one',
    accent: '#ec4899',
    body: 'Styling is a perception and preference problem. Style is visual — it has to be seen, not tagged. Taste is personal and learned — it deepens with every interaction, not just an onboarding form. And good styling compounds: the more people GYF dresses, the better it gets for everyone. A rules engine can only approximate this. We built the real thing.',
  },
  {
    index: '03',
    title: 'What we are building',
    accent: '#f59e0b',
    body: 'Six interlocking intelligence layers: Perception (reading your body and presence from a photo), Taste Modeling (a living preference model that learns with every save and skip), Outfit Composition (complete coordinated looks with a reason behind each), Try-On (see it on your actual body before committing), Social (share styles, follow others, re-rendered for your own tone), and Collective Intelligence (what thousands of people teach each other about style, distilled back to you).',
  },
  {
    index: '04',
    title: 'Where we are now',
    accent: '#10b981',
    body: 'The Perception Layer — Layer 01 — is live in open beta. You can upload a photo and see GYF read your proportions, palette, and presence in real time. Five more layers are in active development and ship through 2026. Every layer adds a new dimension to how well GYF knows and serves you.',
  },
  {
    index: '05',
    title: 'Our commitment',
    accent: '#3b82f6',
    body: 'Every recommendation comes with a reason. Every confidence signal is honest. Your data is private and yours alone. We will never silently regress — quality must provably improve with every release. Trust is the product, not a feature bolted on later.',
  },
]

const STATS = [
  { value: 6,    suffix: '',    label: 'Intelligence layers planned' },
  { value: 1,    suffix: '',    label: 'Layer live in open beta'     },
  { value: 2026, suffix: '',    label: 'Full platform target'        },
  { value: 100,  suffix: '%',   label: 'Free for every user'        },
]

const VALUE_ICONS = {
  anxiety: () => (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="14" cy="14" r="10" />
      <circle cx="14" cy="14" r="3" />
      <line x1="14" y1="4" x2="14" y2="7" />
      <line x1="14" y1="21" x2="14" y2="24" />
      <line x1="4" y1="14" x2="7" y2="14" />
      <line x1="21" y1="14" x2="24" y2="14" />
    </svg>
  ),
  understand: () => (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="14" cy="9" r="4" />
      <path d="M6 24 C6 18 22 18 22 24" />
      <line x1="2" y1="9" x2="6" y2="9" strokeDasharray="1.2 1.2" />
      <line x1="22" y1="9" x2="26" y2="9" strokeDasharray="1.2 1.2" />
      <line x1="14" y1="2" x2="14" y2="5" strokeDasharray="1.2 1.2" />
    </svg>
  ),
  trust: () => (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M14 3 L5 7 L5 15 C5 20 14 25 14 25 C14 25 23 20 23 15 L23 7 Z" />
      <polyline points="10 14 13 17 19 11" />
    </svg>
  ),
  compound: () => (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polyline points="3 20 9 13 14 16 22 7" />
      <polyline points="18 7 22 7 22 11" />
    </svg>
  ),
}

const VALUES = [
  { icon: 'anxiety'    as const, title: 'Replace anxiety',       desc: 'Turn "nothing to wear" into a decision you feel good about, every single morning.' },
  { icon: 'understand' as const, title: 'Truly understand you',  desc: 'Not the average person. You — your body, your taste, your budget, your occasion.' },
  { icon: 'trust'      as const, title: 'Be trustworthy',        desc: 'Explainable recommendations. Honest confidence signals. Your data is yours alone.' },
  { icon: 'compound'   as const, title: 'Compound intelligence', desc: "Measurably better the more it's used — for you individually and everyone collectively." },
]

/* ─── animated counter ─── */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 60, damping: 20 })
  const display = useTransform(spring, v => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, value, mv])

  return <motion.span ref={ref}>{display}</motion.span>
}

/* ─── magnetic button ─── */
function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.12)
    y.set((e.clientY - cy) * 0.12)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={handleMouseMove} onMouseLeave={reset}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
      {children}
    </motion.div>
  )
}

/* ─── animated heading letters ─── */
function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')
  let charIdx = 0

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => {
        const wordStart = charIdx
        charIdx += word.length + 1
        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: wi < words.length - 1 ? '0.28em' : 0 }}>
            {word.split('').map((char, ci) => (
              <motion.span
                key={ci}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.5, delay: (wordStart + ci) * 0.025, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        )
      })}
    </h2>
  )
}

/* ─── interactive pillar card ─── */
function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => setExpanded(e => !e)}
      className="group relative cursor-pointer rounded-2xl border border-black/[0.07] bg-white overflow-hidden"
      style={{
        boxShadow: hovered
          ? `0 8px 40px rgba(0,0,0,0.1), 0 0 0 1px ${pillar.accent}22`
          : '0 1px 4px rgba(0,0,0,0.04)',
      }}
      whileHover={{ y: -1 }}
    >
      {/* accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: pillar.accent }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.35 }}
      />

      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[0.62rem] font-mono tracking-[0.14em] uppercase"
                style={{ color: pillar.accent }}>{pillar.index}</span>
              <motion.div
                className="h-px flex-1 max-w-[40px]"
                style={{ background: pillar.accent }}
                animate={hovered ? { scaleX: 1.5, opacity: 1 } : { scaleX: 1, opacity: 0.3 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <motion.h3
              className="text-[1.1rem] sm:text-[1.2rem] font-bold text-[#111318] leading-snug mb-0"
              animate={hovered ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {pillar.title}
            </motion.h3>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1 flex-shrink-0 w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-black/40 text-lg font-light"
          >
            +
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#5a5a65] leading-[1.78] text-[0.9375rem] font-[350] mt-4 overflow-hidden"
            >
              {pillar.body}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─── value card ─── */
function ValueCard({ v, index }: { v: typeof VALUES[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = VALUE_ICONS[v.icon]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -2 }}
      className="relative p-6 rounded-2xl border border-black/[0.07] bg-white overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/[0.015] to-transparent"
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
      />
      <motion.div
        className="w-10 h-10 rounded-xl bg-[#F7F6F3] border border-black/[0.07] flex items-center justify-center mb-4 text-[#111318]"
        animate={hovered ? { scale: 1.08, backgroundColor: '#111318', color: '#ffffff' } : { scale: 1, backgroundColor: '#F7F6F3', color: '#111318' }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      >
        <Icon />
      </motion.div>
      <h4 className="text-base font-bold text-[#111318] mb-2">{v.title}</h4>
      <p className="text-[0.875rem] text-[#5a5a65] leading-[1.7] font-[350]">{v.desc}</p>
    </motion.div>
  )
}

/* ─── page ─── */
export default function AboutPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-36 pb-24 sm:pt-48 sm:pb-36 overflow-hidden">
        {/* background grain */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

        {/* animated circles */}
        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.08, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-16 -left-24 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.12, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[0.68rem] font-mono text-[#9ca3af] uppercase tracking-[0.22em] mb-8 flex items-center gap-3"
          >
            <span className="w-6 h-px bg-current" />
            About GYF
          </motion.div>

          <AnimatedHeading
            text="An intelligence built to dress you —"
            className="text-[clamp(1.9rem,6vw,5rem)] font-black text-[#111318] leading-[1.02] tracking-tight"
          />
          <AnimatedHeading
            text="not the average person."
            className="text-[clamp(1.9rem,6vw,5rem)] font-black text-[#111318] leading-[1.02] tracking-tight mb-8 sm:mb-10"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-[#5a5a65] text-lg leading-[1.75] max-w-xl font-[350] mb-12"
          >
            Founded on the belief that great style should be accessible to everyone —
            not just those who can afford a personal stylist.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <MagneticWrapper>
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#111318] text-white text-[0.875rem] font-semibold hover:bg-[#1e2230] transition-colors"
              >
                Try the Perception Layer
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

      {/* ── Animated stats ── */}
      <section className="py-12 sm:py-16 border-y border-black/[0.05]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/[0.05] rounded-2xl overflow-hidden">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white px-5 py-8 sm:px-8 sm:py-10 text-center sm:text-left">
                <div className="text-[clamp(2.2rem,5vw,3rem)] font-black text-[#111318] leading-none tracking-tight mb-2 font-mono">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[0.7rem] text-[#9ca3af] font-mono uppercase tracking-wide leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story pillars ── */}
      <section className="py-20 sm:py-32">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <AnimatedHeading
              text="Our story"
              className="text-[clamp(1.8rem,4vw,3rem)] font-black text-[#111318] leading-[1.05] tracking-tight mb-4"
            />
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="text-[#9ca3af] text-sm font-mono uppercase tracking-[0.12em]"
            >
              Click any card to expand
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <PillarCard key={p.index} pillar={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 sm:py-24 bg-[#fafafa] border-y border-black/[0.05]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <AnimatedHeading
              text="What we stand for"
              className="text-[clamp(1.8rem,4vw,3rem)] font-black text-[#111318] leading-[1.05] tracking-tight"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} v={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Intelligence layers timeline ── */}
      <section className="py-20 sm:py-32">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <AnimatedHeading
            text="Six layers of intelligence"
            className="text-[clamp(1.8rem,4vw,3rem)] font-black text-[#111318] leading-[1.05] tracking-tight mb-14"
          />

          {[
            { num: '01', name: 'Perception', status: 'live', color: '#10b981', desc: 'Reads your body, proportions, palette, and presence from a single photo.' },
            { num: '02', name: 'Taste Modeling', status: 'in dev', color: '#6366f1', desc: 'A living preference model that deepens with every save, skip, and interaction.' },
            { num: '03', name: 'Outfit Composition', status: 'in dev', color: '#f59e0b', desc: 'Complete, coordinated looks — top + bottom + footwear — with a stylist reason for each.' },
            { num: '04', name: 'Virtual Try-On', status: 'planned', color: '#ec4899', desc: 'See the outfit on your actual body before you commit to buying.' },
            { num: '05', name: 'Social', status: 'planned', color: '#3b82f6', desc: 'Share styles, follow others, and see any look re-rendered for your own skin tone and body.' },
            { num: '06', name: 'Collective Intelligence', status: 'planned', color: '#8b5cf6', desc: 'What thousands of people teach each other about style, distilled back to you.' },
          ].map((layer, i) => (
            <motion.div
              key={layer.num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              whileHover={{ x: 3 }}
              className="group flex gap-6 sm:gap-10 py-6 border-b border-black/[0.05] last:border-0 cursor-default"
            >
              <div className="flex-shrink-0 w-10 text-right">
                <span className="text-[0.65rem] font-mono tracking-[0.14em] text-[#c4c4c8]">{layer.num}</span>
              </div>
              <div className="w-px self-stretch" style={{ background: layer.color, opacity: 0.3 }} />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <motion.h4
                    className="text-base font-bold text-[#111318]"
                    whileHover={{ color: layer.color }}
                    transition={{ duration: 0.2 }}
                  >
                    {layer.name}
                  </motion.h4>
                  <span
                    className="text-[0.6rem] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                    style={{
                      background: `${layer.color}18`,
                      color: layer.color,
                    }}
                  >
                    {layer.status}
                  </span>
                </div>
                <p className="text-[0.875rem] text-[#5a5a65] leading-[1.7] font-[350]">{layer.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission blockquote ── */}
      <section className="py-16 sm:py-24 bg-[#111318]">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[0.68rem] font-mono text-white/30 uppercase tracking-[0.22em] mb-8">Our mission</p>
            <blockquote className="text-[clamp(1.5rem,4vw,2.5rem)] font-black text-white leading-[1.2] tracking-tight mb-10">
              {'"Replace anxiety with confidence. Understand you deeply. Be trustworthy, not just impressive. Get better with every outfit."'}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-white/20" />
              <span className="text-[0.78rem] text-white/40 font-mono">The GYF team</span>
              <div className="w-8 h-px bg-white/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <AnimatedHeading
            text="Ready to get your fit?"
            className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#111318] leading-[1.05] tracking-tight mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="text-[#5a5a65] text-base leading-[1.75] mb-10 font-[350]"
          >
            The Perception Layer is live. Upload a photo and see GYF read your proportions, palette, and presence — in real time.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticWrapper>
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#111318] text-white text-[0.875rem] font-semibold hover:bg-[#1e2230] transition-colors"
              >
                Start for free →
              </Link>
            </MagneticWrapper>
            <MagneticWrapper>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-black/10 text-[#111318] text-[0.875rem] font-medium hover:bg-black/[0.03] transition-colors"
              >
                See how it works
              </Link>
            </MagneticWrapper>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
