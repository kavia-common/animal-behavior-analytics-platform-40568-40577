import React from 'react';

// PUBLIC_INTERFACE
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  /** Simple card */
  return <div className={`card ${className}`}>{children}</div>;
}

// PUBLIC_INTERFACE
export function CardHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  /** Card header with title/subtitle */
  return (
    <div className="px-4 pt-4 pb-2 border-b border-gray-100 flex items-center justify-between">
      <div>
        <h3 className="font-heading font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-neutral-600">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

// PUBLIC_INTERFACE
export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  /** Card body */
  return <div className={`p-4 ${className}`}>{children}</div>;
}
