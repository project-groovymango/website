# Technology Stack: SPA Performance & SEO Optimization

**Project:** A2 Labs Website
**Researched:** 2026-03-05
**Overall confidence:** MEDIUM (unable to verify all versions against live npm registry; recommendations based on training data through May 2025)

## Existing Stack (Do Not Change)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^18.2.0 | UI framework |
| React DOM | ^18.2.0 | DOM rendering |
| Vite | ^4.4.0 | Build tool |
| @vitejs/plugin-react | ^4.0.0 | React support for Vite |
| @calcom/embed-react | ^1.5.3 | Booking widget |

**Constraint:** No framework migration. No major version upgrades (per PROJECT.md out-of-scope). All recommendations work within Vite 4 + React 18 on GitHub Pages (static hosting only).

## Recommended Additions

### 1. Prerendering (Critical for SEO)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| vite-plugin-prerender | ^2.0.0 | Pre-renders SPA routes to static HTML at build time | GitHub Pages cannot do SSR. Prerendering is the only way to serve crawlable HTML to search engines from a static host. This plugin runs Puppeteer during `vite build` to capture rendered HTML. |

**Confidence:** MEDIUM -- This is the successor to `prerender-spa-plugin` rebuilt for Vite. Verify the exact package name and version on npm before installing. The older `prerender-spa-plugin` was webpack-only and is deprecated.

**Why not alternatives:**
- `react-snap` -- Abandoned (last publish ~2019), does not support Vite.
- `vite-ssg` -- Designed for Vue, not React.
- `vike` (formerly vite-plugin-ssr) -- Overkill; it is a full meta-framework. We only need to prerender a single page.
- Manual Puppeteer script -- `vite-plugin-prerender` wraps this cleanly; no need to DIY.

**Fallback if vite-plugin-prerender is unavailable or broken:** Write a small `postbuild.mjs` script that uses Puppeteer to load `dist/index.html` and write the rendered DOM back. This is ~30 lines of code and achieves the same result.

### 2. Meta Tags & Open Graph

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| react-helmet-async | ^2.0.0 | Manages `<head>` tags (title, meta, OG) from React components | Industry standard for React SPA head management. The "async" variant is the maintained fork of react-helmet, safe for concurrent React. |

**Confidence:** HIGH -- react-helmet-async is the de facto standard. Well-maintained, millions of weekly downloads.

**Why not alternatives:**
- `react-helmet` (original) -- Unmaintained, does not support React 18 concurrent features.
- `@unhead/react` -- Newer but much smaller ecosystem; unnecessary for a single-page site.
- Manual `document.head` manipulation -- Fragile, no SSR/prerender support, violates React patterns.

**Important note:** For a single-page site with no client-side routing, `react-helmet-async` is still valuable because the prerenderer will capture the head tags it sets into the static HTML. Without it, the prerendered HTML would have empty/default meta tags.

### 3. Structured Data (JSON-LD)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| No library needed | N/A | JSON-LD structured data for Google rich results | JSON-LD is just a `<script type="application/ld+json">` tag. No library needed for a single-page site -- hand-write the JSON for Organization, Service, and FAQ schemas. |

**Confidence:** HIGH -- Google's own documentation recommends inline JSON-LD. Libraries add complexity without benefit for a static site with known, fixed content.

**Type definitions (optional):**

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| schema-dts | ^1.1.0 | TypeScript types for Schema.org vocabulary | Only if using TypeScript. Provides autocomplete for JSON-LD objects. Skip if plain JS. |

### 4. Image Optimization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| sharp | ^0.33.0 | Build-time image conversion to WebP/AVIF and resizing | The industry-standard high-performance image processing library for Node.js. Use as a build script, not a Vite plugin, for maximum control. |
| vite-plugin-image-optimizer | ^1.1.0 | Automatic image optimization during Vite build | Wraps sharp/svgo into a Vite plugin for zero-config optimization. Alternative to a manual sharp script. |

**Confidence:** MEDIUM -- sharp version is well-known. The Vite plugin wrapper version should be verified.

**Approach:** Use `vite-plugin-image-optimizer` for simplicity. It handles:
- Converting PNG/JPG to WebP (70-80% size reduction)
- Optimizing SVGs via svgo
- Runs automatically during `vite build`

**Why not alternatives:**
- `vite-plugin-imagemin` -- Uses imagemin under the hood which has dependency/maintenance issues. Avoid.
- `@squoosh/lib` -- Google abandoned Squoosh. Dead project.
- Manual conversion -- Works but tedious; the plugin automates it.

**Note:** The `<picture>` element with `<source>` tags for format fallback should be implemented in React components. This is code, not a library.

### 5. Font Optimization

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| fontsource (e.g., @fontsource/inter) | ^5.0.0 | Self-hosted font packages | Eliminates render-blocking Google Fonts requests. Fonts are bundled into the build, served from same origin. Zero external DNS lookups. Each font family is a separate npm package. |

