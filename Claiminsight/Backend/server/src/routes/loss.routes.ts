import { Router } from "express";
import multer from "multer";
import { createLoss } from "../controllers/loss.controller";
import { protect } from "../middlewares/auth.middleware";
import { aiLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage()
});

router.post(
  "/generate",
  protect,
  aiLimiter,
  upload.array("images", 5), // 🔥 MUST MATCH frontend
  createLoss
);

export default router;
