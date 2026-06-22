'use client'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'

const tags = ['Body Type Analysis', 'Outfit Matching', 'Color Palette', 'Style Learning', 'Fit Intelligence', 'Taste Engine']

const STYLE_ACCENTS = ['#C4956A', '#C2185B', '#5B7339', '#7B8FBF', '#D98E04', '#2D7A8A']

function InteractiveChar({ char, delay }: { char: string; delay: number }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [accentIdx, setAccentIdx] = useState(0)

  const handleClick = useCallback(() => {
    setClicked(true)
    setAccentIdx(i => (i + 1) % STYLE_ACCENTS.length)
    setTimeout(() => setClicked(false), 300)
  }, [])

  return (
    <motion.span
      className="inline-block cursor-pointer select-none relative"
      initial={{ opacity: 0, y: 48, rotateX: -50, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleClick}
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 600, damping: 18 } }}
      whileTap={{ scale: 0.88, transition: { type: 'spring', stiffness: 800, damping: 20 } }}
      style={{
        color: hovered || clicked ? STYLE_ACCENTS[accentIdx] : undefined,
        transition: 'color 0.18s ease',
        textShadow: hovered ? `0 8px 24px ${STYLE_ACCENTS[accentIdx]}44` : undefined,
      }}
    >
      {char}
      {clicked && (
        <motion.span
          className="absolute inset-0 rounded-sm pointer-events-none"
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ background: `radial-gradient(circle, ${STYLE_ACCENTS[accentIdx]}33, transparent 70%)` }}
        />
      )}
    </motion.span>
  )
}

