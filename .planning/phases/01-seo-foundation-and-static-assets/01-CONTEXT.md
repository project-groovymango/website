# Phase 1: SEO Foundation and Static Assets - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete SEO metadata (meta tags, Open Graph, Twitter Cards, JSON-LD), self-hosted fonts, crawl infrastructure (sitemap.xml, robots.txt), and static-file bug fixes. Primary changes are in `index.html` and `public/`. React source files (`content.js`, `ToolsMarquee.jsx`, `index.jsx`, `main.jsx`) are also modified for bug fixes (BUG-01, BUG-02) and font migration (PERF-01) per ROADMAP requirements.

</domain>

<decisions>
## Implementation Decisions

### SEO Copy & Branding
- Page title: "A2 Labs — iPaaS Automation & Workflow Consulting"
- Meta description: Claude's discretion — write a keyword-optimized description based on site content (include iPaaS, Make.com, n8n, workflow automation)
- Canonical URL: GitHub Pages URL (https://[username].github.io/website/)
- OG image: Create a branded card image (static PNG/JPG with A2 Labs logo, tagline, brand colors) — place in `public/`

### Structured Data
- Include Organization schema only (not ProfessionalService, not FAQPage)
- Business details: company name, logo, website URL, email (hello@a2labs.io), plus social profile links (LinkedIn, Discord, Telegram, Slack) once real URLs exist from footer link fixes

### Bug Fixes
- Banner "click here" link: User wants to point it somewhere real — URL TBD (user was asked but moved on; planner should leave a placeholder or prompt for URL during execution)
- Planhat logo: Remove from logo grid entirely (SVG is 0 bytes)
- Footer placeholder links: Handled in Phase 2 (HTML-02)

### Font Strategy
- Not yet discussed — Claude's discretion
- Research identified two approaches: fontsource packages vs manual WOFF2 download
- Current fonts: DM Sans (400, 500, 600) and DM Mono (400, 500)
- Must go in `/public/fonts/`, NOT `src/assets/` (Vite would base64 inline them)
- Must use `font-display: swap` and WOFF2 format only

### Claude's Discretion
- Meta description copy (keyword-optimized)
- Font self-hosting approach (fontsource vs manual WOFF2)
- OG image design details (layout, exact colors)
- robots.txt configuration
- Resource hints (preload fonts, preconnect Cal.com)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/data/content.js`: FAQ_ITEMS array maps directly to FAQPage schema (if ever added)
- `public/frog.gif`: Exists in public dir for favicon — but current `index.html` uses wrong path

### Established Patterns
- All static content in `src/data/content.js` as named exports
- Single `index.html` as Vite entry — all head tags go here
- `vite.config.js` sets `base: "/website/"` — all asset paths respect this

### Integration Points
- `index.html` `<head>`: Where all meta/OG/structured data tags go
- `public/` directory: Where sitemap.xml, robots.txt, OG image, and self-hosted font files go
- `src/styles/global.css`: Where `@font-face` declarations go (replacing Google Fonts import)
- `vite.config.js`: May need base path reference for sitemap/canonical URLs

</code_context>

<specifics>
## Specific Ideas

- Title should include "iPaaS Automation & Workflow Consulting" for niche keyword targeting
- Social profiles in structured data should match actual social links (once footer links are real in Phase 2)
- All SEO URLs must include `/website/` base path (GitHub Pages subpath constraint)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-seo-foundation-and-static-assets*
*Context gathered: 2026-03-05*
