import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function RegisterPage() {
  /** Registration page with fields and themed button; navigates to login on completion */
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'Zoo Manager' });
  const roles = ['Zoo Manager', 'Veterinarian', 'Researcher', 'Animal Keeper'];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Stub registration flow
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div className="ui-card" style={{ width: 420, padding: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Create account</h1>
        <p style={{ color: 'var(--muted)', marginTop: 6, marginBottom: 16 }}>Join VizAI Zoo Monitoring Dashboard</p>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label className="ui-label">Name</label>
          <input className="ui-input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <label className="ui-label">Email</label>
          <input className="ui-input" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <label className="ui-label">Password</label>
          <input className="ui-input" type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <label className="ui-label">Confirm Password</label>
          <input className="ui-input" type="password" required value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
          <label className="ui-label">Role</label>
          <select className="ui-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            {roles.map(r => (<option key={r} value={r}>{r}</option>))}
          </select>
          <button className="ui-btn ui-btn-primary" type="submit">Register</button>
        </form>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
