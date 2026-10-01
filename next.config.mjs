/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next.js not to bundle server-side ML or DB packages
  experimental: {
    serverComponentsExternalPackages: [
      'mysql2',
      '@huggingface/transformers',
      '@xenova/transformers',
      'onnxruntime-node',
      'onnxruntime-web',
    ],
  },

  images: {
    unoptimized: true,
  },

  webpack: (config) => {
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

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

export default nextConfig;
