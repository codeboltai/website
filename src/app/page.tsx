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
import StatusLabel from '@/components/ui/StatusLabel'
import NetworkMesh from '@/components/diagrams/NetworkMesh'
import VerificationPipeline from '@/components/diagrams/VerificationPipeline'

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground overflow-hidden">
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

      {/* Runtime Primitives Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1600px] mx-auto border-t border-border">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-wider border border-border bg-muted/30 px-2 py-1">
                V.2.0.4-BETA
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                SYSTEM_PRIMITIVES
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
              Runtime Primitives
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Core architectural components designed for high-throughput engineering environments where{' '}
              <strong className="text-foreground">latency</strong> and{' '}
              <strong className="text-foreground">reasoning depth</strong> coexist.
            </p>
          </div>

          <div className="md:text-right flex md:flex-col items-start md:items-end gap-2 md:gap-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500">
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              Uptime: 99.99%
            </span>
          </div>
        </div>

        <div className="h-px w-full bg-border mb-10" />

        {/* 2x2 Primitives Grid (single container with internal dividers) */}
        <div className="bg-card border border-border">
          {/* Inference Routing */}
          <div className="grid md:grid-cols-2">
            <RuntimePrimitiveCard
              number="01"
              label="ROUTING"
              title="Inference Routing"
              description='Intelligently routes tasks between "Scout Swarms" (exploration) and "Frontier Models" (synthesis).'
              stats={[
                { label: 'MODE', value: 'Hybrid_Dynamic' },
                { label: 'LATENCY', value: '< 24ms', highlight: true }
              ]}
              icon="cross"
              className="border-b border-border md:border-r"
            />

            <RuntimePrimitiveCard
              number="02"
              label="KNOWLEDGE"
              title="Distributed Knowledge"
              description='Vector-space de-duplication layer allows instant propagation of "Negative Knowledge" (known failures).'
              stats={[
                { label: 'SYNC', value: 'Realtime_WS' },
                { label: 'INDEX', value: 'HNSW_Vector' }
              ]}
              icon="dots"
              className="border-b border-border"
            />

            <RuntimePrimitiveCard
              number="03"
              label="DISTILLATION"
              title="Dynamic Distillation"
              description="Rigid separation of memory manifolds (Episodic, Sequential, Associative, Procedural) to prevent drift."
              stats={[
                { label: 'LAYERS', value: '4_Manifolds' },
                { label: 'RETENTION', value: 'Infinite' }
              ]}
              icon="lines"
              className="border-b border-border md:border-b-0 md:border-r"
            />

            <RuntimePrimitiveCard
              number="04"
              label="PROMOTION"
              title="Context Promotion"
              description="Candidate solutions clearing the confidence threshold (P > 0.85) are serialized and promoted."
              stats={[
                { label: 'THRESHOLD', value: 'P > 0.85' },
                { label: 'PASS RATE', value: '92.4%', highlight: true }
              ]}
              icon="bars"
              className=""
            />
          </div>
        </div>
      </section>

      {/* Collaborative Context */}
      <CollaborativeContext />

      {/* Recursive State Convergence */}
      <RecursiveStateConvergence />

      {/* Associative Semantic Graphing */}
      <AssociativeSemanticGraphing />

      {/* Distributed Knowledge Mesh */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1600px] mx-auto border-t border-border">
        <div className="relative">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-1 h-6 bg-primary mt-1" aria-hidden />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              SYSTEM PROTOCOL 03
            </span>
          </div>

          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.05] mb-6">
              Distributed
              <br />
              Knowledge Mesh.
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Transform isolated reasoning into collaborative assets. Codebolt utilizes a{' '}
              <strong className="text-foreground">Merkle-DAG Architecture</strong> to propagate state changes across the swarm.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Unlike standard consensus, we propagate &quot;Negative Knowledge&quot; (known failure vectors) instantly,
              allowing the entire mesh to prune invalid logic branches in{' '}
              <strong className="text-foreground">O(log n)</strong> time.
            </p>
          </div>

          <div className="h-px w-full bg-border my-12" />

          <div className="space-y-8 max-w-3xl">
            <FeatureItem
              number="01"
              title="TRAJECTORY FORKING"
              description="Agents can branch from any peer's causal graph without re-computing the context window."
            />
            <FeatureItem
              number="02"
              title="VECTOR SYNC"
              description="Lossless context sharing via compressed serialized state vectors using Protocol Buffers."
            />
          </div>

          {/* Topology Panel (Dropstone-style overlays) */}
          <div className="mt-14 relative border border-border bg-card overflow-hidden">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-border pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-border pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-border pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-border pointer-events-none" />

            {/* Overlay: Top-left label */}
            <div className="absolute left-6 top-6 z-20">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                TOPOLOGY_VIEW
              </div>
              <div className="mt-1 text-[12px] font-mono text-foreground/80">
                Mesh_04 :: Active_Sync
              </div>
            </div>

            {/* Overlay: Top-right stats panel */}
            <div className="absolute right-6 top-6 z-20 w-[180px] border border-border bg-background/50 backdrop-blur-sm">
              <div className="h-[2px] bg-primary/70" />
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground uppercase tracking-wider">SYNC_RATE</span>
                  <span className="text-foreground">12ms</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-muted-foreground uppercase tracking-wider">PACKETS</span>
                  <span className="text-foreground">2.4k/s</span>
                </div>
              </div>
            </div>

            <div className="relative px-8 pt-20 pb-10">
              {/* Use a slightly different accent for this diagram */}
              <div style={{ ['--mesh-accent' as any]: '262 83% 58%' }}>
                <div className="max-w-4xl mx-auto">
                  <NetworkMesh />
                </div>
              </div>

              <div className="text-center mt-4 text-[10px] font-mono text-muted-foreground">
                FIG 3.0: P2P State Synchronization
                <span className="ml-3 inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Stack */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1600px] mx-auto border-t border-border">
        <div className="max-w-6xl">
          <StatusLabel dotColor="success" className="mb-6">
            05 PROTOCOL: C_STACK
          </StatusLabel>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.05] mb-6">
            Hierarchical
            <br />
            Verification Stack.
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl">
            Autonomous agents require a <strong className="text-foreground">Deterministic Envelope</strong>. We utilize a multi-stage consensus
            protocol (C<sub>stack</sub>) that verifies code execution in ephemeral, network-isolated sandboxes with kernel-level syscall filtering.
          </p>

          <div className="h-px w-full bg-border my-12" />

          <div className="space-y-10 max-w-5xl">
            <div className="flex justify-between items-start gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Adversarial Oversight</h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  All unverified logic is detained in network-gapped microVMs. Agents must pass &quot;Property-Based Testing&quot; where adversarial nodes
                  attempt to inject edge-case failures.
                </p>
              </div>
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.2em] whitespace-nowrap pt-1">
                ISOLATION: MICRO_VM
              </span>
            </div>

            <div className="flex justify-between items-start gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Hallucination Reduction</h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  We monitor Semantic Entropy (Perplexity Spikes). If the PPL variance exceeds the safe threshold, the branch is immediately pruned via
                  the Flash Protocol.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em] whitespace-nowrap pt-1">
                P &lt; 1.4%
              </span>
            </div>
          </div>

          {/* Pipeline Panel */}
          <div className="mt-14 relative border border-border bg-card overflow-hidden">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-border pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-border pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-border pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-border pointer-events-none" />

            <div className="relative p-8 md:p-10">
              <StatusLabel dotColor="success" className="mb-6">
                PIPELINE_ARCHITECTURE // C_STACK
              </StatusLabel>

              <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
                    Verification Topology <span className="text-muted-foreground font-normal">v2.1</span>
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    Visualizing the double-gate validation process. Artifacts are subjected to adversarial sandboxing before passing entropy thresholds.
                  </p>
                </div>

                <div className="md:border-l md:border-border md:pl-10">
                  <div className="grid grid-cols-2 md:grid-cols-2 md:divide-x md:divide-border">
                    <div className="pr-6 md:pr-8">
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        PASS_RATE
                      </div>
                      <div className="text-xl font-mono text-emerald-500">
                        94.2%
                      </div>
                    </div>
                    <div className="pl-6 md:pl-8">
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
                        AVG_LATENCY
                      </div>
                      <div className="text-xl font-mono text-foreground">
                        12ms
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 border border-border bg-background/30">
                <div className="p-8 md:p-10">
                  <VerificationPipeline variant="embedded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Linear Paradigm */}
      <PostLinearParadigm />

      {/* Natural Language Compilation */}
      <NaturalLanguageCompilation />

      {/* CTA Section */}
      <CTASection />
    </main>
  )
}

