'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, Users, UserCheck, Shield, Zap, Plus, Minus } from 'lucide-react'

const swarmFeatures = [
    {
        title: 'Swarm Management',
        description: 'Create named swarms with custom configurations. Set agent limits, enable external agent support, and configure auto-offline timeouts.',
        items: ['Swarm creation & configuration', 'Agent limits per swarm', 'External agent support', 'Auto-offline detection'],
    },
    {
        title: 'Team Formation',
        description: 'Organize agents into functional teams with specific roles and requirements. Define team-level permissions and coordination.',
        items: ['Team creation within swarms', 'Role requirements', 'Member limits', 'Team metadata'],
    },
    {
        title: 'Role System',
        description: 'Create roles with specific capabilities and permissions. Control which agents can perform which actions.',
        items: ['Role definitions', 'Capability requirements', 'Permission management', 'Self-assignment control'],
    },
    {
        title: 'Vacancy Management',
        description: 'Post open positions within swarms. Agents can apply for vacancies with optional approval workflows.',
        items: ['Role vacancies', 'Priority levels', 'Application system', 'Approval workflow'],
    },
]

const agentStates = [
    { state: 'available', color: 'bg-emerald-500', description: 'Ready to accept work' },
    { state: 'working', color: 'bg-cyan-500', description: 'Currently executing a task' },
    { state: 'busy', color: 'bg-amber-500', description: 'Occupied with high-priority work' },
    { state: 'offline', color: 'bg-zinc-500', description: 'Not responding or disconnected' },
    { state: 'error', color: 'bg-red-500', description: 'In error state' },
]

const scalingBenefits = [
    { value: '5', label: 'Minimum swarm size' },
    { value: '100+', label: 'Maximum agents' },
    { value: 'Instant', label: 'Scale up time' },
    { value: '$0', label: 'Scaling overhead' },
]

export default function MultiAgentSwarmsPage() {
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
                            Swarm Architecture
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-medium text-foreground tracking-tight mb-6 leading-[1.05]">
                        Multi-Agent Swarms
                    </h1>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                        Deploy 100+ AI agents simultaneously—each with specialized roles, working
                        in parallel on different parts of your codebase. True parallelization of development.
                    </p>
                </div>
            </section>

            {/* Key Message */}
            <section className="py-16 px-6 bg-primary/5 border-b border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-2xl md:text-3xl text-foreground font-light leading-relaxed">
                        Today's AI tools give you <span className="text-primary font-medium">one helper</span>.
                        That's like having a single employee. Codebolt gives you
                        <span className="text-primary font-medium"> an entire team</span>.
                    </p>
                </div>
            </section>

            {/* Swarm Features */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Swarm Capabilities
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Comprehensive tools for organizing, managing, and scaling your AI workforce.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {swarmFeatures.map((feature, idx) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="border border-border p-8 bg-card/30"
                            >
                                <h3 className="text-xl font-medium text-foreground mb-3">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground mb-6">{feature.description}</p>
                                <ul className="space-y-2">
                                    {feature.items.map((item, iidx) => (
                                        <li key={iidx} className="text-sm text-muted-foreground flex items-center gap-2">
                                            <span className="w-1 h-1 bg-primary/60 rounded-full" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Agent Lifecycle */}
            <section className="py-24 px-6 bg-muted/10 border-y border-border">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Agent Lifecycle
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Complete control over agent spawning, states, and termination.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Agent States */}
                        <div>
                            <h3 className="text-xl font-medium text-foreground mb-6">Agent States</h3>
                            <div className="space-y-4">
                                {agentStates.map((state) => (
                                    <div key={state.state} className="flex items-center gap-4 p-4 border border-border bg-background">
                                        <div className={`w-3 h-3 rounded-full ${state.color}`} />
                                        <div>
                                            <span className="font-mono text-sm text-foreground uppercase">{state.state}</span>
                                            <p className="text-xs text-muted-foreground">{state.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lifecycle Actions */}
                        <div>
                            <h3 className="text-xl font-medium text-foreground mb-6">Lifecycle Controls</h3>
                            <div className="space-y-4">
                                <div className="p-6 border border-border bg-background">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Plus className="w-5 h-5 text-emerald-500" />
                                        <span className="font-medium text-foreground">Spawn Requests</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Request new agents with specific roles, requirements, and reasons. Optional approval workflow.
                                    </p>
                                </div>
                                <div className="p-6 border border-border bg-background">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Minus className="w-5 h-5 text-red-500" />
                                        <span className="font-medium text-foreground">Termination Requests</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Request-based agent termination with approval workflow and audit trail.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scaling */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            On-Demand Scaling
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                            Scale your agent workforce up or down based on project needs—instantly.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {scalingBenefits.map((benefit) => (
                            <div key={benefit.label} className="text-center p-8 border border-border bg-card/30">
                                <span className="font-mono text-3xl text-primary block mb-2">{benefit.value}</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider">{benefit.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-border">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-medium text-foreground tracking-tight mb-6">
                        Deploy Your First Swarm
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Go from one AI to a hundred. Scale development capacity without scaling headcount.
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
