import React from 'react';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function SpeciesSelectPage() {
  /** Grid of species; only Giant Anteater active; others show Coming Soon badge+tooltip */
  const navigate = useNavigate();
  const species = [
    { name: 'Giant Anteater', active: true },
    { name: 'Red Panda', active: false },
    { name: 'Snow Leopard', active: false },
    { name: 'River Otter', active: false },
    { name: 'Chimpanzee', active: false },
    { name: 'Giraffe', active: false },
    { name: 'Lion', active: false },
    { name: 'Penguin', active: false },
  ];

  return (
    <div className="bg-app" style={{ minHeight: '100vh', padding: 24 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--gradient)' }} />
        <div className="text-body" style={{ fontWeight: 800, fontSize: 18 }}>VizAi</div>
      </div>
      <h1 className="text-body" style={{ fontSize: 22, marginBottom: 16 }}>Select an Animal</h1>
      <div style={{ display:'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 16 }}>
        {species.map(s => {
          const isAnteater = s.name === 'Giant Anteater';
          return (
            <div
              key={s.name}
              className="card card-hover"
              style={{ padding: 16, cursor: s.active ? 'pointer' : 'not-allowed', opacity: s.active ? 1 : 0.5, borderColor: isAnteater ? 'var(--primary)' : 'var(--border)' }}
              onClick={() => s.active ? navigate('/species/anteater/dashboard') : undefined}
              title={s.active ? s.name : 'Coming Soon'}
            >
              <div style={{ height: 120, background: 'var(--table-header-bg)', borderRadius: 8, marginBottom: 10 }} />
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div className="text-body" style={{ fontWeight: 700 }}>{s.name}</div>
                {!s.active && <span className="badge-coming" style={{ padding: '4px 8px', borderRadius: 8, fontSize: 12 }}>Coming Soon</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
