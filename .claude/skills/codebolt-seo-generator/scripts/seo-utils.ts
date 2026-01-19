/**
 * SEO utility functions for PSEO pages
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

/**
 * Generate SEO metadata for a PSEO page
 */
export function generateSEOMetadata(config: {
  title: string;
  description: string;
  keywords: string[];
  slug?: string;
  baseUrl?: string;
  ogImage?: string;
  noindex?: boolean;
}): SEOMetadata {
  const { title, description, keywords, slug, baseUrl = 'https://codebolt.ai', ogImage, noindex } = config;

  return {
    title: title.length <= 60 ? title : title.substring(0, 57) + '...',
    description: description.length <= 160 ? description : description.substring(0, 157) + '...',
    keywords: keywords.slice(0, 10), // Limit to 10 keywords
    ogImage: ogImage || `${baseUrl}/images/og/default.png`,
    canonical: slug ? `${baseUrl}/${slug}` : baseUrl,
    noindex: noindex || false
  };
}

/**
 * Generate JSON-LD structured data
 */
export function generateStructuredData(config: {
  type: 'SoftwareApplication' | 'Article' | 'WebPage' | 'Product';
  name: string;
  description: string;
  url?: string;
  image?: string;
  additionalData?: Record<string, any>;
}): string {
  const { type, name, description, url, image, additionalData } = config;

  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    ...(url && { url }),
    ...(image && { image }),
    ...additionalData
  };

  return JSON.stringify(baseData);
}

/**
 * Generate SoftwareApplication structured data for CodeBolt
 */
export function generateCodeBoltStructuredData(pageTitle?: string) {
  return generateStructuredData({
    type: 'SoftwareApplication',
    name: pageTitle || 'CodeBolt',
    description: 'Multi-agent AI IDE for autonomous software development',
    url: 'https://codebolt.ai',
    image: 'https://codebolt.ai/images/og/codebolt.png',
    additionalData: {
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '234'
      }
    }
  });
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{
  name: string;
  url: string;
}>) {
  const itemListElement = breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url
  }));

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  });
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{
  question: string;
  answer: string;
}>) {
  const mainEntity = faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }));

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity
  });
}

/**
 * Generate reading time estimate
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Extract keywords from content
 */
export function extractKeywords(content: string, limit: number = 10): string[] {
  // Common words to filter out
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'the', 'this', 'but', 'they', 'have',
    'had', 'what', 'when', 'where', 'who', 'which', 'why', 'how'
  ]);

  // Extract words and count frequency
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Count frequency
  const frequency = new Map<string, number>();
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });

  // Sort by frequency and return top keywords
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

/**
 * Generate meta description
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove markdown and special characters
  const cleanContent = content
    .replace(/[#*`_\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Truncate at word boundary
  const truncated = cleanContent.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');

  return truncated.substring(0, lastSpace) + '...';
}

/**
 * Generate variations of a title for testing
 */
export function generateTitleVariations(baseTitle: string): string[] {
  const variations: string[] = [];

  // Original
  variations.push(baseTitle);

  // With year
  variations.push(`${baseTitle} (${new Date().getFullYear()})`);

  // With "Best"
  variations.push(`Best ${baseTitle}`);

  // With "Top"
  variations.push(`Top ${baseTitle}`);

  // With "Complete Guide"
  variations.push(`${baseTitle}: Complete Guide`);

  // With comparison
  variations.push(`${baseTitle} vs Traditional Development`);

  return variations;
}

/**
 * Check for duplicate content
 */
export function checkDuplicateContent(content1: string, content2: string): number {
  // Simple similarity check using Jaccard similarity
  const words1 = new Set(content1.toLowerCase().split(/\s+/));
  const words2 = new Set(content2.toLowerCase().split(/\s+/));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

/**
 * Generate internal link suggestions
 */
export function generateInternalLinks(
  currentPage: string,
  allPages: string[],
  maxLinks: number = 5
): string[] {
  // Simple algorithm to find related pages
  // In production, this would use more sophisticated similarity matching

  const currentPageWords = new Set(
    currentPage
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3)
  );

  const scored = allPages
    .filter(page => page !== currentPage)
    .map(page => {
      const pageWords = new Set(
        page
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .split(/\s+/)
          .filter(w => w.length > 3)
      );

      let score = 0;
      currentPageWords.forEach(word => {
        if (pageWords.has(word)) score++;
      });

      return { page, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxLinks)
    .map(item => item.page);

  return scored;
}

/**
 * Generate alt text for images
 */
export function generateAltText(context: string, imageSubject: string): string {
  return `${imageSubject} for ${context.replace(/\s+/g, ' ').trim()}`;
}

/**
 * Validate SEO metadata
 */
export function validateSEOMetadata(metadata: SEOMetadata): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Title validation
  if (!metadata.title) {
    errors.push('Title is required');
  } else if (metadata.title.length < 30) {
    warnings.push('Title is too short (should be 30-60 characters)');
  } else if (metadata.title.length > 60) {
    warnings.push('Title is too long (should be 30-60 characters)');
  }

  // Description validation
  if (!metadata.description) {
    errors.push('Description is required');
  } else if (metadata.description.length < 120) {
    warnings.push('Description is too short (should be 120-160 characters)');
  } else if (metadata.description.length > 160) {
    warnings.push('Description is too long (should be 120-160 characters)');
  }

  // Keywords validation
  if (!metadata.keywords || metadata.keywords.length === 0) {
    warnings.push('No keywords provided');
  }

  // Canonical validation
  if (metadata.canonical && !metadata.canonical.startsWith('http')) {
    errors.push('Canonical URL must start with http:// or https://');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
