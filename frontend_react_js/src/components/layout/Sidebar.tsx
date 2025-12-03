import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

/**
 * Left sidebar with icons and strict active highlight using theme tokens.
 * Supports optional onNavigate callback (used to close mobile drawer).
 */
export default function Sidebar({ onNavigate }: { onNavigate?: (path?: string) => void }) {
  const navigate = useNavigate();
  const linkCls = ({ isActive }: any) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "sidebar-active" : ""}`;

  const iconStyle = { background: "var(--color-sidebar-active-bg)", color: "var(--color-text)" } as const;
  const baseText = { color: "var(--color-text-muted)" };

  const go = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigate(path);
  };

  return (
    <div className="h-full p-4 space-y-2">
      <NavLink to="/dashboard" className={linkCls} onClick={(e) => { e.preventDefault(); go("/dashboard"); }}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={iconStyle}>🏠</span>
        <span style={baseText}>Home</span>
      </NavLink>
      <NavLink to="/timeline" className={linkCls} onClick={(e) => { e.preventDefault(); go("/timeline"); }}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={iconStyle}>🎬</span>
        <span style={baseText}>Video</span>
      </NavLink>
      <NavLink to="/analytics" className={linkCls} onClick={(e) => { e.preventDefault(); go("/analytics"); }}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={iconStyle}>📈</span>
        <span style={baseText}>Graph</span>
      </NavLink>
      <NavLink to="/reports" className={linkCls} onClick={(e) => { e.preventDefault(); go("/reports"); }}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={iconStyle}>📄</span>
        <span style={baseText}>Reports</span>
      </NavLink>
    </div>
  );
}
