/**
 * Persona data for PSEO pages
 * Powers "for" pages (e.g., /for/startup-founders)
 */

export interface Persona {
  id: string;
  name: string;
  slug: string;
  title: string;
  companySize: string;
  experience: string;
  description: string;
  challenges: string[];
  goals: string[];
  codeboltBenefits: string[];
  keyFeatures: string[];
  testimonials: string[];
  targetKeywords: string[];
  relatedPersonas: string[];
}

export const personas: Persona[] = [
  {
    id: 'enterprise-architect',
    name: 'Alex',
    slug: 'enterprise-architects',
    title: 'VP of Engineering / Principal Architect',
    companySize: '500+ developers',
    experience: '15+ years',
    description: 'Responsible for technical strategy and developer productivity at scale. Alex needs to increase development capacity without proportional hiring while maintaining quality, security, and compliance.',
    challenges: [
      'Scaling development without hiring',
      'Maintaining code quality at scale',
      'Meeting tight release deadlines',
      'Ensuring security and compliance',
      'Managing distributed teams',
      'Reducing technical debt',
      'Training junior developers'
    ],
    goals: [
      'Increase development velocity',
      'Enable 24/7 development operations',
      'Maintain high code quality standards',
      'Reduce time-to-market for features',
      'Improve developer satisfaction',
      'Future-proof the technology stack'
    ],
    codeboltBenefits: [
      'Deploy hundreds of agents across multiple codebases simultaneously',
      'Complete audit trails for compliance and governance',
      'Full observability into AI operations',
      'Self-hosting option for security',
      'Train agents on company patterns',
      'Scale to enterprise workloads'
    ],
    keyFeatures: [
      'Swarm management',
      'Job coordination across teams',
      'Review and approval workflows',
      'Multi-environment support',
      'Agent debugging and monitoring',
      'Memory systems for knowledge retention'
    ],
    testimonials: [
      'We deployed 200 agents across 15 codebases. Development velocity increased 4x while maintaining quality standards.',
      'The audit trails and observability made compliance reviews trivial. We can see exactly what every agent did.',
      '24/7 development operations gave us a competitive advantage. Features ship while we sleep.'
    ],
    targetKeywords: [
      'codebolt for enterprise',
      'ai development platform for enterprise',
      'enterprise ai code assistant',
      'scale development with ai',
      'enterprise architecture with ai'
    ],
    relatedPersonas: ['tech-lead', 'devops-champion']
  },
  {
    id: 'ai-ml-engineer',
    name: 'Maya',
    slug: 'ml-engineers',
    title: 'Senior ML Engineer / AI Practice Lead',
    companySize: '50-500 developers',
    experience: '7+ years',
    description: 'Building and deploying AI systems with focus on custom agents and multi-agent architectures. Maya wants to experiment with agent coordination patterns and deploy production-grade AI workflows.',
    challenges: [
      'Building custom AI agents',
      'Testing multi-agent interactions',
      'Managing agent memory',
      'Visualizing agent coordination',
      'Integrating multiple LLMs',
      'Deploying agents to production',
      'Monitoring agent behavior'
    ],
    goals: [
      'Create custom AI agents for workflows',
      'Experiment with multi-agent architectures',
      'Research agent coordination patterns',
      'Deploy production-grade AI systems',
      'Build reusable agent frameworks',
      'Integrate with existing tools'
    ],
    codeboltBenefits: [
      'Create agents visually (drag-drop) or with code',
      'Multi-LLM support for different tasks',
      'Full agent lifecycle management',
      'Stigmergy coordination system',
      'Memory persistence for long-running experiments',
      'Real-time monitoring and debugging',
      'MCP for custom tool integration'
    ],
    keyFeatures: [
      'Agent creation (visual and code-based)',
      'Agent hooks and event system',
      'Stigmergy coordination',
      'Memory systems (episodic, semantic, vector)',
      'Agent debugging panel',
      'External agent support',
      'MCP integrations'
    ],
    testimonials: [
      'I built a custom agent in 10 minutes with the visual creator. Then added hooks for advanced behavior.',
      'The stigmergy coordination is fascinating. I can watch agents self-organize around tasks.',
      'Multi-LLM support lets me use the right model for each task. GPT-4 for reasoning, local models for speed.'
    ],
    targetKeywords: [
      'codebolt for ml engineers',
      'multi-agent development platform',
      'build ai agents with codebolt',
      'custom agent development',
      'ai engineering platform'
    ],
    relatedPersonas: ['tech-lead', 'startup-cto']
  },
  {
    id: 'tech-lead',
    name: 'Jordan',
    slug: 'tech-leads',
    title: 'Tech Lead / Senior Developer',
    companySize: '20-200 developers',
    experience: '8+ years',
    description: 'Leading development teams and focusing on productivity, code quality, and team efficiency. Jordan wants to accelerate team velocity and automate repetitive tasks while maintaining standards.',
    challenges: [
      'Accelerating team productivity',
      'Reducing context-switching',
      'Automating repetitive coding tasks',
      'Maintaining consistent code standards',
      'Managing code review backlog',
      'Keeping documentation updated',
      'Onboarding new developers'
    ],
    goals: [
      'Increase team development velocity',
      'Reduce time on routine tasks',
      'Maintain code quality',
      'Enable async collaboration',
      'Improve developer satisfaction',
      'Scale team output without hiring'
    ],
    codeboltBenefits: [
      'Set up roadmap and agents work while you sleep',
      'Review workflow maintains quality',
      'Memory persistence maintains context',
      'Job delegation for task automation',
      'Team coordination through swarms',
      'Knowledge retention across team'
    ],
    keyFeatures: [
      'Roadmap and action planning',
      'Job coordination',
      'Review and merge system',
      'Memory systems',
      'Agent debugging',
      'Collaborative features',
      'Documentation generation'
    ],
    testimonials: [
      'I set tasks in the evening and wake up to completed work. Review queue is manageable, not overwhelming.',
      'My team spends time on creative work instead of routine tasks. Satisfaction scores are way up.',
      'New developers onboarding time dropped from weeks to days. The agents are patient teachers.'
    ],
    targetKeywords: [
      'codebolt for tech leads',
      'ai for development teams',
      'team productivity with ai',
      'automate development workflow',
      'tech lead tools'
    ],
    relatedPersonas: ['enterprise-architect', 'startup-cto']
  },
  {
    id: 'startup-cto',
    name: 'Sam',
    slug: 'startup-founders',
    title: 'CTO / Technical Co-founder',
    companySize: '2-20 people',
    experience: '10+ years',
    description: 'Building products fast with limited resources. Sam needs to compete with larger teams and ship features continuously while maintaining quality and managing technical debt.',
    challenges: [
      'Limited budget for hiring',
      'Competing with larger engineering teams',
      'Shipping features quickly',
      'Managing technical debt',
      'Wearing multiple hats',
      'Maintaining code quality',
      'Balancing speed and stability'
    ],
    goals: [
      'Build products faster with small team',
      'Compete with larger engineering teams',
      'Maintain code quality while moving fast',
      'Ship features continuously',
      'Reduce time-to-market',
      'Stay lean and agile'
    ],
    codeboltBenefits: [
      'Instant scaling without hiring',
      'Compete with teams 10x your size',
      'Quality maintenance through automation',
      '24/7 development progress',
      'Cost efficiency',
      'Flexibility to pivot quickly'
    ],
    keyFeatures: [
      'Multi-agent swarms',
      'Job coordination',
      'Quick setup and iteration',
      'Full feature development',
      'Testing and documentation',
      'Easy deployment'
    ],
    testimonials: [
      'My 3-person startup ships like a 30-person team. We\'re competing with well-funded companies and winning.',
      'We\'re executing on 3 product ideas simultaneously. Each has its own agent swarm working 24/7.',
      'The cost efficiency is incredible. One subscription gives us a team of AI developers.'
    ],
    targetKeywords: [
      'codebolt for startups',
      'ai for startup founders',
      'startup development tool',
      'build startup with ai',
      'startup cto tools'
    ],
    relatedPersonas: ['solo-developer', 'tech-lead']
  },
  {
    id: 'devops-champion',
    name: 'Riley',
    slug: 'devops-engineers',
    title: 'DevOps Lead / Platform Engineer',
    companySize: '50-500 developers',
    experience: '6+ years',
    description: 'Focused on infrastructure automation, CI/CD, and reliability. Riley wants to integrate AI into DevOps workflows and enable self-service for development teams.',
    challenges: [
      'Automating infrastructure-as-code',
      'Reducing manual operations',
      'Integrating AI into CI/CD',
      'Monitoring AI operations',
      'Self-service for developers',
      'Security and compliance',
      'Managing complex deployments'
    ],
    goals: [
      'Automate infrastructure development',
      'Reduce toil and manual processes',
      'Integrate AI into pipelines',
      'Monitor and maintain AI systems',
      'Enable self-service capabilities',
      'Improve deployment reliability'
    ],
    codeboltBenefits: [
      'Custom environments for infrastructure',
      'Full observability into operations',
      'External agents for CI/CD integration',
      'Self-hosting options',
      'Multi-environment workflows',
      'Automated testing and deployment'
    ],
    keyFeatures: [
      'Multi-environment support',
      'Shadow git for safe testing',
      'External agent support',
      'Agent monitoring',
      'Job coordination',
      'Automated testing',
      'Knowledge management'
    ],
    testimonials: [
      'I built custom agents for our infrastructure. They handle deployments, monitoring, and auto-scaling.',
      'The observability is fantastic. I can see exactly what agents are doing and intervene if needed.',
      'Multi-environment support lets us test safely before production. Zero surprises.'
    ],
    targetKeywords: [
      'codebolt for devops',
      'ai for devops engineers',
      'automate infrastructure with ai',
      'devops automation platform',
      'ai cicd integration'
    ],
    relatedPersonas: ['enterprise-architect', 'tech-lead']
  },
  {
    id: 'solo-developer',
    name: 'Charlie',
    slug: 'solo-developers',
    title: 'Freelancer / Indie Developer',
    companySize: '1 person',
    experience: '5+ years',
    description: 'Building products independently and handling all aspects of development. Charlie wants to multiply personal productivity and compete with larger teams.',
    challenges: [
      'Personal bandwidth limitations',
      'Handling all aspects alone',
      'Testing and documentation lagging',
      'Learning new tech stacks',
      'Competing with larger teams',
      'Managing complexity alone',
      'Maintaining code quality'
    ],
    goals: [
      'Multiply personal productivity',
      'Handle complex projects independently',
      'Learn new technologies quickly',
      'Maintain quality while moving fast',
      'Compete quality-wise with funded startups',
      'Build ambitious products alone'
    ],
    codeboltBenefits: [
      'Parallel work on multiple features',
      '24/7 productivity',
      'Reduced cognitive load',
      'Quality maintenance through agents',
      'Learn new tech with AI help',
      'Competitive advantage'
    ],
    keyFeatures: [
      'Multi-agent swarms',
      'Background agents',
      'Job coordination',
      'Testing automation',
      'Documentation generation',
      'Code explanation',
      'Easy setup'
    ],
    testimonials: [
      'I start my day with 5 agents working on different features. By lunch, I\'m reviewing and merging their PRs.',
      'I tripled my rates because I deliver 10x more. Clients are amazed at what one person can do.',
      'Learning new frameworks used to take weeks. Now agents guide me through unfamiliar code.'
    ],
    targetKeywords: [
      'codebolt for solo developers',
      'ai for freelancers',
      'indie hacker tools',
      'solo developer productivity',
      'ai for one person teams'
    ],
    relatedPersonas: ['startup-cto']
  },
  {
    id: 'agency-developer',
    name: 'Taylor',
    slug: 'agencies',
    title: 'Agency Developer / Consultant',
    companySize: '10-100 people',
    experience: '8+ years',
    description: 'Building products for multiple clients simultaneously. Taylor needs to switch contexts quickly, deliver on tight deadlines, and maintain quality across diverse projects.',
    challenges: [
      'Managing multiple client projects',
      'Context switching between codebases',
      'Meeting tight deadlines',
      'Maintaining quality standards',
      'Onboarding to client codebases',
      'Balancing multiple priorities',
      'Client communication and expectations'
    ],
    goals: [
      'Deliver projects faster',
      'Switch contexts efficiently',
      'Maintain quality across projects',
      'Scale agency capacity',
      'Improve client satisfaction',
      'Reduce delivery risk'
    ],
    codeboltBenefits: [
      'Multi-environment for multiple clients',
      'Parallel project development',
      'Quick onboarding to new codebases',
      'Automated testing and documentation',
      'Consistent quality delivery',
      'Faster project completion'
    ],
    keyFeatures: [
      'Multi-environment support',
      'Job coordination',
      'Context memory',
      'Automated testing',
      'Documentation generation',
      'Code explanation',
      'Review workflows'
    ],
    testimonials: [
      'We handle 3x more clients with the same team. Multi-environment support is a game changer.',
      'Onboarding to a new client codebase used to take a week. Now it\'s a day.',
      'Our delivery times dropped by 60%. Clients are thrilled with the speed and quality.'
    ],
    targetKeywords: [
      'codebolt for agencies',
      'ai for consulting firms',
      'agency development tools',
      'deliver projects faster with ai',
      'multi-client development'
    ],
    relatedPersonas: ['tech-lead', 'solo-developer']
  },
  {
    id: 'student-learner',
    name: 'Casey',
    slug: 'students',
    title: 'Computer Science Student',
    companySize: 'N/A',
    experience: 'Learning',
    description: 'Learning programming and software development. Casey wants to understand best practices, learn new technologies, and build portfolio projects efficiently.',
    challenges: [
      'Learning complex concepts',
      'Understanding best practices',
      'Building portfolio projects',
      'Debugging own code',
      'Keeping up with technologies',
      'Finding good learning resources',
      'Getting feedback on code'
    ],
    goals: [
      'Learn programming faster',
      'Understand industry practices',
      'Build impressive projects',
      'Get feedback on code',
      'Prepare for jobs',
      'Stay current with technology'
    ],
    codeboltBenefits: [
      'AI explanations of code',
      'Interactive learning experiences',
      'Best practices from production code',
      'Real-time debugging help',
      'Project guidance and suggestions',
      'Portfolio project acceleration'
    ],
    keyFeatures: [
      'Code explanation',
      'Knowledge graph',
      'Agent guidance',
      'Debugging assistance',
      'Best practices learning',
      'Documentation access',
      'Community learning'
    ],
    testimonials: [
      'I learned more in 3 months with CodeBolt than a year of traditional study.',
      'Agents explain code in ways that make sense. They\'re patient tutors.',
      'My portfolio projects are production-quality, not student exercises.'
    ],
    targetKeywords: [
      'codebolt for students',
      'learn programming with ai',
      'ai coding tutor',
      'student development tools',
      'learn to code with codebolt'
    ],
    relatedPersonas: ['solo-developer']
  }
];

// Helper functions
export function getPersonaBySlug(slug: string): Persona | undefined {
  return personas.find(p => p.slug === slug);
}

export function getAllPersonaSlugs(): string[] {
  return personas.map(p => p.slug);
}

export function generatePersonaMetadata(persona: Persona) {
  return {
    title: `CodeBolt for ${persona.name} | ${persona.title}`,
    description: `CodeBolt helps ${persona.title}s ${persona.goals[0].toLowerCase()}. ${persona.description}`,
    keywords: [
      `codebolt for ${persona.slug}`,
      `ai for ${persona.slug}`,
      `${persona.slug} development tools`,
      ...persona.targetKeywords
    ]
  };
}
