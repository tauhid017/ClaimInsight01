import rateLimit from "express-rate-limit";

/* ================= GLOBAL LIMIT ================= */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,                // 300 requests / IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

/* ================= AUTH LIMIT ================= */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,                 // login/signup attempts
  message: {
    success: false,
    message: "Too many auth attempts. Try again later."
  }
});

/* ================= AI / CLAIM LIMIT ================= */
// export const aiLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 5,                  // 5 claims per hour (free tier)
//   message: {
//     success: false,
//     message: "Claim generation limit reached. Try again later."
//   }
// });

// rateLimit.middleware.ts
export const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,                // generous for dev
  message: {
    success: false,
    message: "Too many requests. Please wait."
  }
});

