# Feature Landscape

**Domain:** High-performance SEO-optimized React SPA (agency/business site for iPaaS automation company)
**Researched:** 2026-03-05

## Table Stakes

Features users (and search engines) expect. Missing = poor rankings, slow loads, or lost conversions.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Meta tags (title, description, canonical) | Search engines need them for indexing; social platforms need them for previews. Currently only a basic `<title>` and `<meta description>` exist in `index.html`. | Low | Static site = hardcode in `index.html`. Add canonical URL. |
| Open Graph / Twitter Card tags | Social sharing on LinkedIn, Twitter, Slack renders a blank card without them. Agency sites get shared frequently. | Low | Add `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` to `index.html`. |
| Structured data (JSON-LD) | Google uses `Organization`, `LocalBusiness`, and `FAQPage` schema to generate rich results. FAQ schema is free real estate for an agency site with an FAQ section. | Low | Inject `<script type="application/ld+json">` in `index.html`. `FAQPage` schema directly maps to existing FAQ content. `Organization` schema for branding. |
| Self-hosted fonts | Google Fonts CDN causes render-blocking requests, DNS lookups to `fonts.googleapis.com` and `fonts.gstatic.com`. Current site has two `<link>` tags blocking render. | Medium | Download DM Sans and DM Mono WOFF2 files, add `@font-face` declarations with `font-display: swap`, remove Google Fonts `<link>` tags. |
| Image optimization | Unoptimized images are the number one Lighthouse performance killer. Current SVGs are fine, but `frog.gif` (animated logo) and `amin.webp` need attention. GIF is particularly heavy. | Medium | Compress images, add explicit `width`/`height` attributes to prevent CLS, use `loading="lazy"` on below-fold images (already on team photo). Convert GIF to WebP/AVIF animated format if possible. |
| Semantic HTML | Current site uses `<p className="section-label"><span role="heading">` instead of actual `<h2>` tags. Search engines weight heading hierarchy heavily. | Low | Replace `span[role=heading]` with actual `<h2>` elements. Ensure single `<h1>`, proper `<h2>`/`<h3>` hierarchy. Use `<article>` for case studies. |
| `sitemap.xml` | Search engines discover pages via sitemap. Even for a single-page site, a sitemap signals to crawlers that the URL is canonical. | Low | Generate a static `sitemap.xml` in `/public/` with the single URL. |
| `robots.txt` | Without it, crawlers may behave unpredictably. Signals professionalism. | Low | Simple `robots.txt` in `/public/` allowing all crawlers, pointing to sitemap. |
| Favicon that works | Current `<link rel="icon" href="/frog.gif">` 404s because the asset is in `src/assets/`, not at the root. Broken favicon = unprofessional in browser tabs. | Low | Move `frog.gif` to `/public/` or reference the Vite-processed path. Add `apple-touch-icon` for iOS. |
| Responsive image sizing | Images should have explicit `width` and `height` to prevent Cumulative Layout Shift (CLS). Most `<img>` tags in current code lack these. | Low | Add `width` and `height` attributes to all `<img>` elements. |
| Accessible link text | Current site has `<a href="#">` placeholder links throughout footer (Terms, Privacy, About, Careers, social links). Placeholder links hurt both UX and SEO. | Low | Either add real URLs or remove dead links. Dead links with `#` are an SEO anti-signal. |
| Minimal bundle size | Agency sites compete on speed. A client-side React SPA already has a JS-rendering penalty; the bundle must be lean. Currently only React + Cal.com embed as dependencies, which is good. | Low | Already lean. Ensure Cal.com embed is lazy-loaded (it is via dynamic `import()`). Tree-shake unused code. |

## Differentiators

