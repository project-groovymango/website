# Testing Patterns

**Analysis Date:** 2026-03-05

## Test Framework

**Runner:**
- No test framework is installed or configured
- No test runner in `package.json` scripts
- No `jest.config.*`, `vitest.config.*`, or similar config files exist

**Assertion Library:**
- None installed

**Run Commands:**
```bash
# No test commands available
# package.json scripts: dev, build, preview only
```

## Test File Organization

**Location:**
- No test files exist in the project source (`src/`)
- No `__tests__` directories
- No `*.test.*` or `*.spec.*` files outside `node_modules/`

## Test Coverage

**Current State:**
- Zero test coverage
- No coverage tooling configured
- No CI pipeline enforcing tests

## Recommendations for Adding Tests

If tests are to be added, follow these guidelines based on the existing stack:

**Recommended Setup:**
- Use Vitest (aligns with existing Vite build tool)
- Add to `vite.config.js` or create `vitest.config.js`
- Install: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`

**Suggested File Organization:**
- Co-locate test files next to source: `src/components/FadeIn.test.jsx`
- Use `.test.jsx` extension to match existing `.jsx` convention

**Suggested Test Structure:**
```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Faq from "./Faq";

describe("Faq", () => {
  it("renders question text", () => {
    render(<Faq q="Test question?" a="Test answer." />);
    expect(screen.getByText("Test question?")).toBeInTheDocument();
  });

  it("toggles answer visibility on click", async () => {
    // test toggle behavior
  });
});
```

**Priority Components to Test:**
1. `src/components/Faq.jsx` - Interactive toggle behavior
2. `src/components/FadeIn.jsx` - IntersectionObserver integration
3. `src/components/Tooltip.jsx` - Mouse-follow positioning logic
4. `src/components/ToolsMarquee.jsx` - Logo duplication for infinite scroll
5. `src/index.jsx` - Main App rendering and state management (show/hide, track toggle)

**Mocking Considerations:**
- `IntersectionObserver` needs mocking for `FadeIn` component tests
- `window.addEventListener("mousemove")` for `Tooltip` tests
- Dynamic `import("@calcom/embed-react")` in `src/index.jsx` needs module mocking

**What NOT to Test:**
- `src/data/content.js` - Static data, no logic
- `src/components/iPaaSLogos.jsx` - Pure SVG render, no logic
- `src/components/StepTitle.jsx` - Trivial hover state (low value)

## Test Types

**Unit Tests:**
- Not present. Would cover individual component rendering and state transitions.

**Integration Tests:**
- Not present. Would cover App-level interactions (e.g., FAQ open/close, work section expand).

**E2E Tests:**
- Not configured. No Playwright or Cypress.

---

*Testing analysis: 2026-03-05*
