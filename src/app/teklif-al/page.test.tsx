import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TeklifAlPage from "@/app/teklif-al/TeklifAlPageClient";
import { ToastProvider } from "@/components/ui/Toaster";

const fetchMock = vi.fn();

function renderPage() {
  return render(
    <ToastProvider>
      <TeklifAlPage />
    </ToastProvider>
  );
}

async function goToVehicleStep() {
  renderPage();
  fireEvent.click(screen.getByRole("button", { name: /Trafik Sigortası/i }));
  fireEvent.click(screen.getByRole("button", { name: /Devam Et/i }));

  await screen.findByText(/Trafik Sigortası Bilgileri/i);
}

async function goToHomeStep() {
  renderPage();
  fireEvent.click(screen.getByRole("button", { name: /Konut Sigortası/i }));
  fireEvent.click(screen.getByRole("button", { name: /Devam Et/i }));

  await screen.findByText(/Konut Sigortası Bilgileri/i);
}

async function goToTravelStep() {
  renderPage();
  fireEvent.click(screen.getByRole("button", { name: /Seyahat Sağlık/i }));
  fireEvent.click(screen.getByRole("button", { name: /Devam Et/i }));

  await screen.findByText(/Seyahat Sağlık Bilgileri/i);
}

async function goToContactStep() {
  await goToVehicleStep();

  fireEvent.change(screen.getByLabelText(/TC Kimlik No/i), {
    target: { value: "12345678901" },
  });
  fireEvent.change(screen.getByLabelText(/Plaka İl Kodu/i), {
    target: { value: "42" },
  });
  fireEvent.change(screen.getByLabelText(/Plaka Devamı/i), {
    target: { value: "ABC 123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /İletişim Bilgileri/i }));

  await screen.findByText(/Son olarak, sizi tanıyalım/i);
}

describe("TeklifAlPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  it("prevents moving forward without a product selection", () => {
    renderPage();

    expect(screen.getByRole("button", { name: /Devam Et/i })).toBeDisabled();
  });

  it("requires vehicle fields before moving to contact step", async () => {
    await goToVehicleStep();

    fireEvent.click(screen.getByRole("button", { name: /İletişim Bilgileri/i }));

    expect(await screen.findByText(/TC Kimlik No 11 haneli olmalıdır/i)).toBeInTheDocument();
    expect(screen.getByText(/Plaka il kodu 2 haneli olmalıdır/i)).toBeInTheDocument();
    expect(screen.getByText(/Plaka devamı gereklidir/i)).toBeInTheDocument();
  });

  it("requires home fields before moving to contact step", async () => {
    await goToHomeStep();

    fireEvent.click(screen.getByRole("button", { name: /İletişim Bilgileri/i }));

    expect(await screen.findByText(/İl seçimi gereklidir/i)).toBeInTheDocument();
    expect(screen.getByText(/İlçe seçimi gereklidir/i)).toBeInTheDocument();
    expect(screen.getByText(/Metrekare bilgisi gereklidir/i)).toBeInTheDocument();
    expect(screen.getByText(/Bina yapı tarzı seçimi gereklidir/i)).toBeInTheDocument();
  });

  it("requires travel-specific health fields before moving to contact step", async () => {
    await goToTravelStep();

    fireEvent.click(screen.getByRole("button", { name: /İletişim Bilgileri/i }));

    expect(await screen.findByText(/TC Kimlik No 11 haneli olmalıdır/i)).toBeInTheDocument();
    expect(screen.getByText(/Doğum tarihi gereklidir/i)).toBeInTheDocument();
    expect(screen.getByText(/Cinsiyet seçimi gereklidir/i)).toBeInTheDocument();
    expect(screen.getByText(/Seyahat bölgesi seçimi gereklidir/i)).toBeInTheDocument();
  });

  it("blocks invalid contact information on submit", async () => {
    await goToContactStep();

    fireEvent.change(screen.getByLabelText(/Adınız/i), {
      target: { value: "A" },
    });
    fireEvent.change(screen.getByLabelText(/Soyadınız/i), {
      target: { value: "B" },
    });
    fireEvent.change(screen.getByLabelText(/Cep Telefonu/i), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText(/E-Posta/i), {
      target: { value: "invalid-mail" },
    });

    fireEvent.click(screen.getByRole("button", { name: /ÜCRETSİZ TEKLİF AL/i }));

    expect(await screen.findByText(/Ad en az 2 karakter olmalıdır/i)).toBeInTheDocument();
    expect(screen.getByText(/Soyad en az 2 karakter olmalıdır/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Telefon numarası geçerli formatta olmalıdır/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Geçerli bir e-posta adresi giriniz/i)).toBeInTheDocument();
    expect(screen.getByText(/KVKK aydınlatma metnini kabul etmelisiniz/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("shows success screen after a successful submit", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        message: "Teklif talebiniz başarıyla alındı.",
        leadId: "lead_123",
        notificationStatus: "sent",
      }),
    });

    await goToContactStep();

    fireEvent.change(screen.getByLabelText(/Adınız/i), {
      target: { value: "Ali" },
    });
    fireEvent.change(screen.getByLabelText(/Soyadınız/i), {
      target: { value: "Yılmaz" },
    });
    fireEvent.change(screen.getByLabelText(/Cep Telefonu/i), {
      target: { value: "05301234567" },
    });
    fireEvent.change(screen.getByLabelText(/E-Posta/i), {
      target: { value: "ali@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/Aydınlatma Metni/i));
    fireEvent.click(screen.getByRole("button", { name: /ÜCRETSİZ TEKLİF AL/i }));

    await waitFor(() => {
      expect(screen.getByText(/Harika! Talebiniz Alındı/i)).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/quote",
      expect.objectContaining({
        method: "POST",
      })
    );
    expect(screen.getByText(/Talep numarası:/i)).toBeInTheDocument();
  });
});
