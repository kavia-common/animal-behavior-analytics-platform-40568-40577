import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Left sidebar with icons and active highlight using Light Teal #E0F7F5.
 */
export default function Sidebar({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const linkCls = ({ isActive }: any) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "sidebar-active" : ""}`;

  const baseText = { color: "var(--color-faint-text)" };

  return (
    <div className="h-full p-4 space-y-2">
      <NavLink to="/dashboard" className={linkCls}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--color-teal-light)", color: "var(--color-teal-dark-text)" }}>🏠</span>
        <span style={baseText}>Home</span>
      </NavLink>
      <NavLink to="/timeline" className={linkCls}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--color-teal-light)", color: "var(--color-teal-dark-text)" }}>🎞️</span>
        <span style={baseText}>Video</span>
      </NavLink>
      <NavLink to="/dashboard" className={linkCls}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--color-teal-light)", color: "var(--color-teal-dark-text)" }}>📈</span>
        <span style={baseText}>Graph</span>
      </NavLink>
      <NavLink to="/reports" className={linkCls}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--color-teal-light)", color: "var(--color-teal-dark-text)" }}>📄</span>
        <span style={baseText}>Reports</span>
      </NavLink>
    </div>
  );
}
