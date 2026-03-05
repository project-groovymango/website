# Architecture Patterns

**Domain:** Performance & SEO optimization for React Vite SPA (single-page marketing site)
**Researched:** 2026-03-05
**Confidence:** MEDIUM (based on training data; web search unavailable for latest tooling verification)

## Current Architecture

The site is a monolithic React SPA rendered entirely client-side. Everything lives in a single `App` component in `index.jsx` (~280 lines) with six small sub-components. There is no routing, no SSR, no prerendering, and no SEO infrastructure beyond a basic `<meta description>` tag.

```
index.html (shell)
  |-- Google Fonts (render-blocking external request)
  |-- main.jsx (React entry)
       |-- index.jsx (App - entire page in one component)
            |-- FadeIn.jsx (IntersectionObserver wrapper)
            |-- Faq.jsx (accordion)
            |-- StepTitle.jsx
            |-- ToolsMarquee.jsx (infinite scroll logos)
            |-- Tooltip.jsx
            |-- iPaaSLogos.jsx (inline SVG)
            |-- content.js (data: logos, FAQ, case studies)
            |-- @calcom/embed-react (dynamic import)
```

**Key problems for SEO/performance:**
1. Crawlers see empty `<div id="root"></div>` -- no content for search engines
2. Google Fonts loaded as render-blocking external request with DNS lookups
3. No Open Graph, Twitter Card, or JSON-LD structured data
4. No sitemap.xml or robots.txt
5. Images served unoptimized (SVGs are fine, but raster images like amin.webp and frog.gif lack responsive sizing)
6. Cal.com embed loaded eagerly in useEffect (blocks interactivity)
7. All CSS in single global file (fine for this site size -- 146 lines)

## Recommended Architecture

The optimization architecture has five distinct layers that can be implemented independently. They share no runtime dependencies on each other, which means they can be built in any order, though the build order below reflects logical priority.

### Layer Diagram

```
+------------------------------------------------------------------+
|                    BUILD-TIME LAYER                                |
|  vite.config.js plugins:                                          |
|  - vite-plugin-image-optimizer (compress raster assets)           |
|  - Custom HTML plugin (inject preload hints)                      |
|  - Build output: hashed chunks, compressed assets                 |
+------------------------------------------------------------------+
         |
         v
+------------------------------------------------------------------+
|                    STATIC FILES LAYER                              |
|  /public directory:                                               |
|  - robots.txt                                                     |
|  - sitemap.xml                                                    |
|  - Self-hosted font files (DM Sans, DM Mono .woff2)              |
|  - Favicon (proper .ico or .png, not just .gif)                   |
+------------------------------------------------------------------+
         |
         v
+------------------------------------------------------------------+
|                    HTML HEAD LAYER                                 |
|  index.html:                                                      |
|  - Meta tags (description, keywords, canonical)                   |
|  - Open Graph tags (og:title, og:description, og:image, og:url)   |
|  - Twitter Card tags                                              |
|  - JSON-LD structured data (Organization, LocalBusiness)          |
|  - Font preload <link rel="preload"> for self-hosted fonts        |
|  - CSP meta tag                                                   |
+------------------------------------------------------------------+
         |
         v
+------------------------------------------------------------------+
|                    SEMANTIC HTML LAYER                             |
|  React components:                                                |
|  - Replace <p class="section-label"><span role="heading">         |
|    with actual <h2> elements                                      |
|  - Add <section aria-labelledby="..."> patterns                   |
|  - Add <nav> for any navigation elements                          |
|  - Proper <address> in footer                                     |
|  - alt text audit on all images                                   |
+------------------------------------------------------------------+
         |
         v
+------------------------------------------------------------------+
|                    RUNTIME PERFORMANCE LAYER                       |
|  React component changes:                                         |
|  - Lazy load Cal.com embed on user interaction (not mount)        |
|  - Add width/height to images (prevent CLS)                      |
|  - Optimize FadeIn to use CSS-only where possible                 |
|  - Add loading="lazy" to below-fold images                        |
+------------------------------------------------------------------+
```

### Component Boundaries

