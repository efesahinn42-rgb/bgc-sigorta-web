import { NextRequest, NextResponse } from "next/server";
import { createLeadAndNotify } from "@/lib/server/lead-service";
import { getClientIp, quoteRateLimiter } from "@/lib/server/rate-limit";
import { quoteSubmissionSchema } from "@/lib/validations/quote-form";

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request.headers);

    if (!quoteRateLimiter.check(clientIp)) {
      return NextResponse.json(
        { error: "Çok fazla istek. Lütfen bir dakika sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Form verilerini doğrula
    const validationResult = quoteSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Form verileri geçersiz",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const submission = validationResult.data;
    const result = await createLeadAndNotify(submission, {
      clientIp,
      userAgent: request.headers.get("user-agent"),
    });

    if (result.notificationStatus === "failed") {
      console.error("Lead notification failed:", {
        leadId: result.leadId,
        error: result.notificationError,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Teklif talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
        leadId: result.leadId,
        notificationStatus: result.notificationStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}

// GET isteği için (opsiyonel - form durumunu kontrol etmek için)
export async function GET() {
  return NextResponse.json({ message: "Quote API endpoint" }, { status: 200 });
}
