import React, { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";

/**
 * Root layout with persistent TopNav and Sidebar.
 * - Sticky header (uses .sticky-topnav)
 * - Desktop: fixed sidebar column; Tablet/Mobile: sidebar overlays as drawer
 * - Main content constrained via .app-content with consistent gutters
 */
export default function RootLayout() {
  const { pathname } = useLocation();
  const isAuth = pathname.startsWith("/login");

  // Local state for sidebar drawer on small screens (keeps changes isolated without altering uiSlice)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close drawer when navigating to a new route
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (isAuth) {
    return <Outlet />;
  }

  return (
    <div className="bg-gray-50">
      {/* Sticky Top Navigation */}
      <header className="sticky-topnav bg-white shadow-sm">
        <TopNav onMenuClick={() => setSidebarOpen((v) => !v)} />
        {/* Secondary tabs bar (optional), kept below the top nav, scrolls with content if needed */}
        {!pathname.startsWith("/animals") && (
          <div className="px-6 border-t" style={{ borderColor: "var(--color-grey-border)" }}>
            <nav className="flex gap-6 h-11 items-center text-sm">
              <Link
                to="/dashboard"
                className={`h-full inline-flex items-center ${pathname.startsWith("/dashboard") || pathname === "/" ? "tab-active" : ""}`}
                style={{ color: pathname.startsWith("/dashboard") || pathname === "/" ? "var(--color-text)" : "var(--color-text-muted)" }}
              >
                Dashboard
              </Link>
              <Link
                to="/timeline"
                className={`h-full inline-flex items-center ${pathname.startsWith("/timeline") ? "tab-active" : ""}`}
                style={{ color: pathname.startsWith("/timeline") ? "var(--color-text)" : "var(--color-text-muted)" }}
              >
                Timeline
              </Link>
              <Link
                to="/reports"
                className={`h-full inline-flex items-center ${pathname.startsWith("/reports") ? "tab-active" : ""}`}
                style={{ color: pathname.startsWith("/reports") ? "var(--color-text)" : "var(--color-text-muted)" }}
              >
                Reports
              </Link>
              <Link
                to="/library"
                className={`h-full inline-flex items-center ${pathname.startsWith("/library") ? "tab-active" : ""}`}
                style={{ color: pathname.startsWith("/library") ? "var(--color-text)" : "var(--color-text-muted)" }}
              >
                Video Library
              </Link>
              <Link
                to="/analytics"
                className={`h-full inline-flex items-center ${pathname.startsWith("/analytics") ? "tab-active" : ""}`}
                style={{ color: pathname.startsWith("/analytics") ? "var(--color-text)" : "var(--color-text-muted)" }}
              >
                Analytics
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Screen overlay for drawer mode */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />

      {/* Grid shell: sidebar + main */}
      <div className="app-shell">
        {/* Sidebar: fixed on desktop; drawer overlay on small screens */}
        <aside
          className={`sidebar-panel bg-white border-r border-gray-200 lg:static lg:translate-x-0 lg:h-[calc(100vh-var(--topnav-height))] lg:top-[var(--topnav-height)] lg:bottom-0 lg:w-[var(--sidebar-width)] ${sidebarOpen ? "open" : ""}`}
          role="complementary"
          aria-label="Sidebar"
        >
          <div className="hidden lg:block h-[calc(100vh-var(--topnav-height))] overflow-y-auto">
            <Sidebar />
          </div>
          <div className="block lg:hidden h-[calc(100vh-var(--topnav-height))] overflow-y-auto">
            <Sidebar onNavigate={(p) => { setSidebarOpen(false); if (p) window.location.href = p; }} />
          </div>
        </aside>

        {/* Main content area with gutters */}
        <main className="app-content py-4 lg:py-6 page-container">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
