import { describe, expect, it } from "vitest";
import { buildWatchlistRows } from "./watchlist";

describe("buildWatchlistRows", () => {
  it("keeps chosen keys and ranks them by market signal strength", () => {
    const snapshot = {
      items: [
        { key: "Dollar", title: "دلار", value: 165000, changePercent: 1.2, direction: "up" },
        { key: "Bitcoin", title: "بیت‌کوین", value: 74000, changePercent: -0.8, direction: "down" },
      ],
    };

    const history = [
      { t: "2025-01-01T00:00:00Z", v: { Dollar: 100000, Bitcoin: 65000 } },
      { t: "2025-01-01T01:00:00Z", v: { Dollar: 110000, Bitcoin: 70000 } },
      { t: "2025-01-01T02:00:00Z", v: { Dollar: 120000, Bitcoin: 68000 } },
      { t: "2025-01-01T03:00:00Z", v: { Dollar: 135000, Bitcoin: 70000 } },
      { t: "2025-01-01T04:00:00Z", v: { Dollar: 152000, Bitcoin: 76000 } },
      { t: "2025-01-01T05:00:00Z", v: { Dollar: 165000, Bitcoin: 74000 } },
    ];

    const rows = buildWatchlistRows(snapshot as any, history as any, ["Dollar", "Bitcoin"]);

    expect(rows.map((row) => row.key)).toEqual(["Dollar", "Bitcoin"]);
    expect(rows[0].signal.label).toMatch(/بالا|قوی|عادی/);
    expect(rows[1].signal.direction).toBe("down");
  });
});
