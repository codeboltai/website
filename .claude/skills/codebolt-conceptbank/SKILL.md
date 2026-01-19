---
name: codebolt-conceptbank
description: Access CodeBolt's comprehensive knowledge base for information on its features, architecture, philosophy, and implementation. Use this to generate marketing copy, technical documentation, sales materials, or competitive analysis. Contains deep insights into multi-agent coordination, stigmergy, infinite context, swarm management, and agentic IDE concepts.
---

# CodeBolt Concept Bank

Progressive disclosure system for discovering information about CodeBolt.

## Quick Start

**For general questions about CodeBolt**:
1. Read [00-executive-summary.md](00-executive-summary.md) for 5-minute overview
2. Drill into relevant [01-category-overviews/](01-category-overviews/) files (10 min each)
3. Access [02-concept-details/](02-concept-details/) for specific information

**For task-specific guidance** (marketing, documentation, sales):
- See [references/by-task.md](references/by-task.md) for task-based discovery

**For role-based information**:
- See [references/by-persona.md](references/by-persona.md) for persona-specific concepts

## The 4-Level Architecture

```
Level 1: Executive Summary (1 file)
    ↓ "Tell me about [category]"
Level 2: Category Overviews (15 files)
    ↓ "How do I [specific task]?"
Level 3: Concept Details (~150 files)
    ↓ "Show me technical details"
Level 4: Deep Dives (~5 files)
```

### When to Use Each Level

**Level 1**: [00-executive-summary.md](00-executive-summary.md)
- User asks "What is CodeBolt?"
- User asks "Tell me about CodeBolt"
- User needs high-level overview
- Starting point for any exploration

**Level 2**: [01-category-overviews/](01-category-overviews/)
- User asks about a specific area (swarms, agents, coordination, etc.)
- User needs category-level understanding
- Bridge between overview and details

Categories:
1. [00-core-identity.md](01-category-overviews/00-core-identity.md) - What is CodeBolt, positioning
2. [01-philosophy.md](01-category-overviews/01-philosophy.md) - Multi-agent, stigmergy, infinite context
3. [02-swarm-management.md](01-category-overviews/02-swarm-management.md) - Creating and managing agent teams
4. [03-agent-systems.md](01-category-overviews/03-agent-systems.md) - Agent types, creation, lifecycle
5. [04-coordination.md](01-category-overviews/04-coordination.md) - Stigmergy, pheromones, consensus
6. [05-memory-knowledge.md](01-category-overviews/05-memory-knowledge.md) - 6 memory types, knowledge graph
7. [06-work-execution.md](01-category-overviews/06-work-execution.md) - Jobs, tasks, planning
8. [07-communication.md](01-category-overviews/07-communication.md) - Deliberation, mail, calendar
9. [08-tools-integrations.md](01-category-overviews/08-tools-integrations.md) - Dev tools, MCP integration
10. [09-observability.md](01-category-overviews/09-observability.md) - Debug, monitoring, review
11. [10-use-cases.md](01-category-overviews/10-use-cases.md) - Real-world applications
12. [11-user-personas-journeys.md](01-category-overviews/11-user-personas-journeys.md) - Personas & journeys
13. [12-business-strategy.md](01-category-overviews/12-business-strategy.md) - Value prop & ROI
14. [13-showcase-examples.md](01-category-overviews/13-showcase-examples.md) - Demos & workflows
15. [14-technical-internals.md](01-category-overviews/14-technical-internals.md) - Architecture & Backend

**Level 3**: [02-concept-details/](02-concept-details/)
- User needs specific feature details
- User asks "How do I..." for specific tasks
- Implementation guidance needed

**Level 4**: [03-deep-dives/](03-deep-dives/)
- User needs technical implementation details
- User asks about algorithms, internals, architecture
- Advanced technical questions

## File Reading Strategy

### Always Read Metadata First
All files have YAML frontmatter. Read frontmatter to:
- Check `level` to understand depth
- Check `tags` for relevance filtering
- Check `prerequisites` for dependencies
- Check `estimated_read_time` for context sizing

