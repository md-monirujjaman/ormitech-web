// Content for the channel and market landing pages under /solutions, /ai-chatbot-bangladesh and /bn.
// Every capability below is one the site already states elsewhere (Product, Features, How it works). Nothing
// here names prices, plan limits, customers, statistics, integrations or competitors. Keyword targeting comes
// from OrmiTech_Raw_Keywords_1.xlsx (SEO sheets); each page owns a different primary keyword to avoid cannibalization.

import { blogPosts } from "@/data/site";

const coreEntity =
  "OrmiTech is an AI-powered customer communication platform. It brings Facebook, Instagram, WhatsApp and website chat into one shared inbox, answers routine questions with AI, and hands conversations to your team when a person is needed.";

export const solutionPages = [
  {
    slug: "whatsapp-ai-chatbot",
    path: "/solutions/whatsapp-ai-chatbot",
    primaryKeyword: "whatsapp ai chatbot",
    meta: {
      title: "WhatsApp AI Chatbot for Business Customer Service",
      description: "Use OrmiTech's WhatsApp AI chatbot to answer common customer questions automatically, keep every chat in a shared inbox and hand over to your team when needed."
    },
    hero: {
      eyebrow: "WhatsApp AI chatbot",
      title: "A WhatsApp AI chatbot that answers customers and keeps your team in control.",
      description: "Connect WhatsApp to OrmiTech so common questions get an instant reply, and every conversation lands in the same inbox as your other channels."
    },
    answer: {
      heading: "What is a WhatsApp AI chatbot?",
      definition:
        "A WhatsApp AI chatbot reads the messages customers send to your business on WhatsApp and replies automatically to routine questions, using information you provide about your business. With OrmiTech, the chatbot works inside a shared inbox, so a teammate can take over any conversation with the full history in view.",
      facts: [
        ["What it does", "Answers common WhatsApp questions, detects what the customer wants and hands over to a person when needed"],
        ["Who it is for", "Businesses that get customer questions, orders or enquiries on WhatsApp"],
        ["Where it works", "WhatsApp, alongside Facebook, Instagram and website chat in one inbox"],
        ["Your team's role", "Set the rules, review conversations and take over whenever a person is better placed to reply"]
      ]
    },
    stepsTitle: "How OrmiTech handles a WhatsApp conversation",
    steps: [
      { title: "A customer messages your WhatsApp", text: "The message arrives in your OrmiTech inbox with the customer's name, channel and any earlier history." },
      { title: "AI reads the intent", text: "OrmiTech AI works out whether the customer is asking about delivery, price, an order or something that needs a person." },
      { title: "Routine questions get an instant reply", text: "For questions covered by your business information, the reply goes out straight away, day or night." },
      { title: "Your team steps in when it matters", text: "Sensitive, complex or high-value conversations are handed to a teammate with an AI summary and the whole thread attached." }
    ],
    benefitsTitle: "Why businesses use WhatsApp automation with OrmiTech",
    benefits: [
      { title: "Faster first replies", text: "Customers hear back at once instead of waiting for someone to pick up the phone." },
      { title: "One inbox, not another app", text: "WhatsApp chats sit next to Facebook, Instagram and website conversations, so nobody switches tabs." },
      { title: "Context that follows the customer", text: "Notes, tags and order history stay on the contact record even when the customer changes channel." },
      { title: "Human takeover built in", text: "Automation does the repetitive work. A person decides anything that needs judgment." }
    ],
    useCasesTitle: "Common WhatsApp use cases",
    useCases: [
      { title: "Pre-sale questions", text: "Availability, pricing and delivery questions answered before a salesperson is involved." },
      { title: "Order follow-ups", text: "Customers ask where their order is; the answer and the order record sit in the same place." },
      { title: "Booking and enquiry capture", text: "Collect what the customer wants, tag the lead and assign it to the right teammate." }
    ],
    faq: [
      { question: "Can an AI chatbot work with WhatsApp?", answer: "Yes. OrmiTech connects WhatsApp to a shared inbox and lets AI answer routine questions there, while your team can take over any conversation." },
      { question: "Does the chatbot replace my team?", answer: "No. It handles repetitive questions. Conversations that are sensitive, complex or high value are handed to a person, with the full context." },
      { question: "Can my team see WhatsApp and other channels together?", answer: "Yes. WhatsApp, Facebook, Instagram and website chat appear in one inbox, with a single customer record behind each contact." },
      { question: "Do I need to write the answers myself?", answer: "You provide information about your business. OrmiTech AI uses it to answer common questions, and your team can review and adjust how automation behaves." }
    ],
    related: ["/solutions/facebook-messenger-automation", "/solutions/instagram-dm-automation", "/product/omnichannel-inbox", "/features/human-handover"]
  },
  {
    slug: "facebook-messenger-automation",
    path: "/solutions/facebook-messenger-automation",
    primaryKeyword: "facebook messenger automation",
    meta: {
      title: "Facebook Messenger Automation and Page Auto-Reply",
      description: "Automate Facebook Page messages with OrmiTech: instant AI replies to common questions, a shared team inbox and easy handover to a person."
    },
    hero: {
      eyebrow: "Facebook Messenger automation",
      title: "Facebook Page auto-reply that answers, routes and hands over.",
      description: "OrmiTech turns your Facebook Page inbox into a managed workspace: AI answers routine messages and your team picks up the rest."
    },
    answer: {
      heading: "What is Facebook Messenger automation?",
      definition:
        "Facebook Messenger automation means replying to messages sent to your Facebook Page automatically instead of by hand. OrmiTech goes beyond a fixed auto-reply message: AI answers routine questions from your business information, and conversations are routed, tagged and handed to your team inside a shared inbox.",
      facts: [
        ["What it does", "Answers Facebook Page messages, routes conversations, tags leads and hands over to a person"],
        ["Who it is for", "Businesses and online sellers who sell or support customers through a Facebook Page"],
        ["Where it works", "Facebook, alongside Instagram, WhatsApp and website chat in one inbox"],
        ["What stays manual", "Anything you want a person to decide, such as custom quotes or sensitive complaints"]
      ]
    },
    stepsTitle: "From a Page message to a resolved conversation",
    steps: [
      { title: "A customer messages your Page", text: "The conversation appears in OrmiTech next to your other channels." },
      { title: "The message is understood, not just matched", text: "AI reads what the customer is asking instead of waiting for an exact keyword." },
      { title: "The right action runs", text: "Reply, assign to a teammate, add a tag or create a follow-up, based on rules your team sets." },
      { title: "Your team continues the chat", text: "When a person takes over, the AI summary and full history are already attached." }
    ],
    benefitsTitle: "What you get beyond a basic auto-reply",
    benefits: [
      { title: "Answers that fit the question", text: "A single canned message cannot tell a price question from a delivery question. AI can." },
      { title: "Team inbox for the Page", text: "Several teammates can work the same Page inbox, with ownership and notes." },
      { title: "Lead capture in the conversation", text: "Tag hot leads and schedule follow-ups without copying details into another tool." },
      { title: "Measured results", text: "See response time, automation activity and lead flow in analytics." }
    ],
    useCases: [
      { title: "Online shops selling on Facebook", text: "Answer product, price and delivery questions and start an order from the chat." },
      { title: "Service businesses", text: "Collect enquiries and route them to the person who quotes or books." },
      { title: "Busy Pages with repeat questions", text: "Let AI take the questions that come up every day." }
    ],
    useCasesTitle: "Who uses Facebook Page automation",
    faq: [
      { question: "Can AI automate Facebook messages?", answer: "Yes. OrmiTech connects your Facebook Page, answers routine messages with AI and hands conversations to your team when a person is needed." },
      { question: "How is this different from Facebook's built-in auto-reply?", answer: "A built-in auto-reply sends a fixed message. OrmiTech reads the customer's message, answers from your business information, and adds routing, tags, follow-ups and a shared team inbox." },
      { question: "Can several people manage one Facebook Page inbox?", answer: "Yes. Assign conversations to teammates, leave notes and hand chats between people without losing history." },
      { question: "Does it also cover Instagram and WhatsApp?", answer: "Yes. Facebook, Instagram, WhatsApp and website chat all arrive in the same inbox." }
    ],
    related: ["/solutions/instagram-dm-automation", "/solutions/whatsapp-ai-chatbot", "/features/automation", "/product/lead-order-management", "/blog/omnichannel-customer-support"]
  },
  {
    slug: "instagram-dm-automation",
    path: "/solutions/instagram-dm-automation",
    primaryKeyword: "instagram dm automation",
    meta: {
      title: "Instagram DM Automation with AI Replies",
      description: "Reply to Instagram DMs faster with OrmiTech: AI answers common questions, conversations stay in a shared inbox and your team can take over at any time."
    },
    hero: {
      eyebrow: "Instagram DM automation",
      title: "Answer Instagram DMs quickly without losing the personal touch.",
      description: "OrmiTech brings Instagram messages into a shared inbox, lets AI handle routine questions and gives your team the context to reply to everything else."
    },
    answer: {
      heading: "What is Instagram DM automation?",
      definition:
        "Instagram DM automation is the use of software to reply to direct messages your business receives on Instagram. OrmiTech uses AI to answer routine questions, and keeps every Instagram conversation in a shared inbox where your team can step in.",
      facts: [
        ["What it does", "Answers Instagram DMs, tags leads and assigns conversations to teammates"],
        ["Who it is for", "Brands, shops and creators-turned-businesses that receive sales and support questions by DM"],
        ["Where it works", "Instagram, alongside Facebook, WhatsApp and website chat in one inbox"],
        ["What stays personal", "Conversations you want a person to handle can be taken over at any point"]
      ]
    },
    stepsTitle: "How an Instagram DM is handled",
    steps: [
      { title: "A DM arrives", text: "It appears in the OrmiTech inbox with the customer's earlier conversations." },
      { title: "AI reads the question", text: "Questions such as colours, sizes, prices and delivery are recognised." },
      { title: "The reply goes out", text: "Routine questions are answered instantly using your business information." },
      { title: "The lead is captured", text: "Interested customers are tagged and can be assigned for a follow-up." }
    ],
    benefitsTitle: "Why teams manage Instagram DMs in OrmiTech",
    benefits: [
      { title: "No missed DMs", text: "Messages do not disappear into a busy mobile inbox." },
      { title: "Shared with the team", text: "Assign a DM to whoever handles that customer, and leave notes for the next person." },
      { title: "Same customer, every channel", text: "If the customer also writes on WhatsApp, the history is on one record." },
      { title: "From DM to order", text: "Start an order from the conversation and keep it next to the chat." }
    ],
    useCases: [
      { title: "Fashion and product brands", text: "Answer availability and sizing questions, then take the order." },
      { title: "Coaches and service providers", text: "Qualify enquiries before a call is booked." },
      { title: "Growing shops", text: "Keep replies fast as message volume grows." }
    ],
    useCasesTitle: "Instagram use cases",
    faq: [
      { question: "Can AI automate Instagram DMs?", answer: "Yes. OrmiTech connects Instagram, answers routine DMs with AI and lets your team take over any conversation." },
      { question: "Will my Instagram customers know they are talking to AI?", answer: "You decide how automation is set up and when a person replies. Sensitive or high-value conversations can always be handled by your team." },
      { question: "Can I manage Instagram and Facebook together?", answer: "Yes. Both, plus WhatsApp and website chat, appear in one inbox." }
    ],
    related: ["/solutions/facebook-messenger-automation", "/solutions/whatsapp-ai-chatbot", "/product/omnichannel-inbox", "/features/ai-chatbot"]
  },
  {
    slug: "ecommerce-chatbot",
    path: "/solutions/ecommerce-chatbot",
    primaryKeyword: "ai chatbot for ecommerce",
    meta: {
      title: "AI Chatbot for Ecommerce and Online Sellers",
      description: "OrmiTech's AI chatbot for ecommerce answers product, delivery and order questions on Facebook, Instagram, WhatsApp and your website."
    },
    hero: {
      eyebrow: "AI chatbot for ecommerce",
      title: "An AI chatbot for online shops that turns chats into orders.",
      description: "Answer product and delivery questions on every channel your customers use, and keep each order beside the conversation it came from."
    },
    answer: {
      heading: "What is an AI chatbot for ecommerce?",
      definition:
        "An AI chatbot for ecommerce answers the questions shoppers ask before and after buying, such as price, availability, delivery and order status. OrmiTech does this across Facebook, Instagram, WhatsApp and website chat, and lets you start and track orders directly from the conversation.",
      facts: [
        ["What it does", "Answers shopper questions, captures order details and links orders to the conversation"],
        ["Who it is for", "Online shops, social-commerce sellers and small retail teams"],
        ["Where it works", "Facebook, Instagram, WhatsApp and website chat"],
        ["What your team does", "Confirms orders, handles exceptions such as exchanges and takes over sensitive chats"]
      ]
    },
    stepsTitle: "A shopper conversation, start to finish",
    steps: [
      { title: "The shopper asks", text: "For example, whether a product comes in another size, or how long delivery takes." },
      { title: "AI answers or drafts a reply", text: "Routine questions are answered; trickier ones are drafted for your team to review." },
      { title: "Order details are captured", text: "Order number, item and change requested are picked out of the conversation." },
      { title: "The order stays with the chat", text: "Order history sits on the customer record, so the next question is answered with context." }
    ],
    benefitsTitle: "What changes for a small online business",
    benefits: [
      { title: "Fewer repeat questions to type", text: "Delivery, price and availability are answered automatically." },
      { title: "Orders and chats in one place", text: "No hunting through separate inboxes for what a customer ordered." },
      { title: "Exchanges and follow-ups tracked", text: "Requests such as an exchange become a task, not a forgotten message." },
      { title: "Room to grow", text: "Add teammates and routing rules as order volume increases." }
    ],
    useCases: [
      { title: "Social-commerce sellers", text: "Take orders that begin in Facebook or Instagram messages." },
      { title: "Shops with a website chat", text: "Answer visitors and continue the conversation on WhatsApp." },
      { title: "Returning customers", text: "See past orders before you reply." }
    ],
    useCasesTitle: "Ecommerce use cases",
    faq: [
      { question: "Can an AI chatbot help an ecommerce business?", answer: "Yes. It answers common product, delivery and order questions instantly and captures order details from the conversation, while your team handles exceptions." },
      { question: "Can I start an order from a chat?", answer: "Yes. OrmiTech lets you start an order from a conversation and keeps the order history next to the chat." },
      { question: "Does this work for Facebook and Instagram sellers?", answer: "Yes. Facebook, Instagram, WhatsApp and website chat are handled in one inbox." }
    ],
    related: ["/product/lead-order-management", "/solutions/facebook-messenger-automation", "/solutions/instagram-dm-automation", "/pricing"]
  }
];

