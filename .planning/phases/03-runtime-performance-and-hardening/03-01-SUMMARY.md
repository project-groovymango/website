---
phase: 03-runtime-performance-and-hardening
plan: 01
subsystem: ui
tags: [cal.com, react-error-boundary, csp, lazy-loading, security]

requires:
  - phase: 01-technical-seo-and-performance-foundations
    provides: Cal.com embed integration and base index.html structure
provides:
  - Deferred Cal.com embed loading (click-triggered, not page-load)
  - CalErrorBoundary component with fallback link
  - Content Security Policy meta tag
affects: [03-02]

tech-stack:
  added: [react-error-boundary]
  patterns: [click-deferred dynamic import, error boundary with fallback link, CSP meta tag]

key-files:
  created: [src/components/CalErrorBoundary.jsx]
  modified: [src/index.jsx, index.html, package.json]

key-decisions:
  - "react-error-boundary over hand-rolled class component for error boundaries"
  - "Dual error handling: ErrorBoundary for render errors, try/catch in initCal for import errors"
  - "CSP with unsafe-inline for script-src and style-src (required by Vite dev + React inline styles)"

patterns-established:
  - "Click-deferred loading: heavy third-party scripts loaded on user interaction, not page load"
  - "Error boundary pattern: CalErrorBoundary wraps content, fallback degrades to direct link"

requirements-completed: [PERF-05, HTML-03, HTML-04]

duration: 3min
completed: 2026-03-05
---

# Phase 3 Plan 1: Defer Cal.com & CSP Summary

**Click-deferred Cal.com embed loading with react-error-boundary fallback and Content Security Policy meta tag**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-05T21:07:16Z
- **Completed:** 2026-03-05T21:09:56Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Eliminated ~150-200KB upfront Cal.com JS load by deferring to CTA click
- Added CalErrorBoundary component with direct cal.com link fallback on failure
- Added CSP meta tag whitelisting Cal.com domains for scripts, frames, and connections
- Removed wasteful cal.com preconnect hint (no longer needed with deferred loading)

## Task Commits

Each task was committed atomically:

1. **Task 1: Defer Cal.com loading and add error boundary** - `ca1bf9f` (feat)
2. **Task 2: Add Content Security Policy meta tag** - `83678f8` (feat)

## Files Created/Modified
- `src/components/CalErrorBoundary.jsx` - Error boundary wrapper with fallback link to cal.com
- `src/index.jsx` - Replaced useEffect eager load with click-triggered initCal, added error fallback for all 3 CTAs
- `index.html` - Added CSP meta tag, removed cal.com preconnect
- `package.json` - Added react-error-boundary dependency

## Decisions Made
- Used react-error-boundary (npm package) instead of hand-rolled class component -- per research recommendation, production-grade with reset capabilities
- Dual error handling strategy: ErrorBoundary catches render-time errors, try/catch in initCal catches dynamic import failures -- both failure modes covered
- CSP includes unsafe-inline for script-src (Vite module loading) and style-src (React inline styles) -- can be tightened later with nonce-based approach
- No loading spinner added for Cal.com init -- Cal.com shows its own loading UI in the popup

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Cal.com loading is now deferred, reducing initial page weight significantly
- CSP provides baseline security hardening
- Ready for 03-02 plan (additional performance/hardening tasks)

---
*Phase: 03-runtime-performance-and-hardening*
*Completed: 2026-03-05*
