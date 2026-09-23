// Content for the How it works page. Behaviour described here follows the OrmiTech client dashboard
// (channel connections, website widget installation code, AI business knowledge, reply languages, handover rules,
// lead statuses and customer orders) and the planned platform architecture. There is no WordPress plugin,
// payment processing or published usage metric, so none is claimed. Names, orders and numbers are examples.
import {
  BookOpen,
  Briefcase,
  Building2,
  CircleHelp,
  Frown,
  GraduationCap,
  HeartHandshake,
  KeyRound,
  Languages,
  Megaphone,
  MessagesSquare,
  PackageCheck,
  Radio,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Target,
  UserCheck,
  UserRound,
  UsersRound,
  Webhook,
  Workflow,
  Zap
} from "lucide-react";

export const howMeta = {
  title: "How OrmiTech Works | AI Conversations and Automation",
  description:
    "See how OrmiTech connects your website, Facebook, Instagram and WhatsApp with AI-powered conversations, automation and a unified business workspace."
};

export const hero = {
  eyebrow: "How it works",
  titleLead: "From your first customer message to your",
  titleHighlight: "next sale.",
  description:
    "OrmiTech connects your channels, AI, automation and team in one system — so every customer message is understood, answered and turned into a lead, an order or a loyal customer.",
  facts: [
    { value: "4", label: "Channels in one inbox" },
    { value: "3", label: "Reply language options" },
    { value: "24/7", label: "AI replies" },
    { value: "1", label: "Workspace for AI and team" }
  ]
};

export const chapters = [
  { id: "connect", label: "Connect" },
  { id: "messages", label: "Receive" },
  { id: "understand", label: "Understand" },
  { id: "respond", label: "Respond" },
  { id: "automate", label: "Automate" },
  { id: "backend", label: "Process" },
  { id: "handover", label: "Hand over" },
  { id: "dashboard", label: "Manage" },
  { id: "convert", label: "Convert" },
  { id: "retain", label: "Retain" }
];

export const bigPicture = {
  eyebrow: "The big picture",
  title: "Everything starts with a conversation.",
  description:
    "A customer reaches out on the channel they prefer. OrmiTech takes it from there — understanding, answering, automating and bringing in your team when it matters.",
  nodes: [
    { title: "Customer", text: "Sends a message", icon: UserRound },
    { title: "Channel", text: "Facebook, Instagram, WhatsApp or website", icon: MessagesSquare },
    { title: "OrmiTech", text: "Receives it in one inbox", hub: true },
    { title: "AI", text: "Understands and replies", icon: Sparkles },
    { title: "Automation", text: "Runs the next steps", icon: Zap },
    { title: "Your team", text: "Steps in when needed", icon: UsersRound },
    { title: "Customer", text: "Gets a fast, helpful answer", icon: HeartHandshake }
  ]
};

export const connect = {
  eyebrow: "01 · Connect",
  title: "Connect the channels your customers already use.",
  description: "Link your social and messaging accounts from the Channels page of your OrmiTech workspace, then add the chat widget to your website.",
  social: [
    {
      name: "Facebook",
      account: "Facebook Page",
      text: "Choose the Page whose customer messages should arrive in OrmiTech.",
      steps: ["Connect Facebook", "Choose your Page", "Messages arrive in your inbox"]
    },
    {
      name: "Instagram",
      account: "Instagram Business account",
      text: "Connect your Instagram Business account and answer DMs from the same inbox.",
      steps: ["Connect Instagram", "Choose the account", "DMs arrive in your inbox"]
    },
    {
      name: "WhatsApp",
      account: "WhatsApp Business number",
      text: "Connect a WhatsApp Business number through the WhatsApp Cloud API.",
      steps: ["Connect WhatsApp", "Choose the number", "Chats arrive in your inbox"]
    }
  ],
  website: {
    title: "Add chat to your website",
    description: "Set the chat title, brand color, position and welcome message in Channels → Website Chat, then copy your installation code.",
    options: ["Chat title", "Brand color", "Position", "Welcome message"],
    methods: [
      {
        id: "cms",
        label: "WordPress & CMS",
        title: "WordPress and other CMS websites",
        steps: [
          "Copy the installation code from your OrmiTech dashboard.",
          "Paste it into your site’s header code — in your theme settings or a header & footer code plugin.",
          "Save. The chat widget appears on every page."
        ],
        note: "No development work needed."
      },
      {
        id: "custom",
        label: "Next.js, React & custom",
        title: "Next.js, React and custom websites",
        steps: [
          "Copy the installation code from your OrmiTech dashboard.",
          "Add it to your root layout or HTML template — in Next.js, the Script component works well.",
          "Deploy. The widget loads across your app."
        ],
        note: "Code shown is an example — always use the exact installation code from your workspace."
      }
    ]
  }
};

