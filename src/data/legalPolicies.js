// Public legal copy for the marketing site. Product-specific claims are limited to what this
// repository documents. Confirm the service's current vendors, data lifecycle and legal entity
// with counsel before relying on these pages as a complete contract or privacy notice.
const updated = "14 October 2026";
const section = (id, heading, ...blocks) => ({ id, heading, blocks });
const p = text => ({ p: text });
const list = (...ul) => ({ ul });
const link = (href, label) => ({ link: { href, label } });

export const privacyDocument = {
  slug: "/privacy",
  eyebrow: "Legal · Privacy",
  title: "Privacy Policy",
  description: "How OrmiTech handles account, business and customer information when you use our AI-assisted communication and automation platform.",
  updated,
  updatedISO: "2026-10-14",
  intro: "This policy explains the information flows confirmed in the OrmiTech marketing website code. The separate dashboard, API and production infrastructure are not included in this repository, so product-specific collection and processing described in marketing materials cannot be verified here and must be confirmed by OrmiTech before this policy is relied upon.",
  sections: [
    section("scope", "1. Scope and roles",
      p("OrmiTech provides software for customer communication, AI-assisted replies, lead and order records, and workflow automation. A business using OrmiTech decides what information it collects from its customers and how it uses that information."),
      p("For account, website and service-operation information, OrmiTech handles information for its own purposes. For messages and customer records that a business connects or enters into the platform, OrmiTech generally processes that information to provide the service on the business's instructions. The business is responsible for its own privacy notice, permissions and responses to customer requests. The parties' exact legal roles depend on the applicable law and the processing involved.")
    ),
    section("information", "2. Information we handle",
      { sub: "Information handled by this website" },
      p("The contact form requests a name, email, company, phone and message. Its API validates required fields and logs the selected topic and whether an email address or phone number was supplied, then returns a success response. This repository shows no connection that stores or delivers the message to a monitored inbox. Do not use the form for privacy requests or sensitive information."),
      p("The Google Analytics tag sends page-view information when the marketing site loads. The browser also requests some blog images directly from Cloudinary. Those requests expose ordinary connection data, such as an IP address, to the relevant provider. Hosting and server-log data are controlled outside the code available for this audit."),
      { sub: "Separate product information not verified here" },
      p("Marketing materials describe accounts, business workspaces, connected messaging channels, customer conversations, leads, orders, delivery details, AI prompts and outputs, and workflow activity. The separate app, API, databases and provider configuration are not present in this repository, so OrmiTech must verify whether and how those categories are collected, stored, shared or deleted before treating them as actual data flows.")
    ),
    section("purposes", "3. How we use information",
      p("In this marketing-site code, confirmed purposes are to measure page views through Google Analytics and display editorial content, including remotely hosted images. The contact API validates the submitted fields and records limited submission metadata in its application log, but no delivery or persistence path is shown. Product purposes such as account operation, AI processing, messaging and workflow automation are described in marketing materials but cannot be verified from this checkout; OrmiTech must confirm the live product's actual use before relying on this policy.")
    ),
    section("ai", "4. AI and automated processing",
      p("When a business enables AI features, relevant instructions and conversation context may be processed to generate or suggest replies, identify intent, extract details or trigger configured workflows. The exact information used depends on the feature and the business's configuration."),
      p("AI output can be inaccurate, incomplete or inappropriate. Businesses should review and configure automated responses for their needs, and remain responsible for decisions and messages sent to their customers. The AI provider identities and their prompt, training and retention settings are not identified in this notice. OrmiTech must verify and disclose those details before processing customer information through AI features.")
    ),
    section("integrations", "5. Connected platforms and service providers",
      p("OrmiTech describes integrations for Facebook Messenger, Instagram, WhatsApp Business and website chat. When such a channel is enabled in the product, the information and permissions depend on the channel and the business's connection. The exact Meta identifiers, message fields, permissions and access-token handling are not identified in this notice. OrmiTech must document them from the live integrations before processing channel data."),
      p("Two external providers are visible in this repository: Google Analytics, whose script loads on the marketing site without a consent interface, and Cloudinary, which hosts some blog images that load when a page containing them is viewed. A request for a hosted image or analytics script can disclose ordinary connection information such as an IP address and browser details to that provider."),
      p("This notice does not identify the providers used by the separate dashboard and API for infrastructure, AI, email, payment or support. OrmiTech must confirm and disclose the providers actually used. Meta and other channel providers separately process information under their own privacy terms. Their APIs, permissions and available features can change.")
    ),
    section("sharing", "6. When information is shared",
      p("Information is made available to authorized members of the relevant workspace and to connected platforms or service providers as needed to provide the service. We may also disclose information when required by law, to address security or abuse, or as part of a proposed business transfer, subject to appropriate protections."),
      p("OrmiTech does not operate as the seller of a business customer's products, the customer's courier, or the payment merchant for the customer's sales. Order and delivery information handled through the software remains part of the business's relationship with its customer and providers.")
    ),
    section("analytics-cookies", "7. Cookies, analytics and similar technologies",
      p("Google Analytics 4 is loaded on this marketing website and is configured to send page views. This repository has no cookie-consent interface or Google Consent Mode, so the tag can run before a visitor has made a choice. Google Analytics may set first-party cookies such as _ga and _ga_<container-id> and receives browser and page-view information. The separate dashboard is not covered by this website implementation audit."),
      p("The site owner should review whether consent or another choice mechanism is required for the jurisdictions and visitors served, then implement and disclose the resulting behavior. Browser settings can be used to manage or clear cookies.")
    ),
    section("retention", "8. Retention and deletion",
      p("We keep information for as long as needed to provide the service, maintain an active business workspace, address support or security needs, and meet applicable legal obligations. Retention can differ by information type and by the instructions of the business that controls customer records."),
      p("This project defines no product-data, log or backup retention periods or deletion schedule. The separate product's actual account lifecycle and retention behavior must be confirmed. No fixed deletion timing or backup-expiry period is promised here. A business customer should direct end-customer requests to the business that manages the relevant workspace."),
      link("/data-deletion", "Read the Data Deletion Instructions")
    ),
    section("security", "9. Security",
      p("This notice does not make claims about specific authentication, access-control, encryption, hosting, backup or security-audit measures, or any certification. OrmiTech should describe only measures verified in the live product and its deployment. No monitored security-reporting contact is provided here; one must be published for security reports.")
    ),
    section("transfers", "10. International processing",
      p("OrmiTech's connected platforms and service providers may process information in countries other than where you or your customers are located. The countries, transfer arrangements and safeguards depend on the providers and deployment used. Those details should be confirmed against the current production configuration.")
    ),
    section("rights", "11. Your choices and privacy requests",
      p("Depending on your location and applicable law, you may be entitled to request access to, correction or deletion of personal information, restriction of or objection to processing, portability, or withdrawal of consent. Rights and exceptions vary. Contact the business that controls the workspace for end-customer information; OrmiTech's role and response will depend on applicable law and its instructions or agreement with that business."),
      p("The marketing contact form is not shown by this repository to deliver messages to a monitored inbox, so it is not a verified privacy-request channel. No monitored privacy-request address is provided here. OrmiTech must publish a working privacy contact and request-handling process before directing people to submit access, correction, deletion or other rights requests.")
    ),
    section("children", "12. Children's privacy",
      p("OrmiTech is designed as a business communication service and is not directed to children. Business customers must not use the service to collect information from children in a way that violates applicable requirements. If you believe information about a child has been submitted to an OrmiTech-powered business, contact that business. This website does not provide a monitored OrmiTech contact route for forwarding the concern.")
    ),
    section("marketing", "13. Marketing communications",
      p("This marketing-site project contains no email or promotional messaging system. The separate product's practices for marketing, service and account messages could not be verified here and must be described by OrmiTech if those messages are sent.")
    ),
    section("incidents", "14. Security incidents",
      p("An incident affecting information should be assessed and handled, including notices where required by applicable law or contract. No incident-response procedure or monitored security contact is identified here. OrmiTech must confirm its operational process and contact route.")
    ),
    section("changes", "15. Changes to this policy",
      p("We may revise this policy as the service or our practices change. The updated date appears above. If a change materially affects how information is handled, we will take reasonable steps to provide notice through the service or another appropriate channel.")
    ),
    section("contact", "16. Contact",
      p("A legal entity name, postal address and monitored privacy contact are not provided in this notice. OrmiTech must publish those verified details and a working contact channel before relying on this as its operational privacy notice.")
    )
  ]
};

