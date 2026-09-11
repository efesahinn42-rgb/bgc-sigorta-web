import { sendLeadNotificationEmail } from "@/lib/server/lead-notifications";

type NotificationStatus = "pending" | "sent" | "failed";
import type { QuoteSubmissionData } from "@/lib/validations/quote-form";

type LeadRequestMeta = {
  clientIp: string;
  userAgent?: string | null;
};

// Bu projede veritabanı yok (bilinçli karar) — tek kalıcılık kanalı e-posta
// bildirimi. Lead ID sadece log/takip amaçlı, kalıcı bir kayda karşılık gelmez.
export async function createLeadAndNotify(submission: QuoteSubmissionData, meta: LeadRequestMeta) {
  const submittedAt = new Date();
  const leadId = `LEAD-${submittedAt.getTime()}`;

  let notificationStatus: NotificationStatus = "pending";
  let notificationError: string | null = null;

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

  return {
    leadId,
    notificationStatus,
    notificationError,
  };
}
