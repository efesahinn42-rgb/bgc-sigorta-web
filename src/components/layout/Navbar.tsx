"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const pathname = usePathname(); // Şu an hangi sayfadayız?

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setIsHeroVisible(window.scrollY < window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    // İlk yüklemede kontrol et
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menü Elemanları
  const navItems = [
    { name: "Ana Sayfa", hash: "#anasayfa" },
    { name: "Kurumsal", hash: "#kurumsal" },
    { name: "Referanslar", hash: "#referanslar" },
    { name: "Hizmetlerimiz", hash: "#hizmetler" },
    { name: "İletişim", hash: "#iletisim" },
  ];

  // Link Oluşturucu Fonksiyon:
  // Eğer ana sayfadaysak sadece "#kurumsal" (yumuşak kaydırma)
  // Eğer başka sayfadaysak "/#kurumsal" (ana sayfaya git ve kaydır)
  const getHref = (hash: string) => {
    if (pathname === "/") {
      return hash;
    }
    return `/${hash}`;
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? "pt-2" : "pt-6"
      } px-4`}
    >
      {/* LOGO - Sol tarafta, navbar ile aynı hizada */}
      <Link
        href="/"
        className={`hidden md:block absolute left-12 md:left-24 z-50 group transition-all duration-300 ${
          scrolled ? "-top-12" : "-top-8"
        } ${!isHeroVisible ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="w-44 h-44 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-2xl shadow-black/20">
          <Image
            src="/logo.png"
            alt="BGC Sigorta Logo"
            width={176}
            height={176}
            className="object-contain"
            priority
          />
        </div>
      </Link>

      <nav
        className={`
          w-full max-w-6xl rounded-full transition-all duration-300 border
          ${
            scrolled
              ? "bg-white/90 backdrop-blur-xl shadow-lg border-gray-200/50 py-2 px-6"
              : "bg-white/70 backdrop-blur-md shadow-2xl shadow-black/5 border-white/40 py-3 px-8"
          }
        `}
      >
        <div className="flex items-center justify-between">
          {/* MENÜ - Orta (Ortalanmış) */}
          <div className="flex-1 flex justify-center items-center">
            <div className="hidden md:flex items-center bg-gray-100/50 rounded-full px-2 py-1 border border-gray-200/50">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={getHref(item.hash)}
                  className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-white rounded-full transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* BUTONLAR - Sağ */}
          <div className="flex-shrink-0 hidden md:flex items-center gap-3">
            <Link
              href="/teklif-al"
              className="group flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-white pl-5 pr-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-xl hover:shadow-red-500/20 transform hover:-translate-y-0.5"
            >
              Teklif Al
              <div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition">
                <ArrowRight size={14} className="text-white" />
              </div>
            </Link>
          </div>

          {/* MOBİL BUTON */}
          <div className="flex-shrink-0 md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 p-2 hover:bg-gray-100 rounded-full transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBİL MENÜ (AÇILIR KISIM) */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-3 p-4 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col space-y-2 animate-drop-in">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={getHref(item.hash)} // <-- Mobil için de dinamik link
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 font-medium transition"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
              <Link
                href="/teklif-al"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 text-white font-bold shadow-lg shadow-red-500/20"
              >
                Teklif Al <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
