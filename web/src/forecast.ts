/**
 * Statistical (training-free) price forecasting.
 *
 * Everything here is classical time-series statistics — no machine learning and
 * no pre-trained weights. The pipeline is:
 *
 *   1. resample the irregular scrape history onto a regular time grid
 *      (last observation carried forward, since a quoted price holds until it changes);
 *   2. move to log space, so errors are relative (≈ percent) and intervals stay positive;
 *   3. fit a handful of classic models (random walk, drift, SES, damped Holt, Theta,
 *      ARIMA(1,1,0), linear trend and an equal-weight combination);
 *   4. score every model with a rolling-origin backtest on the most recent part of the
 *      series (parameters estimated on the earlier part only), and pick the lowest error;
 *   5. produce the point forecast plus 80% / 95% prediction intervals from each model's
 *      analytic forecast-variance formula.
 */

export type ModelId = "naive" | "drift" | "ses" | "holt" | "theta" | "arima" | "linear" | "ensemble";

export interface ModelInfo {
  id: ModelId;
  name: string; // Persian display name
  short: string; // short (Latin) tag
  description: string; // one-line Persian explanation
}

export const MODEL_INFO: Record<ModelId, ModelInfo> = {
  naive: {
    id: "naive",
    name: "گام تصادفی",
    short: "Naive",
    description: "قیمت بعدی همان آخرین قیمت است؛ مبنای مقایسه‌ی بقیه‌ی مدل‌ها.",
  },
  drift: {
    id: "drift",
    name: "گام تصادفی با رانش",
    short: "Drift",
    description: "شیب میانگین کل دوره را ادامه می‌دهد.",
  },
  ses: {
    id: "ses",
    name: "هموارسازی نمایی ساده",
    short: "SES",
    description: "میانگین وزنی با وزن بیشتر برای داده‌های تازه‌تر، بدون روند.",
  },
  holt: {
    id: "holt",
    name: "هولت با روند میرا",
    short: "Holt",
    description: "سطح و روند را هموار می‌کند و روند را در آینده کم‌کم میرا می‌کند.",
  },
  theta: {
    id: "theta",
    name: "روش تتا",
    short: "Theta",
    description: "هموارسازی نمایی به‌علاوه‌ی نصف روند خطی بلندمدت.",
  },
  arima: {
    id: "arima",
    name: "آریما (۱،۱،۰)",
    short: "ARIMA",
    description: "مدل خودرگرسیو روی تغییرات قیمت (تخمین با کمترین مربعات).",
  },
  linear: { id: "linear", name: "روند خطی", short: "Linear", description: "خط رگرسیون روی لگاریتم قیمت در کل دوره." },
  ensemble: {
    id: "ensemble",
    name: "ترکیبی",
    short: "Combo",
    description: "میانگین پیش‌بینی مدل‌های SES، هولت، تتا و آریما.",
  },
};

export interface ObservedPoint {
  t: number; // epoch ms
  v: number; // > 0
}

export interface Grid {
  step: number; // ms between grid points
  t: number[];
  y: number[];
}

export interface ForecastPoint {
  t: number;
  k: number; // steps ahead (0 = last observation)
  mean: number;
  lo80: number;
  hi80: number;
  lo95: number;
  hi95: number;
}

export interface ModelResult {
  id: ModelId;
  available: boolean;
  /** Backtest mean absolute error in log space (≈ relative error, 0.01 = 1%). */
  mae: number;
  /** 1 − MAE / MAE(naive); positive means better than the random walk. */
  skill: number;
  /** Share of backtest outcomes that fell inside the model's 80% interval. */
  coverage80: number;
  path: ForecastPoint[];
  /** Probability (normal approximation) that the price at the horizon is above the last price. */
  probUp: number;
}

export interface ForecastResult {
  step: number;
  horizonSteps: number;
  gridSize: number;
  backtestOrigins: number;
  best: ModelId;
  models: ModelResult[];
  last: { t: number; v: number };
}

/* ------------------------------------------------------------------ */
/* small numeric helpers                                               */
/* ------------------------------------------------------------------ */

const Z80 = 1.2815515655446004;
const Z95 = 1.959963984540054;

