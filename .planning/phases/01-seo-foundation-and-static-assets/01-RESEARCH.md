# Phase 1: SEO Foundation and Static Assets - Research

**Researched:** 2026-03-05
**Domain:** SEO metadata, self-hosted fonts, static crawl infrastructure, bug fixes
**Confidence:** HIGH

## Summary

This phase is entirely about static HTML changes to `index.html`, adding files to `public/`, and modifying `src/styles/global.css` to replace Google Fonts with self-hosted WOFF2 files. No React component logic changes are needed except removing the Planhat logo from the data/content arrays and updating the banner link.

The site is a single-page React SPA deployed to GitHub Pages at `https://[username].github.io/website/`. Vite's `base: "/website/"` config means all asset paths are prefixed with `/website/`. Static files in `public/` are copied as-is to `dist/` root -- so `public/robots.txt` becomes accessible at `/website/robots.txt` on GitHub Pages.

**Primary recommendation:** Use fontsource npm packages for font self-hosting (simpler than manual WOFF2 download), write all SEO tags and JSON-LD directly in `index.html`, and create static `sitemap.xml` and `robots.txt` files in `public/`.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Page title: "A2 Labs -- iPaaS Automation & Workflow Consulting"
- Canonical URL: GitHub Pages URL (https://[username].github.io/website/)
- OG image: Create a branded card image (static PNG/JPG with A2 Labs logo, tagline, brand colors) -- place in `public/`
- Structured data: Organization schema ONLY (not ProfessionalService, not FAQPage)
- Organization details: company name, logo, website URL, email (hello@a2labs.io), plus social profile links (LinkedIn, Discord, Telegram, Slack) once real URLs exist
- Banner "click here" link: Point to a real URL -- TBD (planner should leave a placeholder or prompt for URL during execution)
- Planhat logo: Remove from logo grid entirely
- Footer placeholder links: Deferred to Phase 2 (HTML-02)
- Font files must use `font-display: swap` and WOFF2 format only

### Claude's Discretion
- Meta description copy (keyword-optimized)
- Font self-hosting approach (fontsource vs manual WOFF2)
- OG image design details (layout, exact colors)
- robots.txt configuration
- Resource hints (preload fonts, preconnect Cal.com)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Complete meta tags (title, description, canonical URL) in static index.html | Meta tag patterns documented in Code Examples section |
| SEO-02 | Open Graph and Twitter Card tags for rich social sharing previews | OG/Twitter tag patterns in Code Examples; OG image guidance in Architecture |
| SEO-03 | JSON-LD structured data (Organization schema only per user decision) | Organization JSON-LD template in Code Examples |
| SEO-04 | sitemap.xml and robots.txt in public directory | Static file approach in Architecture Patterns |
| SEO-05 | Favicon loads correctly on GitHub Pages (no 404) | Favicon path fix documented in Common Pitfalls |
| PERF-01 | Fonts (DM Sans, DM Mono) self-hosted as WOFF2 with font-display: swap | Font strategy in Standard Stack and Architecture Patterns |
| PERF-02 | Google Fonts CDN links and preconnects removed | Removal checklist in Architecture Patterns |
| PERF-06 | Resource hints added (preload fonts, preconnect Cal.com) | Resource hint patterns in Code Examples |
| BUG-01 | Banner "click here" link points to real destination or is removed | Banner fix in Architecture Patterns |
| BUG-02 | Empty Planhat logo SVG is fixed or removed | Planhat removal approach in Architecture Patterns (note: SVG is 3.8KB, not actually empty -- user still wants it removed) |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @fontsource/dm-sans | 5.2.6 | Self-host DM Sans font (WOFF2 + CSS) | Eliminates Google Fonts CDN; version-locked; automatic @font-face |
| @fontsource/dm-mono | 5.2.7 | Self-host DM Mono font (WOFF2 + CSS) | Same benefits; consistent approach |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| fontsource packages | Manual WOFF2 in public/fonts/ | More control over file placement but requires manual @font-face declarations, manual WOFF2 sourcing from google-webfonts-helper, and manual updates |

**Font approach recommendation:** Use fontsource packages. They are imported in `src/main.jsx` (or `global.css` via `@import`), and Vite handles the rest -- emitting WOFF2 files with content hashes into `dist/assets/`. This is simpler and more maintainable than manually downloading and placing WOFF2 files. The CONTEXT.md concern about "Vite base64 inlining" applies to small files in `src/assets/` below `assetsInlineLimit` (default 4KB), NOT to font files from node_modules which are always emitted as separate files.

**However**, if the planner prefers manual WOFF2 placement in `public/fonts/` (as mentioned in CONTEXT.md), the alternative is viable -- download WOFF2 files from google-webfonts-helper, place in `public/fonts/`, write `@font-face` declarations in `global.css` with paths like `/website/fonts/DMSans-Regular.woff2`.

**Installation:**
```bash
npm install @fontsource/dm-sans @fontsource/dm-mono
```

## Architecture Patterns

### Files Modified/Created
```
index.html              # ADD: meta tags, OG tags, Twitter Card tags, JSON-LD script, favicon fix, resource hints
                        # REMOVE: Google Fonts preconnect + stylesheet links
public/
├── robots.txt          # NEW: crawl directives
├── sitemap.xml         # NEW: single-page sitemap
└── og-image.png        # NEW: branded social sharing image (1200x630)
src/
├── main.jsx            # ADD: fontsource imports (if fontsource approach)
├── styles/global.css   # MODIFY: remove Google Fonts dependency, add @font-face (if manual approach)
├── data/content.js     # MODIFY: remove Planhat from LOGOS array
├── components/ToolsMarquee.jsx  # MODIFY: remove Planhat import and entry
└── index.jsx           # MODIFY: banner link href
```

### Pattern 1: SEO Meta Tags in Vite index.html
**What:** All meta tags go directly in the static `index.html` `<head>`, not injected by React
**When to use:** Always for SPAs that need crawler-visible metadata
**Why:** Search engine crawlers see the raw HTML before JavaScript executes. React-injected meta tags are invisible to most crawlers (except Googlebot which does JS rendering, but with delays).

### Pattern 2: Static sitemap.xml and robots.txt
**What:** Hand-written static files in `public/` directory
**When to use:** Single-page sites with no dynamic routes
**Why:** No need for a sitemap generator plugin when there's exactly one page. Vite copies `public/` contents to `dist/` root. On GitHub Pages with `base: "/website/"`, these become accessible at `/website/robots.txt` and `/website/sitemap.xml`.

### Pattern 3: Favicon Path Fix
**What:** Current `index.html` has `<link rel="icon" href="/frog.gif">` but the file is at `public/frog.gif`. On GitHub Pages with base `/website/`, the correct href should include the base path.
**Fix:** Vite resolves paths in `index.html` relative to `base` automatically. The correct approach is to keep `href="/frog.gif"` and Vite will transform it to `/website/frog.gif` during build. However, if the current deployment shows a 404, the issue may be that `frog.gif` exists in both `public/` and is imported in `src/assets/`. Check: `public/frog.gif` exists (confirmed). The href `/frog.gif` should work because Vite transforms it. If not working, use `href="/website/frog.gif"` explicitly or `href="<%= BASE_URL %>frog.gif"` -- but Vite doesn't support EJS. The safest approach: since `base` is set in vite.config.js, Vite DOES transform `href="/frog.gif"` to `href="/website/frog.gif"` in the built HTML. Verify this works after build.

### Pattern 4: Fontsource Integration with Vite
**What:** Import fontsource CSS in JavaScript entry point
**Example:**
```javascript
// src/main.jsx - add these imports at the top
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
```
**Result:** Vite extracts the CSS into the bundle and copies WOFF2 files to `dist/assets/`. The `font-family` names remain `'DM Sans'` and `'DM Mono'` -- no CSS changes needed in `global.css`.

### Pattern 5: Google Fonts Removal Checklist
Remove from `index.html`:
1. `<link rel="preconnect" href="https://fonts.googleapis.com" />`
2. `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`
3. `<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" />`

No references to Google Fonts exist in `src/` files (verified by grep).

### Pattern 6: Planhat Logo Removal
Remove from two files:
1. `src/data/content.js`: Remove `import planhat` (line 2) and the `{ src: planhat, alt: "Planhat", dot: false }` entry (line 20)
2. `src/components/ToolsMarquee.jsx`: Remove `import planhat` (line 2) and the `{ src: planhat, alt: "Planhat" }` entry (line 16)
3. Optionally delete `src/assets/planhat-logo.svg` (note: file is 3.8KB with valid SVG content, not actually 0 bytes as previously reported)

### Anti-Patterns to Avoid
- **React Helmet for meta tags in an SPA:** Adds bundle size and complexity for tags that should be static HTML. Only use Helmet if you have client-side routing with different meta per route.
- **Dynamic sitemap generation for a single-page site:** Over-engineering. A static XML file is correct here.
- **Putting fonts in src/assets/:** Vite may base64-inline files under 4KB threshold. Font files from fontsource node_modules are NOT subject to this.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font self-hosting | Manual @font-face + WOFF2 sourcing | @fontsource/dm-sans, @fontsource/dm-mono | Handles subsetting, format selection, CSS generation; version-locked via npm |
| JSON-LD validation | Manual JSON construction | Google Rich Results Test (online tool) | Validates against Google's actual parser, catches issues automated tools miss |
| OG image | Complex dynamic generation | Static PNG/JPG created once | Single-page site with fixed content; dynamic OG images are for sites with many pages |

## Common Pitfalls

### Pitfall 1: GitHub Pages Base Path in URLs
**What goes wrong:** Canonical URLs, sitemap URLs, and OG image URLs omit the `/website/` base path, causing 404s or incorrect metadata.
**Why it happens:** Easy to forget the base path when hardcoding absolute URLs.
**How to avoid:** All absolute URLs in meta tags must include the base path: `https://[username].github.io/website/`. The OG image URL must be absolute: `https://[username].github.io/website/og-image.png`.
**Warning signs:** Facebook Sharing Debugger shows broken image; canonical URL doesn't match deployed URL.

### Pitfall 2: Favicon 404 on GitHub Pages
**What goes wrong:** The favicon href `/frog.gif` resolves to `https://[username].github.io/frog.gif` instead of `https://[username].github.io/website/frog.gif`.
**Why it happens:** Vite transforms paths in index.html during build, but if the path isn't recognized as an asset reference, it won't be transformed.
**How to avoid:** Verify after `npm run build` that the favicon link in `dist/index.html` has been transformed to include `/website/`. If not, hardcode it.
**Warning signs:** 404 in browser DevTools Network tab for favicon.

### Pitfall 3: Font-display Missing
**What goes wrong:** Flash of invisible text (FOIT) while fonts load.
**Why it happens:** Default browser behavior hides text until font loads.
**How to avoid:** Fontsource includes `font-display: swap` by default in its generated CSS. If using manual @font-face, explicitly add `font-display: swap`.
**Warning signs:** Text appears to "pop in" on slow connections.

### Pitfall 4: OG Image Wrong Size
**What goes wrong:** Social platforms crop the image awkwardly or show a tiny thumbnail.
**Why it happens:** OG images should be exactly 1200x630 pixels for optimal display.
**How to avoid:** Create the OG image at exactly 1200x630px. Use PNG or JPG (not SVG -- social platforms don't render SVG).
**Warning signs:** Facebook Sharing Debugger shows warning about image dimensions.

### Pitfall 5: Missing og:url causes duplicate content signals
**What goes wrong:** Social platforms treat shared links as different pages.
**Why it happens:** Without `og:url`, the platform uses the shared URL as-is (with query params, trailing slashes, etc.).
**How to avoid:** Always include `<meta property="og:url" content="https://[username].github.io/website/" />`.

## Code Examples

### Complete Meta Tags Block (SEO-01, SEO-02)
```html
<!-- Place in <head> of index.html, replacing existing meta description -->

<!-- Basic SEO -->
<title>A2 Labs — iPaaS Automation & Workflow Consulting</title>
<meta name="description" content="A2 Labs builds workflow automations for founders and teams using Make.com, n8n, and custom iPaaS integrations. Eliminate repetitive work and connect your tools." />
<link rel="canonical" href="https://[username].github.io/website/" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="A2 Labs — iPaaS Automation & Workflow Consulting" />
<meta property="og:description" content="Workflow automation consulting for founders and teams. We connect your tools and eliminate repetitive work using Make.com, n8n, and custom integrations." />
<meta property="og:url" content="https://[username].github.io/website/" />
<meta property="og:image" content="https://[username].github.io/website/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="A2 Labs" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="A2 Labs — iPaaS Automation & Workflow Consulting" />
<meta name="twitter:description" content="Workflow automation consulting for founders and teams. We connect your tools and eliminate repetitive work." />
<meta name="twitter:image" content="https://[username].github.io/website/og-image.png" />
```

### JSON-LD Organization Schema (SEO-03)
```html
<!-- Place before closing </head> in index.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "A2 Labs",
  "url": "https://[username].github.io/website/",
  "logo": "https://[username].github.io/website/og-image.png",
  "email": "hello@a2labs.io",
  "description": "iPaaS automation and workflow consulting for founders and teams.",
  "sameAs": []
}
</script>
```
Note: `sameAs` array is left empty for now. Social profile URLs (LinkedIn, Discord, Telegram, Slack) will be populated once footer links are fixed in Phase 2.

### robots.txt (SEO-04)
```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://[username].github.io/website/sitemap.xml
```

### sitemap.xml (SEO-04)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[username].github.io/website/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Resource Hints (PERF-06)
```html
<!-- Place early in <head>, after charset and viewport -->
<!-- Preconnect to Cal.com for embed -->
<link rel="preconnect" href="https://cal.com" crossorigin />

<!-- Font preloads (if using fontsource, preload the most critical font) -->
<!-- Note: exact paths depend on Vite's output hashing; may need to skip font preload
     with fontsource since paths are hashed. Alternative: preload via Vite's build config -->
```

### Fontsource Font Imports (PERF-01, PERF-02)
```javascript
// Add to src/main.jsx at the top, before other imports
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
```

### Manual Font Alternative (if fontsource is not preferred)
```css
/* Add to src/styles/global.css at the top, replacing Google Fonts import */
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/DMSans-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/DMSans-Medium.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/DMSans-SemiBold.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Mono';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/DMMono-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Mono';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/DMMono-Medium.woff2') format('woff2');
}
/* Note: paths use /fonts/ which Vite transforms to /website/fonts/ during build */
/* WOFF2 files must be downloaded and placed in public/fonts/ manually */
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Google Fonts CDN | Self-hosted via fontsource/npm | 2022+ | Eliminates render-blocking external request, improves LCP |
| Microdata/RDFa structured data | JSON-LD in script tag | 2020+ (Google preference) | Easier to maintain, doesn't intermingle with HTML |
| Multiple meta tag libraries (Helmet etc.) | Static HTML meta tags for SPAs | Always for single-page sites | Zero JS overhead, guaranteed crawler visibility |

## Open Questions

1. **GitHub username for canonical URLs**
   - What we know: Site deploys to `https://[username].github.io/website/`
   - What's unclear: The exact GitHub username to use in all absolute URLs
   - Recommendation: Planner should use a placeholder like `USERNAME` or extract from git remote during execution; alternatively check the existing GitHub Pages deployment URL

2. **Banner link destination (BUG-01)**
   - What we know: User wants it to point somewhere real; URL is TBD
   - What's unclear: What the link should point to
   - Recommendation: Planner should use a placeholder URL and flag for user input, or temporarily remove the link

3. **OG image creation**
   - What we know: Should be a branded card with A2 Labs logo, tagline, brand colors (1200x630px PNG/JPG)
   - What's unclear: Exact design, whether to generate programmatically or create manually
   - Recommendation: Create a simple branded image. Could use an HTML-to-image approach, or create a minimal SVG converted to PNG. The planner should scope this as a discrete task.

4. **Font preloading with fontsource**
   - What we know: Fontsource emits WOFF2 files with content-hashed names (e.g., `dm-sans-latin-400-normal-abc123.woff2`)
   - What's unclear: Whether preload links can be added in static HTML when filenames are hashed
   - Recommendation: Skip font preloading if using fontsource (fonts load fast from same origin anyway). If using manual approach, preloading is straightforward since filenames are predictable.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected -- no test infrastructure exists |
| Config file | None |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | Meta tags present in built HTML | smoke | `grep -c "og:title" dist/index.html` | N/A -- shell verification |
| SEO-02 | OG and Twitter tags in built HTML | smoke | `grep -c "twitter:card" dist/index.html` | N/A -- shell verification |
| SEO-03 | JSON-LD script block present | smoke | `grep -c "application/ld+json" dist/index.html` | N/A -- shell verification |
| SEO-04 | sitemap.xml and robots.txt exist in dist | smoke | `test -f dist/sitemap.xml && test -f dist/robots.txt` | N/A -- shell verification |
| SEO-05 | Favicon path includes /website/ base | smoke | `grep "website/frog.gif" dist/index.html` | N/A -- shell verification |
| PERF-01 | Fontsource CSS imported, WOFF2 in dist | smoke | `ls dist/assets/*.woff2` | N/A -- shell verification |
| PERF-02 | No Google Fonts references in dist | smoke | `! grep -r "googleapis" dist/index.html` | N/A -- shell verification |
| PERF-06 | Preconnect to Cal.com present | smoke | `grep "preconnect.*cal.com" dist/index.html` | N/A -- shell verification |
| BUG-01 | Banner link updated (not href="#") | smoke | `! grep 'href="#"' dist/index.html` (may need src check) | N/A -- source verification |
| BUG-02 | Planhat removed from content | smoke | `! grep -ri "planhat" src/data/content.js` | N/A -- source verification |

### Sampling Rate
- **Per task commit:** `npm run build` + shell grep verification commands above
- **Per wave merge:** Full build + all verification commands
- **Phase gate:** All grep checks pass on built `dist/` output

### Wave 0 Gaps
- No formal test framework needed for this phase -- all requirements are verifiable through build output inspection (grep on dist/ files)
- Consider adding a simple shell script that runs all verification commands if the planner wants automated checking

## Sources

### Primary (HIGH confidence)
- [@fontsource/dm-sans on npm](https://www.npmjs.com/package/@fontsource/dm-sans) - version 5.2.6, installation and usage
- [@fontsource/dm-mono on npm](https://www.npmjs.com/package/@fontsource/dm-mono) - version 5.2.7, installation and usage
- [Schema.org Organization type](https://schema.org/Organization) - official schema reference
- [Vite Static Asset Handling](https://vite.dev/guide/assets) - public directory behavior

### Secondary (MEDIUM confidence)
- [JSON-LD best practices 2025](https://www.seo-day.de/wiki/on-page-seo/html-optimierung/strukturierte-daten/json-ld.php?lang=en) - validation and content alignment guidance
- [JSON-LD Organization examples](https://jsonld.com/organization/) - schema template reference

### Tertiary (LOW confidence)
- Font preloading with hashed filenames -- based on Vite behavior knowledge, not verified against current Vite docs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - fontsource packages verified on npm with current versions
- Architecture: HIGH - all patterns verified against existing codebase and Vite documentation
- Pitfalls: HIGH - GitHub Pages base path issues are well-documented and verified against project's vite.config.js
- Code examples: MEDIUM - meta tag patterns are standard but exact GitHub username needs resolution

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (stable domain, no fast-moving dependencies)
