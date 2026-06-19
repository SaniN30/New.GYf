'use client'
import { motion } from 'framer-motion'

export default function Vision() {
  return (
    <section className="py-40 bg-[#08080C] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
          <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-8">Vision</div>
          <blockquote className="text-[clamp(1.75rem,4vw,3rem)] font-black text-white leading-tight mb-8">
            &ldquo;A personal stylist for everyone.<br />
            <span className="shimmer-text">Free. Instant. Genuinely yours.</span>&rdquo;
          </blockquote>
          <p className="text-gray-400 text-lg leading-relaxed">
            The expertise of a professional stylist has always been a luxury for the few. GYF makes that intelligence universal.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
