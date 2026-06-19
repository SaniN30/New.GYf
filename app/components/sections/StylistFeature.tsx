'use client'
import { motion } from 'framer-motion'

export default function StylistFeature() {
  return (
    <section id="stylist" className="bg-[#0A0A0A] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mb-4">The Stylist</div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-tight tracking-tight mb-6">
              Complete outfits.<br />Built for you.<br />
              <span className="text-white/30">In seconds.</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              GYF doesn&apos;t just recommend pieces — it builds coordinated looks: top, bottom, footwear. Every suggestion comes with a stylist&apos;s reasoning.
            </p>
            <ul className="space-y-4">
              {[
                { icon: '✦', text: 'Sees color harmony and silhouette — not just tags' },
                { icon: '✦', text: 'Builds around your body type, not average bodies' },
                { icon: '✦', text: 'Explains every choice like a real stylist would' },
              ].map(item => (
                <li key={item.text} className="flex items-start gap-3 text-white/60 text-sm">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — feature cards (Cluely style colored cards on dark bg) */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4">
            {[
              { bg: 'bg-gray-800', icon: '👁️', title: 'Visual AI', body: 'Reads vibe, color, silhouette — the way a stylist sees clothing.' },
              { bg: 'bg-gray-700', icon: '🧠', title: 'Taste Engine', body: 'Learns from every like, skip, and save. Gets sharper over time.' },
              { bg: 'bg-gray-900', icon: '✦', title: 'Full Outfits', body: 'Never just one piece — always a coordinated look.' },
              { bg: 'bg-gray-600', icon: '💬', title: 'Reasoning', body: 'Every pick explained. You know why it works.' },
            ].map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${card.bg} rounded-3xl p-6 hover:scale-[1.02] transition-transform cursor-default`}>
                <div className="text-2xl mb-4">{card.icon}</div>
                <h3 className="text-white font-bold mb-2 text-base">{card.title}</h3>
                <p className="text-white/70 text-xs leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
