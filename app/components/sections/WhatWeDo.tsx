'use client'
import { motion } from 'framer-motion'

const features = [
  { icon: '👁️', title: 'Sees', body: 'Understands vibe, color harmony, silhouette — not just tags.' },
  { icon: '🧠', title: 'Learns', body: 'Builds your personal taste model from every interaction.' },
  { icon: '✦', title: 'Builds', body: 'Delivers full looks — top, bottom, footwear — with reasoning.' },
]

export default function WhatWeDo() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-14">
          <div className="text-xs font-mono font-semibold text-[#6B7280] uppercase tracking-widest mb-3">How It Works</div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-[#0A0A0A] tracking-tight">Sees. Learns. Builds.</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl border border-gray-100 bg-[#F9FAFB] p-8 hover:border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 cursor-default">
              <div className="text-3xl mb-5">{f.icon}</div>
              <h3 className="text-xl font-black text-[#0A0A0A] mb-3 tracking-tight">{f.title}</h3>
              <p className="text-[#6B7280] leading-relaxed text-sm">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
