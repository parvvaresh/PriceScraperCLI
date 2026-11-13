import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { HistoryPoint } from "../types";
import type { ItemMeta } from "../meta";
import {
  convert,
  formatClock,
  formatDateTimeShort,
  formatDayShort,
  formatNumber,
  formatPercent,
  formatTick,
  unitLabel,
  type Currency,
} from "../format";
import { buildForecast, movingBands, type BandPoint, type ModelId } from "../forecast";
import { computeMarketAnomaly } from "../anomaly";
import { isLocalMidnight, niceTicks, timeTicks } from "../chartScale";
import { ForecastPanel } from "./ForecastPanel";

const HOUR = 3600e3;
const DAY = 24 * HOUR;

type Range = "24h" | "7d" | "30d" | "all";
const RANGES: { id: Range; label: string; ms: number }[] = [
  { id: "24h", label: "۲۴ ساعت", ms: DAY },
  { id: "7d", label: "۷ روز", ms: 7 * DAY },
  { id: "30d", label: "۳۰ روز", ms: 30 * DAY },
  { id: "all", label: "همه", ms: Infinity },
];

type Horizon = "6h" | "1d" | "3d" | "7d";
const HORIZONS: { id: Horizon; label: string; ms: number }[] = [
  { id: "6h", label: "۶ ساعت", ms: 6 * HOUR },
  { id: "1d", label: "۱ روز", ms: DAY },
  { id: "3d", label: "۳ روز", ms: 3 * DAY },
  { id: "7d", label: "۱ هفته", ms: 7 * DAY },
];

interface Props {
  itemKey: string;
  meta: ItemMeta;
  history: HistoryPoint[];
  currency: Currency;
}

interface Obs {
  t: number;
  iso: string;
  v: number;
  band: BandPoint | null;
}

interface Target {
  kind: "obs" | "fc";
  i: number;
  x: number;
}

const H = 340;

type XY = readonly [number, number];
const toPath = (pts: XY[]) => pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join("");

