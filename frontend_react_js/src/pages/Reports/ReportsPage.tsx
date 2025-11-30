import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function ReportsPage() {
  /** Reports hub with links to builder, saved, and scheduled pages */
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
      <div className="card p-4">
        <div className="font-heading font-semibold">Scheduled Reports</div>
        <p className="text-sm text-neutral-600 mb-3">View and edit scheduled email reports.</p>
        <Link to="/reports/scheduled" className="px-3 py-2 rounded bg-primary text-white inline-block">View Schedules</Link>
      </div>
    </div>
  );
}
