import React from 'react';

// PUBLIC_INTERFACE
export default function AnteaterAnalytics() {
  /** Analytics table and filters styled with theme variables */
  const rows = Array.from({ length: 12 }).map((_, i) => ({
    frame: i * 12,
    ts: new Date(Date.now() - i * 1000 * 60).toLocaleString(),
    animal: 'ANTEATER-001',
    label: ['Pacing','Moving','Scratching','Recumbent','Non-Recumbent'][i % 5],
    src: i % 2 ? 'Cam-1' : 'Cam-2',
    conf: (90 - i).toFixed(1) + '%',
    behavior: ['Pacing','Moving','Scratching','Recumbent','Non-Recumbent'][i % 5],
  }));

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div className="ui-card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
          <div style={{ fontWeight: 700, color: 'var(--text)' }}>Smart Filters</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="ui-btn ui-btn-outline">Clear All</button>
            <button className="ui-btn ui-btn-primary">Export CSV</button>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12, marginTop: 12 }}>
          <input className="ui-input" placeholder="Search by label..." />
          <select className="ui-select">
            <option>Any Source</option>
            <option>Cam-1</option>
            <option>Cam-2</option>
          </select>
          <select className="ui-select">
            <option>Any Behavior</option>
            <option>Pacing</option>
            <option>Moving</option>
            <option>Scratching</option>
            <option>Recumbent</option>
            <option>Non-Recumbent</option>
          </select>
          <input className="ui-input" placeholder="Date Range" />
        </div>
      </div>

      <div className="ui-card" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Frame Time</th>
              <th>Timestamp</th>
              <th>Animal ID</th>
              <th>Label</th>
              <th>Video Source</th>
              <th>Confidence %</th>
              <th>Behavior</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.frame}</td>
                <td>{r.ts}</td>
                <td>{r.animal}</td>
                <td>{r.label}</td>
                <td>{r.src}</td>
                <td>{r.conf}</td>
                <td>{r.behavior}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
