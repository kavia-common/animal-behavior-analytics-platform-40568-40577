import React from 'react';

// PUBLIC_INTERFACE
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  /** Simple card using global theme tokens (surface, border, shadow). */
  return <div className={`ui-card ${className}`}>{children}</div>;
}

// PUBLIC_INTERFACE
export function CardHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  /** Card header with title/subtitle and themed border/text */
  return (
    <div
      className="px-4 pt-4 pb-2 flex items-center justify-between"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div>
        <h3 style={{ fontWeight: 600, color: 'var(--text)' }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 12, color: 'var(--muted)' }}>{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

// PUBLIC_INTERFACE
export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  /** Card body area with default padding. */
  return <div className={`p-4 ${className}`}>{children}</div>;
}
