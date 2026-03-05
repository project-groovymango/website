# A2 Labs Website

## What This Is

A business website for A2 Labs, a company offering custom automation solutions using iPaaS platforms (Make.com, n8n, etc.). The site is a single-page marketing site built with React and Vite, deployed on GitHub Pages. It showcases services, case studies, team, and provides booking CTAs via Cal.com.

## Core Value

The site must load fast, rank well on search engines for iPaaS/automation niche keywords, and convert visitors into booked discovery calls.

## Requirements

### Validated

- Landing page with hero section, value proposition, and CTA — existing
- Case studies section with expandable project showcases — existing
- How It Works section with toggle between process audit and specific problem flows — existing
- Team section with founder info — existing
- FAQ accordion section — existing
- Footer with contact info and social links — existing
- Cal.com booking embed integrated across multiple CTAs — existing
- Brand logo grid showing client/partner tools — existing
- Infinite scrolling tools marquee — existing
- Scroll-triggered fade-in animations — existing
- GitHub Pages deployment via GitHub Actions — existing
- Responsive design with mobile breakpoints — existing

### Active

- [ ] Optimize page load performance (target 90+ Lighthouse performance score)
- [ ] Implement comprehensive SEO (meta tags, Open Graph, structured data, semantic HTML)
- [ ] Fix known bugs (favicon 404, placeholder links, empty Planhat SVG, banner link)
- [ ] Optimize images (compression, modern formats, responsive sizing)
- [ ] Self-host fonts to eliminate render-blocking Google Fonts requests
- [ ] Add proper Content Security Policy
- [ ] Improve accessibility for better SEO signals
- [ ] Add sitemap.xml and robots.txt

### Out of Scope

- Full redesign — current design is kept as-is
- Blog/content marketing system — defer to future milestone
- CMS integration — content stays in source code for now
- Multi-page routing — single page is sufficient for current needs
- Testing infrastructure — not part of this performance/SEO milestone
- React/Vite major version upgrades — separate effort

## Context

- The site is a brownfield React SPA built with Vite 4 and React 18
- Currently deployed to GitHub Pages at `/website/` subpath
- No SSR/SSG — purely client-side rendered, which hurts SEO
- No Open Graph or structured data tags — poor social sharing
- Google Fonts loaded externally with render-blocking potential
- Images served unoptimized from `src/assets/`
- Several known bugs: favicon 404, placeholder links, empty SVG, tooltip overflow
- Monolithic CSS in single file, extensive inline styles in JSX
- No error boundaries or error handling
- The iPaaS automation niche has specific keywords: "Make.com automation", "n8n automation", "iPaaS consulting", "workflow automation agency"

## Constraints

- **Tech stack**: Keep React + Vite — no framework migration
- **Design**: Preserve current visual design and layout
- **Hosting**: GitHub Pages (static only, no server-side rendering)
- **Deployment**: Must continue working with existing GitHub Actions workflow

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep React SPA (no SSR migration) | User wants to improve existing, not rebuild | -- Pending |
| Static-site SEO approach (meta tags, structured data, prerendering) | GitHub Pages can't do SSR; maximize what's possible with static hosting | -- Pending |
| Self-host fonts over Google Fonts CDN | Eliminates render-blocking external requests and DNS lookups | -- Pending |

---
*Last updated: 2026-03-05 after initialization*
