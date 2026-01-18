---
id: "conceptbank-readme"
title: "CodeBolt Concept Bank - Progressive Disclosure"
version: "2.0.0"
last_updated: "2026-01-18"
---

# CodeBolt Concept Bank

**A Progressive Disclosure System for Understanding CodeBolt**

This concept bank uses a 4-level progressive disclosure architecture to help you (and AI agents) discover information incrementally based on your needs, rather than overwhelming you with all information at once.

## Quick Start

**New to CodeBolt?** Start here:
1. [Executive Summary](00-executive-summary.md) - 5-minute overview of everything
2. Choose a category from [Category Overviews](01-category-overviews/) based on your interests
3. Drill into specific concepts as needed

**Looking for something specific?**
- [By Task](_navigation/by-task.md) - "I need to..." → relevant concepts
- [By Persona](_navigation/by-persona.md) - "I am a..." → relevant concepts
- [By Content Type](_navigation/by-content-type.md) - "Writing..." → relevant concepts

## The Progressive Disclosure Architecture

### The Hierarchy

```
Level 1: Executive Summary (1 file, 5 min)
    ↓ "Tell me about [category]"
Level 2: Category Overviews (~10 files, 10 min each)
    ↓ "How do I [specific task]?"
Level 3: Concept Details (~150 files, 5 min each)
    ↓ "Show me the technical details"
Level 4: Deep Dives (~20 files, 15 min each)
```

### How It Works

1. **Start at Level 1** - Read [Executive Summary](00-executive-summary.md) for the 5-minute overview
2. **Identify relevant categories** - Based on your needs, choose relevant Level 2 overviews
3. **Drill into Level 3** - Get specific concept details as needed
4. **Follow related_concepts links** - Discover connected information naturally
5. **Use Level 4 for advanced needs** - Technical deep dives when necessary

## Directory Structure

```
conceptbank/
│
├── README_PROGRESSIVE_DISCLOSURE.md   # This file - navigation guide
├── 00-executive-summary.md             # Level 1: The entire system in 5 min
│
├── 01-category-overviews/              # Level 2: 10-minute summaries
│   ├── index.md                        # Guide to category overviews
│   ├── 00-core-identity.md             # What is CodeBolt, why it exists
│   ├── 01-philosophy.md                # Multi-agent, stigmergy, infinite context
│   ├── 02-swarm-management.md          # Swarms, teams, roles, vacancies
│   ├── 03-agent-systems.md             # Agent types, creation, lifecycle
│   ├── 04-coordination.md              # Stigmergy, pheromones, consensus
│   ├── 05-memory-knowledge.md          # 6 memory types, knowledge graph
│   ├── 06-work-execution.md            # Jobs, tasks, planning
│   ├── 07-communication.md             # Deliberation, mail, calendar
│   ├── 08-tools-integrations.md        # Development tools, MCP
│   └── 09-observability.md             # Debug, monitoring, review
│
├── 02-concept-details/                 # Level 3: Detailed concepts
│   ├── core/                           # Core identity, philosophy, terminology
│   ├── features/                       # Product capabilities
│   ├── business/                       # Business strategy, positioning
│   ├── technical/                      # Technical architecture
│   ├── users/                          # User personas, journeys
│   └── use-cases/                      # Real-world applications
│
├── 03-deep-dives/                      # Level 4: Advanced technical details
│   ├── stigmergy-algorithms.md         # How pheromones work technically
│   ├── agent-runtime-internals.md      # Agent execution model
│   └── memory-system-internals.md      # Memory implementation
│
└── _navigation/                        # Navigation aids
    ├── by-task.md                      # "I need to..." → relevant concepts
    ├── by-persona.md                   # "I am a..." → relevant concepts
    └── by-content-type.md              # "Writing..." → relevant concepts
```

## File Format Standards

All files follow a consistent frontmatter format:

```yaml
---
id: "unique-identifier"
level: 1-4
category: "category-name"
estimated_read_time: "X minutes"
tags: ["tag1", "tag2", ...]
---
```

This enables:
- **Machine parsing**: AI agents can easily parse and understand file structure
- **Consistency**: Predictable navigation and linking
- **Metadata**: Rich metadata for search and discovery

## Usage Patterns

### Pattern 1: Quick Overview
```
1. Read 00-executive-summary.md (5 min)
2. Identify relevant categories
3. Read specific 01-category-overviews/ (10 min each)
4. Done (for high-level understanding)
```

### Pattern 2: Task-Based Discovery
```
1. Check _navigation/by-task.md
2. Follow recommended path
3. Drill into Level 3 as needed
4. Follow related_concepts links
```

### Pattern 3: Deep Technical Understanding
```
1. Read relevant 01-category-overviews/
2. Read all Level 3 concepts in category
3. Read Level 4 deep dives
4. Explore technical references
```

## Agent Usage

This concept bank is designed to be agent-friendly:

