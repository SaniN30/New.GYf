'use client'
import { motion } from 'framer-motion'

const missions = [
  {
    num: '01',
    title: 'Replace anxiety with confidence',
    body: 'The outcome is not more clothes — it\'s a person who feels put-together and stops second-guessing. Every morning, made easier.',
  },
  {
    num: '02',
    title: 'Truly understand you',
    body: 'Learn each user\'s taste, body, budget, and occasions so deeply that advice feels personal, like a stylist who has known you for years.',
  },
  {
    num: '03',
    title: 'Be trustworthy, not just impressive',
    body: 'Every recommendation is explainable and honest about its confidence. Trust is the product — sophistication and transparency advance together.',
  },
  {
    num: '04',
    title: 'Compound intelligence',
    body: 'Become measurably better the more it\'s used — for the individual and for everyone. A system that gets sharper with every outfit, save, and skip.',
  },
]

export default function Vision() {
  return (
    <section className="py-16 sm:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-xs font-mono text-gray-700 uppercase tracking-widest mb-6">Mission</div>
          <blockquote className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-black text-gray-900 leading-tight mb-6 max-w-3xl">
            &ldquo;Make the intelligence of a professional stylist universal — free, instant, and genuinely personal to everyone.&rdquo;
          </blockquote>
          <p className="text-base text-gray-700 leading-relaxed max-w-2xl">
            The expertise of a personal stylist has always been a luxury for the few. GYF changes that — not by simplifying the problem, but by solving it with AI that actually understands you.
          </p>
        </motion.div>

        {/* Mission pillars timeline */}
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-gray-900 via-gray-300 to-transparent origin-top"
          />

          <div className="space-y-0">
            {missions.map((m, i) => (
              <motion.div
                key={m.num}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative pl-14 sm:pl-16 pb-10 sm:pb-14"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 280 }}
                  className="absolute left-[8px] top-2 w-4 h-4 rounded-full border-2 border-gray-900 bg-white ring-4 ring-gray-900/8"
                />

                {/* Number */}
                <div className="text-[clamp(2.5rem,4vw,3.5rem)] font-black font-mono leading-none text-gray-100 mb-3 select-none">
                  {m.num}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight">{m.title}</h3>
                <p className="text-base text-gray-700 leading-relaxed max-w-xl">{m.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
