'use client'

import { motion } from 'motion/react'
import TechCard from '@/components/ui/TechCard'
import StatusLabel from '@/components/ui/StatusLabel'
import LinearAttention from '@/components/diagrams/LinearAttention'
import SerializationLoop from '@/components/diagrams/SerializationLoop'
import DecoupledTopology from '@/components/diagrams/DecoupledTopology'

export default function FeatureGrid() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 max-w-[1600px] mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 lg:mb-20"
      >
        <StatusLabel dotColor="primary" className="mb-4">
          SYSTEM ARCHITECTURE: FRONTEND
        </StatusLabel>
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tight">
          The Interface is Standard.{' '}
          <br className="hidden md:block" />
          <span className="text-muted-foreground">The Runtime is Recursive.</span>
        </h2>
        
        <div className="flex items-start gap-4 mt-6">
          <div className="w-[1px] h-20 bg-muted-foreground/30 mt-1" />
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Codebolt is deployed as a fully compatible fork of VS Code. You get the
            zero-learning-curve interface you expect, powered by a D3 Runtime that provides
            infinite context retention and adaptive learning from your natural language
            interactions.
          </p>
        </div>
      </motion.div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TechCard
          figureLabel="FIG 3.1 — LINEAR ATTENTION"
          title="Infinite Context"
          description="Virtualized session handling allows for referencing chats, documentation, and logic across millions of tokens without degradation."
          diagram={<LinearAttention />}
          stats={[{ label: 'Capacity', value: '∞ (Virtual)' }]}
        />
        
        <TechCard
          figureLabel="FIG 3.2 — SERIALIZATION LOOP"
          title="Adaptive Weights"
          description="The D3 Engine serializes user corrections into a local vector layer, preventing the recurrence of logic errors in real-time."
          diagram={<SerializationLoop />}
          stats={[{ label: 'Learning Rate', value: 'Adaptive' }]}
        />
        
        <TechCard
          figureLabel="FIG 3.3 — DECOUPLED TOPOLOGY"
          title="Background Reasoning"
          description="Horizon Mode runs heavy compute on a detached worker thread, maintaining 60fps UI responsiveness while the swarm solves."
          diagram={<DecoupledTopology />}
          stats={[{ label: 'Main Thread', value: 'Non-Blocking' }]}
        />
      </div>
    </section>
  )
}
