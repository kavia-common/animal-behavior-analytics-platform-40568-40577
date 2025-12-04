import React from 'react';
import { useNavigate } from 'react-router-dom';

const animals = [
  { id: 'anteater', name: 'Giant Anteater', active: true },
  { id: 'redpanda', name: 'Red Panda', active: false },
  { id: 'snowleopard', name: 'Snow Leopard', active: false },
  { id: 'riverotter', name: 'River Otter', active: false },
  { id: 'chimpanzee', name: 'Chimpanzee', active: false },
  { id: 'giraffe', name: 'Giraffe', active: false },
  { id: 'lion', name: 'Lion', active: false },
  { id: 'penguin', name: 'Penguin', active: false },
];

// PUBLIC_INTERFACE
export default function SpeciesSelectPage() {
  /** Species selection grid. Only Anteater is active; others disabled with 'Coming Soon' badge. */
  const nav = useNavigate();

  return (
    <div style={{ padding: 24, minHeight: '100vh' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <h1 style={{ marginTop: 10, marginBottom: 18 }}>Select an Animal</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 16 }}>
          {animals.map(a => (
            <div
              key={a.id}
              className="ui-card ui-card-hover"
              onClick={() => a.active && nav('/species/anteater/dashboard')}
              style={{
                padding: 16,
                cursor: a.active ? 'pointer' : 'not-allowed',
                opacity: a.active ? 1 : 0.5,
                borderColor: a.active ? 'var(--primary)' : 'var(--border)',
                position: 'relative'
              }}
            >
              <div style={{ height: 120, background: 'var(--table-header-bg)', borderRadius: 8, marginBottom: 10 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontWeight: 700 }}>{a.name}</div>
                {!a.active && <span className="ui-badge ui-badge-secondary">Coming Soon</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
