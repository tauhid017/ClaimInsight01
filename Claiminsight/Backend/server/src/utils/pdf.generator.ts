import PDFDocument from "pdfkit";

interface PdfInput {
  reportText: string;
  imageUrl?: string;
  claimRef: string;
}

export const generateClaimPdf = async ({
  reportText,
  imageUrl,
  claimRef
}: PdfInput): Promise<Buffer> => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50
      });

      const buffers: Buffer[] = [];
      let pageNumber = 1;

      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      /* ================= TITLE ================= */
      doc
        .font("Helvetica-Bold")
        .fontSize(22)
        .text("CLAIM INSIGHT", { align: "center" })
        .moveDown(0.4);

      doc
        .fontSize(13)
        .font("Helvetica")
        .text("AI-Powered Insurance Claim Assessment Report", {
          align: "center"
        })
        .moveDown(1);

      doc
        .fontSize(10)
        .text(`Claim Reference: ${claimRef}`, {
          align: "right"
        })
        .moveDown(1.2);

      /* ================= IMAGE ================= */
      if (imageUrl) {
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const imgBuffer = Buffer.from(arrayBuffer);

        doc
          .image(imgBuffer, {
            fit: [450, 250],
            align: "center"
          })
          .moveDown(1.5);
      }

      /* ================= BODY ================= */
      const lines = reportText.split("\n");

      for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) {
          doc.moveDown(0.6);
          continue;
        }

        if (doc.y > doc.page.height - 80) {
        //   addFooter(doc, pageNumber);
          doc.addPage();
          pageNumber++;
        }

        // SECTION HEADINGS
        if (line.startsWith("SECTION")) {
          doc
            .moveDown(0.8)
            .font("Helvetica-Bold")
            .fontSize(14)
            .text(line)
            .moveDown(0.4);
          continue;
        }

        // BOLD LABEL FIELDS
        const boldFields = [
          "Damage Type:",
          "Severity Level:",
          "Estimated Cost Range:",
          "Report Status:",
          "Recommended Immediate Action:",
          "Incident Type:",
          "Asset Type:",
          "Incident Location:",
          "Date of Loss:",
          "Overall Damage Classification:",
          "Repair Complexity:",
          "Affected Components:"
        ];

        const matchedField = boldFields.find((f) => line.startsWith(f));

        if (matchedField) {
          const value = line.replace(matchedField, "").trim();

          doc
            .font("Helvetica-Bold")
            .fontSize(11)
            .text(matchedField, { continued: true });

          doc
            .font("Helvetica")
            .text(` ${value}`, { align: "justify" })
            .moveDown(0.3);

          continue;
        }

        // NORMAL PARAGRAPH TEXT
        doc
          .font("Helvetica")
          .fontSize(11)
          .text(line, {
            align: "justify",
            lineGap: 4
          });
      }

      /* ================= FOOTER ================= */
    //   addFooter(doc, pageNumber);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

/* ================= FOOTER ================= */
// const addFooter = (
//   doc: PDFKit.PDFDocument,
//   pageNumber: number
// ) => {
//   doc
//     .fontSize(9)
//     .fillColor("gray")
//     .text(
//       `Page ${pageNumber} | Confidential Insurance Document`,
//       50,
//       doc.page.height - 50,
//       { align: "center" }
//     )
//     .fillColor("black");
// };
