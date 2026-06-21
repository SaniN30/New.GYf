"use client";

interface StylistNotesPanelProps {
  note: string;
}

export function StylistNotesPanel({ note }: StylistNotesPanelProps) {
  return (
    <div className="px-4 py-3" style={{ color: "var(--ink)" }}>
      <p
        className="text-sm leading-relaxed"
        style={{
          fontFamily: "var(--font-display, 'Fraunces', Georgia, serif)",
          fontStyle: "italic",
        }}
      >
        &ldquo;{note}&rdquo;
      </p>
      <span
        className="text-xs mt-1 block opacity-60"
        style={{ fontFamily: "var(--font-body, 'General Sans', sans-serif)" }}
      >
        — Your stylist
      </span>
    </div>
  );
}
