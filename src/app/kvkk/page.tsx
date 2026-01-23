import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | BGC Sigorta",
  description: "BGC Sigorta KVKK Aydınlatma Metni - Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme metni.",
};

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-slate-600">Son Güncelleme: 23 Ocak 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              1. Veri Sorumlusu
            </h2>
            <p className="text-slate-700 leading-relaxed">
              <strong>BGC Sigorta Hizmetleri A.Ş.</strong> ("BGC Sigorta" veya "Şirket") olarak,
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu
              sıfatıyla, kişisel verilerinizin işlenmesi ile ilgili aşağıdaki bilgilendirmeyi
              yapmaktayız.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-slate-700">
                <strong>Adres:</strong> Akabe, Şht. Furkan Doğan Cd. Bey Plaza Kat:1 No:3/122,
                Karatay / Konya
              </p>
              <p className="text-sm text-slate-700 mt-2">
                <strong>Telefon:</strong> 0530 232 27 42
              </p>
              <p className="text-sm text-slate-700 mt-2">
                <strong>E-posta:</strong> info@bgcsigorta.com
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              2. İşlenen Kişisel Veriler
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Şirketimiz tarafından işlenen kişisel verileriniz aşağıdaki kategorilerde
              toplanmaktadır:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Kimlik Verileri:</strong> Ad, soyad, TC Kimlik No, doğum tarihi, cinsiyet
              </li>
              <li>
                <strong>İletişim Verileri:</strong> Telefon numarası, e-posta adresi, adres bilgisi
              </li>
              <li>
                <strong>Sigorta Verileri:</strong> Plaka bilgisi, araç bilgileri, konut bilgileri,
                sağlık bilgileri
              </li>
              <li>
                <strong>İşlem Güvenliği Verileri:</strong> IP adresi, çerez bilgileri, log kayıtları
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              3. Kişisel Verilerin İşlenme Amaçları
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Sigorta teklifi hazırlama ve sunma</li>
              <li>Sigorta poliçesi oluşturma ve yönetme</li>
              <li>Müşteri ilişkileri yönetimi</li>
              <li>Hasar işlemlerinin yürütülmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>İletişim ve bilgilendirme faaliyetleri</li>
              <li>Hizmet kalitesinin artırılması</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              4. Kişisel Verilerin İşlenme Hukuki Sebepleri
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki
              sebeplere dayanarak işlenmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Açık rızanız</li>
              <li>Bir sözleşmenin kurulması veya ifası ile doğrudan ilgili olması</li>
              <li>Yasal yükümlülüğün yerine getirilmesi</li>
              <li>Hukuki yükümlülüğün yerine getirilmesi</li>
              <li>Meşru menfaatlerimiz</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              5. Kişisel Verilerin Aktarımı
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi için, yasal
              yükümlülüklerimiz ve meşru menfaatlerimiz çerçevesinde aşağıdaki taraflara
              aktarılabilir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Sigorta şirketleri (AXA, Anadolu Sigorta, Allianz, vb.)</li>
              <li>Yasal danışmanlar ve avukatlar</li>
              <li>Denetim firmaları</li>
              <li>Kamu kurum ve kuruluşları (yasal zorunluluk halinde)</li>
              <li>Teknoloji hizmet sağlayıcıları</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              6. Kişisel Verilerin Saklama Süresi
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Kişisel verileriniz, işlendikleri amaçla bağlantılı olarak, ilgili mevzuatta öngörülen
              süreler ve işleme amacının gerektirdiği süre boyunca saklanmaktadır. Bu süre sona
              erdiğinde, kişisel verileriniz silinir, yok edilir veya anonim hale getirilir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              7. KVKK Kapsamındaki Haklarınız
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              KVKK'nın 11. maddesi uyarınca, kişisel verilerinizle ilgili olarak aşağıdaki haklara
              sahipsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
              <li>
                Düzeltme, silme, yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini
                isteme
              </li>
              <li>Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir
                sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın
                giderilmesini talep etme</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              8. Başvuru Yöntemi
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Yukarıda belirtilen haklarınızı kullanmak için, kimliğinizi tespit edici belgelerle
              birlikte aşağıdaki yöntemlerden biriyle başvurabilirsiniz:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>E-posta:</strong> info@bgcsigorta.com adresine "KVKK Başvurusu" konu başlığı
                ile
              </li>
              <li>
                <strong>Posta:</strong> Akabe, Şht. Furkan Doğan Cd. Bey Plaza Kat:1 No:3/122,
                Karatay / Konya adresine yazılı olarak
              </li>
              <li>
                <strong>Telefon:</strong> 0530 232 27 42 numaralı telefonu arayarak
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed mt-4">
              Başvurularınız, talebinizin niteliğine göre en geç otuz gün içinde ücretsiz olarak
              sonuçlandırılacaktır.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
              9. İletişim
            </h2>
            <p className="text-slate-700 leading-relaxed">
              KVKK kapsamındaki haklarınız ve kişisel verilerinizin işlenmesi hakkında sorularınız
              için bizimle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
