'use client'
import { motion } from 'framer-motion'

const PILLARS = [
  {
    index: '01',
    title: 'The problem we saw',
    body: 'A full wardrobe and nothing to wear. Apps that show items but never how to wear them together. Constant doubt — does this match? Is it right for the occasion? Does it suit me? A personal stylist has always been a luxury. We decided to make that intelligence free, instant, and personal to everyone.',
  },
  {
    index: '02',
    title: 'Why AI-first from day one',
    body: 'Styling is a perception and preference problem. Style is visual — it has to be seen, not tagged. Taste is personal and learned — it deepens with every interaction, not just an onboarding form. And good styling compounds: the more people GYF dresses, the better it gets for everyone. A rules engine can only approximate this. We built the real thing.',
  },
  {
    index: '03',
    title: 'What we are building',
    body: 'Six interlocking intelligence layers: Perception (reading your body and presence from a photo), Taste Modeling (a living preference model that learns with every save and skip), Outfit Composition (complete coordinated looks with a reason behind each), Try-On (see it on your actual body before committing), Social (share styles, follow others, re-rendered for your own tone), and Collective Intelligence (what thousands of people teach each other about style, distilled back to you).',
  },
  {
    index: '04',
    title: 'Where we are now',
    body: 'The Perception Layer — Layer 01 — is live in open beta. You can upload a photo and see GYF read your proportions, palette, and presence in real time. Five more layers are in active development and ship through 2026. Every layer adds a new dimension to how well GYF knows and serves you.',
  },
  {
    index: '05',
    title: 'Our commitment',
    body: 'Every recommendation comes with a reason. Every confidence signal is honest. Your data is private and yours alone. We will never silently regress — quality must provably improve with every release. Trust is the product, not a feature bolted on later.',
  },
]

const TEAM_FACTS = [
  { value: '6',      label: 'Intelligence layers planned' },
  { value: '01',     label: 'Layer live in open beta'     },
  { value: '2026',   label: 'Full platform target'        },
  { value: '∞',      label: 'Outfits GYF can generate'   },
]

export default function About() {
  return (
    <section className="py-20 sm:py-36 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="text-[0.68rem] font-mono text-gray-700 uppercase tracking-widest mb-4">About GYF</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black text-[#111318] leading-[1.02] tracking-tight max-w-xl">
              An intelligence built to dress you — not the average person.
            </h2>
            <p className="text-[#5a5a65] text-base leading-[1.75] max-w-xs lg:text-right font-[350] lg:self-end">
              Founded on the belief that great style should be accessible to everyone, not just those who can afford a personal stylist.
            </p>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black/[0.06] rounded-2xl overflow-hidden mb-20"
        >
          {TEAM_FACTS.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-white px-6 py-8"
            >
              <div className="text-[clamp(2rem,4vw,2.75rem)] font-black text-[#111318] leading-none tracking-tight mb-2">{f.value}</div>
              <div className="text-[0.72rem] text-[#9ca3af] font-mono uppercase tracking-wide leading-snug">{f.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pillars */}
        <div className="space-y-0 divide-y divide-black/[0.05]">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.index}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-6 sm:gap-12 py-10"
            >
              <div className="flex sm:flex-col sm:items-start items-center gap-4 sm:gap-2 sm:pt-1">
                <span className="text-[0.65rem] font-mono text-[#c4c4c8] tracking-[0.14em]">{p.index}</span>
                <div className="h-px sm:h-10 sm:w-px w-6 bg-black/[0.07]" />
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-[#111318] mb-3 leading-snug">{p.title}</h3>
                <p className="text-[#5a5a65] leading-[1.78] text-[0.9375rem] font-[350]">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 pt-16 border-t border-black/[0.05]"
        >
          <div className="max-w-2xl">
            <p className="text-[0.68rem] font-mono text-[#c4c4c8] uppercase tracking-[0.14em] mb-6">Our mission</p>
            <blockquote className="text-[clamp(1.25rem,3vw,1.75rem)] font-black text-[#111318] leading-[1.25] tracking-tight mb-8">
              Replace anxiety with confidence. Understand you deeply. Be trustworthy, not just impressive. Get better with every outfit.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-black/20" />
              <span className="text-[0.78rem] text-[#9ca3af] font-mono">The GYF team</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
