import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import TopNav from '@/components/layout/TopNav';
import Sidebar from '@/components/layout/Sidebar';

export default function RootLayout() {
  const { pathname } = useLocation();
  const isAuth = pathname.startsWith('/login');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (isAuth) return <Outlet />;

  return (
    <div>
      <header className="sticky-topnav bg-white shadow-sm">
        <TopNav />
        <div className="px-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <nav className="flex gap-6 h-11 items-center text-sm">
            <Link
              to="/"
              className={`h-full inline-flex items-center ${pathname === '/' ? 'tab-active' : ''}`}
              style={{ color: pathname === '/' ? 'var(--color-text)' : 'var(--color-text-muted)' }}
            >
              Dashboard
            </Link>
            <Link
              to="/timeline"
              className={`h-full inline-flex items-center ${pathname.startsWith('/timeline') ? 'tab-active' : ''}`}
              style={{ color: pathname.startsWith('/timeline') ? 'var(--color-text)' : 'var(--color-text-muted)' }}
            >
              Timeline
            </Link>
            <Link
              to="/reports"
              className={`h-full inline-flex items-center ${pathname.startsWith('/reports') ? 'tab-active' : ''}`}
              style={{ color: pathname.startsWith('/reports') ? 'var(--color-text)' : 'var(--color-text-muted)' }}
            >
              Reports
            </Link>
          </nav>
        </div>
      </header>

      <div className="app-shell">
        <aside
          className={`sidebar-panel bg-white border-r border-gray-200 lg:static lg:translate-x-0 lg:h-[calc(100vh-64px)] lg:top-[64px] lg:bottom-0 lg:w-[256px] ${sidebarOpen ? 'open' : ''}`}
          role="complementary"
          aria-label="Sidebar"
        >
          <div className="hidden lg:block h-[calc(100vh-64px)] overflow-y-auto">
            <Sidebar />
          </div>
          <div className="block lg:hidden h-[calc(100vh-64px)] overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        <main className="app-content py-4 lg:py-6 page-container">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
