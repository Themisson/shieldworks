import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      /* V1 palette read from CSS variables, so the dark theme remaps it (tokens.css). */
      colors: {
        white: "rgb(var(--c-white) / <alpha-value>)",
        petroleum: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((k) => [
            k,
            `rgb(var(--c-petroleum-${k}) / <alpha-value>)`,
          ]),
        ),
        graphite: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((k) => [
            k,
            `rgb(var(--c-graphite-${k}) / <alpha-value>)`,
          ]),
        ),
        signal: "#2f8f83",
        safety: Object.fromEntries(
          [50, 100, 200, 500, 600, 700].map((k) => [
            k,
            `rgb(var(--c-safety-${k}) / <alpha-value>)`,
          ]),
        ),
      },
      boxShadow: {
        soft: "0 18px 48px rgba(16, 47, 59, 0.08)",
        card: "0 1px 2px rgba(16, 47, 59, 0.04), 0 12px 32px rgba(16, 47, 59, 0.06)",
        lift: "0 8px 28px rgba(16, 47, 59, 0.12)",
        glow: "0 0 0 1px rgba(47, 113, 128, 0.12), 0 12px 40px rgba(16, 47, 59, 0.1)",
        "inset-edge": "inset 0 1px 0 rgba(255, 255, 255, 0.08)"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem"
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 2.4s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
