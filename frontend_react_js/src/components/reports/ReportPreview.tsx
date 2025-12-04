import React from 'react';
import TrendLineChart from '@/components/charts/TrendLineChart';

// PUBLIC_INTERFACE
export default function ReportPreview() {
  /** Simple preview rendering a trend chart using deterministic sample data */
  const series = [
    { d: '2025-01-01', v: 12 },
    { d: '2025-01-02', v: 18 },
    { d: '2025-01-03', v: 15 },
    { d: '2025-01-04', v: 20 },
    { d: '2025-01-05', v: 17 },
    { d: '2025-01-06', v: 14 },
    { d: '2025-01-07', v: 19 },
  ];

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="text-body" style={{ fontWeight: 700, marginBottom: 8 }}>Report Preview</div>
      <TrendLineChart data={series} xKey="d" yKey="v" />
    </div>
  );
}
