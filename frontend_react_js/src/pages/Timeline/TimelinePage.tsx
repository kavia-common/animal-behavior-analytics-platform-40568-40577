import React, { useMemo, useState } from 'react';
import { BEHAVIOR_COLORS, BEHAVIOR_KEYS, BEHAVIOR_LABELS, BehaviorKey } from '@/lib/behaviorPalette';

type EventRow = {
  id: string;
  timestamp: string;
  behavior: BehaviorKey;
  duration: number;
};

const mockRows: EventRow[] = [
  { id: 'e1', timestamp: '2025-12-03T10:05:00Z', behavior: 'pacing', duration: 45 },
  { id: 'e2', timestamp: '2025-12-03T10:12:00Z', behavior: 'foraging', duration: 120 },
  { id: 'e3', timestamp: '2025-12-03T10:30:00Z', behavior: 'recumbent', duration: 300 },
  { id: 'e4', timestamp: '2025-12-03T11:05:00Z', behavior: 'scratching', duration: 60 },
  { id: 'e5', timestamp: '2025-12-03T11:30:00Z', behavior: 'self_directed', duration: 30 },
];

const TimelinePage: React.FC = () => {
  const [selectedBehavior, setSelectedBehavior] = useState<BehaviorKey | 'all'>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const rows = useMemo(
    () => mockRows.filter((r) => (selectedBehavior === 'all' ? true : r.behavior === selectedBehavior)),
    [selectedBehavior]
  );

  return (
    <div className="page-container space-y-6">
      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-sm text-neutralMid mb-1">Date Range</label>
            <input
              type="date"
              className="border px-3 py-2"
              style={{ borderColor: 'var(--color-border)', borderRadius: 'var(--radius-input)' }}
            />
          </div>
          <div>
            <label className="block text-sm text-neutralMid mb-1">Behaviour</label>
            <div className="flex gap-2 flex-wrap">
              <button
                className={`pill ${selectedBehavior === 'all' ? 'sidebar-active' : ''}`}
                onClick={() => setSelectedBehavior('all')}
              >
                All
              </button>
              {BEHAVIOR_KEYS.map((k) => (
                <button
                  key={k}
                  className="pill"
                  style={{
                    borderColor: BEHAVIOR_COLORS[k],
                    color: BEHAVIOR_COLORS[k],
                    background: selectedBehavior === k ? 'var(--color-sidebar-active-bg)' : '#fff',
                  }}
                  onClick={() => setSelectedBehavior(k)}
                >
                  {BEHAVIOR_LABELS[k]}
                </button>
              ))}
            </div>
          </div>
          <div className="ml-auto">
            <label className="block text-sm text-neutralMid mb-1">Animal</label>
            <button
              className="pill"
              style={{
                background: 'var(--color-accent)',
                color: '#fff',
                borderColor: 'var(--color-primary)',
              }}
            >
              Animal Filter
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header px-4 py-2 font-medium">Events</div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm" style={{ background: 'var(--color-table-header-bg)' }}>
                <th className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  Timestamp
                </th>
                <th className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  Behaviour
                </th>
                <th className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="cursor-pointer row-hover"
                  onClick={() => setOpenId(r.id)}
                >
                  <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    {new Date(r.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <span
                      className="pill"
                      style={{
                        borderColor: BEHAVIOR_COLORS[r.behavior],
                        color: BEHAVIOR_COLORS[r.behavior],
                        background: '#fff',
                      }}
                    >
                      {BEHAVIOR_LABELS[r.behavior]}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    {Math.round(r.duration / 60)} mins
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {openId && (
          <div className="fixed inset-0 bg-black/20 flex items-end sm:items-center justify-center p-4" onClick={() => setOpenId(null)}>
            <div
              className="bg-white w-full sm:w-[520px]"
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-elevation)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-3 font-semibold border-b" style={{ borderColor: 'var(--color-border)' }}>
                Event details
              </div>
              <div className="p-4">
                {(() => {
                  const item = mockRows.find((m) => m.id === openId)!;
                  return (
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-neutralMid">Timestamp: </span>
                        <span className="font-medium">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-sm text-neutralMid">Behaviour: </span>
                        <span
                          className="pill"
                          style={{
                            borderColor: BEHAVIOR_COLORS[item.behavior],
                            color: BEHAVIOR_COLORS[item.behavior],
                          }}
                        >
                          {BEHAVIOR_LABELS[item.behavior]}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-neutralMid">Duration: </span>
                        <span className="font-medium">{Math.round(item.duration / 60)} mins</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="px-4 py-3 border-t flex justify-end" style={{ borderColor: 'var(--color-border)' }}>
                <button
                  className="px-4 py-2"
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-button)',
                  }}
                  onClick={() => setOpenId(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelinePage;
