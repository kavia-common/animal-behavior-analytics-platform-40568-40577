import React from 'react';

type Props = {
  data: Array<Record<string, any>>;
  xKey: string;
  yKey: string;
  color?: string;
  onPointClick?: (ts: string) => void;
};

// PUBLIC_INTERFACE
export default function TrendLineChart({ data, xKey, yKey, color = 'var(--primary)', onPointClick }: Props) {
  // Render as a simple column series for event frequency with click support
  const max = Math.max(...data.map(d => Number(d[yKey]) || 0), 1);
  return (
    <div className="w-full">
      <div className="grid gap-1 items-end" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0,1fr))`, height: 160 }}>
        {data.map((d, idx) => {
          const v = Number(d[yKey]) || 0;
          const h = Math.max(4, Math.round((v / max) * 150));
          const label = String(d[xKey]);
          return (
            <div
              key={idx}
              className="cursor-pointer rounded"
              style={{ height: h, background: color }}
              title={`${label}\nEvents: ${v}`}
              onClick={() => onPointClick?.(label)}
            />
          );
        })}
      </div>
      <div className="text-xs text-muted mt-2">Events per interval</div>
    </div>
  );
}
