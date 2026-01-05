/**
 * Template Sections Library
 * =========================
 * 
 * A comprehensive collection of reusable, composable section templates
 * for building consistent, Dropstone-inspired web pages.
 * 
 * ## Categories:
 * 
 * ### 1. FULL SECTION TEMPLATES (Ready to use directly)
 * These are complete, self-contained sections that you can drop into any page.
 * Just pass in your content through props.
 * 
 * - `HeroSection` - Page hero with title, description, CTAs
 * - `TextWithDiagramSection` - Text content + diagram (configurable sides)
 * - `ProtocolTriptychSection` - 3-column protocol/feature showcase
 * - `FeatureGridSection` - Header + grid of feature cards
 * - `RuntimePrimitivesSection` - 2x2 system primitive cards
 * - `ArchitectureDeepDiveSection` - Technical deep-dive with diagram + stages
 * - `TopologySection` - Complex topology with diagram + numbered blocks
 * - `VerificationStackSection` - Verification/security layers
 * - `WorkspacePanelSection` - Full-width IDE/workspace panel
 * - `PricingSection` - Pricing comparison grid
 * - `CTASection` - Call-to-action with download button
 * 
 * ### 2. LAYOUT PRIMITIVES (For building custom sections)
 * - `SectionShell` - Base section container
 * - `SectionHeader` - Section header with kicker, title, description
 * - `TwoColumnSection` - Responsive two-column layout
 * - `ThreeColumnGrid` - Equal three-column grid
 * - `MetricStrip` - Horizontal metrics row
 * - `ComparisonGrid` - Side-by-side comparison
 * 
 * ### 3. CARD COMPONENTS
 * - `FeatureCard` - Feature card with diagram
 * - `TopoCard` - Indexed topology card
 * - `StepCard` - Process step card
 * - `TierCard` - Tier comparison card
 * - `ProtocolCard` - Protocol card for triptychs
 * 
 * ### 4. UI PRIMITIVES
 * - `Kicker` - Eyebrow label with dot
 * - `StatusBadge` - Inline status badge
 * - `MetricBar` - Progress bar with label
 * - `MetricDisplay` - Large metric value
 * - `LayerRow` - Pipeline layer row
 * - `DiagramPanel` - Diagram container
 * - `CTAButton` - Call-to-action button
 * - `QuoteBlock` - Styled quote block
 * 
 * @example
 * ```tsx
 * // Using a full section template
 * import { TextWithDiagramSection } from '@/templatesections'
 * 
 * <TextWithDiagramSection
 *   kicker="System Protocol 04"
 *   title={"Recursive State\nConvergence"}
 *   description={<p>Your description...</p>}
 *   diagram={<YourDiagram />}
 *   metrics={[{ label: 'Rate', value: '94%' }]}
 * />
 * ```
 */

// =============================================================================
// FULL SECTION TEMPLATES
// =============================================================================

export { HeroSection } from './HeroSection'
export type { HeroSectionProps } from './HeroSection'

export { TextWithDiagramSection } from './TextWithDiagramSection'
export type { TextWithDiagramSectionProps } from './TextWithDiagramSection'

export { ProtocolTriptychSection } from './ProtocolTriptychSection'
export type { ProtocolTriptychSectionProps, ProtocolItem } from './ProtocolTriptychSection'

export { FeatureGridSection } from './FeatureGridSection'
export type { FeatureGridSectionProps, FeatureGridItem } from './FeatureGridSection'

export { RuntimePrimitivesSection } from './RuntimePrimitivesSection'
export type { RuntimePrimitivesSectionProps, RuntimePrimitiveItem } from './RuntimePrimitivesSection'

export { ArchitectureDeepDiveSection } from './ArchitectureDeepDiveSection'
export type { ArchitectureDeepDiveSectionProps, ArchitectureStage } from './ArchitectureDeepDiveSection'

export { TopologySection } from './TopologySection'
export type { TopologySectionProps, TopologyStat, TopologyNumberedBlock, TopologyCodeColumn } from './TopologySection'

export { VerificationStackSection } from './VerificationStackSection'
export type { VerificationStackSectionProps, VerificationLayer, VerificationCapability } from './VerificationStackSection'

export { WorkspacePanelSection } from './WorkspacePanelSection'
export type { WorkspacePanelSectionProps } from './WorkspacePanelSection'

export { PricingSection } from './PricingSection'
export type { PricingSectionProps, PricingPlan, PricingFeatureSection } from './PricingSection'

export { CTASection } from './CTASection'
export type { CTASectionProps } from './CTASection'

export { DeepDiveSection } from './DeepDiveSection'
export type { DeepDiveSectionProps } from './DeepDiveSection'

export { HighlightBannerSection } from './HighlightBannerSection'
export type { HighlightBannerSectionProps } from './HighlightBannerSection'

export { StatGridSection } from './StatGridSection'
export type { StatGridSectionProps, StatItem } from './StatGridSection'

export { IconFeatureGridSection } from './IconFeatureGridSection'
export type { IconFeatureGridSectionProps, IconFeatureItem } from './IconFeatureGridSection'

// =============================================================================
// LAYOUT PRIMITIVES
// =============================================================================

export { SectionShell } from './SectionShell'
export type { SectionShellProps, SectionTone } from './SectionShell'

export { SectionHeader } from './SectionHeader'
export type { SectionHeaderProps } from './SectionHeader'

export { TwoColumnSection } from './TwoColumnSection'
export type { TwoColumnSectionProps } from './TwoColumnSection'

export { ThreeColumnGrid } from './ThreeColumnGrid'
export type { ThreeColumnGridProps } from './ThreeColumnGrid'

export { MetricStrip } from './MetricStrip'
export type { MetricStripProps, MetricData } from './MetricStrip'

export { ComparisonGrid } from './ComparisonGrid'
export type { ComparisonGridProps, ComparisonItem } from './ComparisonGrid'

// =============================================================================
// CARD COMPONENTS
// =============================================================================

export { FeatureCard } from './FeatureCard'
export type { FeatureCardProps } from './FeatureCard'

export { TopoCard } from './TopoCard'
export type { TopoCardProps } from './TopoCard'

export { StepCard } from './StepCard'
export type { StepCardProps } from './StepCard'

export { TierCard } from './TierCard'
export type { TierCardProps } from './TierCard'

export { ProtocolCard } from './ProtocolCard'
export type { ProtocolCardProps } from './ProtocolCard'

// =============================================================================
// UI PRIMITIVES
// =============================================================================

export { Kicker } from './Kicker'
export type { KickerProps } from './Kicker'

export { StatusBadge } from './StatusBadge'
export type { StatusBadgeProps } from './StatusBadge'

export { MetricBar } from './MetricBar'
export type { MetricBarProps } from './MetricBar'

export { MetricDisplay } from './MetricDisplay'
export type { MetricDisplayProps } from './MetricDisplay'

export { LayerRow } from './LayerRow'
export type { LayerRowProps } from './LayerRow'

export { DiagramPanel } from './DiagramPanel'
export type { DiagramPanelProps } from './DiagramPanel'

export { CTAButton } from './CTAButton'
export type { CTAButtonProps } from './CTAButton'

export { QuoteBlock } from './QuoteBlock'
export type { QuoteBlockProps } from './QuoteBlock'
