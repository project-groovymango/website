# A2 Labs Website

## What This Is

A business website for A2 Labs, a company offering custom automation solutions using iPaaS platforms (Make.com, n8n, etc.). The site is a single-page marketing site built with React and Vite, deployed on GitHub Pages. It showcases services, case studies, team, and provides booking CTAs via Cal.com. Fully SEO-optimized with self-hosted fonts, deferred third-party loading, and defensive error handling.

## Core Value

The site must load fast, rank well on search engines for automation niche keywords (Make.com, n8n, workflow automation, HubSpot automation), and convert visitors into booked discovery calls.

## Requirements

### Validated

- Landing page with hero section, value proposition, and CTA — existing
- Case studies section with expandable project showcases — existing
- How It Works section with toggle between process audit and specific problem flows — existing
- Team section with founder info — existing
- FAQ accordion section — existing
- Footer with contact info — existing
- Cal.com booking embed integrated across multiple CTAs — existing
- Brand logo grid showing client/partner tools — existing
- Infinite scrolling tools marquee — existing
- Scroll-triggered fade-in animations — existing
- GitHub Pages deployment via GitHub Actions — existing
- Responsive design with mobile breakpoints — existing
- Complete SEO meta tags (title, description, canonical, OG, Twitter Cards) — v1.0
- JSON-LD Organization structured data — v1.0
- sitemap.xml and robots.txt — v1.0
- Self-hosted fonts (DM Sans, DM Mono) via fontsource — v1.0
- Semantic heading hierarchy (h1/h2/h3, no ARIA hacks) — v1.0
- Dead footer placeholder links removed — v1.0
- Target keywords woven into page copy — v1.0
- Cal.com embed deferred to CTA click (zero requests on page load) — v1.0
- Error boundary with fallback for Cal.com failures — v1.0
- Content Security Policy meta tag — v1.0
- Images optimized (frog.gif to WebP) with explicit dimensions — v1.0
- Favicon 404 fixed — v1.0
- Planhat logo removed — v1.0
- Banner "click here" link fixed — v1.0

### Active

(None — fresh requirements needed for next milestone via `/gsd:new-milestone`)

### Out of Scope

- Full redesign — current design is kept as-is
- Blog/content marketing system — defer to future milestone
- CMS integration — content stays in source code for now
- Multi-page routing — single page is sufficient for current needs
- Testing infrastructure — not part of this performance/SEO milestone
- React/Vite major version upgrades — separate effort

## Context

- Shipped v1.0 with 690 LOC across JSX/JS/CSS
- Tech stack: React 18, Vite 4, deployed to GitHub Pages at `/website/`
- All fonts self-hosted via @fontsource (no external font requests)
- Cal.com embed deferred to click (eliminates ~150-200KB from initial load)
- CSP meta tag with Cal.com domain whitelist
- 18 v1 requirements satisfied across 3 phases, 5 plans

## Constraints

- **Tech stack**: Keep React + Vite — no framework migration
- **Design**: Preserve current visual design and layout
- **Hosting**: GitHub Pages (static only, no server-side rendering)
- **Deployment**: Must continue working with existing GitHub Actions workflow

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep React SPA (no SSR migration) | User wants to improve existing, not rebuild | ✓ Good |
| Static-site SEO approach (meta tags, structured data) | GitHub Pages can't do SSR; maximize what's possible with static hosting | ✓ Good |
| Self-host fonts via fontsource packages | Eliminates render-blocking external requests, npm-managed, includes font-display: swap | ✓ Good |
| Organization schema only (not ProfessionalService/FAQPage) | User decision — simpler, accurate for current stage | ✓ Good |
| Defer Cal.com to click (not page load) | Eliminates ~150-200KB from initial load, zero cal.com requests on fresh load | ✓ Good |
| CSP via meta tag (not HTTP header) | GitHub Pages doesn't support custom headers | ✓ Good |
| react-error-boundary for Cal.com | Standard library, avoids hand-rolling class components | ✓ Good |
| frog.gif to animated WebP | Smaller file size, modern format | ✓ Good |

---
*Last updated: 2026-03-05 after v1.0 milestone*
