"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu } from "lucide-react";

const navLinks = [
  { label: "What We Do", href: "#what-we-do" },
  { label: "Vision", href: "#vision" },
  { label: "The Arc", href: "#the-arc" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(13,13,13,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(42,42,42,0.6)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/assets/logo.png"
              alt="GYF"
              width={32}
              height={32}
              className="logo-white object-contain"
              priority
            />
            <span
              className="text-caption tracking-widest uppercase text-text-muted hidden sm:block"
              style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.7rem" }}
            >
              Get Your Fit
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-caption font-medium uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-200"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a href="#early-access" className="btn-outline hidden md:inline-flex text-xs">
              Get Early Access
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-text-muted hover:text-text-primary transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-bg flex flex-col">
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <Image
              src="/assets/logo.png"
              alt="GYF"
              width={28}
              height={28}
              className="logo-white object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-8 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-5xl font-light text-text-muted hover:text-text-primary transition-colors duration-200 py-4 border-b border-border"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#early-access"
              onClick={() => setMenuOpen(false)}
              className="btn-outline mt-10 self-start"
            >
              Get Early Access
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
