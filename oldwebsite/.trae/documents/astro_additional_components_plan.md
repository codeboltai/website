# Plan: Port Additional Components to Astro

The user requested that we look at `src/templatesections/` and `src/components/` and convert them to Astro. I have identified several key components that are missing from the current generator template.

## 1. Components to Port

I will port the following components from Next.js (React) to Astro.

| Next.js Component | Astro Component | Description |
|-------------------|-----------------|-------------|
| `QuoteBlock.tsx` | `QuoteBlock.astro` | Styled blockquote/testimonial. |
| `TwoColumnSection.tsx` | `TwoColumnSection.astro` | Generic two-column layout. |
| `StatGridSection.tsx` | `StatGrid.astro` | Horizontal stats display. |
| `IconFeatureGridSection.tsx` | `IconGrid.astro` | Grid of icon + title + description. |
| `Accordion.tsx` | `Accordion.astro` | Interactive accordion (will need simple vanilla JS). |
| `SectionHeader.tsx` | `SectionHeader.astro` | Consistent section header. |
| `HighlightBannerSection.tsx` | `HighlightBanner.astro` | Centered banner for key messages. |

## 2. Generator Updates

- [ ] Update `generate.js` to map the following types:
    - `quote-block` -> `QuoteBlock`
    - `two-column` -> `TwoColumnSection`
    - `stat-grid` -> `StatGrid`
    - `icon-grid` -> `IconGrid`
    - `accordion` -> `Accordion`
    - `section-header` -> `SectionHeader`
    - `highlight-banner` -> `HighlightBanner`

## 3. Implementation Details

- **Accordion**: Since `Accordion.tsx` uses `useState` and `framer-motion`, I will implement the Astro version using `<details>` and `<summary>` for native accessibility and simple JS for animation if needed, or just standard CSS transitions.
- **Icons**: `IconFeatureGridSection` uses Lucide icons passed as props. In Astro, I can either import specific icons or expect the icon name as a string and dynamically render it (or just use a few standard ones for now). *Decision*: I will update the component to accept an icon name string and map it to a set of common Lucide icons, or just render a placeholder if dynamic import is too complex for this stage.

## 4. Verification

- [ ] Run `generate.js` to ensure the new components are correctly generated and linked.
