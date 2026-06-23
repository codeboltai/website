# Codebolt Website

This repository contains the Codebolt marketing website. The active deployable site is the static `newsite/` project. The older Agent Sitegen/Astro flow remains in `content/`, `template/`, and `site/` as deprecated reference material and should not be edited for durable homepage changes unless the user explicitly asks for that legacy flow.

## Quickstart

```bash
npm install
npm run build
npm test
```

The production build output is written to `newsite/dist/`.

## Common Commands

```bash
npm run dev        # build newsite and start wrangler dev
npm run build      # build the static newsite output
npm test           # build and validate required SEO/GEO assets
npm run lint       # run the static newsite validator
npm run typecheck  # syntax-check the build and validation scripts
npm run deploy     # build and deploy with Wrangler
```

## Active Layout

```txt
newsite/
  index.html                  # Active homepage
  download/index.html         # Download page linked from the hero CTA
  images/                     # Product surface screenshots and previews
  images-withoutbackground/   # Transparent/product images
  robots.txt                  # Search crawler entry point
  sitemap.xml                 # Search index map
  llms.txt                    # LLM-readable site summary
  ai.txt                      # GEO-oriented crawler summary
  build.mjs                   # Static build script
  wrangler.jsonc              # Cloudflare Workers static assets config

scripts/
  validate-newsite.mjs        # Static checks for required pages, metadata, and assets

docs/
  architecture.md             # Site architecture and deployment notes
  development.md              # Development workflow for agents and humans
  seo-geo.md                  # SEO/GEO checklist for this static site
```

## Example Workflow

For a homepage copy, layout, or SEO update:

```bash
npm run build
npm test
```

If the output is deployable:

```bash
npm run deploy
```

## Deployment

The active site deploys as a Cloudflare Workers static assets project from `newsite/wrangler.jsonc`.

GitHub builds should run the root build command:

```bash
npm run build
```

Deployment should run from `newsite/` or through the root deploy script:

```bash
npm run deploy
```

Do not replace this with `wrangler pages deploy` unless the Cloudflare target changes from Workers static assets to Cloudflare Pages.

## Legacy Sitegen Flow

These scripts are retained for reference only:

```bash
npm run sitegen:generate
npm run sitegen:validate
npm run sitegen:build
npm run sitegen:dev
```

Use them only when the user explicitly asks to work on the deprecated generated Astro site.
