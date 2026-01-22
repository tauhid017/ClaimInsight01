import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-[#020617] text-[#E3E3E3]">
      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          ClaimInsight
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-lg text-slate-400"
        >
          AI-powered insurance claim assessment that converts damage images
          into professional, insurer-ready PDF reports in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mt-10"
        >
          <Link
            to="/signup"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition"
          >
            Login
          </Link>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why ClaimInsight?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI Damage Analysis",
              desc: "Upload images and let AI generate detailed insurance-grade loss descriptions."
            },
            {
              title: "Instant PDF Reports",
              desc: "Professional PDFs generated automatically and ready to submit."
            },
            {
              title: "Claim History & Tracking",
              desc: "Access all past claims anytime from your dashboard."
            }
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur"
            >
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DEMO VIDEO */}
      <section className="py-24 px-6 bg-[#0B1220]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
        >
          See ClaimInsight in Action
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto rounded-xl overflow-hidden border border-white/10 shadow-2xl"
        >
          <iframe
            src="https://drive.google.com/file/d/1kwP1sZZ1y_6syDZFkTciLG74zwJ2fra3/preview"
            className="w-full h-[60vh]"
            allow="autoplay"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* ABOUT CREATOR */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-6"
        >
          About the Creator
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-slate-400 mb-8"
        >
          Built by <span className="text-white font-semibold">Tauhid Shaikh</span>,  
          a full-stack developer focused on building real-world, AI-powered SaaS
          products with clean UX and scalable architecture.
        </motion.p>

        <div className="flex justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/shaikh-tauhid-shaikh-javed027"
            target="_blank"
            className="text-cyan-400 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/tauhid017"
            target="_blank"
            className="text-cyan-400 hover:underline"
          >
            GitHub
          </a>
          <a
            href="mailto:tauhidshaikhsas@gmail.com"
            className="text-cyan-400 hover:underline"
          >
            Email
          </a>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 text-center border-t border-white/10">
        <h3 className="text-2xl font-bold mb-4">
          Ready to simplify insurance claims?
        </h3>
        <Link
          to="/signup"
          className="inline-block px-10 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold hover:scale-105 transition"
        >
          Start Free
        </Link>
      </section>
    </div>
  );
}
