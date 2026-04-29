/**
 * PSEO Page Generator
 * Generates static pages for Next.js from data sources
 */

import { competitors } from '../data/competitors';
import { useCases } from '../data/use-cases';
import { personas } from '../data/personas';
import { techStacks } from '../data/languages';
import { industries } from '../data/industries';
import { generateStructuredData } from '../utils/seo-utils';

export interface GeneratedPage {
  path: string;
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  content: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    sections: Array<{
      type: 'comparison' | 'features' | 'testimonials' | 'faq' | 'cta';
      content: any;
    }>;
    sidebar: {
      relatedPages: Array<{ url: string; title: string }>;
      cta: { url: string; text: string };
    };
  };
  structuredData: string;
}

/**
 * Generate comparison pages (vs competitors)
 */
export function generateComparisonPages(): GeneratedPage[] {
  const pages: GeneratedPage[] = [];

  for (const competitor of competitors) {
    const page: GeneratedPage = {
      path: `/vs/${competitor.slug}`,
      metadata: {
        title: `CodeBolt vs ${competitor.name} | Multi-Agent AI IDE Comparison`,
        description: `Compare CodeBolt's multi-agent swarm intelligence to ${competitor.name}. ${competitor.codeboltAdvantages.slice(0, 2).join('. ')}.`,
        keywords: [
          `codebolt vs ${competitor.slug}`,
          `codebolt vs ${competitor.name.toLowerCase()}`,
          `${competitor.slug} alternative`,
          'multi-agent ai ide',
          ...competitor.targetKeywords.slice(0, 5)
        ],
        ogImage: `/images/og/vs-${competitor.slug}.png`
      },
      content: {
        hero: {
          title: `CodeBolt vs ${competitor.name}`,
          subtitle: `${competitor.codeboltAdvantages[0]}`,
          cta: 'Try CodeBolt Free'
        },
        sections: [
          {
            type: 'comparison',
            content: {
              competitor: {
                name: competitor.name,
                description: competitor.description,
                strengths: competitor.strengths,
                weaknesses: competitor.weaknesses
              },
              codebolt: {
                advantages: competitor.codeboltAdvantages
              }
            }
          },
          {
            type: 'features',
            content: {
              title: 'Why CodeBolt is Different',
              features: competitor.codeboltAdvantages.map(adv => ({
                title: adv.split(' ').slice(0, 5).join(' '),
                description: adv
              }))
            }
          },
          {
            type: 'cta',
            content: {
              title: `Ready to switch from ${competitor.name}?`,
              description: 'Get started with CodeBolt in minutes',
              cta: 'Start Free Trial'
            }
          }
        ],
        sidebar: {
          relatedPages: [
            { url: '/vs/cursor', title: 'vs Cursor' },
            { url: '/vs/devin', title: 'vs Devin' },
            { url: '/vs/windsurf', title: 'vs Windsurf' }
          ],
          cta: { url: '/download', text: 'Download CodeBolt' }
        }
      },
      structuredData: generateStructuredData({
        type: 'SoftwareApplication',
        name: `CodeBolt vs ${competitor.name}`,
        description: `Compare CodeBolt and ${competitor.name}`,
        additionalData: {
          applicationCategory: 'DeveloperApplication',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        }
      })
    };

    pages.push(page);
  }

  return pages;
}

/**
 * Generate use case pages
 */
