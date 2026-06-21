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
  { x1: '18%', y1: '14%', x2: '82%', y2: '14%', label: 'Shoulders' },
  { x1: '28%', y1: '39%', x2: '72%', y2: '39%', label: 'Waist' },
  { x1: '22%', y1: '56%', x2: '78%', y2: '56%', label: 'Hips' },
]

const OUTFIT_DATA = {
  top:      { name: 'Structured Blazer',  color: 'Slate Grey', material: 'Wool Blend',   why: 'Balances inverted triangle' },
  bottom:   { name: 'Tapered Trousers',   color: 'Charcoal',   material: 'Cotton Twill',  why: 'Adds visual weight below' },
  footwear: { name: 'Chelsea Boots',       color: 'Tan',        material: 'Leather',        why: 'Grounds the silhouette' },
}

const PALETTE_DATA = [
  { name: 'Navy',   hex: '#1B2A4A', role: 'Base'      },
  { name: 'Camel',  hex: '#C4956A', role: 'Accent'    },
  { name: 'Ivory',  hex: '#F5F0E8', role: 'Highlight' },
  { name: 'Forest', hex: '#2D4A3E', role: 'Depth'     },
  { name: 'Slate',  hex: '#6B7280', role: 'Neutral'   },
]

const STYLE_PROFILE = {
  archetype: 'The Modern Classic',
  energy:    'Calm authority',
  avoid:     ['Loud prints', 'Oversized tops', 'Bold colors'],
  lean:      ['Monochromatic layering', 'Tailored cuts', 'Quality basics'],
}

const OUTFIT_ICONS = {
  top: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#6b6b78]">
      <path d="M12 5 L5 12 L10 15 L10 35 L30 35 L30 15 L35 12 L28 5 C28 5 25 8.5 20 8.5 C15 8.5 12 5 12 5Z" />
    </svg>
  ),
  bottom: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#6b6b78]">
      <path d="M7 7 L33 7 L29 35 L23 35 L20 20 L17 35 L11 35 Z" />
    </svg>
  ),
  footwear: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#6b6b78]">
      <path d="M5 25 C5 25 9 17 18 15 L27 15 L35 20 L35 25 C35 28 32 30 29 30 L7 30 C5.9 30 5 29.1 5 28 Z" />
      <path d="M18 15 L18 11 C18 9.9 18.9 9 20 9 L25 9" />
    </svg>
  ),
}

const UploadIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[#9ca3af]">
    <rect x="8" y="8" width="48" height="48" rx="12" />
    <circle cx="22" cy="22" r="5" />
    <path d="M8 40 L20 28 L28 36 L36 26 L56 44" />
  </svg>
)

const PersonIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" className="w-14 h-14">
    <circle cx="32" cy="18" r="10" />
    <path d="M10 58 C10 44 21 34 32 34 C43 34 54 44 54 58" />
  </svg>
)

const CrosshairIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" className="w-8 h-8">
    <circle cx="20" cy="20" r="12" />
    <path d="M4 20 L8 20 M32 20 L36 20 M20 4 L20 8 M20 32 L20 36" />
    <circle cx="20" cy="20" r="3" fill="#9ca3af" />
  </svg>
)

type State = 'idle' | 'scanning' | 'done'
type Tab   = 'outfit' | 'palette' | 'profile'

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
      }, 26)
      return () => clearInterval(id)
    }, delay)
    return () => clearTimeout(t)
  }, [active, text, delay])
  return displayed
}

