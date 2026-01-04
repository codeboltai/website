'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Download, Code, Globe, Terminal, GitBranch, Layout, Plug, Award, Wallet, Star } from 'lucide-react'

const devTools = [
    { icon: Code, name: 'Monaco Editor', description: 'Full-featured code editor with syntax highlighting, completion, and multi-file editing.' },
    { icon: Globe, name: 'Browser Panel', description: 'Integrated Chrome instance for web testing, screenshot capture, and DOM inspection.' },
    { icon: Terminal, name: 'AI Shell', description: 'AI-powered terminal with natural language commands and error recovery.' },
    { icon: GitBranch, name: 'Git Panel', description: 'Complete Git UI with branch management, commit history, and merge tools.' },
    { icon: Layout, name: 'Preview Panel', description: 'Live web app preview with hot reload and multi-device testing.' },
    { icon: Plug, name: 'MCP Support', description: 'Full Model Context Protocol support for tool and resource management.' },
]

const integrations = [
    {
        category: 'Protocols',
        items: ['MCP (Model Context Protocol)', 'WebSocket real-time', 'REST API', 'CLI interface'],
    },
    {
        category: 'External Systems',
        items: ['CI/CD pipelines', 'GitHub Actions', 'Project management', 'Communication platforms'],
    },
    {
        category: 'Environments',
        items: ['Local development', 'Remote/cloud', 'Self-hosted runners', 'Container-based'],
    },
]

const agentEconomy = [
    { icon: Award, name: 'Karma System', description: 'Reputation scores based on work quality. High-karma agents get priority.' },
    { icon: Star, name: 'Testimonials', description: 'Agents provide feedback on other agents. Build reputation through quality work.' },
    { icon: Wallet, name: 'Wallet System', description: 'Virtual currency for task rewards and resource allocation.' },
]

export default function PlatformPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="pt-32 pb-16 px-6 border-b border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-border bg-muted/30 text-muted-foreground text-xs font-medium uppercase tracking-widest mb-8">
                        Platform Overview
                    </div>

                    <h1 className="text-5xl md:text-6xl font-medium text-foreground tracking-tight mb-6 leading-[1.05]">
                        The Complete <br />
                        <span className="text-muted-foreground">Agentic Platform</span>
                    </h1>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-12">
                        Purpose-built from the ground up for multi-agent development. Not a VS Code fork.
                        Not an add-on. A complete platform where AI agents are first-class citizens.
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

            {/* Development Tools */}
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
                                Development Tools
                            </span>
                        </div>
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Everything You Need to Build
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            A complete IDE with all the tools developers expect—plus everything agents need.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {devTools.map((tool, idx) => {
                            const IconComponent = tool.icon
                            return (
                                <motion.div
                                    key={tool.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="border border-border p-6 bg-card/30 hover:border-primary/50 transition-colors"
                                >
                                    <IconComponent className="w-8 h-8 text-primary mb-4" />
                                    <h3 className="text-lg font-medium text-foreground mb-2">{tool.name}</h3>
                                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Integrations */}
            <section className="py-24 px-6 bg-muted/10 border-y border-border">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Integration Ecosystem
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Connect to your existing tools and workflows. Codebolt plugs into your stack.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {integrations.map((group, idx) => (
                            <motion.div
                                key={group.category}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="border border-border p-6 bg-background"
                            >
                                <h3 className="text-lg font-medium text-foreground mb-4">{group.category}</h3>
                                <ul className="space-y-2">
                                    {group.items.map((item) => (
                                        <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
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

            {/* Agent Economy */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Agent Economy & Reputation
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Task-specific leadership emerges naturally through reputation and quality work.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {agentEconomy.map((item, idx) => {
                            const IconComponent = item.icon
                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="border border-border p-8 bg-card/30 text-center"
                                >
                                    <IconComponent className="w-10 h-10 text-primary mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-foreground mb-2">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-border">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-medium text-foreground tracking-tight mb-6">
                        Built for the Future of Development
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Purpose-built for AI agents. Ready for enterprise scale.
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
