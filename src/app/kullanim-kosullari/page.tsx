import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | BGC Sigorta",
  description: "BGC Sigorta web sitesi kullanım koşulları ve şartları.",
};

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Kullanım Koşulları
          </h1>
          <p className="text-slate-600">Son Güncelleme: 19 Mart 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              1. Genel Hükümler
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Bu Kullanım Koşulları, {siteConfig.legalName} ("BGC Sigorta", "Şirket", "Biz")
              tarafından işletilen web sitesinin ("Site") kullanımını düzenlemektedir. Siteyi
              kullanarak, bu koşulları kabul etmiş sayılırsınız. Koşulları kabul etmiyorsanız,
              lütfen siteyi kullanmayın.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              2. Site Kullanımı
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Siteyi aşağıdaki amaçlarla kullanabilirsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Sigorta ürünleri hakkında bilgi edinme</li>
              <li>Sigorta teklifi talep etme</li>
              <li>Şirketimiz hakkında bilgi edinme</li>
              <li>İletişim kurma</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              Siteyi yasadışı amaçlarla veya bu koşulları ihlal edecek şekilde kullanamazsınız.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              3. Kullanıcı Yükümlülükleri
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Siteyi kullanırken aşağıdaki yükümlülüklere uymanız gerekmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Doğru ve güncel bilgiler sağlamak</li>
              <li>Başkalarının haklarını ihlal etmemek</li>
              <li>Siteyi zararlı yazılımlarla kirletmemek</li>
              <li>Site güvenliğini tehlikeye atmamak</li>
              <li>Telif haklarına saygı göstermek</li>
              <li>Yasadışı faaliyetlerde bulunmamak</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              4. Fikri Mülkiyet Hakları
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Sitede yer alan tüm içerikler (metinler, görseller, logolar, tasarımlar vb.) BGC
              Sigorta'nın fikri mülkiyetidir ve telif haklarıyla korunmaktadır. Bu içerikleri izin
              almadan kopyalayamaz, dağıtamaz veya kullanamazsınız.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              5. Sorumluluk Reddi
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Site "olduğu gibi" sunulmaktadır. BGC Sigorta, aşağıdaki konularda sorumluluk
              kabul etmez:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Site içeriğinin doğruluğu, güncelliği veya eksiksizliği</li>
              <li>Sitede yer alan bilgilerin kullanımından kaynaklanan zararlar</li>
              <li>Site erişiminde yaşanan kesintiler veya hatalar</li>
              <li>Üçüncü taraf web sitelerine bağlantılardan kaynaklanan sorunlar</li>
              <li>Teknik sorunlar veya sistem hataları</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              6. Teklif ve Bilgilendirme
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Sitede yer alan sigorta teklifleri ve fiyat bilgileri bilgilendirme amaçlıdır. Kesin
              teklif ve fiyatlar, sigorta şirketleri tarafından belirlenir ve değişiklik gösterebilir.
              Nihai teklif ve poliçe koşulları, ilgili sigorta şirketinin onayına tabidir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              7. Bağlantılar
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Sitede üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu bağlantılar
              bilgilendirme amaçlıdır ve BGC Sigorta bu sitelerin içeriğinden veya gizlilik
              uygulamalarından sorumlu değildir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              8. Teklif Formu ve Bildirim Süreci
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Teklif formu üzerinden paylaştığınız bilgiler, teklif hazırlama amacıyla sistemlerimize
              kaydedilir ve operasyon ekibimize e-posta bildirimi olarak iletilebilir. Form
              gönderimi, poliçe kurulmuş olduğu anlamına gelmez; kesin teklif ve değerlendirme
              uzman ekiplerimiz tarafından ayrıca yapılır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              9. Değişiklikler
            </h2>
            <p className="text-slate-700 leading-relaxed">
              BGC Sigorta, bu Kullanım Koşullarını herhangi bir zamanda değiştirme hakkını
              saklı tutar. Değişiklikler site üzerinde yayınlandığında yürürlüğe girer. Siteyi
              kullanmaya devam ederek güncellenmiş koşulları kabul etmiş sayılırsınız.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              10. Uygulanacak Hukuk ve Yetkili Mahkeme
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Bu Kullanım Koşulları Türkiye Cumhuriyeti kanunlarına tabidir. Bu koşullardan
              kaynaklanan uyuşmazlıkların çözümünde Konya Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              11. İletişim
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Kullanım Koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
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
