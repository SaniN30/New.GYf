import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import StatsRow from '@/components/sections/StatsRow'
import StylistFeature from '@/components/sections/StylistFeature'
import PerceptionLayer from '@/components/sections/PerceptionLayer'
import WhatWeDo from '@/components/sections/WhatWeDo'
import HowItWorks from '@/components/sections/HowItWorks'
import Vision from '@/components/sections/Vision'
import TheArc from '@/components/sections/TheArc'
import About from '@/components/sections/About'
import CTABanner from '@/components/sections/CTABanner'

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <StatsRow />
      <StylistFeature />
      <PerceptionLayer />
      <WhatWeDo />
      <HowItWorks />
      <Vision />
      <TheArc />
      <About />
      <CTABanner />
      <Footer />
    </main>
  )
}
