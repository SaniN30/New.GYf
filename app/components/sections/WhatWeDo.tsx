'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const EyeIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <ellipse cx="16" cy="16" rx="12" ry="8" />
    <circle cx="16" cy="16" r="3.5" />
    <circle cx="16" cy="16" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const BrainIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 6C9 6 7 8 7 11C5.5 11.5 4 13 4 15C4 17.5 6 19 8 19V24H24V19C26 19 28 17.5 28 15C28 13 26.5 11.5 25 11C25 8 23 6 20 6C18.5 6 17 6.8 16 8C15 6.8 13.5 6 12 6Z" />
    <path d="M16 8 L16 24" />
    <path d="M10 14 C10 14 12 16 14 14" />
    <path d="M18 14 C18 14 20 16 22 14" />
  </svg>
)

const OutfitIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M10 4 L5 10 L9 12 L9 28 L23 28 L23 12 L27 10 L22 4 C22 4 19.5 7 16 7 C12.5 7 10 4 10 4Z" />
    <path d="M12 19 L20 19" />
    <path d="M12 23 L18 23" />
  </svg>
)

const ChatIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M4 6 C4 4.9 4.9 4 6 4 L26 4 C27.1 4 28 4.9 28 6 L28 20 C28 21.1 27.1 22 26 22 L10 22 L4 28 L4 6Z" />
    <path d="M9 11 L23 11" strokeWidth="1.3" />
    <path d="M9 15 L19 15" strokeWidth="1.3" />
  </svg>
)

const CameraIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 10 C3 8.9 3.9 8 5 8 L10 8 L12 5 L20 5 L22 8 L27 8 C28.1 8 29 8.9 29 10 L29 24 C29 25.1 28.1 26 27 26 L5 26 C3.9 26 3 25.1 3 24 Z" />
    <circle cx="16" cy="17" r="5" />
    <circle cx="16" cy="17" r="2.5" />
  </svg>
)

const GlobeIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="16" cy="16" r="12" />
    <ellipse cx="16" cy="16" rx="5" ry="12" />
    <path d="M4 16 L28 16" />
    <path d="M5.5 10 L26.5 10" />
    <path d="M5.5 22 L26.5 22" />
  </svg>
)

const WardrobeIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="4" width="26" height="24" rx="2" />
    <path d="M16 4 L16 28" />
    <circle cx="13" cy="16" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="19" cy="16" r="1.2" fill="currentColor" stroke="none" />
    <path d="M8 10 L12 10" strokeWidth="1.2" />
    <path d="M20 10 L24 10" strokeWidth="1.2" />
  </svg>
)

const SocialIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="8" cy="16" r="4" />
    <circle cx="24" cy="8" r="4" />
    <circle cx="24" cy="24" r="4" />
    <path d="M12 14 L20 10" />
    <path d="M12 18 L20 22" />
  </svg>
)

