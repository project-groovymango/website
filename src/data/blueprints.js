export const BLUEPRINTS = [
  {
    title: "Region & size based lead assignment (round robin)",
    desc: "Control panel in Hubspot using a custom object which allows you to set distribution. Includes pausing",
    platform: ["n8n", "make"],
    tier: "premium",
    category: "Lead assignment",
    tools: ["HubSpot", "Chargebee", "GetAccept"],
    file: null,
  },
  {
    title: "Customer & subscription creation upon quote signature",
    desc: "Will create a customer in Chargebee platform upon quote signature",
    platform: ["make"],
    tier: "free",
    category: "Quote-to-cash",
    tools: ["HubSpot", "Chargebee"],
    file: null,
  },
  {
    title: "Update Chargebee subscription upon upgrade or downgrade",
    desc: "Updates existing subscription if the Q2C process is fully standardised",
    platform: ["make"],
    tier: "premium",
    category: "Quote-to-cash",
    tools: ["HubSpot", "Chargebee"],
    file: null,
  },
  {
    title: "React to a Slack message to create a ticket in ClickUp",
    desc: "This includes a two way sync of comments and status updates",
    platform: ["n8n", "make"],
    tier: "free",
    category: "Quality of life",
    tools: ["Slack", "ClickUp"],
    file: null,
  },
  {
    title: "Multistep GetAccept quote approval process in Slack",
    desc: "Have your sales manager or legal team approve quotes right in Slack",
    platform: ["n8n", "make"],
    tier: "premium",
    category: "Quality of life",
    tools: ["Slack", "GetAccept"],
    file: null,
  },
];

export const PLATFORMS = ["n8n", "make"];
export const TIERS = ["free", "premium"];
export const CATEGORIES = [...new Set(BLUEPRINTS.map(b => b.category))];
export const ALL_TOOLS = [...new Set(BLUEPRINTS.flatMap(b => b.tools))].sort();
