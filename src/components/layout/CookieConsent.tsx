"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // localStorage'dan cookie tercihini kontrol et
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Kullanıcı daha önce tercih belirtmemişse banner'ı göster
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="bg-red-100 p-3 rounded-xl shrink-0">
            <Cookie className="text-red-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 mb-2">Çerez Kullanımı</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Web sitemizde size en iyi deneyimi sunabilmek için çerezler kullanıyoruz. Siteyi
              kullanmaya devam ederek çerez kullanımını kabul etmiş olursunuz. Detaylı bilgi için{" "}
              <Link
                href="/gizlilik-politikasi"
                className="text-red-600 hover:underline font-semibold"
              >
                Gizlilik Politikamızı
              </Link>{" "}
              ve{" "}
              <Link href="/kvkk" className="text-red-600 hover:underline font-semibold">
                KVKK Aydınlatma Metnimizi
              </Link>{" "}
              inceleyebilirsiniz.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Reddet
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-lg shadow-red-600/20"
          >
            Kabul Et
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Kapat"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
