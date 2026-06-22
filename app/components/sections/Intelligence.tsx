'use client'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'

const EyeIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <ellipse cx="14" cy="14" rx="10" ry="7" />
    <circle cx="14" cy="14" r="3" />
    <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const BrainIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M10 5C8 5 6 6.8 6 9C4.8 9.5 3.5 11 3.5 13C3.5 15.2 5.2 16.5 7 16.5V21H21V16.5C22.8 16.5 24.5 15.2 24.5 13C24.5 11 23.2 9.5 22 9C22 6.8 20 5 18 5C16.8 5 15.5 5.7 14 7C12.5 5.7 11.2 5 10 5Z" />
    <path d="M14 7 L14 21" />
  </svg>
)

const NetworkIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="14" cy="14" r="3" />
    <circle cx="5"  cy="7"  r="2" />
    <circle cx="23" cy="7"  r="2" />
    <circle cx="5"  cy="21" r="2" />
    <circle cx="23" cy="21" r="2" />
    <path d="M11 12 L7 9" />
    <path d="M17 12 L21 9" />
    <path d="M11 16 L7 19" />
    <path d="M17 16 L21 19" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14 3 L22 6.5 L22 13 C22 17.5 18.5 21.5 14 23 C9.5 21.5 6 17.5 6 13 L6 6.5 Z" />
    <path d="M10 14 L12.5 16.5 L18 11" />
  </svg>
)

const BodyIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="14" cy="6" r="3" />
    <path d="M8 11 C8 11 10 10 14 10 C18 10 20 11 20 11 L22 18 L18 18 L18 25 L10 25 L10 18 L6 18 Z" />
    <path d="M8 11 L6 18" />
    <path d="M20 11 L22 18" />
  </svg>
)

const LightningIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 3 L7 16 L13 16 L12 25 L21 12 L15 12 Z" />
  </svg>
)

const pillars = [
  {
    Icon: EyeIcon,
    title: 'Visual Style Intelligence',
    summary: 'Reads aesthetic, texture, colour, and silhouette directly from imagery.',
    detail: 'GYF sees and understands clothing the way a stylist does — reading vibe, colour harmony, texture, and silhouette from images so coordination is based on real visual harmony, not just labels or tags.',
    accent: '#C4956A',
    tag: 'Perception',
  },
  {
    Icon: BrainIcon,
    title: 'Deep Personal-Taste Modeling',
    summary: 'A living preference model that anticipates what you\'ll love.',
    detail: 'A living, individual representation of each user\'s preferences that anticipates what they\'ll love before they see it and refines with every signal — every save, skip, and reaction.',
    accent: '#7B8FBF',
    tag: 'Learning',
  },
  {
    Icon: NetworkIcon,
    title: 'Collective Intelligence',
    summary: 'Learns from thousands, distils insights back to you personally.',
    detail: 'GYF learns from how thousands of people react to combinations, discovering styling patterns no rulebook contains — then tailors those insights back to the individual.',
    accent: '#2D7A8A',
    tag: 'Network',
  },
  {
    Icon: ShieldIcon,
    title: 'Honest Confidence',
    summary: 'Every recommendation comes with a reason and honest confidence.',
    detail: 'Even as an AI-first product, GYF always pairs intelligence with explanation and honest confidence. The advanced models are continuously evaluated against quality benchmarks.',
    accent: '#5B7339',
    tag: 'Trust',
  },
  {
    Icon: BodyIcon,
    title: 'Generative Visualization',
    summary: 'See any look realistically on your own body before committing.',
    detail: 'Select a top, bottom, and footwear and see all three together on yourself, rendered from your own photo. The last barrier between inspiration and confidence, removed.',
    accent: '#C2185B',
    tag: 'Visualization',
  },
  {
    Icon: LightningIcon,
    title: 'Compounding Stylist',
    summary: 'An intelligence that gets sharper the more it dresses.',
    detail: 'Every outfit, save, and skip improves the next recommendation for everyone. Real user behaviour is the most valuable asset; GYF captures it cleanly and compounds it into measurable improvement.',
    accent: '#D98E04',
    tag: 'Growth',
  },
]

function PillarCard({ pillar, index, isActive, onClick }: {
  pillar: typeof pillars[0]
  index: number
  isActive: boolean
  onClick: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-80, 80], [4, -4]), { stiffness: 200, damping: 30 })
  const ry = useSpring(useTransform(mx, [-80, 80], [-4, 4]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isActive || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: rx, rotateY: ry, perspective: 800 }}
      className={`relative rounded-2xl border cursor-pointer overflow-hidden transition-colors duration-300 p-5 sm:p-7 ${
        isActive
          ? 'bg-[#111318] border-[#111318] shadow-[0_16px_56px_rgba(17,19,24,0.26)]'
          : 'bg-white border-black/[0.08] hover:border-black/20 hover:shadow-[0_4px_24px_rgba(17,19,24,0.08)]'
      }`}
    >
      {/* Hover glow patch */}
      {!isActive && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(120px circle at 50% 0%, ${pillar.accent}10, transparent)` }}
        />
      )}

      {/* Active accent bar */}
      {isActive && (
        <motion.div
          layoutId={`bar-${index}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{ background: pillar.accent }}
        />
      )}

      {/* Tag */}
      <div className={`text-[0.6rem] font-mono tracking-[0.14em] mb-4 transition-colors duration-200 ${isActive ? 'text-white/30' : 'text-[#6b6b78]'}`}>
        {pillar.tag.toUpperCase()}
      </div>

      {/* Icon */}
      <motion.div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
        style={{
          background: isActive ? `${pillar.accent}20` : '#F7F6F3',
          color: isActive ? pillar.accent : '#9ca3af',
        }}
        animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <pillar.Icon />
      </motion.div>

      <h3 className={`text-[0.9375rem] font-semibold mb-2 leading-snug transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#111318]'}`}>
        {pillar.title}
      </h3>
      <p className={`text-[0.8125rem] leading-relaxed transition-colors duration-200 ${isActive ? 'text-white/45' : 'text-[#5a5a65]'}`}>
        {pillar.summary}
      </p>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5 pt-5 border-t border-white/[0.07]">
              <p className="text-[0.8125rem] text-white/55 leading-relaxed">{pillar.detail}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand indicator */}
      <motion.div
        className={`mt-5 flex items-center gap-1.5 text-[0.65rem] font-mono tracking-[0.08em] transition-colors duration-200 ${isActive ? 'text-white/20' : 'text-black/20'}`}
        animate={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.span
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          ↓
        </motion.span>
        {isActive ? 'COLLAPSE' : 'EXPAND'}
      </motion.div>
    </motion.div>
  )
}

export default function Intelligence() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section className="py-14 sm:py-36 bg-[#FAFAF8] border-t border-black/[0.05]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-16 text-center"
        >
          <div className="text-[0.68rem] font-mono text-[#6b6b78] uppercase tracking-[0.14em] mb-4">Under the Hood</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-[#111318] leading-[1.02] tracking-tight">
            The Intelligence
          </h2>
          <p className="text-[#5a5a65] text-base mt-4 max-w-lg mx-auto font-[350] leading-[1.7]">
            Six interlocking systems that compound into something no single model can replicate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {pillars.map((p, i) => (
            <PillarCard
              key={p.title}
              pillar={p}
              index={i}
              isActive={activeCard === i}
              onClick={() => setActiveCard(activeCard === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {pillars.map((p) => (
            <div key={p.tag} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.accent }} />
              <span className="text-[0.68rem] text-[#6b6b78] font-mono">{p.tag}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
