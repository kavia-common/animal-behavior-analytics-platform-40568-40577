import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VideoModal from './components/VideoModal';

const behaviors = ['Pacing','Moving','Scratching','Recumbent','Non-Recumbent'];
const behaviorColor: Record<string,string> = {
  'Pacing': 'var(--primary)',
  'Moving': 'var(--primary-600)',
  'Scratching': 'var(--secondary)',
  'Recumbent': 'var(--muted)',
  'Non-Recumbent': '#3B82F6',
};

// PUBLIC_INTERFACE
export default function AnteaterTimeline() {
  /** Timeline with left filter panel and scrollable bars; clicking opens modal */
  const location = useLocation();
  const [selected, setSelected] = useState<string[]>(behaviors);
  const [open, setOpen] = useState<{show:boolean, src?: string, meta?: any}>({ show: false });

  const preset = (location.state as any)?.preset;

  const events = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const b = behaviors[i % behaviors.length];
      return {
        id: 'e' + i, behavior: b,
        start: i * 2, end: i * 2 + 2,
        src: '/assets/video/sample1.mp4'
      };
    }).filter(e => !preset?.behavior || e.behavior === preset.behavior);
  }, [preset]);

  const filtered = events.filter(e => selected.includes(e.behavior));

  return (
    <div className="bg-app" style={{ minHeight: '100vh', padding: 16, display: 'grid', gridTemplateColumns: '280px 1fr', gap: 12 }}>
      <aside className="card" style={{ padding: 14, height: 'fit-content', position: 'sticky', top: 12 }}>
        <div className="text-body" style={{ fontWeight: 700, marginBottom: 8 }}>Filters</div>
        <div style={{ display:'grid', gap: 10 }}>
          <div>
            <div className="text-muted" style={{ fontSize: 12, marginBottom: 6 }}>Behaviors</div>
            <div style={{ display:'grid', gap: 8 }}>
              {behaviors.map(b => (
                <label key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <input type="checkbox" checked={selected.includes(b)} onChange={(e) => setSelected(s => e.target.checked ? [...s, b] : s.filter(x => x !== b))} />
                  <span style={{ width: 10, height: 10, background: behaviorColor[b], borderRadius: 2 }} />
                  {b}
                </label>
              ))}
            </div>
          </div>
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} type="date" />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} type="time" />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Camera/Location" />
          <button className="btn-primary" style={{ borderRadius: 8, padding: '10px 12px' }}>Apply</button>
        </div>
      </aside>

      <main className="card" style={{ padding: 14 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 8 }}>
          <div>
            <div className="text-body" style={{ fontWeight: 700 }}>Timeline</div>
            <div className="text-muted" style={{ fontSize: 12 }}>Hover highlights; click to open video</div>
          </div>
          <span className="text-muted" style={{ fontSize: 12 }}>Vertical ruler • Horizontal scroll</span>
        </div>
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ position:'relative', minWidth: 900, padding: '16px 0' }}>
            <div style={{ position:'absolute', top:0, bottom:0, left:200, width:1, background: 'var(--border)' }} />
            {filtered.map((e) => (
              <div key={e.id} style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 10 }}>
                <div className="text-muted" style={{ width: 180, fontSize: 12 }}>{e.behavior}</div>
                <div style={{ position:'relative', height: 18, background: 'var(--table-header-bg)', borderRadius: 8, flex: 1 }}>
                  <div
                    title={`${e.behavior} • ${e.start}s`}
                    onClick={() => setOpen({ show: true, src: e.src, meta: e })}
                    style={{ position:'absolute', left: 200 + e.start * 8, width: Math.max(10, (e.end - e.start) * 8), height: '100%', background: behaviorColor[e.behavior], borderRadius: 8, cursor: 'pointer', opacity: 0.9, transition: 'opacity .15s' }}
                    onMouseEnter={(ev) => { (ev.currentTarget as HTMLDivElement).style.opacity = '1'; (ev.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 4px var(--card-hover)'; }}
                    onMouseLeave={(ev) => { (ev.currentTarget as HTMLDivElement).style.opacity = '0.9'; (ev.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {open.show && <VideoModal src={open.src!} meta={open.meta} onClose={() => setOpen({ show: false })} />}
    </div>
  );
}
