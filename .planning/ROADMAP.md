# Roadmap: A2 Labs Website

## Overview

Transform the existing A2 Labs marketing SPA from an SEO-invisible, unoptimized React page into a fast-loading, search-engine-friendly site that converts visitors into booked discovery calls. The work progresses from static file foundations (metadata, fonts, crawl infrastructure) through semantic markup improvements to runtime performance hardening, each phase delivering independently verifiable improvements.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: SEO Foundation and Static Assets** - Complete SEO metadata, social sharing tags, structured data, crawl infrastructure, self-hosted fonts, and bug fixes in static files (completed 2026-03-05)
- [ ] **Phase 2: Semantic HTML and Content Quality** - Proper heading hierarchy, semantic elements, placeholder link cleanup, and keyword optimization in React components
- [ ] **Phase 3: Runtime Performance and Hardening** - Deferred Cal.com loading, image optimization, CLS prevention, Content Security Policy, and error boundaries

## Phase Details

### Phase 1: SEO Foundation and Static Assets
**Goal**: Search engines and social platforms see complete, accurate metadata when they crawl the site, fonts load without render-blocking external requests, and known static-file bugs are fixed
**Depends on**: Nothing (first phase)
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, PERF-01, PERF-02, PERF-06, BUG-01, BUG-02
**Success Criteria** (what must be TRUE):
  1. Viewing page source of the deployed site shows complete meta tags (title, description, canonical), Open Graph tags, and Twitter Card tags in the HTML head
  2. Facebook Sharing Debugger and Twitter Card Validator render a rich preview with title, description, and image for the site URL
  3. Google Rich Results Test validates the JSON-LD structured data (Organization schema only, per user decision) without errors
  4. Navigating to /website/sitemap.xml and /website/robots.txt returns valid files; favicon loads without 404; banner link and Planhat logo are fixed or removed
  5. Fonts render immediately on page load with no flash of unstyled text and no network requests to fonts.googleapis.com or fonts.gstatic.com visible in DevTools
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md -- SEO metadata, OG/Twitter tags, JSON-LD, sitemap, robots.txt, OG image, resource hints
- [x] 01-02-PLAN.md -- Self-hosted fonts (fontsource), Google Fonts removal, Planhat logo removal, banner link fix

### Phase 2: Semantic HTML and Content Quality
**Goal**: The page uses proper semantic HTML structure and keyword-optimized headings that improve both search ranking signals and accessibility
**Depends on**: Phase 1
**Requirements**: SEO-06, HTML-01, HTML-02
**Success Criteria** (what must be TRUE):
  1. Inspecting the DOM shows a single h1 element and a logical h2/h3 hierarchy with no heading level gaps and no span-with-role-heading workarounds
  2. All footer links either navigate to a real destination or have been removed; no href="#" placeholders remain in the rendered page
  3. Page headings and body copy contain target niche keywords (iPaaS, Make.com, n8n, workflow automation) in natural language that a search engine would index
**Plans**: 1 plan

Plans:
- [ ] 02-01-PLAN.md -- Semantic heading hierarchy, footer link cleanup, keyword optimization

### Phase 3: Runtime Performance and Hardening
**Goal**: The site achieves strong Core Web Vitals scores through deferred third-party loading, optimized images, and defensive error handling
**Depends on**: Phase 2
**Requirements**: PERF-03, PERF-04, PERF-05, HTML-03, HTML-04
**Success Criteria** (what must be TRUE):
  1. Cal.com embed JavaScript does not load until the user clicks a booking CTA; DevTools Network tab on fresh page load shows zero requests to cal.com domains
  2. All images have explicit width and height attributes in the HTML, and Lighthouse CLS score is below 0.1
  3. Images are served in optimized formats and compressed sizes; total image payload is measurably reduced from current baseline
  4. A Content-Security-Policy meta tag is present in index.html, and an error boundary wraps the Cal.com embed so that embed failures show a fallback instead of crashing the page
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. SEO Foundation and Static Assets | 2/2 | Complete   | 2026-03-05 |
| 2. Semantic HTML and Content Quality | 0/1 | In progress | - |
| 3. Runtime Performance and Hardening | 0/? | Not started | - |
