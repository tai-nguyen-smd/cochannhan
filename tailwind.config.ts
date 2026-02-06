import type { Config } from "tailwindcss";

/**
 * Minimal config for tooling (e.g. shadcn CLI).
 * Tailwind v4 is configured in app/globals.css via @import "tailwindcss" and @theme.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
