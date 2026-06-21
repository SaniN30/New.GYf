"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pressable } from "@/components/primitives/Pressable";
import { responsiveTransition } from "@/lib/motion";
import { track } from "@/lib/analytics";

interface PhotoCaptureSheetProps {
  onComplete: (uri: string) => void;
  onClose: () => void;
}

type PhotoState = "empty" | "uploading" | "reading" | "result";

const MOCK_TONES = [
  { color: "#C89B75", label: "Warm Sand" },
  { color: "#E0B899", label: "Medium" },
  { color: "#B87333", label: "Copper" },
  { color: "#8B5A2B", label: "Chestnut" },
];

const DEDUCED_CHIPS = [
  { label: "Skin Tone", value: "Medium / Warm" },
  { label: "Body Type", value: "Athletic" },
];

export function PhotoCaptureSheet({ onComplete, onClose }: PhotoCaptureSheetProps) {
  const prefersReduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoState, setPhotoState] = useState<PhotoState>("empty");
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [expandedChip, setExpandedChip] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    track({ event: "onboarding.photo_uploaded", fileSizeKb: Math.round(file.size / 1024) });

    const uri = URL.createObjectURL(file);
    setPreviewUri(uri);
    setPhotoState("uploading");

    setTimeout(() => setPhotoState("reading"), 1200);
    setTimeout(() => {
      setPhotoState("result");
      track({ event: "onboarding.color_extraction_shown", dominantColors: MOCK_TONES.map((t) => t.color) });
    }, 2800);
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center"
      style={{ background: "var(--scrim)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Upload a photo"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0, transition: { ...responsiveTransition, duration: 0.3 } }}
        exit={{ y: "100%", transition: responsiveTransition }}
        className="w-full max-w-sm rounded-t-2xl flex flex-col"
        style={{ background: "var(--canvas)", maxHeight: "90dvh", overflow: "hidden" }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--hairline)" }} />
        </div>

        <div className="flex items-center justify-between px-4 pb-3">
          <h2
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
          >
            Use a photo
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)", opacity: 0.5 }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 flex flex-col gap-5">
          <AnimatePresence mode="wait">
            {/* Empty state */}
            {photoState === "empty" && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: responsiveTransition }}
                exit={{ opacity: 0, transition: responsiveTransition }}
              >
                <button
                  onClick={() => inputRef.current?.click()}
                  className="w-full rounded-2xl flex flex-col items-center justify-center gap-3 focus-visible:outline-none"
                  style={{
                    border: "2px dashed var(--hairline)",
                    minHeight: 220,
                    background: "var(--surface-elevated)",
                    cursor: "pointer",
                  }}
                  aria-label="Upload a photo of yourself"
                >
                  <span style={{ fontSize: 40 }}>📷</span>
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)" }}
                  >
                    Upload a photo of yourself
                  </span>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)", opacity: 0.5 }}
                  >
                    JPG or PNG · face visible
                  </span>
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                  aria-label="Photo file input"
                />
              </motion.div>
            )}

            {/* Uploading skeleton */}
            {photoState === "uploading" && (
              <motion.div
                key="uploading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: responsiveTransition }}
                exit={{ opacity: 0, transition: responsiveTransition }}
                className="flex flex-col gap-3"
              >
                <div className="skeleton rounded-2xl w-full" style={{ height: 220 }} />
                <div className="skeleton rounded-lg w-3/4 h-4" />
                <div className="skeleton rounded-lg w-1/2 h-4" />
              </motion.div>
            )}

            {/* Reading — photo preview + color extract */}
            {(photoState === "reading" || photoState === "result") && previewUri && (
              <motion.div
                key="reading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: responsiveTransition }}
                exit={{ opacity: 0, transition: responsiveTransition }}
                className="flex flex-col gap-4"
              >
                {/* Full-bleed preview */}
                <div
                  className="w-full rounded-2xl overflow-hidden"
                  style={{ height: 220, position: "relative" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUri}
                    alt="Your uploaded photo"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Color swatches */}
                <div className="flex flex-col gap-2">
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)", opacity: 0.6 }}
                  >
                    Your tones
                  </span>
                  <div className="flex gap-3">
                    <AnimatePresence>
                      {MOCK_TONES.map((tone, i) => (
                        <motion.div
                          key={tone.color}
                          initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { ...responsiveTransition, delay: i * 0.07 },
                          }}
                          className="flex flex-col items-center gap-1"
                        >
                          <div
                            className="rounded-full"
                            style={{
                              width: 36,
                              height: 36,
                              background: tone.color,
                              border: "2px solid var(--hairline)",
                            }}
                          />
                          <span
                            className="text-xs"
                            style={{
                              fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                              color: "var(--ink)",
                              opacity: 0.55,
                              whiteSpace: "nowrap",
                              fontSize: 10,
                            }}
                          >
                            {tone.label}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Deduced attribute chips — result state only */}
                {photoState === "result" && (
                  <motion.div
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0, transition: responsiveTransition }}
                    className="flex flex-col gap-2"
                  >
                    <span
                      className="text-xs font-medium"
                      style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)", color: "var(--ink)", opacity: 0.6 }}
                    >
                      Deduced attributes
                    </span>
                    {DEDUCED_CHIPS.map((chip) => (
                      <div key={chip.label}>
                        <button
                          onClick={() =>
                            setExpandedChip(expandedChip === chip.label ? null : chip.label)
                          }
                          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm focus-visible:outline-none"
                          style={{
                            background: "var(--surface-elevated)",
                            border: "1.5px solid var(--hairline)",
                            color: "var(--ink)",
                            fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                            cursor: "pointer",
                          }}
                          aria-expanded={expandedChip === chip.label}
                        >
                          <span className="font-medium">{chip.label}</span>
                          <span style={{ opacity: 0.7 }}>{chip.value} {expandedChip === chip.label ? "▲" : "▼"}</span>
                        </button>
                        <AnimatePresence>
                          {expandedChip === chip.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1, transition: responsiveTransition }}
                              exit={{ height: 0, opacity: 0, transition: responsiveTransition }}
                              style={{ overflow: "hidden" }}
                            >
                              <p
                                className="px-3 py-2 text-xs"
                                style={{
                                  fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                                  color: "var(--ink)",
                                  opacity: 0.6,
                                }}
                              >
                                Detected from your photo using colour analysis. You can adjust this at any time in settings.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}

                    <Pressable
                      onClick={() => {
                        if (previewUri) onComplete(previewUri);
                      }}
                      className="w-full py-3 rounded-xl text-sm font-medium text-white mt-2"
                      style={{
                        background: "var(--accent-primary)",
                        border: "none",
                        fontFamily: "var(--font-body, 'General Sans', sans-serif)",
                      }}
                    >
                      Use these
                    </Pressable>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
