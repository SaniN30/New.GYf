import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatWeDo from '@/components/sections/WhatWeDo'
import CTABanner from '@/components/sections/CTABanner'
import AnimatedHeading from '@/components/AnimatedHeading'

export const metadata = {
  title: 'Features — GYF',
  description: 'Every capability GYF brings to your wardrobe — from AI outfit generation to virtual try-on and social style sharing.',
}

export default function FeaturesPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-32 sm:pt-44 pb-10 sm:pb-14 max-w-5xl mx-auto px-5 sm:px-8">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Features</p>
        <AnimatedHeading
          text="Everything a personal stylist does — at scale."
          className="text-[clamp(2.2rem,7vw,5rem)] font-black text-gray-900 leading-tight mb-5"
        />
        <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
          From AI outfit generation and virtual try-on to natural-language styling goals, social style sharing, and a personal wardrobe — every capability a professional stylist brings, available to everyone instantly and for free.
        </p>
      </div>
      <WhatWeDo />
      <CTABanner />
      <Footer />
    </div>
  )
}
