# Architecture

The active Codebolt website is a static Astro project located in `newsite/` and deployed as Cloudflare Workers static assets.

## Build Flow

1. `npm run build` calls `npm run --prefix ./newsite build`.
2. Astro builds routes from `newsite/src/pages/`.
3. Astro copies static assets and crawler context from `newsite/public/`.
4. The generated output lands in `newsite/dist/`.
5. `newsite/wrangler.jsonc` deploys `dist/` as Workers static assets.

## Active Pages

- `newsite/src/pages/index.astro`: homepage route metadata and structured data.
- `newsite/src/content/home.html`: homepage body and product positioning.
- `newsite/src/pages/download/index.astro`: download route metadata and structured data.
- `newsite/src/content/download.html`: product surface and install/download options.
- `newsite/src/layouts/` and `newsite/src/components/`: shared layout, header, footer, SEO shell.

## Crawler Assets

- `newsite/public/robots.txt`: crawler entry point.
- `newsite/public/sitemap.xml`: canonical public URLs.
- `newsite/public/llms.txt`: LLM-readable product and page summary.
- `newsite/public/ai.txt`: answer-engine oriented context.

## Legacy Folders

`content/`, `template/`, and `site/` are the deprecated Agent Sitegen implementation. They are retained as reference and should not be treated as active deploy source.
