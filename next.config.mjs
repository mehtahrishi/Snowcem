/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next.js not to bundle server-side ML or DB packages
  experimental: {
    serverComponentsExternalPackages: [
      'mysql2',
      'sharp',
      '@huggingface/transformers',
      '@xenova/transformers',
      'onnxruntime-node',
      'onnxruntime-web',
    ],
  },

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*",
      },
      {
        source: "/colour-visualiser",
        destination: "/color-visualizer",
      },
      {
        source: "/visualiser",
        destination: "/color-visualizer",
      },
      {
        source: "/find-dealer",
        destination: "/find-dealers",
      },
      {
        source: "/find-painter",
        destination: "/find-painters",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|mp4|webm|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...(isServer ? {} : { "sharp$": false }),
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

    config.plugins.push(
      new (class {
        apply(compiler) {
          compiler.hooks.compilation.tap("MarkOrtMinimizedPlugin", (compilation) => {
            compilation.hooks.processAssets.tap(
              {
                name: "MarkOrtMinimizedPlugin",
                stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE - 1,
              },
              (assets) => {
                for (const name of Object.keys(assets)) {
                  if (/ort.*\.mjs$/i.test(name)) {
                    const asset = compilation.getAsset(name);
                    if (asset) {
                      compilation.updateAsset(name, asset.source, {
                        ...asset.info,
                        minimized: true,
                      });
                    }
                  }
                }
              }
            );
          });
        }
      })()
    );

    return config;
  },
};

export default nextConfig;
