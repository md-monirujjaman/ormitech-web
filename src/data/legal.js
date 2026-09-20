// Content for the public legal pages (/privacy, /terms, /data-deletion).
//
// Anything wrapped in [[double brackets]] is a placeholder that OrmiTech's owner must confirm before launch;
// LegalDocument renders it highlighted so it can't slip into production unnoticed. Nothing here claims a
// certification, a legal framework (GDPR, CCPA and the like), a hosting country, a price or a fixed timeframe
// that has not been confirmed. The security wording describes what ormitech-api actually implements.

export const legalContact = {
  privacy: "[[confirm: privacy contact email]]",
  legal: "[[confirm: legal contact email]]",
  support: "[[confirm: support contact email]]",
  company: "[[confirm: registered company name]]",
  address: "[[confirm: registered business address]]"
};

const lastUpdated = "20 September 2026";

export const privacyDocument = {
  slug: "/privacy",
  eyebrow: "Legal",
  title: "Privacy Policy",
  description:
    "How OrmiTech collects, uses, shares and protects information when businesses use our platform to talk to their customers.",
  updated: lastUpdated,
  intro:
    "This policy explains what OrmiTech does with information. It covers both the businesses that subscribe to OrmiTech and the people who message those businesses through a connected channel.",
  sections: [
    {
      id: "introduction",
      heading: "1. Introduction",
      blocks: [
        {
          p: "OrmiTech is a customer communication platform. Businesses connect their messaging channels to OrmiTech and handle the conversations from those channels in one workspace, with help from an AI agent and their own team."
        },
        {
          p: "This Privacy Policy describes the information we collect, why we collect it, who we share it with and the choices you have. It applies to our website, the OrmiTech dashboard and the services connected to them."
        },
        {
          note: "Two different roles appear throughout this policy. For a business that subscribes to OrmiTech, we decide how their account information is handled. For the end customers who message that business, OrmiTech processes those conversations on the business's behalf, under the business's own privacy policy."
        }
      ]
    },
    {
      id: "about-ormitech",
      heading: "2. About OrmiTech",
      blocks: [
        {
          p: "OrmiTech is operated by [[confirm: registered company name]], and this policy is published by that company. Our registered address is [[confirm: registered business address]]."
        },
        {
          p: "If you have a question about this policy or about how your information is handled, the contact details are in the final section."
        }
      ]
    },
    {
      id: "information-we-collect",
      heading: "3. Information We Collect",
      blocks: [
        { p: "We collect the following categories of information." },
        { sub: "Account information" },
        {
          ul: [
            "Your name and the name of your workspace or business.",
            "Your email address and the role you hold in the workspace (owner, admin or agent).",
            "The status of your account, including whether your email address has been verified."
          ]
        },
        { sub: "Contact information" },
        {
          ul: [
            "Details you send us through our contact form or by email.",
            "Details you add to your workspace profile."
          ]
        },
        { sub: "Business information" },
        {
          ul: [
            "The business name, workspace settings and team members you add.",
            "Your chosen subscription plan and its status."
          ]
        },
        { sub: "Authentication information" },
        {
          ul: [
            "A cryptographic hash of your password. We never store the password itself and cannot read it.",
            "Session records for the devices signed in to your account, so sessions can be refreshed and revoked."
          ]
        },
        { sub: "Connected platform information" },
        {
          ul: [
            "The identifiers of the pages, accounts or phone numbers you connect (for example a Facebook Page or a WhatsApp Business number).",
            "The access tokens issued by those platforms, which are stored encrypted and used only to send and receive messages for you.",
            "The connection status of each channel."
          ]
        },
        { sub: "Customer conversation data processed through the service" },
        {
          ul: [
            "Messages exchanged between a business and its customers on a connected channel, including text, attachments and delivery status.",
            "Customer profile details supplied by the connected platform or entered by the business, such as name, phone number, email address and location.",
            "Records the business creates from those conversations, including leads, orders, tags, notes and assignments."
          ]
        },
        { sub: "Technical and usage information" },
        {
          ul: [
            "Log data such as the request time, the endpoint called, an IP address and a request identifier, used for security and troubleshooting.",
            "An audit trail of significant actions taken inside a workspace, such as assignments and status changes.",
            "Basic device and browser information sent by your browser."
          ]
        },
        { sub: "Billing-related information, where applicable" },
        {
          p: "Where a paid plan applies, we keep the plan, its status and the billing records associated with the workspace. Card and bank details are handled by the payment provider, not stored by OrmiTech. The provider in use is [[confirm: payment provider, if any]]."
        }
      ]
    },
    {
      id: "how-we-use-information",
      heading: "4. How We Use Information",
      blocks: [
        { p: "We use the information described above to:" },
        {
          ul: [
            "Provide the service: deliver, receive, route and display messages across the connected channels.",
            "Authenticate you, keep your session active and protect your account.",
            "Generate AI replies and suggestions inside a conversation when the business has enabled the AI agent.",
            "Create and maintain the records a business keeps about its customers, leads and orders.",
            "Provide analytics and reports about conversation volume, response times and team activity within a workspace.",
            "Support you, respond to your requests and investigate problems.",
            "Maintain security, detect abuse, enforce rate limits and keep an audit trail.",
            "Handle subscriptions and billing where a paid plan applies.",
            "Meet obligations that apply to us."
          ]
        },
        {
          p: "We do not use the content of a business's customer conversations to build advertising profiles."
        },
        {
          note: "Whether OrmiTech uses customer conversation content to train or improve AI models must be confirmed by the business owner and stated here explicitly: [[confirm: AI training policy — whether conversation content is used to improve models, and whether businesses can opt out]]."
        }
      ]
    },
    {
      id: "social-platform-integrations",
      heading: "5. Social Platform Integrations",
      blocks: [
        {
          p: "OrmiTech works only with the channels a business chooses to connect. Connecting a channel authorizes OrmiTech to exchange messages on that channel for that business. A business can disconnect a channel at any time from the dashboard, which stops further message exchange on it."
        },
        { sub: "Facebook Messenger" },
        {
          p: "When a Facebook Page is connected, OrmiTech receives the messages sent to that Page and can reply to them. We receive the sender's platform identifier and the profile details Facebook makes available, and we store the Page access token in encrypted form."
        },
        { sub: "Instagram" },
        {
          p: "When an Instagram professional account is connected, OrmiTech receives direct messages sent to that account and can reply to them, together with the sender's platform identifier and available profile details."
        },
        { sub: "WhatsApp" },
        {
          p: "When a WhatsApp Business number is connected through the WhatsApp Cloud API, OrmiTech receives messages sent to that number and can reply to them, including the sender's phone number and the message content and status."
        },
        { sub: "Website chat" },
        {
          p: "When the OrmiTech chat widget is installed on a business's website, OrmiTech receives the messages a visitor sends, along with the details the visitor provides and basic technical information about the session."
        },
        {
          p: "Use of these platforms is also governed by the platform's own terms and privacy policy, and by the developer policies each platform applies to applications such as OrmiTech."
        }
      ]
    },
    {
      id: "how-we-share-information",
      heading: "6. How We Share Information",
      blocks: [
        { p: "We share information only in these situations:" },
        {
          ul: [
            "Inside your workspace: members of a workspace can see the conversations, customers and records in that workspace, according to their role.",
            "With the messaging platforms: to deliver a reply, we send it to the platform the conversation belongs to.",
            "With service providers that run parts of our infrastructure, such as hosting, storage and, where enabled, the AI provider that generates replies. They may use the information only to provide their service to us.",
            "For legal reasons: when we are required to by law, or to protect the rights, safety and property of OrmiTech, our customers or the public.",
            "In a business transfer: if OrmiTech is involved in a merger, acquisition or sale of assets, information may be transferred as part of it, and this policy would continue to apply until a replacement is published."
          ]
        },
        {
          note: "OrmiTech's position on selling or renting personal information must be stated here by the business owner rather than assumed: [[confirm: whether OrmiTech sells or shares personal information for advertising purposes]]."
        }
      ]
    },
    {
      id: "data-storage-and-security",
      heading: "7. Data Storage and Security",
      blocks: [
        { p: "The measures currently built into the platform include:" },
        {
          ul: [
            "Passwords are stored as argon2id hashes, never in readable form.",
            "Access tokens for connected platforms are encrypted with AES-256-GCM before they are stored.",
            "Sessions use short-lived access tokens with refresh-token rotation, and sessions can be revoked.",
            "Each workspace's data is isolated from every other workspace at the database layer, so one organization cannot read another's records.",
            "Webhook deliveries from messaging platforms are signature-verified before they are accepted.",
            "Security headers, rate limiting and request logging are applied to the API, and significant workspace actions are recorded in an audit trail."
          ]
        },
        {
          p: "No service can promise perfect security. We work to protect information, but we cannot guarantee that it will never be accessed without authorization."
        },
        {
          note: "Hosting location, backup schedule and any independent certification are deployment matters that must be confirmed before they are described publicly: [[confirm: hosting provider and region]], [[confirm: backup and disaster-recovery practice]]. OrmiTech makes no certification or audit claim in this policy."
        }
      ]
    },
    {
      id: "data-retention",
      heading: "8. Data Retention",
      blocks: [
        {
          p: "We keep information for as long as the workspace it belongs to remains active, so that a business keeps its conversation history, customer records and reports."
        },
        {
          p: "When an account or a specific record is deleted, we remove it from the live service. Some information may remain in backups, in logs, or where we are required to keep it, until it expires on its normal schedule."
        },
        {
          note: "Concrete retention periods must be confirmed before being published: [[confirm: retention period for conversation data after account closure]], [[confirm: log and backup retention period]]."
        }
      ]
    },
    {
      id: "your-rights-and-choices",
      heading: "9. User Rights and Choices",
      blocks: [
        { p: "Depending on where you live, you may have rights over your personal information. In practice you can:" },
        {
          ul: [
            "Access and update your account details from your workspace settings.",
            "Correct customer records, leads and notes held in your workspace.",
            "Disconnect any connected channel at any time.",
            "Request a copy of the personal information we hold about you.",
            "Request deletion of your account and its data — see the Data Deletion Instructions.",
            "Ask a question or raise a concern about how your information is handled."
          ]
        },
        {
          p: "If you message a business that uses OrmiTech and want your conversation removed, contact that business first, because the conversation belongs to their workspace. You can also write to us and we will help route the request."
        },
        {
          note: "Which statutory rights apply to you depends on your location and on laws OrmiTech has not confirmed it is subject to. This policy therefore describes what you can actually do, rather than claiming compliance with a specific framework."
        }
      ]
    },
    {
      id: "account-and-data-deletion",
      heading: "10. Account and Data Deletion",
      blocks: [
        {
          p: "You can ask us to delete your OrmiTech account and the personal information associated with it. The full process, what we need from you to verify a request and what happens afterwards are set out on our Data Deletion Instructions page."
        },
        { link: { href: "/data-deletion", label: "Read the Data Deletion Instructions" } }
      ]
    },
    {
      id: "third-party-services",
      heading: "11. Third-Party Services",
      blocks: [
        {
          p: "OrmiTech relies on third parties to operate: the messaging platforms you connect, our hosting and infrastructure providers, and — where a workspace enables the AI agent — an AI provider that generates suggested replies from the conversation context."
        },
        {
          p: "These providers handle information under their own terms and privacy policies. Links from our site or dashboard to other websites are not covered by this policy."
        },
        { note: "The current list of providers must be confirmed and published here: [[confirm: list of third-party sub-processors]]." }
      ]
    },
    {
      id: "cookies",
      heading: "12. Cookies and Similar Technologies",
      blocks: [
        {
          p: "Our website and dashboard use browser storage to keep you signed in and to remember preferences such as your workspace and interface choices. These are necessary for the service to function."
        },
        {
          note: "Any analytics or marketing cookies in use must be listed before they are described here: [[confirm: analytics or marketing cookies in use, if any]]. If such cookies are added later, this section and any required consent notice must be updated with them."
        }
      ]
    },
    {
      id: "childrens-privacy",
      heading: "13. Children's Privacy",
      blocks: [
        {
          p: "OrmiTech is a business tool and is not directed at children. We do not knowingly create accounts for children. If you believe a child has provided us with personal information, contact us and we will remove it."
        },
        { note: "The minimum age for an account follows the law of the jurisdiction confirmed in the Terms of Service: [[confirm: minimum age for account holders]]." }
      ]
    },
    {
      id: "international-transfers",
      heading: "14. International Data Transfers",
      blocks: [
        {
          p: "The messaging platforms and infrastructure providers OrmiTech works with operate internationally, so information may be processed in a country other than your own."
        },
        {
          note: "Where OrmiTech itself stores data, and any safeguards applied to transfers, must be confirmed before they are described: [[confirm: countries where data is stored and any transfer safeguards]]."
        }
      ]
    },
    {
      id: "policy-updates",
      heading: "15. Policy Updates",
      blocks: [
        {
          p: "We may update this policy as the service changes. When we do, we update the date at the top of this page. If a change materially affects how we handle your information, we will give notice through the service or by email before it takes effect."
        }
      ]
    },
    {
      id: "contact",
      heading: "16. Contact Information",
      blocks: [
        { p: "For questions about this policy or about your information:" },
        {
          ul: [
            "Privacy enquiries: [[confirm: privacy contact email]]",
            "General support: [[confirm: support contact email]]",
            "Postal address: [[confirm: registered business address]]"
          ]
        },
        { link: { href: "/contact", label: "Use the contact form" } }
      ]
    }
  ]
};

