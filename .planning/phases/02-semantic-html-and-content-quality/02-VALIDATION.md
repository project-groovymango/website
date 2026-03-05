---
phase: 2
slug: semantic-html-and-content-quality
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Shell verification (no test framework — deferred to INFR-03) |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && grep -r 'href="#"' dist/ ; echo "Check heading hierarchy in built HTML"` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (ensures no JSX syntax errors)
- **After every plan wave:** Build + grep for `href="#"` + heading hierarchy check
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | HTML-01 | smoke | `npm run build && grep -c "<h1" dist/index.html` | N/A — shell | ⬜ pending |
| 02-01-02 | 01 | 1 | HTML-01 | smoke | `npm run build && ! grep -c 'role="heading"' dist/index.html` | N/A — shell | ⬜ pending |
| 02-01-03 | 01 | 1 | HTML-02 | smoke | `! grep 'href="#"' dist/index.html` | N/A — shell | ⬜ pending |
| 02-01-04 | 01 | 1 | SEO-06 | manual | Visual inspection of keyword placement | N/A — manual | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework installation needed — all verifications use `npm run build` + shell grep commands on `dist/` output. Full testing infrastructure deferred to INFR-03.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Heading hierarchy is logical (h1 > h2 > h3) | HTML-01 | Requires DOM tree inspection | Open DevTools, verify single h1, h2/h3 nesting with no gaps |
| Keywords appear naturally in content | SEO-06 | Requires human judgment on natural language | Read headings and body copy, confirm iPaaS/Make.com/n8n/workflow automation appear naturally |
| Footer links all navigate to real destinations | HTML-02 | Requires visual inspection of rendered page | Click each footer link, confirm no `#` placeholders |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
