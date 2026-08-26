/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next.js not to bundle mysql2
  experimental: {
    serverComponentsExternalPackages: ['mysql2'],
  },

  images: {
    unoptimized: true,
  },

  webpack: (config) => {
    // Required for @xenova/transformers in Next.js (https://huggingface.co/docs/transformers.js/tutorials/next)
    config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      os: false,
    };

    return config;
  },
};

export default nextConfig;
