# Codebase Structure

**Analysis Date:** 2026-03-05

## Directory Layout

```
website/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment (push to main)
├── public/
│   └── frog.gif                # Favicon source
├── src/
│   ├── assets/                 # Static images (SVG logos, WebP photo, GIF)
│   ├── components/             # Reusable React components
│   ├── data/                   # Static content constants
│   └── styles/                 # CSS
│       └── global.css          # Single monolithic stylesheet
│   ├── index.jsx               # App component (full page)
│   └── main.jsx                # React entry point
├── dist/                       # Vite build output (git-ignored)
├── index.html                  # HTML shell / Vite entry
├── package.json                # Dependencies and scripts
├── package-lock.json           # Lockfile
└── vite.config.js              # Vite config (React plugin, base path)
```

## Directory Purposes

**`src/assets/`:**
- Purpose: All static image assets imported by components and data modules
- Contains: SVG brand logos (hubspot, stripe, openai, notion, etc.), one WebP photo (`amin.webp`), one GIF (`frog.gif`)
- Key files: All `.svg` files follow `{brand}-logo.svg` naming

**`src/components/`:**
- Purpose: Reusable UI components used by the App
- Contains: 6 JSX component files
- Key files:
  - `FadeIn.jsx` — scroll-triggered animation wrapper
  - `Faq.jsx` — collapsible FAQ item
  - `Tooltip.jsx` — mouse-following tooltip
  - `ToolsMarquee.jsx` — infinite scrolling logo strip
  - `StepTitle.jsx` — hover-reveal step title (currently unused in App but imported)
  - `iPaaSLogos.jsx` — inline SVG for Make.com logo

**`src/data/`:**
- Purpose: Static content separated from UI
- Contains: Single file with all page content
- Key files: `content.js` — exports `LOGOS`, `FAQ_ITEMS`, `CASE_STUDIES`, `CAL_LINK`

**`src/styles/`:**
- Purpose: All CSS for the application
- Contains: Single global stylesheet
- Key files: `global.css` — CSS custom properties, all component styles, animations, media queries

**`public/`:**
- Purpose: Static files served as-is by Vite
- Contains: `frog.gif` (used as favicon via `<link>` in `index.html`)

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell, font loading, Vite module entry
- `src/main.jsx`: React root creation and StrictMode wrapper
- `src/index.jsx`: App component — the entire page

**Configuration:**
- `vite.config.js`: Vite build config (React plugin, `/website/` base path)
- `package.json`: Dependencies and npm scripts (`dev`, `build`, `preview`)
- `.github/workflows/deploy.yml`: CI/CD pipeline

**Core Logic:**
- `src/index.jsx`: All page sections, state management, Cal.com embed init
- `src/data/content.js`: All page content (logos, case studies, FAQ, booking link)

**Styles:**
- `src/styles/global.css`: Complete stylesheet (147 lines)

## Naming Conventions

**Files:**
- Components: PascalCase (`FadeIn.jsx`, `Tooltip.jsx`, `Faq.jsx`)
- Exception: `iPaaSLogos.jsx` uses camelCase prefix
- Data files: camelCase (`content.js`)
- Assets: kebab-case (`hubspot-logo.svg`, `n8n-logo.svg`)
- Config files: kebab-case (`vite.config.js`)

**Directories:**
- All lowercase: `components`, `assets`, `data`, `styles`

**Exports:**
- Components: default exports (`export default function FadeIn`)
- Data: named exports (`export const LOGOS`, `export const FAQ_ITEMS`)
- Exception: `iPaaSLogos.jsx` uses named export (`export const MakeLogo`)

**Constants:**
- UPPER_SNAKE_CASE for data arrays: `LOGOS`, `FAQ_ITEMS`, `CASE_STUDIES`, `CAL_LINK`

## Where to Add New Code

**New Page Section:**
- Add directly inside `src/index.jsx` within the `<main>` element
- Wrap in `<FadeIn>` for scroll animation
- Add corresponding CSS classes to `src/styles/global.css`

**New Reusable Component:**
- Create `src/components/ComponentName.jsx`
- Use PascalCase filename, default export
- Import in `src/index.jsx`

**New Static Content:**
- Add to `src/data/content.js` as a named UPPER_SNAKE_CASE export
- Import in `src/index.jsx` via destructured import

**New Brand Logo/Asset:**
- Add SVG to `src/assets/` using `{brand}-logo.svg` naming
- Import in relevant file (`src/data/content.js` or `src/components/ToolsMarquee.jsx`)

**New Styles:**
- Add to `src/styles/global.css` — there is no CSS module or scoping system
- Follow existing pattern: class-based selectors, BEM-like naming (e.g., `.case-row`, `.case-left`, `.case-title`)
- Use CSS custom properties from `:root` for colors

**New Page (if multi-page needed):**
- Would require adding a router (e.g., react-router) — none exists currently
- Current architecture assumes single-page only

## Special Directories

**`dist/`:**
- Purpose: Vite production build output
- Generated: Yes (by `npm run build`)
- Committed: No (should be git-ignored, deployed via GitHub Actions)

**`.github/workflows/`:**
- Purpose: GitHub Actions CI/CD
- Generated: No
- Committed: Yes

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No

---

*Structure analysis: 2026-03-05*
