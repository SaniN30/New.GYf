import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Intelligence from '@/components/sections/Intelligence'
import CTABanner from '@/components/sections/CTABanner'
import AnimatedHeading from '@/components/AnimatedHeading'

export const metadata = {
  title: 'Intelligence — GYF',
  description: 'The AI pillars behind GYF — visual intelligence, personal taste engine, collective learning.',
}

export default function IntelligencePage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="pt-32 sm:pt-44 pb-10 sm:pb-14 max-w-5xl mx-auto px-5 sm:px-8">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Intelligence</p>
        <AnimatedHeading
          text="The mind behind the fit."
          className="text-[clamp(2.2rem,7vw,5rem)] font-black text-gray-900 leading-tight mb-5"
        />
        <p className="text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed">
          GYF is an AI-first product — intelligence is the foundation, not a feature bolted on later. Six pillars work together: visual style understanding, deep personal-taste modelling, collective intelligence, generative on-body visualization, honest confidence, and a compounding stylist that gets sharper the more people it dresses. Click any pillar to go deeper.
        </p>
      </div>
      <Intelligence />
      <CTABanner />
      <Footer />
    </div>
  )
}
