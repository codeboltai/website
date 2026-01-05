'use client'

/**
 * RecursiveStateConvergence - Refactored to use template components
 * 
 * This is a demonstration of how existing sections can be refactored
 * to use the reusable templates from @/templatesections.
 * 
 * Compare with the original RecursiveStateConvergence.tsx to see the difference.
 */

import {
  SectionShell,
  SectionHeader,
  TwoColumnSection,
  DiagramPanel,
  MetricStrip,
} from '@/templatesections'
import VarianceReduction from '@/components/diagrams/VarianceReduction'

export default function RecursiveStateConvergenceTemplated() {
  return (
    <SectionShell tone="deep" borderBottom>
      <TwoColumnSection
        split="5-7"
        gap="lg"
        left={
          <>
            {/* Section Header */}
            <SectionHeader
              kicker="System Protocol 04"
              kickerDot="emerald"
              title={"Recursive State\nConvergence"}
              description={
                <>
                  <p className="mb-4">
                    The system does not &quot;guess.&quot; It utilizes{' '}
                    <span className="text-foreground font-medium dark:text-zinc-200">Semantic Entropy Tracking</span> to monitor the variance of agent
                    outputs.
                  </p>
                  <p>
                    High-perplexity trajectories—representing hallucinated logic—are mathematically identified and pruned via{' '}
                    <span className="text-foreground font-medium dark:text-zinc-200">Negative Knowledge Propagation</span>, forcing the swarm to converge
                    on a single deterministic truth.
                  </p>
                </>
              }
              animate={false}
            />

            {/* Stats Box */}
            <MetricStrip
              columns={2}
              variant="divider"
              metrics={[
                { label: 'Process', value: 'Flash_Verify Loop' },
                { label: 'Pruning Rate', value: '94.2% / Iteration' },
              ]}
              className="mb-4"
            />
            <div className="p-4 bg-muted/10 dark:bg-zinc-900/10 border border-border dark:border-zinc-800">
              <span className="block text-[9px] font-mono text-muted-foreground uppercase tracking-widest mb-1 dark:text-zinc-500">
                Outcome
              </span>
              <span className="text-xs text-muted-foreground font-mono flex items-center gap-2 dark:text-zinc-300">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Deterministic Consensus (P &gt; 0.99)
              </span>
            </div>
          </>
        }
        right={
          <>
            <DiagramPanel
              title="FIG 2.1: VARIANCE REDUCTION (σ²)"
              figureLabel="*Visual representation of variance reduction over 12 inference steps. Note the pruning of the divergent red trajectory at t=4."
              showGrid
              aspectRatio="auto"
              height="400px"
              statsPanel={
                <span className="text-[9px] font-mono text-muted-foreground dark:text-zinc-500">
                  t (inference_steps) →
                </span>
              }
            >
              <VarianceReduction className="w-full h-full" />
            </DiagramPanel>
            <div className="mt-3 flex justify-end px-1">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest dark:text-zinc-600">Live_feed :: active</span>
            </div>
          </>
        }
      />
    </SectionShell>
  )
}
