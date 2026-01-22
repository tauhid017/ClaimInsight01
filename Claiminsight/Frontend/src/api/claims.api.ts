import api from "./axios";

export interface CreateClaimPayload {
  images: File[];
  incidentType: string;
  assetType: string;
  location: string;
  dateOfLoss: string;
}

/* ================= CREATE CLAIM ================= */

export const createClaim = async (data: CreateClaimPayload) => {
  const formData = new FormData();

  data.images.forEach((img) => {
    formData.append("images", img); // must match multer field
  });

  formData.append("incidentType", data.incidentType);
  formData.append("assetType", data.assetType);
  formData.append("location", data.location);
  formData.append("dateOfLoss", data.dateOfLoss);

  const res = await api.post("/loss/generate", formData);

  // return ONLY the created claim
  return res.data.claim;
};

/* ================= DOWNLOAD PDF ================= */

export async function downloadClaimPdf(id: string): Promise<Blob> {
  const response = await api.get(`/claims/${id}/pdf`, {
    responseType: "blob",
  });
  return response.data as Blob;
}

/* ================= CLAIM HISTORY ================= */

export const getMyClaims = async () => {
  const res = await api.get("/claims");
  return res.data.claims;
};
