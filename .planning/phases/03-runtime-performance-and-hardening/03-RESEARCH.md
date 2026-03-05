# Phase 3: Runtime Performance and Hardening - Research

**Researched:** 2026-03-05
**Domain:** Web performance (CWV), security hardening (CSP), React error handling
**Confidence:** HIGH

## Summary

Phase 3 addresses five remaining v1 requirements: deferred Cal.com embed loading (PERF-05), image dimension attributes (PERF-03), image optimization (PERF-04), CSP meta tag (HTML-03), and error boundary for Cal.com (HTML-04). The current codebase eagerly loads the Cal.com embed (~150-200KB JS) via a `useEffect` on mount -- the single biggest performance win is deferring this to CTA click. Images are already small (total ~121KB across all assets), with `frog.gif` at 49KB being the main optimization target for WebP conversion. CSP must be implemented via `<meta>` tag since GitHub Pages cannot set HTTP headers.

The implementation is straightforward: move Cal.com initialization from `useEffect` to a click handler, wrap the embed in an error boundary, add explicit `width`/`height` to all `<img>` elements, convert `frog.gif` to animated WebP, and add a CSP meta tag to `index.html`. No new runtime dependencies are needed -- `react-error-boundary` (v6.1.1) is the only addition.

**Primary recommendation:** Use `react-error-boundary` for the error boundary, defer Cal.com via dynamic import on first CTA click with a loading state, and keep CSP permissive enough to not break Cal.com iframes while still providing meaningful protection.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Defer Cal.com embed loading from page mount to CTA click (currently loads eagerly in useEffect)
- Error boundary must wrap the Cal.com embed to prevent white-screen crashes
- Convert frog.gif (49KB) to animated WebP format (smaller file)
- Manual optimization -- optimize images by hand and commit optimized versions, no build-time plugin
- Add explicit `width` and `height` attributes to all `<img>` elements to prevent CLS
- CSP implemented via `<meta http-equiv="Content-Security-Policy">` since GitHub Pages can't set HTTP headers
- Must whitelist Cal.com domains, and inline styles

### Claude's Discretion
- Cal.com fallback UX (direct link vs error message vs loading indicator)
- Cal.com deferred loading implementation approach
- CSP strictness level and specific directives
- Error boundary fallback UI design
- Which images beyond frog.gif need optimization
- Whether SVG logos need any optimization

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PERF-03 | Images have explicit width/height attributes to prevent CLS | Image inventory complete; dimensions identified for frog.gif (48x48, 96x96), amin.webp (needs measurement), SVG logos (height=24 or height=14/16) |
| PERF-04 | Images are optimized (compressed, appropriate format) | frog.gif (49KB) is main target for WebP conversion; SVGs are already small; amin.webp already optimized format |
| PERF-05 | Cal.com embed loads on user interaction (CTA click), not on page mount | Cal.com popup embed pattern documented; dynamic import + getCalApi approach validated |
| HTML-03 | Content Security Policy added via meta tag | CSP meta tag directives documented; Cal.com domains identified; meta tag limitations catalogued |
| HTML-04 | Error boundary wraps Cal.com embed to prevent white-screen crashes | react-error-boundary v6.1.1 documented; fallback pattern with direct cal.com link recommended |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-error-boundary | 6.1.1 | Error boundary for Cal.com embed | De facto standard; avoids hand-rolling class components; 6M+ weekly npm downloads |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @calcom/embed-react | 1.5.3 (already installed) | Cal.com booking embed | Already in project; popup-on-click pattern supported via data attributes |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-error-boundary | Hand-rolled class component | Class component is ~15 lines but lacks reset/retry features; library is 2KB and battle-tested |

**Installation:**
```bash
npm install react-error-boundary
```

## Architecture Patterns

### Recommended Approach

No new files or directories needed. Changes touch existing files:

```
src/
  index.jsx          # Move Cal.com init to click handler, add error boundary wrapper
  components/
    CalErrorBoundary.jsx  # (NEW) Error boundary wrapper with fallback UI
index.html            # Add CSP meta tag
src/assets/
  frog.webp           # (NEW) Replace frog.gif with animated WebP
```

### Pattern 1: Deferred Cal.com Loading (Click-to-Load)

**What:** Move Cal.com dynamic import from `useEffect` (runs on mount) to a click handler (runs on first CTA click). All three CTAs trigger the same initialization.

**When to use:** Always -- this is the core PERF-05 implementation.

