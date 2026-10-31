// Other OrmiTech apps (see README: client dashboard and documentation).
const trimSlash = value => value.replace(/\/+$/, "");

// Canonical production domain, shared by metadata, JSON-LD and the sitemap.
export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || "https://www.ormitechit.com");

// GA4 measurement ID. Public by design (embedded in the page), so a fallback here is safe.
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-HFH88XV2FG";

export const appLinks = {
  app: trimSlash(process.env.NEXT_PUBLIC_APP_URL || "https://app.ormitechit.com"),
  docs: trimSlash(process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.ormitechit.com")
};

// The OrmiTech API. Public by design (the pricing page reads the plans from it), so a default here is safe.
export const apiUrl = trimSlash(process.env.NEXT_PUBLIC_API_URL || "https://api.ormitechit.com");

// Official OrmiTech social profiles, used in the Organization JSON-LD `sameAs`.
export const socialProfiles = [
  "https://www.facebook.com/ormitechit",
  "https://www.instagram.com/ormitechit",
  "https://www.linkedin.com/in/ormitechit",
  "https://www.youtube.com/@ormitechit",
  "https://x.com/ormitechit"
];

// Accounts live in the client app, not on this site. Every "Log in" and "Get started" link points there;
// the old /login, /signup and /forgot-password paths redirect to the same places (see next.config.js).
export const authLinks = {
  login: `${appLinks.app}/login`,
  register: `${appLinks.app}/register`,
  forgotPassword: `${appLinks.app}/forgot-password`
};

export const channels = [
  { name: "Facebook" },
  { name: "Instagram" },
  { name: "WhatsApp" },
  { name: "Website" }
];

export const features = [
  { title: "Unified Inbox", text: "Bring Facebook, Instagram, WhatsApp and website conversations into one workspace.", icon: "Inbox" },
  { title: "AI Automation", text: "Automate repetitive questions, qualify leads and respond around the clock.", icon: "Bot" },
  { title: "Human Handover", text: "Move a conversation from AI to a human agent without losing context.", icon: "Users" },
  { title: "Lead Management", text: "Capture customer intent, tag leads and keep follow-ups organized.", icon: "Target" },
  { title: "Real-Time Conversations", text: "Built around live events and instant team visibility.", icon: "Radio" },
  { title: "Analytics", text: "Understand response time, lead flow, automation and team performance.", icon: "Chart" }
];
