import cloudinary from "../config/cloudinary";

/* ========== IMAGE UPLOAD ========== */
export const uploadImage = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "claiminsight/images",
        resource_type: "image"
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Image upload failed"));
        }
        resolve(result.secure_url);
      }
    ).end(buffer);
  });
};

/* ========== PDF UPLOAD ========== */
export const uploadPdf = (
  pdfBuffer: Buffer,
  claimRef: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "claiminsight/pdfs",
        resource_type: "raw",   // 🔥 REQUIRED
        public_id: claimRef,
        overwrite: true
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("PDF upload failed"));
        }

        // ✅ ENSURE RAW URL
        const rawUrl = result.secure_url.replace("/image/upload/", "/raw/upload/");
        resolve(rawUrl);
      }
    ).end(pdfBuffer);
  });
};
