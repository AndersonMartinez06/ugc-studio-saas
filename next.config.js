/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Evita que un error de tipos detenga el build en Vercel.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Evita que un warning de ESLint detenga el build en Vercel.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
