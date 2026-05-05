# Codebolt Site Generator

YAML-to-Astro site generator. Define the entire website in `content/site.yaml`, run the generator, get a complete buildable Astro project.

## Quick Start

```bash
# Install generator dependencies
cd wireframe/sitemanifest/generator
npm install

# Generate a site version
node generate.js v2

# Build and preview
cd ../output/v2
npm install
npm run dev      # dev server at localhost:4321
npm run build    # production build
npm run cf:dev   # build and preview with Cloudflare Pages locally
npm run deploy   # build and deploy to Cloudflare Pages with Wrangler
```

## How It Works

1. **`content/site.yaml`** — declarative site definition (pages, sections, navigation, content)
2. **`template/`** — immutable Astro base project with reusable components and Cloudflare Pages/Wrangler deployment config
3. **`generate.js`** — copies template to `output/{version}/`, generates `.astro` page files from YAML

Each generation creates a self-contained Astro project. Change YAML, regenerate, get a fresh site.

## Directory Structure

```
generator/
  generate.js           # Generator script
  package.json          # Generator deps (js-yaml)
  content/
    site.yaml           # Site content definition
  template/             # Immutable Astro template
    package.json
    astro.config.mjs
    src/
      styles/global.css
      layouts/BaseLayout.astro
      components/        # 18 component files
      pages/             # Empty (pages generated into output)
  skill/
    SKILL.md             # AI agent reference
output/
  v1/                    # Reference (static HTML)
  v2/                    # Generated Astro project
```

## Available Components

Hero, PageHeader, CenteredText, ComparisonColumns, CardGrid, FeatureBlock, DiagramSection, BlockquoteSection, PersonaGrid, PricingGrid, BlogGrid, Accordion, ValueList, TwoColumnText, RoleList, Timeline, CtaBlock, Button.

See `skill/SKILL.md` for full props reference.
