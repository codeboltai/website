# Claude Project Notes

The active Codebolt website is the static Astro project in `newsite/`. The older Sitegen folders are deprecated reference material.

## Fast Path

```bash
npm run build
npm test
```

Use `npm run deploy` only when the user asks to deploy.

## Editing Rules

- Homepage route and metadata: `newsite/src/pages/index.astro`
- Homepage body/styles/scripts: `newsite/src/content/home.html`, `newsite/src/styles/home.css`, `newsite/src/scripts/home.js`
- Download route and metadata: `newsite/src/pages/download/index.astro`
- Download body/styles: `newsite/src/content/download.html`, `newsite/src/styles/download.css`
- Shared layout: `newsite/src/layouts/BaseLayout.astro`, `newsite/src/components/Header.astro`, `newsite/src/components/Footer.astro`
- Design source of truth: `newsite/DESIGN.md`, `newsite/theme.tokens.json`
- SEO/GEO crawler files: `newsite/public/robots.txt`, `newsite/public/sitemap.xml`, `newsite/public/llms.txt`, `newsite/public/ai.txt`
- Validator: `scripts/validate-newsite.mjs`

Do not edit `site/` for durable changes. It is not the active deployment source.

## Product Positioning

Codebolt is positioned as an autonomous software foundry: a coding platform with agentic infrastructure for multi-agent software work, environments, tools, review loops, and runtime coordination. Avoid making the homepage sound like only an agent framework or LangChain-style agent builder.

## Product Boundaries

- Codebolt is a product and coding platform, not just an agent framework.
- Agents are lightweight and process-specific; the runtime owns tools, environments, routing, verification, observability, coordination, and persistence.
- The homepage should emphasize getting reliable software work done without babysitting agents.
- Do not position Codebolt as a replacement for model providers. It sits around agents and model calls as infrastructure for trustworthy autonomous software work.
- Do not imply users must write every agent themselves. Codebolt supports built-in agents, custom agents, plugins, SDKs, and multiple surfaces.

## Non-Goals And Out Of Scope

- Do not describe this repository as the Codebolt app implementation; it is the marketing website.
- Do not add backend services, API servers, databases, auth flows, or product runtime code here.
- Do not edit the deprecated `site/` output for active website changes.
- Do not add model-provider claims, benchmark claims, pricing claims, or download URLs unless the user provides current source material.
- Do not change Cloudflare deployment targets from Workers static assets to Pages without an explicit user request.
