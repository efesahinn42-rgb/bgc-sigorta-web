# BGC Sigorta

BGC Sigorta için hazırlanmış, Next.js 16 tabanlı kurumsal tanıtım ve teklif toplama arayüzüdür. Proje bugün itibarıyla tek sayfalık bir ana landing page, çok adımlı teklif alma akışı, yasal bilgilendirme sayfaları ve temel SEO/izleme altyapısından oluşuyor.

Detaylı teknik ve ürün analizi için [PROJE_ANALIZI.md](./PROJE_ANALIZI.md) dosyasına bakılabilir.

## Mevcut Özellikler

- Ana sayfa: hero, kurumsal tanıtım, partner logoları, hizmetler, CTA ve iletişim bölümleri
- `/teklif-al`: `react-hook-form` ve Zod ile çalışan çok adımlı teklif toplama arayüzü
- `/api/quote`: Zod doğrulamalı, PostgreSQL kayıtlı, SMTP bildirimli API endpoint'i
- `/kvkk`, `/gizlilik-politikasi`, `/kullanim-kosullari`: yasal içerik sayfaları
- `robots.ts`, `sitemap.ts`, metadata, Open Graph image ve structured data ile SEO hazırlığı
- Açık onay sonrası çalışan Google Analytics ve Vercel Analytics entegrasyonu
- Prisma ile PostgreSQL veri modeli ve migration dosyaları

## Teknoloji Yığını

- Next.js 16.1.1
- React 19
- TypeScript
- Tailwind CSS 4
- Zod
- Prisma + PostgreSQL
- Nodemailer
- Vitest + Testing Library
- Sentry

## Klasör Yapısı

```text
src/
  app/
    api/quote/route.ts        API endpoint
    teklif-al/page.tsx        Çok adımlı teklif ekranı
    page.tsx                  Ana sayfa
    layout.tsx                Global layout + metadata
  components/
    analytics/                Google Analytics entegrasyonu
    errors/                   Error boundary
    home/                     Ana sayfa bölümleri
    layout/                   Navbar, cookie consent
    ui/                       Basit UI yardımcıları
  lib/
    analytics/                GA yardımcıları
    seo/                      Structured data üretimi
    validations/              Teklif formu Zod şemaları
```

## Kurulum

```bash
npm install
npm run dev
```

Varsayılan geliştirme adresi: [http://localhost:3000](http://localhost:3000)

## Ortam Değişkenleri

Aktif kullanılan değişkenler:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_SENTRY_DSN`
- `DATABASE_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`
- `LEAD_NOTIFICATION_TO`

İsteğe bağlı değişkenler:

- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`

## Mevcut Durum Notları

- Teklif formu UI, Zod şemaları ve `/api/quote` endpoint'i artık uçtan uca bağlı çalışır.
- Lead kayıtları PostgreSQL'e yazılır; SMTP bildirimi başarısız olsa bile lead kaybolmaz.
- Analitik scriptleri yalnız kullanıcı kabul ettikten sonra yüklenir.
- Sosyal medya linkleri henüz konfigüre edilmediği için arayüzde gizlenmiştir.
- Kırık `bayi-girisi` yönlendirmesi kaldırılmıştır.

## Son Geliştirme Turu

- Teklif sihirbazı `react-hook-form` ve dinamik Zod resolver ile yeniden kuruldu
- Prisma şeması, migration ve server helper'ları eklendi
- SMTP e-posta bildirimi ve lead durumu takibi eklendi
- Consent provider ile analytics yükleme akışı koşullu hale getirildi
- Yasal sayfalar gerçek veri işleme akışına göre güncellendi
- Branded Open Graph görseli ve repo içi animasyon sınıfları eklendi
- Form, API ve consent akışları için testler eklendi
