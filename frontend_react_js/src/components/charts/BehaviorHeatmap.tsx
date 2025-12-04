import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeatCell {
  hour: number;
  intensity: number; // 0..100
  duration?: number;
}

interface HeatRow {
  behaviorId: string;
  cells: HeatCell[];
}

interface BehaviorMeta {
  id: string;
  label: string;
  color?: string;
}

interface Props {
  behaviors: BehaviorMeta[];
  rows: HeatRow[];
  hourLabels?: string[];
  tooltipFormatter?: (cell: { behaviorId: string; behaviorLabel: string; hour: number; intensity: number; duration: number }) => string;
  onCellClick?: (behaviorId: string, hour: number) => void;
  colorScale?: { min: string; max: string };
  borderColor?: string;
  hoverShadow?: string;
}

/**
 * PUBLIC_INTERFACE
 * BehaviorHeatmap renders a heatmap and navigates to Timeline on cell click if onCellClick is not provided.
 * Default navigation: /timeline?behavior=<id>&hour=<hour>
 */
export default function BehaviorHeatmap({
  behaviors,
  rows,
  hourLabels,
  tooltipFormatter,
  onCellClick,
  colorScale = { min: 'hsl(215, 20%, 92%)', max: 'var(--primary)' },
  borderColor = 'var(--border)',
  hoverShadow = 'var(--shadow)',
}: Props) {
  const behaviorMap = useMemo(() => new Map(behaviors.map((b) => [b.id, b])), [behaviors]);
  const maxIntensity = useMemo(() => {
    let m = 1;
    rows.forEach((r) => r.cells.forEach((c) => (m = Math.max(m, c.intensity))));
    return m;
  }, [rows]);

  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const navigate = useNavigate();

  // simple color interpolation using CSS gradient stop hack
  const cellBg = (intensity: number) => {
    const t = Math.max(0, Math.min(1, intensity / maxIntensity));
    return `linear-gradient(0deg, ${colorScale.max} ${t * 100}%, ${colorScale.min} ${t * 100}%)`;
  };

  const handleClick = (behaviorId: string, hour: number) => {
    if (onCellClick) return onCellClick(behaviorId, hour);
    const q = new URLSearchParams();
    q.append('behavior', behaviorId);
    q.set('hour', String(hour));
    navigate({ pathname: '/timeline', search: `?${q.toString()}` });
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[900px] border-collapse w-full">
        <thead>
          <tr>
            <th className="text-left p-2 text-xs text-gray-500 sticky left-0 bg-white z-10 border-b" style={{ borderColor }}>
              Behavior
            </th>
            {(hourLabels || Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))).map((h, i) => (
              <th key={i} className="p-2 text-xs text-gray-500 border-b" style={{ borderColor }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const meta = behaviorMap.get(row.behaviorId);
            return (
              <tr key={row.behaviorId}>
                <td className="p-2 text-sm text-gray-700 sticky left-0 bg-white z-10 border-r" style={{ borderColor }}>
                  {meta?.label || row.behaviorId}
                </td>
                {row.cells.map((c, idx) => {
                  const key = `${row.behaviorId}-${c.hour}`;
                  const isHover = hoverKey === key;
                  const label = meta?.label || row.behaviorId;
                  const content = tooltipFormatter
                    ? tooltipFormatter({ behaviorId: row.behaviorId, behaviorLabel: label, hour: c.hour, intensity: c.intensity, duration: c.duration || 0 })
                    : `${label} @ ${String(c.hour).padStart(2, '0')}:00\nIntensity: ${c.intensity}\nDuration: ${c.duration || 0}s`;
                  return (
                    <td key={idx} className="p-1">
                      <button
                        aria-label={`${label} hour ${c.hour}`}
                        onClick={() => handleClick(row.behaviorId, c.hour)}
                        onMouseEnter={() => setHoverKey(key)}
                        onMouseLeave={() => setHoverKey(null)}
                        className="w-7 h-7 rounded transition-all"
                        title={content}
                        style={{
                          background: cellBg(c.intensity),
                          border: `1px solid ${borderColor}`,
                          boxShadow: isHover ? hoverShadow : 'none',
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
