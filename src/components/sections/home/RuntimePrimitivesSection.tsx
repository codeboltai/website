'use client'

import { RuntimePrimitivesSection as RuntimePrimitivesSectionTemplate } from '@/templatesections'

export default function RuntimePrimitivesSection() {
  return (
    <RuntimePrimitivesSectionTemplate
      versionBadge="v.2.0.4-beta"
      kicker="System_Primitives"
      title="Runtime Primitives"
      description={
        <>
          Core architectural components designed for high-throughput engineering environments where{' '}
          <span className="text-foreground dark:text-zinc-200">latency</span> and{' '}
          <span className="text-foreground dark:text-zinc-200">reasoning depth</span> coexist.
        </>
      }
      statusIndicator={{ text: 'All Systems Operational', subtext: 'Uptime: 99.99%', color: 'emerald' }}
      primitives={[
        {
          number: '01',
          label: 'Routing',
          title: 'Inference Routing',
          description: 'Intelligently routes tasks between "Scout Swarms" (exploration) and "Frontier Models" (synthesis).',
          stats: [
            { label: 'Mode', value: 'Hybrid_Dynamic' },
            { label: 'Latency', value: '< 24ms', highlight: true },
          ],
          icon: 'cross',
        },
        {
          number: '02',
          label: 'Knowledge',
          title: 'Distributed Knowledge',
          description: 'Vector-space de-duplication layer allows instant propagation of "Negative Knowledge" (known failures).',
          stats: [
            { label: 'Sync', value: 'Realtime_WS' },
            { label: 'Index', value: 'HNSW_Vector' },
          ],
          icon: 'dots',
        },
        {
          number: '03',
          label: 'Distillation',
          title: 'Dynamic Distillation',
          description: 'Rigid separation of memory manifolds (Episodic, Sequential, Associative, Procedural) to prevent drift.',
          stats: [
            { label: 'Layers', value: '4_Manifolds' },
            { label: 'Retention', value: 'Infinite' },
          ],
          icon: 'lines',
        },
        {
          number: '04',
          label: 'Promotion',
          title: 'Context Promotion',
          description: 'Candidate solutions clearing the confidence threshold (P > 0.85) are serialized and promoted.',
          stats: [
            { label: 'Threshold', value: 'P > 0.85' },
            { label: 'Pass Rate', value: '92.4%' },
          ],
          icon: 'bars',
        },
      ]}
    />
  )
}

