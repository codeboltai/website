'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const features = [
    {
        figureLabel: 'FIG 1.1 — MULTI-AGENT SWARMS',
        title: 'Deploy 100+ Agents',
        description: 'Run dozens or hundreds of AI agents simultaneously—each with specialized roles, working in parallel on different parts of your codebase.',
        stat: { label: 'Agents', value: '∞' },
        href: '/features/multi-agent-swarms',
    },
    {
        figureLabel: 'FIG 1.2 — STIGMERGY COORDINATION',
        title: 'Self-Organizing Intelligence',
        description: 'Agents coordinate through environmental signals—like ant colonies—creating emergent organization without a central orchestrator.',
        stat: { label: 'Coordination', value: 'Autonomous' },
        href: '/features/stigmergy',
    },
    {
        figureLabel: 'FIG 1.3 — PERSISTENT MEMORY',
        title: 'AI That Never Forgets',
        description: 'Knowledge graphs, vector databases, and episodic memory give agents permanent, queryable memory spanning your entire project history.',
        stat: { label: 'Context', value: 'Infinite' },
        href: '/features/persistent-memory',
    },
    {
        figureLabel: 'FIG 1.4 — FULL OBSERVABILITY',
        title: 'See Everything',
        description: 'Complete visibility into what agents are doing, thinking, and deciding. Every tool call logged. Every decision auditable.',
        stat: { label: 'Visibility', value: '100%' },
        href: '/features/observability',
    },
    {
        figureLabel: 'FIG 1.5 — CUSTOM AGENTS',
        title: 'Build Your AI Team',
        description: 'Create custom agents via code or visual drag-and-drop builder. Flow agents, code agents, remix agents—tailored to your workflows.',
        stat: { label: 'Creation', value: 'No-code' },
        href: '/features/ai-agents',
    },
    {
        figureLabel: 'FIG 1.6 — 24/7 DEVELOPMENT',
        title: 'Development Never Sleeps',
        description: 'Assign tasks before you leave. Wake up to completed features, tested code, and pull requests ready for review.',
        stat: { label: 'Operation', value: '24/7' },
        href: '/use-cases',
    },
]

export default function FeatureGrid() {
    return (
        <section className="py-24 px-6 text-foreground font-sans antialiased bg-background dark:bg-[#050505] border-b border-border dark:border-zinc-900">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 max-w-3xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-1.5 h-1.5 bg-primary dark:bg-cyan-500 rounded-full" />
                        <span className="font-mono text-[10px] text-muted-foreground dark:text-zinc-500 uppercase tracking-widest">
                            Platform Capabilities
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-foreground dark:text-white mb-8 leading-[0.95]">
                        <span>From One AI Assistant</span>
                        <br />
                        <span className="text-muted-foreground dark:text-zinc-500">To an Entire AI Team.</span>
                    </h2>

                    <div className="text-xl text-muted-foreground dark:text-zinc-400 font-light leading-relaxed border-l-2 border-border dark:border-zinc-800 pl-6">
                        <p>
                            Stop working with a single AI helper. Deploy swarms of specialized agents—each with its own
                            role, memory, and expertise—building your software around the clock.
                        </p>
                    </div>
                </motion.div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative border border-border dark:border-zinc-800 p-6 transition-all duration-500 hover:border-muted-foreground/50 dark:hover:border-zinc-700"
                        >
                            {/* Corner brackets */}
                            <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-muted-foreground/40 dark:border-zinc-600" />
                            <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-muted-foreground/40 dark:border-zinc-600" />
                            <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-muted-foreground/40 dark:border-zinc-600" />
                            <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-muted-foreground/40 dark:border-zinc-600" />

                            {/* Figure label */}
                            <div className="mb-4 font-mono text-[10px] uppercase text-muted-foreground dark:text-zinc-500 tracking-widest">
                                {feature.figureLabel}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-medium text-foreground dark:text-white mb-3 tracking-tight group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground dark:text-zinc-400 font-light leading-relaxed mb-6">
                                {feature.description}
                            </p>

                            {/* Stats + Link */}
                            <div className="mt-auto pt-4 border-t border-border dark:border-zinc-800 flex justify-between items-center">
                                <div>
                                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500 block mb-1">
                                        {feature.stat.label}
                                    </span>
                                    <span className="font-mono text-sm text-foreground dark:text-zinc-200">
                                        {feature.stat.value}
                                    </span>
                                </div>
                                <Link
                                    href={feature.href}
                                    className="text-xs text-muted-foreground hover:text-primary dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group/link"
                                >
                                    Learn more
                                    <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
