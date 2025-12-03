import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

/**
 * PUBLIC_INTERFACE
 * AnalyticsDashboardPage provides smart filters, actions, and an analytics table.
 * Adds horizontal scrolling for the table on narrow screens.
 */
export default function AnalyticsDashboardPage() {
  const [filters, setFilters] = useState({
    start: "",
    end: "",
    label: "",
    behavior: "",
    source: "",
  });

  const rows = [
    { frameTime: 1.2, ts: "2024-08-05 12:00:01", animal: "A-12", label: "Anteater", source: "Cam-1", conf: 0.83, behavior: "Foraging" },
    { frameTime: 5.7, ts: "2024-08-05 12:00:06", animal: "A-12", label: "Anteater", source: "Cam-2", conf: 0.76, behavior: "Walking" },
  ];

  return (
    <div className="stack-lg">
      <div className="page-header">
        <h1 className="text-xl font-semibold text-gray-900">Analytics</h1>
        <div className="toolbar">
          <Button variant="secondary" onClick={()=>setFilters({start:"",end:"",label:"",behavior:"",source:""})}>Clear All</Button>
          <Button>Refresh</Button>
        </div>
      </div>
      <Card>
        <CardHeader title="Smart Filters" />
        <CardBody>
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">Start Date &amp; Time</div>
              <input type="datetime-local" value={filters.start} onChange={(e)=>setFilters(f=>({...f,start:e.target.value}))} className="w-full border rounded px-2 py-1 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text)", background: "var(--color-surface)" }} />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">End Date &amp; Time</div>
              <input type="datetime-local" value={filters.end} onChange={(e)=>setFilters(f=>({...f,end:e.target.value}))} className="w-full border rounded px-2 py-1 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text)", background: "var(--color-surface)" }} />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">Label</div>
              <input placeholder="Search label" value={filters.label} onChange={(e)=>setFilters(f=>({...f,label:e.target.value}))} className="w-full border rounded px-2 py-1 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text)", background: "var(--color-surface)" }} />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">Behavior</div>
              <input placeholder="Search behavior" value={filters.behavior} onChange={(e)=>setFilters(f=>({...f,behavior:e.target.value}))} className="w-full border rounded px-2 py-1 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text)", background: "var(--color-surface)" }} />
            </div>
            <div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1">Video Source</div>
              <input placeholder="Search source" value={filters.source} onChange={(e)=>setFilters(f=>({...f,source:e.target.value}))} className="w-full border rounded px-2 py-1 text-sm" style={{ borderColor: "var(--color-border)", color: "var(--color-text)", background: "var(--color-surface)" }} />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button variant="secondary" onClick={()=>setFilters({start:"",end:"",label:"",behavior:"",source:""})}>Clear All</Button>
            <Button>Refreshing…</Button>
            <button className="px-3 py-2 rounded text-white" style={{ background: "var(--color-export-green)" }}>Export CSV</button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Analytics" />
        <CardBody>
          <div className="media-frame overflow-x-auto">
            <table className="min-w-[640px] w-full text-sm">
              <thead style={{ background: "var(--color-table-header-bg)", color: "var(--color-text)" }}>
                <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                  <th className="text-left p-2">Frame time (s)</th>
                  <th className="text-left p-2">Timestamp</th>
                  <th className="text-left p-2">Animal ID</th>
                  <th className="text-left p-2">Label</th>
                  <th className="text-left p-2">Video source</th>
                  <th className="text-left p-2">Confidence (%)</th>
                  <th className="text-left p-2">Behavior</th>
                  <th className="text-left p-2">View</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b hover:bg-[var(--color-table-row-hover)]" style={{ borderColor: "var(--color-border)" }}>
                    <td className="p-2">{r.frameTime}</td>
                    <td className="p-2">{r.ts}</td>
                    <td className="p-2">{r.animal}</td>
                    <td className="p-2">{r.label}</td>
                    <td className="p-2">{r.source}</td>
                    <td className="p-2">{Math.round(r.conf * 100)}</td>
                    <td className="p-2">{r.behavior}</td>
                    <td className="p-2"><button className="px-2 py-1 rounded text-white" style={{ background: "var(--color-primary)" }}>View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
