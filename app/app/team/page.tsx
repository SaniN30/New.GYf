"use client";

import CTABanner from "@/components/sections/CTABanner";

const team = [
  {
    name: "Sani N.",
    role: "Founder & CEO",
    bio: "Building GYF from the ground up — product vision, strategy, and everything in between. Obsessed with making great personal style accessible to everyone.",
    initials: "SN",
  },
];

const values = [
  {
    label: "AI-First",
    body: "Intelligence is the foundation of everything we build — not a feature added later.",
  },
  {
    label: "Trust-First",
    body: "Every recommendation is explainable and honest about its confidence. Transparency and sophistication advance together.",
  },
  {
    label: "People-First",
    body: "Deeply personal, private by design, and built to feel like it was made specifically for you.",
  },
  {
    label: "Quality-First",
    body: "We evaluate continuously so recommendation quality provably improves — we never silently regress.",
  },
];

export default function TeamPage() {
  return (
    <div>
      {/* Page header */}
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
          The Team
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
          Meet the people building GYF.
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
          A small, focused team on a big mission — making the intelligence of a personal stylist available to everyone, free and instant.
        </p>
      </div>

      {/* Team grid */}
      <section style={{ padding: "0 clamp(1.5rem, 5vw, 5rem) 6rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {team.map(({ name, role, bio, initials }) => (
              <div
                key={name}
                style={{
                  border: "1px solid var(--rule)",
                  borderRadius: "2px",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--bg)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {initials}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "1.4rem",
                      fontWeight: 400,
                      color: "var(--text)",
                      letterSpacing: "-0.01em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    {role}
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.95rem",
                    color: "var(--mid)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {bio}
                </p>
              </div>
            ))}

            {/* Open roles card */}
            <div
              style={{
                border: "1px dashed var(--rule)",
                borderRadius: "2px",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mid)",
                }}
              >
                We&apos;re growing
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                Want to help build the future of personal style?
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--mid)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                We&apos;re looking for people who care deeply about AI, fashion, and building products that genuinely improve people&apos;s lives.
              </p>
              <a
                href="mailto:gyf1ltd@gmail.com"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  textDecoration: "none",
                  marginTop: "0.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section
        style={{
          padding: "5rem clamp(1.5rem, 5vw, 5rem)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: "3rem",
            }}
          >
            What we stand for
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {values.map(({ label, body }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--text)",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {label}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.9rem",
                    color: "var(--mid)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
