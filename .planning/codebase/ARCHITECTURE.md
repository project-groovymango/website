# Architecture

**Analysis Date:** 2026-03-05

## Pattern Overview

**Overall:** Single-page application (SPA) — static marketing/landing page

**Key Characteristics:**
- Single monolithic React component (`App`) renders the entire page
- No routing — the site is one continuous scrolling page
- No backend or API calls — purely static content with a Cal.com embed
- Content data separated from presentation via `src/data/content.js`
- CSS-only animations (fade-in on scroll, marquee, pulse dots)

## Layers

**Presentation Layer:**
- Purpose: Renders the full landing page UI
- Location: `src/index.jsx`
- Contains: The `App` component — hero, projects, how-it-works, team, FAQ, footer
- Depends on: Components, data, assets, global CSS
- Used by: `src/main.jsx` (entry point)

**Component Layer:**
- Purpose: Reusable UI building blocks
- Location: `src/components/`
- Contains: Small, focused components (FadeIn, Faq, Tooltip, ToolsMarquee, StepTitle, iPaaSLogos)
- Depends on: React hooks, asset imports
- Used by: `src/index.jsx`

**Data Layer:**
- Purpose: Static content and configuration constants
- Location: `src/data/content.js`
- Contains: Logo arrays, case study data, FAQ items, Cal.com link
- Depends on: Asset imports (SVG logos)
- Used by: `src/index.jsx`

**Asset Layer:**
- Purpose: Static images and logos
- Location: `src/assets/`
- Contains: SVG brand logos, WebP photo, GIF mascot
- Depends on: Nothing
- Used by: Data layer, components, App

**Style Layer:**
- Purpose: All visual styling
- Location: `src/styles/global.css`
- Contains: Single monolithic CSS file with CSS custom properties, component styles, animations, responsive breakpoints
- Depends on: Nothing
- Used by: Imported in `src/index.jsx`

## Data Flow

**Page Render Flow:**

1. `index.html` loads `src/main.jsx` as module entry point
2. `src/main.jsx` creates React root, renders `<App />` from `src/index.jsx`
3. `App` imports static data from `src/data/content.js` and renders all sections
4. Cal.com embed loads lazily via dynamic `import("@calcom/embed-react")` in a `useEffect`

**State Management:**
- `useState` only — three pieces of local state in `App`:
  - `workOpen` (boolean): toggles "show more work" case studies
  - `tooltip` (object|null): controls hover tooltip for brand logos with case studies
  - `track` (string): toggles between "audit" and "problem" in "How it works" section
- Each component manages its own toggle state internally (e.g., `Faq` open/close, `FadeIn` visibility)

## Key Abstractions

**FadeIn:**
- Purpose: Scroll-triggered fade-in animation wrapper
- Examples: `src/components/FadeIn.jsx`
- Pattern: Uses `IntersectionObserver` to add `.visible` class when element enters viewport (10% threshold). Fires once then unobserves.

**Tooltip:**
- Purpose: Mouse-following tooltip for brand logo hover states
- Examples: `src/components/Tooltip.jsx`
- Pattern: Tracks `mousemove` events and positions a fixed tooltip near cursor. Controlled by parent via `tooltip` prop (object or null).

**Content Constants:**
- Purpose: Decouple page content from rendering logic
- Examples: `src/data/content.js`
- Pattern: Named exports (`LOGOS`, `FAQ_ITEMS`, `CASE_STUDIES`, `CAL_LINK`) consumed by `App` via destructured import. Each constant is an array of plain objects with known shape.

## Entry Points

**Browser Entry:**
- Location: `index.html`
- Triggers: Browser page load
- Responsibilities: HTML shell, font preconnect, loads `src/main.jsx`

**React Entry:**
- Location: `src/main.jsx`
- Triggers: Module loaded by Vite
- Responsibilities: Creates React root on `#root`, renders `<App />` in StrictMode

**Application Root:**
- Location: `src/index.jsx`
- Triggers: Rendered by `main.jsx`
- Responsibilities: Full page layout — all sections, state management, Cal.com embed initialization

## Error Handling

**Strategy:** None implemented — no error boundaries, no try/catch, no fallback UI

**Patterns:**
- Cal.com embed loads via dynamic import with `.then()` chain — no `.catch()` handler
- No loading states or error states for any content

## Cross-Cutting Concerns

**Logging:** None
**Validation:** None (no forms or user input)
**Authentication:** None (public static site)
**SEO:** Basic meta tags in `index.html` (title, description, viewport)
**Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`), base path set to `/website/` in `vite.config.js`

---

*Architecture analysis: 2026-03-05*
