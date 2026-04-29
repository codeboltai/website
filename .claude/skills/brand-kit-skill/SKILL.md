---
name: agent-brand-kit
description: "Generate a complete Agent-First Brand Kit — structured brand infrastructure files (YAML, Markdown, JSON) that work for both humans and AI agents. Use this skill whenever the user asks to create brand files, brand guidelines, brand positioning, a brand bible, brand infrastructure, agent-readable brand files, a brand kit, brand voice guidelines, or brand identity documents. Also trigger when the user says 'create brand files for [company]', 'build a brand system', 'make brand guidelines', 'write brand positioning', or any variation involving brand + structured files. This skill produces the full set of files described in Emmett Shine's Agent-First Brand Kit framework: positioning, messaging, audience personas, identity, guardrails, and retrieval rules — all as ~400-token chunks with metadata frontmatter for agent consumption."
---

# Agent-First Brand Kit Generator

## Overview

This skill generates a **dual-native brand system** — structured files that work for both humans reading them and AI agents consuming them for content generation. Based on the framework described by Emmett Shine (Gin Lane / Little Plains).

Every file is a ~400-token chunk with metadata frontmatter (chunk_id, category, context_tags, token_count) so agents can parse, index, and retrieve the right brand guidance for any task.

## What You Need From the User

Before generating files, gather this information through conversation. Don't ask all at once — be natural. At minimum you need items 1-4:

1. **Brand name** — exact capitalization and spelling
2. **What the product/company does** — plain language, 2-3 sentences
3. **Who it's for** — target audience (can be multiple segments)
4. **Key differentiators** — what makes it different from alternatives
5. **Brand personality / tone** — how should it sound? (if not specified, infer from context)
6. **Competitive landscape** — who are the alternatives? (optional but helpful)
7. **Stage** — early startup, growth, enterprise? (affects messaging honesty)
8. **Visual preferences** — any existing colors, fonts, dark/light mode preference? (optional)

If the user has already discussed positioning, voice, and differentiation in the conversation, extract what you need from that context rather than re-asking.

## Output Structure

Generate all files into a directory called `[brand-name]-brand-kit/`. Always produce the full set:

```
[brand-name]-brand-kit/
├── _retrieval-rules.yaml
├── README.md
├── positioning/
│   ├── brand-positioning.yaml
│   └── brand-values.yaml
├── messaging/
│   ├── voice-core.md
│   ├── voice-translations.md
│   └── messaging-framework.md
├── audience/
│   ├── persona-[primary].yaml
│   ├── persona-[secondary].yaml
│   └── persona-[tertiary].yaml
├── identity/
│   ├── brand-about.md
│   ├── visual-system.json
│   └── terminology.yaml
└── guardrails/
    ├── constraints-messaging.yaml
    └── constraints-visual.yaml
```

## File Specifications

Read `references/file-specs.md` for the detailed specification of each file including required fields, metadata format, and content guidelines.

## Generation Process

1. **Gather inputs** — Extract or ask for the information listed above
2. **Create directory structure** — `mkdir -p [name]-brand-kit/{positioning,messaging,audience,identity,guardrails}`
3. **Generate files in order** — Follow the order in `references/file-specs.md`. Positioning first (it informs everything else), then messaging, audience, identity, guardrails. Retrieval rules and README last.
4. **Package as zip** — `cd /home/claude && zip -r /mnt/user-data/outputs/[name]-brand-kit.zip [name]-brand-kit/`
5. **Present to user** — Use present_files to deliver the zip

## Critical Rules

- **Every file gets metadata frontmatter** with chunk_id, category, subcategory, context_tags, token_count (~400), last_updated, and description
- **YAML files** use `---` separators between metadata and content
- **Markdown files** use HTML comments `<!-- -->` for metadata blocks
- **JSON files** include metadata as a top-level object
- **Keep each chunk ~400 tokens** — this is the target size for agent retrieval
- **Be specific, not generic** — every file should contain content unique to THIS brand, not boilerplate that could apply to anyone
- **Voice translations must include concrete do/don't examples** — at least 5 pairs
- **Personas must include psychographics** — not just demographics
- **Terminology must include both "use this" and "never use this"** lists
- **Guardrails must include specific claims the brand should never make**
- **The README must include a quick-reference table** with brand name, tagline, category, primary color, and primary font

## Tone of the Files Themselves

Write the files in a professional, clear, direct style. The files are infrastructure — they should read like well-written technical documentation, not marketing copy. Be specific and actionable in every guideline.
