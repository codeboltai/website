/**
 * Use case data for PSEO pages
 * Powers "use-cases" page generation
 */

export interface UseCase {
  id: string;
  title: string;
  slug: string;
  category: 'development' | 'testing' | 'refactoring' | 'documentation' | 'debugging' | 'deployment';
  description: string;
  problem: string;
  solution: string;
  codeboltFeatures: string[];
  targetKeywords: string[];
  personas: string[];
  outcome: string;
  metrics: string[];
}

export const useCases: UseCase[] = [
  {
    id: 'automated-refactoring',
    title: 'Automated Code Refactoring',
    slug: 'automated-refactoring',
    category: 'refactoring',
    description: 'Transform legacy codebases with coordinated multi-agent refactoring',
    problem: 'Manual refactoring is time-consuming, error-prone, and requires understanding complex dependencies across the entire codebase. Traditional tools work file-by-file and miss systemic issues.',
    solution: 'CodeBolt deploys a swarm of agents that analyze dependencies, plan refactoring strategies, and execute coordinated changes across thousands of files simultaneously using stigmergy-based coordination.',
    codeboltFeatures: [
      'Job splitting for parallel refactoring',
      'Stigmergy coordination for dependency awareness',
      'Multi-environment support for safe testing',
      'Review system for quality control',
      'Background agents for long-running tasks'
    ],
    targetKeywords: [
      'automated code refactoring tool',
      'ai code refactoring',
      'automated refactoring with codebolt',
      'bulk code refactoring',
      'multi-agent code refactoring'
    ],
    personas: ['enterprise-architect', 'tech-lead', 'startup-cto'],
    outcome: '87 agents completed microservices migration in 3 weeks vs 8 weeks estimated',
    metrics: [
      '3-5x faster refactoring',
      '90% reduction in manual changes',
      'Zero regression bugs',
      'Complete dependency coverage'
    ]
  },
  {
    id: 'automated-testing',
    title: 'Automated Test Generation',
    slug: 'automated-testing',
    category: 'testing',
    description: 'Generate comprehensive test suites with multi-agent analysis',
    problem: 'Writing tests manually is tedious and often incomplete. Existing AI tools generate basic tests but miss edge cases and don\'t understand complex business logic.',
    solution: 'CodeBolt\'s agent swarm analyzes code paths, identifies edge cases, generates comprehensive unit tests, integration tests, and end-to-end tests with proper mocking and assertions.',
    codeboltFeatures: [
      'Multi-agent test generation',
      'Coverage analysis',
      'Test suite organization',
      'Auto-test execution',
      'Test case management'
    ],
    targetKeywords: [
      'ai test generator',
      'automated test generation',
      'test generation with codebolt',
      'unit test generator',
      'automated testing with ai'
    ],
    personas: ['tech-lead', 'devops-champion', 'solo-developer'],
    outcome: 'Generated 2,847 test cases with 94% coverage in 48 hours',
    metrics: [
      '10x faster test writing',
      '94% code coverage',
      'Edge case detection',
      'Maintainable test code'
    ]
  },
  {
    id: 'debugging-production',
    title: 'Production Issue Debugging',
    slug: 'debugging-production',
    category: 'debugging',
    description: 'Debug complex production issues with parallel investigation',
    problem: 'Production debugging requires investigating logs, reproducing issues, understanding distributed systems, and coordinating across teams. It\'s slow, stressful, and error-prone.',
    solution: 'CodeBolt deploys specialist agents in parallel to investigate logs, analyze stack traces, review recent changes, reproduce issues locally, and propose fixes with full observability into the debugging process.',
    codeboltFeatures: [
      'Parallel investigation agents',
      'Log analysis and correlation',
      'Shadow git for safe reproduction',
      'Agent debug panel for visibility',
      'Emergency response escalation'
    ],
    targetKeywords: [
      'ai debugging tool',
      'production debugging with ai',
      'automated debugging',
      'debug production issues',
      'ai debugger'
    ],
    personas: ['enterprise-architect', 'tech-lead', 'devops-champion'],
    outcome: 'Resolved critical production issue in 47 minutes vs 4 hours historical average',
    metrics: [
      '5x faster resolution',
      'Parallel investigation',
      'Full audit trail',
      'Knowledge capture'
    ]
  },
  {
    id: 'code-review',
    title: 'Automated Code Review',
    slug: 'code-review',
    category: 'development',
    description: 'Comprehensive AI-powered code review with multiple perspectives',
    problem: 'Manual code review doesn\'t scale, is inconsistent, and senior engineers spend too much time reviewing routine changes. Single AI reviewers miss nuanced issues.',
    solution: 'CodeBolt\'s agent economy uses multiple specialized reviewers (security, performance, maintainability, business logic) who build reputation over time and provide comprehensive feedback through deliberation and voting.',
    codeboltFeatures: [
      'Agent economy with reputation',
      'Deliberation system (voting, feedback)',
      'Testimonial system for reviewer feedback',
      'Multi-perspective review',
      'Approval workflow'
    ],
    targetKeywords: [
      'ai code review',
      'automated code review',
      'code review with codebolt',
      'ai pr reviewer',
      'automated pull request review'
    ],
    personas: ['tech-lead', 'enterprise-architect', 'ai-ml-engineer'],
    outcome: 'Review queue cleared from 127 PRs to 0 in 3 days with 94% developer satisfaction',
    metrics: [
      '24/7 review coverage',
      'Consistent quality',
      'Fast turnaround',
      'Knowledge transfer'
    ]
  },
  {
    id: 'documentation-generation',
    title: 'Documentation Generation',
    slug: 'documentation-generation',
    category: 'documentation',
    description: 'Generate and maintain comprehensive documentation automatically',
    problem: 'Documentation always lags behind code. Manual documentation is time-consuming, often incomplete, and quickly becomes outdated as code evolves.',
    solution: 'CodeBolt agents analyze code changes, update documentation automatically, generate API docs from code, create tutorials, and maintain docs through memory ingestion pipelines that trigger on code changes.',
    codeboltFeatures: [
      'Memory ingestion pipelines',
      'Markdown memory storage',
      'Automated doc generation',
      'Code analysis',
      'Knowledge graph for doc relationships'
    ],
    targetKeywords: [
      'ai documentation generator',
      'automated documentation',
      'generate docs with ai',
      'api documentation generator',
      'codebolt documentation'
    ],
    personas: ['tech-lead', 'solo-developer', 'startup-cto'],
    outcome: 'Generated 847 pages of documentation covering 100% of public APIs',
    metrics: [
      'Always up-to-date',
      'Comprehensive coverage',
      'Multiple formats',
      'Auto-maintenance'
    ]
  },
  {
    id: 'feature-development',
    title: 'Feature Development from Specs',
    slug: 'feature-development',
    category: 'development',
    description: 'Turn specifications into production code with coordinated agents',
    problem: 'Implementing features requires understanding requirements, writing code, tests, documentation, and coordinating across teams. It\'s slow and error-prone with handoffs between developers.',
    solution: 'CodeBolt\'s swarm manages the entire feature lifecycle: parsing specs, creating action plans, coordinating implementation through job bidding, generating tests, writing docs, and managing review all through stigmergy coordination.',
    codeboltFeatures: [
      'Action plan system',
      'Job coordination',
      'Job bidding for fair allocation',
      'Test generation',
      'Documentation auto-generation',
      'Review workflow'
    ],
    targetKeywords: [
      'ai feature development',
      'automated feature implementation',
      'spec to code',
      'ai code generation',
      'build features with codebolt'
    ],
    personas: ['startup-cto', 'tech-lead', 'enterprise-architect'],
    outcome: 'Shipped 12 features in parallel with 3 developers vs 1 feature per week traditional',
    metrics: [
      '10x parallelization',
      'End-to-end automation',
      'Quality maintained',
      'Fast iteration'
    ]
  },
  {
    id: 'legacy-migration',
    title: 'Legacy System Migration',
    slug: 'legacy-migration',
    category: 'refactoring',
    description: 'Migrate legacy systems to modern architectures safely',
    problem: 'Migrating legacy systems is high-risk, requires understanding old code, maintaining business logic, and ensuring zero downtime. It\'s complex and expensive.',
    solution: 'CodeBolt agents analyze legacy code, map business logic, create migration plans, implement incrementally with shadow environments, run parallel systems, and validate at each step with full observability.',
    codeboltFeatures: [
      'Multi-environment support',
      'Shadow git for safe migration',
      'Parallel system deployment',
      'Job coordination',
      'Comprehensive testing',
      'Rollback capabilities'
    ],
    targetKeywords: [
      'legacy system migration',
      'ai for legacy migration',
      'automated migration tool',
      'code migration with ai',
      'modernize legacy code'
    ],
    personas: ['enterprise-architect', 'tech-lead', 'devops-champion'],
    outcome: 'Migrated 500k LOC monolith to microservices in 3 months with zero downtime',
    metrics: [
      'Zero downtime',
      'Business logic preserved',
      'Incremental migration',
      'Full validation'
    ]
  },
  {
    id: 'api-integration',
    title: 'API Integration and Development',
    slug: 'api-integration',
    category: 'development',
    description: 'Build and integrate APIs with coordinated agent workflows',
    problem: 'API development involves defining schemas, implementing endpoints, writing tests, generating documentation, and integrating with services. It\'s repetitive and coordination-heavy.',
    solution: 'CodeBolt agents handle the full API lifecycle: schema design, endpoint implementation, authentication, testing, documentation generation, and client SDK creation through coordinated jobs.',
    codeboltFeatures: [
      'Job coordination for parallel endpoints',
      'Schema validation',
      'Auto-test generation',
      'Documentation generation',
      'MCP for external integrations',
      'API testing workflows'
    ],
    targetKeywords: [
      'ai api development',
      'automated api generation',
      'api integration with ai',
      'rest api generator',
      'build apis with codebolt'
    ],
    personas: ['startup-cto', 'tech-lead', 'solo-developer'],
    outcome: 'Built 47 REST endpoints with full tests and docs in 6 hours',
    metrics: [
      '10x faster development',
      'Consistent patterns',
      'Full test coverage',
      'Complete documentation'
    ]
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    slug: 'performance-optimization',
    category: 'refactoring',
    description: 'Identify and fix performance issues across the stack',
    problem: 'Performance issues require profiling, analyzing bottlenecks, understanding distributed systems, and implementing fixes. It\'s specialized work that takes time.',
    solution: 'CodeBolt deploys specialist agents that profile code, identify bottlenecks (database, network, algorithm), propose optimizations, implement changes safely, and validate improvements through A/B testing.',
    codeboltFeatures: [
      'Parallel profiling agents',
      'Knowledge graph for system understanding',
      'Safe implementation with review',
      'Performance monitoring',
      'A/B testing capabilities'
    ],
    targetKeywords: [
      'ai performance optimization',
      'automated performance tuning',
      'optimize code with ai',
      'performance bottleneck detection',
      'codebolt for performance'
    ],
    personas: ['enterprise-architect', 'tech-lead', 'devops-champion'],
    outcome: 'Reduced API response time by 73% and improved throughput by 4x',
    metrics: [
      'Automated bottleneck detection',
      'Safe optimization',
      'Validated improvements',
      'Continuous monitoring'
    ]
  },
  {
    id: 'security-audit',
    title: 'Security Auditing',
    slug: 'security-audit',
    category: 'testing',
    description: 'Comprehensive security analysis with specialized agents',
    problem: 'Security audits are expensive, manual, and miss vulnerabilities. Tools generate false positives and don\'t understand business context.',
    solution: 'CodeBolt\'s security-focused agents analyze code for vulnerabilities (SQL injection, XSS, auth issues), check dependencies, review authentication flows, and provide contextual fixes with explanations.',
    codeboltFeatures: [
      'Specialized security agents',
      'Vulnerability detection',
      'Dependency analysis',
      'Context-aware recommendations',
      'Remediation workflows'
    ],
    targetKeywords: [
      'ai security audit',
      'automated security scanning',
      'security code review',
      'vulnerability detection ai',
      'codebolt security'
    ],
    personas: ['enterprise-architect', 'devops-champion', 'tech-lead'],
    outcome: 'Identified 34 vulnerabilities including 3 critical issues missed by manual review',
    metrics: [
      'Comprehensive coverage',
      'Context-aware',
      'Actionable fixes',
      'Continuous monitoring'
    ]
  },
  {
    id: 'database-migration',
    title: 'Database Migration and Schema Management',
    slug: 'database-migration',
    category: 'deployment',
    description: 'Safe database migrations with rollback and validation',
    problem: 'Database migrations are high-risk operations. Manual scripts are error-prone, and rollbacks are difficult. Data loss is a constant concern.',
    solution: 'CodeBolt agents analyze schema changes, generate migration scripts, create rollback plans, test migrations on shadow databases, execute safely, and validate data integrity.',
    codeboltFeatures: [
      'Shadow environments for testing',
      'Multi-environment support',
      'Safe execution with review',
      'Rollback automation',
      'Data validation',
      'Knowledge graph for schema understanding'
    ],
    targetKeywords: [
      'automated database migration',
      'ai database tool',
      'schema migration with ai',
      'safe database migration',
      'codebolt database'
    ],
    personas: ['enterprise-architect', 'tech-lead', 'devops-champion'],
    outcome: 'Executed 127 migrations across 3 databases with zero data loss',
    metrics: [
      'Zero downtime',
      'Automatic rollback',
      'Data integrity validated',
      'Safe operations'
    ]
  },
  {
    id: 'continuous-integration',
    title: 'CI/CD Pipeline Optimization',
    slug: 'continuous-integration',
    category: 'deployment',
    description: 'Build and optimize CI/CD pipelines with AI',
    problem: 'CI/CD pipelines are complex, slow, and break frequently. Manual maintenance is tedious, and optimization requires specialized DevOps knowledge.',
    solution: 'CodeBolt agents analyze pipeline performance, identify bottlenecks, optimize build steps, implement caching strategies, add intelligent tests, and maintain pipeline configuration through memory-triggered updates.',
    codeboltFeatures: [
      'Pipeline analysis',
      'Background agents for monitoring',
      'Memory triggers for auto-updates',
      'External agent support for CI tools',
      'Knowledge graph for dependencies',
      'Job coordination for parallel builds'
    ],
    targetKeywords: [
      'ai cicd',
      'automated pipeline optimization',
      'ci cd with ai',
      'pipeline generator',
      'codebolt cicd'
    ],
    personas: ['devops-champion', 'tech-lead', 'startup-cto'],
    outcome: 'Reduced build time by 68% and pipeline maintenance by 90%',
    metrics: [
      'Faster builds',
      'Self-healing',
      'Auto-optimization',
      'Reduced maintenance'
    ]
  },
  {
    id: 'dependency-updates',
    title: 'Dependency Management and Updates',
    slug: 'dependency-updates',
    category: 'development',
    description: 'Safe and automated dependency updates',
    problem: 'Dependencies become outdated, have security vulnerabilities, and breaking changes cause issues. Manual updates are risky and time-consuming.',
    solution: 'CodeBolt agents monitor dependencies, assess update risks, create test plans, apply updates incrementally, run tests in parallel, and provide rollback options through job coordination.',
    codeboltFeatures: [
      'Memory triggers for monitoring',
      'Job coordination for parallel updates',
      'Automated testing',
      'Safe rollback',
      'Security vulnerability tracking',
      'Knowledge graph for dependency mapping'
    ],
    targetKeywords: [
      'automated dependency updates',
      'ai dependency management',
      'package update automation',
      'dependency security',
      'codebolt dependencies'
    ],
    personas: ['tech-lead', 'devops-champion', 'solo-developer'],
    outcome: 'Updated 847 packages across 42 projects with 2 breaking changes caught and fixed',
    metrics: [
      'Automated monitoring',
      'Risk assessment',
      'Safe updates',
      'Security maintained'
    ]
  },
  {
    id: 'code-explanation',
    title: 'Code Explanation and Learning',
    slug: 'code-explanation',
    category: 'documentation',
    description: 'Understand any codebase with AI-powered explanations',
    problem: 'Understanding new codebases, learning complex systems, and onboarding to projects takes weeks. Code comments are often missing or outdated.',
    solution: 'CodeBolt agents analyze code structure, explain functionality, trace data flow, document patterns, and create interactive learning experiences through knowledge graphs and context assembly.',
    codeboltFeatures: [
      'Knowledge graph for code relationships',
      'Context assembly for explanations',
      'Multi-agent code analysis',
      'Interactive documentation',
      'Learning path generation'
    ],
    targetKeywords: [
      'ai code explainer',
      'understand code with ai',
      'codebase documentation',
      'learn code with codebolt',
      'ai code analysis'
    ],
    personas: ['solo-developer', 'ai-ml-engineer', 'startup-cto'],
    outcome: 'Reduced developer onboarding from 4 weeks to 3 days',
    metrics: [
      'Fast understanding',
      'Interactive learning',
      'Comprehensive coverage',
      'Always available'
    ]
  },
  {
    id: 'bug-detection',
    title: 'Proactive Bug Detection',
    slug: 'bug-detection',
    category: 'testing',
    description: 'Find bugs before they reach production',
    problem: 'Bugs slip through to production, causing downtime and user frustration. Manual code review misses issues, and testing doesn\'t cover all edge cases.',
    solution: 'CodeBolt agents statically analyze code, identify potential bugs, suggest fixes, generate tests for edge cases, and learn from past bugs through the knowledge graph.',
    codeboltFeatures: [
      'Static analysis agents',
      'Knowledge graph for bug patterns',
      'Test generation for edge cases',
      'Memory for learning from bugs',
      'Deliberation for consensus'
    ],
    targetKeywords: [
      'ai bug detection',
      'automated bug finding',
      'static analysis with ai',
      'find bugs with codebolt',
      'prevent bugs with ai'
    ],
    personas: ['tech-lead', 'enterprise-architect', 'devops-champion'],
    outcome: 'Caught 234 potential bugs before production, preventing 47 critical issues',
    metrics: [
      'Early detection',
      'Comprehensive analysis',
      'Actionable fixes',
      'Continuous learning'
    ]
  }
];

// Helper functions
export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find(uc => uc.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
  return useCases.map(uc => uc.slug);
}

export function getUseCasesByCategory(category: UseCase['category']): UseCase[] {
  return useCases.filter(uc => uc.category === category);
}

export function getUseCasesByPersona(personaId: string): UseCase[] {
  return useCases.filter(uc => uc.personas.includes(personaId));
}

export function generateUseCaseMetadata(useCase: UseCase) {
  return {
    title: `${useCase.title} with CodeBolt | AI-Powered ${useCase.category}`,
    description: useCase.description,
    keywords: [
      `${useCase.slug} with codebolt`,
      `ai ${useCase.category}`,
      `automated ${useCase.category}`,
      `codebolt ${useCase.slug}`,
      ...useCase.targetKeywords
    ]
  };
}
