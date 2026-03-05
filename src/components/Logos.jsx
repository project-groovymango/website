export const StripeSvg = ({ height = 18 }) => (
  <svg height={height} viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Stripe">
    <path d="M8.5 9.3c0-.8.7-1.1 1.8-1.1 1.6 0 3.6.5 5.2 1.3V4.8C13.8 4 12.1 3.6 10.3 3.6 6.4 3.6 3.8 5.6 3.8 9.2c0 5.6 7.7 4.7 7.7 7.1 0 .9-.8 1.3-2 1.3-1.7 0-4-.7-5.8-1.7v4.5c2 .8 4 1.2 5.8 1.2 4.1 0 6.9-2 6.9-5.7-.1-6-7.9-4.9-7.9-6.6zM26.2 3.9l-2.8 13.6-2.8-13.6H16l4.6 18H27l4.6-18h-5.4zM33.2 3.9h4.7v18h-4.7zM44.4 9c0-1.4 1.2-2 3.1-2 2.8 0 6.4.9 9.2 2.4V4.1C54.2 2.6 51.7 2 49.2 2c-6.1 0-10.2 3.2-10.2 7.4 0 7.2 10 6.1 10 9.2 0 1.7-1.5 2.3-3.5 2.3-3 0-6.9-1.3-10-3v5.2c3.3 1.4 6.7 2.2 10 2.2 6.3 0 10.5-3.1 10.5-7.5-.1-7.7-11.6-6.4-11.6-8.8z" fill="currentColor"/>
  </svg>
);

export const NotionSvg = ({ height = 18 }) => (
  <svg height={height} viewBox="0 0 80 24" xmlns="http://www.w3.org/2000/svg" aria-label="Notion">
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
    <text x="26" y="17" fontFamily="DM Sans,sans-serif" fontSize="14" fontWeight="700" fill="currentColor">Notion</text>
    <text x="4" y="17" fontFamily="serif" fontSize="14" fontWeight="900" fill="currentColor">N</text>
  </svg>
);

export const HubSpotSvg = ({ height = 18 }) => (
  <svg height={height} viewBox="0 0 90 24" xmlns="http://www.w3.org/2000/svg" aria-label="HubSpot">
    <circle cx="8" cy="8" r="5" fill="currentColor" opacity="0.2"/>
    <circle cx="8" cy="8" r="2.5" fill="currentColor"/>
    <text x="18" y="17" fontFamily="DM Sans,sans-serif" fontSize="14" fontWeight="700" fill="currentColor">HubSpot</text>
  </svg>
);

export const LinearSvg = ({ height = 18 }) => (
  <svg height={height} viewBox="0 0 70 24" xmlns="http://www.w3.org/2000/svg" aria-label="Linear">
    <polygon points="2,2 14,2 14,14" fill="currentColor"/>
    <line x1="2" y1="14" x2="14" y2="2" stroke="currentColor" strokeWidth="1.5"/>
    <text x="20" y="17" fontFamily="DM Sans,sans-serif" fontSize="14" fontWeight="700" fill="currentColor">Linear</text>
  </svg>
);

export const VercelSvg = ({ height = 18 }) => (
  <svg height={height} viewBox="0 0 70 24" xmlns="http://www.w3.org/2000/svg" aria-label="Vercel">
    <polygon points="9,2 17,18 1,18" fill="currentColor"/>
    <text x="22" y="17" fontFamily="DM Sans,sans-serif" fontSize="14" fontWeight="700" fill="currentColor">Vercel</text>
  </svg>
);

export const FigmaSvg = ({ height = 18 }) => (
  <svg height={height} viewBox="0 0 65 24" xmlns="http://www.w3.org/2000/svg" aria-label="Figma">
    <rect x="2" y="2" width="8" height="8" rx="4" fill="currentColor" opacity="0.5"/>
    <rect x="12" y="2" width="8" height="8" rx="4" fill="currentColor" opacity="0.8"/>
    <rect x="2" y="12" width="8" height="8" rx="4" fill="currentColor" opacity="0.3"/>
    <rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
    <text x="24" y="17" fontFamily="DM Sans,sans-serif" fontSize="14" fontWeight="700" fill="currentColor">Figma</text>
  </svg>
);

export const SalesforceSvg = ({ height = 18 }) => (
  <svg height={height} viewBox="0 0 90 24" xmlns="http://www.w3.org/2000/svg" aria-label="Salesforce">
    <ellipse cx="11" cy="12" rx="9" ry="7" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <text x="24" y="17" fontFamily="DM Sans,sans-serif" fontSize="14" fontWeight="700" fill="currentColor">Salesforce</text>
  </svg>
);

export const IntercomSvg = ({ height = 18 }) => (
  <svg height={height} viewBox="0 0 75 24" xmlns="http://www.w3.org/2000/svg" aria-label="Intercom">
    <rect x="2" y="2" width="16" height="16" rx="4" fill="currentColor" opacity="0.2"/>
    <circle cx="7" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="13" cy="10" r="1.5" fill="currentColor"/>
    <text x="22" y="17" fontFamily="DM Sans,sans-serif" fontSize="13" fontWeight="700" fill="currentColor">Intercom</text>
  </svg>
);

export const ExternalLinkSvg = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0, opacity: 0.9}}>
    <path d="M15.6396 7.02527H12.0181V5.02527H19.0181V12.0253H17.0181V8.47528L12.1042 13.3892L10.6899 11.975L15.6396 7.02527Z" fill="#D4C17A"/>
    <path d="M10.9819 6.97473H4.98193V18.9747H16.9819V12.9747H14.9819V16.9747H6.98193V8.97473H10.9819V6.97473Z" fill="#D4C17A"/>
  </svg>
);
