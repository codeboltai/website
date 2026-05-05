# Next.js Implementation Guide for CodeBolt PSEO

This guide shows how to implement the PSEO (Programmatic SEO) system in your Next.js website.

## Quick Start

### 1. Copy Files to Website

```bash
# Copy SEO files to website
cp -r seo /Users/utkarshshukla/Codebolt/website/src/lib/seo
```

### 2. Create Route Handlers

Create dynamic routes for each page type:

#### Comparison Pages (`/vs/[competitor]/page.tsx`)

```tsx
// app/vs/[competitor]/page.tsx
import { notFound } from 'next/navigation';
import { competitors, getCompetitorBySlug } from '@/lib/seo/data/competitors';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return competitors.map((competitor) => ({
    competitor: competitor.slug,
  }));
}

export async function generateMetadata({ params }: { params: { competitor: string } }): Promise<Metadata> {
  const competitor = getCompetitorBySlug(params.competitor);

  if (!competitor) {
    return {
      title: 'Comparison Not Found',
    };
  }

  return {
    title: `CodeBolt vs ${competitor.name} | Multi-Agent AI IDE`,
    description: `Compare CodeBolt's multi-agent swarm intelligence to ${competitor.name}. ${competitor.codeboltAdvantages[0]}.`,
    keywords: [
      `codebolt vs ${competitor.slug}`,
      ...competitor.targetKeywords,
    ],
    openGraph: {
      title: `CodeBolt vs ${competitor.name}`,
      description: competitor.description,
      type: 'website',
    },
  };
}