export default function PerceptionLayer() {
  const [state, setState]       = useState<State>('idle')
  const [preview, setPreview]   = useState<string | null>(null)
  const [tab, setTab]           = useState<Tab>('outfit')
  const [isDragging, setIsDragging] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    setPreview(url)
    setState('scanning')
    setScanProgress(0)
    const start = Date.now()
    const tick = setInterval(() => {
      const p = Math.min(((Date.now() - start) / 2600) * 100, 100)
      setScanProgress(p)
      if (p >= 100) { clearInterval(tick); setState('done') }
    }, 40)
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
    setScanProgress(0)
    const start = Date.now()
    const tick = setInterval(() => {
      const p = Math.min(((Date.now() - start) / 2600) * 100, 100)
      setScanProgress(p)
      if (p >= 100) { clearInterval(tick); setState('done') }
    }, 40)
  }

  const reset = () => { setState('idle'); setPreview(null); setTab('outfit'); setScanProgress(0) }

  const bodyTypeText = useTypewriter(SAMPLE_RESULT.bodyType, state === 'done', 200)
  const skinToneText = useTypewriter(SAMPLE_RESULT.skinTone, state === 'done', 600)
  const vibeText     = useTypewriter(SAMPLE_RESULT.perceivedVibe, state === 'done', 1000)

  const SCAN_LABELS = ['Body Proportions', 'Skin Tone', 'Style Signals', 'Silhouette']
  const currentLabel = SCAN_LABELS[Math.floor((scanProgress / 100) * SCAN_LABELS.length)] ?? SCAN_LABELS[3]

  return (
    <section id="perception" className="py-20 sm:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #F4F3F0 100%)' }}>
      {/* Background decorative element */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, rgba(196,149,106,0.15) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] bg-white/70 text-[#6b6b78] text-[0.72rem] font-mono tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4956A]" />
            Perception Layer
          </div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-[#111318] mb-4 leading-[1.02] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            See Yourself <span className="shimmer-text">Differently.</span>
          </h2>
          <p className="text-[#6b6b78] text-lg max-w-xl mx-auto leading-[1.7] font-[350]">
            Upload a photo. GYF reads your proportions, palette, and presence — then builds a look designed exactly for your body.
          </p>
        </motion.div>

        {/* Main split */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-2 gap-6 items-start"
        >

          {/* LEFT: Upload zone */}
          <div className="space-y-4">
            <div className="text-[0.68rem] font-mono text-[#9ca3af] uppercase tracking-[0.14em] mb-3">Input</div>

            {state === 'idle' && (
              <motion.div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => inputRef.current?.click()}
                animate={{
                  scale: isDragging ? 1.015 : 1,
                  borderColor: isDragging ? 'rgba(17,19,24,0.3)' : 'rgba(17,19,24,0.1)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="border-2 border-dashed rounded-2xl p-8 sm:p-14 text-center cursor-pointer bg-white min-h-[280px] sm:min-h-[420px] flex flex-col items-center justify-center gap-6 group transition-all duration-300 hover:border-black/20 hover:bg-[#FAFAF8]"
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
                />

                <motion.div
                  animate={{ scale: isDragging ? 1.15 : 1, y: isDragging ? -4 : 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-20 h-20 rounded-2xl bg-[#F7F6F3] border border-black/[0.07] flex items-center justify-center group-hover:bg-[#F0EFE9] transition-colors"
                >
                  <UploadIcon />
                </motion.div>

                <div>
                  <p className="text-[#111318] font-semibold text-lg mb-1.5">Drop your photo here</p>
                  <p className="text-[#9ca3af] text-sm font-[350]">JPG or PNG — full body works best</p>
                </div>

                <div className="flex items-center gap-4 w-full max-w-xs">
                  <div className="h-px flex-1 bg-black/[0.07]" />
                  <span className="text-xs text-[#c4c4c8] font-mono">or</span>
                  <div className="h-px flex-1 bg-black/[0.07]" />
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); useSample() }}
                  className="bezel flex items-center gap-2 text-sm text-[#5a5a65] hover:text-[#111318] border border-black/[0.08] px-6 py-3 rounded-full transition-all duration-200 font-medium bg-white"
                >
                  Try sample demo
                  <span className="text-[#9ca3af]">→</span>
                </button>
              </motion.div>
            )}

            {(state === 'scanning' || state === 'done') && (
              <div className="rounded-2xl overflow-hidden bg-white border border-black/[0.08] min-h-[420px] relative shadow-[0_4px_24px_rgba(17,19,24,0.06)]">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="Your photo" className="w-full h-full object-cover" style={{ minHeight: '280px' }} />
                ) : (
                  <div className="w-full min-h-[280px] sm:min-h-[420px] bg-[#F7F6F3] flex items-center justify-center">
                    <div className="text-center text-[#9ca3af] py-12">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white border border-black/[0.06] flex items-center justify-center">
                        <PersonIcon />
                      </div>
                      <div className="text-xs font-mono text-[#c4c4c8] tracking-wide">sample_user.jpg</div>
                    </div>
                  </div>
                )}

                {/* Scanning overlay */}
                {state === 'scanning' && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="scan-line" />
                    <div className="absolute inset-0 bg-[#111318]/40 backdrop-blur-[3px] flex items-center justify-center">
                      <div className="text-center px-8">
                        {/* Progress ring */}
                        <div className="relative w-16 h-16 mx-auto mb-5">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                            <motion.circle
                              cx="32" cy="32" r="28"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeDasharray={`${2 * Math.PI * 28}`}
                              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scanProgress / 100)}`}
                              strokeLinecap="round"
                              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-xs font-mono font-semibold">{Math.round(scanProgress)}%</span>
                          </div>
                        </div>

                        <p className="text-white text-sm font-semibold mb-2">Analyzing…</p>
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={currentLabel}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="text-white/60 text-xs font-mono"
                          >
                            {currentLabel}
                          </motion.p>
                        </AnimatePresence>

                        {/* Analysis chips */}
                        <div className="mt-5 flex gap-1.5 justify-center flex-wrap">
                          {['Body Type', 'Skin Tone', 'Style Signals', 'Fit Map'].map((label, i) => (
                            <motion.span
                              key={label}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: scanProgress > i * 25 ? 1 : 0.25 }}
                              transition={{ duration: 0.4 }}
                              className="text-[0.65rem] text-white/80 font-mono px-2 py-0.5 rounded border border-white/20 bg-white/[0.08]"
                            >{label}</motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Measurement lines after scan */}
                {state === 'done' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {MEASUREMENT_LINES.map((line, i) => (
                        <motion.g key={line.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.2 }}>
                          <motion.line
                            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                            stroke="rgba(255,255,255,0.85)" strokeWidth="0.35"
                            strokeDasharray="100"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                          />
                          <motion.circle cx={line.x1} cy={line.y1} r="0.9" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.2, type: 'spring' }} />
                          <motion.circle cx={line.x2} cy={line.y2} r="0.9" fill="white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.2, type: 'spring' }} />
                        </motion.g>
                      ))}
                    </svg>
                    {MEASUREMENT_LINES.map((line, i) => (
                      <motion.div
                        key={line.label}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute text-[0.6rem] font-mono text-white/90 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded"
                        style={{ left: '83%', top: line.y1 }}
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
                className="w-full text-center text-xs text-[#9ca3af] hover:text-[#5a5a65] transition-colors py-2 font-mono tracking-wide"
              >
                ← Try another photo
              </motion.button>
            )}
          </div>

          {/* RIGHT: Analysis panel */}
          <div>
            <div className="text-[0.68rem] font-mono text-[#9ca3af] uppercase tracking-[0.14em] mb-3">Analysis</div>

            <AnimatePresence mode="wait">
              {state !== 'done' ? (
                <motion.div
                  key="empty"
                  exit={{ opacity: 0, y: -8 }}
                  className="min-h-[280px] sm:min-h-[420px] flex flex-col items-center justify-center rounded-2xl border border-black/[0.08] bg-white gap-5 text-center p-10"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="opacity-50"
                  >
                    <CrosshairIcon />
                  </motion.div>
                  <div>
                    <p className="text-[#111318] font-semibold mb-1.5 text-[0.9375rem]">Upload a photo to begin</p>
                    <p className="text-[#9ca3af] text-sm font-mono">Analysis appears here →</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-black/[0.08] bg-white shadow-[0_4px_24px_rgba(17,19,24,0.06)] overflow-hidden"
                >
                  {/* Summary row */}
                  <div className="p-6 border-b border-black/[0.05]">
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        { label: 'Body Type',   value: bodyTypeText },
                        { label: 'Skin Tone',   value: skinToneText },
                        { label: 'Style Vibe',  value: vibeText },
                      ].map((item) => (
                        <div key={item.label} className="bg-[#F7F6F3] rounded-xl p-3">
                          <div className="text-[0.62rem] text-[#9ca3af] font-mono mb-1.5 uppercase tracking-wide">{item.label}</div>
                          <div className="text-[0.8125rem] text-[#111318] font-semibold min-h-[1.1rem] leading-snug">
                            {item.value}
                            <span className="inline-block w-px h-3 bg-[#111318] ml-0.5 animate-pulse align-middle" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-[#F4F3F0] rounded-xl p-1">
                      {(['outfit', 'palette', 'profile'] as Tab[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTab(t)}
                          className={`flex-1 text-[0.72rem] font-semibold py-2 rounded-lg transition-all duration-200 capitalize ${
                            tab === t
                              ? 'bg-white text-[#111318] shadow-[0_1px_4px_rgba(17,19,24,0.08)]'
                              : 'text-[#9ca3af] hover:text-[#5a5a65]'
                          }`}
                        >
                          {t === 'outfit' ? 'Outfit' : t === 'palette' ? 'Palette' : 'Profile'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab content */}
                  <div className="p-6">
                    <AnimatePresence mode="wait">

                      {tab === 'outfit' && (
                        <motion.div key="outfit" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}
                          className="space-y-2.5">
                          {Object.entries(OUTFIT_DATA).map(([key, item], i) => (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                              whileHover={{ x: 2 }}
                              className="flex items-center gap-4 p-3.5 rounded-xl bg-[#F7F6F3] border border-black/[0.05] hover:border-black/10 transition-all cursor-default"
                            >
                              <div className="w-10 h-10 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center flex-shrink-0">
                                {OUTFIT_ICONS[key as keyof typeof OUTFIT_ICONS]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-[#111318]">{item.name}</div>
                                <div className="text-xs text-[#9ca3af] mt-0.5">{item.color} · {item.material}</div>
                              </div>
                              <div className="text-[0.65rem] text-[#9ca3af] font-mono text-right max-w-[90px] leading-snug">{item.why}</div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {tab === 'palette' && (
                        <motion.div key="palette" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}
                          className="space-y-3">
                          {PALETTE_DATA.map((color, i) => (
                            <motion.div
                              key={color.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.07 }}
                              whileHover={{ x: 3 }}
                              className="flex items-center gap-4 cursor-default"
                            >
                              <motion.div
                                whileHover={{ scale: 1.08 }}
                                className="w-14 h-9 rounded-lg border border-black/[0.08] flex-shrink-0 shadow-sm"
                                style={{ backgroundColor: color.hex }}
                              />
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-[#111318]">{color.name}</div>
                                <div className="text-[0.7rem] text-[#9ca3af] font-mono">{color.hex}</div>
                              </div>
                              <span className="text-[0.65rem] font-mono text-[#9ca3af] bg-[#F4F3F0] px-2 py-0.5 rounded-full">{color.role}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {tab === 'profile' && (
                        <motion.div key="profile" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}
                          className="space-y-5">
                          <div className="p-4 rounded-xl bg-[#111318] text-white">
                            <div className="text-[0.68rem] font-mono text-white/40 mb-1.5 uppercase tracking-wide">Style Archetype</div>
                            <div className="font-bold text-lg leading-snug">{STYLE_PROFILE.archetype}</div>
                            <div className="text-sm text-white/50 mt-1">{STYLE_PROFILE.energy}</div>
                          </div>
                          <div>
                            <div className="text-[0.68rem] font-mono text-[#9ca3af] mb-2.5 uppercase tracking-wide">Lean Into</div>
                            <div className="flex flex-wrap gap-2">
                              {STYLE_PROFILE.lean.map((item, i) => (
                                <motion.span key={item} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
                                  className="text-xs px-3 py-1.5 rounded-full bg-[#111318] text-white font-medium">{item}</motion.span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-[0.68rem] font-mono text-[#9ca3af] mb-2.5 uppercase tracking-wide">Avoid</div>
                            <div className="flex flex-wrap gap-2">
                              {STYLE_PROFILE.avoid.map((item, i) => (
                                <motion.span key={item} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 + i * 0.08 }}
                                  className="text-xs px-3 py-1.5 rounded-full bg-[#F4F3F0] text-[#9ca3af] font-medium line-through decoration-[#c4c4c8]">{item}</motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="px-6 pb-6">
                    <a href="#cta" className="btn-3d block w-full text-center py-3.5 rounded-xl bg-[#111318] text-white font-semibold text-sm hover:bg-[#1e2230]">
                      Get Early Access →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Privacy badges — no emojis */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-6 justify-center"
        >
          {[
            { icon: '⬡', text: 'Photo never stored' },
            { icon: '◈', text: 'Instant analysis' },
            { icon: '◉', text: 'Private by design' },
          ].map(badge => (
            <span key={badge.text} className="text-xs text-[#9ca3af] font-mono flex items-center gap-2">
              <span className="text-[#c4c4c8]">{badge.icon}</span>
              {badge.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
