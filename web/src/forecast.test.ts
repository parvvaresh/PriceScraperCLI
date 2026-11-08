import { describe, expect, it } from "vitest";
import { buildForecast, movingBands, normCdf, resample, type ObservedPoint } from "./forecast";

const HOUR = 3600e3;
const T0 = Date.UTC(2026, 10, 1);

/** Deterministic PRNG (mulberry32) + Box–Muller, so tests never flake. */
function rng(seed: number) {
  let a = seed >>> 0;
  const uni = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return () => Math.sqrt(-2 * Math.log(uni() || 1e-12)) * Math.cos(2 * Math.PI * uni());
}

function series(n: number, f: (i: number) => number): ObservedPoint[] {
  return Array.from({ length: n }, (_, i) => ({ t: T0 + i * HOUR, v: f(i) }));
}

describe("resample", () => {
  it("builds a regular grid ending at the last observation, carrying values forward", () => {
    const pts: ObservedPoint[] = [
      { t: T0, v: 10 },
      { t: T0 + HOUR, v: 11 },
      { t: T0 + 2 * HOUR, v: 12 },
      { t: T0 + 5 * HOUR, v: 15 }, // gap: 3h and 4h should repeat 12
    ];
    const g = resample(pts)!;
    expect(g.step).toBe(HOUR);
    expect(g.t[g.t.length - 1]).toBe(T0 + 5 * HOUR);
    expect(g.y).toEqual([10, 11, 12, 12, 12, 15]);
  });

  it("drops invalid points and needs two observations", () => {
    expect(
      resample([
        { t: T0, v: 5 },
        { t: T0 + HOUR, v: 0 },
      ]),
    ).toBeNull();
  });

  it("caps the grid size", () => {
    const g = resample(
      series(2000, (i) => 100 + i),
      300,
    )!;
    expect(g.y.length).toBeLessThanOrEqual(300);
  });
});

describe("buildForecast", () => {
  it("returns null with too little history", () => {
    expect(
      buildForecast(
        series(4, () => 100),
        24 * HOUR,
      ),
    ).toBeNull();
  });

  it("keeps a flat series flat with zero-width intervals", () => {
    const r = buildForecast(
      series(40, () => 2_689_000),
      6 * HOUR,
    )!;
    expect(r.best).toBe("naive");
    const best = r.models.find((m) => m.id === r.best)!;
    for (const p of best.path) {
      expect(p.mean).toBeCloseTo(2_689_000, 3);
      expect(p.hi95 - p.lo95).toBeLessThan(1e-3);
    }
    expect(best.probUp).toBe(0.5);
  });

  it("picks up a steady trend and beats the random walk", () => {
    const noise = rng(7);
    const pts = series(120, (i) => 1000 * Math.exp(0.002 * i + 0.0005 * noise()));
    const r = buildForecast(pts, 12 * HOUR)!;
    expect(r.horizonSteps).toBe(12);
    const best = r.models.find((m) => m.id === r.best)!;
    expect(r.best).not.toBe("naive");
    expect(best.skill).toBeGreaterThan(0.5);
    const end = best.path[best.path.length - 1];
    const truth = 1000 * Math.exp(0.002 * (119 + 12));
    expect(Math.abs(end.mean / truth - 1)).toBeLessThan(0.01);
    expect(best.probUp).toBeGreaterThan(0.9);
  });

  it("produces ordered, widening intervals for every available model", () => {
    const noise = rng(42);
    let v = 80_000;
    const pts = series(200, () => (v *= Math.exp(0.01 * noise())));
    const r = buildForecast(pts, 24 * HOUR)!;
    for (const m of r.models.filter((x) => x.available)) {
      expect(m.path[0].k).toBe(0);
      for (const p of m.path) {
        expect(p.lo95).toBeLessThanOrEqual(p.lo80 + 1e-9);
        expect(p.lo80).toBeLessThanOrEqual(p.mean + 1e-9);
        expect(p.mean).toBeLessThanOrEqual(p.hi80 + 1e-9);
        expect(p.hi80).toBeLessThanOrEqual(p.hi95 + 1e-9);
      }
      const w1 = m.path[1].hi80 / m.path[1].lo80;
      const wH = m.path[m.path.length - 1].hi80 / m.path[m.path.length - 1].lo80;
      expect(wH).toBeGreaterThanOrEqual(w1 - 1e-9);
      expect(m.coverage80).toBeGreaterThanOrEqual(0);
      expect(m.coverage80).toBeLessThanOrEqual(1);
    }
  });

  it("is honest on a pure random walk: no model is much better than naive", () => {
    const noise = rng(3);
    let v = 100;
    const pts = series(300, () => (v *= Math.exp(0.01 * noise())));
    const r = buildForecast(pts, 6 * HOUR)!;
    const best = r.models.find((m) => m.id === r.best)!;
    expect(best.skill).toBeLessThan(0.3);
  });
});

describe("helpers", () => {
  it("normCdf matches known values", () => {
    expect(normCdf(0)).toBeCloseTo(0.5, 6);
    expect(normCdf(1.959964)).toBeCloseTo(0.975, 4);
    expect(normCdf(-1.281552)).toBeCloseTo(0.1, 4);
  });

  it("movingBands computes SMA and ±2σ", () => {
    const b = movingBands([1, 2, 3, 4, 5], 3);
    expect(b[0]).toBeNull();
    expect(b[1]).toBeNull();
    expect(b[2]!.ma).toBeCloseTo(2);
    const sd = Math.sqrt(2 / 3);
    expect(b[4]!.upper).toBeCloseTo(4 + 2 * sd);
    expect(b[4]!.lower).toBeCloseTo(4 - 2 * sd);
  });
});
