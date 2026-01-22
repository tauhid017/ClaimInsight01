import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import { authLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);

export default router;
