---
name: seo-generator
description: Generate SEO-optimized landing pages for CodeBolt through interactive AI assistance. Use this skill when creating comparison pages, use case pages, persona pages, tech stack pages, or industry pages for programmatic SEO. This skill dynamically loads page type definitions from page-types.json and uses AskUserQuestion tool for interactive information gathering.
license: MIT
---

# SEO Page Generator

Dynamically generates SEO-optimized landing pages for CodeBolt through interactive questioning and AI-powered content creation.

## Quick Start

When invoked, this skill will:
1. Ask which page type you want to create (using **AskUserQuestion** tool)
2. Load the appropriate template and questions from **`page-types.json`**
3. Gather information through targeted questions
4. Generate complete page content with metadata and structured data

## How It Works

### Dynamic Page Type System

Page types are **NOT hardcoded** in this skill. They are defined in **`page-types.json`**, which means:

- ✅ **Add new page types** by editing the JSON file
- ✅ **Modify questions** without touching the skill
- ✅ **Update templates** independently
- ✅ **Define linking patterns** per page type
- ✅ **Version control** all page type definitions

### Page Type Definition Structure

Each page type in `page-types.json` includes:
- **Metadata**: ID, name, description, URL pattern
- **Questions**: What to ask the user (with types, validation, options)
- **Template File**: Reference to template in `references/`
- **Internal Linking**: Where this page links to and from

## Workflow

### Step 1: Determine Page Type (CRITICAL: Use AskUserQuestion)

**ALWAYS use the `AskUserQuestion` tool** for this step:

```typescript
// Ask the user to select page type
AskUserQuestion({
  questions: [{
    question: "Which type of page are you creating?",
    header: "Page Type",
    options: [
      { label: "Comparison", description: "CodeBolt vs a competitor" },
      { label: "Use Case", description: "Specific workflow or scenario" },
      { label: "Persona", description: "Target audience profile" },
      { label: "Tech Stack", description: "Language or framework guide" },
      { label: "Industry", description: "Vertical market focus" }
    ],
    multiSelect: false
  }]
})
```

### Step 2: Load Page Type Definition

Once user selects page type, load its definition from `page-types.json`:

```typescript
// Load page types configuration
const pageTypesConfig = loadJSON('page-types.json');
const pageType = pageTypesConfig.pageTypes.find(pt => pt.id === selectedType);
const questions = pageType.questions;
const templateRef = pageType.templateFile;
const linkingRules = pageType.internalLinks;
```

### Step 3: Gather Information (Use AskUserQuestion)

**For each question in the page type definition, use AskUserQuestion:**

**Text questions:**
```typescript
AskUserQuestion({
  questions: [{
    question: questionDefinition.question,
    header: "Information",
    multiSelect: false
  }]
})
```

**List questions:**
```typescript
AskUserQuestion({
  questions: [{
    question: questionDefinition.question,
    header: "Details",
    multiSelect: false  // User provides comma-separated or multiple lines
  }]
})
```

**Choice questions:**
```typescript
AskUserQuestion({
  questions: [{
    question: questionDefinition.question,
    header: "Selection",
    options: questionDefinition.options.map(opt => ({
      label: opt.label,
      description: opt.description || opt.value
    })),
    multiSelect: questionDefinition.multiple || false
  }]
})
```

### Step 4: Query ConceptBank (if needed)

For questions with `"source": "conceptbank/path/"`:
- Read relevant sections from conceptbank/
- Extract accurate information
- Use in content generation

**Mapping from page-types.json:**
```json
{
  "conceptBankMapping": {
    "features": "conceptbank/features/",
    "personas": "conceptbank/users/personas/",
    "philosophy": "conceptbank/core/philosophy/",
    "business": "conceptbank/business/"
  }
}
```

### Step 5: Generate Page Content

Using gathered information + ConceptBank data, generate:

#### 1. SEO Metadata
```typescript
{
  title: "[Primary Keyword] | [Secondary Keyword] | CodeBolt",
  description: "[Primary benefit] for [audience]. [Differentiator].",
  keywords: ["primary", "secondary", "long-tail-1", "long-tail-2"],
  ogImage: "/images/og/[page-type]-[slug].png"
}
```

