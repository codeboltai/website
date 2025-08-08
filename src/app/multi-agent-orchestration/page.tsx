'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'



export default function MultiAgentOrchestrationPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 thread-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
              MULTI-AGENT <span className="text-red-600">ORCHESTRATION</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
              Unleash the power of collaborative AI. Coordinate swarms of specialized agents to build, test, and deploy software faster than ever before.
            </p>
            <div className="flex justify-center space-x-4 pt-4">
                <Button size="lg" className="font-cyber">
                    Launch a Swarm
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Workflow Visualization Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber">A Seamless Workflow</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 font-cyber-alt">
              From task delegation to code integration, the orchestrator handles it all.
            </p>
          </div>
          <div className="relative flex flex-col items-center">
            {/* Replace with a more sophisticated graphic or animation if possible */}
            <div className="font-mono text-sm text-muted-foreground space-y-2 text-center">
                <p>[Project Goal]</p>
                <p className="text-red-600">|</p>
                <p>v</p>
                <p>[Orchestrator Analyzes & Delegates]</p>
                <p className="text-red-600">|</p>
                <p>v</p>
                <div className="flex justify-center gap-4">
                    <p>[Agent A: Frontend]</p>
                    <p>[Agent B: Backend]</p>
                    <p>[Agent C: Tests]</p>
                </div>
                <p className="text-red-600">|</p>
                <p>v</p>
                <p>[Real-Time Collaboration & Code Merge]</p>
                <p className="text-red-600">|</p>
                <p>v</p>
                <p>[Completed Feature]</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}