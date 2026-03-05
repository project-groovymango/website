# Requirements: A2 Labs Website

**Defined:** 2026-03-05
**Core Value:** The site must load fast, rank well on search engines for iPaaS/automation niche keywords, and convert visitors into booked discovery calls.

## v1 Requirements

Requirements for this milestone. Each maps to roadmap phases.

### SEO

- [x] **SEO-01**: Site has complete meta tags (title, description, canonical URL) in static index.html
- [x] **SEO-02**: Site has Open Graph and Twitter Card tags for rich social sharing previews
- [x] **SEO-03**: Site has JSON-LD structured data (Organization, ProfessionalService, FAQPage schemas)
- [x] **SEO-04**: Site has sitemap.xml and robots.txt in public directory
- [x] **SEO-05**: Favicon loads correctly on GitHub Pages (no 404)
- [x] **SEO-06**: Headings and copy include niche keywords (iPaaS automation, Make.com, workflow automation)

### Performance

- [x] **PERF-01**: Fonts (DM Sans, DM Mono) are self-hosted as WOFF2 with font-display: swap
- [x] **PERF-02**: Google Fonts CDN links and preconnects are removed
- [ ] **PERF-03**: Images have explicit width/height attributes to prevent CLS
- [ ] **PERF-04**: Images are optimized (compressed, appropriate format)
- [ ] **PERF-05**: Cal.com embed loads on user interaction (CTA click), not on page mount
- [x] **PERF-06**: Resource hints added (preload fonts, preconnect Cal.com)

### HTML Quality

- [x] **HTML-01**: Semantic heading hierarchy (real h1/h2/h3, no span[role=heading] hacks)
- [x] **HTML-02**: Placeholder href="#" links in footer are fixed or removed
- [ ] **HTML-03**: Content Security Policy added via meta tag
- [ ] **HTML-04**: Error boundary wraps Cal.com embed to prevent white-screen crashes

### Bug Fixes

- [x] **BUG-01**: Banner "click here" link points to real destination or is removed
- [x] **BUG-02**: Empty Planhat logo SVG is fixed or removed

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
| SEO-01 | Phase 1 | Complete |
| SEO-02 | Phase 1 | Complete |
| SEO-03 | Phase 1 | Complete |
| SEO-04 | Phase 1 | Complete |
| SEO-05 | Phase 1 | Complete |
| SEO-06 | Phase 2 | Complete |
| PERF-01 | Phase 1 | Complete |
| PERF-02 | Phase 1 | Complete |
| PERF-03 | Phase 3 | Pending |
| PERF-04 | Phase 3 | Pending |
| PERF-05 | Phase 3 | Pending |
| PERF-06 | Phase 1 | Complete |
| HTML-01 | Phase 2 | Complete |
| HTML-02 | Phase 2 | Complete |
| HTML-03 | Phase 3 | Pending |
| HTML-04 | Phase 3 | Pending |
| BUG-01 | Phase 1 | Complete |
| BUG-02 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0

---
*Requirements defined: 2026-03-05*
*Last updated: 2026-03-05 after roadmap creation*
