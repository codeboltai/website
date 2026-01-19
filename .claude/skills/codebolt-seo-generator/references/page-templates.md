# Page Templates

Detailed templates for each SEO page type.

## Comparison Page Template

```tsx
// app/vs/[competitor]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { competitor: string } }): Promise<Metadata> {
  return {
    title: `CodeBolt vs ${competitorName} | Multi-Agent AI IDE Comparison`,
    description: `Compare CodeBolt's multi-agent swarm intelligence to ${competitorName}. ${primaryAdvantage}.`,
    keywords: [`codebolt vs ${slug}`, `${slug} alternative`, 'multi-agent ai ide'],
    openGraph: {
      title: `CodeBolt vs ${competitorName}`,
      description: competitorDescription,
      type: 'website',
    },
  };
}

export default function ComparisonPage() {
  return (
    <div>
      {/* Hero */}
      <section>
        <h1>CodeBolt vs {competitorName}</h1>
        <p>{tagline}</p>
      </section>

      {/* Quick Comparison Table */}
      <section>
        <h2>Quick Comparison</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>CodeBolt</th>
              <th>{competitorName}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Agent Architecture</td>
              <td>Multi-Agent Swarm</td>
              <td>Single Agent</td>
            </tr>
            {/* More rows */}
          </tbody>
        </table>
      </section>

      {/* Key Advantages */}
      <section>
        <h2>Why CodeBolt is Different</h2>
        {advantages.map(adv => (
          <div key={adv.id}>
            <h3>{adv.title}</h3>
            <p>{adv.description}</p>
          </div>
        ))}
      </section>

      {/* Detailed Comparison */}
      <section>
        <h2>Feature-by-Feature Comparison</h2>
        {featureComparisons.map(feature => (
          <div key={feature.id}>
            <h3>{feature.name}</h3>
            <p><strong>CodeBolt:</strong> {feature.codebolt}</p>
            <p><strong>{competitorName}:</strong> {feature.competitor}</p>
          </div>
        ))}
      </section>

      {/* When to Choose */}
      <section>
        <h2>When to Choose Each</h2>
        <div>
          <h3>Choose CodeBolt if you need:</h3>
          <ul>
            {chooseCodebolt.map(reason => <li key={reason}>{reason}</li>)}
          </ul>
        </div>
        <div>
          <h3>Choose {competitorName} if you need:</h3>
          <ul>
            {chooseCompetitor.map(reason => <li key={reason}>{reason}</li>)}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section>
        <h2>Ready to switch from {competitorName}?</h2>
        <a href="/download">Start Free Trial</a>
      </section>

      {/* Related Comparisons */}
      <section>
        <h2>Related Comparisons</h2>
        {relatedComparisons.map(comp => (
          <a key={comp.slug} href={`/vs/${comp.slug}`}>
            {comp.name}
          </a>
        ))}
      </section>
    </div>
  );
}
```

## Use Case Page Template

```tsx
// app/use-cases/[use-case]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { 'use-case': string } }): Promise<Metadata> {
  return {
    title: `${useCaseTitle} with CodeBolt | AI-Powered ${category}`,
    description: useCaseDescription,
    keywords: [`${slug} with codebolt`, `ai ${category}`, `automated ${category}`],
  };
}

