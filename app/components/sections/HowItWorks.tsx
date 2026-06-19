'use client'
import { motion } from 'framer-motion'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#F9FAFB] border-t border-[#F3F4F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-10 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9CA3AF] mb-3">Process</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-[#0A0A0A] tracking-[-0.02em]">How GYF Works</h2>
        </motion.div>
        {[
          { num: '01', title: 'Upload a photo or describe yourself', body: 'GYF reads your body type, skin tone, and style signals to build your personal profile.' },
          { num: '02', title: 'GYF builds your complete outfit', body: 'A coordinated look — top, bottom, footwear — chosen for your body, with a reason for each piece.' },
          { num: '03', title: 'It learns and improves with you', body: 'Every save, skip, and reaction trains your taste model. Gets sharper the more you use it.' },
        ].map((s,i) => (
          <motion.div key={s.num} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.1}}
            className="group flex gap-6 sm:gap-10 py-7 sm:py-10 border-t border-[#E5E7EB] cursor-default">
            <div className="text-[clamp(2.5rem,5vw,4.5rem)] font-black font-mono text-[#F3F4F6] group-hover:text-[#E5E7EB] transition-colors leading-none flex-shrink-0 w-14 sm:w-20 select-none">{s.num}</div>
            <div className="pt-1">
              <h3 className="text-lg font-bold text-[#0A0A0A] mb-2 tracking-tight">{s.title}</h3>
              <p className="text-[#6B7280] leading-relaxed text-sm">{s.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
