'use client'

import { useState, useEffect } from 'react'
import { Calendar, GitCommit, Zap, Bug, Plus, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ChangelogPage() {
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const releases = [
    {
      version: "v1.1.20",
      date: "2024-08-04",
      type: "patch",
      title: "Latest Release",
      description: "Configuration updates and stability improvements.",
      changes: [
        {
          type: "improvement",
          title: "Configuration Management",
          description: "Added config.yml for better configuration management."
        },
        {
          type: "improvement",
          title: "Multi-platform Support",
          description: "Enhanced support for macOS (ARM64 & x64) and Windows platforms."
        },
        {
          type: "fix",
          title: "Build Optimization",
          description: "Optimized build process and reduced package sizes."
        }
      ]
    },
    {
      version: "v1.1.19",
      date: "2024-08-04",
      type: "patch",
      title: "Configuration Updates",
      description: "Minor configuration updates and improvements.",
      changes: [
        {
          type: "improvement",
          title: "System Configuration",
          description: "Updated system configuration files for better performance."
        },
        {
          type: "fix",
          title: "Stability Fixes",
          description: "Various stability improvements and bug fixes."
        }
      ]
    },
    {
      version: "v1.1.18",
      date: "2024-08-04",
      type: "patch",
      title: "System Improvements",
      description: "System-level improvements and optimizations.",
      changes: [
        {
          type: "improvement",
          title: "Performance Optimization",
          description: "Enhanced system performance and responsiveness."
        },
        {
          type: "fix",
          title: "Bug Fixes",
          description: "Resolved various issues reported by users."
        }
      ]
    }
  ]

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Plus className="w-4 h-4" />
      case 'improvement':
        return <Zap className="w-4 h-4" />
      case 'fix':
        return <Bug className="w-4 h-4" />
      default:
        return <GitCommit className="w-4 h-4" />
    }
  }

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800'
      case 'improvement':
        return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800'
      case 'fix':
        return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-800'
    }
  }
  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 thread-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <GitCommit className="w-10 h-10 text-red-600" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
                  CHANGE<span className="text-red-600">LOG</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
                Stay up to date with the latest features, improvements, and fixes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Releases Section */}
      <section className="py-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {releases.map((release, index) => (
              <div key={release.version} className="relative">
                {/* Timeline line */}
                {index !== releases.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />
                )}
                
                {/* Release card */}
                <div className="relative bg-card rounded-lg hover:shadow-lg transition-all duration-300 border border-border">
                  {/* Timeline dot */}
                  <div className="absolute -left-2 top-8 w-4 h-4 bg-red-600 rounded-full border-2 border-background" />
                  
                  <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                      <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border  `}>
                          {/* <Tag className="w-3 h-3 mr-1" /> */}
                          {release.version}
                        </span>
                        <h2 className="text-2xl font-bold text-foreground font-cyber">
                          {release.title}
                        </h2>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-cyber-alt">{release.date}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 font-cyber-alt">
                      {release.description}
                    </p>

                    {/* Changes */}
                    <div className="space-y-4">
                      {release.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="group">
                          <div className="flex items-start space-x-3">
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${getChangeColor(change.type)}`}>
                              {getChangeIcon(change.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-foreground font-cyber mb-1">
                                {change.title}
                              </h3>
                              <p className="text-muted-foreground font-cyber-alt text-sm">
                                {change.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-cyber">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mb-6 font-cyber-alt max-w-2xl mx-auto">
              Follow our development progress and get notified about new releases.
            </p>

            <Button
                  variant="primary"
                  size="lg"
                  shape="cyber"
                  className="font-cyber"
                  onClick={() => window.open('https://github.com/codeboltai/codebolt/releases', '_blank', 'noopener,noreferrer')}
                >
                  View on GitHub <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
          </div>
        </div>
      </section>
    </div>
  )
}