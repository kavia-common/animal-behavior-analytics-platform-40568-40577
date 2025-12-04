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
  /** Timeline with filter panel, scrollable bars, hover state, and video modal. */
  const location = useLocation();
  const [selected, setSelected] = useState<string[]>(behaviors);
  const [show, setShow] = useState<{open:boolean, src?: string, meta?: any}>({ open: false });

  const preset = (location.state as any)?.preset;

  const events = useMemo(() => {
    // mock events: 30 items
    return Array.from({ length: 30 }).map((_, i) => {
      const b = behaviors[i % behaviors.length];
      return {
        id: 'e' + i,
        behavior: b,
        start: i * 3,
        end: i * 3 + 2,
        src: '/assets/sample1.mp4'
      };
    }).filter(e => !preset?.behavior || e.behavior === preset.behavior);
  }, [preset]);

  const filtered = events.filter(e => selected.includes(e.behavior));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 12 }}>
      <div className="ui-card" style={{ padding: 14, height: 'fit-content', position: 'sticky', top: 12 }}>
        <h3 style={{ marginTop: 0 }}>Filters</h3>
        <div style={{ display:'grid', gap: 10 }}>
          <div>
            <label className="ui-label">Behaviors</label>
            <div style={{ display:'grid', gap: 8 }}>
              {behaviors.map(b => (
                <label key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <input type="checkbox" checked={selected.includes(b)} onChange={(e) => {
                    setSelected(s => e.target.checked ? [...s, b] : s.filter(x => x !== b));
                  }} />
                  <span style={{ width: 10, height: 10, background: behaviorColor[b], borderRadius: 2 }} />
                  {b}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="ui-label">Date Range</label>
            <input className="ui-input" type="date" />
          </div>
          <div>
            <label className="ui-label">Time Range</label>
            <input className="ui-input" placeholder="e.g., 08:00 - 12:00" />
          </div>
          <div>
            <label className="ui-label">Video Source</label>
            <select className="ui-select">
              <option>All Sources</option>
              <option>Camera-1</option>
              <option>Camera-2</option>
            </select>
          </div>
          <div>
            <label className="ui-label">Duration</label>
            <select className="ui-select">
              <option>Any</option>
              <option>Short (&lt; 5s)</option>
              <option>Medium (5-20s)</option>
              <option>Long (&gt; 20s)</option>
            </select>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button className="ui-btn ui-btn-outline" onClick={() => setSelected([])}>Clear all</button>
            <button className="ui-btn ui-btn-primary" onClick={() => setSelected(behaviors)}>Apply Filters</button>
          </div>
        </div>
      </div>

      <div className="ui-card" style={{ padding: 14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
          <div>
            <h3 style={{ margin: 0 }}>Timeline</h3>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Hover to preview, click to open video</div>
          </div>
          <div className="ui-badge">Vertical ruler | Scrollable</div>
        </div>
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ position: 'relative', minWidth: 900, padding: '16px 0' }}>
            {/* Vertical ruler */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 200, width: 1, background: 'var(--border)' }} />
            {/* Rows */}
            {filtered.map((e, idx) => (
              <div key={e.id} style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 180, fontSize: 12, color: 'var(--muted)' }}>{e.behavior}</div>
                <div style={{ position:'relative', height: 18, background: 'var(--table-header-bg)', borderRadius: 8, flex: 1 }}>
                  <div
                    title={`${e.behavior} @${e.start}s`}
                    onClick={() => setShow({ open: true, src: e.src, meta: e })}
                    style={{
                      position:'absolute',
                      left: 200 + e.start * 10,
                      width: Math.max(10, (e.end - e.start) * 10),
                      height: '100%',
                      background: behaviorColor[e.behavior],
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'opacity .15s',
                      opacity: 0.9,
                    }}
                    onMouseEnter={(ev) => { (ev.currentTarget as HTMLDivElement).style.opacity = '1'; (ev.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 4px var(--card-hover)'; }}
                    onMouseLeave={(ev) => { (ev.currentTarget as HTMLDivElement).style.opacity = '0.9'; (ev.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {show.open && (
        <VideoModal
          src={show.src!}
          meta={show.meta}
          onClose={() => setShow({ open: false })}
        />
      )}
    </div>
  );
}
