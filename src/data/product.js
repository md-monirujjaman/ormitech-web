// Content for the Product page. Capabilities come from copy already on the site (homepage walkthrough,
// Features, How it works, Pricing and the blog). No customer counts, uptime figures, prices or testimonials
// are invented; numbers inside dashboard illustrations are labelled as sample data.
import {
  Bot,
  Brain,
  Briefcase,
  Building2,
  CalendarClock,
  ChartNoAxesColumnIncreasing,
  ContactRound,
  FileText,
  Gauge,
  GraduationCap,
  HeartHandshake,
  Inbox,
  Layers,
  Lightbulb,
  MessageSquareText,
  MessagesSquare,
  PackageCheck,
  Scale,
  ScanSearch,
  Send,
  ShieldCheck,
  ShoppingBag,
  Stethoscope,
  Tag,
  UserCheck,
  UserPlus,
  UsersRound,
  Workflow,
  Zap
} from "lucide-react";

export const productMeta = {
  title: "Product",
  description:
    "OrmiTech gives businesses one workspace to manage customer conversations across Facebook, Instagram, WhatsApp and website chat, automate workflows with AI and turn conversations into growth."
};

export const productHero = {
  eyebrow: "Product",
  titleLead: "Everything you need to manage customer conversations in",
  titleHighlight: "one place.",
  description: "OrmiTech helps your team communicate, automate workflows and grow the business — all from a single, easy-to-use workspace.",
  benefits: [
    { title: "Unified inbox", detail: "Every channel, one list", icon: Inbox },
    { title: "AI automation", detail: "Replies day or night", icon: Bot },
    { title: "Human handover", detail: "Context stays intact", icon: UserCheck },
    { title: "Analytics", detail: "See what’s working", icon: ChartNoAxesColumnIncreasing }
  ]
};

export const overview = {
  eyebrow: "Product overview",
  titleLead: "Built for modern businesses that care about",
  titleHighlight: "every customer.",
  description:
    "OrmiTech connects your channels, AI and team in one operational workspace, so every message can become a resolved question, a qualified lead or a new order.",
  cards: [
    { number: "01", title: "Centralized Communication", text: "Facebook, Instagram, WhatsApp and website chat arrive in one shared inbox.", icon: MessagesSquare, href: "/product/omnichannel-inbox" },
    { number: "02", title: "Workflow Automation", text: "Route, tag, reply and follow up automatically with rules your team approves.", icon: Workflow, href: "/product/lead-order-management" },
    { number: "03", title: "Customer Insights", text: "Conversations, orders and notes build a customer record everyone can use.", icon: Lightbulb, href: "#analytics" },
    { number: "04", title: "Team Collaboration", text: "Assign owners, hand over with context and work from the same view.", icon: UsersRound, href: "/features/team-collaboration" }
  ]
};

export const coreFeatures = {
  eyebrow: "Core features",
  title: "Powerful features designed to make your work easier.",
  description: "Everything your team needs to manage conversations, automate routine work and understand customers.",
  items: [
    { title: "Unified Inbox", text: "Bring Facebook, Instagram, WhatsApp and website conversations into one team workspace.", icon: Inbox, href: "/product/omnichannel-inbox" },
    { title: "AI Assistant", text: "Suggest replies, summarize conversations and answer common questions around the clock.", icon: Bot, href: "/product/ai-customer-support" },
    { title: "Smart Automation", text: "Trigger routing, tags, auto-replies and follow-ups from what customers actually say.", icon: Zap, href: "/features/automation" },
    { title: "Customer Management", text: "Keep contact details, conversation history, tags and notes on one customer record.", icon: ContactRound, href: "/product/omnichannel-inbox" },
    { title: "Order Handling", text: "Start orders from a conversation and keep order history right next to the chat.", icon: ShoppingBag, href: "/product/lead-order-management" },
    { title: "Analytics & Reports", text: "Understand response time, lead flow, automation results and team performance.", icon: ChartNoAxesColumnIncreasing, href: "#analytics" },
    { title: "Team Collaboration", text: "Assign conversations, leave notes and hand chats to the right person with full context.", icon: UsersRound, href: "/features/team-collaboration" },
    { title: "Roles & Access", text: "Set roles, routing and team access so everyone handles the conversations meant for them.", icon: ShieldCheck, href: "/features/team-collaboration" }
  ]
};