export const messages = {
  eyebrow: "02 · Receive",
  title: "Your customer sends a message. OrmiTech catches it instantly.",
  description: "Whichever channel they use, the conversation lands in one shared inbox with the channel, customer and history attached.",
  samples: {
    Facebook: { customer: "Rahim U.", surface: "Facebook Page message", text: "Hi! Do you have this product in stock?", time: "18m", tone: "from-sky-400 to-blue-600" },
    Instagram: { customer: "Sadia R.", surface: "Instagram DM", text: "Is the blue one still in stock?", time: "12m", tone: "from-fuchsia-400 to-pink-600" },
    WhatsApp: { customer: "Tanvir H.", surface: "WhatsApp chat", text: "Do you have the 1 kg pack in stock?", time: "5m", tone: "from-emerald-400 to-emerald-700" },
    Website: { customer: "Nusrat J.", surface: "Website chat widget", text: "Do you have this dress in size M?", time: "2m", tone: "from-rose-400 to-red-600" }
  }
};

export const understand = {
  eyebrow: "03 · Understand",
  title: "AI doesn’t just reply. It understands.",
  description:
    "Before answering, OrmiTech AI works out what the customer needs — using the business knowledge you add to your workspace.",
  stages: ["Read message", "Detect intent", "Add context", "Choose action"],
  knowledge: [
    { title: "Business information", text: "Who you are, payment methods and policies" },
    { title: "FAQs", text: "Questions customers ask most often" },
    { title: "Products / Services", text: "What you sell, with prices and details" },
    { title: "Business hours", text: "When your team is available" }
  ],
  samples: [
    {
      id: "recommend",
      label: "Product question",
      message: "I need something for muscle recovery under ৳2,500.",
      highlights: ["muscle recovery", "under ৳2,500"],
      fields: [
        ["Intent", "Product recommendation"],
        ["Need", "Muscle recovery"],
        ["Budget", "Under ৳2,500"],
        ["Customer", "Potential buyer"]
      ],
      action: "Recommend a matching product",
      handover: false
    },
    {
      id: "delivery",
      label: "Bangla + English",
      message: "Dhaka te delivery koto din lagbe?",
      highlights: ["Dhaka", "delivery koto din"],
      fields: [
        ["Intent", "Delivery question"],
        ["Location", "Dhaka"],
        ["Language", "Bangla + English"],
        ["Customer", "Potential buyer"]
      ],
      action: "Answer from your delivery FAQ in the same language",
      handover: false
    },
    {
      id: "human",
      label: "Needs a person",
      message: "This is the second time my order is late. I want to talk to someone.",
      highlights: ["second time", "talk to someone"],
      fields: [
        ["Intent", "Complaint · late order"],
        ["Sentiment", "Frustrated"],
        ["Request", "Talk to a person"],
        ["Customer", "Existing customer"]
      ],
      action: "Hand the conversation to your team",
      handover: true
    }
  ]
};

