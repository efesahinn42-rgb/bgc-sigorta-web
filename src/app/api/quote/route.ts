import { NextRequest, NextResponse } from "next/server";
import { quoteFormSchema, type QuoteFormData } from "@/lib/validations/quote-form";

// Rate limiting için basit bir in-memory store (production'da Redis kullanılmalı)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 1000 }); // 1 dakika
    return true;
  }

  if (limit.count >= 5) {
    // 1 dakikada 5 istekten fazla
    return false;
  }

  limit.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIP || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!rateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Çok fazla istek. Lütfen bir dakika sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Form verilerini doğrula
    const validationResult = quoteFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Form verileri geçersiz",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Burada form verilerini işleyebilirsiniz:
    // - Veritabanına kaydetme
    // - Email gönderme
    // - Harici API'lere gönderme
    // - CRM sistemine entegrasyon

    // Örnek: Form verilerini loglama (production'da kaldırılmalı)
    console.log("Form gönderildi:", {
      product: formData.selectedProduct,
      timestamp: new Date().toISOString(),
      ip: clientIP,
    });

    // Email gönderimi (opsiyonel - SMTP yapılandırması gerekli)
    // if (env.SMTP_HOST) {
    //   await sendEmail(formData);
    // }

    // Veritabanı kaydı (opsiyonel - Prisma veya başka ORM gerekli)
    // await db.quote.create({ data: formData });

    return NextResponse.json(
      {
        success: true,
        message: "Teklif talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
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