const features = [
  {
    Icon: EyeIcon,
    title: 'Visual Style Intelligence',
    body: 'Understands clothing visually — vibe, color harmony, texture, silhouette. Not just tags or categories.',
    detail: 'GYF perceives garments from images the way a real stylist does, matching and coordinating by how things actually look — reading aesthetic harmony directly from visual signals.',
    accent: '#C4956A',
  },
  {
    Icon: BrainIcon,
    title: 'Personal Taste Engine',
    body: 'Builds a living model of your personal taste from every interaction, not just onboarding.',
    detail: 'Deepens with every save, skip, and reaction. The longer you use GYF, the more results suit your personality, body type, skin tone, budget, and occasion.',
    accent: '#7B8FBF',
  },
  {
    Icon: OutfitIcon,
    title: 'Complete Outfit Generation',
    body: 'Delivers complete outfits — top, bottom, footwear — coordinated as one look with a clear stylist reason.',
    detail: 'Never just items. GYF thinks in complete, coordinated looks: every recommendation is a full outfit with a human-readable explanation and honest confidence signal attached.',
    accent: '#5B7339',
  },
  {
    Icon: ChatIcon,
    title: 'Natural-Language Styling Goals',
    body: 'Tell GYF what you want in plain words — "I want to look taller" — and it makes it happen.',
    detail: 'GYF applies colour theory and body-type intelligence to pick garments, cuts, and colours that achieve your stated visual effect.',
    accent: '#C2185B',
  },
  {
    Icon: CameraIcon,
    title: 'Virtual Try-On',
    body: 'Select any complete look and see it rendered realistically on your own body.',
    detail: 'Upload a photo as input; see the selected top, bottom, and footwear rendered together on your actual body — giving a genuinely accurate preview of fit and style before you commit.',
    accent: '#D98E04',
  },
  {
    Icon: GlobeIcon,
    title: 'Occasion & Region-Aware',
    body: 'Recommendations adapt to your occasion and respect regional dress culture.',
    detail: 'Specify casual, formal, wedding, festive, and more. Regional dress is respected — Indian users see sarees; the catalog and styling logic are localised to your world.',
    accent: '#2D7A8A',
  },
  {
    Icon: WardrobeIcon,
    title: 'Personal Collections',
    body: 'Save items, revisit sessions, and style around the wardrobe you already own.',
    detail: 'Maintain a shortlist of saved items, a history of past GYF sessions, and a wardrobe of what you already own — so GYF styles around your real closet, not just the catalog.',
    accent: '#8B6FBF',
  },
  {
    Icon: SocialIcon,
    title: 'Social & Inspiration',
    body: 'Shoppable looks, style sharing, and a discovery feed inspired by LTK.',
    detail: "A dedicated social layer: interactive, shareable posts, creator feeds, style-following re-rendered to your own skin tone and preferences. Follow someone's style and dress like them — but as you.",
    accent: '#C2185B',
  },
]

export default function WhatWeDo() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-20 sm:py-36 bg-white border-t border-black/[0.05]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <div className="text-[0.68rem] font-mono text-[#9ca3af] uppercase tracking-[0.14em] mb-4">Core</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-[#111318] leading-[1.02] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            What GYF Does
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((f, i) => {
            const isExpanded = expandedCard === i
            const isHovered  = hoveredCard === i

            return (
              <motion.div
                key={f.title}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setExpandedCard(isExpanded ? null : i)}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`rounded-2xl border cursor-pointer overflow-hidden transition-colors duration-300 ${
                  isExpanded
                    ? 'bg-[#111318] border-[#111318] shadow-[0_12px_48px_rgba(17,19,24,0.22)] col-span-1 sm:col-span-2'
                    : 'bg-white border-black/[0.08] hover:border-black/20 hover:shadow-[0_4px_20px_rgba(17,19,24,0.08)]'
                }`}
                style={{ padding: '1.75rem' }}
                animate={!isExpanded && isHovered ? { y: -4 } : { y: 0 }}
              >
                {/* Icon */}
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                  style={{
                    background: isExpanded
                      ? `${f.accent}22`
                      : isHovered ? `${f.accent}14` : '#F7F6F3',
                    color: isExpanded || isHovered ? f.accent : '#9ca3af',
                  }}
                  animate={isExpanded ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <f.Icon />
                </motion.div>

                <h3 className={`text-[0.9375rem] font-semibold mb-2 leading-snug transition-colors duration-200 ${isExpanded ? 'text-white' : 'text-[#111318]'}`}>
                  {f.title}
                </h3>
                <p className={`text-[0.8125rem] leading-relaxed transition-colors duration-200 ${isExpanded ? 'text-white/50' : 'text-[#9ca3af]'}`}>
                  {f.body}
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 pt-5 border-t border-white/[0.08]">
                        <p className="text-sm text-white/60 leading-relaxed">{f.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer hint */}
                <motion.div
                  className={`mt-4 text-[0.65rem] font-mono tracking-[0.1em] transition-colors duration-200 ${isExpanded ? 'text-white/25' : 'text-black/20 group-hover:text-black/35'}`}
                  animate={isHovered && !isExpanded ? { opacity: 1 } : { opacity: 0.6 }}
                >
                  {isExpanded ? '↑ COLLAPSE' : '↓ EXPAND'}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