export function HistoryChart({ itemKey, meta, history, currency }: Props) {
  const [range, setRange] = useState<Range>("7d");
  const [horizon, setHorizon] = useState<Horizon>("1d");
  const [showForecast, setShowForecast] = useState(true);
  const [showMA, setShowMA] = useState(false);
  const [showBands, setShowBands] = useState(false);
  const [modelChoice, setModelChoice] = useState<ModelId | "auto">("auto");
  const [hover, setHover] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(280, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---------- data ---------- */

  const all = useMemo(
    () =>
      history
        .filter((p) => typeof p.v[itemKey] === "number" && p.v[itemKey] > 0)
        .map((p) => ({ t: new Date(p.t).getTime(), iso: p.t, v: convert(p.v[itemKey], meta.unit, currency) }))
        .sort((a, b) => a.t - b.t),
    [history, itemKey, meta.unit, currency],
  );

  const maWindow = Math.min(20, Math.max(3, Math.floor(all.length / 4)));
  const bands = useMemo(
    () =>
      movingBands(
        all.map((p) => p.v),
        maWindow,
      ),
    [all, maWindow],
  );

  const visible: Obs[] = useMemo(() => {
    const r = RANGES.find((x) => x.id === range)!;
    const withBands = all.map((p, i) => ({ ...p, band: bands[i] }));
    if (!withBands.length || r.ms === Infinity) return withBands;
    const cutoff = withBands[withBands.length - 1].t - r.ms;
    return withBands.filter((p) => p.t >= cutoff);
  }, [all, bands, range]);

  const horizonMs = HORIZONS.find((h) => h.id === horizon)!.ms;
  const forecast = useMemo(() => (showForecast ? buildForecast(all, horizonMs) : null), [showForecast, all, horizonMs]);
  const chosen = forecast
    ? (forecast.models.find((m) => m.id === modelChoice && m.available) ??
      forecast.models.find((m) => m.id === forecast.best)!)
    : null;
  const fcPath = chosen?.path ?? [];

  useEffect(() => setHover(null), [itemKey, range, horizon, showForecast, modelChoice]);

  /* ---------- geometry ---------- */

  const narrow = width < 560;
  const PAD = { top: 28, right: narrow ? 14 : 96, bottom: 30, left: narrow ? 64 : 78 };
  const innerW = width - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const plotRight = PAD.left + innerW;
  const plotBottom = PAD.top + innerH;

  const geo = useMemo(() => {
    if (visible.length < 2) return null;
    const t0 = visible[0].t;
    const tNow = visible[visible.length - 1].t;
    const hasFc = fcPath.length > 1;
    const t1 = hasFc ? fcPath[fcPath.length - 1].t : tNow;

    const vals: number[] = visible.map((p) => p.v);
    for (const p of visible) {
      if (!p.band) continue;
      if (showMA) vals.push(p.band.ma);
      if (showBands) vals.push(p.band.upper, p.band.lower);
    }
    for (const f of fcPath) vals.push(f.lo80, f.hi80);
    let lo = Math.min(...vals);
    let hi = Math.max(...vals);
    if (lo === hi) {
      lo -= Math.abs(lo) * 0.01 || 1;
      hi += Math.abs(hi) * 0.01 || 1;
    }
    const pad = (hi - lo) * 0.1;
    lo -= pad;
    hi += pad;

    const x = (t: number) => PAD.left + ((t - t0) / (t1 - t0 || 1)) * innerW;
    const y = (v: number) => PAD.top + (1 - (v - lo) / (hi - lo)) * innerH;

    const priceXY: XY[] = visible.map((p) => [x(p.t), y(p.v)]);
    const line = toPath(priceXY);
    const area = `${line}L${priceXY[priceXY.length - 1][0].toFixed(1)},${plotBottom}L${priceXY[0][0].toFixed(1)},${plotBottom}Z`;

    const withBand = visible.filter((p) => p.band);
    const maLine = withBand.length > 1 ? toPath(withBand.map((p) => [x(p.t), y(p.band!.ma)])) : "";
    const bandArea =
      withBand.length > 1
        ? `${toPath(withBand.map((p) => [x(p.t), y(p.band!.upper)]))}${toPath(
            [...withBand].reverse().map((p) => [x(p.t), y(p.band!.lower)]),
          ).replace(/^M/, "L")}Z`
        : "";

    const fan = (loKey: "lo80" | "lo95", hiKey: "hi80" | "hi95") =>
      hasFc
        ? `${toPath(fcPath.map((f) => [x(f.t), y(f[hiKey])]))}${toPath(
            [...fcPath].reverse().map((f) => [x(f.t), y(f[loKey])]),
          ).replace(/^M/, "L")}Z`
        : "";

    const fcLine = hasFc ? toPath(fcPath.map((f) => [x(f.t), y(f.mean)])) : "";

    const yT = niceTicks(lo, hi, innerH < 220 ? 3 : 5);
    const xT = timeTicks(t0, t1, Math.max(2, Math.floor(innerW / 92)));

    let iMax = 0;
    let iMin = 0;
    visible.forEach((p, i) => {
      if (p.v > visible[iMax].v) iMax = i;
      if (p.v < visible[iMin].v) iMin = i;
    });

    const targets: Target[] = [
      ...visible.map((p, i) => ({ kind: "obs" as const, i, x: x(p.t) })),
      ...fcPath.slice(1).map((f, i) => ({ kind: "fc" as const, i: i + 1, x: x(f.t) })),
    ];

    return {
      x,
      y,
      priceXY,
      line,
      area,
      maLine,
      bandArea,
      fan80: fan("lo80", "hi80"),
      fan95: fan("lo95", "hi95"),
      fcLine,
      hasFc,
      nowX: x(tNow),
      yT,
      xT,
      iMax,
      iMin,
      targets,
    };
  }, [visible, fcPath, showMA, showBands, PAD.left, innerW, innerH, PAD.top, plotBottom]);

  /* ---------- interaction ---------- */

  const onPointer = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!geo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width;
    let best = 0;
    for (let i = 1; i < geo.targets.length; i++) {
      if (Math.abs(geo.targets[i].x - px) < Math.abs(geo.targets[best].x - px)) best = i;
    }
    setHover(best);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!geo) return;
    const last = visible.length - 1; // start keyboard navigation at "now"
    // The chart axis runs left→right (old→new) even in RTL.
    if (e.key === "ArrowRight") setHover((h) => Math.min(geo.targets.length - 1, (h ?? last - 1) + 1));
    else if (e.key === "ArrowLeft") setHover((h) => Math.max(0, (h ?? last + 1) - 1));
    else if (e.key === "Home") setHover(0);
    else if (e.key === "End") setHover(geo.targets.length - 1);
    else if (e.key === "Escape") setHover(null);
    else return;
    e.preventDefault();
  };

  /* ---------- derived labels ---------- */

  const first = visible[0];
  const lastObs = visible[visible.length - 1];
  const rangeChange = first && lastObs && first.v ? ((lastObs.v - first.v) / first.v) * 100 : 0;
  const unit = unitLabel(meta.unit, currency);

  const stats = useMemo(() => {
    if (visible.length < 2) return null;
    const vs = visible.map((p) => p.v);
    const hi = Math.max(...vs);
    const lo = Math.min(...vs);
    const avg = vs.reduce((s, v) => s + v, 0) / vs.length;
    return { hi, lo, avg, spread: lo ? ((hi - lo) / lo) * 100 : 0 };
  }, [visible]);

  const signal = useMemo(() => {
    if (!visible.length) return null;
    const values = visible.map((p) => p.v);
    const forecastMean = chosen?.path.at(-1)?.mean;
    return computeMarketAnomaly(values, forecastMean);
  }, [visible, chosen]);

  const target = hover != null && geo ? geo.targets[hover] : null;
  const hoverObs = target?.kind === "obs" ? visible[target.i] : null;
  const hoverFc = target?.kind === "fc" ? fcPath[target.i] : null;
  const hoverY = geo && target ? geo.y(hoverObs ? hoverObs.v : hoverFc!.mean) : 0;

  const tickLabel = (t: number, interval: number) =>
    interval >= DAY || isLocalMidnight(t) ? formatDayShort(t) : formatClock(t);

  const endLabel =
    geo && !narrow
      ? geo.hasFc
        ? { v: fcPath[fcPath.length - 1].mean, kind: "fc" as const }
        : { v: lastObs.v, kind: "obs" as const }
      : null;

  const legend: { key: string; label: string; swatch: "line" | "dash" | "wash" | "wash-strong"; color: string }[] = [
    { key: "price", label: "قیمت", swatch: "line", color: "var(--series-1)" },
  ];
  if (showMA)
    legend.push({
      key: "ma",
      label: `میانگین متحرک ${maWindow.toLocaleString("fa-IR")} نقطه‌ای`,
      swatch: "line",
      color: "var(--series-3)",
    });
  if (showBands) legend.push({ key: "bb", label: "باند بولینگر (±۲σ)", swatch: "wash", color: "var(--series-3)" });
  if (geo?.hasFc) {
    legend.push({ key: "fc", label: "پیش‌بینی", swatch: "dash", color: "var(--series-2)" });
    legend.push({ key: "f80", label: "بازه‌ی ۸۰٪", swatch: "wash-strong", color: "var(--series-2)" });
    legend.push({ key: "f95", label: "بازه‌ی ۹۵٪", swatch: "wash", color: "var(--series-2)" });
  }

  const tooltipBelow = hoverY < PAD.top + 96;

  return (
    <section className="panel" aria-labelledby="chart-title">
      <header className="panel__head">
        <div>
          <h2 id="chart-title" className="panel__title">
            روند {meta.name}
          </h2>
          {visible.length >= 2 && (
            <p className="panel__sub">
              تغییر در این بازه:{" "}
              <bdi className={rangeChange > 0 ? "pos" : rangeChange < 0 ? "neg" : ""}>
                {rangeChange > 0 ? "▲" : rangeChange < 0 ? "▼" : "●"} {formatPercent(rangeChange)}
              </bdi>
              <span className="muted"> · {visible.length.toLocaleString("fa-IR")} نقطه</span>
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

      <div className="chart-toolbar">
        <div className="chips" role="group" aria-label="لایه‌های نمودار">
          <button type="button" className="chip" aria-pressed={showForecast} onClick={() => setShowForecast((v) => !v)}>
            <span
              className="chip__key chip__key--dash"
              style={{ "--key": "var(--series-2)" } as React.CSSProperties}
              aria-hidden="true"
            />
            پیش‌بینی آماری
          </button>
          <button type="button" className="chip" aria-pressed={showMA} onClick={() => setShowMA((v) => !v)}>
            <span
              className="chip__key"
              style={{ "--key": "var(--series-3)" } as React.CSSProperties}
              aria-hidden="true"
            />
            میانگین متحرک
          </button>
          <button type="button" className="chip" aria-pressed={showBands} onClick={() => setShowBands((v) => !v)}>
            <span
              className="chip__key chip__key--wash"
              style={{ "--key": "var(--series-3)" } as React.CSSProperties}
              aria-hidden="true"
            />
            باند بولینگر
          </button>
        </div>
        {showForecast && (
          <div className="horizon">
            <span className="muted">افق:</span>
            <div className="segmented segmented--sm" role="group" aria-label="افق پیش‌بینی">
              {HORIZONS.map((h) => (
                <button key={h.id} type="button" aria-pressed={horizon === h.id} onClick={() => setHorizon(h.id)}>
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {geo && legend.length > 1 && (
        <ul className="legend" aria-label="راهنمای نمودار">
          {legend.map((l) => (
            <li key={l.key}>
              <span
                className={`legend__key legend__key--${l.swatch}`}
                style={{ "--key": l.color } as React.CSSProperties}
                aria-hidden="true"
              />
              {l.label}
            </li>
          ))}
        </ul>
      )}

      <div className="chart" ref={wrapRef}>
        {!geo ? (
          <div className="chart__empty">
            هنوز داده‌ی تاریخی کافی برای این بازه نیست. بازه‌ی بزرگ‌تری را انتخاب کنید؛ هر بار که اسکرپر در GitHub
            Actions اجرا شود، یک نقطه اضافه می‌شود.
          </div>
        ) : (
          <>
            <svg
              width={width}
              height={H}
              viewBox={`0 0 ${width} ${H}`}
              role="img"
              aria-label={`نمودار قیمت ${meta.name}${geo.hasFc ? " همراه با پیش‌بینی" : ""}`}
              tabIndex={0}
              onPointerMove={onPointer}
              onPointerLeave={() => setHover(null)}
              onKeyDown={onKey}
            >
              <defs>
                <linearGradient id={`area-${uid}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--series-1)" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="var(--series-1)" stopOpacity="0" />
                </linearGradient>
                <clipPath id={`plot-${uid}`}>
                  <rect x={PAD.left} y={PAD.top} width={innerW} height={innerH} />
                </clipPath>
              </defs>

              {geo.hasFc && (
                <rect className="future-zone" x={geo.nowX} y={PAD.top} width={plotRight - geo.nowX} height={innerH} />
              )}

              {geo.yT.ticks.map((v) => (
                <g key={v}>
                  <line className="gridline" x1={PAD.left} x2={plotRight} y1={geo.y(v)} y2={geo.y(v)} />
                  <text className="axis" x={PAD.left - 10} y={geo.y(v)} textAnchor="end" dominantBaseline="middle">
                    {formatTick(v, geo.yT.step, geo.yT.ticks[geo.yT.ticks.length - 1])}
                  </text>
                </g>
              ))}
              <line className="baseline" x1={PAD.left} x2={plotRight} y1={plotBottom} y2={plotBottom} />
              {geo.xT.ticks.map((t) => {
                const tx = geo.x(t);
                const anchor = tx - PAD.left < 28 ? "start" : plotRight - tx < 28 ? "end" : "middle";
                return (
                  <g key={t}>
                    <line className="tick" x1={tx} x2={tx} y1={plotBottom} y2={plotBottom + 4} />
                    <text className="axis" x={tx} y={H - 8} textAnchor={anchor}>
                      {tickLabel(t, geo.xT.interval)}
                    </text>
                  </g>
                );
              })}

              <g clipPath={`url(#plot-${uid})`}>
                {showBands && geo.bandArea && <path className="band-area" d={geo.bandArea} />}
                <path d={geo.area} fill={`url(#area-${uid})`} />
                {geo.hasFc && (
                  <>
                    <path className="fan fan--95" d={geo.fan95} />
                    <path className="fan fan--80" d={geo.fan80} />
                  </>
                )}
                {showMA && geo.maLine && <path className="ma-line" d={geo.maLine} />}
                <path className="series-line" d={geo.line} />
                {geo.hasFc && <path className="forecast-line" d={geo.fcLine} />}
              </g>

              {geo.hasFc && (
                <g>
                  <line className="now-line" x1={geo.nowX} x2={geo.nowX} y1={PAD.top - 4} y2={plotBottom} />
                  <text className="axis axis--strong" x={geo.nowX} y={PAD.top - 10} textAnchor="middle">
                    اکنون
                  </text>
                </g>
              )}

              {visible.length >= 3 && geo.iMax !== geo.iMin && (
                <g className="extreme">
                  {(
                    [
                      [geo.iMax, -10],
                      [geo.iMin, 18],
                    ] as const
                  )
                    // the latest point already carries the end dot (and forecast start)
                    .filter(([i]) => i !== visible.length - 1)
                    .map(([i, dy]) => {
                      const [px, py] = geo.priceXY[i];
                      const lx = Math.min(Math.max(px, PAD.left + 44), plotRight - 44);
                      return (
                        <g key={i}>
                          <circle className="marker marker--small" cx={px} cy={py} r={4} />
                          <text className="axis axis--strong" x={lx} y={py + dy} textAnchor="middle">
                            {formatNumber(visible[i].v, meta.unit)}
                          </text>
                        </g>
                      );
                    })}
                </g>
              )}

              <circle
                className="marker"
                cx={geo.priceXY[geo.priceXY.length - 1][0]}
                cy={geo.priceXY[geo.priceXY.length - 1][1]}
                r={4.5}
              />

              {endLabel && (
                <g
                  transform={`translate(${plotRight + 8},${Math.min(Math.max(geo.y(endLabel.v), PAD.top + 8), plotBottom - 8)})`}
                >
                  <line
                    className={endLabel.kind === "fc" ? "forecast-line" : "series-line"}
                    x1={0}
                    x2={12}
                    y1={0}
                    y2={0}
                  />
                  <text className="end-label" x={16} y={0} dominantBaseline="middle">
                    {formatTick(endLabel.v, (geo.yT.step || 1) / 10, endLabel.v)}
                  </text>
                </g>
              )}

              {target && (
                <g pointerEvents="none">
                  <line className="crosshair" x1={target.x} x2={target.x} y1={PAD.top} y2={plotBottom} />
                  {hoverObs && showMA && hoverObs.band && (
                    <circle className="marker marker--ma" cx={target.x} cy={geo.y(hoverObs.band.ma)} r={4} />
                  )}
                  <circle className={`marker${hoverFc ? " marker--fc" : ""}`} cx={target.x} cy={hoverY} r={5} />
                </g>
              )}
            </svg>

            {target && (hoverObs || hoverFc) && (
              <div
                className={`tooltip${tooltipBelow ? " tooltip--below" : ""}`}
                style={{
                  left: Math.min(Math.max(target.x, 110), width - 110),
                  top: tooltipBelow ? hoverY + 14 : Math.max(hoverY - 14, 8),
                }}
                role="status"
              >
                {hoverObs ? (
                  <>
                    <div className="tooltip__value">
                      <span className="tooltip__key" aria-hidden="true" />
                      {formatNumber(hoverObs.v, meta.unit)} <span className="muted">{unit}</span>
                    </div>
                    {showMA && hoverObs.band && (
                      <div className="tooltip__row">
                        <span className="tooltip__key tooltip__key--ma" aria-hidden="true" />
                        میانگین متحرک: {formatNumber(hoverObs.band.ma, meta.unit)}
                      </div>
                    )}
                    {first && first !== hoverObs && (
                      <div className="tooltip__row muted">
                        نسبت به ابتدای بازه: <bdi>{formatPercent(((hoverObs.v - first.v) / first.v) * 100)}</bdi>
                      </div>
                    )}
                    <div className="tooltip__time">{formatDateTimeShort(hoverObs.iso)}</div>
                  </>
                ) : (
                  hoverFc && (
                    <>
                      <div className="tooltip__value">
                        <span className="tooltip__key tooltip__key--fc" aria-hidden="true" />
                        {formatNumber(hoverFc.mean, meta.unit)} <span className="muted">{unit}</span>
                      </div>
                      <div className="tooltip__row">
                        بازه‌ی ۸۰٪: <bdi>{formatNumber(hoverFc.lo80, meta.unit)}</bdi> تا{" "}
                        <bdi>{formatNumber(hoverFc.hi80, meta.unit)}</bdi>
                      </div>
                      <div className="tooltip__row muted">
                        نسبت به اکنون: <bdi>{formatPercent(((hoverFc.mean - lastObs.v) / lastObs.v) * 100)}</bdi>
                      </div>
                      <div className="tooltip__time">
                        پیش‌بینی · {formatDateTimeShort(new Date(hoverFc.t).toISOString())}
                      </div>
                    </>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>

      {signal && (
        <div className={`anomaly anomaly--${signal.direction}`}>
          <div className="anomaly__head">
            <span className="anomaly__label">{signal.label}</span>
            <span className={`anomaly__badge anomaly__badge--${signal.direction}`}>
              {signal.direction === "up" ? "فشار خرید" : signal.direction === "down" ? "فشار فروش" : "خنثی"}
            </span>
          </div>
          <div className="anomaly__metrics">
            <div>
              <span>z-score ۲۴h</span>
              <strong>{signal.zScore24h.toFixed(2)}</strong>
            </div>
            <div>
              <span>اختلاف نسبت به ۷ روز</span>
              <strong>{formatPercent(signal.vs7d)}</strong>
            </div>
            <div>
              <span>نوسان روزانه</span>
              <strong>{formatPercent(signal.volatility)}</strong>
            </div>
            <div>
              <span>فاصله از پیش‌بینی</span>
              <strong>{formatPercent(signal.forecastGap)}</strong>
            </div>
          </div>
          <p className="anomaly__summary">{signal.summary}</p>
        </div>
      )}

      {stats && (
        <dl className="stats">
          <div>
            <dt>بالاترین</dt>
            <dd>{formatNumber(stats.hi, meta.unit)}</dd>
          </div>
          <div>
            <dt>پایین‌ترین</dt>
            <dd>{formatNumber(stats.lo, meta.unit)}</dd>
          </div>
          <div>
            <dt>میانگین</dt>
            <dd>{formatNumber(stats.avg, meta.unit)}</dd>
          </div>
          <div>
            <dt>دامنه‌ی نوسان</dt>
            <dd>{formatPercent(stats.spread)}</dd>
          </div>
        </dl>
      )}

      {showForecast && (
        <ForecastPanel
          forecast={forecast}
          chosenId={chosen?.id ?? null}
          choice={modelChoice}
          onChoose={setModelChoice}
          meta={meta}
          unit={unit}
          horizonLabel={HORIZONS.find((h) => h.id === horizon)!.label}
          available={all.length}
        />
      )}

      {visible.length > 0 && (
        <details className="table-view">
          <summary>نمایش جدول آخرین مقادیر</summary>
          <table>
            <thead>
              <tr>
                <th scope="col">زمان</th>
                <th scope="col">قیمت ({unit})</th>
                {showMA && <th scope="col">میانگین متحرک</th>}
              </tr>
            </thead>
            <tbody>
              {visible
                .slice(-12)
                .reverse()
                .map((p) => (
                  <tr key={p.iso}>
                    <td>{formatDateTimeShort(p.iso)}</td>
                    <td>{formatNumber(p.v, meta.unit)}</td>
                    {showMA && <td>{p.band ? formatNumber(p.band.ma, meta.unit) : "—"}</td>}
                  </tr>
                ))}
            </tbody>
          </table>
        </details>
      )}
    </section>
  );
}
