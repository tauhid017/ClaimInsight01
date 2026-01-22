import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface LossMeta {
  incidentType?: string;
  assetType?: string;
  location?: string;
  dateOfLoss?: string;
}

export const generateLossDescription = async (
  imageUrls: string[],
  meta: LossMeta
): Promise<string> => {
  try {
    console.log("🧠 Gemini Model: gemini-1.5-flash");
    console.log("🧠 Images received:", imageUrls.length);

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const prompt = `
You are "ClaimInsight AI", an AI-powered insurance claim assessment system.

Your task is to generate a professional insurance assessment report suitable for direct conversion into a multi-page PDF.

Follow the structure, tone, and formatting rules strictly.

==================================================
DOCUMENT TITLE
==================================================
CLAIM INSIGHT
AI-Powered Insurance Claim Assessment Report

==================================================
SECTION 1: EXECUTIVE SUMMARY
==================================================
Provide a concise, high-level summary using formal insurance terminology.

Include:
- Damage Type
- Severity Level (LOW / MODERATE / SEVERE) with numeric score out of 100
- Estimated Cost Range (INR)
- Report Status (READY FOR CLAIM PROCESSING)
- Recommended Immediate Action (1 line, uppercase)

==================================================
SECTION 2: CLAIM INFORMATION
==================================================
Incident Type: ${meta.incidentType ?? "Not specified"}
Asset Type: ${meta.assetType ?? "Not specified"}
Incident Location: ${meta.location ?? "Not specified"}
Date of Loss: ${meta.dateOfLoss ?? "Not specified"}

==================================================
SECTION 3: DAMAGE ASSESSMENT SUMMARY
==================================================
Summarize the damage based on visual inspection of the provided images.

Include:
- Damage Severity Score (0–100)
- Overall Damage Classification
- Repair Complexity (Low / Medium / High)
- Affected Components (comma-separated list)

==================================================
SECTION 4: DETAILED ANALYSIS
==================================================
Write 1–2 professional paragraphs describing:
- Observed damage patterns
- Extent of impact on functionality or structure
- Probable cause (based only on visible evidence)
- Risk of escalation if repairs are delayed

Use objective, assessor-style language. Avoid speculation beyond visual evidence.

==================================================
SECTION 5: COMPONENT BREAKDOWN
==================================================
List damaged components as numbered points.

==================================================
SECTION 6: RECOMMENDATIONS & COST GUIDANCE
==================================================
Provide:
1. Priority Repairs (timeline-based)
2. Preventive Measures
3. Professional Assessment Advice
4. Cost Estimate Guidance (range-based, non-binding)

Clearly state that estimates are preliminary.

==================================================
IMPORTANT DISCLAIMER
==================================================
Include a formal insurance disclaimer stating:
- This is an AI-generated preliminary assessment
- Physical inspection is recommended
- Final claim approval depends on insurer evaluation

==================================================
FORMATTING RULES (MANDATORY)
==================================================
- Use clear section headings in ALL CAPS
- Do NOT use markdown symbols
- Do NOT use emojis
- Do NOT mention the AI model
- Maintain professional insurance documentation tone
- Ensure output is suitable for a corporate insurance PDF

Analyze all provided images carefully before writing the report.
`;

    // Gemini requires image URLs as inline parts
    const parts: any[] = [
      { text: prompt },
      ...imageUrls.map((url) => ({
        fileData: {
          mimeType: "image/jpeg",
          fileUri: url
        }
      }))
    ];

    const result = await model.generateContent(parts);
    const response = result.response;
    const output = response.text()?.trim();

    if (!output || output.length < 300) {
      throw new Error("Gemini output too short or empty");
    }

    return output;

  } catch (error) {
    console.error("❌ GEMINI GENERATION ERROR:", error);
    throw error;
  }
};
