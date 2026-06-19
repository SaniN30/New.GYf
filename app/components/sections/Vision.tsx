'use client'
import { motion } from 'framer-motion'

export default function Vision() {
  return (
    <section className="py-20 sm:py-40 bg-white relative overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8}}>
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-8">Vision</div>
          <blockquote className="text-[clamp(1.75rem,4vw,3rem)] font-black text-gray-900 leading-tight mb-8">
            &ldquo;A personal stylist for everyone.<br />
            <span className="shimmer-text">Free. Instant. Genuinely yours.</span>&rdquo;
          </blockquote>
          <p className="text-gray-600 text-lg leading-relaxed">
            The expertise of a professional stylist has always been a luxury for the few. GYF makes that intelligence universal.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
