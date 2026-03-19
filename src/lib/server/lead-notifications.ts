import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";
import type { QuoteSubmissionData } from "@/lib/validations/quote-form";

type LeadNotificationMeta = {
  clientIp: string;
  userAgent?: string | null;
  submittedAt: string;
};

function getTransportConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, LEAD_NOTIFICATION_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM) {
    throw new Error("SMTP configuration is incomplete");
  }

  if (!LEAD_NOTIFICATION_TO) {
    throw new Error("LEAD_NOTIFICATION_TO is not configured");
  }

  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    from: SMTP_FROM,
    to: LEAD_NOTIFICATION_TO,
  };
}

function formatPayload(data: QuoteSubmissionData["formData"]) {
  switch (data.productId) {
    case "trafik":
    case "kasko":
      return [
        `Urun: ${data.productId}`,
        `TC Kimlik No: ${data.tcKimlikNo}`,
        `Plaka: ${data.plaka.ilKodu} ${data.plaka.devam}`,
        `ASBIS Referans No: ${data.asbisReferansNo || "-"}`,
      ];
    case "dask":
    case "konut":
    case "isyeri":
      return [
        `Urun: ${data.productId}`,
        `Il: ${data.il}`,
        `Ilce: ${data.ilce}`,
        `Brut Metrekare: ${data.brutMetrekare}`,
        `Bina Yapi Tarzi: ${data.binaYapiTarzi}`,
      ];
    case "saglik":
      return [
        `Urun: ${data.productId}`,
        `TC Kimlik No: ${data.tcKimlikNo}`,
        `Dogum Tarihi: ${data.dogumTarihi}`,
        `Cinsiyet: ${data.cinsiyet}`,
      ];
    case "seyahat":
      return [
        `Urun: ${data.productId}`,
        `TC Kimlik No: ${data.tcKimlikNo}`,
        `Dogum Tarihi: ${data.dogumTarihi}`,
        `Cinsiyet: ${data.cinsiyet}`,
        `Seyahat Bolgesi: ${data.seyahatUlke}`,
      ];
    case "pet":
      return [
        `Urun: ${data.productId}`,
        `TC Kimlik No: ${data.tcKimlikNo}`,
        `Dogum Tarihi: ${data.dogumTarihi}`,
        `Cinsiyet: ${data.cinsiyet}`,
        `Evcil Hayvan Turu: ${data.evcilHayvanTuru}`,
      ];
  }
}

export async function sendLeadNotificationEmail(
  submission: QuoteSubmissionData,
  meta: LeadNotificationMeta
) {
  const config = getTransportConfig();
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  const detailLines = formatPayload(submission.formData).join("\n");

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject: `${siteConfig.name} - Yeni ${submission.selectedProduct} talebi`,
    text: [
      `${siteConfig.legalName} web sitesinden yeni bir teklif talebi alindi.`,
      "",
      "Musteri Bilgileri",
      `Ad Soyad: ${submission.contact.ad} ${submission.contact.soyad}`,
      `Telefon: ${submission.contact.telefon}`,
      `E-posta: ${submission.contact.email || "-"}`,
      "",
      "Talep Detayi",
      detailLines,
      "",
      "Teknik Bilgiler",
      `Gonderim Zamani: ${meta.submittedAt}`,
      `IP: ${meta.clientIp}`,
      `User Agent: ${meta.userAgent || "-"}`,
    ].join("\n"),
  });
}
