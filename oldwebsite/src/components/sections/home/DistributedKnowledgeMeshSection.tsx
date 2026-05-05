import type { CSSProperties } from 'react'
import NetworkMesh from '@/components/diagrams/NetworkMesh'

type CSSVariableStyle = CSSProperties & {
  '--mesh-accent'?: string
}

const meshAccentStyle: CSSVariableStyle = {
  '--mesh-accent': '262 83% 58%',
}

export default function DistributedKnowledgeMeshSection() {
  return (
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
  )
}

