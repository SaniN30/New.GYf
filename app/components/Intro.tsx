'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

const words = ['Style.', 'Fit.', 'Identity.', 'Confidence.', 'You.']

/* floating particle */
function Particle({ delay, angle, distance }: { delay: number; angle: number; distance: number }) {
  const x = Math.cos(angle) * distance
  const y = Math.sin(angle) * distance
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-black/20"
      style={{ left: '50%', top: '50%' }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.7, 0],
        x: [0, x * 0.4, x],
        y: [0, y * 0.4, y],
        scale: [0, 1.5, 0],
      }}
      transition={{ delay, duration: 1.2, ease: 'easeOut' }}
    />
  )
}

/* letter-by-letter reveal */
function LetterReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.045,
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Intro() {
  const [visible, setVisible] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'cycling' | 'logo'>('cycling')
  const [particlesActive, setParticlesActive] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)

  // mouse parallax for logo phase
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 })
  const logoX = useTransform(springX, v => v * 0.06)
  const logoY = useTransform(springY, v => v * 0.06)
  const glowX = useTransform(springX, [-300, 300], ['-10%', '10%'])
  const glowY = useTransform(springY, [-300, 300], ['-10%', '10%'])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => {
        const next = i + 1
        if (next >= words.length) {
          clearInterval(interval)
          setTimeout(() => setPhase('logo'), 100)
          return i
        }
        return next
      })
    }, 650)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (phase === 'logo') {
      // burst particles shortly after logo appears
      setTimeout(() => setParticlesActive(true), 400)
      const t = setTimeout(() => setVisible(false), 2400)
      return () => clearTimeout(t)
    }
  }, [phase])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (phase !== 'logo') return
    mouseX.set(e.clientX - window.innerWidth / 2)
    mouseY.set(e.clientY - window.innerHeight / 2)
  }

  // generate particles at varied angles
  const particles = Array.from({ length: 14 }, (_, i) => ({
    angle: (i / 14) * Math.PI * 2,
    distance: 100 + Math.random() * 80,
    delay: 0.1 + Math.random() * 0.25,
  }))

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* ambient background blob — pulses on logo phase */}
          <AnimatePresence>
            {phase === 'logo' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: [0.6, 1.1, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute pointer-events-none"
                style={{
                  x: glowX,
                  y: glowY,
                  width: 600,
                  height: 600,
                  background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(236,72,153,0.04) 50%, transparent 75%)',
                  borderRadius: '50%',
                }}
              />
            )}
          </AnimatePresence>

          {/* ring pulse on logo appear */}
          <AnimatePresence>
            {phase === 'logo' && (
              <>
                {[0, 0.25, 0.5].map((delay, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-black/[0.06] pointer-events-none"
                    initial={{ width: 180, height: 180, opacity: 0.8 }}
                    animate={{ width: 500 + i * 60, height: 500 + i * 60, opacity: 0 }}
                    transition={{ delay, duration: 1.5, ease: 'easeOut' }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* ── Word cycling phase ── */}
          <AnimatePresence mode="wait">
            {phase === 'cycling' && (
              <motion.div
                key="cycling"
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.35 }}
                className="text-center select-none"
              >
                <div className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em] mb-6">
                  AI is learning your
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={wordIndex}
                    initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(4rem,12vw,9rem)] font-black tracking-tight text-gray-900 leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {words[wordIndex]}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── Logo reveal phase ── */}
            {phase === 'logo' && (
              <motion.div
                key="logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-5 relative"
              >
                {/* particle burst */}
                {particlesActive && particles.map((p, i) => (
                  <Particle key={i} delay={p.delay} angle={p.angle} distance={p.distance} />
                ))}

                {/* logo with parallax + breathe */}
                <motion.div
                  ref={logoRef}
                  style={{ x: logoX, y: logoY }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* glow ring behind logo */}
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                        filter: 'blur(24px)',
                      }}
                      animate={{ scale: [0.8, 1.1, 0.9, 1.05, 1] }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    />

                    <motion.div
                      animate={{ scale: [1, 1.025, 1, 1.015, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Image
                        src="/assets/logo-new.png"
                        alt="GYF"
                        width={400}
                        height={400}
                        className="drop-shadow-[0_8px_40px_rgba(0,0,0,0.12)]"
                        style={{ width: '40vw', height: 'auto', minWidth: 220, maxWidth: 480 }}
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* "GET YOUR FIT" — letter-by-letter */}
                <div className="text-center">
                  <div
                    className="text-2xl font-black tracking-tight text-gray-900 overflow-hidden"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    <LetterReveal text="GET YOUR FIT" delay={0.35} />
                  </div>

                  {/* tagline fades in after letters */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + 'GET YOUR FIT'.length * 0.045 + 0.1, duration: 0.4 }}
                    className="text-xs text-gray-400 font-mono mt-1 tracking-[0.25em] uppercase"
                  >
                    AI Personal Stylist
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* progress dots */}
          <div className="absolute bottom-12 flex gap-2">
            {words.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full bg-gray-900"
                animate={{
                  width: phase === 'logo' ? (i < words.length ? 6 : 6) : (i === wordIndex ? 20 : 6),
                  opacity: phase === 'logo' ? 1 : (i <= wordIndex ? 1 : 0.2),
                  scaleY: phase === 'logo' ? 1 : 1,
                }}
                transition={{ duration: 0.25 }}
                style={{ height: 6 }}
              />
            ))}

            {/* final "loaded" state: all dots collapse to one then fade */}
            <AnimatePresence>
              {phase === 'logo' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center gap-1"
                >
                  {[0, 1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      className="rounded-full bg-gray-900"
                      initial={{ width: 6, opacity: i <= wordIndex ? 1 : 0.2 }}
                      animate={{ width: 6, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      style={{ height: 6 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
