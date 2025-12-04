import React, { useMemo, useState } from 'react';

interface Datum {
  id: string;
  label: string;
  count: number;
  percentage?: number;
  color?: string;
}

interface Props {
  data: Datum[];
  barWidth?: number;
  barGap?: number;
  showValueLabels?: boolean;
  hoverLighten?: number; // 0..1
  onBarClick?: (id: string) => void;
  tooltipFormatter?: (d: Datum) => string;
}

// PUBLIC_INTERFACE
export default function BehaviorCountBarChart({
  data,
  barWidth = 40,
  barGap = 20,
  showValueLabels = true,
  hoverLighten = 0.1,
  onBarClick,
  tooltipFormatter,
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const max = useMemo(() => Math.max(1, ...data.map((d) => d.count)), [data]);
  const heightPx = 240;
  const scale = (val: number) => (val / max) * (heightPx - 12) + 8;

  return (
    <div className="w-full">
      <div className="flex items-end" style={{ gap: `${barGap}px`, height: `${heightPx}px`, alignItems: 'flex-end' }}>
        {data.map((d) => {
          const h = Math.max(8, Math.min(heightPx, scale(d.count)));
          const isHover = hovered === d.id;
          return (
            <div key={d.id} className="flex flex-col items-center" style={{ width: barWidth }}>
              {showValueLabels && (
                <div className="text-[11px] mb-1" style={{ color: 'var(--text)' }}>
                  {d.count}
                </div>
              )}
              <button
                aria-label={`${d.label} ${d.count}`}
                onClick={() => onBarClick?.(d.id)}
                onMouseEnter={() => setHovered(d.id)}
                onMouseLeave={() => setHovered(null)}
                className="rounded-t focus:outline-none focus:ring-2 transition-all"
                title={tooltipFormatter ? tooltipFormatter(d) : `${d.label}\nCount: ${d.count}\nShare: ${d.percentage?.toFixed(1) ?? ''}%`}
                style={{
                  width: barWidth,
                  height: h,
                  background: d.color || 'var(--primary)',
                  boxShadow: isHover ? 'var(--shadow)' : 'none',
                  filter: isHover ? `brightness(${1 + hoverLighten})` : 'none',
                  border: '1px solid var(--border)',
                }}
              />
              <div className="text-xs mt-2 text-gray-600 text-center leading-tight" style={{ width: barWidth }}>
                {d.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
