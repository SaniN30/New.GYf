'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 h-12 flex items-center transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-[#F3F4F6]' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image src="/assets/logo-new.png" alt="GYF" fill className="object-contain" priority />
            </div>
            <span className="font-bold text-[#0A0A0A] text-sm">Get Your Fit</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {[['#stylist','The Stylist'],['#perception','Perception'],['#about','About']].map(([href,label]) => (
              <a key={href} href={href} className="text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors">{label}</a>
            ))}
          </div>

          <a href="#cta" className="hidden md:flex px-5 py-2 rounded-full bg-[#0A0A0A] text-white text-sm font-semibold hover:bg-[#262626] transition-colors">
            Get Early Access
          </a>

          <button onClick={() => setOpen(o => !o)} className="md:hidden p-2 text-[#0A0A0A]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {open
                ? <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                : <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            className="fixed top-12 inset-x-0 z-40 bg-white border-b border-[#F3F4F6] px-6 py-5 flex flex-col gap-4 md:hidden shadow-lg">
            {[['#stylist','The Stylist'],['#perception','Perception'],['#about','About']].map(([href,label]) => (
              <a key={href} href={href} onClick={()=>setOpen(false)} className="text-[#0A0A0A] font-medium py-1">{label}</a>
            ))}
            <a href="#cta" onClick={()=>setOpen(false)} className="mt-2 px-5 py-3 rounded-full bg-[#0A0A0A] text-white font-semibold text-sm text-center">Get Early Access</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
