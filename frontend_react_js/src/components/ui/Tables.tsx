import React, { useMemo, useState } from "react";
import Badge from "./Badge";

// PUBLIC_INTERFACE
export function VideoLibraryTable() {
  const rows = [
    { name: "Enclosure-12_2024-08-05_1200.mp4", dt: "2024-08-05 12:00", progress: 100, status: "Completed" },
    { name: "Enclosure-12_2024-08-05_1300.mp4", dt: "2024-08-05 13:00", progress: 54, status: "Processing" },
    { name: "Enclosure-12_2024-08-05_1400.mp4", dt: "2024-08-05 14:00", progress: 0, status: "Pending" },
  ];
  return (
    <div className="ui-card p-5">
      <div className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Video Library</div>
      <table className="w-full text-sm">
        <thead style={{ background: "var(--table-header-bg)" }}>
          <tr style={{ color: "var(--muted)" }}>
            <th className="text-left py-2 px-2">Video Name</th>
            <th className="text-left py-2 px-2">Date & Time</th>
            <th className="text-left py-2 px-2">Upload Progress</th>
            <th className="text-left py-2 px-2">Detecting Behaviors</th>
            <th className="text-left py-2 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t" style={{ borderColor: "var(--border)" }}>
              <td className="py-2 px-2">{r.name}</td>
              <td className="py-2 px-2">{r.dt}</td>
              <td className="py-2 px-2">
                <div className="h-2 rounded" style={{ background: "var(--table-row-hover)" }}>
                  <div className="h-full rounded" style={{ width: `${r.progress}%`, background: "var(--primary)" }} />
                </div>
              </td>
              <td className="py-2 px-2">
                {r.status === "Completed" ? (
                  <Badge>Completed</Badge>
                ) : r.status === "Processing" ? (
                  <Badge>Processing</Badge>
                ) : (
                  <Badge tone="secondary">Pending</Badge>
                )}
              </td>
              <td className="py-2 px-2">
                <div className="flex gap-2">
                  <button className="px-2 py-1 rounded text-white" style={{ background: "var(--primary)" }} title="View">👁</button>
                  <button className="px-2 py-1 rounded text-white" style={{ background: "var(--primary-600)" }} title="Download">⬇</button>
                  <button className="px-2 py-1 rounded text-white" style={{ background: "var(--error)" }} title="Delete">🗑</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// PUBLIC_INTERFACE
export function BehaviorEventsTable({ items }: { items: any[] }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'type'|'start'|'durationMin'>('start');
  const filtered = useMemo(() => {
    return (items ?? [])
      .filter((b: any) => b.type?.toLowerCase().includes(q.toLowerCase()) || String(b.camera).toLowerCase().includes(q.toLowerCase()))
      .sort((a: any, b: any) => {
        const A = a[sort]; const B = b[sort];
        return typeof A === 'number' ? A - B : String(A).localeCompare(String(B));
      });
  }, [items, q, sort]);

  return (
    <div className="card p-3 overflow-x-auto">
      <div className="flex items-center gap-2 mb-2">
        <input className="border border-neutralBorder bg-surface rounded px-2 py-1 text-sm text-secondaryText placeholder-neutralMid" placeholder="Search behaviors" value={q} onChange={e => setQ(e.target.value)} />
        <select className="border border-neutralBorder bg-surface rounded px-2 py-1 text-sm text-secondaryText" value={sort} onChange={e => setSort(e.target.value as any)}>
          <option value="start">Start</option>
          <option value="type">Type</option>
          <option value="durationMin">Duration</option>
        </select>
      </div>
      <table className="min-w-full text-sm">
        <thead style={{ background: 'var(--table-header-bg)' }}>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <th className="text-left p-2" style={{ color: 'var(--muted)' }}>Type</th>
            <th className="text-left p-2" style={{ color: 'var(--muted)' }}>Start</th>
            <th className="text-left p-2" style={{ color: 'var(--muted)' }}>End</th>
            <th className="text-left p-2" style={{ color: 'var(--muted)' }}>Duration (min)</th>
            <th className="text-left p-2" style={{ color: 'var(--muted)' }}>Confidence</th>
            <th className="text-left p-2" style={{ color: 'var(--muted)' }}>Camera</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b: any) => (
            <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }} className="hover:bg-[var(--table-row-hover)]">
              <td className="p-2" style={{ color: 'var(--text)' }}>{b.type}</td>
              <td className="p-2" style={{ color: 'var(--text)' }}>{b.start}</td>
              <td className="p-2" style={{ color: 'var(--text)' }}>{b.end}</td>
              <td className="p-2" style={{ color: 'var(--text)' }}>{b.durationMin}</td>
              <td className="p-2" style={{ color: 'var(--text)' }}>{b.confidence}%</td>
              <td className="p-2" style={{ color: 'var(--text)' }}>{b.camera}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
