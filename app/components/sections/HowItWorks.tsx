'use client'
import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Upload your photo or describe yourself', body: 'GYF reads your body type, skin tone, and style signals to build your personal profile instantly.' },
  { num: '02', title: 'GYF builds your complete outfit', body: 'A coordinated look — top, bottom, footwear — chosen for your body and taste, with a clear explanation.' },
  { num: '03', title: 'It learns and improves with you', body: 'Every save, skip, and reaction trains your personal taste model. It gets sharper the more you use it.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-20">
          <div className="text-xs font-mono font-medium text-[#7C3AED] uppercase tracking-widest mb-3">Process</div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#0F0A1E] leading-tight">How GYF Works</h2>
        </motion.div>
        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div key={step.num}
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group flex gap-10 py-10 border-t border-gray-100 hover:border-purple-200 transition-colors cursor-default">
              <div className="text-[clamp(2.5rem,5vw,4rem)] font-black font-mono text-purple-200 group-hover:text-purple-300 transition-colors leading-none flex-shrink-0 w-20 pt-1">
                {step.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F0A1E] mb-3 group-hover:text-[#7C3AED] transition-colors">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-lg">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
