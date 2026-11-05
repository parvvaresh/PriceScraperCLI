export type Direction = "up" | "down" | "flat";

export interface PriceItem {
  key: string;
  title: string;
  price: string;
  value: number;
  changePercent: number;
  changeAmount: number;
  direction: Direction;
}

export interface Snapshot {
  source: string;
  fetchedAt: string;
  jalaliDate: string;
  time: string;
  items: PriceItem[];
}

export interface HistoryPoint {
  t: string;
  v: Record<string, number>;
}
