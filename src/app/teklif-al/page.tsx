"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car,
  Home,
  Heart,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Clock,
  Star,
  Truck,
  Building2,
  Plane,
  Cat,
  FileCheck,
} from "lucide-react";

export default function TeklifAlPage() {
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Ürün Listesi (Genişletilmiş)
  const products = [
    {
      id: "trafik",
      name: "Trafik Sigortası",
      icon: Truck,
      category: "vehicle",
    },
    { id: "kasko", name: "Kasko", icon: Car, category: "vehicle" },
    { id: "dask", name: "DASK (Deprem)", icon: Building2, category: "home" },
    { id: "konut", name: "Konut Sigortası", icon: Home, category: "home" },
    {
      id: "saglik",
      name: "Tamamlayıcı Sağlık",
      icon: Heart,
      category: "health",
    },
    { id: "seyahat", name: "Seyahat Sağlık", icon: Plane, category: "health" },
    {
      id: "isyeri",
      name: "İşyeri Sigortası",
      icon: Briefcase,
      category: "home",
    },
    { id: "pet", name: "Evcil Hayvan", icon: Cat, category: "health" },
  ];

  // Seçilen ürünün kategorisini bulma
  const currentCategory = products.find(
    (p) => p.id === selectedProduct
  )?.category;

  const handleNext = () => {
    if (step === 1 && !selectedProduct) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* SOL PANEL (SABİT) */}
      <div className="hidden lg:flex w-1/3 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div>
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-xl">
              B
            </div>
            <span className="text-2xl font-bold">BGC Sigorta</span>
          </Link>
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Akıllı Teklif <br /> <span className="text-red-500">Sihirbazı</span>
          </h2>
          <p className="text-slate-400 text-lg">
            İhtiyacınıza özel sorularla, gereksiz detaylarla boğuşmadan en doğru
            fiyatı 2 dakikada bulun.
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-full">
              <ShieldCheck className="text-red-500" />
            </div>
            <div>
              <h4 className="font-bold">Kişisel Veri Koruması</h4>
              <p className="text-sm text-slate-400">
                Bilgileriniz %100 güvende
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-full">
              <Clock className="text-red-500" />
            </div>
            <div>
              <h4 className="font-bold">Anında Karşılaştırma</h4>
              <p className="text-sm text-slate-400">20+ Sigorta şirketi</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-600">© 2024 BGC Sigorta A.Ş.</p>
      </div>

      {/* SAĞ PANEL (DEĞİŞKEN FORM) */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center items-center p-6 lg:p-12 relative">
        {/* Mobil Header */}
        <div className="lg:hidden w-full flex justify-between items-center mb-8">
          <Link href="/" className="font-bold text-slate-900 text-xl">
            BGC Sigorta
          </Link>
          <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">
            Güvenli
          </span>
        </div>

        <div className="w-full max-w-2xl">
          {/* İLERLEME ÇUBUĞU */}
          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">
                <span className={step >= 1 ? "text-red-600" : ""}>
                  1. Ürün Seç
                </span>
                <span className={step >= 2 ? "text-red-600" : ""}>
                  2. Detaylar
                </span>
                <span className={step >= 3 ? "text-red-600" : ""}>
                  3. İletişim
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-red-600 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${step * 33.3}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* --- ADIM 1: ÜRÜN SEÇİMİ (Genişletilmiş Grid) --- */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                Sigorta Çeşidini Seçin
              </h1>
              <p className="text-slate-500 mb-6">
                Size en uygun teklifi hazırlayabilmemiz için önce ihtiyacınızı
                belirleyelim.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {products.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod.id)}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-200 h-32 ${
                      selectedProduct === prod.id
                        ? "border-red-600 bg-red-50 text-red-600 shadow-lg ring-2 ring-red-200"
                        : "border-slate-100 bg-white text-slate-600 hover:border-red-200 hover:bg-slate-50 hover:shadow-md"
                    }`}
                  >
                    <prod.icon size={28} />
                    <span className="font-bold text-sm text-center leading-tight">
                      {prod.name}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
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

          {/* --- ADIM 2: DİNAMİK FORM (Ürüne Göre Değişir) --- */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={handleBack}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-6 text-sm font-medium"
              >
                <ArrowLeft size={16} /> Ürün Seçimine Dön
              </button>

              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                {products.find((p) => p.id === selectedProduct)?.name} Bilgileri
              </h1>
              <p className="text-slate-500 mb-8">
                Fiyat hesaplaması için bu bilgiler gerekli.
              </p>

              <div className="space-y-5">
                {/* 1. SENARYO: ARAÇ (Trafik, Kasko) */}
                {currentCategory === "vehicle" && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        TC Kimlik No (Ruhsat Sahibi)
                      </label>
                      <input
                        type="text"
                        maxLength={11}
                        placeholder="11 haneli numara"
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition font-medium"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Plaka İl Kodu
                        </label>
                        <input
                          type="text"
                          placeholder="34"
                          maxLength={2}
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition font-medium"
                        />
                      </div>
                      <div className="w-2/3">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Plaka Devamı
                        </label>
                        <input
                          type="text"
                          placeholder="ABC 123"
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition font-medium uppercase"
                        />
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
                      <FileCheck
                        className="text-blue-600 shrink-0 mt-1"
                        size={20}
                      />
                      <p className="text-sm text-blue-700">
                        Ruhsatınız yanınızda değilse "ASBİS Referans No" ile de
                        sorgulama yapabiliriz.
                      </p>
                    </div>
                  </>
                )}

                {/* 2. SENARYO: KONUT / İŞYERİ (DASK, Konut) */}
                {currentCategory === "home" && (
                  <>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          İl
                        </label>
                        <select className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition">
                          <option>Seçiniz</option>
                          <option>İstanbul</option>
                          <option>Ankara</option>
                          <option>İzmir</option>
                        </select>
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          İlçe
                        </label>
                        <select className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition">
                          <option>Seçiniz</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Brüt Metrekare (m²)
                      </label>
                      <input
                        type="number"
                        placeholder="Örn: 100"
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Bina Yapı Tarzı
                      </label>
                      <select className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition">
                        <option>Betonarme</option>
                        <option>Yığma Kagir</option>
                        <option>Diğer</option>
                      </select>
                    </div>
                  </>
                )}

                {/* 3. SENARYO: SAĞLIK (Tamamlayıcı, Seyahat, Pet) */}
                {currentCategory === "health" && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        TC Kimlik No
                      </label>
                      <input
                        type="text"
                        maxLength={11}
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Doğum Tarihi
                        </label>
                        <input
                          type="date"
                          className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Cinsiyet
                        </label>
                        <select className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition">
                          <option>Kadın</option>
                          <option>Erkek</option>
                        </select>
                      </div>
                    </div>
                    {selectedProduct === "seyahat" && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Seyahat Edilecek Ülke/Bölge
                        </label>
                        <select className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition">
                          <option>Schengen Ülkeleri</option>
                          <option>Tüm Dünya</option>
                          <option>Amerika & Kanada</option>
                        </select>
                      </div>
                    )}
                    {selectedProduct === "pet" && (
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Evcil Hayvan Türü
                        </label>
                        <select className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 transition">
                          <option>Kedi</option>
                          <option>Köpek</option>
                        </select>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-xl hover:shadow-red-500/30 transition-all"
                >
                  İletişim Bilgileri <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* --- ADIM 3: İLETİŞİM (Standart) --- */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button
                onClick={handleBack}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-6 text-sm font-medium"
              >
                <ArrowLeft size={16} /> Detaylara Dön
              </button>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                Son olarak, sizi tanıyalım.
              </h1>
              <p className="text-slate-500 mb-8">
                Teklifinizi hazırlayıp hemen iletişime geçeceğiz.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Adınız
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Soyadınız
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Cep Telefonu
                  </label>
                  <input
                    type="tel"
                    placeholder="05__ ___ __ __"
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    E-Posta (Opsiyonel)
                  </label>
                  <input
                    type="email"
                    placeholder="Mail adresiniz"
                    className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition"
                  />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl mt-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="kvkk"
                      className="w-5 h-5 mt-0.5 text-red-600 rounded focus:ring-red-500 border-gray-300"
                    />
                    <label htmlFor="kvkk" className="text-sm text-slate-500">
                      <strong>Aydınlatma Metni</strong>'ni okudum, kişisel
                      verilerimin teklif oluşturulması amacıyla işlenmesini
                      onaylıyorum.
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleNext}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-xl text-xl shadow-xl shadow-red-600/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  ÜCRETSİZ TEKLİF AL <ArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* --- ADIM 4: SONUÇ --- */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 py-10">
              <div className="w-28 h-28 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-green-500/20 animate-bounce">
                <CheckCircle size={56} />
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                Harika! Talebiniz Alındı.
              </h2>
              <p className="text-lg text-slate-600 max-w-md mb-8 leading-relaxed">
                Teşekkürler.{" "}
                <strong>
                  {products.find((p) => p.id === selectedProduct)?.name}
                </strong>{" "}
                talebiniz uzman ekiplerimize iletildi.
              </p>

              <div className="w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-xl mb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-blue-500"></div>
                <p className="text-slate-500 text-sm mb-3 uppercase tracking-wider font-bold">
                  Sonraki Adım
                </p>
                <p className="text-slate-800 text-lg mb-4">
                  Sigorta danışmanımız{" "}
                  <span className="text-red-600 font-bold">
                    10 dakika içinde
                  </span>{" "}
                  sizi arayarak 20'den fazla şirketin karşılaştırmalı teklifini
                  sunacak.
                </p>
                <div className="flex items-center justify-center gap-2 text-slate-400 text-sm bg-slate-50 py-2 rounded-lg">
                  <Clock size={16} /> <span>Ortalama bekleme süresi: 4 dk</span>
                </div>
              </div>

              <Link
                href="/"
                className="text-slate-500 font-bold hover:text-red-600 hover:underline transition-colors"
              >
                Ana Sayfaya Dön
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