export const bangladeshPage = {
  path: "/ai-chatbot-bangladesh",
  primaryKeyword: "ai chatbot bangladesh",
  meta: {
    title: "AI Chatbot for Businesses in Bangladesh",
    description: "OrmiTech is an AI chatbot and shared inbox for Bangladeshi businesses that sell and support customers on Facebook, WhatsApp, Instagram and their website."
  },
  hero: {
    eyebrow: "AI chatbot Bangladesh",
    title: "An AI chatbot for Bangladeshi businesses that sell through messages.",
    description: "Many Bangladeshi businesses take orders and answer questions in Facebook, WhatsApp and Instagram messages. OrmiTech puts those conversations in one inbox and lets AI handle the routine ones."
  },
  answer: {
    heading: "What is an AI chatbot solution for a Bangladeshi business?",
    definition:
      "It is software that answers customer messages automatically on the channels Bangladeshi customers already use, mainly Facebook and WhatsApp, and passes conversations to your team when a person is needed. OrmiTech combines that with a shared inbox, order tracking and lead tagging.",
    facts: [
      ["What it does", "Answers customer messages, keeps conversations in one inbox and tracks leads and orders"],
      ["Who it is for", "F-commerce sellers, online shops and service businesses that sell through messaging"],
      ["Channels", "Facebook, Instagram, WhatsApp and website chat"],
      ["Language", "OrmiTech's own demo handles customer messages written in Bangla and English, including mixed Bangla-English"]
    ]
  },
  stepsTitle: "How it fits a Facebook-first business",
  steps: [
    { title: "Connect the channels you already sell on", text: "Facebook, Instagram, WhatsApp and website chat feed one inbox." },
    { title: "Let AI take the repeat questions", text: "Delivery time, price and availability questions get instant answers." },
    { title: "Track orders in the chat", text: "Capture order details, delivery location and status beside the conversation." },
    { title: "Bring in your team", text: "Assign conversations and hand over sensitive chats with context." }
  ],
  benefitsTitle: "Why it suits F-commerce and online sellers",
  benefits: [
    { title: "Built around messaging", text: "The sale often happens in the inbox, so the inbox is where the tools are." },
    { title: "Faster replies", text: "Customers who message at night still hear back." },
    { title: "Less copy-and-paste", text: "Order and lead details are captured from the conversation." },
    { title: "Shared by the whole team", text: "No more one person holding the only phone that has the chats." }
  ],
  useCases: [
    { title: "F-commerce sellers", text: "Take orders that begin in a Facebook Page or Instagram message." },
    { title: "Online shops", text: "Answer delivery questions for cities such as Dhaka and confirm cash-on-delivery orders." },
    { title: "Service businesses", text: "Capture enquiries and route them to whoever gives the quote." }
  ],
  useCasesTitle: "Who it is for in Bangladesh",
  faq: [
    { question: "Does OrmiTech work with Facebook and WhatsApp in Bangladesh?", answer: "OrmiTech connects Facebook, Instagram, WhatsApp and website chat into one inbox. Availability of each channel follows the platform's own rules." },
    { question: "Can OrmiTech understand Bangla messages?", answer: "OrmiTech's product walkthrough shows customer messages in Bangla and English, including mixed Bangla-English. Confirm your exact language needs with the team before you rely on it." },
    { question: "Is there a free plan?", answer: "OrmiTech has a Free plan to start with. See the pricing page for the current plans." },
    { question: "What is F-commerce?", answer: "F-commerce means selling products through Facebook, typically via a Page and Messenger conversations." }
  ],
  related: ["/solutions/facebook-messenger-automation", "/solutions/ecommerce-chatbot", "/solutions/whatsapp-ai-chatbot", "/bn/facebook-page-auto-reply"]
};

