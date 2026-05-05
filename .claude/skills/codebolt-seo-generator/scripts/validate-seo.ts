#!/usr/bin/env tsx

/**
 * SEO Validation Script
 * Validates generated SEO pages against best practices
 */

interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  content: string;
  url: string;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

/**
 * Validate SEO metadata
 */
export function validateSEOMetadata(page: PageMetadata): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Title validation
  if (!page.title) {
    errors.push('Title is missing');
    score -= 20;
  } else if (page.title.length < 30) {
    warnings.push('Title is too short (should be 30-60 characters)');
    score -= 5;
  } else if (page.title.length > 60) {
    warnings.push('Title is too long (should be 30-60 characters)');
    score -= 5;
  } else {
    // Title length is good
  }

  // Description validation
  if (!page.description) {
    errors.push('Description is missing');
    score -= 20;
  } else if (page.description.length < 120) {
    warnings.push('Description is too short (should be 120-160 characters)');
    score -= 5;
  } else if (page.description.length > 160) {
    warnings.push('Description is too long (should be 120-160 characters)');
    score -= 5;
  }

  // Keywords validation
  if (!page.keywords || page.keywords.length === 0) {
    warnings.push('No keywords provided');
    score -= 5;
  } else if (page.keywords.length < 3) {
    warnings.push('Consider adding more keywords (aim for 5-10)');
    score -= 2;
  }

  // Content validation
  const wordCount = page.content.split(/\s+/).length;
  if (wordCount < 500) {
    warnings.push(`Content is too short (${wordCount} words, aim for 800+)`);
    score -= 10;
  } else if (wordCount < 800) {
    warnings.push(`Content could be longer (${wordCount} words, 800+ recommended)`);
    score -= 5;
  }

  // H1 validation
  const h1Match = page.content.match(/^#\s+(.+)$/m);
  if (!h1Match) {
    errors.push('Missing H1 heading');
    score -= 15;
  } else if (h1Match[1].length > 60) {
    warnings.push('H1 is too long (keep under 60 characters)');
    score -= 3;
  }

  // Keyword density check
  const primaryKeyword = page.keywords[0]?.toLowerCase();
  if (primaryKeyword) {
    const keywordRegex = new RegExp(primaryKeyword.replace(/\s+/g, '\\s+'), 'gi');
    const keywordCount = (page.content.match(keywordRegex) || []).length;
    const density = (keywordCount / wordCount) * 100;

    if (density < 0.5) {
      warnings.push(`Primary keyword density is low (${density.toFixed(2)}%, aim for 1-2%)`);
      score -= 5;
    } else if (density > 3) {
      warnings.push(`Primary keyword density is high (${density.toFixed(2)}%, aim for 1-2%)`);
      score -= 5;
    }
  }

  // Internal links check
  const internalLinkCount = (page.content.match(/\[.*?\]\(\/[^)]+\)/g) || []).length;
  if (internalLinkCount < 3) {
    warnings.push(`Few internal links (${internalLinkCount}, aim for 3-5)`);
    score -= 5;
  }

  // CTA check
  const hasCTA = /cta|get started|try.*free|download|sign up/i.test(page.content);
  if (!hasCTA) {
    warnings.push('No clear call-to-action found');
    score -= 10;
  }

  // URL validation
  const urlSlug = page.url.split('/').pop();
  if (urlSlug && urlSlug.length > 50) {
    warnings.push('URL slug is long (keep under 50 characters)');
    score -= 3;
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, score),
  };
}

/**
 * Validate structured data
 */
export function validateStructuredData(structuredData: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  try {
    const parsed = JSON.parse(structuredData);

    // Check for required fields
    if (!parsed['@context']) {
      errors.push('Missing @context in structured data');
    }
    if (!parsed['@type']) {
      errors.push('Missing @type in structured data');
    }

    // Validate against known types
    const validTypes = ['SoftwareApplication', 'Article', 'WebPage', 'Organization', 'Person'];
    if (parsed['@type'] && !validTypes.includes(parsed['@type'])) {
      errors.push(`Invalid @type: ${parsed['@type']}`);
    }

  } catch (error) {
    errors.push('Invalid JSON in structured data');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check for duplicate content
 */
export function checkDuplicateContent(
  content1: string,
  content2: string
): {
  similarity: number;
  isDuplicate: boolean;
} {
  // Normalize content for comparison
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const words1 = new Set(normalize(content1).split(' '));
  const words2 = new Set(normalize(content2).split(' '));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  const similarity = intersection.size / union.size;

  return {
    similarity,
    isDuplicate: similarity > 0.8, // 80% similarity threshold
  };
}

/**
 * Generate SEO report
 */
export function generateSEOReport(page: PageMetadata): string {
  const validation = validateSEOMetadata(page);
  const structuredDataValidation = validateStructuredData(
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: page.title,
    })
  );

  let report = '\n=== SEO Validation Report ===\n\n';
  report += `URL: ${page.url}\n`;
  report += `Score: ${validation.score}/100 (${validation.score >= 90 ? 'A' : validation.score >= 80 ? 'B' : validation.score >= 70 ? 'C' : validation.score >= 60 ? 'D' : 'F'})\n`;
  report += `Status: ${validation.valid ? '✅ PASS' : '❌ FAIL'}\n\n`;

  if (validation.errors.length > 0) {
    report += 'Errors:\n';
    validation.errors.forEach(error => {
      report += `  ❌ ${error}\n`;
    });
    report += '\n';
  }

  if (validation.warnings.length > 0) {
    report += 'Warnings:\n';
    validation.warnings.forEach(warning => {
      report += `  ⚠️  ${warning}\n`;
    });
    report += '\n';
  }

  report += 'Structured Data: ';
  report += structuredDataValidation.valid ? '✅ Valid\n' : '❌ Invalid\n';

  if (structuredDataValidation.errors.length > 0) {
    structuredDataValidation.errors.forEach(error => {
      report += `  ❌ ${error}\n`;
    });
  }

  report += '\n=== Recommendations ===\n\n';

  if (validation.score < 100) {
    if (validation.warnings.some(w => w.includes('title'))) {
      report += '• Optimize title length (30-60 characters)\n';
    }
    if (validation.warnings.some(w => w.includes('description'))) {
      report += '• Optimize description length (120-160 characters)\n';
    }
    if (validation.warnings.some(w => w.includes('short'))) {
      report += '• Add more content (aim for 800+ words)\n';
    }
    if (validation.warnings.some(w => w.includes('link'))) {
      report += '• Add more internal links (3-5 recommended)\n';
    }
    if (validation.warnings.some(w => w.includes('CTA'))) {
      report += '• Add a clear call-to-action\n';
    }
  } else {
    report += '✅ Page meets all SEO best practices!\n';
  }

  return report;
}

// CLI interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: validate-seo.ts <page-json>');
    console.log('Example: validate-seo.ts \'{"title":"...","description":"...","keywords":[],"content":"...","url":"..."}\'');
    process.exit(1);
  }

  try {
    const page: PageMetadata = JSON.parse(args[0]);
    const report = generateSEOReport(page);
    console.log(report);
    process.exit(validateSEOMetadata(page).valid ? 0 : 1);
  } catch (error) {
    console.error('Error parsing page JSON:', error);
    process.exit(1);
  }
}
