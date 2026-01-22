import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl"
      >
        <h1 className="text-7xl font-extrabold text-white mb-4">404</h1>

        <p className="text-xl text-slate-300 mb-2">
          Page not found
        </p>

        <p className="text-slate-400 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
          >
            Go Home
          </Link>

          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:scale-[1.03] transition"
          >
            Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