**Current code (to be replaced):**
```jsx
// src/index.jsx lines 27-33 -- REMOVE THIS
useEffect(() => {
  import("@calcom/embed-react").then(({ getCalApi }) =>
    getCalApi({ namespace: "30min" }).then(cal =>
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" })
    )
  );
}, []);
```

**Recommended approach:**
```jsx
// Track whether Cal.com has been initialized
const calInitRef = useRef(false);

function initCalAndOpen() {
  if (calInitRef.current) return; // Already initialized
  calInitRef.current = true;
  import("@calcom/embed-react").then(({ getCalApi }) =>
    getCalApi({ namespace: "30min" }).then(cal => {
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })
  );
}

// On each CTA button, add onClick={initCalAndOpen} alongside existing calAttrs
// The data-cal-link attribute handles opening the popup after Cal is loaded
```

**Key insight:** The `data-cal-link` and `data-cal-namespace` attributes already make buttons open the Cal.com popup modal when clicked. The `useEffect` just pre-loads the Cal.com JS. Moving it to onClick means the JS loads on first click instead of on mount. The Cal.com embed script will handle the popup display once loaded.

**Loading UX consideration:** There will be a brief delay (~1-2s) on first click while the Cal.com JS downloads. Options:
1. Show a small loading spinner on the clicked button (recommended -- simple, clear)
2. Accept the delay (Cal.com shows its own loading UI in the popup)
3. Preload on hover for perceived instant loading (nice enhancement but adds complexity)

### Pattern 2: Error Boundary with Fallback Link

**What:** Wrap components that depend on Cal.com in an error boundary that shows a direct booking link as fallback.

**Example:**
```jsx
import { ErrorBoundary } from 'react-error-boundary';

function CalFallback({ error }) {
  return (
    <a
      href={`https://cal.com/${CAL_LINK}`}
      target="_blank"
      rel="noreferrer"
      className="cta-primary"
    >
      Book a free 15-min call (opens Cal.com) →
    </a>
  );
}

// Wrap around sections that use Cal.com
<ErrorBoundary FallbackComponent={CalFallback}>
  {/* CTA buttons with calAttrs */}
</ErrorBoundary>
```

**Important:** React error boundaries only catch rendering errors and lifecycle errors, NOT event handler errors. Since Cal.com is loaded via dynamic import in a click handler, a try/catch in the click handler is also needed to handle import failures gracefully.

### Pattern 3: CSP Meta Tag

**What:** Add a Content-Security-Policy meta tag to index.html.

**CSP meta tag limitations (verified via MDN):**
- Cannot use `frame-ancestors` (not supported in meta tags)
- Cannot use `report-uri` or `report-to` (not supported in meta tags)
- Cannot use `sandbox` (not supported in meta tags)

**Recommended CSP:**
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://app.cal.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  frame-src https://app.cal.com https://*.cal.com;
  connect-src 'self' https://app.cal.com https://*.cal.com;
  font-src 'self';
">
```

**Domains to whitelist for Cal.com:**
- `https://app.cal.com` -- main embed script and iframe source
- `https://*.cal.com` -- subdomains used by Cal.com for iframe content

**Note on inline styles:** The project uses inline `style={{...}}` extensively in JSX (React injects these as element styles). `'unsafe-inline'` in `style-src` is required. This is a known tradeoff -- CSP cannot fully protect against style injection in React apps that use inline styles, but it still provides meaningful protection for script sources.

### Anti-Patterns to Avoid

- **Removing data-cal attributes and building custom modal:** The existing `data-cal-link` + `data-cal-namespace` + `data-cal-config` pattern is Cal.com's official API. Do not replace it with a custom iframe approach.
- **CSP too strict on first deploy:** Start with a working CSP and tighten later. A CSP that breaks Cal.com embed is worse than no CSP. Test in DevTools console for violations.
- **Forgetting `'self'` in script-src:** Vite's built output includes the app's own JS files; `'self'` is required.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Error boundary | Class component with getDerivedStateFromError | react-error-boundary v6.1.1 | Handles reset, retry, provides hooks API, 2KB |
| Image format conversion | Node.js script with sharp/canvas | ffmpeg CLI or online converter (ezgif.com) | One-time manual conversion of a single file |
| Cal.com popup modal | Custom iframe + postMessage | @calcom/embed-react data attributes | Already working; Cal.com handles all the complexity |

**Key insight:** This phase has very little new code. It is mostly configuration (CSP), asset optimization (WebP), and rearranging existing code (moving useEffect to onClick).

## Common Pitfalls

