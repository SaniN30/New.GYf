'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'

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
    body: 'Styling is a perception and preference problem. Style is visual — it has to be seen, not tagged. Taste is personal and learned — it deepens with every interaction, not just an onboarding form. And good styling compounds: the more people GYF dresses, the better it gets for everyone.',
  },
  {
    index: '03',
    title: 'What we are building',
    accent: '#f59e0b',
    body: 'Six interlocking intelligence layers: Perception, Taste Modeling, Outfit Composition, Try-On, Social, and Collective Intelligence. Each layer adds a new dimension to how well GYF knows and serves you.',
  },
  {
    index: '04',
    title: 'Where we are now',
    accent: '#10b981',
    body: 'The Perception Layer — Layer 01 — is live in open beta. You can upload a photo and see GYF read your proportions, palette, and presence in real time. Five more layers are in active development and ship through 2026.',
  },
  {
    index: '05',
    title: 'Our commitment',
    accent: '#3b82f6',
    body: 'Every recommendation comes with a reason. Every confidence signal is honest. Your data is private and yours alone. We will never silently regress — quality must provably improve with every release.',
  },
]

const TEAM_FACTS = [
  { value: '6',    label: 'Intelligence layers planned' },
  { value: '01',   label: 'Layer live in open beta'     },
  { value: '2026', label: 'Full platform target'        },
  { value: '∞',    label: 'Outfits GYF can generate'   },
]

/* animated heading — words pop in on hover too */
function InteractiveHeading({ text, className }: { text: string; className?: string }) {
  const [hoveredWord, setHoveredWord] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', marginRight: '0.28em' }}>
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              whileHover={{ y: -3, color: '#6366f1' }}
              onHoverStart={() => setHoveredWord(wi)}
              onHoverEnd={() => setHoveredWord(null)}
              transition={{ duration: 0.5, delay: (wi * word.length + ci) * 0.02, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'inline-block',
                cursor: 'default',
                color: hoveredWord === wi ? '#6366f1' : undefined,
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h2>
  )
}

/* pillar row with hover expand */
function PillarRow({ p, i }: { p: typeof PILLARS[0]; i: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-4 sm:gap-12 py-8 sm:py-10 border-b border-black/[0.05] last:border-0 group cursor-default"
    >
      <div className="flex sm:flex-col sm:items-start items-center gap-4 sm:gap-2 sm:pt-1">
        <motion.span
          className="text-[0.65rem] font-mono tracking-[0.14em]"
          animate={{ color: hovered ? p.accent : '#c4c4c8' }}
          transition={{ duration: 0.2 }}
        >{p.index}</motion.span>
        <motion.div
          className="sm:w-px sm:h-10 w-6 h-px"
          animate={{ background: hovered ? p.accent : 'rgba(0,0,0,0.07)', scaleY: hovered ? 1.3 : 1 }}
          transition={{ duration: 0.25 }}
        />
      </div>
      <div>
        <motion.h3
          className="text-[1.05rem] font-semibold text-[#111318] mb-3 leading-snug"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {p.title}
        </motion.h3>
        <motion.p
          className="text-[#5a5a65] leading-[1.78] text-[0.9375rem] font-[350]"
          animate={{ opacity: hovered ? 1 : 0.75 }}
          transition={{ duration: 0.2 }}
        >
          {p.body}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section className="py-20 sm:py-36 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-20"
        >
          <div className="text-[0.68rem] font-mono text-gray-700 uppercase tracking-widest mb-4">About GYF</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <InteractiveHeading
              text="An intelligence built to dress you — not the average person."
              className="text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#111318] leading-[1.02] tracking-tight max-w-xl"
            />
            <p className="text-[#5a5a65] text-base leading-[1.75] max-w-xs lg:text-right font-[350] lg:self-end">
              Founded on the belief that great style should be accessible to everyone, not just those who can afford a personal stylist.
            </p>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/[0.06] rounded-2xl overflow-hidden mb-12 sm:mb-20"
        >
          {TEAM_FACTS.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ backgroundColor: '#fafafa', scale: 1.02 }}
              className="bg-white px-4 py-6 sm:px-6 sm:py-8 cursor-default"
            >
              <div className="text-[clamp(2rem,4vw,2.75rem)] font-black text-[#111318] leading-none tracking-tight mb-2">{f.value}</div>
              <div className="text-[0.72rem] text-[#9ca3af] font-mono uppercase tracking-wide leading-snug">{f.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pillars */}
        <div className="space-y-0">
          {PILLARS.map((p, i) => (
            <PillarRow key={p.index} p={p} i={i} />
          ))}
        </div>

        {/* Mission quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-20 pt-10 sm:pt-16 border-t border-black/[0.05]"
        >
          <div className="max-w-2xl">
            <p className="text-[0.68rem] font-mono text-[#c4c4c8] uppercase tracking-[0.14em] mb-6">Our mission</p>
            <blockquote className="text-[clamp(1.25rem,3vw,1.75rem)] font-black text-[#111318] leading-[1.25] tracking-tight mb-8">
              Replace anxiety with confidence. Understand you deeply. Be trustworthy, not just impressive. Get better with every outfit.
            </blockquote>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-px bg-black/20" />
              <span className="text-[0.78rem] text-[#9ca3af] font-mono">The GYF team</span>
            </div>

            {/* link to full about page */}
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[#111318] hover:text-[#6366f1] transition-colors border-b border-black/10 hover:border-[#6366f1] pb-0.5"
              >
                Read the full story
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
