'use client'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'

// ─── Icons ───────────────────────────────────────────────────────────────────

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

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    Icon: EyeIcon,
    title: 'Visual Style Intelligence',
    body: 'Understands clothing visually — vibe, color harmony, texture, silhouette. Not just tags or categories.',
    detail: 'GYF perceives garments from images the way a real stylist does, matching and coordinating by how things actually look — reading aesthetic harmony directly from visual signals.',
    accent: '#C4956A',
    tag: 'Perception',
  },
  {
    Icon: BrainIcon,
    title: 'Personal Taste Engine',
    body: 'Builds a living model of your personal taste from every interaction, not just onboarding.',
    detail: 'Deepens with every save, skip, and reaction. The longer you use GYF, the more results suit your personality, body type, skin tone, budget, and occasion.',
    accent: '#7B8FBF',
    tag: 'Learning',
  },
  {
    Icon: OutfitIcon,
    title: 'Complete Outfit Generation',
    body: 'Delivers complete outfits — top, bottom, footwear — coordinated as one look with a clear stylist reason.',
    detail: 'Never just items. GYF thinks in complete, coordinated looks: every recommendation is a full outfit with a human-readable explanation and honest confidence signal attached.',
    accent: '#5B7339',
    tag: 'Output',
  },
  {
    Icon: ChatIcon,
    title: 'Natural-Language Goals',
    body: 'Tell GYF what you want in plain words — "I want to look taller" — and it makes it happen.',
    detail: 'GYF applies colour theory and body-type intelligence to pick garments, cuts, and colours that achieve your stated visual effect.',
    accent: '#C2185B',
    tag: 'Intent',
  },
  {
    Icon: CameraIcon,
    title: 'Virtual Try-On',
    body: 'Select any complete look and see it rendered realistically on your own body.',
    detail: 'Upload a photo as input; see the selected top, bottom, and footwear rendered together on your actual body — giving a genuinely accurate preview of fit and style before you commit.',
    accent: '#D98E04',
    tag: 'Visualise',
  },
  {
    Icon: GlobeIcon,
    title: 'Occasion & Region-Aware',
    body: 'Recommendations adapt to your occasion and respect regional dress culture.',
    detail: 'Specify casual, formal, wedding, festive, and more. Regional dress is respected — Indian users see sarees; the catalog and styling logic are localised to your world.',
    accent: '#2D7A8A',
    tag: 'Context',
  },
  {
    Icon: WardrobeIcon,
    title: 'Personal Collections',
    body: 'Save items, revisit sessions, and style around the wardrobe you already own.',
    detail: 'Maintain a shortlist of saved items, a history of past GYF sessions, and a wardrobe of what you already own — so GYF styles around your real closet, not just the catalog.',
    accent: '#8B6FBF',
    tag: 'Wardrobe',
  },
  {
    Icon: SocialIcon,
    title: 'Social & Inspiration',
    body: 'Shoppable looks, style sharing, and a discovery feed inspired by LTK.',
    detail: "A dedicated social layer: interactive, shareable posts, creator feeds, style-following re-rendered to your own skin tone and preferences. Follow someone's style — but as you.",
    accent: '#C2185B',
    tag: 'Social',
  },
]

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({
  feature,
  index,
  isExpanded,
  isAnyExpanded,
  onToggle,
}: {
  feature: typeof features[0]
  index: number
  isExpanded: boolean
  isAnyExpanded: boolean
  onToggle: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-60, 60], [6, -6]), { stiffness: 260, damping: 28 })
  const rotateY = useSpring(useTransform(mx, [-60, 60], [-6, 6]), { stiffness: 260, damping: 28 })

  // Spotlight position
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)

  const [isHovered, setIsHovered] = useState(false)
  const [shimmerKey, setShimmerKey] = useState(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isExpanded || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    mx.set(relX - rect.width / 2)
    my.set(relY - rect.height / 2)
    spotX.set((relX / rect.width) * 100)
    spotY.set((relY / rect.height) * 100)
  }, [isExpanded, mx, my, spotX, spotY])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    setShimmerKey(k => k + 1)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mx.set(0); my.set(0)
    spotX.set(50); spotY.set(50)
  }, [mx, my, spotX, spotY])

  // Entrance: alternate slide direction by column position
  const col = index % 4
  const entranceX = col < 2 ? -32 : 32
  const entranceDelay = (Math.floor(index / 4) * 0.15) + (col * 0.08)

  return (
    <motion.div
      ref={cardRef}
      layout
      layoutId={`card-${index}`}
      initial={{ opacity: 0, y: 40, x: entranceX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        layout: { type: 'spring', stiffness: 340, damping: 38 },
        opacity: { duration: 0.5, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 0.6, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] },
        x: { duration: 0.6, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={onToggle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isExpanded ? 0 : rotateX,
        rotateY: isExpanded ? 0 : rotateY,
        perspective: 900,
        transformStyle: 'preserve-3d' as React.CSSProperties['transformStyle'],
        zIndex: isExpanded ? 10 : isHovered ? 5 : 1,
        boxShadow: isExpanded
          ? `0 24px 80px rgba(17,19,24,0.35), 0 4px 16px rgba(17,19,24,0.2), 0 0 0 1px ${feature.accent}33`
          : isHovered
          ? `0 16px 48px rgba(17,19,24,0.14), 0 4px 12px rgba(17,19,24,0.08), inset 0 1px 0 rgba(255,255,255,0.8), 0 0 0 1px ${feature.accent}20`
          : '0 1px 4px rgba(17,19,24,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
      animate={{
        y: isExpanded ? 0 : isHovered ? -8 : 0,
        scale: isExpanded ? 1 : isHovered ? 1.015 : isAnyExpanded ? 0.97 : 1,
        opacity: isAnyExpanded && !isExpanded ? 0.6 : 1,
      }}
      whileTap={{ scale: isExpanded ? 1 : 0.975 }}
      className={`rounded-2xl border cursor-pointer overflow-hidden relative select-none ${
        isExpanded
          ? 'bg-[#111318] border-[#111318] col-span-1 sm:col-span-2'
          : 'bg-white border-black/[0.08]'
      }`}
    >
      {/* Cursor-tracking spotlight (idle/hover only) */}
      {!isExpanded && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: useTransform(
              [spotX, spotY],
              ([x, y]) => `radial-gradient(140px circle at ${x}% ${y}%, ${feature.accent}18, transparent 70%)`
            ),
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Hover shimmer sweep */}
      <AnimatePresence>
        {isHovered && !isExpanded && (
          <motion.div
            key={shimmerKey}
            className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-y-0 w-[60%]"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded: accent sweep bar at top */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: `linear-gradient(90deg, ${feature.accent}, ${feature.accent}66)` }}
          />
        )}
      </AnimatePresence>

      {/* Expanded: ambient glow orb */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: `radial-gradient(circle, ${feature.accent}18 0%, transparent 70%)`,
              transform: 'translate(30%, -30%)',
              filter: 'blur(24px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Card content */}
      <div className="relative z-10 p-[1.75rem]">
        {/* Tag + index row */}
        <div className="flex items-center justify-between mb-4">
          <motion.span
            className="text-[0.58rem] font-mono tracking-[0.14em] uppercase"
            animate={{ color: isExpanded ? `${feature.accent}` : '#c4c4c8' }}
            transition={{ duration: 0.3 }}
          >
            {feature.tag}
          </motion.span>
          <motion.span
            className="text-[0.58rem] font-mono tabular-nums"
            animate={{ color: isExpanded ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>
        </div>

        {/* Icon */}
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
          animate={{
            background: isExpanded ? `${feature.accent}22` : isHovered ? `${feature.accent}16` : '#F7F6F3',
            color: isExpanded || isHovered ? feature.accent : '#9ca3af',
            scale: isHovered && !isExpanded ? [1, 1.18, 1] : 1,
            rotate: isHovered && !isExpanded ? [0, -8, 8, 0] : 0,
          }}
          transition={{
            background: { duration: 0.25 },
            color: { duration: 0.25 },
            scale: { duration: 0.5, ease: 'easeInOut' },
            rotate: { duration: 0.5, ease: 'easeInOut' },
          }}
        >
          <feature.Icon />
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-[0.9375rem] font-semibold mb-2 leading-snug"
          animate={{ color: isExpanded ? '#ffffff' : '#111318' }}
          transition={{ duration: 0.25 }}
        >
          {feature.title}
        </motion.h3>

        {/* Body */}
        <motion.p
          className="text-[0.8125rem] leading-relaxed"
          animate={{ color: isExpanded ? 'rgba(255,255,255,0.5)' : '#5a5a65' }}
          transition={{ duration: 0.25 }}
        >
          {feature.body}
        </motion.p>

        {/* Expanded detail */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, height: 'auto', y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, height: 0, y: 4, filter: 'blur(4px)' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 pt-5 border-t border-white/[0.08]">
                <p className="text-sm text-white/60 leading-relaxed">{feature.detail}</p>

                {/* Accent chips row */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {feature.detail.split('—').slice(0, 2).map((_, k) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, scale: 0.8, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.15 + k * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="h-1 rounded-full flex-1 min-w-[2rem] max-w-[4rem]"
                      style={{ background: `${feature.accent}${k === 0 ? 'cc' : '44'}` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand / collapse hint */}
        <motion.div
          className="mt-4 flex items-center gap-1.5"
          animate={{ opacity: isHovered || isExpanded ? 1 : 0.35 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className="text-[0.62rem] font-mono tracking-[0.1em]"
            animate={{ color: isExpanded ? 'rgba(255,255,255,0.22)' : feature.accent }}
          >
            {isExpanded ? 'COLLAPSE' : 'EXPAND'}
          </motion.span>
          <motion.span
            className="text-[0.7rem]"
            animate={{
              rotate: isExpanded ? 180 : 0,
              color: isExpanded ? 'rgba(255,255,255,0.22)' : feature.accent,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function WhatWeDo() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const toggle = useCallback((i: number) => {
    setExpandedCard(prev => prev === i ? null : i)
  }, [])

  return (
    <section className="py-20 sm:py-36 bg-white border-t border-black/[0.05] overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[0.68rem] font-mono text-[#6b6b78] uppercase tracking-[0.14em] mb-4"
          >
            Core
          </motion.div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-[#111318] leading-[1.02] tracking-tight">
            What GYF Does
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#5a5a65] text-sm mt-3 font-[350]"
          >
            Tap any card to expand — hover to feel the depth.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3"
        >
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              feature={f}
              index={i}
              isExpanded={expandedCard === i}
              isAnyExpanded={expandedCard !== null}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* Bottom legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {features.map((f) => (
            <div key={f.tag} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: f.accent }} />
              <span className="text-[0.62rem] text-[#9ca3af] font-mono">{f.tag}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
