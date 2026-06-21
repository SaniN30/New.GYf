'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

// ─── Data ──────────────────────────────────────────────────────

const SAMPLE_RESULT = {
  bodyType: 'Inverted Triangle',
  skinTone: 'Warm Medium',
  perceivedVibe: 'Classic / Minimal',
}

const MEASUREMENT_LINES = [
  { x1: '18%', y1: '14%', x2: '82%', y2: '14%', label: 'Shoulders' },
  { x1: '28%', y1: '39%', x2: '72%', y2: '39%', label: 'Waist'     },
  { x1: '22%', y1: '56%', x2: '78%', y2: '56%', label: 'Hips'      },
]

const OUTFIT_DATA = {
  top:      { name: 'Structured Blazer',  color: 'Slate Grey', material: 'Wool Blend',  why: 'Balances inverted triangle' },
  bottom:   { name: 'Tapered Trousers',   color: 'Charcoal',   material: 'Cotton Twill', why: 'Adds visual weight below'  },
  footwear: { name: 'Chelsea Boots',       color: 'Tan',        material: 'Leather',       why: 'Grounds the silhouette'   },
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

const SCAN_STAGES = [
  { label: 'Detecting body proportions', pct: 0   },
  { label: 'Mapping silhouette',         pct: 25  },
  { label: 'Analysing skin tone',        pct: 50  },
  { label: 'Reading style signals',      pct: 72  },
  { label: 'Building outfit profile',   pct: 88  },
  { label: 'Complete',                   pct: 100 },
]

// ─── SVG Icons ──────────────────────────────────────────────────

const UploadIcon = () => (
  <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9">
    <rect x="6" y="6" width="44" height="44" rx="12" />
    <circle cx="19" cy="20" r="5" />
    <path d="M6 38 L18 26 L25 33 L33 23 L50 38" />
  </svg>
)

const PersonSilhouette = () => (
  <svg viewBox="0 0 80 120" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="w-20 h-28 text-[#c4c4c8]">
    <circle cx="40" cy="18" r="12" />
    <path d="M16 50 C16 35 27 28 40 28 C53 28 64 35 64 50 L60 85 L50 85 L48 65 L40 65 L32 65 L30 85 L20 85 Z" />
    <path d="M20 85 L18 115" />
    <path d="M60 85 L62 115" />
    <path d="M30 85 L30 115" />
    <path d="M50 85 L50 115" />
  </svg>
)

const ShirtIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 3 L4 8 L8 11 L8 25 L20 25 L20 11 L24 8 L19 3 C19 3 17 6 14 6 C11 6 9 3 9 3Z" />
  </svg>
)

const TrousersIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M5 5 L23 5 L20 25 L16 25 L14 15 L12 25 L8 25 Z" />
  </svg>
)

const ShoeIcon = () => (
  <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 19 C3 19 6 13 13 11 L20 11 L25 15 L25 19 C25 21.2 23.2 23 21 23 L5 23 C3.9 23 3 22.1 3 21 Z" />
    <path d="M13 11 L13 8 C13 7 13.9 6 15 6 L19 6" />
  </svg>
)

const OUTFIT_ICONS = { top: ShirtIcon, bottom: TrousersIcon, footwear: ShoeIcon }

// ─── Hook ────────────────────────────────────────────────────────

function useTypewriter(text: string, active: boolean, delay = 0, speed = 24) {
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
      }, speed)
      return () => clearInterval(id)
    }, delay)
    return () => clearTimeout(t)
  }, [active, text, delay, speed])
  return displayed
}

// ─── Types ───────────────────────────────────────────────────────

type AppState = 'idle' | 'scanning' | 'done'
type Tab      = 'outfit' | 'palette' | 'profile'

// ─── Sub-components ──────────────────────────────────────────────

function MacWindowChrome({ title, onClose }: { title: string; onClose?: () => void }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.07] bg-[#F4F3F0]/80 rounded-t-2xl select-none">
      <button onClick={onClose}
        className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-90 transition-all group relative" title="Close">
        <span className="absolute inset-0 flex items-center justify-center text-[#8B0000] text-[7px] font-bold opacity-0 group-hover:opacity-100">✕</span>
      </button>
      <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
      <div className="w-3 h-3 rounded-full bg-[#28C840]" />
      <span className="ml-3 text-[0.7rem] text-[#9ca3af] font-medium tracking-wide">{title}</span>
    </div>
  )
}

function AnalysisTabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'outfit',  label: 'Outfit'  },
    { id: 'palette', label: 'Palette' },
    { id: 'profile', label: 'Profile' },
  ]
  return (
    <div className="flex border-b border-black/[0.06] bg-[#F9F8F6]">
      {tabs.map((t) => (
        <button key={t.id} onClick={() => setTab(t.id)}
          className={`relative px-5 py-3 text-[0.75rem] font-medium transition-colors duration-150 ${tab === t.id ? 'text-[#111318]' : 'text-[#9ca3af] hover:text-[#5a5a65]'}`}>
          {t.label}
          {tab === t.id && (
            <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#111318]" />
          )}
        </button>
      ))}
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────

export default function PerceptionLayer() {
  const [state, setState]           = useState<AppState>('idle')
  const [preview, setPreview]       = useState<string | null>(null)
  const [tab, setTab]               = useState<Tab>('outfit')
  const [isDragging, setIsDragging] = useState(false)
  const [scanPct, setScanPct]       = useState(0)
  const [stageIdx, setStageIdx]     = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentStage = SCAN_STAGES[Math.min(stageIdx, SCAN_STAGES.length - 1)]

  const runScan = useCallback(() => {
    setScanPct(0); setStageIdx(0); setState('scanning')
    const start = Date.now()
    const total = 2800
    const tick = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / total) * 100, 100)
      setScanPct(pct)
      const si = SCAN_STAGES.findIndex(s => s.pct > pct)
      setStageIdx(si === -1 ? SCAN_STAGES.length - 1 : Math.max(0, si - 1))
      if (elapsed >= total) {
        clearInterval(tick)
        setScanPct(100); setStageIdx(SCAN_STAGES.length - 1)
        setTimeout(() => setState('done'), 200)
      }
    }, 40)
  }, [])

  const handleFile = useCallback((file: File) => {
    setPreview(URL.createObjectURL(file))
    runScan()
  }, [runScan])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f?.type.startsWith('image/')) handleFile(f)
  }

  const reset = () => { setState('idle'); setPreview(null); setTab('outfit'); setScanPct(0) }

  const bodyTypeText = useTypewriter(SAMPLE_RESULT.bodyType,      state === 'done', 100)
  const skinToneText = useTypewriter(SAMPLE_RESULT.skinTone,      state === 'done', 500)
  const vibeText     = useTypewriter(SAMPLE_RESULT.perceivedVibe, state === 'done', 950)

  // Subtle floating spring for the window
  const wx = useMotionValue(0)
  const wy = useMotionValue(0)
  const sx = useSpring(wx, { stiffness: 60, damping: 18 })
  const sy = useSpring(wy, { stiffness: 60, damping: 18 })

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2
      wx.set((e.clientX - cx) * 0.006)
      wy.set((e.clientY - cy) * 0.004)
    }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [wx, wy])

  return (
    <section id="perception" className="py-20 sm:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1a1b20 0%, #0d0e11 100%)' }}>

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute top-[-120px] left-1/4 w-[700px] h-[700px] rounded-full opacity-[0.1] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #C4956A, transparent 70%)' }} />
      <div className="pointer-events-none absolute bottom-[-100px] right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[100px]"
        style={{ background: 'radial-gradient(circle, #7B8FBF, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-white/45 text-[0.72rem] font-mono tracking-wide mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4956A]" />
            Perception Layer
          </div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-white mb-4 leading-[1.02] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            See Yourself{' '}
            <span className="bg-gradient-to-r from-[#C4956A] via-[#E8C49A] to-[#C4956A] bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'shimmer-text-move 3s linear infinite' }}>
              Differently.
            </span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-[1.75] font-[350]">
            Upload a photo — GYF reads your proportions, palette, and presence, then builds a look designed for your exact body.
          </p>
        </motion.div>

        {/* macOS Window */}
        <motion.div
          initial={{ opacity: 0, y: 52, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ x: sx, y: sy }}
          className="mx-auto max-w-5xl"
        >
          <div className="rounded-2xl overflow-hidden shadow-[0_48px_120px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)]"
            style={{ background: 'rgba(246,245,242,0.98)' }}>

            <MacWindowChrome title="GYF Perception Layer — Analysis" onClose={reset} />

            <div className="flex flex-col lg:flex-row" style={{ minHeight: 520 }}>

              {/* ── LEFT: Input pane ── */}
              <div className="lg:w-[52%] border-r border-black/[0.06] flex flex-col">
                <div className="px-5 pt-4 pb-2">
                  <span className="text-[0.62rem] font-mono text-[#c4c4c8] uppercase tracking-[0.14em]">Input</span>
                </div>

                <AnimatePresence mode="wait">

                  {/* Idle */}
                  {state === 'idle' && (
                    <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.25 }} className="flex-1 flex flex-col items-center justify-center p-8">
                      <motion.div
                        onDrop={handleDrop}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                        onDragLeave={() => setIsDragging(false)}
                        onClick={() => inputRef.current?.click()}
                        animate={{
                          borderColor: isDragging ? 'rgba(196,149,106,0.55)' : 'rgba(17,19,24,0.1)',
                          scale: isDragging ? 1.012 : 1,
                          backgroundColor: isDragging ? 'rgba(196,149,106,0.03)' : 'transparent',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="w-full border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-5 cursor-pointer min-h-[320px] hover:border-black/20 transition-colors"
                      >
                        <input ref={inputRef} type="file" accept="image/*" className="hidden"
                          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />

                        <motion.div
                          animate={{ y: isDragging ? -6 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                          className="w-16 h-16 rounded-xl bg-white border border-black/[0.07] shadow-sm flex items-center justify-center text-[#c4c4c8]"
                        >
                          <UploadIcon />
                        </motion.div>

                        <div className="text-center">
                          <p className="text-[#111318] font-semibold text-[0.9375rem] mb-1.5">Drop photo here</p>
                          <p className="text-[#9ca3af] text-[0.8125rem] font-[350]">JPG or PNG — full body works best</p>
                        </div>

                        <div className="flex items-center gap-4 w-full max-w-[180px]">
                          <div className="h-px flex-1 bg-black/[0.07]" />
                          <span className="text-[0.68rem] text-[#c4c4c8] font-mono">or</span>
                          <div className="h-px flex-1 bg-black/[0.07]" />
                        </div>

                        {/* Sample demo button — with shine + spring */}
                        <motion.button
                          onClick={(e) => { e.stopPropagation(); runScan() }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95, y: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                          className="relative overflow-hidden group flex items-center gap-2.5 text-[0.8125rem] font-semibold text-[#111318] border border-black/[0.12] px-6 py-3 rounded-full bg-white shadow-[0_2px_8px_rgba(17,19,24,0.06)]"
                        >
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.45, ease: 'easeInOut' }}
                          />
                          <span className="relative flex h-2 w-2 flex-shrink-0">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4956A] opacity-60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C4956A]" />
                          </span>
                          Try sample demo
                          <motion.span
                            className="text-[#9ca3af] text-xs"
                            animate={{ x: 0 }}
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.15 }}
                          >→</motion.span>
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Scanning */}
                  {state === 'scanning' && (
                    <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex-1 relative overflow-hidden" style={{ minHeight: 360 }}>
                      {preview
                        ? <img src={preview} alt="Input" className="absolute inset-0 w-full h-full object-cover" /> // eslint-disable-line @next/next/no-img-element
                        : <div className="absolute inset-0 bg-[#F0EFE9] flex items-center justify-center"><PersonSilhouette /></div>
                      }
                      <div className="absolute inset-0 bg-[#111318]/52 backdrop-blur-[2px]" />

                      {/* Animated scan beam */}
                      <motion.div
                        className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(196,149,106,0.9) 40%, rgba(255,210,160,1) 50%, rgba(196,149,106,0.9) 60%, transparent)' }}
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 2.8, ease: 'linear' }}
                      >
                        <div className="absolute inset-x-0 -bottom-8 h-16 blur-3xl opacity-35"
                          style={{ background: 'linear-gradient(to bottom, rgba(196,149,106,0.5), transparent)' }} />
                      </motion.div>

                      {/* Corner brackets */}
                      {[['top-3 left-3', 'border-t-2 border-l-2'], ['top-3 right-3', 'border-t-2 border-r-2'], ['bottom-3 left-3', 'border-b-2 border-l-2'], ['bottom-3 right-3', 'border-b-2 border-r-2']].map(([pos, bdr], bi) => (
                        <motion.div key={bi} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: bi * 0.07, type: 'spring' }}
                          className={`absolute ${pos} w-5 h-5 ${bdr} border-[#C4956A]/70`} />
                      ))}

                      {/* HUD */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="text-center px-7 py-5 rounded-2xl bg-black/45 backdrop-blur-xl border border-white/[0.09]">
                          <div className="relative w-14 h-14 mx-auto mb-3.5">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
                              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                              <motion.circle cx="28" cy="28" r="22" fill="none" stroke="#C4956A" strokeWidth="2.5" strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 22}`}
                                strokeDashoffset={`${2 * Math.PI * 22 * (1 - scanPct / 100)}`}
                                style={{ transition: 'stroke-dashoffset 0.08s linear' }} />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white text-xs font-mono font-semibold">{Math.round(scanPct)}%</span>
                            </div>
                          </div>
                          <AnimatePresence mode="wait">
                            <motion.p key={currentStage.label} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}
                              className="text-white/75 text-[0.72rem] font-mono">{currentStage.label}</motion.p>
                          </AnimatePresence>
                          <div className="mt-3.5 flex gap-1.5 justify-center">
                            {SCAN_STAGES.slice(0, -1).map((s, si) => (
                              <motion.span key={s.label}
                                animate={{
                                  backgroundColor: scanPct >= s.pct ? 'rgba(196,149,106,0.28)' : 'rgba(255,255,255,0.05)',
                                  borderColor: scanPct >= s.pct ? 'rgba(196,149,106,0.55)' : 'rgba(255,255,255,0.1)',
                                  color: scanPct >= s.pct ? '#E8C49A' : 'rgba(255,255,255,0.3)',
                                }}
                                transition={{ duration: 0.35 }}
                                className="text-[0.6rem] font-mono w-5 h-5 flex items-center justify-center rounded border"
                              >{si + 1}</motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Done */}
                  {state === 'done' && (
                    <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex-1 relative overflow-hidden" style={{ minHeight: 360 }}>
                      {preview
                        ? <img src={preview} alt="Input" className="absolute inset-0 w-full h-full object-cover" /> // eslint-disable-line @next/next/no-img-element
                        : <div className="absolute inset-0 bg-[#F0EFE9] flex items-center justify-center"><PersonSilhouette /></div>
                      }
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.12), transparent 30%, transparent 70%, rgba(0,0,0,0.12))' }} />

                      {/* Measurement lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          {MEASUREMENT_LINES.map((line, i) => (
                            <motion.g key={line.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.25 }}>
                              <motion.line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                                stroke="rgba(255,255,255,0.65)" strokeWidth="0.3" strokeDasharray="2 1.5"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.7, delay: 0.3 + i * 0.25, ease: [0.16, 1, 0.3, 1] }} />
                              <motion.circle cx={line.x1} cy={line.y1} r="0.8" fill="#C4956A"
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 + i * 0.25, type: 'spring' }} />
                              <motion.circle cx={line.x2} cy={line.y2} r="0.8" fill="#C4956A"
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 + i * 0.25, type: 'spring' }} />
                            </motion.g>
                          ))}
                        </svg>
                        {MEASUREMENT_LINES.map((line, i) => (
                          <motion.div key={line.label} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute text-[0.6rem] font-mono text-white bg-black/55 backdrop-blur-sm px-1.5 py-0.5 rounded"
                            style={{ left: '83%', top: line.y1 }}>
                            {line.label}
                          </motion.div>
                        ))}
                      </div>

                      {/* Bottom bar */}
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
                        className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-black/50 backdrop-blur-md border-t border-white/[0.07] flex items-center justify-between">
                        <span className="text-[0.68rem] text-white/55 font-mono">Analysis complete</span>
                        <button onClick={reset} className="text-[0.68rem] text-[#C4956A] font-mono hover:text-[#E8C49A] transition-colors">← Reset</button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── RIGHT: Analysis pane ── */}
              <div className="lg:w-[48%] flex flex-col">
                <AnimatePresence mode="wait">

                  {/* Empty / scanning right pane */}
                  {state !== 'done' && (
                    <motion.div key="empty-panel" exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-5">
                      <div className="relative w-20 h-20">
                        {[0, 1, 2].map((ring) => (
                          <motion.div key={ring} className="absolute inset-0 rounded-full border border-black/[0.06]"
                            animate={{ scale: [1, 1.18 + ring * 0.14, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2.6 + ring * 0.4, repeat: Infinity, delay: ring * 0.55 }} />
                        ))}
                        <div className="absolute inset-0 rounded-full bg-[#F4F3F0] border border-black/[0.07] flex items-center justify-center">
                          <svg viewBox="0 0 40 40" fill="none" stroke="#c4c4c8" strokeWidth="1.2" strokeLinecap="round" className="w-10 h-10">
                            <circle cx="20" cy="12" r="6" />
                            <path d="M8 38 C8 28 13 22 20 22 C27 22 32 28 32 38" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-[#111318] font-semibold text-[0.9375rem] mb-1.5">Analysis appears here</p>
                        <p className="text-[#c4c4c8] text-[0.78rem] font-mono">Upload a photo or try the demo</p>
                      </div>
                      {state === 'scanning' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xs mt-2">
                          <div className="h-1 bg-black/[0.05] rounded-full overflow-hidden">
                            <motion.div className="h-full bg-[#C4956A] rounded-full"
                              animate={{ width: `${scanPct}%` }} transition={{ duration: 0.08 }} />
                          </div>
                          <motion.p
                            key={currentStage.label}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-[0.68rem] text-[#9ca3af] font-mono mt-2 text-center"
                          >{currentStage.label}</motion.p>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Results */}
                  {state === 'done' && (
                    <motion.div key="results-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }} className="flex-1 flex flex-col">

                      {/* Summary chips */}
                      <div className="px-5 pt-5 pb-4 border-b border-black/[0.06]">
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: 'Body Type',  value: bodyTypeText },
                            { label: 'Skin Tone',  value: skinToneText },
                            { label: 'Style Vibe', value: vibeText     },
                          ].map((item, i) => (
                            <motion.div key={item.label}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="bg-[#F4F3F0] rounded-xl px-3 py-2.5">
                              <div className="text-[0.57rem] text-[#c4c4c8] font-mono uppercase tracking-wide mb-1">{item.label}</div>
                              <div className="text-[0.78rem] text-[#111318] font-semibold min-h-[1rem] leading-snug">
                                {item.value}
                                <span className="inline-block w-px h-3 bg-[#C4956A] ml-0.5 animate-pulse align-middle" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <AnalysisTabs tab={tab} setTab={setTab} />

                      {/* Tab content */}
                      <div className="flex-1 overflow-auto p-5">
                        <AnimatePresence mode="wait">

                          {tab === 'outfit' && (
                            <motion.div key="outfit" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}
                              className="space-y-2">
                              {Object.entries(OUTFIT_DATA).map(([key, item], i) => {
                                const Icon = OUTFIT_ICONS[key as keyof typeof OUTFIT_ICONS]
                                return (
                                  <motion.div key={key}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    whileHover={{ x: 3 }}
                                    className="flex items-center gap-3.5 p-3 rounded-xl bg-[#F9F8F6] border border-black/[0.05] hover:border-black/10 transition-all cursor-default">
                                    <div className="w-9 h-9 rounded-lg bg-white border border-black/[0.07] flex items-center justify-center flex-shrink-0 text-[#9ca3af]">
                                      <Icon />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="text-[0.8125rem] font-semibold text-[#111318]">{item.name}</div>
                                      <div className="text-[0.68rem] text-[#c4c4c8] mt-0.5">{item.color} · {item.material}</div>
                                    </div>
                                    <div className="text-[0.62rem] text-[#c4c4c8] font-mono text-right max-w-[80px] shrink-0 leading-snug">{item.why}</div>
                                  </motion.div>
                                )
                              })}
                            </motion.div>
                          )}

                          {tab === 'palette' && (
                            <motion.div key="palette" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}
                              className="space-y-2.5">
                              {PALETTE_DATA.map((color, i) => (
                                <motion.div key={color.name}
                                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.08 }} whileHover={{ x: 3 }}
                                  className="flex items-center gap-3.5 cursor-default">
                                  <motion.div whileHover={{ scale: 1.1, rotate: 2 }}
                                    className="w-12 h-8 rounded-lg border border-black/[0.08] shadow-sm flex-shrink-0"
                                    style={{ backgroundColor: color.hex }} />
                                  <div className="flex-1">
                                    <div className="text-[0.8125rem] font-semibold text-[#111318]">{color.name}</div>
                                    <div className="text-[0.68rem] text-[#c4c4c8] font-mono">{color.hex}</div>
                                  </div>
                                  <span className="text-[0.62rem] font-mono text-[#c4c4c8] bg-[#F4F3F0] px-2 py-0.5 rounded-full shrink-0">{color.role}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}

                          {tab === 'profile' && (
                            <motion.div key="profile" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}
                              className="space-y-4">
                              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-[#111318] text-white">
                                <div className="text-[0.6rem] font-mono text-white/30 mb-1.5 uppercase tracking-wide">Style Archetype</div>
                                <div className="font-bold text-base leading-snug">{STYLE_PROFILE.archetype}</div>
                                <div className="text-[0.78rem] text-white/45 mt-1">{STYLE_PROFILE.energy}</div>
                              </motion.div>
                              <div>
                                <div className="text-[0.6rem] font-mono text-[#c4c4c8] mb-2.5 uppercase tracking-wide">Lean Into</div>
                                <div className="flex flex-wrap gap-1.5">
                                  {STYLE_PROFILE.lean.map((item, i) => (
                                    <motion.span key={item} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: i * 0.08 }}
                                      className="text-[0.72rem] px-3 py-1.5 rounded-full bg-[#111318] text-white font-medium">{item}</motion.span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-[0.6rem] font-mono text-[#c4c4c8] mb-2.5 uppercase tracking-wide">Avoid</div>
                                <div className="flex flex-wrap gap-1.5">
                                  {STYLE_PROFILE.avoid.map((item, i) => (
                                    <motion.span key={item} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.25 + i * 0.08 }}
                                      className="text-[0.72rem] px-3 py-1.5 rounded-full bg-[#F4F3F0] text-[#c4c4c8] font-medium line-through decoration-[#d4d4d8]">{item}</motion.span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}

                        </AnimatePresence>
                      </div>

                      {/* CTA */}
                      <div className="px-5 pb-5 pt-3 border-t border-black/[0.05]">
                        <motion.a href="#cta" whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.99 }}
                          className="btn-3d block w-full text-center py-3 rounded-xl bg-[#111318] text-white font-semibold text-[0.8125rem] hover:bg-[#1e2230]">
                          Get Early Access →
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-black/[0.05] bg-[#F4F3F0]/60">
              <div className="flex items-center gap-2.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  animate={{ backgroundColor: state === 'done' ? '#28C840' : state === 'scanning' ? '#FEBC2E' : '#c4c4c8' }}
                  transition={{ duration: 0.4 }}
                />
                <span className="text-[0.62rem] text-[#9ca3af] font-mono">
                  {state === 'idle' ? 'Ready' : state === 'scanning' ? `Analysing… ${Math.round(scanPct)}%` : 'Analysis complete'}
                </span>
              </div>
              <span className="text-[0.62rem] text-[#c4c4c8] font-mono">GYF Perception Engine v1</span>
            </div>
          </div>
        </motion.div>

        {/* Privacy row */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-6 justify-center">
          {[
            { sym: '⬡', text: 'Photo never stored' },
            { sym: '◈', text: 'Instant analysis'   },
            { sym: '◉', text: 'Private by design'  },
          ].map(b => (
            <span key={b.text} className="flex items-center gap-2 text-[0.72rem] text-white/28 font-mono">
              <span className="text-white/18">{b.sym}</span>{b.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
