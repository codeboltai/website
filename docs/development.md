# Development

## Setup

```bash
npm install
```

## Validate

```bash
npm run build
npm test
npm run lint
npm run typecheck
```

`npm test` builds the static site and runs `scripts/validate-newsite.mjs`, which checks required public pages, SEO/GEO crawler files, metadata snippets, and hero assets.

## Local Development

```bash
npm run dev
```

This runs the `newsite` build and starts Wrangler dev using `newsite/wrangler.jsonc`.

## Deployment

```bash
npm run deploy
```

Deployment requires Cloudflare Wrangler credentials in the environment. Do not store those credentials in the repository.
