/**
 * SEO Core - Centralized SEO metadata and schema generation
 *
 * This module extracts SEO logic from individual pages into a dedicated system.
 * Following the principles from @kalashbuilds' PSEO architecture for scale.
 *
 * Core principles:
 * 1. Metadata as a factory, not inline code
 * 2. Schema as composable builders
 * 3. Content uniqueness enforcement
 * 4. Internal linking as a graph engine
 * 5. Pages as first-class entities with intent and keywords
 */

/**
 * Page Entity Model
 * Every page should be a first-class entity, not just a slug
 */
export interface PageEntity {
  // Core identity
  id: string;
  slug: string;
  url: string;

  // SEO intent
  intent: 'informational' | 'transactional' | 'navigational';
  primaryKeyword: string;
  supportingKeywords: string[];

  // Content classification
  category: string; // e.g., 'comparison', 'use-case', 'persona', 'tech-stack', 'industry'
  template: string; // Which template this page uses
  schemaType: 'article' | 'webpage' | 'softwareapplication' | 'product' | 'faqpage' | 'howto';

  // Relationships (graph structure)
  parentHub?: string; // Parent hub page URL
  siblingPages: string[]; // Related pages at same level
  childSpokes: string[]; // Long-tail variations this hub points to
  relatedPages: string[]; // Contextually related pages

  // Content metadata
  lastModified: string;
  wordCount: number;
  contentHash?: string; // For duplicate detection

  // Quality metrics
  seoScore?: number; // 0-100
  completeness: number; // 0-100 (percentage of required sections)
}

/**
 * Metadata Factory
 * Generates consistent, validated SEO metadata for pages
 */
export class MetadataFactory {
  private siteConfig: SiteConfig;

  constructor(config: Partial<SiteConfig> = {}) {
    this.siteConfig = {
      siteName: 'CodeBolt',
      siteUrl: 'https://codebolt.ai',
      defaultLocale: 'en',
      twitterHandle: '@codebolt',
      ...config
    };
  }

  /**
   * Generate page metadata from page entity
   */
  generateMetadata(entity: PageEntity): PageMetadata {
    const title = this.generateTitle(entity);
    const description = this.generateDescription(entity);
    const keywords = this.generateKeywords(entity);
    const canonical = `${this.siteConfig.siteUrl}${entity.url}`;
    const ogImage = this.generateOGImage(entity);

    return {
      title,
      description,
      keywords,
      canonical,
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: this.siteConfig.siteName,
        images: [ogImage],
        type: entity.schemaType === 'article' ? 'article' : 'website',
      },
      twitter: {
        card: 'summary_large_image',
        site: this.siteConfig.twitterHandle,
        creator: this.siteConfig.twitterHandle,
        title: description,
        description,
        images: [ogImage],
      },
    };
  }

  private generateTitle(entity: PageEntity): string {
    const templates = {
      comparison: `${entity.primaryKeyword} vs ${entity.title} | ${this.siteConfig.siteName}`,
      'use-case': `${entity.primaryKeyword} with ${this.siteConfig.siteName} | ${entity.category}`,
      persona: `${this.siteConfig.siteName} for ${entity.title} | ${this.siteConfig.siteName}`,
      'tech-stack': `${this.siteConfig.siteName} for ${entity.primaryKeyword} | AI-Powered ${entity.category}`,
      industry: `${this.siteConfig.siteName} for ${entity.title} | ${this.siteConfig.siteName}`,
    };

    const template = templates[entity.category] || templates['use-case'];
    let title = template.replace('{keyword}', entity.primaryKeyword);

    // Ensure title length constraints
    if (title.length < 30) {
      title += ` | ${this.siteConfig.siteName}`;
    } else if (title.length > 60) {
      title = title.substring(0, 57) + '...';
    }

    return title;
  }

  private generateDescription(entity: PageEntity): string {
    const templates = {
      comparison: `Compare ${this.siteConfig.siteName}'s ${entity.category.toLowerCase()} to ${entity.title}. ${entity.supportingKeywords[0] || ''}. ${entity.supportingKeywords[1] || ''}.`,
      'use-case': `${entity.primaryKeyword} with ${this.siteConfig.siteName}. ${entity.supportingKeywords[0] || ''}. Achieve ${entity.supportingKeywords[1] || ''}.`,
      persona: `${this.siteConfig.siteName} helps ${entity.title.toLowerCase()} achieve ${entity.primaryKeyword.toLowerCase()}. ${entity.supportingKeywords[0] || ''}.`,
      'tech-stack': `Accelerate ${entity.primaryKeyword} development with ${this.siteConfig.siteName}. ${entity.supportingKeywords[0] || ''}.`,
      industry: `${this.siteConfig.siteName} for ${entity.title}: ${entity.supportingKeywords[0] || ''}.`,
    };

    let description = templates[entity.category] || templates['use-case'];

    // Replace keyword placeholders
    description = description.replace(/\{keyword\}/g, entity.primaryKeyword);

    // Ensure length constraints
    if (description.length < 120) {
      description += ` ${this.siteConfig.siteName} delivers ${entity.primaryKeyword.toLowerCase()}.`;
    } else if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }

    return description;
  }

  private generateKeywords(entity: PageEntity): string[] {
    // Combine primary, supporting, and related keywords
    const keywords = [
      entity.primaryKeyword,
      ...entity.supportingKeywords.slice(0, 4),
    ];

    // Add category-specific keywords
    const categoryKeywords = {
      comparison: [`${this.siteConfig.siteName.toLowerCase()} vs ${entity.title.toLowerCase()}`, `${entity.title.toLowerCase()} alternative`],
      'use-case': [`ai ${entity.category.toLowerCase()}`, `automated ${entity.category.toLowerCase()}`],
      persona: [`${this.siteConfig.siteName.toLowerCase()} for ${entity.slug}`, `ai for ${entity.slug}`],
      'tech-stack': [`ai ${entity.primaryKeyword.toLowerCase()}`, `${entity.primaryKeyword.toLowerCase()} development`],
      industry: [`${this.siteConfig.siteName.toLowerCase()} for ${entity.slug}`, `${entity.slug.toLowerCase()} software development`],
    };

    return [...keywords, ...(categoryKeywords[entity.category] || [])];
  }

  private generateOGImage(entity: PageEntity): string {
    return `${this.siteConfig.siteUrl}/images/og/${entity.category}-${entity.slug}.png`;
  }
}

