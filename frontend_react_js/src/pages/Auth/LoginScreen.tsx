import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function LoginScreen() {
  /** Login screen per spec with themed UI and required Role selection */
  const navigate = useNavigate();
  const roles = ['Zoo Manager', 'Veterinarian', 'Researcher', 'Animal Keeper'];
  const [form, setForm] = useState({ email: '', password: '', role: '', remember: false });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role) return;
    navigate('/select-species');
  };

  return (
    <div className="bg-app" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div className="card" style={{ width: 460, padding: 24 }}>
        <h1 className="text-body" style={{ margin: 0, fontSize: 22 }}>Welcome back</h1>
        <p className="text-muted" style={{ marginTop: 6, marginBottom: 16, fontSize: 14 }}>
          Sign in to continue to Zoo Monitoring Dashboard
        </p>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Password" type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <select className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="" disabled>Select Role</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <label className="text-muted" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
            <input type="checkbox" checked={form.remember} onChange={e => setForm({ ...form, remember: e.target.checked })} />
            Remember Me
          </label>
          <button className="btn-primary" style={{ borderRadius: 8, padding: '10px 12px' }} type="submit">Sign In</button>
        </form>
        <div style={{ marginTop: 12, fontSize: 14 }} className="text-muted">
          New here? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
