# Architecture

The active Codebolt website is a static Cloudflare Workers assets project located in `newsite/`.

## Build Flow

1. `npm run build` calls `npm run --prefix ./newsite build`.
2. `newsite/build.mjs` removes and recreates `newsite/dist/`.
3. The script copies the homepage, download page, product images, and crawler files into `dist/`.
4. `newsite/wrangler.jsonc` deploys `dist/` as Workers static assets.

## Active Pages

- `newsite/index.html`: homepage and product positioning.
- `newsite/download/index.html`: product surface and install/download options.

## Crawler Assets

- `newsite/robots.txt`: crawler entry point.
- `newsite/sitemap.xml`: canonical public URLs.
- `newsite/llms.txt`: LLM-readable product and page summary.
- `newsite/ai.txt`: answer-engine oriented context.

## Legacy Folders

`content/`, `template/`, and `site/` are the deprecated Agent Sitegen/Astro implementation. They are retained as reference and should not be treated as active deploy source.
