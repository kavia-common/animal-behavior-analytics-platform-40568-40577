import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopNav() {
  const { pathname } = useLocation();
  const nav = [
    { to: '/', label: 'Dashboard' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/reports', label: 'Reports' },
    { to: '/settings', label: 'Settings' },
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: 8, background: 'var(--gradient)' }} />
          <strong>VizAI</strong>
        </div>
        <nav className="flex items-center gap-6">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== '/' && pathname.startsWith(n.to));
            return (
              <Link key={n.to} to={n.to} className="text-sm" style={{ color: active ? 'var(--primary)' : 'var(--text)' }}>
                <div className="pb-1">
                  {n.label}
                </div>
                {active && <div style={{ height: 2, background: 'var(--primary)' }} />}
              </Link>
            );
          })}
        </nav>
        <div style={{ color: 'var(--muted)', fontSize: 12 }}>Giant Anteater</div>
      </div>
    </header>
  );
}
