import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Senin belirlediğin Moodboard renkleri:
        brand: {
          red: "#D9232E", // BGC Kırmızısı (Canlı, dikkat çekici)
          blue: "#0F172A", // Güven Mavisi (Laciverte yakın, oturaklı)
          green: "#10B981", // Onay Yeşili
          ice: "#F8FAFC", // Zemin (Buz mavisi/Kırık beyaz - Göz yormayan)
          gray: "#64748B", // İkincil metinler için soft gri
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
