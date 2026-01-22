import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getMyClaims,getSingleClaim  } from "../controllers/claim.controller";
import { getClaimPdf } from "../controllers/claim.controller";
import { getUserClaims } from "../controllers/claim.controller";
const router = Router();

router.get("/my", protect, getMyClaims);
router.get("/:id", protect, getSingleClaim);
router.get("/:id/pdf", protect, getClaimPdf);
router.get("/", protect, getUserClaims);

export default router;
