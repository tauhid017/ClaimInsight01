import { Schema, model, Types } from "mongoose";

const claimSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },

    claimRef: {
      type: String,
      required: true,
      unique: true
    },

    reportText: {
      type: String,
      required: true
    },

    images: {
      type: [String],
      required: true
    },

    incidentType: String,
    assetType: String,
    location: String,
    dateOfLoss: String,

    pdfUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Claim = model("Claim", claimSchema);
