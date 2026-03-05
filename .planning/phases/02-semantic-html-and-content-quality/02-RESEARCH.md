# Phase 2: Semantic HTML and Content Quality - Research

**Researched:** 2026-03-05
**Domain:** Semantic HTML, heading hierarchy, on-page SEO copywriting
**Confidence:** HIGH

## Summary

This phase involves three concrete tasks in a single React component (`src/index.jsx`) and its CSS (`src/styles/global.css`): (1) replace the `<span role="heading">` workaround with real `<h2>` tags, add `<h3>` tags for sub-items, (2) fix dead footer links, and (3) weave target keywords into headings and body copy naturally.

The scope is narrow and well-understood. All changes are in two files. The primary risk is CSS specificity breakage when changing tag types (e.g., `<div class="case-title">` to `<h3 class="case-title">`), which requires resetting browser heading defaults. There are no library dependencies to add.

**Primary recommendation:** Execute as a single plan with three waves -- heading hierarchy first (structural), footer cleanup second (simple), keyword optimization third (requires judgment).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Keep the playful, casual tone -- weave keywords naturally, don't make it corporate
- Priority keywords: Make.com, n8n, workflow automation, HubSpot automation
- NOT using "iPaaS" as a primary keyword (user de-selected it)
- h1 stays as brand name "a2labs" -- keywords go in h2s and other visible text
- Claude optimizes body copy (tagline, descriptions, section intros) where it makes natural sense -- not just headings
- Section labels ("Previous projects", "How it works", "FAQ") become real `<h2>` tags -- replace the `<p className="section-label"><span role="heading">` pattern
- All section labels become h2s (not keyword-enhanced -- keep current text unless keywords fit naturally)
- Full h3 hierarchy: case study titles, step titles, and team member names become h3 under their section h2
- h1 remains "a2labs" in the header

### Claude's Discretion
- Footer link cleanup approach (remove dead links, or replace with real URLs if available)
- Exact keyword placement in body copy (optimize where natural)
- Whether section headings get keyword-enhanced text or stay as-is
- Semantic element choices beyond headings (article, section, nav usage)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HTML-01 | Semantic heading hierarchy (real h1/h2/h3, no span[role=heading] hacks) | Heading hierarchy pattern, CSS reset rules, tag replacement map |
| HTML-02 | Placeholder href="#" links in footer are fixed or removed | Footer link inventory, removal/replacement strategy |
| SEO-06 | Headings and copy include niche keywords (iPaaS automation, Make.com, workflow automation) | Keyword placement strategy, natural integration patterns |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | ^18.2.0 | Already in use | No new deps needed |
| Vite | ^4.4.0 | Already in use | No new deps needed |

### Supporting
No new libraries needed. This phase is purely HTML/CSS/copy changes.

### Alternatives Considered
None -- no libraries are needed for this work.

**Installation:**
```bash
# No new packages needed
```

## Architecture Patterns

### Current DOM Structure (Before)
```
h1 "a2labs"
  p.section-label > span[role=heading][aria-level=2] "Previous projects"
    div.case-title "Round Robin"          (no heading tag)
    div.case-title "Quote-to-Cash"        (no heading tag)
    ...
  p.section-label > span[role=heading][aria-level=2] "How it works"
    div.step-title "We audit your process" (no heading tag)
    div.step-title "Prioritize by impact"  (no heading tag)
    ...
  (team section -- no heading at all)
    div.team-name "Amin Laanaya"          (no heading tag)
  p.section-label > span[role=heading][aria-level=2] "FAQ"
```

### Target DOM Structure (After)
```
h1 "a2labs"
  h2 "Previous projects"  (or keyword-enhanced if natural)
    h3 "Round Robin"
    h3 "Quote-to-Cash"
    h3 "Platform Move"
    h3 "Support Agent"
  h2 "How it works"  (or keyword-enhanced if natural)
    h3 "We audit your process"
    h3 "Prioritize by impact"
    h3 "Build and hand over"
    h3 "Tell us the problem"    (alternate track)
    h3 "We scope and quote"     (alternate track)
    h3 "Build and hand over"    (alternate track)
  h2 (team section -- optional, could be "Meet the team" or similar)
    h3 "Amin Laanaya"
  h2 "FAQ"
```

### Pattern 1: Tag Replacement with CSS Reset
**What:** Replace `<p class="section-label"><span role="heading" aria-level="2">Text</span></p>` with `<h2 class="section-label">Text</h2>`
**When to use:** All three section labels (lines 94, 132, 220)
**Example:**
```jsx
// BEFORE
<p className="section-label"><span role="heading" aria-level="2">Previous projects</span></p>

// AFTER
<h2 className="section-label">Previous projects</h2>
```

### Pattern 2: Div-to-H3 with Class Preservation
**What:** Replace `<div class="case-title">` (and similar) with `<h3 class="case-title">`
**When to use:** Case study titles, step titles, team member name
**Example:**
```jsx
// BEFORE
<div className="case-title">{title}</div>

// AFTER
<h3 className="case-title">{title}</h3>
```

