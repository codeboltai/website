## Goal
Fix the styling/design issues in the generated site at:
- `/Users/utkarshshukla/Codebolt/website/wireframe/sitemanifest/output/gen-1771893043478/`
by validating and correcting the generator template (`.../generator/template/`) and the generator itself (`.../generator/generate.js`).

## What “broken design” usually means here
In this generator architecture, the generated site is an Astro + Tailwind project. If the design looks wrong, it’s almost always one of:
- Tailwind CSS is not being generated/served (CSS missing or build warnings/errors).
- The wrong Tailwind version is used (e.g. picking up the repo-root Tailwind instead of the generated project’s Tailwind).
- Global styles are not imported (layout doesn’t include `src/styles/global.css`).
- Theme defaults (light vs dark) don’t match expected design.
- The dev server is running from the wrong directory or without installing dependencies.

## Plan

### 1) Reproduce + pinpoint failure mode (no edits)
- Run the generated site from inside `output/gen-1771893043478/`:
  - `npm install`
  - `npm run dev` (and also try `npm run dev:portable` if the `astro` bin is flaky)
- In the browser:
  - Confirm whether CSS is loading (Network tab: does a large CSS asset load?).
  - Inspect `<html>` and `<body>` computed styles to see whether Tailwind utilities (e.g. `bg-background`, `text-foreground`, `border-border`) are actually applied.
- In the terminal:
  - Capture any Tailwind/PostCSS errors (especially “unknown utility class” errors).
  - Confirm which Tailwind package is being used (path in stack traces should point to `output/.../node_modules`, not `/Users/.../website/node_modules`).

### 2) Fix Tailwind resolution + CSS pipeline (template + generator)
Depending on what we find in step (1), apply the minimum fixes:
- **If Tailwind resolves from repo root instead of the generated project**
  - Ensure generated projects have their own `node_modules` by making the run instructions explicit in generator output, and by ensuring `package.json` dependencies are sufficient.
  - If needed, add a small guardrail in `generate.js` to print “run from output/<version>” plus a check that `node_modules` exists before `npm run dev`.
- **If Tailwind errors are coming from `@apply` in `global.css`**
  - Adjust `src/styles/global.css` to avoid `@apply` for theme primitives (replace with plain CSS using CSS vars), so it’s resilient across Tailwind toolchains.
- **If CSS isn’t imported**
  - Ensure `src/layouts/BaseLayout.astro` imports `../styles/global.css` (it should), and ensure the generated pages use `BaseLayout`.

### 3) Fix theme default (if “looks wrong” is actually light-mode)
If the site looks “incorrect” because it’s rendering in light mode by default:
- Add a template-level default so the site starts in dark mode unless the user explicitly chose light (or make it configurable via `site.yaml`, e.g. `site.theme.default: dark`).
- Update the inline theme bootstrap script in `BaseLayout.astro` to honor that default.

### 4) Verify end-to-end
- Regenerate to a new output version using `generate.js`.
- Run in the new output directory:
  - `npm install`
  - `npm run build`
  - `npm run dev` and visually verify the layout matches the intended dark/tailwind design.

## Expected code touch points (after approval)
- `/Users/utkarshshukla/Codebolt/website/wireframe/sitemanifest/generator/template/src/styles/global.css`
- `/Users/utkarshshukla/Codebolt/website/wireframe/sitemanifest/generator/template/src/layouts/BaseLayout.astro`
- `/Users/utkarshshukla/Codebolt/website/wireframe/sitemanifest/generator/generate.js`
- (Optional) `/Users/utkarshshukla/Codebolt/website/wireframe/sitemanifest/generator/content/site.yaml` for a `default theme` knob

## Success criteria
- Generated site runs with no Tailwind build errors.
- Tailwind utilities like `bg-background`, `text-foreground`, `border-border` render correctly.
- Visual design matches the intended “new Tailwind design” across pages.
