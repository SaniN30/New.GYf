'use client'
import { motion } from 'framer-motion'

const features = [
  { icon: '👁️', title: 'Sees', body: 'Understands clothing visually — vibe, color harmony, silhouette. Not just tags.' },
  { icon: '🧠', title: 'Learns', body: 'Builds a model of your personal taste from every interaction, not just onboarding.' },
  { icon: '✦', title: 'Builds', body: 'Delivers complete outfits — top, bottom, footwear — coordinated as one look with a clear reason.' },
]

export default function WhatWeDo() {
  return (
    <section className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          className="mb-16 text-center">
          <div className="text-xs font-mono text-violet-600 uppercase tracking-widest mb-4">Core</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>What GYF Does</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.12}}
              className="gradient-border-card rounded-2xl bg-white border border-gray-100 p-8 hover:bg-gray-50 shadow-sm transition-colors duration-300 group">
              <div className="text-3xl mb-5">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors">{f.title}</h3>
              <p className="text-gray-700 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
