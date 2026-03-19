import { z } from "zod";
import {
  HEALTH_PRODUCT_IDS,
  HOME_PRODUCT_IDS,
  PRODUCT_IDS,
  type QuoteProductId,
  VEHICLE_PRODUCT_IDS,
  getQuoteProductCategory,
} from "@/lib/quote-products";

export const HOME_BUILDING_TYPES = ["Betonarme", "Yığma Kagir", "Diğer"] as const;
export const HEALTH_GENDERS = ["Kadın", "Erkek"] as const;
export const PET_TYPES = ["Kedi", "Köpek"] as const;
export const TRAVEL_DESTINATIONS = [
  "Schengen Ülkeleri",
  "Tüm Dünya",
  "Amerika & Kanada",
] as const;

const selectedProductSchema = z.enum(PRODUCT_IDS, {
  errorMap: () => ({ message: "Geçerli bir sigorta ürünü seçiniz" }),
});

const tcKimlikNoSchema = z
  .string()
  .length(11, "TC Kimlik No 11 haneli olmalıdır")
  .regex(/^\d+$/, "TC Kimlik No sadece rakamlardan oluşmalıdır");

const plateCityCodeSchema = z
  .string()
  .length(2, "Plaka il kodu 2 haneli olmalıdır")
  .regex(/^\d+$/, "Plaka il kodu sadece rakamlardan oluşmalıdır");

const plateSuffixSchema = z
  .string()
  .min(1, "Plaka devamı gereklidir")
  .max(10, "Plaka devamı çok uzun")
  .regex(/^[A-Z0-9\s]+$/, "Plaka devamı sadece büyük harf ve rakam içermelidir");

const optionalStringSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().optional()
);

const optionalEmailSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().email("Geçerli bir e-posta adresi giriniz").optional()
);

const positiveNumberSchema = z.preprocess(
  (value) => {
    if (value === "" || value === null || value === undefined) {
      return undefined;
    }

    if (typeof value === "number" && Number.isNaN(value)) {
      return undefined;
    }

    return value;
  },
  z
    .number({
      required_error: "Metrekare bilgisi gereklidir",
      invalid_type_error: "Metrekare sayısal olmalıdır",
    })
    .positive("Metrekare pozitif bir sayı olmalıdır")
    .max(10000, "Metrekare çok büyük")
);

export const quoteSelectionSchema = z.object({
  selectedProduct: selectedProductSchema,
});

export const vehicleQuoteDetailsSchema = z.object({
  selectedProduct: z.enum(VEHICLE_PRODUCT_IDS),
  tcKimlikNo: tcKimlikNoSchema,
  plakaIlKodu: plateCityCodeSchema,
  plakaDevami: plateSuffixSchema,
  asbisReferansNo: optionalStringSchema,
});

export const homeQuoteDetailsSchema = z.object({
  selectedProduct: z.enum(HOME_PRODUCT_IDS),
  il: z.string().trim().min(1, "İl seçimi gereklidir"),
  ilce: z.string().trim().min(1, "İlçe seçimi gereklidir"),
  brutMetrekare: positiveNumberSchema,
  binaYapiTarzi: z.enum(HOME_BUILDING_TYPES, {
    errorMap: () => ({ message: "Bina yapı tarzı seçimi gereklidir" }),
  }),
});

const baseHealthDetailsSchema = z.object({
  tcKimlikNo: tcKimlikNoSchema,
  dogumTarihi: z.string().min(1, "Doğum tarihi gereklidir"),
  cinsiyet: z.enum(HEALTH_GENDERS, {
    errorMap: () => ({ message: "Cinsiyet seçimi gereklidir" }),
  }),
});

export const healthQuoteDetailsSchema = baseHealthDetailsSchema.extend({
  selectedProduct: z.literal("saglik"),
});

export const travelQuoteDetailsSchema = baseHealthDetailsSchema.extend({
  selectedProduct: z.literal("seyahat"),
  seyahatUlke: z.enum(TRAVEL_DESTINATIONS, {
    errorMap: () => ({ message: "Seyahat bölgesi seçimi gereklidir" }),
  }),
});

export const petQuoteDetailsSchema = baseHealthDetailsSchema.extend({
  selectedProduct: z.literal("pet"),
  evcilHayvanTuru: z.enum(PET_TYPES, {
    errorMap: () => ({ message: "Evcil hayvan türü seçimi gereklidir" }),
  }),
});

