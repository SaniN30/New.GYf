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
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-4">Roadmap</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 leading-tight">The Arc</h2>
        </motion.div>
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-purple-500/20 to-transparent" />
          <div className="space-y-0">
            {phases.map((phase, i) => (
              <motion.div key={phase.num} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.1}}
                className="flex gap-8 pb-12 pl-16 relative">
                {/* dot */}
                <div className={`absolute left-[18px] top-1 w-3 h-3 rounded-full border-2 ${phase.active ? 'border-purple-400 bg-purple-500' : 'border-gray-300 bg-transparent'}`} />
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-gray-700">{phase.num}</span>
                    <h3 className={`font-bold ${phase.active ? 'text-gray-900' : 'text-gray-700'}`}>{phase.title}</h3>
                    {phase.active && <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">LIVE</span>}
                  </div>
                  <p className={`text-sm leading-relaxed ${phase.active ? 'text-gray-700' : 'text-gray-700'}`}>{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