// Bangla landing page for the Facebook Page auto-reply cluster ("ফেসবুক পেজ অটো রিপ্লাই").
export const banglaFacebookPage = {
  path: "/bn/facebook-page-auto-reply",
  enPath: "/solutions/facebook-messenger-automation",
  meta: {
    title: "ফেসবুক পেজ অটো রিপ্লাই ও মেসেঞ্জার অটোমেশন",
    description: "OrmiTech দিয়ে ফেসবুক পেজের মেসেজের দ্রুত উত্তর দিন। সাধারণ প্রশ্নের উত্তর দেয় AI, সব চ্যাট থাকে এক ইনবক্সে, আর দরকার হলে আপনার টিম নিজে কথা বলে।"
  },
  hero: {
    eyebrow: "ফেসবুক পেজ অটো রিপ্লাই",
    title: "ফেসবুক পেজের মেসেজে দ্রুত উত্তর দিন, ইনবক্স থাকুক গোছানো।",
    description: "OrmiTech আপনার ফেসবুক পেজের মেসেজ এক জায়গায় আনে। সাধারণ প্রশ্নের উত্তর দেয় AI, আর যেখানে মানুষের দরকার সেখানে আপনার টিম কথোপকথন নিয়ে নেয়।"
  },
  answer: {
    heading: "ফেসবুক পেজ অটো রিপ্লাই কী?",
    definition:
      "ফেসবুক পেজ অটো রিপ্লাই মানে পেজে আসা কাস্টমারের মেসেজের উত্তর নিজে নিজে চলে যাওয়া। সাধারণ অটো রিপ্লাই একটি নির্দিষ্ট মেসেজ পাঠায়। OrmiTech-এ AI কাস্টমারের প্রশ্ন বুঝে আপনার ব্যবসার তথ্য থেকে উত্তর দেয়, আর কথোপকথন আপনার টিমের শেয়ার্ড ইনবক্সে জমা থাকে।",
    facts: [
      ["কী করে", "পেজের মেসেজের উত্তর দেয়, কথোপকথন ঠিক মানুষের কাছে পাঠায়, লিডে ট্যাগ বসায়"],
      ["কাদের জন্য", "যারা ফেসবুক পেজের মাধ্যমে বিক্রি করেন বা কাস্টমার সাপোর্ট দেন"],
      ["কোন চ্যানেলে", "ফেসবুক, ইনস্টাগ্রাম, হোয়াটসঅ্যাপ ও ওয়েবসাইট চ্যাট এক ইনবক্সে"],
      ["মানুষ কখন", "যেসব প্রশ্নে সিদ্ধান্ত দরকার, যেমন দামদর বা অভিযোগ, সেগুলো আপনার টিম দেখে"]
    ]
  },
  stepsTitle: "পেজের মেসেজ থেকে সমাধান পর্যন্ত",
  steps: [
    { title: "কাস্টমার পেজে মেসেজ করেন", text: "মেসেজটি OrmiTech ইনবক্সে অন্য চ্যানেলের পাশেই দেখা যায়।" },
    { title: "AI প্রশ্নটি বোঝে", text: "শুধু নির্দিষ্ট শব্দ মিলিয়ে নয়, কাস্টমার আসলে কী জানতে চান তা বোঝার চেষ্টা করে।" },
    { title: "উত্তর বা পরবর্তী কাজ", text: "উত্তর পাঠানো, টিমের কাউকে দায়িত্ব দেওয়া, ট্যাগ বসানো বা ফলো-আপ ঠিক করা যায়।" },
    { title: "টিম কথা চালিয়ে যায়", text: "কেউ কথোপকথন নিলে AI-র সারসংক্ষেপ ও পুরো ইতিহাস আগে থেকেই সঙ্গে থাকে।" }
  ],
  benefitsTitle: "সাধারণ অটো রিপ্লাইয়ের চেয়ে কী বেশি পাবেন",
  benefits: [
    { title: "প্রশ্ন অনুযায়ী উত্তর", text: "একটি একই মেসেজ দামের প্রশ্ন আর ডেলিভারির প্রশ্নের তফাত বোঝে না। AI বোঝে।" },
    { title: "পুরো টিমের ইনবক্স", text: "একাধিক জন একই পেজের ইনবক্সে কাজ করতে পারেন, নোট রেখে যেতে পারেন।" },
    { title: "লিড ও অর্ডার এক জায়গায়", text: "কথোপকথন থেকেই লিড ট্যাগ করা যায় এবং অর্ডার শুরু করা যায়।" },
    { title: "ফলাফল মাপা যায়", text: "উত্তর দিতে কত সময় লাগছে ও অটোমেশন কেমন চলছে তা অ্যানালিটিক্সে দেখা যায়।" }
  ],
  useCases: [
    { title: "ফেসবুকে বিক্রি করা অনলাইন শপ", text: "পণ্য, দাম ও ডেলিভারির প্রশ্নের উত্তর দিন এবং চ্যাট থেকে অর্ডার নিন।" },
    { title: "সার্ভিস ব্যবসা", text: "জিজ্ঞাসা সংগ্রহ করে যিনি কোটেশন দেন তাঁর কাছে পাঠান।" },
    { title: "ব্যস্ত পেজ", text: "প্রতিদিনের একই ধরনের প্রশ্ন AI-কে সামলাতে দিন।" }
  ],
  useCasesTitle: "কারা ব্যবহার করতে পারেন",
  faq: [
    { question: "ফেসবুক পেজে অটো রিপ্লাই কীভাবে কাজ করে?", answer: "OrmiTech আপনার ফেসবুক পেজ যুক্ত করলে পেজের মেসেজ ইনবক্সে আসে। সাধারণ প্রশ্নের উত্তর AI দেয়, আর দরকার হলে আপনার টিম কথোপকথন নিজের হাতে নেয়।" },
    { question: "এটি কি ফেসবুকের নিজস্ব অটো রিপ্লাইয়ের মতোই?", answer: "না। ফেসবুকের নিজস্ব অটো রিপ্লাই একটি নির্দিষ্ট মেসেজ পাঠায়। OrmiTech কাস্টমারের প্রশ্ন বুঝে উত্তর দেয় এবং সঙ্গে রাউটিং, ট্যাগ, ফলো-আপ ও টিম ইনবক্স দেয়।" },
    { question: "একই পেজ কি একাধিক জন সামলাতে পারবেন?", answer: "পারবেন। কথোপকথন টিমের সদস্যদের দায়িত্ব দেওয়া যায়, নোট রাখা যায়, আর এক জনের কাছ থেকে আরেক জনের কাছে ইতিহাস না হারিয়ে হস্তান্তর করা যায়।" },
    { question: "ইনস্টাগ্রাম ও হোয়াটসঅ্যাপও কি একই জায়গায় দেখা যাবে?", answer: "হ্যাঁ। ফেসবুক, ইনস্টাগ্রাম, হোয়াটসঅ্যাপ ও ওয়েবসাইট চ্যাট একই ইনবক্সে আসে।" }
  ],
  related: ["/ai-chatbot-bangladesh", "/solutions/whatsapp-ai-chatbot", "/solutions/instagram-dm-automation", "/product/omnichannel-inbox"]
};