export default function UseCasePage() {
  return (
    <div>
      {/* Hero */}
      <section>
        <h1>{useCaseTitle}</h1>
        <p>{description}</p>
        <a href="/download">Start This Use Case</a>
      </section>

      {/* Problem */}
      <section>
        <h2>The Challenge</h2>
        <p>{problem}</p>
        <ul>
          {painPoints.map(pain => <li key={pain}>{pain}</li>)}
        </ul>
      </section>

      {/* Solution */}
      <section>
        <h2>How CodeBolt Solves It</h2>
        <p>{solution}</p>
        <div className="workflow">
          <h3>Workflow</h3>
          <ol>
            {workflowSteps.map(step => <li key={step}>{step}</li>)}
          </ol>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2>Key CodeBolt Features</h2>
        {features.map(feature => (
          <div key={feature.id}>
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
            <p><strong>Why it matters:</strong> {feature.value}</p>
          </div>
        ))}
      </section>

      {/* Results */}
      <section>
        <h2>Results & Metrics</h2>
        <p className="outcome">{outcome}</p>
        <div className="metrics">
          {metrics.map(metric => (
            <div key={metric} className="metric">
              <p>{metric}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example/Case Study */}
      {caseStudy && (
        <section>
          <h2>Real-World Example</h2>
          <div className="case-study">
            <h3>{caseStudy.title}</h3>
            <p>{caseStudy.description}</p>
            <p><strong>Result:</strong> {caseStudy.result}</p>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section>
        <h2>Frequently Asked Questions</h2>
        {faqs.map(faq => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section>
        <h2>Achieve {primaryMetric}</h2>
        <p>{outcome}</p>
        <a href="/download">Get Started Free</a>
      </section>

      {/* Related Use Cases */}
      <section>
        <h2>Related Use Cases</h2>
        {relatedUseCases.map(useCase => (
          <a key={useCase.slug} href={`/use-cases/${useCase.slug}`}>
            {useCase.title}
          </a>
        ))}
      </section>
    </div>
  );
}
```

## Persona Page Template

```tsx
// app/for/[persona]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { persona: string } }): Promise<Metadata> {
  return {
    title: `CodeBolt for ${personaName} | ${personaTitle}`,
    description: personaDescription,
    keywords: [`codebolt for ${slug}`, `ai for ${slug}`, `${slug} development tools`],
  };
}

export default function PersonaPage() {
  return (
    <div>
      {/* Hero */}
      <section>
        <h1>CodeBolt for {personaTitle}s</h1>
        <p>{description}</p>
        <div className="profile">
          <p><strong>Company Size:</strong> {companySize}</p>
          <p><strong>Experience:</strong> {experience}</p>
        </div>
      </section>

      {/* Challenges */}
      <section>
        <h2>Your Challenges</h2>
        <ul className="challenges">
          {challenges.map(challenge => (
            <li key={challenge} className="challenge">
              <span className="icon">✗</span>
              <span>{challenge}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Goals */}
      <section>
        <h2>Your Goals</h2>
        <ul className="goals">
          {goals.map(goal => (
            <li key={goal}>
              <span className="icon">→</span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Benefits */}
      <section>
        <h2>How CodeBolt Helps</h2>
        <div className="benefits-features">
          <div>
            <h3>Benefits</h3>
            <ul>
              {benefits.map(benefit => (
                <li key={benefit}>
                  <span className="icon">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Key Features</h3>
            <ul>
              {features.map(feature => (
                <li key={feature}>
                  <span className="icon">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2>What {personaName}s Say</h2>
        {testimonials.map((testimonial, index) => (
          <blockquote key={index} className="testimonial">
            <p>"{testimonial.quote}"</p>
            <cite>— {testimonial.author}</cite>
          </blockquote>
        ))}
      </section>

      {/* Success Metrics */}
      <section>
        <h2>Success Metrics</h2>
        {metrics.map(metric => (
          <div key={metric.name} className="metric">
            <h3>{metric.name}</h3>
            <p>{metric.description}</p>
            <p className="value"><strong>Target:</strong> {metric.target}</p>
          </div>
        ))}
      </section>

      {/* Journey */}
      <section>
        <h2>Your Journey with CodeBolt</h2>
        <div className="timeline">
          {journey.map((stage, index) => (
            <div key={index} className="stage">
              <h3>Stage {index + 1}: {stage.name}</h3>
              <p>{stage.description}</p>
              <p><strong>Duration:</strong> {stage.duration}</p>
              <p><strong>Success:</strong> {stage.success}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <h2>Join {personaName}s Using CodeBolt</h2>
        <p>{primaryGoal}</p>
        <a href="/download">Start Free Trial</a>
      </section>

      {/* Related Personas */}
      <section>
        <h2>Related Roles</h2>
        {relatedPersonas.map(persona => (
          <a key={persona.slug} href={`/for/${persona.slug}`}>
            {persona.name}
          </a>
        ))}
      </section>
    </div>
  );
}
```

## Tech Stack Page Template

```tsx
// app/tech/[stack]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { stack: string } }): Promise<Metadata> {
  return {
    title: `CodeBolt for ${stackName} | AI-Powered ${category}`,
    description: `Accelerate ${stackName} development with CodeBolt's multi-agent AI.`,
    keywords: [`codebolt for ${slug}`, `ai ${slug} development`, `${slug} code generator`],
  };
}

export default function TechStackPage() {
  return (
    <div>
      {/* Hero */}
      <section>
        <h1>CodeBolt for {stackName}</h1>
        <p>{description} with multi-agent AI acceleration</p>
        <a href="/download">Build with {stackName}</a>
      </section>

      {/* Overview */}
      <section>
        <h2>About {stackName}</h2>
        <p>{stackDescription}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Popularity:</strong> {popularity}</p>
      </section>

      {/* Common Use Cases */}
      <section>
        <h2>Common {stackName} Use Cases</h2>
        <div className="use-cases">
          {useCases.map(useCase => (
            <div key={useCase} className="use-case">
              <h3>{useCase}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CodeBolt Benefits */}
      <section>
        <h2>Why Use CodeBolt with {stackName}</h2>
        {benefits.map(benefit => (
          <div key={benefit.id}>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
            <div className="example">
              <p><strong>Example:</strong> {benefit.example}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section>
        <h2>Key Features for {stackName}</h2>
        {features.map(feature => (
          <div key={feature.id}>
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
            {feature.code && (
              <pre><code>{feature.code}</code></pre>
            )}
          </div>
        ))}
      </section>

      {/* Integration */}
      <section>
        <h2>Seamless Integration</h2>
        <p>{integrationDescription}</p>
        <div className="integration-points">
          {integrations.map(integration => (
            <div key={integration.name}>
              <h3>{integration.name}</h3>
              <p>{integration.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Technologies */}
      <section>
        <h2>Related Technologies</h2>
        <p>CodeBolt also supports these related technologies:</p>
        <div className="related">
          {relatedStacks.map(stack => (
            <a key={stack.slug} href={`/tech/${stack.slug}`}>
              {stack.name}
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <h2>Start Building with {stackName}</h2>
        <p>Get AI-powered development for your {stackName} projects</p>
        <a href="/download">Get Started Free</a>
      </section>
    </div>
  );
}
```

## Industry Page Template

```tsx
// app/industries/[industry]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { industry: string } }): Promise<Metadata> {
  return {
    title: `CodeBolt for {industryName} | AI-Powered {industry} Development`,
    description: `Accelerate {industry} software development with CodeBolt.`,
    keywords: [`codebolt for ${slug}`, `ai ${slug} development`],
  };
}

export default function IndustryPage() {
  return (
    <div>
      {/* Hero */}
      <section>
        <h1>CodeBolt for {industryName}</h1>
        <p>{description}</p>
        <a href="/contact">Contact Sales</a>
      </section>

      {/* Challenges */}
      <section>
        <h2>{industryName} Challenges</h2>
        <ul>
          {challenges.map(challenge => <li key={challenge}>{challenge}</li>)}
        </ul>
      </section>

      {/* Solutions */}
      <section>
        <h2>How CodeBolt Helps</h2>
        {solutions.map(solution => (
          <div key={solution.id}>
            <h3>{solution.title}</h3>
            <p>{solution.description}</p>
          </div>
        ))}
      </section>

      {/* Use Cases */}
      <section>
        <h2>Common Use Cases</h2>
        <div className="use-cases">
          {useCases.map(useCase => (
            <div key={useCase.id}>
              <h3>{useCase.name}</h3>
              <p>{useCase.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance */}
      <section>
        <h2>Compliance & Security</h2>
        <p>CodeBolt supports {industryName} compliance requirements:</p>
        <ul>
          {compliance.map(req => <li key={req}>{req}</li>)}
        </ul>
      </section>

      {/* CTA */}
      <section>
        <h2>Transform Your {industryName} Development</h2>
        <p>{solutions[0].title}</p>
        <a href="/contact">Contact Sales</a>
      </section>

      {/* Related Industries */}
      <section>
        <h2>Related Industries</h2>
        {relatedIndustries.map(industry => (
          <a key={industry.slug} href={`/industries/${industry.slug}`}>
            {industry.name}
          </a>
        ))}
      </section>
    </div>
  );
}
```

## Component Patterns

### Section Wrapper
```tsx
function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
```

### Feature Grid
```tsx
function FeatureGrid({ features }: { features: Array<{ title: string; description: string }> }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### CTA Section
```tsx
function CTA({ title, description, buttonText, buttonLink }: CTAProps) {
  return (
    <section className="py-12 bg-primary/5 rounded-lg text-center">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-xl mb-6">{description}</p>
      <a
        href={buttonLink}
        className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
      >
        {buttonText}
      </a>
    </section>
  );
}
```

## Content Patterns

### Problem-Agitate-Solution
```markdown
## [Problem Statement]

[Describe the problem the user is facing]

### Why It's Hard

[List specific pain points with examples]

### The Cost

[Quantify the impact: time, money, frustration]

## How CodeBolt Solves It

[Present the solution]

### Before & After

| Before | After |
|--------|-------|
| [Pain point] | [Solution benefit] |
```

### Feature-Benefit-Proof
```markdown
## [Feature Name]

**What it is:** [Brief description]

**Why it matters:** [Business/user value]

**How it works:** [High-level explanation]

**Results:** [Concrete metrics or outcomes]
```

### Persona-Problem-Solution
```markdown
## For [Persona]

**[Persona name] faces:**
- [Challenge 1]
- [Challenge 2]

**CodeBolt delivers:**
- [Benefit 1]
- [Benefit 2]

**Result:** [Transformation story]
```
