export const PRODUCT_IDS = [
  "trafik",
  "kasko",
  "dask",
  "konut",
  "saglik",
  "seyahat",
  "isyeri",
  "pet",
] as const;

export const VEHICLE_PRODUCT_IDS = ["trafik", "kasko"] as const;
export const HOME_PRODUCT_IDS = ["dask", "konut", "isyeri"] as const;
export const HEALTH_PRODUCT_IDS = ["saglik", "seyahat", "pet"] as const;

export type QuoteProductId = (typeof PRODUCT_IDS)[number];
export type QuoteProductCategory = "vehicle" | "home" | "health";

export const quoteProducts = [
  { id: "trafik", name: "Trafik Sigortası", category: "vehicle" },
  { id: "kasko", name: "Kasko", category: "vehicle" },
  { id: "dask", name: "DASK (Deprem)", category: "home" },
  { id: "konut", name: "Konut Sigortası", category: "home" },
  { id: "saglik", name: "Tamamlayıcı Sağlık", category: "health" },
  { id: "seyahat", name: "Seyahat Sağlık", category: "health" },
  { id: "isyeri", name: "İşyeri Sigortası", category: "home" },
  { id: "pet", name: "Evcil Hayvan", category: "health" },
] as const satisfies ReadonlyArray<{
  id: QuoteProductId;
  name: string;
  category: QuoteProductCategory;
}>;

export function isQuoteProductId(value: string | null | undefined): value is QuoteProductId {
  return PRODUCT_IDS.includes(value as QuoteProductId);
}

export function getQuoteProduct(productId: QuoteProductId) {
  return quoteProducts.find((product) => product.id === productId);
}

export function getQuoteProductCategory(productId: QuoteProductId): QuoteProductCategory {
  const product = getQuoteProduct(productId);

  if (!product) {
    throw new Error(`Unknown product id: ${productId}`);
  }

  return product.category;
}
