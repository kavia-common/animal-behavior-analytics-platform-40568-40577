import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { api } from '@/api/queries';
import { downloadFromUrl } from '@/lib/download';

// PUBLIC_INTERFACE
export default function ReportsPage() {
  /** Reports hub with links and quick exports */
  const [reportId, setReportId] = useState('r1');
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card p-4">
        <div className="font-heading font-semibold">Report Builder</div>
        <p className="text-sm text-neutral-600 mb-3">Create and preview reports with templates and exports.</p>
        <Link to="/reports/builder" className="px-3 py-2 rounded bg-primary text-white inline-block">Open Builder</Link>
      </div>
      <div className="card p-4">
        <div className="font-heading font-semibold">Saved Reports</div>
        <p className="text-sm text-neutral-600 mb-3">Manage saved reports, re-run, and export.</p>
        <Link to="/reports/saved" className="px-3 py-2 rounded bg-secondary text-white inline-block">View Saved</Link>
      </div>
      <div className="card p-4 space-y-2">
        <div className="font-heading font-semibold">Quick Exports</div>
        <p className="text-sm text-neutral-600">Trigger exports via backend endpoints.</p>
        <div className="flex items-center gap-2">
          <input value={reportId} onChange={(e) => setReportId(e.target.value)} className="border rounded px-2 py-1 text-sm" style={{ width: 140 }} />
          <Button size="sm" onClick={() => downloadFromUrl(api.exportReportJsonUrl(reportId), `${reportId}.json`)}>JSON</Button>
          <Button size="sm" variant="secondary" onClick={() => downloadFromUrl(api.exportReportCsvUrl(reportId), `${reportId}.csv`)}>CSV</Button>
        </div>
        <p className="text-[11px] text-neutral-600">If backend is disabled by feature flags, these links will still resolve but may 404; mocks remain active elsewhere.</p>
      </div>
    </div>
  );
}
