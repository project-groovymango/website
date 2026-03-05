import hubspot from "../assets/hubspot-logo.svg";
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
  { src: hubspot, alt: "HubSpot", width: 56, height: 16 },
  { src: intercom, alt: "Intercom", width: 68, height: 16 },
  { src: google, alt: "Google", width: 49, height: 16 },
  { src: stripe, alt: "Stripe", width: 38, height: 16 },
  { src: openai, alt: "OpenAI", width: 57, height: 16 },
  { src: notion, alt: "Notion", width: 45, height: 16 },
  { component: MakeLogo, alt: "Make" },
  { src: n8n, alt: "n8n", width: 30, height: 16 },
  { src: elevenlabs, alt: "ElevenLabs", width: 108, height: 14 },
  { src: chargebee, alt: "Chargebee", width: 52, height: 16 },
  { src: partnerstack, alt: "PartnerStack", width: 83, height: 16 },
];

export default function ToolsMarquee() {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map(({ src, alt, raster, width, height, component: Component }, i) =>
          Component ? (
            <span className="marquee-item marquee-svg" key={i}><Component height={16} /></span>
          ) : (
            <img
              className={`marquee-item${raster ? " marquee-raster" : ""}`}
              key={i}
              src={src}
              alt={alt}
              width={width}
              height={height}
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
