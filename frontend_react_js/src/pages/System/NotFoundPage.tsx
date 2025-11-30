import React from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '@/components/ui/Placeholders';

// PUBLIC_INTERFACE
export default function NotFoundPage() {
  /** 404 page */
  return (
    <EmptyState title="404 – Page not found" description="The page you are looking for does not exist.">
      <Link to="/dashboard" className="px-3 py-2 rounded bg-primary text-white inline-block">Go to Dashboard</Link>
    </EmptyState>
  );
}