#### 2. Page Content

Follow the template structure from `references/page-templates.md`:
- Hero section (H1, subtitle, CTA)
- Required sections (problem, solution, benefits, features)
- Optional sections (FAQ, testimonials, metrics)
- Final CTA
- Related pages

#### 3. Internal Links

**Use internal linking utilities** from `scripts/internal-linking.ts`:

Apply linking rules from `page-types.json`:

```typescript
import { generatePageInternalLinks } from './scripts/internal-linking';

// Generate internal links based on page type
const internalLinks = generatePageInternalLinks(
  pageType.id,
  pageSlug,
  pageTitle
);
```

#### 4. Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Page Title"
}
```

### Step 6: Output

Provide complete page content with metadata, component, structured data, and internal links.

## Internal Linking System

### From page-types.json

Each page type defines:
- **linksTo**: Which page types this page should link TO
- **linksFrom**: Which page types should link TO this page
- **relatedType**: Same-type pages to relate to

### Example

```json
{
  "id": "use-case",
  "internalLinks": {
    "linksTo": ["features", "for"],
    "linksFrom": ["use-cases", "for"],
    "relatedType": "use-cases"
  }
}
```

### Internal Link Utilities

The skill includes `scripts/internal-linking.ts` (copied from `seo/utils/`):

- **`generatePageInternalLinks(pageType, slug, title)`** - Generates all internal links
- **`generateBreadcrumb(pageType, slug, title)`** - Generates breadcrumb data
- **`buildLinkGraph()`** - Builds internal link graph

## Template System

### Template Files

Templates are in `references/` and referenced from `page-types.json`:

```json
{
  "templateFile": "references/page-templates.md#comparison"
}
```

### Creating Templates for New Page Types

When adding a page type without a template, create it in `references/` with:
- Component structure (Next.js page.tsx format)
- Section breakdown
- Required and optional sections
- Props interface
- Example content patterns

## Content Guidelines

### From page-types.json `contentGuidelines`

**Minimum Word Counts:**
- Comparison: 800 words
- Use Case: 600 words
- Persona: 600 words
- Tech Stack: 500 words
- Industry: 700 words

**Required Sections:**
- Hero (title, subtitle, CTA)
- Problem statement
- Solution explanation
- Key benefits (3-5)
- Relevant features
- Final CTA
- Related pages (3-5)

**Optional Sections:**
- FAQ, Testimonials, Metrics, Examples, Comparison table

### SEO Requirements

- **Title**: 30-60 characters, include primary keyword
- **Description**: 120-160 characters, include value proposition
- **Keywords**: 5-10 keywords
- **Content**: Keyword density 1-2%, proper heading structure

## Progressive Disclosure

Load only what's needed:
- **`page-types.json`** - Always (page type definitions)
- **`references/page-templates.md`** - When generating page
- **`scripts/internal-linking.ts`** - For internal link generation
- **`scripts/seo-utils.ts`** - For SEO utilities
- **`references/content-patterns.md`** - When user asks for patterns
- **`/conceptbank/`** - Specific sections as needed

## Example Conversations

### Example 1: Comparison Page

**User:** "Create a comparison page"

**Skill (AskUserQuestion):**
- Page type selection

**User:** [Selects "Comparison"]

**Skill (AskUserQuestion):**
- Competitor name
- Features
- Strengths/Weaknesses
- CodeBolt advantages

**Skill:** Generates complete page with internal links

### Example 2: New Page Type

**User:** "Create a case-study page"

**Skill:**
1. Checks `page-types.json` for "case-study"
2. Not found, asks to add it
3. Creates template
4. Adds to `page-types.json`
5. Proceeds with generation

## Related Files

- **`page-types.json`** - Dynamic page type definitions (MAIN)
- **`references/page-templates.md`** - Page templates
- **`references/content-patterns.md`** - Content patterns
- **`scripts/internal-linking.ts`** - Internal link utilities
- **`scripts/seo-utils.ts`** - SEO validation utilities
- **`scripts/validate-seo.ts`** - SEO validation script
- **`/conceptbank/`** - Source of truth for CodeBolt info

---

**Version:** 1.0.0
**Last Updated:** 2025-01-18
