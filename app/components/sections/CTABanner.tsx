'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CTABanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="cta" className="py-32 relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#EC4899]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-pink-300/10 blur-[80px]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white leading-tight mb-6">
            Be dressed by intelligence.
          </h2>
          <p className="text-purple-100 text-lg mb-10 font-medium">Join thousands building their AI wardrobe.</p>
          {!submitted ? (
            <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true) }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="flex-1 px-6 py-4 rounded-full bg-white/15 border border-white/30 text-white placeholder-purple-200 outline-none focus:bg-white/20 focus:border-white/50 transition-all font-medium" />
              <button type="submit"
                className="px-8 py-4 rounded-full font-bold text-[#7C3AED] bg-white hover:bg-purple-50 transition-all duration-300 whitespace-nowrap hover:scale-105 shadow-lg">
                Get Access →
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="px-8 py-5 rounded-2xl bg-white/20 border border-white/30 text-white font-semibold backdrop-blur-sm">
              ✓ You&apos;re on the list. We&apos;ll be in touch soon.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
