import type { Direction } from "../types";
import { formatPercent } from "../format";

const ICON: Record<Direction, string> = { up: "▲", down: "▼", flat: "●" };
const LABEL: Record<Direction, string> = { up: "افزایش", down: "کاهش", flat: "بدون تغییر" };

export function ChangeBadge({ direction, percent }: { direction: Direction; percent: number }) {
  return (
    <span className={`badge badge--${direction}`} title={LABEL[direction]}>
      <span className="badge__icon" aria-hidden="true">
        {ICON[direction]}
      </span>
      <span className="sr-only">{LABEL[direction]} </span>
      <bdi>{formatPercent(percent)}</bdi>
    </span>
  );
}
