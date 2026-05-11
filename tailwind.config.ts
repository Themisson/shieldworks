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
          50: "#edf7f8",
          100: "#d5edef",
          500: "#1d7580",
          700: "#14545d",
          900: "#0b3038"
        },
        graphite: {
          50: "#f5f7f8",
          100: "#e5eaed",
          500: "#68747d",
          700: "#39444c",
          900: "#162027"
        },
        signal: "#2f8f83"
      },
      boxShadow: {
        soft: "0 18px 48px rgba(22, 32, 39, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
