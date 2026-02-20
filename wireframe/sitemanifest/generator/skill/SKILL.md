---
name: update-site-content
description: Edit the Codebolt website content via YAML and regenerate the Astro site
---

# Update Site Content

Edit `site.yaml` to change website content, then run the generator to produce a new Astro build.

## File Paths

- **YAML content**: `wireframe/sitemanifest/generator/content/site.yaml`
- **Generator script**: `wireframe/sitemanifest/generator/generate.js`
- **Template (immutable)**: `wireframe/sitemanifest/generator/template/`
- **Output**: `wireframe/sitemanifest/output/{version}/`

## Workflow

1. Read `generator/content/site.yaml`
2. Edit the YAML (change text, add sections, reorder pages)
3. Generate a new version:
   ```bash
   cd wireframe/sitemanifest/generator
   node generate.js v3
   ```
4. Build and preview:
   ```bash
   cd ../output/v3
   npm install && npm run dev
   ```

## YAML Structure

```yaml
site:           # Global config — name, tagline, logo
navigation:     # Navbar links/CTA + footer columns/links
pages:          # Array of page definitions
  - slug: ""    # URL path ("" = homepage, "features" = /features)
    title: ""   # <title> tag
    navbar_variant: "solid"  # "solid" (default) or "transparent" (hero pages)
    sections:   # Array of section blocks
      - type: hero
        heading: "..."
        # ...props for this component
```

## Section Types & Props

| Type | Component | Props |
|---|---|---|
| `hero` | Hero | `heading`, `subheading`, `buttons[]` |
| `page-header` | PageHeader | `title`, `subtitle` |
| `centered-text` | CenteredText | `text`, `variant` ("thesis"\|"identity"), `heading?` |
| `comparison-columns` | ComparisonColumns | `problem{heading,items[]}`, `solution{heading,items[]}` |
| `card-grid` | CardGrid | `heading?`, `cards[]{title,body,visual?}` |
| `feature-block` | FeatureBlock | `heading`, `body`, `diagram`, `reverse?` |
| `diagram-section` | DiagramSection | `heading`, `layers[]{label,tag,style}`, `annotation?`, `buttons?` |
| `blockquote` | BlockquoteSection | `text` |
| `persona-grid` | PersonaGrid | `personas[]{label,body}` |
| `pricing-grid` | PricingGrid | `cards[]{tier,price,price_sub?,for,features[],cta{},featured?,badge?}` |
| `blog-grid` | BlogGrid | `posts[]{date,title,excerpt,tag,href?}` |
| `accordion` | Accordion | `heading?`, `items[]{question,answer,icon?}` |
| `value-list` | ValueList | `heading?`, `values[]` |
| `two-column-text` | TwoColumnText | `columns[]{heading,body}`, `conclusion?` |
| `role-list` | RoleList | `heading?`, `roles[]{title,location?}`, `empty_message?` |
| `timeline` | Timeline | `entries[]{date,version,summary}` |
| `cta-block` | CtaBlock | `heading`, `buttons[]` |

### Button format (used in `buttons[]` arrays)

```yaml
{ label: "Get Started", href: "/pricing", variant: "primary" }
{ label: "Read Docs", href: "https://docs.codebolt.ai", variant: "secondary", external: true }
```

Variants: `primary` (blue filled), `secondary` (outlined).

### Layer styles (for `diagram-section`)

`surface`, `runtime`, `drift`, `versioning`, `governance` — each has a distinct background color.

## Common Operations

### Change a heading
```yaml
# Find the section, update the text:
- type: hero
  heading: "New Heading Here"
```

### Add a new page
```yaml
pages:
  # ... existing pages ...
  - slug: "new-page"
    title: "New Page — Codebolt"
    sections:
      - type: page-header
        title: "New Page Title"
        subtitle: "Description here."
      - type: cta-block
        heading: "Take action."
        buttons:
          - { label: "Get Started", href: "/pricing", variant: "primary" }
```

### Add a section to an existing page
Insert a new section block in the page's `sections` array.

### Add a blog post
```yaml
# Under the blog page's blog-grid section:
posts:
  - date: "2026-03-01"
    title: "New Post Title"
    excerpt: "Short description of the post."
    tag: "Engineering"
```

### Add a changelog entry
```yaml
# Under the changelog page's timeline section:
entries:
  - date: "2026-03-01"
    version: "v1.0.0"
    summary: "Description of what shipped."
```

### Add a pricing tier
```yaml
# Under the pricing page's pricing-grid section:
cards:
  - tier: "New Tier"
    price: "$99"
    price_sub: "/mo"
    for: "Target audience description"
    features:
      - "Feature 1"
      - "Feature 2"
    cta: { label: "Start", href: "#", variant: "primary" }
```
