# SEO Page Generator Skill

## Overview

This skill enables dynamic generation of SEO-optimized landing pages for CodeBolt through interactive AI assistance. Instead of hardcoded data, the skill prompts for information and generates unique, high-quality content following PSEO best practices.

## Usage

Invoke this skill when you need to create a new SEO landing page for CodeBolt.

## What This Skill Does

1. **Asks clarifying questions** to understand the page you want to create
2. **Generates unique content** tailored to your specific use case
3. **Follows PSEO structure** ensuring SEO optimization
4. **Creates proper metadata** for search engines
5. **Suggests internal links** to related pages

## Questions You'll Be Asked

When you use this skill, be prepared to answer:

### Page Type Selection
- What type of page are you creating?
  - Comparison (vs competitor)
  - Use Case (specific workflow)
  - Persona (target audience)
  - Tech Stack (language/framework)
  - Industry (vertical market)

### Target Information
- **For Comparisons**: Which competitor? What are their key features?
- **For Use Cases**: What's the use case? What problem does it solve?
- **For Personas**: Who is the target user? What are their challenges?
- **For Tech Stacks**: Which technology? What's it used for?
- **For Industries**: Which industry? What are the specific needs?

### Content Details
- What's the primary value proposition?
- What are 3-5 key benefits?
- Any specific keywords to target?
- What's the main call-to-action?

## Output Structure

This skill generates:

### 1. Page Metadata
```yaml
title: Optimized for SEO (50-60 chars)
description: Compelling description (150-160 chars)
keywords: Primary and secondary keywords
ogImage: /images/og/[page].png
```

### 2. Hero Section
- Headline (H1)
- Subheadline
- CTA button text

### 3. Content Sections
- Problem/Opportunity
- Solution/Approach
- Key Benefits (3-5)
- Features/Capabilities
- Social Proof (testimonials, metrics)
- FAQ (optional)

### 4. Sidebar/Related Content
- Related pages (3-5)
- CTA section
- Additional resources

### 5. Structured Data
- JSON-LD for search engines
- Breadcrumb data
- Article/Software schema

## Page Templates

### Comparison Page Template

**Ask:**
1. Which competitor are we comparing against?
2. What's their main value proposition?
3. What are their strengths? (3-5 items)
4. What are their weaknesses? (3-5 items)
5. What are CodeBolt's key advantages? (5-7 items)

**Generate:**
- Quick comparison table
- Detailed feature comparison
- Why CodeBolt is different section
- When to choose each option
- CTA: "Ready to switch?"

### Use Case Page Template

**Ask:**
1. What's the use case name?
2. What problem does it solve?
3. How does CodeBolt solve it?
4. Which features enable this?
5. What are the expected results/metrics?

**Generate:**
- Problem description
- Solution overview
- Key CodeBolt features
- Step-by-step workflow
- Results and metrics
- CTA: "Start this use case"

### Persona Page Template

**Ask:**
1. Who is the target persona? (role, experience level)
2. What are their main challenges? (5-7 items)
3. What are their goals? (3-5 items)
4. How does CodeBolt help them?
5. Any testimonials or quotes?

**Generate:**
- Persona profile
- Challenges section
- Benefits and features
- Testimonials
- Success metrics
- CTA: "Start your free trial"

### Tech Stack Page Template

**Ask:**
1. Which technology/language/framework?
2. What's it used for?
3. What are common use cases?
4. How does CodeBolt help with this stack?
5. Which related technologies to link to?

**Generate:**
- Technology overview
- Common use cases
- CodeBolt integration
- Feature highlights
- Related technologies
- CTA: "Build with [stack]"

### Industry Page Template

**Ask:**
1. Which industry/vertical?
2. What are the key challenges?
3. What compliance requirements exist?
4. What are common use cases?
5. How does CodeBolt address industry needs?

**Generate:**
- Industry overview
- Key challenges
- Compliance section
- Use cases
- Solutions/benefits
- CTA: "Contact sales"

## SEO Best Practices Built-In

### Keyword Targeting
- Primary keyword in H1
- Secondary keywords in H2/H3
- Natural keyword density (1-2%)
- Long-tail variations included

