'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const pillars = [
  {
    icon: '👁️',
    title: 'Visual Style Intelligence',
    summary: 'Reads aesthetic, texture, colour, and silhouette directly from imagery.',
    detail: 'GYF sees and understands clothing the way a stylist does — reading vibe, colour harmony, texture, and silhouette from images so coordination is based on real visual harmony, not just labels or tags. Visual intelligence is the foundation every recommendation is built on.',
  },
  {
    icon: '🧠',
    title: 'Deep Personal-Taste Modeling',
    summary: 'A living preference model that anticipates what you\'ll love.',
    detail: 'A living, individual representation of each user\'s preferences that anticipates what they\'ll love before they see it and refines with every signal — every save, skip, and reaction. The more you use GYF, the more its picks feel uncannily you.',
  },
  {
    icon: '🌐',
    title: 'Collective Intelligence',
    summary: 'Learns from thousands, distils insights back to you personally.',
    detail: 'GYF learns from how thousands of people react to combinations, discovering styling patterns no rulebook contains — then tailors those insights back to the individual. The system gets sharper the more people it dresses, and every outfit, save, and skip improves the next recommendation for everyone.',
  },
  {
    icon: '✦',
    title: 'Honest Confidence',
    summary: 'Every recommendation comes with a reason and honest confidence.',
    detail: 'Even as an AI-first product, GYF always pairs intelligence with explanation and honest confidence. The advanced models are continuously evaluated against quality benchmarks so the system earns and keeps user trust. Sophistication and transparency advance together — impressiveness without trust is failure.',
  },
  {
    icon: '✨',
    title: 'Generative Visualization',
    summary: 'See any look realistically on your own body before committing.',
    detail: 'Moving toward realistic rendering of how a complete look appears on your body — turning "I think this works" into "I can see that it does." Select a top, bottom, and footwear and see all three together on yourself, rendered from your own photo. The last barrier between inspiration and confidence, removed.',
  },
  {
    icon: '⚡',
    title: 'Compounding Stylist',
    summary: 'The north star: an intelligence that gets sharper the more it dresses.',
    detail: 'The north star: an intelligence that gets sharper the more people it dresses — every outfit, save, and skip improving the next recommendation for everyone. Real user behaviour is the most valuable asset; GYF captures it cleanly and compounds it into a system that measurably improves the more it is used.',
  },
]

export default function Intelligence() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Under the Hood</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 leading-tight">The Intelligence</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => {
            const isActive = activeCard === i
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setActiveCard(isActive ? null : i)}
                whileHover={!isActive ? { y: -4 } : {}}
                className={`rounded-2xl p-7 cursor-pointer transition-all duration-300 border ${
                  isActive
                    ? 'bg-gray-900 border-gray-900 shadow-2xl'
                    : 'bg-white border-gray-200 hover:border-gray-400 hover:shadow-lg'
                }`}
              >
                <div className="text-2xl mb-4">{p.icon}</div>
                <h3 className={`text-base font-bold mb-2 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {p.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-200 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                  {p.summary}
                </p>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-400 leading-relaxed">{p.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`mt-4 text-xs font-mono tracking-widest transition-colors duration-200 ${isActive ? 'text-gray-500' : 'text-gray-300'}`}>
                  {isActive ? 'CLICK TO COLLAPSE ↑' : 'CLICK TO EXPAND ↓'}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
