'use client'

import { ArchitectureDeepDiveSection, type ArchitectureStage } from '@/templatesections'
import DivergentTrajectorySearch from '@/components/diagrams/DivergentTrajectorySearch'

const stages: ArchitectureStage[] = [
  {
    stageLabel: 'Stage 01. Divergence',
    title: 'Scout Swarm Deployment (L1)',
    description: 'The system deploys up to 10,000 isolated Scout agents using optimized Small Language Models (SLMs). These agents explore low-probability solution vectors (P < 0.05) at near-zero marginal cost.',
  },
  {
    stageLabel: 'Stage 02. Convergence',
    title: 'Negative Knowledge Propagation',
    description: 'When a Scout hits a dead end, it broadcasts a Failure Vector to the shared workspace. The swarm uses this negative knowledge to prune invalid logic branches in real-time.',
  },
  {
    stageLabel: 'Stage 03. Promotion',
    title: 'Context Promotion (L2)',
    description: 'Upon identifying a candidate solution with high confidence (P > 0.85), the state is promoted. The runtime injects relevant context into a Frontier model for high-fidelity refinement.',
  },
]

export default function ArchitectureDeepDive() {
  return (
    <ArchitectureDeepDiveSection
      kicker="Architecture Deep Dive"
      title={"Horizon Mode: Divergent Trajectory Search"}
      description={
        <>
          Standard AI treats a prompt as a linear sequence. Horizon Mode alters this topology, instantiating a{' '}
          <span className="text-foreground dark:text-white">Recursive Swarm</span> to explore a high-dimensional solution space before committing
          to a final output.
        </>
      }
      diagram={<DivergentTrajectorySearch />}
      stages={stages}
      callout="The resulting code is not a generation—it is the surviving winner of 10,000 parallel experiments conducted within the search space."
    />
  )
}
