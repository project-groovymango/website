# Coding Conventions

**Analysis Date:** 2026-03-05

## Naming Patterns

**Files:**
- Components: PascalCase `.jsx` files (e.g., `src/components/FadeIn.jsx`, `src/components/ToolsMarquee.jsx`)
- Exception: `src/components/iPaaSLogos.jsx` uses camelCase prefix for brand-specific naming
- Data files: camelCase `.js` files (e.g., `src/data/content.js`)
- Entry points: lowercase `.jsx` (e.g., `src/main.jsx`, `src/index.jsx`)
- Styles: lowercase `.css` (e.g., `src/styles/global.css`)

**Components:**
- Use PascalCase: `FadeIn`, `Faq`, `StepTitle`, `Tooltip`, `ToolsMarquee`
- Named exports for non-default components: `export const MakeLogo` in `src/components/iPaaSLogos.jsx`
- Default exports for primary component per file

**Functions:**
- camelCase for all functions and handlers
- Inline arrow functions for event handlers: `onClick={() => setWorkOpen(prev => !prev)}`
- State updater callbacks use short parameter names: `o => !o`, `prev => !prev`

**Variables:**
- camelCase for all variables: `visibleCases`, `hiddenCases`, `calAttrs`
- SCREAMING_SNAKE_CASE for exported constants: `LOGOS`, `FAQ_ITEMS`, `CASE_STUDIES`, `CAL_LINK`
- CSS custom properties use `--kebab-case`: `--bg`, `--surface`, `--border`, `--text`, `--muted`

**CSS Classes:**
- kebab-case throughout: `fade-in`, `faq-item`, `cta-primary`, `brand-logo`
- BEM-like prefix grouping without strict BEM: `case-row`, `case-left`, `case-title`, `case-desc`
- State modifiers as separate classes: `.open`, `.visible`, `.active`, `.delay`
- Component-scoped prefixes: `a2-footer-`, `case-tooltip-`, `team-`

## Code Style

**Formatting:**
- No Prettier or ESLint configured -- no automated formatting enforcement
- 2-space indentation in JSX and CSS
- Double quotes for JSX string attributes and imports
- Single quotes in CSS `font-family` values
- Semicolons used consistently in JS/JSX
- Trailing commas in multi-line arrays and objects

**Linting:**
- No linter configured (no `.eslintrc`, `.prettierrc`, or `biome.json` present)
- Follow existing patterns manually

## Import Organization

**Order:**
1. React/library imports (`import { useState, useEffect } from "react"`)
2. Local CSS imports (`import "./styles/global.css"`)
3. Local component imports (`import FadeIn from "./components/FadeIn"`)
4. Data/constant imports (`import { LOGOS, FAQ_ITEMS } from "./data/content"`)
5. Asset imports (`import frogGif from "./assets/frog.gif"`)

**Path Style:**
- Relative paths only (`./`, `../`) -- no path aliases configured
- No barrel files (no `index.js` re-exports in directories)

**Import Syntax:**
- Named imports for multiple exports: `import { useState, useEffect, useRef } from "react"`
- Default imports for components: `import FadeIn from "./components/FadeIn"`
- Named imports for data constants: `import { LOGOS, FAQ_ITEMS, CASE_STUDIES, CAL_LINK } from "./data/content"`
- Asset imports as default: `import frogGif from "./assets/frog.gif"`

## Component Patterns

**Function Components Only:**
- All components are function components using `export default function ComponentName()`
- No class components anywhere in the codebase

**Props:**
- Destructure props in function signature: `function Faq({ q, a, children })`
- Default parameter values: `function FadeIn({ children, className = "", style = {} })`
- Spread operator for config objects: `{...calAttrs}`

**State Management:**
- Local `useState` only -- no global state, no context, no Redux
- State declared at top of component function
- Multiple `useState` calls for independent state values

**Side Effects:**
- `useEffect` with cleanup functions for observers and event listeners
- Dynamic imports in `useEffect` for code-splitting: `import("@calcom/embed-react")`
- Empty dependency arrays `[]` for mount-only effects

**Refs:**
- `useRef` for DOM element references (IntersectionObserver pattern in `src/components/FadeIn.jsx`)

## CSS Approach

**Single Global Stylesheet:**
- All styles in `src/styles/global.css`
- No CSS modules, no CSS-in-JS, no Tailwind
- CSS custom properties (variables) defined on `:root`
- Class-based styling with `className` strings

**Dynamic Classes:**
- Template literals for conditional classes: `` className={`faq-q${open ? " open" : ""}`} ``
- This pattern is used consistently across all components

**Inline Styles:**
- Used sparingly for one-off overrides: `style={{ cursor: "pointer", border: "none" }}`
- Acceptable for layout adjustments that don't warrant a CSS class

## Error Handling

**Patterns:**
- No explicit error handling -- no try/catch blocks, no error boundaries
- Optional chaining not used (simple conditional checks: `if (!el) return`)
- Guard clauses for early returns: `if (!tooltip) return` in `src/components/Tooltip.jsx`

## Logging

**Framework:** None
- No console.log, no logging framework
- No error reporting service

## Comments

**When to Comment:**
- Comments are not used in this codebase
- No JSDoc, no inline comments, no TODO markers in source files

## Function Design

**Size:**
- Components are small (10-55 lines)
- Single responsibility per component file

**Parameters:**
- Components accept 1-4 props maximum
- Use destructuring with defaults in function signature

**Return Values:**
- Components return JSX directly
- No intermediate render variables (inline conditional rendering with ternaries)

## Module Design

**Exports:**
- One default export per component file
- Named exports for secondary components: `export const MakeLogo` in `src/components/iPaaSLogos.jsx`
- Named exports for all data constants in `src/data/content.js`

**Barrel Files:**
- Not used -- import directly from specific file paths

---

*Convention analysis: 2026-03-05*