export default function ComparisonPage({ params }: { params: { competitor: string } }) {
  const competitor = getCompetitorBySlug(params.competitor);

  if (!competitor) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-6">CodeBolt vs {competitor.name}</h1>
        <p className="text-xl text-muted-foreground mb-8">
          {competitor.description}
        </p>

        {/* Quick Comparison Table */}
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-2xl font-semibold mb-4">Quick Comparison</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Feature</th>
                <th className="text-center p-2">CodeBolt</th>
                <th className="text-center p-2">{competitor.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Agent Architecture</td>
                <td className="text-center p-2 text-green-600">Multi-Agent Swarm</td>
                <td className="text-center p-2 text-muted-foreground">Single Agent</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Parallel Development</td>
                <td className="text-center p-2 text-green-600">Yes (5-10x)</td>
                <td className="text-center p-2 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Memory & Context</td>
                <td className="text-center p-2 text-green-600">Infinite Context</td>
                <td className="text-center p-2 text-muted-foreground">Limited</td>
              </tr>
              <tr>
                <td className="p-2">Local Deployment</td>
                <td className="text-center p-2 text-green-600">Yes</td>
                <td className="text-center p-2 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Why CodeBolt is Different</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {competitor.codeboltAdvantages.map((advantage, index) => (
            <div key={index} className="border rounded-lg p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">{advantage}</h3>
              <p className="text-muted-foreground">
                Experience the power of coordinated AI agents working together.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-primary/5 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Switch?</h2>
        <p className="text-xl mb-6">Get started with CodeBolt in minutes</p>
        <a
          href="/download"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
        >
          Start Free Trial
        </a>
      </section>

      {/* Related Comparisons */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Comparisons</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {competitors
            .filter(c => c.id !== competitor.id)
            .slice(0, 3)
            .map(c => (
              <a
                key={c.id}
                href={`/vs/${c.slug}`}
                className="border rounded-lg p-4 hover:border-primary transition-colors"
              >
                <h3 className="font-semibold">CodeBolt vs {c.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{c.description}</p>
              </a>
            ))}
        </div>
      </section>
    </div>
  );
}
```

#### Use Case Pages (`/use-cases/[use-case]/page.tsx`)

```tsx
// app/use-cases/[use-case]/page.tsx
import { notFound } from 'next/navigation';
import { useCases, getUseCaseBySlug } from '@/lib/seo/data/use-cases';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return useCases.map((useCase) => ({
    'use-case': useCase.slug,
  }));
}

export async function generateMetadata({ params }: { params: { 'use-case': string } }): Promise<Metadata> {
  const useCase = getUseCaseBySlug(params['use-case']);

  if (!useCase) {
    return { title: 'Use Case Not Found' };
  }

  return {
    title: `${useCase.title} with CodeBolt | AI-Powered ${useCase.category}`,
    description: useCase.description,
    keywords: useCase.targetKeywords,
  };
}

export default function UseCasePage({ params }: { params: { 'use-case': string } }) {
  const useCase = getUseCaseBySlug(params['use-case']);

  if (!useCase) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-6">{useCase.title}</h1>
        <p className="text-xl text-muted-foreground mb-8">{useCase.description}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">The Problem</h2>
        <p className="text-lg text-muted-foreground">{useCase.problem}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">The Solution</h2>
        <p className="text-lg text-muted-foreground">{useCase.solution}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Key CodeBolt Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {useCase.codeboltFeatures.map((feature, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h3 className="font-semibold">{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Results</h2>
        <p className="text-lg mb-4">{useCase.outcome}</p>
        <div className="grid md:grid-cols-3 gap-4">
          {useCase.metrics.map((metric, index) => (
            <div key={index} className="border rounded-lg p-4 bg-primary/5">
              <p className="font-semibold">{metric}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-primary/5 rounded-lg">
        <a
          href="/download"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
        >
          Start This Use Case
        </a>
      </section>
    </div>
  );
}
```

#### Persona Pages (`/for/[persona]/page.tsx`)

```tsx
// app/for/[persona]/page.tsx
import { notFound } from 'next/navigation';
import { personas, getPersonaBySlug } from '@/lib/seo/data/personas';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return personas.map((persona) => ({
    persona: persona.slug,
  }));
}

export async function generateMetadata({ params }: { params: { persona: string } }): Promise<Metadata> {
  const persona = getPersonaBySlug(params.persona);

  if (!persona) {
    return { title: 'Persona Not Found' };
  }

  return {
    title: `CodeBolt for ${persona.name} | ${persona.title}`,
    description: persona.description,
    keywords: persona.targetKeywords,
  };
}

export default function PersonaPage({ params }: { params: { persona: string } }) {
  const persona = getPersonaBySlug(params.persona);

  if (!persona) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-6">CodeBolt for {persona.title}s</h1>
        <p className="text-xl text-muted-foreground mb-4">{persona.description}</p>
        <p className="text-muted-foreground">{persona.companySize} | {persona.experience}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Your Challenges</h2>
        <ul className="space-y-2">
          {persona.challenges.map((challenge, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-500 mr-2">✗</span>
              <span>{challenge}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">How CodeBolt Helps</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Benefits</h3>
            <ul className="space-y-2">
              {persona.codeboltBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2">
              {persona.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">What Others Like You Say</h2>
        <div className="space-y-4">
          {persona.testimonials.map((testimonial, index) => (
            <blockquote key={index} className="border-l-4 border-primary pl-4 italic">
              "{testimonial}"
            </blockquote>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-primary/5 rounded-lg">
        <a
          href="/download"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90"
        >
          Start Free Trial
        </a>
      </section>
    </div>
  );
}
```

### 3. Generate Sitemap

Create `app/sitemap.ts` (or add to existing):

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { competitors } from '@/lib/seo/data/competitors';
import { useCases } from '@/lib/seo/data/use-cases';
import { personas } from '@/lib/seo/data/personas';
import { techStacks } from '@/lib/seo/data/languages';
import { industries } from '@/lib/seo/data/industries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://codebolt.ai';

  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Comparison pages
  const comparisonPages = competitors.map((competitor) => ({
    url: `${baseUrl}/vs/${competitor.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Use case pages
  const useCasePages = useCases.map((useCase) => ({
    url: `${baseUrl}/use-cases/${useCase.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Persona pages
  const personaPages = personas.map((persona) => ({
    url: `${baseUrl}/for/${persona.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Tech stack pages
  const techStackPages = techStacks.map((tech) => ({
    url: `${baseUrl}/tech/${tech.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Industry pages
  const industryPages = industries.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...corePages,
    ...comparisonPages,
    ...useCasePages,
    ...personaPages,
    ...techStackPages,
    ...industryPages,
  ];
}
```

### 4. Add Internal Links Component

Create `components/InternalLinks.tsx`:

```tsx
// components/InternalLinks.tsx
'use client';

import Link from 'next/link';

interface InternalLink {
  url: string;
  title: string;
  reason?: string;
}

interface InternalLinksProps {
  seeAlso?: InternalLink[];
  relatedComparisons?: InternalLink[];
  relatedUseCases?: InternalLink[];
  cta?: { url: string; text: string };
}

export function InternalLinks({
  seeAlso = [],
  relatedComparisons = [],
  relatedUseCases = [],
  cta
}: InternalLinksProps) {
  return (
    <aside className="border-l pl-6">
      <div className="mb-8">
        <h3 className="font-semibold mb-4">See Also</h3>
        <ul className="space-y-2">
          {seeAlso.map((link, index) => (
            <li key={index}>
              <Link href={link.url} className="text-primary hover:underline">
                {link.title}
              </Link>
              {link.reason && (
                <p className="text-sm text-muted-foreground">{link.reason}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {relatedComparisons.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Related Comparisons</h3>
          <ul className="space-y-2">
            {relatedComparisons.map((link, index) => (
              <li key={index}>
                <Link href={link.url} className="text-primary hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedUseCases.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Related Use Cases</h3>
          <ul className="space-y-2">
            {relatedUseCases.map((link, index) => (
              <li key={index}>
                <Link href={link.url} className="text-primary hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cta && (
        <div className="bg-primary/5 rounded-lg p-4">
          <Link href={cta.url} className="font-semibold text-primary">
            {cta.text} →
          </Link>
        </div>
      )}
    </aside>
  );
}
```

### 5. Build and Test

```bash
# Build the site
npm run build

# Test locally
npm run dev

# Visit generated pages
# - http://localhost:3000/vs/github-copilot
# - http://localhost:3000/vs/cursor
# - http://localhost:3000/use-cases/automated-refactoring
# - http://localhost:3000/for/startup-founders
# - http://localhost:3000/tech/python
# - http://localhost:3000/industries/fintech
```

## Page Count

This PSEO system generates:

- **15 comparison pages** (vs competitors)
- **16 use case pages**
- **8 persona pages**
- **15 tech stack pages**
- **10 industry pages**

**Total: 64+ SEO-optimized pages**

## Maintenance

### Adding New Competitors

1. Edit `seo/data/competitors.ts`
2. Add new competitor object to array
3. Rebuild site

### Adding New Use Cases

1. Edit `seo/data/use-cases.ts`
2. Add new use case object to array
3. Rebuild site

### Updating Content

1. Edit data files in `seo/data/`
2. Content automatically updates on rebuild
3. No manual page updates needed

## Analytics Integration

Add analytics tracking to measure PSEO performance:

```tsx
// Add to each page template
useEffect(() => {
  // Track page view
  analytics.track('PSEO Page View', {
    pageType: 'comparison',
    slug: params.competitor,
  });
}, [params.competitor]);
```

## A/B Testing

Test different content variations:

```tsx
// Use generateTitleVariations from seo-utils.ts
import { generateTitleVariations } from '@/lib/seo/utils/seo-utils';

const titleVariations = generateTitleVariations(baseTitle);
const selectedTitle = titleVariations[userBucket % titleVariations.length];
```

## Next Steps

1. ✅ Copy SEO files to website
2. ✅ Create route handlers
3. ✅ Generate sitemap
4. ⏳ Add robots.txt
5. ⏳ Add structured data
6. ⏳ Deploy and monitor
7. ⏳ Track keyword rankings
