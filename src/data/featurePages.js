// Content for the five dedicated Features pages (/features/ai-chatbot, /human-handover, /automation,
// /team-collaboration, /analytics). This restructures the copy that used to live on the single /features
// page — split by feature — and reuses facts already stated on the Product and Features pages. No new
// claims, integrations or numbers are invented; illustrative dashboard numbers stay labelled as sample data.
import {
  Bot,
  CalendarClock,
  ChartNoAxesColumnIncreasing,
  Clock,
  ContactRound,
  Gauge,
  Layers,
  MessageSquareText,
  MessagesSquare,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Target,
  TrendingUp,
  UserCheck,
  UserPlus,
  UsersRound
} from "lucide-react";
import { automation, trust } from "@/data/product";

export const aiChatbotPage = {
  hero: {
    eyebrow: "AI Chatbot",
    title: "Answers your customers instantly, day or night.",
    description: "OrmiTech AI reads every message, works out what the customer wants and replies in seconds — so predictable questions never wait for business hours."
  },
  capabilities: [
    { label: "Answers common questions instantly", icon: Bot },
    { label: "Detects intent behind every message", icon: ScanSearch },
    { label: "Understands the customer's context", icon: ContactRound },
    { label: "Works around the clock", icon: Clock }
  ],
  contextPoints: [
    "Context stays with the conversation, on every channel",
    "Replies follow your business context and approved answers",
    "A detected intent can trigger the right workflow automatically"
  ],
  handoverBridge: {
    eyebrow: "AI + Human",
    title: "Knows exactly when to bring in a person.",
    description: trust.principles[0].text,
    linkLabel: "See how Human Handover works",
    linkHref: "/features/human-handover"
  },
  useCases: {
    id: "ai-chatbot-use-cases",
    eyebrow: "Use cases",
    title: "Where the AI chatbot takes the first reply.",
    description: "Predictable, repetitive questions are exactly what OrmiTech AI is built to answer.",
    columns: 4,
    items: [
      { title: "Product questions", text: "Answer pricing, sizing and availability questions the moment a customer asks.", chip: "Answered instantly", icon: MessagesSquare },
      { title: "Order status", text: "Share delivery and order updates without a teammate opening the chat.", chip: "Order #4821", icon: ShoppingBag },
      { title: "Lead qualification", text: "Ask the right questions and tag hot leads before a human ever joins the chat.", chip: "Hot lead", icon: Target },
      { title: "After-hours coverage", text: "Cover common questions overnight and on weekends, so no customer is left waiting.", chip: "24/7", icon: Clock }
    ]
  }
};

export const humanHandoverPage = {
  hero: {
    eyebrow: "Human Handover",
    title: "Hand off to your team without losing context.",
    description: "Escalate conversations without losing context. Human takeover is part of the OrmiTech workflow, not an exception."
  },
  handoverPoints: ["Context stays with the conversation", "Human agents can take over instantly", "Lead intent can trigger a handover automatically", "Every handover can be measured"],
  whenPrinciple: trust.principles[0],
  whenExamples: [
    { title: "High-value conversations", text: "Bulk, wholesale or custom-quote requests move to the right teammate with the full thread attached.", icon: UserPlus },
    { title: "Sensitive questions", text: "Complaints, refunds and anything that needs judgment go to a person, not a script.", icon: ShieldCheck },
    { title: "Complex requests", text: "Anything outside the AI's approved answers is handed over instead of guessed at.", icon: MessageSquareText }
  ],
  teamBridge: {
    eyebrow: "Team Collaboration",
    title: "Handed over, then owned by the right teammate.",
    description: "Once a conversation reaches a person, it becomes part of your shared workspace — assigned, tagged and tracked like any other conversation.",
    linkLabel: "See how Team Collaboration works",
    linkHref: "/features/team-collaboration"
  },
  useCases: {
    id: "human-handover-use-cases",
    eyebrow: "Use cases",
    title: "Where a human takeover matters most.",
    description: "OrmiTech hands over with context attached, so nothing has to be re-explained.",
    columns: 4,
    items: [
      { title: "Wholesale & bulk pricing", text: "Custom quotes go to the sales team with the AI's summary of what the customer asked for.", chip: "Routed to Sales", icon: UserPlus },
      { title: "Complaints & refunds", text: "Sensitive conversations reach a person immediately, with full history intact.", chip: "High intent", icon: UserCheck },
      { title: "VIP & repeat customers", text: "Recognized customers can be routed straight to the teammate who knows their history.", chip: "Repeat buyer", icon: ContactRound },
      { title: "Anything outside the script", text: "Questions the AI isn't confident about are handed over instead of guessed at.", chip: "Handover · context intact", icon: MessageSquareText }
    ]
  }
};