export const relatedLabels = {
  "/solutions/whatsapp-ai-chatbot": { title: "WhatsApp AI chatbot", text: "Answer WhatsApp customers automatically and keep your team in control." },
  "/solutions/facebook-messenger-automation": { title: "Facebook Messenger automation", text: "Auto-reply, route and hand over Facebook Page messages." },
  "/solutions/instagram-dm-automation": { title: "Instagram DM automation", text: "Reply to Instagram DMs faster with AI and a shared inbox." },
  "/solutions/ecommerce-chatbot": { title: "AI chatbot for ecommerce", text: "Answer shopper questions and keep orders beside the chat." },
  "/ai-chatbot-bangladesh": { title: "AI chatbot for Bangladesh", text: "For Bangladeshi businesses selling through Facebook and WhatsApp." },
  "/bn/facebook-page-auto-reply": { title: "ফেসবুক পেজ অটো রিপ্লাই", text: "বাংলায়: পেজের মেসেজে দ্রুত উত্তর ও গোছানো ইনবক্স।" },
  "/product/omnichannel-inbox": { title: "Omnichannel inbox", text: "Every channel in one team workspace." },
  "/product/lead-order-management": { title: "Lead & order management", text: "Turn conversations into leads and orders." },
  "/features/human-handover": { title: "Human handover", text: "Hand a chat from AI to a person with context." },
  "/features/ai-chatbot": { title: "AI chatbot", text: "How OrmiTech AI answers customers." },
  "/features/automation": { title: "Automation", text: "Routing, tags, replies and follow-ups." },
  "/pricing": { title: "Pricing", text: "Compare plans and start free." }
};

