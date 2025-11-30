import React from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import TopNav from '@/components/layout/TopNav';
import Sidebar from '@/components/layout/Sidebar';

const tabs = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/reports', label: 'Reports' }
];

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="topnav sticky top-0 z-40 bg-white/80 border-b border-gray-200">
        <TopNav>
          <nav aria-label="Primary" className="flex gap-2">
            {tabs.map(t => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'bg-primary text-white' : 'text-neutral-900 hover:bg-neutral-50'
                  }`
                }
                aria-current={location.pathname === t.to ? 'page' : undefined}
              >
                {t.label}
              </NavLink>
            ))}
          </nav>
        </TopNav>
      </header>
      <aside className="sidebar hidden md:block bg-white border-r border-gray-200">
        <Sidebar onNavigate={navigate} />
      </aside>
      <main className="main p-4 md:p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