### Pitfall 1: CSP Breaks Cal.com Embed
**What goes wrong:** CSP blocks Cal.com iframe or script loading, embed silently fails.
**Why it happens:** Missing a required domain in frame-src or script-src directives.
**How to avoid:** Test CSP with DevTools open -- CSP violations appear as console errors. Start permissive, then tighten.
**Warning signs:** Cal.com popup doesn't appear after clicking CTA; console shows "Refused to load" errors.

### Pitfall 2: Missing Width/Height on Dynamic Images
**What goes wrong:** CLS remains high because some images don't have dimensions.
**Why it happens:** Logo images in content.js are rendered via `.map()` loops -- easy to miss setting dimensions on all of them.
**How to avoid:** Audit every `<img>` element in the codebase. There are images in: index.jsx (frog x2, amin photo), content.js logos (via logo-grid), case study logos, ToolsMarquee logos, FAQ section (n8n logo).
**Warning signs:** Lighthouse CLS score still above 0.1.

### Pitfall 3: Animated WebP Loses Animation Frames
**What goes wrong:** Converted WebP is a static image instead of animated.
**Why it happens:** Wrong conversion tool or flags. `cwebp` alone does NOT support animated GIF input -- need `gif2webp` or `ffmpeg`.
**How to avoid:** Use `ffmpeg -i frog.gif -vcodec libwebp -loop 0 -an frog.webp` or use `gif2webp frog.gif -o frog.webp`. Verify the output is animated before committing.
**Warning signs:** Frog image is static on the page.

### Pitfall 4: Error Boundary Doesn't Catch Dynamic Import Failures
**What goes wrong:** Cal.com JS fails to load (network error, ad blocker), but error boundary doesn't catch it.
**Why it happens:** Dynamic import failures happen in event handlers, not during render. React error boundaries only catch render-time errors.
**How to avoid:** Add try/catch around the dynamic import in the click handler. On failure, show an inline fallback (direct link to cal.com).
**Warning signs:** Button click does nothing; no error shown to user; console shows unhandled promise rejection.

### Pitfall 5: CSP Meta Tag with Newlines
**What goes wrong:** CSP policy doesn't apply correctly.
**Why it happens:** The `content` attribute value must be on a single line in the HTML. Newlines in the attribute break parsing.
**How to avoid:** Write the entire CSP policy on one line in the meta tag.

## Code Examples

### Complete Image Inventory (with required dimensions)

| Image | Location | Current Attributes | Needs Width/Height |
|-------|----------|-------------------|-------------------|
| frog.gif (x2) | index.jsx hero + footer | inline style width/height | Already has inline style -- add HTML attributes too |
| amin.webp | index.jsx team section | `loading="lazy"` | YES -- needs width + height |
| Logo grid SVGs (7) | index.jsx via LOGOS array | `height={24}` | Add `width` attribute (measure each SVG) |
| Case study logos (4) | index.jsx via CASE_STUDIES | `height={14}` | Add `width` attribute |
| ToolsMarquee logos (10) | ToolsMarquee.jsx | `loading="lazy" decoding="async"` | Add `width` + `height` attributes |
| n8n logo in FAQ | index.jsx FAQ section | `style={{ height: 16 }}` | Add `width` + `height` attributes |

### Cal.com Deferred Loading with Error Handling

```jsx
const calInitRef = useRef(false);
const [calLoading, setCalLoading] = useState(false);
const [calError, setCalError] = useState(false);

async function initCal() {
  if (calInitRef.current) return;
  setCalLoading(true);
  try {
    const { getCalApi } = await import("@calcom/embed-react");
    const cal = await getCalApi({ namespace: "30min" });
    cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    calInitRef.current = true;
  } catch (err) {
    console.error("Cal.com embed failed to load:", err);
    setCalError(true);
  } finally {
    setCalLoading(false);
  }
}
```

### CSP Meta Tag (Single Line)

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://app.cal.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.cal.com; frame-src https://app.cal.com https://*.cal.com; connect-src 'self' https://app.cal.com https://*.cal.com; font-src 'self';">
```

**Note:** `'unsafe-inline'` in script-src may be needed because Vite injects inline scripts for module loading in development. Test the production build -- if Vite's production output is fully external scripts, `'unsafe-inline'` can be removed from script-src. Keep it in style-src regardless (React inline styles require it).

### frog.gif to Animated WebP Conversion

```bash
# Option 1: ffmpeg (if available)
ffmpeg -i frog.gif -vcodec libwebp -lossless 0 -loop 0 -an -vsync 0 frog.webp