export function generateUseCasePages(): GeneratedPage[] {
  const pages: GeneratedPage[] = [];

  for (const useCase of useCases) {
    const page: GeneratedPage = {
      path: `/use-cases/${useCase.slug}`,
      metadata: {
        title: `${useCase.title} with CodeBolt | AI-Powered ${useCase.category}`,
        description: useCase.description,
        keywords: [
          `${useCase.slug} with codebolt`,
          `ai ${useCase.category}`,
          `automated ${useCase.category}`,
          `codebolt ${useCase.slug}`,
          ...useCase.targetKeywords.slice(0, 5)
        ],
        ogImage: `/images/og/use-cases-${useCase.slug}.png`
      },
      content: {
        hero: {
          title: useCase.title,
          subtitle: useCase.description,
          cta: 'Start This Use Case'
        },
        sections: [
          {
            type: 'features',
            content: {
              title: 'The Problem',
              problem: useCase.problem,
              title2: 'The Solution',
              solution: useCase.solution
            }
          },
          {
            type: 'features',
            content: {
              title: 'Key CodeBolt Features',
              features: useCase.codeboltFeatures.map(feature => ({
                title: feature,
                description: `${feature} enables this use case`
              }))
            }
          },
          {
            type: 'features',
            content: {
              title: 'Results & Metrics',
              metrics: useCase.metrics,
              outcome: useCase.outcome
            }
          },
          {
            type: 'cta',
            content: {
              title: `Achieve ${useCase.metrics[0] || 'Better Results'}`,
              description: useCase.outcome,
              cta: 'Get Started Free'
            }
          }
        ],
        sidebar: {
          relatedPages: useCases
            .filter(uc => uc.category === useCase.category && uc.id !== useCase.id)
            .slice(0, 3)
            .map(uc => ({ url: `/use-cases/${uc.slug}`, title: uc.title })),
          cta: { url: '/download', text: 'Try This Use Case' }
        }
      },
      structuredData: generateStructuredData({
        type: 'Article',
        name: useCase.title,
        description: useCase.description,
        additionalData: {
          articleSection: useCase.category,
          about: {
            '@type': 'Thing',
            name: 'CodeBolt'
          }
        }
      })
    };

    pages.push(page);
  }

  return pages;
}

/**
 * Generate persona pages
 */
export function generatePersonaPages(): GeneratedPage[] {
  const pages: GeneratedPage[] = [];

  for (const persona of personas) {
    const page: GeneratedPage = {
      path: `/for/${persona.slug}`,
      metadata: {
        title: `CodeBolt for ${persona.name} | ${persona.title}`,
        description: persona.description,
        keywords: [
          `codebolt for ${persona.slug}`,
          `ai for ${persona.slug}`,
          `${persona.slug} development tools`,
          ...persona.targetKeywords.slice(0, 5)
        ],
        ogImage: `/images/og/for-${persona.slug}.png`
      },
      content: {
        hero: {
          title: `CodeBolt for ${persona.title}s`,
          subtitle: persona.description,
          cta: 'Start Free Trial'
        },
        sections: [
          {
            type: 'features',
            content: {
              title: 'Your Challenges',
              challenges: persona.challenges
            }
          },
          {
            type: 'features',
            content: {
              title: 'How CodeBolt Helps',
              benefits: persona.codeboltBenefits,
              features: persona.keyFeatures
            }
          },
          {
            type: 'testimonials',
            content: {
              title: 'What Others Like You Say',
              testimonials: persona.testimonials
            }
          },
          {
            type: 'cta',
            content: {
              title: `Join ${persona.name}s Using CodeBolt`,
              description: persona.goals[0],
              cta: 'Get Started Now'
            }
          }
        ],
        sidebar: {
          relatedPages: persona.relatedPersonas.map(p => ({
            url: `/for/${p}`,
            title: personas.find(per => per.id === p)?.name || p
          })),
          cta: { url: '/download', text: 'Start Free Trial' }
        }
      },
      structuredData: generateStructuredData({
        type: 'SoftwareApplication',
        name: `CodeBolt for ${persona.name}`,
        description: persona.description,
        additionalData: {
          applicationCategory: 'DeveloperApplication',
          audience: {
            '@type': 'Audience',
            audienceType: persona.title
          }
        }
      })
    };

    pages.push(page);
  }

  return pages;
}

/**
 * Generate tech stack pages
 */
export function generateTechStackPages(): GeneratedPage[] {
  const pages: GeneratedPage[] = [];

  for (const tech of techStacks) {
    const page: GeneratedPage = {
      path: `/tech/${tech.slug}`,
      metadata: {
        title: `CodeBolt for ${tech.name} | AI-Powered ${tech.category}`,
        description: `Accelerate ${tech.name} development with CodeBolt's multi-agent AI. ${tech.codeboltBenefits.slice(0, 2).join('. ')}.`,
        keywords: [
          `codebolt for ${tech.slug}`,
          `ai ${tech.slug} development`,
          `${tech.slug} code generator`,
          `ai for ${tech.slug} developers`,
          ...tech.targetKeywords.slice(0, 5)
        ],
        ogImage: `/images/og/tech-${tech.slug}.png`
      },
      content: {
        hero: {
          title: `CodeBolt for ${tech.name}`,
          subtitle: `${tech.description} with multi-agent AI acceleration`,
          cta: 'Build with This Stack'
        },
        sections: [
          {
            type: 'features',
            content: {
              title: 'Why Use CodeBolt with ' + tech.name,
              benefits: tech.codeboltBenefits,
              features: tech.features
            }
          },
          {
            type: 'features',
            content: {
              title: 'Common ' + tech.name + ' Use Cases',
              useCases: tech.useCases
            }
          },
          {
            type: 'cta',
            content: {
              title: `Start Building with ${tech.name}`,
              description: 'Get AI-powered development for your stack',
              cta: 'Get Started Free'
            }
          }
        ],
        sidebar: {
          relatedPages: tech.relatedStacks.slice(0, 4).map(t => ({
            url: `/tech/${t}`,
            title: techStacks.find(ts => ts.id === t)?.name || t
          })),
          cta: { url: '/download', text: 'Build with This Stack' }
        }
      },
      structuredData: generateStructuredData({
        type: 'SoftwareApplication',
        name: `CodeBolt for ${tech.name}`,
        description: tech.description,
        additionalData: {
          applicationCategory: 'DeveloperApplication',
          about: {
            '@type': 'Thing',
            name: tech.name
          }
        }
      })
    };

    pages.push(page);
  }

  return pages;
}

