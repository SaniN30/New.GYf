'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SAMPLE_RESULT = {
  bodyType: 'Inverted Triangle',
  skinTone: 'Warm Medium',
  styleSignals: ['Clean lines', 'Structured silhouettes'],
  recommendedPalette: ['Navy', 'Camel', 'Ivory', 'Forest Green'],
  perceivedVibe: 'Classic / Minimal',
}

type State = 'idle' | 'loading' | 'done'

export default function PerceptionLayer() {
  const [state, setState] = useState<State>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setPreview(URL.createObjectURL(file))
    setState('loading')
    setTimeout(() => setState('done'), 2200)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f?.type.startsWith('image/')) handleFile(f)
  }

  const useSample = () => {
    setPreview(null)
    setState('loading')
    setTimeout(() => setState('done'), 2200)
  }

  const reset = () => { setState('idle'); setPreview(null) }

  return (
    <section id="perception" className="py-32 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-mono font-medium mb-6">
            ✦ New Feature
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#0F0A1E] mb-4 leading-tight">
            See Yourself <span className="shimmer-text">Differently.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            Upload a photo. GYF reads your proportions, palette, and presence — then builds outfits designed exactly for your body.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-3xl bg-white border border-gray-200 shadow-xl shadow-purple-50 p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upload panel */}
            <div>
              <div className="text-xs font-mono font-medium text-gray-400 uppercase tracking-widest mb-4">Your Photo</div>
              {state === 'idle' ? (
                <div
                  onDrop={handleDrop} onDragOver={e => e.preventDefault()}
                  onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50/30 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 min-h-[220px] flex flex-col items-center justify-center gap-4">
                  <input ref={inputRef} type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-3xl">📸</div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Drop your photo here</p>
                    <p className="text-gray-400 text-sm">or click to browse</p>
                  </div>
                  <button onClick={e => { e.stopPropagation(); useSample() }}
                    className="text-xs text-[#7C3AED] hover:text-purple-700 border border-purple-200 hover:bg-purple-50 px-4 py-2 rounded-full transition-all font-medium">
                    Use sample instead →
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden border border-gray-200 min-h-[220px] flex items-center justify-center relative bg-gray-50">
                  {preview
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={preview} alt="Preview" className="w-full h-full object-cover max-h-72 rounded-2xl" />
                    : <div className="text-center text-gray-400"><div className="text-5xl mb-3">🧍</div><div className="text-sm font-mono">sample_user.jpg</div></div>
                  }
                  {state === 'loading' && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                      <div className="text-center">
                        <div className="w-10 h-10 border-[3px] border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-[#7C3AED] text-sm font-semibold font-mono animate-pulse">Analyzing your body...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Result panel */}
            <div>
              <div className="text-xs font-mono font-medium text-gray-400 uppercase tracking-widest mb-4">Analysis Result</div>
              <AnimatePresence mode="wait">
                {state !== 'done' ? (
                  <motion.div key="empty" className="min-h-[220px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50">
                    <div className="text-4xl mb-3 opacity-30">✦</div>
                    <p className="text-gray-300 text-sm font-mono">Analysis will appear here</p>
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-6 space-y-4">
                    {[
                      { label: 'Body Type', value: SAMPLE_RESULT.bodyType },
                      { label: 'Skin Tone', value: SAMPLE_RESULT.skinTone },
                      { label: 'Style Vibe', value: SAMPLE_RESULT.perceivedVibe },
                    ].map((item, i) => (
                      <motion.div key={item.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <div className="text-xs text-gray-400 font-mono mb-1">{item.label}</div>
                        <div className="font-bold text-[#0F0A1E]">{item.value}</div>
                      </motion.div>
                    ))}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                      <div className="text-xs text-gray-400 font-mono mb-2">Recommended Palette</div>
                      <div className="flex gap-2 flex-wrap">
                        {SAMPLE_RESULT.recommendedPalette.map(c => (
                          <span key={c} className="px-3 py-1 rounded-full text-xs bg-white border border-purple-100 text-gray-700 font-medium">{c}</span>
                        ))}
                      </div>
                    </motion.div>
                    <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                      href="#cta"
                      className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-md shadow-purple-100">
                      View Your Outfits →
                    </motion.a>
                    <button onClick={reset} className="block w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-1">
                      Try another photo
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Privacy badges */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4 justify-center">
            {['🔒 Photo never stored', '⚡ Instant analysis', '🛡️ Private by design'].map(badge => (
              <span key={badge} className="text-xs text-gray-400 font-medium">{badge}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