# Option 2: gif2webp (from libwebp tools)
gif2webp -q 80 frog.gif -o frog.webp

# Option 3: Online tool (ezgif.com/gif-to-webp) -- upload, convert, download

# Verify it's animated:
ffprobe frog.webp  # Should show multiple frames
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Class component error boundaries | react-error-boundary library | 2020+ (v3+) | No need to write class components; provides hooks-compatible API |
| GIF format for animations | Animated WebP or AVIF | 2020+ (broad browser support) | 25-35% smaller file size for animated WebP vs GIF |
| No CSP | CSP via meta tag or header | Always recommended | Prevents XSS; meta tag is valid alternative when headers unavailable |

**Deprecated/outdated:**
- `componentDidCatch` alone: Use `static getDerivedStateFromError` for rendering fallback; `componentDidCatch` for side effects. Or just use react-error-boundary.
- GIF format: Still works everywhere but animated WebP has near-universal browser support (97%+ per caniuse) and better compression.

## Open Questions

1. **Exact Cal.com CSP domains**
   - What we know: `app.cal.com` is the main script/iframe source
   - What's unclear: Whether additional subdomains (e.g., `*.cal.com`) are needed for booking flow assets
   - Recommendation: Start with `https://app.cal.com https://*.cal.com` for frame-src and connect-src. Test with DevTools console open to catch CSP violations and adjust.

2. **Vite production build inline scripts**
   - What we know: Vite dev mode uses inline scripts for HMR
   - What's unclear: Whether the production build (`vite build`) outputs any inline scripts that need `'unsafe-inline'` in script-src
   - Recommendation: Build and test. If no inline scripts in prod, remove `'unsafe-inline'` from script-src for better security.

3. **SVG logo optimization**
   - What we know: SVGs total ~63KB across 11 files. Largest are partnerstack (13KB), n8n (10.6KB), chargebee (9.9KB)
   - What's unclear: Whether SVGO optimization would meaningfully reduce these (they're already small and Vite may inline them)
   - Recommendation: Skip SVG optimization -- they're small, already vector format, and the user said "manual optimization" which implies focusing on the big wins (frog.gif). Vite handles bundling.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently installed |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PERF-03 | All img elements have width and height | manual-only | Lighthouse audit or DOM inspection | N/A |
| PERF-04 | Images optimized (frog.webp smaller than frog.gif) | manual-only | File size comparison | N/A |
| PERF-05 | Cal.com JS not loaded until CTA click | manual-only | DevTools Network tab: zero cal.com requests on fresh load | N/A |
| HTML-03 | CSP meta tag present in index.html | manual-only | View source or DOM inspection | N/A |
| HTML-04 | Error boundary wraps Cal.com embed | manual-only | Break Cal.com import and verify fallback appears | N/A |

**Justification for manual-only:** No test framework is installed. All requirements can be verified via Lighthouse, DevTools Network tab, and source inspection. Installing a test framework (Vitest, Playwright) for 5 manual checks would be over-engineering. The success criteria from the roadmap are explicitly DevTools-based verification.

### Sampling Rate
- **Per task commit:** Manual DevTools verification
- **Per wave merge:** Lighthouse audit (CLS < 0.1, no cal.com requests on load)
- **Phase gate:** Full Lighthouse run + manual CSP violation check

### Wave 0 Gaps
None -- verification is manual per the nature of these requirements (network behavior, CLS scores, source inspection). No test infrastructure needed.

## Sources

### Primary (HIGH confidence)
- MDN Content-Security-Policy documentation -- CSP directives, meta tag limitations
- react-error-boundary GitHub (v6.1.1) -- API, usage patterns
- Cal.com embed documentation -- data attributes, popup behavior, domains
- Codebase inspection -- exact current implementation, file sizes, image inventory

### Secondary (MEDIUM confidence)
- Cal.com domains (app.cal.com, *.cal.com) -- based on multiple community sources and embed docs; needs runtime verification
- ffmpeg animated WebP conversion -- well-documented pattern, multiple sources agree

### Tertiary (LOW confidence)
- CSP script-src 'unsafe-inline' need for Vite production builds -- needs testing with actual build output

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- react-error-boundary is well-established; Cal.com embed already in use
- Architecture: HIGH -- changes are small and well-scoped; patterns are straightforward
- Pitfalls: HIGH -- based on direct codebase analysis and documented CSP/React behavior
- CSP domains: MEDIUM -- Cal.com domains identified but exact whitelist needs runtime testing

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (stable domain; Cal.com embed API unlikely to change)
