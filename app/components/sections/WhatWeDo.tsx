'use client'
import { motion } from 'framer-motion'

const features = [
  { icon: '👁️', title: 'Sees', body: 'Understands clothing visually — vibe, color harmony, silhouette. Not just tags.' },
  { icon: '🧠', title: 'Learns', body: 'Builds a model of your personal taste from every interaction.' },
  { icon: '✦', title: 'Builds', body: "Delivers complete outfits — top, bottom, footwear — with a stylist's explanation." },
]

export default function WhatWeDo() {
  return (
    <section className="py-32 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <div className="text-xs font-mono font-medium text-[#7C3AED] uppercase tracking-widest mb-3">Core Capabilities</div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#0F0A1E] leading-tight">What GYF Does</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl bg-white border border-gray-200 p-8 card-hover cursor-default hover:border-purple-200">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-2xl mb-6 group-hover:bg-purple-100 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F0A1E] mb-3 group-hover:text-[#7C3AED] transition-colors">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
