import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";

/**
 * Root layout with persistent TopNav and Sidebar. For /login, layout hides navigation.
 */
export default function RootLayout() {
  const { pathname } = useLocation();
  const isAuth = pathname.startsWith("/login");

  if (isAuth) {
    return <Outlet />;
  }

  return (
    <div className="app-shell">
      <header className="topnav">
        <TopNav />
        {/* Tabs bar */}
        {!pathname.startsWith("/animals") && (
          <div className="px-6 border-t" style={{ borderColor: "var(--color-grey-border)" }}>
            <nav className="flex gap-6 h-11 items-center text-sm">
              <Link to="/dashboard" className={`h-full inline-flex items-center ${pathname.startsWith("/dashboard") || pathname === "/" ? "tab-active" : ""}`} style={{ color: pathname.startsWith("/dashboard") || pathname === "/" ? "var(--color-teal-dark-text)" : "var(--color-faint-text)" }}>Dashboard</Link>
              <Link to="/timeline" className={`h-full inline-flex items-center ${pathname.startsWith("/timeline") ? "tab-active" : ""}`} style={{ color: pathname.startsWith("/timeline") ? "var(--color-teal-dark-text)" : "var(--color-faint-text)" }}>Timeline</Link>
              <Link to="/reports" className={`h-full inline-flex items-center ${pathname.startsWith("/reports") ? "tab-active" : ""}`} style={{ color: pathname.startsWith("/reports") ? "var(--color-teal-dark-text)" : "var(--color-faint-text)" }}>Reports</Link>
            </nav>
          </div>
        )}
      </header>
      <aside className="sidebar">
        <Sidebar onNavigate={(p) => { window.location.href = p; }} />
      </aside>
      <main className="main p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
