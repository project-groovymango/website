# Codebase Concerns

**Analysis Date:** 2026-03-05

## Tech Debt

**Monolithic Single-File App Component:**
- Issue: The entire page (hero, projects, how-it-works, team, FAQ, footer) lives in a single 279-line component at `src/index.jsx`. All state, layout, and section markup are coupled together in one default export.
- Files: `src/index.jsx`
- Impact: Adding new sections or modifying existing ones requires navigating a large file with interleaved concerns. Every change risks breaking unrelated sections.
- Fix approach: Extract each page section (Hero, Projects, HowItWorks, Team, Footer) into its own component under `src/components/`. Pass only necessary props (e.g., `calAttrs`, `setTooltip`) down or use context.

**Unused Component - StepTitle:**
- Issue: `StepTitle` is imported nowhere. It was likely used before the "How it works" toggle refactor and is now dead code.
- Files: `src/components/StepTitle.jsx`
- Impact: Minor -- adds confusion for developers exploring the codebase.
- Fix approach: Delete `src/components/StepTitle.jsx`.

**Inline Styles Throughout App:**
- Issue: Extensive use of inline `style={{...}}` props across `src/index.jsx` (logo-row flex layout, CTA button overrides, social-proof margins, FAQ logo spacing, footer button sizing). This duplicates and overrides CSS classes from `src/styles/global.css`.
- Files: `src/index.jsx` (lines 52-53, 71, 75, 195, 225, 265)
- Impact: Style changes require hunting through both CSS and JSX. Inline styles have highest specificity, making CSS refactors unpredictable.
- Fix approach: Move all inline styles into `src/styles/global.css` as proper classes. Use modifier classes (e.g., `.cta-primary--footer`) instead of inline overrides.

**Hardcoded Base Path:**
- Issue: `vite.config.js` hardcodes `base: "/website/"` which couples the build to a specific GitHub Pages repository name.
- Files: `vite.config.js`
- Impact: Deploying to a custom domain or different repo requires editing the config. The favicon path in `index.html` (`href="/frog.gif"`) does not use this base path and will 404 on GitHub Pages.
- Fix approach: Use an environment variable for the base path, or set it conditionally: `base: process.env.VITE_BASE || "/website/"`.

**Duplicate Logo Data:**
- Issue: Logo imports and data arrays are defined in both `src/data/content.js` (LOGOS array for hero grid) and `src/components/ToolsMarquee.jsx` (LOGOS array for marquee). The same SVG assets are imported independently in both files.
- Files: `src/data/content.js`, `src/components/ToolsMarquee.jsx`
- Impact: Adding a new tool logo requires updating two separate files. Easy to forget one, causing inconsistency.
- Fix approach: Centralize all logo imports and data in `src/data/content.js`. Have `ToolsMarquee.jsx` import from there.

## Known Bugs

**Favicon 404 on GitHub Pages:**
- Symptoms: Browser shows default favicon instead of `frog.gif` when deployed.
- Files: `index.html` (line 7)
- Trigger: Deploy to GitHub Pages where site is served from `/website/` subpath.
- Workaround: The favicon href is `/frog.gif` (absolute from root), but the site is hosted at `/website/`. Should be `%BASE_URL%frog.gif` or use a relative path.

**Banner Link Goes Nowhere:**
- Symptoms: The top banner "click here" link points to `href="#"` -- it scrolls to top instead of navigating anywhere.
- Files: `src/index.jsx` (line 44)
- Trigger: Click "click here" in the announcement banner.
- Workaround: None. The banner advertises "free automation blueprints" but the link is a placeholder.

**Footer Links Are All Placeholders:**
- Symptoms: Terms, Privacy Policy, About, Careers links all point to `href="#"`. Social media icons (Slack, LinkedIn, Discord, Telegram) all point to `href="#"`.
- Files: `src/index.jsx` (lines 245-257)
- Trigger: Click any footer link.
- Workaround: None. These are dead links that give a broken impression.

**Planhat Logo SVG Is Empty (0 bytes):**
- Symptoms: The Planhat logo renders as an invisible/broken image in the hero logo grid.
- Files: `src/assets/planhat-logo.svg` (0 bytes)
- Trigger: View the logo grid on the homepage.
- Workaround: None. The file exists but contains no SVG data.

