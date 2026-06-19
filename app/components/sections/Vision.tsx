'use client'
import { motion } from 'framer-motion'

export default function Vision() {
  return (
    <section className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="text-xs font-mono font-semibold text-[#6B7280] uppercase tracking-widest mb-8">Vision</div>
          <blockquote className="text-[clamp(1.75rem,4vw,3rem)] font-black text-[#0A0A0A] leading-tight tracking-tight mb-8">
            &ldquo;A personal stylist for everyone.<br />
            <span className="shimmer-text">Free. Instant. Genuinely yours.&rdquo;</span>
          </blockquote>
          <p className="text-[#6B7280] text-lg leading-relaxed">The expertise of a professional stylist has always been a luxury for the few. GYF makes that intelligence universal.</p>
        </motion.div>
      </div>
    </section>
  )
}
