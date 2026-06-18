import Vision from "@/components/sections/Vision";
import TheArc from "@/components/sections/TheArc";
import CTABanner from "@/components/sections/CTABanner";

export const metadata = {
  title: "Vision — GYF",
  description: "Where GYF is going — the product arc from intelligent stylist to ambient styling intelligence.",
};

export default function VisionPage() {
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
          Vision
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 400,
            color: "var(--text)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "760px",
            marginBottom: "1.5rem",
          }}
        >
          A universal personal stylist. Free, instant, yours.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            color: "var(--mid)",
            maxWidth: "560px",
            lineHeight: 1.7,
          }}
        >
          A personal stylist has always been a luxury. GYF makes that intelligence universal — a compounding system that gets smarter for every person it dresses.
        </p>
      </div>
      <Vision />
      <TheArc />
      <CTABanner />
    </div>
  );
}
