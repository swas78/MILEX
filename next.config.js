/** @type {import('next').NextConfig} */

// When building for Capacitor (Android/iOS), use static export.
// When building for Vercel, skip static export so routing works normally.
// Run: NEXT_MOBILE_BUILD=true next build   → generates /out for Capacitor
// Run: next build                          → normal Vercel deploy
const isMobileBuild = process.env.NEXT_MOBILE_BUILD === 'true';

const nextConfig = {
  reactStrictMode: true,
  ...(isMobileBuild && { output: 'export' }),
  images: {
    unoptimized: true, // Required for Capacitor — Next Image optimizer unavailable on-device
  },
};

module.exports = nextConfig;
