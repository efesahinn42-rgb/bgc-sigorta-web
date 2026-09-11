import { NotificationStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/server/prisma";
import { sendLeadNotificationEmail } from "@/lib/server/lead-notifications";
import type { QuoteSubmissionData } from "@/lib/validations/quote-form";

type LeadRequestMeta = {
  clientIp: string;
  userAgent?: string | null;
};

export async function createLeadAndNotify(submission: QuoteSubmissionData, meta: LeadRequestMeta) {
  const submittedAt = new Date();

  const lead = await prisma.lead.create({
    data: {
      selectedProduct: submission.selectedProduct,
      payload: submission.formData as Prisma.InputJsonValue,
      ad: submission.contact.ad,
      soyad: submission.contact.soyad,
      telefon: submission.contact.telefon,
      email: submission.contact.email || null,
      kvkkOnay: submission.contact.kvkkOnay,
      kvkkAcceptedAt: submittedAt,
      clientIp: meta.clientIp,
      userAgent: meta.userAgent ?? null,
      notificationStatus: "pending",
    },
  });

  let notificationStatus: NotificationStatus = "pending";
  let notificationError: string | null = null;

  // E-posta gönderimi başarısız olsa bile lead veritabanında kalır —
  // müşteri talebi hiçbir zaman sessizce kaybolmaz.
  try {
    await sendLeadNotificationEmail(submission, {
      clientIp: meta.clientIp,
      userAgent: meta.userAgent,
      submittedAt: submittedAt.toISOString(),
    });
    notificationStatus = "sent";
  } catch (error) {
    notificationStatus = "failed";
    notificationError = error instanceof Error ? error.message : "Bilinmeyen hata";
  }

  await prisma.lead.update({
    where: { id: lead.id },
    data: { notificationStatus, notificationError },
  });

  return {
    leadId: lead.id,
    notificationStatus,
    notificationError,
  };
}
