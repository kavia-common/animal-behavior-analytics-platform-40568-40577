import React, { useMemo } from 'react';
import { colorScale } from '@/lib/colorScale';

type Segment = {
  id: string;
  type: string;
  start: number; // minutes from 0..1440
  end: number;
  camera: string;
};

type Props = {
  segments: Segment[];
  onSelect: (id: string) => void;
};

// PUBLIC_INTERFACE
export default function BehaviorTimeline({ segments, onSelect }: Props) {
  /** Horizontal timeline with segments across 24h */
  const rows = useMemo(() => {
    const byCam: Record<string, Segment[]> = {};
    segments.forEach(s => {
      byCam[s.camera] = byCam[s.camera] || [];
      byCam[s.camera].push(s);
    });
    return Object.entries(byCam);
  }, [segments]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-25 gap-1 text-[10px] text-neutral-600 mb-1">
          <div />
          {Array.from({ length: 24 }).map((_, i) => <div key={i} className="text-center">{i}</div>)}
        </div>
        <div className="space-y-2">
          {rows.map(([camera, segs]) => (
            <div key={camera}>
              <div className="text-xs mb-1">{camera}</div>
              <div className="relative h-8 bg-neutral-100 rounded">
                {segs.map(s => {
                  const left = `${(s.start / 1440) * 100}%`;
                  const width = `${((s.end - s.start) / 1440) * 100}%`;
                  return (
                    <button
                      key={s.id}
                      title={`${s.type} ${s.start}-${s.end}`}
                      className="absolute top-1 bottom-1 rounded shadow-soft"
                      style={{ left, width, backgroundColor: colorScale((s.end - s.start) / 120) }}
                      onClick={() => onSelect(s.id)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
