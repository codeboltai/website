/**
 * Internal linking utilities for PSEO pages
 * Ensures hub-and-spoke model implementation
 */

export interface LinkNode {
  url: string;
  title: string;
  type: 'hub' | 'spoke' | 'related';
  category: string;
  priority: number;
}

export interface LinkGraph {
  nodes: Map<string, LinkNode>;
  edges: Map<string, string[]>;
}

/**
 * Internal link graph builder
 * Maintains relationships between all PSEO pages
 */
export class InternalLinkGraph {
  private graph: LinkGraph;

  constructor() {
    this.graph = {
      nodes: new Map(),
      edges: new Map()
    };
  }

  /**
   * Add a node to the graph
   */
  addNode(node: LinkNode): void {
    this.graph.nodes.set(node.url, node);
    if (!this.graph.edges.has(node.url)) {
      this.graph.edges.set(node.url, []);
    }
  }

  /**
   * Add an edge between two nodes
   */
  addEdge(from: string, to: string): void {
    if (this.graph.edges.has(from)) {
      this.graph.edges.get(from)!.push(to);
    }
  }

  /**
   * Get related pages for a given URL
   */
  getRelatedPages(url: string, maxLinks: number = 5): LinkNode[] {
    const links = this.graph.edges.get(url) || [];
    return links
      .map(linkUrl => this.graph.nodes.get(linkUrl))
      .filter((node): node is LinkNode => node !== undefined)
      .sort((a, b) => b.priority - a.priority)
      .slice(0, maxLinks);
  }

  /**
   * Build hub and spoke relationships
   */
  buildHubAndSpoke(hubUrl: string, spokeUrls: string[]): void {
    spokeUrls.forEach(spokeUrl => {
      // Link from hub to spoke
      this.addEdge(hubUrl, spokeUrl);
      // Link from spoke back to hub
      this.addEdge(spokeUrl, hubUrl);
    });

    // Link spokes to each other (cross-linking)
    spokeUrls.forEach((spoke1, i) => {
      spokeUrls.slice(i + 1).forEach(spoke2 => {
        this.addEdge(spoke1, spoke2);
        this.addEdge(spoke2, spoke1);
      });
    });
  }

  /**
   * Generate navigation links for a page
   */
  generateNavigation(url: string): {
    breadcrumb: LinkNode[];
    related: LinkNode[];
    hub: LinkNode | null;
  } {
    const related = this.getRelatedPages(url, 5);

    // Find hub (pages that link to this page with type 'hub')
    let hub: LinkNode | null = null;
    for (const [fromUrl, toUrls] of this.graph.edges.entries()) {
      if (toUrls.includes(url)) {
        const fromNode = this.graph.nodes.get(fromUrl);
        if (fromNode?.type === 'hub') {
          hub = fromNode;
          break;
        }
      }
    }

    // Generate breadcrumb
    const breadcrumb: LinkNode[] = [];
    if (hub) {
      breadcrumb.push(hub);
    }
    const currentNode = this.graph.nodes.get(url);
    if (currentNode) {
      breadcrumb.push(currentNode);
    }

    return { breadcrumb, related, hub };
  }
}

/**
 * Predefined hub pages
 */
export const hubPages = [
  {
    url: '/ai-code-assistant',
    title: 'AI Code Assistant',
    category: 'comparison'
  },
  {
    url: '/use-cases',
    title: 'Use Cases',
    category: 'use-cases'
  },
  {
    url: '/features',
    title: 'Features',
    category: 'features'
  },
  {
    url: '/integrations',
    title: 'Integrations',
    category: 'integrations'
  },
  {
    url: '/pricing',
    title: 'Pricing',
    category: 'business'
  }
];

/**
 * Build internal link graph from all PSEO pages
 */
export function buildLinkGraph(): InternalLinkGraph {
  const graph = new InternalLinkGraph();

  // Add hub pages
  hubPages.forEach(hub => {
    graph.addNode({
      ...hub,
      type: 'hub',
      priority: 10
    });
  });

  return graph;
}

/**
 * Generate internal links for a page type
 */
