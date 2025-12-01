import React from 'react';
import ReportBuilder from '@/components/reports/ReportBuilder';
import ReportPreview from '@/components/reports/ReportPreview';
import TemplateCustomizer from '@/components/reports/TemplateCustomizer';
import Button from '@/components/ui/Button';
import { api } from '@/api/queries';
import { downloadFromUrl } from '@/lib/download';

// PUBLIC_INTERFACE
export default function ReportsBuilderPage() {
  /** Report builder screen with preview and template customization */
  const [type, setType] = React.useState('summary');
  const [reportId, setReportId] = React.useState<string>('r1');

  const exportJson = () => {
    const url = api.exportReportJsonUrl(reportId);
    downloadFromUrl(url, `${reportId}.json`);
  };
  const exportCsv = () => {
    const url = api.exportReportCsvUrl(reportId);
    downloadFromUrl(url, `${reportId}.csv`);
  };

  return (
    <div className="space-y-4">
      <ReportBuilder onPreview={(f: { type: string }) => setType(f.type)} />
      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <ReportPreview type={type} />
          <div className="card p-4 mt-3">
            <div className="font-heading font-semibold mb-2">Export & Schedule</div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="text-sm">Report ID</label>
              <input value={reportId} onChange={(e) => setReportId(e.target.value)} className="border rounded px-2 py-1 text-sm" style={{ width: 140 }} />
              <Button onClick={exportJson}>Export JSON</Button>
              <Button variant="secondary" onClick={exportCsv}>Export CSV</Button>
              <Button variant="ghost" onClick={() => alert('PDF export simulated.')}>Export PDF</Button>
              <Button variant="ghost" onClick={() => alert('PPT export simulated.')}>Export PPT</Button>
              <Button onClick={() => alert('Email scheduled (mock).')}>Schedule Email</Button>
              <Button variant="ghost" onClick={() => alert('Draft saved (mock).')}>Save Draft</Button>
            </div>
          </div>
        </div>
        <div>
          <TemplateCustomizer />
        </div>
      </div>
    </div>
  );
}
