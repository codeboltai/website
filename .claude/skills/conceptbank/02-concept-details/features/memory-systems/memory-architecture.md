---
id: "memory-architecture"
title: Memory Architecture
category: Memory Systems
status: Active
tags: [architecture, memory, storage, integration]
---

# Memory Architecture

## Executive Summary
CodeBolt's memory architecture is a multi-layered storage system that enables persistent knowledge management across agent lifecycles. By externalizing memory from individual agents, the system maintains context, enables learning, and solves the fundamental context window limitations of LLMs.

## What It Is and Why It Matters

Traditional AI agents suffer from three critical limitations:
1. **Ephemeral memory**: Knowledge is lost when agents terminate or restart
2. **Context window constraints**: LLMs can only process limited amounts of information at once
3. **Lack of collective intelligence**: Each agent operates in isolation, unable to benefit from shared experiences

CodeBolt's memory architecture solves these problems by providing a **persistent, multi-modal storage system** that survives beyond individual agent lifecycles. This enables:
- **Cross-generational knowledge transfer** between agent instances
- **Infinite context** through intelligent retrieval and assembly
- **Collective learning** where the system improves over time
- **Specialized memory types** optimized for different knowledge domains

## Key Capabilities

### Six Memory Types
- **Episodic Memory**: Append-only event logs for tracking swarm history
- **Semantic Memory**: Knowledge graphs (Kuzu) for structured relationships
- **JSON Memory**: Structured data storage for programmatic access
- **Markdown Memory**: Long-form documentation and notes
- **Context Memory**: Working memory for active agent conversations
- **Vector Database**: Semantic search via embeddings

### Core Architecture Features
- **Persistent Storage**: All memory stored in `.codebolt/memory/` directory
- **File-Based Persistence**: Each memory type uses optimized storage format
- **Thread-Based Organization**: Memories grouped into logical threads
- **Agent-Lifecycle Independent**: Memory survives agent termination
- **Cross-Agent Sharing**: Multiple agents can access shared memory
- **Intelligent Retrieval**: Context-aware memory assembly and ranking

### Integration Points
- **Memory Ingestion Pipeline**: Automated capture of agent experiences
- **PersistentMemory DSL**: Declarative memory type definitions
- **Context Assembly Engine**: Rule-based memory integration
- **Vector Similarity Search**: Semantic content discovery
- **Knowledge Graph Queries**: Relationship-based retrieval
- **Thread Memory Service**: Attach memories to conversations

## How It Works Conceptually

### Memory Hierarchy

```
┌─────────────────────────────────────────────────────┐
│             Context Assembly Engine                  │
│    (Integrates relevant memories for agents)         │
└─────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
┌───────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
│   Vector DB  │  │   Knowledge │  │   Event     │
│  (Embeddings)│  │   Graph     │  │   Log       │
└──────────────┘  └─────────────┘  └─────────────┘
        │                 │                 │
┌───────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
│  JSON Memory │  │   Markdown  │  │   Context   │
│ (Structured) │  │  (Docs)     │  │ (Working)   │
└──────────────┘  └─────────────┘  └─────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                  ┌───────▼────────┐
                  │  File System   │
                  │  .codebolt/    │
                  └────────────────┘
```

### Memory Flow

1. **Creation**: Agents create memories during execution
2. **Storage**: Memories persist to file-based storage
3. **Indexing**: Vector embeddings and graph relationships built
4. **Retrieval**: Context assembly engine queries relevant memories
5. **Integration**: Multiple memory types combined for agent context

### Storage Organization

```
.codebolt/
├── memory/
│   ├── episodic/          # Event logs
│   │   └── {memoryId}.json
│   ├── json/              # Structured data
│   │   └── {threadId}.json
│   ├── markdown/          # Documentation
│   │   └── {threadId}.json
│   ├── context/           # Working memory
│   │   └── {threadId}.json
│   └── vectordb/          # Embeddings
│       └── {collectionId}/
├── PersistentMemory/      # Memory type definitions
│   └── {memoryId}.json
└── knowledge-graph/       # Kuzu database
    └── {instanceId}/
```

## Use Cases

### For Multi-Agent Swarms
- Track swarm evolution and decision history
- Enable new agents to learn from past experiences
- Maintain coordination context across agent restarts
- Implement collective learning and improvement

### For Long-Running Projects
- Maintain project context across multiple sessions
- Store documentation alongside code
- Track decision rationale and design evolution
- Enable semantic search through project history

### For Knowledge Management
- Build organizational knowledge graphs
- Maintain persistent documentation
- Enable cross-project knowledge sharing
- Support learning and onboarding

### For Context Window Management
- Intelligently retrieve relevant historical context
- Summarize and compress past conversations
- Prioritize important information
- Maintain coherence across long-running tasks

## Architecture Principles

### Persistence Over Performance
- File-based storage ensures data durability
- Optimistic concurrency for simplicity
- Atomic writes with temp files

### Specialized Over Generalized
- Different memory types for different use cases
- Optimized storage formats per type
- Type-specific query capabilities

### Composability
- Memory types work independently but integrate seamlessly
- PersistentMemory DSL enables custom memory types
- Pipeline-based retrieval and processing

### Agent-Lifecycle Independence
- Memory exists outside agent processes
- Survives agent termination and restart
- Enables cross-generational knowledge transfer

## Related Concepts

- **[Episodic Memory](./episodic-memory.md)**: Event-based history tracking
- **[Semantic Memory](./semantic-memory.md)**: Knowledge graph storage
- **[JSON Memory](./json-memory.md)**: Structured data storage
- **[Markdown Memory](./markdown-memory.md)**: Long-form documentation
- **[Context Memory](./context-memory.md)**: Working memory
- **[Vector Database](./vector-database.md)**: Semantic search
- **[Memory Integration](./memory-integration.md)**: How types work together
- **[Retrieval Patterns](./retrieval-patterns.md)**: Querying memory
- **[Infinite Context](./infinite-context.md)**: Solving context limits

## Implementation Notes

- Services in `src/main/server/services/`
- Memory types defined in `src/types/`
- UI components in `src/renderer/Pages/Panels/MemoryPanel/`
- Storage in `.codebolt/memory/` directory
