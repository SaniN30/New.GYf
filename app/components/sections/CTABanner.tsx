'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CTABanner() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section id="cta" className="py-32 bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white leading-[0.95] tracking-tight mb-6">
            Be dressed by<br />intelligence.
          </h2>
          <p className="text-white/40 text-lg mb-10">Join thousands building their AI wardrobe.</p>
          {!done ? (
            <form onSubmit={e => { e.preventDefault(); if (email) setDone(true) }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.08] border border-white/15 text-white placeholder-white/25 outline-none focus:border-white/30 transition-colors text-sm" />
              <button type="submit"
                className="px-7 py-3.5 rounded-full bg-white text-[#0A0A0A] font-bold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap">
                Get Early Access
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              className="px-8 py-4 rounded-2xl bg-white/[0.08] border border-white/15 text-white/70 text-sm font-mono">
              ✓ You&apos;re on the list.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
