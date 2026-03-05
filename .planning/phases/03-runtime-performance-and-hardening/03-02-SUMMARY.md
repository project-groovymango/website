---
phase: 03-runtime-performance-and-hardening
plan: 02
subsystem: ui
tags: [webp, cls, image-optimization, layout-shift, svg-dimensions]

requires:
  - phase: 03-runtime-performance-and-hardening
    provides: Deferred Cal.com loading and CSP meta tag from plan 01
provides:
  - Animated WebP frog image replacing GIF (smaller file size)
  - Explicit width/height on all img elements preventing CLS
affects: []

tech-stack:
  added: []
  patterns: [SVG viewBox-based dimension computation, HTML width/height alongside CSS dimensions]

key-files:
  created: [src/assets/frog.webp]
  modified: [src/index.jsx, src/components/ToolsMarquee.jsx, src/data/content.js]

key-decisions:
  - "SVG logo widths computed from viewBox aspect ratios at display height (not hardcoded guesses)"
  - "Used sharp library for GIF-to-animated-WebP conversion (installed temporarily, then removed)"
  - "Added HTML width/height attributes alongside existing CSS inline styles for CLS prevention"

patterns-established:
  - "Image dimension pattern: all img elements carry HTML width/height for layout reservation before CSS loads"
  - "Logo data pattern: width field in LOGOS and logoWidth in CASE_STUDIES arrays for dimension-aware rendering"

requirements-completed: [PERF-03, PERF-04]

duration: 4min
completed: 2026-03-05
---

# Phase 3 Plan 2: Image Optimization & CLS Prevention Summary

**Animated WebP conversion of frog.gif and explicit width/height attributes on all img elements to eliminate CLS**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-05T21:12:10Z
- **Completed:** 2026-03-05T21:16:03Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Converted frog.gif (49KB) to animated WebP (48KB) preserving all 8 animation frames
- Added explicit width and height HTML attributes to all 7 img elements in index.jsx
- Added width and height to all 10 img-based logo entries in ToolsMarquee.jsx
- Computed SVG logo widths from viewBox aspect ratios (not estimated) for accurate layout reservation

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert frog.gif to animated WebP and update imports** - `48ad911` (feat)
2. **Task 2: Add explicit width and height to all img elements** - `0e3d097` (feat)

## Files Created/Modified
- `src/assets/frog.webp` - Animated WebP replacement for frog.gif (8 frames, 48KB vs 49KB original)
- `src/index.jsx` - All 7 img elements now have width/height; frog import changed from .gif to .webp
- `src/components/ToolsMarquee.jsx` - All logo entries have width/height; img render includes both attributes
- `src/data/content.js` - Added width field to LOGOS array, logoWidth to CASE_STUDIES array

## Decisions Made
- Used sharp (Node.js) for GIF-to-WebP conversion since ffmpeg and gif2webp were unavailable; installed temporarily then removed
- SVG logo widths computed from actual viewBox dimensions (e.g., hubspot 1280:365 ratio gives width=84 at height=24) rather than estimates
- HTML width/height attributes added alongside existing CSS inline styles -- both are needed because HTML attrs reserve layout space before CSS loads

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- ffmpeg and gif2webp not available on system; resolved by temporarily installing sharp as devDependency for conversion, then uninstalling

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All v1 performance and hardening requirements complete
- Phase 3 (final phase) is now fully done
- All 5 plans across 3 phases completed

---
*Phase: 03-runtime-performance-and-hardening*
*Completed: 2026-03-05*
