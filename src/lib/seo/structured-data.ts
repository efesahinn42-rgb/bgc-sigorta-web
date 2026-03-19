import { siteConfig } from "@/lib/site-config";

export function generateStructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/logo.png`,
    image: `${siteConfig.siteUrl}/opengraph-image`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.contact.addressLine1} ${siteConfig.contact.addressLine2}`,
      addressLocality: "Karatay",
      addressRegion: "Konya",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-530-232-27-42",
      contactType: "customer service",
      email: siteConfig.contact.email,
      areaServed: "TR",
      availableLanguage: "Turkish",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  };

  return {
    organization,
    website,
  };
}
