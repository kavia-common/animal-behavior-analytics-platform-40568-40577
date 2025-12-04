import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopNav from '../components/layout/TopNav';

export default function RootLayout() {
  const { pathname } = useLocation();
  const hideNav = ['/', '/login', '/register', '/select-species'].includes(pathname);

  return (
    <div className="bg-app" style={{ minHeight: '100vh' }}>
      {!hideNav && <TopNav />}
      <main style={{ padding: hideNav ? 0 : 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
