'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SAMPLE_RESULT = {
  bodyType: 'Inverted Triangle',
  skinTone: 'Warm Medium',
  styleSignals: ['Clean lines', 'Structured silhouettes', 'Minimal accessories'],
  recommendedPalette: ['Navy', 'Camel', 'Ivory', 'Forest Green'],
  perceivedVibe: 'Classic / Minimal',
}

// Landmark dot positions (percentage of image container)
const LANDMARK_DOTS = [
  { top: '12%', left: '50%', label: 'Shoulders' },
  { top: '30%', left: '50%', label: 'Chest' },
  { top: '50%', left: '50%', label: 'Waist' },
  { top: '68%', left: '50%', label: 'Hips' },
  { top: '86%', left: '35%', label: 'Left Knee' },
  { top: '86%', left: '65%', label: 'Right Knee' },
]

type State = 'idle' | 'scanning' | 'done'

function useTypewriter(text: string, active: boolean, delay = 0) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    let i = 0
    setDisplayed('')
    const t = setTimeout(() => {
      const id = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(id)
      }, 28)
      return () => clearInterval(id)
    }, delay)
    return () => clearTimeout(t)
  }, [active, text, delay])

  return displayed
}

export default function PerceptionLayer() {
  const [state, setState] = useState<State>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
    setState('scanning')
    setTimeout(() => setState('done'), 2400)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  const useSample = () => {
    setPreview(null)
    setState('scanning')
    setTimeout(() => setState('done'), 2400)
  }

  const reset = () => { setState('idle'); setPreview(null) }

  const bodyTypeText = useTypewriter(SAMPLE_RESULT.bodyType, state === 'done', 200)
  const skinToneText = useTypewriter(SAMPLE_RESULT.skinTone, state === 'done', 600)
  const vibeText = useTypewriter(SAMPLE_RESULT.perceivedVibe, state === 'done', 1000)

  return (
    <section id="perception" className="py-32 relative overflow-hidden bg-white">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-mono mb-6">
            ✦ New Feature
          </div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            See Yourself <span className="shimmer-text">Differently.</span>
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Upload a photo. GYF&apos;s Perception Layer reads your proportions, palette, and presence — then builds a look designed exactly for your body.
          </p>
        </motion.div>

        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8,delay:0.2}}
          className="glass-card gradient-border-card p-8 glow-purple max-w-4xl mx-auto">

          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT: Input panel */}
            <div>
              <div className="text-xs font-mono text-gray-700 uppercase tracking-widest mb-4">Input</div>
              {state === 'idle' && (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 hover:border-purple-500/40 rounded-2xl p-8 text-center cursor-pointer transition-colors duration-300 min-h-[200px] flex flex-col items-center justify-center gap-4">
                  <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">📸</div>
                  <div>
                    <p className="text-gray-900 font-semibold mb-1">Drop your photo here</p>
                    <p className="text-gray-700 text-sm">or click to browse</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); useSample() }}
                    className="text-xs text-purple-400 hover:text-purple-300 border border-purple-500/30 px-4 py-2 rounded-full transition-colors">
                    Use sample instead
                  </button>
                </div>
              )}

              {(state === 'scanning' || state === 'done') && (
                <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 min-h-[200px] flex items-center justify-center relative">
                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={preview} alt="Your photo" className="w-full h-full object-cover rounded-2xl max-h-64" />
                  ) : (
                    <div className="text-center text-gray-700 py-12">
                      <div className="text-4xl mb-2">🧍</div>
                      <div className="text-sm font-mono">sample_user.jpg</div>
                    </div>
                  )}

                  {/* Scanning overlay */}
                  {state === 'scanning' && (
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <div className="scan-line" />
                      <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                          <p className="text-purple-300 text-sm font-mono animate-pulse">Analyzing body…</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Landmark dots after scan */}
                  {state === 'done' && (
                    <div className="absolute inset-0 pointer-events-none">
                      {LANDMARK_DOTS.map((dot, i) => (
                        <motion.div
                          key={dot.label}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.12, type: 'spring', stiffness: 300, damping: 20 }}
                          className="absolute -translate-x-1/2 -translate-y-1/2"
                          style={{ top: dot.top, left: dot.left }}
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 border-2 border-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT: Analysis panel */}
            <div>
              <div className="text-xs font-mono text-gray-700 uppercase tracking-widest mb-4">Analysis</div>
              <AnimatePresence mode="wait">
                {state !== 'done' ? (
                  <motion.div key="empty" className="min-h-[200px] flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50">
                    <p className="text-gray-700 text-sm font-mono">Awaiting input...</p>
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.5}}
                    className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-5 space-y-4 backdrop-blur-sm">
                    {[
                      { label: 'Body Type', value: bodyTypeText },
                      { label: 'Skin Tone', value: skinToneText },
                      { label: 'Style Vibe', value: vibeText },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="text-xs text-gray-700 font-mono mb-1">{item.label}</div>
                        <div className="text-gray-900 font-semibold min-h-[1.5rem]">
                          {item.value}
                          <span className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 animate-pulse align-middle" />
                        </div>
                      </div>
                    ))}
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
                      <div className="text-xs text-gray-700 font-mono mb-2">Recommended Palette</div>
                      <div className="flex gap-2 flex-wrap">
                        {SAMPLE_RESULT.recommendedPalette.map((c, i) => (
                          <motion.span
                            key={c}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4 + i * 0.1 }}
                            className="px-3 py-1 rounded-full text-xs bg-gray-50 border border-gray-200 text-gray-300"
                          >{c}</motion.span>
                        ))}
                      </div>
                    </motion.div>
                    <motion.a initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
                      href="#cta" className="btn-3d block w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-gray-900 font-semibold text-sm hover:opacity-90 transition-opacity">
                      View Your Outfits →
                    </motion.a>
                    <button onClick={reset} className="block w-full text-center text-xs text-gray-700 hover:text-gray-700 transition-colors py-1">
                      Try another photo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-4 justify-center">
            {['🔒 Photo never stored', '⚡ Instant analysis', '🛡️ Private by design'].map(badge => (
              <span key={badge} className="text-xs text-gray-700 font-mono">{badge}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
