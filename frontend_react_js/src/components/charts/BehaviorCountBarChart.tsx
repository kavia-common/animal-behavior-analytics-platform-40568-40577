import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { getBehaviorColor } from '@/lib/behaviorPalette';
import { EXACT_BEHAVIORS, type BehaviorId } from '@/lib/behaviors';

type Props = {
  data: { type: string; count: number }[];
  onBarClick?: (type: string) => void;
};

/**
 * PUBLIC_INTERFACE
 * BehaviorCountBarChart with interactive legend to toggle visibility per behavior type.
 * Renders exactly the five allowed behaviors, in fixed order, with strict palette.
 */
export default function BehaviorCountBarChart({ data, onBarClick }: Props) {
  /** Vertical bar chart for behavior counts, with legend toggles */
  const [hidden, setHidden] = useState<Record<BehaviorId, boolean>>({
    Pacing: false,
    Recumbent: false,
    Scratching: false,
    'Self-directed': false,
    Foraging: false,
  });

  // Normalize incoming data to the five-behavior shape and order
  const normalized = useMemo(() => {
    const map = new Map<string, number>();
    (data ?? []).forEach((d) => {
      if ((EXACT_BEHAVIORS as string[]).includes(d.type)) {
        map.set(d.type, (map.get(d.type) || 0) + (d.count || 0));
      }
    });
    return (EXACT_BEHAVIORS as BehaviorId[]).map((b) => ({ type: b, count: map.get(b) || 0 }));
  }, [data]);

  const visibleData = useMemo(() => {
    return normalized.map((d) => ({
      ...d,
      count: hidden[d.type as BehaviorId] ? 0 : d.count,
    }));
  }, [normalized, hidden]);

  const toggleType = (t: BehaviorId) => setHidden((h) => ({ ...h, [t]: !h[t] }));

  return (
    <div className="w-full h-72">
      <div className="flex flex-wrap gap-2 mb-2">
        {(EXACT_BEHAVIORS as BehaviorId[]).map((b) => {
          const isHidden = !!hidden[b];
          return (
            <button
              key={b}
              onClick={() => toggleType(b)}
              className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${isHidden ? 'opacity-50' : ''}`}
              style={{ borderColor: 'var(--color-border)' }}
              title={`${isHidden ? 'Show' : 'Hide'} ${b}`}
            >
              <span
                aria-hidden
                className="inline-block w-2.5 h-2.5 rounded"
                style={{ backgroundColor: getBehaviorColor(b) }}
              />
              {b}
            </button>
          );
        })}
      </div>
      <ResponsiveContainer>
        <BarChart data={visibleData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar
            dataKey="count"
            name="Count"
            onClick={(entry: any, index: number) => {
              const t = visibleData?.[index]?.type ?? entry?.type;
              if (t) onBarClick?.(t);
            }}
          >
            {visibleData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={getBehaviorColor(entry.type)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
