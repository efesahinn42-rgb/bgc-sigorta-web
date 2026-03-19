import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { ToastProvider } from "@/components/ui/Toaster";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { AnalyticsGate } from "@/components/analytics/AnalyticsGate";
import { siteConfig } from "@/lib/site-config";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "BGC Sigorta | Hayatın Her Anında Güvendesiniz",
    template: "%s | BGC Sigorta",
  },
  description: siteConfig.description,
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
    siteName: siteConfig.name,
    title: "BGC Sigorta | Hayatın Her Anında Güvendesiniz",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Open Graph`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BGC Sigorta | Hayatın Her Anında Güvendesiniz",
    description: siteConfig.description,
    images: ["/opengraph-image"],
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
        <ConsentProvider>
          <ErrorBoundary>
            <ToastProvider>
              <AnalyticsGate />
              <Navbar />
              {children}
              <CookieConsent />
            </ToastProvider>
          </ErrorBoundary>
        </ConsentProvider>
      </body>
    </html>
  );
}
