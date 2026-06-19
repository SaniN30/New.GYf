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
    let i = 0; setDisplayed('')
    const id = setInterval(() => { i++; setDisplayed(text.slice(0,i)); if(i>=text.length) clearInterval(id) }, speed)
    return () => clearInterval(id)
  }, [text, active, speed])
  return displayed
}

function ScanOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
          <div className="absolute inset-0 bg-violet-600/10" />
          <motion.div animate={{top:['0%','100%','0%']}} transition={{duration:1.8,repeat:Infinity,ease:'linear'}}
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
            style={{position:'absolute',boxShadow:'0 0 8px 2px rgba(124,58,237,0.5)'}} />
          {(['top-2 left-2 border-t-2 border-l-2','top-2 right-2 border-t-2 border-r-2','bottom-2 left-2 border-b-2 border-l-2','bottom-2 right-2 border-b-2 border-r-2'] as const).map((cls,i) => (
            <div key={i} className={`absolute w-4 h-4 border-violet-500 ${cls}`} />
          ))}
          <div className="absolute bottom-2 inset-x-0 flex justify-center">
            <span className="text-[10px] font-mono text-violet-700 bg-white/90 px-2.5 py-0.5 rounded-full border border-violet-200 animate-pulse">Scanning...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LandmarkDots({ active }: { active: boolean }) {
  const LANDMARKS = [{top:'18%',left:'50%'},{top:'35%',left:'50%'},{top:'55%',left:'35%'},{top:'55%',left:'65%'},{top:'75%',left:'42%'}]
  return (
    <AnimatePresence>
      {active && LANDMARKS.map((lm,i) => (
        <motion.div key={i} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}
          transition={{delay:i*0.1,type:'spring',stiffness:300}}
          className="absolute z-20 pointer-events-none" style={{top:lm.top,left:lm.left,transform:'translate(-50%,-50%)'}}>
          <div className="relative w-2.5 h-2.5">
            <div className="absolute inset-0 rounded-full bg-violet-500/30 animate-ping" />
            <div className="relative w-2.5 h-2.5 rounded-full bg-violet-600 border-2 border-white shadow-sm" />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

function ResultPanel({ result, active }: { result: AnalysisResult; active: boolean }) {
  const bodyType = useTypewriter(result.bodyType, active, 20)
  const vibe = useTypewriter(result.vibe, active, 25)
  return (
    <div className="flex flex-col gap-3 h-full">
      <motion.div initial={{opacity:0,y:8}} animate={active?{opacity:1,y:0}:{}} transition={{delay:0.15}}
        className="flex items-center justify-between p-4 rounded-2xl bg-[#F9FAFB] border border-[#F3F4F6]">
        <div>
          <p className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-widest mb-0.5">Style Match</p>
          <p className="text-3xl font-black text-[#0A0A0A]">{result.outfitScore}%</p>
        </div>
        <svg viewBox="0 0 48 48" className="w-12 h-12" style={{transform:'rotate(-90deg)'}}>
          <circle cx="24" cy="24" r="20" fill="none" stroke="#F3F4F6" strokeWidth="4" />
          <motion.circle cx="24" cy="24" r="20" fill="none" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round"
            strokeDasharray={`${2*Math.PI*20}`}
            initial={{strokeDashoffset:2*Math.PI*20}}
            animate={active?{strokeDashoffset:2*Math.PI*20*(1-result.outfitScore/100)}:{}}
            transition={{duration:1.2,delay:0.4,ease:'easeOut'}} />
        </svg>
      </motion.div>

      <div className="grid grid-cols-2 gap-2.5">
        {[{label:'Body Type',value:bodyType,delay:0.25},{label:'Style Vibe',value:vibe,delay:0.35},{label:'Skin Tone',value:result.skinTone,delay:0.45}].map(item => (
          <motion.div key={item.label} initial={{opacity:0,y:8}} animate={active?{opacity:1,y:0}:{}} transition={{delay:item.delay}}
            className="rounded-xl bg-white border border-[#F3F4F6] p-3">
            <p className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-sm font-bold text-[#0A0A0A]">{item.value}</p>
          </motion.div>
        ))}
        <motion.div initial={{opacity:0,y:8}} animate={active?{opacity:1,y:0}:{}} transition={{delay:0.55}}
          className="rounded-xl bg-white border border-[#F3F4F6] p-3">
          <p className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-widest mb-2">Palette</p>
          <div className="flex gap-1 flex-wrap">
            {result.palette.map(c => (
              <span key={c} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-50 text-violet-700 border border-violet-100">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{opacity:0,y:8}} animate={active?{opacity:1,y:0}:{}} transition={{delay:0.7}}
        className="rounded-xl bg-white border border-[#F3F4F6] p-4 flex-1">
        <p className="text-[10px] text-[#9CA3AF] font-mono uppercase tracking-widest mb-3">Stylist Notes</p>
        <ul className="space-y-2">
          {result.tips.map((tip,i) => (
            <motion.li key={i} initial={{opacity:0,x:-6}} animate={active?{opacity:1,x:0}:{}} transition={{delay:0.8+i*0.1}}
              className="flex items-start gap-2 text-xs text-[#3D3D3D]">
              <span className="text-violet-500 flex-shrink-0 mt-0.5 text-[10px]">✦</span>{tip}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.a href="#cta" initial={{opacity:0}} animate={active?{opacity:1}:{}} transition={{delay:1.1}}
        className="block w-full text-center py-3.5 rounded-2xl bg-[#0A0A0A] text-white font-semibold text-sm hover:bg-[#262626] transition-colors">
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
    setPreview(img); setPhase('uploading')
    setTimeout(() => setPhase('scanning'), 800)
    setTimeout(() => setPhase('analyzing'), 2200)
    setTimeout(() => setPhase('done'), 3600)
  }, [])

  const handleFile = (file: File) => { if (file.type.startsWith('image/')) runAnalysis(URL.createObjectURL(file)) }

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if ((e.metaKey||e.ctrlKey) && e.key==='Enter' && phase==='idle') runAnalysis(null) }
    window.addEventListener('keydown', fn); return () => window.removeEventListener('keydown', fn)
  }, [phase, runAnalysis])

  const STATUS: Record<Phase,string> = { idle:'', uploading:'Uploading...', scanning:'Scanning body...', analyzing:'Analyzing style...', done:'Analysis complete' }

  return (
    <section ref={sectionRef} id="perception" className="py-16 sm:py-24 bg-[#F9FAFB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{opacity:0,y:20}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.5}}
          className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-700 text-xs font-semibold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Perception Layer — New
          </div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-black text-[#0A0A0A] tracking-[-0.02em] leading-[1.05] mb-4">
            Upload a photo.<br /><span className="shimmer-text">See yourself styled.</span>
          </h2>
          <p className="text-[#6B7280] text-lg max-w-lg mx-auto leading-relaxed">
            GYF reads your body in seconds and builds outfits designed exactly for your proportions.
          </p>
        </motion.div>

        <motion.div initial={{opacity:0,y:32}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.1}}
          className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-[#F3F4F6] shadow-lg overflow-hidden">
          {/* Chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#F3F4F6] bg-[#FAFAFA]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="text-xs text-[#9CA3AF] font-mono">GYF Perception Layer</span>
            <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF] font-mono">
              <kbd className="px-1.5 py-0.5 rounded bg-[#F3F4F6] border border-[#E5E7EB] text-[#6B7280]">⌘</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[#F3F4F6] border border-[#E5E7EB] text-[#6B7280]">↵</kbd>
              <span className="hidden sm:block ml-1">sample</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 min-h-[320px] md:min-h-[480px]">
            {/* Left — upload */}
            <div className="p-4 sm:p-6 border-b md:border-b-0 md:border-r border-[#F3F4F6] flex flex-col">
              <p className="text-[10px] font-mono font-semibold text-[#9CA3AF] uppercase tracking-widest mb-4">Input</p>
              {phase === 'idle' ? (
                <div onDrop={e=>{e.preventDefault();setIsDragging(false);const f=e.dataTransfer.files[0];if(f)handleFile(f)}}
                  onDragOver={e=>{e.preventDefault();setIsDragging(true)}} onDragLeave={()=>setIsDragging(false)}
                  onClick={()=>inputRef.current?.click()}
                  className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 gap-3 p-5 sm:p-8 text-center ${isDragging?'border-violet-400 bg-violet-50 scale-[1.01]':'border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#FAFAFA]'}`}>
                  <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)handleFile(f)}} />
                  <div className="w-14 h-14 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-2xl">{isDragging?'✨':'📸'}</div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A] mb-1">{isDragging?'Drop to analyze':'Drop your photo'}</p>
                    <p className="text-xs text-[#9CA3AF]">JPEG, PNG, WEBP</p>
                  </div>
                  <div className="flex gap-2 w-full max-w-[240px]">
                    <label className="flex-1 px-4 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs font-semibold text-center cursor-pointer hover:bg-[#262626] transition-colors">
                      Choose File
                      <input type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)handleFile(f)}} />
                    </label>
                    <button onClick={e=>{e.stopPropagation();runAnalysis(null)}}
                      className="flex-1 px-4 py-2.5 rounded-full border border-[#E5E7EB] text-xs font-semibold text-[#0A0A0A] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] transition-all">
                      Sample
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 relative rounded-2xl overflow-hidden border border-[#F3F4F6] bg-[#F9FAFB]">
                  {preview
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex flex-col items-center justify-center text-[#D1D5DB]"><div className="text-5xl mb-2">🧍</div><div className="text-xs font-mono">sample.jpg</div></div>
                  }
                  <ScanOverlay active={phase==='scanning'} />
                  <LandmarkDots active={phase==='analyzing'||phase==='done'} />
                  {phase==='done' && (
                    <motion.button initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
                      onClick={()=>{setPhase('idle');setPreview(null)}}
                      className="absolute top-2 right-2 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs text-[#6B7280] hover:border-[#D1D5DB] transition-colors shadow-sm">
                      ↩ Reset
                    </motion.button>
                  )}
                </div>
              )}

              {phase !== 'idle' && (
                <div className="flex items-center gap-2 mt-3 text-xs text-[#6B7280] font-mono">
                  {phase !== 'done'
                    ? <motion.div className="w-3 h-3 border-2 border-violet-600 border-t-transparent rounded-full" animate={{rotate:360}} transition={{duration:0.8,repeat:Infinity,ease:'linear'}} />
                    : <div className="w-3 h-3 rounded-full bg-green-500 flex items-center justify-center text-white text-[8px]">✓</div>
                  }
                  <span className={phase==='done'?'text-green-600':'text-violet-600'}>{STATUS[phase]}</span>
                </div>
              )}

              <div className="mt-3 flex gap-4 text-[10px] text-[#9CA3AF] font-mono">
                <span>🔒 Never stored</span><span>⚡ Instant</span><span>🛡️ Private</span>
              </div>
            </div>

            {/* Right — result */}
            <div className="p-4 sm:p-6 bg-[#FAFAFA] flex flex-col">
              <p className="text-[10px] font-mono font-semibold text-[#9CA3AF] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${phase==='done'?'bg-green-400':'bg-[#E5E7EB]'}`} />
                Analysis
              </p>
              <AnimatePresence mode="wait">
                {phase==='idle' && (
                  <motion.div key="idle" exit={{opacity:0}} className="flex-1 flex flex-col items-center justify-center gap-3">
                    <div className="text-4xl text-[#E5E7EB]">✦</div>
                    <p className="text-xs text-[#D1D5DB] font-mono text-center">Upload a photo to see<br />your analysis</p>
                  </motion.div>
                )}
                {(phase==='uploading'||phase==='scanning'||phase==='analyzing') && (
                  <motion.div key="loading" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex-1 flex flex-col gap-3">
                    {[80,55,90,65,75,45].map((w,i) => (
                      <div key={i} className="h-10 rounded-xl bg-[#F3F4F6] animate-pulse" style={{width:`${w}%`}} />
                    ))}
                    <div className="flex-1" />
                    <motion.p animate={{opacity:[0.4,1,0.4]}} transition={{duration:1.5,repeat:Infinity}}
                      className="text-xs text-violet-600 font-mono text-center">
                      {phase==='uploading'&&'Reading image...'}{phase==='scanning'&&'Mapping proportions...'}{phase==='analyzing'&&'Building style profile...'}
                    </motion.p>
                  </motion.div>
                )}
                {phase==='done' && (
                  <motion.div key="done" initial={{opacity:0}} animate={{opacity:1}} className="flex-1">
                    <ResultPanel result={RESULT} active />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0}} animate={isInView?{opacity:1}:{}} transition={{delay:0.5}}
          className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-[#9CA3AF]">
          {['✓ All body types','✓ Under 4 seconds','✓ No account needed'].map(t=>(
            <span key={t}>{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
