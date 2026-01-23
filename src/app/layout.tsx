import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ToastProvider } from "@/components/ui/Toaster";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "BGC Sigorta | Hayatın Her Anında Güvendesiniz",
    template: "%s | BGC Sigorta",
  },
  description:
    "En uygun kasko, trafik ve sağlık sigortası teklifleri. 20+ sigorta şirketini karşılaştırın, en iyi fiyatı bulun. Konya merkezli güvenilir sigorta danışmanlığı.",
  keywords: [
    "sigorta",
    "kasko",
    "trafik sigortası",
    "sağlık sigortası",
    "konut sigortası",
    "DASK",
    "BGC Sigorta",
    "Konya sigorta",
  ],
  authors: [{ name: "BGC Sigorta" }],
  creator: "BGC Sigorta",
  publisher: "BGC Sigorta",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "BGC Sigorta",
    title: "BGC Sigorta | Hayatın Her Anında Güvendesiniz",
    description:
      "En uygun kasko, trafik ve sağlık sigortası teklifleri. 20+ sigorta şirketini karşılaştırın.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BGC Sigorta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BGC Sigorta | Hayatın Her Anında Güvendesiniz",
    description:
      "En uygun kasko, trafik ve sağlık sigortası teklifleri. 20+ sigorta şirketini karşılaştırın.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Google Search Console verification code (eklenecek)
    // google: "verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <GoogleAnalytics />
      </head>
      <body
        className={`${manrope.variable} ${montserrat.variable} font-sans antialiased bg-brand-ice text-brand-blue`}
      >
        <ErrorBoundary>
          <ToastProvider>
            <Navbar />
            {children}
            <CookieConsent />
            <Analytics />
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
