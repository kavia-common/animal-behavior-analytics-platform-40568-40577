import React from 'react';

export default function TopNav() {
  return (
    <header style={{ position:'sticky', top:0, zIndex: 10, background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: 8, background: 'var(--gradient)' }} />
          <strong>VizAI</strong>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 12 }}>Species: Giant Anteater</div>
      </div>
    </header>
  );
}