export const respond = {
  eyebrow: "04 · Respond",
  title: "Give every customer a smarter answer.",
  description: "OrmiTech AI replies in your chosen language and tone, recommends what fits and keeps the conversation moving toward a decision.",
  conversation: {
    customer: "I need something for muscle recovery under ৳2,500.",
    reply: "Based on your goal and budget, I’d recommend our Recovery Whey Blend. It’s ৳2,200 and in stock for delivery.",
    product: { name: "Recovery Whey Blend", detail: "1 kg · Chocolate", price: "৳2,200", stock: "In stock" }
  },
  points: [
    { title: "Grounded in your knowledge", text: "Answers come from the products, FAQs and policies you add.", icon: BookOpen },
    { title: "Your language and tone", text: "Replies in English, Bangla or both, in the response style you choose.", icon: Languages },
    { title: "Knows its limits", text: "If a question isn’t covered, the conversation goes to your team.", icon: UserCheck }
  ]
};

export const automation = {
  eyebrow: "05 · Automate",
  title: "Let automation handle the repetitive work.",
  description: "Workflows react to what customers say. Hover or select any step to see what it does.",
  flow: [
    {
      id: "when",
      kind: "When",
      title: "Customer asks about a product",
      detail: "The workflow starts when a new message mentions a product, price or stock — on any connected channel.",
      rows: [["Channel", "Any connected channel"], ["Example", "“Do you have this in stock?”"]]
    },
    {
      id: "check",
      kind: "Check",
      title: "Customer intent",
      detail: "OrmiTech AI reads the message and works out what the customer wants and how ready they are to buy.",
      rows: [["Intent", "Product recommendation"], ["Purchase intent", "High"]]
    },
    {
      id: "if",
      kind: "If",
      title: "High purchase intent",
      detail: "High-intent conversations follow the sales path. Everything else stays with the AI assistant.",
      rows: [["Yes", "Run the sales actions"], ["No", "AI keeps helping"]]
    }
  ],
  actions: [
    {
      id: "recommend",
      kind: "Action",
      title: "Send recommendation",
      detail: "The customer receives a product suggestion that matches their need and budget.",
      rows: [["Product", "Recovery Whey Blend"], ["Price", "৳2,200 · In stock"]]
    },
    {
      id: "assign",
      kind: "Action",
      title: "Assign to Sales",
      detail: "The conversation is routed to your sales team with the context attached.",
      rows: [["Team", "Sales"], ["Owner", "Farhan A."]]
    },
    {
      id: "lead",
      kind: "Action",
      title: "Create lead",
      detail: "A lead is created on the customer profile so it can be tracked to a sale.",
      rows: [["Status", "New"], ["Tag", "High intent"]]
    },
    {
      id: "notify",
      kind: "Action",
      title: "Notify team",
      detail: "Your team sees the new lead and conversation right away in the dashboard.",
      rows: [["Who", "Sales team"], ["Where", "OrmiTech dashboard"]]
    }
  ],
  otherwise: {
    id: "otherwise",
    kind: "Otherwise",
    title: "AI keeps helping",
    detail: "For questions without buying intent, the AI assistant continues the conversation from your business knowledge.",
    rows: [["Handled by", "OrmiTech AI"], ["Handover", "If a rule is triggered"]]
  }
};

export const backend = {
  eyebrow: "Behind the scenes",
  title: "Behind every conversation, a powerful system is working.",
  description: "You never have to manage it — but here’s what happens between a customer’s message and your dashboard.",
  services: [
    { title: "Authentication", text: "Sign-in for your team and workspace", icon: KeyRound },
    { title: "Webhooks", text: "Receive Facebook, Instagram and WhatsApp messages", icon: Webhook },
    { title: "Conversation engine", text: "Threads messages by customer and channel", icon: MessagesSquare },
    { title: "AI processing", text: "Understands intent and drafts replies", icon: Sparkles },
    { title: "Automation engine", text: "Runs your workflow rules", icon: Workflow },
    { title: "Lead processing", text: "Creates and updates leads", icon: Target },
    { title: "Order processing", text: "Records orders on the customer profile", icon: ShoppingBag },
    { title: "Real-time updates", text: "Pushes new activity to your dashboard", icon: Radio }
  ],
  data: ["Conversations", "Messages", "Customers", "Leads", "Orders"]
};

