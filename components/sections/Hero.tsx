"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background logo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/logo-bg.jpeg"
          alt=""
          fill
          className="object-cover opacity-10"
          style={{ filter: "blur(4px)" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/30 to-bg" />
      </div>

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,200,200,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <Image
            src="/assets/logo.png"
            alt="GYF"
            width={80}
            height={80}
            className="logo-white object-contain"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-light text-text-primary leading-none tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
            lineHeight: 0.95,
          }}
        >
          Your Style.
          <br />
          <em>Finally</em> Intelligent.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-text-muted max-w-xl mb-12"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(0.875rem, 1.5vw, 1.0625rem)",
            lineHeight: 1.75,
          }}
        >
          An AI stylist that learns what looks good on you — and builds complete,
          coordinated outfits you can trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#early-access" className="btn-outline">
            Get Early Access
          </a>
          <a
            href="#what-we-do"
            className="text-text-muted hover:text-text-primary transition-colors uppercase tracking-widest flex items-center gap-2"
            style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem" }}
          >
            Learn More <ArrowDown size={12} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-px h-14 origin-top"
          style={{
            background: "linear-gradient(to bottom, rgba(200,200,200,0.6), transparent)",
            animation: "scrollLine 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