export const contactSchema = z.object({
  ad: z.string().trim().min(2, "Ad en az 2 karakter olmalıdır").max(50, "Ad çok uzun"),
  soyad: z.string().trim().min(2, "Soyad en az 2 karakter olmalıdır").max(50, "Soyad çok uzun"),
  telefon: z
    .string()
    .regex(/^0\d{10}$/, "Telefon numarası geçerli formatta olmalıdır (05XX XXX XX XX)"),
  email: optionalEmailSchema,
  kvkkOnay: z.literal(true, {
    errorMap: () => ({ message: "KVKK aydınlatma metnini kabul etmelisiniz" }),
  }),
});

export const vehicleQuoteSchema = z.object({
  productId: z.enum(VEHICLE_PRODUCT_IDS),
  tcKimlikNo: tcKimlikNoSchema,
  plaka: z.object({
    ilKodu: plateCityCodeSchema,
    devam: plateSuffixSchema,
  }),
  asbisReferansNo: optionalStringSchema,
});

export const homeQuoteSchema = z.object({
  productId: z.enum(HOME_PRODUCT_IDS),
  il: z.string().trim().min(1, "İl seçimi gereklidir"),
  ilce: z.string().trim().min(1, "İlçe seçimi gereklidir"),
  brutMetrekare: positiveNumberSchema,
  binaYapiTarzi: z.enum(HOME_BUILDING_TYPES),
});

export const healthQuoteSchema = z.object({
  productId: z.literal("saglik"),
  tcKimlikNo: tcKimlikNoSchema,
  dogumTarihi: z.string().min(1, "Doğum tarihi gereklidir"),
  cinsiyet: z.enum(HEALTH_GENDERS),
});

export const travelQuoteSchema = z.object({
  productId: z.literal("seyahat"),
  tcKimlikNo: tcKimlikNoSchema,
  dogumTarihi: z.string().min(1, "Doğum tarihi gereklidir"),
  cinsiyet: z.enum(HEALTH_GENDERS),
  seyahatUlke: z.enum(TRAVEL_DESTINATIONS),
});

export const petQuoteSchema = z.object({
  productId: z.literal("pet"),
  tcKimlikNo: tcKimlikNoSchema,
  dogumTarihi: z.string().min(1, "Doğum tarihi gereklidir"),
  cinsiyet: z.enum(HEALTH_GENDERS),
  evcilHayvanTuru: z.enum(PET_TYPES),
});

export const quoteSubmissionSchema = z
  .object({
    step: z.literal(3),
    selectedProduct: selectedProductSchema,
    formData: z.union([
      vehicleQuoteSchema,
      homeQuoteSchema,
      healthQuoteSchema,
      travelQuoteSchema,
      petQuoteSchema,
    ]),
    contact: contactSchema,
  })
  .superRefine((data, ctx) => {
    if (data.selectedProduct !== data.formData.productId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["formData", "productId"],
        message: "Seçilen ürün ile form verileri uyuşmuyor",
      });
    }
  });

export interface QuoteWizardFormValues {
  selectedProduct: QuoteProductId | "";
  tcKimlikNo: string;
  plakaIlKodu: string;
  plakaDevami: string;
  asbisReferansNo: string;
  il: string;
  ilce: string;
  brutMetrekare: number | undefined;
  binaYapiTarzi: (typeof HOME_BUILDING_TYPES)[number] | "";
  dogumTarihi: string;
  cinsiyet: (typeof HEALTH_GENDERS)[number] | "";
  seyahatUlke: (typeof TRAVEL_DESTINATIONS)[number] | "";
  evcilHayvanTuru: (typeof PET_TYPES)[number] | "";
  ad: string;
  soyad: string;
  telefon: string;
  email: string;
  kvkkOnay: boolean;
}

export const quoteWizardDefaults: QuoteWizardFormValues = {
  selectedProduct: "",
  tcKimlikNo: "",
  plakaIlKodu: "",
  plakaDevami: "",
  asbisReferansNo: "",
  il: "",
  ilce: "",
  brutMetrekare: undefined,
  binaYapiTarzi: "",
  dogumTarihi: "",
  cinsiyet: "",
  seyahatUlke: "",
  evcilHayvanTuru: "",
  ad: "",
  soyad: "",
  telefon: "",
  email: "",
  kvkkOnay: false,
};

export function getStepTwoSchema(productId: QuoteProductId) {
  switch (productId) {
    case "trafik":
    case "kasko":
      return vehicleQuoteDetailsSchema;
    case "dask":
    case "konut":
    case "isyeri":
      return homeQuoteDetailsSchema;
    case "saglik":
      return healthQuoteDetailsSchema;
    case "seyahat":
      return travelQuoteDetailsSchema;
    case "pet":
      return petQuoteDetailsSchema;
  }
}

