# Project Research Summary

**Project:** A2 Labs Website
**Domain:** SPA performance and SEO optimization (React + Vite on GitHub Pages)
**Researched:** 2026-03-05
**Confidence:** MEDIUM-HIGH

## Executive Summary

The A2 Labs website is a single-page React SPA marketing site for an iPaaS automation agency, deployed to GitHub Pages as a static site. The current site has solid content and a lean dependency footprint (React + Cal.com embed only), but it is essentially invisible to search engines and social platforms: crawlers see an empty `<div id="root">`, there is no structured data, no sitemap, no Open Graph tags, and Google Fonts block rendering. The performance and SEO optimization work is well-scoped and achievable without any framework migration.

The recommended approach is decidedly NOT to add prerendering or SSR tooling. For a single-page site on static hosting, the correct strategy is to maximize the static `index.html` shell with complete metadata, structured data, and Open Graph tags -- all of which are readable by every crawler without JavaScript execution. Pair this with self-hosted fonts (eliminating render-blocking external requests), deferred Cal.com loading (eliminating ~200KB of eager JS), explicit image dimensions (preventing layout shift), and basic SEO hygiene (sitemap, robots.txt, semantic headings, favicon fix). This gets 90% of the SEO benefit at 10% of the complexity of prerendering.

The key risks are: (1) incorrect font self-hosting causing a performance regression instead of improvement, (2) forgetting the `/website/` base path in SEO URLs which creates 404s for crawlers, (3) the Cal.com embed continuing to tank Lighthouse scores if not properly deferred, and (4) spending time on prerendering complexity that delivers marginal benefit for a single-URL site. All four are avoidable with the phased approach described below.

## Key Findings

### Recommended Stack

The existing stack (React 18, Vite 4, GitHub Pages) is locked and sufficient. No framework migration needed. See [STACK.md](./STACK.md) for full details.

**Core additions:**
- **react-helmet-async**: Head tag management from React -- useful if client routing is ever added, but for now static `index.html` tags are preferred and simpler
- **Self-hosted fonts via fontsource or manual WOFF2 download**: Eliminates render-blocking Google Fonts CDN calls and 2 DNS lookups
- **vite-plugin-image-optimizer (optional)**: Build-time image compression -- but given only ~15 assets, manual optimization is simpler and avoids CI breakage from native dependencies
- **Hand-written JSON-LD, sitemap.xml, robots.txt**: No libraries needed for static single-page content

**Explicitly rejected:** react-snap (abandoned), prerender-spa-plugin (webpack-only), Next.js/Astro migration (out of scope), React Router (single page), service workers (unnecessary), analytics (post-optimization concern).

**Version warning:** All package versions are from May 2025 training data. Run `npm view <package> version` before installing anything.

### Expected Features

See [FEATURES.md](./FEATURES.md) for full analysis with dependency ordering.

**Must have (table stakes):**
- Meta tags (title, description, canonical) in static HTML
- Open Graph and Twitter Card tags in static HTML
- JSON-LD structured data (Organization, ProfessionalService, FAQPage)
- Self-hosted fonts with `font-display: swap`
- Image optimization with explicit width/height attributes
- Semantic HTML (real `<h2>` tags instead of `span[role=heading]`)
- sitemap.xml and robots.txt in `/public/`
- Working favicon (currently 404s due to base path)
- Fix or remove placeholder `href="#"` links

**Should have (differentiators):**
- Deferred Cal.com embed loading (interaction-triggered, not page-mount)
- Resource hints (preload fonts, preconnect Cal.com)
- Niche keyword targeting in headings/copy
- Content Security Policy via meta tag
- Performance budget CI (Lighthouse threshold in GitHub Actions)

**Defer:**
- Prerendered HTML (complexity not justified for single page)
- Inline critical CSS (marginal gain for a 146-line CSS file)
- Blog/content pages, CMS integration, client-side routing
- Analytics, cookie consent, service workers

### Architecture Approach

The site is a monolithic single-file SPA (~280 lines in one component) with six small child components. The optimization work layers cleanly into five independent concerns: build-time asset processing, static files, HTML head metadata, semantic markup, and runtime performance. These layers have no hard dependencies on each other. See [ARCHITECTURE.md](./ARCHITECTURE.md) for layer diagrams and data flow.

