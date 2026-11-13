import type { HistoryPoint, Snapshot } from "./types";
import { computeMarketAnomaly, type MarketAnomalySignal } from "./anomaly";
import { metaFor } from "./meta";

export interface WatchlistRow {
  key: string;
  title: string;
  value: number;
  changePercent: number;
  direction: "up" | "down" | "flat";
  signal: MarketAnomalySignal;
}

function emptySignal(direction: WatchlistRow["direction"]): MarketAnomalySignal {
  return {
    score: 0,
    direction: direction === "up" ? "up" : direction === "down" ? "down" : "flat",
    zScore24h: 0,
    vs7d: 0,
    volatility: 0,
    forecastGap: 0,
    label: "داده ناکافی",
    summary: "برای این دارایی داده‌ی تاریخی کافی وجود ندارد؛ بعد از جمع‌آوری بیشتر، سنجش بازار فعال می‌شود.",
  };
}

export function buildWatchlistRows(
  snapshot: Pick<Snapshot, "items"> | null | undefined,
  history: HistoryPoint[] | undefined,
  keys: string[] = [],
): WatchlistRow[] {
  const selected = [...new Set(keys.filter(Boolean))];
  if (!snapshot || !snapshot.items.length) return [];

  const map = new Map(snapshot.items.map((item) => [item.key, item]));
  const rows = selected
    .map((key) => {
      const item = map.get(key);
      if (!item) return null;

      const series = (history ?? [])
        .filter((point) => typeof point.v[key] === "number" && point.v[key] > 0)
        .map((point) => point.v[key]);

      const signal = computeMarketAnomaly(series) ?? emptySignal(item.direction);
      if (signal.direction === "flat" && item.direction !== "flat") {
        signal.direction = item.direction;
      }

      return {
        key,
        title: metaFor(key, item.title).name,
        value: item.value,
        changePercent: item.changePercent,
        direction: item.direction,
        signal,
      } satisfies WatchlistRow;
    })
    .filter((row): row is WatchlistRow => Boolean(row));

  return rows.sort((a, b) => b.signal.score - a.signal.score || Math.abs(b.changePercent) - Math.abs(a.changePercent));
}
