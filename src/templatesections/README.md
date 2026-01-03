# Template Sections Library

A collection of reusable, composable section templates for building consistent, Dropstone-inspired web pages.

## Overview

These templates are designed to be:
- **Content-agnostic**: Pass in your own text, metrics, and diagrams
- **Composable**: Mix and match to create complex layouts
- **Themeable**: Support both light and dark modes via CSS variables
- **Accessible**: Semantic HTML with proper ARIA attributes

## Installation

All templates are exported from the main index:

```tsx
import { 
  SectionShell, 
  SectionHeader, 
  TwoColumnSection,
  FeatureCard,
  // ... etc
} from '@/templatesections'
```

## Template Categories

### 1. Layout Containers

#### `SectionShell`
Base container for page sections. Provides consistent spacing, borders, and theming.

```tsx
<SectionShell tone="card" padding="xl" borderTop>
  {/* Your section content */}
</SectionShell>
```

**Props:**
- `tone`: 'default' | 'card' | 'deep' | 'muted'
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `maxWidth`: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
- `borderTop`, `borderBottom`: boolean

#### `TwoColumnSection`
Responsive two-column layout for text + diagram patterns.

```tsx
<TwoColumnSection
  split="5-7"
  align="center"
  left={<TextContent />}
  right={<DiagramPanel />}
/>
```

**Props:**
- `split`: '5-7' | '7-5' | '6-6' | '4-8' | '8-4'
- `mobileOrder`: 'left-first' | 'right-first'
- `align`: 'start' | 'center' | 'end'
- `gap`: 'sm' | 'md' | 'lg' | 'xl'
- `divider`: boolean
- `animate`: boolean

#### `ThreeColumnGrid`
Equal three-column responsive grid for protocol cards, feature triptychs, etc.

```tsx
<ThreeColumnGrid
  divider
  columns={[
    <ProtocolCard key="1" {...props1} />,
    <ProtocolCard key="2" {...props2} />,
    <ProtocolCard key="3" {...props3} />,
  ]}
/>
```

### 2. Headers & Navigation

#### `SectionHeader`
Consistent header with kicker, two-tone title, and description.

```tsx
<SectionHeader
  kicker="System Architecture"
  kickerDot="emerald"
  kickerPulse
  title={"Multi-line Title\nWith Muted Continuation"}
  description="Your descriptive text here."
  rightContent={<StatusBadge>LIVE</StatusBadge>}
/>
```

#### `HeroSection`
Page hero section with flexible layouts.

```tsx
<HeroSection
  eyebrow="System Capabilities"
  title={"The Recursive\nRuntime."}
  description="Explore the comprehensive suite..."
  primaryCTA={<CTAButton href="/download">Download</CTAButton>}
  visual={<HeroPreview />}
  layout="two-column"
/>
```

### 3. Card Components

#### `FeatureCard`
Technical feature card with diagram area, corner brackets, and stats.

```tsx
<FeatureCard
  figureLabel="Fig 3.1 — Linear Attention"
  title="Infinite Context"
  description="Virtualized session handling allows for..."
  diagram={<LinearAttentionDiagram />}
  stats={[{ label: 'Capacity', value: '∞ (Virtual)' }]}
/>
```

#### `TopoCard`
Indexed topology/feature card for grid layouts.

```tsx
<TopoCard
  index="01"
  tag="Active RAM"
  title="Episodic Buffer"
  description="Volatile, high-fidelity workspace..."
  tagVariant="primary"
/>
```

#### `ProtocolCard`
System protocol card for triptych layouts.

```tsx
<ProtocolCard
  code="01_STATE_MANAGEMENT"
  title="Context Virtualization"
  description="To bypass context saturation..."
  leftLabel="Inference Horizon"
  leftValue="24H+"
  rightLabel="Registry Status"
  rightValue="SERIALIZED"
/>
```

#### `StepCard`
Process step card for workflows.

```tsx
<StepCard
  index="01. Monitor"
  title="Track Perplexity (PPL)"
  description="Continuously calculate token surprise..."
  indexVariant="amber"
/>
```

#### `TierCard`
Tier comparison card with progress indicator.

```tsx
<TierCard
  tierLabel="Enterprise_Tier_01"
  title="Hive Level"
  value="10k"
  valueSuffix="Concurrent Agents"
  description="Industrial scale..."
  progress="100%"
  accent="purple"
/>
```

### 4. UI Primitives

#### `Kicker`
Eyebrow label with indicator dot.