export const handover = {
  eyebrow: "06 · Hand over",
  title: "When AI needs a human, your team steps in.",
  description: "AI never locks your team out. Set the rules for when a conversation should move to a person — or take over yourself at any time.",
  rules: [
    { id: "requests_human", title: "Customer requests a human", text: "They ask to talk to a person or an agent.", icon: UserRound },
    { id: "cannot_answer", title: "AI cannot answer", text: "The question isn’t covered by your business knowledge.", icon: CircleHelp },
    { id: "angry_customer", title: "Customer is upset", text: "The customer sounds frustrated or angry.", icon: Frown },
    { id: "manual_order", title: "Order needs manual confirmation", text: "Bulk, custom or high-value orders.", icon: PackageCheck }
  ],
  firedRule: "manual_order",
  flow: ["AI conversation", "Needs attention", "Team takes over", "Conversation continues"]
};

export const workspaceTour = {
  eyebrow: "07 · Manage",
  title: "One workspace. Complete visibility.",
  description: "Conversations, customers, leads, orders and AI activity sit side by side, so your team never jumps between tools. Select an area to explore it.",
  regions: [
    { id: "inbox", label: "Conversations", text: "Every channel in one list, filtered by status." },
    { id: "activity", label: "AI activity", text: "What AI answered, and when it handed over." },
    { id: "customer", label: "Customer details", text: "Contact info, tags and notes on one profile." },
    { id: "lead", label: "Lead status", text: "Where each lead is, from New to Converted." },
    { id: "order", label: "Orders", text: "Order history right next to the chat." },
    { id: "team", label: "Team assignment", text: "Who owns the conversation right now." },
    { id: "stats", label: "Analytics", text: "Response time, AI replies and leads at a glance." }
  ]
};

export const leads = {
  eyebrow: "08 · Convert",
  title: "Turn conversations into qualified leads.",
  description: "When a conversation shows buying intent, OrmiTech creates a lead and your team moves it through the same statuses used in the dashboard.",
  statuses: ["New", "Contacted", "Qualified", "Converted"],
  journey: [
    { title: "Message received", stage: 0 },
    { title: "Intent detected", stage: 0 },
    { title: "Lead created", stage: 0 },
    { title: "Contacted by sales", stage: 1 },
    { title: "Qualified", stage: 2 },
    { title: "Converted", stage: 3 }
  ]
};

export const orders = {
  eyebrow: "From intent to order",
  title: "Turn customer intent into action.",
  description:
    "When a customer is ready to buy, OrmiTech collects the details in the chat and records the order on their profile. OrmiTech shares the payment methods you list; payments and delivery stay with the tools you already use.",
  steps: [
    { title: "Recommendation", text: "AI suggests a product that fits the customer’s need and budget." },
    { title: "Purchase intent", text: "The customer says they want to buy." },
    { title: "Order details", text: "Item, quantity and delivery address are collected in the chat." },
    { title: "Team confirmation", text: "Bulk, custom or high-value orders go to a team member to confirm." },
    { title: "Order recorded", text: "The order is saved to the customer’s profile and history." },
    { title: "Follow-up", text: "Confirmation and delivery check-ins keep the customer informed." }
  ]
};

export const retain = {
  eyebrow: "09 · Retain",
  title: "The conversation doesn’t end after the sale.",
  description: "Every message, order and note stays on the customer profile, so the next conversation starts with full context — whoever answers it.",
  context: ["Conversation history", "Orders", "Tags", "Notes"],
  events: [
    { date: "Mar 2", channel: "Instagram", title: "First message", text: "Asked whether the linen dress comes in medium." },
    { date: "Mar 2", channel: "Instagram", title: "Product enquiry", text: "OrmiTech AI shared sizes, price and delivery time." },
    { date: "Mar 3", channel: "Instagram", title: "Purchase", text: "Order #4790 recorded on her profile." },
    { date: "Mar 6", channel: "WhatsApp", title: "Follow-up", text: "Delivery check-in sent after the order arrived." },
    { date: "Apr 10", channel: "Website", title: "Support", text: "Exchange for order #4821 handled with the full history." },
    { date: "May 18", channel: "WhatsApp", title: "Repeat customer", text: "Tagged VIP after her third order." }
  ]
};

