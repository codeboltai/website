'use client'

import { motion } from 'framer-motion'
import { Code2, Github, Twitter, Linkedin, Mail, ArrowRight, Zap, Users, Globe } from 'lucide-react'
import Button from '@/components/ui/Button'

interface FooterRedesignedProps {
  className?: string
}

export default function FooterRedesigned({ className = '' }: FooterRedesignedProps) {
  return (
    <footer className={`relative overflow-hidden ${className}`}>
      {/* Hero CTA Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-red-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-white font-cyber-heavy leading-tight">
                BUILD THE
                <span className="block bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  FUTURE
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-cyber-alt leading-relaxed">
                Join thousands of developers revolutionizing software development with AI agents. 
                The future of coding starts here.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                variant="primary" 
                size="lg" 
                shape="gaming"
                className="bg-red-600 hover:bg-red-700 text-white font-cyber text-lg px-8 py-4 group"
              >
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                shape="cyber"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-cyber text-lg px-8 py-4"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-3xl md:text-4xl font-bold text-white font-cyber-heavy">10K+</span>
                </div>
                <p className="text-gray-400 text-sm font-cyber-alt">AI Agents Created</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-3xl md:text-4xl font-bold text-white font-cyber-heavy">5K+</span>
                </div>
                <p className="text-gray-400 text-sm font-cyber-alt">Developers</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Globe className="w-6 h-6 text-red-400 mr-2" />
                  <span className="text-3xl md:text-4xl font-bold text-white font-cyber-heavy">50+</span>
                </div>
                <p className="text-gray-400 text-sm font-cyber-alt">Countries</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </section>

      {/* Links Section */}
      <div className="bg-gray-900 border-t border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-cyber">CodeboltAI</h3>
                  <p className="text-red-400 text-sm font-cyber-alt">AI Code Editor for AI Agents</p>
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed font-cyber-alt max-w-md">
                Empowering developers to create, deploy, and manage AI coding agents that transform 
                how software is built.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 group">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white font-cyber">Product</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#apis" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    APIs & SDKs
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#changelog" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Changelog
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#docs" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Documentation
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Pricing
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white font-cyber">Company</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    About Us
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Careers
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#partners" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Partners
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#press" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Press Kit
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white font-cyber">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Blog
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#community" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Community
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#tutorials" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Tutorials
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
                <li>
                  <a href="#support" className="text-gray-400 hover:text-red-400 transition-colors font-cyber-alt group flex items-center">
                    Support
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <p className="text-gray-500 text-sm font-cyber-alt">
                © 2024 CodeboltAI. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#privacy" className="text-gray-500 hover:text-red-400 text-sm transition-colors font-cyber-alt">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-gray-500 hover:text-red-400 text-sm transition-colors font-cyber-alt">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-gray-500 hover:text-red-400 text-sm transition-colors font-cyber-alt">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 font-cyber-alt">
              Made with ❤️ for developers worldwide
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 