# BGC Sigorta Proje Analizi

**Tarih:** 19 Mart 2026
**Konum:** `/Users/busrasimayavsan/Desktop/PROJELER/bgcsigorta/bgc-sigorta`

## 1. Yönetici Özeti

Bu proje, BGC Sigorta'nın dijital vitrini ve teklif toplama giriş kapısı olarak tasarlanmış bir Next.js uygulaması. Arayüz tarafı güçlü bir kurumsal landing page deneyimi sunarken, teklif toplama tarafı da bu çalışma ile birlikte gerçek doğrulama, PostgreSQL kayıt ve SMTP bildirim akışına bağlandı.

Kod tabanı hâlâ küçük ve okunabilir. Bu önemli bir avantaj: mimari henüz karmaşıklaşmadan ürünleşme adımları atılmış durumda. Bugünkü haliyle proje artık yalnızca tanıtım sitesi değil; gerçek lead toplayan, temel operasyon akışını çalıştıran bir web uygulaması seviyesine geçmiş durumda.

## 2. Projenin Amacı

Uygulamanın ana hedefi üç başlıkta toplanıyor:

1. BGC Sigorta'yı kurumsal olarak tanıtmak
2. Kullanıcıyı güven duygusu oluşturan içeriklerle teklif istemeye yönlendirmek
3. Teklif talebini dijital olarak toplayıp satış/operasyon ekibine aktarmak

Bugünkü yapı artık bu üç hedefi de temel seviyede karşılıyor. Bundan sonraki ihtiyaç, çalışan entegrasyonu daha görünür ve ölçeklenebilir hale getirmek.

## 3. Teknoloji Mimarisi

### Uygulama Katmanı

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4

### Yardımcı Katmanlar

- Zod: teklif formu doğrulama şemaları
- Prisma + PostgreSQL: lead kayıt katmanı
- Nodemailer: operasyon bildirimi
- Vitest + Testing Library: form, API ve consent senaryoları için test altyapısı
- Sentry: hata izleme başlangıç kurulumu
- Google Analytics + Vercel Analytics: açık onay sonrası çalışan ölçümleme temeli

### Mimari Karakteri

- Lead verisi PostgreSQL'e yazılıyor
- SMTP ile operasyon ekibine bildirim gidiyor
- Form state yönetimi `react-hook-form` ile merkezileştirildi
- Consent katmanı ile analytics script yükleme koşullu hale getirildi
- App Router sayesinde sayfa yapısı sade ve bakımı kolay

## 4. Klasör Yapısı ve Sorumluluklar

```text
src/
├── app/
│   ├── api/quote/route.ts
│   ├── gizlilik-politikasi/page.tsx
│   ├── kvkk/page.tsx
│   ├── kullanim-kosullari/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   └── teklif-al/page.tsx
├── components/
│   ├── analytics/
│   ├── errors/
│   ├── home/
│   ├── layout/
│   └── ui/
└── lib/
    ├── analytics/
    ├── seo/
    ├── utils.ts
    └── validations/
```

Yapı küçük projeler için sağlıklı. `app`, `components` ve `lib` ayrımı net. Şimdilik domain bazlı modülerleşmeye ihtiyaç yok, ancak teklif akışı büyürse `features/quote` benzeri bir ayrım düşünülmeli.

## 5. Mevcut Ürün Akışları

### Ana Sayfa (`/`)

Ana sayfa tek akışlı bir landing page mantığında ilerliyor:

- Hero alanı
- Kurumsal güven katmanı
- Partner/sigorta şirketi logoları
- Hizmet kartları
- Teklif CTA bandı
- İletişim ve footer

Bu yapı dönüşüm odaklı ve sigorta sektörü için doğru kurgulanmış. Kullanıcıya önce güven, sonra kapsam, sonra aksiyon gösteriliyor.

### Teklif Sayfası (`/teklif-al`)

Bu sayfa 4 adımlı bir wizard olarak kurgulanmış:

