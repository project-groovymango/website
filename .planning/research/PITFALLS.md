# Domain Pitfalls

**Domain:** React SPA performance and SEO optimization on static hosting (GitHub Pages)
**Project:** A2 Labs Website
**Researched:** 2026-03-05

## Critical Pitfalls

Mistakes that cause rewrites, failed SEO outcomes, or wasted effort.

### Pitfall 1: Treating Meta Tags as a Complete SEO Solution for a Client-Rendered SPA

**What goes wrong:** Teams add `<meta>` description, Open Graph tags, and structured data to `index.html`, then assume SEO is handled. But Google's crawler has limited JavaScript rendering capacity. For a single-page site this matters less than a multi-page SPA, but the real problem is that social media crawlers (Facebook, LinkedIn, Twitter) do NOT execute JavaScript at all. Open Graph tags injected by React at runtime are invisible to them. The site will share as a blank card on LinkedIn and Twitter -- catastrophic for an agency trying to generate leads.

**Why it happens:** Developers conflate "Google can render JavaScript" with "all crawlers render JavaScript." Google does render JS, but with delays (seconds-to-weeks crawl queue), lower priority, and a rendering budget. Social crawlers never render JS.

**Consequences:**
- Social sharing shows no preview image, title, or description -- kills referral traffic
- Google may index the page but with delayed content discovery
- Structured data added via React is invisible to most rich-snippet validators

**Prevention:**
- All meta tags (title, description, Open Graph, Twitter Card, structured data) MUST be in the static `index.html`, not injected by React
- Since this is a single-page site, this is straightforward -- there is only one page to configure
- Use `react-helmet-async` only if you later add client-side routing; for now, raw HTML meta tags are superior
- Test with Facebook Sharing Debugger and Twitter Card Validator before considering SEO "done"

**Detection (warning signs):**
- Sharing the URL on Slack/LinkedIn/Twitter shows no preview card
- Google Search Console shows "Discovered - currently not indexed" status
- `curl` of the page shows an empty `<div id="root"></div>` with no meta content

**Phase relevance:** Must be addressed in the very first SEO phase. All static meta tags in `index.html` before any React-side SEO work.

---

### Pitfall 2: Prerendering Complexity Rabbit Hole

**What goes wrong:** Teams discover that client-rendered SPAs have SEO limitations and immediately reach for prerendering solutions (react-snap, prerender-spa-plugin, Puppeteer-based build steps). These tools are brittle, poorly maintained, and frequently break on sites that use dynamic imports, IntersectionObserver, or third-party embed scripts (like Cal.com). The A2 Labs site uses all three.

**Why it happens:** "Just prerender it" sounds simple. In practice, headless Chrome in CI has timing issues, Cal.com embed scripts fail in headless mode, IntersectionObserver-based FadeIn components render in their hidden state, and build times balloon.

**Consequences:**
- Prerendered HTML shows sections in `opacity: 0` (FadeIn components captured before intersection)
- Cal.com embed throws errors during prerender, causing build failures or broken HTML
- Flaky CI -- builds pass locally but fail in GitHub Actions due to Chrome/Puppeteer environment differences
- Hours spent debugging prerender edge cases instead of shipping actual improvements

**Prevention:**
- For a SINGLE-PAGE marketing site, prerendering is overkill. The entire meaningful content is static text that belongs in `index.html`
- Instead: put all SEO-critical content (structured data, meta tags, canonical URL) directly in the HTML file
- If prerendering is truly needed later (multi-page), use `vite-plugin-ssr` or migrate to Astro -- not bolt-on prerenderers
- Accept that Google renders JavaScript adequately for a single page; focus on what Google CANNOT get from JS (social crawlers, speed)

**Detection:**
- Build step takes > 30 seconds (Puppeteer launching)
- CI failures mentioning "Navigation timeout" or "Protocol error"
- Prerendered HTML contains `opacity: 0` elements or missing dynamic content

**Phase relevance:** Decide against prerendering early (Phase 1). If it surfaces as a "nice to have" later, it belongs in a separate milestone.

---

### Pitfall 3: Self-Hosting Fonts Incorrectly (Performance Regression)

**What goes wrong:** The project plan correctly identifies Google Fonts as render-blocking. But the common fix -- downloading font files and serving them locally -- often makes things WORSE when done incorrectly. Teams download all weights/styles, serve WOFF (not WOFF2), skip `font-display: swap`, or add fonts to the Vite bundle (which inlines them as base64 in CSS, bloating the critical path).

**Why it happens:** Google Fonts CDN does a lot of invisible optimization: it serves the smallest format for the browser, subsets to used character ranges, and sets aggressive cache headers. Naive self-hosting loses all of this.