export const system = {
  eyebrow: "OrmiTech in one picture",
  title: "One connected system, from customer to team.",
  description: "Every part you’ve seen works together — channels, AI, automation and your team — around the same customer record."
};

export const useCases = {
  eyebrow: "Who it’s for",
  title: "Built for the way your business already works.",
  description: "The same flow — connect, understand, automate, hand over — adapts to how your customers reach you.",
  items: [
    { title: "E-commerce", text: "Answer stock and delivery questions, recommend products and record orders.", chip: "Order recorded", icon: ShoppingBag },
    { title: "Real Estate", text: "Qualify enquiries by area and budget, then pass hot leads to an agent.", chip: "Hot lead assigned", icon: Building2 },
    { title: "Education", text: "Answer admission and course questions in English or Bangla, day or night.", chip: "Admission enquiry", icon: GraduationCap },
    { title: "Healthcare", text: "Handle appointment requests and route anything clinical to your staff.", chip: "Handed to staff", icon: Stethoscope },
    { title: "Service Businesses", text: "Share pricing, collect booking details and follow up on quotes.", chip: "Booking details", icon: Briefcase },
    { title: "Agencies", text: "Give each client brand its own OrmiTech workspace and keep conversations separate.", chip: "Client workspace", icon: Megaphone }
  ]
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions about how OrmiTech works",
  description: "How setup, AI, automation and your team fit together.",
  items: [
    {
      question: "How does OrmiTech connect to my website?",
      answer:
        "Through the OrmiTech chat widget. Customize it in Channels → Website Chat, copy the installation code and add it to your site. Website conversations then arrive in your OrmiTech inbox alongside your other channels."
    },
    {
      question: "Can I use OrmiTech with WordPress?",
      answer: "Yes. Paste the installation code into your site’s header — through your theme’s custom code setting or a header & footer code plugin. No development work is needed."
    },
    {
      question: "Can I integrate OrmiTech with Next.js or React?",
      answer: "Yes. Add the installation code to your app’s root layout or HTML template — in Next.js, for example, with the Script component — and the widget loads across your app."
    },
    {
      question: "Can I connect Facebook and Instagram?",
      answer: "Yes. Connect your Facebook Page and Instagram Business account from the Channels page, and their messages arrive in the shared inbox."
    },
    {
      question: "Can I connect WhatsApp?",
      answer: "Yes. Connect a WhatsApp Business number through the WhatsApp Cloud API from the Channels page."
    },
    {
      question: "How does the AI understand customer intent?",
      answer:
        "OrmiTech AI reads each message together with the business knowledge you add — business information, FAQs, products and services, and business hours — to work out what the customer needs and choose the right response."
    },
    {
      question: "Can my team take over an AI conversation?",
      answer:
        "Yes. Handover rules move a conversation to your team when a customer asks for a person, the AI can’t answer, the customer is upset or an order needs manual confirmation. Your team can also take over at any time."
    },
    {
      question: "Where can I manage my conversations?",
      answer: "In the OrmiTech dashboard. Conversations, customer details, leads, orders, AI activity and analytics are all in one workspace."
    },
    {
      question: "Does OrmiTech support automation?",
      answer: "Yes. Workflows can send replies, assign conversations, create leads and notify your team based on what customers say."
    },
    {
      question: "How does onboarding work?",
      answer:
        "Talk to our team, connect your channels, add your business knowledge and choose your AI’s language and response style. Our team helps you through each step of the setup."
    }
  ]
};