### Pattern 3: Browser Heading Reset in CSS
**What:** Browsers apply default margins, font-size, and font-weight to h2/h3 elements. Must reset these to match existing visual appearance.
**When to use:** Every heading class that was previously a div/p/span
**Example:**
```css
/* Reset browser defaults for headings used as styled elements */
h2.section-label,
h3.case-title,
h3.step-title,
h3.team-name {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}
```

### Anti-Patterns to Avoid
- **Keyword stuffing:** Don't force keywords into every heading. The user wants natural language. "Previous projects" is fine as-is if keywords don't fit naturally.
- **Breaking visual appearance:** The goal is semantic improvement, not visual change. Every tag swap must look identical before and after.
- **Nested heading elements:** Never put an `<h3>` inside an `<h2>`. Headings are siblings in the document outline, not parent-child.
- **Empty headings:** Don't add headings for sections that don't need them just for hierarchy completeness.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Heading hierarchy validation | Custom DOM walker | Browser DevTools / manual inspection | One-time check, not runtime code |

**Key insight:** This phase adds no runtime logic. It is purely structural HTML and copy changes.

## Common Pitfalls

### Pitfall 1: CSS Specificity Breakage
**What goes wrong:** Changing `<div class="case-title">` to `<h3 class="case-title">` changes specificity if any CSS selectors target `div.case-title` or if there are tag-level selectors for `h3`.
**Why it happens:** CSS selector `div.case-title` won't match `h3.case-title`.
**How to avoid:** Check that all CSS selectors use class-only selectors (`.case-title` not `div.case-title`). Current CSS uses class-only selectors -- confirmed safe.
**Warning signs:** Visual changes after tag swap.

### Pitfall 2: Browser Default Styles on Headings
**What goes wrong:** `<h2>` and `<h3>` have browser default `margin`, `font-size`, `font-weight`, and `line-height`. Swapping tags without resetting these causes visible layout shifts.
**Why it happens:** User-agent stylesheet applies to heading elements.
**How to avoid:** Add explicit resets in CSS for the heading classes, OR ensure existing class styles already override all relevant properties.
**Warning signs:** Headings appear larger, bolder, or have extra spacing after tag change.

### Pitfall 3: Heading Level Gaps
**What goes wrong:** Going from h1 to h3 without an h2 is an accessibility violation and SEO signal issue.
**Why it happens:** Forgetting to add an h2 for a section (e.g., team section has no section-label currently).
**How to avoid:** Ensure every h3 has a preceding h2 in the document flow. The team section needs an h2 added.
**Warning signs:** Accessibility audits flag "heading level skipped."

### Pitfall 4: Case Study Titles in Data vs. JSX
**What goes wrong:** Case study titles come from the `CASE_STUDIES` array in `content.js`, rendered via `.map()`. The tag change happens in JSX, not in the data file.
**Why it happens:** Misidentifying where to make the change.
**How to avoid:** Change the JSX template tag (`<div>` to `<h3>`), not the data.

### Pitfall 5: Keyword Optimization Overdone
**What goes wrong:** Copy becomes corporate/stiff, losing the brand's casual/funny tone.
**Why it happens:** SEO instinct to maximize keyword density.
**How to avoid:** User explicitly said "keep the playful, casual tone." Keywords should appear 3-5 times across the page in natural contexts, not forced into every paragraph.

## Code Examples

### Exact Tag Replacement Map

All changes are in `src/index.jsx`:

| Line | Current Tag | New Tag | Class | Content |
|------|-------------|---------|-------|---------|
| 94 | `<p><span role="heading">` | `<h2>` | `section-label` | "Previous projects" |
| 101 | `<div>` | `<h3>` | `case-title` | `{title}` (from CASE_STUDIES map) |
| 111 | `<div>` | `<h3>` | `case-title` | `{title}` (hidden cases map) |
| 132 | `<p><span role="heading">` | `<h2>` | `section-label` | "How it works" |
| 149 | `<div>` | `<h3>` | `step-title` | "We audit your process" |
| 156 | `<div>` | `<h3>` | `step-title` | "Prioritize by impact" |
| 163 | `<div>` | `<h3>` | `step-title` | "Build and hand over" |
| 174 | `<div>` | `<h3>` | `step-title` | "Tell us the problem" |
| 181 | `<div>` | `<h3>` | `step-title` | "We scope and quote" |
| 188 | `<div>` | `<h3>` | `step-title` | "Build and hand over" |
| ~202 | (none) | `<h2>` | `section-label` | NEW: add section heading for team |
| 209 | `<div>` | `<h3>` | `team-name` | "Amin Laanaya" |
| 220 | `<p><span role="heading">` | `<h2>` | `section-label` | "FAQ" |

### Footer Link Inventory

All in `src/index.jsx` footer section (lines 240-275):

| Link Text | Current href | Type | Recommendation |
|-----------|-------------|------|----------------|
| Terms | `#` | Text link | Remove (no terms page exists) |
| Privacy Policy | `#` | Text link | Remove (no privacy page exists) |
| About | `#` | Text link | Remove (no about page exists) |
| Careers | `#` | Text link | Remove (no careers page exists) |
| Slack icon | `#` | Social icon | Remove (no Slack community) |
| LinkedIn icon | `#` | Social icon | Keep IF real URL available, else remove |
| Discord icon | `#` | Social icon | Remove (no Discord server) |
| Telegram icon | `#` | Social icon | Remove (no Telegram channel) |