Features that set the site apart from competing automation agencies. Not expected, but valued by visitors and search engines.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Pre-rendered HTML for crawlers | React SPAs serve empty `<div id="root">` to crawlers. Pre-rendering the page at build time gives search engines real HTML to index. This is the single biggest SEO win possible within the GitHub Pages constraint. | High | Use `vite-plugin-prerender` or `react-snap` to generate static HTML at build time. The HTML loads immediately, then React hydrates. Biggest complexity item in this milestone. |
| Content Security Policy (CSP) | Signals security maturity. Protects against XSS. Google may use security signals as ranking factors. Most agency competitors skip this. | Medium | Add CSP via `<meta http-equiv="Content-Security-Policy">` since GitHub Pages does not support custom headers. Must whitelist Cal.com domains. |
| Performance budget enforcement | Keeping Lighthouse 90+ over time, not just at launch. Most competitors degrade. | Medium | Add a Lighthouse CI step in GitHub Actions that fails the build if scores drop below threshold. |
| Niche keyword targeting | iPaaS automation is a specific niche. Most competitors have generic "automation agency" copy. Targeting "Make.com automation agency", "n8n consulting", "workflow automation" in title/headings/content gives a ranking edge. | Low | Audit current copy for keyword density. Current headings are clever/funny but not keyword-rich. The `<h1>` is just "a2labs" -- should include a keyword phrase. |
| Preload critical assets | Tells the browser to fetch key resources before it discovers them in CSS/JS. Reduces time to first meaningful paint. | Low | Add `<link rel="preload">` for self-hosted font files and hero image (frog.gif). |
| Resource hints | `dns-prefetch` and `preconnect` for third-party domains (Cal.com). Currently has preconnect for Google Fonts which should be removed when self-hosting. | Low | Add preconnect for `cal.com` domain. Remove Google Fonts preconnects after self-hosting fonts. |
| Error boundaries | React error boundaries prevent a single component crash from white-screening the entire page. Currently absent. | Low | Wrap major sections in `<ErrorBoundary>` components. Especially important around the Cal.com embed which loads third-party JS. |
| Inline critical CSS | Extract above-the-fold CSS and inline it in `<head>` to eliminate render-blocking stylesheet requests. | High | Requires build tooling changes. May not be worth the complexity for a single CSS file site. Consider only if Lighthouse FCP score remains low after other optimizations. |

## Anti-Features

Features to explicitly NOT build for this milestone.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| SSR / SSG framework migration (Next.js, Astro) | Project constraint: keep React + Vite. Migration would be a full rebuild, not a performance pass. The pre-rendering approach gets 80% of SSR's SEO benefit at 20% of the effort. | Use build-time pre-rendering with `vite-plugin-prerender` or `react-snap`. |
| Blog or content marketing pages | Out of scope per PROJECT.md. Content marketing is a separate milestone. Adding routing, markdown rendering, and content management is a rabbit hole. | Defer to future milestone. Current single-page structure is correct for now. |
| CMS integration | Content lives in `src/data/content.js`. Adding a headless CMS adds build complexity, API dependencies, and deployment issues for no immediate gain. | Keep content in source code. |
| Client-side routing (React Router) | Single page site does not need routing. Adding it creates SPA navigation issues, increases bundle size, and complicates pre-rendering. | Keep as single-page. Use anchor links for section navigation if needed. |
| Analytics / tracking scripts | Every analytics script hurts performance. Should be a deliberate post-optimization decision, not bundled with the performance milestone. | Add analytics only after performance targets are met, as a separate task. |
| Cookie consent banners | The site currently does not use cookies or tracking. Adding a consent banner for no reason hurts UX and page weight. | Only add if/when analytics or tracking is introduced. |
| Custom animations library | Current scroll-triggered `FadeIn` component is simple and works. Adding Framer Motion or GSAP significantly increases bundle size. | Keep the existing lightweight `FadeIn` implementation. |
| Service worker / PWA | Adds complexity. An agency marketing site does not benefit from offline capability. Service workers can cause caching bugs that are hard to debug. | Skip entirely. |
| Image CDN (Cloudinary, Imgix) | Overkill for 13 small assets. Adds third-party dependency and cost. | Optimize images at build time. The asset count is small enough to handle manually. |
| AMP pages | Google no longer gives AMP preferential ranking treatment. AMP constrains design and adds maintenance burden. | Ignore AMP entirely. |

## Feature Dependencies

