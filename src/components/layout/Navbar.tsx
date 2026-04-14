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
            src="/bgc-logo.png"
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
              href="https://wa.me/905302322742"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5"
              aria-label="WhatsApp Destek"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </Link>
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
              <Link
                href="https://wa.me/905302322742"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg shadow-green-500/20 mt-2 transition"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Destek
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