/**
 * Schema Builder
 * Composable schema.json-ld builders for different content types
 */
export class SchemaBuilder {
  /**
   * Build SoftwareApplication schema
   */
  static buildSoftwareApplication(options: {
    name: string;
    description: string;
    url?: string;
    applicationCategory?: string;
    offers?: {
      price?: string;
      priceCurrency?: string;
    };
    aggregateRating?: {
      ratingValue: number;
      ratingCount: number;
    };
  }): string {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: options.name,
      description: options.description,
      applicationCategory: options.applicationCategory || 'DeveloperApplication',
      offers: {
        '@type': 'Offer',
        price: options.offers?.price || '0',
        priceCurrency: options.offers?.priceCurrency || 'USD',
      },
    };

    if (options.url) {
      schema.url = options.url;
    }

    if (options.aggregateRating) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: options.aggregateRating.ratingValue,
        ratingCount: options.aggregateRating.ratingCount,
      };
    }

    return JSON.stringify(schema);
  }

  /**
   * Build Article schema
   */
  static buildArticle(options: {
    headline: string;
    description: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    url?: string;
  }): string {
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: options.headline,
      description: options.description,
    };

    if (options.author) {
      schema.author = {
        '@type': 'Person',
        name: options.author,
      };
    }

    if (options.datePublished) {
      schema.datePublished = options.datePublished;
    }

    if (options.dateModified) {
      schema.dateModified = options.dateModified;
    }

    if (options.url) {
      schema.url = options.url;
    }

    return JSON.stringify(schema);
  }

  /**
   * Build BreadcrumbList schema
   */
  static buildBreadcrumb(breadcrumbs: Array<{
    name: string;
    url: string;
  }>): string {
    const itemListElement = breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    }));

    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    });
  }

  /**
   * Build FAQPage schema
   */
  static buildFAQPage(faqs: Array<{
    question: string;
    answer: string;
  }>): string {
    const mainEntity = faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    }));

    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity,
    });
  }

  /**
   * Compose multiple schemas for a page
   */
  static composeSchemas(...schemas: string[]): string {
    return schemas.join('\n\n');
  }
}

/**
 * Site Configuration
 */
export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  defaultLocale: string;
  twitterHandle: string;
  defaultOGImage?: string;
  organizationName?: string;
}

/**
 * Page Metadata output type
 */
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{ url: string }>;
    type: 'article' | 'website';
  };
  twitter?: {
    card: 'summary' | 'summary_large_image';
    site: string;
    creator: string;
    title: string;
    description: string;
    images: Array<{ url: string }>;
  };
}

