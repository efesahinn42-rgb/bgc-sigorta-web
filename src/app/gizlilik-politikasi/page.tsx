import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | BGC Sigorta",
  description: "BGC Sigorta Gizlilik Politikası - Kişisel verilerinizin korunması ve gizliliğiniz hakkında bilgiler.",
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Gizlilik Politikası
          </h1>
          <p className="text-slate-600">Son Güncelleme: 19 Mart 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Gizlilik Taahhüdümüz
            </h2>
            <p className="text-slate-700 leading-relaxed">
              {siteConfig.legalName} ("BGC Sigorta", "Biz" veya "Şirketimiz") olarak,
              müşterilerimizin gizliliğine ve kişisel verilerinin korunmasına büyük önem
              vermekteyiz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya
              hizmetlerimizi kullandığınızda topladığımız bilgilerin nasıl kullanıldığını ve
              korunduğunu açıklamaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Toplanan Bilgiler
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Hizmetlerimizi sunabilmek için aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Kişisel Bilgiler:</strong> Ad, soyad, TC Kimlik No, doğum tarihi, telefon
                numarası, e-posta adresi
              </li>
              <li>
                <strong>Sigorta Bilgileri:</strong> Araç bilgileri, plaka numarası, konut bilgileri,
                sağlık bilgileri
              </li>
              <li>
                <strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı türü, işletim sistemi, ziyaret
                edilen sayfalar
              </li>
              <li>
                <strong>Çerezler:</strong> Zorunlu çerezler ve açık onay vermeniz halinde analitik
                çerezler
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Bilgilerin Kullanımı
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Sigorta teklifleri hazırlama ve sunma</li>
              <li>Müşteri hizmetleri sunma</li>
              <li>Operasyon ekibimize talep bildirimi gönderme</li>
              <li>Yasal yükümlülükleri yerine getirme</li>
              <li>Hizmet kalitesini artırma</li>
              <li>Güvenlik ve dolandırıcılık önleme</li>
              <li>İletişim ve bilgilendirme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Çerezler (Cookies)
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Web sitemiz, kullanıcı deneyimini sürdürmek için zorunlu çerezler kullanır. Site
              kullanımını ölçmeye yönelik analitik araçlar ise yalnızca açık onay verdiğinizde
              etkinleşir. Çerez türleri:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerini sağlamak için
                gereklidir
              </li>
              <li>
                <strong>Analitik Çerezler:</strong> Google Analytics ve Vercel Analytics üzerinden,
                yalnızca onay verdiğiniz takdirde site kullanımını analiz etmek için kullanılır
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              Çerez tercihinizi banner üzerinden yönetebilirsiniz. Analitik çerezleri reddetmeniz,
              temel site kullanımınızı etkilemez.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Veri İşleme ve Saklama Süreci
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Teklif talebi formu üzerinden ilettiğiniz veriler, teklif sürecini yürütmek amacıyla
              PostgreSQL tabanlı altyapımızda saklanır. Aynı talep, operasyon ekibimizin hızlı
              değerlendirme yapabilmesi için SMTP üzerinden e-posta bildirimi olarak iletilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Veri Güvenliği
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve idari önlemleri
              almaktayız. Verileriniz şifreli bağlantılar (SSL/TLS) üzerinden iletilmekte ve
              güvenli sunucularda saklanmaktadır. Ancak, internet üzerinden hiçbir veri aktarımı
              %100 güvenli olmadığından, mutlak güvenlik garantisi veremeyiz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Üçüncü Taraf Bağlantılar
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Web sitemizde üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu bağlantıların
              gizlilik uygulamalarından sorumlu değiliz. Üçüncü taraf siteleri ziyaret etmeden
              önce gizlilik politikalarını incelemenizi öneririz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Veri Saklama
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal
              yükümlülüklerimiz çerçevesinde saklanmaktadır. Bu süre sona erdiğinde, verileriniz
              güvenli bir şekilde silinir veya anonim hale getirilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Haklarınız
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              KVKK kapsamında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Kişisel verilerinize erişim</li>
              <li>Kişisel verilerinizin düzeltilmesi</li>
              <li>Kişisel verilerinizin silinmesi</li>
              <li>İşlemeye itiraz etme</li>
              <li>Veri taşınabilirliği</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              Değişiklikler
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler web sitemizde
              duyurulacaktır. Politikanın güncel versiyonu her zaman bu sayfada yer almaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              İletişim
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="bg-slate-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-slate-700">
                <strong>E-posta:</strong> {siteConfig.contact.email}
              </p>
              <p className="text-sm text-slate-700 mt-2">
                <strong>Telefon:</strong> {siteConfig.contact.phoneDisplay}
              </p>
              <p className="text-sm text-slate-700 mt-2">
                <strong>Adres:</strong> {siteConfig.contact.addressLine1}{" "}
                {siteConfig.contact.addressLine2}, {siteConfig.contact.city}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