export const termsDocument = {
  slug: "/terms",
  eyebrow: "Legal · Terms",
  title: "Terms & Conditions",
  description: "The terms for accessing OrmiTech's AI-assisted customer communication, messaging and business automation software.",
  updated,
  updatedISO: "2026-10-14",
  intro: "These Terms & Conditions govern access to the OrmiTech website and software services. If you use OrmiTech for a business, you confirm that you can accept these terms on its behalf.",
  sections: [
    section("acceptance", "1. Acceptance and definitions",
      p("By creating an account, connecting a channel or using the service, you agree to these terms and the Privacy Policy. “OrmiTech,” “we” and “us” mean the provider of the OrmiTech service. “You” means the individual or business using it. “Client” means a business workspace customer. “End user” means a client’s customer who communicates with that client through a connected channel."),
      p("If you do not agree, do not use the service. If you accept for an organization, you represent that you have authority to bind it.")
    ),
    section("service", "2. The OrmiTech service",
      p("OrmiTech is a SaaS software platform for customer communication and business automation. Depending on the features available to your account, it can bring website chat, Facebook Messenger, Instagram and WhatsApp Business conversations into a shared workspace, support AI-assisted or automated replies, and help organize leads, customer information, orders and workflows."),
      p("Features and integrations may vary by plan, account, location and third-party availability. OrmiTech provides the software and automation layer; it is not the client's product seller, marketplace, payment processor, courier, delivery company or fulfillment provider.")
    ),
    section("eligibility", "3. Eligibility and accounts",
      p("You must be able to enter a binding agreement under the laws that apply to you and use the service for business purposes. Provide accurate account information, keep it current and maintain the security of your sign-in details. You are responsible for activity under your account. OrmiTech must provide a monitored security contact in the separate product so clients can report suspected unauthorized access."),
      p("You are responsible for assigning suitable access to your team and removing access when it is no longer needed. Do not share credentials or access a workspace without authorization.")
    ),
    section("client-responsibilities", "4. Client responsibilities",
      p("The client controls its business relationship with its customers and is responsible for its own products and services, pricing, claims, customer communications, orders, payment collection, taxes, fulfillment, shipping, courier relationships and delivery contracts."),
      p("The client is also responsible for the content and instructions it provides, customer consent and notices, its use of customer data, the configuration and review of automations, and compliance with laws and third-party platform rules that apply to its business. OrmiTech does not take on those responsibilities by processing a message or facilitating a workflow.")
    ),
    section("acceptable-use", "5. Acceptable use",
      p("Use OrmiTech only for lawful business purposes and in accordance with these terms and the rules of connected services. You must not use the service to send unlawful or unsolicited messages, deceive or harass people, infringe another party's rights, compromise accounts or systems, bypass security controls, disrupt other users, or access information you are not authorized to use."),
      p("You must not reverse engineer or misuse the service except to the extent a restriction is prohibited by law. We may investigate suspected misuse and take proportionate action to protect users, the service or third parties.")
    ),
    section("ai", "6. AI services and automated output",
      p("AI-generated or automated content may be inaccurate, incomplete, outdated or inappropriate for a particular person or situation. OrmiTech does not guarantee that AI output will be accurate, complete, current or suitable. Review outputs where accuracy matters, give the system appropriate business instructions, and provide a human handoff where needed."),
      p("The client remains responsible for its business decisions, customer commitments and messages sent through its workspace, including messages generated or sent automatically. The client must test and monitor workflows and promptly adjust or disable automation that does not meet its requirements.")
    ),
    section("orders-delivery", "7. Orders, payments and delivery workflows",
      p("OrmiTech may help a client collect order details in a conversation, record those details or automate a workflow involving a payment or delivery provider. Those capabilities are tools for the client's operations. The client remains responsible for the goods or services, order acceptance, prices, payment account, collection of funds, taxes, fulfillment and customer service."),
      p("If the software connects to a courier or delivery provider, it only facilitates the configured information exchange. The client maintains its relationship with that provider and is responsible for delivery arrangements, charges and performance. OrmiTech does not become a payment merchant, courier or fulfillment provider by enabling the workflow.")
    ),
    section("plans", "8. Plans, fees and billing",
      p("The marketing site displays plan descriptions and prices, but no checkout or subscription terms are established here, and some plan details remain subject to confirmation. Those descriptions alone do not create a paid subscription, renewal, cancellation, tax or refund arrangement. If an OrmiTech product offers a purchase flow, it must present the applicable price and subscription terms before purchase. These Terms do not create a refund or auto-renewal policy.")
    ),
    section("third-parties", "9. Third-party services and integrations",
      p("Where the separate product offers third-party integrations, the client is responsible for maintaining the required third-party accounts, permissions and platform compliance. The actual integrations available in production have not been verified in this repository."),
      p("Third parties may change APIs, permissions, policies, limits or features; restrict or suspend accounts; experience outages; or discontinue a service. These events can affect connected OrmiTech features. The third party's terms also apply to the client's use of its service. OrmiTech will make reasonable efforts to address service issues within its control.")
    ),
    section("content-ip", "10. Client content and intellectual property",
      p("As between OrmiTech and the client, the client retains its rights in content and data it or its customers submit to the service. The client gives OrmiTech permission to host, process, transmit and display that content as reasonably needed to provide, secure and support the service, including routing messages and running features the client enables."),
      p("OrmiTech and its licensors retain rights in the software, service, documentation, names and marks. OrmiTech grants the client a limited, non-exclusive, non-transferable right to use the service for its business while access is authorized. If you send feedback, OrmiTech may use it to improve the service without restriction or payment, provided it does not identify you publicly without permission.")
    ),
    section("availability", "11. Availability, maintenance and changes",
      p("OrmiTech works to operate the service but does not promise uninterrupted availability or a specific response time unless a separate written service commitment says otherwise. Maintenance, technical issues, security events and third-party changes may affect availability."),
      p("We may update or change features as the service develops. We will use reasonable efforts to communicate material changes that significantly affect how a client uses the service.")
    ),
    section("security", "12. Security",
      p("The security controls implemented in the separate product are not identified here. OrmiTech must describe only controls verified in that product and its deployment. Clients remain responsible for protecting their credentials and managing workspace access where those controls are available. No method of transmission or storage can be guaranteed completely secure.")
    ),
    section("suspension", "13. Suspension and termination",
      p("This website does not provide an account-closure control. OrmiTech must identify an operational account-closure route for clients in the product. OrmiTech may suspend or restrict access where reasonably necessary to address a breach of these terms, a security or service risk, a legal requirement, or a restriction imposed by a connected platform. Where reasonably practicable, OrmiTech will provide notice and an opportunity to address the issue."),
      p("When service access ends, the client should promptly export any information it needs. Information is handled under the Privacy Policy and any applicable deletion process. Some information may remain for legal, security or operational reasons; no fixed deletion period is promised here.")
    ),
    section("disclaimers", "14. Disclaimers",
      p("To the extent permitted by applicable law, the service is provided on an “as available” basis, without a promise that it will be uninterrupted, error-free or meet every business requirement. Nothing in these terms excludes a warranty or right that cannot lawfully be excluded.")
    ),
    section("liability", "15. Limitation of liability",
      p("A limitation of liability clause has not been finalized in this draft. The governing jurisdiction, contracting entity, liability cap and any exclusions must be determined and reviewed by qualified counsel before these terms are relied on as a contract. Nothing in this draft excludes liability or a right that cannot lawfully be excluded.")
    ),
    section("indemnity", "16. Indemnification",
      p("Any indemnity obligations have not been finalized in this draft. OrmiTech should determine their scope, procedure and any reciprocal protections with qualified counsel for the governing jurisdiction before relying on these terms as a contract.")
    ),
    section("law-disputes", "17. Governing law and disputes",
      p("The governing law, courts and dispute-resolution process have not been confirmed in the materials available for this implementation. OrmiTech should select and have counsel review these terms for the correct contracting entity and jurisdiction before relying on them.")
    ),
    section("changes", "18. Changes to these terms",
      p("We may revise these terms as the service changes. We will update the date above and use reasonable efforts to notify clients of material changes. Continued use after a revised version takes effect may constitute acceptance where permitted by applicable law.")
    ),
    section("severability", "19. General terms",
      p("If a provision is unenforceable, the remaining provisions continue to apply to the extent permitted by law. These terms and any written order governing the service form the agreement about the service, subject to any mandatory rights that apply. A failure to enforce a provision is not a waiver of it. Neither party may transfer these terms except as part of a permitted business transfer or with the other party's consent.")
    ),
    section("contact", "20. Contact",
      p("The legal entity name, registered address, monitored legal contact and governing jurisdiction are not identified in these Terms. OrmiTech should publish verified contract details before relying on these Terms as an agreement.")
    )
  ]
};