/**
 * Content Uniqueness Validator
 * Enforces content quality at scale
 */
export class ContentUniquenessValidator {
  private minWordCount: Record<string, number>;
  private keywordOverlapThreshold: number;

  constructor(
    minWordCount: Record<string, number> = {},
    keywordOverlapThreshold: number = 0.7
  ) {
    this.minWordCount = {
      comparison: 800,
      'use-case': 600,
      persona: 600,
      'tech-stack': 500,
      industry: 700,
      ...minWordCount
    };
    this.keywordOverlapThreshold = keywordOverlapThreshold;
  }

  /**
   * Validate page entity for uniqueness
   */
  validate(entity: PageEntity): {
    valid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];
    let valid = true;

    // Check minimum word count
    const minWords = this.minWordCount[entity.category] || 500;
    if (entity.wordCount < minWords) {
      errors.push(`Content too short: ${entity.wordCount} words (minimum ${minWords})`);
      valid = false;
    }

    // Check FAQ count for applicable pages
    if (entity.schemaType === 'faqpage') {
      const faqCount = this.extractFAQCount(entity);
      if (faqCount < 3) {
        errors.push(`FAQ page needs at least 3 FAQs (found ${faqCount})`);
        valid = false;
      }
    }

    // Check keyword overlap with siblings (cannibalization)
    if (this.checkKeywordOverlap(entity)) {
      warnings.push('High keyword overlap detected with sibling pages');
    }

    return { valid, errors, warnings };
  }

  /**
   * Detect duplicate/near-duplicate content
   */
  detectDuplicate(
    entity: PageEntity,
    existingEntities: PageEntity[]
  ): {
    isDuplicate: boolean;
    similarity: number;
    duplicateWith?: string;
  } {
    for (const existing of existingEntities) {
      if (entity.id === existing.id) continue;

      const similarity = this.calculateSimilarity(entity, existing);

      if (similarity > 0.85) {
        return {
          isDuplicate: true,
          similarity,
          duplicateWith: existing.id,
        };
      }
    }

    return { isDuplicate: false, similarity: 0 };
  }

  private calculateSimilarity(e1: PageEntity, e2: PageEntity): number {
    // Calculate similarity based on:
    // - Primary keyword match
    // - Supporting keyword overlap
    // - Category match
    // - Title similarity
    // URL structure similarity

    let score = 0;

    // Primary keyword exact match
    if (e1.primaryKeyword === e2.primaryKeyword) {
      score += 0.3;
    } else if (e1.primaryKeyword.toLowerCase().includes(e2.primaryKeyword.toLowerCase()) ||
               e2.primaryKeyword.toLowerCase().includes(e1.primaryKeyword.toLowerCase())) {
      score += 0.15;
    }

    // Supporting keyword overlap
    const overlap1 = e1.supportingKeywords.filter(k =>
      e2.supportingKeywords.some(k2 => k.toLowerCase() === k2.toLowerCase())
    );
    score += (overlap1.length / Math.max(e1.supportingKeywords.length, e2.supportingKeywords.length)) * 0.3;

    // Category match
    if (e1.category === e2.category) {
      score += 0.2;
    }

    // Title similarity (word overlap)
    const words1 = e1.title.toLowerCase().split(/\s+/);
    const words2 = e2.title.toLowerCase().split(/\s+/);
    const titleOverlap = words1.filter(w => words2.includes(w));
    score += (titleOverlap.length / Math.max(words1.length, words2.length)) * 0.2;

    return score;
  }

  private extractFAQCount(entity: PageEntity): number {
    // Count FAQ items - this would be loaded from the entity's content
    // For now, return a placeholder
    return entity.wordCount > 0 ? 3 : 0;
  }

  private checkKeywordOverlap(entity: PageEntity): boolean {
    // Check if this page's keywords significantly overlap with siblings
    // This would be calculated against siblingPages
    return false; // Placeholder
  }
}

/**
 * Internal Linking Graph Engine
 * Treats internal linking as a graph (hubs and spokes), not a list
 */
export class InternalLinkingGraph {
  private nodes: Map<string, PageNode>;
  private edges: Map<string, string[]>;

  constructor() {
    this.nodes = new Map();
    this.edges = new Map();
  }

  /**
   * Add a page node to the graph
   */
  addPage(entity: PageEntity): void {
    const node: PageNode = {
      id: entity.id,
      url: entity.url,
      title: entity.title,
      type: entity.intent, // informational, transactional, navigational
      category: entity.category,
      parentHub: entity.parentHub,
      priority: this.calculatePriority(entity),
    };

    this.nodes.set(entity.id, node);
    this.edges.set(entity.id, []);
  }

