'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  { num: '01', title: 'Upload your photo or describe yourself', body: 'GYF reads your body type, skin tone, and style signals to build your personal profile.' },
  { num: '02', title: 'GYF builds your complete outfit', body: "A coordinated look — top, bottom, footwear — chosen for your specific body and taste, with a stylist's explanation." },
  { num: '03', title: 'It gets smarter with you', body: 'Every save, skip, and reaction trains your personal taste model. The longer you use it, the more it feels like magic.' },
]

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'start 0.3'] })

  return (
    <motion.div ref={ref} key={step.num} initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.7,delay:index*0.15}}
      className="flex gap-6 sm:gap-8 py-8 sm:py-12 border-t border-gray-100">
      <motion.div
        style={{ scale: useTransform(scrollYProgress, [0, 1], [0.8, 1]) }}
        className="text-[clamp(3rem,6vw,5rem)] font-black font-mono leading-none flex-shrink-0 w-16 sm:w-24 gradient-text"
      >
        {step.num}
      </motion.div>
      <div className="pt-2">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
        <p className="text-gray-600 leading-relaxed max-w-lg">{step.body}</p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          className="mb-20">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Process</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 leading-tight">How GYF Works</h2>
        </motion.div>
        <div className="space-y-0">
          {steps.map((step, i) => (
            <Step key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