### For AI Agents

**Quick Context Loading**:
- Load only relevant files based on task
- Use frontmatter metadata to filter by level, category, tags
- Follow `next_level` and `related_concepts` links for discovery

**Example Agent Prompt**:
```
You are working on: "Creating marketing copy for CodeBolt"

Load these concept files:
1. 00-executive-summary.md
2. 01-category-overviews/00-core-identity.md
3. 02-concept-details/business/value-proposition/

Use the information to create compelling marketing copy that accurately
represents CodeBolt's unique value proposition.
```

### For Humans

**Discovery**: Start at Level 1 and drill down based on curiosity
**Reference**: Use navigation aids to find specific information
**Learning**: Follow progressive levels for deep understanding

## Key Benefits

1. **Reduced Cognitive Load** - Start simple, add complexity as needed
2. **Faster Time to Value** - Get answers quickly without reading everything
3. **Natural Discovery** - Follow curiosity through related concepts
4. **Agent-Friendly** - AI agents can load only what they need
5. **Multi-Modal** - Works for quick lookups and deep research

## Verification

Test the progressive disclosure by:

### Navigation Test
Can you go from Level 1 to any specific concept easily?
- Start at [00-executive-summary.md](00-executive-summary.md)
- Follow category links to [01-category-overviews/](01-category-overviews/)
- Follow `next_level` links to [02-concept-details/](02-concept-details/)
- Follow `see_also` links to [03-deep-dives/](03-deep-dives/)

### Completeness Test
Does every Level 3 concept link back to its Level 2 overview?
- Each Level 3 file should have a `prerequisites` field pointing to Level 2
- Each Level 3 file should have a "← Back to Category Overview" link

### Agent Test
Can an agent find relevant information for a task efficiently?
- Can agent load only files needed for a specific task?
- Can agent follow navigation paths to discover related information?
- Is metadata sufficient for filtering and selection?

### Discovery Test
Can you discover related concepts naturally?
- Do `related_concepts` links work?
- Can you navigate from concept to related concept?
- Do navigation aids help find information by task/persona/content type?

## Maintenance

### Adding New Concepts

When adding new concept files:

1. **Choose appropriate level** (1-4)
2. **Follow frontmatter format** with appropriate metadata
3. **Add links** to related concepts
4. **Update navigation aids** if creating new categories
5. **Update indexes** if applicable

### Updating Existing Concepts

When updating concept files:

1. **Maintain frontmatter** metadata
2. **Update `last_updated`** field
3. **Verify links** still work
4. **Update related concepts** if content changes significantly

## File Inventory

### Level 1: Executive Summary
- `00-executive-summary.md` - Complete overview

### Level 2: Category Overviews (10 files)
- `01-category-overviews/index.md` - Category index
- `01-category-overviews/00-core-identity.md` - Core identity
- `01-category-overviews/01-philosophy.md` - Philosophy
- `01-category-overviews/02-swarm-management.md` - Swarm management
- `01-category-overviews/03-agent-systems.md` - Agent systems
- `01-category-overviews/04-coordination.md` - Coordination
- `01-category-overviews/05-memory-knowledge.md` - Memory & knowledge
- `01-category-overviews/06-work-execution.md` - Work execution
- `01-category-overviews/07-communication.md` - Communication
- `01-category-overviews/08-tools-integrations.md` - Tools & integrations
- `01-category-overviews/09-observability.md` - Observability

### Level 3: Concept Details (~150 existing files)
- `core/` - Core concepts (identity, philosophy, terminology)
- `features/` - Product capabilities
- `business/` - Business strategy
- `technical/` - Technical architecture
- `users/` - User personas and journeys
- `use-cases/` - Real-world applications

### Level 4: Deep Dives (3 new files)
- `03-deep-dives/stigmergy-algorithms.md` - Technical stigmergy implementation
- `03-deep-dives/agent-runtime-internals.md` - Agent execution model
- `03-deep-dives/memory-system-internals.md` - Memory system architecture

### Navigation Aids (3 files)
- `_navigation/by-task.md` - Find concepts by task
- `_navigation/by-persona.md` - Find concepts by persona
- `_navigation/by-content-type.md` - Find concepts by content type

## Contributing

When contributing to the concept bank:

1. **Match the format** - Use existing files as templates
2. **Link appropriately** - Add bidirectional links to related concepts
3. **Update metadata** - Include all relevant frontmatter fields
4. **Test navigation** - Ensure links work and discovery paths exist
5. **Document changes** - Update this README if adding categories

## Support

For questions or issues:
- Check navigation aids for discovery paths
- Verify links are working
- Check frontmatter metadata is complete
- Ensure file is at appropriate level

---

**Version**: 2.0.0 (Progressive Disclosure Architecture)
**Last Updated**: 2026-01-18
**Status**: Active

**Start Here**: [00-executive-summary.md](00-executive-summary.md)