const CLOTHING_SVGS = {
  top: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#5a5a65]">
      <path d="M14 6 L6 14 L12 18 L12 42 L36 42 L36 18 L42 14 L34 6 C34 6 30 10 24 10 C18 10 14 6 14 6Z" />
    </svg>
  ),
  bottom: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#5a5a65]">
      <path d="M8 8 L40 8 L36 42 L28 42 L24 24 L20 42 L12 42 Z" />
    </svg>
  ),
  footwear: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#5a5a65]">
      <path d="M6 30 C6 30 10 20 20 18 L32 18 L42 24 L42 30 C42 34 38 36 34 36 L8 36 C6.9 36 6 35.1 6 34 Z" />
      <path d="M20 18 L20 14 C20 12.9 20.9 12 22 12 L28 12" />
    </svg>
  ),
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -70])

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spotX = useSpring(rawX, { stiffness: 60, damping: 20 })
  const spotY = useSpring(rawY, { stiffness: 60, damping: 20 })

  const [badgeHovered, setBadgeHovered] = useState(false)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [rawX, rawY])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Smooth cursor spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([x, y]) => `radial-gradient(700px circle at ${x}px ${y}px, rgba(17,19,24,0.025), transparent 55%)`
          ),
        }}
      />

      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(#111318 1px, transparent 1px), linear-gradient(90deg, #111318 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      <motion.div style={{ y }} className="relative z-10 text-center max-w-5xl mx-auto px-5 sm:px-8 pt-28 sm:pt-48 pb-12 sm:pb-24">

        {/* ── Premium Early Access badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mb-10"
        >
          <motion.a
            href="#cta"
            onHoverStart={() => setBadgeHovered(true)}
            onHoverEnd={() => setBadgeHovered(false)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full cursor-pointer overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(17,19,24,0.04) 0%, rgba(17,19,24,0.02) 100%)',
              border: '1px solid rgba(17,19,24,0.1)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.8) inset, 0 2px 8px rgba(17,19,24,0.06)',
            }}
          >
            {/* Shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={badgeHovered ? { x: ['−100%', '100%'] } : { x: '-100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', width: '60%' }}
            />

            {/* Live pulse dot */}
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            <span className="text-[0.75rem] font-semibold tracking-wide text-[#111318]/80 whitespace-nowrap">
              AI Personal Stylist
            </span>

            <span className="h-3.5 w-px bg-black/10" />

            <motion.span
              animate={badgeHovered ? { x: 3 } : { x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[0.75rem] font-medium text-[#5a5a65] whitespace-nowrap"
            >
              Early Access →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Headline */}
        <div className="text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.88] tracking-[-0.04em] text-[#111318] mb-3">
          {/* "Your Style." — each character is independently interactive */}
          <div className="flex justify-center gap-[0.18em] flex-wrap">
            {'Your'.split('').map((char, ci) => (
              <InteractiveChar key={`your-${ci}`} char={char} delay={ci * 0.035} />
            ))}
            <span className="inline-block w-[0.18em]" />
            {'Style.'.split('').map((char, ci) => (
              <InteractiveChar key={`style-${ci}`} char={char} delay={0.12 + ci * 0.035} />
            ))}
          </div>

          {/* "Finally Intelligent." — shimmer, no click interaction */}
          <div className="shimmer-text flex justify-center gap-[0.18em] flex-wrap">
            {['Finally', 'Intelligent.'].map((word, wi) => (
              <motion.span
                key={wi}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.38 + wi * 0.12 } },
                }}
              >
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 48, filter: 'blur(4px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >{char}</motion.span>
                ))}
                {wi === 0 && <span className="inline-block w-[0.18em]" />}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Tap hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-[0.65rem] font-mono text-[#9ca3af] tracking-[0.1em] uppercase mb-1 select-none"
        >
          tap the letters ↑
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(0.9375rem,2.5vw,1.2rem)] text-[#3d3d48] max-w-2xl mx-auto mb-10 leading-[1.7] mt-5 sm:mt-7 font-[350] px-2 sm:px-0"
        >
          GYF reads your body, learns your taste, and builds complete outfits in real time — no stylist, no guesswork.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10 sm:mb-14"
        >
          <a href="#perception" className="btn-3d w-full sm:w-auto px-8 py-4 font-semibold text-[0.9375rem] text-white bg-[#111318] hover:bg-[#1e2230] text-center">
            Try Perception Layer
          </a>
          <a href="/how-it-works" className="bezel w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-[0.9375rem] text-[#5a5a65] border border-black/10 hover:text-[#111318] transition-all duration-200 bg-white/60 text-center">
            See How It Works ↓
          </a>
        </motion.div>

        {/* Tag cloud */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sm:mb-20">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.05 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04, y: -1 }}
              className="px-4 py-1.5 rounded-full text-xs font-medium border border-black/[0.08] text-[#3d3d48] bg-white/70 backdrop-blur-sm cursor-default select-none"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Product mockup card — no emojis */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="float-anim relative mx-auto max-w-xl"
        >
          <div className="glass-card gradient-border-card p-6 glow-subtle">
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-2.5 text-[0.7rem] text-[#6b6b78] font-mono tracking-wide">GYF Stylist — outfit.03</span>
            </div>

            {/* Outfit grid */}
            <div className="grid grid-cols-3 gap-3">
              {(['top', 'bottom', 'footwear'] as const).map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="rounded-xl bg-white border border-black/[0.06] p-4 text-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#F7F6F3] border border-black/[0.05] mx-auto mb-2.5 flex items-center justify-center group-hover:bg-[#F0EFE9] transition-colors">
                    {CLOTHING_SVGS[item]}
                  </div>
                  <div className="text-[0.7rem] text-[#6b6b78] font-medium capitalize">{item}</div>
                  <div className="text-[0.7rem] text-[#111318] font-semibold font-mono mt-1">Matched ✓</div>
                </motion.div>
              ))}
            </div>

            {/* Stylist note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="mt-4 p-3.5 rounded-xl bg-[#F7F6F3] border border-black/[0.04]"
            >
              <p className="text-[0.75rem] text-[#5a5a65] font-mono leading-relaxed">
                &quot;Structured silhouette suits your inverted triangle build. Navy anchors the palette.&quot;
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-10 w-full border-t border-black/[0.06] py-8 bg-white/60 backdrop-blur-sm"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 grid grid-cols-3 gap-3 sm:gap-6">
          {[
            { num: 'Layer 01', label: 'Live in Beta', live: true },
            { num: '6',        label: 'Intelligence Layers', live: true },
            { num: 'Soon',     label: 'Outfit Generation', live: false },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className={`text-[clamp(1.1rem,2.5vw,2rem)] font-black font-mono tracking-tight ${stat.live ? 'gradient-text' : 'text-[#9ca3af]'}`}>{stat.num}</div>
              <div className="text-[0.65rem] text-[#6b6b78] mt-1 uppercase tracking-[0.12em] font-medium leading-snug">{stat.label}</div>
              {!stat.live && <div className="text-[0.55rem] font-mono text-[#C4956A] mt-0.5 uppercase tracking-wide">Coming Soon</div>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
