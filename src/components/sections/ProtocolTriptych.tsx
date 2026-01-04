'use client'

import { motion } from 'motion/react'

const protocols = [
    {
        label: 'Prototype 01',
        title: 'Swarm Coordination',
        description: 'Stigmergy-based coordination enables hundreds of agents to work together without a central orchestrator—inspired by biological swarm intelligence.',
        tags: ['Pheromones', 'Decentralized', 'Self-Organizing'],
    },
    {
        label: 'Prototype 02',
        title: 'Job Management',
        description: 'Smart task coordination with locking, bidding, and split proposals. Agents claim work, signal intentions, and avoid conflicts automatically.',
        tags: ['Locking', 'Bidding', 'Decomposition'],
    },
    {
        label: 'Prototype 03',
        title: 'Agent Deliberation',
        description: 'Structured discussion where agents vote on decisions, provide feedback, ask questions, and build collaborative lists for consensus.',
        tags: ['Voting', 'Feedback', 'Consensus'],
    },
]

export default function ProtocolTriptych() {
    return (
        <section className="py-24 px-6 bg-muted/10 dark:bg-zinc-900/10 border-b border-border dark:border-zinc-900">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <span className="font-mono text-[10px] text-primary dark:text-cyan-500 uppercase mb-4 block tracking-[0.3em] font-medium">
                        Coordination Protocols
                    </span>
                    <h2 className="text-3xl md:text-4xl font-medium text-foreground dark:text-white tracking-tighter">
                        How Agents Work Together
                    </h2>
                </motion.div>

                {/* Protocol Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {protocols.map((protocol, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-card dark:bg-zinc-900/40 border border-border dark:border-zinc-800 p-8 transition-all duration-300 hover:border-primary/50 dark:hover:border-cyan-500/30"
                        >
                            {/* Protocol Label */}
                            <div className="mb-6">
                                <span className="inline-flex items-center px-3 py-1 border border-border dark:border-zinc-700 text-[9px] font-mono uppercase tracking-wider text-muted-foreground dark:text-zinc-500">
                                    {protocol.label}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-medium text-foreground dark:text-white mb-4 tracking-tight group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                                {protocol.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground dark:text-zinc-400 font-light leading-relaxed mb-6">
                                {protocol.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {protocol.tags.map((tag, tidx) => (
                                    <span
                                        key={tidx}
                                        className="px-2 py-1 bg-muted/50 dark:bg-zinc-800/50 text-[10px] font-mono uppercase tracking-wider text-muted-foreground dark:text-zinc-500"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
