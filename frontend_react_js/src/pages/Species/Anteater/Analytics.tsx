import React from 'react';

// PUBLIC_INTERFACE
export default function Analytics() {
  /** Analytics dashboard with Smart Filters and data table styled per theme */
  const rows = [
    { frame: '00:00:12.032', ts: '2025-01-01T12:00:12Z', id: 'A-001', label: 'Animal', src: 'Cam-A', conf: 0.91, behavior: 'Pacing' },
  ];
  return (
    <div className="bg-app" style={{ minHeight: '100vh', padding: 16 }}>
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div className="text-body" style={{ fontWeight: 700, marginBottom: 12 }}>Smart Filters</div>
        <div style={{ display:'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 12 }}>
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Start Date" type="date" />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="End Date" type="date" />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Label" />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Behavior" />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Video Source" />
        </div>
        <div style={{ display:'flex', gap: 10, marginTop: 16 }}>
          <button className="btn-primary" style={{ background:'transparent', color:'var(--primary)', borderColor:'var(--primary)', borderWidth:1, borderStyle:'solid', borderRadius:8, padding:'10px 12px' }}>Clear All</button>
          <button className="btn-primary" style={{ borderRadius: 8, padding: '10px 12px' }}>Export CSV</button>
        </div>
      </div>

      <div className="card" style={{ overflowX:'auto' }}>
        <table className="table" style={{ width:'100%' }}>
          <thead>
            <tr>
              <th>Frame Time</th>
              <th>Timestamp</th>
              <th>Animal ID</th>
              <th>Label</th>
              <th>Video Source</th>
              <th>Confidence</th>
              <th>Behavior</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} className="bg-surface">
                <td className="p-2">{r.frame}</td>
                <td className="p-2">{r.ts}</td>
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.label}</td>
                <td className="p-2">{r.src}</td>
                <td className="p-2">{r.conf}</td>
                <td className="p-2">{r.behavior}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
