'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SAMPLE_RESULT = {
  bodyType: 'Inverted Triangle',
  skinTone: 'Warm Medium',
  styleSignals: ['Clean lines', 'Structured silhouettes', 'Minimal accessories'],
  recommendedPalette: ['Navy', 'Camel', 'Ivory', 'Forest Green'],
  perceivedVibe: 'Classic / Minimal',
}

const MEASUREMENT_LINES = [
  { x1: '20%', y1: '15%', x2: '80%', y2: '15%', label: 'Shoulders' },
  { x1: '30%', y1: '40%', x2: '70%', y2: '40%', label: 'Waist' },
  { x1: '25%', y1: '58%', x2: '75%', y2: '58%', label: 'Hips' },
]

const OUTFIT_DATA = {
  top: { name: 'Structured Blazer', color: 'Slate Grey', material: 'Wool Blend', why: 'Balances inverted triangle' },
  bottom: { name: 'Tapered Trousers', color: 'Charcoal', material: 'Cotton Twill', why: 'Adds visual weight below' },
  footwear: { name: 'Chelsea Boots', color: 'Tan', material: 'Leather', why: 'Grounds the silhouette' },
}

const PALETTE_DATA = [
  { name: 'Navy', hex: '#1B2A4A', role: 'Base' },
  { name: 'Camel', hex: '#C4956A', role: 'Accent' },
  { name: 'Ivory', hex: '#F5F0E8', role: 'Highlight' },
  { name: 'Forest', hex: '#2D4A3E', role: 'Depth' },
  { name: 'Slate', hex: '#6B7280', role: 'Neutral' },
]

const STYLE_PROFILE = {
  archetype: 'The Modern Classic',
  energy: 'Calm authority',
  avoid: ['Loud prints', 'Oversized tops', 'Bold colors'],
  lean: ['Monochromatic layering', 'Tailored cuts', 'Quality basics'],
}