export { coreEntity };

// Direct-answer blocks (AEO/GEO) for the homepage and Product pages. Facts match copy already on the site.
export const answerBlocks = {
  home: {
    heading: "What is OrmiTech?",
    definition: coreEntity,
    facts: [
      ["What it does", "Unifies customer conversations, answers routine questions with AI, automates routing and follow-ups, and tracks leads and orders"],
      ["Who it is for", "Businesses that talk to customers on social media, messaging apps and website chat, such as online shops, service businesses, education, real estate and healthcare teams"],
      ["Channels", "Facebook, Instagram, WhatsApp and website chat"],
      ["How people stay in control", "Human handover at any point, with context, and rules your team approves"]
    ]
  },
  product: {
    heading: "What does the OrmiTech platform include?",
    definition:
      "OrmiTech is one workspace for customer communication: a shared inbox for your channels, an AI assistant for routine replies, automation for routing and follow-ups, lead and order tracking, and analytics.",
    facts: [
      ["Inbox", "Facebook, Instagram, WhatsApp and website chat in one team inbox"],
      ["AI", "Answers common questions, suggests replies, summarizes chats and detects intent"],
      ["Automation", "Routes conversations, adds tags, sends replies and schedules follow-ups"],
      ["Team", "Assign conversations, set roles and hand over with full context"]
    ]
  },
  "/product/ai-customer-support": {
    heading: "What is AI customer support?",
    definition:
      "AI customer support means using AI to answer customer questions automatically. In OrmiTech, AI replies to routine questions, drafts responses for your team on trickier ones, and passes the conversation to a person when needed.",
    facts: [
      ["What it does", "Answers common questions, summarizes conversations, detects intent and drafts replies"],
      ["Who it is for", "Teams that answer the same customer questions repeatedly"],
      ["Where it works", "Facebook, Instagram, WhatsApp and website chat"],
      ["Your control", "Your team reviews conversations and can take over at any time"]
    ]
  },
  "/product/omnichannel-inbox": {
    heading: "What is an omnichannel inbox?",
    definition:
      "An omnichannel inbox collects messages from every customer channel into one shared inbox with one record per customer. OrmiTech's omnichannel inbox covers Facebook, Instagram, WhatsApp and website chat.",
    facts: [
      ["What it does", "Shows all conversations in one list with channel, status, owner and customer context"],
      ["Who it is for", "Teams that reply to customers on more than one channel"],
      ["Customer record", "History, tags, notes and orders stay on one contact across channels"],
      ["Team use", "Assign conversations and leave notes for the next person"]
    ]
  },
  "/product/lead-order-management": {
    heading: "What is lead and order management in a chat platform?",
    definition:
      "It means capturing leads and orders from customer conversations instead of copying them into another tool. OrmiTech detects intent, tags leads, routes them to a teammate and keeps order history next to the chat.",
    facts: [
      ["What it does", "Detects buying intent, tags leads, schedules follow-ups and tracks orders from a conversation"],
      ["Who it is for", "Businesses that sell or take enquiries through chat"],
      ["Where it works", "Facebook, Instagram, WhatsApp and website chat"],
      ["Your control", "Your team decides the routing rules and confirms orders"]
    ]
  }
};

