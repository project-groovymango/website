# External Integrations

**Analysis Date:** 2026-03-05

## APIs & External Services

**Scheduling:**
- Cal.com - Embedded booking widget for scheduling calls
  - SDK/Client: `@calcom/embed-react` ^1.5.3
  - Auth: None required (public embed)
  - Implementation: Dynamically imported in `src/index.jsx` via `import("@calcom/embed-react")`
  - Configuration: `data-cal-link` attribute set to `CAL_LINK` constant from `src/data/content.js`
  - Namespace: `"30min"`, layout: `"month_view"`

**Fonts:**
- Google Fonts - DM Sans (400, 500, 600) and DM Mono (400, 500)
  - Loaded via `<link>` tags in `index.html`
  - Uses `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`

## Data Storage

**Databases:**
- None - This is a static marketing site with no backend

**File Storage:**
- Local filesystem only - Static assets in `src/assets/` and `public/`

**Caching:**
- None (static site served via GitHub Pages CDN)

## Authentication & Identity

**Auth Provider:**
- Not applicable - No authenticated features

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- None (client-side only, no logging infrastructure)

**Analytics:**
- None detected

## CI/CD & Deployment

**Hosting:**
- GitHub Pages
  - Base path: `/website/`
  - Static files served from `dist/` directory

**CI Pipeline:**
- GitHub Actions (`.github/workflows/deploy.yml`)
  - Trigger: Push to `main` branch
  - Build: `actions/setup-node@v4` with Node 20, `npm ci`, `npm run build`
  - Deploy: `actions/deploy-pages@v4`
  - Concurrency: Group `pages`, cancels in-progress deployments

## Environment Configuration

**Required env vars:**
- None - All configuration is hardcoded

**Secrets location:**
- No secrets required; Cal.com embed uses public link

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Third-Party Content (Display Only)

The site displays logos of tools/platforms the business works with. These are purely visual (SVG/image assets) with no API integrations:

- HubSpot (`src/assets/hubspot-logo.svg`)
- Planhat (`src/assets/planhat-logo.svg`)
- Intercom (`src/assets/intercom-logo.svg`)
- Stripe (`src/assets/stripe-logo.svg`)
- Google (`src/assets/google-logo.svg`)
- OpenAI (`src/assets/openai-logo.svg`)
- Notion (`src/assets/notion-logo.svg`)
- Chargebee (`src/assets/chargebee-logo.svg`)
- ElevenLabs (`src/assets/elevenlabs-logo.svg`)
- PartnerStack (`src/assets/partnerstack-logo.svg`)
- n8n (`src/assets/n8n-logo.svg`)
- Make (inline SVG component in `src/components/iPaaSLogos.jsx`)

---

*Integration audit: 2026-03-05*
