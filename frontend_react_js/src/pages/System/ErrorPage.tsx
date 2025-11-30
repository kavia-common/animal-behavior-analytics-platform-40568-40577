import React from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/ui/Placeholders';

// PUBLIC_INTERFACE
export default function ErrorPage() {
  /** 500-like general error page */
  return (
    <EmptyState title="Something went wrong" description="An unexpected error occurred. Please try again.">
      <Link to="/network-retry" className="px-3 py-2 rounded bg-secondary text-white inline-block">Try Again</Link>
    </EmptyState>
  );
}