**Recommendation:** Remove all dead links. Keep footer structure (headings, email, CTA button). Remove the "Resources" and "Company" columns entirely since they'd be empty. Keep "Inquiries" column with email and CTA. This simplifies the footer and eliminates all HTML-02 violations.

### Keyword Placement Strategy

Target keywords: Make.com, n8n, workflow automation, HubSpot automation

**Natural insertion points (Claude's discretion on exact copy):**

1. **Tagline (line 61):** Currently "Automate, automate, automate -- we're nerds who get high on things running efficiently." Could naturally include "workflow automation" without losing tone.

2. **Description (line 63):** Long paragraph about automation. Could mention specific tools (Make.com, n8n) or "workflow automation" naturally.

3. **Work intro (line 95):** "...if it has an API, we can help you automate or rethink the process." Could naturally reference "workflow automation" or tools.

4. **Section headings:** "How it works" could become "How workflow automation works" but this may feel forced. User said keep current text unless keywords fit naturally.

5. **FAQ answers:** Already mention Make.com and n8n tools organically in Q&A about automation tools. The FAQ content.js entries could be enhanced.

**Keyword density target:** 3-5 natural mentions across the page. Not in every paragraph.

### CSS Reset Block

```css
/* Reset browser heading defaults -- preserve existing visual styles */
h2.section-label {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--cream);
  margin-bottom: 16px;
}

h3.case-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--cream);
}

h3.step-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--cream);
  margin-bottom: 4px;
  cursor: default;
}

h3.team-name {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--cream);
  letter-spacing: -0.02em;
}
```

Note: The existing CSS already specifies font-size, font-weight, and color for these classes. The key addition is `margin: 0` to override browser heading defaults. Since the current selectors are class-only (`.section-label` not `p.section-label`), they will continue to match the new tags. However, changing selectors to be tag-specific (e.g., `h2.section-label`) is cleaner and prevents accidental application to non-heading elements.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `span[role=heading]` with ARIA | Native heading elements (h1-h6) | Always was best practice | Screen readers and search engines prefer native headings |
| Keyword-dense meta descriptions | Natural keyword integration in visible content | ~2022 (Google helpful content update) | Content quality > keyword density |
| Footer link farms | Minimal, real-destination-only footer links | ~2023 (Google spam updates) | Dead links hurt crawl budget and user trust |

## Open Questions

1. **LinkedIn URL for Amin/a2labs**
   - What we know: LinkedIn social icon currently links to `#`
   - What's unclear: Whether the company or founder has a LinkedIn profile to link to
   - Recommendation: Remove the icon. If user provides a URL later, it's trivial to add back.

2. **Team section heading text**
   - What we know: The team section has no heading currently; needs one for h2/h3 hierarchy
   - What's unclear: What text to use
   - Recommendation: Use something casual like "The team" or "Who we are" -- keep it consistent with the site's tone. This is Claude's discretion per CONTEXT.md.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently installed |
| Config file | none -- see Wave 0 |
| Quick run command | `npx vite build` (build validates JSX syntax) |
| Full suite command | N/A |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HTML-01 | Single h1, logical h2/h3 hierarchy, no span[role=heading] | manual-only | Visual DOM inspection in DevTools | N/A |
| HTML-02 | No href="#" links remain | manual-only | `npx vite build && grep -r 'href="#"' dist/` | N/A |
| SEO-06 | Keywords appear in headings and body copy | manual-only | Visual inspection of rendered page | N/A |

**Justification for manual-only:** No test framework is installed, and installing one is out of scope (deferred to INFR-03). The verification can use `vite build` to ensure no syntax errors, and `grep` on the built output to check for `href="#"` remnants. Heading hierarchy can be verified by inspecting the built HTML.

### Sampling Rate
- **Per task commit:** `npx vite build` (ensures no JSX syntax errors)
- **Per wave merge:** Build + grep for `href="#"` + visual inspection
- **Phase gate:** Build succeeds, no `href="#"` in output, heading hierarchy correct in DOM

### Wave 0 Gaps
None -- no test framework needed for this phase. Build validation is sufficient. Full testing infrastructure is deferred to INFR-03.

## Sources

### Primary (HIGH confidence)
- Direct code inspection of `src/index.jsx` (lines 1-279) -- current heading structure, footer links
- Direct code inspection of `src/styles/global.css` -- CSS selectors for heading classes
- Direct code inspection of `src/data/content.js` -- case study and FAQ data
- CONTEXT.md -- locked user decisions on keyword strategy and heading hierarchy

### Secondary (MEDIUM confidence)
- HTML spec heading semantics (well-established, no verification needed)
- Google SEO best practices for heading hierarchy (stable knowledge)

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - no new libraries, pure HTML/CSS changes
- Architecture: HIGH - exact line-by-line change map from code inspection
- Pitfalls: HIGH - CSS specificity and browser defaults are well-understood domain

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (stable domain, no external dependencies)