/**
 * Generate industry pages
 */
export function generateIndustryPages(): GeneratedPage[] {
  const pages: GeneratedPage[] = [];

  for (const industry of industries) {
    const page: GeneratedPage = {
      path: `/industries/${industry.slug}`,
      metadata: {
        title: `CodeBolt for ${industry.name} | AI-Powered ${industry.name} Development`,
        description: `Accelerate ${industry.name.toLowerCase()} software development with CodeBolt. ${industry.codeboltSolutions.slice(0, 2).join('. ')}. Built for ${industry.compliance.join(', ')} compliance.`,
        keywords: [
          `codebolt for ${industry.slug}`,
          `ai ${industry.slug} development`,
          `${industry.slug} software tools`,
          `${industry.slug.toLowerCase()} development`,
          ...industry.targetKeywords.slice(0, 5)
        ],
        ogImage: `/images/og/industries-${industry.slug}.png`
      },
      content: {
        hero: {
          title: `CodeBolt for ${industry.name}`,
          subtitle: industry.description,
          cta: 'Contact Sales'
        },
        sections: [
          {
            type: 'features',
            content: {
              title: `${industry.name} Challenges`,
              challenges: industry.keyChallenges
            }
          },
          {
            type: 'features',
            content: {
              title: 'How CodeBolt Helps',
              solutions: industry.codeboltSolutions,
              developmentNeeds: industry.developmentNeeds
            }
          },
          {
            type: 'features',
            content: {
              title: 'Common Use Cases',
              useCases: industry.useCases
            }
          },
          {
            type: 'features',
            content: {
              title: 'Compliance',
              compliance: industry.compliance
            }
          },
          {
            type: 'cta',
            content: {
              title: `Transform Your ${industry.name} Development`,
              description: industry.codeboltSolutions[0],
              cta: 'Contact Sales'
            }
          }
        ],
        sidebar: {
          relatedPages: industries
            .filter(i => i.id !== industry.id)
            .slice(0, 4)
            .map(i => ({ url: `/industries/${i.slug}`, title: i.name })),
          cta: { url: '/contact', text: 'Contact Sales' }
        }
      },
      structuredData: generateStructuredData({
        type: 'SoftwareApplication',
        name: `CodeBolt for ${industry.name}`,
        description: industry.description,
        additionalData: {
          applicationCategory: 'DeveloperApplication',
          industry: industry.name
        }
      })
    };

    pages.push(page);
  }

  return pages;
}

/**
 * Generate all PSEO pages
 */
export function generateAllPSEOPages(): GeneratedPage[] {
  return [
    ...generateComparisonPages(),
    ...generateUseCasePages(),
    ...generatePersonaPages(),
    ...generateTechStackPages(),
    ...generateIndustryPages()
  ];
}

/**
 * Generate sitemap entries
 */
export function generateSitemapEntries(): Array<{
  url: string;
  lastModified: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
}> {
  const pages = generateAllPSEOPages();
  const baseUrl = 'https://codebolt.ai';

  return pages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: page.path.startsWith('/vs/') ? 0.8 : 0.7
  }));
}

/**
 * Get page count by type
 */
export function getPageCounts() {
  return {
    comparisons: competitors.length,
    useCases: useCases.length,
    personas: personas.length,
    techStacks: techStacks.length,
    industries: industries.length,
    total: competitors.length + useCases.length + personas.length + techStacks.length + industries.length
  };
}
