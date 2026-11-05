import type { PriceItem } from "../types";
import { metaFor } from "../meta";
import { convert, formatNumber, formatSigned, unitLabel, type Currency } from "../format";
import { ChangeBadge } from "./ChangeBadge";
import { Sparkline } from "./Sparkline";

interface Props {
  item: PriceItem;
  currency: Currency;
  series: number[];
  selected: boolean;
  onSelect: () => void;
}

export function PriceCard({ item, currency, series, selected, onSelect }: Props) {
  const meta = metaFor(item.key, item.title);
  const value = convert(item.value, meta.unit, currency);
  const change = convert(item.changeAmount, meta.unit, currency);
  const sparkTrend =
    series.length >= 2 ? (series[series.length - 1] > series[0] ? "up" : series[series.length - 1] < series[0] ? "down" : "flat") : item.direction;

  return (
    <button
      type="button"
      className={`card${selected ? " card--selected" : ""}`}
      style={{ "--accent": meta.accent } as React.CSSProperties}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="card__head">
        <span className="card__symbol" aria-hidden="true">
          {meta.symbol}
        </span>
        <div className="card__names">
          <span className="card__name">{meta.name}</span>
          <span className="card__en">{meta.en}</span>
        </div>
        <ChangeBadge direction={item.direction} percent={item.changePercent} />
      </div>

      <div className="card__price">
        <span className="card__value">{formatNumber(value, meta.unit)}</span>
        <span className="card__unit">{unitLabel(meta.unit, currency)}</span>
      </div>

      <div className="card__foot">
        <span className={`card__delta card__delta--${item.direction}`}>
          {item.changeAmount === 0 ? "تغییر امروز: ۰" : <>تغییر امروز: <bdi>{formatSigned(change, meta.unit)}</bdi></>}
        </span>
        <Sparkline values={series} trend={sparkTrend} />
      </div>
    </button>
  );
}
