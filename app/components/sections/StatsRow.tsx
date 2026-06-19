'use client'
import { motion } from 'framer-motion'

const STATS = [
  { num: '<400ms', label: 'Response Time' },
  { num: '98%', label: 'Fit Accuracy' },
  { num: '10K+', label: 'Outfits Built' },
]

export default function StatsRow() {
  return (
    <section className="bg-[#F9FAFB] py-16 border-y border-gray-100">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
            <div className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#0A0A0A] tracking-tight leading-none mb-2">{s.num}</div>
            <div className="text-sm text-[#6B7280] font-medium uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
