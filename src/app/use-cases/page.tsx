'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Download, Moon, Users, Code, TestTube, FileText, Clock } from 'lucide-react'

const workflows = [
    {
        icon: Moon,
        title: 'Overnight Development',
        description: 'Assign tasks before you leave. Wake up to completed features, tested code, and pull requests ready for review.',
        timeline: [
            { time: '5:30 PM', action: 'Define jobs, set priorities, start swarm' },
            { time: 'Overnight', action: 'Agents work: features, tests, docs, bug fixes' },
            { time: '9:00 AM', action: 'Review PRs, merge approved, set new tasks' },
        ],
        stat: { value: '3x', label: 'More development hours' },
    },
    {
        icon: Users,
        title: 'Parallel Feature Development',
        description: 'Multiple agents work on different features simultaneously. True parallelization without conflicts.',
        benefits: [
            'Agent 1: Feature A with tests',
            'Agent 2: Feature B with tests',
            'Agent 3: Feature C with tests',
            'Review all in parallel',
        ],
        stat: { value: '5-10x', label: 'Faster delivery' },
    },
    {
        icon: TestTube,
        title: 'Test-Driven Development',
        description: 'One agent writes comprehensive tests. Another implements to pass tests. Cycle until all green.',
        steps: [
            'Specify feature requirements',
            'Agent 1 writes comprehensive tests',
            'Agent 2 implements to pass tests',
            'Iterate until all tests pass',
        ],
        stat: { value: '100%', label: 'Test coverage' },
    },
    {
        icon: FileText,
        title: 'Documentation Generation',
        description: 'Agents analyze code and generate READMEs, API docs, inline comments, and update existing documentation.',
        outputs: [
            'README files',
            'API documentation',
            'Inline comments',
            'Updated existing docs',
        ],
        stat: { value: 'Auto', label: 'Documentation' },
    },
    {
        icon: Clock,
        title: 'Long-Horizon Features',
        description: 'Multi-week features with persistent context. Agents remember everything from week to week.',
        phases: [
            'Week 1: Planning, specs, job breakdown',
            'Week 2-3: Implementation with daily progress',
            'Week 4: Integration, polish, review',
        ],
        stat: { value: '0', label: 'Context loss' },
    },
    {
        icon: Code,
        title: 'Legacy Modernization',
        description: 'Deploy swarms to refactor, update, and modernize large codebases. What takes months becomes weeks.',
        capabilities: [
            'Parallel refactoring',
            'Consistent patterns',
            'Automated testing',
            'Documentation updates',
        ],
        stat: { value: '10x', label: 'Faster modernization' },
    },
]

const personas = [
    {
        title: 'Startup Teams',
        pain: 'Small team needs to ship like a large team',
        solution: '3-person team delivers like 30-person team',
        highlight: 'Faster time-to-market than funded competitors',
    },
    {
        title: 'Enterprise Teams',
        pain: "Can't scale capacity without headcount",
        solution: '24/7 development with full audit trails',
        highlight: 'Self-hosting for complete data control',
    },
    {
        title: 'Solo Developers',
        pain: 'Limited by personal bandwidth',
        solution: 'Multiply productivity 10x',
        highlight: 'Take on larger, more ambitious projects',
    },
]

export default function UseCasesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 border-b border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-border bg-muted/30 text-muted-foreground text-xs font-medium uppercase tracking-widest mb-8">
                        Workflows
                    </div>

                    <h1 className="text-5xl md:text-6xl font-medium text-foreground tracking-tight mb-6 leading-[1.05]">
                        How Teams Use <br />
                        <span className="text-muted-foreground">Codebolt</span>
                    </h1>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                        Real workflows that transform how development gets done. From overnight automation
                        to long-horizon features.
                    </p>
                </div>
            </section>

            {/* Workflows */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                                Workflow Examples
                            </span>
                        </div>
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Development Workflows
                        </h2>
                    </motion.div>

                    <div className="space-y-8">
                        {workflows.map((workflow, idx) => {
                            const IconComponent = workflow.icon
                            return (
                                <motion.div
                                    key={workflow.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="border border-border p-8 bg-card/30"
                                >
                                    <div className="grid md:grid-cols-12 gap-8">
                                        <div className="md:col-span-8">
                                            <div className="flex items-center gap-4 mb-4">
                                                <IconComponent className="w-8 h-8 text-primary" />
                                                <h3 className="text-xl font-medium text-foreground">{workflow.title}</h3>
                                            </div>
                                            <p className="text-muted-foreground mb-6">{workflow.description}</p>

                                            {workflow.timeline && (
                                                <div className="space-y-3">
                                                    {workflow.timeline.map((step) => (
                                                        <div key={step.time} className="flex gap-4 text-sm">
                                                            <span className="font-mono text-primary w-20 shrink-0">{step.time}</span>
                                                            <span className="text-muted-foreground">{step.action}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {(workflow.benefits || workflow.steps || workflow.outputs || workflow.phases || workflow.capabilities) && (
                                                <ul className="space-y-2 mt-4">
                                                    {(workflow.benefits || workflow.steps || workflow.outputs || workflow.phases || workflow.capabilities)?.map((item) => (
                                                        <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                                                            <span className="w-1 h-1 bg-primary/60 rounded-full" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div className="md:col-span-4 flex items-center justify-center">
                                            <div className="text-center p-8 border border-border bg-background">
                                                <span className="font-mono text-4xl text-primary block mb-2">{workflow.stat.value}</span>
                                                <span className="text-xs text-muted-foreground uppercase tracking-wider">{workflow.stat.label}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Personas */}
            <section className="py-24 px-6 bg-muted/10 border-y border-border">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Built for Every Team Size
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {personas.map((persona, idx) => (
                            <motion.div
                                key={persona.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="border border-border p-8 bg-background"
                            >
                                <h3 className="text-xl font-medium text-foreground mb-4">{persona.title}</h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground block mb-1">Pain Point:</span>
                                        <span className="text-foreground">{persona.pain}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground block mb-1">Solution:</span>
                                        <span className="text-primary">{persona.solution}</span>
                                    </div>
                                    <div className="pt-4 border-t border-border">
                                        <span className="text-xs text-muted-foreground">{persona.highlight}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-medium text-foreground tracking-tight mb-6">
                        Transform Your Workflow
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Start building with multi-agent swarms. See the difference 24/7 development makes.
                    </p>
                    <Link
                        href="/download"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase rounded-full font-bold hover:bg-cyan-400 transition-colors"
                    >
                        Download Codebolt
                        <Download className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
