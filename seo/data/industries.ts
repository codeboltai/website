/**
 * Industry vertical data for PSEO pages
 * Powers industry-specific pages
 */

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  marketSize: string;
  keyChallenges: string[];
  developmentNeeds: string[];
  codeboltSolutions: string[];
  targetKeywords: string[];
  useCases: string[];
  compliance: string[];
}

export const industries: Industry[] = [
  {
    id: 'fintech',
    name: 'Fintech',
    slug: 'fintech',
    description: 'Financial technology companies building banking, payments, and investment platforms',
    marketSize: '$300B+ globally',
    keyChallenges: [
      'Security and compliance requirements',
      'Regulatory complexity (PCI-DSS, SOC2, GDPR)',
      'High reliability and accuracy needs',
      'Fast iteration for competitive advantage',
      'Complex transaction logic',
      'Audit trail requirements'
    ],
    developmentNeeds: [
      'Secure coding practices',
      'Comprehensive testing',
      'Audit logging',
      'Regulatory compliance features',
      'High-availability systems',
      'Fraud detection'
    ],
    codeboltSolutions: [
      'Security-focused agent reviews',
      'Comprehensive test generation for financial logic',
      'Automated audit trail generation',
      'Multi-environment for safe testing',
      'Parallel feature development',
      'Knowledge retention for compliance'
    ],
    targetKeywords: [
      'codebolt for fintech',
      'ai development for financial services',
      'fintech development tools',
      'banking software development',
      'financial software development'
    ],
    useCases: [
      'Payment processing systems',
      'Trading platforms',
      'Lending platforms',
      'Wallet applications',
      'Compliance reporting'
    ],
    compliance: ['SOC2', 'PCI-DSS', 'GDPR', 'KYC/AML']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    slug: 'healthcare',
    description: 'Health technology companies building EHR, telemedicine, and health data platforms',
    marketSize: '$400B+ globally',
    keyChallenges: [
      'HIPAA compliance requirements',
      'Patient data privacy',
      'High reliability needs',
      'FDA regulations for software',
      'Integration with legacy systems',
      'Complex data models'
    ],
    developmentNeeds: [
      'HIPAA-compliant code',
      'Secure data handling',
      'Comprehensive testing',
      'Audit trails',
      'Integration with health systems',
      'Regulatory documentation'
    ],
    codeboltSolutions: [
      'HIPAA-aware code generation',
      'Security agent reviews',
      'Automated compliance testing',
      'Documentation generation for audits',
      'Legacy system integration',
      'Safe multi-environment testing'
    ],
    targetKeywords: [
      'codebolt for healthcare',
      'ai healthcare development',
      'hipaa compliant software',
      'healthtech development tools',
      'medical software development'
    ],
    useCases: [
      'EHR systems',
      'Telemedicine platforms',
      'Health data analytics',
      'Patient portals',
      'Medical device software'
    ],
    compliance: ['HIPAA', 'FDA', 'HITECH', 'GDPR']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Online retail companies building marketplaces, storefronts, and shopping platforms',
    marketSize: '$5T+ globally',
    keyChallenges: [
      'Seasonal traffic spikes',
      'High availability requirements',
      'Fast feature iteration',
      'Mobile-first development',
      'Payment integration',
      'Inventory management'
    ],
    developmentNeeds: [
      'Rapid feature development',
      'Scalable architecture',
      'Payment processing',
      'Mobile optimization',
      'A/B testing infrastructure',
      'Performance optimization'
    ],
    codeboltSolutions: [
      'Parallel feature development',
      'Performance optimization agents',
      'Mobile-first code generation',
      'Testing automation',
      'Payment integration patterns',
      'Scalability analysis'
    ],
    targetKeywords: [
      'codebolt for ecommerce',
      'ai ecommerce development',
      'online retail development',
      'marketplace development tools',
      'shopping platform development'
    ],
    useCases: [
      'Marketplace platforms',
      'Headless commerce',
      'Mobile shopping apps',
      'Inventory management',
      'Payment processing'
    ],
    compliance: ['PCI-DSS', 'GDPR', 'CCPA']
  },
  {
    id: 'saas',
    name: 'SaaS',
    slug: 'saas',
    description: 'Software-as-a-Service companies building B2B and B2C applications',
    marketSize: '$200B+ globally',
    keyChallenges: [
      'Time-to-market pressure',
      'Feature velocity',
      'Multi-tenant architecture',
      'Customer onboarding',
      'Churn reduction',
      'Scaling challenges'
    ],
    developmentNeeds: [
      'Rapid prototyping',
      'Feature development',
      'API design',
      'Multi-tenant patterns',
      'Analytics integration',
      'Documentation generation'
    ],
    codeboltSolutions: [
      'Fast feature development',
      'Multi-agent parallelization',
      'API generation',
      'Documentation automation',
      'Testing automation',
      'Knowledge retention'
    ],
    targetKeywords: [
      'codebolt for saas',
      'ai saas development',
      'software development tools',
      'b2b software development',
      'saas platform development'
    ],
    useCases: [
      'B2B applications',
      'Productivity tools',
      'Collaboration platforms',
      'Analytics dashboards',
      'Automation tools'
    ],
    compliance: ['SOC2', 'GDPR', 'CCPA']
  },
  {
    id: 'agencies',
    name: 'Digital Agencies',
    slug: 'agencies',
    description: 'Digital agencies building websites and applications for clients',
    marketSize: '$50B+ globally',
    keyChallenges: [
      'Multiple simultaneous projects',
      'Tight deadlines',
      'Context switching',
      'Diverse tech stacks',
      'Client expectations',
      'Resource constraints'
    ],
    developmentNeeds: [
      'Fast project setup',
      'Multiple tech stack support',
      'Template generation',
      'Quick iterations',
      'Client communication',
      'Quality maintenance'
    ],
    codeboltSolutions: [
      'Multi-environment for multiple clients',
      'Rapid project scaffolding',
      'Multi-stack support',
      'Parallel project development',
      'Documentation automation',
      'Quality assurance'
    ],
    targetKeywords: [
      'codebolt for agencies',
      'ai for digital agencies',
      'agency development tools',
      'client project development',
      'agency productivity tools'
    ],
    useCases: [
      'Marketing websites',
      'E-commerce builds',
      'Custom applications',
      'Platform migrations',
      'API integrations'
    ],
    compliance: ['GDPR', 'client-specific']
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Game studios building mobile, PC, and console games',
    marketSize: '$200B+ globally',
    keyChallenges: [
      'Performance optimization',
      'Cross-platform development',
      'Complex game logic',
      'Live operations',
      'Anti-cheat systems',
      'Player retention'
    ],
    developmentNeeds: [
      'Game logic implementation',
      'Performance optimization',
      'Backend services',
      'Analytics integration',
      'Live ops tools',
      'Cross-platform code'
    ],
    codeboltSolutions: [
      'Game logic generation',
      'Performance profiling agents',
      'Backend service development',
      'Testing automation',
      'Analytics integration',
      'Multi-platform patterns'
    ],
    targetKeywords: [
      'codebolt for gaming',
      'ai game development',
      'game development tools',
      'unity unreal development',
      'gaming software development'
    ],
    useCases: [
      'Mobile games',
      'Backend services',
      'Live ops dashboards',
      'Analytics systems',
      'Anti-cheat systems'
    ],
    compliance: ['COPPA', 'GDPR', 'platform-specific']
  },
  {
    id: 'education',
    name: 'EdTech',
    slug: 'edtech',
    description: 'Education technology companies building learning platforms and tools',
    marketSize: '$100B+ globally',
    keyChallenges: [
      'Student data privacy',
      'Accessibility requirements',
      'Scalability for peak usage',
      'Content management',
      'Assessment integrity',
      'Integration with LMS'
    ],
    developmentNeeds: [
      'Secure student data handling',
      'Accessible UI development',
      'Scalable architecture',
      'Content delivery systems',
      'Assessment platforms',
      'LMS integrations'
    ],
    codeboltSolutions: [
      'Privacy-focused development',
      'Accessibility agent reviews',
      'Scalable patterns',
      'Content management systems',
      'Assessment logic generation',
      'Integration patterns'
    ],
    targetKeywords: [
      'codebolt for edtech',
      'ai education development',
      'learning platform development',
      'edtech software tools',
      'education software development'
    ],
    useCases: [
      'LMS platforms',
      'Assessment tools',
      'Content delivery',
      'Student analytics',
      'Virtual classrooms'
    ],
    compliance: ['FERPA', 'COPPA', 'GDPR', 'WCAG']
  },
  {
    id: 'logistics',
    name: 'Logistics & Supply Chain',
    slug: 'logistics',
    description: 'Logistics companies building tracking, routing, and management systems',
    marketSize: '$10T+ globally',
    keyChallenges: [
      'Real-time tracking',
      'Route optimization',
      'Integration with carriers',
      'Data synchronization',
      'Scalability',
      'Legacy systems'
    ],
    developmentNeeds: [
      'Real-time systems',
      'Optimization algorithms',
      'API integrations',
      'Data pipelines',
      'Mobile applications',
      'Dashboard systems'
    ],
    codeboltSolutions: [
      'Real-time system development',
      'Algorithm optimization',
      'API integration patterns',
      'Data pipeline generation',
      'Mobile app development',
      'Dashboard creation'
    ],
    targetKeywords: [
      'codebolt for logistics',
      'ai supply chain development',
      'logistics software tools',
      'tracking system development',
      'supply chain software'
    ],
    useCases: [
      'Tracking systems',
      'Route optimization',
      'Warehouse management',
      'Carrier integrations',
      'Analytics dashboards'
    ],
    compliance: ['FDA', 'customs regulations', 'GDPR']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Manufacturing companies building IoT, automation, and management systems',
    marketSize: '$500B+ globally',
    keyChallenges: [
      'IoT device integration',
      'Real-time monitoring',
      'Predictive maintenance',
      'Quality control',
      'Supply chain coordination',
      'Legacy equipment'
    ],
    developmentNeeds: [
      'IoT platforms',
      'Real-time data processing',
      'Machine learning integration',
      'Dashboard systems',
      'Integration protocols',
      'Safety systems'
    ],
    codeboltSolutions: [
      'IoT platform development',
      'Real-time system patterns',
      'ML integration',
      'Dashboard generation',
      'Protocol implementations',
      'Safety-critical testing'
    ],
    targetKeywords: [
      'codebolt for manufacturing',
      'ai industrial development',
      'iot development tools',
      'manufacturing software',
      'industrial automation software'
    ],
    useCases: [
      'IoT monitoring',
      'Predictive maintenance',
      'Quality control systems',
      'Production planning',
      'Inventory management'
    ],
    compliance: ['ISO', 'industry-specific', 'OSHA']
  },
  {
    id: 'government',
    name: 'Government',
    slug: 'government',
    description: 'Government agencies building civic tech and public service platforms',
    marketSize: '$500B+ globally',
    keyChallenges: [
      'Accessibility requirements',
      'Security clearances',
      'Legacy system integration',
      'Budget constraints',
      'Public scrutiny',
      'Complex regulations'
    ],
    developmentNeeds: [
      'Accessible web development',
      'Secure coding practices',
      'Legacy integration',
      'Cost-effective solutions',
      'Transparent systems',
      'Comprehensive documentation'
    ],
    codeboltSolutions: [
      'Accessibility-first development',
      'Security agent reviews',
      'Cost-effective scaling',
      'Documentation generation',
      'Legacy integration patterns',
      'Compliance automation'
    ],
    targetKeywords: [
      'codebolt for government',
      'ai civic tech development',
      'government software tools',
      'public sector development',
      'civic tech software'
    ],
    useCases: [
      'Public portals',
      'Service applications',
      'Data transparency',
      'Citizen engagement',
      'Regulatory systems'
    ],
    compliance: ['Section 508', 'WCAG', 'FedRAMP', 'NIST']
  }
];

// Helper functions
export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find(i => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map(i => i.slug);
}

export function generateIndustryMetadata(industry: Industry) {
  return {
    title: `CodeBolt for ${industry.name} | AI-Powered ${industry.name} Development`,
    description: `Accelerate ${industry.name.toLowerCase()} software development with CodeBolt. ${industry.codeboltSolutions[0]}, ${industry.codeboltSolutions[1]}. Built for ${industry.compliance.join(', ')} compliance.`,
    keywords: [
      `codebolt for ${industry.slug}`,
      `ai ${industry.slug} development`,
      `${industry.slug} software tools`,
      `${industry.slug.toLowerCase()} development`,
      ...industry.targetKeywords
    ]
  };
}
