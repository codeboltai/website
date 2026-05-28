# Technical Diagram Design Guide

Use this guide when creating new detailed technical reference images in this folder. The target style is a dense engineering reference sheet: structured, monochrome-first, grid-backed, with limited green and ember accents for path meaning.

## Canvas

- Use a wide landscape SVG canvas, preferably `1800 x 1200`.
- Add a warm off-white background: `#f8f3e7`.
- Add a subtle square grid using 24px spacing with low-opacity tan strokes.
- Keep an outer border inset by 6-8px with a small radius.
- Use a title strip at the top, then a large topology panel, then smaller numbered reference panels below.

## Typography

- Use monospace fonts: `Consolas, "Courier New", ui-monospace, monospace`.
- Use bold only for title and section labels.
- Recommended weights:
  - Main title: `24px`, `font-weight: 700`.
  - Section headers: `16px`, `font-weight: 700`.
  - Box labels: `11-12px`, `font-weight: 600`.
  - Supporting text and table body: `8.5-9.5px`, `font-weight: 400`.
  - Legends: `10-11px`, `font-weight: 600`.
- Avoid heavy body text. The reference look depends on many small, regular-weight annotations.
- Keep text horizontally aligned to the box center only for box titles. Use left alignment in tables.
- For dense rows, use 14-16px vertical spacing. For box title lines, use 15-17px spacing.

## Colors

Base palette:

```text
background     #f8f3e7
panel fill     #fffdf7
box fill       #fffef9
grid line      #dbd2bf
ink            #2b2720
body text      #37322b
muted text     #5c564d
green          #2e7d4f
green fill     #fbfff9
ember          #c86a1b
ember fill     #fff8f2
```

Semantic meaning:

- Green means local, deterministic, cheap, file-backed, or direct service paths.
- Ember means model-backed, vector-backed, embedding-backed, expensive, or probabilistic paths.
- Black/dark means neutral orchestration, routing, API, or output flow.
- Do not overuse color fills. Most boxes should be neutral white with dark borders.

## Lines, Boxes, And Arrows

- Panels: `stroke-width: 2`, dark ink border, fill `#fffdf7`, radius 6-8px.
- Standard boxes: `stroke-width: 1.25-1.5`, radius 6px.
- Accent boxes: same weight, green or ember border, very pale fill.
- Dashed boxes: `stroke-dasharray: 5 4`.
- Standard connectors: `stroke-width: 1.1-1.3`.
- Arrowheads should be small. Use `markerUnits="userSpaceOnUse"` so arrowheads do not scale too heavily with stroke width.
- Good marker size:

```svg
<marker markerWidth="6" markerHeight="6" refX="5.6" refY="3" orient="auto" markerUnits="userSpaceOnUse">
  <path d="M 0 0 L 6 3 L 0 6 z" />
</marker>
```

- Avoid thick connector lines. Heavy arrows make the diagram look unfinished.
- Use dashed vertical separators for major lanes.

## Layout Pattern

Use numbered panels like the reference:

- `901 SYSTEM topology`: large top panel showing end-to-end flow.
- `902 PRIMITIVES table`: compact schema/type table.
- `903 INGEST pipeline`: pipeline or lifecycle flow.
- `904 CORE retrieval formula area`: algorithm or decision core.
- `905 STATE scopes`: lifecycle/state storage view.
- `906 TIERS derivation cascade`: tiered derivation or transformation chain.
- `907 SURFACES`: API, CLI, workers, sockets, adapters.
- `908 BOOT`: setup/readiness sequence.

Keep the top panel as the primary architecture map. Lower panels should explain details, not duplicate the top panel.

## Tables

- Tables should have a visible header row and thin row separators.
- Use left-aligned text in table cells.
- Keep source-file labels short. Prefer `persistentMemory.ts` over full paths.
- Avoid strings longer than about 35-40 characters inside narrow table cells.
- If a table needs long text, split it into multiple short phrases across adjacent rows or use a wider panel.

## Text Fitting

- Do not place long service names in narrow boxes.
- Prefer short display names:
  - `PersistentMemoryPipelineService` -> `PipelineService`
  - `ContextAssemblyService` -> `ContextAssembly`
  - `memoryIngestion:execution-completed` -> `execution-completed`
  - `.codebolt/knowledge | .codebolt/vectordb | project.db` -> `knowledge / vectordb / project.db`
- If a label must stay exact, widen the box instead of shrinking the font below 8px.
- Centered labels should usually be 1-3 words per line.

## SVG Structure

Start new SVG files with:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1200" viewBox="0 0 1800 1200" role="img" aria-label="...">
  <defs>
    <!-- grid, arrow markers, styles -->
  </defs>
  <!-- background, border, title strip, panels -->
</svg>
```

Recommended CSS baseline:

```css
svg { text-rendering: geometricPrecision; shape-rendering: geometricPrecision; }
.title { font-family: Consolas, "Courier New", ui-monospace, monospace; font-size: 24px; font-weight: 700; }
.section { font-family: Consolas, "Courier New", ui-monospace, monospace; font-size: 16px; font-weight: 700; }
.label { font-family: Consolas, "Courier New", ui-monospace, monospace; font-size: 11.5px; font-weight: 600; }
.small { font-family: Consolas, "Courier New", ui-monospace, monospace; font-size: 9.4px; font-weight: 400; }
.tiny { font-family: Consolas, "Courier New", ui-monospace, monospace; font-size: 8.5px; font-weight: 400; }
```

## Quality Checklist

- XML parses cleanly.
- Arrowheads look small and precise.
- Body text is not bold.
- No narrow box contains overflowing text.
- Tables have row separators and short cell labels.
- Green and ember each have a clear semantic meaning.
- The top panel can be understood without reading every lower panel.
- The final SVG looks dense and technical, but still aligned and deliberate.
