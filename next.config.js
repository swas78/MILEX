if (typeof global !== 'undefined' && typeof global.localStorage !== 'undefined' && !global.localStorage.getItem) {
  global.localStorage.getItem = () => null;
  global.localStorage.setItem = () => {};
  global.localStorage.removeItem = () => {};
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  experimental: {
    instrumentationHook: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