**Major components and what changes:**
1. **index.html** -- Massive expansion: full meta tags, OG, JSON-LD, font preloads, CSP meta tag
2. **public/ directory** -- New static files: robots.txt, sitemap.xml, self-hosted font WOFF2 files, proper favicon
3. **global.css** -- Add `@font-face` declarations for self-hosted fonts
4. **App (index.jsx)** -- Semantic HTML refactor (headings, sections), deferred Cal.com loading, image dimension attributes
5. **vite.config.js** -- Possibly add image optimizer plugin (or skip if manual optimization is chosen)

### Critical Pitfalls

See [PITFALLS.md](./PITFALLS.md) for all 12 pitfalls with detection and prevention strategies.

1. **Meta tags in React instead of static HTML** -- Social crawlers (LinkedIn, Twitter, Facebook) do NOT execute JavaScript. All OG/meta tags must be in the static `index.html`, not injected by React. Test with Facebook Sharing Debugger before considering SEO "done."
2. **Prerendering rabbit hole** -- react-snap and Puppeteer-based prerenderers are brittle with Cal.com embeds, IntersectionObserver animations, and dynamic imports. For a single-page site, the static HTML shell provides equivalent SEO value. Do not pursue prerendering.
3. **Font self-hosting regression** -- Downloading all weights, using WOFF instead of WOFF2, missing `font-display: swap`, or letting Vite inline fonts as base64 in CSS will make performance WORSE than Google Fonts CDN. Serve from `/public/fonts/`, use WOFF2 only, subset to used weights (DM Sans 400/500/600, DM Mono 400/500).
4. **Base path `/website/` in SEO URLs** -- Canonical URLs, OG URLs, sitemap entries, and structured data must all include the `/website/` prefix. Vite handles asset paths but NOT manually-authored content in index.html or public/ files.
5. **Cal.com embed tanking Lighthouse** -- Currently loads ~150-200KB JS on every page mount. Defer to user interaction (CTA click). Consider linking directly to `cal.com/[user]/30min` as a zero-JS fallback.

## Implications for Roadmap

Based on combined research, the work splits into three phases ordered by value delivery and logical dependency. All phases are technically independent but should ship in order because later phases benefit from earlier ones being stable.

### Phase 1: SEO Foundation and Static Assets
**Rationale:** Zero React code changes. Highest SEO impact per effort. All changes are in `index.html` and `public/`. Low risk, can ship as a single commit. This must come first because it establishes the URLs and metadata that everything else references.
**Delivers:** Complete SEO metadata, social sharing previews, structured data for rich results, working favicon, crawl infrastructure (sitemap + robots.txt), self-hosted fonts eliminating render-blocking requests.
**Addresses features:** Meta tags, Open Graph, Twitter Cards, JSON-LD, self-hosted fonts, sitemap.xml, robots.txt, favicon fix, font preload hints, resource hints.
**Avoids pitfalls:** #1 (meta tags in static HTML, not React), #3 (correct font self-hosting), #4 (base path in all URLs), #6 (validate structured data), #10 (favicon base path).

### Phase 2: Semantic HTML and Content Quality
**Rationale:** React component changes that improve both SEO signals and accessibility. Groups naturally because all changes are about HTML structure within JSX. Depends on Phase 1 being stable so structured data references correct heading hierarchy.
**Delivers:** Proper heading hierarchy (h1/h2/h3), semantic elements, cleaned-up placeholder links, improved accessibility scores, keyword-optimized headings.
**Addresses features:** Semantic HTML cleanup, heading hierarchy, fix placeholder links, alt text audit, niche keyword targeting.
**Avoids pitfalls:** #11 (placeholder links), #12 (incremental semantic changes to avoid style breakage).

