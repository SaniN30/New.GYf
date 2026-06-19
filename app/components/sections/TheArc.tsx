'use client'
import { motion } from 'framer-motion'

const phases = [
  { num: '01', title: 'The Intelligent Stylist', desc: 'Complete outfit recommendations powered by AI taste modeling.', active: true },
  { num: '02', title: 'The Perception Layer', desc: 'Upload your photo. GYF sees your body and builds around it.', active: false },
  { num: '03', title: 'The Shopping Companion', desc: 'Buy what GYF recommends — curated, filtered, size-matched.', active: false },
  { num: '04', title: 'The Ambient Stylist', desc: 'GYF knows your calendar and weather — and dresses you accordingly.', active: false },
  { num: '05', title: 'Style as Infrastructure', desc: 'Your taste model travels everywhere. GYF as a platform.', active: false },
]

export default function TheArc() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-16">
          <div className="text-xs font-mono font-medium text-[#7C3AED] uppercase tracking-widest mb-3">Roadmap</div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#0F0A1E] leading-tight">The Arc</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#7C3AED] via-purple-200 to-transparent" />
          <div className="space-y-0">
            {phases.map((phase, i) => (
              <motion.div key={phase.num}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex gap-8 pb-10 pl-16 relative cursor-default">
                <div className={`absolute left-[18px] top-1.5 w-3 h-3 rounded-full border-2 transition-all ${
                  phase.active ? 'border-[#7C3AED] bg-[#7C3AED]' : 'border-gray-300 bg-white group-hover:border-purple-300'
                }`} />
                <div>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-xs font-mono text-gray-300">{phase.num}</span>
                    <h3 className={`font-bold ${phase.active ? 'text-[#0F0A1E]' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>{phase.title}</h3>
                    {phase.active && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#7C3AED] border border-purple-200">LIVE</span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${phase.active ? 'text-gray-500' : 'text-gray-300'}`}>{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
