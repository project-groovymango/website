import {
  StripeSvg, NotionSvg, HubSpotSvg, LinearSvg,
  VercelSvg, FigmaSvg, SalesforceSvg, IntercomSvg
} from "../components/Logos";

export const CAL_LINK = "amin-laanaya-b5k6ne/30min";

export const LOGOS = [
  {
    Svg: StripeSvg, dot: true, delay: false,
    cs: {
      body: "Built a region-based lead routing system connected to their Stripe billing and calendar. Eliminated manual handoffs entirely and saved the ops team 6 hours every week.",
      person: { name: "Sarah Chen", role: "Head of Operations", emoji: "\u{1F469}", photo: null }
    }
  },
  { Svg: NotionSvg, dot: false },
  { Svg: HubSpotSvg, dot: false },
  { Svg: LinearSvg, dot: false },
  { Svg: VercelSvg, dot: false },
  { Svg: FigmaSvg, dot: false },
  {
    Svg: SalesforceSvg, dot: true, delay: true,
    cs: {
      body: "Connected Salesforce CRM, invoicing, and approval flows into a single automated pipeline. Reduced average deal-close time from 11 days down to 3.",
      person: { name: "Marcus Webb", role: "VP of Sales", emoji: "\u{1F468}", photo: null }
    }
  },
  { Svg: IntercomSvg, dot: false },
];

export const CASE_STUDIES = [
  { title: "Round Robin", Logo: StripeSvg, desc: "Implemented region-based lead routing connected to their calendar. Saved ops 6 hours/week and eliminated manual handoff errors entirely.", visible: true },
  { title: "Quote-to-Cash", Logo: FigmaSvg, desc: "Connected CRM, invoicing, and approval flows into a single automated pipeline. Reduced average deal-close time from 11 days to 3.", visible: true },
  { title: "Platform Move", Logo: VercelSvg, desc: "Migrated 4 years of project history, client records, and billing data to a new platform over a single weekend. Zero data loss, zero downtime.", visible: true },
  { title: "Support Agent", Logo: LinearSvg, desc: "Built a custom AI agent that handles first-line support, books demos, and logs everything back into HubSpot. Deflected 60% of inbound tickets in the first month.", visible: false },
];

export const FAQ_ITEMS = [
  { q: "What does a2labs do?", a: "We build custom automations that connect your tools and eliminate repetitive work. From CRM pipelines to invoicing to onboarding flows \u2014 if it's manual and repeatable, we automate it." },
  { q: "Do I need to be technical?", a: "Not at all. You tell us what's slowing you down, we build the solution. No code, no dashboards to learn \u2014 it just works in the tools you already use." },
  { q: "What tools do you integrate with?", a: "Anything with an API. Common ones include HubSpot, Salesforce, Stripe, Notion, Slack, Google Workspace, Linear, Intercom, Airtable, and Zapier \u2014 but we're not limited to these." },
  { q: "How long does a typical project take?", a: "Most automations are live within 1\u20132 weeks. Complex multi-system builds can take 3\u20134 weeks. We scope everything upfront so there are no surprises." },
  { q: "What's the pricing model?", a: "We work on a per-project basis with a fixed quote. No hourly billing, no retainers unless you want ongoing support. You know the cost before we start." },
  { q: "Can you maintain automations after launch?", a: "Yes \u2014 we offer ongoing support plans for monitoring, updates, and new workflows. Most clients start with a project and move to a monthly plan once they see the ROI." },
  { q: "What if my workflow is too niche?", a: "That's actually where we shine. Off-the-shelf tools break down with custom processes. We build to fit your exact workflow, not the other way around." },
  { q: "How do we get started?", a: "Book a free 30-minute call. We'll map out your biggest time sinks, show you what's automatable, and give you a clear scope and quote \u2014 no commitment required." },
];
