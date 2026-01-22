import api from "./axios";

export interface CreateClaimPayload {
  images: File[];
  incidentType: string;
  assetType: string;
  location: string;
  dateOfLoss: string;
}

export const createClaim = async (data: CreateClaimPayload) => {
  const formData = new FormData();

  data.images.forEach((img) => {
    formData.append("images", img); // MUST match multer
  });

  formData.append("incidentType", data.incidentType);
  formData.append("assetType", data.assetType);
  formData.append("location", data.location);
  formData.append("dateOfLoss", data.dateOfLoss);

  const res = await api.post("/loss/generate", formData);
  
  // 🔥 return ONLY the created claim
  return res.data.claim;
};

export const downloadClaimPdf = async (claimId: string) => {
  const res = await api.get(`/claims/${claimId}/pdf`, {
    responseType: "blob" // 🔥 VERY IMPORTANT
  });

  return res.data;
};
export const getMyClaims = async () => {
  const res = await api.get("/claims");
  return res.data.claims;
};

