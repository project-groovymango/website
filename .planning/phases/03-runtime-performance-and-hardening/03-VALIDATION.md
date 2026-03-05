---
phase: 3
slug: runtime-performance-and-hardening
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-05
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification (DevTools, Lighthouse) |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` (then manual Lighthouse + DevTools checks) |
| **Estimated runtime** | ~30 seconds (build) + manual inspection |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (syntax validation)
- **After every plan wave:** Build + dev server + DevTools verification
- **Before `/gsd:verify-work`:** Full Lighthouse audit must pass
- **Max feedback latency:** 30 seconds (build) + manual

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | PERF-05 | manual | DevTools Network: zero cal.com requests on load | N/A | ⬜ pending |
| 03-01-02 | 01 | 1 | HTML-04 | manual | Break Cal.com import, verify fallback | N/A | ⬜ pending |
| 03-02-01 | 02 | 1 | PERF-03 | smoke | `grep -c 'width=' dist/index.html` | N/A — shell | ⬜ pending |
| 03-02-02 | 02 | 1 | PERF-04 | smoke | File size comparison (frog.webp < frog.gif) | N/A — shell | ⬜ pending |
| 03-02-03 | 02 | 1 | HTML-03 | smoke | `grep "content-security-policy" dist/index.html` | N/A — shell | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. Verification is manual per the nature of these requirements (network behavior, CLS scores, source inspection). No test framework needed.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Cal.com JS deferred until CTA click | PERF-05 | Network timing requires DevTools | Fresh load, check Network tab for zero cal.com requests, then click CTA |
| Lighthouse CLS below 0.1 | PERF-03 | Requires Lighthouse audit | Run Lighthouse in DevTools, check CLS metric |
| Error boundary shows fallback on embed failure | HTML-04 | Requires simulated failure | Block cal.com in DevTools, click CTA, verify fallback UI |
| CSP does not break site functionality | HTML-03 | Requires runtime testing | Check console for CSP violations after navigation |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
