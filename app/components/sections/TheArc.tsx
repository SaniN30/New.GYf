'use client'
import { motion } from 'framer-motion'

export default function TheArc() {
  return (
    <section className="py-16 sm:py-24 bg-[#F9FAFB] border-t border-[#F3F4F6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-3">Roadmap</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-[#0A0A0A] tracking-[-0.02em]">The Arc</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-4 w-px bg-gradient-to-b from-[#0A0A0A] via-[#E5E7EB] to-transparent" />
          {[
            { num:'01', title:'The Intelligent Stylist', desc:'Complete AI outfit recommendations.', active:true },
            { num:'02', title:'The Perception Layer', desc:'Upload a photo. GYF builds around your body.', active:false },
            { num:'03', title:'The Shopping Companion', desc:'Buy what GYF recommends — curated, size-matched.', active:false },
            { num:'04', title:'The Ambient Stylist', desc:'GYF dresses you for your calendar and weather.', active:false },
            { num:'05', title:'Style as Infrastructure', desc:'Your taste model, everywhere.', active:false },
          ].map((p,i) => (
            <motion.div key={p.num} initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08}}
              className="group flex gap-8 pb-10 pl-10 relative cursor-default">
              <div className={`absolute left-[3px] top-1.5 w-[9px] h-[9px] rounded-full border-2 transition-all ${p.active?'border-[#0A0A0A] bg-[#0A0A0A]':'border-[#D1D5DB] bg-white group-hover:border-[#9CA3AF]'}`} />
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="text-xs font-mono text-[#D1D5DB]">{p.num}</span>
                  <h3 className={`font-bold text-sm ${p.active?'text-[#0A0A0A]':'text-[#9CA3AF]'}`}>{p.title}</h3>
                  {p.active && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#0A0A0A] text-white">LIVE</span>}
                </div>
                <p className={`text-sm ${p.active?'text-[#6B7280]':'text-[#D1D5DB]'}`}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
