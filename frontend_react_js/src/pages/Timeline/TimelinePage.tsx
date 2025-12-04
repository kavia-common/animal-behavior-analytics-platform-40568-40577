import React, { useMemo, useState } from 'react';
import { getBehaviorColor } from '@/lib/behaviorPalette';

const ALL_BEHAVIORS = ['Pacing','Moving','Scratching','Recumbent','Non-Recumbent'];

// PUBLIC_INTERFACE
export default function TimelinePage() {
  /** Generic timeline page using theme variables and behavior color helper */
  const [selected, setSelected] = useState<string[]>(ALL_BEHAVIORS);

  const items = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const behavior = ALL_BEHAVIORS[i % ALL_BEHAVIORS.length];
      return { id: `e${i}`, behavior, start: i * 3, end: i * 3 + 2 };
    });
  }, []);

  const filtered = items.filter(e => selected.includes(e.behavior));

  return (
    <div className="bg-app" style={{ minHeight: '100vh', padding: 16, display: 'grid', gridTemplateColumns: '280px 1fr', gap: 12 }}>
      <aside className="card" style={{ padding: 14, height: 'fit-content', position: 'sticky', top: 12 }}>
        <div className="text-body" style={{ fontWeight: 700, marginBottom: 8 }}>Filters</div>
        <div style={{ display:'grid', gap: 10 }}>
          {ALL_BEHAVIORS.map(k => (
            <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <input type="checkbox" checked={selected.includes(k)} onChange={(e) => setSelected(s => e.target.checked ? [...s, k] : s.filter(x => x !== k))} />
              <span style={{ width: 10, height: 10, background: getBehaviorColor(k), borderRadius: 2 }} />
              {k}
            </label>
          ))}
        </div>
      </aside>

      <main className="card" style={{ padding: 14 }}>
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ position: 'relative', minWidth: 900, padding: '16px 0' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 200, width: 1, background: 'var(--border)' }} />
            {filtered.map(e => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div className="text-muted" style={{ width: 180, fontSize: 12 }}>{e.behavior}</div>
                <div style={{ position: 'relative', height: 18, background: 'var(--table-header-bg)', borderRadius: 8, flex: 1 }}>
                  <div
                    title={`${e.behavior} • ${e.start}s`}
                    style={{
                      position: 'absolute',
                      left: 200 + e.start * 8,
                      width: Math.max(10, (e.end - e.start) * 8),
                      height: '100%',
                      background: getBehaviorColor(e.behavior),
                      borderRadius: 8,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
