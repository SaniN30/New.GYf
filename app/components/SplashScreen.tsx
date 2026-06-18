"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // 3D mouse tracking + cursor glow trail
    const onMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * -10;
      const ry = ((e.clientX - cx) / rect.width) * 10;
      stage.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

      // Move the radial cursor glow
      if (trailRef.current) {
        trailRef.current.style.left = `${e.clientX}px`;
        trailRef.current.style.top = `${e.clientY}px`;
        trailRef.current.style.opacity = "1";
      }
    };
    const onMouseLeave = () => {
      stage.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
      if (trailRef.current) trailRef.current.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Animate gold line
    if (lineRef.current) {
      lineRef.current.style.transition = "width 2.4s cubic-bezier(0.16,1,0.3,1)";
      requestAnimationFrame(() => {
        if (lineRef.current) lineRef.current.style.width = "100%";
      });
    }

    const dismiss = () => {
      const el = document.getElementById("gyf-splash");
      if (!el) return;
      el.style.transition = "opacity 0.65s ease";
      el.style.opacity = "0";
      setTimeout(() => {
        setVisible(false);
        const page = document.getElementById("page");
        if (page) page.classList.add("show");
      }, 680);
    };

    const timer = setTimeout(dismiss, 2800);
    const onKey = () => { clearTimeout(timer); dismiss(); };
    const onClick = () => { clearTimeout(timer); dismiss(); };

    document.addEventListener("keydown", onKey, { once: true });
    document.getElementById("gyf-splash")?.addEventListener("click", onClick, { once: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="gyf-splash"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        cursor: "none",
        overflow: "hidden",
      }}
    >
      {/* Cursor glow trail */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.08s ease, top 0.08s ease, opacity 0.4s ease",
          opacity: 0,
          zIndex: 1,
        }}
      />

      {/* Stage with 3D tilt */}
      <div
        ref={stageRef}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          transformStyle: "preserve-3d",
          transition: "transform 0.12s ease",
        }}
      >
        <Image
          src="/assets/logo-new.png"
          alt="GYF"
          width={180}
          height={180}
          style={{ filter: "brightness(0) invert(1)" }}
          priority
        />
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 300,
            fontSize: "0.58rem",
            textTransform: "uppercase",
            letterSpacing: "0.55em",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Get Your Fit
        </p>
      </div>

      {/* Skip hint */}
      <p
        style={{
          position: "absolute",
          bottom: "3.5rem",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "9px",
          letterSpacing: "0.28em",
          color: "rgba(255,255,255,0.18)",
          textTransform: "uppercase",
          zIndex: 2,
        }}
      >
        Click to enter
      </p>

      {/* White bottom line */}
      <div
        ref={lineRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          width: "0%",
          background: "rgba(255,255,255,0.3)",
          zIndex: 2,
        }}
      />
    </div>
  );
}
