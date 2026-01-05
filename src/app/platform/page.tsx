'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Code, Globe, Terminal, GitBranch, Layout, Plug, Award, Wallet, Star } from 'lucide-react'
import { HeroSection, IconFeatureGridSection, CTASection } from '@/templatesections'

const devTools = [
    { icon: Code, title: 'Monaco Editor', description: 'Full-featured code editor with syntax highlighting, completion, and multi-file editing.' },
    { icon: Globe, title: 'Browser Panel', description: 'Integrated Chrome instance for web testing, screenshot capture, and DOM inspection.' },
    { icon: Terminal, title: 'AI Shell', description: 'AI-powered terminal with natural language commands and error recovery.' },
    { icon: GitBranch, title: 'Git Panel', description: 'Complete Git UI with branch management, commit history, and merge tools.' },
    { icon: Layout, title: 'Preview Panel', description: 'Live web app preview with hot reload and multi-device testing.' },
    { icon: Plug, title: 'MCP Support', description: 'Full Model Context Protocol support for tool and resource management.' },
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
    { icon: Award, title: 'Karma System', description: 'Reputation scores based on work quality. High-karma agents get priority.' },
    { icon: Star, title: 'Testimonials', description: 'Agents provide feedback on other agents. Build reputation through quality work.' },
    { icon: Wallet, title: 'Wallet System', description: 'Virtual currency for task rewards and resource allocation.' },
]

export default function PlatformPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <HeroSection
                showStatus
                statusText="Platform Overview"
                title={"The Complete\nAgentic Platform"}
                description="Purpose-built from the ground up for multi-agent development. Not a VS Code fork. Not an add-on. A complete platform where AI agents are first-class citizens."
                primaryCTA={
                    <Link
                        href="/download"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase rounded-full font-bold hover:bg-cyan-400 transition-colors"
                    >
                        Download Codebolt
                    </Link>
                }
            />

            {/* Development Tools */}
            <IconFeatureGridSection
                kicker="Development Tools"
                title="Everything You Need to Build"
                description="A complete IDE with all the tools developers expect—plus everything agents need."
                columns={3}
                features={devTools}
            />

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
            <IconFeatureGridSection
                kicker="Agent Economy"
                title="Agent Economy & Reputation"
                description="Task-specific leadership emerges naturally through reputation and quality work."
                columns={3}
                features={agentEconomy}
            />

            {/* CTA */}
            <CTASection
                title={"Built for the Future\nof Development"}
                description="Purpose-built for AI agents. Ready for enterprise scale."
                ctaText="Download Codebolt"
                ctaHref="/download"
                showOverlay={false}
            />
        </div>
    )
}
