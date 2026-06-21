/**
 * Token contract — Phase 5.2
 * Enforces that no component file imports raw hex color values or raw millisecond
 * durations. All such values must live exclusively in lib/tokens.ts.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

// Raw hex regex: matches #RGB, #RRGGBB, #RRGGBBAA (but not in comments)
const RAW_HEX_RE = /(?<!\/\/.*)(?<![a-zA-Z])#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})\b/g;

// Raw duration that looks like a magic number in a motion context
// e.g. duration: 350, transition: { duration: 0.4 } — anything not in motion.ts
const RAW_DURATION_MS_RE = /duration:\s*([\d]+)\s*[,}](?!\s*\/\/\s*ok)/g;

// Files that ARE allowed to contain raw hex values
const ALLOWLIST_HEX = new Set([
  "lib/tokens.ts",       // source of truth
  "lib/mock-data.ts",    // garment colour swatches (visual data, not design tokens)
  "components/onboarding/WelcomeScreen.tsx", // collage card colours mirror mock-data
  "tailwind.config.ts",  // mirrors tokens.ts with inline comment
]);

// Files that ARE allowed to contain raw ms durations
const ALLOWLIST_DURATION = new Set([
  "lib/tokens.ts",
  "lib/motion.ts",
  "components/onboarding/GeneratingScreen.tsx", // setTimeout timers (UC12 thresholds)
  "components/onboarding/ActionRow.tsx",        // toast auto-dismiss timer
  "components/onboarding/GuestConvertSheet.tsx",// OTP countdown timer
]);

// Scope: only the onboarding surface and lib we own (not pre-existing landing pages)
const SCAN_DIRS = [
  "app/onboarding",
  "components/onboarding",
  "components/primitives",
  "lib",
];

function collectTsxFiles(dir: string, root: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (["node_modules", ".next", "__tests__"].includes(entry)) continue;
      files.push(...collectTsxFiles(full, root));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      files.push(full.replace(root + "/", ""));
    }
  }
  return files;
}

const ROOT = join(__dirname, "..");
const ALL_FILES = SCAN_DIRS.flatMap((d) => {
  const full = join(ROOT, d);
  try { return collectTsxFiles(full, ROOT); } catch { return []; }
});

describe("Token contract — no raw hex in components", () => {
  const violations: string[] = [];

  for (const rel of ALL_FILES) {
    if (ALLOWLIST_HEX.has(rel)) continue;
    const content = readFileSync(join(ROOT, rel), "utf8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      if (line.trim().startsWith("//") || line.trim().startsWith("*")) return;
      const matches = [...line.matchAll(RAW_HEX_RE)];
      if (matches.length) {
        violations.push(`${rel}:${i + 1} — raw hex: ${matches.map((m) => m[0]).join(", ")}`);
      }
    });
  }

  it("no component file contains raw hex colour values", () => {
    expect(violations).toEqual([]);
  });
});

describe("Token contract — no magic ms durations in motion code", () => {
  const violations: string[] = [];

  for (const rel of ALL_FILES) {
    if (ALLOWLIST_DURATION.has(rel)) continue;
    const content = readFileSync(join(ROOT, rel), "utf8");
    const matches = [...content.matchAll(RAW_DURATION_MS_RE)];
    for (const m of matches) {
      const val = Number(m[1]);
      // Only flag integers ≥ 50 that look like raw ms, not 0 or very small
      if (val >= 50) {
        violations.push(`${rel} — raw ms duration: duration: ${m[1]}`);
      }
    }
  }

  it("no component file contains raw integer millisecond durations", () => {
    expect(violations).toEqual([]);
  });
});
