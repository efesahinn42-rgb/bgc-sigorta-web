import Image from "next/image";
import { ShieldCheck, Users, Zap, Wallet } from "lucide-react";

const Corporate = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "7/24 Kesintisiz Destek",
      desc: "Kaza veya hasar anında saat kaç olursa olsun, tek telefonla yanınızdayız. Yalnız değilsiniz.",
      color: "text-red-600",
      bg: "bg-red-100",
    },
    {
      icon: Users,
      title: "Uzman & Deneyimli Kadro",
      desc: "Sektördeki 20+ yıllık tecrübemizle, ince detayları sizin yerinize düşünüyor ve yönetiyoruz.",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Zap,
      title: "Hızlı Hasar Ödemesi",
      desc: "Bürokraside boğulmayın. Hasar dosyalarınızı önceliklendirip sürecin hızla sonuçlanmasını sağlıyoruz.",
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      icon: Wallet,
      title: "En Uygun Fiyat Garantisi",
      desc: "20'den fazla sigorta şirketini karşılaştırarak, bütçenize en uygun ve kapsamlı teklifi sunuyoruz.",
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* SOL TARAF: METİN VE ÖZELLİKLER */}
          <div className="w-full lg:w-1/2">
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded bg-red-50 text-red-600 font-bold tracking-wider uppercase text-sm mb-4">
              NEDEN
              <Image
                src="/logo.png"
                alt="BGC Sigorta"
                width={192}
                height={192}
                className="object-contain"
              />
              ?
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              Geleceğinizi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                Güvenle İnşa Ediyoruz
              </span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Sigortacılık sadece poliçe kesmek değil, zor anınızda yanınızda
              olmaktır. BGC Sigorta olarak amacımız, karmaşık süreçleri
              basitleştirmek ve en doğru teminatı sunmaktır.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className={`shrink-0 ${item.bg} p-3 rounded-xl ${item.color}`}
                  >
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SAĞ TARAF: GÖRSEL KOMPOZİSYONU */}
          <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full blur-3xl -z-10"></div>

            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 text-center transform hover:-translate-y-2 transition duration-500">
                  <h3 className="text-4xl font-extrabold text-red-600">20+</h3>
                  <p className="text-sm font-semibold text-slate-600 mt-1">
                    Yıllık Sektör Tecrübesi
                  </p>
                </div>
                <div className="h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                    alt="Ofis Toplantı"
                    fill
                    className="object-cover hover:scale-110 transition duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
                  <Image
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                    alt="Güven"
                    fill
                    className="object-cover hover:scale-110 transition duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl text-center transform hover:-translate-y-2 transition duration-500">
                  <h3 className="text-4xl font-extrabold text-red-500">5K+</h3>
                  <p className="text-sm font-medium opacity-90 mt-1">
                    Mutlu Müşteri
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Corporate;
