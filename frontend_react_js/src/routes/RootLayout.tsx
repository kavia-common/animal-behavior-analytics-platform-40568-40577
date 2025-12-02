import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import TopNav from '@/components/layout/TopNav';
import Sidebar from '@/components/layout/Sidebar';
import DateRangePicker from '@/components/ui/DateRangePicker';
import Button from '@/components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setDateRange, setDateRangePreset, clearAll } from '@/store/slices/filterSlice';

const tabs = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/reports', label: 'Reports' }
];

function GlobalDateSelector() {
  const dispatch = useDispatch();
  const { dateRange } = useSelector((s: RootState) => s.filters);
  return (
    <div className="hidden md:flex items-center gap-2">
      <DateRangePicker
        value={dateRange}
        onChange={(v) => dispatch(setDateRange(v))}
        hideExtendedPresets
      />
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          title="Clear all filters"
          onClick={() => dispatch(clearAll())}
        >
          Clear All
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Last 7 days"
          onClick={() => dispatch(setDateRangePreset('7d'))}
        >
          7d
        </Button>
        <Button
          variant="ghost"
          size="sm"
          title="Last 30 days"
          onClick={() => dispatch(setDateRangePreset('30d'))}
        >
          30d
        </Button>
      </div>
    </div>
  );
}

export default function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <div className="flex-1" />
            <GlobalDateSelector />
            <div className="hidden md:flex items-center gap-2">
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
          <div className="mt-2 flex gap-2">
            <button className="px-2 py-1.5 text-sm rounded bg-neutral-100" onClick={() => alert('Logged out (stub).')}>Logout</button>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
