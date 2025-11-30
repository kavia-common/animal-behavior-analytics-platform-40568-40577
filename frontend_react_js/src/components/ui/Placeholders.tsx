import React from 'react';

// PUBLIC_INTERFACE
export function PlaceholderImage({ label = 'Image', className = 'w-28 h-20' }: { label?: string; className?: string }) {
  /** Placeholder illustration rectangle used instead of real images */
  return (
    <div className={`${className} bg-neutral-100 border border-gray-200 rounded flex items-center justify-center text-[10px] text-neutral-500`}>
      {label}
    </div>
  );
}

// PUBLIC_INTERFACE
export function EmptyState({ title = 'No results found', description = 'Try adjusting filters or date range.', children }: { title?: string; description?: string; children?: React.ReactNode }) {
  /** Generic empty state with icon illustration */
  return (
    <div className="card p-6 text-center">
      <div className="mx-auto mb-3 w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
        <span className="text-2xl">🦔</span>
      </div>
      <div className="font-heading font-semibold">{title}</div>
      <div className="text-sm text-neutral-600">{description}</div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Skeleton({ className = 'h-4 w-full' }: { className?: string }) {
  /** Animated loading skeleton bar */
  return <div className={`animate-pulse bg-neutral-200 rounded ${className}`} />;
}
