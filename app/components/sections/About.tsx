'use client'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}>
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-8">About</div>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black text-gray-900 leading-tight mb-8">Why We Built This</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We built GYF because the daily friction of getting dressed shouldn&apos;t require expertise most people don&apos;t have time to develop.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Style is learnable. The rules are knowable. The combinations are computable. We built the learner — so you don&apos;t have to be one.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
