'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const tags = ['Body Type Analysis', 'Outfit Matching', 'Color Palette', 'Style Learning', 'Fit Intelligence', 'Taste Engine']

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, -60])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  const headlineWords = ['Your', 'Style.']
  const headline2Words = ['Finally', 'Intelligent.']

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0.025), transparent 60%)`,
        }}
      />

      <motion.div style={{ y }} className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-44 pb-20">
        {/* Badge */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-gray-700 text-sm font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-gray-900 animate-pulse" />
          AI Personal Stylist — Early Access
        </motion.div>

        {/* Headline — staggered letter animation */}
        <div className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-tight text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          <motion.div className="flex justify-center gap-[0.2em] flex-wrap">
            {headlineWords.map((word, wi) => (
              <motion.span
                key={wi}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04, delayChildren: wi * 0.15 } },
                }}
              >
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 40, rotateX: -40 },
                      visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >{char}</motion.span>
                ))}
                {wi < headlineWords.length - 1 && <span className="inline-block w-[0.2em]" />}
              </motion.span>
            ))}
          </motion.div>
          <div className="shimmer-text flex justify-center gap-[0.2em] flex-wrap">
            {headline2Words.map((word, wi) => (
              <motion.span
                key={wi}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 + wi * 0.15 } },
                }}
              >
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >{char}</motion.span>
                ))}
                {wi < headline2Words.length - 1 && <span className="inline-block w-[0.2em]" />}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Sub */}
        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.8}}
          className="text-[clamp(1rem,2vw,1.25rem)] text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed mt-6">
          GYF reads your body, learns your taste, and builds complete outfits in real time — no stylist, no guesswork.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:1.0}}
          className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a href="#perception" className="btn-3d px-8 py-4 font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300">
            Try Perception Layer
          </a>
          <a href="/how-it-works" className="px-8 py-4 rounded-full font-semibold text-gray-700 border border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all duration-300 bezel">
            See How It Works ↓
          </a>
        </motion.div>

        {/* Floating tag cloud */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.08 }}
              className="px-4 py-2 rounded-full text-sm border border-gray-200 text-gray-600 bg-gray-50 font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Floating product mockup */}
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1,delay:1.3}}
          className="float-anim relative mx-auto max-w-2xl">
          <div className="glass-card gradient-border-card p-6 glow-subtle">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
              <span className="ml-2 text-xs text-gray-500 font-mono">GYF Stylist</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['Top', 'Bottom', 'Footwear'].map((item, i) => (
                <div key={item} className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 mx-auto mb-2 flex items-center justify-center text-2xl">
                    {['👕','👖','👟'][i]}
                  </div>
                  <div className="text-xs text-gray-600">{item}</div>
                  <div className="text-xs text-gray-900 font-mono mt-1">Matched ✓</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-700 font-mono">&quot;Structured silhouette suits your inverted triangle build. Navy anchors the palette.&quot;</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <div className="relative z-10 w-full border-t border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-6">
          {[
            { num: '<400ms', label: 'Response Time' },
            { num: '98%', label: 'Fit Accuracy' },
            { num: '10K+', label: 'Outfits Built' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-black gradient-text font-mono">{stat.num}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
