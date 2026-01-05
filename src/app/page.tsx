import Hero from '@/components/sections/Hero'
import FeatureGrid from '@/components/sections/FeatureGrid'
import DeepDive from '@/components/sections/DeepDive'
import ProtocolTriptych from '@/components/sections/ProtocolTriptych'
import ArchitectureDeepDive from '@/components/sections/ArchitectureDeepDive'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      {/* Hero Section - Deploy AI Swarms. Build 24/7. */}
      <Hero />

      {/* Feature Grid - From One AI to an Entire Team */}
      <FeatureGrid />

      {/* Deep Dive - The Paradigm Shift */}
      <DeepDive
        title={"Stop Optimizing for Speed.\nOptimize for Scale."}
        subtitle="The Multi-Agent Paradigm"
        description={
          <>
            Today&apos;s AI coding tools help one developer write code slightly faster.
            Codebolt is different. Deploy entire <strong className="text-foreground">swarms of AI agents</strong>—dozens,
            even hundreds—all working simultaneously on different parts of your codebase.
            While you&apos;re in a meeting, agents are building features. While you&apos;re sleeping,
            agents are writing tests. It&apos;s not 20% faster development—it&apos;s <strong className="text-foreground">10x faster</strong>.
          </>
        }
        metrics={[
          { value: "100+", label: "Parallel Agents" },
          { value: "24/7", label: "Operation" },
          { value: "10x", label: "Velocity" },
          { value: "0", label: "Coordination Overhead" },
        ]}
        orientation="left"
      />

      {/* Protocol Triptych - Coordination Mechanisms */}
      <ProtocolTriptych />

      {/* Architecture Deep Dive - Swarm Intelligence */}
      <ArchitectureDeepDive />

      {/* Memory Deep Dive */}
      <DeepDive
        title={"AI That Remembers\nEverything. Forever."}
        subtitle="Persistent Memory Architecture"
        description={
          <>
            No more &quot;starting from scratch&quot; every session. Codebolt agents have <strong className="text-foreground">persistent,
              perfect memory</strong> spanning your entire project history. Knowledge graphs capture relationships.
            Vector databases enable semantic search. Episodic memory tracks what happened, when, and why.
            Agents remember decisions from weeks or months ago—and apply them consistently.
          </>
        }
        metrics={[
          { value: "∞", label: "Context Window" },
          { value: "Graph", label: "Knowledge DB" },
          { value: "Vector", label: "Semantic Search" },
          { value: "100%", label: "Recall" },
        ]}
        orientation="right"
      />

      {/* CTA Section */}
      <CTASection />
    </main>
  )
}