1. Ürün seçimi
2. Ürüne göre detay alanları
3. İletişim bilgileri
4. Başarı ekranı

Burada önemli nokta şu: kullanıcı deneyimi ile veri akışı artık aynı omurgada birleşmiş durumda. Form `react-hook-form` + Zod ile adım adım doğrulanıyor ve yalnız final adımda gerçek payload ile API'ye submit ediyor.

### API Katmanı (`/api/quote`)

API tarafında:

- Zod ile final payload doğrulaması var
- Basit IP bazlı rate limiting var
- Lead verisi önce PostgreSQL'e yazılıyor
- SMTP ile operasyon ekibine bildirim gidiyor
- Bildirim başarısız olsa bile lead kaydı korunuyor

Ancak:

- rate limit bellek içi olduğu için server restart sonrası sıfırlanıyor
- CRM veya admin panel entegrasyonu yok
- CSRF/abuse korumaları hâlâ temel seviyede

## 6. Kod Kalitesi Değerlendirmesi

### Güçlü Yönler

- Bileşen isimlendirmesi anlaşılır
- App Router kullanımı temiz
- Tasarım dili tutarlı
- Metadata, sitemap, robots ve structured data gibi SEO hazırlıkları düşünülmüş
- Kod tabanı küçük olduğu için refactor maliyeti düşük

### Zayıf Yönler

- Operasyon tarafında admin panel veya CRM görünürlüğü yok
- Rate limiting dağıtık ortam için yeterli değil
- Test senaryoları eklense de uçtan uca deployment smoke testleri eksik
- Sosyal medya ve bazı içerik alanları gerçek veri gelene kadar kapalı
- Yasal ve operasyonel akış için çevresel değişken yapılandırmasına bağımlılık yüksek

## 7. Bu Çalışmada Yapılan Geliştirmeler

Bu turda analiz raporundaki ana eksiklerin tamamı uygulamaya dönüştürüldü:

- Teklif sihirbazı `react-hook-form` ve Zod resolver ile uçtan uca çalışır hale getirildi
- `/teklif-al` sayfası `product` query param ile ön seçim destekler hale getirildi
- Final payload yalnız son adımda `/api/quote` endpoint'ine gönderilecek şekilde netleştirildi
- Prisma tabanlı PostgreSQL veri modeli ve migration yapısı eklendi
- Lead kayıtları önce veritabanına yazılacak, ardından SMTP ile operasyon ekibine bildirilecek şekilde akış kuruldu
- Bildirim başarısız olsa bile lead kaybını önleyen `notificationStatus` takibi eklendi
- Kırık `bayi-girisi` yönlendirmesi kaldırıldı
- Hero CTA'ları ve harita aksiyonu gerçek bağlantılara bağlandı
- Sosyal medya alanı, gerçek link konfigürasyonu gelene kadar gizlendi
- Consent provider ile Google Analytics ve Vercel Analytics yalnız açık onay sonrası yüklenir hale getirildi
- KVKK, gizlilik politikası ve kullanım koşulları gerçek veri işleme akışına göre güncellendi
- `app/opengraph-image.tsx` ile branded Open Graph görseli eklendi
- Tanımsız animasyon utility sınıfları repo içi CSS animasyon sınıflarına taşındı
- Form, API ve consent davranışları için yeni test senaryoları eklendi

Bu noktada proje, önceki “landing page + yarım entegre form” seviyesinden işlevsel lead toplama uygulaması seviyesine taşınmış oldu.

## 8. Mevcut Riskler ve Sonraki İyileştirmeler

### Kalan Teknik Riskler

#### 1. Rate limiting halen bellek içi

Mevcut limit mantığı helper yapıya ayrıldı ve testlenebilir hale geldi; ancak hâlâ in-memory çalışıyor. Çoklu instance veya server restart senaryolarında Redis benzeri kalıcı bir çözüm tercih edilmeli.

#### 2. CRM veya admin panel henüz yok

