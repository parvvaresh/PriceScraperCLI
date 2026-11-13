import { useEffect, useMemo, useState } from "react";
import { usePrices } from "./usePrices";
import { DISPLAY_ORDER, metaFor } from "./meta";
import { formatJalaliDate, formatNumber, formatPercent, formatRelative, formatTime, type Currency } from "./format";
import { PriceCard } from "./components/PriceCard";
import { HistoryChart } from "./components/HistoryChart";
import { buildWatchlistRows } from "./watchlist";
import { computeMarketPulse, filterPulseRows, type MarketCategory } from "./marketPulse";

const REPO_URL = "https://github.com/parvvaresh/PriceScraperCLI";
const STALE_MS = 3 * 60 * 60 * 1000;
const SPARK_POINTS = 48;

type Theme = "dark" | "light";

function usePersisted<T extends string>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => (localStorage.getItem(key) as T | null) ?? initial);
  useEffect(() => localStorage.setItem(key, value), [key, value]);
  return [value, setValue];
}

function usePersistedList(
  key: string,
  initial: string[],
): [string[], (value: string[] | ((prev: string[]) => string[])) => void] {
  const [value, setValue] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initial;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}

export default function App() {
  const { snapshot, history, error, loading, refresh } = usePrices();
  const [currency, setCurrency] = usePersisted<Currency>("currency", "toman");
  const [theme, setTheme] = usePersisted<Theme>(
    "theme",
    window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark",
  );
  const defaultWatchlist = ["Dollar", "GoldOunce", "Bitcoin", "Tether"];
  const [watchlist, setWatchlist] = usePersistedList("watchlist", defaultWatchlist);
  const [selected, setSelected] = useState("Dollar");
  const [category, setCategory] = useState<MarketCategory>("all");
  const [, tick] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // re-render every 30s so "x minutes ago" stays fresh
  useEffect(() => {
    const id = window.setInterval(() => tick((n) => n + 1), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const items = useMemo(() => {
    if (!snapshot) return [];
    const rank = (k: string) => {
      const i = DISPLAY_ORDER.indexOf(k);
      return i === -1 ? DISPLAY_ORDER.length : i;
    };
    return [...snapshot.items].sort((a, b) => rank(a.key) - rank(b.key));
  }, [snapshot]);

  const sparkSeries = useMemo(() => {
    const recent = history.slice(-SPARK_POINTS);
    const out: Record<string, number[]> = {};
    for (const it of items) out[it.key] = recent.map((p) => p.v[it.key]).filter((v) => typeof v === "number" && v > 0);
    return out;
  }, [history, items]);

  const counts = useMemo(
    () => ({
      up: items.filter((i) => i.direction === "up").length,
      down: items.filter((i) => i.direction === "down").length,
      flat: items.filter((i) => i.direction === "flat").length,
    }),
    [items],
  );

  const watchlistRows = useMemo(
    () => buildWatchlistRows(snapshot, history, watchlist),
    [history, snapshot, watchlist],
  );

  const filteredWatchlistRows = useMemo(
    () => filterPulseRows(watchlistRows, category),
    [watchlistRows, category],
  );

  const marketPulse = useMemo(() => computeMarketPulse(filteredWatchlistRows), [filteredWatchlistRows]);
  const heatTone = marketPulse.heatIndex > 0 ? "up" : marketPulse.heatIndex < 0 ? "down" : "flat";

  const selectedItem = items.find((i) => i.key === selected) ?? items[0];
  const stale = snapshot ? Date.now() - new Date(snapshot.fetchedAt).getTime() > STALE_MS : false;

  const toggleWatchKey = (key: string) => {
    setWatchlist((current) => {
      if (current.includes(key)) return current.filter((item) => item !== key);
      return [...current, key].slice(-6);
    });
  };

  return (
    <div className="app">
      <div className="bg-glow" aria-hidden="true" />

      <header className="topbar">
        <div className="brand">
          <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={40} height={40} />
          <div>
            <h1>نرخ بازار</h1>
            <p className="muted">دلار، طلا، سکه، رمزارز و نفت — به‌روزرسانی خودکار</p>
          </div>
        </div>

        <div className="controls">
          <div className="segmented" role="group" aria-label="واحد پول">
            <button type="button" aria-pressed={currency === "toman"} onClick={() => setCurrency("toman")}>
              تومان
            </button>
            <button type="button" aria-pressed={currency === "rial"} onClick={() => setCurrency("rial")}>
              ریال
            </button>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "حالت روشن" : "حالت تیره"}
            title={theme === "dark" ? "حالت روشن" : "حالت تیره"}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button
            type="button"
            className={`icon-btn${loading ? " spinning" : ""}`}
            onClick={() => void refresh()}
            aria-label="به‌روزرسانی"
            title="به‌روزرسانی"
            disabled={loading}
          >
            ⟳
          </button>
        </div>
      </header>

      <main>
        {snapshot && (
          <section className="status-strip" aria-live="polite">
            <div className="status-strip__when">
              <span className={`dot${stale ? " dot--stale" : ""}`} aria-hidden="true" />
              <span>{formatJalaliDate(snapshot.fetchedAt)}</span>
              <span className="muted">
                · ساعت {formatTime(snapshot.fetchedAt)} ({formatRelative(snapshot.fetchedAt)})
              </span>
              {stale && <span className="warn-pill">داده قدیمی است</span>}
            </div>
            <div className="status-strip__mood">
              <span className="pos">▲ {counts.up.toLocaleString("fa-IR")} افزایش</span>
              <span className="neg">▼ {counts.down.toLocaleString("fa-IR")} کاهش</span>
              <span className="muted">● {counts.flat.toLocaleString("fa-IR")} ثابت</span>
            </div>
          </section>
        )}

        {error && !snapshot && (
          <div className="alert" role="alert">
            <strong>دریافت داده ناموفق بود.</strong>
            <span className="muted">
              {" "}
              ({error}) — اگر محلی اجرا می‌کنید، ابتدا <code>npm run data</code> را بزنید.
            </span>
          </div>
        )}

        {items.length > 0 && (
          <>
            <section className="panel market-overview" aria-labelledby="market-overview-title">
              <div className="panel__head">
                <div>
                  <h2 id="market-overview-title" className="panel__title">بازار امروز</h2>
                  <p className="panel__sub">خلاصه‌ی لحظه‌ای بازار با تمرکز روی روند، هشدارها و بهترین/بدترین دارایی‌های حاضر.</p>
                </div>
              </div>

              <div className="market-pulse">
                <div className="market-pulse__head">
                  <div>
                    <div className="market-pulse__title">هوای بازار</div>
                    <div className={`market-pulse__label market-pulse__label--${heatTone}`}>{marketPulse.label}</div>
                  </div>
                  <div className="segmented" role="group" aria-label="دسته‌بندی بازار">
                    {(["all", "currency", "gold", "global"] as MarketCategory[]).map((c) => (
                      <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)}>
                        {c === "all" ? "همه" : c === "currency" ? "ارز" : c === "gold" ? "فلز" : "جهانی"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="market-pulse__grid">
                  <div className={`market-pulse__card market-pulse__card--${heatTone}`}>
                    <span>Heat Index</span>
                    <strong>{marketPulse.heatIndex}</strong>
                  </div>
                  <div className="market-pulse__card market-pulse__card--up">
                    <span>بیشترین رشد</span>
                    <strong>{marketPulse.topGainer ? metaFor(marketPulse.topGainer.key).name : "—"}</strong>
                  </div>
                  <div className="market-pulse__card market-pulse__card--down">
                    <span>بیشترین افت</span>
                    <strong>{marketPulse.topLoser ? metaFor(marketPulse.topLoser.key).name : "—"}</strong>
                  </div>
                  <div className="market-pulse__card market-pulse__card--neutral">
                    <span>هشدار فعال</span>
                    <strong>{marketPulse.alertCount}</strong>
                  </div>
                </div>

                <p className="market-pulse__summary">{marketPulse.summary}</p>
              </div>
            </section>

            <section className="panel watchlist" aria-labelledby="watchlist-title">
              <div className="panel__head">
                <div>
                  <h2 id="watchlist-title" className="panel__title">Watchlist بازار</h2>
                  <p className="panel__sub">دارایی‌های منتخب را برای بررسی سریع وضعیت بازار در یک نگاه دنبال کنید.</p>
                </div>
              </div>

              <div className="watchlist__picker" aria-label="انتخاب دارایی‌های مورد علاقه">
                {items.map((it) => (
                  <button
                    key={it.key}
                    type="button"
                    className={`watchlist__tag${watchlist.includes(it.key) ? " is-active" : ""}`}
                    onClick={() => toggleWatchKey(it.key)}
                    aria-pressed={watchlist.includes(it.key)}
                  >
                    {metaFor(it.key, it.title).name}
                  </button>
                ))}
              </div>

              {filteredWatchlistRows.length > 0 && (
                <div className="watchlist__grid">
                  {filteredWatchlistRows.map((row) => (
                    <button
                      key={row.key}
                      type="button"
                      className="watchlist__card"
                      onClick={() => setSelected(row.key)}
                    >
                      <div className="watchlist__header">
                        <span>{row.title}</span>
                        <span className={`watchlist__direction watchlist__direction--${row.direction}`}>
                          {row.direction === "up" ? "▲" : row.direction === "down" ? "▼" : "●"}
                        </span>
                      </div>
                      <div className="watchlist__value">{formatNumber(row.value, metaFor(row.key).unit)}</div>
                      <div className="watchlist__meta">
                        <span className={row.changePercent >= 0 ? "pos" : row.changePercent < 0 ? "neg" : ""}>
                          {formatPercent(row.changePercent)}
                        </span>
                        <span className="muted">{row.signal.label}</span>
                      </div>
                      <div className="watchlist__signal">
                        <span className={`watchlist__signal-dot watchlist__signal-dot--${row.signal.direction}`} />
                        {row.signal.summary}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        <section className="grid" aria-label="قیمت‌ها">
          {!snapshot && loading
            ? Array.from({ length: 9 }, (_, i) => <div key={i} className="card card--skeleton" />)
            : items.map((it) => (
                <PriceCard
                  key={it.key}
                  item={it}
                  currency={currency}
                  series={sparkSeries[it.key] ?? []}
                  selected={selectedItem?.key === it.key}
                  onSelect={() => setSelected(it.key)}
                />
              ))}
        </section>

        {selectedItem && (
          <HistoryChart
            itemKey={selectedItem.key}
            meta={metaFor(selectedItem.key, selectedItem.title)}
            history={history}
            currency={currency}
          />
        )}

        <section className="panel cli">
          <div>
            <h2 className="panel__title">نسخه‌ی ترمینال (CLI)</h2>
            <p className="muted">همین قیمت‌ها را مستقیم در ترمینال، با جدول رنگی و به‌روزرسانی خودکار ببینید.</p>
          </div>
          <pre dir="ltr">
            <code>{`git clone ${REPO_URL}.git
cd PriceScraperCLI
go run .              # auto-refresh every 20s
go run . -once        # fetch once
go run . -json        # JSON snapshot`}</code>
          </pre>
        </section>
      </main>

      <footer className="footer">
        <span>
          منبع داده: <a href="https://www.tgju.org/" target="_blank" rel="noreferrer">tgju.org</a>
        </span>
        <span className="muted">این صفحه هر چند دقیقه توسط GitHub Actions به‌روز می‌شود و جنبه‌ی اطلاع‌رسانی دارد.</span>
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
      </footer>
    </div>
  );
}
