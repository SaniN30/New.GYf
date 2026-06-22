'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const words = ['Style.', 'Fit.', 'Identity.', 'Confidence.', 'You.']

export default function Intro() {
  const [visible, setVisible] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'cycling' | 'logo'>('cycling')

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => {
        const next = i + 1
        if (next >= words.length) {
          clearInterval(interval)
          setTimeout(() => setPhase('logo'), 80)
          return i
        }
        return next
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (phase === 'logo') {
      const t = setTimeout(() => setVisible(false), 2200)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
        >

          {/* ── Word cycling phase ── */}
          <AnimatePresence mode="wait">
            {phase === 'cycling' && (
              <motion.div
                key="cycling"
                exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                transition={{ duration: 0.28 }}
                className="text-center select-none"
              >
                <div className="text-[0.65rem] font-mono text-gray-400 uppercase tracking-[0.35em] mb-5">
                  AI is learning your
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
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
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-0 relative"
              >
                {/* Logo — clean upward rise, no blur, no glow */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src="/assets/logo-new.png"
                    alt="GYF"
                    width={400}
                    height={400}
                    style={{ width: '38vw', height: 'auto', minWidth: 200, maxWidth: 420 }}
                    priority
                  />
                </motion.div>

                {/* Hairline rule — extends left to right after logo lands */}
                <motion.div
                  className="w-full h-px bg-gray-900 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.38, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ maxWidth: '38vw', minWidth: 200 }}
                />

                {/* Wordmark + tagline row */}
                <div className="flex items-baseline justify-between w-full mt-2.5"
                  style={{ maxWidth: '38vw', minWidth: 200 }}>
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.52, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[0.95rem] font-black tracking-tight text-gray-900 uppercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Get Your Fit
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[0.58rem] font-mono text-gray-400 tracking-[0.22em] uppercase"
                  >
                    AI Stylist
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress dots */}
          <div className="absolute bottom-10 flex gap-1.5">
            {words.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full bg-gray-900"
                animate={{
                  width: phase === 'logo' ? 6 : (i === wordIndex ? 18 : 6),
                  opacity: phase === 'logo' ? 1 : (i <= wordIndex ? 1 : 0.15),
                }}
                transition={{ duration: 0.2 }}
                style={{ height: 6 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
