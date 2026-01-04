'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, Brain, Database, Search, Clock } from 'lucide-react'

const memoryTypes = [
    {
        icon: Clock,
        name: 'Episodic Memory',
        description: 'Event-based memory with timestamps. Tracks what happened, when, and by whom.',
        features: ['Timestamped events', 'Time range queries', 'Conversation linking', 'Who did what tracking'],
    },
    {
        icon: Brain,
        name: 'Knowledge Graph',
        description: 'Connected understanding of your codebase—relationships, dependencies, architecture.',
        features: ['Kuzu-based graph DB', 'Custom record types', 'Edge relationships', 'Cypher-like queries'],
    },
    {
        icon: Search,
        name: 'Vector Database',
        description: 'Semantic search across all project knowledge. Find by meaning, not just keywords.',
        features: ['Configurable embeddings', 'Hybrid search', 'Metadata filtering', 'Collection namespaces'],
    },
    {
        icon: Database,
        name: 'Structured Memory',
        description: 'JSON and Markdown storage for specs, documentation, notes, and structured data.',
        features: ['Schema validation', 'Version tracking', 'Full-text search', 'Todo tracking'],
    },
]

const benefits = [
    {
        title: 'No Re-Explaining',
        description: 'Agents remember context from weeks or months ago. No more "starting from scratch" every session.',
    },
    {
        title: 'Learning Standards',
        description: 'Agents learn your coding conventions, preferences, and patterns—and apply them consistently.',
    },
    {
        title: 'System Understanding',
        description: 'Knowledge graphs capture relationships. Agents understand your code as a system, not isolated files.',
    },
    {
        title: 'Semantic Discovery',
        description: 'Find relevant code by meaning. Ask "how do we handle auth?" and find all related code.',
    },
]

const dataTypes = [
    'STRING', 'INT64', 'INT32', 'DOUBLE', 'FLOAT',
    'BOOL', 'DATE', 'TIMESTAMP', 'UUID', 'LIST', 'MAP',
]

export default function PersistentMemoryPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 border-b border-border">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/features"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Features
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                            Memory Architecture
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-medium text-foreground tracking-tight mb-6 leading-[1.05]">
                        Persistent Memory
                    </h1>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                        AI that remembers everything, forever. Knowledge graphs, vector databases, and
                        episodic memory give agents permanent, queryable memory spanning your project history.
                    </p>
                </div>
            </section>

            {/* Infinite Context */}
            <section className="py-16 px-6 bg-primary/5 border-b border-border">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-medium text-foreground mb-6">The Infinite Context Paradigm</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        LLMs have limited context windows—100-200K tokens. That's a keyhole view of your codebase.
                        Codebolt solves this at the <span className="text-foreground">IDE/harness level</span>.
                        Memory lives outside the agent, giving every agent access to
                        <span className="text-foreground"> infinite, persistent context</span>.
                    </p>
                </div>
            </section>

            {/* Memory Types */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Memory Types
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Four distinct memory systems working together to give agents comprehensive understanding.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {memoryTypes.map((memory, idx) => {
                            const IconComponent = memory.icon
                            return (
                                <motion.div
                                    key={memory.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="border border-border p-8 bg-card/30"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 border border-border flex items-center justify-center">
                                            <IconComponent className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium text-foreground mb-2">{memory.name}</h3>
                                            <p className="text-sm text-muted-foreground">{memory.description}</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2">
                                        {memory.features.map((feature, fidx) => (
                                            <li key={fidx} className="text-sm text-muted-foreground flex items-center gap-2">
                                                <span className="w-1 h-1 bg-primary/60 rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Knowledge Graph Details */}
            <section className="py-24 px-6 bg-muted/10 border-y border-border">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Knowledge Graph Capabilities
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Define custom schemas, create relationships, and query your codebase as a connected graph.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-medium text-foreground mb-6">Supported Data Types</h3>
                            <div className="flex flex-wrap gap-2">
                                {dataTypes.map((type) => (
                                    <span key={type} className="px-3 py-1 bg-zinc-900 text-zinc-300 font-mono text-xs">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-foreground mb-6">Graph Operations</h3>
                            <ul className="space-y-3">
                                <li className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-1 h-1 bg-primary rounded-full" />
                                    Create/query records (nodes)
                                </li>
                                <li className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-1 h-1 bg-primary rounded-full" />
                                    Create/query edges (relationships)
                                </li>
                                <li className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-1 h-1 bg-primary rounded-full" />
                                    Pattern matching & traversal
                                </li>
                                <li className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-1 h-1 bg-primary rounded-full" />
                                    Custom view templates
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Why Persistent Memory Matters
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="border border-border p-6 bg-card/30"
                            >
                                <h3 className="text-lg font-medium text-foreground mb-2">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-border">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-medium text-foreground tracking-tight mb-6">
                        AI That Grows With Your Project
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Build lasting institutional knowledge. Agents that truly understand your codebase.
                    </p>
                    <Link
                        href="/download"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase rounded-full font-bold hover:bg-cyan-400 transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </section>
        </div>
    )
}
