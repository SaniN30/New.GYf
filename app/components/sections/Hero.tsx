'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-white pt-32 pb-0 overflow-hidden">
      {/* Very subtle background grain / gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Eyebrow badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-[#6B7280] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Now in Early Access
        </motion.div>

        {/* Main headline — Cluely scale */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[clamp(2.8rem,7vw,6rem)] font-black text-[#0A0A0A] leading-[1.0] tracking-[-0.03em] mb-6 max-w-4xl mx-auto">
          #1 AI Personal Stylist<br />
          <span className="shimmer-text">Built for Your Body</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="text-[clamp(1rem,2vw,1.2rem)] text-[#6B7280] max-w-xl mx-auto mb-10 leading-relaxed font-medium">
          GYF reads your body, learns your taste, and builds complete outfits in real time. No stylist. No guesswork.
        </motion.p>

        {/* CTAs — Cluely style: dark pill primary, outlined secondary */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <a href="#perception"
            className="px-7 py-3.5 rounded-full bg-[#0A0A0A] text-white font-semibold text-sm hover:bg-[#1F1F1F] transition-colors shadow-sm">
            Try Perception Layer
          </a>
          <a href="#stylist"
            className="px-7 py-3.5 rounded-full border border-gray-200 text-[#0A0A0A] font-semibold text-sm hover:border-gray-400 hover:bg-gray-50 transition-all">
            See the Stylist
          </a>
        </motion.div>

        {/* Product mockup — large, floating, Cluely-style */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="float-anim relative mx-auto max-w-3xl">
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-b from-purple-100/40 to-transparent rounded-3xl blur-2xl pointer-events-none" />
          <div className="relative rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden">
            {/* Chrome bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-[#161616]">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-4 text-xs text-white/40 font-mono">GYF Stylist — Active</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-white/30 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Live
              </span>
            </div>
            {/* App content */}
            <div className="p-6">
              {/* User profile strip */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                <div>
                  <div className="text-xs font-semibold text-white">Sanidhya</div>
                  <div className="text-[10px] text-white/40 font-mono">Inverted Triangle · Warm Medium · Classic</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-[10px] text-white/30 border border-white/10 rounded-full px-2.5 py-1">
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                  Taste model active
                </div>
              </div>
              {/* Outfit cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { emoji: '👕', name: 'Navy Oxford', tag: 'Top', color: 'from-blue-900/40 to-blue-800/20' },
                  { emoji: '👖', name: 'Slim Chino', tag: 'Bottom', color: 'from-amber-900/40 to-amber-800/20' },
                  { emoji: '👟', name: 'White Leather', tag: 'Footwear', color: 'from-gray-700/40 to-gray-600/20' },
                ].map(item => (
                  <div key={item.tag} className={`rounded-2xl bg-gradient-to-br ${item.color} border border-white/10 p-4 text-center group hover:border-purple-500/40 transition-colors cursor-pointer`}>
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="text-xs font-semibold text-white/90">{item.name}</div>
                    <div className="text-[10px] text-white/40 mt-0.5">{item.tag}</div>
                  </div>
                ))}
              </div>
              {/* AI response card */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[9px] font-bold text-white">G</div>
                  <span className="text-xs font-semibold text-white/80">GYF Stylist</span>
                  <div className="ml-auto flex items-center gap-1 text-[10px] text-white/30 font-mono">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-[10px]">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-[10px]">↵</kbd>
                  </div>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">&quot;Structured shoulders balance your build. Navy anchors the palette — Camel or White accessories will complete the look.&quot;</p>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-[10px] text-white/60 transition-colors">Save look</button>
                  <button className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-[10px] text-white font-medium">Next outfit →</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="h-24 bg-gradient-to-b from-transparent to-[#F9FAFB]" />
    </section>
  )
}