**Consequences:**
- Larger font file downloads (WOFF vs WOFF2, full charset vs subset)
- Flash of invisible text (FOIT) if `font-display: swap` is missing
- Base64-inlined fonts in CSS make the critical CSS bundle 200-400KB larger
- Worse Lighthouse score than the Google Fonts CDN version

**Prevention:**
- Use `google-webfonts-helper` or `fontsource` to download WOFF2 files with proper subsetting
- Serve fonts from `/public/fonts/` (static directory), NOT from `src/assets/` (which Vite may inline)
- Always set `font-display: swap` on every `@font-face` declaration
- Only include the weights actually used: DM Sans 400, 500, 600 and DM Mono 400, 500
- Preload the primary font file with `<link rel="preload" as="font" type="font/woff2" crossorigin>`
- Measure before and after with WebPageTest, not just Lighthouse

**Detection:**
- CSS bundle size increases after "optimization"
- Network tab shows font files > 50KB each (likely not subsetted)
- FOIT visible on throttled connection (3G simulation)

**Phase relevance:** Performance phase. Implement immediately after meta tags. Test on 3G throttling.

---

### Pitfall 4: Ignoring the `/website/` Base Path in SEO Configuration

**What goes wrong:** The site is deployed to `username.github.io/website/`, not to the root domain. SEO configurations (canonical URLs, Open Graph URLs, sitemap.xml, structured data) that use absolute paths without the `/website/` prefix will point to non-existent pages. Crawlers follow these broken URLs and find 404s.

**Why it happens:** Vite's `base: "/website/"` handles asset paths in the build, but it does NOT rewrite content in `index.html` meta tags, `robots.txt`, or `sitemap.xml`. These are manually authored and easy to get wrong.

**Consequences:**
- Canonical URL points to wrong location -- Google may not index the page at all
- Open Graph URL is wrong -- social previews link to 404
- Sitemap references non-existent URLs -- Google Search Console reports errors
- Structured data has wrong `url` field -- rich snippets fail validation

**Prevention:**
- Define the full canonical URL once: `https://[username].github.io/website/`
- Use this exact URL in: canonical tag, og:url, sitemap.xml, structured data `url` fields
- If migrating to a custom domain later, update ALL of these simultaneously
- Add a redirect or 404.html with refresh to handle GitHub Pages SPA routing (even for a single page, this prevents 404 on direct sub-path access)

**Detection:**
- Google Search Console shows "Submitted URL not found (404)" errors
- Rich Results Test shows URL mismatch warnings
- Social sharing previews link to 404 pages

**Phase relevance:** SEO phase. Must be correct before submitting sitemap to Google Search Console.

---

### Pitfall 5: Image Optimization That Breaks the Build or Kills DX

**What goes wrong:** Teams add image optimization plugins (vite-plugin-imagemin, sharp-based transformers) that require native binary dependencies. These break in CI (GitHub Actions), require platform-specific builds, or have version conflicts. Alternatively, teams manually convert all images to WebP/AVIF but forget to provide fallbacks for older browsers or forget `width`/`height` attributes (causing layout shift).

**Why it happens:** The "optimize images" task seems simple but has hidden complexity around build tooling, format support, and responsive sizing.

**Consequences:**
- CI build failures due to missing native dependencies (sharp, libvips)
- CLS (Cumulative Layout Shift) from images without explicit dimensions -- kills Lighthouse score
- GIF (frog.gif) converted to static format loses animation -- breaks the brand element
- SVG logos already optimal; running them through image optimization corrupts them

**Prevention:**
- For THIS project (small asset count, ~15 files), optimize images manually before commit, not at build time
  - Use Squoosh (web app) for one-time compression of the photo and GIF
  - SVGs are already optimal; run them through SVGO once manually if needed
- Keep `frog.gif` as GIF (animated) -- do not convert to WebP (animated WebP support is inconsistent)
- Add explicit `width` and `height` attributes to ALL `<img>` tags to prevent CLS
- Use `loading="lazy"` on below-fold images (already done for team photo, add to marquee logos)
- Do NOT add build-time image optimization plugins -- the asset count does not justify the complexity

**Detection:**
- Lighthouse CLS score > 0.1
- Images in Network tab larger than 100KB (photo) or 500KB (GIF)
- CI failures mentioning "sharp", "libvips", or "node-gyp"

**Phase relevance:** Performance phase. Manual optimization before any build tooling changes.

---

## Moderate Pitfalls

### Pitfall 6: Structured Data Errors That Silently Fail

**What goes wrong:** Teams add JSON-LD structured data (Organization, LocalBusiness, Service) but with subtle errors: missing required fields, wrong `@type`, URL mismatches, or invalid date formats. Google silently ignores invalid structured data -- there is no runtime error, no console warning. The team assumes rich snippets will appear, waits weeks, and nothing happens.