export function getStepSchema(step: number, selectedProduct?: string) {
  if (step === 1) {
    return quoteSelectionSchema;
  }

  if (step === 2 && selectedProduct && PRODUCT_IDS.includes(selectedProduct as QuoteProductId)) {
    return getStepTwoSchema(selectedProduct as QuoteProductId);
  }

  return contactSchema;
}

export function getStepTwoFieldNames(productId: QuoteProductId): Array<keyof QuoteWizardFormValues> {
  switch (getQuoteProductCategory(productId)) {
    case "vehicle":
      return ["tcKimlikNo", "plakaIlKodu", "plakaDevami"];
    case "home":
      return ["il", "ilce", "brutMetrekare", "binaYapiTarzi"];
    case "health":
      if (productId === "seyahat") {
        return ["tcKimlikNo", "dogumTarihi", "cinsiyet", "seyahatUlke"];
      }

      if (productId === "pet") {
        return ["tcKimlikNo", "dogumTarihi", "cinsiyet", "evcilHayvanTuru"];
      }

      return ["tcKimlikNo", "dogumTarihi", "cinsiyet"];
  }
}

export function buildQuotePayload(values: QuoteWizardFormValues): QuoteSubmissionData {
  const selectedProduct = values.selectedProduct as QuoteProductId;

  const baseContact = {
    ad: values.ad.trim(),
    soyad: values.soyad.trim(),
    telefon: values.telefon,
    email: values.email.trim() || undefined,
    kvkkOnay: values.kvkkOnay,
  };

  switch (getQuoteProductCategory(selectedProduct)) {
    case "vehicle":
      return {
        step: 3,
        selectedProduct,
        formData: {
          productId: selectedProduct as "trafik" | "kasko",
          tcKimlikNo: values.tcKimlikNo,
          plaka: {
            ilKodu: values.plakaIlKodu,
            devam: values.plakaDevami.trim().toUpperCase(),
          },
          asbisReferansNo: values.asbisReferansNo.trim() || undefined,
        },
        contact: baseContact,
      };
    case "home":
      return {
        step: 3,
        selectedProduct,
        formData: {
          productId: selectedProduct as "dask" | "konut" | "isyeri",
          il: values.il.trim(),
          ilce: values.ilce.trim(),
          brutMetrekare: values.brutMetrekare as number,
          binaYapiTarzi: values.binaYapiTarzi as (typeof HOME_BUILDING_TYPES)[number],
        },
        contact: baseContact,
      };
    case "health":
      if (selectedProduct === "seyahat") {
        return {
          step: 3,
          selectedProduct,
          formData: {
            productId: "seyahat",
            tcKimlikNo: values.tcKimlikNo,
            dogumTarihi: values.dogumTarihi,
            cinsiyet: values.cinsiyet as (typeof HEALTH_GENDERS)[number],
            seyahatUlke: values.seyahatUlke as (typeof TRAVEL_DESTINATIONS)[number],
          },
          contact: baseContact,
        };
      }

      if (selectedProduct === "pet") {
        return {
          step: 3,
          selectedProduct,
          formData: {
            productId: "pet",
            tcKimlikNo: values.tcKimlikNo,
            dogumTarihi: values.dogumTarihi,
            cinsiyet: values.cinsiyet as (typeof HEALTH_GENDERS)[number],
            evcilHayvanTuru: values.evcilHayvanTuru as (typeof PET_TYPES)[number],
          },
          contact: baseContact,
        };
      }

      return {
        step: 3,
        selectedProduct,
        formData: {
          productId: "saglik",
          tcKimlikNo: values.tcKimlikNo,
          dogumTarihi: values.dogumTarihi,
          cinsiyet: values.cinsiyet as (typeof HEALTH_GENDERS)[number],
        },
        contact: baseContact,
      };
  }
}

export type VehicleQuoteFormData = z.infer<typeof vehicleQuoteSchema>;
export type HomeQuoteFormData = z.infer<typeof homeQuoteSchema>;
export type HealthQuoteFormData = z.infer<typeof healthQuoteSchema>;
export type TravelQuoteFormData = z.infer<typeof travelQuoteSchema>;
export type PetQuoteFormData = z.infer<typeof petQuoteSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type QuoteSubmissionData = z.infer<typeof quoteSubmissionSchema>;