// Extra FAQ items for /faq. They are distinct from the questions on the Product and Pricing pages.
export const generalFaq = [
  { question: "What is an AI chatbot for business?", answer: "An AI chatbot for business answers customer questions automatically in a chat, using information about your business. It reads what the customer wrote instead of following a fixed script." },
  { question: "Can an AI chatbot work with WhatsApp?", answer: "Yes. OrmiTech connects WhatsApp to a shared inbox and lets AI answer routine questions there, while your team can take over any conversation." },
  { question: "Can AI automate Facebook messages?", answer: "Yes. OrmiTech answers routine messages sent to your Facebook Page with AI, and routes or hands over the rest to your team." },
  { question: "Can AI automate Instagram DMs?", answer: "Yes. OrmiTech brings Instagram DMs into the same inbox and lets AI reply to routine questions." },
  { question: "What is an omnichannel inbox?", answer: "An omnichannel inbox puts messages from every channel into one shared inbox, with one record per customer." },
  { question: "Can an AI chatbot help generate leads?", answer: "It can capture what an interested customer asks for, tag the conversation as a lead and route it to a teammate. Your team does the follow-up." },
  { question: "What happens when the AI cannot answer?", answer: "The conversation is handed to a person with an AI summary and the full history, so the customer does not have to repeat themselves." },
  { question: "Where can I read the documentation?", answer: "Documentation is available at docs.ormitechit.com." }
];

// Blog articles are linkable from any RelatedLinks list using their /blog/<slug> path.
for (const post of blogPosts) relatedLabels[`/blog/${post.slug}`] = { title: post.title, text: post.excerpt };
