// Content for the Features page. Every item is drawn from copy that already exists on the site
// (site.js features, the previous Features page details, How it works phases, Pricing plans,
// the AI + Human section and the homepage feature walkthrough). No metrics or testimonials are invented.
import {
  Bot,
  ChartNoAxesColumnIncreasing,
  Clock,
  ContactRound,
  Inbox,
  MessagesSquare,
  Plug,
  Radio,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  UsersRound,
  Zap
} from "lucide-react";

export const featuresHero = {
  eyebrow: "Features",
  titleLead: "Everything needed to run a modern",
  titleHighlight: "conversation workflow.",
  description: "OrmiTech is not only a chatbot or an inbox. It connects channels, automation, people and operational data."
};

export const heroHighlights = [
  { title: "Unified inbox", icon: Inbox },
  { title: "AI automation", icon: Bot },
  { title: "Human handover", icon: Users },
  { title: "Lead management", icon: Target }
];

// Values stated elsewhere on the site: four supported channels, 24/7 AI replies, one shared workspace.
export const featureValues = [
  { value: "4", label: "Channels, one inbox", detail: "Facebook, Instagram, WhatsApp and website chat", icon: MessagesSquare },
  { value: "24/7", label: "AI replies", detail: "Common questions answered day or night", icon: Clock },
  { value: "1", label: "Shared workspace", detail: "AI and your team work from the same context", icon: UsersRound }
];

export const featureCards = [
  {
    title: "Unified Inbox",
    text: "Bring conversations into one team workspace with channel, status, ownership and customer context.",
    icon: Inbox,
    href: "#unified-inbox"
  },
  {
    title: "AI Automation",
    text: "Automate predictable questions, qualification and approved workflows while keeping the behavior controllable.",
    icon: Bot,
    href: "#ai-automation"
  },
  {
    title: "Human Handover",
    text: "Escalate conversations without losing context. Human takeover is part of the workflow, not an exception.",
    icon: Users,
    href: "#ai-automation"
  },
  {
    title: "Lead Management",
    text: "Turn useful conversations into structured leads with intent, tags, ownership and follow-up opportunities.",
    icon: Target,
    href: "#workflow"
  },
  {
    title: "Contact Records",
    text: "Talk to someone once, and their history sits on the contact for next time.",
    icon: ContactRound,
    href: "#unified-inbox"
  },
  {
    title: "Real-Time Conversations",
    text: "Built around live events and instant team visibility.",
    icon: Radio,
    href: "#unified-inbox"
  },
  {
    title: "Analytics",
    text: "Measure conversation volume, response performance, automation activity and lead outcomes as the platform grows.",
    icon: ChartNoAxesColumnIncreasing,
    href: "#workflow"
  },
  {
    title: "Team Workspace",
    text: "Set roles, routing, tags and business context so every teammate knows what to handle.",
    icon: UsersRound,
    href: "#workflow"
  }
];

export const inboxHighlight = {
  eyebrow: "Omnichannel",
  title: "One inbox. Every channel.",
  description:
    "Your customer does not care which channel they used. Your team should not have to switch between five tabs to answer them.",
  points: [
    "Facebook, Instagram, WhatsApp and website chat in one list",
    "Channel, status, ownership and customer context on every conversation",
    "Conversation history saved to the contact record for next time"
  ]
};

export const workflowSteps = [
  { number: "01", title: "Connect", text: "Connect the channels where customers already contact your business.", icon: Plug, preview: "connect" },
  { number: "02", title: "Configure", text: "Set roles, routing, tags, business context and automation rules.", icon: SlidersHorizontal, preview: "configure" },
  { number: "03", title: "Automate", text: "Allow AI to answer predictable questions and perform approved workflows.", icon: Sparkles, preview: "automate" },
  { number: "04", title: "Human takeover", text: "Escalate complex, sensitive or high-value conversations to the right person.", icon: UserCheck, preview: "takeover" },
  { number: "05", title: "Improve", text: "Use conversation outcomes and analytics to refine workflows and automation.", icon: TrendingUp, preview: "improve" }
];

export const aiShowcase = {
  eyebrow: "AI + Human",
  title: "Automate the routine. Escalate the important.",
  description:
    "OrmiTech is designed so AI can handle repetitive conversations while your team keeps control of high-value, sensitive or complex interactions.",
  points: [
    "Context stays with the conversation",
    "Human agents can take over instantly",
    "Lead intent can trigger workflows",
    "Every action can be measured"
  ]
};

export const solutions = {
  eyebrow: "Solutions",
  title: "Replies to every customer, so you can focus on growth",
  description: "Just like your superhuman sales agent.",
  items: [
    { title: "Increased Sales", text: "OrmiTech attends to your customers’ queries 24/7 and helps you close more sales.", icon: TrendingUp },
    { title: "Instant Replies", text: "OrmiTech instantly answers across all your platforms and organizes the messages for you.", icon: Zap },
    { title: "Increased Productivity", text: "OrmiTech handles customers all day, so you can focus on growing your business.", icon: Clock }
  ],
  plans: {
    title: "Plans for every team size",
    text: "Start on the Free plan, grow with Starter or Growth, or talk to us about a custom Enterprise setup.",
    href: "/pricing",
    linkLabel: "View pricing"
  }
};
