import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 z-50 w-full px-8 py-4 transition-all ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="text-xl font-extrabold tracking-tight text-white"
        >
          Claim<span className="text-cyan-400">Insight</span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
          <a href="#demo" className="hover:text-white transition">
            Demo
          </a>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium shadow-md hover:scale-105 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/create-claim"
                className="hover:text-white transition"
              >
                New Claim
              </Link>
              <Link
                to="/history"
                className="hover:text-white transition"
              >
                History
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-500/90 text-white hover:bg-red-500 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