// Helper Components

function RuntimePrimitiveCard({ 
  number, 
  label, 
  title, 
  description, 
  stats,
  icon,
  className,
}: {
  number: string
  label: string
  title: string
  description: string
  stats: Array<{ label: string; value: string; highlight?: boolean }>
  icon?: 'cross' | 'dots' | 'lines' | 'bars'
  className?: string
}) {
  return (
    <div className={`group relative p-8 md:p-10 hover:bg-muted/10 transition-colors ${className ?? ''}`}>
      {/* Decorative icon (top-right) */}
      <RuntimePrimitiveIcon type={icon ?? 'cross'} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-mono text-muted-foreground border border-border bg-background/20 px-1.5 py-0.5">
          {number}
        </span>
        <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">
          {label}
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-4">
        {title}
      </h3>

      <p className="text-[12px] font-mono text-muted-foreground leading-relaxed max-w-md">
        {description}
      </p>

      {/* Stats */}
      <div className="border-t border-border mt-8 pt-6 grid grid-cols-2 gap-10">
        {stats.map((stat, i) => (
          <div key={i}>
            <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em] block mb-2">
              {stat.label}
            </span>
            <span className={`text-sm font-mono ${stat.highlight ? 'text-primary' : 'text-foreground'}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Subtle hover illumination */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}

function RuntimePrimitiveIcon({ type }: { type: 'cross' | 'dots' | 'lines' | 'bars' }) {
  if (type === 'cross') {
    return (
      <div className="absolute right-10 top-16 opacity-40 pointer-events-none">
        <div className="relative w-8 h-8">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-8 bg-border" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-8 bg-border" />
        </div>
      </div>
    )
  }

  if (type === 'dots') {
    return (
      <div className="absolute right-10 top-14 opacity-40 pointer-events-none">
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-border" />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'lines') {
    return (
      <div className="absolute right-10 top-14 opacity-40 pointer-events-none">
        <div className="flex flex-col gap-1.5">
          <div className="w-10 h-px bg-border" />
          <div className="w-8 h-px bg-border" />
          <div className="w-12 h-px bg-border" />
        </div>
      </div>
    )
  }

  // bars
  return (
    <div className="absolute right-10 top-14 opacity-60 pointer-events-none">
      <div className="flex items-end gap-1">
        <div className="w-1 h-3 bg-border" />
        <div className="w-1 h-5 bg-border" />
        <div className="w-1 h-4 bg-border" />
        <div className="w-1 h-7 bg-primary" />
      </div>
    </div>
  )
}

function FeatureItem({
  number,
  title,
  description
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-10 h-10 border border-border bg-muted/20 flex items-center justify-center flex-shrink-0">
        <span className="text-[11px] font-mono text-primary uppercase tracking-wider">
          {number}
        </span>
      </div>
      <div className="pt-0.5">
        <h4 className="text-[12px] font-mono text-foreground uppercase tracking-[0.2em] mb-2">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  )
}
