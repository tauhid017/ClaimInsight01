import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClaim } from "../api/claims.api";

export default function CreateClaim() {
  const navigate = useNavigate();

  const [images, setImages] = useState<File[]>([]);
  const [incidentType, setIncidentType] = useState("");
  const [assetType, setAssetType] = useState("");
  const [location, setLocation] = useState("");
  const [dateOfLoss, setDateOfLoss] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files).slice(0, 5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    if (!incidentType || !assetType || !location || !dateOfLoss) {
      setError("All fields are required");
      return;
    }

    const isoDate = new Date(dateOfLoss).toISOString();
    if (isoDate === "Invalid Date") {
      setError("Invalid date selected");
      return;
    }

    try {
      setLoading(true);

      // 🔥 CREATE CLAIM & GET IT BACK
      const claim = await createClaim({
        images,
        incidentType: incidentType.trim(),
        assetType: assetType.trim(),
        location: location.trim(),
        dateOfLoss: isoDate
      });

      // 🚀 REDIRECT TO CLAIM DETAILS (PDF PREVIEW)
      navigate(`/claims/${claim._id}`);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Claim generation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] px-6 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Create New Claim
        </h1>
        <p className="text-slate-400 mb-8">
          Upload damage images and claim details to generate an AI report
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* IMAGES */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Damage Images (max 5)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={loading}
              className="block w-full text-sm text-slate-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:bg-cyan-500 file:text-white
                hover:file:bg-cyan-400 transition"
            />
          </div>

          {/* FIELDS */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Incident Type (e.g. Fire)"
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="input"
              disabled={loading}
            />
            <input
              placeholder="Asset Type (e.g. Residential)"
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="input"
              disabled={loading}
            />
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
              disabled={loading}
            />
            <input
              type="date"
              value={dateOfLoss}
              onChange={(e) => setDateOfLoss(e.target.value)}
              className="input"
              disabled={loading}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-slate-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:scale-[1.02]"
            } text-white`}
          >
            {loading ? "Generating Claim Report..." : "Generate Claim"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
