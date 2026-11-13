export type MarketSignalDirection = "up" | "down" | "flat";

export interface MarketAnomalySignal {
  score: number;
  direction: MarketSignalDirection;
  zScore24h: number;
  vs7d: number;
  volatility: number;
  forecastGap: number;
  label: string;
  summary: string;
}

function average(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = average(values);
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function computeMarketAnomaly(series: number[], forecastMean?: number): MarketAnomalySignal | null {
  const clean = series.filter((value) => Number.isFinite(value) && value > 0);
  if (clean.length < 5) return null;

  const latest = clean[clean.length - 1];
  const recentWindow = clean.slice(-Math.min(clean.length, 24));
  const longWindow = clean.slice(-Math.min(clean.length, 7 * 24));

  const mean24 = average(recentWindow);
  const sigma24 = stdDev(recentWindow);
  const zScore24h = sigma24 > 0 ? (latest - mean24) / sigma24 : 0;

  const mean7d = average(longWindow);
  const vs7d = mean7d > 0 ? ((latest - mean7d) / mean7d) * 100 : 0;
  const volatility = mean24 > 0 ? (sigma24 / mean24) * 100 : 0;

  const forecastGap =
    typeof forecastMean === "number" && Number.isFinite(forecastMean) && forecastMean > 0
      ? ((latest - forecastMean) / forecastMean) * 100
      : 0;

  const score = clamp(zScore24h * 9 + vs7d * 0.7 + forecastGap * 0.9 - volatility * 0.3, -100, 100);

  let direction: MarketSignalDirection = "flat";
  if (score > 12) direction = "up";
  else if (score < -12) direction = "down";

  let label = "سطح عادی";
  let summary = "قیمت در محدوده‌ی نرمال تاریخی قرار دارد و نیاز به احتیاط بیشتر نیست.";

  if (zScore24h > 2.2 && vs7d > 1) {
    label = "سطح غیرعادی بالا";
    summary = "قیمت به‌طور غیرعادی بالاتر از میانگین ۲۴ ساعته قرار گرفته و روند کوتاه‌مدت نسبت به میانگین ۷ روزه قوی‌تر است.";
  } else if (zScore24h < -2.2 && vs7d < -1) {
    label = "سطح غیرعادی پایین";
    summary = "قیمت به‌طور غیرعادی پایین‌تر از میانگین ۲۴ ساعته قرار دارد و ریسک برگشت به سمت میانگین بیشتر شده است.";
  } else if (forecastGap > 4 && vs7d > 0) {
    label = "روند کوتاه‌مدت قوی";
    summary = "روند کوتاه‌مدت از میانگین ۷ روزه قوی‌تر است و قیمت از پیش‌بینی آماری بالاتر قرار دارد.";
  } else if (forecastGap < -4 && vs7d < 0) {
    label = "احتمال برگشت";
    summary = "قیمت از پیش‌بینی آماری پایین‌تر است و نسبت به میانگین بلندمدت هم کاهش داشته است؛ احتمال برگشت وجود دارد.";
  } else if (Math.abs(zScore24h) > 1.2) {
    label = "نوسان غیرعادی";
    summary = "قیمت از میانگین ۲۴ ساعته فاصله‌ی قابل توجهی گرفته و وضعیت به‌سمت نوسان بالا می‌رود.";
  }

  return {
    score,
    direction,
    zScore24h,
    vs7d,
    volatility,
    forecastGap,
    label,
    summary,
  };
}
