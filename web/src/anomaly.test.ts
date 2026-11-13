import { describe, expect, it } from "vitest";
import { computeMarketAnomaly } from "./anomaly";

describe("computeMarketAnomaly", () => {
  it("detects a strongly elevated price relative to recent history", () => {
    const series = Array.from({ length: 60 }, (_, i) => 100 + i * 0.9);
    series[series.length - 1] = 170;

    const signal = computeMarketAnomaly(series, 160);

    expect(signal).not.toBeNull();
    expect(signal!.zScore24h).toBeGreaterThan(2);
    expect(signal!.vs7d).toBeGreaterThan(0);
    expect(signal!.label).toMatch(/بالا|عادی|قوی/);
  });

  it("signals a bearish reversal when price is below forecast and below recent mean", () => {
    const series = Array.from({ length: 60 }, (_, i) => 100 + i * 0.8);
    series[series.length - 1] = 70;

    const signal = computeMarketAnomaly(series, 120);

    expect(signal).not.toBeNull();
    expect(signal!.direction).toBe("down");
    expect(signal!.score).toBeLessThan(0);
  });
});
