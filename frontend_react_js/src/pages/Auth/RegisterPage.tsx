import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function RegisterPage() {
  /** Registration page matching spec; navigates to Login on submit */
  const navigate = useNavigate();
  const roles = ['Zoo Manager', 'Veterinarian', 'Researcher', 'Animal Keeper'];
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="bg-app" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div className="card" style={{ width: 420, padding: 24 }}>
        <h1 className="text-body" style={{ margin: 0, fontSize: 22 }}>Create account</h1>
        <p className="text-muted" style={{ marginTop: 6, marginBottom: 16, fontSize: 14 }}>Sign up to get started.</p>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Password" type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          <input className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} placeholder="Confirm Password" type="password" required value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
          <select className="border-default bg-surface text-body" style={{ padding: 10, borderRadius: 8 }} required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="" disabled>Select Role</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button className="btn-primary" style={{ borderRadius: 8, padding: '10px 12px' }} type="submit">Register</button>
        </form>
        <div style={{ marginTop: 12, fontSize: 14 }} className="text-muted">
          Have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
