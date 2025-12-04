import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

/**
 * PUBLIC_INTERFACE
 * BehaviorCountBarChart renders counts with optional navigation to Timeline when bars are clicked.
 * If onBarClick prop is omitted, clicking a bar navigates to /timeline?behavior=<id>
 */
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
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    if (onBarClick) return onBarClick(id);
    const q = new URLSearchParams();
    q.append('behavior', id);
    navigate({ pathname: '/timeline', search: `?${q.toString()}` });
  };

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
                onClick={() => handleClick(d.id)}
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
