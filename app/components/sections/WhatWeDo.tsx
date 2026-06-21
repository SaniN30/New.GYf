'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const features = [
  {
    icon: '👁️',
    title: 'Visual Style Intelligence',
    body: 'Understands clothing visually — vibe, color harmony, texture, silhouette. Not just tags or categories.',
    detail: 'GYF perceives garments from images the way a real stylist does, matching and coordinating by how things actually look — reading aesthetic harmony directly from visual signals.',
  },
  {
    icon: '🧠',
    title: 'Personal Taste Engine',
    body: 'Builds a living model of your personal taste from every interaction, not just onboarding.',
    detail: 'Deepens with every save, skip, and reaction. The longer you use GYF, the more results suit your personality, body type, skin tone, budget, and occasion — you visibly look more yourself over time.',
  },
  {
    icon: '✦',
    title: 'Complete Outfit Generation',
    body: 'Delivers complete outfits — top, bottom, footwear — coordinated as one look with a clear stylist reason.',
    detail: 'Never just items. GYF thinks in complete, coordinated looks: every recommendation is a full outfit with a human-readable explanation and honest confidence signal attached.',
  },
  {
    icon: '🗣️',
    title: 'Natural-Language Styling Goals',
    body: 'Tell GYF what you want in plain words — "I want to look taller" — and it makes it happen.',
    detail: 'GYF applies colour theory and body-type intelligence to pick garments, cuts, and colours that achieve your stated visual effect — turning conversational intent into intelligent outfit choices.',
  },
  {
    icon: '📸',
    title: 'Virtual Try-On',
    body: 'Select any complete look and see it rendered realistically on your own body.',
    detail: 'Upload a photo as input; see the selected top, bottom, and footwear rendered together on your actual body — giving a genuinely accurate preview of fit and style before you commit.',
  },
  {
    icon: '🌍',
    title: 'Occasion & Region-Aware',
    body: 'Recommendations adapt to your occasion and respect regional dress culture.',
    detail: 'Specify casual, formal, wedding, festive, and more. Recommendations are conditioned on it. Regional dress is respected — Indian users see sarees; the catalog and styling logic are localised to your world.',
  },
  {
    icon: '👗',
    title: 'Personal Collections',
    body: 'Save items, revisit sessions, and style around the wardrobe you already own.',
    detail: 'Maintain a shortlist of saved items, a history of past GYF sessions, and a wardrobe of what you already own — so GYF styles around your real closet, not just the catalog.',
  },
  {
    icon: '✨',
    title: 'Social & Inspiration',
    body: 'Shoppable looks, style sharing, and a discovery feed inspired by LTK.',
    detail: 'A dedicated social layer: interactive, shareable posts, creator feeds, style-following re-rendered to your own skin tone and preferences. Follow someone\'s style and dress like them — but as you, not them.',
  },
]

export default function WhatWeDo() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-32 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Core</div>
          <h2
            className="text-[clamp(2rem,5vw,4rem)] font-black text-gray-900 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            What GYF Does
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const isExpanded = expandedCard === i
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setExpandedCard(isExpanded ? null : i)}
                whileHover={!isExpanded ? { y: -4, scale: 1.02 } : {}}
                className={`rounded-2xl border cursor-pointer transition-all duration-300 group overflow-hidden ${
                  isExpanded
                    ? 'bg-gray-900 border-gray-900 shadow-2xl col-span-1 sm:col-span-2'
                    : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md p-6 sm:p-7'
                }`}
                style={isExpanded ? { padding: '2rem' } : {}}
              >
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className={`text-base font-bold mb-2 transition-colors duration-200 leading-snug ${isExpanded ? 'text-white' : 'text-gray-900'}`}>
                  {f.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-200 ${isExpanded ? 'text-gray-300' : 'text-gray-500'}`}>
                  {f.body}
                </p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <p className="text-sm text-gray-400 leading-relaxed">{f.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`mt-3 text-[10px] font-mono tracking-widest transition-colors duration-200 ${isExpanded ? 'text-gray-600' : 'text-gray-300 group-hover:text-gray-400'}`}>
                  {isExpanded ? 'CLICK TO COLLAPSE ↑' : 'CLICK TO EXPAND ↓'}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
