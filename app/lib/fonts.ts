import { Fraunces, Fragment_Mono, Plus_Jakarta_Sans } from "next/font/google";

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

// Plus Jakarta Sans: modern, geometric sans-serif — body text and UI
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
