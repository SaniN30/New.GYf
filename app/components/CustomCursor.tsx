"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    const dot = dotRef.current;
    if (!blob || !dot) return;

    let mouseX = -200, mouseY = -200;
    let blobX = -200, blobY = -200;
    let rafId: number;
    let hovered = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };

    const animate = () => {
      blobX += (mouseX - blobX) * 0.1;
      blobY += (mouseY - blobY) * 0.1;
      blob.style.left = blobX + "px";
      blob.style.top = blobY + "px";
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onEnter = () => {
      hovered = true;
      blob.style.width = "80px";
      blob.style.height = "80px";
    };
    const onLeave = () => {
      hovered = false;
      blob.style.width = "44px";
      blob.style.height = "44px";
    };

    const attach = () => {
      document.querySelectorAll("a, button, input").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Lagging inverting blob */}
      <div
        ref={blobRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "44px", height: "44px",
          borderRadius: "50%",
          background: "#ffffff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      {/* Instant sharp dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "5px", height: "5px",
          borderRadius: "50%",
          background: "#ffffff",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
