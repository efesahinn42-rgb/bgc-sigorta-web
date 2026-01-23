export function generateStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const organization = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: "BGC Sigorta Hizmetleri A.Ş.",
    alternateName: "BGC Sigorta",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    description:
      "Konya merkezli sigorta danışmanlık hizmetleri. Kasko, trafik, sağlık ve konut sigortası teklifleri.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Akabe, Şht. Furkan Doğan Cd. Bey Plaza Kat:1 No:3/122",
      addressLocality: "Karatay",
      addressRegion: "Konya",
      addressCountry: "TR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-530-232-27-42",
      contactType: "customer service",
      email: "info@bgcsigorta.com",
      areaServed: "TR",
      availableLanguage: "Turkish",
    },
    sameAs: [
      // Sosyal medya linkleri eklenecek
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BGC Sigorta",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/arama?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const services = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Kasko Sigortası",
      provider: {
        "@type": "InsuranceAgency",
        name: "BGC Sigorta",
      },
      areaServed: {
        "@type": "Country",
        name: "Turkey",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Trafik Sigortası",
      provider: {
        "@type": "InsuranceAgency",
        name: "BGC Sigorta",
      },
      areaServed: {
        "@type": "Country",
        name: "Turkey",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Sağlık Sigortası",
      provider: {
        "@type": "InsuranceAgency",
        name: "BGC Sigorta",
      },
      areaServed: {
        "@type": "Country",
        name: "Turkey",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Konut Sigortası",
      provider: {
        "@type": "InsuranceAgency",
        name: "BGC Sigorta",
      },
      areaServed: {
        "@type": "Country",
        name: "Turkey",
      },
    },
  ];

  return {
    organization,
    website,
    services,
  };
}
