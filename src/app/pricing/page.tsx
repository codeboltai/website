'use client'

import { Check, Star, Zap, Crown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Accordion from '@/components/ui/Accordion'
import CTASection from '@/components/ui/CTASection'

const pricingPlans = [
  {
    name: 'Free',
    icon: Zap,
    price: 'Free',
    period: 'Forever',
    description: 'For individual developers and hobbyists.',
    features: [
      'Bring your own AI Connection',
      'Basic Code Editor',
      'Community Support',
      'Up to 3 projects'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline' as const,
    popular: false
  },
  {
    name: 'Pro',
    icon: Star,
    price: '$2',
    period: '/month',
    description: 'For professional developers and power users.',
    features: [
      'Bring your own AI Connection',
      'All features of Free plan',
      'Advanced Code Editor',
      'Priority Support',
      'Unlimited Projects',
      'Access to exclusive features'
    ],
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'primary' as const,
    popular: true
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Custom',
    period: '',
    description: 'For large teams and businesses requiring advanced features.',
    features: [
      'All features of Pro plan',
      'Integrated Team Dashboard',
      'SSO & Advanced Security',
      'Dedicated Support & Onboarding',
      'Custom Integrations'
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
    question: 'How does "Bring your own AI Connection" work?',
    answer: 'You can connect your own API keys from various AI providers. This allows you to use your preferred models and manage your AI usage costs directly with the provider.'
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'We offer community support for Free users, priority email support for Pro users, and dedicated support with an account manager for Enterprise customers.'
  },
  {
    question: 'What are the additional features in the Pro plan?',
    answer: 'The Pro plan includes an advanced code editor, priority support, unlimited projects, and access to exclusive new features as they are released.'
  }
]

export default function PricingPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 thread-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground font-cyber-heavy">
              SIMPLE <span className="text-red-600">PRICING</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-cyber-alt">
              Choose the perfect plan for your AI-powered development journey. 
              Start free and scale as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-lg border-2 transition-all duration-300 bg-card ${
                  plan.popular 
                    ? 'border-red-500 shadow-lg scale-105' 
                    : 'border-border hover:border-red-300 hover:shadow-lg'
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
                        plan.popular ? 'text-white' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground font-cyber mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground font-cyber-heavy">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground font-cyber-alt">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground font-cyber-alt text-sm">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm font-cyber-alt">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-cyber-heavy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground font-cyber-alt">
              Everything you need to know about CodeboltAI pricing and features.
            </p>
          </div>

          <Accordion items={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Start Building?"
        description="Join thousands of developers already using AI agents to accelerate their development."
        buttons={[
          {
            text: "Get Started",
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
 