import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Left sidebar with icons and strict active highlight using #E6F5F0.
 */
export default function Sidebar({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const linkCls = ({ isActive }: any) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "sidebar-active" : ""}`;

  const iconStyle = { background: "var(--color-sidebar-active-bg)", color: "var(--color-text)" } as const;
  const baseText = { color: "var(--color-text-muted)" };

  return (
    <div className="h-full p-4 space-y-2">
      <NavLink to="/dashboard" className={linkCls}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={iconStyle}>🏠</span>
        <span style={baseText}>Home</span>
      </NavLink>
      <NavLink to="/timeline" className={linkCls}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={iconStyle}>🎞️</span>
        <span style={baseText}>Video</span>
      </NavLink>
      <NavLink to="/reports" className={linkCls}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={iconStyle}>📄</span>
        <span style={baseText}>Reports</span>
      </NavLink>
      <NavLink to="/library" className={linkCls}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={iconStyle}>📚</span>
        <span style={baseText}>Video Library</span>
      </NavLink>
      <NavLink to="/analytics" className={linkCls}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={iconStyle}>📊</span>
        <span style={baseText}>Analytics</span>
      </NavLink>
    </div>
  );
}
