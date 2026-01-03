import FeaturesHero from '@/components/sections/features/FeaturesHero'
import StateVirtualization from '@/components/sections/features/StateVirtualization'
import EconomicsOfIntelligence from '@/components/sections/features/EconomicsOfIntelligence'
import TrajectorySearch from '@/components/sections/features/TrajectorySearch'
import SignalPropulsion from '@/components/sections/features/SignalPropulsion'
import SemanticEntropyTracking from '@/components/sections/features/SemanticEntropyTracking'
import HierarchicalVerification from '@/components/sections/features/HierarchicalVerification'
import LongHorizonTopology from '@/components/sections/features/LongHorizonTopology'
import ScaleDeployment from '@/components/sections/features/ScaleDeployment'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FeaturesHero />
      <StateVirtualization />
      <EconomicsOfIntelligence />
      <TrajectorySearch />
      <SignalPropulsion />
      <SemanticEntropyTracking />
      <HierarchicalVerification />
      <LongHorizonTopology />
      <ScaleDeployment />
    </div>
  )
}