function diffs(y: number[]): number[] {
  const d = new Array<number>(Math.max(0, y.length - 1));
  for (let i = 1; i < y.length; i++) d[i - 1] = y[i] - y[i - 1];
  return d;
}

function mean(a: number[]): number {
  if (!a.length) return 0;
  let s = 0;
  for (const x of a) s += x;
  return s / a.length;
}

/** Root-mean-square with an optional degrees-of-freedom correction. */
function rms(a: number[], dof = 0): number {
  const n = a.length - dof;
  if (n <= 0) return 0;
  let s = 0;
  for (const x of a) s += x * x;
  return Math.sqrt(s / n);
}

/** Ordinary least squares y = a + b·x with x = 0..n-1. */
function olsTrend(y: number[]): { a: number; b: number; xbar: number; sxx: number; sigma: number } {
  const n = y.length;
  const xbar = (n - 1) / 2;
  const ybar = mean(y);
  let sxy = 0;
  let sxx = 0;
  for (let i = 0; i < n; i++) {
    sxy += (i - xbar) * (y[i] - ybar);
    sxx += (i - xbar) ** 2;
  }
  const b = sxx ? sxy / sxx : 0;
  const a = ybar - b * xbar;
  const res = y.map((v, i) => v - (a + b * i));
  return { a, b, xbar, sxx, sigma: rms(res, Math.min(2, n - 1)) };
}

/** Standard normal CDF (Abramowitz & Stegun 7.1.26, |error| < 1.5e-7). */
export function normCdf(z: number): number {
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const erf =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return z >= 0 ? 0.5 * (1 + erf) : 0.5 * (1 - erf);
}

/* ------------------------------------------------------------------ */
/* resampling                                                          */
/* ------------------------------------------------------------------ */

/**
 * Puts irregular observations on a regular grid that ends exactly at the last
 * observation. The step is the median spacing of the data, widened if needed so
 * the grid has at most `maxPoints` points.
 */
export function resample(points: ObservedPoint[], maxPoints = 400): Grid | null {
  const clean = points.filter((p) => Number.isFinite(p.t) && Number.isFinite(p.v) && p.v > 0).sort((a, b) => a.t - b.t);
  const obs: ObservedPoint[] = [];
  for (const p of clean) {
    if (obs.length && obs[obs.length - 1].t === p.t) obs[obs.length - 1] = p;
    else obs.push(p);
  }
  if (obs.length < 2) return null;

  const gaps = diffs(obs.map((p) => p.t)).sort((a, b) => a - b);
  const median = gaps[Math.floor(gaps.length / 2)];
  const span = obs[obs.length - 1].t - obs[0].t;
  let step = Math.max(median, 60_000);
  if (span / step > maxPoints - 1) step = span / (maxPoints - 1);

  const n = Math.floor(span / step) + 1;
  const tLast = obs[obs.length - 1].t;
  const t: number[] = [];
  const y: number[] = [];
  let j = 0;
  for (let i = 0; i < n; i++) {
    const gt = tLast - (n - 1 - i) * step;
    while (j + 1 < obs.length && obs[j + 1].t <= gt + 1) j++;
    t.push(gt);
    y.push(obs[j].v);
  }
  return { step, t, y };
}

/* ------------------------------------------------------------------ */
/* models (all operate on log prices)                                  */
/* ------------------------------------------------------------------ */

interface Fc {
  mean: number[]; // k = 1..h
  sd: number[];
}

interface Fitted {
  /** Forecast h steps past the end of `y` using the parameters fixed at fit time. */
  forecast(y: number[], h: number): Fc;
}

interface Model {
  id: ModelId;
  minPoints: number;
  fit(y: number[]): Fitted;
}

