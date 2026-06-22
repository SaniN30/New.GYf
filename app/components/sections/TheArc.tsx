'use client'
import { motion } from 'framer-motion'

const phases = [
  {
    num: '01',
    title: 'The Intelligent Stylist',
    label: 'Launch',
    desc: 'An AI that builds personalized, explained outfits from day one and learns from real user behaviour immediately. Complete outfit generation — top, bottom, footwear — with a clear stylist reason behind every look.',
    active: true,
  },
  {
    num: '02',
    title: 'The Personal Taste Engine',
    label: 'Coming Soon',
    desc: "GYF knows your style deeply enough that its picks feel uncannily you. It styles around your real wardrobe and adapts to context — weather, event, mood. The more you use it, the more it matures.",
    active: false,
  },
  {
    num: '03',
    title: 'The Shopping Companion',
    label: 'Planned',
    desc: 'GYF shops with you — across brands and retailers — recommending not just looks but the smartest things to buy to complete your wardrobe, within your budget. From inspiration to purchase in one place.',
    active: false,
  },
  {
    num: '04',
    title: 'The Visualization Layer',
    label: 'Planned',
    desc: 'See any look realistically on yourself before committing. Select a complete outfit and see all three pieces rendered on your own body from your photo — removing the last barrier between inspiration and confidence.',
    active: false,
  },
  {
    num: '05',
    title: 'The Ambient Stylist',
    label: 'Vision',
    desc: 'GYF becomes the default way people decide what to wear and what to buy — a trusted companion present wherever fashion decisions happen, getting smarter for everyone it serves.',
    active: false,
  },
]

export default function TheArc() {
  return (
    <section className="py-16 sm:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-16"
        >
          <div className="text-xs font-mono text-gray-700 uppercase tracking-widest mb-4">Roadmap</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 leading-tight">The Arc</h2>
        </motion.div>

        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-gray-900 via-gray-400/40 to-transparent origin-top"
          />

          <div className="space-y-0">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.num}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative pl-14 sm:pl-16 pb-12 sm:pb-16"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.12, type: 'spring', stiffness: 280 }}
                  className={`absolute left-[8px] top-2 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                    phase.active
                      ? 'border-gray-900 bg-gray-900 ring-4 ring-gray-900/10'
                      : 'border-gray-300 bg-white'
                  }`}
                />

                {/* Phase number */}
                <div className="text-[clamp(2.5rem,4.5vw,3.5rem)] font-black font-mono leading-none text-gray-100 mb-3 select-none">
                  {phase.num}
                </div>

                {/* Header row */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className={`text-lg sm:text-xl font-bold leading-tight ${phase.active ? 'text-gray-900' : 'text-gray-600'}`}>
                    {phase.title}
                  </h3>
                  {phase.active ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-gray-900 text-white uppercase tracking-widest"
                    >
                      Live
                    </motion.span>
                  ) : (
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 uppercase tracking-widest">
                      {phase.label}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className={`text-base leading-relaxed max-w-xl ${phase.active ? 'text-gray-600' : 'text-gray-600'}`}>
                  {phase.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
