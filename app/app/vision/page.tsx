import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Vision from '@/components/sections/Vision'
import About from '@/components/sections/About'
import TheArc from '@/components/sections/TheArc'
import CTABanner from '@/components/sections/CTABanner'
import AnimatedHeading from '@/components/AnimatedHeading'

export const metadata = {
  title: 'Vision — GYF',
  description: 'Where GYF is going — the product arc from intelligent stylist to ambient styling intelligence.',
}

export default function VisionPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-32 sm:pt-44 pb-10 sm:pb-14 max-w-5xl mx-auto px-5 sm:px-8">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Vision</p>
        <AnimatedHeading
          text="A universal personal stylist. Free, instant, yours."
          className="text-[clamp(2.2rem,7vw,5rem)] font-black text-gray-900 leading-tight mb-5"
        />
        <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
          A personal stylist has always been a luxury for the few. GYF makes that intelligence universal — a compounding system that gets smarter for every person it dresses, grounded in four core missions and built toward a five-phase arc.
        </p>
      </div>
      <Vision />
      <TheArc />
      <About />
      <CTABanner />
      <Footer />
    </div>
  )
}