  /**
   * Add an edge between pages
   */
  addEdge(fromId: string, toId: string): void {
    if (this.edges.has(fromId)) {
      const edges = this.edges.get(fromId)!;
      if (!edges.includes(toId)) {
        edges.push(toId);
      }
    }
  }

  /**
   * Get parent hub for a page
   */
  getParentHub(entity: PageEntity): PageNode | null {
    if (!entity.parentHub) return null;
    return this.nodes.get(entity.parentHub);
  }

  /**
   * Get sibling pages (pages at same level)
   */
  getSiblings(entity: PageEntity): PageNode[] {
    if (!entity.parentHub) return [];

    const siblings = this.nodes.get(entity.parentHub)?.childSpokes || [];
    return siblings
      .filter(id => id !== entity.id)
      .map(id => this.nodes.get(id))
      .filter((n): n is PageNode) ?? [];
  }

  /**
   * Get related pages based on intent and category
   */
  getRelatedPages(
    entity: PageEntity,
    maxResults: number = 5
  ): PageNode[] {
    // Get related pages based on:
    // 1. Same intent (informational/transactional/navigational)
    // 2. Same or related category
    // 3. Keyword overlap
    // 4. Graph proximity (siblings, parent hub children)

    const related = new Map<string, PageNode>();

    // Add siblings first (same level)
    const siblings = this.getSiblings(entity);
    siblings.forEach(sibling => {
      related.set(sibling.id, sibling);
    });

    // Add parent hub
    const parent = this.getParentHub(entity);
    if (parent) {
      related.set(parent.id, parent);
    }

    // Add pages with similar keywords
    this.nodes.forEach((node, nodeId) => {
      if (nodeId === entity.id) return;

      const keywordOverlap = this.calculateKeywordOverlap(entity, node);
      if (keywordOverlap > 0.3 && related.size < maxResults) {
        related.set(nodeId, node);
      }
    });

    // Convert to array and sort by priority
    return Array.from(related.values())
      .sort((a, b) => b.priority - a.priority)
      .slice(0, maxResults);
  }

  /**
   * Get breadcrumb trail for a page
   */
  getBreadcrumb(entity: PageEntity): PageNode[] {
    const breadcrumb: PageNode[] = [];

    // Add current page
    const currentPage = this.nodes.get(entity.id);
    if (currentPage) {
      breadcrumb.push(currentPage);
    }

    // Add parent hubs recursively
    let current = entity.parentHub;
    let depth = 0;
    const maxDepth = 5; // Prevent infinite loops

    while (current && depth < maxDepth) {
      const hub = this.nodes.get(current);
      if (hub && !breadcrumb.find(b => b.id === hub.id)) {
        breadcrumb.unshift(hub);
        current = hub.parentHub;
      } else {
        break;
      }
      depth++;
    }

    // Add home page
    const home = this.nodes.get('home');
    if (home && !breadcrumb.find(b => b.id === home.id)) {
      breadcrumb.unshift(home);
    }

    return breadcrumb;
  }

  /**
   * Generate suggested internal links for a page
   */
  generateInternalLinks(entity: PageEntity): InternalLinkSuggestions {
    const relatedPages = this.getRelatedPages(entity, 5);
    const breadcrumb = this.getBreadcrumb(entity);

    return {
      seeAlso: relatedPages.map(node => ({
        url: node.url,
        title: node.title,
        reason: this.getLinkReason(entity, node),
      })),
      relatedPages: relatedPages.map(node => ({
        url: node.url,
        title: node.title,
      })),
      breadcrumb: breadcrumb.map(node => ({
        url: node.url,
        title: node.title,
      })),
      cta: {
        url: this.getCTAUrl(entity),
        text: this.getCTAText(entity),
      },
    };
  }

  private calculatePriority(entity: PageEntity): number {
    let priority = 50; // Base priority

    // Boost transactional intent
    if (entity.intent === 'transactional') {
      priority += 20;
    }

    // Boost based on SEO score
    if (entity.seoScore) {
      priority += entity.seoScore / 5;
    }

    // Boost recently modified
    const daysSinceModified = (Date.now() - new Date(entity.lastModified).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceModified < 30) {
      priority += 10;
    }

    return Math.min(100, priority);
  }

