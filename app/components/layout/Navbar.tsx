'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '#stylist', label: 'The Stylist' },
  { href: '#perception', label: 'Perception Layer' },
  { href: '#about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-white border-b border-gray-100 shadow-sm' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="relative w-9 h-9">
              <Image src="/assets/logo-new.png" alt="GYF" fill className="object-contain" priority />
            </div>
            <span className="font-bold text-[#0A0A0A] text-sm tracking-tight">Get Your Fit</span>
          </Link>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className="text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors font-medium">
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#cta" className="px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white text-sm font-semibold hover:bg-[#1a1a1a] transition-colors">
              Get Early Access
            </a>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setOpen(o => !o)} className="md:hidden p-2" aria-label="Toggle menu">
            <div className={`w-5 h-px bg-[#0A0A0A] mb-1.5 transition-all origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <div className={`w-5 h-px bg-[#0A0A0A] mb-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-px bg-[#0A0A0A] transition-all origin-center ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 px-6 py-6 flex flex-col gap-5 md:hidden shadow-lg">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-base font-medium text-[#0A0A0A]">{l.label}</a>
            ))}
            <a href="#cta" onClick={() => setOpen(false)}
              className="px-5 py-3 rounded-full bg-[#0A0A0A] text-white text-sm font-semibold text-center">
              Get Early Access
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
