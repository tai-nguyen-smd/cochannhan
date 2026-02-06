import type { VercelConfig } from "@vercel/config";

/**
 * Vercel config for Next.js static export
 * https://vercel.com/docs/project-configuration/vercel-ts
 */
const config: VercelConfig = {
  // 🔹 Static output folder from `next build`
  outputDirectory: "out",

  // 🔹 Build command
  buildCommand: "npm run build",

  // 🔹 Framework preset
  framework: "nextjs",

  // 🔹 Clean output before build (tránh file rác)
  cleanUrls: true,

  // 🔹 Headers cho static assets
  headers: [
    {
      source: "/_next/static/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(.*).(js|css|png|jpg|svg|woff2)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],

  // 🔹 Redirects (STATIC OK)
  redirects: [
    {
      source: "/home",
      destination: "/",
      permanent: true,
    },
  ],

  // 🔹 Rewrites (chỉ rewrite STATIC)
  rewrites: [
    {
      source: "/app",
      destination: "/index.html",
    },
  ],
};

export default config;
