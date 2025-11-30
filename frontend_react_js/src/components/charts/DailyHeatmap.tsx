import React from 'react';
import { colorScale } from '@/lib/colorScale';

type Props = { data: number[]; labels?: string[] };

/**
 * PUBLIC_INTERFACE
 * DailyHeatmap shows a 24h heatmap grid with hover tooltips (hour, count, confidence%).
 */
export default function DailyHeatmap({ data, labels }: Props) {
  /** 24h heatmap grid with enhanced tooltips */
  const max = Math.max(1, ...data);
  return (
    <div>
      <div className="grid grid-cols-24 gap-1">
        {data.map((v, i) => {
          const pct = Math.round((v / max) * 100);
          const confidence = Math.min(100, Math.max(0, 50 + Math.round(pct / 2))); // mock confidence from intensity
          const hourLabel = `${labels?.[i] ?? i}:00`;
          return (
            <div
              key={i}
              className="h-6 rounded"
              title={`${hourLabel}\nEvents: ${v}\nConfidence: ${confidence}%`}
              style={{ backgroundColor: colorScale(v / max) }}
              aria-label={`${hourLabel}, ${v} events, ${confidence} percent confidence`}
            />
          );
        })}
      </div>
      <div className="mt-1 grid grid-cols-24 text-[10px] text-neutral-600">
        {Array.from({ length: 24 }).map((_, i) => <div key={i} className="text-center">{i}</div>)}
      </div>
    </div>
  );
}