**Tooltip Positioned Off-Screen on Small Viewports:**
- Symptoms: The tooltip follows mouse position with a fixed +16px offset. On narrow screens or when hovering near the right/bottom edge, the 260px-wide tooltip overflows the viewport.
- Files: `src/components/Tooltip.jsx` (line 16), `src/styles/global.css` (line 91, `width: 260px`)
- Trigger: Hover over a logo with a case study dot near the right edge of the screen.
- Workaround: None.

**case-more Max Height Truncation:**
- Symptoms: The hidden case studies expand/collapse with `max-height: 600px` CSS transition. If more hidden items are added and their combined height exceeds 600px, content will be clipped.
- Files: `src/styles/global.css` (line 111)
- Trigger: Add more than ~4-5 hidden case studies.
- Workaround: Increase the `max-height` value or use JavaScript-driven height calculation.

## Security Considerations

**No Content Security Policy:**
- Risk: No CSP headers or meta tags. The site loads external resources (Google Fonts, Cal.com embed script) without restriction.
- Files: `index.html`
- Current mitigation: None.
- Recommendations: Add a CSP meta tag or configure CSP headers at the hosting level. At minimum restrict `script-src` and `connect-src` to known origins (self, cal.com, fonts.googleapis.com).

**External Script Injection via Cal.com Embed:**
- Risk: The Cal.com embed (`@calcom/embed-react`) dynamically loads and executes third-party JavaScript. If Cal.com is compromised, the embed could inject malicious code.
- Files: `src/index.jsx` (lines 27-33)
- Current mitigation: The package is loaded from npm (version-locked in `package-lock.json`), but the embed itself fetches runtime scripts from Cal.com's servers.
- Recommendations: Pin the Cal.com embed version explicitly. Monitor for supply chain advisories. Consider Subresource Integrity if moving to a CDN-hosted approach.

**Email Address Exposed in Source:**
- Risk: `hello@a2labs.io` is hardcoded in the footer HTML, making it trivially scrapable by bots for spam.
- Files: `src/index.jsx` (line 261)
- Current mitigation: None.
- Recommendations: Low severity for a business site -- this is standard practice. Optionally obfuscate with JavaScript rendering or a contact form.

## Performance Bottlenecks

**Large GIF Asset:**
- Problem: `frog.gif` is 49KB and used twice (header logo + footer). GIFs are inefficient for animation compared to modern formats.
- Files: `src/assets/frog.gif`
- Cause: GIF format lacks modern compression. The file is imported and rendered at two different sizes (48px and 96px) but the same full-size file is used.
- Improvement path: Convert to WebP/AVIF animation or use CSS animation. Provide size-appropriate variants.

**Google Fonts Render-Blocking:**
- Problem: Two font families (DM Sans and DM Mono) are loaded via Google Fonts stylesheet in `<head>`, which blocks first paint until fonts are downloaded.
- Files: `index.html` (lines 9-11)
- Cause: Standard `<link>` tag for Google Fonts blocks rendering.
- Improvement path: Add `font-display: swap` by appending `&display=swap` to the URL (already present). Consider self-hosting the fonts to eliminate the external dependency and DNS lookup. The `preconnect` hints help but don't eliminate the render-blocking nature.

**No Image Optimization Pipeline:**
- Problem: Images are served as-is from `src/assets/`. No build-time optimization, resizing, or format conversion.
- Files: All files in `src/assets/`
- Cause: Vite bundles assets but does not optimize images by default.
- Improvement path: Add `vite-plugin-imagemin` or similar. Use `<picture>` with WebP/AVIF sources.

**Tooltip Mousemove Listener Active When Not Needed:**
- Problem: When a tooltip is visible, a `mousemove` event listener fires on every pixel movement, calling `setPos()` each time, triggering React re-renders.
- Files: `src/components/Tooltip.jsx` (lines 6-11)
- Cause: No throttling or RAF batching on the mousemove handler.
- Improvement path: Throttle the mousemove handler with `requestAnimationFrame` or a ~16ms debounce. Alternatively, use CSS `transform: translate()` with a ref instead of React state to avoid re-renders.

## Fragile Areas

