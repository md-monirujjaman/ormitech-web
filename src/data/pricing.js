import { authLinks } from "@/data/site";

// Central pricing configuration. The Pricing page, the homepage pricing section and pricing FAQ answers all read
// prices, limits and plan features from here — change them in one place.
//
// PLACEHOLDERS TO CONFIRM BEFORE LAUNCH: the Starter and Growth prices, every usage limit and the per-plan feature
// allocation are proposals, not decided business terms. Plan names follow the ones already used on the site.
// `annualDiscountPercent` is 20 (annual billing shows "Save 20%"); set it to 0 to stop advertising a discount.

export const billing = {
  symbol: "$",
  // Annual billing discount shown as "Save X%". Set to 0 to hide the badge and the discount.
  annualDiscountPercent: 20,
  periods: [
    { id: "monthly", label: "Monthly" },
    { id: "annual", label: "Annual" }
  ],
  // Display currencies. Prices are defined in USD; other currencies are USD x `rate`, rounded to `round`.
  // PLACEHOLDER: the BDT rate is a proposal, not a decided price list. Confirm it before launch.
  currencies: [
    { id: "usd", label: "USD", symbol: "$", rate: 1, round: 0.01 },
    { id: "bdt", label: "BDT", symbol: "৳", rate: 120, round: 10 }
  ]
};

export const plans = [
  {
    id: "free",
    name: "Free",
    tagline: "For businesses ready to explore OrmiTech.",
    monthlyPrice: 0,
    cta: { label: "Get started free", href: authLinks.signup },
    limits: { conversations: 100, teamMembers: 1, socialChannels: 1 },
    summary: "100 conversations / month · 1 team member",
    features: ["Unified inbox", "Website chat widget", "1 social or messaging channel", "AI replies from your business knowledge", "Manual human takeover"]
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "For small teams getting organized.",
    monthlyPrice: 29,
    cta: { label: "Get started", href: `${authLinks.signup}?plan=starter` },
    limits: { conversations: 1000, teamMembers: 3, socialChannels: 3 },
    summary: "1,000 conversations / month · 3 team members",
    featuresIntro: "Everything in Free, plus:",
    features: ["Facebook, Instagram and WhatsApp", "Suggested replies", "Auto-replies and handover rules", "Basic automation", "Conversation assignment"]
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For teams scaling customer conversations.",
    monthlyPrice: 79,
    popular: true,
    cta: { label: "Get started", href: `${authLinks.signup}?plan=growth` },
    limits: { conversations: 5000, teamMembers: 10, socialChannels: 3 },
    summary: "5,000 conversations / month · 10 team members",
    featuresIntro: "Everything in Starter, plus:",
    features: ["Conversation summaries and intent detection", "Workflow automation", "Lead management", "Analytics dashboard", "Roles and permissions", "Priority support"]
  },
  {
    id: "accelerate",
    name: "Accelerate",
    tagline: "For high-performing teams with advanced needs.",
    monthlyPrice: 149,
    cta: { label: "Get started", href: `${authLinks.signup}?plan=accelerate` },
    limits: { conversations: 10000, teamMembers: 20, socialChannels: 3 },
    summary: "10,000 conversations / month · 20 team members",
    featuresIntro: "Everything in Growth, plus:",
    features: ["Custom integrations", "Advanced controls", "Custom onboarding", "Dedicated support"]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For larger teams and custom requirements.",
    monthlyPrice: null,
    priceLabel: "Custom",
    priceNote: "Priced around your requirements",
    cta: { label: "Talk to sales", href: "/contact?topic=enterprise" },
    limits: { conversations: null, teamMembers: null, socialChannels: 3 },
    summary: "Usage and team size set around your needs",
    featuresIntro: "Everything in Growth, plus:",
    features: ["Custom usage and team size", "Custom integrations", "Advanced controls", "Custom onboarding", "Dedicated support"]
  }
];

export const enterprisePlan = plans.find(plan => plan.id === "enterprise");

// Single entry point for everything the pricing UI renders. It is synchronous and static today; when the admin
// panel / API is connected, replace this function's body (or make it async) and the components keep working
// unchanged, because they read only from this object.
export function getPricingConfig() {
  return {
    billing,
    hero: pricingHero,
    plans,
    enterprisePlan,
    includedInAll,
    enterprise
  };
}