type State = 'idle' | 'scanning' | 'done'
type Tab = 'outfit' | 'palette' | 'profile'

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
  const [tab, setTab] = useState<Tab>('outfit')
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
    setState('scanning')
    setTimeout(() => setState('done'), 2600)
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  const useSample = () => {
    setPreview(null)
    setState('scanning')
    setTimeout(() => setState('done'), 2600)
  }

  const reset = () => { setState('idle'); setPreview(null); setTab('outfit') }

  const bodyTypeText = useTypewriter(SAMPLE_RESULT.bodyType, state === 'done', 200)
  const skinToneText = useTypewriter(SAMPLE_RESULT.skinTone, state === 'done', 600)
  const vibeText = useTypewriter(SAMPLE_RESULT.perceivedVibe, state === 'done', 1000)

  return (
    <section id="perception" className="py-16 sm:py-24 relative overflow-hidden bg-[#F7F7F7]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.7}}
          className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-600 text-xs font-mono mb-6">
            ✦ Perception Layer
          </div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            See Yourself <span className="shimmer-text">Differently.</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload a photo. GYF&apos;s Perception Layer reads your proportions, palette, and presence — then builds a look designed exactly for your body.
          </p>
        </motion.div>

        {/* Main split layout */}
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.8,delay:0.2}}
          className="grid lg:grid-cols-2 gap-8 items-start">

          {/* LEFT: Upload zone */}
          <div className="space-y-4">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Input</div>

            {state === 'idle' && (
              <motion.div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => inputRef.current?.click()}
                animate={{ scale: isDragging ? 1.02 : 1, borderColor: isDragging ? '#1A1A1A' : 'rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="border-2 border-dashed rounded-3xl p-8 sm:p-16 text-center cursor-pointer bg-white min-h-[280px] sm:min-h-[420px] flex flex-col items-center justify-center gap-6 group hover:border-gray-400 transition-colors duration-300"
                style={{ borderColor: isDragging ? '#1A1A1A' : undefined }}
              >
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

                <motion.div
                  animate={{ scale: isDragging ? 1.1 : 1 }}
                  className="w-20 h-20 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center text-4xl"
                >
                  📸
                </motion.div>

                <div>
                  <p className="text-gray-900 font-bold text-xl mb-2">Drop your photo here</p>
                  <p className="text-gray-500 text-sm">JPG, PNG — full body works best</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-px w-16 bg-gray-200" />
                  <span className="text-xs text-gray-400 font-mono">or</span>
                  <div className="h-px w-16 bg-gray-200" />
                </div>

                <button onClick={(e) => { e.stopPropagation(); useSample() }}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-6 py-3 rounded-full transition-all duration-300 font-medium bg-white">
                  Try with sample →
                </button>
              </motion.div>
            )}

            {(state === 'scanning' || state === 'done') && (
              <div className="rounded-3xl overflow-hidden bg-white border border-gray-200 min-h-[420px] relative shadow-sm">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="Your photo" className="w-full h-full object-cover" style={{ minHeight: '280px' }} />
                ) : (
                  <div className="w-full min-h-[280px] sm:min-h-[420px] bg-gray-50 flex items-center justify-center">
                    <div className="text-center text-gray-400 py-12">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="20" cy="10" r="6" />
                          <path d="M8 38c0-6.627 5.373-12 12-12s12 5.373 12 12" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="text-sm font-mono text-gray-500">sample_user.jpg</div>
                    </div>
                  </div>
                )}

                {/* Full-height animated scan overlay */}
                {state === 'scanning' && (
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="scan-line" />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-white text-sm font-mono animate-pulse">Analyzing body proportions…</p>
                        <div className="mt-3 flex gap-1 justify-center">
                          {['Body Type', 'Skin Tone', 'Style Signals'].map((label, i) => (
                            <motion.span
                              key={label}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
                              className="text-xs text-gray-300 font-mono px-2 py-0.5 rounded border border-white/20"
                            >{label}</motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SVG measurement lines after scan */}
                {state === 'done' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {MEASUREMENT_LINES.map((line, i) => (
                        <motion.g key={line.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.2 }}>
                          <motion.line
                            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                            stroke="rgba(255,255,255,0.9)" strokeWidth="0.4"
                            strokeDasharray="100"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                          />
                          <motion.circle cx={line.x1} cy={line.y1} r="1" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.2, type: 'spring' }} />
                          <motion.circle cx={line.x2} cy={line.y2} r="1" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.2, type: 'spring' }} />
                        </motion.g>
                      ))}
                    </svg>
                    {MEASUREMENT_LINES.map((line, i) => (
                      <motion.div
                        key={line.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.2 }}
                        className="absolute text-[10px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded"
                        style={{ left: '82%', top: line.y1 }}
                      >
                        {line.label}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {state === 'done' && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={reset}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-900 transition-colors py-2 font-mono"
              >
                ← Try another photo
              </motion.button>
            )}
          </div>

          {/* RIGHT: Analysis panel */}
          <div>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Analysis</div>

            <AnimatePresence mode="wait">
              {state !== 'done' ? (
                <motion.div key="empty" exit={{ opacity: 0, y: -10 }}
                  className="min-h-[280px] sm:min-h-[420px] flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white gap-4 text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                      <path d="M4 16h24M16 4v24" strokeLinecap="round" />
                      <circle cx="16" cy="16" r="12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold mb-1">Upload a photo to begin</p>
                    <p className="text-gray-500 text-sm font-mono">or try the sample demo →</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
                  className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">

                  {/* Analysis summary */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: 'Body Type', value: bodyTypeText },
                        { label: 'Skin Tone', value: skinToneText },
                        { label: 'Style Vibe', value: vibeText },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 rounded-2xl p-3">
                          <div className="text-[10px] text-gray-500 font-mono mb-1">{item.label}</div>
                          <div className="text-sm text-gray-900 font-semibold min-h-[1.2rem]">
                            {item.value}
                            <span className="inline-block w-0.5 h-3 bg-gray-900 ml-0.5 animate-pulse align-middle" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                      {(['outfit', 'palette', 'profile'] as Tab[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTab(t)}
                          className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all duration-200 capitalize ${
                            tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {t === 'outfit' ? 'Outfit Builder' : t === 'palette' ? 'Palette' : 'Style Profile'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab content */}
                  <div className="p-6">
                    <AnimatePresence mode="wait">
                      {tab === 'outfit' && (
                        <motion.div key="outfit" initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} transition={{duration:0.3}}
                          className="space-y-3">
                          {Object.entries(OUTFIT_DATA).map(([key, item], i) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-lg flex-shrink-0">
                                {key === 'top' ? '👔' : key === 'bottom' ? '👖' : '👟'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                                <div className="text-xs text-gray-500">{item.color} · {item.material}</div>
                              </div>
                              <div className="text-[10px] text-gray-500 font-mono text-right max-w-[100px]">{item.why}</div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {tab === 'palette' && (
                        <motion.div key="palette" initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} transition={{duration:0.3}}
                          className="space-y-3">
                          {PALETTE_DATA.map((color, i) => (
                            <motion.div
                              key={color.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="flex items-center gap-4"
                            >
                              <div className="w-12 h-8 rounded-lg border border-gray-200 flex-shrink-0" style={{ backgroundColor: color.hex }} />
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900">{color.name}</div>
                                <div className="text-xs text-gray-500 font-mono">{color.hex}</div>
                              </div>
                              <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{color.role}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {tab === 'profile' && (
                        <motion.div key="profile" initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} transition={{duration:0.3}}
                          className="space-y-5">
                          <div className="p-4 rounded-xl bg-gray-900 text-white">
                            <div className="text-xs font-mono text-gray-400 mb-1">Style Archetype</div>
                            <div className="font-bold text-lg">{STYLE_PROFILE.archetype}</div>
                            <div className="text-sm text-gray-400 mt-1">{STYLE_PROFILE.energy}</div>
                          </div>
                          <div>
                            <div className="text-xs font-mono text-gray-500 mb-2">Lean Into</div>
                            <div className="flex flex-wrap gap-2">
                              {STYLE_PROFILE.lean.map((item, i) => (
                                <motion.span key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
                                  className="text-xs px-3 py-1.5 rounded-full bg-gray-900 text-white font-medium">{item}</motion.span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-mono text-gray-500 mb-2">Avoid</div>
                            <div className="flex flex-wrap gap-2">
                              {STYLE_PROFILE.avoid.map((item, i) => (
                                <motion.span key={item} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                                  className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-medium line-through decoration-gray-400">{item}</motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="px-6 pb-6">
                    <a href="#cta" className="btn-3d block w-full text-center py-3.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 transition-all duration-300">
                      Get Early Access →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Privacy badges */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          {['🔒 Photo never stored', '⚡ Instant analysis', '🛡️ Private by design'].map(badge => (
            <span key={badge} className="text-xs text-gray-500 font-mono">{badge}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
