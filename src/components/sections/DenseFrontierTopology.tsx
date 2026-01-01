'use client'

import { motion } from 'motion/react'
import NodeGrid from '@/components/diagrams/NodeGrid'

export default function DenseFrontierTopology() {
  return (
    <section className="bg-background py-24 px-4 md:px-8 font-sans dark:bg-[#030303] dark:text-zinc-200">
      <div className="max-w-[1200px] mx-auto border border-border bg-card dark:border-zinc-800/60 dark:bg-[#050505] relative overflow-hidden shadow-sm">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none dark:opacity-100"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Header */}
        <div className="p-8 md:p-12 border-b border-border dark:border-zinc-800/60 relative z-10 bg-muted/10 dark:bg-zinc-900/10 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-mono text-[10px] text-muted-foreground dark:text-zinc-500 uppercase tracking-widest">
                  System Architecture v.2.4
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground dark:text-white mb-6">
                Dense Frontier Topology
              </h2>
              <p className="text-sm md:text-base text-muted-foreground dark:text-zinc-400 leading-relaxed font-light max-w-xl">
                Standard swarms utilize mass-parallelism for statistical correlation. The Dense Frontier instantiates{' '}
                <span className="text-foreground dark:text-zinc-200 font-medium">25 High-Reasoning Models (HRMs)</span> to resolve high-entropy logic through
                multi-step causal chains.
              </p>
            </div>

            {/* Stats (desktop) */}
            <div className="hidden md:grid grid-cols-2 gap-px bg-border/50 border border-border/50 dark:bg-zinc-800/50 dark:border-zinc-800/50">
              <div className="bg-card dark:bg-[#050505] p-4 flex flex-col gap-1 w-32">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground dark:text-zinc-500 font-mono">Inference</span>
                <span className="text-lg font-mono text-foreground dark:text-zinc-200">L2</span>
              </div>
              <div className="bg-card dark:bg-[#050505] p-4 flex flex-col gap-1 w-32">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground dark:text-zinc-500 font-mono">Entropy</span>
                <span className="text-lg font-mono text-emerald-500">Low</span>
              </div>
              <div className="bg-card dark:bg-[#050505] p-4 flex flex-col gap-1 w-32">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground dark:text-zinc-500 font-mono">Nodes</span>
                <span className="text-lg font-mono text-foreground dark:text-zinc-200">25</span>
              </div>
              <div className="bg-card dark:bg-[#050505] p-4 flex flex-col gap-1 w-32">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground dark:text-zinc-500 font-mono">Protocol</span>
                <span className="text-lg font-mono text-foreground dark:text-zinc-200">Adv/01</span>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 border-b border-border relative z-10">
          <div className="lg:col-span-5 p-12 bg-background dark:bg-[#020202] flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-border dark:border-zinc-800/60">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <NodeGrid variant="denseFrontier" />
            </motion.div>
          </div>

          <div className="lg:col-span-7 p-10 md:p-16 bg-card dark:bg-[#050505] flex flex-col justify-center">
            <div className="space-y-12">
              <div className="relative pl-6 border-l border-border">
                <div className="absolute top-0 left-0 w-[1px] h-6 bg-emerald-500 -translate-x-[1px]" />
                <span className="font-mono text-[9px] text-muted-foreground dark:text-zinc-500 uppercase tracking-widest mb-2 block">
                  01 — Reasoning Runtime
                </span>
                <h3 className="text-lg text-foreground dark:text-zinc-100 font-medium mb-2">Simulation over Iteration</h3>
                <p className="text-xs md:text-sm text-muted-foreground dark:text-zinc-400 leading-relaxed font-light">
                  Agents perform <span className="text-foreground dark:text-zinc-200">Chain-of-Thought Simulation</span>, maintaining causal logic over extended
                  horizons. They validate solution paths end-to-end to prevent logic drift.
                </p>
              </div>

              <div className="relative pl-6 border-l border-border">
                <div className="absolute top-0 left-0 w-[1px] h-6 bg-red-500 -translate-x-[1px]" />
                <span className="font-mono text-[9px] text-muted-foreground dark:text-zinc-500 uppercase tracking-widest mb-2 block">
                  02 — Consensus Protocol
                </span>
                <h3 className="text-lg text-foreground dark:text-zinc-100 font-medium mb-2">Adversarial Oversight</h3>
                <p className="text-xs md:text-sm text-muted-foreground dark:text-zinc-400 leading-relaxed font-light">
                  Oversight nodes enforce structural constraints. They utilize{' '}
                  <span className="text-red-400/80">Active Pruning</span> to eliminate logic branches that violate architectural guardrails defined
                  in the system prompt.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border dark:divide-zinc-800/60 bg-background dark:bg-[#030303] border-t border-border dark:border-zinc-800/60 relative z-10">
          <div className="p-8 group hover:bg-muted/10 transition-colors">
            <h4 className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest mb-3">
              01 / Decoupling
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-mono">
              &gt;&gt; Separating <span className="text-foreground/80">Reasoning_Time</span> from Token_Gen.
              <br />
              &gt;&gt; Instantiating 25 divergent trajectories for deterministic resolution.
            </p>
          </div>
          <div className="p-8 group hover:bg-muted/10 transition-colors">
            <h4 className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest mb-3">
              02 / Serialization
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-mono">
              &gt;&gt; Utilizing <span className="text-emerald-500/80">D3_Runtime</span>.
              <br />
              &gt;&gt; Only validated context states are serialized. Low-confidence branches pruned.
            </p>
          </div>
          <div className="p-8 group hover:bg-muted/10 transition-colors">
            <h4 className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest mb-3">
              03 / Orchestration
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-mono">
              &gt;&gt; Local orchestrator manages state.
              <br />
              &gt;&gt; Creates deterministic runtime for recursive swarms.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

