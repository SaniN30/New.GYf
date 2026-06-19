'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CTABanner() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="cta" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-gray-400/10 blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black text-gray-900 leading-tight mb-6">
            Be dressed by <span className="shimmer-text">intelligence.</span>
          </h2>
          <p className="text-gray-700 text-lg mb-10">Join thousands building their AI wardrobe.</p>
          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true) }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="flex-1 px-5 py-4 rounded-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-600 outline-none focus:border-gray-400 transition-colors" />
              <button type="submit"
                className="px-8 py-4 rounded-full font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 whitespace-nowrap hover:scale-105">
                Get Early Access →
              </button>
            </form>
          ) : (
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.4}}
              className="px-8 py-5 rounded-2xl bg-gray-100 border border-gray-200 text-gray-700 font-mono">
              ✓ You&apos;re on the list. We&apos;ll be in touch.
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
