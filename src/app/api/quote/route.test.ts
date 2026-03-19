// @vitest-environment node

import { POST } from "@/app/api/quote/route";
import { createLeadAndNotify } from "@/lib/server/lead-service";
import { getClientIp, quoteRateLimiter } from "@/lib/server/rate-limit";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/server/lead-service", () => ({
  createLeadAndNotify: vi.fn(),
}));

vi.mock("@/lib/server/rate-limit", () => ({
  getClientIp: vi.fn(() => "127.0.0.1"),
  quoteRateLimiter: {
    check: vi.fn(() => true),
  },
}));

const validPayload = {
  step: 3,
  selectedProduct: "kasko",
  formData: {
    productId: "kasko",
    tcKimlikNo: "12345678901",
    plaka: {
      ilKodu: "42",
      devam: "ABC 123",
    },
    asbisReferansNo: "ASBIS-1",
  },
  contact: {
    ad: "Ali",
    soyad: "Yilmaz",
    telefon: "05301234567",
    email: "ali@example.com",
    kvkkOnay: true,
  },
};

describe("POST /api/quote", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 200 for a valid payload", async () => {
    vi.mocked(createLeadAndNotify).mockResolvedValue({
      leadId: "lead_1",
      notificationStatus: "sent",
    });

    const request = new Request("http://localhost/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "vitest",
      },
      body: JSON.stringify(validPayload),
    }) as never;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.notificationStatus).toBe("sent");
    expect(getClientIp).toHaveBeenCalled();
  });

  it("returns 400 for an invalid payload", async () => {
    const request = new Request("http://localhost/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        step: 3,
        selectedProduct: "",
      }),
    }) as never;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Form verileri geçersiz");
  });

  it("returns 429 when rate limit is exceeded", async () => {
    vi.mocked(quoteRateLimiter.check).mockReturnValueOnce(false);

    const request = new Request("http://localhost/api/quote", {
      method: "POST",
      body: JSON.stringify(validPayload),
    }) as never;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toMatch(/Çok fazla istek/i);
  });

  it("returns 500 when database creation fails", async () => {
    vi.mocked(createLeadAndNotify).mockRejectedValue(new Error("db failed"));

    const request = new Request("http://localhost/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validPayload),
    }) as never;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toMatch(/Bir hata oluştu/i);
  });

  it("returns 200 and marks notification failure without losing the lead", async () => {
    vi.mocked(createLeadAndNotify).mockResolvedValue({
      leadId: "lead_2",
      notificationStatus: "failed",
      notificationError: "SMTP configuration is incomplete",
    });

    const request = new Request("http://localhost/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validPayload),
    }) as never;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.notificationStatus).toBe("failed");
  });
});
