import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BehaviorCountBarChart from '../../../components/charts/BehaviorCountBarChart';
import DurationStackedBar from '../../../components/charts/DurationStackedBar';
import DurationPieChart from '../../../components/charts/DurationPieChart';
import TrendLineChart from '../../../components/charts/TrendLineChart';
import BehaviorHeatmap from '../../../components/charts/BehaviorHeatmap';

// PUBLIC_INTERFACE
export default function AnteaterDashboard() {
  /** Spec-compliant dashboard with header, tabs, charts, floating chat */
  const navigate = useNavigate();
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);

  const Tab = ({ to, label }: { to: string; label: string }) => {
    const active = location.pathname === to;
    return <Link to={to} className={active ? 'tab-active' : 'text-muted'} style={{ padding: '10px 12px' }}>{label}</Link>;
  };

  // Sample datasets (deterministic)
  const stackedData = [{ name: 'Today', pacing: 50, moving: 120, scratching: 35, recumbent: 70, non_recumbent: 95 }];
  const eventsByHour = Array.from({ length: 24 }).map((_, h) => ({ hour: String(h).padStart(2,'0') + ':00', count: [5,6,8,12,10,9,7,6,5,4,6,7][h % 12] }));

  return (
    <div className="bg-app" style={{ minHeight: '100vh', padding: 16 }}>
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <h2 className="text-body" style={{ margin: 0 }}>Giant Anteater</h2>
            <div className="text-muted" style={{ fontSize: 12 }}>Age 7 • Enclosure A</div>
          </div>
          <nav style={{ display:'flex', gap: 16, borderBottom: '1px solid var(--border)' }}>
            <Tab to="/species/anteater/dashboard" label="Dashboard" />
            <Tab to="/species/anteater/timeline" label="Timeline" />
            <Tab to="/species/anteater/reports" label="Reports" />
            <Tab to="/species/anteater/analytics" label="Analytics" />
            <Link to="/select-species" className="text-muted" style={{ padding: '10px 12px' }}>Animals</Link>
          </nav>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="card" style={{ padding: 16 }}>
          <h3 className="text-body" style={{ marginTop: 0 }}>Behavior Count</h3>
          <BehaviorCountBarChart />
        </div>
        <div className="card" style={{ padding: 16 }}>
          <h3 className="text-body" style={{ marginTop: 0 }}>Event Frequency</h3>
          <TrendLineChart data={eventsByHour} xKey="hour" yKey="count" />
        </div>
        <div className="card" style={{ padding: 16 }}>
          <h3 className="text-body" style={{ marginTop: 0 }}>Behavior Duration (Stacked)</h3>
          <DurationStackedBar data={stackedData} keys={['pacing','moving','scratching','recumbent','non_recumbent']} />
        </div>
        <div className="card" style={{ padding: 16 }}>
          <h3 className="text-body" style={{ marginTop: 0 }}>Behavior Distribution</h3>
          <DurationPieChart />
        </div>
        <div className="card" style={{ padding: 16, gridColumn: '1 / -1' }}>
          <h3 className="text-body" style={{ marginTop: 0 }}>Daily 24-Hour Heatmap</h3>
          <BehaviorHeatmap onCellClick={(b, ts) => navigate(`/species/anteater/timeline`, { state: { preset: { behavior: b, hour: ts } } })} />
        </div>
      </div>

      <button className="fab" title="Open VizAi Assistant" onClick={() => setChatOpen(o => !o)}>AI</button>
      {chatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div>VizAi Assistant</div>
            <button onClick={() => setChatOpen(false)} className="text-muted">✕</button>
          </div>
          <div className="chat-body">
            <div className="msg-user">Show pacing over last day</div>
            <div className="msg-bot">Pacing increased 12% vs baseline.</div>
          </div>
        </div>
      )}
    </div>
  );
}
