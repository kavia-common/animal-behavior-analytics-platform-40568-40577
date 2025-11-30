import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import TopNav from '@/components/layout/TopNav';
import Sidebar from '@/components/layout/Sidebar';
import Dropdown from '@/components/ui/Dropdown';

const tabs = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/reports', label: 'Reports' }
];

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [project, setProject] = useState('zoo1');

  return (
    <div className="app-shell">
      <header className="topnav sticky top-0 z-40 bg-white/80 border-b border-gray-200">
        <TopNav>
          <div className="flex items-center gap-3">
            <button className="md:hidden px-2 py-1 rounded hover:bg-neutral-100" onClick={() => setSidebarOpen(s => !s)} aria-label="Toggle menu">☰</button>
            <nav aria-label="Primary" className="hidden md:flex gap-2">
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
            <div className="hidden md:block">
              <Dropdown
                options={[{ value: 'zoo1', label: 'Zoo A – Project 1' }, { value: 'zoo2', label: 'Zoo B – Project 2' }]}
                value={project}
                onChange={setProject}
                placeholder="Switch Zoo/Project"
              />
            </div>
            <div className="flex-1" />
            <div className="hidden md:flex items-center gap-2">
              <Link to="/settings" className="px-2 py-1.5 text-sm rounded hover:bg-neutral-100">Settings</Link>
              <a className="px-2 py-1.5 text-sm rounded hover:bg-neutral-100" href="https://example.com/help" target="_blank" rel="noreferrer">Help</a>
              <button className="px-2 py-1.5 text-sm rounded hover:bg-neutral-100" onClick={() => alert('Logged out (stub).')}>Logout</button>
            </div>
          </div>
        </TopNav>
      </header>
      <aside className={`sidebar ${sidebarOpen ? 'block' : 'hidden'} md:block bg-white border-r border-gray-200`}>
        <Sidebar onNavigate={navigate} />
      </aside>
      <main className="main p-4 md:p-6 overflow-auto">
        <div className="md:hidden mb-3">
          <Dropdown
            options={[{ value: 'zoo1', label: 'Zoo A – Project 1' }, { value: 'zoo2', label: 'Zoo B – Project 2' }]}
            value={project}
            onChange={setProject}
            placeholder="Switch Zoo/Project"
          />
          <div className="mt-2 flex gap-2">
            <Link to="/settings" className="px-2 py-1.5 text-sm rounded bg-neutral-100">Settings</Link>
            <button className="px-2 py-1.5 text-sm rounded bg-neutral-100" onClick={() => alert('Logged out (stub).')}>Logout</button>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
