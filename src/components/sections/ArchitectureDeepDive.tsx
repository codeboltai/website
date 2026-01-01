'use client'

import { motion } from 'motion/react'
import DivergentTrajectorySearch from '@/components/diagrams/DivergentTrajectorySearch'

export default function ArchitectureDeepDive() {
  return (
    <section className="py-32 px-6 bg-background border-b border-border dark:bg-[#050505] dark:border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] text-primary dark:text-cyan-500 uppercase mb-4 block tracking-[0.3em] font-medium">
            Architecture Deep Dive
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground dark:text-white mb-8 tracking-tighter">
            Horizon Mode: <span className="text-muted-foreground dark:text-neutral-500">Divergent Trajectory Search</span>
          </h2>
          <p className="text-xl text-muted-foreground dark:text-neutral-400 font-light leading-relaxed max-w-3xl">
            Standard AI treats a prompt as a linear sequence. Horizon Mode alters this topology, instantiating a{' '}
            <span className="text-foreground dark:text-white">Recursive Swarm</span> to explore a high-dimensional solution space before committing
            to a final output.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="w-full h-[400px] bg-background/40 dark:bg-[#030303] border border-border dark:border-neutral-800/50 mb-16 relative overflow-hidden rounded-sm group"
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(23,23,23,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(23,23,23,0.9) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <DivergentTrajectorySearch />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-border dark:border-neutral-900 pt-16">
          <div>
            <span className="font-mono text-[9px] text-primary dark:text-cyan-500 uppercase mb-4 block tracking-[0.2em]">
              Stage 01. Divergence
            </span>
            <h4 className="text-foreground dark:text-white text-lg font-medium mb-4">Scout Swarm Deployment (L1)</h4>
            <p className="text-sm text-muted-foreground dark:text-neutral-500 leading-relaxed font-light">
              The system deploys up to 10,000 isolated Scout agents using optimized Small Language Models (SLMs). These agents explore
              low-probability solution vectors (P &lt; 0.05) at near-zero marginal cost.
            </p>
          </div>
          <div>
            <span className="font-mono text-[9px] text-primary dark:text-cyan-500 uppercase mb-4 block tracking-[0.2em]">
              Stage 02. Convergence
            </span>
            <h4 className="text-foreground dark:text-white text-lg font-medium mb-4">Negative Knowledge Propagation</h4>
            <p className="text-sm text-muted-foreground dark:text-neutral-500 leading-relaxed font-light">
              When a Scout hits a dead end, it broadcasts a Failure Vector to the shared workspace. The swarm uses this negative knowledge to
              prune invalid logic branches in real-time.
            </p>
          </div>
          <div>
            <span className="font-mono text-[9px] text-primary dark:text-cyan-500 uppercase mb-4 block tracking-[0.2em]">
              Stage 03. Promotion
            </span>
            <h4 className="text-foreground dark:text-white text-lg font-medium mb-4">Context Promotion (L2)</h4>
            <p className="text-sm text-muted-foreground dark:text-neutral-500 leading-relaxed font-light">
              Upon identifying a candidate solution with high confidence (P &gt; 0.85), the state is promoted. The runtime injects relevant
              context into a Frontier model for high-fidelity refinement.
            </p>
          </div>
        </div>

        <div className="mt-24 p-12 border border-border dark:border-neutral-900 bg-card/40 dark:bg-[#080808]/40 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-primary dark:bg-cyan-500" />
          <p className="text-lg text-muted-foreground dark:text-neutral-400 font-light max-w-2xl mx-auto">
            The resulting code is not a generation—it is the surviving winner of <br />
            <span className="text-foreground dark:text-white font-normal">10,000 parallel experiments</span> conducted within the search space.
          </p>
        </div>
      </div>
    </section>
  )
}

