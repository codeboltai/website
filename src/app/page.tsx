import Hero from '@/components/sections/Hero'
import FeatureGrid from '@/components/sections/FeatureGrid'
import DeepDive from '@/components/sections/DeepDive'
import ProtocolTriptych from '@/components/sections/ProtocolTriptych'
import ArchitectureDeepDive from '@/components/sections/ArchitectureDeepDive'
import DenseFrontierTopology from '@/components/sections/DenseFrontierTopology'
import CollaborativeContext from '@/components/sections/CollaborativeContext'
import RecursiveStateConvergence from '@/components/sections/RecursiveStateConvergence'
import AssociativeSemanticGraphing from '@/components/sections/AssociativeSemanticGraphing'
import PostLinearParadigm from '@/components/sections/PostLinearParadigm'
import NaturalLanguageCompilation from '@/components/sections/NaturalLanguageCompilation'
import CTASection from '@/components/sections/CTASection'
import RuntimePrimitivesSection from '@/components/sections/home/RuntimePrimitivesSection'
import DistributedKnowledgeMeshSection from '@/components/sections/home/DistributedKnowledgeMeshSection'
import VerificationStackSection from '@/components/sections/home/VerificationStackSection'

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      {/* Hero Section */}
      <Hero />

      {/* Feature Grid - Interface is Standard */}
      <FeatureGrid />

      {/* Deep Dive - Democratizing Recursive Reasoning */}
      <DeepDive
        title={"Democratizing\nRecursive Reasoning."}
        subtitle="ARCHITECTURE: HORIZON MODE V4.0"
        description={
          <>
            Standard foundation models suffer from the <strong className="text-foreground">Linearity Barrier</strong>, 
            degrading as context windows saturate. Codebolt bridges the gap by productizing the{' '}
            <strong className="text-foreground">Recursive Swarm Architecture</strong>. We provide every engineer 
            with a local <strong className="text-foreground">D3 Runtime</strong>, capable of orchestrating 
            thousands of autonomous scouts to solve problems across 24-hour horizons.
          </>
        }
        metrics={[
          { value: "-89%", label: "Safety Violations" },
          { value: "1.4%", label: "Hallucination Rate" }
        ]}
        orientation="left"
      />

      {/* Protocol Strip */}
      <ProtocolTriptych />

      {/* Architecture Deep Dive */}
      <ArchitectureDeepDive />

      {/* Dense Frontier Topology */}
      <DenseFrontierTopology />

      {/* Runtime Primitives */}
      <RuntimePrimitivesSection />

      {/* Collaborative Context */}
      <CollaborativeContext />

      {/* Recursive State Convergence */}
      <RecursiveStateConvergence />

      {/* Associative Semantic Graphing */}
      <AssociativeSemanticGraphing />

      {/* Distributed Knowledge Mesh */}
      <DistributedKnowledgeMeshSection />

      {/* Verification Stack */}
      <VerificationStackSection />

      {/* Post-Linear Paradigm */}
      <PostLinearParadigm />

      {/* Natural Language Compilation */}
      <NaturalLanguageCompilation />

      {/* CTA Section */}
      <CTASection />
    </main>
  )
}