```tsx
<Kicker label="System_Economics" dotColor="emerald" dotShape="square" pulse />
```

#### `StatusBadge`
Inline status indicator badge.

```tsx
<StatusBadge variant="emerald" showDot pulse>LIVE</StatusBadge>
<StatusBadge variant="default">v.2.0.4-beta</StatusBadge>
```

#### `MetricBar`
Progress bar with label.

```tsx
<MetricBar label="Semantic_Depth" value={98} />
<MetricBar label="Logic_Inference" value={82} showMarker variant="primary" />
```

#### `MetricDisplay`
Large metric value display.

```tsx
<MetricDisplay label="Dev Velocity" value="100x" variant="primary" size="lg" />
```

#### `MetricStrip`
Horizontal row of key metrics.

```tsx
<MetricStrip
  columns={4}
  divider
  metrics={[
    { label: 'Compression Rate', value: '50:1', meta: 'Token/Vector' },
    { label: 'Recall Accuracy', value: '99.9%', meta: 'P-Value < 0.01' },
  ]}
/>
```

#### `LayerRow`
Pipeline layer row for verification stacks.

```tsx
<LayerRow level="L1" title="Syntactic Validity" meta="AST Integrity" />
```

### 5. Content Components

#### `DiagramPanel`
Container for technical diagrams with labels and overlays.

```tsx
<DiagramPanel
  title="Topology_View"
  subtitle="Mesh_04 :: Active_Sync"
  figureLabel="FIG 3.0: P2P State Synchronization"
  showGrid
  aspectRatio="4/3"
>
  <NetworkMesh />
</DiagramPanel>
```

#### `ComparisonGrid`
Side-by-side comparison layout.

```tsx
<ComparisonGrid
  left={{
    figureLabel: "Fig 4.0: Linear Sequence",
    badge: "Risk: High",
    badgeVariant: "risk",
    visual: <LinearDiagram />,
    title: "Dec 2025 Standard",
    description: "Models predicted step 1 → 2 → 3...",
  }}
  right={{
    figureLabel: "Fig 4.1: Divergent Search",
    badge: "RISK: MITIGATED",
    badgeVariant: "success",
    visual: <DivergentDiagram />,
    title: "Horizon Mode",
    description: "The system utilizes a Recursive Swarm...",
    bgVariant: "highlight",
  }}
/>
```

#### `QuoteBlock`
Styled quote/testimonial block.

```tsx
<QuoteBlock
  quote="The model perceives infinite memory not by storing every word..."
  attribution="Codebolt Research"
  variant="muted"
/>
```

#### `CTAButton`
Call-to-action button/link.

```tsx
<CTAButton href="/download" variant="primary" size="lg" icon={<ArrowIcon />}>
  Download
</CTAButton>
```

## Example: Building a Section

Here's how to compose templates to create a complete section:

```tsx
import {
  SectionShell,
  SectionHeader,
  TwoColumnSection,
  DiagramPanel,
  MetricStrip,
  QuoteBlock,
} from '@/templatesections'

export function MyFeatureSection() {
  return (
    <SectionShell tone="card" borderTop>
      <SectionHeader
        kicker="Feature_01"
        kickerDot="primary"
        title={"Amazing Feature\nWith Great Power"}
        description="This feature does incredible things..."
      />

      <TwoColumnSection
        split="5-7"
        left={
          <div className="space-y-4">
            <p>Detailed explanation...</p>
            <MetricStrip
              columns={2}
              metrics={[
                { label: 'Speed', value: '100x' },
                { label: 'Accuracy', value: '99.9%' },
              ]}
            />
          </div>
        }
        right={
          <DiagramPanel showGrid>
            <MyDiagram />
          </DiagramPanel>
        }
      />

      <QuoteBlock
        quote="This changed everything for our team."
        attribution="Happy Customer"
      />
    </SectionShell>
  )
}
```

## Theming

All templates use CSS variables from `globals.css` and support both light and dark modes:

- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--muted`, `--muted-foreground`
- `--primary`, `--primary-foreground`
- `--border`

Dark mode styles are applied via the `dark:` Tailwind prefix.

## Best Practices

1. **Compose, don't modify**: Use templates as building blocks rather than modifying them
2. **Use semantic props**: Take advantage of variant props for consistent theming
3. **Keep content external**: Pass content as props rather than hardcoding
4. **Leverage animations**: Most templates support `animate` prop for motion effects
5. **Follow the grid**: Use `TwoColumnSection` with proper split ratios for responsive layouts
