# Phase 3: Runtime Performance and Hardening - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Defer Cal.com embed loading to user interaction, optimize images with explicit dimensions, add CSP meta tag, and wrap Cal.com embed in an error boundary. All changes are in React components and `index.html`. No design changes.

</domain>

<decisions>
## Implementation Decisions

### Cal.com Booking Fallback
- Defer Cal.com embed loading from page mount to CTA click (currently loads eagerly in useEffect)
- Fallback behavior on failure: Claude's discretion (likely direct link to cal.com as fallback)
- Loading UX when user clicks CTA: Claude's discretion (likely brief loading state, then embed)
- Error boundary must wrap the Cal.com embed to prevent white-screen crashes

### Image Optimization
- Convert frog.gif (49KB) to animated WebP format (smaller file)
- Manual optimization — optimize images by hand and commit optimized versions, no build-time plugin
- Add explicit `width` and `height` attributes to all `<img>` elements to prevent CLS
- Current images: ~13 SVG logos (small), frog.gif (49KB, used twice), amin.webp (team photo)

### CSP (Content Security Policy)
- Not discussed — Claude's discretion
- Must whitelist Cal.com domains, Google Fonts (if not fully removed by Phase 1), and inline styles
- Implement via `<meta http-equiv="Content-Security-Policy">` since GitHub Pages can't set HTTP headers

### Claude's Discretion
- Cal.com fallback UX (direct link vs error message vs loading indicator)
- Cal.com deferred loading implementation approach
- CSP strictness level and specific directives
- Error boundary fallback UI design
- Which images beyond frog.gif need optimization
- Whether SVG logos need any optimization

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/Tooltip.jsx`: Example of mouse-tracking component — similar pattern for loading states
- Cal.com data attributes already centralized in `calAttrs` object (index.jsx line 15-19)
- `CAL_LINK` constant in `src/data/content.js` — single source for booking URL

### Established Patterns
- Cal.com embed uses dynamic `import("@calcom/embed-react")` with `.then()` chain (no error handling)
- `calAttrs` spread onto multiple buttons throughout the page (hero CTA, how-it-works CTA, footer CTA)
- Images imported as modules: `import frogGif from "./assets/frog.gif"` — Vite handles path resolution
- Team photo already has `loading="lazy"` attribute

### Integration Points
- `src/index.jsx` lines 27-33: Cal.com useEffect (needs to move to click handler)
- `src/index.jsx` lines 15-19: calAttrs object (may need modification for deferred approach)
- `src/index.jsx` lines 71, 195, 264: Three CTA buttons using `{...calAttrs}` spread
- `index.html`: Where CSP meta tag goes (after Phase 1 adds other meta tags)
- `src/assets/frog.gif`: Replace with optimized WebP version

</code_context>

<specifics>
## Specific Ideas

- frog.gif → animated WebP conversion is the main image optimization target
- Cal.com embed is ~150-200KB JS — deferring to click is the single biggest Lighthouse win in this phase
- All three CTAs ("Book a free 15-min call" x2, "Book a call" x1) should behave consistently

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-runtime-performance-and-hardening*
*Context gathered: 2026-03-05*
