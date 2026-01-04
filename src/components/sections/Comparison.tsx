'use client'

import { motion } from 'motion/react'
import { Check, X } from 'lucide-react'
import Link from 'next/link'
import { Download } from 'lucide-react'

export default function Comparison() {

  const features = [
    {
      name: 'Complete Agent Observability',
      subtitle: [
        'Agent Debugging',
        'AI Message Request and Response'
      ],
      codebolt: true,
      cursor: false,
      windsurf: false,
      vscode: false,
      kiro: false,
      trae: false,
      lovable: false,
      replit: false,
      codium: false,
      cline: false,
      vibeKanban: false,
      conductor: false,
      geminiCli: false,
      claudeCode: false
    },
    {
      name: 'Multi-Agent Swarm',
      subtitle: [
        'Sub Agent',
        'Parallel Agent Through Task Creation'
      ],
      codebolt: true,
      cursor: false,
      windsurf: false,
      vscode: false,
      kiro: false,
      trae: false,
      lovable: false,
      replit: false,
      codium: false,
      cline: false,
      vibeKanban: true,
      conductor: true,
      geminiCli: false,
      claudeCode: false
    },
    {
      name: 'Custom Agent',
      subtitle: [
        'Prompt Base Custom Agent',
        'Code-base Custom Agent',
        'Extensive API Access'
      ],
      codebolt: true,
      cursor: false,
      windsurf: false,
      vscode: false,
      kiro: false,
      trae: false,
      lovable: false,
      replit: false,
      codium: true,
      cline: true,
      vibeKanban: false,
      conductor: false,
      geminiCli: false,
      claudeCode: false
    },
    {
      name: 'Longer Duration Task Management',
      subtitle: [
        'Task Planner',
        'Distributed Task Management',
        'Task Step hierarchy'
      ],
      codebolt: true,
      cursor: false,
      windsurf: false,
      vscode: false,
      kiro: false,
      trae: false,
      lovable: false,
      replit: false,
      codium: false,
      cline: false,
      vibeKanban: true,
      conductor: true,
      geminiCli: false,
      claudeCode: false
    },
    {
      name: 'Multi Remote Runners',
      subtitle: [
        'Custom Run remotely on any cloud platform',
        'Run swarm locally across system'
      ],
      codebolt: true,
      cursor: false,
      windsurf: false,
      vscode: false,
      kiro: false,
      trae: false,
      lovable: true,
      replit: true,
      codium: false,
      cline: false,
      vibeKanban: false,
      conductor: false,
      geminiCli: false,
      claudeCode: false
    },
    {
      name: 'Multi LLMs',
      subtitle: [
        'Single agent can use multiple LLMs',
        'Multiple agent can use multiple LLMs based upon their needs'
      ],
      codebolt: true,
      cursor: true,
      windsurf: true,
      vscode: false,
      kiro: false,
      trae: false,
      lovable: false,
      replit: false,
      codium: false,
      cline: true,
      vibeKanban: false,
      conductor: false,
      geminiCli: false,
      claudeCode: false
    }
  ];


  const FeatureIcon = ({ supported }: { supported: boolean | string }) => {
    if (supported === true) {
      return <Check className="w-5 h-5 text-emerald-500" />
    } else if (supported === 'partial') {
      return <span className="text-amber-500 text-xs font-bold">⚠️</span>
    } else {
      return <X className="w-5 h-5 text-red-500/70" />
    }
  }

  return (
    <section id="comparison" className="py-24 bg-background dark:bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-border bg-muted/30 text-muted-foreground text-xs font-medium uppercase tracking-widest mb-8">
            Competitive Analysis
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground tracking-tight mb-6">
            Why Choose <span className="text-primary">Codebolt</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            See how Codebolt compares to other AI coding platforms. Our comprehensive feature set gives you the edge you need.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card dark:bg-zinc-900/50 rounded-lg border border-border dark:border-zinc-800 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              {/* Group Header Row */}
              <thead>
                <tr className="bg-muted/50 dark:bg-zinc-800/50 border-b border-border dark:border-zinc-700">
                  <th className="p-4 lg:p-6 text-left min-w-[350px] border-r border-border dark:border-zinc-700">
                    <div className="text-muted-foreground text-sm font-mono uppercase tracking-wider">
                      Feature
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[120px] border-r border-border dark:border-zinc-700">
                    <div className="text-sm lg:text-base font-bold font-mono text-primary">
                      CODEBOLT
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[500px] border-r border-border dark:border-zinc-700" colSpan={5}>
                    <div className="text-sm lg:text-base font-bold font-mono text-foreground">
                      VS CODE FORKS
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">
                      Cursor, Windsurf, VS Code, Kiro, Trae
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[200px] border-r border-border dark:border-zinc-700" colSpan={2}>
                    <div className="text-sm lg:text-base font-bold font-mono text-foreground">
                      BROWSER CODING AGENTS
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">
                      Lovable, Replit
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[200px] border-r border-border dark:border-zinc-700" colSpan={2}>
                    <div className="text-sm lg:text-base font-bold font-mono text-foreground">
                      VS CODE EXTENSIONS
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">
                      Codium, Cline
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[200px] border-r border-border dark:border-zinc-700" colSpan={2}>
                    <div className="text-sm lg:text-base font-bold font-mono text-foreground">
                      MULTI-AGENT TOOLS
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">
                      Vibe-Kanban, Conductor
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[200px]" colSpan={2}>
                    <div className="text-sm lg:text-base font-bold font-mono text-foreground">
                      TERMINAL AGENTS
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">
                      Gemini-CLI, Claude Code
                    </div>
                  </th>
                </tr>
                {/* Sub-column Header Row */}
                <tr className="bg-muted/30 dark:bg-zinc-800/30 border-b border-border dark:border-zinc-700">
                  <th className="p-2 min-w-[350px] border-r border-border dark:border-zinc-700"></th>
                  <th className="p-2 text-center border-r border-border dark:border-zinc-700">
                    <div className="text-xs text-primary font-mono font-semibold">Codebolt</div>
                  </th>
                  <th className="p-2 text-center border-r border-border/50 dark:border-zinc-600">
                    <div className="text-xs text-foreground font-mono">Cursor</div>
                  </th>
                  <th className="p-2 text-center border-r border-border/50 dark:border-zinc-600">
                    <div className="text-xs text-foreground font-mono">Windsurf</div>
                  </th>
                  <th className="p-2 text-center border-r border-border/50 dark:border-zinc-600">
                    <div className="text-xs text-foreground font-mono">VS Code</div>
                  </th>
                  <th className="p-2 text-center border-r border-border/50 dark:border-zinc-600">
                    <div className="text-xs text-foreground font-mono">Kiro</div>
                  </th>
                  <th className="p-2 text-center border-r border-border dark:border-zinc-700">
                    <div className="text-xs text-foreground font-mono">Trae</div>
                  </th>
                  <th className="p-2 text-center border-r border-border/50 dark:border-zinc-600">
                    <div className="text-xs text-foreground font-mono">Lovable</div>
                  </th>
                  <th className="p-2 text-center border-r border-border dark:border-zinc-700">
                    <div className="text-xs text-foreground font-mono">Replit</div>
                  </th>
                  <th className="p-2 text-center border-r border-border/50 dark:border-zinc-600">
                    <div className="text-xs text-foreground font-mono">Codium</div>
                  </th>
                  <th className="p-2 text-center border-r border-border dark:border-zinc-700">
                    <div className="text-xs text-foreground font-mono">Cline</div>
                  </th>
                  <th className="p-2 text-center border-r border-border/50 dark:border-zinc-600">
                    <div className="text-xs text-foreground font-mono">Vibe-K</div>
                  </th>
                  <th className="p-2 text-center border-r border-border dark:border-zinc-700">
                    <div className="text-xs text-foreground font-mono">Conductor</div>
                  </th>
                  <th className="p-2 text-center border-r border-border/50 dark:border-zinc-600">
                    <div className="text-xs text-foreground font-mono">Gemini-CLI</div>
                  </th>
                  <th className="p-2 text-center">
                    <div className="text-xs text-foreground font-mono">Claude Code</div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className={`border-b border-border/50 dark:border-zinc-800/50 hover:bg-muted/30 dark:hover:bg-zinc-800/30 transition-colors duration-200 ${index % 2 === 0 ? 'bg-background dark:bg-zinc-900/50' : 'bg-muted/10 dark:bg-zinc-900/30'
                      }`}
                  >
                    <td className="p-4 lg:p-6 text-left border-r border-border dark:border-zinc-700">
                      <div className="text-foreground font-medium text-sm lg:text-base mb-2">
                        {feature.name}
                      </div>
                      {feature.subtitle && (
                        <div className="text-xs text-muted-foreground space-y-1">
                          {feature.subtitle.map((sub, idx) => (
                            <div key={idx} className="flex items-center">
                              <span className="w-1 h-1 bg-muted-foreground/50 rounded-full mr-2 flex-shrink-0"></span>
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    {/* CODEBOLT */}
                    <td className="p-3 lg:p-4 text-center border-r border-border dark:border-zinc-700">
                      <FeatureIcon supported={feature.codebolt} />
                    </td>
                    {/* VS CODE FORKS */}
                    <td className="p-3 lg:p-4 text-center border-r border-border/50 dark:border-zinc-600">
                      <FeatureIcon supported={feature.cursor} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-border/50 dark:border-zinc-600">
                      <FeatureIcon supported={feature.windsurf} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-border/50 dark:border-zinc-600">
                      <FeatureIcon supported={feature.vscode} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-border/50 dark:border-zinc-600">
                      <FeatureIcon supported={feature.kiro} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-border dark:border-zinc-700">
                      <FeatureIcon supported={feature.trae} />
                    </td>
                    {/* BROWSER CODING AGENTS */}
                    <td className="p-3 lg:p-4 text-center border-r border-border/50 dark:border-zinc-600">
                      <FeatureIcon supported={feature.lovable} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-border dark:border-zinc-700">
                      <FeatureIcon supported={feature.replit} />
                    </td>
                    {/* VS CODE EXTENSIONS */}
                    <td className="p-3 lg:p-4 text-center border-r border-border/50 dark:border-zinc-600">
                      <FeatureIcon supported={feature.codium} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-border dark:border-zinc-700">
                      <FeatureIcon supported={feature.cline} />
                    </td>
                    {/* MULTI-AGENT TOOLS */}
                    <td className="p-3 lg:p-4 text-center border-r border-border/50 dark:border-zinc-600">
                      <FeatureIcon supported={feature.vibeKanban} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-border dark:border-zinc-700">
                      <FeatureIcon supported={feature.conductor} />
                    </td>
                    {/* TERMINAL AGENTS */}
                    <td className="p-3 lg:p-4 text-center border-r border-border/50 dark:border-zinc-600">
                      <FeatureIcon supported={feature.geminiCli} />
                    </td>
                    <td className="p-3 lg:p-4 text-center">
                      <FeatureIcon supported={feature.claudeCode} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Ready to experience the most advanced AI coding platform?
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase rounded-full font-bold hover:bg-cyan-400 transition-colors"
          >
            Download Codebolt
            <Download className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}