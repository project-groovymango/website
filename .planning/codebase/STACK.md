# Technology Stack

**Analysis Date:** 2026-03-05

## Languages

**Primary:**
- JavaScript (JSX) - All application code in `src/`

**Secondary:**
- CSS - Custom styles in `src/styles/global.css`
- YAML - CI/CD workflow in `.github/workflows/deploy.yml`

## Runtime

**Environment:**
- Node.js 20 (specified in CI workflow `.github/workflows/deploy.yml`)
- Browser (client-side SPA)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present (lockfileVersion 3)

## Frameworks

**Core:**
- React ^18.2.0 - UI framework, single-page application
- Vite ^4.4.0 - Build tool and dev server

**Testing:**
- None detected

**Build/Dev:**
- Vite ^4.4.0 - Dev server (`npm run dev`), production build (`npm run build`), preview (`npm run preview`)
- `@vitejs/plugin-react` ^4.0.0 - React JSX transform and Fast Refresh

## Key Dependencies

**Critical:**
- `react` ^18.2.0 - Core UI framework
- `react-dom` ^18.2.0 - DOM rendering
- `@calcom/embed-react` ^1.5.3 - Cal.com scheduling embed for booking calls

**Infrastructure:**
- `vite` ^4.4.0 - Build toolchain
- `@vitejs/plugin-react` ^4.0.0 - Vite plugin for React support

## Configuration

**Environment:**
- No `.env` files detected
- No environment variables required; all configuration is hardcoded in source
- Cal.com link is defined as a constant in `src/data/content.js`: `CAL_LINK = "amin-laanaya-b5k6ne/30min"`

**Build:**
- `vite.config.js` - Vite configuration with React plugin; sets `base: "/website/"` for GitHub Pages subdirectory deployment
- No TypeScript configuration (no `tsconfig.json`)
- No linting or formatting config files

## Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build to dist/
npm run preview   # Preview production build locally
```

## Platform Requirements

**Development:**
- Node.js 20+
- npm

**Production:**
- Static hosting (GitHub Pages)
- No server-side runtime required
- Built assets served from `dist/` directory under `/website/` base path

---

*Stack analysis: 2026-03-05*
