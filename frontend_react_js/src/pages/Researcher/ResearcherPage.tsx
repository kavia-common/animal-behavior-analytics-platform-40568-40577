import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * ResearcherPage provides access to analysis tools and detailed timelines.
 * Route: /researcher
 */
export default function ResearcherPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <Card>
        <CardBody>
          <h2 className="font-heading text-lg font-semibold text-neutral-900">Analysis Workspace</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Jump into timelines, filters, and playback tools to analyze behavior segments and patterns.
          </p>
          <div className="mt-3 flex gap-2">
            <Button onClick={() => navigate('/timeline')}>Open Timeline</Button>
            <Button variant="ghost" onClick={() => navigate('/reports')}>Reports</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
