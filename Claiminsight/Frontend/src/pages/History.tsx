import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getMyClaims } from "../api/claims.api";

interface Claim {
  _id: string;
  claimRef: string;
  incidentType: string;
  assetType: string;
  location: string;
  createdAt: string;
}

export default function History() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getMyClaims().then((data) => {
      setClaims(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="px-6 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Claim History
        </h1>

        {loading && (
          <p className="text-slate-400">Loading claims...</p>
        )}

        {!loading && claims.length === 0 && (
          <p className="text-slate-400">
            No claims created yet.
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {claims.map((claim) => (
            <motion.div
              key={claim._id}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer rounded-xl bg-white/5 border border-white/10 p-6 hover:border-cyan-400/40 transition"
              onClick={() => navigate(`/claims/${claim._id}`)}
            >
              <h3 className="text-xl font-semibold text-white mb-1">
                {claim.claimRef}
              </h3>

              <p className="text-slate-400 text-sm mb-2">
                {claim.incidentType} • {claim.assetType} • {claim.location}
              </p>

              <p className="text-slate-500 text-xs">
                {new Date(claim.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
