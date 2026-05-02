import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin Turbopack's workspace root to this project so it doesn't pick up
    // a parent-directory lockfile (e.g. C:\Users\aaron\package-lock.json).
    // import.meta.dirname is reliable in Node 20.11+ ESM; __dirname isn't.
    root: import.meta.dirname,
  },
};

export default nextConfig;
