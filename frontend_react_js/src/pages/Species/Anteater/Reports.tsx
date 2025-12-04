import React from 'react';

// PUBLIC_INTERFACE
export default function Reports() {
  /** Reports page with inputs and buttons styled per spec */
  return (
    <div className="bg-app" style={{ minHeight: '100vh', padding: 16 }}>
      <div className="card" style={{ padding: 16 }}>
        <div className="text-body" style={{ fontWeight: 700, marginBottom: 12 }}>Report Builder</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <select className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }}>
            <option>Summary</option>
            <option>Behavior Breakdown</option>
          </select>
          <select className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} multiple>
            <option>Pacing</option>
            <option>Moving</option>
            <option>Scratching</option>
            <option>Recumbent</option>
            <option>Non-Recumbent</option>
          </select>
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} type="date" />
          <select className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }}>
            <option>Bar</option>
            <option>Line</option>
            <option>Pie</option>
          </select>
        </div>
        <div style={{ display:'flex', gap: 10, marginTop: 16 }}>
          <button className="btn-secondary" style={{ borderRadius: 8, padding: '10px 12px' }}>PDF</button>
          <button className="btn-primary" style={{ background: 'var(--primary-600)', borderColor: 'var(--primary-600)', borderRadius: 8, padding: '10px 12px' }}>Excel</button>
          <button className="btn-primary" style={{ borderRadius: 8, padding: '10px 12px' }}>PowerPoint</button>
        </div>
      </div>
    </div>
  );
}
