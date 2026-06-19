'use client'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs font-mono font-semibold text-[#6B7280] uppercase tracking-widest mb-6">About</div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-[#0A0A0A] tracking-tight leading-tight mb-8">Why We Built This</h2>
          <p className="text-[#3D3D3D] text-lg leading-relaxed mb-4">We built GYF because the daily friction of getting dressed shouldn&apos;t require expertise most people don&apos;t have time to develop.</p>
          <p className="text-[#6B7280] leading-relaxed">Style is learnable. The rules are knowable. The combinations are computable. We built the learner — so you don&apos;t have to be one.</p>
        </motion.div>
      </div>
    </section>
  )
}
