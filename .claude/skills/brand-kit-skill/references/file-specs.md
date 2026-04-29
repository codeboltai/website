# File Specifications Reference

Detailed specification for each file in the Agent-First Brand Kit. Generate files in the order listed — positioning informs messaging, messaging informs audience, etc.

---

## Metadata Format

Every file includes metadata. Format varies by file type:

### YAML files
```yaml
## filename.yaml
## [Brand] Brand System v1.0
## Description

metadata:
  chunk_id: "unique-id"
  category: "positioning|messaging|audience|identity|guardrails"
  subcategory: "specific-area"
  context_tags:
    - "tag-1"
    - "tag-2"
  token_count: ~400
  last_updated: "YYYY-MM-DD"
  description: >
    What this chunk contains and when to use it.

---
# Content below the separator
```

### Markdown files
```markdown
# Title

<!--
metadata:
  chunk_id: "unique-id"
  category: "category"
  ...same fields as YAML...
-->

Content here
```

### JSON files
```json
{
  "metadata": {
    "chunk_id": "unique-id",
    ...same fields...
  },
  ...content...
}
```

---

## 1. brand-positioning.yaml

**Path:** `positioning/brand-positioning.yaml`
**Chunk ID:** `positioning-core`
**Purpose:** Single source of truth for what the brand is, who it's for, and how it's different.

**Required fields:**
- `brand_name` — exact name with capitalization
- `tagline` — one line, 8-12 words
- `subtitle` — supporting line, expands the tagline
- `category` — what mental bucket the product occupies
- `market_position` — 2-3 sentence market framing
- `core_thesis` — the contrarian or unique insight behind the brand
- `vision` — where the brand is heading (aspirational)
- `mission` — what the brand does today (grounded)
- `value_proposition` — full paragraph explaining the value
- `positioning_statement` — formal "For [audience], [brand] is the [category] that [differentiator]" format
- `key_differentiators` — list of 4-6 specific, concrete differentiators
- `competitive_frame` — what others optimize vs what this brand optimizes

**Guidelines:**
- The core_thesis should be genuinely contrarian or insight-driven, not just "we're better"
- Differentiators must be specific to THIS brand — reject anything generic
- The competitive_frame should reframe the conversation, not just compare features

---

## 2. brand-values.yaml

**Path:** `positioning/brand-values.yaml`
**Chunk ID:** `brand-values`
**Purpose:** Internal principles and customer-facing values that guide decisions.

**Required fields:**
- `engineering_philosophy` or `company_philosophy` — the core belief
- `core_values` — list of 4-6 values, each with:
  - `name` — short label
  - `internal` — what it means for the team
  - `external` — what it means for the customer
- `product_principles` — list of 5-7 decision-making principles

**Guidelines:**
- Values should create real tension — if the opposite is absurd, the value is too generic
- "We value quality" is useless. "Depth over breadth" creates real tradeoffs

---

## 3. voice-core.md

**Path:** `messaging/voice-core.md`
**Chunk ID:** `voice-core`
**Purpose:** How the brand sounds across all communications.

**Required sections:**
- **Voice Character** — who the brand sounds like (use a concrete analogy)
- **Personality → Tone Mapping** — 4-5 personality traits, each mapped to a tone with format: `[Trait], not [opposite] → [Tone name]` with explanation
- **Voice Guardrails** — specific words and phrases to never use
- **Sentence Style** — 3+ pairs of ✅ correct / ❌ incorrect examples

**Guidelines:**
- The voice character analogy should be vivid and specific
- Guardrails should list actual forbidden words, not just categories
- Do/don't examples must use the brand's actual subject matter

---

## 4. voice-translations.md

**Path:** `messaging/voice-translations.md`
**Chunk ID:** `voice-translations`
**Purpose:** Concrete do/don't examples organized by context.

**Required sections (minimum 5):**
- Product Copy — do/don't pairs
- Marketing / Landing Page — do/don't pairs
- Social Media — do/don't pairs
- Technical Documentation — do/don't pairs
- Competitive Positioning — do/don't pairs
- Handling Limitations — do/don't pairs
- Key Vocabulary table — "Use This" vs "Not This" (minimum 10 rows)

**Guidelines:**
- Every do/don't must be a complete sentence, not a fragment
- Examples must be specific to the brand's domain
- The vocabulary table is critical for agents — be thorough

---

## 5. messaging-framework.md

**Path:** `messaging/messaging-framework.md`
**Chunk ID:** `messaging-framework`
**Purpose:** Messaging hierarchy and channel-specific guidelines.

**Required sections:**
- **Messaging Hierarchy** — Layer 1 (Hero/3-sec), Layer 2 (Thesis/10-sec), Layer 3 (Description/30-sec), Layer 4 (Proof/deep-dive), each with actual copy and purpose
- **Channel-Specific Guidelines** — at minimum: Homepage, Technical Docs, Blog, Social Media, Investor/Enterprise, Onboarding
- **Key Messages** — priority-ordered list of 5-7 core messages

