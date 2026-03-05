import hubspot from "../assets/hubspot-logo.svg";
import planhat from "../assets/planhat-logo.svg";
import intercom from "../assets/intercom-logo.svg";
import stripe from "../assets/stripe-logo.svg";
import google from "../assets/google-logo.svg";
import openai from "../assets/openai-logo.svg";
import notion from "../assets/notion-logo.svg";
import chargebee from "../assets/chargebee-logo.svg";
import elevenlabs from "../assets/elevenlabs-logo.svg";
import partnerstack from "../assets/partnerstack-logo.svg";
import n8n from "../assets/n8n-logo.svg";
import { MakeLogo } from "./iPaaSLogos";

const LOGOS = [
  { src: hubspot, alt: "HubSpot" },
  { src: planhat, alt: "Planhat" },
  { src: intercom, alt: "Intercom" },
  { src: google, alt: "Google" },
  { src: stripe, alt: "Stripe" },
  { src: openai, alt: "OpenAI" },
  { src: notion, alt: "Notion" },
  { component: MakeLogo, alt: "Make" },
  { src: n8n, alt: "n8n" },
  { src: elevenlabs, alt: "ElevenLabs", height: 14 },
  { src: chargebee, alt: "Chargebee" },
  { src: partnerstack, alt: "PartnerStack" },
];

export default function ToolsMarquee() {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map(({ src, alt, raster, height, component: Component }, i) =>
          Component ? (
            <span className="marquee-item marquee-svg" key={i}><Component height={16} /></span>
          ) : (
            <img
              className={`marquee-item${raster ? " marquee-raster" : ""}`}
              key={i}
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              style={height ? { height } : undefined}
            />
          )
        )}
      </div>
    </div>
  );
}
