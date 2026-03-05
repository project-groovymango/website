# Phase 2: Semantic HTML and Content Quality - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace heading hacks with proper semantic HTML, fix or remove placeholder footer links, and optimize headings/copy for niche keywords. All changes are in React components (`src/index.jsx`). No structural redesign — preserve current visual appearance.

</domain>

<decisions>
## Implementation Decisions

### Keyword Strategy
- Keep the playful, casual tone — weave keywords naturally, don't make it corporate
- Priority keywords: Make.com, n8n, workflow automation, HubSpot automation
- NOT using "iPaaS" as a primary keyword (user de-selected it)
- h1 stays as brand name "a2labs" — keywords go in h2s and other visible text
- Claude optimizes body copy (tagline, descriptions, section intros) where it makes natural sense — not just headings

### Heading Hierarchy
- Section labels ("Previous projects", "How it works", "FAQ") become real `<h2>` tags — replace the `<p className="section-label"><span role="heading">` pattern
- All section labels become h2s (not keyword-enhanced — keep current text unless keywords fit naturally)
- Full h3 hierarchy: case study titles, step titles, and team member names become h3 under their section h2
- h1 remains "a2labs" in the header

### Footer Link Cleanup
- Not discussed — Claude's discretion
- Current state: 6 dead `href="#"` links (Terms, Privacy Policy, About, Careers) + 4 social icons (Slack, LinkedIn, Discord, Telegram)
- Requirement HTML-02 says "fix or remove" — Claude decides based on what makes sense

### Claude's Discretion
- Footer link cleanup approach (remove dead links, or replace with real URLs if available)
- Exact keyword placement in body copy (optimize where natural)
- Whether section headings get keyword-enhanced text or stay as-is
- Semantic element choices beyond headings (article, section, nav usage)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/FadeIn.jsx`: Wraps each section — heading changes go inside these wrappers
- `src/components/Faq.jsx`: FAQ items already structured with q/a — heading change is in parent section

### Established Patterns
- Section labels follow pattern: `<p className="section-label"><span role="heading" aria-level="2">Text</span></p>` (lines 94, 132, 220 of index.jsx)
- Case study titles: `<div className="case-title">` (line 101)
- Step titles: `<div className="step-title">` (lines 149, 156, 163, etc.)
- Team name: `<div className="team-name">` (line 209)
- CSS classes target these elements — changing tags requires verifying CSS selectors still match

### Integration Points
- `src/index.jsx`: All heading changes happen here (lines 94, 101, 132, 149, 156, 163, 175, 182, 189, 209, 220)
- `src/styles/global.css`: CSS selectors for `.section-label`, `.case-title`, `.step-title`, `.team-name` may need updating if tag changes affect specificity

</code_context>

<specifics>
## Specific Ideas

- Keywords from Phase 1 title decision: "iPaaS Automation & Workflow Consulting"
- User explicitly wants Make.com, n8n, workflow automation, HubSpot automation as target keywords
- Casual/funny tone is a brand asset — don't sanitize it for SEO
- The tagline "Automate, automate, automate — we're nerds who get high on things running efficiently" could naturally include keyword terms

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-semantic-html-and-content-quality*
*Context gathered: 2026-03-05*
