import HowItWorks from "@/components/sections/HowItWorks";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = {
  title: "How It Works — GYF",
  description: "Three steps to a complete, personalised outfit. GYF learns you, styles you, and gets smarter every time.",
};

export default function HowItWorksPage() {
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
          How It Works
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
          Dressed in three steps.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            color: "var(--mid)",
            maxWidth: "520px",
            lineHeight: 1.7,
          }}
        >
          From your first visit to your best-dressed day — GYF builds complete, explained outfits and gets smarter with every interaction.
        </p>
      </div>
      <HowItWorks />
      <CTABanner />
    </div>
  );
}
