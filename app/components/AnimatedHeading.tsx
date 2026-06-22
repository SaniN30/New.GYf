'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')
  let charIdx = 0

  return (
    <h1 ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => {
        const wordStart = charIdx
        charIdx += word.length + 1
        return (
          <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: wi < words.length - 1 ? '0.28em' : 0 }}>
            {word.split('').map((char, ci) => (
              <motion.span
                key={ci}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.5, delay: (wordStart + ci) * 0.025, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        )
      })}
    </h1>
  )
}