export const automation = {
  eyebrow: "Automation",
  title: "Smarter automation for higher conversions.",
  description:
    "Build workflows that react to what customers say. OrmiTech detects intent, routes the conversation and follows up — while your team stays in control of every rule.",
  points: ["Trigger workflows from message intent", "Assign the right teammate automatically", "Tag hot leads and create follow-ups", "Hand over to a person at any step"],
  flowName: "Wholesale enquiry flow",
  trigger: { title: "When a customer sends a message", detail: "mentioning “price”, “bulk” or “wholesale”" },
  steps: [
    {
      id: "intent",
      title: "Detect intent",
      summary: "Wholesale pricing · high intent",
      icon: ScanSearch,
      description: "OrmiTech AI reads the message and works out what the customer wants before anyone opens the chat.",
      rows: [["Message", "“What’s your price for 50 units a month?”"], ["Intent", "Wholesale pricing"], ["Priority", "High"]]
    },
    {
      id: "assign",
      title: "Assign to sales team",
      summary: "Routed to Farhan A.",
      icon: UserPlus,
      description: "The conversation goes to an available teammate on the sales team, with the AI summary attached.",
      rows: [["Team", "Sales"], ["Assigned to", "Farhan A."], ["Context", "AI summary attached"]]
    },
    {
      id: "reply",
      title: "Send auto-reply",
      summary: "Customer hears back instantly",
      icon: Send,
      description: "The customer gets an instant, on-brand reply so they know a specialist is on the way.",
      rows: [["Channel", "Facebook"], ["Reply", "“Thanks, Rahim! A specialist will send your quote shortly.”"]]
    },
    {
      id: "tag",
      title: "Add tag: Hot lead",
      summary: "Lead stage → Qualified",
      icon: Tag,
      description: "The contact is tagged and moved to the right lead stage, so nothing slips through the pipeline.",
      rows: [["Tag", "Hot lead"], ["Lead stage", "Qualified"], ["Contact", "Rahim U."]]
    },
    {
      id: "followup",
      title: "Create follow-up",
      summary: "Reminder for tomorrow",
      icon: CalendarClock,
      description: "A follow-up task is scheduled for the owner, so the quote is sent and the deal keeps moving.",
      rows: [["Task", "Send custom quote"], ["Due", "Tomorrow, 10:00"], ["Owner", "Farhan A."]]
    }
  ]
};

export const howItWorks = {
  eyebrow: "How it works",
  title: "From first message to loyal customer.",
  description: "A simple five-step flow that turns every conversation into a real business outcome.",
  steps: [
    { id: "capture", number: "01", title: "Capture", text: "Collect messages from Facebook, Instagram, WhatsApp and website chat in one inbox.", icon: MessageSquareText },
    { id: "understand", number: "02", title: "Understand", text: "AI detects intent and brings the customer’s history and context into view.", icon: Brain },
    { id: "automate", number: "03", title: "Automate", text: "Trigger replies, routing, tags and the workflows your team has approved.", icon: Zap },
    { id: "convert", number: "04", title: "Convert", text: "Turn conversations into qualified leads, bookings and new orders.", icon: ShoppingBag },
    { id: "retain", number: "05", title: "Retain", text: "Follow up, support customers after the sale and keep them coming back.", icon: HeartHandshake }
  ]
};

export const aiAssistant = {
  eyebrow: "AI assistant",
  title: "Your AI assistant, always working for you.",
  description:
    "OrmiTech AI works inside every conversation — drafting replies, summarizing context and suggesting the next step, so your team responds faster without losing the personal touch.",
  capabilities: [
    { label: "Suggested replies", icon: MessageSquareText },
    { label: "Conversation summaries", icon: FileText },
    { label: "Intent detection", icon: ScanSearch },
    { label: "Customer understanding", icon: ContactRound },
    { label: "Automated responses", icon: Bot },
    { label: "Workflow suggestions", icon: Workflow },
    { label: "Order details extraction", icon: PackageCheck }
  ]
};

export const workspace = {
  eyebrow: "Unified workspace",
  title: "Every conversation. Every customer. One workspace.",
  description:
    "Messages from every channel land on one customer profile with order history, tags, notes and a full activity timeline — so anyone on your team can pick up where the last person left off."
};

export const industries = {
  eyebrow: "Use cases",
  title: "Perfect for every industry and business type.",
  description: "Wherever customers message you, OrmiTech helps your team respond, organize and follow up.",
  items: [
    { title: "E-commerce", text: "Answer product questions, take orders and share delivery updates.", chip: "Order #4822 created", icon: ShoppingBag },
    { title: "Real Estate", text: "Qualify property enquiries, share listings and book viewings.", chip: "Viewing booked", icon: Building2 },
    { title: "Education", text: "Handle admission questions, course details and enrolment follow-ups.", chip: "Admission enquiry", icon: GraduationCap },
    { title: "Healthcare", text: "Respond to appointment requests and send patients reminders.", chip: "Appointment · 10:30", icon: Stethoscope },
    { title: "Service Businesses", text: "Take bookings, send quotes and keep clients updated.", chip: "Quote sent", icon: Briefcase }
  ]
};

