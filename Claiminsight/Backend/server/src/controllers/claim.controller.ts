import { Request, Response } from "express";
import https from "https";
import { Claim } from "../models/claim.model";
import { AuthRequest } from "../middlewares/auth.middleware";

// ================= GET MY CLAIMS =================
export const getMyClaims = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const claims = await Claim.find({ user: userId })
      .select(
        "claimRef incidentType assetType location dateOfLoss pdfUrl createdAt"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      claims
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch claims"
    });
  }
};

// ================= GET SINGLE CLAIM =================
export const getSingleClaim = async (req: AuthRequest, res: Response) => {
  try {
    const claim = await Claim.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found"
      });
    }

    res.status(200).json({
      success: true,
      claim
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch claim"
    });
  }
};

// ================= DOWNLOAD CLAIM PDF =================
export const getClaimPdf = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const claimId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const claim = await Claim.findOne({
      _id: claimId,
      user: userId
    }).select("pdfUrl claimRef");

    if (!claim || !claim.pdfUrl) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // ✅ FORCE PDF TYPE
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${claim.claimRef}.pdf"`
    );

    https.get(claim.pdfUrl, (stream) => {
      stream.pipe(res);
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch PDF" });
  }
};

export const getUserClaims = async (req: AuthRequest, res: Response) => {
  const claims = await Claim.find({ user: req.userId })
    .sort({ createdAt: -1 })
    .select("_id claimRef incidentType assetType location createdAt");

  res.json({
    success: true,
    claims
  });
};
