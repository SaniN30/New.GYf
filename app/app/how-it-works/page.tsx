import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HowItWorks from '@/components/sections/HowItWorks'
import CTABanner from '@/components/sections/CTABanner'
import AnimatedHeading from '@/components/AnimatedHeading'

export const metadata = {
  title: 'How It Works — GYF',
  description: 'Three steps to a complete, personalised outfit. GYF learns you, styles you, and gets smarter every time.',
}

export default function HowItWorksPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-32 sm:pt-44 pb-10 sm:pb-14 max-w-5xl mx-auto px-5 sm:px-8">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">How It Works</p>
        <AnimatedHeading
          text="Dressed in three steps."
          className="text-[clamp(2.2rem,7vw,5rem)] font-black text-gray-900 leading-tight mb-5"
        />
        <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
          From your first visit to your best-dressed day — GYF builds complete, explained outfits and gets smarter with every interaction. Click each step to learn more, and discover why an AI-first approach is the only way to truly solve personal style.
        </p>
      </div>
      <HowItWorks />
      <CTABanner />
      <Footer />
    </div>
  )
}
