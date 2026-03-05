# Requirements: A2 Labs Website

**Defined:** 2026-03-05
**Core Value:** The site must load fast, rank well on search engines for iPaaS/automation niche keywords, and convert visitors into booked discovery calls.

## v1 Requirements

Requirements for this milestone. Each maps to roadmap phases.

### SEO

- [ ] **SEO-01**: Site has complete meta tags (title, description, canonical URL) in static index.html
- [ ] **SEO-02**: Site has Open Graph and Twitter Card tags for rich social sharing previews
- [ ] **SEO-03**: Site has JSON-LD structured data (Organization, ProfessionalService, FAQPage schemas)
- [ ] **SEO-04**: Site has sitemap.xml and robots.txt in public directory
- [ ] **SEO-05**: Favicon loads correctly on GitHub Pages (no 404)
- [ ] **SEO-06**: Headings and copy include niche keywords (iPaaS automation, Make.com, workflow automation)

### Performance

- [ ] **PERF-01**: Fonts (DM Sans, DM Mono) are self-hosted as WOFF2 with font-display: swap
- [ ] **PERF-02**: Google Fonts CDN links and preconnects are removed
- [ ] **PERF-03**: Images have explicit width/height attributes to prevent CLS
- [ ] **PERF-04**: Images are optimized (compressed, appropriate format)
- [ ] **PERF-05**: Cal.com embed loads on user interaction (CTA click), not on page mount
- [ ] **PERF-06**: Resource hints added (preload fonts, preconnect Cal.com)

### HTML Quality

- [ ] **HTML-01**: Semantic heading hierarchy (real h1/h2/h3, no span[role=heading] hacks)
- [ ] **HTML-02**: Placeholder href="#" links in footer are fixed or removed
- [ ] **HTML-03**: Content Security Policy added via meta tag
- [ ] **HTML-04**: Error boundary wraps Cal.com embed to prevent white-screen crashes

### Bug Fixes

- [ ] **BUG-01**: Banner "click here" link points to real destination or is removed
- [ ] **BUG-02**: Empty Planhat logo SVG is fixed or removed

## v2 Requirements

Deferred to future milestones. Tracked but not in current roadmap.

### Content

- **CONT-01**: Blog/content marketing system for SEO thought leadership
- **CONT-02**: CMS integration for non-technical content updates

### Infrastructure

- **INFR-01**: Performance budget CI (Lighthouse threshold in GitHub Actions)
- **INFR-02**: Pre-rendered HTML for crawler-friendly static output
- **INFR-03**: Testing infrastructure (component tests, visual regression)

### Polish

- **PLSH-01**: Inline critical CSS for faster first contentful paint
- **PLSH-02**: Reduced motion support (prefers-reduced-motion media query)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| SSR/SSG framework migration (Next.js, Astro) | Keep React + Vite per project constraint |
| Client-side routing (React Router) | Single page is sufficient |
| Analytics / tracking scripts | Add post-optimization to avoid hurting performance |
| Cookie consent banner | No cookies/tracking currently used |
| Service worker / PWA | Agency site doesn't benefit from offline capability |
| Image CDN (Cloudinary, Imgix) | Overkill for ~15 small assets |
| Custom animation library | Current FadeIn component is lightweight enough |
| AMP pages | No ranking benefit, constrains design |
| Full visual redesign | Keep current design per user preference |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SEO-01 | TBD | Pending |
| SEO-02 | TBD | Pending |
| SEO-03 | TBD | Pending |
| SEO-04 | TBD | Pending |
| SEO-05 | TBD | Pending |
| SEO-06 | TBD | Pending |
| PERF-01 | TBD | Pending |
| PERF-02 | TBD | Pending |
| PERF-03 | TBD | Pending |
| PERF-04 | TBD | Pending |
| PERF-05 | TBD | Pending |
| PERF-06 | TBD | Pending |
| HTML-01 | TBD | Pending |
| HTML-02 | TBD | Pending |
| HTML-03 | TBD | Pending |
| HTML-04 | TBD | Pending |
| BUG-01 | TBD | Pending |
| BUG-02 | TBD | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 0
- Unmapped: 18

---
*Requirements defined: 2026-03-05*
*Last updated: 2026-03-05 after initial definition*
