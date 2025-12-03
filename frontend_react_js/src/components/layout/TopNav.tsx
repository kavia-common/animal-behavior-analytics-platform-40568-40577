import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/vizai-logo.png";

/**
 * Top navigation with logo -> /animals, live clock, and user menu with strict theme tokens.
 */
export default function TopNav() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState<string>(new Date().toLocaleString());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date().toLocaleString()), 1000);
    return () => clearInterval(id);
  }, []);

  const goAnimals = (e: React.MouseEvent) => {
    e.preventDefault();
    nav("/animals");
  };

  return (
    <div className="flex items-center justify-between h-16 px-6" style={{ color: "var(--color-text)" }}>
      <a href="/animals" onClick={goAnimals} className="inline-flex items-center gap-3">
        <img src={logo} className="h-8" alt="VizAI" />
        <span className="font-semibold">VizAI</span>
      </a>

      <div className="flex-1" />

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