export function formatPrice(amount) {
  return `${billing.symbol}${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
}

// Formats a USD amount in the chosen display currency, e.g. formatMoney(29, "bdt") -> "৳3,480".
export function formatMoney(amount, currencyId = "usd") {
  const currency = billing.currencies.find(item => item.id === currencyId) ?? billing.currencies[0];
  const converted = Math.round((amount * currency.rate) / currency.round) * currency.round;
  const text = Number.isInteger(converted) ? converted.toLocaleString("en-US") : converted.toFixed(2);
  return `${currency.symbol}${text}`;
}

export function formatNumber(value) {
  return value === null ? "Custom" : value.toLocaleString("en-US");
}

// Returns { perMonth, yearly } for the billing period, or null for custom-priced plans.
export function getPlanPrice(plan, period) {
  if (plan.monthlyPrice === null) return null;
  const discount = period === "annual" ? billing.annualDiscountPercent / 100 : 0;
  const perMonth = plan.monthlyPrice * (1 - discount);
  return { perMonth, yearly: perMonth * 12 };
}

// Short price label for tables and summaries, e.g. "$0 forever", "$29 / month" or "Custom".
export function getPriceLabel(plan, period = "monthly") {
  const price = getPlanPrice(plan, period);
  if (!price) return plan.priceLabel;
  return plan.monthlyPrice === 0 ? `${formatPrice(0)} forever` : `${formatPrice(price.perMonth)} / month`;
}

export const pricingHero = {
  eyebrow: "Pricing",
  titleLead: "Simple pricing that",
  titleHighlight: "grows with your business.",
  description: "Start free, pick the plan that fits your team today and upgrade as your customer conversations grow."
};

export const includedInAll = ["Unified inbox", "Website chat widget", "OrmiTech AI assistant", "Human takeover", "English and Bangla replies", "Customer profiles"];

const plan = id => plans.find(item => item.id === id);
const limitRow = (label, key) => ({ label, values: Object.fromEntries(plans.map(item => [item.id, formatNumber(item.limits[key])])) });
// Accelerate matches Growth in every comparison row except these, where it adds the paid-tier extras.
const accelerateOverrides = { Support: "Dedicated", "Custom onboarding": true, "Custom integrations": true, "Advanced controls": true };
const row = (label, free, starter, growth, enterprise, hint) => ({ label, hint, values: { free, starter, growth, accelerate: label in accelerateOverrides ? accelerateOverrides[label] : growth, enterprise } });

export const comparison = [
  {
    id: "channels",
    label: "Channels and inbox",
    rows: [
      row("Unified inbox", true, true, true, true),
      row("Website chat widget", true, true, true, true),
      row("Facebook, Instagram and WhatsApp", "1 channel", "All three", "All three", "All three"),
      limitRow("Conversations per month", "conversations"),
      row("Customer profiles, tags and notes", true, true, true, true)
    ]
  },
  {
    id: "ai",
    label: "AI assistant",
    rows: [
      row("AI replies from your business knowledge", true, true, true, true, "Business information, FAQs, products and hours"),
      row("Reply in English, Bangla or both", true, true, true, true),
      row("Suggested replies", false, true, true, true),
      row("Conversation summaries", false, false, true, true),
      row("Intent detection", false, false, true, true)
    ]
  },
  {
    id: "automation",
    label: "Automation and handover",
    rows: [
      row("Human takeover", true, true, true, true),
      row("Auto-replies", false, true, true, true),
      row("Handover rules", false, true, true, true),
      row("Workflow automation", false, "Basic", "Advanced", "Advanced", "Routing, tags and team notifications"),
      row("Lead management", false, false, true, true)
    ]
  },
  {
    id: "team",
    label: "Team",
    rows: [limitRow("Team members", "teamMembers"), row("Conversation assignment", false, true, true, true), row("Roles and permissions", false, false, true, true)]
  },
  {
    id: "insights",
    label: "Insights",
    rows: [row("Order history on customer profiles", false, true, true, true), row("Analytics dashboard", false, false, true, true)]
  },
  {
    id: "support",
    label: "Support and setup",
    rows: [
      row("Documentation", true, true, true, true),
      row("Support", "Documentation", "Standard", "Priority", "Dedicated"),
      row("Custom onboarding", false, false, false, true),
      row("Custom integrations", false, false, false, true),
      row("Advanced controls", false, false, false, true)
    ]
  }
];

// Questions for the plan finder. The recommendation picks the first plan whose limits cover every answer.
export const planFinder = {
  questions: [
    {
      id: "team",
      label: "How big is your team?",
      options: [
        { id: "solo", label: "Just me", value: 1 },
        { id: "small", label: "2–3 people", value: 3 },
        { id: "medium", label: "4–10 people", value: 10 },
        { id: "large", label: "More than 10", value: Infinity }
      ]
    },
    {
      id: "conversations",
      label: "How many customer conversations do you handle each month?",
      options: [
        { id: "100", label: "Up to 100", value: 100 },
        { id: "1000", label: "Up to 1,000", value: 1000 },
        { id: "5000", label: "Up to 5,000", value: 5000 },
        { id: "more", label: "More than 5,000", value: Infinity }
      ]
    },
    {
      id: "socialChannels",
      label: "Which channels do you need?",
      options: [
        { id: "one", label: "Website chat + one social channel", value: 1 },
        { id: "all", label: "Facebook, Instagram, WhatsApp and website", value: 3 }
      ]
    },
    {
      id: "minPlan",
      label: "What else do you need?",
      options: [
        { id: "essentials", label: "Just the essentials", value: "free" },
        { id: "handover", label: "Auto-replies and handover rules", value: "starter" },
        { id: "automation", label: "Workflow automation, leads and analytics", value: "growth" },
        { id: "custom", label: "Custom integrations or dedicated support", value: "enterprise" }
      ]
    }
  ]
};

export function recommendPlan(answers) {
  const minimum = plans.findIndex(item => item.id === answers.minPlan);
  return (
    plans.find((item, index) => {
      if (index < minimum) return false;
      const { teamMembers, conversations, socialChannels } = item.limits;
      return (teamMembers === null || teamMembers >= answers.team) && (conversations === null || conversations >= answers.conversations) && socialChannels >= answers.socialChannels;
    }) ?? enterprisePlan
  );
}

export const value = {
  eyebrow: "What you get",
  title: "You’re not just paying for software.",
  description: "Every plan gives your business a better way to answer customers — and the paid plans add the automation and visibility to grow it."
};

export const impact = {
  eyebrow: "Business impact",
  title: "Less chasing messages. More growing the business.",
  description: "What changes for your team once every conversation runs through OrmiTech.",
  rows: [
    ["Replying from a separate app for every channel", "Every conversation in one shared inbox"],
    ["Typing the same answers again and again", "AI answers common questions from your business knowledge, day or night"],
    ["Enquiries forgotten once the chat ends", "Leads tracked from New to Converted"],
    ["No clear owner for a conversation", "Assignment and handover rules decide who responds"],
    ["Guessing what’s working", "Analytics on response time, AI replies and leads"]
  ]
};

export const enterprise = {
  eyebrow: "Enterprise",
  title: "Need more flexibility? Let’s build the right setup for your business.",
  description: "Enterprise pricing is shaped around your requirements — conversation volume, team size, integrations and how your operations run.",
  scope: ["Custom pricing", "Custom onboarding", "Usage that scales with you", "Custom integrations", "Dedicated support"],
  steps: [
    { title: "Tell us what you need", text: "Share your channels, volume, team and integration requirements." },
    { title: "We scope your setup", text: "Our team plans usage, onboarding and support around your business." },
    { title: "Get a custom proposal", text: "You receive pricing that matches the setup — nothing you don’t need." }
  ]
};

const free = plan("free");

export const faq = {
  eyebrow: "FAQ",
  title: "Pricing questions, answered",
  description: "Plans, billing, channels and Enterprise — what to know before you choose.",
  items: [
    {
      question: "Is there a free plan?",
      answer: `Yes. The Free plan costs ${formatPrice(free.monthlyPrice)} and includes the unified inbox, website chat, one social or messaging channel and AI replies from your business knowledge, with ${formatNumber(free.limits.conversations)} conversations a month.`
    },
    { question: "Can I upgrade later?", answer: "Yes. Start on any plan and move to a higher one when you need more channels, team members or conversations." },
    { question: "Do you offer monthly and annual billing?", answer: "Yes. Use the Monthly / Annual switch above the plans to see the price for each billing period." },
    {
      question: "What happens when I reach my plan limits?",
      answer: "Each plan includes a monthly conversation allowance and a number of team members. If you regularly need more, move to a higher plan or talk to us about Enterprise."
    },
    {
      question: "Which channels are supported?",
      answer: "Facebook, Instagram, WhatsApp and website chat. Free includes website chat plus one social or messaging channel; Starter and above include all of them."
    },
    {
      question: "Can I connect my website?",
      answer: "Yes, on every plan. Customize the chat widget in your dashboard, copy the installation code and add it to your site."
    },
    {
      question: "Does OrmiTech support WordPress?",
      answer: "Yes. Paste the installation code into your site’s header — through your theme’s custom code setting or a header & footer code plugin."
    },
    {
      question: "Can developers integrate OrmiTech with Next.js or React websites?",
      answer: "Yes. Add the installation code to the app’s root layout or HTML template — in Next.js, for example, with the Script component."
    },
    {
      question: "Can my team take over AI conversations?",
      answer: "Yes, on every plan. Starter and above also include handover rules that move conversations to your team automatically."
    },
    {
      question: "How does Enterprise pricing work?",
      answer: "Enterprise is priced around your requirements — conversation volume, team size, integrations, onboarding and support. Tell us what you need and we’ll put together a proposal."
    },
    { question: "Can I contact OrmiTech for a custom plan?", answer: "Yes. Use Talk to sales or the contact page, tell us about your business and our team will get back to you." }
  ]
};
