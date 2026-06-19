'use client'
import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Upload a photo or describe yourself', body: 'GYF reads your body type, skin tone, and style signals instantly.' },
  { num: '02', title: 'GYF builds your outfit', body: 'A complete look — top, bottom, footwear — chosen for your body, with a reason for each piece.' },
  { num: '03', title: 'It learns with you', body: 'Every save, skip, and reaction trains your taste model. Gets sharper every time.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#F9FAFB] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <div className="text-xs font-mono font-semibold text-[#6B7280] uppercase tracking-widest mb-3">Process</div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-[#0A0A0A] tracking-tight">How GYF Works</h2>
        </motion.div>
        {steps.map((s, i) => (
          <motion.div key={s.num} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex gap-10 py-10 border-t border-gray-200 hover:border-gray-300 transition-colors cursor-default">
            <div className="text-[3.5rem] font-black font-mono text-gray-100 group-hover:text-gray-200 transition-colors leading-none flex-shrink-0 w-20">{s.num}</div>
            <div className="pt-1">
              <h3 className="text-xl font-bold text-[#0A0A0A] mb-2 tracking-tight">{s.title}</h3>
              <p className="text-[#6B7280] leading-relaxed">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
