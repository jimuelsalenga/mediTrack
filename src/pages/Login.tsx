import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, LogIn, AlertCircle } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    }, 600);
  };
  return (
    <div className="mx-auto max-w-[430px] min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground tracking-wide">NEU</span>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">MediTrack</h1>
          <p className="text-sm text-muted-foreground mt-1">Student Health Informatics</p>
        </div>
      </div>
      {/* Login Card */}
      <div className="w-full bg-card rounded-2xl p-6 card-shadow space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Sign In</h2>
        </div>
        {error && (
          <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
              required
              className="w-full h-11 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-11 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 rounded-2xl card-shadow transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>
        {/* Hint */}
        <div className="bg-secondary rounded-xl p-4 space-y-2">
          <p className="text-[11px] font-semibold text-muted-foreground tracking-wider uppercase">Demo Accounts</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">Admin:</span> admin@email.com / admin123</p>
            <p><span className="font-semibold text-foreground">Staff:</span> staff@email.com / staff123</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;