import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { downloadClaimPdf } from "../api/claims.api";

export default function ClaimDetails() {
  const { id } = useParams<{ id: string }>();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPdf = async () => {
      const blob = await downloadClaimPdf(id!);
      const url = URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );
      setPdfUrl(url);
      setLoading(false);
    };

    loadPdf();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [id]);

  const handleDownload = async () => {
    const blob = await downloadClaimPdf(id!);

    const url = URL.createObjectURL(
      new Blob([blob], { type: "application/pdf" })
    );

    const a = document.createElement("a");
    a.href = url;
    a.download = `claim-${id}.pdf`; // ✅ FORCE EXTENSION
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#020617] px-6 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Claim Report
        </h1>

        {loading && (
          <p className="text-slate-400 text-center">Loading PDF…</p>
        )}

        {pdfUrl && (
          <div className="w-full h-[85vh] rounded-xl overflow-hidden border border-white/10 bg-black">
            <iframe
              src={pdfUrl}
              title="Claim PDF"
              className="w-full h-full"
            />
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition"
          >
            Download PDF
          </button>
        </div>
      </motion.div>
    </div>
  );
}
