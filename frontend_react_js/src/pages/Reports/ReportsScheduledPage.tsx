import React, { useMemo, useState } from 'react';
import { EmptyState } from '@/components/ui/Placeholders';

type S = { id: string; name: string; cadence: string; recipients: string; lastRun: string; nextRun: string };

const seed: S[] = [
  { id: 's1', name: 'Daily Behavior Summary', cadence: 'Daily 07:00', recipients: 'team@zoo.org', lastRun: '2025-11-28', nextRun: '2025-12-01' },
  { id: 's2', name: 'Weekly Trends', cadence: 'Weekly Mon 08:00', recipients: 'research@zoo.org', lastRun: '2025-11-24', nextRun: '2025-12-02' },
];

// PUBLIC_INTERFACE
export default function ReportsScheduledPage() {
  /** Scheduled emails table with simple sorting and filtering */
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'name'|'nextRun'>('nextRun');

  const items = useMemo(() => seed
    .filter(s => s.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => String(a[sort]).localeCompare(String(b[sort]))), [q, sort]);

  return (
    <div className="space-y-3">
      <div className="card p-3 flex items-center gap-2">
        <input className="border rounded px-2 py-1 text-sm" placeholder="Search schedules" value={q} onChange={e => setQ(e.target.value)} />
        <select className="border rounded px-2 py-1 text-sm" value={sort} onChange={e => setSort(e.target.value as any)}>
          <option value="nextRun">Sort by Next Run</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>
      {items.length === 0 ? (
        <EmptyState title="No schedules" description="Create a schedule from the builder page." />
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Cadence</th>
                <th className="text-left p-2">Recipients</th>
                <th className="text-left p-2">Last run</th>
                <th className="text-left p-2">Next run</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(s => (
                <tr key={s.id} className="border-b hover:bg-neutral-50">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.cadence}</td>
                  <td className="p-2">{s.recipients}</td>
                  <td className="p-2">{s.lastRun}</td>
                  <td className="p-2">{s.nextRun}</td>
                  <td className="p-2">
                    <button className="px-2 py-1 text-xs rounded bg-primary text-white" onClick={() => alert('Edit (mock)')}>Edit</button>
                    <button className="ml-2 px-2 py-1 text-xs rounded bg-red-600 text-white" onClick={() => alert('Delete (mock)')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