**Cal.com Embed Integration:**
- Files: `src/index.jsx` (lines 15-19, 27-33, 71, 195, 264)
- Why fragile: The Cal.com integration uses data attributes spread across multiple buttons (`{...calAttrs}`) and a dynamic import with chained promises. The namespace `"30min"` and link `"amin-laanaya-b5k6ne/30min"` are hardcoded strings. If the Cal.com API changes or the link slug changes, all booking CTAs silently break with no error indication.
- Safe modification: Change `CAL_LINK` in `src/data/content.js` to update the booking link. Do not change the namespace without updating both `calAttrs` and the `useEffect` initializer.
- Test coverage: None. No tests exist in this project.

**Single Global CSS File:**
- Files: `src/styles/global.css`
- Why fragile: All 147 lines of CSS are in one file with no scoping. Class names like `.step`, `.case-row`, `.toggle-btn` are generic and could collide if any third-party CSS is introduced. CSS changes have unpredictable blast radius since there is no component-level scoping.
- Safe modification: Search for the class name across both `global.css` and all JSX files before changing any style.
- Test coverage: None. No visual regression testing.

## Scaling Limits

**Static Site / Single Page:**
- Current capacity: Single marketing page with ~5 sections.
- Limit: Adding more pages (blog, case study details, pricing) requires either a router setup or separate HTML files -- neither exists currently.
- Scaling path: Add `react-router-dom` for multi-page support, or migrate to a framework with routing built in (Next.js, Astro).

**Content Hardcoded in Source:**
- Current capacity: All content (case studies, FAQ items, team info) is hardcoded in `src/data/content.js` and `src/index.jsx`.
- Limit: Non-technical team members cannot update content without modifying source code and redeploying.
- Scaling path: Move content to a headless CMS (Contentful, Sanity) or at minimum to JSON files fetched at build time.

## Dependencies at Risk

**Outdated Vite and React Versions:**
- Risk: `vite@^4.4.0` is two major versions behind (current is v6.x). `react@^18.2.0` is behind React 19. `@vitejs/plugin-react@^4.0.0` may also need updating.
- Impact: Missing security patches, performance improvements, and modern features. Increasing difficulty to upgrade as time passes.
- Migration plan: Update to Vite 6.x (check migration guide for breaking changes). React 18 is still supported but should track React 19 readiness.

**Cal.com Embed Dependency:**
- Risk: `@calcom/embed-react@^1.5.3` uses a caret range, allowing minor/patch updates that could introduce breaking changes. The embed loads runtime code from Cal.com servers regardless of npm version.
- Impact: Booking functionality could break silently after an npm install.
- Migration plan: Pin to an exact version in `package.json`. Test booking flow after any dependency update.

## Missing Critical Features

**No Testing Infrastructure:**
- Problem: Zero test files, no test framework configured, no test script in `package.json`.
- Blocks: Cannot verify that changes don't break existing functionality. No CI gate for regressions.

**No Linting or Formatting:**
- Problem: No ESLint, Prettier, or any code quality tooling configured.
- Blocks: Inconsistent code style across contributions. No automated detection of common errors.

**No Error Boundary:**
- Problem: No React Error Boundary wrapping the app. If any component throws during render, the entire page goes white.
- Blocks: Users see a blank page with no recovery path on runtime errors.

**No SEO / Open Graph Tags:**
- Problem: `index.html` has a basic `<meta description>` but no Open Graph, Twitter Card, or structured data tags.
- Blocks: Social media link previews show generic or missing information when the site URL is shared.

**No 404 / Error Page:**
- Problem: GitHub Pages serves a generic 404 for any non-root path. No custom 404.html is generated.
- Blocks: Users who navigate to invalid paths see the GitHub Pages default error page.

## Test Coverage Gaps

**Entire Application Untested:**
- What's not tested: Every component, every data file, every user interaction (FAQ toggle, show-more, tooltip, Cal.com booking, marquee animation).
- Files: All files under `src/`
- Risk: Any change could introduce regressions with zero automated detection. The Cal.com integration, tooltip positioning, and FAQ accordion are particularly risky to modify without tests.
- Priority: High. At minimum, add smoke tests that verify the app renders without crashing, and interaction tests for the FAQ and show-more toggles.

---

*Concerns audit: 2026-03-05*