export const analytics = {
  eyebrow: "Analytics",
  title: "See the business impact of every conversation.",
  description:
    "Track how fast your team responds, how much AI resolves and how conversations turn into leads and orders — all in one dashboard.",
  // Product facts stated elsewhere on the site.
  facts: [
    { value: "4", label: "Channels in one inbox" },
    { value: "24/7", label: "AI replies to common questions" },
    { value: "5", label: "Steps from message to loyalty" },
    { value: "1", label: "Shared workspace for AI and team" }
  ],
  // Illustrative numbers for the dashboard mockup only.
  sample: {
    kpis: [
      { label: "First response", value: "38s", trend: "faster" },
      { label: "Resolved by AI", value: "64%", trend: "of chats" },
      { label: "Open conversations", value: "126", trend: "right now" },
      { label: "Leads captured", value: "142", trend: "this week" }
    ],
    weekly: [
      { day: "Mon", value: 142 },
      { day: "Tue", value: 186 },
      { day: "Wed", value: 164 },
      { day: "Thu", value: 208 },
      { day: "Fri", value: 196 },
      { day: "Sat", value: 248 },
      { day: "Sun", value: 172 }
    ],
    handled: { ai: 64, team: 36 },
    intents: [
      { label: "Order status", share: 32 },
      { label: "Pricing", share: 24 },
      { label: "Delivery", share: 18 }
    ]
  }
};

export const trust = {
  eyebrow: "Why OrmiTech",
  title: "Built to keep your team in control.",
  description: "Automation should make your team stronger, not replace judgment. OrmiTech is designed around that idea.",
  quote: {
    text: "The best customer automation is not AI-only. It knows when a human should step in.",
    source: "From the OrmiTech blog",
    href: "/blog/ai-with-human-handover"
  },
  principles: [
    { title: "AI that knows when to hand over", text: "Complex, sensitive or high-value conversations move to a person with the full context.", icon: UserCheck },
    { title: "Context that never gets lost", text: "History, notes and orders stay attached to the customer across every channel.", icon: Layers },
    { title: "Actions you can measure", text: "Replies, handovers and workflow runs are tracked so you can keep improving.", icon: Gauge },
    { title: "Clear, flexible pricing", text: "Start free, see plan prices up front and talk to us when you need a custom setup.", icon: Scale }
  ]
};

// Add real customer quotes here ({ quote, name, role, company, rating }) to show the testimonials section.
// It stays hidden while the list is empty, so the page never shows invented reviews.
export const testimonials = {
  eyebrow: "Testimonials",
  title: "Loved by businesses like yours.",
  items: []
};

export const faq = {
  eyebrow: "FAQ",
  title: "Frequently asked questions",
  description: "Everything you need to know about OrmiTech. Can’t find an answer? Our team is happy to help.",
  items: [
    {
      question: "What is OrmiTech?",
      answer:
        "OrmiTech is an AI-powered customer communication workspace. It brings your customer channels into one inbox, automates routine conversations with AI and lets your team take over whenever a human touch matters."
    },
    {
      question: "Who is OrmiTech for?",
      answer:
        "Businesses that talk to customers over social media, messaging apps and website chat — from online shops and service businesses to education, real estate and healthcare teams."
    },
    {
      question: "Which channels can I connect?",
      answer: "Facebook, Instagram, WhatsApp and website chat. Every conversation arrives in the same shared inbox."
    },
    {
      question: "Does OrmiTech support automation?",
      answer:
        "Yes. Workflows can route conversations, send auto-replies, add tags and create follow-ups based on what customers say. Your team decides how the automation behaves."
    },
    {
      question: "How does the AI assistant work?",
      answer:
        "You give OrmiTech AI your business context. It answers common questions, suggests replies, summarizes conversations and detects intent. When a conversation needs a person, it hands over with the full context."
    },
    {
      question: "Can my team collaborate inside OrmiTech?",
      answer: "Yes. Assign conversations, set roles and routing, leave notes and hand chats between teammates without losing history."
    },
    {
      question: "How is OrmiTech priced?",
      answer:
        "There are five plans: Free, Starter, Growth, Accelerate and Enterprise. Free costs nothing, Starter, Growth and Accelerate have monthly prices on the pricing page, and Enterprise is priced around your requirements."
    },
    {
      question: "Can I integrate OrmiTech with my existing tools?",
      answer: "Custom integrations are available on the Enterprise plan. Share your requirements with our team and we’ll help plan the setup."
    }
  ]
};
