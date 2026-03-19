export interface SocialLink {
  name: string;
  label: string;
  href: string;
  hoverClass: string;
}

export const siteConfig = {
  name: "BGC Sigorta",
  legalName: "BGC Sigorta Hizmetleri A.Ş.",
  description:
    "En uygun kasko, trafik ve sağlık sigortası teklifleri. 20+ sigorta şirketini karşılaştırın, en iyi fiyatı bulun. Konya merkezli güvenilir sigorta danışmanlığı.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    phoneDisplay: "0530 232 27 42",
    phoneHref: "tel:+905302322742",
    email: "info@bgcsigorta.com",
    addressLine1: "Akabe, Şht. Furkan Doğan Cd.",
    addressLine2: "Bey Plaza Kat:1 No:3/122",
    city: "Karatay / Konya",
  },
  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.687254586616!2d32.5190924!3d37.8687895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d084357c91d84b%3A0x6476191986422d32!2sAkabe%2C%20Bey%20Plaza%20Kat%3A1%20No%3A3%2F122!5e0!3m2!1str!2str!4v1700000000000",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=37.8687895,32.5190924",
  },
  socialLinks: [] as SocialLink[],
  storageKeys: {
    consent: "cookie-consent",
    consentDate: "cookie-consent-date",
  },
} as const;
