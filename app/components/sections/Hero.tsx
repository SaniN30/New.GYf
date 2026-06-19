'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#08080C]">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-pink-600/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Badge */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          AI Personal Stylist — Early Access
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.1}}
          className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-tight text-white mb-6">
          Your Style.<br />
          <span className="shimmer-text">Finally Intelligent.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.3}}
          className="text-[clamp(1rem,2vw,1.25rem)] text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          GYF reads your body, learns your taste, and builds complete outfits in real time — no stylist, no guesswork.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.5}}
          className="flex flex-wrap items-center justify-center gap-4 mb-20">
          <a href="#perception" className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105">
            Get Early Access
          </a>
          <a href="#how-it-works" className="px-8 py-4 rounded-full font-semibold text-gray-300 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300">
            See How It Works ↓
          </a>
        </motion.div>

        {/* Floating product mockup */}
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1,delay:0.7}}
          className="float-anim relative mx-auto max-w-2xl">
          <div className="gradient-border-card rounded-2xl bg-[#0F0F18] p-6 glow-purple">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-gray-500 font-mono">GYF Stylist</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['Top', 'Bottom', 'Footwear'].map((item, i) => (
                <div key={item} className="rounded-xl bg-[#16162A] border border-white/5 p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 mx-auto mb-2 flex items-center justify-center text-2xl">
                    {['👕','👖','👟'][i]}
                  </div>
                  <div className="text-xs text-gray-400">{item}</div>
                  <div className="text-xs text-purple-400 mt-1">Matched ✓</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <p className="text-xs text-purple-300 font-mono">&quot;Structured silhouette suits your inverted triangle build. Navy anchors the palette.&quot;</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 w-full border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6">
          {[
            { num: '<400ms', label: 'Response Time' },
            { num: '98%', label: 'Fit Accuracy' },
            { num: '10K+', label: 'Outfits Built' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-black gradient-text font-mono">{stat.num}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
