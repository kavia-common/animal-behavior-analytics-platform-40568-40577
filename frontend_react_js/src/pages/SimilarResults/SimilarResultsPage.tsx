import React from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

/**
 * PUBLIC_INTERFACE
 * SimilarResultsPage surfaces behavior segments similar to a selected example.
 * Route: /similar-results
 */
export default function SimilarResultsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardBody>
          <h2 className="font-heading text-lg font-semibold text-neutral-900">Similar Results</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Select a reference behavior to find similar segments across time windows and cameras. This is a placeholder for the upcoming similarity search workflow.
          </p>
          <div className="mt-3">
            <Button onClick={() => alert('Select reference segment (mock)')}>Select Reference Segment</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
