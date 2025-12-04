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
  showSliceLabels?: boolean;
  onSliceClick?: (id: string) => void;
  tooltipFormatter?: (d: Datum) => string;
}

// PUBLIC_INTERFACE
export default function DurationPieChart({
  data,
  showSliceLabels = true,
  onSliceClick,
  tooltipFormatter,
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const total = useMemo(() => data.reduce((a, b) => a + b.value, 0) || 1, [data]);
  const radius = 70;
  const center = 90;
  let acc = 0;

  return (
    <div className="w-full flex items-center justify-center">
      <svg width={center * 2} height={center * 2} viewBox={`0 0 ${center * 2} ${center * 2}`} role="img" aria-label="Behavior Duration Pie">
        {data.map((d) => {
          const slice = (d.value / total) * Math.PI * 2;
          const start = acc;
          const end = acc + slice;
          acc += slice;

          const x1 = center + Math.cos(start) * radius;
          const y1 = center + Math.sin(start) * radius;
          const x2 = center + Math.cos(end) * radius;
          const y2 = center + Math.sin(end) * radius;
          const largeArc = slice > Math.PI ? 1 : 0;

          const path = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

          const mid = (start + end) / 2;
          const labelX = center + Math.cos(mid) * (radius * 0.65);
          const labelY = center + Math.sin(mid) * (radius * 0.65);
          const pct = (d.value / total) * 100;

          const isHover = hovered === d.id;

          return (
            <g key={d.id}>
              <path
                d={path}
                fill={d.color || 'var(--primary)'}
                onClick={() => onSliceClick?.(d.id)}
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer', filter: isHover ? 'brightness(1.1)' : 'none', stroke: 'var(--surface)', strokeWidth: 1 }}
              />
              <title>{tooltipFormatter ? tooltipFormatter(d) : `${d.label}: ${pct.toFixed(1)}%`}</title>
              {showSliceLabels && pct >= 4 && (
                <text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="var(--text)">
                  {pct.toFixed(0)}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="sr-only">Click a slice to filter Timeline by behavior</div>
    </div>
  );
}