**Guidelines:**
- Each hierarchy layer must contain actual copy, not just descriptions
- Channel guidelines should specify tone differences, not just content differences

---

## 6. persona-[name].yaml (×3)

**Path:** `audience/persona-[name].yaml`
**Chunk ID:** `persona-[name]`
**Purpose:** One file per customer segment.

**Required fields:**
- `persona_name` — descriptive label
- `priority` — primary / secondary / tertiary
- `demographics` — role, experience, environment, tools_used
- `psychographics` — mindset, frustration, aspiration, trigger_phrase
- `what_they_value` — list of 4-6 items
- `what_they_reject` — list of 3-4 items
- `how_to_reach_them` — list of 4-6 channels/methods
- `messaging_priority` — lead_with, support_with, close_with

**Guidelines:**
- trigger_phrase is the thing they say that signals they need this product
- Psychographics matter more than demographics — get specific about mindset
- Generate 3 personas: primary (early adopter), secondary (growth), tertiary (future/enterprise)

---

## 7. brand-about.md

**Path:** `identity/brand-about.md`
**Chunk ID:** `brand-about`
**Purpose:** Plain-language company description at multiple lengths.

**Required sections:**
- **One Line** — single sentence
- **One Paragraph** — 3-4 sentences
- **Extended Description** — 3-4 paragraphs with full context
- **Origin** — why the brand exists (2-3 sentences)
- **What [Brand] Is Not** — list of 4-6 common misclassifications

**Guidelines:**
- The "Is Not" section prevents misclassification by agents and humans
- Extended description should include the core thesis naturally

---

## 8. visual-system.json

**Path:** `identity/visual-system.json`
**Chunk ID:** `visual-system`
**Purpose:** Design tokens for colors, typography, and spacing.

**Required fields:**
- `design_philosophy` — one sentence
- `color_system` — primary, secondary, neutral palettes with hex, rgb, usage
- `typography` — font_families (primary + monospace), scale (display through caption)
- `spacing` — base_unit and scale
- `visual_principles` — list of 5-7 guiding principles

**Guidelines:**
- If user has existing brand colors, use those
- If not, select colors that match the brand personality (not generic tech blue)
- Always include dark/light mode guidance
- Typography must include fallback stacks

---

## 9. terminology.yaml

**Path:** `identity/terminology.yaml`
**Chunk ID:** `terminology`
**Purpose:** Controlled vocabulary — what to call things and what to avoid.

**Required sections:**
- `product_terminology` — how to refer to the product itself
- `concept_terminology` — key concepts and preferred/avoided terms
- `audience_terminology` — how to refer to users
- `competitive_terminology` — how to reference competitors
- `words_we_use` — approved vocabulary list
- `words_we_never_use` — banned vocabulary list

**Guidelines:**
- Product name spelling/capitalization is critical — specify all incorrect variants
- Concept terminology should include context for WHY certain terms are preferred

---

## 10. constraints-messaging.yaml

**Path:** `guardrails/constraints-messaging.yaml`
**Chunk ID:** `guardrails-messaging`
**Purpose:** What the brand should never say, claim, or imply.

**Required sections:**
- `never_claim` — list of specific claims with reasons
- `never_imply` — list of implications to avoid with corrections
- `tone_guardrails` — list of tone rules
- `competitive_guardrails` — rules for competitive mentions

**Guidelines:**
- Every constraint must have a reason — naked rules get ignored
- Include corrections/alternatives for each constraint

---

## 11. constraints-visual.yaml

**Path:** `guardrails/constraints-visual.yaml`
**Chunk ID:** `guardrails-visual`
**Purpose:** Visual constraints to protect brand consistency.

**Required sections:**
- `logo_constraints`
- `color_constraints`
- `typography_constraints`
- `imagery_constraints`
- `tone_visual_constraints`
- `overall_principle`

---

## 12. _retrieval-rules.yaml

**Path:** `_retrieval-rules.yaml`
**Purpose:** Task-to-chunk mappings for agent retrieval.

**Required task profiles (minimum):**
- `website_copy`
- `blog_post`
- `social_media`
- `technical_docs`
- `investor_pitch`
- `sales_enterprise`
- `onboarding_copy`
- `press_release`
- `design_review`
- `competitive_response`

Each profile needs: `description`, `always_load` (list), `load_if_relevant` (list), `token_budget` (number).

---

## 13. README.md

**Path:** `README.md`
**Purpose:** Human-readable overview of the entire kit.

**Required sections:**
- File structure tree
- How to use (for humans, agents, designers)
- Core brand thesis (2-3 sentences)
- Quick reference table (brand name, tagline, subtitle, category, voice, audience, fonts, primary color)
