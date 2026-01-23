"use client";

import Image from "next/image";

const Partners = () => {
  // Şirketleri ve marka renklerini tanımlıyoruz
  const partners = [
    { name: "AXA Sigorta", color: "text-blue-700", logo: "/sirketler-logo/axa.png" },
    { name: "Anadolu Sigorta", color: "text-red-600", logo: "https://static.cdnlogo.com/logos/a/50/anadolu-sigorta.svg" },
    { name: "Allianz", color: "text-blue-600", logo: "/sirketler-logo/allianz.png" },
    { name: "Neova Sigorta", color: "text-orange-500", logo: "/sirketler-logo/neova.png" },
    { name: "Ethica Sigorta", color: "text-purple-600", logo: "/sirketler-logo/ethica.png" },
    { name: "Mapfre", color: "text-red-700", logo: "/sirketler-logo/mapfre.png" },
    { name: "Sompo Sigorta", color: "text-red-800", logo: "/sirketler-logo/sompo.png" },
    { name: "Türkiye Sigorta", color: "text-teal-600", logo: "/sirketler-logo/türkiyesigorta.png" },
    { name: "Groupama Sigorta", color: "text-green-600", logo: "/sirketler-logo/groupama.png" },
    { name: "Ray Sigorta", color: "text-indigo-600", logo: "/sirketler-logo/raysigorta.png" },
    { name: "Quick Sigorta", color: "text-yellow-600", logo: "/sirketler-logo/Quicksigorta.png" },
    { name: "HDI Sigorta", color: "text-blue-500", logo: "/sirketler-logo/hdı.png" },
    { name: "Generali Sigorta", color: "text-red-500", logo: "/sirketler-logo/generali.png" },
    { name: "Ege Sigorta", color: "text-orange-600", logo: "/sirketler-logo/ege_sigorta-e1465903543809.jpg" },
    { name: "Unico Sigorta", color: "text-purple-500", logo: "/sirketler-logo/unico.png" },
    { name: "Zurich Sigorta", color: "text-blue-800", logo: "/sirketler-logo/zurich.png" },
    { name: "Ergo Sigorta", color: "text-pink-600", logo: "/sirketler-logo/ergo.png" },
    { name: "Demir Hayat Sigorta", color: "text-gray-700", logo: "/sirketler-logo/demirsigorta.png" },
    { name: "Başak Sigorta", color: "text-cyan-600", logo: "/sirketler-logo/basak.png" },
    { name: "Güneş Sigorta", color: "text-yellow-500", logo: "/sirketler-logo/günessigorta.png" },
  ];

  return (
    <section className="py-20 bg-slate-900 relative">
      {/* Arka plan için hafif desen (Opsiyonel estetik dokunuş) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* BAŞLIK */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="BGC Sigorta"
              width={256}
              height={256}
              className="object-contain"
            />
          </div>
          <h3 className="text-white text-3xl font-bold tracking-tight mb-2">
            Güçlü İş Ortaklarımız
          </h3>
          <p className="text-slate-400 text-lg">
            Türkiye'nin ve dünyanın en büyük sigorta devleriyle çalışıyoruz.
          </p>
        </div>

        {/* LOGO KARTLARI IZGARASI */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl h-36 flex items-center justify-center p-4 shadow-lg hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Logo Alanı */}
              {partner.logo ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={180}
                    height={90}
                    className="object-contain max-h-24 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ) : (
                <span
                  className={`text-xl md:text-2xl font-extrabold ${partner.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                >
                  {partner.name}
                </span>
              )}

              {/* Alt çizgi efekti */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* ALT BİLGİ */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            ve daha birçok güvenilir sigorta şirketi ile hizmetinizdeyiz.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;
