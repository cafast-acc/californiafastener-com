import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin Turbopack's workspace root to this project so it doesn't pick up
    // a parent-directory lockfile (e.g. C:\Users\aaron\package-lock.json).
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
