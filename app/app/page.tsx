import Intro from '@/components/Intro'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import WhatWeDo from '@/components/sections/WhatWeDo'
import HowItWorks from '@/components/sections/HowItWorks'
import PerceptionLayer from '@/components/sections/PerceptionLayer'
import Intelligence from '@/components/sections/Intelligence'
import TheArc from '@/components/sections/TheArc'
import Vision from '@/components/sections/Vision'
import About from '@/components/sections/About'
import CTABanner from '@/components/sections/CTABanner'

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <Intro />
      <Navbar />
      <Hero />
      <PerceptionLayer />
      <WhatWeDo />
      <HowItWorks />
      <Vision />
      <Intelligence />
      <TheArc />
      <About />
      <CTABanner />
      <Footer />
    </div>
  )
}
