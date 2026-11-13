import { describe, expect, it } from "vitest";
import { computeMarketPulse } from "./marketPulse";

describe("computeMarketPulse", () => {
  it("returns a bullish market summary when most watched assets are rising", () => {
    const rows = [
      { key: "Dollar", changePercent: 2.1, signal: { score: 20, direction: "up", zScore24h: 2.5, vs7d: 2.0, volatility: 0.8, forecastGap: 5, label: "سطح غیرعادی بالا", summary: "good" } },
      { key: "GoldOunce", changePercent: 1.6, signal: { score: 18, direction: "up", zScore24h: 2.2, vs7d: 1.7, volatility: 0.7, forecastGap: 4, label: "روند کوتاه‌مدت قوی", summary: "good" } },
      { key: "Bitcoin", changePercent: -0.3, signal: { score: -6, direction: "down", zScore24h: -1, vs7d: -0.5, volatility: 1.1, forecastGap: -2, label: "عادی", summary: "flat" } },
    ];

    const pulse = computeMarketPulse(rows as any);
    expect(pulse.heatIndex).toBeGreaterThan(0);
    expect(pulse.label).toMatch(/گرم|خنثی|قوی/);
    expect(pulse.topGainer?.key).toBe("Dollar");
    expect(pulse.topLoser?.key).toBe("Bitcoin");
  });
});