**Prevention:**
- Validate ALL structured data with Google's Rich Results Test BEFORE deploying
- Use `Organization` type (not `LocalBusiness` unless there is a physical address)
- Include: name, url, logo, description, sameAs (social links when real URLs replace placeholders)
- Add `ProfessionalService` type for the automation consulting service
- Test with Schema.org validator as a secondary check

**Detection:**
- Rich Results Test shows errors or "not eligible for rich results"
- Google Search Console > Enhancements shows no structured data detected
- Months pass with no rich snippet appearance

**Phase relevance:** SEO phase. Validate before deployment.

---

### Pitfall 7: Cal.com Embed Destroying Lighthouse Performance Score

**What goes wrong:** The Cal.com embed (`@calcom/embed-react`) loads a significant amount of JavaScript (~150-200KB) and makes external network requests. If loaded eagerly, it blocks the main thread during initial page load, tanking Time to Interactive (TTI) and Total Blocking Time (TBT). The current code uses a dynamic `import()` in `useEffect` which is good, but the embed still initializes on every page load even though most users never click the CTA.

**Why it happens:** Cal.com's embed is designed for functionality, not performance. It preloads the booking modal to feel instant when clicked. This trades page load performance for interaction speed.

**Consequences:**
- 150-200KB additional JS parsed on every page load
- External requests to Cal.com API during page load
- TTI/TBT increase of 500ms+ on mobile devices
- Lighthouse Performance score drops 5-15 points

**Prevention:**
- Defer Cal.com initialization until user interaction: only call `getCalApi()` when a CTA button is clicked or hovered, not on page mount
- Remove the `useEffect` that eagerly loads the Cal.com embed
- Use `data-cal-link` attributes for direct links to Cal.com's hosted page as a fallback (faster, no JS required)
- Consider: link CTAs to `https://cal.com/[user]/30min` directly instead of embedding -- eliminates the JS entirely for users who do not click

**Detection:**
- Lighthouse shows `@calcom/embed-react` in "Reduce JavaScript execution time"
- Network tab shows Cal.com API requests during initial page load
- TBT > 200ms on mobile throttling

**Phase relevance:** Performance phase. Address after font optimization but before final Lighthouse audit.

---

### Pitfall 8: CSS Animation Performance (Marquee and Pulse Dot)

**What goes wrong:** The infinite marquee animation uses `transform: translateX()` which is GPU-accelerated (good), but the `will-change: transform` property is applied permanently. Combined with the `pulse` keyframe animation on multiple dots, this forces the browser to maintain GPU layers for these elements indefinitely, consuming memory on mobile devices. On low-end Android phones, this causes janky scrolling.

**Prevention:**
- Keep `will-change: transform` on the marquee (correct usage for continuous animation)
- Remove `will-change` from pulse dots (too many elements, and the animation is simple enough without it)
- Add `prefers-reduced-motion` media query to disable marquee and pulse animations for users who request it (also an accessibility requirement)
- Consider `animation-play-state: paused` when the marquee is not in viewport (IntersectionObserver)

**Detection:**
- Chrome DevTools > Rendering > "Layer borders" shows excessive layer count
- Janky scrolling on throttled CPU (4x slowdown)
- Accessibility audit flags missing `prefers-reduced-motion` handling

**Phase relevance:** Performance phase. Quick fix with high impact on accessibility scores.

---

### Pitfall 9: Content Security Policy Breaking the Cal.com Embed and Font Loading

**What goes wrong:** The project plan includes adding a Content Security Policy (CSP). A restrictive CSP will block the Cal.com embed (which loads scripts and iframes from `app.cal.com`), Google Fonts (if not fully migrated), and inline styles used throughout the JSX. The site breaks silently in production -- CSP violations appear only in the browser console, not as visible errors.

**Prevention:**
- Add CSP incrementally: start with `Content-Security-Policy-Report-Only` header to discover violations without breaking the site
- Required CSP directives for this site:
  - `script-src 'self' https://app.cal.com` (Cal.com embed)
  - `frame-src https://app.cal.com` (Cal.com booking modal)
  - `style-src 'self' 'unsafe-inline'` (inline styles in JSX -- unavoidable without major refactor)
  - `font-src 'self'` (after self-hosting fonts)
  - `img-src 'self' data:` (SVG data URIs from Vite)
- On GitHub Pages, CSP must be set via `<meta http-equiv>` tag (no server-side header control)
- Test the CSP in all browsers before removing `Report-Only`

**Detection:**
- Browser console shows `Refused to load` errors after CSP deployment
- Cal.com booking modal fails to open
- Fonts do not load (FOUT/FOIT regression)

**Phase relevance:** Should be the LAST step in the performance/SEO milestone. Everything else must be stable first.

---

## Minor Pitfalls

### Pitfall 10: Favicon 404 Due to Base Path

