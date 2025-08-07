'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, Palette, Wrench, BookOpenCheck, Component, GitBranch, ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'

const features = [
  {
    icon: BrainCircuit,
    title: 'Skill Specialization',
    description: 'Train agents on specific libraries, frameworks like React or Django, or programming languages. They become true experts in their domain, providing more accurate and context-aware code.',
  },
  {
    icon: Palette,
    title: 'Personality & Coding Style',
    description: "Define your agent's personality and coding style. Whether you prefer verbose comments or concise code, your agent will adapt to match your team's conventions.",
  },
  {
    icon: Wrench,
    title: 'Custom Tooling',
    description: 'Equip your agents with custom tools and scripts. Allow them to interact with your specific APIs, databases, or internal services to automate complex workflows.',
  },
  {
    icon: BookOpenCheck,
    title: 'Knowledge Base Integration',
    description: 'Connect your agent to your private documentation, codebases, or wikis. It will learn from your existing knowledge to provide highly relevant and context-aware assistance.',
  },
  {
    icon: Component,
    title: 'Visual Builder',
    description: 'Utilize a user-friendly interface to assemble, configure, and test your agents. No complex setup or steep learning curve required to start building.',
  },
  {
    icon: GitBranch,
    title: 'Version Control & Sharing',
    description: 'Your agents are version-controlled. Share, reuse, and collaborate on agent development with your team, ensuring consistency and quality.',
  },
]

export default function CustomCodingAgentsPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-6 md:py-12 thread-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
              CUSTOM CODING <span className="text-red-600">AGENTS</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
            {/* Write, customize, and automate with code-based agents */}
            A Codebolt Agent is a specialized AI agent designed to perform coding tasks. It can write code, debug, and optimize code, and can be trained to perform a wide range of coding tasks.
            </p>
            <div className="flex justify-center space-x-4 pt-4">
                <a
                  href="https://docs.codebolt.ai/docs/developer/agents/agentarchitecture/createagent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="font-cyber">
                    Build Your First Agent
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber">How does it work?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 font-cyber-alt">
            Codebolt Agents are built using the Codebolt API. They are trained on a wide range of coding tasks and can be used to perform a wide range of coding tasks.
            </p>
          </div>
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* First Row */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <motion.div 
                className="text-center p-6 bg-card rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                  <div className="text-5xl font-bold text-red-600 font-cyber-heavy">1</div>
                  <h3 className="text-xl font-semibold my-2 font-cyber">User Request</h3>
                  <p className="text-muted-foreground font-cyber-alt">User provides coding requirements and context.</p>
              </motion.div>
              <motion.div 
                className="text-2xl text-muted-foreground font-sans"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                &rarr;
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-card rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                  <div className="text-5xl font-bold text-red-600 font-cyber-heavy">2</div>
                  <h3 className="text-xl font-semibold my-2 font-cyber">Agent Understands Intent</h3>
                  <p className="text-muted-foreground font-cyber-alt">AI analyzes and comprehends the request.</p>
              </motion.div>
              <motion.div 
                className="text-2xl text-muted-foreground font-sans"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                &rarr;
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-card rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                  <div className="text-5xl font-bold text-red-600 font-cyber-heavy">3</div>
                  <h3 className="text-xl font-semibold my-2 font-cyber">Plans Tasks</h3>
                  <p className="text-muted-foreground font-cyber-alt">Breaks down work into actionable steps.</p>
              </motion.div>
            </div>
            
            {/* Flow Down Arrow */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-3xl text-muted-foreground font-sans rotate-90">&rarr;</div>
            </motion.div>
            
            {/* Second Row */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <motion.div 
                className="text-center p-6 bg-card rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                  <div className="text-5xl font-bold text-red-600 font-cyber-heavy">4</div>
                  <h3 className="text-xl font-semibold my-2 font-cyber">Uses Tools</h3>
                  <p className="text-muted-foreground font-cyber-alt">Leverages available development tools.</p>
              </motion.div>
              <motion.div 
                className="text-2xl text-muted-foreground font-sans"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                &rarr;
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-card rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                  <div className="text-5xl font-bold text-red-600 font-cyber-heavy">5</div>
                  <h3 className="text-xl font-semibold my-2 font-cyber">Modifies Code</h3>
                  <p className="text-muted-foreground font-cyber-alt">Implements changes to the codebase.</p>
              </motion.div>
              <motion.div 
                className="text-2xl text-muted-foreground font-sans"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                &rarr;
              </motion.div>
              <motion.div 
                className="text-center p-6 bg-card rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
              >
                  <div className="text-5xl font-bold text-red-600 font-cyber-heavy">6</div>
                  <h3 className="text-xl font-semibold my-2 font-cyber">Returns Results</h3>
                  <p className="text-muted-foreground font-cyber-alt">Delivers completed solution to user.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}