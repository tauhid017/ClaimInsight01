export const ENV = {
  // Server
  PORT: process.env.PORT || "5000",
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGODB_URI: process.env.MONGODB_URI!,

  // Auth / Security
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  // AI (Gemini primary)
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,

  // Optional OpenAI fallback (keep commented if unused)
  // OPENAI_API_KEY: process.env.OPENAI_API_KEY,

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,

  // Email (for forgot password – coming next)
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  // SaaS / Rate limiting
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || "900000",
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || "100"
};
