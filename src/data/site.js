// Other OrmiTech apps (see README: client dashboard and documentation).
const trimSlash = value => value.replace(/\/+$/, "");

// Canonical production domain, shared by metadata, JSON-LD and the sitemap.
export const siteUrl = trimSlash(process.env.NEXT_PUBLIC_SITE_URL || "https://www.ormitechit.com");

// GA4 measurement ID. Public by design (embedded in the page), so a fallback here is safe.
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-HFH88XV2FG";

export const appLinks = {
  docs: trimSlash(process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.ormitechit.com")
};

// Official OrmiTech social profiles, used in the Organization JSON-LD `sameAs`.
export const socialProfiles = [
  "https://www.facebook.com/ormitechit",
  "https://www.instagram.com/ormitechit",
  "https://www.linkedin.com/in/ormitechit",
  "https://www.youtube.com/@ormitechit",
  "https://x.com/ormitechit"
];

// Account pages on this site. They are a frontend preview until authentication is connected.
export const authLinks = {
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password"
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

export const blogPosts = [
  {
    slug: "why-unified-inbox-matters",
    title: "Why a unified customer inbox matters",
    excerpt: "What happens when every customer channel becomes one operational workspace.",
    date: "2026-09-12",
    category: "Product"
  },
  {
    slug: "ai-with-human-handover",
    title: "AI automation should know when to hand over",
    excerpt: "The best customer automation is not AI-only. It knows when a human should step in.",
    date: "2026-09-10",
    category: "AI"
  },
  {
    slug: "omnichannel-customer-support",
    title: "Designing an omnichannel support workflow",
    excerpt: "A practical framework for connecting social, messaging and website conversations.",
    date: "2026-09-07",
    category: "Guide"
  }
];