  private calculateKeywordOverlap(entity1: PageEntity, entity2: PageNode): number {
    // Calculate keyword overlap between page entity and node
    const keywords1 = [entity1.primaryKeyword, ...entity1.supportingKeywords];
    const keywords2 = entity2.title.toLowerCase().split(/\s+/);

    const overlap = keywords1.filter(k =>
      keywords2.some(k2 => k2.toLowerCase().includes(k.toLowerCase()))
    );

    return overlap.length / Math.max(keywords1.length, 1);
  }

  private getLinkReason(entity: PageEntity, target: PageNode): string {
    const reasons = {
      'informational-comparison': 'See another comparison',
      'informational-same-category': 'More in this category',
      'transactional-upgrade': 'Upgrade your experience',
      'navigational-home': 'Return to overview',
    };

    // Generate reason based on intents and categories
    if (entity.intent === 'transactional' && target.intent === 'informational') {
      return 'Learn more before you buy';
    }

    if (entity.category === target.category && entity.id !== target.id) {
      return 'Explore related features';
    }

    return 'Related content';
  }

  private getCTAUrl(entity: PageEntity): string {
    const ctas = {
      transactional: '/download',
      informational: '/features',
      navigational: '/overview',
    };

    return ctas[entity.intent] || '/download';
  }

  private getCTAText(entity: PageEntity): string {
    const texts = {
      transactional: 'Get Started Free',
      informational: 'Learn More',
      navigational: 'Explore',
    };

    return texts[entity.intent] || 'Learn More';
  }
}

/**
 * Page Node in the internal linking graph
 */
interface PageNode {
  id: string;
  url: string;
  title: string;
  type: 'informational' | 'transactional' | 'navigational';
  category: string;
  parentHub?: string;
  priority: number;
}

/**
 * Internal link suggestions for a page
 */
export interface InternalLinkSuggestions {
  seeAlso: Array<{
    url: string;
    title: string;
    reason: string;
  }>;
  relatedPages: Array<{
    url: string;
    title: string;
  }>;
  breadcrumb: Array<{
    url: string;
    title: string;
  }>;
  cta: {
    url: string;
    text: string;
  };
}

/**
 * Sitemap Generator for scale
 * Handles 100k+ pages efficiently
 */
export class SitemapGenerator {
  private pageSize = 50000; // URLs per sitemap file (Google limit)
  private siteUrl: string;

  constructor(siteUrl: string = 'https://codebolt.ai') {
    this.siteUrl = siteUrl;
  }

  /**
   * Generate sitemap index and category-based sitemaps
   */
  generateSitemaps(entities: PageEntity[]): {
    // Group entities by category
    const byCategory = new Map<string, PageEntity[]>();
    entities.forEach(entity => {
      if (!byCategory.has(entity.category)) {
        byCategory.set(entity.category, []);
      }
      byCategory.get(entity.category)!.push(entity);
    });

    // Generate sitemap index
    const sitemapIndex = this.generateSitemapIndex(byCategory);

    // Generate category sitemaps
    const categorySitemaps = new Map<string, string>();
    byCategory.forEach((entities, category) => {
      categorySitemaps.set(category, this.generateCategorySitemap(category, entities));
    });

    return {
      index: sitemapIndex,
      sitemaps: categorySitemaps,
    };
  }

