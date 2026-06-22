'use client'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

type Field = { name: string; email: string; phone: string }
type Status = 'idle' | 'loading' | 'success' | 'error'

function FieldInput({
  label, type = 'text', value, onChange, placeholder, autoFocus,
}: {
  label: string; type?: string; value: string
  onChange: (v: string) => void; placeholder: string; autoFocus?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative pt-2">
      <motion.label
        animate={{ opacity: focused || value ? 1 : 0, y: focused || value ? 0 : 4 }}
        transition={{ duration: 0.16 }}
        className="absolute top-0 left-4 px-1 bg-white text-[0.58rem] font-mono text-[#9ca3af] uppercase tracking-[0.14em] pointer-events-none z-10"
      >
        {label}
      </motion.label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? '' : placeholder}
        autoFocus={autoFocus}
        className={`w-full px-5 py-4 rounded-2xl bg-[#F7F6F3] border text-[#111318] text-sm placeholder-[#c4c4c8] outline-none transition-all duration-200 ${
          focused ? 'border-black/30 bg-white shadow-[0_0_0_3px_rgba(17,19,24,0.04)]' : 'border-black/[0.08]'
        }`}
      />
    </div>
  )
}

export default function CTABanner() {
  const [fields, setFields]     = useState<Field>({ name: '', email: '', phone: '' })
  const [status, setStatus]     = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [firstName, setFirstName] = useState('')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const h = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [mouseX, mouseY])

  const set = (k: keyof Field) => (v: string) => setFields(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fields.name.trim() || !fields.email.trim() || !fields.phone.trim()) return
    setStatus('loading')
    setErrorMsg('')
    try {
      const res  = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
      } else {
        setFirstName(data.firstName ?? fields.name.trim().split(' ')[0])
        setStatus('success')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="cta" className="py-24 sm:py-36 relative overflow-hidden bg-white">
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute w-[800px] h-[400px] rounded-full opacity-[0.06] blur-[120px]"
        style={{
          background: 'radial-gradient(ellipse, #C4956A 0%, transparent 70%)',
          left: useTransform(smoothX, [0, typeof window !== 'undefined' ? window.innerWidth : 1440], ['-10%', '60%']),
          top: '20%',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] bg-[#F7F6F3] text-[#6b6b78] text-[0.72rem] font-mono tracking-wide mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Accepting early members
          </div>

          <h2 className="text-[clamp(2.5rem,6.5vw,5rem)] font-black text-[#111318] leading-[0.95] tracking-tight mb-6">
            Be dressed by{' '}
            <span className="shimmer-text">intelligence.</span>
          </h2>

          <p className="text-[#3d3d48] text-lg mb-8 sm:mb-10 font-[350] leading-[1.7]">
            Join the waitlist — we&apos;ll reach out the moment early access opens.
          </p>

          <AnimatePresence mode="wait">

            {/* ── Form ── */}
            {status !== 'success' && (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3 max-w-md mx-auto text-left"
              >
                <FieldInput
                  label="Full name"
                  value={fields.name}
                  onChange={set('name')}
                  placeholder="Your name"
                  autoFocus
                />
                <FieldInput
                  label="Email address"
                  type="email"
                  value={fields.email}
                  onChange={set('email')}
                  placeholder="your@email.com"
                />
                <FieldInput
                  label="Phone number"
                  type="tel"
                  value={fields.phone}
                  onChange={set('phone')}
                  placeholder="+1 234 567 8900"
                />

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-[0.75rem] text-red-500 font-mono px-1"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || !fields.name || !fields.email || !fields.phone}
                  whileHover={status !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98, y: 1 } : {}}
                  className="btn-3d mt-1 w-full py-4 font-semibold text-[0.875rem] text-white bg-[#111318] hover:bg-[#1e2230] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white inline-block"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      Joining…
                    </span>
                  ) : 'Join the Waitlist →'}
                </motion.button>
              </motion.form>
            )}

            {/* ── Success ── */}
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md mx-auto"
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-[#111318] flex items-center justify-center mx-auto mb-5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.1 }}
                >
                  <motion.svg
                    viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                </motion.div>

                <h3 className="text-[1.6rem] font-black text-[#111318] tracking-tight mb-2">
                  You&apos;re in, {firstName}.
                </h3>
                <p className="text-[#6b6b78] text-sm leading-relaxed mb-6">
                  We&apos;ve sent a confirmation to{' '}
                  <span className="font-mono text-[#111318]">{fields.email}</span>.<br />
                  We&apos;ll reach out the moment early access opens.
                </p>

                <div className="px-5 py-3.5 rounded-2xl bg-[#F7F6F3] border border-black/[0.07]">
                  <p className="text-[0.7rem] text-[#9ca3af] font-mono">
                    No spam. No newsletters. Just one email when it&apos;s time.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {status !== 'success' && (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {['No spam', 'Cancel anytime', 'Free forever'].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-xs text-[#9ca3af] font-medium"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
