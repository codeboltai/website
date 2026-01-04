'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, Eye, FileText, GitPullRequest, Activity, Bug, Clock } from 'lucide-react'

const visibilityFeatures = [
    {
        icon: Activity,
        title: 'Real-Time Monitoring',
        description: 'Watch your agents work in real-time. See what they're doing, what files they're touching, what decisions they're making—as it happens.',
    details: ['Live agent status indicators', 'Log streaming', 'Performance metrics', 'Current task visibility'],
    },
    {
        icon: Bug,
        title: 'Debug Panel',
        description: 'Complete request/response visibility for every tool call. Inspect payloads, trace errors, and understand agent reasoning.',
        details: ['All API/tool calls logged', 'Full request/response capture', 'Timing data', 'Error stack traces'],
    },
    {
        icon: FileText,
        title: 'Audit Trails',
        description: 'Every action, every decision, every change—logged, searchable, and auditable. Complete history for compliance.',
        details: ['Persistent execution logs', 'Searchable history', 'Conversation export', 'Replay support'],
    },
    {
        icon: GitPullRequest,
        title: 'Review & Merge',
        description: 'All agent work goes through review—just like human pull requests. Approve, reject, or request changes.',
        details: ['PR-like workflow', 'Multi-reviewer support', 'Feedback threads', 'Merge controls'],
    },
]

const auditData = [
    { field: 'Request Logging', status: '✓', description: 'All API/tool calls recorded' },
    { field: 'Response Logging', status: '✓', description: 'Full responses captured' },
    { field: 'Timing Data', status: '✓', description: 'Execution duration tracking' },
    { field: 'Error States', status: '✓', description: 'Error capture with stack traces' },
    { field: 'Message History', status: '✓', description: 'Complete conversation threads' },
    { field: 'File Changes', status: '✓', description: 'Line-by-line diff tracking' },
]

const interventionCapabilities = [
    {
        action: 'Pause Agent',
        description: 'Freeze agent execution at any point to inspect state or take over.',
    },
    {
        action: 'Take Over',
        description: 'Jump in and manually complete work, then hand back to agent.',
    },
    {
        action: 'Redirect',
        description: 'Change agent direction mid-task with new instructions.',
    },
    {
        action: 'Roll Back',
        description: 'Undo agent changes and restore previous state.',
    },
]

export default function ObservabilityPage() {
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
                            Visibility Layer
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-medium text-foreground tracking-tight mb-6 leading-[1.05]">
                        Full Observability
                    </h1>

                    <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                        See everything. Control everything. Complete transparency into what agents are
                        doing, thinking, and deciding—with human oversight at every level.
                    </p>
                </div>
            </section>

            {/* No Black Boxes */}
            <section className="py-16 px-6 bg-primary/5 border-b border-border">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-medium text-foreground mb-6">No Black Boxes</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        When autonomous AI works on your code, you need to know what it did.
                        Codebolt provides <span className="text-foreground">complete visibility</span> into every action.
                        You can <span className="text-foreground">audit what you can see</span>—and you can see everything.
                    </p>
                </div>
            </section>

            {/* Visibility Features */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Visibility & Debugging
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Comprehensive tools for monitoring, debugging, and auditing agent behavior.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {visibilityFeatures.map((feature, idx) => {
                            const IconComponent = feature.icon
                            return (
                                <motion.div
                                    key={feature.title}
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
                                            <h3 className="text-xl font-medium text-foreground mb-2">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2">
                                        {feature.details.map((detail, didx) => (
                                            <li key={didx} className="text-sm text-muted-foreground flex items-center gap-2">
                                                <span className="w-1 h-1 bg-primary/60 rounded-full" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Audit Matrix */}
            <section className="py-24 px-6 bg-muted/10 border-y border-border">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Audit Capabilities
                        </h2>
                        <p className="text-lg text-muted-foreground font-light">
                            Everything logged. Everything searchable. Enterprise-ready accountability.
                        </p>
                    </motion.div>

                    <div className="border border-border overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="text-left p-4 text-sm font-medium text-foreground">Capability</th>
                                    <th className="text-center p-4 text-sm font-medium text-foreground">Status</th>
                                    <th className="text-left p-4 text-sm font-medium text-foreground">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditData.map((row, idx) => (
                                    <tr key={row.field} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                                        <td className="p-4 text-sm text-foreground font-medium">{row.field}</td>
                                        <td className="p-4 text-center text-emerald-500 font-mono">{row.status}</td>
                                        <td className="p-4 text-sm text-muted-foreground">{row.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Intervention */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-medium text-foreground tracking-tight mb-4">
                            Intervention & Takeover
                        </h2>
                        <p className="text-lg text-muted-foreground font-light max-w-2xl">
                            Jump in and take over from any agent at any time. You're always in control.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {interventionCapabilities.map((cap, idx) => (
                            <motion.div
                                key={cap.action}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="border border-border p-6 bg-card/30 text-center"
                            >
                                <h3 className="text-lg font-medium text-foreground mb-2">{cap.action}</h3>
                                <p className="text-sm text-muted-foreground">{cap.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 border-t border-border">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-medium text-foreground tracking-tight mb-6">
                        Trust, But Verify—Always
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Complete transparency. Full control. Enterprise-ready accountability.
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
