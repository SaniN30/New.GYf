'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABanner from '@/components/sections/CTABanner'
import AnimatedHeading from '@/components/AnimatedHeading'

const team = [
  {
    name: 'Sanidhya Nautiyal',
    role: 'Co-founder & CEO',
    bio: 'Sanidhya leads GYF\'s product vision, strategy, and growth. Driven by the belief that great personal style shouldn\'t be a luxury, he\'s building the intelligence layer that makes every person their own stylist — free, instant, and deeply personal.',
    initials: 'SN',
  },
  {
    name: 'Atharv Motghare',
    role: 'Co-founder & CTO',
    bio: 'Atharv architects the AI and engineering backbone of GYF. He translates complex machine learning research into real, scalable products — from visual style understanding to personal taste modelling — ensuring GYF\'s intelligence compounds with every user interaction.',
    initials: 'AM',
  },
  {
    name: 'Aryan Kumar',
    role: 'Lead Engineer',
    bio: 'Aryan drives GYF\'s frontend and fullstack engineering. He crafts the interfaces and systems that make GYF feel as sharp as it looks — high-quality, performant, and built to scale.',
    initials: 'AK',
  },
]

const values = [
  {
    label: 'AI-First',
    body: 'Intelligence is the foundation of everything we build — not a feature added later.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    label: 'Trust-First',
    body: 'Every recommendation is explainable and honest about its confidence.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    label: 'People-First',
    body: 'Deeply personal, private by design, and built to feel like it was made specifically for you.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    label: 'Quality-First',
    body: 'We evaluate continuously so recommendation quality provably improves — we never silently regress.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
]

export default function TeamPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="pt-32 sm:pt-44 pb-10 sm:pb-14 max-w-5xl mx-auto px-5 sm:px-8">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">The Team</p>
        <AnimatedHeading
          text="Meet the people building GYF."
          className="text-[clamp(2.2rem,7vw,5rem)] font-black text-gray-900 leading-tight mb-5"
        />
        <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
          A small, focused team on a big mission — making the intelligence of a personal stylist available to everyone, free and instant.
        </p>
      </div>

      {/* Team grid */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]">
          {team.map(({ name, role, bio, initials }, i) => (
            <div
              key={name}
              onMouseEnter={() => setHoveredMember(i)}
              onMouseLeave={() => setHoveredMember(null)}
              className="relative bg-white p-6 sm:p-8 flex flex-col gap-4 transition-colors duration-200 hover:bg-[#fafaf8]"
            >
              {/* accent bar */}
              <div
                className="absolute top-0 left-0 w-0.5 h-full bg-[#111318] origin-top transition-transform duration-300"
                style={{ transform: hoveredMember === i ? 'scaleY(1)' : 'scaleY(0)' }}
              />
              <div
                className="w-12 h-12 rounded-full border border-black/[0.08] flex items-center justify-center text-sm font-semibold font-mono transition-colors duration-200 flex-shrink-0"
                style={{
                  background: hoveredMember === i ? '#111318' : '#F7F6F3',
                  color: hoveredMember === i ? '#fff' : '#5a5a65',
                }}
              >
                {initials}
              </div>
              <div>
                <div className="text-[1.05rem] font-semibold text-[#111318] mb-0.5">{name}</div>
                <div className="text-[0.62rem] font-mono uppercase tracking-[0.14em] text-[#C2185B]">{role}</div>
              </div>
              <p className="text-[0.875rem] text-[#5a5a65] leading-[1.75]">{bio}</p>
            </div>
          ))}

          {/* Open roles card */}
          <div className="bg-[#F7F6F3] p-6 sm:p-8 flex flex-col gap-3 justify-center">
            <div className="text-[0.6rem] font-mono uppercase tracking-[0.18em] text-[#9ca3af]">We&apos;re growing</div>
            <div className="text-[1.05rem] font-semibold text-[#111318] leading-snug">
              Want to help build the future of personal style?
            </div>
            <p className="text-[0.875rem] text-[#5a5a65] leading-[1.7]">
              We&apos;re looking for people who care deeply about AI, fashion, and building products that genuinely improve people&apos;s lives.
            </p>
            <a
              href="mailto:gyf1ltd@gmail.com"
              className="text-[0.65rem] font-mono uppercase tracking-[0.18em] text-[#C2185B] hover:text-[#9E1149] transition-colors mt-1"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </section>

      {/* What we stand for */}
      <section className="border-t border-black/[0.05] py-16 sm:py-24 bg-[#fafaf8]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <p className="text-[0.6rem] font-mono uppercase tracking-[0.22em] text-[#9ca3af] mb-8 sm:mb-12">What we stand for</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map(({ label, body, icon }) => (
              <div
                key={label}
                className="bg-white border border-black/[0.07] rounded-2xl p-5 sm:p-6 flex flex-col gap-3"
              >
                <span className="text-[#5a5a65]">{icon}</span>
                <div className="text-[0.9375rem] font-semibold text-[#111318]">{label}</div>
                <p className="text-[0.875rem] text-[#5a5a65] leading-[1.7]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </div>
  )
}
