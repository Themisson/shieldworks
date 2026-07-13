import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        petroleum: {
          50: "#eef5f7",
          100: "#d9e7eb",
          500: "#2f7180",
          700: "#1e5362",
          900: "#102f3b"
        },
        graphite: {
          50: "#f5f7f8",
          100: "#e5eaed",
          500: "#68747d",
          700: "#39444c",
          900: "#162027"
        },
        signal: "#2f8f83",
        safety: {
          50: "#fff8e8",
          100: "#f7e5b5",
          500: "#d39a2a",
          600: "#b77b16",
          700: "#8e5e0e"
        }
      },
      boxShadow: {
        soft: "0 18px 48px rgba(22, 32, 39, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
