// Content for the three dedicated Product pages (/product/ai-customer-support, /omnichannel-inbox,
// /lead-order-management) plus the "explore the product" teaser on the Product Overview page. This
// restructures copy that used to sit on the single /product page — the AI assistant, unified workspace
// and automation builder sections moved to the page that matches their subject. No new claims, channels
// or numbers are invented.
import { Bot, CalendarClock, Clock, ContactRound, Globe, Inbox, MessageSquareText, MessagesSquare, Radio, ShoppingBag, Target, UserCheck } from "lucide-react";
import { trust } from "@/data/product";
import { inboxHighlight } from "@/data/features";

export const productEcosystem = {
  eyebrow: "Explore the product",
  title: "Go deeper into each part of OrmiTech.",
  description: "This overview shows the big picture. Each page below shows how that part actually works.",
  items: [
    { title: "AI Customer Support", text: "How OrmiTech AI answers, drafts and hands over conversations.", icon: Bot, href: "/product/ai-customer-support" },
    { title: "Omnichannel Inbox", text: "Facebook, Instagram, WhatsApp and website chat in one workspace.", icon: Inbox, href: "/product/omnichannel-inbox" },
    { title: "Lead & Order Management", text: "How conversations turn into tagged leads and tracked orders.", icon: Target, href: "/product/lead-order-management" }
  ]
};

export const aiCustomerSupportPage = {
  hero: {
    eyebrow: "AI Customer Support",
    title: "AI-powered support that never sleeps.",
    description: "OrmiTech AI reads every message, answers common questions instantly and drafts a reply for your team when a human touch is needed — all with the full conversation in view."
  },
  handoverBridge: {
    eyebrow: "Human Handover",
    title: "Steps back the moment a person is needed.",
    description: trust.principles[0].text,
    linkLabel: "See how Human Handover works",
    linkHref: "/features/human-handover"
  },
  omnichannelBridge: {
    eyebrow: "Omnichannel Inbox",
    title: "The same AI, on every channel you use.",
    description: "Facebook, Instagram, WhatsApp and website chat all reach the same AI-assisted inbox, with one customer record behind every conversation.",
    linkLabel: "See the Omnichannel Inbox",
    linkHref: "/product/omnichannel-inbox"
  },
  useCases: {
    id: "ai-support-use-cases",
    eyebrow: "Use cases",
    title: "Support that responds the moment customers reach out.",
    description: "Built for the questions that make up most of a support inbox.",
    columns: 4,
    items: [
      { title: "First response in seconds", text: "Every conversation gets an immediate, on-brand reply — no customer left on read.", chip: "Replied instantly", icon: Clock },
      { title: "Consistent brand voice", text: "Answers follow your approved business context, every time.", chip: "On-brand", icon: MessageSquareText },
      { title: "Escalates when it matters", text: "Sensitive or complex conversations move to a person automatically.", chip: "Handed over", icon: UserCheck },
      { title: "Same experience, every channel", text: "Facebook, Instagram, WhatsApp and website chat get the same AI support.", chip: "4 channels", icon: MessagesSquare }
    ]
  }
};

export const omnichannelInboxPage = {
  hero: {
    eyebrow: "Omnichannel Inbox",
    title: "Every channel your customers use. One inbox for your team.",
    description: "Facebook, Instagram, WhatsApp and website chat all land in the same workspace, with the customer's full history attached to every conversation."
  },
  channelPoints: inboxHighlight.points,
  aiSupportBridge: {
    eyebrow: "AI Customer Support",
    title: "AI works inside the inbox, not next to it.",
    description: "The same AI that answers instantly is reading every channel — there is no separate tool to manage.",
    linkLabel: "See AI Customer Support",
    linkHref: "/product/ai-customer-support"
  },
  leadOrderBridge: {
    eyebrow: "Lead & Order Management",
    title: "Every conversation can become a lead or an order.",
    description: "Tags, notes and order history stay on the same customer record your team already sees in the inbox.",
    linkLabel: "See Lead & Order Management",
    linkHref: "/product/lead-order-management"
  },
  useCases: {
    id: "omnichannel-use-cases",
    eyebrow: "Use cases",
    title: "Wherever the conversation starts, it lands in one place.",
    description: "OrmiTech brings every customer channel into the same team workspace.",
    columns: 4,
    items: [
      { title: "Social media DMs", text: "Facebook and Instagram messages arrive in the same inbox as everything else.", chip: "Facebook · Instagram", icon: Radio },
      { title: "WhatsApp conversations", text: "Keep WhatsApp business messaging next to every other channel.", chip: "WhatsApp", icon: MessagesSquare },
      { title: "Website live chat", text: "Answer website visitors without a separate chat tool.", chip: "Website chat", icon: Globe },
      { title: "One customer, every channel", text: "See a customer's full conversation history no matter where they wrote in.", chip: "Unified history", icon: ContactRound }
    ]
  }
};

export const leadOrderPage = {
  hero: {
    eyebrow: "Lead & Order Management",
    title: "Turn conversations into leads and orders.",
    description: "OrmiTech tags intent, routes high-value conversations to your sales team and keeps orders moving — right from the chat."
  },
  workflowPoints: ["Detect buying intent from the message itself", "Route high-intent conversations to the right teammate", "Tag leads and move them through your pipeline", "Start and track orders without leaving the conversation"],
  aiSupportBridge: {
    eyebrow: "AI Customer Support",
    title: "AI spots the intent before a person opens the chat.",
    description: "Lead and order workflows start with the same AI that answers customer questions — reading intent as it happens.",
    linkLabel: "See AI Customer Support",
    linkHref: "/product/ai-customer-support"
  },
  omnichannelBridge: {
    eyebrow: "Omnichannel Inbox",
    title: "Leads and orders, wherever the conversation happens.",
    description: "A wholesale enquiry on Facebook or an order question on WhatsApp — the workflow is the same, wherever it starts.",
    linkLabel: "See the Omnichannel Inbox",
    linkHref: "/product/omnichannel-inbox"
  },
  useCases: {
    id: "lead-order-use-cases",
    eyebrow: "Use cases",
    title: "From first message to closed deal.",
    description: "Lead and order workflows built around what customers actually say.",
    columns: 4,
    items: [
      { title: "Capture a wholesale lead", text: "Bulk and pricing questions are tagged and routed to the sales team automatically.", chip: "Hot lead", icon: Target },
      { title: "Collect order details in chat", text: "Start an order and keep its history right next to the conversation.", chip: "Order #4821", icon: ShoppingBag },
      { title: "Book a service or appointment", text: "Turn a booking question into a scheduled appointment and a tracked lead.", chip: "Booked", icon: CalendarClock },
      { title: "Follow up before it goes cold", text: "A scheduled reminder keeps a quote or order moving toward a close.", chip: "Reminder set", icon: UserCheck }
    ]
  }
};
