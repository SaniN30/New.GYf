import WhatWeDo from "@/components/sections/WhatWeDo";
import CTABanner from "@/components/sections/CTABanner";
import AnimatedHeading from "@/components/AnimatedHeading";

export const metadata = {
  title: "Features — GYF",
  description: "Every capability GYF brings to your wardrobe — from AI outfit generation to virtual try-on and social style sharing.",
};

export default function FeaturesPage() {
  return (
    <div>
      <div
        className="page-header"
        style={{
          paddingTop: "140px",
          paddingBottom: "4rem",
          paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--mid)",
            marginBottom: "1.5rem",
          }}
        >
          Features
        </p>
        <AnimatedHeading
          text="Everything a personal stylist does — at scale."
          className="text-[clamp(2.8rem,7vw,6rem)] font-black text-gray-900 leading-tight mb-6 max-w-[700px]"
        />
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            color: "var(--mid)",
            maxWidth: "540px",
            lineHeight: 1.7,
          }}
        >
          From AI outfit generation and virtual try-on to natural-language styling goals, social style sharing, and a personal wardrobe — every capability a professional stylist brings, available to everyone instantly and for free.
        </p>
      </div>
      <WhatWeDo />
      <CTABanner />
    </div>
  );
}