| Component | Responsibility | Communicates With | Changes Needed |
|-----------|---------------|-------------------|----------------|
| **vite.config.js** | Build pipeline orchestration | Vite plugins, output to /dist | Add image optimization plugin, configure chunk splitting |
| **index.html** | Document shell, SEO metadata | Browser, search engine crawlers | Major expansion: meta tags, OG, JSON-LD, font preloads, CSP |
| **public/** | Static assets served as-is | GitHub Pages serves directly | Add robots.txt, sitemap.xml, self-hosted fonts, favicon |
| **App (index.jsx)** | Page structure and content | All child components, Cal.com API | Semantic HTML refactor, lazy Cal.com loading |
| **FadeIn.jsx** | Scroll-triggered animations | IntersectionObserver API | Minor: ensure no CLS impact |
| **ToolsMarquee.jsx** | Infinite logo scroll | SVG/image assets | Add explicit dimensions to prevent layout shift |
| **global.css** | All styling | All components | Add font-face declarations for self-hosted fonts |
| **deploy.yml** | CI/CD pipeline | GitHub Pages | No changes needed for perf/SEO work |

### Data Flow

**SEO data flow (crawl-time):**
```
Googlebot request
  --> GitHub Pages serves index.html
    --> Crawler reads <head>: meta, OG, JSON-LD, canonical
    --> Crawler reads <body>: semantic HTML in #root (CSR content)
    --> Crawler follows sitemap.xml for URL discovery
    --> robots.txt confirms crawl permissions
```

Note: Google's crawler does execute JavaScript (Chromium-based), so React SPA content IS indexed, but with delays (days to weeks) and lower priority. The `<head>` metadata is critical because it is available immediately without JS execution.

**Font loading flow (current vs. optimized):**
```
CURRENT (slow):
Browser --> DNS lookup fonts.googleapis.com
        --> DNS lookup fonts.gstatic.com
        --> Fetch CSS (render-blocking)
        --> Fetch .woff2 files
        --> Render text

OPTIMIZED (fast):
Browser --> Read <link rel="preload" as="font"> from same origin
        --> Fetch .woff2 from /website/fonts/ (no DNS, same origin)
        --> Render text with font-display: swap
```

**Image loading flow (optimized):**
```
Vite build
  --> vite-plugin-image-optimizer processes src/assets/
    --> SVGs: already optimal (pass through)
    --> amin.webp: compress, generate srcset sizes
    --> frog.gif: compress (or convert hero instance to webp)
  --> Output to dist/assets/ with content hashes

Browser loads page
  --> Above-fold images: eager load with preload hints
  --> Below-fold images: loading="lazy" decoding="async"
```

**Cal.com loading flow (optimized):**
```
CURRENT:
Page mount --> import("@calcom/embed-react") --> initialize API --> ready
(blocks main thread during initial load)

OPTIMIZED:
Page mount --> render page (fast)
User clicks CTA --> import("@calcom/embed-react") --> initialize --> open modal
(zero cost until user needs it)
```

## Patterns to Follow

### Pattern 1: Self-Hosted Fonts with Preload

**What:** Download Google Fonts .woff2 files, serve from /public/fonts/, preload in HTML
**When:** Always, for any site using external font CDNs
**Why:** Eliminates 2 DNS lookups, 1 render-blocking CSS fetch, and removes third-party dependency

```html
<!-- index.html <head> -->
<link rel="preload" href="/website/fonts/dm-sans-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/website/fonts/dm-sans-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/website/fonts/dm-sans-600.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/website/fonts/dm-mono-400.woff2" as="font" type="font/woff2" crossorigin>
```

```css
/* global.css */
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/website/fonts/dm-sans-400.woff2') format('woff2');
}
/* ... repeat for each weight */
```

### Pattern 2: JSON-LD Structured Data in HTML Shell

**What:** Add Organization and ProfessionalService schema markup directly in index.html
**When:** For any business/agency site targeting local or niche SEO

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "A2 Labs",
  "description": "Custom automation solutions using iPaaS platforms",
  "url": "https://a2labs.io",
  "email": "hello@a2labs.io",
  "founder": {
    "@type": "Person",
    "name": "Amin Laanaya"
  },
  "serviceType": ["iPaaS Consulting", "Workflow Automation", "Make.com Development", "n8n Development"],
  "areaServed": "Worldwide"
}
</script>
```

### Pattern 3: Interaction-Triggered Dynamic Import

**What:** Defer heavy third-party imports until user interaction
**When:** Third-party embeds (Cal.com, chat widgets, analytics) that are not needed at page load

```jsx
// Instead of loading Cal.com on mount:
const [calLoaded, setCalLoaded] = useState(false);

const loadCal = async () => {
  if (calLoaded) return;
  const { getCalApi } = await import("@calcom/embed-react");
  const cal = await getCalApi({ namespace: "30min" });
  cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
  setCalLoaded(true);
};

// Attach to CTA buttons: onClick={loadCal}
```

### Pattern 4: Explicit Image Dimensions for CLS Prevention

**What:** Always set width and height attributes on `<img>` elements
**When:** Every image on the page
**Why:** Prevents Cumulative Layout Shift (CLS), a Core Web Vital

