import React from 'react';

type Props = {
  onBarClick?: (behavior: string) => void;
  behaviors?: string[]; // unused in sample mode, kept for compatibility to avoid TS errors
};

// PUBLIC_INTERFACE
export default function BehaviorCountBarChart({ onBarClick }: Props) {
  const data = [
    { behavior: 'Pacing', count: 12, color: 'var(--primary)', ts: '2025-01-01T10:00:00Z' },
    { behavior: 'Moving', count: 25, color: 'var(--primary-600)', ts: '2025-01-01T11:00:00Z' },
    { behavior: 'Scratching', count: 8, color: 'var(--secondary)', ts: '2025-01-01T12:00:00Z' },
    { behavior: 'Recumbent', count: 15, color: 'var(--muted)', ts: '2025-01-01T13:00:00Z' },
    { behavior: 'Non-Recumbent', count: 20, color: '#3B82F6', ts: '2025-01-01T14:00:00Z' },
  ];

  return (
    <div className="w-full">
      <div style={{ display:'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12, alignItems:'end', height: 160 }}>
        {data.map(s => (
          <div key={s.behavior} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: 6 }}>
            <div
              onClick={() => onBarClick?.(s.behavior)}
              title={`${s.behavior}\nCount: ${s.count}\nTimestamp: ${s.ts}`}
              style={{ width: '100%', height: s.count * 5, background: s.color, borderRadius: 6, cursor: 'pointer' }}
            />
            <div style={{ fontSize: 12 }} className="text-muted">{s.behavior}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
