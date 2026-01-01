'use client'

import { motion } from 'motion/react'
import TechCard from '@/components/ui/TechCard'
import LinearAttention from '@/components/diagrams/LinearAttention'
import SerializationLoop from '@/components/diagrams/SerializationLoop'
import DecoupledTopology from '@/components/diagrams/DecoupledTopology'

export default function FeatureGrid() {
  return (
    <section className="bg-background text-foreground py-24 px-6 border-b border-border font-sans antialiased dark:bg-[#050505] dark:text-white dark:border-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 bg-primary dark:bg-cyan-500 rounded-full" />
            <span className="font-mono text-[10px] text-muted-foreground dark:text-zinc-500 uppercase tracking-widest">
              System Architecture: Frontend
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-foreground dark:text-white mb-8 leading-[0.95]">
            The Interface is Standard. <br />
            <span className="text-muted-foreground dark:text-zinc-500">The Runtime is Recursive.</span>
          </h2>

          <p className="text-xl text-muted-foreground dark:text-zinc-400 font-light leading-relaxed border-l-2 border-border dark:border-zinc-800 pl-6">
            Codebolt is deployed as a fully compatible fork of VS Code. You get the zero-learning-curve interface you expect, powered by a D3
            Runtime that provides infinite context retention and adaptive learning from your natural language interactions.
          </p>
        </motion.div>

        <div className="w-full bg-background dark:bg-[#050505] p-0 md:p-12 text-foreground dark:text-zinc-200">
          {/* Feature Cards Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <TechCard
              figureLabel="Fig 3.1 — Linear Attention"
              title="Infinite Context"
              description="Virtualized session handling allows for referencing chats, documentation, and logic across millions of tokens without degradation."
              diagram={<LinearAttention />}
              stats={[{ label: 'Capacity', value: '∞ (Virtual)' }]}
            />

            <TechCard
              figureLabel="Fig 3.2 — Serialization Loop"
              title="Adaptive Weights"
              description="The D3 Engine serializes user corrections into a local vector layer, preventing the recurrence of logic errors in real-time."
              diagram={<SerializationLoop />}
              stats={[{ label: 'Learning Rate', value: 'Adaptive' }]}
            />

            <TechCard
              figureLabel="Fig 3.3 — Decoupled Topology"
              title="Background Reasoning"
              description="Horizon Mode runs heavy compute on a detached worker thread, maintaining 60fps UI responsiveness while the swarm solves."
              diagram={<DecoupledTopology />}
              stats={[{ label: 'Main Thread', value: 'Non-Blocking' }]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
