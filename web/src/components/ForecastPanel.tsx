import type { ItemMeta } from "../meta";
import { MIN_FORECAST_POINTS, MODEL_INFO, type ForecastResult, type ModelId } from "../forecast";
import { formatDateTimeShort, formatDuration, formatNumber, formatPercent } from "../format";

interface Props {
  forecast: ForecastResult | null;
  chosenId: ModelId | null;
  choice: ModelId | "auto";
  onChoose: (id: ModelId | "auto") => void;
  meta: ItemMeta;
  unit: string;
  horizonLabel: string;
  available: number;
}

const pct = (x: number, digits = 1) =>
  `${new Intl.NumberFormat("fa-IR", { maximumFractionDigits: digits }).format(x * 100)}٪`;

export function ForecastPanel({ forecast, chosenId, choice, onChoose, meta, unit, horizonLabel, available }: Props) {
  if (!forecast || !chosenId) {
    return (
      <div className="forecast forecast--empty">
        <strong>پیش‌بینی آماری</strong>
        <span className="muted">
          برای پیش‌بینی دست‌کم {MIN_FORECAST_POINTS.toLocaleString("fa-IR")} نقطه‌ی داده لازم است؛ اکنون{" "}
          {available.toLocaleString("fa-IR")} نقطه موجود است. با هر اجرای اسکرپر داده‌ها بیشتر می‌شوند.
        </span>
      </div>
    );
  }

  const model = forecast.models.find((m) => m.id === chosenId)!;
  const end = model.path[model.path.length - 1];
  const change = ((end.mean - forecast.last.v) / forecast.last.v) * 100;
  const dir = change > 0.005 ? "up" : change < -0.005 ? "down" : "flat";
  const models = forecast.models.filter((m) => m.available);
  const longHorizon = forecast.horizonSteps > forecast.gridSize / 2;

  // a handful of evenly spaced steps for the table view
  const stride = Math.max(1, Math.ceil(forecast.horizonSteps / 8));
  const rows = model.path.filter((p) => p.k > 0 && (p.k % stride === 0 || p.k === forecast.horizonSteps));

  return (
    <div className="forecast">
      <div className="forecast__head">
        <div>
          <h3 className="forecast__title">پیش‌بینی آماری برای {horizonLabel} آینده</h3>
          <p className="muted forecast__model">
            {MODEL_INFO[chosenId].name} <span dir="ltr">({MODEL_INFO[chosenId].short})</span>
            {chosenId === forecast.best && " · کمترین خطا در آزمون گذشته"} — {MODEL_INFO[chosenId].description}
          </p>
        </div>
        <label className="select">
          <span className="muted">مدل:</span>
          <select value={choice} onChange={(e) => onChoose(e.target.value as ModelId | "auto")}>
            <option value="auto">خودکار ({MODEL_INFO[forecast.best].name})</option>
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {MODEL_INFO[m.id].name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="forecast__tiles">
        <div className="tile">
          <span className="tile__label">قیمت پیش‌بینی‌شده</span>
          <span className="tile__value">
            {formatNumber(end.mean, meta.unit)} <small className="muted">{unit}</small>
          </span>
          <span className={`tile__delta tile__delta--${dir}`}>
            {dir === "up" ? "▲" : dir === "down" ? "▼" : "●"} <bdi>{formatPercent(change)}</bdi>
            <span className="muted"> نسبت به اکنون</span>
          </span>
        </div>
        <div className="tile">
          <span className="tile__label">بازه‌ی اطمینان ۸۰٪</span>
          <span className="tile__value tile__value--range">
            <bdi>{formatNumber(end.lo80, meta.unit)}</bdi>
            <span className="muted"> تا </span>
            <bdi>{formatNumber(end.hi80, meta.unit)}</bdi>
          </span>
          <span className="tile__hint muted">
            ۹۵٪: <bdi>{formatNumber(end.lo95, meta.unit)}</bdi> تا <bdi>{formatNumber(end.hi95, meta.unit)}</bdi>
          </span>
        </div>
        <div className="tile">
          <span className="tile__label">احتمال بالاتر از قیمت فعلی</span>
          <span className="tile__value">{pct(model.probUp, 0)}</span>
          <span className="meter" aria-hidden="true">
            <span className="meter__fill" style={{ width: `${Math.round(model.probUp * 100)}%` }} />
          </span>
        </div>
        <div className="tile">
          <span className="tile__label">خطای میانگین در آزمون گذشته</span>
          <span className="tile__value">{pct(model.mae, 2)}</span>
          <span className="tile__hint muted">
            {model.id === "naive"
              ? "مدل مبنا"
              : model.skill >= 0
                ? `${pct(model.skill, 0)} بهتر از گام تصادفی`
                : `${pct(-model.skill, 0)} بدتر از گام تصادفی`}
          </span>
        </div>
      </div>

      {longHorizon && (
        <p className="forecast__warn" role="note">
          ⚠ افق پیش‌بینی نسبت به طول داده‌های موجود بلند است؛ این عدد را با احتیاط بخوانید.
        </p>
      )}

      <details className="table-view">
        <summary>مقایسه‌ی مدل‌ها ({models.length.toLocaleString("fa-IR")} مدل)</summary>
        <div className="table-scroll">
          <table className="models">
            <thead>
              <tr>
                <th scope="col">مدل</th>
                <th scope="col">خطای آزمون</th>
                <th scope="col">نسبت به گام تصادفی</th>
                <th scope="col">پوشش بازه‌ی ۸۰٪</th>
                <th scope="col">پیش‌بینی پایان افق</th>
              </tr>
            </thead>
            <tbody>
              {[...models]
                .sort((a, b) => a.mae - b.mae)
                .map((m) => {
                  const e = m.path[m.path.length - 1];
                  return (
                    <tr key={m.id} className={m.id === chosenId ? "is-selected" : undefined}>
                      <td>
                        <button
                          type="button"
                          className="linklike"
                          onClick={() => onChoose(m.id)}
                          aria-pressed={m.id === chosenId}
                        >
                          {MODEL_INFO[m.id].name}
                        </button>
                        {m.id === forecast.best && <span className="best-pill">بهترین</span>}
                      </td>
                      <td>{pct(m.mae, 2)}</td>
                      <td>{m.id === "naive" ? "—" : <bdi>{formatPercent(m.skill * 100)}</bdi>}</td>
                      <td>{pct(m.coverage80, 0)}</td>
                      <td>{formatNumber(e.mean, meta.unit)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </details>

      <details className="table-view">
        <summary>جدول پیش‌بینی</summary>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">زمان</th>
                <th scope="col">پیش‌بینی ({unit})</th>
                <th scope="col">بازه‌ی ۸۰٪</th>
                <th scope="col">بازه‌ی ۹۵٪</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.k}>
                  <td>{formatDateTimeShort(new Date(p.t).toISOString())}</td>
                  <td>{formatNumber(p.mean, meta.unit)}</td>
                  <td>
                    <bdi>{formatNumber(p.lo80, meta.unit)}</bdi> – <bdi>{formatNumber(p.hi80, meta.unit)}</bdi>
                  </td>
                  <td>
                    <bdi>{formatNumber(p.lo95, meta.unit)}</bdi> – <bdi>{formatNumber(p.hi95, meta.unit)}</bdi>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="forecast__note muted">
        روش: داده‌ها روی شبکه‌ی منظمی با گام {formatDuration(forecast.step)} (
        {forecast.gridSize.toLocaleString("fa-IR")} نقطه) قرار می‌گیرند و هر مدل روی بخش قدیمی‌تر تخمین زده و روی{" "}
        {forecast.backtestOrigins.toLocaleString("fa-IR")} نقطه‌ی آخر آزمون می‌شود؛ مدلی با کمترین خطا به‌طور خودکار
        انتخاب می‌شود. هیچ یادگیری ماشینی در کار نیست. این پیش‌بینی صرفاً آماری است و توصیه‌ی خرید یا فروش نیست.
      </p>
    </div>
  );
}
