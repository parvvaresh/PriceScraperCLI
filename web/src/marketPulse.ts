export type MarketCategory = "all" | "currency" | "gold" | "global";

export interface MarketPulseRow {
  key: string;
  title: string;
  value: number;
  changePercent: number;
  direction: "up" | "down" | "flat";
  signal: {
    score: number;
    direction: "up" | "down" | "flat";
    label: string;
    summary: string;
  };
}

export interface MarketPulseSummary {
  heatIndex: number;
  label: string;
  summary: string;
  topGainer: MarketPulseRow | null;
  topLoser: MarketPulseRow | null;
  bullish: number;
  bearish: number;
  neutral: number;
  alertCount: number;
}

export function categoryForKey(key: string): MarketCategory {
  switch (key) {
    case "Dollar":
    case "Tether":
    case "Coin":
      return "currency";
    case "Gold18K":
    case "GoldMithqal":
    case "GoldOunce":
      return "gold";
    case "Bitcoin":
    case "BrentOil":
    case "Stock":
      return "global";
    default:
      return "all";
  }
}

export function filterPulseRows(rows: MarketPulseRow[], category: MarketCategory): MarketPulseRow[] {
  if (category === "all") return rows;
  return rows.filter((row) => categoryForKey(row.key) === category);
}

export function computeMarketPulse(rows: MarketPulseRow[]): MarketPulseSummary {
  if (!rows.length) {
    return {
      heatIndex: 0,
      label: "خنثی",
      summary: "هیچ دارایی‌ای برای تحلیل بازار انتخاب نشده است.",
      topGainer: null,
      topLoser: null,
      bullish: 0,
      bearish: 0,
      neutral: 0,
      alertCount: 0,
    };
  }

  const avgScore = rows.reduce((sum, row) => sum + row.signal.score, 0) / rows.length;
  const heatIndex = Math.round(Math.max(-100, Math.min(100, avgScore * 4)));

  const bullish = rows.filter((row) => row.signal.direction === "up").length;
  const bearish = rows.filter((row) => row.signal.direction === "down").length;
  const neutral = rows.filter((row) => row.signal.direction === "flat").length;

  const alertCount = rows.filter((row) => row.signal.score > 12 || row.signal.score < -12).length;

  const topGainer = [...rows].sort((a, b) => b.changePercent - a.changePercent)[0] ?? null;
  const topLoser = [...rows].sort((a, b) => a.changePercent - b.changePercent)[0] ?? null;

  let label = "خنثی";
  let summary = "بازار در حالت آرامش نسبی قرار دارد و احتمال جهش ناگهانی کمتر است.";

  if (avgScore > 20) {
    label = "بازار گرم";
    summary = "اکثریت دارایی‌های منتخب در وضعیت خرید قوی قرار دارند و فشار تقاضا بر بازار غالب است.";
  } else if (avgScore > 6) {
    label = "روند قوی";
    summary = "روند بازار در سطح مثبت است، اما هنوز سطح هیجانی شدید و غیرعادی دیده نمی‌شود.";
  } else if (avgScore < -20) {
    label = "بازار سرد";
    summary = "فشار فروش بر بازار غالب است و ریسک اصلاح یا افت ادامهدار بیشتر شده است.";
  } else if (avgScore < -6) {
    label = "روند منفی";
    summary = "بازار در حالت عرضه‌محور قرار گرفته و تمایل به فروش کوتاه‌مدت بیشتر شده است.";
  }

  return {
    heatIndex,
    label,
    summary,
    topGainer,
    topLoser,
    bullish,
    bearish,
    neutral,
    alertCount,
  };
}
