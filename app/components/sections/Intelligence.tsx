'use client'
import { motion } from 'framer-motion'

const pillars = [
  { icon: '👁️', title: 'Visual Intelligence', body: 'Reads vibe, color harmony, silhouette — not just tags or categories.' },
  { icon: '🧠', title: 'Personal Taste Engine', body: 'Builds a living preference model that improves with every interaction.' },
  { icon: '🌐', title: 'Collective Learning', body: 'Distills patterns from thousands of users into something deeply personal.' },
  { icon: '✦', title: 'Honest Confidence', body: 'Every recommendation comes with a reason. Transparent about what it knows.' },
]

export default function Intelligence() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <div className="text-xs font-mono font-medium text-[#7C3AED] uppercase tracking-widest mb-3">Under the Hood</div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#0F0A1E] leading-tight">The Intelligence</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl bg-[#FAFAFA] border border-gray-200 p-8 card-hover hover:border-purple-200 hover:bg-purple-50/20 cursor-default">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-xl mb-5 group-hover:bg-purple-100 transition-colors">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0F0A1E] mb-3 group-hover:text-[#7C3AED] transition-colors">{p.title}</h3>
              <p className="text-gray-500 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
