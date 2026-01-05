import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

// Modern ve Okunaklı Metin Fontu
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

// Otoriter Başlık Fontu
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BGC Sigorta | Hayatın Her Anında Güvendesiniz",
  description: "En uygun kasko, trafik ve sağlık sigortası teklifleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${manrope.variable} ${montserrat.variable} font-sans antialiased bg-brand-ice text-brand-blue`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
