---
phase: 1
slug: seo-foundation-and-static-assets
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Shell verification (no test framework needed) |
| **Config file** | none — build output inspection only |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && bash .planning/phases/01-seo-foundation-and-static-assets/verify.sh` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` + targeted grep check
- **After every plan wave:** Run full suite command (all grep checks)
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | SEO-01 | smoke | `grep -c "og:title" dist/index.html` | N/A — shell | ⬜ pending |
| 01-01-02 | 01 | 1 | SEO-02 | smoke | `grep -c "twitter:card" dist/index.html` | N/A — shell | ⬜ pending |
| 01-01-03 | 01 | 1 | SEO-03 | smoke | `grep -c "application/ld+json" dist/index.html` | N/A — shell | ⬜ pending |
| 01-02-01 | 02 | 1 | SEO-04 | smoke | `test -f dist/sitemap.xml && test -f dist/robots.txt` | N/A — shell | ⬜ pending |
| 01-02-02 | 02 | 1 | SEO-05 | smoke | `grep "website/frog.gif" dist/index.html` | N/A — shell | ⬜ pending |
| 01-03-01 | 03 | 1 | PERF-01 | smoke | `ls dist/assets/*.woff2` | N/A — shell | ⬜ pending |
| 01-03-02 | 03 | 1 | PERF-02 | smoke | `! grep -r "googleapis" dist/index.html` | N/A — shell | ⬜ pending |
| 01-03-03 | 03 | 1 | PERF-06 | smoke | `grep "preconnect.*cal.com" dist/index.html` | N/A — shell | ⬜ pending |
| 01-04-01 | 04 | 1 | BUG-01 | smoke | source inspection | N/A — manual | ⬜ pending |
| 01-04-02 | 04 | 1 | BUG-02 | smoke | `! grep -ri "planhat" src/data/content.js` | N/A — shell | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework installation needed — all verifications use `npm run build` + shell grep commands on `dist/` output.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| OG image renders correctly on social platforms | SEO-02 | Facebook Sharing Debugger and Twitter Card Validator require live deployed URL | Deploy, paste URL into debugger tools, verify rich preview |
| Banner link destination is correct | BUG-01 | Link destination TBD by user | Visual inspection of banner href value |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
