import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { loginUser } from "../api/auth.api";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Redirect user back to intended route or dashboard
  const redirectTo =
    (location.state as { from?: string })?.from || "/create-claim";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      login(data.token);
      navigate(redirectTo, { replace: true }); // ✅ FIXED
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 shadow-2xl"
      >
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-slate-400 text-sm text-center mb-6">
          Login to continue to{" "}
          <span className="text-cyan-400">ClaimInsight</span>
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-slate-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-[1.02]"
            } text-white`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-slate-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-400 hover:text-cyan-300 transition font-medium"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
