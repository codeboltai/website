# Navigation Guide

Complete guide for navigating the CodeBolt concept bank using progressive disclosure.

## Progressive Disclosure Levels

### Level 1: Executive Summary
**File**: `00-executive-summary.md`
**Read Time**: 5 minutes
**When to use**: Starting point, broad questions, "What is CodeBolt?"

**What you get**:
- Complete product overview
- Key differentiators
- Quick category guide
- Common starting points

### Level 2: Category Overviews
**Directory**: `01-category-overviews/`
**Read Time**: 8-12 minutes each
**When to use**: Understanding specific areas, bridging overview and details

**Available categories**:
1. `00-core-identity.md` - Product definition and positioning
2. `01-philosophy.md` - Multi-agent, stigmergy, infinite context
3. `02-swarm-management.md` - Creating and managing agent teams
4. `03-agent-systems.md` - Agent types, creation, lifecycle
5. `04-coordination.md` - Stigmergy, pheromones, consensus
6. `05-memory-knowledge.md` - 6 memory types, knowledge graph
7. `06-work-execution.md` - Jobs, tasks, planning
8. `07-communication.md` - Deliberation, mail, calendar
9. `08-tools-integrations.md` - Dev tools, MCP
10. `09-observability.md` - Debug, monitoring, review
11. `10-use-cases.md` - Real-world applications
12. `11-user-personas-journeys.md` - Personas & journeys
13. `12-business-strategy.md` - Value prop & ROI
14. `13-showcase-examples.md` - Demos & workflows
15. `14-technical-internals.md` - Architecture & Backend

**What you get**:
- 10-minute category summary (15 categories available)
- Key concepts with links to details
- Quick start paths
- Related concepts

### Level 3: Concept Details
**Directory**: `02-concept-details/`
**Read Time**: 5 minutes each
**When to use**: Specific feature details, implementation guidance

**Structure**:
- `core/` - Identity, philosophy, terminology
- `features/` - All product capabilities
- `business/` - Strategy, positioning, competition
- `technical/` - Architecture, implementation
- `users/` - Personas, journeys
- `use-cases/` - Real-world applications

**What you get**: Detailed explanations, examples, use cases

### Level 4: Deep Dives
**Directory**: `03-deep-dives/`
**Read Time**: 15-30 minutes each
**When to use**: Technical implementation details, advanced understanding

**Available**:
- `stigmergy-algorithms.md` - How pheromones work technically
- `agent-runtime-internals.md` - Agent execution model
- `memory-system-internals.md` - Memory architecture

**What you get**: Technical algorithms, code examples, internals

## Navigation Strategies

### Strategy 1: Top-Down Discovery
```
Start: 00-executive-summary.md
  ↓
Choose relevant category from 01-category-overviews/
  ↓
Drill into specific concepts in 02-concept-details/
  ↓
Read 03-deep-dives/ for technical details
```

### Strategy 2: Task-Based
Go directly to relevant concept based on task:
- Writing marketing copy → `01-category-overviews/00-core-identity.md`
- Creating agents → `01-category-overviews/03-agent-systems.md`
- Understanding coordination → `01-category-overviews/04-coordination.md`
- Technical docs → `01-category-overviews/08-tools-integrations.md`

### Strategy 3: Search-Based
Use file structure as search hints:
- `features/swarm-management/` → Swarm-related concepts
- `features/agent-management/` → Agent-related concepts
- `features/stigmergy-system/` → Coordination concepts
- `business/` → Business strategy and positioning

### Strategy 4: Link-Following
Use metadata links:
- `related_concepts` → Find connected information
- `next_level` → Drill down to details
- `see_also` → Related advanced topics

## Frontmatter Metadata

Every file has frontmatter with navigation data:

```yaml
---
id: "unique-identifier"
level: 1-4
category: "category-name"
estimated_read_time: "X minutes"
prerequisites: ["file1.md", "file2.md"]
related_concepts: ["concept1", "concept2"]
see_also: ["deep-dive.md"]
tags: ["tag1", "tag2", "..."]
---
```

**Use this to**:
- Filter by level (1=basic, 4=advanced)
- Find related concepts
- Check prerequisites
- Estimate context size

## Directory Index

### Complete Concept Listing
See `02-concept-details/_index.md` for full alphabetical index of all ~150 concepts with descriptions and links.

### Category-Based Index
Each Level 2 category overview has links to all related Level 3 concepts.

## Quick Reference

### For "What is..." Questions
→ Start with `00-executive-summary.md`
→ Then relevant `01-category-overviews/` file

### For "How do I..." Questions
→ Find relevant category in `01-category-overviews/`
→ Drill into `02-concept-details/features/`

### For "Why..." Questions
→ Check `01-category-overviews/01-philosophy.md`
→ Check `02-concept-details/core/philosophy/`

### For Technical Questions
→ Start in relevant `01-category-overviews/` file
→ Check `03-deep-dives/` for internals

## Efficiency Tips

1. **Read frontmatter first** - Check if file is relevant before reading full content
2. **Start at highest level** - Don't jump to Level 3 if Level 2 will answer the question
3. **Follow link chains** - Use `related_concepts` for discovery
4. **Use category structure** - File paths indicate content (e.g., `features/swarm-management/`)
5. **Check references** - Use `references/by-task.md`, `by-persona.md`, `by-content-type.md` for guidance
