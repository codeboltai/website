'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, Workflow, Lock, Vote, MessageSquare } from 'lucide-react'

const pheromoneTypes = [
    { name: 'importance', color: 'bg-amber-500', purpose: 'Signal job priority', decay: 'None' },
    { name: 'request_split', color: 'bg-purple-500', purpose: 'Signal job should be split', decay: 'None' },
    { name: 'saturation', color: 'bg-red-500', purpose: 'Signal job is heavily worked on', decay: 'Slow' },
    { name: 'takeup_interest', color: 'bg-emerald-500', purpose: 'Signal interest in job', decay: 'Moderate' },
    { name: 'task_not_ready', color: 'bg-orange-500', purpose: 'Signal blocking dependencies', decay: 'None' },
    { name: 'job_available', color: 'bg-green-500', purpose: 'Signal blockers resolved', decay: 'Slow' },
    { name: 'files_blocked', color: 'bg-red-600', purpose: 'Signal files reserved', decay: 'None' },
]

const jobFeatures = [
    {
        icon: Lock,
        title: 'Job Locking',
        description: 'When an agent starts work, it locks the job—preventing others from duplicating effort. Other agents can request unlock if needed.',
    },
    {
        icon: Vote,
        title: 'Job Bidding',
        description: 'Agents can bid on tasks they are suited for. Bids include reason, priority, and status. No race conditions.',
    },
    {
        icon: Workflow,
        title: 'Split Proposals',
        description: 'Complex tasks can be split. Agents propose splits. Multiple proposals compete. Best proposal wins via deliberation.',
    },
    {
        icon: MessageSquare,
        title: 'Blocker Management',
        description: 'Track dependencies between jobs. Mark blockers. Auto-signal when blockers resolve.',
    },
]

const deliberationTypes = [
    {
        type: 'Voting',
        purpose: 'Democratic decision making',
        example: '"Which approach should we take?" → Agents vote on options',
    },
    {
        type: 'Feedback',
        purpose: 'Collect opinions on proposals',
        example: '"Here is my implementation plan" → Agents critique and refine',
    },
    {
        type: 'Q&A',
        purpose: 'Question and answer sessions',
        example: '"How does this module work?" → Agents share knowledge',
    },
    {
        type: 'Shared List',
        purpose: 'Collaborative list building',
        example: '"What test cases are needed?" → Agents contribute collectively',
    },
]

export default function StigmergyPage() {
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
                            Coordination Protocol
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-medium text-foreground tracking-tight mb-6 leading-[1.05]">
                        Stigmergy-Based Coordination
                    </h1>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                        Self-organizing intelligence inspired by nature. Agents coordinate through
                        environmental signals—no central orchestrator required.
                    </p>
                </div>
            </section>

            {/* What is Stigmergy */}
            <section className="py-16 px-6 bg-primary/5 border-b border-border">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-medium text-foreground mb-6">What is Stigmergy?</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Stigmergy is <span className="text-foreground">indirect coordination through environmental signals</span>—the
                        same mechanism that allows ant colonies to build complex structures without a central commander.
                        In Codebolt, agents leave &quot;pheromone&quot; signals that other agents can sense and respond to,
                        creating emergent organization.
                    </p>
                </div>
            </section>

            {/* Pheromone System */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Pheromone System
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Agents deposit pheromones to signal state, priority, and intent. Other agents
                            sense these signals and act accordingly.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pheromoneTypes.map((pheromone, idx) => (
                            <motion.div
                                key={pheromone.name}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.03 }}
                                className="border border-border p-4 bg-card/30"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-3 h-3 rounded-full ${pheromone.color}`} />
                                    <span className="font-mono text-sm text-foreground">{pheromone.name}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{pheromone.purpose}</p>
                                <span className="text-xs text-muted-foreground">Decay: {pheromone.decay}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Coordination */}
            <section className="py-24 px-6 bg-muted/10 border-y border-border">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Smart Job Coordination
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Intelligent task management where agents claim work, signal intentions,
                            and avoid conflicts automatically.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {jobFeatures.map((feature, idx) => {
                            const IconComponent = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="border border-border p-6 bg-background"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <IconComponent className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg font-medium text-foreground">{feature.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Agent Deliberations */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Agent Deliberations
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Structured discussions where agents vote, provide feedback, ask questions,
                            and build consensus—just like a human team.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {deliberationTypes.map((delib, idx) => (
                            <motion.div
                                key={delib.type}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="border border-border p-6 bg-card/30"
                            >
                                <h3 className="text-lg font-medium text-foreground mb-2">{delib.type}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{delib.purpose}</p>
                                <div className="bg-zinc-900/50 p-3 rounded">
                                    <p className="text-xs text-zinc-400 italic">{delib.example}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-border">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-medium text-foreground tracking-tight mb-6">
                        50 Agents. Zero Coordination Meetings.
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Let stigmergy handle the coordination. Focus on setting direction.
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
