---
name: codebolt-brand-kit
description: "Codebolt's official brand kit — voice, positioning, terminology, audience personas, visual identity, and messaging guardrails. Load this skill whenever creating or editing ANY content for the Codebolt website, blog, social media, documentation, landing pages, investor materials, or marketing copy. Ensures all output follows Codebolt's brand voice (confident, technical, spare), uses correct terminology, respects messaging guardrails, and targets the right audience persona."
---

# Codebolt Brand Kit

Official brand system for all Codebolt content generation. **You MUST follow this kit whenever writing, editing, or reviewing any Codebolt content.**

## Quick Start

Before generating any content, load the relevant files based on the task:

1. **Always read first** — these apply to every content task:
   - [messaging/voice-core.md](messaging/voice-core.md) — how the brand sounds
   - [identity/terminology.yaml](identity/terminology.yaml) — what to call things (and what never to call them)

2. **Then read based on your task** — use the task profiles below to know which files to load.

---

## Task-Based File Loading

Use [_retrieval-rules.yaml](_retrieval-rules.yaml) for the full mapping. Here's the summary:

### Website Copy
Load: `voice-core`, `positioning/brand-positioning.yaml`, `identity/brand-about.md`, `identity/terminology.yaml`
Also consider: `messaging/voice-translations.md`, `messaging/messaging-framework.md`, `guardrails/constraints-messaging.yaml`

### Blog Posts & Articles
Load: `voice-core`, `positioning/brand-positioning.yaml`, `identity/brand-about.md`
Also consider: `messaging/voice-translations.md`, `audience/` personas, `identity/terminology.yaml`

### Social Media
Load: `voice-core`, `messaging/voice-translations.md`, `identity/terminology.yaml`
Also consider: `positioning/brand-positioning.yaml`, `guardrails/constraints-messaging.yaml`

### Technical Documentation
Load: `identity/terminology.yaml`, `identity/brand-about.md`
Also consider: `messaging/voice-core.md`, `guardrails/constraints-messaging.yaml`

### Landing Pages & Marketing
Load: `voice-core`, `positioning/brand-positioning.yaml`, `messaging/messaging-framework.md`, `identity/terminology.yaml`
Also consider: `messaging/voice-translations.md`, `guardrails/constraints-messaging.yaml`, relevant persona from `audience/`

### Investor / Enterprise Materials
Load: `positioning/brand-positioning.yaml`, `identity/brand-about.md`, `positioning/brand-values.yaml`, `messaging/messaging-framework.md`
Also consider: `audience/persona-enterprise-cto.yaml`, `identity/terminology.yaml`

### Design Review
Load: `identity/visual-system.json`, `guardrails/constraints-visual.yaml`
Also consider: `positioning/brand-positioning.yaml`, `identity/terminology.yaml`

---

## File Structure

```
codebolt-brand-kit/
├── SKILL.md                       # This file — skill entry point
├── _retrieval-rules.yaml          # Full task-to-file mappings
├── README.md                      # Brand kit overview
│
├── positioning/                   # Who we are
│   ├── brand-positioning.yaml     # Core positioning, tagline, value prop
│   └── brand-values.yaml          # Engineering philosophy & values
│
├── messaging/                     # How we communicate
│   ├── voice-core.md              # Brand voice definition
│   ├── voice-translations.md      # Do/don't copywriting examples
│   └── messaging-framework.md     # Channel-specific guidelines
│
├── audience/                      # Who we speak to
│   ├── persona-infra-engineer.yaml    # Primary: infrastructure engineer
│   ├── persona-ambitious-scaler.yaml  # Secondary: scaling developer
│   └── persona-enterprise-cto.yaml    # Tertiary: enterprise evaluator
│
├── identity/                      # How we look & what we call things
│   ├── brand-about.md             # Company description (all lengths)
│   ├── visual-system.json         # Colors, typography, design tokens
│   └── terminology.yaml           # Controlled vocabulary
│
└── guardrails/                    # What we never do
    ├── constraints-messaging.yaml # What never to say
    └── constraints-visual.yaml    # What never to show
```

---

## Critical Rules (Always Apply)

These rules apply to ALL content — read the full files for details, but never violate these:

### Voice
- Sound like a senior engineer, not a marketer
- Confident, not loud. Technical, not academic. Spare, not minimal.
- Every word earns its place — if it can be said in 8 words, don't use 20
- Assume the reader is smart and experienced
- Show, don't claim — use evidence, benchmarks, architecture diagrams

### Terminology
- **Codebolt** — one word, capital C. Never "CodeBolt", "Code Bolt", or "CB"
- Use "environment" not "harness", "wrapper", or "framework"
- Use "engineers" or "developers", not "users" or "customers" in product copy
- Use "agent coordination" not "swarm intelligence" or "agent army"
- Use "built from the ground up" not "built from scratch"

### Never Say
- "revolutionary", "game-changing", "magic", "automagic", "unleash", "supercharge"
- "next-gen", "cutting-edge", "world-class", "best-in-class", "disruptive"
- "seamless" (unless backed by specific evidence)
- "We're excited to announce..."
- No exclamation marks in product copy
- Never name competitors directly in negative context
- Never claim "AI that replaces developers"
- Never use "AI-powered" as a differentiator

### Core Thesis
**"The environment is the multiplier, not the model."**
Scaling agents is an engineering problem, not a prompting problem.

### Tagline
**The High-Performance Environment for AI Agents.**
Precision-engineered so agents align better, conflict less, and scale further.

---

## Audience Priority

When unsure who you're writing for, default to the **primary persona**:

1. **Primary** — Infrastructure Engineer: Systems thinker, 5+ years experience, has hit the multi-agent coordination wall. Lead with architecture transparency and evidence.
2. **Secondary** — Ambitious Scaler: Mid-senior dev wanting to scale past single-agent workflows. Lead with progressive complexity and clear growth path.
3. **Tertiary** — Enterprise CTO: Needs governance, traceability, and reliability guarantees. Lead with deterministic execution and audit trails.

Read the full persona files in `audience/` for detailed psychographics and messaging priorities.

---

## Workflow

1. Identify the content type (website copy, blog, social, docs, etc.)
2. Load the required files per the task profile above
3. Write content following voice, terminology, and guardrail rules
4. Cross-check against `guardrails/constraints-messaging.yaml` before finalizing
5. For visual content, also check `guardrails/constraints-visual.yaml`
