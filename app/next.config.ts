import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // gyf-v2/ is the Bun workspace root where node_modules/next actually lives.
    // Without this, Turbopack walks up to ~/ and picks up a stray package-lock.json.
    root: path.resolve(__dirname, ".."),
  },
};

export default nextConfig;
