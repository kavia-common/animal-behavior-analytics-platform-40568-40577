import React from "react";

/**
 * PUBLIC_INTERFACE
 * VideoLibraryPage shows the exact table columns per spec and themed styles.
 */
export default function VideoLibraryPage() {
  const rows = [
    { name: "sample1.mp4", dt: "2024-08-05 12:00:00", status: "Processed", behavior: "Foraging", conf: 0.87 },
    { name: "sample2.mp4", dt: "2024-08-05 12:10:00", status: "Queued", behavior: "Pacing", conf: 0.74 },
  ];

  return (
    <div className="stack-lg">
      <div className="page-header">
        <div>
          <div className="font-heading font-semibold" style={{ color: "var(--color-text)" }}>
            Video Library
          </div>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Manage uploaded videos and tracking status.
          </p>
        </div>
      </div>

      <div className="media-frame overflow-x-auto">
        <table className="min-w-[720px] w-full text-sm">
          <thead style={{ background: "var(--color-table-header-bg)", color: "var(--color-text)" }}>
            <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
              <th className="text-left p-2">Video name</th>
              <th className="text-left p-2">Date &amp; time</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Behaviour</th>
              <th className="text-left p-2">Confidence</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b hover:bg-[var(--color-table-row-hover)]" style={{ borderColor: "var(--color-border)" }}>
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.dt}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">{r.behavior}</td>
                <td className="p-2">{Math.round(r.conf * 100)}%</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button className="px-2 py-1 rounded text-white" style={{ background: "var(--color-primary)" }}>
                      View
                    </button>
                    <button className="px-2 py-1 rounded text-white" style={{ background: "var(--color-export-green)" }}>
                      Download
                    </button>
                    <button className="px-2 py-1 rounded" style={{ border: "1px solid var(--color-border)", color: "var(--color-error)" }}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
        Actions: View (teal), Download (green), Delete (red).
      </div>
    </div>
  );
}
