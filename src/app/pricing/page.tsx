'use client'

import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Accordion from '@/components/ui/Accordion'
import CTASection from '@/components/ui/CTASection'

const pricingPlans = [
  {
    name: 'Starter',
    icon: Zap,
    price: 'Free',
    period: 'Forever',
    description: 'Perfect for individual developers getting started with AI agents',
    features: [
      '1 AI Agent',
      'Basic Code Editor',
      'Community Support',
      '5 Projects',
      'Standard Execution Speed',
      'Basic Templates'
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'outline' as const,
    popular: false
  },
  {
    name: 'Professional',
    icon: Star,
    price: '$29',
    period: '/month',
    description: 'Ideal for professional developers and small teams',
    features: [
      '5 AI Agents',
      'Advanced Code Editor',
      'Priority Support',
      'Unlimited Projects',
      'Fast Execution Speed',
      'Premium Templates',
      'Git Integration',
      'Real-time Collaboration'
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'primary' as const,
    popular: true
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: '$99',
    period: '/month',
    description: 'Built for large teams and enterprise organizations',
    features: [
      'Unlimited AI Agents',
      'Enterprise Code Editor',
      '24/7 Premium Support',
      'Unlimited Projects',
      'Lightning Execution Speed',
      'Custom Templates',
      'Advanced Git Integration',
      'Team Collaboration',
      'SSO & Security',
      'Custom Integrations',
      'Dedicated Account Manager',
      'SLA Guarantee'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary' as const,
    popular: false
  }
]

const faqs = [
  {
    question: 'What is an AI Agent?',
    answer: 'An AI Agent is a specialized AI assistant trained to help with specific coding tasks. Each agent can have unique skills, personality, and expertise areas to match your development needs.'
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your current billing cycle.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Professional and Enterprise plans come with a 14-day free trial. No credit card required to start.'
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We offer community support for free users, priority email support for Professional users, and 24/7 premium support with dedicated account management for Enterprise customers.'
  },
  {
    question: 'Can I use my own AI models?',
    answer: 'Enterprise customers can integrate their own AI models and customize agent behavior. Professional users can choose from our library of pre-trained models.'
  }
]

export default function PricingPage() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-cyber-heavy">
              SIMPLE <span className="text-red-600">PRICING</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-cyber-alt">
              Choose the perfect plan for your AI-powered development journey. 
              Start free and scale as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative p-8 rounded-lg border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-red-500 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-red-300 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium font-cyber">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      plan.popular ? 'bg-red-500' : 'bg-gray-100'
                    }`}>
                      <plan.icon className={`w-6 h-6 ${
                        plan.popular ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 font-cyber mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 font-cyber-heavy">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 font-cyber-alt">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600 font-cyber-alt text-sm">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm font-cyber-alt">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.buttonVariant}
                  size="lg"
                  shape="gaming"
                  className="w-full font-cyber"
                >
                  {plan.buttonText}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-cyber-heavy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 font-cyber-alt">
              Everything you need to know about CodeboltAI pricing and features.
            </p>
          </motion.div>

          <Accordion items={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Building?"
        description="Join thousands of developers already using AI agents to accelerate their development."
        buttons={[
          {
            text: "Start Free Trial",
            variant: "primary",
            shape: "gaming"
          },
          {
            text: "Contact Sales",
            variant: "outline",
            shape: "cyber"
          }
        ]}
        backgroundColor="white"
      />
    </div>
  )
} 