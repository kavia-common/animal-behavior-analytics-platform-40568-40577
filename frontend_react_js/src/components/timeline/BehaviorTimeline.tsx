import React, { useMemo } from 'react';
import { getBehaviorColor, BEHAVIOR_KEYS, type BehaviorKey } from '@/lib/behaviorPalette';
import { minToTime } from '@/lib/format';

type Segment = {
  id: string;
  type: string;
  start: number; // minutes from 0..1440
  end: number;
  camera: string;
  confidence?: number;
};

type Props = {
  segments: Segment[];
  onSelect: (id: string) => void;
  zoomScale?: 'hour' | 'day' | 'week';
};

/**
 * PUBLIC_INTERFACE
 * BehaviorTimeline draws segments across a 24h grid with unique colors per behavior,
 * detailed hover tooltips, and basic zoom scaling support.
 */
export default function BehaviorTimeline({ segments, onSelect, zoomScale = 'day' }: Props) {
  /** Single consolidated row per requirements: show all segments under 'Camera 1' */
  const rows = useMemo(() => {
    return [['Camera 1', segments] as [string, Segment[]]];
  }, [segments]);

  // width denominator for x-scaling; day => 1440 mins, hour => 60 mins, week => 10080 mins
  const scaleDenominator = zoomScale === 'hour' ? 60 : zoomScale === 'week' ? 10080 : 1440;

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
              <div className="text-xs mb-1 text-secondaryText">Camera 1</div>
              <div className="relative h-8 rounded" style={{ backgroundColor: 'var(--color-primary-light)' }}>
                {segs.map(s => {
                  const leftPct = (s.start / scaleDenominator) * 100;
                  const widthPct = ((s.end - s.start) / scaleDenominator) * 100;
                  const startTime = minToTime(s.start);
                  const endTime = minToTime(s.end);
                  const duration = s.end - s.start;
                  const tooltip = [
                    `Behavior: ${s.type}`,
                    `Start: ${startTime}`,
                    `End: ${endTime}`,
                    `Duration: ${duration} min`,
                    `Confidence: ${s.confidence ?? '—'}`,
                    `Camera: ${s.camera}`
                  ].join('\n');

                  return (
                    <button
                      key={s.id}
                      title={tooltip}
                      className="absolute top-1 bottom-1 rounded shadow-soft hover:opacity-90 focus:outline-none focus:ring-2"
                      style={{
                        left: `${leftPct}%`,
                        width: `${Math.max(0.4, widthPct)}%`,
                        backgroundColor: getBehaviorColor((BEHAVIOR_KEYS as readonly BehaviorKey[]).includes(s.type as any) ? (s.type as BehaviorKey) : 'pacing'),
                        boxShadow: '0 1px 2px var(--color-card-shadow-rgba)',
                        outlineColor: 'var(--color-primary)',
                      }}
                      onClick={() => onSelect(s.id)}
                      aria-label={`${s.type} from ${startTime} to ${endTime} on ${s.camera}`}
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
