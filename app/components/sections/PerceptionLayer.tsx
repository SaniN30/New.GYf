'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

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
    'Structured shoulders complement your build',
    'Mid-rise bottoms create visual balance',
    'Avoid oversized tops — elongate instead',
  ],
  outfitScore: 94,
}

function useTypewriter(text: string, active: boolean, speed = 22) {
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

function ScanOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-pink-600/20" />
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
            style={{ position: 'absolute', boxShadow: '0 0 10px 3px rgba(124,58,237,0.5)' }}
          />
          {['top-3 left-3 border-t-2 border-l-2','top-3 right-3 border-t-2 border-r-2','bottom-3 left-3 border-b-2 border-l-2','bottom-3 right-3 border-b-2 border-r-2'].map((cls, i) => (
            <div key={i} className={`absolute w-4 h-4 border-purple-400 ${cls}`} />
          ))}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <span className="text-[10px] font-mono text-purple-700 bg-white/90 px-3 py-1 rounded-full border border-purple-200 animate-pulse">Scanning...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const LANDMARKS = [
  { top: '18%', left: '50%' },
  { top: '35%', left: '50%' },
  { top: '55%', left: '35%' },
  { top: '55%', left: '65%' },
  { top: '75%', left: '42%' },
]

function LandmarkDots({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && LANDMARKS.map((lm, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 300 }}
          className="absolute z-20 pointer-events-none" style={{ top: lm.top, left: lm.left, transform: 'translate(-50%,-50%)' }}>
          <div className="relative w-2.5 h-2.5">
            <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping" />
            <div className="relative w-2.5 h-2.5 rounded-full bg-purple-600 border-2 border-white shadow" />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

function StatusBar({ phase }: { phase: Phase }) {
  const map: Record<Phase, string> = {
    idle: '', uploading: 'Uploading photo...', scanning: 'Scanning body proportions...', analyzing: 'Analyzing style signals...', done: 'Analysis complete'
  }
  if (phase === 'idle') return null
  return (
    <div className="flex items-center gap-2 mt-3 text-xs font-mono text-gray-500">
      {phase !== 'done'
        ? <motion.div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
        : <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center text-white text-[8px]">✓</div>
      }
      <span className={phase === 'done' ? 'text-green-600' : 'text-purple-600'}>{map[phase]}</span>
    </div>
  )
}

function ResultPanel({ result, active }: { result: AnalysisResult; active: boolean }) {
  const vibe = useTypewriter(result.vibe, active, 25)
  const bodyType = useTypewriter(result.bodyType, active, 20)
  return (
    <div className="flex flex-col gap-3 h-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
        className="flex items-center justify-between p-4 rounded-2xl bg-purple-50 border border-purple-100">
        <div>
          <div className="text-[10px] text-gray-400 font-mono mb-0.5 uppercase tracking-widest">Style Match</div>
          <div className="text-3xl font-black text-purple-700">{result.outfitScore}%</div>
        </div>
        <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#EDE9FE" strokeWidth="4" />
          <motion.circle cx="24" cy="24" r="20" fill="none" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 20}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
            animate={active ? { strokeDashoffset: 2 * Math.PI * 20 * (1 - result.outfitScore / 100) } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }} />
        </svg>
      </motion.div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Body Type', value: bodyType, delay: 0.3 },
          { label: 'Style Vibe', value: vibe, delay: 0.4 },
          { label: 'Skin Tone', value: result.skinTone, delay: 0.5 },
        ].map(item => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: item.delay }}
            className="rounded-xl bg-white border border-gray-100 p-3">
            <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1">{item.label}</div>
            <div className="text-sm font-bold text-[#0A0A0A]">{item.value}{item.label === 'Body Type' && <span className="opacity-0 animate-pulse">|</span>}</div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
          className="rounded-xl bg-white border border-gray-100 p-3">
          <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-2">Palette</div>
          <div className="flex gap-1 flex-wrap">
            {result.palette.map(c => (
              <span key={c} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-100">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }}
        className="rounded-xl bg-white border border-gray-100 p-3 flex-1">
        <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-2">Stylist Notes</div>
        <ul className="space-y-1.5">
          {result.tips.map((tip, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -6 }} animate={active ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.9 + i * 0.1 }}
              className="flex items-start gap-2 text-xs text-[#3D3D3D]">
              <span className="text-purple-500 flex-shrink-0 mt-0.5">✦</span>{tip}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.a href="#cta" initial={{ opacity: 0 }} animate={active ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}
        className="block w-full text-center py-3.5 rounded-2xl bg-[#0A0A0A] text-white font-bold text-sm hover:bg-[#1F1F1F] transition-colors">
        Build My Outfits →
      </motion.a>
    </div>
  )
}

export default function PerceptionLayer() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: '-80px' })

  const runAnalysis = useCallback((img: string | null) => {
    setPreview(img)
    setPhase('uploading')
    setTimeout(() => setPhase('scanning'), 800)
    setTimeout(() => setPhase('analyzing'), 2200)
    setTimeout(() => setPhase('done'), 3600)
  }, [])

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) runAnalysis(URL.createObjectURL(file))
  }

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && phase === 'idle') runAnalysis(null)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [phase, runAnalysis])

  return (
    <section ref={sectionRef} id="perception" className="py-24 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-700 text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            Perception Layer — New
          </div>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#0A0A0A] leading-tight tracking-tight mb-4">
            Upload a photo.<br /><span className="shimmer-text">See yourself styled.</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-lg mx-auto leading-relaxed">
            GYF reads your body in seconds and builds outfits designed exactly for your proportions.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-5xl mx-auto rounded-3xl bg-white border border-gray-200 shadow-xl overflow-hidden">
          {/* Chrome bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-[#F9FAFB]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="text-xs text-gray-400 font-mono">GYF Perception Layer</span>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono">
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-500">⌘</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-500">↵</kbd>
              <span className="hidden sm:block ml-1">sample</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 min-h-[480px]">
            {/* Left */}
            <div className="p-6 border-r border-gray-100 flex flex-col">
              <div className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-4">Input</div>
              {phase === 'idle' ? (
                <div
                  onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
                  onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                  onDragLeave={() => setIsDragging(false)}
                  onClick={() => inputRef.current?.click()}
                  className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 gap-4 p-8 text-center ${isDragging ? 'border-purple-400 bg-purple-50 scale-[1.01]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                  <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
                  <div className="text-4xl">{isDragging ? '✨' : '📸'}</div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A] mb-1">{isDragging ? 'Drop to analyze' : 'Drop your photo'}</p>
                    <p className="text-xs text-gray-400">JPEG, PNG, WEBP</p>
                  </div>
                  <div className="flex gap-2 w-full max-w-[240px]">
                    <label className="flex-1 px-4 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs font-semibold text-center cursor-pointer hover:bg-[#1F1F1F] transition-colors">
                      Choose File
                      <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
                    </label>
                    <button onClick={e => { e.stopPropagation(); runAnalysis(null) }}
                      className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-[#0A0A0A] hover:border-gray-400 transition-colors">
                      Sample
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                  {preview
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={preview} alt="Your photo" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex flex-col items-center justify-center text-gray-300"><div className="text-5xl mb-2">🧍</div><div className="text-xs font-mono">sample.jpg</div></div>
                  }
                  <ScanOverlay active={phase === 'scanning'} />
                  <LandmarkDots active={phase === 'analyzing' || phase === 'done'} />
                  {phase === 'done' && (
                    <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                      onClick={() => { setPhase('idle'); setPreview(null) }}
                      className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs text-gray-600 hover:border-gray-400 transition-colors shadow-sm">
                      ↩ Reset
                    </motion.button>
                  )}
                </div>
              )}
              <StatusBar phase={phase} />
              <div className="mt-3 flex gap-3 text-[10px] text-gray-400 font-mono">
                <span>🔒 Never stored</span>
                <span>⚡ Instant</span>
                <span>🛡️ Private</span>
              </div>
            </div>

            {/* Right */}
            <div className="p-6 bg-[#FAFAFA] flex flex-col">
              <div className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${phase === 'done' ? 'bg-green-400' : 'bg-gray-300'}`} />
                Analysis
              </div>
              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.div key="idle" exit={{ opacity: 0 }} className="flex-1 flex flex-col items-center justify-center gap-3">
                    <div className="text-5xl opacity-10">✦</div>
                    <p className="text-xs text-gray-300 font-mono text-center">Upload a photo to see<br />your style analysis</p>
                  </motion.div>
                )}
                {(phase === 'uploading' || phase === 'scanning' || phase === 'analyzing') && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col gap-3">
                    {[80, 55, 90, 65, 75, 45].map((w, i) => (
                      <div key={i} className="h-10 rounded-xl bg-gray-100 animate-pulse" style={{ width: `${w}%` }} />
                    ))}
                    <div className="flex-1" />
                    <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-purple-600 font-mono text-center">
                      {phase === 'uploading' && 'Reading image...'}{phase === 'scanning' && 'Mapping proportions...'}{phase === 'analyzing' && 'Building style profile...'}
                    </motion.p>
                  </motion.div>
                )}
                {phase === 'done' && (
                  <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
                    <ResultPanel result={RESULT} active />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-[#6B7280]">
          {['✓ All body types', '✓ Under 4 seconds', '✓ No account needed'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
