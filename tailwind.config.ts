import type { Config } from "tailwindcss";

const config: Config = {
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
      colors: {
        petroleum: {
          50: "#eef5f7",
          100: "#d9e7eb",
          200: "#b5cfd8",
          300: "#7eacbb",
          400: "#4a8a9c",
          500: "#2f7180",
          600: "#275d6a",
          700: "#1e5362",
          800: "#173f4a",
          900: "#102f3b",
          950: "#0a1c24"
        },
        graphite: {
          50: "#f5f7f8",
          100: "#e5eaed",
          200: "#cdd6db",
          300: "#a8b5bd",
          400: "#7a8a94",
          500: "#68747d",
          600: "#4f5b63",
          700: "#39444c",
          800: "#273037",
          900: "#162027",
          950: "#0d1318"
        },
        signal: "#2f8f83",
        safety: {
          50: "#fff8e8",
          100: "#f7e5b5",
          200: "#efd07a",
          500: "#d39a2a",
          600: "#b77b16",
          700: "#8e5e0e"
        }
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