**Confidence:** HIGH -- Fontsource is the standard approach for self-hosting Google Fonts in JS projects. Well-maintained, covers all Google Fonts.

**Why not alternatives:**
- Google Fonts CDN -- Render-blocking, third-party dependency, privacy concerns, extra DNS lookup. This is what we are replacing.
- Manual download + @font-face -- Works but Fontsource handles subsetting, variable fonts, and CSS generation automatically.

### 6. Build Analysis & Performance Monitoring

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| rollup-plugin-visualizer | ^5.12.0 | Bundle size visualization | Identifies large dependencies. Vite uses Rollup under the hood, so this plugin works directly. Essential for finding bloat. |
| vite-plugin-compression | ^0.5.0 | Gzip/Brotli pre-compression of build output | GitHub Pages serves gzip but pre-compressing can help. Check if GitHub Pages respects pre-compressed files -- it may not, making this optional. |

**Confidence:** MEDIUM -- rollup-plugin-visualizer is well-established. The compression plugin's usefulness depends on GitHub Pages behavior (which serves its own gzip).

### 7. Sitemap & Robots

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| No library needed | N/A | sitemap.xml and robots.txt | For a single-page site, these are trivial static files. Write them by hand and place in `public/`. A library would be absurd overkill. |

**Confidence:** HIGH

## Alternatives Considered and Rejected

| Category | Recommended | Rejected | Why Rejected |
|----------|-------------|----------|-------------|
| Meta-framework | Stay with Vite SPA | Astro, Next.js, Remix | Out of scope -- constraint is no framework migration |
| Prerendering | vite-plugin-prerender | react-snap | react-snap is abandoned |
| Head management | react-helmet-async | react-helmet | Original is unmaintained |
| Image optimization | vite-plugin-image-optimizer | vite-plugin-imagemin | imagemin has dep issues |
| Fonts | @fontsource/* | Google Fonts CDN | Render-blocking, external dep |
| Structured data | Hand-written JSON-LD | react-schemaorg | Unnecessary abstraction for static content |
| CSS optimization | Vite built-in (CSS code splitting) | PurgeCSS | Vite already tree-shakes CSS with imports |
| Compression | Possibly vite-plugin-compression | N/A | GitHub Pages may not serve pre-compressed assets; test before committing |

## Things NOT to Install

| Library | Why Not |
|---------|---------|
| `prerender-spa-plugin` | Webpack-only, does not work with Vite |
| `react-snap` | Abandoned, last updated 2019 |
| `react-helmet` (original) | Unmaintained fork, use react-helmet-async |
| `@squoosh/lib` | Google abandoned it |
| `imagemin` / `vite-plugin-imagemin` | Dependency resolution problems, maintenance issues |
| `workbox` / Service Workers | Overkill for a marketing site; adds complexity without SEO benefit |
| `react-router` | Single page site, no routing needed |
| `redux` / state management | No complex state; React useState/context is sufficient |

## Installation Plan

```bash
# SEO & Meta
npm install react-helmet-async

# Image Optimization (dev dependency -- runs at build time only)
npm install -D vite-plugin-image-optimizer sharp svgo

# Font Self-Hosting (install whichever fonts the site currently uses from Google Fonts)
npm install @fontsource/inter  # Replace with actual font family used

# Prerendering (dev dependency)
npm install -D vite-plugin-prerender

# Bundle Analysis (dev dependency, optional)
npm install -D rollup-plugin-visualizer
```

## Configuration Notes

### Prerendering Setup
The prerenderer needs to know which routes to render. For a single-page site, this is just `['/website/']` (matching the Vite `base` path). Configure in `vite.config.js`.

### react-helmet-async Setup
Wrap `<App>` in `<HelmetProvider>`, then use `<Helmet>` component to set title, description, OG tags, canonical URL. The prerenderer will capture these into static HTML.

### Image Optimization
Configure `vite-plugin-image-optimizer` in `vite.config.js` with WebP output. Use `<picture>` elements in components for format fallback. Serve original formats to browsers that do not support WebP.

### Font Loading
Import fonts in the entry file (`main.jsx`). Fontsource packages support `display: swap` by default, preventing FOIT (Flash of Invisible Text).

## Version Verification Warning

**I was unable to verify package versions against the live npm registry during this research session.** All versions listed are based on training data (through May 2025). Before installing:

1. Run `npm view <package> version` to confirm latest versions
2. Check each package's npm page for maintenance status
3. Particularly verify `vite-plugin-prerender` -- this package name may have changed or a better alternative may exist by March 2026

## Sources

- Training data knowledge (May 2025 cutoff) -- versions should be verified
- Project analysis: `package.json`, `vite.config.js`, `.planning/PROJECT.md`
- React Helmet Async: well-established, HIGH confidence in recommendation
- Fontsource: well-established, HIGH confidence in recommendation
- Prerendering approach: well-established pattern, MEDIUM confidence in specific plugin choice
