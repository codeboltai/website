'use client'

import { useState, useEffect } from 'react'
import { Calendar, Tag, Users, Briefcase, MapPin, Clock, ArrowRight, Globe, Heart, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import GetInTouchForm from '@/components/ui/GetInTouchForm'

export default function CareersPage() {
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

  const handleApplyClick = (jobTitle: string, jobId: string) => {
    console.log(`Applying for job: ${jobTitle} with ID: ${jobId}`)
  }


  const jobOpenings = [
    {
      id: "senior-ai-engineer",
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      posted: "2024-01-15",
      description: "Join our core AI team to build the next generation of AI-powered code editors.",
      requirements: [
        {
          type: "required",
          title: "Technical Skills",
          description: "5+ years experience with Python, TypeScript, and machine learning frameworks"
        },
        {
          type: "required",
          title: "AI/ML Experience",
          description: "Deep understanding of LLMs, transformers, and code generation models"
        },
        {
          type: "preferred",
          title: "Code Editor Experience",
          description: "Experience building developer tools or code editors"
        }
      ]
    },
    {
      id: "product-manager",
      title: "Senior Product Manager",
      department: "Product",
      location: "Remote / New York",
      type: "Full-time",
      posted: "2024-01-10",
      description: "Lead product strategy and roadmap for our AI agent orchestration platform.",
      requirements: [
        {
          type: "required",
          title: "Product Experience",
          description: "7+ years of product management experience in developer tools or AI products"
        },
        {
          type: "required",
          title: "Technical Background",
          description: "Strong technical background with ability to work closely with engineering teams"
        },
        {
          type: "preferred",
          title: "AI Product Experience",
          description: "Experience with AI/ML products and understanding of developer workflows"
        }
      ]
    },
    {
      id: "devrel-engineer",
      title: "Developer Relations Engineer",
      department: "Developer Relations",
      location: "Remote",
      type: "Full-time",
      posted: "2024-01-05",
      description: "Build and nurture our developer community while creating amazing developer experiences.",
      requirements: [
        {
          type: "required",
          title: "Developer Background",
          description: "5+ years of software development experience with strong communication skills"
        },
        {
          type: "required",
          title: "Community Building",
          description: "Experience building developer communities and creating technical content"
        },
        {
          type: "preferred",
          title: "Public Speaking",
          description: "Experience with conferences, workshops, and developer events"
        }
      ]
    }
  ]

  const benefits = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and async communication"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness stipend"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Growth & Learning",
      description: "Annual learning budget, conference attendance, and mentorship programs"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Equity & Impact",
      description: "Competitive equity package and the chance to shape the future of AI development"
    }
  ]

  const getRequirementIcon = (type: string) => {
    switch (type) {
      case 'required':
        return <Briefcase className="w-4 h-4" />
      case 'preferred':
        return <Zap className="w-4 h-4" />
      default:
        return <Tag className="w-4 h-4" />
    }
  }

  const getRequirementColor = (type: string) => {
    switch (type) {
      case 'required':
        return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800'
      case 'preferred':
        return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:border-blue-800'
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
                <Users className="w-10 h-10 text-red-600" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
                  JOIN OUR <span className="text-red-600">TEAM</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
                Help us build the future of AI-powered development tools
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber mb-4">
              Why Work With Us
            </h2>
            <p className="text-lg text-muted-foreground font-cyber-alt max-w-2xl mx-auto">
              We&apos;re building something revolutionary and we want amazing people to join us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300">
                <div className="text-red-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground font-cyber mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground font-cyber-alt text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-6 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-muted-foreground font-cyber-alt">
              Find your next opportunity with us
            </p>
          </div>

          <div className="space-y-12">
            {jobOpenings.map((job, index) => (
              <div key={job.id} className="relative">
                {/* Timeline line */}
                {index !== jobOpenings.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-border" />
                )}
                
                {/* Job card */}
                <div className="relative bg-card rounded-lg hover:shadow-lg transition-all duration-300 border border-border">
                  {/* Timeline dot */}
                  <div className="absolute -left-2 top-8 w-4 h-4 bg-red-600 rounded-full border-2 border-background" />
                  
                  <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 lg:mb-0">
                        <h2 className="text-2xl font-bold text-foreground font-cyber">
                          {job.title}
                        </h2>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800">
                          {job.department}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="text-sm font-cyber-alt">{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm font-cyber-alt">{job.type}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm font-cyber-alt">{job.posted}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 font-cyber-alt">
                      {job.description}
                    </p>

                    {/* Requirements */}
                    <div className="space-y-4 mb-6">
                      <h3 className="text-lg font-semibold text-foreground font-cyber">
                        Requirements
                      </h3>
                      {job.requirements.map((requirement, reqIndex) => (
                        <div key={reqIndex} className="group">
                          <div className="flex items-start space-x-3">
                            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-colors ${getRequirementColor(requirement.type)}`}>
                              {getRequirementIcon(requirement.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-semibold text-foreground font-cyber mb-1">
                                {requirement.title}
                              </h4>
                              <p className="text-muted-foreground font-cyber-alt text-sm">
                                {requirement.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Apply Button */}
                    <div className="flex justify-end">
                      <Button
                        variant="primary"
                        size="md"
                        shape="cyber"
                        className="font-cyber"
                        onClick={() => handleApplyClick(job.title, job.id)}
                      >
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-lg p-8 border border-border">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-cyber">
              Don't See the Perfect Role?
            </h3>
            <p className="text-muted-foreground mb-6 font-cyber-alt max-w-2xl mx-auto">
              We're always looking for talented people to join our team. Send us your resume and let us know how you'd like to contribute.
            </p>

            <Button
              variant="primary"
              size="lg"
              shape="cyber"
              className="font-cyber"
              onClick={() => handleApplyClick('General Application', 'general')}
            >
              Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section> */}

      {/* Get in Touch Section */}
      <GetInTouchForm />
    </div>
  )
}