```
Self-hosted fonts --> Remove Google Fonts preconnects --> Add resource hints for Cal.com
                                                     \
Semantic HTML --> Structured data (JSON-LD)            --> Pre-rendered HTML (needs clean HTML to pre-render)
             \                                        /
              --> Meta tags / Open Graph             /
                                                    /
Image optimization --> Responsive image sizing ----/
                                                  /
Favicon fix --> sitemap.xml + robots.txt --------/
                                                /
Fix placeholder links -------------------------/
```

Key dependency chain: **Pre-rendered HTML should be the LAST feature implemented** because it captures the final state of all other improvements. Pre-rendering dirty HTML with broken favicons and missing meta tags defeats the purpose.

Critical ordering:
1. Semantic HTML and meta tags first (the content crawlers will see)
2. Asset optimization (fonts, images, favicon) second (what affects load speed)
3. Structured data and resource hints third (enhancement layer)
4. Pre-rendering last (captures everything into static HTML)

## MVP Recommendation

Prioritize (highest impact, ordered by dependency):

1. **Semantic HTML cleanup** -- Replace `span[role=heading]` with real `<h2>` tags, fix heading hierarchy. Low effort, foundational for everything else.
2. **Meta tags + Open Graph** -- Complete meta tag set in `index.html`. Low effort, immediate SEO and social sharing impact.
3. **Self-hosted fonts** -- Download DM Sans/Mono WOFF2 files, inline `@font-face`, remove Google Fonts links. Medium effort, measurable Lighthouse improvement (eliminates render-blocking requests + 2 DNS lookups).
4. **Image optimization + explicit dimensions** -- Compress assets, add `width`/`height`, ensure `loading="lazy"` on below-fold images. Medium effort, directly impacts LCP and CLS scores.
5. **Favicon fix + sitemap.xml + robots.txt** -- Low effort, eliminates 404 error and completes basic SEO hygiene.
6. **Structured data (JSON-LD)** -- `FAQPage` + `Organization` schema. Low effort, enables rich results in Google.
7. **Fix placeholder links** -- Remove or populate `href="#"` links. Low effort, eliminates SEO anti-signals.
8. **Pre-rendered HTML** -- Build-time static HTML generation. High effort, but the single biggest SEO differentiator for a React SPA on GitHub Pages.
9. **Keyword optimization** -- Audit headings and copy for niche keywords. Low effort, compounds with all other SEO work.
10. **Resource hints + preloads** -- Fine-tuning for the last few Lighthouse points.

Defer:
- **Inline critical CSS**: Only pursue if Lighthouse FCP remains below target after items 1-10. High effort for marginal gain on a site with a single small CSS file.
- **CSP**: Important but does not affect Lighthouse or SEO scores. Add after performance targets are met.
- **Performance budget CI**: Add after baseline performance is established, not during initial optimization.
- **Error boundaries**: Good practice but does not affect performance or SEO. Add as cleanup.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table stakes features | HIGH | Standard SEO and performance best practices, well-established in the industry. Verified against current codebase state. |
| Differentiators | HIGH for pre-rendering, MEDIUM for others | Pre-rendering React SPAs at build time is a well-documented pattern. CSP via meta tag has limitations vs HTTP headers. |
| Anti-features | HIGH | Constraints clearly defined in PROJECT.md. Each exclusion has a clear rationale tied to project scope. |
| Dependencies/ordering | HIGH | Pre-rendering must come last; semantic HTML must come before structured data. These are logical dependencies. |
| Complexity estimates | MEDIUM | Pre-rendering complexity depends on Cal.com embed behavior during build. May need to handle dynamic imports specially. |

## Sources

- Current codebase analysis (index.html, index.jsx, vite.config.js, package.json, component structure)
- PROJECT.md constraints and requirements
- Google Search Central documentation on structured data (FAQPage, Organization schemas)
- Lighthouse scoring criteria (LCP, FID, CLS, FCP metrics)
- Web Vitals best practices for font loading (`font-display: swap`, self-hosting)
- Vite pre-rendering ecosystem (vite-plugin-prerender, react-snap patterns)