const ALPHAS = [0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const naive: Model = {
  id: "naive",
  minPoints: 2,
  fit: () => ({
    forecast(y, h) {
      const last = y[y.length - 1];
      const sigma = rms(diffs(y));
      return {
        mean: Array.from({ length: h }, () => last),
        sd: Array.from({ length: h }, (_, i) => sigma * Math.sqrt(i + 1)),
      };
    },
  }),
};

const drift: Model = {
  id: "drift",
  minPoints: 3,
  fit: () => ({
    forecast(y, h) {
      const T = y.length;
      const last = y[T - 1];
      const c = (last - y[0]) / (T - 1);
      const sigma = rms(
        diffs(y).map((d) => d - c),
        1,
      );
      return {
        mean: Array.from({ length: h }, (_, i) => last + (i + 1) * c),
        sd: Array.from({ length: h }, (_, i) => sigma * Math.sqrt((i + 1) * (1 + (i + 1) / (T - 1)))),
      };
    },
  }),
};

function sesRun(y: number[], alpha: number): { level: number; sse: number; sigma: number } {
  let level = y[0];
  let sse = 0;
  for (let t = 1; t < y.length; t++) {
    const e = y[t] - level;
    sse += e * e;
    level += alpha * e;
  }
  return { level, sse, sigma: Math.sqrt(sse / Math.max(1, y.length - 2)) };
}

function bestSesAlpha(y: number[]): number {
  let best = 1;
  let bestSse = Infinity;
  for (const a of ALPHAS) {
    const { sse } = sesRun(y, a);
    if (sse < bestSse - 1e-15) {
      bestSse = sse;
      best = a;
    }
  }
  return best;
}

function sesForecast(y: number[], alpha: number, h: number): Fc {
  const { level, sigma } = sesRun(y, alpha);
  return {
    mean: Array.from({ length: h }, () => level),
    sd: Array.from({ length: h }, (_, i) => sigma * Math.sqrt(1 + i * alpha * alpha)),
  };
}

const ses: Model = {
  id: "ses",
  minPoints: 4,
  fit(y) {
    const alpha = bestSesAlpha(y);
    return { forecast: (yy, h) => sesForecast(yy, alpha, h) };
  },
};

interface HoltParams {
  alpha: number;
  beta: number; // β* (trend smoothing, Holt form)
  phi: number;
}

function holtRun(y: number[], p: HoltParams): { level: number; trend: number; sse: number; sigma: number } {
  const m = Math.min(3, y.length - 1);
  let level = y[0];
  let trend = (y[m] - y[0]) / m;
  let sse = 0;
  for (let t = 1; t < y.length; t++) {
    const f = level + p.phi * trend;
    const e = y[t] - f;
    sse += e * e;
    level = f + p.alpha * e;
    trend = p.phi * trend + p.alpha * p.beta * e;
  }
  return { level, trend, sse, sigma: Math.sqrt(sse / Math.max(1, y.length - 4)) };
}

const holt: Model = {
  id: "holt",
  minPoints: 8,
  fit(y) {
    let best: HoltParams = { alpha: 0.5, beta: 0.1, phi: 0.9 };
    let bestSse = Infinity;
    for (const alpha of ALPHAS) {
      for (const beta of [0.01, 0.05, 0.1, 0.2, 0.4]) {
        for (const phi of [0.8, 0.9, 0.95, 0.98]) {
          const { sse } = holtRun(y, { alpha, beta, phi });
          if (sse < bestSse - 1e-15) {
            bestSse = sse;
            best = { alpha, beta, phi };
          }
        }
      }
    }
    return {
      forecast(yy, h) {
        const { level, trend, sigma } = holtRun(yy, best);
        const meanOut: number[] = [];
        const sd: number[] = [];
        let phiSum = 0; // φ + φ² + … + φ^k
        let varSum = 0; // Σ_{j=1}^{k-1} c_j²  with  c_j = α(1 + β·φ_j)
        let phiPow = 1;
        for (let k = 1; k <= h; k++) {
          if (k > 1) varSum += (best.alpha * (1 + best.beta * phiSum)) ** 2;
          phiPow *= best.phi;
          phiSum += phiPow;
          meanOut.push(level + phiSum * trend);
          sd.push(sigma * Math.sqrt(1 + varSum));
        }
        return { mean: meanOut, sd };
      },
    };
  },
};

const theta: Model = {
  id: "theta",
  minPoints: 6,
  fit(y) {
    const alpha = bestSesAlpha(y);
    return {
      forecast(yy, h) {
        const base = sesForecast(yy, alpha, h);
        const slope = olsTrend(yy).b;
        const n = yy.length;
        const offset = (1 - (1 - alpha) ** n) / alpha;
        return {
          mean: base.mean.map((m, i) => m + (slope / 2) * (i + offset)),
          sd: base.sd,
        };
      },
    };
  },
};

const arima: Model = {
  id: "arima",
  minPoints: 10,
  fit(y) {
    // ARIMA(1,1,0) with constant: Δy_t = c + a·Δy_{t-1} + e_t, estimated by OLS.
    const d = diffs(y);
    const x = d.slice(0, -1);
    const z = d.slice(1);
    const mx = mean(x);
    const mz = mean(z);
    let sxz = 0;
    let sxx = 0;
    for (let i = 0; i < x.length; i++) {
      sxz += (x[i] - mx) * (z[i] - mz);
      sxx += (x[i] - mx) ** 2;
    }
    const a = Math.max(-0.95, Math.min(0.95, sxx ? sxz / sxx : 0));
    const c = mz - a * mx;
    return {
      forecast(yy, h) {
        const dd = diffs(yy);
        const res: number[] = [];
        for (let i = 1; i < dd.length; i++) res.push(dd[i] - c - a * dd[i - 1]);
        const sigma = rms(res, 2);
        let prevD = dd[dd.length - 1] ?? 0;
        let level = yy[yy.length - 1];
        const meanOut: number[] = [];
        const sd: number[] = [];
        let psi = 0; // ψ_j = 1 + a + … + a^j  (integrated AR(1) weights)
        let aPow = 1;
        let varSum = 0;
        for (let k = 1; k <= h; k++) {
          prevD = c + a * prevD;
          level += prevD;
          psi += aPow;
          aPow *= a;
          varSum += psi * psi;
          meanOut.push(level);
          sd.push(sigma * Math.sqrt(varSum));
        }
        return { mean: meanOut, sd };
      },
    };
  },
};

const linear: Model = {
  id: "linear",
  minPoints: 6,
  fit: () => ({
    forecast(y, h) {
      const T = y.length;
      const { a, b, xbar, sxx, sigma } = olsTrend(y);
      return {
        mean: Array.from({ length: h }, (_, i) => a + b * (T - 1 + i + 1)),
        sd: Array.from({ length: h }, (_, i) => {
          const x0 = T - 1 + i + 1;
          return sigma * Math.sqrt(1 + 1 / T + (sxx ? (x0 - xbar) ** 2 / sxx : 0));
        }),
      };
    },
  }),
};

const ENSEMBLE_MEMBERS: Model[] = [ses, holt, theta, arima];

const ensemble: Model = {
  id: "ensemble",
  minPoints: 6,
  fit(y) {
    const members = ENSEMBLE_MEMBERS.filter((m) => y.length >= m.minPoints).map((m) => m.fit(y));
    return {
      forecast(yy, h) {
        const fcs = members.map((m) => m.forecast(yy, h));
        return {
          mean: Array.from({ length: h }, (_, i) => mean(fcs.map((f) => f.mean[i]))),
          sd: Array.from({ length: h }, (_, i) => mean(fcs.map((f) => f.sd[i]))),
        };
      },
    };
  },
};

/** Ordered from simplest to most complex — ties go to the simpler model. */
const MODELS: Model[] = [naive, drift, ses, theta, linear, holt, arima, ensemble];

/* ------------------------------------------------------------------ */
/* backtest + public entry point                                       */
/* ------------------------------------------------------------------ */

interface Score {
  mae: number;
  coverage80: number;
}

/**
 * Rolling-origin evaluation: parameters are fitted on the first part of the series
 * only, then the model forecasts 1..h steps ahead from every origin in the held-out
 * tail and is compared with what actually happened.
 */
function backtest(model: Model, y: number[], h: number, trainLen: number): Score | null {
  if (trainLen < model.minPoints) return null;
  const fitted = model.fit(y.slice(0, trainLen));
  let err = 0;
  let inside = 0;
  let count = 0;
  for (let o = trainLen - 1; o < y.length - 1; o++) {
    const hh = Math.min(h, y.length - 1 - o);
    const fc = fitted.forecast(y.slice(0, o + 1), hh);
    for (let k = 1; k <= hh; k++) {
      const e = y[o + k] - fc.mean[k - 1];
      err += Math.abs(e);
      if (Math.abs(e) <= Z80 * fc.sd[k - 1] + 1e-12) inside++;
      count++;
    }
  }
  return count ? { mae: err / count, coverage80: inside / count } : null;
}

export const MIN_FORECAST_POINTS = 6;

/**
 * Builds forecasts for every model and picks the one with the lowest backtest error.
 * Returns null when there is not enough history.
 */
export function buildForecast(points: ObservedPoint[], horizonMs: number): ForecastResult | null {
  const grid = resample(points);
  if (!grid || grid.y.length < MIN_FORECAST_POINTS) return null;

  const y = grid.y.map(Math.log);
  const n = y.length;
  const h = Math.max(1, Math.min(200, Math.round(horizonMs / grid.step)));
  const testLen = Math.max(2, Math.min(60, Math.round(n * 0.3)));
  const trainLen = n - testLen;

  const scores = new Map<ModelId, Score | null>();
  for (const m of MODELS) scores.set(m.id, backtest(m, y, h, trainLen));
  const naiveMae = scores.get("naive")?.mae ?? 0;

  const lastT = grid.t[n - 1];
  const lastV = grid.y[n - 1];

  const models: ModelResult[] = MODELS.map((m) => {
    const score = scores.get(m.id) ?? null;
    if (!score || n < m.minPoints) {
      return { id: m.id, available: false, mae: NaN, skill: NaN, coverage80: NaN, path: [], probUp: NaN };
    }
    const fc = m.fit(y).forecast(y, h);
    const path: ForecastPoint[] = [{ t: lastT, k: 0, mean: lastV, lo80: lastV, hi80: lastV, lo95: lastV, hi95: lastV }];
    for (let k = 1; k <= h; k++) {
      const mu = fc.mean[k - 1];
      const sd = fc.sd[k - 1];
      path.push({
        t: lastT + k * grid.step,
        k,
        mean: Math.exp(mu),
        lo80: Math.exp(mu - Z80 * sd),
        hi80: Math.exp(mu + Z80 * sd),
        lo95: Math.exp(mu - Z95 * sd),
        hi95: Math.exp(mu + Z95 * sd),
      });
    }
    const muH = fc.mean[h - 1];
    const sdH = fc.sd[h - 1];
    const gap = muH - y[n - 1];
    const probUp = sdH > 1e-12 ? normCdf(gap / sdH) : gap > 1e-12 ? 1 : gap < -1e-12 ? 0 : 0.5;
    const skill = naiveMae > 1e-12 ? 1 - score.mae / naiveMae : score.mae > 1e-12 ? -Infinity : 0;
    return { id: m.id, available: true, mae: score.mae, skill, coverage80: score.coverage80, path, probUp };
  });

  let best: ModelResult = models[0];
  for (const r of models) {
    if (r.available && r.mae < best.mae - 1e-12) best = r;
  }

  return {
    step: grid.step,
    horizonSteps: h,
    gridSize: n,
    backtestOrigins: n - trainLen,
    best: best.id,
    models,
    last: { t: lastT, v: lastV },
  };
}

/* ------------------------------------------------------------------ */
/* technical overlays                                                  */
/* ------------------------------------------------------------------ */

export interface BandPoint {
  ma: number;
  upper: number;
  lower: number;
}

/**
 * Simple moving average with Bollinger bands (± k standard deviations) over a
 * trailing window of `window` observations. Entries before the window fills are null.
 */
export function movingBands(values: number[], window: number, k = 2): (BandPoint | null)[] {
  const out: (BandPoint | null)[] = new Array(values.length).fill(null);
  if (window < 2) return out;
  // Direct two-pass per window: running sums of squares lose precision at rial magnitudes (~1e9).
  for (let i = window - 1; i < values.length; i++) {
    let sum = 0;
    for (let j = i - window + 1; j <= i; j++) sum += values[j];
    const ma = sum / window;
    let ss = 0;
    for (let j = i - window + 1; j <= i; j++) ss += (values[j] - ma) ** 2;
    const sd = Math.sqrt(ss / window);
    out[i] = { ma, upper: ma + k * sd, lower: ma - k * sd };
  }
  return out;
}
