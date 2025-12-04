import React from 'react';

type Props = {
  onSliceClick?: (behavior: string) => void;
  behaviors?: string[]; // compatibility prop to satisfy callers
};

// PUBLIC_INTERFACE
export default function DurationPieChart({ onSliceClick }: Props) {
  const data = [
    { behavior: 'Pacing', value: 50, color: 'var(--primary)' },
    { behavior: 'Moving', value: 120, color: 'var(--primary-600)' },
    { behavior: 'Scratching', value: 35, color: 'var(--secondary)' },
    { behavior: 'Recumbent', value: 70, color: 'var(--muted)' },
    { behavior: 'Non-Recumbent', value: 95, color: '#3B82F6' },
  ];
  const total = data.reduce((s, x) => s + x.value, 0);

  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-2">
          {data.map(d => (
            <div key={d.behavior} className="flex items-center gap-2 cursor-pointer" onClick={()=>onSliceClick?.(d.behavior)}>
              <span className="inline-block w-3 h-3 rounded" style={{ background: d.color }} />
              <span className="text-sm">{d.behavior} ({Math.round((d.value/total)*100)}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
