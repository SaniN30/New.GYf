import CTABanner from "@/components/sections/CTABanner";

export const metadata = {
  title: "The Intelligence — GYF",
  description: "How GYF thinks — visual style understanding, deep personal taste modelling, collective intelligence, and trust as a feature.",
};

export default function IntelligencePage() {
  return (
    <div>
      <div style={{ paddingTop: "140px", paddingBottom: "4rem", paddingLeft: "clamp(1.5rem, 5vw, 5rem)", paddingRight: "clamp(1.5rem, 5vw, 5rem)", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B7280", marginBottom: "1.5rem" }}>
          The Intelligence
        </p>
        <h1 style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 900, color: "#0A0A0A", lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: "760px", marginBottom: "1.5rem" }}>
          Intelligence as the foundation — not a feature added later.
        </h1>
        <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "#6B7280", maxWidth: "580px", lineHeight: 1.7 }}>
          GYF&apos;s core differentiation. Styling is a perception and preference problem — it must be seen, personalised, and continuously learned.
        </p>
      </div>
      <CTABanner />
    </div>
  );
}
