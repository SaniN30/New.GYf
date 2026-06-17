import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import WhatWeDo from "@/components/sections/WhatWeDo";
import HowItWorks from "@/components/sections/HowItWorks";
import Vision from "@/components/sections/Vision";
import Intelligence from "@/components/sections/Intelligence";
import TheArc from "@/components/sections/TheArc";
import About from "@/components/sections/About";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <WhatWeDo />
      <HowItWorks />
      <Vision />
      <Intelligence />
      <TheArc />
      <About />
      <CTABanner />
    </>
  );
}
