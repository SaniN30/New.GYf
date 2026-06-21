'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

const steps = [
  {
    num: '01',
    title: 'Upload your photo or describe yourself',
    body: 'GYF reads your body type, skin tone, and style signals to build your personal profile. Choose photo-based onboarding for automatic deduction, or manually state your preferences — nothing is ever locked in.',
  },
  {
    num: '02',
    title: 'GYF builds your complete outfit',
    body: "A coordinated look — top, bottom, footwear — chosen for your specific body and taste, with a stylist's explanation. Tell GYF your goal in plain words: \"I want to look taller\" and it applies colour theory and body-type intelligence to achieve it.",
  },
  {
    num: '03',
    title: 'It gets smarter with you',
    body: 'Every save, skip, and reaction trains your personal taste model. The longer you use it, the more it feels like magic — adapting to your wardrobe, your occasions, and how you actually live.',
  },
  {
    num: '04',
    title: 'See it on you',
    body: 'Select a complete look and see it rendered realistically on your own body before committing. The last barrier between inspiration and confidence — removed.',
  },
]

function Step({ step, index, isActive, onClick }: { step: typeof steps[0]; index: number; isActive: boolean; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative pl-16 sm:pl-20 pb-10 sm:pb-14 cursor-pointer group"
      onClick={onClick}
    >
      {/* Vertical line segment */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
          className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-gray-300 to-gray-100 origin-top"
        />
      )}

      {/* Step dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 + index * 0.12, type: 'spring', stiffness: 300 }}
        className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          isActive
            ? 'border-gray-900 bg-gray-900 ring-4 ring-gray-900/10'
            : 'border-gray-300 bg-white group-hover:border-gray-600'
        }`}
      >
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-white' : 'bg-gray-300 group-hover:bg-gray-500'}`} />
      </motion.div>

      {/* Step number */}
      <div className="text-[clamp(2.5rem,5vw,4rem)] font-black font-mono leading-none mb-3 text-gray-200 select-none">
        {step.num}
      </div>

      {/* Content */}
      <h3 className={`text-lg sm:text-xl font-bold mb-3 transition-colors duration-200 ${isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
        {step.title}
      </h3>

      <motion.div
        initial={false}
        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="text-base text-gray-700 leading-relaxed max-w-lg pb-2">{step.body}</p>
      </motion.div>

      {!isActive && (
        <p className="text-sm text-gray-600 leading-relaxed max-w-lg line-clamp-1">{step.body}</p>
      )}
    </motion.div>
  )
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" className="py-16 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="text-xs font-mono text-gray-700 uppercase tracking-widest mb-4">Process</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 leading-tight">How GYF Works</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Timeline */}
          <div className="relative">
            {steps.map((step, i) => (
              <Step
                key={step.num}
                step={step}
                index={i}
                isActive={activeStep === i}
                onClick={() => setActiveStep(i)}
              />
            ))}
          </div>

          {/* Why it works panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:sticky lg:top-32 bg-gray-50 rounded-2xl p-8 sm:p-10 border border-gray-100"
          >
            <div className="text-xs font-mono text-gray-700 uppercase tracking-widest mb-6">Why it works</div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-mono text-gray-600">→</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1 text-base">Style is visual</div>
                  <p className="text-sm text-gray-700 leading-relaxed">You can't capture "this jacket has the right vibe" with tags. GYF perceives clothing from images — reading aesthetic, texture, colour, and silhouette the way a stylist does.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-mono text-gray-600">→</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1 text-base">Taste is learned</div>
                  <p className="text-sm text-gray-700 leading-relaxed">No fixed rulebook captures individual taste. GYF learns from behaviour — and updates continuously — so it gets more personal the more you use it.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-mono text-gray-600">→</div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1 text-base">Good styling compounds</div>
                  <p className="text-sm text-gray-700 leading-relaxed">The more people GYF dresses and the more reactions it sees, the better it gets — for everyone. That's a learning system, not a static one.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
