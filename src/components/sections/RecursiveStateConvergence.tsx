'use client'

import { motion } from 'motion/react'
import VarianceReduction from '@/components/diagrams/VarianceReduction'

export default function RecursiveStateConvergence() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 bg-background border-b border-border">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="col-span-1 lg:col-span-5"
        >
          <div className="flex flex-col gap-4 mb-8">
            <div className="inline-flex items-center gap-2 border-l-2 border-emerald-500 pl-3">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">System Protocol 04</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-medium text-foreground tracking-tight leading-[1.1]">
              Recursive State <br /> Convergence
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground font-light leading-relaxed">
              The system does not &quot;guess.&quot; It utilizes <span className="text-foreground font-medium">Semantic Entropy Tracking</span> to
              monitor the variance of agent outputs.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed">
              High-perplexity trajectories—representing hallucinated logic—are mathematically identified and pruned via{' '}
              <span className="text-foreground font-medium">Negative Knowledge Propagation</span>, forcing the swarm to converge on a single
              deterministic truth.
            </p>
          </div>

          <div className="mt-8 border border-border bg-card divide-y divide-border">
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="p-4">
                <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Process</span>
                <span className="text-xs text-foreground font-mono">Flash_Verify Loop</span>
              </div>
              <div className="p-4">
                <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Pruning Rate</span>
                <span className="text-xs text-emerald-500 font-mono">94.2% / Iteration</span>
              </div>
            </div>
            <div className="p-4 bg-muted/10">
              <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Outcome</span>
              <span className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Deterministic Consensus (P &gt; 0.99)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="col-span-1 lg:col-span-7"
        >
          <div className="relative w-full h-[400px] flex items-center justify-center bg-card border border-border rounded-sm overflow-hidden">
            <div className="absolute top-4 left-4 text-[9px] font-mono text-muted-foreground">FIG 2.1: VARIANCE REDUCTION (σ²)</div>
            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-muted-foreground">t (inference_steps) →</div>
            <VarianceReduction className="w-full h-full" />
          </div>

          <div className="mt-3 flex justify-between items-start px-1">
            <p className="text-[10px] text-muted-foreground font-mono max-w-md">
              *Visual representation of variance reduction over 12 inference steps. Note the pruning of the divergent red trajectory at t=4.
            </p>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">Live_feed :: active</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

