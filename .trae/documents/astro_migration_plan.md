# Plan: Migrate Next.js Components to Astro Template

The goal is to upgrade the existing Astro "wireframe" template to use Tailwind CSS and feature rich components ported from the Next.js `src/templatesections`. We will prioritize using pure `.astro` components and be selective with CSS migration.

## 1. Infrastructure Setup

* [ ] **Dependencies**: Add `tailwindcss`, `@astrojs/tailwind`, `clsx`, `tailwind-merge`, and `lucide-react` to `wireframe/sitemanifest/generator/template/package.json`.

* [ ] **Configuration**:

  * Create `tailwind.config.mjs` in the template directory. We will map the CSS variables and custom animations from `src/app/globals.css` into the Tailwind config.

  * Update `astro.config.mjs` to include the `tailwind()` integration.

* [ ] **Selective CSS Porting**:

  * Instead of copying the entire `globals.css`, we will create a clean `template/src/styles/global.css`.

  * **Include**:

    * CSS Variables (`:root` and `.dark` colors).

    * Essential custom utility classes used by target components: `.bg-grid`, `.corner-brackets`, `.glow-*`, `.diagram-*`, `.status-dot`.

    * Keyframe animations (`fadeIn`, `pulseDot`, etc.).

  * **Exclude**: Unused legacy styles or unrelated global resets.

* [ ] **Utils**:

  * Create `template/src/lib/utils.ts` for the `cn` (class name merging) utility.

## 2. Component Porting

We will recreate the Next.js components as `.astro` components in `template/src/components/`.

| Next.js Component        | Astro Component           | Notes                                             |
| ------------------------ | ------------------------- | ------------------------------------------------- |
| `HeroSection.tsx`        | `Hero.astro`              | Replace `motion` with CSS animations/transitions. |
| `FeatureGridSection.tsx` | `FeatureBlock.astro`      | Port grid layout and hover effects.               |
| `PricingSection.tsx`     | `PricingGrid.astro`       | Port pricing cards.                               |
| `CTASection.tsx`         | `CtaBlock.astro`          | Port SVG overlay and button styles.               |
| `ComparisonGrid.tsx`     | `ComparisonColumns.astro` | Port comparison layout.                           |

## 3. Generator Verification

* [ ] **Test**: Run `generate.js` to ensure it produces the output directory with the new components correctly linked and styled.

## 4. Final Review

* [ ] Ensure all referenced components in `site.yaml` work correctly.

