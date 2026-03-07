import hubspot from "../../assets/hubspot-logo.svg";
import intercom from "../../assets/intercom-logo.svg";
import stripe from "../../assets/stripe-logo.svg";
import google from "../../assets/google-logo.svg";
import openai from "../../assets/openai-logo.svg";
import notion from "../../assets/notion-logo.svg";
import chargebee from "../../assets/chargebee-logo.svg";
import elevenlabs from "../../assets/elevenlabs-logo.svg";
import tellent from "../../assets/tellent-logo.svg";
import allbound from "../../assets/allbound.svg";

export const CAL_LINK = "amin-laanaya-b5k6ne/30min";

export const LOGOS = [
  { src: hubspot, alt: "HubSpot", width: 84 },
  { src: intercom, alt: "Intercom", width: 101 },
  { src: stripe, alt: "Stripe", width: 58 },
  { src: google, alt: "Google", width: 74 },
  { src: openai, alt: "OpenAI", width: 86 },
  { src: notion, alt: "Notion", width: 67 },
  { src: chargebee, alt: "Chargebee", width: 77 },
  { src: elevenlabs, alt: "ElevenLabs", width: 90 },
];

export const CASE_STUDIES = [
  { title: "Lead assignment", logo: tellent, logoAlt: "Tellent", logoWidth: 64, desc: "Round-robin style lead assignment based on size and region with a controlpanel, allowing SalesOps to handover adjustment to the sales managers." },
  { title: "System migration", logo: tellent, logoAlt: "Tellent", logoWidth: 64, desc: "Merged three Hubspot systems into one after a merger and acquisition. The key was aligning the sales process before moving things over." },
  { title: "Platform Move", logo: allbound, logoAlt: "Allbound", logoWidth: 85, desc: "Migrated 4 years of project history, client records, and billing data to a new platform over a single weekend. Zero data loss, zero downtime." },
  { title: "Support Agent", logo: intercom, logoAlt: "Intercom", logoWidth: 59, desc: "Built a custom AI agent that handles first-line support, books demos, and logs everything back into HubSpot. Deflected 60% of inbound tickets in the first month." },
];

export const FAQ_ITEMS = [
  { q: "What do you do in a nutshell?", a: "We build automations and help out with other headaches such as systems migrations or a cleanup, with a focus being on operational efficiency. Think of an automated region based lead assignment (round robin) with a control panel or a custom enrichment module within Clay as per your wishes." },
  { q: "How do you make the automations?", a: "We primarily build in Make.com and n8n -- it's important for us that we can handover the automation in a way that you can take over in case we end up under a bus. We therefore try to stay as low-code as possible -- that being said, there have been cases where languages such as Python or Javascript have been needed, but this code is always kept within the automation itself and absolutely minimal." },
  { q: "In which CRMs do we have experience in?", a: "We've mainly worked with customers using HubSpot in the past -- HubSpot automation is our bread and butter. However, if it has legs and an api - we can advise. In the end, all the applications are just an excel sheet (the backend) with a pretty interface." },
  { q: "Which tools have you worked with?", a: "Umm... well, enough to know that every SaaS app is just a database wearing a fancy coat -- but under here an indication. May have forgotten some." },
  { q: "How long does a typical project take?", a: "Depends" },
];
