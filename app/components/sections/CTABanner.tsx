'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CTABanner() {
  const [email, setEmail]       = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused]   = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const h = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [mouseX, mouseY])

  return (
    <section id="cta" className="py-24 sm:py-36 relative overflow-hidden bg-white">
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute w-[800px] h-[400px] rounded-full opacity-[0.06] blur-[120px]"
        style={{
          background: 'radial-gradient(ellipse, #C4956A 0%, transparent 70%)',
          left: useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1440], ['-10%', '60%']),
          top: '20%',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] bg-[#F7F6F3] text-[#6b6b78] text-[0.72rem] font-mono tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Accepting early members
          </div>

          <h2 className="text-[clamp(2.5rem,6.5vw,5rem)] font-black text-[#111318] leading-[0.95] tracking-tight mb-6">
            Be dressed by{' '}
            <span className="shimmer-text">intelligence.</span>
          </h2>

          <p className="text-[#3d3d48] text-lg mb-8 sm:mb-12 font-[350] leading-[1.7]">
            Join thousands building their AI wardrobe.
          </p>

          {!submitted ? (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true) }}
              className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
            >
              <div className={`flex-1 relative transition-all duration-200 ${focused ? 'ring-1 ring-black/20' : ''} rounded-full`}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-5 py-4 rounded-full bg-[#F7F6F3] border border-black/[0.08] text-[#111318] text-sm placeholder-[#c4c4c8] outline-none transition-all duration-200"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98, y: 1 }}
                className="btn-3d px-7 py-4 font-semibold text-[0.875rem] text-white bg-[#111318] hover:bg-[#1e2230] whitespace-nowrap"
              >
                Get Early Access →
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="px-8 py-5 rounded-2xl bg-[#F7F6F3] border border-black/[0.07] text-[#5a5a65] font-mono text-sm max-w-md mx-auto"
            >
              <span className="text-emerald-500 mr-2">✓</span>
              You&apos;re on the list. We&apos;ll be in touch.
            </motion.div>
          )}

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {['No spam', 'Cancel anytime', 'Free forever'].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-xs text-[#9ca3af] font-medium"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
