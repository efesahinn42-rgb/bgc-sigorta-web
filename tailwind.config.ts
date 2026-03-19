import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#D9232E",
          blue: "#0F172A",
          green: "#10B981",
          ice: "#F8FAFC",
          gray: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        heading: ["var(--font-montserrat)"],
      },
      boxShadow: {
        float:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
