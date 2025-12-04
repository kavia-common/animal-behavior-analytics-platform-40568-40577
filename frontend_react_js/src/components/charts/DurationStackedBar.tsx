import React, { useMemo, useState } from 'react';

interface Datum {
  id: string;
  label: string;
  value: number;
  percentage?: number;
  color?: string;
}

interface Props {
  data: Datum[];
  barWidth?: number;
  onSegmentClick?: (id: string) => void;
  tooltipFormatter?: (d: Datum) => string;
}

// PUBLIC_INTERFACE
export default function DurationStackedBar({
  data,
  barWidth = 60,
  onSegmentClick,
  tooltipFormatter,
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const total = useMemo(() => data.reduce((a, b) => a + b.value, 0) || 1, [data]);

  return (
    <div className="w-full">
      <div
        className="flex w-full h-10 rounded overflow-hidden border"
        style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        {data.map((d) => {
          const pct = (d.value / total) * 100;
          const isHover = hovered === d.id;
          return (
            <button
              key={d.id}
              onClick={() => onSegmentClick?.(d.id)}
              onMouseEnter={() => setHovered(d.id)}
              onMouseLeave={() => setHovered(null)}
              className="h-full transition-all"
              title={tooltipFormatter ? tooltipFormatter(d) : `${d.label}: ${pct.toFixed(1)}%`}
              style={{
                width: `${pct}%`,
                background: d.color || 'var(--primary)',
                filter: isHover ? 'brightness(1.1)' : 'none',
                borderRight: '1px solid var(--surface)',
              }}
              aria-label={`${d.label} ${Math.round(pct)} percent`}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        {data.map((d) => {
          const pct = (d.value / total) * 100;
          return (
            <button
              key={d.id}
              className="flex items-center gap-2 text-sm"
              onClick={() => onSegmentClick?.(d.id)}
              title={`${d.label}: ${pct.toFixed(1)}%`}
            >
              <span className="inline-block w-3 h-3 rounded" style={{ background: d.color || 'var(--primary)' }} />
              <span className="text-gray-700">{d.label}</span>
              <span className="text-gray-500">({pct.toFixed(1)}%)</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
