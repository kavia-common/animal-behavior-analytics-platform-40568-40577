import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function LoginScreen() {
  /** Login screen with role dropdown and themed button that routes to species selection */
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'Zoo Manager', remember: true });
  const roles = ['Zoo Manager', 'Veterinarian', 'Researcher', 'Animal Keeper'];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/select-species');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div className="ui-card" style={{ width: 460, padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--gradient)' }} />
          <div style={{ fontWeight: 800, fontSize: 18 }}>VizAi</div>
        </div>
        <h1 style={{ margin: 0, fontSize: 22 }}>Welcome back</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6, marginBottom: 16 }}>
          Sign in to continue to Zoo Monitoring Dashboard
        </p>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label className="ui-label">Email</label>
          <input className="ui-input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <label className="ui-label">Password</label>
          <input className="ui-input" type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <label className="ui-label">Role</label>
          <select className="ui-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            {roles.map(r => (<option key={r} value={r}>{r}</option>))}
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted)' }}>
            <input type="checkbox" checked={form.remember} onChange={e => setForm({ ...form, remember: e.target.checked })} />
            Remember me
          </label>
          <button className="ui-btn ui-btn-primary" type="submit">Sign in</button>
        </form>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          New here? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
