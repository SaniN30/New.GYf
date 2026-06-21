"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pressable } from "@/components/primitives/Pressable";
import { responsiveTransition } from "@/lib/motion";
import { track } from "@/lib/analytics";

interface GuestConvertSheetProps {
  trigger: "save" | "add_to_cart";
  onClose: () => void;
}

type Step = "phone" | "otp";

const OTP_RESEND_SECONDS = 28;

export function GuestConvertSheet({ trigger, onClose }: GuestConvertSheetProps) {
  const prefersReduced = useReducedMotion();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(OTP_RESEND_SECONDS);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step !== "otp") return;
    setCountdown(OTP_RESEND_SECONDS);
    const interval = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  function handlePhoneSubmit() {
    if (phone.length >= 10) setStep("otp");
  }

  function handleOtpChange(idx: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (next.every((d) => d !== "") ) {
      track({ event: "onboarding.account_created", method: "phone" });
      setTimeout(onClose, 400);
    }
  }

  function handleOtpKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  }

  const mins = String(Math.floor(countdown / 60)).padStart(1, "0");
  const secs = String(countdown % 60).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "var(--scrim)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Save your look"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { ...responsiveTransition, duration: 0.3 } }}
        exit={{ y: "100%", transition: responsiveTransition }}
        className="w-full max-w-sm rounded-t-2xl flex flex-col surface-ink"
        style={{ maxHeight: "80dvh" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(227,224,216,0.3)" }} />
        </div>

        <div className="px-6 pt-4 pb-8 flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <h2
              className="text-display-s"
              style={{
                fontFamily: "var(--font-display, 'Fraunces', Georgia, serif)",
                color: "var(--canvas)",
              }}
            >
              Save your look
            </h2>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--canvas)", opacity: 0.5, marginTop: 4 }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <p
            className="text-sm"
            style={{
              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
              color: "var(--canvas)",
              opacity: 0.65,
            }}
          >
            {trigger === "save"
              ? "Create an account to save this outfit and come back to it anytime."
              : "Create an account to add to cart and track your order."}
          </p>

          <AnimatePresence mode="wait">
            {step === "phone" && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: prefersReduced ? 0 : 20 }}
                animate={{ opacity: 1, x: 0, transition: responsiveTransition }}
                exit={{ opacity: 0, x: prefersReduced ? 0 : -20, transition: responsiveTransition }}
                className="flex flex-col gap-4"
              >
                <div
                  className="flex items-center rounded-xl overflow-hidden"
                  style={{ border: "1.5px solid rgba(227,224,216,0.25)", background: "rgba(227,224,216,0.08)" }}
                >
                  <div
                    className="flex items-center gap-1.5 px-3 py-3 border-r"
                    style={{ borderColor: "rgba(227,224,216,0.2)" }}
                  >
                    <span aria-label="India flag" role="img">🇮🇳</span>
                    <span
                      className="text-sm"
                      style={{ fontFamily: "var(--font-mono, 'Fragment Mono', monospace)", color: "var(--canvas)", fontVariantNumeric: "tabular-nums" }}
                    >
                      +91
                    </span>
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="flex-1 px-3 py-3 bg-transparent text-sm focus-visible:outline-none"
                    style={{
                      fontFamily: "var(--font-mono, 'Fragment Mono', monospace)",
                      color: "var(--canvas)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                    aria-label="Phone number"
                  />
                </div>
                <Pressable
                  onClick={handlePhoneSubmit}
                  disabled={phone.length < 10}
                  className="w-full py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: "var(--canvas)",
                    color: "var(--ink)",
                    border: "none",
                    fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                  }}
                >
                  Send OTP
                </Pressable>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: prefersReduced ? 0 : 20 }}
                animate={{ opacity: 1, x: 0, transition: responsiveTransition }}
                exit={{ opacity: 0, x: prefersReduced ? 0 : -20, transition: responsiveTransition }}
                className="flex flex-col gap-5"
              >
                <p
                  className="text-xs"
                  style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--canvas)", opacity: 0.55 }}
                >
                  Enter the 6-digit code sent to +91 {phone}
                </p>
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="text-center rounded-xl focus-visible:outline-none"
                      style={{
                        width: 44,
                        height: 52,
                        background: "rgba(227,224,216,0.1)",
                        border: digit ? "2px solid var(--canvas)" : "1.5px solid rgba(227,224,216,0.25)",
                        color: "var(--canvas)",
                        fontFamily: "var(--font-mono, 'Fragment Mono', monospace)",
                        fontSize: "1.25rem",
                        fontVariantNumeric: "tabular-nums",
                      }}
                      aria-label={`OTP digit ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-mono, 'Fragment Mono', monospace)",
                      color: "var(--canvas)",
                      opacity: 0.5,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    Resend code in {mins}:{secs}
                  </span>
                  {countdown === 0 && (
                    <button
                      onClick={() => setCountdown(OTP_RESEND_SECONDS)}
                      className="text-xs underline focus-visible:outline-none"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--canvas)",
                        fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                      }}
                    >
                      Resend
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
