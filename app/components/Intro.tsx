'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'

export default function Intro() {
  const [visible, setVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springX = useSpring(rawX, { stiffness: 120, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 120, damping: 18 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#FFFFFF" }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gray-200/60 blur-[160px]" />
            <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-gray-100/60 blur-[120px]" />
          </div>

          {/* 3D logo card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="relative">
              {/* Logo glow halo */}
              <div className="absolute inset-0 scale-150 rounded-full bg-gray-200/40 blur-3xl pointer-events-none" />
              <Image
                src="/assets/logo-new.png"
                alt="GYF"
                width={400}
                height={400}
                className="relative z-10 drop-shadow-[0_0_60px_rgba(0,0,0,0.12)]"
                style={{ width: '40vw', height: 'auto', minWidth: 240, maxWidth: 500 }}
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl font-black tracking-tight text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
                GET YOUR FIT
              </div>
              <div className="text-sm text-gray-500 font-mono mt-1 tracking-widest uppercase">
                AI Personal Stylist
              </div>
            </motion.div>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-16 w-48"
          >
            <div className="h-0.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, delay: 0.8, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-gray-900 to-gray-600 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
