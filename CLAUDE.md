# BGC Sigorta — Teklif Sitesi

**İşletme:** BGC Group'un sigorta acentesi. Çok adımlı ("wizard") teklif formu
(trafik/kasko/dask/konut/işyeri/sağlık/seyahat/pet) + Prisma/Postgres backend +
nodemailer ile e-posta bildirimi. Canlı domain: `bgcsigorta.com.tr`'ye benziyor
olabilir, Vercel projesi `bgc-sigorta-web`.

## Stack
- Next.js 16.2.12 (App Router), React 19, TypeScript
- Prisma + Postgres (`prisma/schema.prisma` — tek model: `Lead`)
- Sentry, react-hook-form + zod, nodemailer (SMTP), Vitest + Testing Library
- Consent yönetimi: `ConsentProvider` → `AnalyticsGate` (analytics sadece onay verilince yükleniyor — doğru sıralama)

## Kritik: next sürümü NEDEN 16.2.12 (16.3.x DEĞİL)
Aynı sebep, aynı karar konya-kebap-evi projesinde de var: Next.js 16.3.1+ Vercel'in
git-tetiklemeli otomatik build pipeline'ını `ENOENT next-server.js.nft.json` hatasıyla
kırıyor (resmi çözüm yok, Eylül 2026). Ağustos 2026'nın kritik AVIF/Windows RCE'si
**Vercel'in yönetilen platformunda barınan uygulamaları etkilemiyor**, bu yüzden 16.2.x'te
kalmak güvenli. `sharp` yine de latest'e sabit (libheif katmanı için defense-in-depth).
`npm audit` "next: critical" gösterecek — bilinçli, göz ardı edilmiyor.

## Veritabanı YOK (bilinçli karar, 2026-09-11)
`prisma/schema.prisma` ve `@prisma/client` repoda duruyor ama **kullanılmıyor** —
kullanıcı bu proje için DB kurulmayacağını belirtti. Tek kalıcılık kanalı
`sendLeadNotificationEmail` (nodemailer/SMTP). Bu yüzden `/api/quote` artık e-posta
gönderimi başarısız olursa **502 döndürüyor** (sahte "başarılı" göstermiyor) —
çünkü e-posta başarısızsa talep hiçbir yerde kaydolmuyor. SMTP env değişkenleri
(`SMTP_HOST/PORT/USER/PASSWORD/FROM`, `LEAD_NOTIFICATION_TO`) Vercel'de mutlaka
tanımlı olmalı, yoksa **form tamamen çalışmaz** (502 döner). `vercel env ls production`
ile kontrol edin — 2026-09-11 itibariyle hiçbiri tanımlı değil, henüz kurulmadı.

**Alıcı adres:** `info@bgcsigorta.com.tr` (dikkat: `.com` değil `.com.tr`) —
METUnic panelinden bir **yönlendirme** (forwarding) olarak kurulmuş, gerçek bir
SMTP-gönderim yapabilen kutu olmayabilir. SMTP kurulurken muhtemelen ayrı bir
gönderim servisi gerekecek (Resend, Gmail App Password, hosting'in kendi SMTP'si
vb.) — sadece bu adresi `LEAD_NOTIFICATION_TO` yapmak yeterli olmayabilir, `SMTP_*`
değişkenleri için gönderebilen ayrı bir hesap/servis lazım.

## 2026-09-11 düzeltmeleri
- **KRİTİK — Lead servisi hiç çalışmıyordu:** `src/lib/server/lead-service.ts` sadece
  rastgele bir `TEMP-xxxx` id döndürüp duruyordu — hiçbir yere yazmıyor, e-posta hiç
  göndermiyordu. Yani **teklif formu aylardır hiçbir talebi kaydetmiyordu**, müşteriye
  "başarılı" mesajı gösterip arkada hiçbir şey yapmıyordu. Gerçek
  `sendLeadNotificationEmail()` çağrısıyla tamamlandı (DB yok, yukarı bakın).
- `next` 16.1.1 → 16.2.12, `sharp`/`nodemailer`/`js-yaml` güncellendi (kritik CVE + diğer).
- `@testing-library/dom` eksikti (package.json'da declare edilmemiş peer dependency),
  testler hiç çalışmıyordu (`Cannot find module`). Eklendi, artık 21/23 test geçiyor.

## Bilinen açık sorunlar (henüz dokunulmadı)
- [ ] `src/app/teklif-al/page.test.tsx` — 2 test başarısız (`getByLabelText` TC Kimlik No
  alanını bulamıyor, çok adımlı wizard step geçişinde bir selector/timing sorunu). Bu
  oturumda dokunulmadı, benim değişikliğimle ilgisi yok (route.test.ts'in tamamı geçiyor).
- [ ] Rate limiter bellek içi (`rate-limit.ts`) — serverless/Vercel'de soğuk başlatmalarda
  sıfırlanıyor, gerçek koruma sağlamıyor. Upstash Redis'e taşınmalı.
- [ ] `x-forwarded-for` doğrudan güveniliyor — IP spoofing ile rate limit bypass edilebilir.
- [ ] CAPTCHA/honeypot yok — TC Kimlik No toplayan bir formda bot/spam riski var.
- [ ] 404 sayfası yok, FAQ/FAQPage/BreadcrumbList schema yok.
- [ ] Form submit sonrası ayrı "teşekkürler" sayfası yok, sadece toast.
- [ ] `Corporate.tsx`/`Partners.tsx`'teki "20+ yıl", "20+ sigorta devi" gibi iddialar
  doğrulanabilir kaynak olmadan duruyor — gerçek veriyse kalsın, değilse somutlaştırılmalı.
- [ ] Sentry `beforeSend`/PII scrub ayarı doğrulanmadı — TC kimlik no/telefon içeren bir
  hata Sentry'ye PII olarak gidebilir, kontrol edilmeli.

## Komutlar
- dev `npm run dev` · build `npm run build` · test `npm test`
- Prisma değişikliğinden sonra: `npx prisma generate`
