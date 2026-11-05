import { useEffect, useMemo, useRef, useState } from "react";
import type { HistoryPoint } from "../types";
import type { ItemMeta } from "../meta";
import { convert, formatCompact, formatDateTimeShort, formatNumber, formatPercent, unitLabel, type Currency } from "../format";

type Range = "24h" | "7d" | "30d" | "all";
const RANGES: { id: Range; label: string; ms: number }[] = [
  { id: "24h", label: "۲۴ ساعت", ms: 864e5 },
  { id: "7d", label: "۷ روز", ms: 7 * 864e5 },
  { id: "30d", label: "۳۰ روز", ms: 30 * 864e5 },
  { id: "all", label: "همه", ms: Infinity },
];

interface Props {
  itemKey: string;
  meta: ItemMeta;
  history: HistoryPoint[];
  currency: Currency;
}

const H = 280;
const PAD = { top: 16, right: 16, bottom: 28, left: 92 };

export function HistoryChart({ itemKey, meta, history, currency }: Props) {
  const [range, setRange] = useState<Range>("7d");
  const [hover, setHover] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(280, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const points = useMemo(() => {
    const all = history
      .filter((p) => typeof p.v[itemKey] === "number" && p.v[itemKey] > 0)
      .map((p) => ({ t: new Date(p.t).getTime(), iso: p.t, v: convert(p.v[itemKey], meta.unit, currency) }));
    const r = RANGES.find((x) => x.id === range)!;
    if (!all.length || r.ms === Infinity) return all;
    const cutoff = all[all.length - 1].t - r.ms;
    return all.filter((p) => p.t >= cutoff);
  }, [history, itemKey, meta.unit, currency, range]);

  useEffect(() => setHover(null), [itemKey, range]);

  const innerW = width - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const geo = useMemo(() => {
    if (points.length < 2) return null;
    const t0 = points[0].t;
    const t1 = points[points.length - 1].t;
    let lo = Math.min(...points.map((p) => p.v));
    let hi = Math.max(...points.map((p) => p.v));
    if (lo === hi) {
      lo -= Math.abs(lo) * 0.01 || 1;
      hi += Math.abs(hi) * 0.01 || 1;
    }
    const pad = (hi - lo) * 0.08;
    lo -= pad;
    hi += pad;
    const x = (t: number) => PAD.left + ((t - t0) / (t1 - t0 || 1)) * innerW;
    const y = (v: number) => PAD.top + (1 - (v - lo) / (hi - lo)) * innerH;
    const xy = points.map((p) => [x(p.t), y(p.v)] as const);
    const line = xy.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join("");
    const area = `${line}L${xy[xy.length - 1][0].toFixed(1)},${PAD.top + innerH}L${xy[0][0].toFixed(1)},${PAD.top + innerH}Z`;
    const yTicks = Array.from({ length: 4 }, (_, i) => lo + ((hi - lo) * (i + 0.5)) / 4);
    const n = points.length - 1;
    const xTicks = innerW < 480 ? [0, n] : [...new Set([0, Math.floor(n / 2), n])];
    return { xy, line, area, y, yTicks, xTicks };
  }, [points, innerW, innerH]);

  const onPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!geo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width;
    let best = 0;
    for (let i = 1; i < geo.xy.length; i++) {
      if (Math.abs(geo.xy[i][0] - px) < Math.abs(geo.xy[best][0] - px)) best = i;
    }
    setHover(best);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!points.length) return;
    // The chart axis runs left→right (old→new) even in RTL.
    if (e.key === "ArrowRight") setHover((h) => Math.min(points.length - 1, (h ?? points.length - 1) + 1));
    else if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? points.length - 1) - 1));
    else if (e.key === "Escape") setHover(null);
    else return;
    e.preventDefault();
  };

  const first = points[0];
  const last = points[points.length - 1];
  const rangeChange = first && last && first.v ? ((last.v - first.v) / first.v) * 100 : 0;
  const unit = unitLabel(meta.unit, currency);
  const hp = hover != null ? points[hover] : null;
  const hxy = hover != null && geo ? geo.xy[hover] : null;

  return (
    <section className="panel" aria-labelledby="chart-title">
      <header className="panel__head">
        <div>
          <h2 id="chart-title" className="panel__title">
            روند {meta.name}
          </h2>
          {points.length >= 2 && (
            <p className="panel__sub">
              تغییر در این بازه:{" "}
              <bdi className={rangeChange > 0 ? "pos" : rangeChange < 0 ? "neg" : ""}>
                {rangeChange > 0 ? "▲" : rangeChange < 0 ? "▼" : "●"} {formatPercent(rangeChange)}
              </bdi>
              <span className="muted"> · {points.length.toLocaleString("fa-IR")} نقطه</span>
            </p>
          )}
        </div>
        <div className="segmented" role="group" aria-label="بازه زمانی">
          {RANGES.map((r) => (
            <button key={r.id} type="button" aria-pressed={range === r.id} onClick={() => setRange(r.id)}>
              {r.label}
            </button>
          ))}
        </div>
      </header>

      <div className="chart" ref={wrapRef}>
        {!geo ? (
          <div className="chart__empty">
            هنوز داده‌ی تاریخی کافی برای این بازه نیست. هر بار که اسکرپر در GitHub Actions اجرا شود، یک نقطه اضافه می‌شود.
          </div>
        ) : (
          <>
            <svg
              width={width}
              height={H}
              viewBox={`0 0 ${width} ${H}`}
              role="img"
              aria-label={`نمودار قیمت ${meta.name}`}
              tabIndex={0}
              onPointerMove={onPointer}
              onPointerLeave={() => setHover(null)}
              onKeyDown={onKey}
            >
              <defs>
                <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--series-1)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--series-1)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {geo.yTicks.map((v) => (
                <g key={v}>
                  <line className="gridline" x1={PAD.left} x2={width - PAD.right} y1={geo.y(v)} y2={geo.y(v)} />
                  <text className="axis" x={PAD.left - 10} y={geo.y(v)} textAnchor="end" dominantBaseline="middle">
                    {formatCompact(v)}
                  </text>
                </g>
              ))}
              {geo.xTicks.map((i, k) => (
                <text
                  key={k}
                  className="axis"
                  x={geo.xy[i][0]}
                  y={H - 8}
                  textAnchor={k === 0 ? "start" : k === geo.xTicks.length - 1 ? "end" : "middle"}
                >
                  {formatDateTimeShort(points[i].iso)}
                </text>
              ))}
              <path d={geo.area} fill="url(#area-grad)" />
              <path className="series-line" d={geo.line} />
              {hxy && (
                <g>
                  <line className="crosshair" x1={hxy[0]} x2={hxy[0]} y1={PAD.top} y2={PAD.top + innerH} />
                  <circle className="marker" cx={hxy[0]} cy={hxy[1]} r={5} />
                </g>
              )}
            </svg>
            {hp && hxy && (
              <div
                className="tooltip"
                style={{
                  left: Math.min(Math.max(hxy[0], 90), width - 90),
                  top: Math.max(hxy[1] - 12, 8),
                }}
                role="status"
              >
                <div className="tooltip__value">
                  <span className="tooltip__key" aria-hidden="true" />
                  {formatNumber(hp.v, meta.unit)} <span className="muted">{unit}</span>
                </div>
                <div className="tooltip__time">{formatDateTimeShort(hp.iso)}</div>
              </div>
            )}
          </>
        )}
      </div>

      {points.length > 0 && (
        <details className="table-view">
          <summary>نمایش جدول آخرین مقادیر</summary>
          <table>
            <thead>
              <tr>
                <th scope="col">زمان</th>
                <th scope="col">قیمت ({unit})</th>
              </tr>
            </thead>
            <tbody>
              {points
                .slice(-12)
                .reverse()
                .map((p) => (
                  <tr key={p.iso}>
                    <td>{formatDateTimeShort(p.iso)}</td>
                    <td>{formatNumber(p.v, meta.unit)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </details>
      )}
    </section>
  );
}
