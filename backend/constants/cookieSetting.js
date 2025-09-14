const baseCookieSettings = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only HTTPS in prod
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: process.env.JWT_EXPIRES_IN * 1000,
}

// Only add domain in production
if (process.env.NODE_ENV === "production") {
  baseCookieSettings.domain = process.env.DOMAIN
}

export const COOKIESETTING = baseCookieSettings
