import React from 'react';
import { colorScale } from '@/lib/colorScale';

type Props = { data: number[]; labels?: string[] };

// PUBLIC_INTERFACE
export default function DailyHeatmap({ data, labels }: Props) {
  /** 24h heatmap grid with tooltips */
  const max = Math.max(1, ...data);
  return (
    <div>
      <div className="grid grid-cols-24 gap-1">
        {data.map((v, i) => (
          <div
            key={i}
            className="h-6 rounded"
            title={`${labels?.[i] ?? i}:00 - ${v} events`}
            style={{ backgroundColor: colorScale(v / max) }}
          />
        ))}
      </div>
      <div className="mt-1 grid grid-cols-24 text-[10px] text-neutral-600">
        {Array.from({ length: 24 }).map((_, i) => <div key={i} className="text-center">{i}</div>)}
      </div>
    </div>
  );
}
