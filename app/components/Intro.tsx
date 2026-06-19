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
    // Cycle through words every 380ms
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
      const t = setTimeout(() => setVisible(false), 1600)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          {/* Word cycling phase */}
          <AnimatePresence mode="wait">
            {phase === 'cycling' && (
              <motion.div
                key="cycling"
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
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

            {/* Logo reveal phase */}
            {phase === 'logo' && (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-5"
              >
                <Image
                  src="/assets/logo-new.png"
                  alt="GYF"
                  width={400}
                  height={400}
                  className="drop-shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
                  style={{ width: '40vw', height: 'auto', minWidth: 220, maxWidth: 480 }}
                  priority
                />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-2xl font-black tracking-tight text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                    GET YOUR FIT
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-1 tracking-[0.25em] uppercase">
                    AI Personal Stylist
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom progress dots */}
          <div className="absolute bottom-12 flex gap-2">
            {words.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full bg-gray-900"
                animate={{
                  width: i === wordIndex ? 20 : 6,
                  opacity: i <= wordIndex ? 1 : 0.2,
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