```jsx
// Before (causes CLS):
<img src={aminPhoto} alt="Amin Laanaya" loading="lazy" />

// After (reserves space):
<img src={aminPhoto} alt="Amin Laanaya" loading="lazy" width={200} height={200} />
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Prerendering/SSG Migration for a Single Page

**What:** Adding react-snap, prerender-spa-plugin, or migrating to Next.js/Astro for SSG
**Why bad:** Massive complexity increase for a single-page site. Google's crawler handles CSR SPAs. The ROI is terrible when you can achieve 90% of the SEO benefit by properly filling out `<head>` metadata in the static index.html shell.
**Instead:** Maximize the static index.html shell (meta tags, OG, JSON-LD, canonical) and use semantic HTML in React components. This is a single URL site -- there is nothing to prerender that the HTML shell cannot already provide.

### Anti-Pattern 2: CSS-in-JS or CSS Module Migration

**What:** Migrating the 146-line global.css to styled-components, CSS modules, or Tailwind
**Why bad:** The CSS is tiny and well-organized. Migration adds complexity with zero performance benefit. Tailwind would increase the toolchain surface area for a simple site.
**Instead:** Keep global.css. Add @font-face declarations there. It works.

### Anti-Pattern 3: Over-Splitting Chunks

**What:** Aggressive code splitting with React.lazy and Suspense for every section
**Why bad:** This is a single page with ~280 lines of JSX. The total JS bundle is already small. Adding chunk splitting overhead (loading states, waterfalls) would make the experience worse, not better.
**Instead:** Only lazy-load Cal.com (which is the one genuinely heavy third-party dependency). Everything else should stay in the main bundle.

### Anti-Pattern 4: Service Workers for a Marketing Site

**What:** Adding Workbox or a service worker for offline support
**Why bad:** Nobody needs to view a marketing site offline. Service workers add debugging complexity and can cause stale content issues that are painful for a site that changes infrequently.
**Instead:** Standard HTTP caching via GitHub Pages headers (which you cannot control) plus hashed filenames from Vite (which you already have).

## Scalability Considerations

This is a single-page marketing site. Traditional scalability concerns (database, API rate limits, concurrent users) do not apply. The relevant "scalability" dimensions are:

| Concern | Current State | After Optimization |
|---------|--------------|-------------------|
| **Page load time** | Slow: render-blocking fonts, eager Cal.com | Fast: self-hosted fonts, lazy Cal.com, optimized images |
| **SEO discoverability** | Poor: no structured data, no sitemap | Strong: full meta tags, JSON-LD, sitemap, semantic HTML |
| **Content updates** | Edit JSX directly | Same (out of scope: CMS is deferred) |
| **Adding pages** | Would require router | Same (out of scope: multi-page is deferred) |
| **Lighthouse score** | Estimated 50-70 | Target 90+ |

## Suggested Build Order

The layers have no hard dependencies on each other, but this order maximizes early value and groups related work:

### Phase 1: Static Foundation (no React changes)
**Components:** index.html, public/, vite.config.js

1. Self-host fonts (download .woff2 files to public/fonts/, add @font-face to global.css, remove Google Fonts links from index.html, add preload hints)
2. Add meta tags, Open Graph, and Twitter Card tags to index.html
3. Add JSON-LD structured data to index.html
4. Add robots.txt and sitemap.xml to public/
5. Fix favicon (proper .ico/.png in public/, update index.html link)
6. Add Content Security Policy meta tag

**Rationale:** These changes touch zero React code. They can be shipped as a single commit with very low risk. They deliver the majority of the SEO improvement.

### Phase 2: Semantic HTML & Accessibility (React component changes)
**Components:** index.jsx, child components

1. Replace `<p class="section-label"><span role="heading">` with actual `<h2>` elements
2. Add proper heading hierarchy (h1 > h2 > h3)
3. Add aria-labelledby to sections
4. Add `<address>` to footer contact info
5. Fix placeholder `href="#"` links (either real URLs or remove)
6. Audit and improve all alt text

**Rationale:** Semantic HTML improves both accessibility scores and SEO signals. Groups naturally because it is all about HTML structure in React components.

### Phase 3: Runtime Performance (React behavior changes)
**Components:** index.jsx, FadeIn.jsx, ToolsMarquee.jsx, vite.config.js

1. Lazy-load Cal.com embed on CTA click instead of page mount
2. Add explicit width/height to all `<img>` elements
3. Add image optimization Vite plugin (vite-plugin-image-optimizer or vite-plugin-imagemin)
4. Audit FadeIn for CLS impact
5. Fix known bugs (empty Planhat SVG, banner link, tooltip overflow)

**Rationale:** These require behavioral changes to React components. They affect Core Web Vitals (LCP, CLS, TBT). Grouping them allows a single Lighthouse audit pass to validate all improvements.

### Dependency Graph

```
Phase 1 (Static Foundation)
    |
    +-- No dependency on Phase 2 or 3
    |
Phase 2 (Semantic HTML)
    |
    +-- No dependency on Phase 1 or 3
    |
Phase 3 (Runtime Performance)
    |
    +-- No dependency on Phase 1 or 2
    |
    +-- Bug fixes are independent but grouped here for convenience
```

All three phases are independent. The ordering reflects value delivery priority, not technical dependency.

## Sources

- Analysis of existing codebase (direct inspection, HIGH confidence)
- Google's documentation on JavaScript SEO and rendering (training data, MEDIUM confidence -- Google does execute JS in Chromium for indexing, but with delays)
- Core Web Vitals metrics: LCP, CLS, FID/INP (training data, HIGH confidence -- well-established standards)
- Vite plugin ecosystem for image optimization (training data, MEDIUM confidence -- plugin names and APIs may have changed; verify `vite-plugin-image-optimizer` availability at implementation time)
- JSON-LD structured data schema (training data, HIGH confidence -- schema.org is stable)
- Font self-hosting patterns (training data, HIGH confidence -- well-established technique)
