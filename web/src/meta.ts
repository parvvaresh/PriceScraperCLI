export type Unit = "rial" | "usd" | "points";

export interface ItemMeta {
  name: string; // Persian display name
  en: string; // English label
  unit: Unit;
  symbol: string; // short glyph shown in the card badge
  accent: string; // card accent (identity only, never used for values)
}

export const ITEM_META: Record<string, ItemMeta> = {
  Dollar: { name: "دلار آزاد", en: "US Dollar", unit: "rial", symbol: "$", accent: "#2a78d6" },
  Tether: { name: "تتر", en: "Tether (USDT)", unit: "rial", symbol: "₮", accent: "#1baf7a" },
  Coin: { name: "سکه امامی", en: "Emami Coin", unit: "rial", symbol: "◎", accent: "#eda100" },
  Gold18K: { name: "طلای ۱۸ عیار", en: "Gold 18K / gram", unit: "rial", symbol: "Au", accent: "#eda100" },
  GoldMithqal: { name: "مثقال طلا", en: "Gold Mithqal", unit: "rial", symbol: "Au", accent: "#eb6834" },
  GoldOunce: { name: "انس جهانی طلا", en: "Gold Ounce", unit: "usd", symbol: "oz", accent: "#eda100" },
  Bitcoin: { name: "بیت‌کوین", en: "Bitcoin", unit: "usd", symbol: "₿", accent: "#eb6834" },
  BrentOil: { name: "نفت برنت", en: "Brent Oil", unit: "usd", symbol: "⛽", accent: "#6250d6" },
  Stock: { name: "شاخص بورس", en: "TEDPIX", unit: "points", symbol: "📈", accent: "#e87ba4" },
};

/** Order of cards on the page (currencies first, then gold, then global markets). */
export const DISPLAY_ORDER = [
  "Dollar",
  "Tether",
  "Coin",
  "Gold18K",
  "GoldMithqal",
  "GoldOunce",
  "Bitcoin",
  "BrentOil",
  "Stock",
];

export function metaFor(key: string, fallbackTitle = key): ItemMeta {
  return ITEM_META[key] ?? { name: fallbackTitle, en: key, unit: "points", symbol: "•", accent: "#2a78d6" };
}
