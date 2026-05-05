surf-# Codebolt Agent-First Brand Kit
## Version 1.0 | February 2026

This is Codebolt's dual-native brand system — structured data that works for
both humans reading files and AI agents consuming them for content generation.

Every file is designed as a ~400-token chunk with metadata frontmatter so agents
can parse, index, and retrieve the right brand guidance for any task.

---

## File Structure

```
codebolt-brand-kit/
├── _retrieval-rules.yaml          # Task-to-chunk mappings for agents
├── README.md                      # This file
│
├── positioning/                   # Who we are, who we're for
│   ├── brand-positioning.yaml     # Core positioning & value proposition
│   └── brand-values.yaml          # Internal principles & customer-facing values
│
├── messaging/                     # How we communicate
│   ├── voice-core.md              # How the brand sounds
│   ├── voice-translations.md      # Do/don't examples for copywriting
│   └── messaging-framework.md     # Channel-specific guidelines & hierarchy
│
├── audience/                      # Who we speak to
│   ├── persona-infra-engineer.yaml    # Primary: infrastructure-minded engineer
│   ├── persona-ambitious-scaler.yaml  # Secondary: developer scaling up
│   └── persona-enterprise-cto.yaml    # Tertiary: enterprise evaluator
│
├── identity/                      # How we look and what we call things
│   ├── brand-about.md             # Plain-language company description
│   ├── visual-system.json         # Colors, typography, design tokens
│   └── terminology.yaml           # Controlled vocabulary
│
└── guardrails/                    # What we never do
    ├── constraints-messaging.yaml # What never to say
    └── constraints-visual.yaml    # What never to show
```

---

## How to Use

### For Humans
Read the files directly. Start with `brand-positioning.yaml` for the strategic
foundation, then `voice-core.md` for tone guidance. Reference `terminology.yaml`
and `voice-translations.md` when writing any content.

### For Agents
Load files based on `_retrieval-rules.yaml`. Each task profile specifies which
chunks to load (`always_load`) and which to conditionally include
(`load_if_relevant`). Respect token budgets for context management.

### For Designers
Start with `visual-system.json` for design tokens. Reference
`constraints-visual.yaml` for what to avoid. The visual philosophy mirrors
the product: precision-engineered, nothing decorative, everything intentional.

---

## Core Brand Thesis

**The environment is the multiplier, not the model.**

Scaling agents is an engineering problem, not a prompting problem.
Agents don't need better models — they need a better environment.
Codebolt is that environment.

---

## Quick Reference

| Element            | Value                                                              |
|--------------------|--------------------------------------------------------------------|
| Brand name         | Codebolt (one word, capital C)                                     |
| Tagline            | The High-Performance Environment for AI Agents.                    |
| Subtitle           | Precision-engineered so agents align better, conflict less, and scale further. |
| Category           | High-Performance AI Development Environment                       |
| Voice              | Confident, technical, spare, warm but not casual                   |
| Primary audience   | Infrastructure-minded engineers scaling AI agents                  |
| Primary font       | Inter                                                              |
| Monospace font     | JetBrains Mono                                                     |
| Primary color      | #2563EB (Bolt Blue)                                                |
| Dark background    | #0F172A (Bolt Dark)                                                |
