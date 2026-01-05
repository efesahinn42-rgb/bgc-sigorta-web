"use client";

const Partners = () => {
  // Şirketleri ve marka renklerini tanımlıyoruz
  const partners = [
    { name: "AXA Sigorta", color: "text-blue-700" },
    { name: "Anadolu Sigorta", color: "text-red-600" },
    { name: "Allianz", color: "text-blue-600" },
    { name: "Neova Sigorta", color: "text-orange-500" },
    { name: "Ethica Sigorta", color: "text-purple-600" },
    { name: "Mapfre", color: "text-red-700" },
    { name: "Sompo Sigorta", color: "text-red-800" },
    { name: "Türkiye Sigorta", color: "text-teal-600" },
  ];

  return (
    <section className="py-20 bg-slate-900 relative">
      {/* Arka plan için hafif desen (Opsiyonel estetik dokunuş) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* BAŞLIK */}
        <div className="text-center mb-12">
          <h3 className="text-white text-3xl font-bold tracking-tight mb-2">
            Güçlü İş Ortaklarımız
          </h3>
          <p className="text-slate-400 text-lg">
            Türkiye'nin ve dünyanın en büyük sigorta devleriyle çalışıyoruz.
          </p>
        </div>

        {/* LOGO KARTLARI IZGARASI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl h-24 flex items-center justify-center p-4 shadow-lg hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Logo Alanı */}
              {/* İleride <img src="..." /> koyduğunda buradaki <span>'ı silebilirsin. */}
              <span
                className={`text-xl md:text-2xl font-extrabold ${partner.color} opacity-80 group-hover:opacity-100 transition-opacity`}
              >
                {partner.name}
              </span>

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
