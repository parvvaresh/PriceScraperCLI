/** Axis helpers for the hand-rolled SVG charts. */

/** Iran has had a fixed UTC+03:30 offset (no DST) since 2022. */
export const TEHRAN_OFFSET_MS = 3.5 * 3600e3;

const MIN = 60e3;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

/** "Nice" 1-2-5 ticks covering [lo, hi], at most ~`count` of them, strictly inside the range. */
export function niceTicks(lo: number, hi: number, count = 5): { ticks: number[]; step: number } {
  if (!(hi > lo)) return { ticks: [lo], step: 1 };
  const raw = (hi - lo) / Math.max(1, count);
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const ticks: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + step * 1e-9; v += step) {
    ticks.push(Number(v.toPrecision(12)));
  }
  return { ticks, step };
}

const TIME_STEPS = [
  15 * MIN,
  30 * MIN,
  HOUR,
  2 * HOUR,
  3 * HOUR,
  6 * HOUR,
  12 * HOUR,
  DAY,
  2 * DAY,
  3 * DAY,
  7 * DAY,
  14 * DAY,
  30 * DAY,
];

/**
 * Time ticks on round local (Tehran) boundaries — whole hours, midnights, … —
 * choosing the smallest interval that yields at most `maxTicks` ticks.
 */
export function timeTicks(t0: number, t1: number, maxTicks: number): { ticks: number[]; interval: number } {
  const span = Math.max(1, t1 - t0);
  const interval = TIME_STEPS.find((s) => span / s <= Math.max(1, maxTicks)) ?? TIME_STEPS[TIME_STEPS.length - 1];
  const ticks: number[] = [];
  const first = Math.ceil((t0 + TEHRAN_OFFSET_MS) / interval) * interval - TEHRAN_OFFSET_MS;
  for (let t = first; t <= t1; t += interval) ticks.push(t);
  return { ticks, interval };
}

/** True when `t` is local (Tehran) midnight. */
export function isLocalMidnight(t: number): boolean {
  return (((t + TEHRAN_OFFSET_MS) % DAY) + DAY) % DAY === 0;
}