export const termsDocument = {
  slug: "/terms",
  eyebrow: "Legal",
  title: "Terms of Service",
  description: "The terms that govern the use of OrmiTech's website, dashboard and connected messaging services.",
  updated: lastUpdated,
  intro:
    "These terms are an agreement between you and OrmiTech. Please read them before using the service. Words such as \"we\" and \"us\" mean OrmiTech; \"you\" means the business or person using it.",
  sections: [
    {
      id: "acceptance",
      heading: "1. Acceptance of Terms",
      blocks: [
        {
          p: "By creating an OrmiTech account, connecting a channel or otherwise using the service, you agree to these terms and to our Privacy Policy. If you are agreeing on behalf of a company, you confirm that you are authorized to bind that company."
        },
        { p: "If you do not agree with these terms, do not use the service." }
      ]
    },
    {
      id: "description",
      heading: "2. Description of OrmiTech Services",
      blocks: [
        {
          p: "OrmiTech brings customer conversations from connected channels — including Facebook Messenger, Instagram, WhatsApp and website chat — into a single workspace, with an AI agent that can reply automatically, handover to a human team, and tools for customers, leads, orders, analytics and team management."
        },
        {
          p: "We may add, change or remove features as the product develops. We will not make a change that removes a material part of a paid plan without notice."
        }
      ]
    },
    {
      id: "account-registration",
      heading: "3. Account Registration",
      blocks: [
        {
          ul: [
            "You must give accurate registration details and keep them up to date.",
            "You are responsible for your credentials and for everything done through your account.",
            "You must tell us promptly if you believe your account has been used without your permission.",
            "One person or business may not use another's account without authorization."
          ]
        },
        { p: "Accounts are created for business use. The minimum age to hold an account is [[confirm: minimum age for account holders]]." }
      ]
    },
    {
      id: "user-responsibilities",
      heading: "4. User Responsibilities",
      blocks: [
        { p: "When you use OrmiTech to talk to your own customers, you are responsible for:" },
        {
          ul: [
            "Having a lawful basis and any consent required to message the people you contact.",
            "Publishing your own privacy notice and honouring the requests your customers make to you.",
            "The content your team and your AI agent send from your workspace.",
            "The accuracy of the customer records you store in OrmiTech.",
            "Managing who on your team has access, and removing members who should no longer have it."
          ]
        }
      ]
    },
    {
      id: "connections",
      heading: "5. Business and Social Media Account Connections",
      blocks: [
        {
          p: "To use a channel, you connect an account you control — a Facebook Page, an Instagram professional account, a WhatsApp Business number or your own website. You confirm that you are authorized to connect it and to send messages from it."
        },
        {
          p: "Your use of each channel remains subject to that platform's terms and policies. A platform may change, restrict or withdraw access to its messaging APIs, and if it does, the affected OrmiTech features may stop working. Connecting a channel authorizes OrmiTech to exchange messages on it for you until you disconnect it."
        }
      ]
    },
    {
      id: "acceptable-use",
      heading: "6. Acceptable Use",
      blocks: [
        { p: "Use OrmiTech for genuine communication with your own customers, in line with these terms, the policies of the connected platforms and the law that applies to you." }
      ]
    },
    {
      id: "prohibited-activities",
      heading: "7. Prohibited Activities",
      blocks: [
        { p: "You may not:" },
        {
          ul: [
            "Send spam, bulk unsolicited messages or anything the connected platform prohibits.",
            "Send unlawful, deceptive, harassing, hateful or infringing content.",
            "Impersonate another person or business, or misrepresent your identity.",
            "Attempt to access another workspace's data, or to bypass authentication, rate limits or any other protection.",
            "Probe, scan or overload our infrastructure, or interfere with other customers' use of it.",
            "Reverse engineer, copy or resell the service except where the law does not allow us to restrict this.",
            "Use the service to build a competing product, or to collect personal information for a purpose people did not expect."
          ]
        },
        { p: "Breaking these rules may lead to suspension or termination under section 14." }
      ]
    },
    {
      id: "subscriptions",
      heading: "8. Subscription Plans and Billing",
      blocks: [
        {
          p: "Paid plans are billed in advance for the period you choose, and give access to the features listed for that plan when you subscribe."
        },
        {
          note: "Prices, billing periods, taxes, renewal behaviour, cancellation and refund terms must be confirmed and published before any paid plan is sold: [[confirm: plan prices and billing periods]], [[confirm: renewal and cancellation terms]], [[confirm: refund policy]]. Nothing in these terms should be read as an offer at a particular price."
        }
      ]
    },
    {
      id: "free-trials",
      heading: "9. Free Trials",
      blocks: [
        {
          note: "Whether OrmiTech offers a free trial or free plan, its length and what happens at the end of it must be confirmed before being published: [[confirm: free trial or free plan terms, if offered]]."
        }
      ]
    },
    {
      id: "availability",
      heading: "10. Service Availability",
      blocks: [
        {
          p: "We work to keep OrmiTech available, but the service may be interrupted by maintenance, by a fault, or by a problem at a platform or provider we depend on. We may perform maintenance that makes the service briefly unavailable."
        },
        {
          note: "OrmiTech does not currently publish an uptime commitment. Any service level agreement must be confirmed before it is offered: [[confirm: uptime or support commitment, if any]]."
        }
      ]
    },
    {
      id: "third-party-platforms",
      heading: "11. Third-Party Platforms",
      blocks: [
        {
          p: "OrmiTech depends on services we do not control, including the messaging platforms you connect, our hosting providers and, where enabled, an AI provider. We are not responsible for their acts, outages or policy changes, and their terms apply to your use of them."
        }
      ]
    },
    {
      id: "user-content",
      heading: "12. User Content and Customer Data",
      blocks: [
        {
          p: "You keep ownership of the content you and your customers put into OrmiTech: messages, customer records, leads, orders, notes and files. We do not claim ownership of it."
        },
        {
          p: "You grant us the permission we need to host, process, transmit and display that content in order to provide the service to you — for example, to deliver a reply to the right platform, to show a conversation to your team, or to generate an AI reply where you have enabled it."
        },
        { p: "You can export or delete your data as described in the Privacy Policy and the Data Deletion Instructions." }
      ]
    },
    {
      id: "intellectual-property",
      heading: "13. Intellectual Property",
      blocks: [
        {
          p: "OrmiTech and everything we provide as part of it — the software, interface, documentation, name and logo — remain ours or our licensors'. These terms grant you a limited, non-exclusive, non-transferable right to use the service while your account is in good standing, and nothing more."
        }
      ]
    },
    {
      id: "suspension-and-termination",
      heading: "14. Suspension and Termination",
      blocks: [
        {
          p: "You can stop using OrmiTech at any time and ask us to close your account. We may suspend or terminate an account that breaches these terms, that puts the service or other customers at risk, or where we are required to by law or by a connected platform."
        },
        {
          p: "Where it is reasonable to do so, we will give notice and a chance to put the problem right first. After termination, your access ends and your data is handled as described in the Privacy Policy and the Data Deletion Instructions."
        }
      ]
    },
    {
      id: "disclaimers",
      heading: "15. Disclaimers",
      blocks: [
        {
          p: "The service is provided \"as is\" and \"as available\". To the extent the law allows, we do not give warranties that it will be uninterrupted, error-free or fit for a particular purpose."
        },
        {
          p: "AI-generated replies can be wrong or inappropriate for a situation. You are responsible for the messages your workspace sends, including automated ones, and for supervising the AI agent you enable."
        }
      ]
    },
    {
      id: "limitation-of-liability",
      heading: "16. Limitation of Liability",
      blocks: [
        {
          p: "To the extent the law allows, OrmiTech is not liable for indirect, incidental, special or consequential loss, or for lost profits, revenue, goodwill or data arising from your use of the service."
        },
        {
          note: "The liability cap and any excluded categories must be settled with a qualified lawyer for the chosen jurisdiction before launch: [[confirm: liability cap and exclusions, reviewed by a lawyer]]."
        }
      ]
    },
    {
      id: "indemnification",
      heading: "17. Indemnification",
      blocks: [
        {
          p: "You agree to defend and hold OrmiTech harmless against claims arising from your use of the service, the messages your workspace sends, the data you upload or your breach of these terms, to the extent the law allows."
        }
      ]
    },
    {
      id: "changes",
      heading: "18. Changes to These Terms",
      blocks: [
        {
          p: "We may update these terms as the service changes. We update the date at the top of this page, and for material changes we give notice through the service or by email before they take effect. Continuing to use OrmiTech after a change means you accept the updated terms."
        }
      ]
    },
    {
      id: "governing-law",
      heading: "19. Governing Law",
      blocks: [
        {
          note: "Governing law, jurisdiction and dispute resolution have not been confirmed and are deliberately not stated here: [[confirm: governing law and jurisdiction]], [[confirm: dispute resolution process]]. These must be set by the business owner with legal advice before these terms are relied upon."
        }
      ]
    },
    {
      id: "contact",
      heading: "20. Contact Information",
      blocks: [
        { p: "Questions about these terms:" },
        {
          ul: [
            "Legal enquiries: [[confirm: legal contact email]]",
            "General support: [[confirm: support contact email]]",
            "Registered company: [[confirm: registered company name]], [[confirm: registered business address]]"
          ]
        },
        { link: { href: "/contact", label: "Use the contact form" } }
      ]
    }
  ]
};

