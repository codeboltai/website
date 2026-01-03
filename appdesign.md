# CodeboltAI Application Design System

> **Version:** 2.0.0  
> **Last Updated:** December 2024  
> **Design Reference:** [Dropstone.io](https://dropstone.io)

This document defines the complete design system for CodeboltAI, ensuring visual consistency across all pages and components. It serves as the single source of truth for developers and AI agents working on the codebase.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Components](#5-components)
6. [Diagrams & Visualizations](#6-diagrams--visualizations)
7. [Animations & Motion](#7-animations--motion)
8. [Iconography](#8-iconography)
9. [Responsive Design](#9-responsive-design)
10. [Accessibility](#10-accessibility)
11. [Code Examples](#11-code-examples)

---

## 1. Design Philosophy

### Core Principles

1. **Technical Sophistication** - The design should feel like a professional engineering tool, not a consumer app
2. **Data-Driven UI** - Use metrics, stats, and visualizations to convey capability
3. **Clean Minimalism** - Reduce visual noise; let content breathe
4. **Systematic Consistency** - Every element follows predictable patterns

### Visual Identity

- **Theme:** Dark-first, technical, data-rich
- **Mood:** Professional, cutting-edge, trustworthy, precise
- **Inspiration:** IDE interfaces, system monitoring dashboards, technical documentation

### Key Visual Patterns

| Pattern | Description | Usage |
|---------|-------------|-------|
| Corner Brackets | L-shaped decorative corners on containers | Diagram boxes, feature cards |
| Grid Backgrounds | Subtle 40px grid pattern | Hero sections, diagram containers |
| Status Indicators | Pulsing dots with labels | System status, live features |
| Stats Grids | 2x2 divided metric displays | Feature sections, dashboards |
| Numbered Sections | Accent bar + numbered label | Sequential content sections |
| Technical Labels | Uppercase monospace with tracking | Metadata, categories, versions |

---

## 2. Color System

### CSS Variables

All colors are defined as HSL values in CSS variables for easy theming.

```css
:root {
  /* Light Mode */
  --background: 0 0% 100%;           /* #ffffff */
  --foreground: 0 0% 9%;             /* #171717 */
  --card: 0 0% 98%;                  /* #fafafa */
  --card-foreground: 0 0% 9%;        /* #171717 */
  --popover: 0 0% 100%;              /* #ffffff */
  --popover-foreground: 0 0% 9%;     /* #171717 */
  --primary: 186 100% 42%;           /* #00d4d4 - Cyan */
  --primary-foreground: 0 0% 0%;     /* #000000 */
  --secondary: 0 0% 96%;             /* #f5f5f5 */
  --secondary-foreground: 0 0% 9%;   /* #171717 */
  --muted: 0 0% 96%;                 /* #f5f5f5 */
  --muted-foreground: 0 0% 45%;      /* #737373 */
  --accent: 0 0% 96%;                /* #f5f5f5 */
  --accent-foreground: 0 0% 9%;      /* #171717 */
  --destructive: 0 84% 60%;          /* #ef4444 */
  --destructive-foreground: 0 0% 100%;
  --border: 0 0% 90%;                /* #e5e5e5 */
  --input: 0 0% 90%;                 /* #e5e5e5 */
  --ring: 186 100% 42%;              /* #00d4d4 */
  --radius: 0.375rem;
  
  /* Semantic Colors */
  --success: 142 76% 36%;            /* #22c55e */
  --warning: 38 92% 50%;             /* #f59e0b */
  --info: 199 89% 48%;               /* #0ea5e9 */
}

.dark {
  /* Dark Mode - Primary Theme */
  --background: 0 0% 0%;             /* #000000 */
  --foreground: 0 0% 98%;            /* #fafafa */
  --card: 0 0% 4%;                   /* #0a0a0a */
  --card-foreground: 0 0% 98%;       /* #fafafa */
  --popover: 0 0% 4%;                /* #0a0a0a */
  --popover-foreground: 0 0% 98%;    /* #fafafa */
  --primary: 186 100% 42%;           /* #00d4d4 - Cyan */
  --primary-foreground: 0 0% 0%;     /* #000000 */
  --secondary: 0 0% 10%;             /* #1a1a1a */
  --secondary-foreground: 0 0% 98%;  /* #fafafa */
  --muted: 0 0% 15%;                 /* #262626 */
  --muted-foreground: 0 0% 64%;      /* #a3a3a3 */
  --accent: 0 0% 15%;                /* #262626 */
  --accent-foreground: 0 0% 98%;     /* #fafafa */
  --destructive: 0 62% 30%;          /* #7f1d1d */
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 15%;                /* #262626 */
  --input: 0 0% 15%;                 /* #262626 */
  --ring: 186 100% 42%;              /* #00d4d4 */
}
```

### Color Palette Reference

#### Primary Colors

| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| Background | `#ffffff` | `#000000` | Page background |
| Foreground | `#171717` | `#fafafa` | Primary text |
| Card | `#fafafa` | `#0a0a0a` | Card backgrounds |
| Primary | `#00d4d4` | `#00d4d4` | CTAs, links, accents |
| Border | `#e5e5e5` | `#262626` | Dividers, borders |

#### Text Colors

| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| Primary Text | `#171717` | `#ffffff` | Headlines, important text |
| Secondary Text | `#525252` | `#a3a3a3` | Body copy, descriptions |
| Muted Text | `#737373` | `#737373` | Labels, metadata |
| Disabled Text | `#a3a3a3` | `#525252` | Disabled states |

#### Semantic Colors

| Name | Value | Usage |
|------|-------|-------|
| Success | `#22c55e` | Positive metrics, success states |
| Warning | `#f59e0b` | Warnings, caution states |
| Error | `#ef4444` | Errors, destructive actions |
| Info | `#0ea5e9` | Informational elements |

#### Accent Variations

| Name | Value | Usage |
|------|-------|-------|
| Cyan 50 | `#ecfeff` | Light backgrounds |
| Cyan 100 | `#cffafe` | Hover states (light) |
| Cyan 400 | `#22d3ee` | Hover states (dark) |
| Cyan 500 | `#06b6d4` | Primary accent |
| Cyan 600 | `#0891b2` | Active states |
| Cyan 900 | `#164e63` | Dark accents |

---

## 3. Typography

### Font Stack

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 
               'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, monospace;
}
```

### Type Scale

| Name | Size | Weight | Line Height | Letter Spacing | Usage |
|------|------|--------|-------------|----------------|-------|
| Display | 72px / 4.5rem | 600 | 1.0 | -0.02em | Hero headlines |
| H1 | 48px / 3rem | 600 | 1.1 | -0.02em | Page titles |
| H2 | 36px / 2.25rem | 600 | 1.2 | -0.01em | Section headers |
| H3 | 24px / 1.5rem | 600 | 1.3 | 0 | Card titles |
| H4 | 20px / 1.25rem | 600 | 1.4 | 0 | Subsection titles |
| Body Large | 18px / 1.125rem | 400 | 1.6 | 0 | Lead paragraphs |
| Body | 16px / 1rem | 400 | 1.6 | 0 | Default body text |
| Body Small | 14px / 0.875rem | 400 | 1.5 | 0 | Secondary text |
| Caption | 12px / 0.75rem | 400 | 1.4 | 0 | Captions, hints |
| Label | 11px / 0.6875rem | 500 | 1.2 | 0.1em | Uppercase labels |
| Micro | 10px / 0.625rem | 500 | 1.2 | 0.15em | Tiny labels, badges |

### Typography Classes

```css
/* Headlines */
.text-display { @apply text-6xl md:text-7xl font-semibold tracking-tight leading-none; }
.text-h1 { @apply text-4xl md:text-5xl font-semibold tracking-tight leading-tight; }
.text-h2 { @apply text-2xl md:text-3xl font-semibold tracking-tight leading-tight; }
.text-h3 { @apply text-xl md:text-2xl font-semibold leading-snug; }
.text-h4 { @apply text-lg md:text-xl font-semibold leading-snug; }

/* Body */
.text-body-lg { @apply text-lg leading-relaxed; }
.text-body { @apply text-base leading-relaxed; }
.text-body-sm { @apply text-sm leading-relaxed; }

/* Labels - CRITICAL: Always uppercase, monospace, letter-spaced */
.text-label { 
  @apply text-[11px] font-mono font-medium uppercase tracking-[0.1em] text-muted-foreground;
}
.text-label-sm { 
  @apply text-[10px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground;
}
.text-label-xs { 
  @apply text-[9px] font-mono font-medium uppercase tracking-[0.2em] text-muted-foreground;
}

/* Special */
.text-mono { @apply font-mono; }
.text-gradient { 
  @apply bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent;
}
```

### Label Conventions

Labels are a critical part of the design language. They should ALWAYS be:

1. **Uppercase** - Never sentence case
2. **Monospace** - Use `font-mono`
3. **Letter-spaced** - Minimum `tracking-[0.1em]`
4. **Small** - 10-11px typically
5. **Muted** - Use `text-muted-foreground`

**Examples:**
- `SYSTEM ARCHITECTURE: FRONTEND`
- `FIG 2.0 — INFERENCE ROUTING`
- `MODE: GUIDED_AUTONOMY`
- `v.4.0.2`

---

## 4. Spacing & Layout

### Spacing Scale

Based on 4px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-0` | 0px | Reset |
| `spacing-1` | 4px | Tight inline spacing |
| `spacing-2` | 8px | Icon gaps, tight padding |
| `spacing-3` | 12px | Small padding |
| `spacing-4` | 16px | Default padding |
| `spacing-5` | 20px | Medium padding |
| `spacing-6` | 24px | Section padding |
| `spacing-8` | 32px | Large padding |
| `spacing-10` | 40px | XL padding |
| `spacing-12` | 48px | Section gaps |
| `spacing-16` | 64px | Large section gaps |
| `spacing-20` | 80px | XL section gaps |
| `spacing-24` | 96px | Section vertical padding |
| `spacing-32` | 128px | Hero vertical padding |

### Container Widths

| Name | Max Width | Usage |
|------|-----------|-------|
| `max-w-screen-sm` | 640px | Narrow content |
| `max-w-screen-md` | 768px | Medium content |
| `max-w-screen-lg` | 1024px | Default content |
| `max-w-screen-xl` | 1280px | Wide content |
| `max-w-[1400px]` | 1400px | Header container |
| `max-w-[1600px]` | 1600px | Full-width sections |

### Grid System

```css
/* Standard content grid */
.grid-content {
  @apply grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8;
}

/* Feature card grid */
.grid-features {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* Stats grid (2x2) */
.grid-stats {
  @apply grid grid-cols-2 divide-x divide-border;
}
```

### Section Structure

```tsx
// Standard section padding
<section className="py-16 md:py-24 lg:py-32 px-6">
  <div className="max-w-[1600px] mx-auto">
    {/* Section header */}
    <div className="mb-12 md:mb-16 lg:mb-20">
      <StatusLabel>SECTION LABEL</StatusLabel>
      <h2 className="text-h2">Section Title</h2>
      <p className="text-body text-muted-foreground max-w-2xl">
        Description text
      </p>
    </div>
    
    {/* Section content */}
    <div className="grid-features">
      {/* Content */}
    </div>
  </div>
</section>
```

---

## 5. Components

### 5.1 Status Label

Small uppercase label with optional status dot.

```tsx
interface StatusLabelProps {
  children: React.ReactNode
  dotColor?: 'primary' | 'success' | 'warning' | 'error'
  showDot?: boolean
}

// Usage
<StatusLabel dotColor="primary">SYSTEM ARCHITECTURE: FRONTEND</StatusLabel>
```

**Styling:**
- Font: `text-[10px] font-mono uppercase tracking-[0.15em]`
- Color: `text-muted-foreground`
- Dot: 6x6px with optional pulse animation

### 5.2 Status Badge

Inline badge for status indicators like "LIVE", "ENCRYPTED", version numbers.

```tsx
interface StatusBadgeProps {
  variant: 'live' | 'encrypted' | 'version' | 'default'
  children: React.ReactNode
}

// Usage
<StatusBadge variant="live">LIVE</StatusBadge>
<StatusBadge variant="version">v.4.0.2</StatusBadge>
```

**Styling:**
- Live: Green dot + green text
- Encrypted: Green text
- Version: Border + muted text
- Font: `text-[10px] font-mono uppercase tracking-wider`

### 5.3 Tech Card

Card component with corner brackets, figure label, and optional stats.

```tsx
interface TechCardProps {
  figureLabel: string      // e.g., "FIG 3.1 — LINEAR ATTENTION"
  title: string
  description: string
  diagram?: React.ReactNode
  stats?: Array<{ label: string; value: string }>
}
```

**Structure:**
```
┌─────────────────────────────────────┐
│ ┌─                               ─┐ │
│   ● FIG 3.1 — LINEAR ATTENTION     │
│                                     │
│        [DIAGRAM AREA]               │
│                                     │
│ └─                               ─┘ │
├─────────────────────────────────────┤
│ Infinite Context                    │
│                                     │
│ Virtualized session handling...     │
│                                     │
│ ─────────────────────────────────── │
│ CAPACITY        ∞ (Virtual)         │
└─────────────────────────────────────┘
```

**Styling:**
- Background: `bg-card`
- Border: `border border-border`
- Corner brackets: Pseudo-elements, 12px L-shapes
- Figure label: `text-label-sm` with cyan dot
- Title: `text-lg font-semibold`
- Description: `text-sm text-muted-foreground`
- Stats divider: `border-t border-border`

### 5.4 Stats Grid

2x2 grid for displaying metrics.

```tsx
interface StatsGridProps {
  stats: Array<{
    label: string
    value: string
    highlight?: boolean  // Uses success color
  }>
}

// Usage
<StatsGrid stats={[
  { label: 'INFERENCE', value: 'L2' },
  { label: 'ENTROPY', value: 'Low', highlight: true },
  { label: 'NODES', value: '25' },
  { label: 'PROTOCOL', value: 'Adv/01' }
]} />
```

**Structure:**
```
┌──────────────┬──────────────┐
│ INFERENCE    │ ENTROPY      │
│ L2           │ Low ●        │
├──────────────┼──────────────┤
│ NODES        │ PROTOCOL     │
│ 25           │ Adv/01       │
└──────────────┴──────────────┘
```

### 5.5 Diagram Container

Container for technical diagrams with grid background and corner decorations.

```tsx
interface DiagramContainerProps {
  children: React.ReactNode
  showGrid?: boolean
  className?: string
}
```

**Styling:**
- Background: `bg-card` with optional grid pattern
- Border: `border border-border`
- Corner brackets: 12px L-shapes at each corner
- Grid: 40px pattern at 10% opacity

### 5.6 Numbered Section

Section with numbered label and accent bar.

```tsx
interface NumberedSectionProps {
  number: string       // "01"
  label: string        // "REASONING RUNTIME"
  title: string        // "Simulation over Iteration"
  description?: string
}
```

**Structure:**
```
│ 01 — REASONING RUNTIME
│ 
│ Simulation over Iteration
│
│ Description text goes here...
```

**Styling:**
- Accent bar: 4px wide, `bg-primary`, full height
- Number + label: `text-label-sm`
- Title: `text-xl md:text-2xl font-semibold`

### 5.7 Button

Primary action button.

**Variants:**
- `primary`: Solid cyan background, black text
- `secondary`: Dark background, white text
- `outline`: Transparent with border
- `ghost`: No background, subtle hover

**Sizes:**
- `sm`: `text-sm px-3 py-1.5`
- `md`: `text-sm px-4 py-2`
- `lg`: `text-sm px-6 py-3`

**Primary Button Styling:**
```css
.btn-primary {
  @apply bg-primary text-primary-foreground font-medium;
  @apply hover:bg-cyan-400 transition-colors;
  @apply rounded-full; /* Pill shape for main CTAs */
}
```

### 5.8 Header

Fixed navigation header.

**Structure:**
```
┌────────────────────────────────────────────────────────┐
│ [Logo] Codebolt    Features Pricing ... │ [◐] Dashboard │
└────────────────────────────────────────────────────────┘
```

**Styling:**
- Height: 64px
- Background: `bg-background/80 backdrop-blur-xl`
- Border: `border-b border-border`
- Logo: 24px icon + "Codebolt" text
- Nav links: `text-sm text-muted-foreground hover:text-foreground`
- CTA: Cyan pill button

### 5.9 Footer

Multi-column footer with links and legal text.

**Structure:**
```
┌────────────────────────────────────────────────────────┐
│ [Logo]              Product    Resources    Company    │
│ Codebolt            Features   Docs         About      │
│                     Pricing    Status       Blog       │
│ Description...      Downloads  Contact      Careers    │
│                     ...        ...          ...        │
│ ● Systems Operational                                  │
├────────────────────────────────────────────────────────┤
│ © 2025 CodeboltAI...        Terms  Privacy  Cookies    │
├────────────────────────────────────────────────────────┤
│ [Legal disclaimer text block]                          │
└────────────────────────────────────────────────────────┘
```

---

## 6. Diagrams & Visualizations

### 6.1 Design Principles

1. **Monochrome Base** - Use grays for structure, cyan for highlights
2. **Geometric Precision** - Align to grid, use consistent stroke widths
3. **Subtle Animation** - Animate data flow, not structural elements
4. **Technical Labels** - Always label with figure numbers

### 6.2 Common Diagram Types

#### Node Grid (5x5)
Grid of nodes showing active/inactive states.

```
┌─                                    ─┐
   ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐
   │ ●│ │ ●│ │ ●│ │ ●│ │ ●│  ← SIM_CORE
   └──┘ └──┘ └──┘ └──┘ └──┘
   ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐
   │ ○│ │ ○│ │ ○│ │ ○│ │ ○│  ← ADV_NODE (cyan)
   └──┘ └──┘ └──┘ └──┘ └──┘
└─                                    ─┘
   ● SIM_CORE    ○ ADV_NODE
```

#### Network Mesh
Connected nodes with animated packets.

```
        AGENT_A ●───────● AGENT_B
                 \     /
                  \   /
                   ● HUB_01
                  /   \
                 /     \
        AGENT_C ●───────● AGENT_D
```

#### Flow Pipeline
Linear process flow with gates.

```
INPUT_STREAM → [*] → ADVERSARIAL_GATE → ENTROPY_GATE → DETERMINISTIC
                      ↓                  ↓
                 SYSCALL_FILTER    PPL_MONITORING
```

#### Inference Routing
Two-panel diagram showing orchestrator and swarm.

```
┌─────────────────┐         ┌─────────────────┐
│  ORCHESTRATOR   │  ──→    │   SCOUT SWARM   │
│    ┌─────┐      │ 128kb   │   ┌─┬─┬─┬─┐     │
│    │  ●  │      │         │   ├─┼─┼─┼─┤     │
│    └─────┘      │         │   └─┴─┴─┴─┘     │
│ Layer 3 / Root  │         │ Layer 1 / Dist  │
└─────────────────┘         └─────────────────┘
```

### 6.2.1 How to Generate Diagrams (Agent Workflow)

This is the **standard workflow** for creating any new diagram so it matches the Dropstone/Codebolt design language and remains reusable.

1. **Pick a diagram type** (from 6.2) and confirm the story:
   - What is the diagram explaining in one sentence?
   - What is the “signal” (highlight) vs the “structure” (monochrome base)?
2. **Choose a canvas spec** (see 6.2.2):
   - Prefer a stable `viewBox` so it scales cleanly.
   - Prefer integer coordinates to avoid blur.
3. **Design on a grid**:
   - Layout using an 8px or 10px internal grid.
   - Align strokes and nodes to grid intersections.
4. **Build the SVG in layers** (see 6.2.4):
   - Base grid (optional)
   - Structural geometry (boxes/edges)
   - Highlight geometry (accent nodes/flows)
   - Labels (monospace, uppercase, small)
5. **Add motion only for data flow** (see 6.2.6):
   - Animate packets, scanning lines, pulses
   - Do not animate borders/layout containers
6. **Wrap it in a consistent container**:
   - Use existing wrappers (`DiagramContainer`, `DiagramPanel`, etc.) when possible
   - The wrapper controls chrome: borders, grid bg, corner brackets, captions
7. **Expose a minimal component API**:
   - `className?: string`
   - Optional `variant`, `accent`, `density`, `reducedMotion` (where helpful)
8. **Validate visually and semantically**:
   - In both **dark + light mode**
   - With `prefers-reduced-motion`
   - At multiple widths (mobile/desktop)

### 6.2.2 Diagram Specification (Required)

Before writing code, every new diagram must have a small “spec” (even if informal):

- **Purpose**: what it communicates
- **Type**: node grid / mesh / pipeline / routing / chart
- **Canvas**: `viewBox` and aspect ratio
- **Legend**: what the dot/line colors mean
- **Accent token**: `--primary` / semantic accent (emerald/amber/indigo/violet)
- **Motion**: what moves and why (data flow only)
- **Caption**: `FIG X.Y — TITLE` (used by the wrapper or section)

Recommended `viewBox` standards:

- **Cards / embedded panels**: `viewBox="0 0 400 240"` or `0 0 480 300`
- **Wide topology panels**: `viewBox="0 0 800 300"`
- **Square plots**: `viewBox="0 0 300 300"` (or `200x200` for compact)

### 6.2.3 Layout & Grid Standards

To avoid “soft” SVG rendering:

- **Use integer coordinates** for key geometry (rects, lines, circles).
- **Prefer even stroke widths** and align to pixel boundaries:
  - For 1px strokes, align to `0.5` offsets only when needed (`x=10.5`) to hit device pixels.
- **Use consistent spacing units**:
  - Small gaps: 8px
  - Medium gaps: 16px
  - Major blocks: 24px / 32px
- **Avoid arbitrary positions** unless the diagram is intentionally “organic”.

### 6.2.4 Stroke / Fill / Opacity Standards (CRITICAL)

The diagram language is *monochrome structure + one accent*.

- **Structure strokes**:
  - Stroke color: `hsl(var(--border))` or `hsl(var(--muted-foreground) / 0.6)`
  - Stroke width:
    - Hairline: `0.5` (secondary grid/aux lines)
    - Normal: `1` (most edges, boxes)
    - Emphasis: `1.5` (highlight flow, key edges)
- **Fills**:
  - Most shapes: `fill="none"` or `fill="hsl(var(--card))"` if needed
  - Highlight fill: `hsl(var(--primary) / 0.08)` to `0.15`
- **Opacity**:
  - Background grid: `0.06`–`0.12`
  - Secondary edges: `0.25`–`0.5`
  - Primary highlight: `0.9`–`1`

Do not hardcode random hex colors unless matching a reference screenshot. Prefer tokens.

### 6.2.5 Labels, Figure IDs, and Legends

All diagram text should follow our “technical label” convention:

- **Font**: monospace
- **Case**: uppercase
- **Size**: `8px–10px`
- **Color**: `hsl(var(--muted-foreground))` (or tinted accent for emphasis)
- **Tracking**: letter-spaced for labels (CSS `tracking-[0.2em]` equivalent where possible)

Best practice:

- Keep labels **outside dense geometry** when possible.
- Provide a tiny legend (“Link”, “Packet”, “Node”) if the diagram has multiple marks.
- Captions belong in the **section wrapper**, not inside the SVG, unless the diagram is standalone.

### 6.2.6 Motion Standards (Data Flow Only)

Motion should communicate **flow, scanning, or liveness**—never decorative chaos.

- **Allowed**:
  - Packet dots moving along edges
  - Scanning bars (enterprise “protocol monitor”)
  - Pulse on active nodes or alerts
  - Slow rotation only when it conveys a system loop (very subtle)
- **Avoid**:
  - Moving borders/frames
  - Layout shifts
  - Continuous jitter

Implementation guidance:

- Prefer **CSS keyframes** or simple SVG animations for lightweight motion.
- If using `motion/react`, keep it localized and honor reduced-motion.
- Duration guidelines:
  - Pulse: 1.8s–2.5s
  - Scan sweep: 2.5s–4.5s
  - Packet travel: 1.2s–2.0s (staggered)

### 6.2.7 Accessibility & Reduced Motion

- Diagrams are usually **decorative** and should not spam screen readers:
  - Set `aria-hidden="true"` on purely decorative SVGs.
  - If informative, add `role="img"` and a short `aria-label`.
- Respect `prefers-reduced-motion`:
  - Disable continuous animations when reduced motion is enabled.
  - Provide a “static” state that still communicates structure.

### 6.2.8 Component Standards for Diagram Files

Where diagrams should live:

- **Diagrams**: `src/components/diagrams/<DiagramName>.tsx`
- **Wrappers/containers**: `src/components/ui/DiagramContainer.tsx` or `src/templatesections/DiagramPanel.tsx`

Required props:

```tsx
export default function SomeDiagram({
  className,
  ...props
}: {
  className?: string
}) {
  return (
    <svg className={className} viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ... */}
    </svg>
  )
}
```

Optional props (use sparingly):

- `variant?: 'standalone' | 'embedded'`
- `accent?: 'primary' | 'violet' | 'indigo' | 'emerald' | 'amber'`
- `reducedMotion?: boolean`

### 6.2.9 Diagram Review Checklist (Ship Gate)

Before merging a new diagram:

- **Visual**: looks correct in dark + light mode
- **Scale**: readable at `sm`, `md`, `lg`
- **Tokens**: uses `hsl(var(--...))` instead of random hex
- **Motion**: only flow/pulse/scan; reduced-motion supported
- **Labels**: monospace + uppercase + small; not overlapping key geometry
- **Wrapper**: uses the standard diagram chrome (border, grid bg, corners) where needed

### 6.3 SVG Conventions

```tsx
// Standard SVG container
<svg 
  viewBox="0 0 400 300" 
  className="w-full h-auto"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Grid lines */}
  <g stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3">
    {/* Grid pattern */}
  </g>
  
  {/* Main elements */}
  <g stroke="hsl(var(--border))" fill="hsl(var(--card))">
    {/* Diagram elements */}
  </g>
  
  {/* Active/highlighted elements */}
  <g stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)">
    {/* Highlighted elements */}
  </g>
  
  {/* Labels */}
  <text 
    className="text-[10px] font-mono uppercase" 
    fill="hsl(var(--muted-foreground))"
  >
    LABEL
  </text>
</svg>
```

### 6.4 Corner Brackets

CSS implementation for corner brackets:

```css
.corner-brackets {
  position: relative;
}

.corner-brackets::before,
.corner-brackets::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: hsl(var(--border));
  pointer-events: none;
}

.corner-brackets::before {
  top: 8px;
  left: 8px;
  border-left-width: 1px;
  border-top-width: 1px;
}

.corner-brackets::after {
  top: 8px;
  right: 8px;
  border-right-width: 1px;
  border-top-width: 1px;
}

/* Additional pseudo-elements via wrapper */
.corner-brackets-bottom::before {
  bottom: 8px;
  left: 8px;
  border-left-width: 1px;
  border-bottom-width: 1px;
}

.corner-brackets-bottom::after {
  bottom: 8px;
  right: 8px;
  border-right-width: 1px;
  border-bottom-width: 1px;
}
```

---

## 7. Animations & Motion

### 7.1 Animation Library

Use `motion/react` (Framer Motion) for all animations.

### 7.2 Standard Transitions

| Property | Duration | Easing | Usage |
|----------|----------|--------|-------|
| Color | 150ms | ease | Hover states |
| Background | 200ms | ease | Button hovers |
| Transform | 300ms | ease-out | Enter animations |
| Opacity | 200ms | ease | Fade in/out |

### 7.3 Animation Presets

```tsx
// Fade in from bottom
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

// Stagger children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Scale in
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
}
```

### 7.4 Status Pulse Animation

```css
@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.5);
  }
}

.pulse-dot {
  animation: pulse-dot 2s ease-in-out infinite;
}
```

### 7.5 Glow Effect

```css
.glow-primary {
  box-shadow: 
    0 0 10px hsl(var(--primary) / 0.3),
    0 0 20px hsl(var(--primary) / 0.1);
}

.glow-primary-lg {
  box-shadow: 
    0 0 20px hsl(var(--primary) / 0.4),
    0 0 40px hsl(var(--primary) / 0.2);
}
```

---

## 8. Iconography

### 8.1 Icon Library

Use **Lucide React** exclusively.

```tsx
import { Box, ChevronRight, Check, X } from 'lucide-react'
```

### 8.2 Icon Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| `xs` | 12px | Inline with small text |
| `sm` | 16px | Buttons, inline |
| `md` | 20px | Default |
| `lg` | 24px | Headers, emphasis |
| `xl` | 32px | Feature icons |

### 8.3 Icon Styling

```tsx
// Default
<Icon className="w-5 h-5 text-muted-foreground" />

// Interactive
<Icon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />

// Primary accent
<Icon className="w-5 h-5 text-primary" />
```

---

## 9. Responsive Design

### 9.1 Breakpoints

| Name | Min Width | Usage |
|------|-----------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1536px | Extra large |

### 9.2 Responsive Patterns

```tsx
// Typography scaling
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">

// Grid columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Padding scaling
<section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">

// Show/hide
<nav className="hidden md:flex">
<button className="md:hidden">
```

### 9.3 Mobile Considerations

1. **Touch targets**: Minimum 44x44px
2. **Text size**: Never below 14px for body text
3. **Spacing**: Reduce section padding on mobile
4. **Navigation**: Hamburger menu below `md` breakpoint
5. **Diagrams**: Simplify or stack vertically on mobile

---

## 10. Accessibility

### 10.1 Color Contrast

All text must meet WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### 10.2 Focus States

```css
/* Custom focus ring */
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Remove default and use custom */
button:focus {
  outline: none;
}
button:focus-visible {
  @apply ring-2 ring-primary ring-offset-2 ring-offset-background;
}
```

### 10.3 Screen Reader Considerations

```tsx
// Decorative elements
<div aria-hidden="true" className="corner-brackets" />

// Status indicators
<span className="sr-only">System status: operational</span>
<span className="pulse-dot" aria-hidden="true" />

// Interactive labels
<button aria-label="Toggle navigation menu">
  <MenuIcon aria-hidden="true" />
</button>
```

### 10.4 Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Code Examples

### 11.1 Complete Section Example

```tsx
import { motion } from 'motion/react'
import StatusLabel from '@/components/ui/StatusLabel'
import TechCard from '@/components/ui/TechCard'
import StatsGrid from '@/components/ui/StatsGrid'

export function FeatureSection() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <StatusLabel dotColor="primary">
            SYSTEM ARCHITECTURE: FRONTEND
          </StatusLabel>
          
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-4">
            The Interface is Standard.{' '}
            <span className="text-muted-foreground">
              The Runtime is Recursive.
            </span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl">
            Codebolt is deployed as a fully compatible fork of VS Code.
            You get the zero-learning-curve interface you expect.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TechCard
            figureLabel="FIG 3.1 — LINEAR ATTENTION"
            title="Infinite Context"
            description="Virtualized session handling across millions of tokens."
            stats={[{ label: 'Capacity', value: '∞ (Virtual)' }]}
          />
          {/* More cards... */}
        </div>
      </div>
    </section>
  )
}
```

### 11.2 Header Implementation

```tsx
'use client'

import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon, Menu } from 'lucide-react'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 h-16 
                       bg-background/80 backdrop-blur-xl 
                       border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 h-full 
                      flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <CubeLogo className="w-6 h-6" />
          <span className="font-medium">Codebolt</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground 
                         hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          
          <Link
            href="/dashboard"
            className="text-sm bg-primary text-primary-foreground 
                       px-4 py-1.5 rounded-full font-medium
                       hover:bg-cyan-400 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  )
}
```

### 11.3 Stats Grid Implementation

```tsx
interface StatsGridProps {
  stats: Array<{
    label: string
    value: string
    highlight?: boolean
  }>
}

export default function StatsGrid({ stats }: StatsGridProps) {
  // Ensure we have exactly 4 stats for 2x2 grid
  const displayStats = stats.slice(0, 4)
  
  return (
    <div className="border border-border divide-y divide-border">
      {/* Top row */}
      <div className="grid grid-cols-2 divide-x divide-border">
        {displayStats.slice(0, 2).map((stat, i) => (
          <div key={i} className="p-4">
            <span className="text-[10px] font-mono uppercase 
                           tracking-[0.15em] text-muted-foreground 
                           block mb-1">
              {stat.label}
            </span>
            <span className={`text-lg font-medium ${
              stat.highlight 
                ? 'text-emerald-500' 
                : 'text-foreground'
            }`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
      
      {/* Bottom row */}
      <div className="grid grid-cols-2 divide-x divide-border">
        {displayStats.slice(2, 4).map((stat, i) => (
          <div key={i} className="p-4">
            <span className="text-[10px] font-mono uppercase 
                           tracking-[0.15em] text-muted-foreground 
                           block mb-1">
              {stat.label}
            </span>
            <span className={`text-lg font-medium ${
              stat.highlight 
                ? 'text-emerald-500' 
                : 'text-foreground'
            }`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Appendix A: File Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, CSS variables
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Home page (thin composer)
│   ├── features/page.tsx    # Features page (thin composer)
│   ├── newpricing/page.tsx  # Pricing page (thin composer)
│   ├── newdownload/page.tsx # Download page (thin composer)
│   ├── newblog/page.tsx     # Blog index page (thin composer)
│   └── enterprise/page.tsx  # Enterprise page (thin composer)
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── DeepDive.tsx
│   │   ├── ProtocolTriptych.tsx
│   │   ├── ArchitectureDeepDive.tsx
│   │   ├── DenseFrontierTopology.tsx
│   │   ├── CollaborativeContext.tsx
│   │   ├── RecursiveStateConvergence.tsx
│   │   ├── AssociativeSemanticGraphing.tsx
│   │   ├── PostLinearParadigm.tsx
│   │   ├── NaturalLanguageCompilation.tsx
│   │   ├── CTASection.tsx
│   │   ├── home/
│   │   │   ├── RuntimePrimitivesSection.tsx
│   │   │   ├── DistributedKnowledgeMeshSection.tsx
│   │   │   └── VerificationStackSection.tsx
│   │   ├── features/
│   │   │   ├── FeaturesHero.tsx
│   │   │   ├── FeatureKicker.tsx
│   │   │   ├── StateVirtualization.tsx
│   │   │   ├── EconomicsOfIntelligence.tsx
│   │   │   ├── TrajectorySearch.tsx
│   │   │   ├── SignalPropulsion.tsx
│   │   │   ├── SemanticEntropyTracking.tsx
│   │   │   ├── HierarchicalVerification.tsx
│   │   │   ├── LongHorizonTopology.tsx
│   │   │   └── ScaleDeployment.tsx
│   │   ├── pricing/
│   │   │   ├── NewPricingHeroSection.tsx
│   │   │   ├── NewPricingPlansSection.tsx
│   │   │   └── NewPricingPageSection.tsx
│   │   ├── blog/
│   │   │   └── NewBlogIndexSection.tsx
│   │   ├── download/
│   │   │   └── NewDownloadPageSection.tsx
│   │   └── enterprise/
│   │       ├── EnterpriseShared.tsx
│   │       ├── EnterpriseHeroSection.tsx
│   │       ├── IntegrityMandateSection.tsx
│   │       ├── ComplianceSecurityPostureSection.tsx
│   │       ├── ComputeTopologySection.tsx
│   │       ├── SequenceProtocolSection.tsx
│   │       └── EnterprisePageSection.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── TechCard.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── StatusLabel.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── DiagramContainer.tsx
│   │   └── NumberedSection.tsx
│   └── diagrams/
│       ├── NodeGrid.tsx
│       ├── NetworkMesh.tsx
│       ├── InferenceRouting.tsx
│       └── VerificationPipeline.tsx
├── templatesections/
│   ├── README.md                         # How to use section templates
│   ├── index.tsx                         # Barrel exports
│   ├── SectionShell.tsx                  # Layout wrapper
│   ├── SectionHeader.tsx                 # Kicker + title + description
│   ├── TwoColumnSection.tsx              # 2-col grid layout
│   ├── ThreeColumnGrid.tsx               # 3-col grid layout
│   ├── TextWithDiagramSection.tsx        # Common “text + diagram” section
│   ├── FeatureGridSection.tsx            # Feature grid section template
│   ├── ProtocolTriptychSection.tsx       # Protocol triptych template
│   ├── RuntimePrimitivesSection.tsx      # Runtime primitives template
│   ├── VerificationStackSection.tsx      # Verification stack template
│   ├── PricingSection.tsx                # Pricing page template
│   ├── WorkspacePanelSection.tsx         # Workspace style panels
│   └── ...                               # More primitives + section templates
└── contexts/
    └── ThemeContext.tsx     # Theme state management
```

---

## Appendix B: Quick Reference

### CSS Variable Usage

```tsx
// In Tailwind classes
className="bg-background text-foreground border-border"
className="text-muted-foreground hover:text-foreground"
className="bg-primary text-primary-foreground"

// In custom CSS
background: hsl(var(--background));
color: hsl(var(--foreground));
border-color: hsl(var(--border));
```

### Common Class Patterns

```tsx
// Section container
"py-24 px-6 max-w-[1600px] mx-auto"

// Card
"bg-card border border-border p-6"

// Status label
"text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground"

// Primary button
"bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:bg-cyan-400"

// Muted text
"text-sm text-muted-foreground leading-relaxed"

// Grid background
"bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"
```

---

## 12. Architecture Rules (CRITICAL for Agents)

These rules exist to keep the codebase modular and reusable across projects while preserving pixel-perfect Dropstone-style output.

### 12.1 “Thin Page” Rule

**Page files in `src/app/**/page.tsx` should be composition-only.**

- **Allowed in pages**:
  - `export const metadata`
  - Imports of sections and returning a composition (e.g. `<Hero />`, `<PricingPageSection />`)
- **Avoid in pages**:
  - Large JSX blocks for whole sections
  - Local helper components (`function Card() { ... }`)
  - Complex layout logic that could be reused elsewhere

**When you see a hardcoded section in a page:** move it to `src/components/sections/...` and make the page call it.

### 12.2 “Sections vs Templates” Rule

We maintain two layers:

- **`src/templatesections/` (reusable templates)**:
  - Use when the *layout pattern* is likely reusable across projects (e.g., “two-column text+diagram”, “pricing matrix”, “protocol triptych”).
  - Should be flexible via props: title, kicker, description, items, slots.
  - Should not contain Codebolt-specific copy unless it’s a “Codebolt product template” you explicitly want to reuse.

- **`src/components/sections/` (concrete site sections)**:
  - Use when the content is Codebolt-specific but should remain modular.
  - These components should prefer composing `templatesections` rather than re-implementing layouts.
  - Organize by page/domain: `home/`, `features/`, `pricing/`, `blog/`, `enterprise/`, etc.

### 12.3 Naming & Placement Rules

- **Section-level components**:
  - Name: `XxxSection.tsx` (or a page-level wrapper like `NewPricingPageSection.tsx`)
  - Location: `src/components/sections/<domain>/`
  - Purpose: a complete drop-in section

- **Shared helpers/icons**:
  - Put shared helpers for a page/domain under a single file like `EnterpriseShared.tsx`
  - Avoid duplicating SVG icon components across sections

- **Keep props minimal**:
  - Prefer slots (`left`, `right`, `children`) for flexible layouts in templates.
  - Prefer fixed content in concrete sections unless reuse is required.

### 12.4 Consistency Checklist for New Sections

Before shipping a new section:

- **Layout**: uses our standard widths (`max-w-6xl`, `max-w-7xl`, `max-w-[1400px]`) consistent with the page.
- **Typography**: titles are large, tight tracking; labels are monospace, uppercase, letter-spaced.
- **Borders**: `border-border` everywhere; no random hex colors unless necessary for Dropstone fidelity.
- **Backgrounds**: `bg-background` / `bg-card` with subtle grid overlays where needed.
- **Reusability**: if the layout matches an existing template, use the template.


---

**End of Design System Document**
