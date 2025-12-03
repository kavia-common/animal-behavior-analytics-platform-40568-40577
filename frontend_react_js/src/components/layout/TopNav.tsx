import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/vizai-logo.png";

/**
 * Top navigation with logo -> /animals, clock timestamp, and simple user menu.
 */
export default function TopNav() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const goAnimals = (e: React.MouseEvent) => {
    e.preventDefault();
    nav("/animals");
  };

  return (
    <div className="flex items-center justify-between h-16 px-6">
      <a href="/animals" onClick={goAnimals} className="inline-flex items-center gap-3">
        <img src={logo} className="h-8" alt="VizAI" />
        <span className="font-semibold" style={{ color: "var(--color-teal-dark-text)" }}>VizAI</span>
      </a>

      <div className="flex-1" />

      <div className="flex items-center gap-6 text-sm" style={{ color: "var(--color-teal-dark-text)" }}>
        <span className="hidden md:block">{new Date().toLocaleString()}</span>
        <div className="relative">
          <button className="px-3 py-1.5 rounded-lg border" style={{ borderColor: "var(--color-grey-border)" }} onClick={() => setOpen(v=>!v)}>
            User
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg border shadow-md" style={{ borderColor: "var(--color-grey-border)" }}>
              <button className="w-full text-left px-3 py-2 hover:bg-[var(--color-teal-light)]">Profile</button>
              <button className="w-full text-left px-3 py-2 hover:bg-[var(--color-teal-light)]">Settings</button>
              <button className="w-full text-left px-3 py-2 hover:bg-[var(--color-teal-light)]" onClick={()=>nav("/login")}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
