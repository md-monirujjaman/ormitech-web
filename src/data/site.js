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

// Blog posts. `answer` is the direct 1-3 sentence answer shown first; `sections` is the body. Info-intent
// keywords from the SEO research map to these articles. No statistics or customer claims are used.
// `related` lists product pages the article links to. `lang` is set only for non-English posts.
export const blogPosts = [
  {
    slug: "why-unified-inbox-matters",
    title: "Why a unified customer inbox matters",
    excerpt: "What happens when every customer channel becomes one operational workspace.",
    date: "2026-09-12",
    category: "Product",
    answer: "A unified customer inbox puts messages from every channel into one place, so your team answers customers from a single view instead of switching between apps and losing context.",
    sections: [
      { heading: "The problem with one app per channel", paragraphs: ["Most small businesses talk to customers on several channels at once: a Facebook Page, Instagram DMs, WhatsApp and a website chat. When each lives in its own app, replies depend on who happens to have that app open.", "The customer sees one business. Your team sees four inboxes. The gap between those two views is where messages get missed and conversations get repeated."] },
      { heading: "What a unified inbox changes", list: ["Every conversation appears in one list, labelled by channel", "Each contact has one record, even if they write from different channels", "Conversations can be assigned to a teammate and given notes", "Status and ownership are visible, so two people do not answer the same message"] },
      { heading: "Where AI fits in", paragraphs: ["A shared inbox is also the natural place for AI. Routine questions such as delivery time or price can be answered automatically, while anything that needs judgment is handed to a person with the whole thread attached."] },
      { heading: "What to look for", paragraphs: ["Look for a single customer record, clear ownership of each conversation, and a fast way to hand a chat from automation to a person. Those three things matter more than the number of channels supported."] }
    ],
    related: ["/product/omnichannel-inbox", "/features/team-collaboration", "/blog/omnichannel-vs-multichannel"]
  },
  {
    slug: "ai-with-human-handover",
    title: "AI automation should know when to hand over",
    excerpt: "The best customer automation is not AI-only. It knows when a human should step in.",
    date: "2026-09-10",
    category: "AI",
    answer: "Good AI customer support answers routine questions on its own and hands the conversation to a person when the topic is sensitive, complex or high value, with the full history attached.",
    sections: [
      { heading: "Why AI-only support fails", paragraphs: ["Automation is good at repetition: delivery times, opening hours, stock questions. It is a poor fit for complaints, custom quotes or anything where the customer needs to feel heard.", "When an automated reply tries to handle those, customers get stuck in a loop and the business loses the very conversations that matter most."] },
      { heading: "Signals that a person should step in", list: ["The customer is upset or reporting a problem with an order", "The request is a custom quote or a bulk purchase", "The question falls outside the information the AI has been given", "The customer asks for a person"] },
      { heading: "What a good handover looks like", paragraphs: ["The person who takes over should not have to ask the customer to repeat themselves. That means a short summary of what was asked, the earlier messages, and any tags or order details already attached to the contact.", "OrmiTech treats human takeover as part of the workflow rather than an exception, so the handover keeps context intact."] },
      { heading: "Keep control of the rules", paragraphs: ["Decide in advance which topics AI may answer and which always go to a teammate. Review those rules as you see real conversations."] }
    ],
    related: ["/features/human-handover", "/product/ai-customer-support", "/blog/what-is-an-ai-chatbot-for-business"]
  },
  {
    slug: "omnichannel-customer-support",
    title: "Designing an omnichannel support workflow",
    excerpt: "A practical framework for connecting social, messaging and website conversations.",
    date: "2026-09-07",
    category: "Guide",
    answer: "An omnichannel support workflow connects every customer channel to one inbox, one customer record and one set of routing rules, so a conversation can move between channels without starting over.",
    sections: [
      { heading: "Step 1: list where customers actually write", paragraphs: ["Start with the channels your customers already use, not every channel available. For many businesses that is Facebook, Instagram, WhatsApp and website chat."] },
      { heading: "Step 2: give each customer one record", paragraphs: ["The same person may message on Instagram today and WhatsApp next week. One record keeps the history, notes, tags and orders together."] },
      { heading: "Step 3: decide who answers what", list: ["Which questions AI can answer automatically", "Which conversations go to which teammate or team", "What triggers a handover to a person", "When a follow-up should be scheduled"] },
      { heading: "Step 4: measure and adjust", paragraphs: ["Track response time, how much automation resolves and how many conversations become leads or orders. Use those numbers to refine your routing rules rather than adding more channels."] }
    ],
    related: ["/product/omnichannel-inbox", "/features/automation", "/solutions/facebook-messenger-automation"]
  },
  {
    slug: "what-is-an-ai-chatbot-for-business",
    title: "What is an AI chatbot for business?",
    excerpt: "A plain-language explanation of what a business AI chatbot does, how it works and where it fits.",
    date: "2026-09-23",
    category: "Guide",
    answer: "An AI chatbot for business is software that answers customer questions automatically in a chat, using information about your business. Unlike a fixed script, it reads the customer's message and responds to what was actually asked.",
    sections: [
      { heading: "How an AI chatbot works", paragraphs: ["The chatbot receives a customer's message, works out what the customer wants, and replies using information you have provided, such as delivery details, prices or opening hours.", "If the question is outside what it has been given, a well-designed chatbot passes the conversation to a person instead of guessing."] },
      { heading: "AI chatbot versus a traditional chatbot", list: ["A traditional chatbot follows fixed menus or keyword rules; an AI chatbot reads free-form messages", "A traditional chatbot fails when wording changes; an AI chatbot copes with different phrasing", "Both should hand over to a person when needed"] },
      { heading: "What businesses use it for", list: ["Answering repeat questions about price, delivery and availability", "Replying outside working hours", "Collecting details from interested customers", "Routing conversations to the right teammate"] },
      { heading: "What it does not replace", paragraphs: ["A chatbot does not replace judgment. Complaints, custom quotes and sensitive conversations still belong with your team. That is why OrmiTech pairs AI replies with a shared inbox and human handover."] }
    ],
    faq: [
      { question: "Is an AI chatbot the same as a live chat tool?", answer: "No. Live chat connects a visitor to a person. An AI chatbot can answer on its own, and in OrmiTech a person can join the same conversation at any time." },
      { question: "Which channels can an AI chatbot work on?", answer: "OrmiTech supports Facebook, Instagram, WhatsApp and website chat." }
    ],
    related: ["/features/ai-chatbot", "/product/ai-customer-support", "/solutions/whatsapp-ai-chatbot"]
  },
  {
    slug: "omnichannel-vs-multichannel",
    title: "Omnichannel vs multichannel: key differences",
    excerpt: "Both use several channels. Only one connects them into a single customer experience.",
    date: "2026-09-23",
    category: "Guide",
    answer: "Multichannel means a business is present on several channels that run separately. Omnichannel means those channels are connected, so a customer's history and context follow them from one channel to another.",
    sections: [
      { heading: "Multichannel in practice", paragraphs: ["A business with a Facebook Page, an Instagram account and a WhatsApp number is multichannel. Each channel may be managed by a different person, and a message on one channel is invisible on the others."] },
      { heading: "Omnichannel in practice", paragraphs: ["In an omnichannel setup the same channels feed one inbox and one customer record. If a customer asks about an order on Instagram and follows up on WhatsApp, your team sees both in one thread of history."] },
      { heading: "Side by side", list: ["Multichannel: separate inboxes; omnichannel: one shared inbox", "Multichannel: history split by channel; omnichannel: one customer record", "Multichannel: replies depend on who is watching which app; omnichannel: conversations have owners"] },
      { heading: "Which one do you need?", paragraphs: ["If customers write to you on more than one channel and the same people reply on all of them, moving to omnichannel usually removes duplicated work. An omnichannel inbox is the practical starting point."] }
    ],
    related: ["/product/omnichannel-inbox", "/features/team-collaboration", "/blog/why-unified-inbox-matters"]
  },
  {
    slug: "how-does-a-whatsapp-chatbot-work",
    title: "How does a WhatsApp chatbot work?",
    excerpt: "What happens between a customer's WhatsApp message and the reply, and where your team fits in.",
    date: "2026-09-23",
    category: "Guide",
    answer: "A WhatsApp chatbot receives the messages customers send to your business number, works out what they are asking, and replies automatically for routine questions. Anything it should not handle is passed to a person.",
    sections: [
      { heading: "The flow, step by step", list: ["A customer sends a message to your business on WhatsApp", "The message appears in your inbox", "AI reads the message and identifies the intent", "For routine questions, an answer is sent using your business information", "For everything else, the chat is assigned to a teammate with a summary"] },
      { heading: "Benefits of a WhatsApp chatbot", list: ["Customers get an answer at any hour", "Your team spends less time on repeat questions", "Every WhatsApp conversation is kept in a shared inbox", "Leads and orders can be captured from the chat"] },
      { heading: "What to prepare before you start", paragraphs: ["Write down the questions customers ask most often and the correct answers. The better the information you give the chatbot, the better its replies. Decide which topics must always go to a person."] },
      { heading: "Things to keep in mind", paragraphs: ["WhatsApp has its own rules for business messaging, and what is possible follows those rules. Keep a person available for conversations the chatbot should not handle."] }
    ],
    faq: [
      { question: "Is a WhatsApp chatbot free?", answer: "Pricing depends on the provider. OrmiTech has a Free plan to start with; see the pricing page for current plans." }
    ],
    related: ["/solutions/whatsapp-ai-chatbot", "/features/human-handover", "/blog/what-is-an-ai-chatbot-for-business"]
  },
  {
    slug: "what-is-f-commerce",
    title: "What is F-commerce? A guide for Bangladeshi sellers",
    excerpt: "F-commerce means selling through Facebook. Here is how it works and how sellers manage the messages.",
    date: "2026-09-23",
    category: "Guide",
    answer: "F-commerce means selling products through Facebook, usually with a Facebook Page where customers browse posts and place orders by messaging the seller. It is common with small online businesses in Bangladesh.",
    sections: [
      { heading: "How F-commerce works", paragraphs: ["A seller posts products on a Facebook Page. A customer sends a message asking about price or size, the seller replies, and the order is agreed in the chat. Delivery and payment, often cash on delivery, follow."] },
      { heading: "The hard part: managing messages", paragraphs: ["Because the sale happens in the inbox, a slow or missed reply is a lost order. As a Page grows, the same questions arrive again and again, and orders are hard to track across long chats."] },
      { heading: "How sellers make it easier", list: ["Answer repeat questions automatically", "Keep Facebook, Instagram and WhatsApp chats in one inbox", "Capture order details from the conversation", "Let more than one person manage the Page inbox"] },
      { heading: "Where OrmiTech fits", paragraphs: ["OrmiTech gives F-commerce sellers a shared inbox, AI replies for routine questions and order tracking beside each chat."] }
    ],
    faq: [
      { question: "F-commerce কী?", answer: "F-commerce মানে ফেসবুকের মাধ্যমে পণ্য বিক্রি করা, সাধারণত একটি ফেসবুক পেজ ও মেসেজের মাধ্যমে অর্ডার নেওয়া।" }
    ],
    related: ["/ai-chatbot-bangladesh", "/solutions/ecommerce-chatbot", "/solutions/facebook-messenger-automation"]
  },
  {
    slug: "chatbot-ki",
    lang: "bn",
    title: "চ্যাটবট কী এবং এটি কীভাবে কাজ করে?",
    excerpt: "চ্যাটবট কী, কীভাবে কাজ করে এবং ব্যবসায় কোথায় কাজে লাগে, সহজ ভাষায়।",
    date: "2026-09-23",
    category: "গাইড",
    answer: "চ্যাটবট এমন একটি সফটওয়্যার যা চ্যাটে কাস্টমারের প্রশ্নের উত্তর নিজে নিজে দেয়। AI চ্যাটবট কাস্টমারের লেখা বুঝে উত্তর দেয়, ফলে শুধু নির্দিষ্ট কিছু শব্দের ওপর নির্ভর করতে হয় না।",
    sections: [
      { heading: "চ্যাটবট কীভাবে কাজ করে", paragraphs: ["কাস্টমার মেসেজ পাঠালে চ্যাটবট সেটি পড়ে বোঝার চেষ্টা করে কাস্টমার কী জানতে চান। তারপর আপনার দেওয়া তথ্য থেকে উত্তর পাঠায়, যেমন ডেলিভারির সময় বা দাম।", "যে প্রশ্নের উত্তর তার কাছে নেই, ভালো চ্যাটবট সেখানে আন্দাজে না বলে কথোপকথন একজন মানুষের কাছে পাঠিয়ে দেয়।"] },
      { heading: "সাধারণ চ্যাটবট আর AI চ্যাটবটের পার্থক্য", list: ["সাধারণ চ্যাটবট নির্দিষ্ট মেনু বা শব্দ ধরে চলে, AI চ্যাটবট নিজের ভাষায় লেখা মেসেজ বোঝে", "একই প্রশ্ন ভিন্নভাবে লিখলে সাধারণ চ্যাটবট আটকে যেতে পারে, AI চ্যাটবট সামলাতে পারে"] },
      { heading: "ব্যবসায় কোথায় কাজে লাগে", list: ["দাম, ডেলিভারি ও প্রাপ্যতার মতো বারবার আসা প্রশ্নের উত্তর দিতে", "অফিস সময়ের বাইরেও কাস্টমারকে উত্তর দিতে", "আগ্রহী কাস্টমারের তথ্য সংগ্রহ করতে"] },
      { heading: "চ্যাটবট যা বদলে দিতে পারে না", paragraphs: ["অভিযোগ, বিশেষ দামের অনুরোধ বা স্পর্শকাতর কথোপকথনে মানুষের বিবেচনা লাগে। তাই OrmiTech-এ AI-র উত্তরের পাশাপাশি শেয়ার্ড ইনবক্স ও মানুষের কাছে হস্তান্তরের ব্যবস্থা রাখা হয়েছে।"] }
    ],
    related: ["/bn/facebook-page-auto-reply", "/ai-chatbot-bangladesh", "/blog/what-is-an-ai-chatbot-for-business"]
  }
];
