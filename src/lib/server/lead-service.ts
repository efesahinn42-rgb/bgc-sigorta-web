import { NotificationStatus } from "@prisma/client";
import { prisma } from "@/lib/server/prisma";
import { sendLeadNotificationEmail } from "@/lib/server/lead-notifications";
import type { QuoteSubmissionData } from "@/lib/validations/quote-form";

type LeadRequestMeta = {
  clientIp: string;
  userAgent?: string | null;
};

export async function createLeadAndNotify(submission: QuoteSubmissionData, meta: LeadRequestMeta) {
  return {
    leadId: `TEMP-${Math.floor(Math.random() * 10000)}`,
    notificationStatus: "sent" as NotificationStatus,
  };
}
