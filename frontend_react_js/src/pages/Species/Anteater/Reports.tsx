import React from 'react';

// PUBLIC_INTERFACE
export default function AnteaterReports() {
  /** Reports builder stub with themed buttons for export types */
  return (
    <div className="ui-card" style={{ padding: 16 }}>
      <h3 style={{ marginTop: 0 }}>Reports</h3>
      <div style={{ display:'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
        <div>
          <label className="ui-label">Report Type</label>
          <select className="ui-select">
            <option>Summary</option>
            <option>Behavior Breakdown</option>
            <option>Daily Trends</option>
          </select>
        </div>
        <div>
          <label className="ui-label">Date Range</label>
          <input className="ui-input" type="date" />
        </div>
        <div>
          <label className="ui-label">Behaviors</label>
          <select className="ui-select" multiple>
            <option>Pacing</option>
            <option>Moving</option>
            <option>Scratching</option>
            <option>Recumbent</option>
            <option>Non-Recumbent</option>
          </select>
        </div>
        <div>
          <label className="ui-label">Output format</label>
          <select className="ui-select">
            <option>PDF</option>
            <option>Excel</option>
            <option>PowerPoint</option>
          </select>
        </div>
      </div>
      <div style={{ display:'flex', gap: 10, marginTop: 16 }}>
        <button className="ui-btn" style={{ background: 'var(--secondary)', color: '#fff' }}>Export PDF</button>
        <button className="ui-btn" style={{ background: 'var(--primary-600)', color: '#fff' }}>Export Excel</button>
        <button className="ui-btn" style={{ background: 'var(--primary)', color: '#fff' }}>Export PowerPoint</button>
      </div>
    </div>
  );
}
