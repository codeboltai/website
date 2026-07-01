# Codebolt Website Design System

This document is the design contract for `newsite/`. Use it before adding or changing pages so the site keeps one visual language as it grows beyond the homepage.

## Design Position

Codebolt should feel like a serious software foundry for autonomous coding agents: technical, precise, dense enough for developers, and polished without becoming decorative. The site should present Codebolt as an operating layer for agentic software work, not as a generic AI landing page.

Prefer:

- Dark command-center surfaces with crisp borders and clear information hierarchy.
- Real product screenshots, terminal views, system diagrams, and technical UI patterns.
- Concise headings backed by specific operational detail.
- Compact controls, monospaced labels, and visible structure.
- Repeated components that scan predictably across pages.

Avoid:

- One-off page styling that redefines navigation, footer, buttons, or cards.
- Marketing-only sections with vague claims and no product surface.
- Decorative gradients, floating blobs, oversized cards, or illustration-only hero areas.
- Pale SaaS themes, purple/blue gradient dominance, or soft rounded-card layouts.
- Per-page header/footer copies.

## Source Of Truth

Current source files:

- `theme.tokens.json` owns design tokens and named navigation/footer links.
- This `DESIGN.md` owns design rules and component behavior.
- Astro owns shared `Header`, `Footer`, and `BaseLayout` components.
- Do not author standalone full HTML pages with copied headers or footers.

## Page Rules

Every public page must have:

- A concise `<title>` and meta description.
- Canonical URL.
- Open Graph and Twitter metadata.
- Structured data where the page represents Codebolt, a product surface, a download page, or a major product concept.
- Shared header and footer from common components.
- Root-relative internal links such as `/#problem` or `/download/`, not page-local links unless the target is inside that same page.
- One clear first-viewport signal: product name, product surface, or page offer.

## Visual System

### Color

The core palette is a dark technical interface with amber as the action and signal color.

- Page background: `ink`.
- Raised surfaces: `inkRaised` and `inkCard`.
- Borders: `line` and `lineBright`.
- Primary text: `text`.
- Secondary text: `textDim`.
- Faint metadata text: `textFaint`.
- Primary signal/action: `signal`.
- Signal hover/active states: `signalSoft` and `signalLine`.
- Technical neutral accent: `steel`.
- Error/risk accent: `danger`.

Do not introduce a new dominant color family for individual pages. New colors should be exceptional and should be added to `theme.tokens.json` with a named role.

### Typography

Use three type roles:

- Display: Bricolage Grotesque for H1, major H2s, product names, and strong card titles.
- Body: Inter for paragraphs, descriptions, lists, and normal navigation labels.
- Mono: IBM Plex Mono for labels, commands, code, counters, tabs, system states, small CTAs, and technical annotations.

Keep letter spacing at `0` for normal text. Use positive tracking only for uppercase mono labels.

### Layout

Use a shared wrapper:

- Max width: `1180px`.
- Gutter: `clamp(20px, 5vw, 64px)`.
- Sticky header height: `62px`.
- Section padding should use responsive clamps and should not rely on large empty decorative whitespace.

Use full-width sections with constrained inner content. Do not place page sections inside decorative outer cards. Cards are for repeated items, product choices, process steps, and compact framed tools.

### Background

The default page background is the dark coordinate grid already used on the homepage. It can be omitted on utility pages if visual density becomes too high, but do not replace it with gradient blobs or abstract hero art.

## Shared Components

### Header

All pages use the same header component:

- Sticky at top.
- 62px high.
- Codebolt brand links to `/`.
- Primary nav keeps buyer landing pages grouped under a `Solutions` dropdown, not as separate top-level links.
- The active route is visibly marked in the shared header component.
- CTA links to `/download/`.
- Mobile hides non-critical nav links while keeping the primary CTA visible.

Recommended nav labels:

- Solutions: `/for/`, with dropdown groups for `Use Codebolt` and `Build on Codebolt`
- Download: `/download/`
- Docs: `https://docs.codebolt.ai`
- Start free: `/download/`

### Footer

All pages use the same footer component:

- Brand lockup.
- Product and architecture links.
- Download link.
- Docs link when available.
- Short positioning line.

Footer links should come from the same navigation data as the header where possible.

### Buttons

Use two button styles:

- Primary: amber background, dark text, used for downloads, installs, and primary page actions.
- Secondary/ghost: transparent background, bright border, used for supporting actions.

Buttons use IBM Plex Mono, compact padding, and border radius of 7-9px. Do not create large pill buttons.

### Cards

Cards should be dense and functional:

- Background: `inkRaised` or `inkCard`.
- Border: `line` or `lineBright`.
- Border radius: 8-14px depending on component size.
- Titles use display font.
- Supporting copy uses dim body text.
- Technical labels, commands, and statuses use mono.

Cards should not contain other cards unless the inner element is a real framed control, code block, or table.

### Code And Commands

Use monospaced blocks for install commands, CLI examples, environment names, and API snippets. Command blocks should preserve contrast and include enough context to be useful without surrounding explanation text.

## Page Types

### Homepage

The homepage owns broad product positioning, hero imagery, system architecture, runtime explanation, extensibility, and primary start paths. Other pages should link back to homepage sections rather than duplicating long explanations.

### Download Page

The download page owns install surfaces: editor, CLI, cloud, and SDK. It should stay utilitarian and action-oriented, with platform cards and command blocks.

### Product Surface Pages

Examples: CLI, Editor, Cloud, SDK.

Each product page should include:

- Product-specific hero with concrete surface name.
- Screenshot or terminal/product UI within the first viewport when possible.
- Use cases and workflows.
- Setup or next action.
- Links to download, docs, and related surfaces.

### Concept Pages

Examples: Architecture, Runtime, Extensibility.

These pages should be diagram-led and explanatory, not fluffy. Prefer process diagrams, system boundaries, and concrete ownership models.

## Astro Rules

When working in Astro:

- Keep repeated `<head>` behavior in `BaseLayout.astro` or a dedicated SEO component if one is added.
- Keep header and footer in shared components.
- Keep global tokens and shared classes centralized.
- Keep page-specific CSS scoped to page components only when the pattern is not reusable.
- Keep public assets under `public/` or configure Astro to copy the existing image folders into `dist/`.
- Keep Wrangler static assets pointed at `./dist`.
- Keep validation checking required metadata and generated public routes.

## Review Checklist

Before shipping a new page:

- Header and footer match every other page.
- Page metadata is complete.
- CTA language is specific.
- Cards and buttons use existing styles.
- New colors, fonts, and spacing values are justified by `theme.tokens.json`.
- Mobile layout has no overlapping text or clipped controls.
- Sitemap, `llms.txt`, and `ai.txt` are updated when the public page set changes.
