/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Vercel: do NOT disable outputFileTracing
  // outputFileTracing: false, <-- removed, breaks Vercel serverless bundling

  // Tell Next.js not to bundle mysql2 (it has native bindings, must stay external)
  serverExternalPackages: ['mysql2'],

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
