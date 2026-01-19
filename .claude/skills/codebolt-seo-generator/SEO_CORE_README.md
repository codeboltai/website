# SEO Core - Production-Grade PSEO Architecture

## Overview

The **SEO Core** is a dedicated system (from @kalashbuilds' PSEO architecture) that transforms PSEO from generating pages to managing them as a system. This is CRUCIAL for scaling to 100k+ pages without creating "indexed junk."

## The Problem with Traditional PSEO

### Why Most PSEO Fails at Scale

```typescript
// ❌ WRONG: Generate thousands of pages from keywords
// ❌ Reuse same layout with minor text changes
// ❌ Ship massive sitemap
// ❌ Hope Google figures it out
```

### Common Failure Modes

1. **Thin or duplicate content** → Gets ignored by Google
2. **Keyword cannibalization** → Pages compete for same keywords
3. **Static builds time out** → Cannot handle 100k+ pages
4. **Internal linking is nonexistent** → Wasted crawl budget
5. **Sitemap becomes unmanageable** → Hard to maintain
6. **Metadata logic is duplicated** → Inconsistent SEO
7. **Content freshness** → No content governance

## The Solution: Separation of Concerns

### Phase 1: SEO Core (Before Pages)

**Extract SEO logic into a dedicated module** (`seo-core.ts`)

```typescript
// ✅ RIGHT: Metadata as a factory
import { MetadataFactory } from './seo-core';
const metadata = MetadataFactory.generateMetadata(pageEntity);

// ✅ RIGHT: Schema as composable builders
import { SchemaBuilder } from './seo-core';
const schema = SchemaBuilder.buildArticle({...});
const breadcrumb = SchemaBuilder.buildBreadcrumb([...]);
const combined = SchemaBuilder.composeSchemas(schema, breadcrumb);

// ❌ WRONG: Inline metadata in components
export const metadata = {
  title: "Page Title", // Hardcoded in every page
  description: "Page description",
  // Duplicated logic
};
```

### Phase 2: Data Layer (Page Entities)

**Every page must be a first-class entity**, not just a slug:

```typescript
interface PageEntity {
  id: string;
  slug: string;
  url: string;
  // Intent (informational, transactional, navigational)
  // Keywords (primary + supporting)
  // Relationships (parent hub, siblings, related)
  // Content metadata (wordCount, lastModified, seoScore)
  // Uniqueness (contentHash for duplicate detection)
}
```

### Phase 3: Template-Driven Generation

**Every page must map to a template** that enforces:
- Consistent layout
- Minimum content depth
- Automatic SEO components
- Predictable internal links

```typescript
// Template ensures consistent quality
const template = {
  category: 'comparison',
  requiredSections: ['hero', 'comparison-table', 'key-features'],
  minWordCount: 800,
  enforceUniqueness: true
};
```

### Phase 4: Content Uniqueness Enforcement

**Hard safeguards at scale:**
- **Minimum word count** per category
- **Content hashing** for duplicate detection
- **Keyword overlap** detection (threshold: 0.7)
- **Canonical assignment** for similar variants
- **FAQ count thresholds**

### Phase 5: Internal Linking as a Graph

**Hubs and Spokes model:**
- **Hubs** target broad, high-level queries
- **Spokes** target long-tail variations
- Spokes link up to hubs
- Hubs distribute authority down
- Every page knows its place in the graph

**Graph-based linking:**
```
Hubs: /features, /use-cases, /for → 3 hubs
Spokes: All other pages → link to relevant hubs
Related: Same-type pages → relate to each other
```

### Phase 6: Sitemap Strategy for 100k+ Pages

**Category-based sitemaps:**
- Main sitemap index
- Category-based sitemaps: sitemap-comparison.xml, sitemap-use-cases.xml, etc.
- Pagination: 50,000 URLs per file (Google limit)
- Accurate last modified dates

### Phase 7: Rendering Strategy

**Balance based on content type:**
- **Static pages** → Static generation for unchanging pages
- **ISR** → For PSEO content that updates
- **Dynamic rendering** → Only when absolutely necessary

**Balance matters:**
- Overusing SSG breaks builds
- Overusing dynamic hurts crawlability
- Balance is key for scale

## How SEO Core Helps AI Agents

### For Generating New Ideas

The SEO Core enables AI agents to:
1. **Discover opportunities** - Query the graph for:
   - Under-served topics
   - Keyword gaps in the graph
   - Orphan pages without parents
   - Hubs that need more spokes

2. **Suggest related content** - When generating a page, the graph can suggest:
   - Parent hub to attach to
   - Sibling pages to link to
   - Related content based on intent and keywords

3. **Avoid cannibalization** - Check keyword overlap and warn when pages compete
4. **Enforce uniqueness** - Detect near-duplicates and suggest merges
5. **Suggest new page types** - Find patterns in the graph to suggest new page opportunities

### Example: AI Agent Discovery

**AI Agent:** "What page types should I create for [keyword]?"

**SEO Core:** "Based on the graph, there are 0 pages targeting '[keyword]' but 23 pages in the '[related-keywords]' category. Consider creating a [page-type] page for '[keyword]' targeting informational intent."

**AI Agent:** "What internal links should I add to this page?"

**SEO Core:** "Based on the page type '[type]', this page should link to [list from internalLinkingRules.crossLinking]. Current linksTo: [list from internalLinkingRules.linksTo]."

## Usage in the Skill

The SEO Core is integrated into the skill through `page-types.json`:

```typescript
import {
  MetadataFactory,
  InternalLinkingGraph,
  ContentUniquenessValidator,
  SitemapGenerator
} from './scripts/seo-core';

// In the skill, use these tools to:
const graph = new InternalLinkingGraph();
const factory = new MetadataFactory(siteConfig);
const validator = new ContentUniquenessContent();
const generator = new SitemapGenerator('https://codebolt.ai');

// 1. Create page entity
const entity = createPageEntity('id', {...data});

// 2. Validate uniqueness
const validation = validator.validate(entity);

// 3. Add to graph
graph.addPage(entity);

// 4. Generate all SEO outputs
const { metadata, schema, internalLinks } = generateSEOOutput(entity);

// 5. Generate sitemap entries
const { index, sitemaps } = generator.generateSitemaps([entity]);
```

## Key Benefits

### For AI Agents

The SEO Core helps AI agents:
- Discover new page opportunities (query the graph)
- Suggest internal links (use the graph)
- Detect duplicates and conflicts
- Suggest canonical URLs
- Recommend page types for keywords
- Generate consistent metadata
- Build proper schema.org

### For Content Generation

- **Consistency**: All pages use the same factories
- **Quality**: Uniqueness enforcement
- **Structure**: Proper internal linking
- **SEO**: Optimized metadata and schema

### For Scale

- **100k+ pages** handled efficiently
- **Category-based sitemaps** (not one massive sitemap)
- **Graph-based linking** (structured relationships)
- **Validation at every step**
- **Performance** - Templates ensure consistent rendering
- **Scalability** - Layered architecture separates concerns

## Files

- **`scripts/seo-core.ts` - Core SEO Core implementation
- **`scripts/internal-linking.ts` - Internal linking graph (from `seo/utils/`)
- **`scripts/seo-utils.ts` - SEO utilities (from `seo/utils/`)
- **`scripts/validate-seo.ts` - Validation utilities
- **`page-types.json` - Page type definitions with SEO Core integration

---

**Version:** 1.0.0
**Last Updated:** 2025-01-18
**Inspired by:** @kalashbuilds' PSEO architecture for scale
