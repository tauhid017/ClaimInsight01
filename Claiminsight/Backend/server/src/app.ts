import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import lossRoutes from "./routes/loss.routes";
import claimRoutes from "./routes/claim.routes";

import { globalLimiter } from "./middlewares/rateLimit.middleware";

const app = express();

/* ================= CORE MIDDLEWARES ================= */

// ✅ Allow frontend (Vite)
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ Parse JSON bodies
app.use(express.json());

/* ================= RATE LIMITING ================= */

// 🔒 Global abuse protection
app.use(globalLimiter);

/* ================= ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/loss", lossRoutes);
app.use("/api/claims", claimRoutes);

/* ================= HEALTH CHECK ================= */

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ClaimInsight API running 🚀"
  });
});

export default app;
