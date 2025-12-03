import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/vizai-logo.png";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setGlobalDateRange, setLastActiveTab } from "@/store/slices/uiSlice";

/**
 * Top navigation with:
 * - Logo -> Animal Selection (per User Flow)
 * - Main tabs (Dashboard | Timeline | Reports | Chat) with persistence into ui.lastActiveTab
 * - Global date range selector persisted across tabs (Architecture Strategy)
 * - Live clock and user menu
 */
export default function TopNav() {
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
    if (dir === 'today') {
      // same day
    } else if (dir === '7d') {
      start.setDate(end.getDate() - 6);
    } else {
      start.setDate(end.getDate() - 29);
    }
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    dispatch(setGlobalDateRange({ start: fmt(start), end: fmt(end) }));
  };

  return (
    <div className="flex items-center justify-between h-16 px-6" style={{ color: "var(--color-text)" }}>
      <a href="/animals" onClick={goAnimals} className="inline-flex items-center gap-3">
        <img src={logo} className="h-8" alt="VizAI" />
        <span className="font-semibold">VizAI</span>
      </a>

      {/* Main Tabs and Date range selector */}
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <button
            className={`px-2 py-1 rounded ${activeTab === 'dashboard' ? 'bg-[var(--color-sidebar-active-bg)]' : ''}`}
            onClick={() => setTab('dashboard', '/dashboard')}
          >
            Dashboard
          </button>
        </nav>
        <nav className="hidden md:flex items-center gap-4 text-sm">
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
          <button
            className={`px-2 py-1 rounded ${activeTab === 'chat' ? 'bg-[var(--color-sidebar-active-bg)]' : ''}`}
            onClick={() => setTab('chat', '/reports')}
            title="Phase 1 placeholder"
          >
            Chat
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-2 text-xs">
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
                className="w-full text-left px-3 py-2 logout-hover"
                onClick={() => nav("/login")}
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
