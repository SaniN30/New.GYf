'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative bg-white pt-16 sm:pt-24 pb-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(124,58,237,0.05),transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">

        {/* Badge */}
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5E7EB] text-xs text-[#6B7280] font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          AI Personal Stylist — Early Access Open
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.05}}
          className="text-[clamp(2.5rem,7vw,6.5rem)] font-black tracking-[-0.03em] leading-[1.0] text-[#0A0A0A] mb-5 max-w-4xl mx-auto">
          #1 AI Stylist<br />
          <span className="shimmer-text">Built for Your Body</span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.12}}
          className="text-base sm:text-lg text-[#6B7280] max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          GYF reads your body, learns your taste, and builds complete outfits in real time. No stylist. No guesswork.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.2}}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 sm:mb-14">
          <a href="#perception" className="px-6 py-3 rounded-full bg-[#0A0A0A] text-white font-semibold text-sm hover:bg-[#262626] transition-colors shadow-sm">
            Try Perception Layer
          </a>
          <a href="#stylist" className="px-6 py-3 rounded-full border border-[#E5E7EB] text-[#0A0A0A] font-semibold text-sm hover:border-[#D1D5DB] hover:bg-[#F9FAFB] transition-all">
            See How It Works
          </a>
        </motion.div>

        {/* Product Mockup — dark card like Cluely */}
        <motion.div initial={{opacity:0,y:48}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.3}}
          className="float-anim relative mx-auto max-w-3xl">
          <div className="absolute -inset-1 bg-gradient-to-b from-[#7C3AED]/10 via-transparent to-transparent rounded-[28px] blur-xl pointer-events-none" />
          <div className="relative rounded-[24px] bg-[#0C0C0C] shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden border border-white/[0.06]">

            {/* macOS chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 bg-[#161616] border-b border-white/[0.06]">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-4 text-[11px] text-white/30 font-mono tracking-wide">GYF Stylist</span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[11px] text-white/30 font-mono">Live</span>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              {/* Profile strip */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">S</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-white leading-tight">Sanidhya</p>
                  <p className="text-[10px] sm:text-[11px] text-white/40 font-mono mt-0.5 truncate">Inverted Triangle · Warm Medium · Classic</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 border border-white/10 rounded-full px-2.5 py-1 flex-shrink-0">
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                  <span className="text-[10px] text-white/30 font-mono">taste model active</span>
                </div>
              </div>

              {/* Outfit grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {[
                  { bg: 'from-blue-950 to-blue-900', label: 'Navy Oxford Shirt', tag: 'Top', dot: 'bg-blue-400' },
                  { bg: 'from-stone-900 to-stone-800', label: 'Slim Fit Chino', tag: 'Bottom', dot: 'bg-stone-400' },
                  { bg: 'from-zinc-900 to-zinc-800', label: 'White Leather Low', tag: 'Footwear', dot: 'bg-zinc-300' },
                ].map(item => (
                  <div key={item.tag} className={`rounded-2xl bg-gradient-to-b ${item.bg} border border-white/[0.08] p-2.5 sm:p-4 hover:border-white/20 transition-colors cursor-pointer group`}>
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                      <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                      <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider">{item.tag}</span>
                    </div>
                    <p className="text-[12px] font-semibold text-white/90 leading-snug">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* AI response */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-3 sm:p-4">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[9px] font-bold">G</span>
                  </div>
                  <span className="text-[12px] font-semibold text-white/80">GYF Stylist</span>
                  <div className="ml-auto flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-[10px] font-mono">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-[10px] font-mono">↵</kbd>
                  </div>
                </div>
                <p className="text-[12px] text-white/50 leading-relaxed">
                  &ldquo;Structured shoulders balance your build. Navy anchors the palette — Camel or White accessories complete the look.&rdquo;
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-[11px] text-white/50 transition-colors">Save look</button>
                  <button className="px-3 py-1.5 rounded-full bg-white text-[11px] text-[#0A0A0A] font-semibold hover:bg-white/90 transition-colors">Next outfit →</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fade to next section */}
      <div className="h-20 bg-gradient-to-b from-transparent to-[#F9FAFB]" />
    </section>
  )
}
