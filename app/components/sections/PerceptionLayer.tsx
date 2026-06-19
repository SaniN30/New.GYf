'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ── Types ────────────────────────────────────────────────────────
type Phase = 'idle' | 'uploading' | 'scanning' | 'analyzing' | 'done'

interface AnalysisResult {
  bodyType: string
  skinTone: string
  vibe: string
  palette: string[]
  tips: string[]
  outfitScore: number
}

const RESULT: AnalysisResult = {
  bodyType: 'Inverted Triangle',
  skinTone: 'Warm Medium',
  vibe: 'Classic / Minimal',
  palette: ['Navy', 'Camel', 'Ivory', 'Forest Green'],
  tips: [
    'Structured shoulders work with your build',
    'Mid-rise bottoms create visual balance',
    'Avoid oversized tops — elongate instead',
  ],
  outfitScore: 94,
}

// Streaming text hook — reveals text char by char
function useTypewriter(text: string, active: boolean, speed = 18) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    let i = 0
    setDisplayed('')
    const id = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, active, speed])
  return displayed
}

// ── Scanning overlay component ──────────────────────────────────
function ScanOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
          {/* Purple tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/20 to-[#EC4899]/20" />
          {/* Scanning line */}
          <motion.div
            initial={{ top: '0%' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent"
            style={{ boxShadow: '0 0 12px 4px rgba(124,58,237,0.6)' }}
          />
          {/* Corner brackets */}
          {[
            'top-3 left-3 border-t-2 border-l-2',
            'top-3 right-3 border-t-2 border-r-2',
            'bottom-3 left-3 border-b-2 border-l-2',
            'bottom-3 right-3 border-b-2 border-r-2',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`absolute w-5 h-5 border-[#7C3AED] ${cls}`}
            />
          ))}
          {/* Status text */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-[10px] font-mono text-[#7C3AED] bg-white/90 px-3 py-1 rounded-full border border-purple-200">
              Scanning body...
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Body landmark dots ──────────────────────────────────────────
const LANDMARKS = [
  { top: '18%', left: '50%', label: 'Shoulders' },
  { top: '35%', left: '50%', label: 'Torso' },
  { top: '55%', left: '35%', label: 'Hip' },
  { top: '55%', left: '65%', label: 'Hip' },
  { top: '75%', left: '42%', label: 'Leg' },
]

function LandmarkDots({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && LANDMARKS.map((lm, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ delay: i * 0.12, type: 'spring', stiffness: 300 }}
          className="absolute z-20 pointer-events-none"
          style={{ top: lm.top, left: lm.left, transform: 'translate(-50%, -50%)' }}>
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] border-2 border-white shadow-md" />
            <div className="absolute inset-0 rounded-full bg-[#7C3AED]/40 animate-ping" />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

// ── Status bar ──────────────────────────────────────────────────
const STATUS_STEPS = [
  { phase: 'uploading', label: 'Uploading photo...' },
  { phase: 'scanning',  label: 'Scanning body proportions...' },
  { phase: 'analyzing', label: 'Analyzing style signals...' },
  { phase: 'done',      label: 'Analysis complete' },
]

function StatusBar({ phase }: { phase: Phase }) {
  const idx = STATUS_STEPS.findIndex(s => s.phase === phase)
  if (phase === 'idle') return null
  return (
    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mt-3">
      {phase !== 'done' && (
        <motion.div
          className="w-3 h-3 border-2 border-[#7C3AED] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {phase === 'done' && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
          <span className="text-white text-[8px]">✓</span>
        </motion.div>
      )}
      <motion.span
        key={phase}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={phase === 'done' ? 'text-green-600' : 'text-[#7C3AED]'}>
        {STATUS_STEPS[idx]?.label ?? ''}
      </motion.span>
      {phase !== 'done' && (
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-gray-400">
          ...
        </motion.span>
      )}
    </div>
  )
}

// ── Result panel ────────────────────────────────────────────────
function ResultPanel({ result, active }: { result: AnalysisResult; active: boolean }) {
  const vibe = useTypewriter(result.vibe, active, 25)
  const bodyType = useTypewriter(result.bodyType, active, 20)

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Score */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={active ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
        <div>
          <div className="text-xs text-gray-400 font-mono mb-0.5">Style Match Score</div>
          <div className="text-2xl font-black gradient-text">{result.outfitScore}%</div>
        </div>
        <div className="w-12 h-12 rounded-full border-4 border-purple-200 flex items-center justify-center relative">
          <motion.svg className="absolute inset-0" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#EDE9FE" strokeWidth="4" />
            <motion.circle
              cx="24" cy="24" r="20" fill="none" stroke="#7C3AED" strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
              animate={active ? { strokeDashoffset: 2 * Math.PI * 20 * (1 - result.outfitScore / 100) } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
          </motion.svg>
          <span className="text-xs font-bold text-[#7C3AED] z-10">✦</span>
        </div>
      </motion.div>

      {/* Body type */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }}
        className="p-4 rounded-2xl bg-white border border-gray-100">
        <div className="text-xs text-gray-400 font-mono mb-1">Body Type</div>
        <div className="font-bold text-[#0F0A1E] text-lg">{bodyType}<span className="animate-pulse">|</span></div>
      </motion.div>

      {/* Skin + vibe */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Skin Tone', value: result.skinTone, delay: 0.5 },
          { label: 'Style Vibe', value: vibe, delay: 0.6 },
        ].map(item => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: item.delay }}
            className="p-3 rounded-xl bg-white border border-gray-100">
            <div className="text-[10px] text-gray-400 font-mono mb-1">{item.label}</div>
            <div className="text-sm font-semibold text-[#0F0A1E]">{item.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Palette */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.75 }}
        className="p-4 rounded-2xl bg-white border border-gray-100">
        <div className="text-xs text-gray-400 font-mono mb-3">Recommended Palette</div>
        <div className="flex gap-2 flex-wrap">
          {result.palette.map((c, i) => (
            <motion.span key={c} initial={{ opacity: 0, scale: 0.8 }} animate={active ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.8 + i * 0.07 }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 border border-purple-100 text-[#7C3AED]">
              {c}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Stylist tips */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 }}
        className="p-4 rounded-2xl bg-white border border-gray-100">
        <div className="text-xs text-gray-400 font-mono mb-3">Stylist Notes</div>
        <ul className="space-y-2">
          {result.tips.map((tip, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={active ? { opacity: 1, x: 0 } : {}} transition={{ delay: 1 + i * 0.12 }}
              className="flex items-start gap-2 text-xs text-gray-600">
              <span className="text-[#7C3AED] mt-0.5 flex-shrink-0">✦</span>
              {tip}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* CTA */}
      <motion.a href="#cta" initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}
        className="block w-full text-center py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-bold text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-purple-200">
        Build My Outfits →
      </motion.a>
    </div>
  )
}

// ── Main section ─────────────────────────────────────────────────
export default function PerceptionLayer() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' })

  const runAnalysis = useCallback((imageUrl: string | null) => {
    setPreview(imageUrl)
    setPhase('uploading')
    setTimeout(() => setPhase('scanning'), 800)
    setTimeout(() => setPhase('analyzing'), 2200)
    setTimeout(() => setPhase('done'), 3600)
  }, [])

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    runAnalysis(url)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const reset = () => {
    setPhase('idle')
    setPreview(null)
  }

  // Keyboard shortcut: Cmd/Ctrl+Enter to use sample
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && phase === 'idle') {
        runAnalysis(null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, runAnalysis])

  return (
    <section ref={sectionRef} id="perception" className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-pink-600 text-xs font-mono font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            New — Perception Layer
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black text-[#0F0A1E] leading-tight mb-4">
            Upload a photo.<br />
            <span className="shimmer-text">See yourself styled.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            GYF&apos;s Perception Layer reads your proportions, palette, and presence in seconds — then builds outfits designed exactly for your body.
          </p>
        </motion.div>

        {/* Main demo panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white border border-gray-200 shadow-2xl shadow-purple-50 overflow-hidden">
            {/* Window chrome bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 bg-gray-50/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 cursor-pointer transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 cursor-pointer transition-colors" />
                <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 cursor-pointer transition-colors" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                GYF Perception Layer — Active
              </div>
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 border border-gray-200 text-[10px] text-gray-500 font-mono">
                  ⌘ Enter
                </kbd>
                <span className="hidden sm:block text-[10px] text-gray-400">to use sample</span>
              </div>
            </div>

            {/* Split panel */}
            <div className="grid md:grid-cols-2 min-h-[520px]">
              {/* LEFT — Upload */}
              <div className="p-6 border-r border-gray-100 flex flex-col">
                <div className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  Input
                </div>

                {phase === 'idle' ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onClick={() => inputRef.current?.click()}
                    className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 p-8 text-center ${
                      isDragging
                        ? 'border-[#7C3AED] bg-purple-50 scale-[1.01]'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/30'
                    }`}>
                    <input ref={inputRef} type="file" accept="image/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
                    <motion.div
                      animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                      className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-3xl mb-5">
                      {isDragging ? '✨' : '📸'}
                    </motion.div>
                    <p className="font-bold text-gray-800 text-lg mb-2">
                      {isDragging ? 'Drop to analyze' : 'Drop your photo here'}
                    </p>
                    <p className="text-gray-400 text-sm mb-6">JPEG, PNG, WEBP supported</p>
                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                      <label className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white font-semibold text-sm text-center cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all shadow-md shadow-purple-100">
                        Choose File
                        <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
                      </label>
                      <button onClick={e => { e.stopPropagation(); runAnalysis(null) }}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-purple-200 text-[#7C3AED] font-semibold text-sm hover:bg-purple-50 transition-all">
                        Use Sample
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                    {preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={preview} alt="Your photo" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                        <div className="text-6xl mb-3">🧍</div>
                        <div className="text-sm font-mono">sample_user.jpg</div>
                      </div>
                    )}
                    <ScanOverlay active={phase === 'scanning'} />
                    <LandmarkDots active={phase === 'analyzing' || phase === 'done'} />
                    {phase === 'done' && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        onClick={reset}
                        className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/90 border border-gray-200 text-xs text-gray-600 hover:text-[#7C3AED] transition-colors font-medium shadow-sm">
                        ↩ Try another
                      </motion.button>
                    )}
                  </div>
                )}

                <StatusBar phase={phase} />

                {/* Privacy */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {['🔒 Never stored', '⚡ Instant', '🛡️ Private'].map(b => (
                    <span key={b} className="text-[10px] text-gray-400 font-mono">{b}</span>
                  ))}
                </div>
              </div>

              {/* RIGHT — Result */}
              <div className="p-6 bg-[#FAFAFA] flex flex-col overflow-y-auto">
                <div className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${phase === 'done' ? 'bg-green-400' : 'bg-gray-300'}`} />
                  Analysis
                </div>

                <AnimatePresence mode="wait">
                  {phase === 'idle' && (
                    <motion.div key="idle" exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                      <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-2xl text-gray-200">
                        ✦
                      </div>
                      <p className="text-gray-300 text-sm font-mono max-w-[200px]">
                        Upload a photo to see your analysis
                      </p>
                    </motion.div>
                  )}

                  {(phase === 'uploading' || phase === 'scanning' || phase === 'analyzing') && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col gap-4">
                      {/* Skeleton placeholders */}
                      {[80, 60, 100, 70, 90].map((w, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="h-12 rounded-xl bg-gray-100 animate-pulse"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                      <div className="flex-1" />
                      <div className="text-center">
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-sm text-[#7C3AED] font-mono">
                          {phase === 'uploading' && 'Reading image...'}
                          {phase === 'scanning' && 'Mapping body proportions...'}
                          {phase === 'analyzing' && 'Building style profile...'}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {phase === 'done' && (
                    <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
                      <ResultPanel result={RESULT} active={true} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Works on any photo
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-500">✓</span> All body types supported
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Results in under 4 seconds
          </span>
        </motion.div>
      </div>
    </section>
  )
}