### Progressive Loading
1. Start with smallest file that might answer the question
2. Check `related_concepts` in frontmatter for links
3. Follow `next_level` links for deeper information
4. Only load additional files as needed

### Search Strategy
When looking for specific information:
1. Check [references/navigation.md](references/navigation.md) for discovery patterns
2. Use file paths as hints (e.g., `features/stigmergy-system/` = stigmergy)
3. Follow `related_concepts` links from relevant files
4. Check [02-concept-details/_index.md](02-concept-details/_index.md) for complete concept listing

## Common Tasks

### "I need to write marketing copy"
1. Read [00-executive-summary.md](00-executive-summary.md)
2. Read [01-category-overviews/00-core-identity.md](01-category-overviews/00-core-identity.md)
3. Read [01-category-overviews/01-philosophy.md](01-category-overviews/01-philosophy.md)
4. Check [references/by-task.md](references/by-task.md) for specific guidance

### "I need technical documentation"
1. Read relevant category overview from [01-category-overviews/](01-category-overviews/)
2. Access specific feature from [02-concept-details/features/](02-concept-details/features/)
3. Check [03-deep-dives/](03-deep-dives/) for technical internals

### "I need sales materials"
1. Read [00-executive-summary.md](00-executive-summary.md)
2. Read [02-concept-details/business/value-proposition/value-by-persona.md](02-concept-details/business/value-proposition/value-by-persona.md)
3. Read [02-concept-details/business/competitive-landscape/](02-concept-details/business/competitive-landscape/)

### "How does [feature X] work?"
1. Find relevant category in [01-category-overviews/](01-category-overviews/)
2. Drill into specific concept in [02-concept-details/features/](02-concept-details/features/)
3. Check [03-deep-dives/](03-deep-dives/) if technical details needed

## Navigation Aids

### For Task-Based Discovery
See [references/by-task.md](references/by-task.md) for:
- "I need to write marketing copy"
- "I need to write technical documentation"
- "I need to create sales materials"
- And more...

### For Persona-Based Discovery
See [references/by-persona.md](references/by-persona.md) for:
- Enterprise Architect
- Startup CTO
- Tech Lead
- DevOps Champion
- Solo Developer
- And more...

### For Content Type-Based Discovery
See [references/by-content-type.md](references/by-content-type.md) for:
- Website copy
- Sales pitch/deck
- User documentation
- Blog posts
- Social media
- And more...

## Key Concepts Summary

**Multi-Agent First**: CodeBolt is fundamentally architected around multiple AI agents working in parallel, not single-agent assistance.

**Stigmergy Coordination**: Agents coordinate through pheromone signals in the codebase, no central orchestrator needed.

**Infinite Context**: 6 memory types (semantic, episodic, working, procedural, social, encyclopedia) overcome LLM context limitations.

**Full Observability**: Every agent action, decision, and communication is traceable.

**Agent Economy**: Karma, testimonials, and talent systems enable emergent leadership.

## File Structure Notes

- [00-executive-summary.md](00-executive-summary.md) - Always start here
- [01-category-overviews/](01-category-overviews/) - 15 category overview files
- [02-concept-details/](02-concept-details/) - Existing detailed concepts (~150 files)
- [03-deep-dives/](03-deep-dives/) - Technical deep dives
- [references/](references/) - Navigation and task guides (load as needed)

## Best Practices

1. **Start simple**: Begin with Level 1, drill down only as needed
2. **Follow links**: Use `related_concepts` and `next_level` frontmatter
3. **Check references**: Use `references/` files for task/persona/content guidance
4. **Read selectively**: Don't load entire directory structures
5. **Trust metadata`: Use frontmatter to filter before reading full content

## For More Information

- [references/navigation.md](references/navigation.md) - Complete navigation guide
- [references/by-task.md](references/by-task.md) - Task-based discovery
- [references/by-persona.md](references/by-persona.md) - Persona-based discovery
- [references/by-content-type.md](references/by-content-type.md) - Content type-based discovery
