'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Download, ArrowRight } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative bg-background dark:bg-[#050505] text-foreground min-h-screen border-b border-border dark:border-neutral-900 font-sans antialiased overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:40px_40px] opacity-0 dark:opacity-20 pointer-events-none" />

            <div className="pt-32 pb-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-12 gap-12 items-end mb-20">
                        {/* Left Column - Headline */}
                        <div className="md:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                    </div>
                                    <span className="text-[10px] font-mono text-muted-foreground dark:text-zinc-500 uppercase tracking-[0.15em]">
                                        Agentic Development Platform
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-8xl font-medium tracking-tighter text-foreground dark:text-white leading-[0.9]">
                                    <span className="block">Deploy AI Swarms.</span>
                                    <span className="block text-muted-foreground dark:text-neutral-500">Build 24/7.</span>
                                </h1>
                            </motion.div>
                        </div>

                        {/* Right Column - Description & CTA */}
                        <div className="md:col-span-4 pb-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <p className="text-lg text-muted-foreground dark:text-neutral-400 font-light leading-relaxed mb-8">
                                    The world's first IDE for multi-agent development. Orchestrate hundreds of AI agents
                                    working in parallel—while you sleep, while you strategize, while you scale.
                                </p>

                                <div className="flex flex-col gap-4">
                                    <Link
                                        href="/download"
                                        className="px-8 py-4 bg-primary text-primary-foreground text-[11px] font-sans uppercase rounded-full font-bold hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                                    >
                                        Download Codebolt
                                        <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" strokeWidth={2.5} />
                                    </Link>
                                    <Link
                                        href="/features"
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 group"
                                    >
                                        Explore Features
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Stats Strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-border dark:border-zinc-800"
                    >
                        <div className="p-6 border-r border-b md:border-b-0 border-border dark:border-zinc-800">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500 block mb-2">
                                Parallel Agents
                            </span>
                            <span className="font-mono text-2xl text-foreground dark:text-white">100+</span>
                        </div>
                        <div className="p-6 border-b md:border-b-0 md:border-r border-border dark:border-zinc-800">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500 block mb-2">
                                Operation Mode
                            </span>
                            <span className="font-mono text-2xl text-foreground dark:text-white">24/7</span>
                        </div>
                        <div className="p-6 border-r border-border dark:border-zinc-800">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500 block mb-2">
                                Coordination
                            </span>
                            <span className="font-mono text-2xl text-foreground dark:text-white">Stigmergy</span>
                        </div>
                        <div className="p-6">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground dark:text-zinc-500 block mb-2">
                                Visibility
                            </span>
                            <span className="font-mono text-2xl text-foreground dark:text-white">Full</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
