'use client'
import { motion } from 'framer-motion'

export default function StylistFeature() {
  return (
    <section id="stylist" className="bg-[#0A0A0A] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
          className="mb-10 sm:mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 mb-4">The Stylist</p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white tracking-[-0.02em] leading-[1.05]">
            Complete outfits.<br />Built for you.<br />
            <span className="text-white/20">In seconds.</span>
          </h2>
        </motion.div>

        {/* 2x2 solid color cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { bg: 'bg-violet-600', title: 'Visual Intelligence', body: 'Reads vibe, color harmony, and silhouette — the way a real stylist sees clothing, not just category tags.' },
            { bg: 'bg-fuchsia-600', title: 'Personal Taste Engine', body: 'Learns from every like, skip, and save. Builds a model of your taste that gets sharper over time.' },
            { bg: 'bg-purple-700', title: 'Complete Outfits', body: 'Never just one piece. Always a coordinated top, bottom, and footwear — built as one look.' },
            { bg: 'bg-pink-600', title: 'Stylist Reasoning', body: 'Every recommendation explained. You know exactly why it works for your body and your palette.' },
          ].map((card,i) => (
            <motion.div key={card.title}
              initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.08}}
              className={`${card.bg} rounded-3xl p-6 sm:p-8 hover:brightness-110 transition-all cursor-default`}>
              <h3 className="text-xl font-black text-white mb-3 tracking-tight">{card.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
