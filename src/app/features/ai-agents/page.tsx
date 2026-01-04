'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, Code, Workflow, Copy, Globe, Bot, Cpu } from 'lucide-react'

const agentTypes = [
    {
        icon: Code,
        name: 'Code Agents',
        description: 'Full programmatic control with the Codebolt SDK. Write custom agent logic in JavaScript/TypeScript with complete access to all IDE functions.',
        features: [
            'Full SDK access to all IDE functions',
            'Custom agent logic in JS/TypeScript',
            'Hook system for event-driven behavior',
            'Multi-LLM support within single agent',
        ],
        code: `import { codebolt } from 'codebolt-sdk'

async function run() {
  const files = await codebolt.fs.listFiles('src/')
  for (const file of files) {
    const issues = await analyzeCode(file)
    if (issues.length > 0) {
      await codebolt.jobs.create({
        type: 'bug',
        name: \`Issue in \${file}\`,
        description: issues.join('\\n')
      })
    }
  }
}`,
    },
    {
        icon: Workflow,
        name: 'Flow Agents',
        description: 'Visual drag-and-drop agent creation—no coding required. Design complex workflows by connecting nodes and configuring parameters.',
        features: [
            'Drag-and-drop interface',
            'Visual node connections for control flow',
            'Configure without code',
            'Export to code for advanced customization',
        ],
        visual: true,
    },
    {
        icon: Copy,
        name: 'Remix Agents',
        description: 'Start from proven templates and customize. Clone existing agents, modify for your needs, and share successful configurations.',
        features: [
            'Clone from template library',
            'Customize for your workflows',
            'Share across your organization',
            'Version control and rollback',
        ],
    },
    {
        icon: Globe,
        name: 'External Agents',
        description: 'Connect agents from external systems via WebSocket or HTTP. Integrate third-party tools and services into your swarm.',
        features: [
            'WebSocket/HTTP endpoints',
            'Join existing swarms',
            'Participate in deliberations',
            'Access pheromone signaling',
        ],
    },
]

const capabilities = [
    {
        title: 'Agent Configuration',
        description: 'Define agent behavior through YAML configuration files with capabilities, hooks, and permissions.',
        example: `# codeboltagent.yaml
name: "SecurityReviewAgent"
description: "Reviews code for security issues"
capabilities:
  - security_analysis
  - code_review
hooks:
  - event: "on_file_change"
    action: "scan_security"`,
    },
    {
        title: 'Agent Hooks',
        description: 'Trigger agent actions based on events—file changes, job assignments, or custom triggers.',
    },
    {
        title: 'Multi-Model Support',
        description: 'Use different AI models for different agents. GPT-4, Claude, Gemini, local models—all in the same swarm.',
    },
    {
        title: 'Agent Templates',
        description: 'Pre-built templates for common roles: testing agents, documentation agents, security auditors, and more.',
    },
]

export default function AIAgentsPage() {
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
                            Agent Creation
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-medium text-foreground tracking-tight mb-6 leading-[1.05]">
                        Custom AI Agents
                    </h1>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                        Build agents as unique as your team. Create via code or visual builder,
                        customize for your workflows, and deploy specialized AI for every task.
                    </p>
                </div>
            </section>

            {/* Agent Types */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Four Ways to Create Agents
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Whether you prefer code, visual design, templates, or external integrations—Codebolt
                            supports your preferred workflow.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {agentTypes.map((type, idx) => {
                            const IconComponent = type.icon
                            return (
                                <motion.div
                                    key={type.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="border border-border dark:border-zinc-800 p-8 bg-card/30"
                                >
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 border border-border flex items-center justify-center">
                                            <IconComponent className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium text-foreground mb-2">{type.name}</h3>
                                            <p className="text-sm text-muted-foreground font-light">{type.description}</p>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-6">
                                        {type.features.map((feature, fidx) => (
                                            <li key={fidx} className="text-sm text-muted-foreground flex items-center gap-2">
                                                <span className="w-1 h-1 bg-primary/60 rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {type.code && (
                                        <div className="bg-zinc-900 p-4 overflow-x-auto">
                                            <pre className="text-xs text-zinc-300 font-mono">{type.code}</pre>
                                        </div>
                                    )}

                                    {type.visual && (
                                        <div className="border border-dashed border-border p-8 text-center bg-muted/20">
                                            <Workflow className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                            <p className="text-sm text-muted-foreground">
                                                Visual canvas for drag-and-drop agent workflow design
                                            </p>
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Capabilities */}
            <section className="py-24 px-6 bg-muted/10 border-y border-border">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Agent Capabilities
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Configure, customize, and control every aspect of your agents.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {capabilities.map((cap, idx) => (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="border border-border p-6 bg-background"
                            >
                                <h3 className="text-lg font-medium text-foreground mb-3">{cap.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{cap.description}</p>
                                {cap.example && (
                                    <div className="bg-zinc-900 p-3 overflow-x-auto">
                                        <pre className="text-xs text-zinc-400 font-mono">{cap.example}</pre>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-medium text-foreground tracking-tight mb-6">
                        Build Your AI Workforce
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Create specialized agents for your unique workflows. No AI expertise required.
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
