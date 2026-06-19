'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CTABanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="cta" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-[#13111F] to-pink-900/30" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-purple-600/15 blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-white leading-tight mb-6">
            Be dressed by <span className="shimmer-text">intelligence.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10">Join thousands building their AI wardrobe.</p>
          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true) }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-purple-500/50 transition-colors" />
              <button type="submit"
                className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 whitespace-nowrap hover:scale-105">
                Get Early Access →
              </button>
            </form>
          ) : (
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.4}}
              className="px-8 py-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono">
              ✓ You&apos;re on the list. We&apos;ll be in touch.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
