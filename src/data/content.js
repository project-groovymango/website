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
  { q: "What do you do in a nutshell?", a: "We build automations and help out with other headaches such as systems migrations or a cleanup, with a focus being on operational efficiency. Think of an automated region based lead assignment (round robin) with a control panel or a custom enrichment module within Clay as per your wishes." },
  { q: "How do you make the automations?", a: "It's important for us that we can handover the automation in a way that you can take over in case we end up under a bus. We therefore try to stay as low-code as possible -- that being said, there have been cases where languages such as Python or Javascript have been needed, but this code is always kept within the automation itself and absolutely minimal." },
  { q: "In which CRMs do we have experience in?", a: "We've mainly worked with customers using Hubspot in the past, that is our expertise. However, if it has legs an api - we can advise. In the end, all the applications are just an excel sheet (the backend) with a pretty interface." },
  { q: "Which tools have you worked with?", a: "Umm... well, enough to know that every SaaS app is just a database wearing a fancy coat -- but under here an indication. May have forgotten some." },
  { q: "How long does a typical project take?", a: "Depends" },
];
