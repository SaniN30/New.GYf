'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/perception',   label: 'Demo'          },
  { href: '/vision',       label: 'Vision'        },
  { href: '/intelligence', label: 'Intelligence'  },
  { href: '/about',        label: 'About GYF'     },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_1px_32px_rgba(17,19,24,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-14 sm:h-20">

        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/assets/logo-new.png"
                alt="GYF"
                width={200}
                height={200}
                className="h-10 sm:h-[90px] md:h-[120px] w-auto transition-all duration-300 group-hover:brightness-90"
                priority
              />
            </div>
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setActiveLink(l.href)}
              onMouseLeave={() => setActiveLink(null)}
              className="relative px-4 py-2 text-[0.8125rem] font-medium text-[#5a5a65] hover:text-[#111318] transition-colors duration-200 rounded-lg hover:bg-black/[0.04]"
            >
              {l.label}
              <AnimatePresence>
                {activeLink === l.href && (
                  <motion.span
                    layoutId="nav-underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-1 left-4 right-4 h-px bg-[#111318]/40"
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          ))}

          <div className="w-px h-5 bg-black/10 mx-3" />

          <Link
            href="/#cta"
            className="btn-3d px-5 py-2.5 text-[0.8125rem] font-semibold text-white bg-[#111318] hover:bg-[#1e2230] transition-colors duration-200"
          >
            Get Early Access
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#111318] hover:text-[#5a5a65] p-2 rounded-lg hover:bg-black/[0.04] transition-colors"
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-[1.5px] bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <div className={`w-5 h-[1.5px] bg-current my-[5px] transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <div className={`w-5 h-[1.5px] bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-black/[0.06] px-6 py-6 flex flex-col gap-1"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-[0.9375rem] font-medium text-[#5a5a65] hover:text-[#111318] transition-colors py-3 px-2 rounded-lg hover:bg-black/[0.03]"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 pt-3 border-t border-black/[0.06]"
            >
              <Link
                href="/#cta"
                onClick={() => setOpen(false)}
                className="btn-3d block w-full text-center py-3.5 text-sm font-semibold text-white bg-[#111318] rounded-xl"
              >
                Get Early Access
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
