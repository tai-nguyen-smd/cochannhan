import bundleAnalyzer from "@next/bundle-analyzer";

/**
 * Enable bundle analyzer via:
 * ANALYZE=true pnpm run build
 */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  /**
   * ============================
   * Static export
   * ============================
   */
  output: "export",

  /**
   * ============================
   * Images (export bắt buộc)
   * ============================
   */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  /**
   * ============================
   * Build speed trade-offs
   * ============================
   */
  typescript: {
    ignoreBuildErrors: true,
  },
  /**
   * ============================
   * Bundle size optimizations
   * ============================
   */

  // 🔥 Tree-shake icon & util libs
  modularizeImports: {
  },

  // 🔥 Better ESM tree-shaking (Radix zoo + heavy libs)
  experimental: {
    optimizePackageImports: [
      // Radix (mày dùng rất nhiều)
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-label",
      "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",

      // Heavy libs
      "lucide-react",
      "date-fns",
      "react-markdown",
      "recharts",
    ],
  },

  /**
   * ============================
   * Compiler optimizations
   * ============================
   */
  compiler: {
    // Strip console.* in production (giữ console.error)
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error"] }
        : false,
  },

  /**
   * ============================
   * Important notes
   * ============================
   *
   * - headers(), rewrites(), redirects()
   *   ❌ KHÔNG hoạt động với output: "export"
   *   → chuyển sang vercel.ts / CDN config
   *
   * - No API routes / middleware / SSR
   */
};

export default withBundleAnalyzer(nextConfig);
