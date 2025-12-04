import React from 'react';
import { getBehaviorColor } from '@/lib/behaviorPalette';

type EventItem = {
  id: string;
  behavior: string;
  start: number; // seconds
  end: number;   // seconds
};

// PUBLIC_INTERFACE
export default function BehaviorTimeline({ items = [], onSelect }: { items?: EventItem[]; onSelect?: (e: EventItem) => void }) {
  /** Render a simple horizontal timeline with colored event bars */
  const minWidth = 900;

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
      <div style={{ position: 'relative', minWidth, padding: '12px 0' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 200, width: 1, background: 'var(--border)' }} />
        {items.map((e) => {
          const color = getBehaviorColor(e.behavior);
          return (
            <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div className="text-muted" style={{ width: 180, fontSize: 12 }}>{e.behavior}</div>
              <div style={{ position: 'relative', height: 18, background: 'var(--table-header-bg)', borderRadius: 8, flex: 1 }}>
                <div
                  title={`${e.behavior} • ${e.start}s`}
                  onClick={() => onSelect?.(e)}
                  style={{
                    position: 'absolute',
                    left: 200 + e.start * 8,
                    width: Math.max(10, (e.end - e.start) * 8),
                    height: '100%',
                    background: color,
                    borderRadius: 8,
                    cursor: 'pointer',
                    opacity: 0.9,
                    transition: 'opacity .15s',
                  }}
                  onMouseEnter={(ev) => { (ev.currentTarget as HTMLDivElement).style.opacity = '1'; (ev.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 4px var(--card-hover)'; }}
                  onMouseLeave={(ev) => { (ev.currentTarget as HTMLDivElement).style.opacity = '0.9'; (ev.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