export const dataDeletionDocument = {
  slug: "/data-deletion",
  eyebrow: "Legal",
  title: "Data Deletion Instructions",
  description: "How to request deletion of the personal information OrmiTech holds about you, and what happens next.",
  updated: lastUpdated,
  intro:
    "This page explains how to ask OrmiTech to delete your personal information, whether you hold an OrmiTech account or messaged a business that uses OrmiTech.",
  sections: [
    {
      id: "what-deletion-means",
      heading: "1. What data deletion means",
      blocks: [
        {
          p: "A deletion request asks us to remove the personal information associated with you from the live OrmiTech service. Depending on who you are, that can include:"
        },
        {
          ul: [
            "Your account details, workspace profile and sign-in sessions.",
            "The connection between OrmiTech and any channel you linked, including the stored access tokens for it.",
            "Conversations, customer records, leads, orders, notes and tags held in your workspace.",
            "Messages you sent to a business through a channel that business connected to OrmiTech."
          ]
        },
        {
          p: "Deletion is permanent. Once your data is removed we cannot restore it, so export anything you want to keep before you ask us to proceed."
        }
      ]
    },
    {
      id: "who-can-request",
      heading: "2. Who can request deletion",
      blocks: [
        { sub: "Business account holders" },
        {
          p: "If you hold an OrmiTech account, you can request deletion of your own account. A workspace owner can also request deletion of the whole workspace and the records inside it."
        },
        { sub: "People who messaged a business through OrmiTech" },
        {
          p: "If you messaged a business on Facebook, Instagram, WhatsApp or a website chat powered by OrmiTech, that conversation belongs to the business's workspace. Contact that business first, since they decide what happens to their customer records. You can also write to us and we will pass the request on and help carry it out."
        }
      ]
    },
    {
      id: "how-to-request",
      heading: "3. How to submit a deletion request",
      blocks: [
        { p: "Send us a deletion request by email, or through the contact form on this site:" },
        {
          ol: [
            "Email [[confirm: privacy contact email]] from the email address linked to your OrmiTech account, or from the address you used to contact the business.",
            "Use the subject line \"Data deletion request\".",
            "Include the verification details listed in the next section.",
            "Tell us whether you want your whole account deleted, or only specific data such as one connected channel or one conversation.",
            "Send the request. We will reply to confirm that we received it and to ask for anything still missing."
          ]
        },
        { link: { href: "/contact", label: "Open the contact form" } },
        {
          note: "OrmiTech does not currently offer a one-click deletion button in the dashboard or a public deletion API. Requests are handled by our team through the process above."
        }
      ]
    },
    {
      id: "verification",
      heading: "4. Required information for verification",
      blocks: [
        { p: "So that nobody can delete someone else's data, we need enough information to confirm who you are:" },
        {
          ul: [
            "Your full name.",
            "The email address registered to your OrmiTech account, if you have one.",
            "Your workspace or business name, if you have an account.",
            "For a conversation, the channel it took place on (Facebook, Instagram, WhatsApp or website chat) and the name of the business you messaged.",
            "The phone number or profile name you used on that channel, so we can locate the conversation.",
            "A short description of what you want deleted."
          ]
        },
        {
          p: "We may ask one follow-up question to confirm your identity. We will never ask for your password, and you should never send it to us."
        }
      ]
    },
    {
      id: "what-happens-next",
      heading: "5. What happens after a request is submitted",
      blocks: [
        {
          ol: [
            "We acknowledge your request and confirm what it covers.",
            "We verify your identity using the details you provided.",
            "Where the data belongs to a business's workspace, we notify that business, because they control those records.",
            "We delete the data covered by the request from the live service, and disconnect any connected channels involved.",
            "We confirm to you in writing once it is done, and tell you about anything we had to keep and why."
          ]
        },
        {
          note: "OrmiTech has not yet confirmed a guaranteed completion time for deletion requests: [[confirm: deletion completion timeframe]]. We will tell you the expected timing when we acknowledge your request."
        }
      ]
    },
    {
      id: "retained-data",
      heading: "6. Data that may need to be retained",
      blocks: [
        { p: "Some information may remain after a deletion, in a limited form and for a limited purpose:" },
        {
          ul: [
            "Records we must keep to meet a legal, tax or accounting obligation.",
            "Billing records for a completed transaction.",
            "Security and audit logs needed to investigate abuse or to protect the service.",
            "Copies inside backups, until those backups expire on their normal schedule.",
            "Data held by a connected platform, such as the copy of a conversation kept on Facebook, Instagram or WhatsApp — deleting it there is done through that platform."
          ]
        },
        {
          note: "Backup and log retention periods must be confirmed before they are published here: [[confirm: backup and log retention period]]."
        }
      ]
    },
    {
      id: "contact",
      heading: "7. How to contact OrmiTech",
      blocks: [
        {
          ul: [
            "Deletion and privacy requests: [[confirm: privacy contact email]]",
            "General support: [[confirm: support contact email]]",
            "Postal address: [[confirm: registered business address]]"
          ]
        },
        { p: "For more on what we collect and why, see our Privacy Policy." },
        { link: { href: "/privacy", label: "Read the Privacy Policy" } }
      ]
    }
  ]
};