### Phase 3: Runtime Performance and Polish
**Rationale:** Behavioral changes to React components that affect Core Web Vitals. Should come last because Lighthouse auditing is most valuable when run against the final state of all other changes. Includes the Cal.com deferral which is the single biggest Lighthouse performance win.
**Delivers:** Deferred Cal.com loading, explicit image dimensions (CLS fix), optimized images, reduced motion handling, performance budget CI, CSP meta tag.
**Addresses features:** Cal.com lazy loading, image optimization, explicit dimensions, prefers-reduced-motion, error boundaries, CSP, Lighthouse CI.
**Avoids pitfalls:** #5 (manual image optimization, no build plugins), #7 (Cal.com deferral), #8 (animation performance), #9 (CSP added last, report-only first).

### Phase Ordering Rationale

- Phase 1 first because SEO metadata must exist in static HTML before anything else matters. Social sharing and search indexing begin immediately after deployment.
- Phase 2 second because semantic HTML improves the content that search engines evaluate. Headings and structure directly influence ranking signals.
- Phase 3 last because performance optimization is best measured after content/structure changes are stable. Running Lighthouse on an incomplete page gives misleading baselines. CSP must be the very last item because it can silently break Cal.com and inline styles.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1 (fonts):** Verify exact font files needed (DM Sans weights/styles actually used), confirm fontsource package names, test WOFF2 file sizes after subsetting. The difference between correct and incorrect font self-hosting is a performance regression.
- **Phase 3 (Cal.com deferral):** The Cal.com embed API for interaction-triggered loading needs testing. The current `getCalApi` pattern may need modification. Check if `data-cal-link` attribute approach works as a simpler alternative.

Phases with standard patterns (skip deeper research):
- **Phase 1 (meta tags, OG, JSON-LD, sitemap, robots.txt):** Completely standard patterns. Use Google's documentation and validators.
- **Phase 2 (semantic HTML):** Standard accessibility and SEO patterns. No novel complexity.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Existing stack is locked. Additions are standard but package versions need npm verification (training data is ~10 months old). |
| Features | HIGH | Table stakes and anti-features clearly identified from codebase analysis and established SEO best practices. |
| Architecture | HIGH | Five-layer approach is clean and verified against actual codebase structure. No speculative components. |
| Pitfalls | MEDIUM-HIGH | Pitfalls are drawn from real codebase issues (base path, Cal.com, font loading) and well-known SPA SEO patterns. Font and prerendering pitfalls are especially well-documented. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Package version verification:** All npm package versions are from May 2025 training data. Must run `npm view` checks before installing. Particularly `vite-plugin-prerender` (if ever needed) and `vite-plugin-image-optimizer`.
- **Cal.com embed deferral API:** The exact API for interaction-triggered Cal.com loading needs testing against the current `@calcom/embed-react@1.5.3` version. May have changed.
- **GitHub Pages compression behavior:** Whether GitHub Pages serves pre-compressed (brotli/gzip) assets or handles its own compression affects whether `vite-plugin-compression` is useful. Needs testing.
- **Custom domain plans:** If A2 Labs plans to move from `username.github.io/website/` to a custom domain (e.g., `a2labs.io`), all canonical URLs, OG URLs, sitemap, and structured data will need updating. The base path concern disappears but the migration itself is a coordination task.
- **Actual Lighthouse baseline:** No current Lighthouse score was measured during research. Establishing a baseline before any changes is essential for measuring improvement.

## Sources

### Primary (HIGH confidence)
- Direct codebase analysis: index.html, index.jsx, vite.config.js, package.json, global.css, all components
- PROJECT.md constraints and milestone definition
- Schema.org vocabulary (stable specification)
- Core Web Vitals definitions (LCP, CLS, FID/INP -- well-established standards)

### Secondary (MEDIUM confidence)
- Google Search Central JavaScript SEO documentation (training data, not live-verified)
- Vite plugin ecosystem (training data through May 2025 -- APIs may have changed)
- Lighthouse scoring methodology (training data)
- GitHub Pages static hosting constraints (training data)
- Font self-hosting best practices (well-established but implementation details vary)

### Tertiary (LOW confidence)
- Specific npm package versions (all from training data, must verify before use)
- `vite-plugin-prerender` existence and API (may have been renamed or superseded)
- GitHub Pages compression behavior (needs empirical testing)

---
*Research completed: 2026-03-05*
*Ready for roadmap: yes*