**What goes wrong:** The current `index.html` references `/frog.gif` as favicon, but the site is served from `/website/`. The correct path should be `/website/frog.gif` or use Vite's base-path-aware asset handling. Meanwhile, the frog.gif is also imported as a module in React for the logo display, creating two different references to the same file.

**Prevention:**
- Move the favicon reference to use Vite's public directory: place `frog.gif` in `/public/` and reference as `%BASE_URL%frog.gif` or hardcode `/website/frog.gif`
- Consider converting to a proper `.ico` or `.png` favicon for better browser compatibility (GIF favicons have inconsistent animation support)
- Also add `apple-touch-icon` and `manifest.json` for mobile bookmarking

**Detection:** 404 in Network tab for favicon request. Already a known bug.

**Phase relevance:** Bug fix phase (first phase).

---

### Pitfall 11: Placeholder Links Hurting SEO

**What goes wrong:** The site has multiple `href="#"` links: banner link, Terms, Privacy Policy, About, Careers, and social media links. Search engine crawlers follow these links and find they point to the same page. Excessive self-referencing anchor links can dilute crawl signals and look like thin content to crawlers.

**Prevention:**
- Remove links that have no destination yet -- replace with `<span>` or `<button>` elements styled as links
- For social links: add real URLs or remove the icons entirely (empty social links look worse than no social links)
- The banner "click here" link must either point to real content or the banner should be removed
- Add `rel="nofollow"` to any links that intentionally go nowhere during development

**Detection:**
- Google Search Console shows crawl issues with self-referencing URLs
- Lighthouse Accessibility audit flags links with no distinguishable purpose
- Manual review finds `href="#"` in source

**Phase relevance:** Bug fix / SEO phase. Quick cleanup before SEO launch.

---

### Pitfall 12: Semantic HTML Retrofitting That Breaks Existing Styles

**What goes wrong:** Improving SEO includes replacing `<div>` with semantic elements (`<section>`, `<article>`, `<nav>`, `<aside>`). Teams do a wholesale replacement and discover that CSS selectors, specificity, and default browser styles for semantic elements differ from `<div>`. The `<section>` element, for example, resets heading levels in some screen readers, and `<nav>` has default padding in some browsers.

**Prevention:**
- The current code already uses `<header>`, `<main>`, `<section>`, and `<footer>` -- good baseline
- Missing: `<nav>` (no navigation currently, acceptable for single-page), `<article>` for case studies
- Use `role="heading" aria-level="2"` approach already in use -- this is fine for screen readers, but actual `<h2>` tags would be better for SEO (search engines weight actual heading elements more than ARIA roles)
- Change incrementally: one section at a time, visual regression test after each change
- Add CSS reset for any new semantic elements used

**Detection:**
- Visual layout breaks after semantic HTML changes
- Lighthouse SEO audit shows "Document does not have a valid heading structure"
- Screen reader testing reveals unexpected heading hierarchy

**Phase relevance:** SEO phase. Low risk if done incrementally.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Bug fixes (favicon, links) | Base path `/website/` causes asset 404s | Test all asset URLs with the deployed base path before merging |
| Meta tags and Open Graph | Tags injected by React are invisible to social crawlers | Put ALL meta tags in static `index.html`, not in React components |
| Font self-hosting | Performance regression from incorrect implementation | Use WOFF2, subset, `font-display: swap`, serve from `/public/fonts/` |
| Image optimization | Build-time plugins break CI | Optimize manually for this small asset count, no build plugins |
| Structured data | Silent failures -- no runtime errors when invalid | Validate with Google Rich Results Test before every deployment |
| Cal.com embed | Eager loading tanks TTI/TBT scores | Defer initialization to user interaction (click/hover) |
| CSP implementation | Breaks Cal.com embed and inline styles | Use `Report-Only` mode first, add directives incrementally |
| Sitemap and robots.txt | Wrong base path URLs | Hardcode full absolute URLs including `/website/` prefix |
| Performance measurement | Testing only on fast machines gives false confidence | Always test on 4x CPU throttle + Fast 3G in DevTools |
| Heading structure | ARIA roles used instead of actual heading elements | Replace `<span role="heading">` with real `<h2>` tags for SEO value |

## Sources

- Confidence: MEDIUM-HIGH. Based on direct codebase analysis of the A2 Labs project combined with established domain knowledge of React SPA SEO constraints, GitHub Pages limitations, and Lighthouse scoring factors. Web search was unavailable for verification, so specific version numbers and tool recommendations should be validated against current documentation before implementation.
- Google Search Central documentation on JavaScript SEO (training data, not live-verified)
- Lighthouse scoring methodology for Core Web Vitals (training data)
- GitHub Pages documentation on static hosting constraints (training data)
- Vite documentation on base path and asset handling (training data)
