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
    "slug": "what-is-omnichannel-inbox",
    "title": "What Is an Omnichannel Inbox? Meaning, Benefits, and How It Works",
    "seoTitle": "What Is an Omnichannel Inbox? Meaning & Benefits",
    "metaDescription": "An omnichannel inbox brings WhatsApp, Messenger, Instagram, and live chat into one dashboard. Learn what it means, how it works, and if your team needs one.",
    "excerpt": "Juggling customer messages across Facebook, Instagram, WhatsApp, and live chat? Here's what an omnichannel inbox actually means, how it works behind the scenes, and how to tell if your team is ready for one.",
    "date": "2026-09-25",
    "category": "Customer Communication",
    "image": {
      "src": "https://res.cloudinary.com/pnlsyo5i/image/upload/v1790315286/ChatGPT_Image_Sep_25_2026_11_21_36_AM.png",
      "alt": "Small team reviewing an OrmiTech unified inbox with Messenger, Instagram, WhatsApp and email conversations in one dashboard",
      "caption": "An omnichannel inbox brings every customer channel into a single dashboard.",
      "width": 1536,
      "height": 1024
    },
    "answer": "An omnichannel inbox is a single dashboard that pulls in messages from every channel a business uses — Facebook Messenger, Instagram DMs, WhatsApp, live chat, and email — so a team can read and reply to all of them from one place, with one shared view of each customer's history. The omnichannel inbox meaning goes beyond simply \"seeing everything together\": it also means every reply, no matter which app it came from, is tracked, assigned, and searchable in one system.",
    "intro": [
      "If your team currently keeps four browser tabs open just to answer customers, this is the concept that fixes that."
    ],
    "sections": [
      {
        "heading": "Why an Omnichannel Inbox Exists in the First Place",
        "blocks": [
          {
            "p": "Most small and midsize businesses didn't choose to be scattered across five apps. It happened gradually — a Facebook Page for the business, an Instagram account because customers asked for one, WhatsApp because it's how people in many markets prefer to message, and a live chat widget on the website because visitors expect instant answers."
          },
          {
            "p": "Each channel on its own is manageable. All of them together, without a shared inbox, creates the same problem every growing business runs into: messages get missed, two teammates accidentally reply to the same customer, and nobody can say for certain what was already promised to a client without digging through five different login screens."
          },
          {
            "p": "An omnichannel inbox exists to remove that friction. Instead of managing five separate inboxes, a team manages one."
          }
        ]
      },
      {
        "heading": "Omnichannel Inbox vs. Multichannel: What's the Difference?",
        "blocks": [
          {
            "p": "This distinction trips people up, so it's worth answering directly."
          },
          {
            "p": "**Multichannel** means a business is present on several channels — Facebook, Instagram, WhatsApp, email — but each one is managed separately, often by different people, with no shared record between them."
          },
          {
            "p": "**Omnichannel** means those same channels are connected into one system, so a conversation that starts on Instagram and continues on WhatsApp still reads as one continuous history, and any team member can pick it up with full context."
          },
          {
            "image": {
              "src": "https://res.cloudinary.com/pnlsyo5i/image/upload/v1790315284/ChatGPT_Image_Sep_25_2026_11_23_21_AM.png",
              "alt": "Diagram comparing disconnected multichannel apps with a connected omnichannel inbox",
              "caption": "Multichannel means presence on many apps. Omnichannel means those apps are connected.",
              "width": 1536,
              "height": 1024
            }
          },
          {
            "table": {
              "caption": "Comparison table: multichannel vs. omnichannel",
              "headers": [
                "",
                "Multichannel",
                "Omnichannel"
              ],
              "rows": [
                [
                  "Channels used",
                  "Several, independently",
                  "Several, connected"
                ],
                [
                  "Customer history",
                  "Scattered across apps",
                  "Unified per customer"
                ],
                [
                  "Team visibility",
                  "Limited to whoever owns that app",
                  "Shared across the team"
                ],
                [
                  "Risk of duplicate replies",
                  "High",
                  "Low"
                ],
                [
                  "Reporting",
                  "Per-channel only",
                  "Combined, cross-channel"
                ]
              ]
            }
          },
          {
            "p": "In short: multichannel is about presence. Omnichannel is about connection. An [all-in-one social media inbox](/product/omnichannel-inbox) is what makes that connection possible in practice. For a shorter side-by-side, see [how omnichannel differs from multichannel](/blog/omnichannel-vs-multichannel)."
          }
        ]
      },
      {
        "heading": "How an Omnichannel Inbox Actually Works",
        "blocks": [
          {
            "p": "Mechanically, an omnichannel unified inbox works through three layers:"
          },
          {
            "image": {
              "src": "https://res.cloudinary.com/pnlsyo5i/image/upload/v1790315394/ggggg.png",
              "alt": "Diagram of how an omnichannel inbox combines Instagram, WhatsApp and live chat messages into one customer conversation",
              "caption": "Behind the scenes, an omnichannel inbox works in three layers: connect, unify, and route.",
              "width": 1312,
              "height": 1199
            }
          },
          {
            "h3": "1. Channel Connections"
          },
          {
            "p": "The tool connects to each platform's official API — Meta's API for [Facebook Messenger](https://developers.facebook.com/documentation/business-messaging/messenger-platform) and [Instagram](https://developers.facebook.com/documentation/instagram-platform), the [WhatsApp Business API](https://developers.facebook.com/documentation/business-messaging/whatsapp/overview), plus email and website chat — so messages flow in without anyone needing to log into each app separately. If WhatsApp is your busiest channel, here is how to [connect WhatsApp Business to a shared inbox](/solutions/whatsapp-ai-chatbot) with OrmiTech."
          },
          {
            "h3": "2. A Unified Conversation View"
          },
          {
            "p": "Every message, regardless of source, lands in one queue. Most shared inbox software tags each conversation with its origin channel, so a team can still filter by platform when needed, while still seeing everything in one social media inbox management tool."
          },
          {
            "h3": "3. Assignment and Routing"
          },
          {
            "p": "Conversations get [assigned to a specific team member](/features/team-collaboration) or team, based on rules like channel, keyword, or working hours. This is the part that turns a pile of messages into an actual workflow, and it's the core of most shared inbox management strategies."
          },
          {
            "p": "Many modern platforms — OrmiTech included — add a fourth layer: an [AI chatbot](/features/ai-chatbot) that can answer common questions automatically inside that same unified inbox, escalating to a human only when needed."
          }
        ]
      },
      {
        "heading": "Who Actually Needs a Unified Inbox for Social Media",
        "blocks": [
          {
            "p": "Not every business needs this on day one. A unified inbox for social media makes the most sense when a business hits one or more of these signals:"
          },
          {
            "ul": [
              "More than one person replies to customer messages",
              "Customers reach out across two or more channels regularly (for example, WhatsApp and Instagram)",
              "Messages are getting missed or answered late",
              "There's no way to see a customer's full conversation history in one place",
              "The business is scaling outreach or ad spend and expects message volume to grow"
            ]
          },
          {
            "image": {
              "src": "https://res.cloudinary.com/pnlsyo5i/image/upload/v1790315280/ChatGPT_Image_Sep_25_2026_11_25_12_AM.png",
              "alt": "Team of three reviewing customer messages together in a shared omnichannel inbox",
              "caption": "Once messages start coming from more than one channel, a shared inbox becomes a team necessity, not a luxury.",
              "width": 1536,
              "height": 1024
            }
          },
          {
            "p": "A solo shop answering a dozen messages a day on one platform probably doesn't need this yet. A business fielding hundreds of messages a week across WhatsApp, Instagram, and the website almost certainly does."
          }
        ]
      },
      {
        "heading": "Key Benefits of an Omnichannel Shared Inbox",
        "blocks": [
          {
            "image": {
              "src": "https://res.cloudinary.com/pnlsyo5i/image/upload/v1790315400/hhhh.png",
              "alt": "Six key benefits of an omnichannel inbox: faster response times, no duplicate replies, full customer history, better team coordination, unified reporting and easier onboarding",
              "caption": "The practical payoff of an omnichannel inbox, at a glance.",
              "width": 1254,
              "height": 1254
            }
          },
          {
            "p": "**Faster response times.** Nothing sits unseen in a separate app. Every message is visible the moment it arrives."
          },
          {
            "p": "**Fewer duplicate or conflicting replies.** Since the whole team sees the same conversation, two people don't accidentally answer the same question differently."
          },
          {
            "p": "**Better customer experience.** A customer who messages on Instagram and later switches to WhatsApp doesn't have to repeat themselves — the history follows them."
          },
          {
            "p": "**Cleaner reporting.** Combined data across channels shows which platform actually drives conversations and sales, instead of guessing from five separate dashboards."
          },
          {
            "p": "**Easier onboarding.** New team members learn one system instead of five, which matters more than it sounds like once a support team grows past two people."
          }
        ]
      },
      {
        "heading": "Limitations and Things to Consider",
        "blocks": [
          {
            "p": "An omnichannel inbox isn't automatically the right fit for everyone, and it's worth being clear-eyed about the trade-offs:"
          },
          {
            "ul": [
              "**Setup takes real time.** Connecting official APIs (especially WhatsApp Business API) usually involves a verification step that isn't instant.",
              "**Cost.** Most shared inbox software is priced per seat or per conversation volume, so it needs to be weighed against current message volume. You can [compare OrmiTech plans](/pricing) to see how that works here.",
              "**Not every channel integrates equally well.** Some platforms offer richer APIs than others, which can limit certain features on specific channels."
            ]
          },
          {
            "p": "None of these are reasons to avoid an omnichannel inbox — they're just part of realistic omnichannel setup planning."
          }
        ]
      },
      {
        "heading": "Shared Inbox Best Practices Once You Have One",
        "blocks": [
          {
            "p": "Getting the tool is step one. A few shared inbox best practices make the difference between a tidy system and a new kind of mess:"
          },
          {
            "ol": [
              "Set clear assignment rules from day one (by channel, keyword, or team).",
              "Agree on response-time targets (an SLA) so messages don't sit unanswered.",
              "Use tags or labels consistently so reporting stays useful.",
              "Review unanswered or overdue conversations daily, not weekly.",
              "Let an [AI chatbot for customer support](/product/ai-customer-support) handle repetitive questions so the team focuses on the messages that need a human."
            ]
          }
        ]
      }
    ],
    "faqHeading": "Frequently Asked Questions",
    "faq": [
      {
        "question": "What does \"omnichannel inbox\" actually mean?",
        "answer": "It means every customer message — from Facebook, Instagram, WhatsApp, live chat, or email — arrives in one shared dashboard instead of separate apps, with each customer's full history kept together."
      },
      {
        "question": "What is the difference between omnichannel and multichannel?",
        "answer": "Multichannel means being present on several platforms that are managed separately. Omnichannel means those platforms are connected, so conversations and customer history carry over between them."
      },
      {
        "question": "Do small businesses need an omnichannel inbox, or is it just for large teams?",
        "answer": "Team size matters less than message volume and channel spread. A small team fielding messages across two or more channels regularly benefits just as much as a larger one — often more, since they have fewer people to catch what falls through the cracks."
      },
      {
        "question": "Is an omnichannel inbox the same as a shared inbox?",
        "answer": "They're closely related. A shared inbox lets a team share one inbox for a single channel (like one email address). An omnichannel inbox extends that idea across multiple channels at once."
      },
      {
        "question": "How long does it take to set up an omnichannel inbox?",
        "answer": "Connecting email or Facebook/Instagram is usually quick. WhatsApp Business API access typically takes longer because of Meta's verification process, so it's worth starting that step early in an omnichannel setup."
      }
    ],
    "closing": [
      {
        "heading": "Conclusion",
        "blocks": [
          {
            "p": "The omnichannel inbox meaning is simple once it's broken down: one dashboard, every channel, one shared history per customer. The bigger question isn't what it means — it's whether a growing team can still keep up without one. For a business already juggling Facebook, Instagram, WhatsApp, and live chat separately, an [omnichannel unified inbox](/product/omnichannel-inbox) usually isn't a luxury upgrade; it's the fix for a problem that's already slowing the team down."
          }
        ]
      }
    ],
    "cta": {
      "text": "OrmiTech brings WhatsApp, Messenger, Instagram, and website chat into exactly this kind of single dashboard, with an AI chatbot layered in to handle repetitive questions automatically. See how it looks with a free OrmiTech trial to get a feel for it with your own channels connected.",
      "label": "Get started with OrmiTech",
      "href": "/contact",
      "secondaryLabel": "Compare plans",
      "secondaryHref": "/pricing"
    },
    "related": [
      "/product/omnichannel-inbox",
      "/features/team-collaboration",
      "/blog/omnichannel-vs-multichannel"
    ]
  },
  {
    slug: "why-unified-inbox-matters",
    title: "Why a unified customer inbox matters",
    excerpt: "What happens when every customer channel becomes one operational workspace.",
    date: "2026-09-12",
    category: "Product",
    image: { src: "https://res.cloudinary.com/pnlsyo5i/image/upload/v1790315400/hhhh.png", alt: "Six key benefits of an omnichannel inbox: faster response times, no duplicate replies, full customer history, better team coordination, unified reporting and easier onboarding", caption: "The practical payoff of a unified inbox, at a glance.", width: 1254, height: 1254 },
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
    image: { src: "https://res.cloudinary.com/pnlsyo5i/image/upload/v1790315280/ChatGPT_Image_Sep_25_2026_11_25_12_AM.png", alt: "Team of three reviewing customer messages together in a shared omnichannel inbox", caption: "Automation handles the routine, and the team steps in with full context.", width: 1536, height: 1024 },
    answer: "Good AI customer support answers routine questions on its own and hands the conversation to a person when the topic is sensitive, complex or high value, with the full history attached.",
    sections: [
      { heading: "Why AI-only support fails", paragraphs: ["Automation is good at repetition: delivery times, opening hours, stock questions. It is a poor fit for complaints, custom quotes or anything where the customer needs to feel heard.", "When an automated reply tries to handle those, customers get stuck in a loop and the business loses the very conversations that matter most."] },
      { heading: "Signals that a person should step in", list: ["The customer is upset or reporting a problem with an order", "The request is a custom quote or a bulk purchase", "The question falls outside the information the AI has been given", "The customer asks for a person"] },
      { heading: "What a good handover looks like", paragraphs: ["The person who takes over should not have to ask the customer to repeat themselves. That means a short summary of what was asked, the earlier messages, and any tags or order details already attached to the contact.", "OrmiTech treats human takeover as part of the workflow rather than an exception, so the handover keeps context intact."] },
      { heading: "Keep control of the rules", paragraphs: ["Decide in advance which topics AI may answer and which always go to a teammate. Review those rules as you see real conversations."] }
    ],
    related: ["/features/human-handover", "/product/ai-customer-support"]
  },
  {
    slug: "omnichannel-customer-support",
    title: "Designing an omnichannel support workflow",
    excerpt: "A practical framework for connecting social, messaging and website conversations.",
    date: "2026-09-07",
    category: "Guide",
    image: { src: "https://res.cloudinary.com/pnlsyo5i/image/upload/v1790315394/ggggg.png", alt: "Diagram of how an omnichannel inbox combines Instagram, WhatsApp and live chat messages into one customer conversation", caption: "Different channels, one customer, one conversation.", width: 1312, height: 1199 },
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
    slug: "omnichannel-vs-multichannel",
    title: "Omnichannel vs multichannel: key differences",
    excerpt: "Both use several channels. Only one connects them into a single customer experience.",
    date: "2026-09-23",
    category: "Guide",
    image: { src: "https://res.cloudinary.com/pnlsyo5i/image/upload/v1790315284/ChatGPT_Image_Sep_25_2026_11_23_21_AM.png", alt: "Diagram comparing disconnected multichannel apps with a connected omnichannel inbox", caption: "Multichannel means presence on many apps. Omnichannel means those apps are connected.", width: 1536, height: 1024 },
    answer: "Multichannel means a business is present on several channels that run separately. Omnichannel means those channels are connected, so a customer's history and context follow them from one channel to another.",
    sections: [
      { heading: "Multichannel in practice", paragraphs: ["A business with a Facebook Page, an Instagram account and a WhatsApp number is multichannel. Each channel may be managed by a different person, and a message on one channel is invisible on the others."] },
      { heading: "Omnichannel in practice", paragraphs: ["In an omnichannel setup the same channels feed one inbox and one customer record. If a customer asks about an order on Instagram and follows up on WhatsApp, your team sees both in one thread of history."] },
      { heading: "Side by side", list: ["Multichannel: separate inboxes; omnichannel: one shared inbox", "Multichannel: history split by channel; omnichannel: one customer record", "Multichannel: replies depend on who is watching which app; omnichannel: conversations have owners"] },
      { heading: "Which one do you need?", paragraphs: ["If customers write to you on more than one channel and the same people reply on all of them, moving to omnichannel usually removes duplicated work. An omnichannel inbox is the practical starting point."] }
    ],
    related: ["/product/omnichannel-inbox", "/features/team-collaboration", "/blog/why-unified-inbox-matters"]
  },
];
