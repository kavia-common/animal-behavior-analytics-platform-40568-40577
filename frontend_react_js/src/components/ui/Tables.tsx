import React, { useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export function BehaviorEventsTable({ items }: { items: any[] }) {
  /** Sortable/filterable behavior events table */
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'type'|'start'|'durationMin'>('start');
  const filtered = useMemo(() => {
    return (items ?? [])
      .filter((b: any) => b.type.toLowerCase().includes(q.toLowerCase()) || String(b.camera).toLowerCase().includes(q.toLowerCase()))
      .sort((a: any, b: any) => {
        const A = a[sort]; const B = b[sort];
        return typeof A === 'number' ? A - B : String(A).localeCompare(String(B));
      });
  }, [items, q, sort]);

  return (
    <div className="card p-3 overflow-x-auto">
      <div className="flex items-center gap-2 mb-2">
        <input className="border rounded px-2 py-1 text-sm" placeholder="Search behaviors" value={q} onChange={e => setQ(e.target.value)} />
        <select className="border rounded px-2 py-1 text-sm" value={sort} onChange={e => setSort(e.target.value as any)}>
          <option value="start">Start</option>
          <option value="type">Type</option>
          <option value="durationMin">Duration</option>
        </select>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">Start</th>
            <th className="text-left p-2">End</th>
            <th className="text-left p-2">Duration (min)</th>
            <th className="text-left p-2">Confidence</th>
            <th className="text-left p-2">Camera</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b: any) => (
            <tr key={b.id} className="border-b hover:bg-neutral-50">
              <td className="p-2">{b.type}</td>
              <td className="p-2">{b.start}</td>
              <td className="p-2">{b.end}</td>
              <td className="p-2">{b.durationMin}</td>
              <td className="p-2">{b.confidence}%</td>
              <td className="p-2">{b.camera}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// PUBLIC_INTERFACE
export function ReportLogsTable({ items }: { items: any[] }) {
  /** Simple report logs table with filters */
  const [q, setQ] = useState('');
  const logs = useMemo(() => (items ?? []).filter((r: any) => r.type.includes(q) || r.id.includes(q)), [items, q]);

  return (
    <div className="card p-3 overflow-x-auto">
      <div className="flex items-center gap-2 mb-2">
        <input className="border rounded px-2 py-1 text-sm" placeholder="Search logs" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">Start</th>
            <th className="text-left p-2">End</th>
            <th className="text-left p-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((r: any) => (
            <tr key={r.id} className="border-b hover:bg-neutral-50">
              <td className="p-2">{r.id}</td>
              <td className="p-2">{r.type}</td>
              <td className="p-2">{r.start}</td>
              <td className="p-2">{r.end}</td>
              <td className="p-2">{r.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
