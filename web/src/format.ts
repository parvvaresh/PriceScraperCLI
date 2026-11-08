import type { Unit } from "./meta";

export type Currency = "rial" | "toman";

const TZ = "Asia/Tehran";

/** Converts a value to the selected currency (only rial-priced items are affected). */
export function convert(value: number, unit: Unit, currency: Currency): number {
  return unit === "rial" && currency === "toman" ? value / 10 : value;
}

export function unitLabel(unit: Unit, currency: Currency): string {
  switch (unit) {
    case "rial":
      return currency === "toman" ? "تومان" : "ریال";
    case "usd":
      return "دلار";
    default:
      return "واحد";
  }
}

function fractionDigits(value: number, unit: Unit): number {
  if (unit === "usd") return Math.abs(value) >= 1000 ? 0 : 2;
  if (Math.abs(value) < 10) return 2;
  return 0;
}

export function formatNumber(value: number, unit: Unit, digits?: number): string {
  const d = digits ?? fractionDigits(value, unit);
  return new Intl.NumberFormat("fa-IR", { minimumFractionDigits: 0, maximumFractionDigits: d }).format(value);
}

/** Compact form for chart axes, e.g. ۲٫۶۹ میلیون */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat("fa-IR", { notation: "compact", maximumFractionDigits: 2 }).format(value);
}

/**
 * Axis tick label. `step` is the distance between ticks and `ref` the largest tick,
 * so every label on one axis shares a style (full under 10,000, compact above) and
 * just enough decimals to tell neighbouring ticks apart.
 */
export function formatTick(value: number, step: number, ref = value): string {
  const r = Math.abs(ref);
  const decimals = (unit: number) => Math.max(0, Math.min(3, Math.ceil(-Math.log10(step / unit) - 1e-9)));
  if (r < 10_000) {
    return new Intl.NumberFormat("fa-IR", { maximumFractionDigits: decimals(1) }).format(value);
  }
  const unit = 1000 ** Math.floor(Math.log10(r) / 3);
  const d = decimals(unit);
  return new Intl.NumberFormat("fa-IR", { notation: "compact", minimumFractionDigits: d, maximumFractionDigits: d }).format(value);
}

/** Human duration, e.g. ۱۵ دقیقه · ۶ ساعت · ۳ روز */
export function formatDuration(ms: number): string {
  const n = (x: number) => new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 }).format(x);
  if (ms < 3600e3) return `${n(Math.round(ms / 60e3))} دقیقه`;
  if (ms < 864e5) return `${n(Math.round((ms / 3600e3) * 10) / 10)} ساعت`;
  return `${n(Math.round((ms / 864e5) * 10) / 10)} روز`;
}

export function formatDayShort(ms: number): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { timeZone: TZ, month: "short", day: "numeric" }).format(new Date(ms));
}

export function formatClock(ms: number): string {
  return new Intl.DateTimeFormat("fa-IR", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(ms));
}

export function formatPercent(pct: number): string {
  const sign = pct > 0 ? "+" : pct < 0 ? "−" : "";
  return `${sign}${new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 2 }).format(Math.abs(pct))}٪`;
}

export function formatSigned(value: number, unit: Unit): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${formatNumber(Math.abs(value), unit)}`;
}

export function formatJalaliDate(iso: string): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat("fa-IR", { timeZone: TZ, hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

export function formatDateTimeShort(iso: string): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: TZ,
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatRelative(iso: string, now = Date.now()): string {
  const diffSec = Math.round((new Date(iso).getTime() - now) / 1000);
  const rtf = new Intl.RelativeTimeFormat("fa", { numeric: "auto" });
  const abs = Math.abs(diffSec);
  if (abs < 60) return rtf.format(diffSec, "second");
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  return rtf.format(Math.round(diffSec / 86400), "day");
}