### Content Structure
- Clear hierarchy (H1 → H2 → H3)
- Short paragraphs (2-3 sentences)
- Bullet points for scannability
- Internal links to related pages

### Meta Optimization
- Title: 50-60 characters
- Description: 150-160 characters
- Keywords: 5-10 relevant terms

### Technical SEO
- URL structure: `/type/slug`
- Canonical tags
- Open Graph tags
- Structured data (JSON-LD)
- Mobile-responsive

## Content Generation Guidelines

### DO
- ✅ Create unique content for each page
- ✅ Include specific examples and metrics
- ✅ Use natural language (avoid keyword stuffing)
- ✅ Link to 3-5 related pages
- ✅ Include clear CTAs
- ✅ Add structured data

### DON'T
- ❌ Duplicate content from other pages
- ❌ Make exaggerated claims without proof
- ❌ Use generic descriptions
- ❌ Forget internal links
- ❌ Skip meta descriptions
- ❌ Ignore mobile users

## File Output

When content is generated, this skill will:

1. **Create Next.js page file** at appropriate path:
   - `/app/vs/[slug]/page.tsx`
   - `/app/use-cases/[slug]/page.tsx`
   - `/app/for/[slug]/page.tsx`
   - `/app/tech/[slug]/page.tsx`
   - `/app/industries/[slug]/page.tsx`

2. **Update data files** if adding to the system:
   - `data/competitors.ts`
   - `data/use-cases.ts`
   - `data/personas.ts`
   - `data/languages.ts`
   - `data/industries.ts`

3. **Update sitemap** to include new page

4. **Provide preview** of generated content

## Integration with ConceptBank

This skill leverages the ConceptBank at `/conceptbank/` for:
- Core CodeBolt features and benefits
- Technical details and capabilities
- User personas and journeys
- Competitive positioning
- Use cases and workflows

## Example Conversations

### Example 1: Creating a Comparison Page

**User:** "I want to create a comparison page for CodeBolt vs Replit Ghostwriter"

**Skill asks:**
1. "What are Ghostwriter's main features?"
2. "What are its strengths compared to CodeBolt?"
3. "What are CodeBolt's key advantages over Ghostwriter?"
4. "Any specific keywords to target?"

**Skill generates:** Complete page with comparison table, feature breakdown, and CTAs

### Example 2: Creating a Use Case Page

**User:** "I need a page for API development use case"

**Skill asks:**
1. "What's the main challenge with API development?"
2. "Which CodeBolt features help with API development?"
3. "What are the expected results?"
4. "Who is this use case for?"

**Skill generates:** Complete page with problem/solution, features, workflow, and metrics

### Example 3: Creating a Persona Page

**User:** "Create a page for freelance developers"

**Skill asks:**
1. "What are the main challenges for freelance developers?"
2. "What are their goals?"
3. "How does CodeBolt help them?"
4. "Any testimonials or success stories?"

**Skill generates:** Complete persona page with challenges, benefits, and testimonials

## Extending the Skill

To add new page types:

1. **Define the template** in this skill file
2. **Specify questions** to ask the user
3. **Create data structure** in `/seo/data/`
4. **Add generator** to `/seo/generators/`
5. **Update sitemap generator**

## Quality Checklist

Before finalizing any page, verify:
- [ ] Unique title and description
- [ ] H1 includes primary keyword
- [ ] Content is 500+ words
- [ ] 3-5 internal links
- [ ] Clear CTA present
- [ ] Structured data included
- [ ] Mobile responsive
- [ ] No duplicate content

## Related Files

- `/seo/PSEO_ARCHITECTURE.md` - Full architecture documentation
- `/seo/NEXTJS_IMPLEMENTATION.md` - Implementation guide
- `/seo/README.md` - Quick start guide
- `/conceptbank/` - Source of truth for CodeBolt information
- `/website/src/app/` - Where pages are created

## Notes

- All pages should maintain brand voice and tone
- Use data and metrics from ConceptBank when available
- Keep user intent in mind (informational vs transactional)
- Optimize for featured snippets when possible
- Include FAQ sections for question-based queries

---

**Version:** 1.0.0
**Last Updated:** 2025-01-18
