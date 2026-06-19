'use client'
import { motion } from 'framer-motion'

const phases = [
  { num: '01', title: 'The Intelligent Stylist', desc: 'Complete outfit recommendations powered by AI taste modeling.', active: true },
  { num: '02', title: 'The Perception Layer', desc: 'Upload your photo. GYF sees your body and builds around it.', active: false },
  { num: '03', title: 'The Shopping Companion', desc: 'Buy what GYF recommends — curated, filtered, size-matched.', active: false },
  { num: '04', title: 'The Ambient Stylist', desc: 'GYF knows your calendar, weather, and mood — and dresses you accordingly.', active: false },
  { num: '05', title: 'Style as Infrastructure', desc: 'Your taste model travels everywhere. GYF as a platform.', active: false },
]

export default function TheArc() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          className="mb-16">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Roadmap</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 leading-tight">The Arc</h2>
        </motion.div>
        <div className="relative">
          {/* SVG animated vertical line */}
          <svg className="absolute left-[22px] top-0 h-full w-px overflow-visible" viewBox="0 0 1 100" preserveAspectRatio="none">
            <motion.line
              x1="0" y1="0" x2="0" y2="100"
              stroke="url(#arcGrad)"
              strokeWidth="40"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="arcGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#1A1A1A" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#1A1A1A" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gray-900/40 via-gray-400/20 to-transparent" />
          <div className="space-y-0">
            {phases.map((phase, i) => (
              <motion.div key={phase.num} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.1}}
                className="flex gap-8 pb-12 pl-16 relative">
                {/* dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 300 }}
                  className={`absolute left-[18px] top-1 w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${
                    phase.active
                      ? 'border-gray-900 bg-gray-900'
                      : 'border-gray-300 bg-white'
                  } ${phase.active ? 'ring-4 ring-gray-900/10' : ''}`}
                />
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-gray-400">{phase.num}</span>
                    <h3 className={`font-bold ${phase.active ? 'text-gray-900' : 'text-gray-500'}`}>{phase.title}</h3>
                    {phase.active && (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gray-900 text-white border border-gray-800"
                      >
                        LIVE
                      </motion.span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-500">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
