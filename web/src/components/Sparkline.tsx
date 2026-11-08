interface Props {
  values: number[];
  trend: "up" | "down" | "flat";
}

const W = 120;
const H = 36;

export function Sparkline({ values, trend }: Props) {
  if (values.length < 2) {
    return <div className="sparkline sparkline--empty" aria-hidden="true" />;
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * W;
    const y = H - 3 - ((v - min) / span) * (H - 6);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
  const area = `${line}L${W},${H}L0,${H}Z`;
  const [ex, ey] = pts[pts.length - 1];
  return (
    <span className={`sparkline sparkline--${trend}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <path className="sparkline__area" d={area} />
        <path className="sparkline__line" d={line} vectorEffect="non-scaling-stroke" />
      </svg>
      {/* end dot as HTML so it stays round when the SVG is stretched */}
      <span className="sparkline__dot" style={{ left: `${(ex / W) * 100}%`, top: `${(ey / H) * 100}%` }} />
    </span>
  );
}
