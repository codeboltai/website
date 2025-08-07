'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

export default function Comparison() {

  const features = [
    {
      name: 'Complete Agent Observability',
      subtitle: [
        'Agent Debuging',
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
      return <Check className="w-5 h-5 text-green-400" />
    } else if (supported === 'partial') {
      return <span className="text-yellow-400 text-xs font-bold">⚠️</span>
    } else {
      return <X className="w-5 h-5 text-red-400" />
    }
  }

  return (
    <section id="comparison" className="py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          title="WHY CHOOSE •"
          highlight="CODEBOLT"
          subtitle="See how CodeBolt compares to other AI coding platforms. Our comprehensive feature set gives you the edge you need."
        />

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              {/* Group Header Row */}
              <thead>
                <tr className="bg-gray-800/50 border-b border-gray-700">
                  <th className="p-4 lg:p-6 text-left min-w-[350px] border-r border-gray-700">
                    <div className="text-gray-400 text-sm font-cyber-alt uppercase tracking-wider">
                      Feature
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[120px] border-r border-gray-700">
                    <div className="text-sm lg:text-base font-bold font-cyber text-green-400">
                      CODEBOLT
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[500px] border-r border-gray-700" colSpan={5}>
                    <div className="text-sm lg:text-base font-bold font-cyber text-gray-300">
                      VS CODE FORKS
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-cyber-alt">
                      Cursor, Windsurf, VS Code, Kiro, Trae
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[200px] border-r border-gray-700" colSpan={2}>
                    <div className="text-sm lg:text-base font-bold font-cyber text-gray-300">
                      BROWSER CODING AGENTS
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-cyber-alt">
                      Lovable, Replit
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[200px] border-r border-gray-700" colSpan={2}>
                    <div className="text-sm lg:text-base font-bold font-cyber text-gray-300">
                      VS CODE EXTENSIONS
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-cyber-alt">
                      Codium, Cline
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[200px] border-r border-gray-700" colSpan={2}>
                    <div className="text-sm lg:text-base font-bold font-cyber text-gray-300">
                      MULTI-AGENT TOOLS
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-cyber-alt">
                      Vibe-Kanban, Conductor
                    </div>
                  </th>
                  <th className="p-3 lg:p-4 text-center min-w-[200px]" colSpan={2}>
                    <div className="text-sm lg:text-base font-bold font-cyber text-gray-300">
                      TERMINAL AGENTS
                    </div>
                    <div className="text-xs text-gray-400 mt-1 font-cyber-alt">
                      Gemini-CLI, Claude Code
                    </div>
                  </th>
                </tr>
                {/* Sub-column Header Row */}
                <tr className="bg-gray-800/30 border-b border-gray-700">
                  <th className="p-2 min-w-[350px] border-r border-gray-700"></th>
                  <th className="p-2 text-center border-r border-gray-700">
                    <div className="text-xs text-green-400 font-cyber font-semibold">Codebolt</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-600">
                    <div className="text-xs text-gray-300 font-cyber">Cursor</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-600">
                    <div className="text-xs text-gray-300 font-cyber">Windsurf</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-600">
                    <div className="text-xs text-gray-300 font-cyber">VS Code</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-600">
                    <div className="text-xs text-gray-300 font-cyber">Kiro</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-700">
                    <div className="text-xs text-gray-300 font-cyber">Trae</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-600">
                    <div className="text-xs text-gray-300 font-cyber">Lovable</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-700">
                    <div className="text-xs text-gray-300 font-cyber">Replit</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-600">
                    <div className="text-xs text-gray-300 font-cyber">Codium</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-700">
                    <div className="text-xs text-gray-300 font-cyber">Cline</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-600">
                    <div className="text-xs text-gray-300 font-cyber">Vibe-K</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-700">
                    <div className="text-xs text-gray-300 font-cyber">Conductor</div>
                  </th>
                  <th className="p-2 text-center border-r border-gray-600">
                    <div className="text-xs text-gray-300 font-cyber">Gemini-CLI</div>
                  </th>
                  <th className="p-2 text-center">
                    <div className="text-xs text-gray-300 font-cyber">Claude Code</div>
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
                    className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-900/30'
                    }`}
                  >
                    <td className="p-4 lg:p-6 text-left border-r border-gray-700">
                      <div className="text-gray-200 font-medium font-cyber-alt text-sm lg:text-base mb-2">
                        {feature.name}
                      </div>
                      {feature.subtitle && (
                        <div className="text-xs text-gray-400 font-cyber-alt space-y-1">
                          {feature.subtitle.map((sub, idx) => (
                            <div key={idx} className="flex items-center">
                              <span className="w-1 h-1 bg-gray-500 rounded-full mr-2 flex-shrink-0"></span>
                              <span>{sub}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    {/* CODEBOLT */}
                    <td className="p-3 lg:p-4 text-center border-r border-gray-700">
                      <FeatureIcon supported={feature.codebolt} />
                    </td>
                    {/* VS CODE FORKS */}
                    <td className="p-3 lg:p-4 text-center border-r border-gray-600">
                      <FeatureIcon supported={feature.cursor} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-gray-600">
                      <FeatureIcon supported={feature.windsurf} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-gray-600">
                      <FeatureIcon supported={feature.vscode} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-gray-600">
                      <FeatureIcon supported={feature.kiro} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-gray-700">
                      <FeatureIcon supported={feature.trae} />
                    </td>
                    {/* BROWSER CODING AGENTS */}
                    <td className="p-3 lg:p-4 text-center border-r border-gray-600">
                      <FeatureIcon supported={feature.lovable} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-gray-700">
                      <FeatureIcon supported={feature.replit} />
                    </td>
                    {/* VS CODE EXTENSIONS */}
                    <td className="p-3 lg:p-4 text-center border-r border-gray-600">
                      <FeatureIcon supported={feature.codium} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-gray-700">
                      <FeatureIcon supported={feature.cline} />
                    </td>
                    {/* MULTI-AGENT TOOLS */}
                    <td className="p-3 lg:p-4 text-center border-r border-gray-600">
                      <FeatureIcon supported={feature.vibeKanban} />
                    </td>
                    <td className="p-3 lg:p-4 text-center border-r border-gray-700">
                      <FeatureIcon supported={feature.conductor} />
                    </td>
                    {/* TERMINAL AGENTS */}
                    <td className="p-3 lg:p-4 text-center border-r border-gray-600">
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
          <p className="text-gray-400 font-cyber-alt mb-6">
            Ready to experience the most advanced AI coding platform?
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-cyber font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/25 hover:scale-105">
            Get Started with CodeBolt
          </button>
        </motion.div>
      </div>
    </section>
  )
}