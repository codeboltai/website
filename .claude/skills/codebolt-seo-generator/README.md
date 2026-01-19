# SEO Generator Skill

A skill for dynamically generating SEO-optimized landing pages for CodeBolt through interactive AI assistance.

## 📁 Structure

```
.claude-plugin/seo-generator/
├── SKILL.md                    # Main skill file (required)
├── README.md                   # This file
├── references/                 # Reference documentation
│   ├── page-templates.md       # Detailed page templates
│   └── content-patterns.md     # Proven content patterns
└── scripts/                    # Utility scripts
    └── validate-seo.ts         # SEO validation script
```

## 🎯 What This Skill Does

This skill creates SEO-optimized landing pages by:

1. **Asking targeted questions** to understand your needs
2. **Generating unique content** tailored to your specific use case
3. **Following SEO best practices** for search optimization
4. **Creating proper metadata** for search engines
5. **Suggesting internal links** to related pages

## 🚀 How to Use

### Invoke the Skill

Simply say something like:

- "Create a comparison page for CodeBolt vs [competitor]"
- "Generate a use case page for [workflow]"
- "Build a persona page for [target audience]"
- "Create a tech stack page for [language/framework]"
- "Generate an industry page for [vertical]"

### Answer Questions

The skill will ask clarifying questions. Provide as much detail as possible for better results:

**For comparisons:**
- Competitor name and description
- Their features, strengths, and weaknesses
- CodeBolt's advantages over them
- Target keywords (optional)

**For use cases:**
- Use case name and description
- Problem it solves
- CodeBolt features used
- Expected results/metrics

**For personas:**
- Target role and title
- Their challenges and goals
- How CodeBolt helps
- Testimonials (optional)

**For tech stacks:**
- Technology name
- Common use cases
- How CodeBolt helps
- Related technologies

**For industries:**
- Industry name
- Key challenges
- Compliance requirements
- Common use cases

### Review and Refine

The skill will generate complete page content. Review it and ask for revisions if needed:

- "Make the title more compelling"
- "Add more specific metrics"
- "Emphasize [specific benefit]"
- "Add a case study"

## 📊 Page Types Supported

| Type | Description | Example Output |
|------|-------------|----------------|
| **Comparison** | CodeBolt vs competitor | `/vs/github-copilot` |
| **Use Case** | Specific workflow | `/use-cases/automated-refactoring` |
| **Persona** | Target audience | `/for/startup-founders` |
| **Tech Stack** | Language/framework | `/tech/python` |
| **Industry** | Vertical market | `/industries/fintech` |

## 📝 What Gets Generated

### 1. Page Metadata
```typescript
{
  title: "CodeBolt vs GitHub Copilot | Multi-Agent AI IDE",
  description: "Compare CodeBolt's multi-agent...",
  keywords: ["codebolt vs copilot", "multi-agent ide"],
  ogImage: "/images/og/vs-github-copilot.png"
}
```

### 2. Hero Section
- H1 headline (with primary keyword)
- Compelling subheadline
- Clear CTA button

### 3. Content Sections
- Problem/Opportunity
- Solution/Approach
- Key Benefits (3-5)
- Features/Capabilities
- Social Proof (metrics, testimonials)
- FAQ (optional)
- Final CTA

### 4. Internal Links
- 3-5 related pages
- Hub page links
- Additional resources

### 5. Structured Data
- JSON-LD for search engines
- Breadcrumb data
- SoftwareApplication or Article schema

## 🎨 Content Quality

### SEO Best Practices Built-In

- ✅ Unique titles (50-60 chars)
- ✅ Optimized descriptions (150-160 chars)
- ✅ Proper heading hierarchy
- ✅ Keyword optimization (1-2% density)
- ✅ Internal linking (3-5 pages)
- ✅ Structured data (JSON-LD)
- ✅ Mobile-responsive structure
- ✅ Clear CTAs

### Content Lengths

| Page Type | Min Words | Optimal Words |
|-----------|-----------|---------------|
| Comparison | 800 | 1,200-1,500 |
| Use Case | 600 | 1,000-1,200 |
| Persona | 600 | 1,000-1,200 |
| Tech Stack | 500 | 800-1,000 |
| Industry | 700 | 1,000-1,200 |

## 🔗 Integration with ConceptBank

This skill leverages the ConceptBank for accurate information:

- `conceptbank/core/` - Identity, philosophy, terminology
- `conceptbank/features/` - Detailed feature documentation
- `conceptbank/users/` - Personas and journeys
- `conceptbank/business/` - Competitive positioning

The skill queries relevant sections when generating specific page types.

## ✅ Quality Assurance

Use the included validation script:

```bash
# Run validation
npx tsx scripts/validate-seo.ts '{"title":"...","description":"...","keywords":[],"content":"...","url":"..."}'

# Or integrate into build process
import { validateSEOMetadata, generateSEOReport } from '.claude-plugin/seo-generator/scripts/validate-seo';
```

### Validation Checks

- Title length (30-60 chars)
- Description length (120-160 chars)
- Content length (500+ words)
- Keyword density (1-2%)
- Internal links (3-5)
- H1 presence
- CTA presence
- Structured data validity

## 📖 Reference Materials

### Page Templates (`references/page-templates.md`)
Complete Next.js page templates for each page type with:
- Component structure
- Section organization
- Prop patterns
- Styling guidelines

### Content Patterns (`references/content-patterns.md`)
Proven patterns for:
- Title formulas
- Description formulas
- Introduction patterns
- Section patterns
- CTA patterns
- Content frameworks (AIDA, PAS, etc.)

## 🔄 Workflow

### 1. User Request
User asks to create a page or describes need

### 2. Clarification
Skill asks targeted questions based on page type

### 3. Information Gathering
User provides details (or skill queries ConceptBank)

### 4. Content Generation
Skill generates complete page with all sections

### 5. Review & Refine
User reviews, requests changes if needed

### 6. Output
Skill provides formatted page content

### 7. Validation (Optional)
Run validation script to check SEO quality

## 🎯 Tips for Best Results

### Be Specific
Instead of: "Create a comparison page"
Try: "Create a comparison page for CodeBolt vs Cursor, emphasizing our multi-agent advantages"

### Provide Metrics
Instead of: "It's faster"
Try: "It's 5-10x faster through parallel agent execution"

### Include Examples
Instead of: "It works well for refactoring"
Try: "It completed a microservices migration in 3 weeks vs 8 weeks traditional"

### Know Your Audience
Instead of: "For developers"
Try: "For startup CTOs who need to ship fast with small teams"

## 📚 Additional Resources

- `/seo/PSEO_ARCHITECTURE.md` - Full PSEO architecture
- `/seo/data/` - Data structures for page types
- `/seo/generators/` - Page generation code
- `/seo/utils/` - SEO utilities
- `/conceptbank/` - Source of truth for CodeBolt

## 🛠️ Extension

### Adding New Page Types

1. Add template to `references/page-templates.md`
2. Add questions to SKILL.md workflow section
3. Add patterns to `references/content-patterns.md`
4. Create data structure in `/seo/data/`
5. Update generator in `/seo/generators/`

### Adding Validation Rules

Edit `scripts/validate-seo.ts` to add:
- New validation checks
- Additional scoring rules
- Custom error messages
- Page-type-specific validations

## 📞 Support

For issues or questions:
1. Check SKILL.md for detailed workflow
2. Review references/ for patterns and templates
3. Validate with scripts/validate-seo.ts
4. Consult ConceptBank for accurate information

---

**Version:** 1.0.0
**Last Updated:** 2025-01-18
