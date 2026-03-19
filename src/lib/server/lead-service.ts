import { NotificationStatus } from "@prisma/client";
import { prisma } from "@/lib/server/prisma";
import { sendLeadNotificationEmail } from "@/lib/server/lead-notifications";
import type { QuoteSubmissionData } from "@/lib/validations/quote-form";

type LeadRequestMeta = {
  clientIp: string;
  userAgent?: string | null;
};

export async function createLeadAndNotify(submission: QuoteSubmissionData, meta: LeadRequestMeta) {
  const lead = await prisma.lead.create({
    data: {
      selectedProduct: submission.selectedProduct,
      payload: submission.formData,
      ad: submission.contact.ad,
      soyad: submission.contact.soyad,
      telefon: submission.contact.telefon,
      email: submission.contact.email || null,
      kvkkOnay: submission.contact.kvkkOnay,
      kvkkAcceptedAt: submission.contact.kvkkOnay ? new Date() : null,
      clientIp: meta.clientIp,
      userAgent: meta.userAgent || null,
      notificationStatus: NotificationStatus.pending,
    },
  });

  const submittedAt = lead.createdAt.toISOString();

  try {
    await sendLeadNotificationEmail(submission, {
      clientIp: meta.clientIp,
      userAgent: meta.userAgent,
      submittedAt,
    });

    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        notificationStatus: NotificationStatus.sent,
        notificationError: null,
      },
    });

    return {
      leadId: lead.id,
      notificationStatus: NotificationStatus.sent,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bildirim gonderilemedi";

    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        notificationStatus: NotificationStatus.failed,
        notificationError: message,
      },
    });

    return {
      leadId: lead.id,
      notificationStatus: NotificationStatus.failed,
      notificationError: message,
    };
  }
}
