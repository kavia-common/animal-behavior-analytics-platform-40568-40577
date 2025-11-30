import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/queries';
import { EmptyState } from '@/components/ui/Placeholders';

// PUBLIC_INTERFACE
export default function ReportsSavedPage() {
  /** Saved Reports listing with sorting and search */
  const { data } = useQuery({ queryKey: ['reports'], queryFn: api.getReports });
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'type'|'createdAt'>('createdAt');

  const filtered = useMemo(() => {
    return (data ?? []).filter((r: any) => r.type.includes(q) || r.id.includes(q))
      .sort((a: any, b: any) => String(a[sort]).localeCompare(String(b[sort])));
  }, [data, q, sort]);

  return (
    <div className="space-y-3">
      <div className="card p-3 flex items-center gap-2">
        <input className="border rounded px-2 py-1 text-sm" placeholder="Search saved reports" value={q} onChange={e => setQ(e.target.value)} />
        <select className="border rounded px-2 py-1 text-sm" value={sort} onChange={e => setSort(e.target.value as any)}>
          <option value="createdAt">Sort by Created</option>
          <option value="type">Sort by Type</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No saved reports" description="When you save a report, it will appear here." />
      ) : (
        <div className="card overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Date Range</th>
                <th className="text-left p-2">Created</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r: any) => (
                <tr key={r.id} className="border-b hover:bg-neutral-50">
                  <td className="p-2">{r.id}</td>
                  <td className="p-2 capitalize">{r.type}</td>
                  <td className="p-2">{r.start} → {r.end}</td>
                  <td className="p-2">{r.createdAt}</td>
                  <td className="p-2">
                    <button className="px-2 py-1 text-xs rounded bg-primary text-white" onClick={() => alert('Preview (mock)')}>Preview</button>
                    <button className="ml-2 px-2 py-1 text-xs rounded bg-secondary text-white" onClick={() => alert('Export (mock)')}>Export</button>
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
