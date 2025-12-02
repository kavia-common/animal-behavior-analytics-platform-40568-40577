import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getBehaviorColor } from '@/lib/behaviorPalette';

type Props = {
  data: { type: string; count: number }[];
  onBarClick?: (type: string) => void;
};

/**
 * PUBLIC_INTERFACE
 * BehaviorCountBarChart with interactive legend to toggle visibility per behavior type.
 */
export default function BehaviorCountBarChart({ data, onBarClick }: Props) {
  /** Vertical bar chart for behavior counts, with legend toggles */
  const [hidden, setHidden] = useState<Record<string, boolean>>({});

  const visibleData = useMemo(() => {
    return (data ?? []).map(d => ({
      ...d,
      count: hidden[d.type] ? 0 : d.count,
    }));
  }, [data, hidden]);

  const toggleType = (t: string) => setHidden(h => ({ ...h, [t]: !h[t] }));

  return (
    <div className="w-full h-72">
      <div className="flex flex-wrap gap-2 mb-2">
        {(data ?? []).map(d => {
          const isHidden = !!hidden[d.type];
          return (
            <button
              key={d.type}
              onClick={() => toggleType(d.type)}
              className={`px-2 py-1 rounded-full text-xs border border-border flex items-center gap-1 ${isHidden ? 'opacity-50' : ''}`}
              title={`${isHidden ? 'Show' : 'Hide'} ${d.type}`}
            >
              <span
                aria-hidden
                className="inline-block w-2.5 h-2.5 rounded"
                style={{ backgroundColor: getBehaviorColor(d.type) }}
              />
              {d.type}
            </button>
          );
        })}
      </div>
      <ResponsiveContainer className="text-primary">
        <BarChart data={visibleData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="count"
            name="Count"
            fill="currentColor"
            onClick={(entry: any, index: number) => {
              const t = data?.[index]?.type ?? entry?.type;
              if (t) onBarClick?.(t);
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
