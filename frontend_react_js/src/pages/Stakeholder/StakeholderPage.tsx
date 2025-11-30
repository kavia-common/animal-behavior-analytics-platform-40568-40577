import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import StatWidget from '@/components/widgets/StatWidget';
import Button from '@/components/ui/Button';

/**
 * PUBLIC_INTERFACE
 * StakeholderPage provides a high-level overview for decision makers.
 * Route: /stakeholder
 */
export default function StakeholderPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <StatWidget label="Total Behaviors (7d)" value={156} delta="+6% vs prev" tone="success" />
        <StatWidget label="Active Cameras" value={12} delta="+1 online" tone="default" />
        <StatWidget label="Alerts (24h)" value={3} delta="-2 today" tone="success" />
      </div>

      <Card>
        <CardBody>
          <h2 className="font-heading text-lg font-semibold text-neutral-900">Overview</h2>
          <p className="mt-1 text-sm text-neutral-600">
            This view highlights key metrics and summaries to aid planning and reporting. Detailed drill-downs are available in the Researcher view.
          </p>
          <div className="mt-3">
            <Button variant="secondary" onClick={() => alert('Export summary (mock)')}>Export Summary</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
