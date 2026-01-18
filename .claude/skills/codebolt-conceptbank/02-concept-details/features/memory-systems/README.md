---
id: memory-systems-concept-documentation
title: CodeBolt Memory Systems - Concept Documentation
category: features
subcategory: memory-systems
tags: ["readme", "overview", "memory", "architecture", "persistent-storage", "knowledge-graph"]
audience: ["technical", "business", "user"]
difficulty: "beginner"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["context-assembly", "swarm-management"]
content_type: "overview"
status: "published"
---

# CodeBolt Memory Systems - Concept Documentation

This directory contains comprehensive conceptual documentation for CodeBolt's memory architecture and systems.

## Overview

CodeBolt's memory system is a multi-layered, persistent storage architecture that enables agents to maintain context, learn from experiences, and access unlimited knowledge despite LLM context window limitations.

## Concept Files

### Core Architecture

1. **[memory-architecture.md](./memory-architecture.md)**
   - Overall system design and integration
   - Six memory types and their purposes
   - Storage organization and architecture principles
   - Use cases for multi-agent swarms and long-running projects

2. **[memory-integration.md](./memory-integration.md)**
   - How memory types work together
   - PersistentMemory DSL for declarative definitions
   - Pipeline processing and context assembly
   - Memory ingestion and automation

### Memory Types

3. **[episodic-memory.md](./episodic-memory.md)**
   - Append-only event logs
   - Swarm history tracking
   - Event-based coordination
   - Cross-generational learning

4. **[semantic-memory.md](./semantic-memory.md)**
   - Knowledge graph storage (Kuzu)
   - Relationship modeling and inference
   - Graph queries and traversal
   - Temporal knowledge support

5. **[json-memory.md](./json-memory.md)**
   - Structured data storage
   - Configuration management
   - Programmatic access
   - Schema-flexible storage

6. **[markdown-memory.md](./markdown-memory.md)**
   - Long-form documentation
   - Human-readable content
   - Knowledge capture and sharing
   - Export and collaboration

7. **[context-memory.md](./context-memory.md)**
   - Working memory for agents
   - Conversation state management
   - Message history and summaries
   - Context switching and reuse

8. **[vector-database.md](./vector-database.md)**
   - Semantic search via embeddings
   - Similarity-based retrieval
   - Multi-provider support (OpenAI, local)
   - Cross-modal discovery

### Advanced Topics

9. **[retrieval-patterns.md](./retrieval-patterns.md)**
   - Query strategies and patterns
   - Hybrid search techniques
   - Context assembly methods
   - Performance optimization

10. **[infinite-context.md](./infinite-context.md)**
    - Solving LLM context window limits
    - Dynamic context management
    - Progressive disclosure
    - Token budgeting and compression

## Key Concepts

### Memory Types Summary

| Type | Purpose | Storage | Best For |
|------|---------|---------|----------|
| **Episodic** | Event logs | `.codebolt/memory/episodic/` | Swarm history, decisions |
| **Semantic** | Knowledge graphs | `.codebolt/knowledge-graph/` | Relationships, inference |
| **JSON** | Structured data | `.codebolt/memory/json/` | Configuration, state |
| **Markdown** | Documentation | `.codebolt/memory/markdown/` | Knowledge, guides |
| **Context** | Working memory | `.codebolt/memory/context/` | Conversations, state |
| **Vector** | Semantic search | `.codebolt/vectordb/` | Similarity, discovery |

### Architecture Principles

1. **Persistence Over Performance**: File-based storage for durability
2. **Specialized Over Generalized**: Different types for different use cases
3. **Composability**: Types work independently but integrate seamlessly
4. **Agent-Lifecycle Independence**: Memory survives agent termination

### Integration Patterns

- **Multi-Source Assembly**: Combine all memory types for rich context
- **Semantic + Structural**: Vector search with graph queries
- **Temporal + Semantic**: Time-aware semantic search
- **Event + Context**: Extract context from episodic events

## How to Use These Concepts

### For Developers
- Understand which memory type to use for your use case
- Learn retrieval patterns for efficient querying
- Implement context assembly for your agents
- Design effective memory ingestion pipelines

### For Architects
- Understand the overall system design
- Plan memory type integration strategies
- Optimize for performance and cost
- Design scalable memory architectures

### For Researchers
- Study the novel approach to agent memory
- Explore cross-generational knowledge transfer
- Investigate collective intelligence mechanisms
- Analyze context window solutions

## Technical Implementation

### Services
- Located in: `src/main/server/services/`
- Key services: `contextMemoryService.ts`, `episodicMemoryDataService.ts`, `kgInstanceService.ts`, `vectordbDataService.ts`

### Storage
- Base directory: `.codebolt/`
- Memory subdirectories: `memory/`, `vectordb/`, `knowledge-graph/`, `PersistentMemory/`

### UI Components
- Located in: `src/renderer/Pages/Panels/MemoryPanel/`
- Components for each memory type with visualization and editing

## Related Documentation

- **[Agent Management](../agent-management/)**: Agent lifecycle and coordination
- **[Swarm Management](../swarm-management/)**: Multi-agent coordination
- **[Stigmergy System](../stigmergy-system/)**: Environment-based coordination

## Research Background

These concepts are based on research into:
- Collective memory in multi-agent systems
- Cross-generational knowledge transfer
- External memory and context assembly
- Solving agent lifecycle management

See research papers in `featuredocs/researchpaperdraft/`:
- `04-collective-memory-systems.md`
- `04-5-external-memory-context.md`

## Contributing

When adding new concepts or updating existing ones:
1. Maintain the YAML frontmatter format
2. Include executive summaries (2-3 sentences)
3. Focus on conceptual understanding, not implementation
4. Add use cases and examples
5. Link to related concepts
6. Update this README if adding new files

## License

Part of the CodeBolt project. See main project LICENSE for details.