export function generatePageInternalLinks(
  pageType: 'comparison' | 'use-case' | 'persona' | 'tech-stack' | 'industry',
  pageSlug: string,
  pageTitle: string
): {
  seeAlso: Array<{ url: string; title: string; reason: string }>;
  relatedComparisons: Array<{ url: string; title: string }>;
  relatedUseCases: Array<{ url: string; title: string }>;
  cta: { url: string; text: string };
} {
  const baseUrl = 'https://codebolt.ai';

  // Generate links based on page type
  switch (pageType) {
    case 'comparison':
      return {
        seeAlso: [
          {
            url: `${baseUrl}/use-cases`,
            title: 'Use Cases',
            reason: 'See how CodeBolt accelerates different development workflows'
          },
          {
            url: `${baseUrl}/features`,
            title: 'Features',
            reason: 'Explore all features that make CodeBolt different'
          }
        ],
        relatedComparisons: [
          { url: `${baseUrl}/vs/cursor`, title: 'CodeBolt vs Cursor' },
          { url: `${baseUrl}/vs/devin`, title: 'CodeBolt vs Devin' },
          { url: `${baseUrl}/vs/windsurf`, title: 'CodeBolt vs Windsurf' }
        ],
        relatedUseCases: [
          { url: `${baseUrl}/use-cases/automated-refactoring`, title: 'Automated Refactoring' },
          { url: `${baseUrl}/use-cases/code-review`, title: 'Code Review' }
        ],
        cta: {
          url: `${baseUrl}/download`,
          text: 'Try CodeBolt Free'
        }
      };

    case 'use-case':
      return {
        seeAlso: [
          {
            url: `${baseUrl}/features`,
            title: 'Features',
            reason: 'Learn about the features that enable this use case'
          },
          {
            url: `${baseUrl}/for/startup-founders`,
            title: 'For Startup Founders',
            reason: 'See how startups use this use case'
          }
        ],
        relatedComparisons: [
          { url: `${baseUrl}/vs/github-copilot`, title: 'vs GitHub Copilot' },
          { url: `${baseUrl}/vs/cursor`, title: 'vs Cursor' }
        ],
        relatedUseCases: [
          { url: `${baseUrl}/use-cases/automated-testing`, title: 'Automated Testing' },
          { url: `${baseUrl}/use-cases/feature-development`, title: 'Feature Development' },
          { url: `${baseUrl}/use-cases/documentation-generation`, title: 'Documentation' }
        ],
        cta: {
          url: `${baseUrl}/download`,
          text: 'Start This Use Case'
        }
      };

    case 'persona':
      return {
        seeAlso: [
          {
            url: `${baseUrl}/use-cases`,
            title: 'Use Cases',
            reason: 'See how your persona can benefit from different use cases'
          },
          {
            url: `${baseUrl}/features`,
            title: 'Features',
            reason: 'Explore features relevant to your role'
          }
        ],
        relatedComparisons: [
          { url: `${baseUrl}/vs/github-copilot`, title: 'vs GitHub Copilot' },
          { url: `${baseUrl}/vs/cursor`, title: 'vs Cursor' }
        ],
        relatedUseCases: [
          { url: `${baseUrl}/use-cases/code-review`, title: 'Code Review' },
          { url: `${baseUrl}/use-cases/feature-development`, title: 'Feature Development' }
        ],
        cta: {
          url: `${baseUrl}/download`,
          text: 'Start Free Trial'
        }
      };

    case 'tech-stack':
      return {
        seeAlso: [
          {
            url: `${baseUrl}/use-cases`,
            title: 'Use Cases',
            reason: 'See CodeBolt in action with this tech stack'
          },
          {
            url: `${baseUrl}/features`,
            title: 'Features',
            reason: 'Learn about features specific to this stack'
          }
        ],
        relatedComparisons: [
          { url: `${baseUrl}/vs/github-copilot`, title: 'vs GitHub Copilot' },
          { url: `${baseUrl}/vs/cursor`, title: 'vs Cursor' }
        ],
        relatedUseCases: [
          { url: `${baseUrl}/use-cases/feature-development`, title: 'Feature Development' },
          { url: `${baseUrl}/use-cases/api-integration`, title: 'API Integration' }
        ],
        cta: {
          url: `${baseUrl}/download`,
          text: 'Build with This Stack'
        }
      };

    case 'industry':
      return {
        seeAlso: [
          {
            url: `${baseUrl}/use-cases`,
            title: 'Use Cases',
            reason: 'See industry-specific use cases'
          },
          {
            url: `${baseUrl}/features`,
            title: 'Features',
            reason: 'Explore features for this industry'
          }
        ],
        relatedComparisons: [
          { url: `${baseUrl}/vs/github-copilot`, title: 'vs GitHub Copilot' },
          { url: `${baseUrl}/vs/cursor`, title: 'vs Cursor' }
        ],
        relatedUseCases: [
          { url: `${baseUrl}/use-cases/security-audit`, title: 'Security Auditing' },
          { url: `${baseUrl}/use-cases/automated-testing`, title: 'Automated Testing' }
        ],
        cta: {
          url: `${baseUrl}/contact`,
          text: 'Contact Sales'
        }
      };

    default:
      return {
        seeAlso: [],
        relatedComparisons: [],
        relatedUseCases: [],
        cta: { url: `${baseUrl}/download`, text: 'Get Started' }
      };
  }
}

/**
 * Generate breadcrumb data
 */
export function generateBreadcrumb(
  pageType: string,
  _pageSlug: string,
  pageTitle: string
): Array<{ url: string; title: string }> {
  const baseUrl = 'https://codebolt.ai';

  const breadcrumb = [
    { url: baseUrl, title: 'Home' }
  ];

  // Add category level
  switch (pageType) {
    case 'comparison':
      breadcrumb.push({
        url: `${baseUrl}/vs`,
        title: 'Comparisons'
      });
      break;
    case 'use-case':
      breadcrumb.push({
        url: `${baseUrl}/use-cases`,
        title: 'Use Cases'
      });
      break;
    case 'persona':
      breadcrumb.push({
        url: `${baseUrl}/for`,
        title: 'For You'
      });
      break;
    case 'tech-stack':
      breadcrumb.push({
        url: `${baseUrl}/tech`,
        title: 'Technologies'
      });
      break;
    case 'industry':
      breadcrumb.push({
        url: `${baseUrl}/industries`,
        title: 'Industries'
      });
      break;
  }

  // Add current page
  breadcrumb.push({
    url: `${baseUrl}/${pageType === 'comparison' ? 'vs' : pageType}/${_pageSlug}`,
    title: pageTitle
  });

  return breadcrumb;
}

/**
 * Generate schema.org markup for internal links
 */
export function generateLinkSchema(links: Array<{ url: string; title: string }>): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: links.map((link, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        '@id': link.url,
        name: link.title
      }
    }))
  });
}
