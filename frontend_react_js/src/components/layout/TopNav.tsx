import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/vizai-logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setGlobalDateRange, setLastActiveTab } from "@/store/slices/uiSlice";

type TopNavProps = {
  onMenuClick?: () => void;
};

/**
 * Top navigation with:
 * - Logo link -> Animal Selection
 * - Mobile menu button (hamburger) to toggle sidebar drawer
 * - Tabs + global date selector (persisted in ui slice)
 * - Live clock + user menu
 */
export default function TopNav({ onMenuClick }: TopNavProps) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState<string>(new Date().toLocaleString());
  const dateRange = useSelector((s: RootState) => s.ui.globalDateRange);
  const activeTab = useSelector((s: RootState) => s.ui.lastActiveTab);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date().toLocaleString()), 1000);
    return () => clearInterval(id);
  }, []);

  const goAnimals = (e: React.MouseEvent) => {
    e.preventDefault();
    nav("/animals");
  };

  const setTab = (tab: 'dashboard' | 'timeline' | 'reports' | 'chat', path: string) => {
    dispatch(setLastActiveTab(tab));
    nav(path);
  };

  const onDateChange = (dir: 'today' | '7d' | '30d') => {
    const end = new Date();
    let start = new Date(end);
    if (dir === '7d') {
      start.setDate(end.getDate() - 6);
    } else if (dir === '30d') {
      start.setDate(end.getDate() - 29);
    }
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    dispatch(setGlobalDateRange({ start: fmt(start), end: fmt(end) }));
  };

  return (
    <div className="w-full h-16 px-4 lg:px-6 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          aria-label="Open sidebar"
          onClick={onMenuClick}
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border"
          style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <a href="/animals" onClick={goAnimals} className="inline-flex items-center gap-3">
          <img src={logo} className="h-8" alt="VizAI" />
          <span className="font-semibold" style={{ color: "var(--color-text)" }}>VizAI</span>
        </a>
      </div>

      {/* Tabs + date range */}
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex items-center gap-2 text-sm">
          <button
            className={`px-2 py-1 rounded ${activeTab === 'dashboard' ? 'bg-[var(--color-sidebar-active-bg)]' : ''}`}
            onClick={() => setTab('dashboard', '/dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`px-2 py-1 rounded ${activeTab === 'timeline' ? 'bg-[var(--color-sidebar-active-bg)]' : ''}`}
            onClick={() => setTab('timeline', '/timeline')}
          >
            Timeline
          </button>
          <button
            className={`px-2 py-1 rounded ${activeTab === 'reports' ? 'bg-[var(--color-sidebar-active-bg)]' : ''}`}
            onClick={() => setTab('reports', '/reports')}
          >
            Reports
          </button>
        </nav>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--color-text-muted)]">Range:</span>
          <div className="inline-flex rounded border overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <button className="px-2 py-1 hover:bg-[var(--color-sidebar-active-bg)]" onClick={() => onDateChange('today')}>Today</button>
            <button className="px-2 py-1 hover:bg-[var(--color-sidebar-active-bg)]" onClick={() => onDateChange('7d')}>Last 7d</button>
            <button className="px-2 py-1 hover:bg-[var(--color-sidebar-active-bg)]" onClick={() => onDateChange('30d')}>Last 30d</button>
          </div>
          <span className="text-[var(--color-text-muted)]">
            {dateRange.start} → {dateRange.end}
          </span>
        </div>
      </div>

      {/* Right widgets */}
      <div className="flex items-center gap-6 text-sm">
        <span className="hidden md:block text-[var(--color-text-muted)]">{now}</span>
        <div className="relative">
          <button
            className="px-3 py-1.5 rounded-lg border"
            style={{ borderColor: "var(--color-border)" }}
            onClick={() => setOpen((v) => !v)}
          >
            User
          </button>
          {open && (
            <div
              className="absolute right-0 mt-2 w-40 rounded-lg border shadow-md bg-[var(--color-surface)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              <button className="w-full text-left px-3 py-2 hover:bg-[var(--color-sidebar-active-bg)]">Profile</button>
              <button className="w-full text-left px-3 py-2 hover:bg-[var(--color-sidebar-active-bg)]">Settings</button>
              <button
                className="w-full text-left px-3 py-2"
                onClick={() => { setOpen(false); nav("/login"); }}
                style={{}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-logout-hover-bg)';
                  e.currentTarget.style.color = 'var(--color-logout-text)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text)';
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
