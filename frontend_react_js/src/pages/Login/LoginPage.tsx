import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/vizai-logo.png";

// PUBLIC_INTERFACE
export default function LoginPage() {
  /** Login screen with VizAI logo, email/password, remember me, forgot password. */
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(true);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate success and navigate to Animal Selection
    if (remember) {
      localStorage.setItem("vizai_auth_email", email);
    }
    nav("/animals");
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--color-bg)" }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border" style={{ borderColor: "var(--color-grey-border)" }}>
        <div className="p-8">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="VizAI" className="h-12 mb-2" />
            <h1 className="text-2xl font-semibold" style={{ color: "var(--color-teal-dark-text)" }}>Sign in to VizAI</h1>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: "var(--color-teal-dark-text)" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none"
                style={{ borderColor: "var(--color-grey-border)" }}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: "var(--color-teal-dark-text)" }}>Password</label>
              <input
                type="password"
                value={pwd}
                onChange={(e)=>setPwd(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none"
                style={{ borderColor: "var(--color-grey-border)" }}
                required
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={remember} onChange={()=>setRemember(v=>!v)} />
                <span style={{ color: "var(--color-faint-text)" }}>Remember me</span>
              </label>
              <button type="button" className="hover:underline" style={{ color: "var(--color-teal-primary)" }}>
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-lg font-medium"
              style={{ background: "var(--color-teal-primary)", color: "white" }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
