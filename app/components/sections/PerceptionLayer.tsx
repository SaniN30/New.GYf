'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SAMPLE_RESULT = {
  bodyType: 'Inverted Triangle',
  skinTone: 'Warm Medium',
  styleSignals: ['Clean lines', 'Structured silhouettes', 'Minimal accessories'],
  recommendedPalette: ['Navy', 'Camel', 'Ivory', 'Forest Green'],
  perceivedVibe: 'Classic / Minimal',
}

type State = 'idle' | 'loading' | 'done'

export default function PerceptionLayer() {
  const [state, setState] = useState<State>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
    setState('loading')
    setTimeout(() => setState('done'), 2000)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  const useSample = () => {
    setPreview(null)
    setState('loading')
    setTimeout(() => setState('done'), 2000)
  }

  const reset = () => { setState('idle'); setPreview(null) }

  return (
    <section id="perception" className="py-32 relative overflow-hidden bg-[#08080C]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-purple-600/8 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-mono mb-6">
            ✦ New Feature
          </div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white mb-4 leading-tight">
            See Yourself <span className="shimmer-text">Differently.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload a photo. GYF&apos;s Perception Layer reads your proportions, palette, and presence — then builds a look designed exactly for your body.
          </p>
        </motion.div>

        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8,delay:0.2}}
          className="gradient-border-card rounded-3xl bg-[#0F0F18] p-8 glow-purple max-w-4xl mx-auto">

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Input</div>
              {state === 'idle' && (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-white/10 hover:border-purple-500/40 rounded-2xl p-8 text-center cursor-pointer transition-colors duration-300 min-h-[200px] flex flex-col items-center justify-center gap-4">
                  <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">📸</div>
                  <div>
                    <p className="text-white font-semibold mb-1">Drop your photo here</p>
                    <p className="text-gray-500 text-sm">or click to browse</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); useSample() }}
                    className="text-xs text-purple-400 hover:text-purple-300 border border-purple-500/30 px-4 py-2 rounded-full transition-colors">
                    Use sample instead
                  </button>
                </div>
              )}
              {(state === 'loading' || state === 'done') && (
                <div className="rounded-2xl overflow-hidden bg-[#16162A] border border-white/5 min-h-[200px] flex items-center justify-center relative">
                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={preview} alt="Your photo" className="w-full h-full object-cover rounded-2xl max-h-64" />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🧍</div>
                      <div className="text-sm font-mono">sample_user.jpg</div>
                    </div>
                  )}
                  {state === 'loading' && (
                    <div className="absolute inset-0 bg-purple-950/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-purple-300 text-sm font-mono animate-pulse">Analyzing...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Analysis</div>
              <AnimatePresence mode="wait">
                {state !== 'done' ? (
                  <motion.div key="empty" className="min-h-[200px] flex items-center justify-center rounded-2xl border border-white/5 bg-[#16162A]">
                    <p className="text-gray-600 text-sm font-mono">Awaiting input...</p>
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.5}}
                    className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-5 space-y-4">
                    {[
                      { label: 'Body Type', value: SAMPLE_RESULT.bodyType },
                      { label: 'Skin Tone', value: SAMPLE_RESULT.skinTone },
                      { label: 'Style Vibe', value: SAMPLE_RESULT.perceivedVibe },
                    ].map((item, i) => (
                      <motion.div key={item.label} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}}>
                        <div className="text-xs text-gray-500 font-mono mb-1">{item.label}</div>
                        <div className="text-white font-semibold">{item.value}</div>
                      </motion.div>
                    ))}
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
                      <div className="text-xs text-gray-500 font-mono mb-2">Recommended Palette</div>
                      <div className="flex gap-2 flex-wrap">
                        {SAMPLE_RESULT.recommendedPalette.map(c => (
                          <span key={c} className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-300">{c}</span>
                        ))}
                      </div>
                    </motion.div>
                    <motion.a initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
                      href="#cta" className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                      View Your Outfits →
                    </motion.a>
                    <button onClick={reset} className="block w-full text-center text-xs text-gray-600 hover:text-gray-400 transition-colors py-1">
                      Try another photo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-4 justify-center">
            {['🔒 Photo never stored', '⚡ Instant analysis', '🛡️ Private by design'].map(badge => (
              <span key={badge} className="text-xs text-gray-500 font-mono">{badge}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
