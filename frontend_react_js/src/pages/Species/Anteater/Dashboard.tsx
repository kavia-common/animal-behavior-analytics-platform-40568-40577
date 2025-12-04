import React from 'react';
import { useNavigate } from 'react-router-dom';

const behaviorColors: Record<string,string> = {
  'Pacing': 'var(--primary)',
  'Moving': 'var(--primary-600)',
  'Scratching': 'var(--secondary)',
  'Recumbent': 'var(--muted)',
  'Non-Recumbent': '#3B82F6',
};

// PUBLIC_INTERFACE
export default function AnteaterDashboard() {
  /** Dashboard page with header, filters, and chart stubs using theme variables */
  const nav = useNavigate();

  const gotoTimeline = (preset: Record<string, any>) => {
    nav('/species/anteater/timeline', { state: { preset } });
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div className="ui-card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <h2 style={{ margin: 0 }}>Giant Anteater</h2>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>Last Updated: {new Date().toLocaleString()}</div>
          </div>
          <span className="ui-badge">ID: ANTEATER-001</span>
        </div>
      </div>

      <div className="ui-card" style={{ padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 12 }}>
          <div>
            <label className="ui-label">Date Range</label>
            <input className="ui-input" type="date" />
          </div>
          <div>
            <label className="ui-label">Behavior Filter</label>
            <select className="ui-select">
              <option>All</option>
              <option>Pacing</option>
              <option>Moving</option>
              <option>Scratching</option>
              <option>Recumbent</option>
              <option>Non-Recumbent</option>
            </select>
          </div>
          <div>
            <label className="ui-label">Time Window</label>
            <select className="ui-select">
              <option>All day</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>
          <div>
            <label className="ui-label">Location/Camera</label>
            <select className="ui-select">
              <option>All Cameras</option>
              <option>Cam-1 East</option>
              <option>Cam-2 North</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button className="ui-btn ui-btn-outline" style={{ width: '100%' }}>Export</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <ChartCard title="Behavior Count (Bar)" onClick={() => gotoTimeline({ behavior: 'Pacing' })}>
          <Legend />
          <BarStub />
        </ChartCard>
        <ChartCard title="Behavior Duration (Stacked Bar)" onClick={() => gotoTimeline({ behavior: 'Moving', time: 'Morning' })}>
          <Legend />
          <StackedBarStub />
        </ChartCard>
        <ChartCard title="Event Frequency (Line/Column)" onClick={() => gotoTimeline({ hourRange: [10,14] })}>
          <Legend />
          <LineStub />
        </ChartCard>
        <ChartCard title="Behavior Distribution (Pie)" onClick={() => gotoTimeline({ distribution: true })}>
          <Legend />
          <PieStub />
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, children, onClick }: { title: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <div className="ui-card ui-card-hover" style={{ padding: 16, cursor: 'pointer' }} onClick={onClick}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 8 }}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <span className="ui-badge">Click to drill into Timeline</span>
      </div>
      {children}
    </div>
  );
}

function Legend() {
  const items = Object.entries(behaviorColors);
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap: 8, marginBottom: 10 }}>
      {items.map(([k, c]) => (
        <span key={k} className="ui-badge" style={{ borderColor: c, color: c, background: 'transparent' }}>{k}</span>
      ))}
    </div>
  );
}

function BarStub() {
  return <div style={{ height: 160, borderRadius: 8, background: 'var(--table-header-bg)' }} />;
}
function StackedBarStub() {
  return <div style={{ height: 160, borderRadius: 8, background: 'var(--table-header-bg)' }} />;
}
function LineStub() {
  return <div style={{ height: 160, borderRadius: 8, background: 'var(--table-header-bg)' }} />;
}
function PieStub() {
  return <div style={{ height: 160, borderRadius: 8, background: 'var(--table-header-bg)' }} />;
}
