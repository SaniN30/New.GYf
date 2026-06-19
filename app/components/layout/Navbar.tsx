'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#perception', label: 'Perception Layer' },
  { href: '#cta', label: 'Early Access' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A0A14]/80 backdrop-blur-xl border-b border-white/5' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/logo.png" alt="GYF" width={36} height={36} className="h-9 w-auto" />
          <span className="font-bold text-white text-sm tracking-wider hidden sm:block" style={{ fontFamily: 'var(--font-display)' }}>GET YOUR FIT</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.slice(0, 2).map(l => (
            <a key={l.href} href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors font-medium">{l.label}</a>
          ))}
          <a href="#cta" className="btn-3d px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
            Get Early Access
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-400 hover:text-white p-2">
          <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
            className="md:hidden glass-card border-t border-white/5 px-6 py-6 flex flex-col gap-4 rounded-none">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-300 hover:text-white transition-colors font-medium py-2">{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
