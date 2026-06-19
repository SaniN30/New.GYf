'use client'
import { motion } from 'framer-motion'

export default function WhatWeDo() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#F3F4F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-3">Capabilities</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-[#0A0A0A] tracking-[-0.02em]">Sees. Learns. Builds.</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { title: 'Sees', body: 'Understands clothing visually — vibe, color harmony, silhouette. Not just tags.' },
            { title: 'Learns', body: 'Builds a model of your personal taste from every interaction, not just onboarding.' },
            { title: 'Builds', body: 'Delivers complete outfits — top, bottom, footwear — with a clear stylist explanation.' },
          ].map((f,i) => (
            <motion.div key={f.title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.08}}
              className="rounded-3xl border border-[#F3F4F6] bg-[#F9FAFB] p-6 sm:p-8 hover:border-[#E5E7EB] hover:bg-white hover:shadow-sm transition-all duration-300 cursor-default">
              <h3 className="text-2xl font-black text-[#0A0A0A] mb-3 tracking-tight">{f.title}</h3>
              <p className="text-[#6B7280] leading-relaxed text-sm">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
