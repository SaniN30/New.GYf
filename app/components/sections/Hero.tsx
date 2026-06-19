'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Subtle purple bg blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-100/60 blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-pink-100/60 blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-36 pb-16">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8">
          <div className="relative w-[80px] h-[80px]">
            <Image src="/assets/logo-new.png" alt="GYF" fill className="object-contain" priority />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-[#7C3AED] text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
          AI Personal Stylist — Now in Early Access
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.92] tracking-tight text-[#0F0A1E] mb-6">
          Your Style.<br />
          <span className="shimmer-text">Finally Intelligent.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-[clamp(1rem,2vw,1.25rem)] text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          GYF reads your body, learns your taste, and builds complete outfits in seconds — no stylist, no guesswork, no effort.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="#perception"
            className="group px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-90 transition-all duration-300 shadow-xl shadow-purple-200 hover:shadow-purple-300 hover:scale-105 text-base">
            Try Perception Layer →
          </a>
          <a href="#how-it-works"
            className="px-8 py-4 rounded-full font-semibold text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:text-[#7C3AED] transition-all duration-300 text-base bg-white">
            See How It Works
          </a>
        </motion.div>

        {/* Floating product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="float-anim relative mx-auto max-w-xl">
          <div className="rounded-3xl bg-white border border-gray-200 shadow-2xl shadow-purple-100/50 overflow-hidden purple-glow">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 bg-gray-50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-gray-400 font-mono">GYF Stylist — Your Daily Look</span>
            </div>
            <div className="p-6">
              {/* Outfit cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { emoji: '👕', label: 'Navy Oxford', sub: 'Top' },
                  { emoji: '👖', label: 'Slim Chino', sub: 'Bottom' },
                  { emoji: '👟', label: 'White Leather', sub: 'Footwear' },
                ].map((item) => (
                  <div key={item.sub} className="rounded-2xl bg-purple-50 border border-purple-100 p-3 text-center card-hover cursor-pointer group">
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="text-xs font-semibold text-gray-800">{item.label}</div>
                    <div className="text-[10px] text-purple-500 mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>
              {/* AI reasoning */}
              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center text-white text-[10px] font-bold">G</div>
                  <span className="text-xs font-semibold text-gray-700">GYF Stylist</span>
                  <span className="ml-auto text-[10px] text-purple-400 bg-purple-100 px-2 py-0.5 rounded-full">Matched for you</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">&quot;Structured silhouette for your build. Navy + white is your strongest palette. Clean, confident, effortless.&quot;</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <div className="relative z-10 w-full border-t border-gray-100 bg-white/80 backdrop-blur-sm py-8">
        <div className="max-w-3xl mx-auto px-6 grid grid-cols-3 gap-6">
          {[
            { num: '<400ms', label: 'Response Time' },
            { num: '98%', label: 'Fit Accuracy' },
            { num: '10K+', label: 'Looks Built' },
          ].map(stat => (
            <div key={stat.label} className="text-center group cursor-default">
              <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-black gradient-text">{stat.num}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
