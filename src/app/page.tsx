import type { CSSProperties } from 'react'
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
import NetworkMesh from '@/components/diagrams/NetworkMesh'
import VerificationPipeline from '@/components/diagrams/VerificationPipeline'

type CSSVariableStyle = CSSProperties & {
  '--mesh-accent'?: string
}

const meshAccentStyle: CSSVariableStyle = {
  '--mesh-accent': '262 83% 58%',
}

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
      <section className="bg-background dark:bg-[#030303] text-foreground dark:text-zinc-200 font-sans py-24 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 dark:border-zinc-800/60 pb-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-1.5 py-0.5 rounded-[1px] bg-muted text-[10px] font-mono uppercase text-muted-foreground border border-border dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700">
                  v.2.0.4-beta
                </span>
                <span className="text-[10px] font-mono text-muted-foreground dark:text-zinc-500 uppercase tracking-widest">
                  System_Primitives
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground dark:text-white mb-4">
                Runtime Primitives
              </h2>

              <p className="text-sm md:text-base text-muted-foreground dark:text-zinc-400 font-light leading-relaxed max-w-lg">
                Core architectural components designed for high-throughput engineering environments where{' '}
                <span className="text-foreground dark:text-zinc-200">latency</span> and{' '}
                <span className="text-foreground dark:text-zinc-200">reasoning depth</span> coexist.
              </p>
            </div>

            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-wider">All Systems Operational</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground/70 dark:text-zinc-600">Uptime: 99.99%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-border/60 dark:border-zinc-800/60 bg-card dark:bg-[#050505]">
            <RuntimePrimitiveCard
              number="01"
              label="Routing"
              title="Inference Routing"
              description='Intelligently routes tasks between "Scout Swarms" (exploration) and "Frontier Models" (synthesis).'
              stats={[
                { label: 'Mode', value: 'Hybrid_Dynamic' },
                { label: 'Latency', value: '< 24ms', highlight: true },
              ]}
              icon="cross"
              className="border-b border-border/60 dark:border-zinc-800/60 md:border-b-0 md:border-r"
            />

            <RuntimePrimitiveCard
              number="02"
              label="Knowledge"
              title="Distributed Knowledge"
              description='Vector-space de-duplication layer allows instant propagation of "Negative Knowledge" (known failures).'
              stats={[
                { label: 'Sync', value: 'Realtime_WS' },
                { label: 'Index', value: 'HNSW_Vector' },
              ]}
              icon="dots"
              className="border-b border-border/60 dark:border-zinc-800/60"
            />

            <RuntimePrimitiveCard
              number="03"
              label="Distillation"
              title="Dynamic Distillation"
              description="Rigid separation of memory manifolds (Episodic, Sequential, Associative, Procedural) to prevent drift."
              stats={[
                { label: 'Layers', value: '4_Manifolds' },
                { label: 'Retention', value: 'Infinite' },
              ]}
              icon="lines"
              className="border-b border-border/60 dark:border-zinc-800/60 md:border-b-0 md:border-r"
            />

            <RuntimePrimitiveCard
              number="04"
              label="Promotion"
              title="Context Promotion"
              description="Candidate solutions clearing the confidence threshold (P > 0.85) are serialized and promoted."
              stats={[
                { label: 'Threshold', value: 'P > 0.85' },
                { label: 'Pass Rate', value: '92.4%' },
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
      <section className="py-24 md:py-32 bg-background border-b border-border selection:bg-violet-500/30 selection:text-violet-200 dark:bg-[#030303] dark:text-zinc-200 dark:border-zinc-800/60 dark:selection:bg-violet-500/30 dark:selection:text-violet-200">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Right text (on desktop) */}
          <div className="col-span-1 lg:col-span-5 lg:col-start-8 lg:order-last">
            <div className="flex flex-col gap-4 mb-8">
              <div className="inline-flex items-center gap-2 border-l-2 border-violet-500 pl-3">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest dark:text-zinc-500">
                  System Protocol 03
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight leading-[1.1] dark:text-white">
                Distributed <br /> Knowledge Mesh.
              </h3>
            </div>

            <div className="prose prose-invert prose-sm">
              <p className="text-muted-foreground font-light leading-relaxed dark:text-zinc-400">
                Transform isolated reasoning into collaborative assets. Codebolt utilizes a{' '}
                <span className="text-foreground font-medium dark:text-zinc-200">Merkle-DAG Architecture</span> to propagate state changes across
                the swarm.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mt-4 dark:text-zinc-400">
                Unlike standard consensus, we propagate &quot;Negative Knowledge&quot; (known failure vectors) instantly, allowing the entire mesh
                to prune invalid logic branches in <span className="text-foreground font-medium dark:text-zinc-200">O(log n)</span> time.
              </p>
            </div>

            <div className="mt-8 border-t border-border pt-6 flex flex-col gap-4 dark:border-zinc-800">
              <div className="flex gap-4 items-start group">
                <div className="w-8 h-8 flex items-center justify-center border border-border bg-muted/30 group-hover:border-violet-500/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="text-[10px] font-mono text-violet-400">01</span>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase text-foreground mb-1 dark:text-zinc-300">Trajectory Forking</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xs dark:text-zinc-500">
                    Agents can branch from any peer&apos;s causal graph without re-computing the context window.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="w-8 h-8 flex items-center justify-center border border-border bg-muted/30 group-hover:border-violet-500/50 transition-colors dark:border-zinc-800 dark:bg-zinc-900">
                  <span className="text-[10px] font-mono text-violet-400">02</span>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase text-foreground mb-1 dark:text-zinc-300">Vector Sync</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed max-w-xs dark:text-zinc-500">
                    Lossless context sharing via compressed serialized state vectors using Protocol Buffers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Left diagram */}
          <div className="col-span-1 lg:col-span-7 lg:col-start-1 lg:order-first">
            <div className="relative w-full h-[400px] flex items-center justify-center bg-card border border-border/60 rounded-sm overflow-hidden dark:bg-[#050505] dark:border-zinc-800/60">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

              <div className="absolute top-4 left-4 z-10">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest dark:text-zinc-500">
                    Topology_View
                  </span>
                  <span className="text-[10px] font-mono text-foreground/80 dark:text-zinc-300">Mesh_04 :: Active_Sync</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 z-10 flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-0.5 bg-muted-foreground/60 dark:bg-zinc-600" />
                  <span className="text-[9px] font-mono text-muted-foreground uppercase dark:text-zinc-500">Link</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  <span className="text-[9px] font-mono text-muted-foreground uppercase dark:text-zinc-500">Packet</span>
                </div>
              </div>

              {/* NetworkMesh supports a CSS var for accent */}
              <div className="relative z-0 w-full max-w-[450px]" style={meshAccentStyle}>
                <NetworkMesh className="w-full h-full" />
              </div>

              <div className="absolute top-4 right-4 bg-background/90 border border-border p-3 w-32 backdrop-blur-sm dark:bg-zinc-900/90 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] font-mono text-muted-foreground uppercase dark:text-zinc-500">Sync_Rate</span>
                  <span className="text-[9px] font-mono text-foreground dark:text-zinc-300">12ms</span>
                </div>
                <div className="w-full bg-border h-0.5 mb-2 dark:bg-zinc-800">
                  <div className="h-full bg-violet-500" style={{ width: '78%' }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-mono text-muted-foreground uppercase dark:text-zinc-500">Packets</span>
                  <span className="text-[9px] font-mono text-foreground dark:text-zinc-300">2.4k/s</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <p className="text-[10px] text-muted-foreground font-mono dark:text-zinc-600">FIG 3.0: P2P State Synchronization</p>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-violet-500 rounded-full animate-pulse" />
                <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest dark:text-zinc-600">Live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Stack */}
      <section className="py-32 md:py-48 bg-background border-b border-border selection:bg-emerald-500 selection:text-black dark:bg-black dark:border-white/5 dark:text-zinc-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="col-span-1 lg:col-span-5">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-mono text-xs text-emerald-500 tracking-widest">05</span>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest dark:text-zinc-600">PROTOCOL: C_STACK</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-medium text-foreground tracking-tighter mb-8 leading-tight dark:text-white">
              Hierarchical <br /> Verification Stack.
            </h3>

            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-12 dark:text-zinc-400">
              Autonomous agents require a <span className="text-foreground font-medium dark:text-white">Deterministic Envelope</span>. We utilize a
              multi-stage consensus protocol (<span className="font-serif text-emerald-500/80">C</span>
              <sub>stack</sub>) that verifies code execution in ephemeral, network-isolated sandboxes with kernel-level syscall filtering.
            </p>

            <div className="flex flex-col gap-8 border-t border-border pt-8 dark:border-zinc-900">
              <div className="group">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-foreground font-medium dark:text-white">Adversarial Oversight</h4>
                  <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.2em]">ISOLATION: MICRO_VM</span>
                </div>
                <p className="text-sm text-muted-foreground font-light leading-relaxed dark:text-zinc-500">
                  All unverified logic is detained in network-gapped microVMs. Agents must pass &quot;Property-Based Testing&quot; where adversarial
                  nodes attempt to inject edge-case failures.
                </p>
              </div>

              <div className="group">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-foreground font-medium dark:text-white">Hallucination Reduction</h4>
                  <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-[0.2em]">P &lt; 1.4%</span>
                </div>
                <p className="text-sm text-muted-foreground font-light leading-relaxed dark:text-zinc-500">
                  We monitor Semantic Entropy (Perplexity Spikes). If the <span className="font-serif text-zinc-400">PPL</span> variance exceeds the
                  safe threshold, the branch is immediately pruned via the Flash Protocol.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 flex justify-center">
            <div className="w-full max-w-4xl mx-auto p-4 font-sans">
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground dark:text-zinc-500">
                      Pipeline_Architecture // C_STACK
                    </span>
                  </div>
                  <h2 className="text-2xl text-foreground font-light tracking-tight dark:text-white">
                    Verification Topology <span className="text-muted-foreground dark:text-zinc-600">v2.1</span>
                  </h2>
                  <p className="mt-2 text-muted-foreground text-sm max-w-md leading-relaxed dark:text-zinc-400">
                    Visualizing the double-gate validation process. Artifacts are subjected to adversarial sandboxing before passing entropy thresholds.
                  </p>
                </div>

                <div className="flex gap-8 border-l border-white/10 pl-8">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 dark:text-zinc-600">Pass_Rate</div>
                    <div className="text-lg text-emerald-400 font-mono tracking-tighter">94.2%</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1 dark:text-zinc-600">Avg_Latency</div>
                    <div className="text-lg text-foreground font-mono tracking-tighter dark:text-zinc-300">12ms</div>
                  </div>
                </div>
              </div>

              <div className="w-full bg-card border border-border rounded-sm relative overflow-hidden flex items-center justify-center dark:bg-[#050505] dark:border-white/10">
                <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(10,minmax(0,1fr))] opacity-10 pointer-events-none">
                  {Array.from({ length: 200 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-border/40 dark:border-zinc-800/50" />
                  ))}
                </div>
                <div className="w-full p-8 md:p-10">
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
