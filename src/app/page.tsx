import Hero from "@/components/home/Hero";
import Corporate from "@/components/home/Corporate";
import Partners from "@/components/home/Partners";
import { generateStructuredData } from "@/lib/seo/structured-data";
import Image from "next/image";
import {
  Car,
  Home,
  Heart,
  Briefcase,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Truck,
  Plane,
  Building2,
  Umbrella,
  Clock,
  Star,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  const structuredData = generateStructuredData();
  const advantages = [
    {
      icon: Truck,
      title: "Ücretsiz Yol Yardım",
      desc: "Çekici ve İkame Araç",
      color: "text-green-400",
    },
    {
      icon: CreditCard,
      title: "Kredi Kartına Taksit",
      desc: "Vade farksız ödeme",
      color: "text-blue-400",
    },
    {
      icon: Clock,
      title: "Hızlı Onay Süreci",
      desc: "24 saat içinde onay",
      color: "text-yellow-400",
    },
    {
      icon: Phone,
      title: "7/24 Müşteri Desteği",
      desc: "Kesintisiz destek hattı",
      color: "text-purple-400",
    },
    {
      icon: ShieldCheck,
      title: "Online Poliçe Yönetimi",
      desc: "Dijital poliçe erişimi",
      color: "text-red-400",
    },
    {
      icon: Star,
      title: "Hasar Takibi",
      desc: "Anlık hasar durumu",
      color: "text-orange-400",
    },
  ];
  const services = [
    {
      icon: Car,
      title: "Araç Sigortaları",
      desc: "Kasko ve trafik sigortasında en kapsamlı teminatlarla yola güvenle çıkın.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Truck,
      title: "BGC Asist & Çekici",
      desc: "Yolda kalmayın. 7/24 ücretsiz çekici, yol yardım ve ikame araç hizmeti.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: Home,
      title: "Konut Sigortası",
      desc: "Evinizi ve eşyalarınızı yangın, hırsızlık ve su baskınlarına karşı koruyun.",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: Building2,
      title: "DASK (Deprem)",
      desc: "Zorunlu deprem sigortanızı saniyeler içinde en uygun fiyatla yaptırın.",
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      icon: Heart,
      title: "Sağlık Sigortası",
      desc: "Tamamlayıcı ve özel sağlık sigortası ile en iyi hastanelerde fark ödemeyin.",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      icon: Plane,
      title: "Seyahat Sağlık",
      desc: "Yurtdışı seyahatlerinizde vize işlemleri için geçerli sağlık güvencesi.",
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      icon: Briefcase,
      title: "İşyeri Sigortası",
      desc: "Emeklerinizi riske atmayın. İş yerinizi, demirbaşınızı ve ticari karınızı koruyun.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Umbrella,
      title: "Ferdi Kaza",
      desc: "Beklenmedik durumlara karşı kendinizi ve sevdiklerinizi maddi güvenceye alın.",
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.website) }}
      />
      <main className="min-h-screen bg-white">
      {/* 1. ANASAYFA (Hero) */}
      <section id="anasayfa">
        <Hero />
      </section>

      {/* 2. KURUMSAL (Hakkımızda) */}
      <section id="kurumsal">
        <Corporate />
      </section>

      {/* 3. REFERANSLAR (İş Ortaklarımız) */}
      <section id="referanslar">
        <Partners />
      </section>

      {/* 4. HİZMETLERİMİZ */}
      <section id="hizmetler" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="BGC Sigorta"
                width={256}
                height={256}
                className="object-contain"
              />
            </div>
            <span className="text-red-600 font-bold tracking-wider uppercase text-base">
              ÜRÜNLERİMİZ
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
              Size Özel Sigorta Çözümleri
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Hayatın her alanında, ihtiyacınız olan güvence BGC Sigorta
              kalitesiyle yanınızda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((item, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900 group-hover:text-red-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>
                <Link
                  href="#teklif-al-section"
                  className="w-full mt-auto inline-flex items-center justify-center py-3 px-4 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm group-hover:bg-red-600 group-hover:text-white transition-all duration-300"
                >
                  Hemen Teklif Al <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEKLİF AL (CTA ŞERİDİ) */}
      <section
        id="teklif-al-section"
        className="py-24 bg-slate-900 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 py-1 px-3 rounded bg-red-900/50 border border-red-500/30 text-red-400 font-bold tracking-wider uppercase text-xs mb-6">
                <Image
                  src="/logo.png"
                  alt="BGC Sigorta"
                  width={256}
                  height={256}
                  className="object-contain"
                />
                SİGORTADA AKILLI DÖNEM
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                Vaktiniz Değerli, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  En İyi Teklifiniz Hazır!
                </span>
              </h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                Sigorta şirketlerini tek tek gezip yorulmayın. Bilgilerinizi
                güvenle girin, yapay zeka destekli sistemimiz 20+ şirketi
                tarasın.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
                {advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 transition"
                  >
                    <advantage.icon size={20} className={advantage.color} />
                    <div>
                      <h4 className="font-bold text-sm">{advantage.title}</h4>
                      <p className="text-xs text-slate-400">{advantage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center lg:items-end gap-6">
              <Link
                href="/teklif-al"
                className="group relative bg-red-600 hover:bg-red-700 text-white px-10 py-6 rounded-2xl font-bold text-xl shadow-2xl transition-all transform hover:-translate-y-1 flex items-center gap-4 overflow-hidden"
              >
                <span className="relative z-10">Teklif Almaya Başla</span>
                <ArrowRight size={24} className="relative z-10" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. İLETİŞİM (Konya Merkez Ofis & Gelişmiş Footer) */}
      <section
        id="iletisim"
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.png"
                alt="BGC Sigorta"
                width={256}
                height={256}
                className="object-contain"
              />
            </div>
            <span className="text-red-600 font-bold tracking-wider uppercase text-xs">
              BİZE ULAŞIN
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2">
              Sizin İçin Konya'dayız
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              BGC Sigorta olarak Konya Karatay'daki modern ofisimizde sizlere en
              güvenilir hizmeti sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Kart 1: Telefon - Daha Canlı */}
            <div className="group p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] transition-all duration-500 text-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-red-600 to-red-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:rotate-12 transition-transform shadow-xl shadow-red-500/20">
                <Phone size={36} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Hızlı Destek
              </h4>
              <a
                href="tel:+905302322742"
                className="text-2xl font-black text-red-600 hover:text-red-700 transition tracking-tighter"
              >
                0530 232 27 42
              </a>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>{" "}
                Çevrimiçi
              </div>
            </div>

            {/* Kart 2: E-Posta - Daha Kurumsal */}
            <div className="group p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] transition-all duration-500 text-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:-rotate-12 transition-transform shadow-xl shadow-slate-900/20">
                <Mail size={36} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">E-Posta</h4>
              <a
                href="mailto:info@bgcsigorta.com"
                className="text-lg font-bold text-slate-700 border-b-2 border-red-600/30 hover:border-red-600 transition-all pb-1"
              >
                info@bgcsigorta.com
              </a>
              <p className="text-slate-400 text-xs mt-4">7/24 Mail Desteği</p>
            </div>

            {/* Kart 3: Adres - Daha Görünür */}
            <div className="group p-10 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(220,38,38,0.1)] transition-all duration-500 text-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-red-600 to-red-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 transition-transform shadow-xl shadow-red-500/20">
                <MapPin size={36} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">
                Merkez Ofis
              </h4>
              <p className="text-slate-600 font-medium leading-relaxed">
                Akabe, Şht. Furkan Doğan Cd. <br />
                <span className="text-slate-900 font-extrabold underline decoration-red-600/30">
                  Bey Plaza
                </span>{" "}
                Kat:1 No:3/122 <br />
                Karatay / Konya
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Google Haritalar - Estetik Çerçeve */}
            <div className="lg:col-span-3 h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-50 relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.687254586616!2d32.5190924!3d37.8687895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d084357c91d84b%3A0x6476191986422d32!2sAkabe%2C%20Bey%20Plaza%20Kat%3A1%20No%3A3%2F122!5e0!3m2!1str!2str!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-slate-900 font-bold text-sm">
                  Ofisimize Yol Tarifi Alın
                </span>
                <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-tighter">
                  Haritaları Aç
                </button>
              </div>
            </div>

            {/* Sosyal Medya & Mesai - Premium Panel */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] flex-grow relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <p className="text-red-500 font-black text-xs uppercase tracking-[0.2em] mb-6">
                  Mesaı Saatlerı
                </p>
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-slate-400 font-medium">
                      Hafta İçi
                    </span>
                    <span className="font-bold text-lg">08:30 - 18:30</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-slate-400 font-medium">
                      Cumartesi
                    </span>
                    <span className="font-bold text-lg">09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Pazar</span>
                    <span className="px-3 py-1 bg-red-600/20 text-red-500 rounded-lg text-xs font-bold uppercase tracking-widest">
                      Kapalı
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="text-center md:text-left">
                  <span className="block font-black text-slate-900 text-xl tracking-tight">
                    Bizi Takip Edin
                  </span>
                  <p className="text-slate-400 text-sm mt-1">
                    Yeniliklerden haberdar olun.
                  </p>
                </div>
                <div className="flex gap-4">
                  {[
                    {
                      name: "Instagram",
                      label: "IG",
                      color:
                        "hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500",
                    },
                    {
                      name: "Facebook",
                      label: "FB",
                      color: "hover:bg-blue-600",
                    },
                    {
                      name: "LinkedIn",
                      label: "LI",
                      color: "hover:bg-blue-700",
                    },
                  ].map((social) => (
                    <div
                      key={social.name}
                      className={`w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center font-black text-sm text-slate-700 hover:text-white transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${social.color}`}
                      title={social.name}
                    >
                      {social.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex flex-col md:flex-row justify-between items-center border-t border-slate-100 pt-10 text-slate-400 text-xs gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="BGC Sigorta"
                width={256}
                height={256}
                className="object-contain"
              />
              <p>© 2026 BGC Sigorta Hizmetleri A.Ş. | Karatay / Konya</p>
            </div>
            <div className="flex gap-8 font-bold uppercase tracking-widest">
              <Link
                href="/gizlilik-politikasi"
                className="hover:text-red-600 transition"
              >
                Gizlilik Politikası
              </Link>
              <Link href="/kvkk" className="hover:text-red-600 transition">
                KVKK Metni
              </Link>
              <Link
                href="/kullanim-kosullari"
                className="hover:text-red-600 transition"
              >
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
