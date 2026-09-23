// Breadcrumb trails for the Product and Feature pages. Feature pages have no parent page, so their trail is Home > page.
const home = { name: "Home", path: "/" };
const product = { name: "Product", path: "/product" };

export const crumbsByPath = {
  "/product/ai-customer-support": [home, product, { name: "AI Customer Support", path: "/product/ai-customer-support" }],
  "/product/omnichannel-inbox": [home, product, { name: "Omnichannel Inbox", path: "/product/omnichannel-inbox" }],
  "/product/lead-order-management": [home, product, { name: "Lead & Order Management", path: "/product/lead-order-management" }],
  "/features/ai-chatbot": [home, { name: "AI Chatbot", path: "/features/ai-chatbot" }],
  "/features/human-handover": [home, { name: "Human Handover", path: "/features/human-handover" }],
  "/features/automation": [home, { name: "Automation", path: "/features/automation" }],
  "/features/team-collaboration": [home, { name: "Team Collaboration", path: "/features/team-collaboration" }],
  "/features/analytics": [home, { name: "Analytics", path: "/features/analytics" }]
};
