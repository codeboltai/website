# Codebolt Website

This repository generates the Codebolt website with `@codebolt/agent-sitegen`.

The important rule for agents: edit source files in `content/` and `template/`, then regenerate `site/`. Treat `site/` as generated output.

## Repository Layout

```txt
content/
  site.yaml              # Main website content source

template/
  README.md              # Template-specific authoring notes
  sitegen.template.json  # Template manifest and component groups
  src/components/        # Astro components used by site.yaml sections
  public/                # Static assets copied into generated site
  wrangler.jsonc         # Cloudflare Workers static assets config

site/
  # Generated Astro site. Do not hand-edit for durable changes.

scripts/
  export-diagrams.mjs
  generate-code-image.mjs
  exports/               # Generated diagram PNG exports
```

`oldwebsite/` is archived context and should not be treated as active source.

## Common Commands

Validate content against the current template:

```bash
npm run validate
```

Generate the website:

```bash
npm run generate
```

Build the generated website:

```bash
npm run --prefix ./site build
```

Run the full root build:

```bash
npm run build
```

The root `build` script regenerates `site/`, installs generated-site dependencies, and builds `site/dist`.

## Agent Workflow

When the user asks for website content changes:

1. Update `content/site.yaml`.
2. Run `npm run validate`.
3. Run `npm run generate`.
4. Run `npm run --prefix ./site build`.
5. Report the changed source files and verification result.

When the user asks for a new layout, visual pattern, or section capability:

1. Inspect existing template components.
2. Add or update a reusable component in `template/src/components/`.
3. Add an `@sitegen` metadata comment to the component.
4. Update `template/sitegen.template.json` only when template-level grouping, private components, or overrides are needed.
5. Update `content/site.yaml` to use the new section type.
6. Validate, generate, and build.

Do not make durable fixes directly in `site/src/pages` or generated `site/src/data/site-data.js`. Fix the content, template, or generator inputs and regenerate.

## Inspecting Template Capabilities

Use Agent Sitegen to see what components are available.

List discoverable templates:

```bash
sitegen templates list
```

Inspect this template as JSON:

```bash
sitegen templates inspect ./template --json
```

Print an LLM-friendly content prompt for this template:

```bash
sitegen templates prompt ./template
```

These commands read `template/sitegen.template.json` plus `@sitegen` comments in `template/src/components/*.astro`.

## Component Metadata

Content-facing components should include an `@sitegen` comment:

```astro
---
/**
 * @sitegen
 * type: feature-block
 * description: Two-column feature section with text, media, diagram, and optional CTA.
 * group: Content Sections
 */
const { heading, body } = Astro.props;
---
```

Use comments for component metadata:

- `type`
- `description`
- `group`
- optional `props`

Use `template/sitegen.template.json` for template metadata:

- generated paths
- component groups
- private helper components
- explicit component overrides

Helper components such as buttons, layout shells, badges, cards, and navbar/footer pieces should usually stay in `privateComponents`.

## Cloudflare Deployment

This site is deployed as a Cloudflare Workers static assets project, not Cloudflare Pages.

The generated site contains:

```json
{
  "assets": {
    "directory": "./dist"
  }
}
```

in `site/wrangler.jsonc`, copied from `template/wrangler.jsonc`.

For Git-based Cloudflare Workers builds:

If Cloudflare builds from the generated `site/` folder:

```txt
Build command: npm run build
Deploy command: npx wrangler deploy
```

If Cloudflare builds from the repository root:

```txt
Build command: npm run build
Deploy command: cd site && npx wrangler deploy
```

Do not replace this with `wrangler pages deploy` unless the deployment target changes to Cloudflare Pages.

## Diagram Exports

The site build does not require `scripts/exports/`.

Use this only when standalone diagram PNGs are needed:

```bash
npm run export-diagrams
```

The exporter reads the built `site/dist` output and captures elements with `data-export-id`.

## Notes For Agents

- Prefer `rg` for searching content and components.
- Validate before generating when possible.
- Build after generation when the user asks for a deployable site or when template code changed.
- If Astro or Wrangler fails with Windows `spawn EPERM` inside a sandbox, rerun the same command outside the sandbox if available.
- Keep edits scoped. Do not revive `main/generator`; this repo now uses `@codebolt/agent-sitegen`.
