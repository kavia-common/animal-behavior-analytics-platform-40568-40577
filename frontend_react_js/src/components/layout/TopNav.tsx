import React, { useMemo, useState } from 'react';
import logo from '../../assets/vizai-logo.png';

const TopNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const now = useMemo(() => new Date().toLocaleString(), []);

  return (
    <header
      className="w-full bg-white border-b px-6 py-3 flex items-center justify-between"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Left: Logo + Title */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="VizAI" className="h-6" />
        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
          VizAI
        </span>
      </div>

      {/* Center: Animal Filter Dropdown - green pill with primary border */}
      <div className="flex-1 flex justify-center px-4">
        <button
          className="pill"
          style={{
            background: 'var(--color-accent)',
            color: '#fff',
            borderColor: 'var(--color-primary)',
          }}
        >
          Animal Filter
        </button>
      </div>

      {/* Right: Date/Time and User Menu */}
      <div className="flex items-center space-x-3 relative">
        <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {now}
        </div>
        <div className="relative">
          <button
            className="px-3 py-1 rounded"
            style={{
              borderRadius: 'var(--radius-button)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)',
            }}
            onClick={() => setMenuOpen((s) => !s)}
          >
            User
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white border rounded shadow"
              style={{
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-card)',
                boxShadow: 'var(--shadow-elevation)',
              }}
            >
              <a className="block px-3 py-2 hover:bg-gray-50" href="/profile">
                Profile
              </a>
              <a className="block px-3 py-2 hover:bg-gray-50" href="/settings">
                Settings
              </a>
              <button
                className="w-full text-left px-3 py-2 logout-hover"
                onClick={() => {
                  // Implement logout when backend wired
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