export const dataDeletionDocument = {
  slug: "/data-deletion",
  eyebrow: "Legal · Privacy",
  title: "Data Deletion Instructions",
  description: "Current deletion-request options and the privacy workflows that still need to be configured for OrmiTech.",
  updated,
  updatedISO: "2026-10-14",
  intro: "A business controls the customer records in its OrmiTech workspace. This website does not provide account access, an account-deletion method or an operational privacy-request workflow for the OrmiTech product.",
  sections: [
    section("account-deletion", "1. OrmiTech account or workspace",
      p("The contact form is not a verified deletion-request channel: its API validates and acknowledges submissions and logs limited submission metadata, but this repository does not show a monitored delivery path. No account deletion workflow or monitored privacy contact is documented here. OrmiTech must publish a working route for account holders before this page can accept account or workspace deletion requests. Do not send sensitive information through the current contact form.")
    ),
    section("customer-data", "2. Customer information in a business workspace",
      p("If you are a customer who messaged a business using OrmiTech, contact that business first. The business decides how it handles customer conversations and records. This website does not provide a working OrmiTech channel for forwarding your request to that business.")
    ),
    section("verification", "3. Request verification",
      p("To protect information, OrmiTech or the relevant business may ask for enough information to verify your identity and locate the account or conversation. Do not send passwords or authentication codes in a request.")
    ),
    section("processing", "4. What happens next",
      p("The contact endpoint may return a success response even though no delivery path is documented in this repository. OrmiTech cannot confirm receipt, track, complete or report on a request submitted through that form from the evidence available here. A monitored contact route and documented process are needed before this instruction can be relied upon.")
    ),
    section("retention", "5. Information that may remain",
      p("Some information may need to be retained for legal, security or operational reasons, or may remain temporarily in backups or in records held by a connected platform. Deleting information from OrmiTech does not delete copies held by Facebook, Instagram, WhatsApp or another third party; use that provider's own privacy controls for those copies.")
    ),
    section("contact", "6. Contact OrmiTech",
      p("No monitored privacy or deletion contact is provided here. OrmiTech must publish a verified email address or connect the form to a monitored request system before offering an actionable submission method. See the Privacy Policy for more about information handling."),
      link("/privacy", "Read the Privacy Policy")
    )
  ]
};
