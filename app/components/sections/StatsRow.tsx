'use client'
import { motion } from 'framer-motion'

export default function StatsRow() {
  return (
    <section className="bg-[#F9FAFB] border-y border-[#F3F4F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-3 gap-4 sm:gap-8 text-center">
        {[
          { num: '<400ms', label: 'Response Time' },
          { num: '98%', label: 'Fit Accuracy' },
          { num: '10K+', label: 'Outfits Built' },
        ].map((s,i) => (
          <motion.div key={s.label} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.08}}>
            <div className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#0A0A0A] tracking-tight leading-none mb-2">{s.num}</div>
            <div className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-[0.12em]">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
