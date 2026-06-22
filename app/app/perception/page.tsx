import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PerceptionLayer from '@/components/sections/PerceptionLayer'
import CTABanner from '@/components/sections/CTABanner'
import AnimatedHeading from '@/components/AnimatedHeading'

export const metadata = {
  title: 'Perception Layer — GYF',
  description: 'Upload a photo and let GYF read your body type, skin tone, and style signals. AI-powered body analysis.',
}

export default function PerceptionPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-44 pb-8 max-w-5xl mx-auto px-6">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Perception Layer</p>
        <AnimatedHeading
          text="See yourself differently."
          className="text-[clamp(2.8rem,7vw,6rem)] font-black text-gray-900 leading-tight mb-4"
        />
        <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
          GYF reads your proportions, palette, and presence — then builds a complete look designed exactly for your body.
        </p>
      </div>
      <PerceptionLayer />
      <CTABanner />
      <Footer />
    </div>
  )
}
