'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#perception', label: 'Perception Layer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-[52px] h-[52px] flex-shrink-0">
            <Image
              src="/assets/logo-new.png"
              alt="GYF Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-[#0F0A1E] text-base tracking-wide hidden sm:block">
            Get Your Fit
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-[#7C3AED] transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a href="#cta"
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899] hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-md shadow-purple-200">
            Get Early Access
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600" aria-label="Menu">
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-current transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-4">
            {links.map((l, i) => (
              <motion.a
                key={l.href} href={l.href}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-[#7C3AED] font-medium py-2 transition-colors">
                {l.label}
              </motion.a>
            ))}
            <a href="#cta" onClick={() => setOpen(false)}
              className="mt-2 px-6 py-3 rounded-full text-center font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">
              Get Early Access
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
