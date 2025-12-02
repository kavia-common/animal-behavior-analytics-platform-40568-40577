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
        <input className="border border-neutralBorder bg-surface rounded px-2 py-1 text-sm text-secondaryText placeholder-neutralMid" placeholder="Search behaviors" value={q} onChange={e => setQ(e.target.value)} />
        <select className="border border-neutralBorder bg-surface rounded px-2 py-1 text-sm text-secondaryText" value={sort} onChange={e => setSort(e.target.value as any)}>
          <option value="start">Start</option>
          <option value="type">Type</option>
          <option value="durationMin">Duration</option>
        </select>
      </div>
      <table className="min-w-full text-sm">
        <thead className="bg-tableHeaderBg">
          <tr className="border-b border-neutralBorder">
            <th className="text-left p-2 text-secondaryText">Type</th>
            <th className="text-left p-2 text-secondaryText">Start</th>
            <th className="text-left p-2 text-secondaryText">End</th>
            <th className="text-left p-2 text-secondaryText">Duration (min)</th>
            <th className="text-left p-2 text-secondaryText">Confidence</th>
            <th className="text-left p-2 text-secondaryText">Camera</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((b: any) => (
            <tr key={b.id} className="border-b border-neutralBorder hover:bg-tableRowHover">
              <td className="p-2 text-secondaryText">{b.type}</td>
              <td className="p-2 text-secondaryText">{b.start}</td>
              <td className="p-2 text-secondaryText">{b.end}</td>
              <td className="p-2 text-secondaryText">{b.durationMin}</td>
              <td className="p-2 text-secondaryText">{b.confidence}%</td>
              <td className="p-2 text-secondaryText">{b.camera}</td>
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
        <input className="border border-neutralBorder bg-surface rounded px-2 py-1 text-sm text-secondaryText placeholder-neutralMid" placeholder="Search logs" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <table className="min-w-full text-sm">
        <thead className="bg-tableHeaderBg">
          <tr className="border-b border-neutralBorder">
            <th className="text-left p-2 text-secondaryText">ID</th>
            <th className="text-left p-2 text-secondaryText">Type</th>
            <th className="text-left p-2 text-secondaryText">Start</th>
            <th className="text-left p-2 text-secondaryText">End</th>
            <th className="text-left p-2 text-secondaryText">Created</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((r: any) => (
            <tr key={r.id} className="border-b border-neutralBorder hover:bg-tableRowHover">
              <td className="p-2 text-secondaryText">{r.id}</td>
              <td className="p-2 text-secondaryText">{r.type}</td>
              <td className="p-2 text-secondaryText">{r.start}</td>
              <td className="p-2 text-secondaryText">{r.end}</td>
              <td className="p-2 text-secondaryText">{r.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
