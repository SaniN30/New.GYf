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
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          className="mb-16 text-center">
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Under the Hood</div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 leading-tight">The Intelligence</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={p.title}
              initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:i*0.12}}
              whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.10)' }}
              className="gradient-border-card rounded-2xl bg-gray-50 p-8 transition-all duration-300 group cursor-default">
              <div className="text-3xl mb-5">{p.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">{p.title}</h3>
              <p className="text-gray-600 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
