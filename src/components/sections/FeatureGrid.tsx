'use client'

import { FeatureGridSection, type FeatureGridItem } from '@/templatesections'

const features: FeatureGridItem[] = [
    {
        figureLabel: 'FIG 1.1 — MULTI-AGENT SWARMS',
        title: 'Deploy 100+ Agents',
        description: 'Run dozens or hundreds of AI agents simultaneously—each with specialized roles, working in parallel on different parts of your codebase.',
        stats: [{ label: 'Agents', value: '∞' }],
        href: '/features/multi-agent-swarms',
    },
    {
        figureLabel: 'FIG 1.2 — STIGMERGY COORDINATION',
        title: 'Self-Organizing Intelligence',
        description: 'Agents coordinate through environmental signals—like ant colonies—creating emergent organization without a central orchestrator.',
        stats: [{ label: 'Coordination', value: 'Autonomous' }],
        href: '/features/stigmergy',
    },
    {
        figureLabel: 'FIG 1.3 — PERSISTENT MEMORY',
        title: 'AI That Never Forgets',
        description: 'Knowledge graphs, vector databases, and episodic memory give agents permanent, queryable memory spanning your entire project history.',
        stats: [{ label: 'Context', value: 'Infinite' }],
        href: '/features/persistent-memory',
    },
    {
        figureLabel: 'FIG 1.4 — FULL OBSERVABILITY',
        title: 'See Everything',
        description: 'Complete visibility into what agents are doing, thinking, and deciding. Every tool call logged. Every decision auditable.',
        stats: [{ label: 'Visibility', value: '100%' }],
        href: '/features/observability',
    },
    {
        figureLabel: 'FIG 1.5 — CUSTOM AGENTS',
        title: 'Build Your AI Team',
        description: 'Create custom agents via code or visual drag-and-drop builder. Flow agents, code agents, remix agents—tailored to your workflows.',
        stats: [{ label: 'Creation', value: 'No-code' }],
        href: '/features/ai-agents',
    },
    {
        figureLabel: 'FIG 1.6 — 24/7 DEVELOPMENT',
        title: 'Development Never Sleeps',
        description: 'Assign tasks before you leave. Wake up to completed features, tested code, and pull requests ready for review.',
        stats: [{ label: 'Operation', value: '24/7' }],
        href: '/use-cases',
    },
]

export default function FeatureGrid() {
    return (
        <FeatureGridSection
            kicker="Platform Capabilities"
            title={"From One AI Assistant\nTo an Entire AI Team."}
            description="Stop working with a single AI helper. Deploy swarms of specialized agents—each with its own role, memory, and expertise—building your software around the clock."
            columns={3}
            features={features}
        />
    )
}