Lead’ler artık veritabanına kaydediliyor ve e-posta ile bildiriliyor; fakat ekip tarafında filtreleme, durum yönetimi veya satış pipeline takibi için admin panel/CRM entegrasyonu bulunmuyor.

#### 3. Sosyal medya bağlantıları bilerek kapalı

Yanlış veya boş yönlendirme oluşturmamak için sosyal medya bölümü gizlendi. Gerçek linkler geldiğinde yeniden aktif edilebilir.

#### 4. SMTP ve veritabanı yapılandırması ortam değişkenlerine bağlı

Kod seviyesi entegrasyon hazır, ancak production ortamında `DATABASE_URL`, `SMTP_*` ve `LEAD_NOTIFICATION_TO` değişkenleri doğru tanımlanmadığı sürece tam operasyonel akış çalışmaz.

### Kalan Ürün İyileştirmeleri

#### 5. Operasyon paneli ve durum yönetimi

Lead yaşam döngüsünü yönetmek için basit bir dahili panel veya CRM webhook entegrasyonu eklemek sonraki mantıklı adımdır.

#### 6. Daha gelişmiş ölçümleme ve çerez kategorileri

Şu anda analitik çerezler açık onay sonrası etkinleşiyor. İleride istatistik, pazarlama ve fonksiyonel kategorileri ayıran daha ayrıntılı bir consent kurgusu düşünülebilir.

#### 7. E2E doğrulama ve deployment smoke testleri

Vitest/Testing Library senaryoları eklense de gerçek deployment sonrası form gönderimi, SMTP teslimi ve veritabanı yazımı için staging smoke testleri yapılmalıdır.

## 9. Geliştirebileceğimiz Alanlar

### Öncelik 1: Operasyon görünürlüğü eklemek

- lead listesi ve durum yönetimi için basit bir iç panel oluşturmak
- e-posta bildirimine ek olarak CRM webhook veya satış pipeline entegrasyonu eklemek
- operasyon ekibinin lead yaşam döngüsünü ölçebileceği alanlar hazırlamak

### Öncelik 2: Güvenilirlik katmanını güçlendirmek

- rate limiting'i Redis veya benzeri kalıcı çözümle dağıtık ortama taşımak
- spam, bot ve abuse korumalarını artırmak
- SMTP başarısızlıkları için retry veya kuyruk mekanizması eklemek

### Öncelik 3: Dönüşüm optimizasyonu

- mobil teklif akışında drop-off noktalarını ölçüp sadeleştirmek
- partner/referans alanına güven artırıcı gerçek metrikler eklemek
- ürün bazlı landing varyasyonları ile CTA performansını test etmek

### Öncelik 4: Ölçümleme ve yasal olgunluk

- çerez tercihlerini kategori bazlı hale getirmek
- analitik olaylarını teklif funnel adımları için genişletmek
- saklama, erişim ve silme süreçlerini operasyonel dokümantasyonla netleştirmek

### Öncelik 5: Teknik kalite

- staging üzerinde smoke test akışları oluşturmak
- kritik yol için E2E test eklemek
- reusable form field bileşenleriyle tekrarları azaltmak
- production gözlemlenebilirliğini log ve hata bütçesi tarafında güçlendirmek

## 10. Genel Sonuç

Bu proje sağlam görsel temeli olan, okunabilir ve büyümeye uygun bir uygulama. En kritik eksiklerin büyük bölümü bu çalışmada kapatıldı: teklif akışı gerçek submit sürecine bağlandı, lead verisi kalıcı hale geldi ve consent/SEO altyapısı daha üretim odaklı bir seviyeye taşındı. Bundan sonraki ana odak, bu çalışan çekirdeğin üstüne operasyon yönetimi ve güvenilirlik katmanlarını eklemek olmalı.

Özetle:

- pazarlama vitrini tarafı güçlü
- teknik temel sade ve yönetilebilir
- lead toplama akışı artık gerçek veri ve bildirim katmanına bağlı
- production olgunluğu için sıradaki ana başlıklar operasyon paneli, kalıcı rate limit ve staging smoke testleridir