  private generateSitemapIndex(byCategory: Map<string, PageEntity[]>): string {
    const sitemaps: Array<{ url: string; lastModified: string }> = [];

    byCategory.forEach((entities, category) => {
      sitemaps.push({
        url: `${this.siteUrl}/sitemap-${category}.xml`,
        lastModified: this.getLatestDate(entities),
      });
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${this.siteUrl}/sitemap.xml</loc>
    <lastmod>${this.getCurrentDate()}</lastmod>
  </sitemap>
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastModified}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

    return xml;
  }

  private generateCategorySitemap(category: string, entities: PageEntity[]): string {
    const urlCount = entities.length;
    const pageCount = Math.ceil(urlCount / this.pageSize);

    // Split into multiple pages if needed
    const pages: Array<{ url: string; page: number }> = [];

    for (let page = 0; page < pageCount; page++) {
      const start = page * this.pageSize;
      const end = Math.min(start + this.pageSize, urlCount);
      const pageEntities = entities.slice(start, end);

      const pageUrl = pageCount === 1
        ? `${this.siteUrl}/sitemap-${category}.xml`
        : `${this.siteUrl}/sitemap-${category}-${page + 1}.xml`;

      pages.push({
        url: pageUrl,
        page: page + 1,
      });
    }

    // Return first page (for simplicity - in production would generate all)
    return this.generateSitemapXML(entities.slice(0, this.pageSize), category);
  }

  private generateSitemapXML(entities: PageEntity[], category?: string): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
${category ? `  xmlns:xhtml="http://www.w3.org/1999/xhtml"` : ''}>
${entities.map(entity => `  <url>
    <loc>${this.siteUrl}${entity.url}</loc>
    <lastmod>${entity.lastModified}</lastmod>
    <changefreq>${entity.lastModified === this.getCurrentDate() ? 'weekly' : 'monthly'}</changefreq>
    <priority>${entity.intent === 'transactional' ? '1.0' : entity.intent === 'informational' ? '0.8' : '0.5'}</priority>
  </url>`).join('\n')}
</urlset>`;

    return xml;
  }

  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getLatestDate(entities: PageEntity[]): string {
    return entities
      .map(e => e.lastModified)
      .sort()
      .reverse()[0];
  }
}

/**
 * Site Configuration for SEO
 */
export const siteConfig: SiteConfig = {
  siteName: 'CodeBolt',
  siteUrl: 'https://codebolt.ai',
  defaultLocale: 'en',
  twitterHandle: '@codeboltai',
  organizationName: 'CodeBolt Inc.',
};

/**
 * Utility function to create a PageEntity
 */
export function createPageEntity(
  id: string,
  data: Partial<PageEntity>
): PageEntity {
  return {
    id,
    slug: data.slug || id,
    url: data.url || `/${id}`,
    intent: data.intent || 'informational',
    primaryKeyword: data.primaryKeyword || '',
    supportingKeywords: data.supportingKeywords || [],
    category: data.category || 'use-case',
    template: data.template || 'default',
    schemaType: data.schemaType || 'webpage',
    parentHub: data.parentHub,
    siblingPages: data.siblingPages || [],
    childSpokes: data.childSpokes || [],
    relatedPages: data.relatedPages || [],
    lastModified: data.lastModified || new Date().toISOString().split('T')[0],
    wordCount: data.wordCount || 0,
    contentHash: data.contentHash,
    seoScore: data.seoScore,
    completeness: data.completeness || 100,
  };
}

/**
 * Get all page entities (would load from data in production)
 */
export function getAllPageEntities(): PageEntity[] {
  // In production, this would load from the data layer
  // For now, return empty array
  return [];
}

/**
 * Get page entity by ID
 */
export function getPageEntity(id: string): PageEntity | undefined {
  // In production, this would load from the data layer
  return undefined;
}

/**
 * Check if a page entity already exists
 */
export function pageEntityExists(id: string): boolean {
  // In production, this would check the data layer
  return false;
}

/**
 * Generate full SEO output for a page
 * Combines metadata, schema, and internal links
 */
export function generateSEOOutput(
  entity: PageEntity
): {
  metadata: PageMetadata;
  schema: string;
  internalLinks: InternalLinkSuggestions;
  } {
  const factory = new MetadataFactory(siteConfig);
  const validator = new ContentUniquenessValidator();
  const graph = new InternalLinkingGraph();

  // Add page to graph for internal linking
  graph.addPage(entity);

  // Generate metadata
  const metadata = factory.generateMetadata(entity);

  // Generate schema
  const schemaBuilder = new SchemaBuilder();
  let schema: string;

  if (entity.schemaType === 'softwareapplication') {
    // Would load actual app details
    schema = schemaBuilder.buildSoftwareApplication({
      name: entity.title,
      description: metadata.description,
      url: metadata.canonical,
    });
  } else if (entity.schemaType === 'article') {
    schema = schemaBuilder.buildArticle({
      headline: entity.title,
      description: metadata.description,
      dateModified: entity.lastModified,
      url: metadata.canonical,
    });
  } else {
    schema = schemaBuilder.buildSoftwareApplication({
      name: entity.title,
      description: metadata.description,
      url: metadata.canonical,
    });
  }

  // Add breadcrumb schema
  const breadcrumb = graph.getBreadcrumb(entity);
  if (breadcrumb.length > 1) {
    const breadcrumbSchema = SchemaBuilder.buildBreadcrumb(
      breadcrumb.map(node => ({
        name: node.title,
        url: node.url,
      }))
    );
    schema = SchemaBuilder.composeSchemas(schema, breadcrumbSchema);
  }

  // Generate internal links
  const internalLinks = graph.generateInternalLinks(entity);

  return {
    metadata,
    schema,
    internalLinks,
  };
}
