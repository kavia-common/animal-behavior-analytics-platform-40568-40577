import React from 'react';

// PUBLIC_INTERFACE
export default function DurationStackedBar({ onSegmentClick, data, keys }: { onSegmentClick?: (behavior: string, window: string) => void; data?: any[]; keys?: string[] }) {
  const segments = [
    { behavior: 'Pacing', value: 50, color: 'var(--primary)' },
    { behavior: 'Moving', value: 120, color: 'var(--primary-600)' },
    { behavior: 'Scratching', value: 35, color: 'var(--secondary)' },
    { behavior: 'Recumbent', value: 70, color: 'var(--muted)' },
    { behavior: 'Non-Recumbent', value: 95, color: '#3B82F6' },
  ];
  const total = segments.reduce((s, x) => s + x.value, 0);

  return (
    <div className="w-full h-10 flex overflow-hidden rounded border-default">
      {segments.map(seg => (
        <div
          key={seg.behavior}
          className="h-full cursor-pointer"
          style={{ width: `${(seg.value / total) * 100}%`, background: seg.color }}
          title={`${seg.behavior}: ${seg.value}s`}
          onClick={() => onSegmentClick?.(seg.behavior, 'last-1h')}
        />
      ))}
    </div>
  );
}
