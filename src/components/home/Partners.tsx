import Image from "next/image";

const Partners = () => {
  const partners = [
    { name: "AXA Sigorta", logo: "/sirketler-logo/axa.png" },
    {
      name: "Anadolu Sigorta",
      logo: "https://static.cdnlogo.com/logos/a/50/anadolu-sigorta.svg",
    },
    { name: "Allianz", logo: "/sirketler-logo/allianz.png" },
    { name: "Neova Sigorta", logo: "/sirketler-logo/neova.png" },
    { name: "Ethica Sigorta", logo: "/sirketler-logo/ethica.png" },
    { name: "Mapfre", logo: "/sirketler-logo/mapfre.png" },
    { name: "Sompo Sigorta", logo: "/sirketler-logo/sompo.png" },
    { name: "Türkiye Sigorta", logo: "/sirketler-logo/türkiyesigorta.png" },
    { name: "Groupama Sigorta", logo: "/sirketler-logo/groupama.png" },
    { name: "Ray Sigorta", logo: "/sirketler-logo/raysigorta.png" },
    { name: "Quick Sigorta", logo: "/sirketler-logo/Quicksigorta.png" },
    { name: "HDI Sigorta", logo: "/sirketler-logo/hdı.png" },
    { name: "Generali Sigorta", logo: "/sirketler-logo/generali.png" },
    { name: "Ege Sigorta", logo: "/sirketler-logo/ege_sigorta-e1465903543809.jpg" },
    { name: "Unico Sigorta", logo: "/sirketler-logo/unico.png" },
    { name: "Zurich Sigorta", logo: "/sirketler-logo/zurich.png" },
    { name: "Ergo Sigorta", logo: "/sirketler-logo/ergo.png" },
    { name: "Demir Hayat Sigorta", logo: "/sirketler-logo/demirsigorta.png" },
    { name: "Başak Sigorta", logo: "/sirketler-logo/basak.png" },
    { name: "Güneş Sigorta", logo: "/sirketler-logo/günessigorta.png" },
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
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={180}
                  height={90}
                  className="object-contain max-h-24 opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

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
