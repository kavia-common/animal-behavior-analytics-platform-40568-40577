import React, { useMemo, useState } from 'react';
import BehaviorCountBarChart from '@/components/charts/BehaviorCountBarChart';
import DurationPieChart from '@/components/charts/DurationPieChart';
import { BEHAVIOR_LABELS, type BehaviorKey, BEHAVIOR_COLORS } from '@/lib/behaviorPalette';

// PUBLIC_INTERFACE
export default function ReportsPage() {
  /** Reports builder page with preview charts using theme palette */
  const behaviorKeys: BehaviorKey[] = ['pacing','moving','scratching','recumbent','non_recumbent'];
  const [selected, setSelected] = useState<BehaviorKey[]>(behaviorKeys);

  const labelFor = (k: BehaviorKey) => BEHAVIOR_LABELS[k];

  const barPreviewData = useMemo(
    () => selected.map((k, i) => ({ label: labelFor(k), value: [12,25,8,15,20][i % 5] })),
    [selected]
  );

  const onToggle = (k: BehaviorKey) => {
    setSelected((s) => (s.includes(k) ? s.filter(x => x !== k) : [...s, k]));
  };

  return (
    <div className="bg-app" style={{ minHeight: '100vh', padding: 16 }}>
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div className="text-body" style={{ fontWeight: 700, marginBottom: 12 }}>Report Builder</div>
        <div style={{ display:'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 12 }}>
          <select className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }}>
            <option>Summary</option>
            <option>Behavior Breakdown</option>
          </select>
          <div className="border-default bg-surface" style={{ padding: 10, borderRadius: 8 }}>
            <div className="text-muted" style={{ fontSize: 12, marginBottom: 6 }}>Behaviors</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2, minmax(0,1fr))', gap: 6 }}>
              {behaviorKeys.map((k) => (
                <label key={k} style={{ display:'flex', alignItems:'center', gap: 8, fontSize: 13 }}>
                  <input type="checkbox" checked={selected.includes(k)} onChange={() => onToggle(k)} />
                  <span style={{ width: 10, height: 10, background: BEHAVIOR_COLORS[k], borderRadius: 2 }} />
                  {BEHAVIOR_LABELS[k]}
                </label>
              ))}
            </div>
          </div>
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} type="date" />
          <select className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }}>
            <option>Bar</option>
            <option>Line</option>
            <option>Pie</option>
          </select>
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div className="text-body" style={{ fontWeight: 700, marginBottom: 8 }}>Preview</div>
        <div style={{ display:'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <h4 className="text-body" style={{ margin: '4px 0 8px' }}>Behavior Count</h4>
            <BehaviorCountBarChart
              data={[
                { id: 'pacing', label: 'Pacing', count: 12, color: 'var(--primary)' },
                { id: 'moving', label: 'Moving', count: 25, color: 'var(--primary-600)' },
                { id: 'scratching', label: 'Scratching', count: 8, color: 'var(--secondary)' },
                { id: 'recumbent', label: 'Recumbent', count: 15, color: 'var(--muted)' },
                { id: 'non_recumbent', label: 'Non-Recumbent', count: 20, color: '#3B82F6' },
              ]}
            />
          </div>
          <div>
            <h4 className="text-body" style={{ margin: '4px 0 8px' }}>Behavior Distribution</h4>
            <DurationPieChart
              data={[
                { id: 'pacing', label: 'Pacing', value: 50, color: 'var(--primary)' },
                { id: 'moving', label: 'Moving', value: 120, color: 'var(--primary-600)' },
                { id: 'scratching', label: 'Scratching', value: 35, color: 'var(--secondary)' },
                { id: 'recumbent', label: 'Recumbent', value: 70, color: 'var(--muted)' },
                { id: 'non_recumbent', label: 'Non-Recumbent', value: 95, color: '#3B82F6' },
              ]}
            />
          </div>
        </div>
        <div className="text-muted" style={{ fontSize: 12, marginTop: 10 }}>
          Selected: {selected.map(k => BEHAVIOR_LABELS[k]).join(', ') || 'None'}
        </div>
      </div>
    </div>
  );
}
