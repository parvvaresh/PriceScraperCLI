# Price Scraper CLI + Web

A Go app that scrapes live prices from [tgju.org](https://www.tgju.org) (USD, Tether, gold, coin, Bitcoin, Brent oil, TEDPIX). It has two front ends:

- **CLI**: a colorful terminal table with up/down trends, auto-refresh, and Jalali dates.
- **Web**: a React dashboard (Persian, RTL, dark/light, Rial/Toman) hosted on GitHub Pages and refreshed automatically by GitHub Actions.

🌐 **Live site:** https://parvvaresh.github.io/PriceScraperCLI/

## CLI

```bash
go run .                     # auto-refresh every 20s (r + Enter: refresh, q + Enter: quit)
go run . -once               # fetch once and exit
go run . -interval=10        # refresh every 10s
go run . -json               # print a JSON snapshot (price + daily change per item)
go run . -json -out prices.json -history history.json -history-max 3000
```

```
Date (Jalali): 1405-08-14   |   Time: 19:16:14
╭─────────────┬───────────────┬────────╮
│ ITEM        │ PRICE         │ CHANGE │
├─────────────┼───────────────┼────────┤
│ Dollar      │     2,689,000 │    • — │
│ GoldOunce   │      4,134.49 │    • — │
│ Bitcoin     │      80596.15 │    • — │
╰─────────────┴───────────────┴────────╯
```

### Docker

```bash
docker run --rm -it ghcr.io/parvvaresh/price-scraper-cli:latest -once
# or build locally
docker build -t price-scraper . && docker run --rm -it price-scraper -once
```

## Web dashboard (`web/`)

Vite + React + TypeScript, with no chart library (hand-rolled SVG sparklines and an interactive history chart).

```bash
cd web
npm install
npm run data     # runs the Go scraper -> web/public/data/{prices,history}.json
npm run dev      # http://localhost:5173
npm test         # unit tests (vitest)
npm run build    # production build -> web/dist
```

### Statistical forecast (no ML)

The history chart can project prices forward (6h / 1d / 3d / 1w) using only classical
time-series statistics (`web/src/forecast.ts`), with no training and no model weights:

1. the irregular scrape history is resampled onto a regular grid (last value carried forward) and moved to log space;
2. eight models are fitted: random walk, drift, simple exponential smoothing, damped Holt, Theta,
   ARIMA(1,1,0) (OLS), linear trend, and an equal-weight combination;
3. each model is scored with a **rolling-origin backtest** (parameters estimated on the older 70%, tested on the
   newest 30%), and the one with the lowest error is picked automatically. You can also choose a model yourself;
4. the chart shows the point forecast with **80% / 95% prediction intervals** (analytic forecast variance). The panel
   also shows the probability of ending above today's price, the backtest error, the skill vs. the random walk, and
   the empirical interval coverage.

The chart also has optional moving-average and Bollinger-band overlays, high/low markers, and a stats row.
The forecast is informational only, not financial advice.

### How the hosted site stays fresh

GitHub Pages only serves static files, and browsers can't scrape tgju.org directly (CORS). So
`.github/workflows/pages.yml` runs every ~15 minutes and on each push to `main`. Each run:

1. downloads the currently published `data/history.json` from the live site,
2. runs `go run . -json …` to scrape a new snapshot and append it to the history (newest 3000 points kept),
3. builds the React app and deploys it to Pages.

If a scrape fails, the previous snapshot is re-published, so the site never goes blank.

## CI/CD (GitHub Actions)

| Workflow | Trigger | What it does |
|---|---|---|
| `ci.yml` | every push / PR | `gofmt` check, `go vet`, `go test -race`, CLI build; web typecheck, tests and build; Docker build (pushed to `ghcr.io` from `main`) |
| `pages.yml` | push to `main`, every 15 min, manual | scrape → build web → deploy to GitHub Pages |

**One-time setup:** in the repository, go to *Settings → Pages → Build and deployment* and set *Source* to **GitHub Actions**.

## Tests

```bash
go test ./... -v
cd web && npm test
```
