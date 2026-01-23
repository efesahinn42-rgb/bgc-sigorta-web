import { z } from "zod";

// TC Kimlik No validasyonu (11 haneli, sadece rakam)
const tcKimlikNoSchema = z
  .string()
  .length(11, "TC Kimlik No 11 haneli olmalıdır")
  .regex(/^\d+$/, "TC Kimlik No sadece rakamlardan oluşmalıdır");

// Plaka validasyonu
const plakaSchema = z.object({
  ilKodu: z
    .string()
    .length(2, "Plaka il kodu 2 haneli olmalıdır")
    .regex(/^\d+$/, "Plaka il kodu sadece rakamlardan oluşmalıdır"),
  devam: z
    .string()
    .min(1, "Plaka devamı gereklidir")
    .max(10, "Plaka devamı çok uzun")
    .regex(/^[A-Z0-9\s]+$/, "Plaka devamı sadece büyük harf ve rakam içermelidir"),
});

// Araç Sigortası Schema
export const vehicleQuoteSchema = z.object({
  productId: z.enum(["trafik", "kasko"]),
  tcKimlikNo: tcKimlikNoSchema,
  plaka: plakaSchema,
  asbisReferansNo: z.string().optional(),
});

// Konut/İşyeri Schema
export const homeQuoteSchema = z.object({
  productId: z.enum(["dask", "konut", "isyeri"]),
  il: z.string().min(1, "İl seçimi gereklidir"),
  ilce: z.string().min(1, "İlçe seçimi gereklidir"),
  brutMetrekare: z
    .number()
    .positive("Metrekare pozitif bir sayı olmalıdır")
    .max(10000, "Metrekare çok büyük"),
  binaYapiTarzı: z.enum(["Betonarme", "Yığma Kagir", "Diğer"]),
});

// Sağlık Schema
const baseHealthSchema = {
  productId: z.enum(["saglik", "seyahat", "pet"]),
  tcKimlikNo: tcKimlikNoSchema,
  dogumTarihi: z.string().min(1, "Doğum tarihi gereklidir"),
  cinsiyet: z.enum(["Kadın", "Erkek"]),
};

export const healthQuoteSchema = z.object({
  ...baseHealthSchema,
});

export const travelQuoteSchema = z.object({
  ...baseHealthSchema,
  productId: z.literal("seyahat"),
  seyahatUlke: z.string().min(1, "Seyahat edilecek ülke/bölge seçimi gereklidir"),
});

export const petQuoteSchema = z.object({
  ...baseHealthSchema,
  productId: z.literal("pet"),
  evcilHayvanTuru: z.enum(["Kedi", "Köpek"]),
});

// İletişim Bilgileri Schema
export const contactSchema = z.object({
  ad: z.string().min(2, "Ad en az 2 karakter olmalıdır").max(50, "Ad çok uzun"),
  soyad: z.string().min(2, "Soyad en az 2 karakter olmalıdır").max(50, "Soyad çok uzun"),
  telefon: z
    .string()
    .regex(/^0\d{10}$/, "Telefon numarası geçerli formatta olmalıdır (05XX XXX XX XX)"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz").optional().or(z.literal("")),
  kvkkOnay: z.boolean().refine((val) => val === true, {
    message: "KVKK aydınlatma metnini kabul etmelisiniz",
  }),
});

// Birleşik Form Schema
export const quoteFormSchema = z.discriminatedUnion("step", [
  z.object({
    step: z.literal(1),
    selectedProduct: z.string().min(1, "Ürün seçimi gereklidir"),
  }),
  z.object({
    step: z.literal(2),
    selectedProduct: z.string(),
    formData: z.union([
      vehicleQuoteSchema,
      homeQuoteSchema,
      healthQuoteSchema,
      travelQuoteSchema,
      petQuoteSchema,
    ]),
  }),
  z.object({
    step: z.literal(3),
    selectedProduct: z.string(),
    formData: z.union([
      vehicleQuoteSchema,
      homeQuoteSchema,
      healthQuoteSchema,
      travelQuoteSchema,
      petQuoteSchema,
    ]),
    contact: contactSchema,
  }),
]);

export type VehicleQuoteFormData = z.infer<typeof vehicleQuoteSchema>;
export type HomeQuoteFormData = z.infer<typeof homeQuoteSchema>;
export type HealthQuoteFormData = z.infer<typeof healthQuoteSchema>;
export type TravelQuoteFormData = z.infer<typeof travelQuoteSchema>;
export type PetQuoteFormData = z.infer<typeof petQuoteSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
