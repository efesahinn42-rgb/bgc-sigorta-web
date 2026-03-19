"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Car,
  Cat,
  CheckCircle,
  Clock,
  FileCheck,
  Heart,
  Home,
  Plane,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useToast } from "@/components/ui/Toaster";
import {
  HEALTH_GENDERS,
  HOME_BUILDING_TYPES,
  PET_TYPES,
  TRAVEL_DESTINATIONS,
  buildQuotePayload,
  getStepSchema,
  getStepTwoFieldNames,
  quoteWizardDefaults,
  type QuoteSubmissionData,
  type QuoteWizardFormValues,
} from "@/lib/validations/quote-form";
import {
  getQuoteProduct,
  isQuoteProductId,
  quoteProducts,
  type QuoteProductId,
} from "@/lib/quote-products";

const productIcons = {
  trafik: Truck,
  kasko: Car,
  dask: Building2,
  konut: Home,
  saglik: Heart,
  seyahat: Plane,
  isyeri: Briefcase,
  pet: Cat,
} as const;

const contactFieldNames = ["ad", "soyad", "telefon", "email", "kvkkOnay"] as const;

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm font-medium text-red-600">{message}</p>;
}

function normalizeDigits(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/\D/g, "")
    .slice(0, maxLength);
}

function normalizePlateSuffix(value: unknown) {
  return String(value ?? "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toUpperCase()
    .trimStart();
}

export default function TeklifAlPage() {
  const [step, setStep] = useState(1);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<{
    productName: string;
    leadId?: string;
    notificationStatus?: string;
  } | null>(null);
  const stepRef = useRef(step);
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("product");
  const { addToast } = useToast();

  stepRef.current = step;

  const resolver: Resolver<QuoteWizardFormValues> = async (values, context, options) => {
    const schema = getStepSchema(stepRef.current, values.selectedProduct);

    return zodResolver(schema)(values, context, options);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<QuoteWizardFormValues>({
    defaultValues: quoteWizardDefaults,
    resolver,
    mode: "onTouched",
  });

  const selectedProduct = watch("selectedProduct");
  const currentProduct = isQuoteProductId(selectedProduct) ? getQuoteProduct(selectedProduct) : null;
  const currentCategory = currentProduct?.category;

  useEffect(() => {
    if (isQuoteProductId(preselectedProduct)) {
      setValue("selectedProduct", preselectedProduct, {
        shouldDirty: false,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [preselectedProduct, setValue]);

  const handleSelectProduct = (productId: QuoteProductId) => {
    setSubmissionError(null);
    setValue("selectedProduct", productId, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleNext = async () => {
    setSubmissionError(null);

    if (step === 1) {
      const isValid = await trigger(["selectedProduct"], { shouldFocus: true });

      if (isValid) {
        setStep(2);
      }

      return;
    }

    if (step === 2 && currentProduct) {
      const isValid = await trigger(getStepTwoFieldNames(currentProduct.id), {
        shouldFocus: true,
      });

      if (isValid) {
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    setSubmissionError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = handleSubmit(async (values) => {
    setSubmissionError(null);

    let payload: QuoteSubmissionData;

    try {
      payload = buildQuotePayload(values);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Form verileri hazırlanırken bir hata oluştu.";
      setSubmissionError(message);
      addToast({ type: "error", message });
      return;
    }

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        error?: string;
        message?: string;
        leadId?: string;
        notificationStatus?: string;
      };

      if (!response.ok) {
        const message = data.error || "Teklif talebi gönderilemedi. Lütfen tekrar deneyin.";
        setSubmissionError(message);
        addToast({ type: "error", message });
        return;
      }

      setSubmittedLead({
        productName: currentProduct?.name || "Sigorta talebi",
        leadId: data.leadId,
        notificationStatus: data.notificationStatus,
      });
      setStep(4);
      addToast({
        type: "success",
        message: data.message || "Teklif talebiniz başarıyla alındı.",
      });
    } catch {
      const message = "Bağlantı kurulamadı. Lütfen birkaç dakika içinde tekrar deneyin.";
      setSubmissionError(message);
      addToast({ type: "error", message });
    }
  });

  const features = [
    {
      icon: ShieldCheck,
      title: "Kişisel Veri Koruması",
      desc: "Bilgileriniz güvenli şekilde saklanır",
    },
    {
      icon: Clock,
      title: "Anında Karşılaştırma",
      desc: "20+ sigorta şirketi",
    },
    {
      icon: CheckCircle,
      title: "Hızlı Geri Dönüş",
      desc: "Uzman ekip incelemesi",
    },
    {
      icon: Star,
      title: "7/24 Destek",
      desc: "Kesintisiz müşteri hizmeti",
    },
    {
      icon: FileCheck,
      title: "Online İşlemler",
      desc: "Dijital kayıt ve takip",
    },
    {
      icon: Truck,
      title: "En İyi Fiyat",
      desc: "Uygun teklif araştırması",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <div className="hidden lg:flex w-1/3 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Akıllı Teklif <br /> <span className="text-red-500">Sihirbazı</span>
          </h2>
          <p className="text-slate-400 text-lg">
            İhtiyacınıza özel sorularla gereksiz detaylarla boğuşmadan teklif talebinizi kısa
            sürede oluşturun.
          </p>
        </div>
        <div className="space-y-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-full">
                <feature.icon className="text-red-500" />
              </div>
              <div>
                <h4 className="font-bold">{feature.title}</h4>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600">© 2026 BGC Sigorta Hizmetleri A.Ş.</p>
      </div>

      <div className="w-full lg:w-2/3 flex flex-col justify-center items-center p-6 lg:p-12 relative">
        <div className="lg:hidden w-full flex justify-between items-center mb-8">
          <Link href="/" className="font-bold text-slate-900 text-xl">
            BGC Sigorta
          </Link>
          <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
            Güvenli
          </span>
        </div>

        <form onSubmit={onSubmit} className="w-full max-w-2xl">
          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">
                <span className={step >= 1 ? "text-red-600" : ""}>1. Ürün Seç</span>
                <span className={step >= 2 ? "text-red-600" : ""}>2. Detaylar</span>
                <span className={step >= 3 ? "text-red-600" : ""}>3. İletişim</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-red-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(step, 3) * 33.3}%` }}
                ></div>
              </div>
            </div>
          )}

          {submissionError && step < 4 && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {submissionError}
            </div>
          )}

          {step === 1 && (
            <div className="animate-slide-up">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                Sigorta Çeşidini Seçin
              </h1>
              <p className="text-slate-500 mb-6">
                Size en uygun teklifi hazırlayabilmemiz için önce ihtiyacınızı belirleyelim.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quoteProducts.map((product) => {
                  const ProductIcon = productIcons[product.id];

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleSelectProduct(product.id)}
                      className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-200 h-32 ${
                        selectedProduct === product.id
                          ? "border-red-600 bg-red-50 text-red-600 shadow-lg ring-2 ring-red-200"
                          : "border-slate-100 bg-white text-slate-600 hover:border-red-200 hover:bg-slate-50 hover:shadow-md"
                      }`}
                    >
                      <ProductIcon size={28} />
                      <span className="font-bold text-sm text-center leading-tight">
                        {product.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <FieldError message={errors.selectedProduct?.message} />

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!selectedProduct}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all ${
                    selectedProduct
                      ? "bg-red-600 text-white hover:bg-red-700 shadow-xl hover:shadow-red-500/30 transform hover:-translate-y-1"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Devam Et <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && currentProduct && (
            <div className="animate-slide-up">
              <button
                type="button"
                onClick={handleBack}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-6 text-sm font-medium"
              >
                <ArrowLeft size={16} /> Ürün Seçimine Dön
              </button>

              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                {currentProduct.name} Bilgileri
              </h1>
              <p className="text-slate-500 mb-8">
                Fiyat araştırması için bu bilgiler gereklidir.
              </p>

              <div className="space-y-5">
                {currentCategory === "vehicle" && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        TC Kimlik No (Ruhsat Sahibi)
                      </label>
                      <input
                        type="text"
                        maxLength={11}
                        inputMode="numeric"
                        placeholder="11 haneli numara"
                        {...register("tcKimlikNo", {
                          setValueAs: (value) => normalizeDigits(value, 11),
                        })}
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition font-medium"
                      />
                      <FieldError message={errors.tcKimlikNo?.message} />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Plaka İl Kodu
                        </label>
                        <input
                          type="text"
                          maxLength={2}
                          inputMode="numeric"
                          placeholder="34"
                          {...register("plakaIlKodu", {
                            setValueAs: (value) => normalizeDigits(value, 2),
                          })}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition font-medium"
                        />
                        <FieldError message={errors.plakaIlKodu?.message} />
                      </div>
                      <div className="w-2/3">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Plaka Devamı
                        </label>
                        <input
                          type="text"
                          maxLength={10}
                          placeholder="ABC 123"
                          {...register("plakaDevami", {
                            setValueAs: normalizePlateSuffix,
                          })}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition font-medium uppercase"
                        />
                        <FieldError message={errors.plakaDevami?.message} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        ASBİS Referans No (Opsiyonel)
                      </label>
                      <input
                        type="text"
                        placeholder="Varsa referans numaranız"
                        {...register("asbisReferansNo")}
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition font-medium"
                      />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
                      <FileCheck className="text-blue-600 shrink-0 mt-1" size={20} />
                      <p className="text-sm text-blue-700">
                        Ruhsatınız yanınızda değilse ASBİS referans numarası ile de inceleme
                        yapabiliriz.
                      </p>
                    </div>
                  </>
                )}

                {currentCategory === "home" && (
                  <>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">İl</label>
                        <input
                          type="text"
                          placeholder="Örn: Konya"
                          {...register("il")}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                        />
                        <FieldError message={errors.il?.message} />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          İlçe
                        </label>
                        <input
                          type="text"
                          placeholder="Örn: Karatay"
                          {...register("ilce")}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                        />
                        <FieldError message={errors.ilce?.message} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Brüt Metrekare (m²)
                      </label>
                      <input
                        type="number"
                        placeholder="Örn: 100"
                        {...register("brutMetrekare", { valueAsNumber: true })}
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                      />
                      <FieldError message={errors.brutMetrekare?.message} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Bina Yapı Tarzı
                      </label>
                      <select
                        {...register("binaYapiTarzi")}
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                      >
                        <option value="">Seçiniz</option>
                        {HOME_BUILDING_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <FieldError message={errors.binaYapiTarzi?.message} />
                    </div>
                  </>
                )}

                {currentCategory === "health" && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        TC Kimlik No
                      </label>
                      <input
                        type="text"
                        maxLength={11}
                        inputMode="numeric"
                        {...register("tcKimlikNo", {
                          setValueAs: (value) => normalizeDigits(value, 11),
                        })}
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                      />
                      <FieldError message={errors.tcKimlikNo?.message} />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Doğum Tarihi
                        </label>
                        <input
                          type="date"
                          {...register("dogumTarihi")}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                        />
                        <FieldError message={errors.dogumTarihi?.message} />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Cinsiyet
                        </label>
                        <select
                          {...register("cinsiyet")}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                        >
                          <option value="">Seçiniz</option>
                          {HEALTH_GENDERS.map((gender) => (
                            <option key={gender} value={gender}>
                              {gender}
                            </option>
                          ))}
                        </select>
                        <FieldError message={errors.cinsiyet?.message} />
                      </div>
                    </div>
                    {selectedProduct === "seyahat" && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Seyahat Edilecek Bölge
                        </label>
                        <select
                          {...register("seyahatUlke")}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                        >
                          <option value="">Seçiniz</option>
                          {TRAVEL_DESTINATIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <FieldError message={errors.seyahatUlke?.message} />
                      </div>
                    )}
                    {selectedProduct === "pet" && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Evcil Hayvan Türü
                        </label>
                        <select
                          {...register("evcilHayvanTuru")}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                        >
                          <option value="">Seçiniz</option>
                          {PET_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <FieldError message={errors.evcilHayvanTuru?.message} />
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-xl hover:shadow-red-500/30 transition-all"
                >
                  İletişim Bilgileri <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-slide-up">
              <button
                type="button"
                onClick={handleBack}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-6 text-sm font-medium"
              >
                <ArrowLeft size={16} /> Detaylara Dön
              </button>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                Son olarak, sizi tanıyalım.
              </h1>
              <p className="text-slate-500 mb-8">
                Teklifinizi hazırlayıp en kısa sürede iletişime geçeceğiz.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Adınız</label>
                    <input
                      type="text"
                      {...register("ad")}
                      className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition"
                    />
                    <FieldError message={errors.ad?.message} />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Soyadınız
                    </label>
                    <input
                      type="text"
                      {...register("soyad")}
                      className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition"
                    />
                    <FieldError message={errors.soyad?.message} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Cep Telefonu
                  </label>
                  <input
                    type="tel"
                    placeholder="05XXXXXXXXX"
                    inputMode="numeric"
                    {...register("telefon", {
                      setValueAs: (value) => normalizeDigits(value, 11),
                    })}
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition"
                  />
                  <FieldError message={errors.telefon?.message} />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    E-Posta (Opsiyonel)
                  </label>
                  <input
                    type="email"
                    placeholder="ornek@mail.com"
                    {...register("email")}
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition"
                  />
                  <FieldError message={errors.email?.message} />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl mt-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="kvkk"
                      {...register("kvkkOnay")}
                      className="w-5 h-5 mt-0.5 text-red-600 rounded focus:ring-red-500 border-gray-300"
                    />
                    <label htmlFor="kvkk" className="text-sm text-slate-500">
                      <strong>Aydınlatma Metni</strong>'ni okudum, kişisel verilerimin teklif
                      oluşturulması ve operasyonel değerlendirme amacıyla işlenmesini onaylıyorum.
                    </label>
                  </div>
                  <FieldError message={errors.kvkkOnay?.message} />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={async () => {
                    const isValid = await trigger(contactFieldNames, {
                      shouldFocus: true,
                    });

                    if (!isValid) {
                      addToast({
                        type: "warning",
                        message: "Lütfen iletişim bilgilerinizi kontrol edin.",
                      });
                    }
                  }}
                  className={`w-full text-white font-bold py-5 rounded-xl text-xl shadow-xl transition-all flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 shadow-red-600/30 hover:scale-[1.01] active:scale-[0.98]"
                  }`}
                >
                  {isSubmitting ? "Gönderiliyor..." : "ÜCRETSİZ TEKLİF AL"}
                  <ArrowRight />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center justify-center text-center animate-zoom-in py-10">
              <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20">
                <CheckCircle size={56} />
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                Harika! Talebiniz Alındı.
              </h2>
              <p className="text-lg text-slate-600 max-w-md mb-8 leading-relaxed">
                Teşekkürler. <strong>{submittedLead?.productName}</strong> talebiniz uzman ekibimize
                iletildi.
              </p>

              <div className="w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-xl mb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-blue-500"></div>
                <p className="text-slate-500 text-sm mb-3 uppercase tracking-wider font-bold">
                  Sonraki Adım
                </p>
                <p className="text-slate-800 text-lg mb-4">
                  Danışmanımız en kısa sürede sizi arayarak karşılaştırmalı teklif detaylarını
                  paylaşacak.
                </p>
                <div className="flex items-center justify-center gap-2 text-slate-400 text-sm bg-slate-50 py-2 rounded-lg">
                  <Clock size={16} />
                  <span>Ortalama geri dönüş süresi: 10 dakika</span>
                </div>
                {submittedLead?.leadId && (
                  <p className="mt-4 text-xs text-slate-400">
                    Talep numarası: <span className="font-semibold">{submittedLead.leadId}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                >
                  Ana Sayfaya Dön
                </Link>
                <Link
                  href="/teklif-al"
                  className="px-6 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                >
                  Yeni Talep Oluştur
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
