import WhatWeDo from "@/components/sections/WhatWeDo";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = {
  title: "Features — GYF",
  description: "Every capability GYF brings to your wardrobe — from AI outfit generation to virtual try-on and social style sharing.",
};

export default function FeaturesPage() {
  return (
    <div>
      <div
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
        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 400,
            color: "var(--text)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "700px",
            marginBottom: "1.5rem",
          }}
        >
          Everything a personal stylist does — at scale.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            color: "var(--mid)",
            maxWidth: "540px",
            lineHeight: 1.7,
          }}
        >
          Complete outfit generation, deep personalisation, virtual try-on, social style sharing, and honest AI confidence — all in one place.
        </p>
      </div>
      <WhatWeDo />
      <CTABanner />
    </div>
  );
}
