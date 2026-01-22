import { Request, Response } from "express";
import { uploadImage, uploadPdf } from "../services/cloudinary.service";
import { generateLossDescription } from "../services/ai.service";
import { generateClaimPdf } from "../utils/pdf.generator";
import { Claim } from "../models/claim.model";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createLoss = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const files = req.files as Express.Multer.File[];

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded"
      });
    }

    /* 1️⃣ Upload images */
    const imageUrls: string[] = [];
    for (const file of files) {
      const url = await uploadImage(file.buffer);
      imageUrls.push(url);
    }

    /* 2️⃣ Extract metadata */
    const { incidentType, assetType, location, dateOfLoss } = req.body;

    /* 3️⃣ Generate AI report */
    const reportText = await generateLossDescription(imageUrls, {
      incidentType,
      assetType,
      location,
      dateOfLoss
    });

    /* 4️⃣ Generate Claim Ref */
    const claimRef = `CI-${Date.now()}`;

    /* 5️⃣ Generate PDF */
    const pdfBuffer = await generateClaimPdf({
      reportText,
      imageUrl: imageUrls[0],
      claimRef
    });

    /* 6️⃣ Upload PDF to Cloudinary */
    const pdfUrl = await uploadPdf(pdfBuffer, claimRef);

    /* 7️⃣ Save Claim WITH pdfUrl */
    const claim = await Claim.create({
      user: userId,
      claimRef,
      reportText,
      images: imageUrls,
      incidentType,
      assetType,
      location,
      dateOfLoss,
      pdfUrl
    });

    return res.status(201).json({
      success: true,
      message: "Claim created successfully",
      claim
    });
  } catch (error) {
    console.error("CreateLoss error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create claim"
    });
  }
};
