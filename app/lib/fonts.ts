import { Fraunces, Fragment_Mono } from "next/font/google";

// Fraunces: variable font, soft axis — display/hero moments only
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-display",
  display: "swap",
});

// Fragment Mono: utility/data — confidence %, counters, prices, measurements
export const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

// General Sans is not on Google Fonts.
// Loaded via @font-face in globals.css using Bunny Fonts CDN.
// CSS variable: --font-body
