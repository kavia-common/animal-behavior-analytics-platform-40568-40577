import React from 'react';
import ReportBuilder from '@/components/reports/ReportBuilder';
import ReportPreview from '@/components/reports/ReportPreview';
import TemplateCustomizer from '@/components/reports/TemplateCustomizer';
import Button from '@/components/ui/Button';

// PUBLIC_INTERFACE
export default function ReportsBuilderPage() {
  /** Report builder screen with preview and template customization */
  const [type, setType] = React.useState('summary');
  return (
    <div className="space-y-4">
      <ReportBuilder onPreview={(f: { type: string }) => setType(f.type)} />
      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-2">
          <ReportPreview type={type} />
          <div className="card p-4 mt-3">
            <div className="font-heading font-semibold mb-2">Export & Schedule</div>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={() => alert('PDF export simulated.')}>Export PDF</Button>
              <Button variant="secondary" onClick={() => alert('Excel export simulated.')}>Export Excel</Button>
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
