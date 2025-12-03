import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Home' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/reports', label: 'Reports' },
  ];

  return (
    <aside className="w-60 bg-white border-r min-h-screen p-4" style={{ borderColor: 'var(--color-border)' }}>
      <nav className="space-y-1">
        {links.map((l) => {
          const active = location.pathname === l.to || (l.to === '/' && location.pathname === '/dashboard');
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`block rounded px-3 py-2 ${active ? 'sidebar-active' : ''}`}
              style={active ? { background: 'var(--color-sidebar-active-bg)', color: 'var(--color-primary)', fontWeight: 600 } : {}}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
