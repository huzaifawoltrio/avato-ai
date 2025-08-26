/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other configurations can go here

  // WARNING: This is a temporary solution and not recommended for production.
  // It's better to fix the underlying issues.
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    // !! WARN !!
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
