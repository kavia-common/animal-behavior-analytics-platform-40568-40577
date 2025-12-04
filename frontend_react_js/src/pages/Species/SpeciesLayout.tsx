import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function SpeciesLayout() {
  /** Layout visible after species selection; shows species tabs and renders nested routes. */
  const nav = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [chatLog, setChatLog] = useState<Array<{role:'user'|'bot', text:string}>>([
    { role: 'bot', text: 'Hi! I can help you explore the Giant Anteater data.' }
  ]);

  const tabs = [
    { key: 'animals', label: 'Animals', path: '/select-species', external: true },
    { key: 'dashboard', label: 'Dashboard', path: '/species/anteater/dashboard' },
    { key: 'timeline', label: 'Timeline', path: '/species/anteater/timeline' },
    { key: 'reports', label: 'Reports', path: '/species/anteater/reports' },
    { key: 'analytics', label: 'Analytics', path: '/species/anteater/analytics' },
  ];

  const send = (text: string) => {
    setChatLog(prev => [...prev, { role: 'user', text }]);
    // Simple stub response
    setTimeout(() => setChatLog(prev => [...prev, { role: 'bot', text: 'Action queued. Use quick actions below.' }]), 400);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 16 }}>
      <div className="ui-card" style={{ padding: 12, marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {tabs.map(t => t.external ? (
            <button
              key={t.key}
              className="ui-btn"
              onClick={() => nav(t.path)}
              style={{ color: 'var(--text)', background: 'transparent', borderColor: 'transparent' }}
            >
              {t.label}
            </button>
          ) : (
            <NavLink key={t.key} to={t.path} style={({ isActive }) => ({
              padding: '8px 12px',
              borderRadius: 10,
              textDecoration: 'none',
              color: isActive ? '#fff' : 'var(--text)',
              background: isActive ? 'var(--primary)' : 'transparent',
              border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
              fontWeight: 600,
            })}>
              {t.label}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />

      <div className="fab" onClick={() => setShowChat(s => !s)} aria-label="Chat Bot">
        💬
      </div>

      {showChat && (
        <div className="chat-window">
          <div className="chat-header">
            <span>VizAI Assistant</span>
            <button className="ui-btn ui-btn-outline" onClick={() => setShowChat(false)}>Close</button>
          </div>
          <div className="chat-body">
            {chatLog.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'msg-user' : 'msg-bot'}>{m.text}</div>
            ))}
          </div>
          <div className="chat-quick">
            <button className="ui-btn ui-btn-primary" onClick={() => nav('/species/anteater/timeline')}>View Timeline</button>
            <button className="ui-btn ui-btn-outline" onClick={() => nav('/species/anteater/timeline')}>Open Video</button>
            <button className="ui-btn ui-btn-primary" onClick={() => nav('/species/anteater/reports')}>Generate Report</button>
          </div>
          <div className="chat-footer">
            <input className="ui-input" placeholder="Type a message..." onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = (e.target as HTMLInputElement).value.trim();
                if (val) {
                  send(val);
                  (e.target as HTMLInputElement).value = '';
                }
              }
            }} />
            <button className="ui-btn ui-btn-primary" onClick={() => send('Help me analyze pacing behavior')}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