export const automationPage = {
  hero: {
    eyebrow: "Automation",
    title: "Automate the busywork. Keep your team in control.",
    description: "OrmiTech watches every conversation and runs the workflow behind it — routing, tags, replies and follow-ups — using rules your team sets and approves."
  },
  fitPoints: ["Trigger workflows from what a customer actually says", "Route, tag and follow up without manual work", "Every rule is something your team has approved", "Automation results feed straight into analytics"],
  chatbotBridge: {
    eyebrow: "AI Chatbot",
    title: "Every workflow starts with a detected intent.",
    description: "OrmiTech AI reads the message first — automation is what happens next, from routing to tagging to a follow-up.",
    linkLabel: "See how the AI Chatbot works",
    linkHref: "/features/ai-chatbot"
  },
  useCases: {
    id: "automation-use-cases",
    eyebrow: "Use cases",
    title: "Workflows that run themselves.",
    description: "Automation OrmiTech customers already rely on, built from message intent, tags and follow-ups.",
    columns: 4,
    items: [
      { title: "Wholesale enquiry routing", text: "Detect a bulk or pricing question and route it to the sales team automatically.", chip: "Sales · routed", icon: UserPlus },
      { title: "Instant FAQ replies", text: "Send an on-brand, instant reply while a specialist is on the way.", chip: "Auto-reply sent", icon: MessageSquareText },
      { title: "Hot lead tagging", text: "Tag high-intent conversations and move the contact to the right lead stage.", chip: "Hot lead", icon: Tag },
      { title: "Follow-up reminders", text: "Schedule a follow-up task for the owner so a quote or order never gets forgotten.", chip: "Reminder set", icon: CalendarClock }
    ]
  }
};

export const teamCollaborationPage = {
  hero: {
    eyebrow: "Team Collaboration",
    title: "One shared workspace for your whole team.",
    description: "Assign conversations, leave notes and hand chats to the right person with full context — everyone works from the same view."
  },
  workspacePoints: [
    { title: "Assign owners", text: "Route a conversation to the right teammate the moment it needs a person.", icon: UserPlus },
    { title: "Roles & access", text: "Set roles and routing so everyone only handles the conversations meant for them.", icon: ShieldCheck },
    { title: "Shared context", text: "Notes, tags and history stay on the conversation for whoever picks it up next.", icon: Layers },
    { title: "One shared view", text: "AI and your team work from the same workspace, not separate tools.", icon: UsersRound }
  ],
  configureChips: ["Roles", "Routing", "Tags", "Business context", "Automation rules"],
  assignExample: automation.steps.find(step => step.id === "assign"),
  handoverBridge: {
    eyebrow: "Human Handover",
    title: "Picks up right where the AI left off.",
    description: trust.principles[1].text,
    linkLabel: "See how Human Handover works",
    linkHref: "/features/human-handover"
  },
  useCases: {
    id: "team-collaboration-use-cases",
    eyebrow: "Use cases",
    title: "Built for teams that share the inbox.",
    description: "Routing and roles that keep every conversation with the right person.",
    columns: 4,
    items: [
      { title: "Sales team routing", text: "Send pricing and wholesale conversations straight to the sales team.", chip: "Team: Sales", icon: UserPlus },
      { title: "Support ownership", text: "Assign a conversation to one teammate so nothing is answered twice.", chip: "Assigned", icon: UserCheck },
      { title: "Notes that travel", text: "Leave a note for the next teammate — like a preferred follow-up channel.", chip: "Note added", icon: MessageSquareText },
      { title: "Role-based access", text: "Give each teammate access to the conversations and tools their role needs.", chip: "Roles set", icon: ShieldCheck }
    ]
  }
};

export const analyticsPage = {
  hero: {
    eyebrow: "Analytics",
    title: "Know what's working, at a glance.",
    description: "Response time, automation results, lead flow and team performance — measured from real conversations, in one dashboard."
  },
  measurePoints: [
    { title: "Response performance", text: "See how fast your team and AI respond, and where conversations slow down.", icon: Gauge },
    { title: "Automation results", text: "Understand how much volume AI resolves versus your team.", icon: ChartNoAxesColumnIncreasing },
    { title: "Lead & order flow", text: "Follow conversations through to qualified leads and completed orders.", icon: TrendingUp },
    { title: "Team performance", text: "Understand workload and response performance across your team.", icon: UsersRound }
  ],
  teamBridge: {
    eyebrow: "Team Collaboration",
    title: "Turn the numbers into the next assignment.",
    description: "Use response time and workload data to route conversations to the right teammate before they slow down.",
    linkLabel: "See how Team Collaboration works",
    linkHref: "/features/team-collaboration"
  },
  useCases: {
    id: "analytics-use-cases",
    eyebrow: "Use cases",
    title: "Decisions the dashboard supports.",
    description: "Analytics that turn conversation activity into decisions your team can act on.",
    columns: 4,
    items: [
      { title: "Weekly performance review", text: "Check response time, resolved volume and lead flow at a glance.", chip: "This week", icon: Gauge },
      { title: "Spot automation gaps", text: "See which questions still need a human, and where a workflow could help.", chip: "64% resolved by AI", icon: Bot },
      { title: "Track lead conversion", text: "Follow how conversations turn into tagged leads and completed orders.", chip: "142 leads", icon: TrendingUp },
      { title: "Balance team workload", text: "See who's handling the most conversations and rebalance routing.", chip: "Team: 36%", icon: UsersRound }
    ]
  }
};
