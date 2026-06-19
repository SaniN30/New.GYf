'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/perception', label: 'Perception Layer' },
  { href: '/vision', label: 'Vision' },
  { href: '/intelligence', label: 'Intelligence' },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/assets/logo-new.png" alt="GYF" width={110} height={110} className="h-[86px] w-auto" />
            <span className="font-bold text-gray-900 text-sm tracking-wider hidden sm:block" style={{ fontFamily: 'var(--font-display)' }}>GET YOUR FIT</span>
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {links.slice(0, 3).map(l => (
            <Link key={l.href} href={l.href} className="relative text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium group py-1">
              {l.label}
              <span className="absolute bottom-0 left-0 w-full h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
          <Link href="#cta" className="btn-3d px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300">
            Get Early Access
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700 hover:text-gray-900 p-2">
          <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-4">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">{l.label}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
