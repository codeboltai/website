---
id: "memory-knowledge-overview"
level: 2
category: "memory-knowledge"
estimated_read_time: "12 minutes"
prerequisites: ["01-philosophy.md"]
next_level: ["../features/memory-systems/infinite-context.md", "../features/memory-systems/memory-architecture.md"]
related_categories: ["03-agent-systems.md", "08-tools-integrations.md"]
tags: ["memory", "context", "knowledge", "retrieval"]
---

# Memory & Knowledge

## Executive Summary

Memory & Knowledge is how CodeBolt overcomes LLM context limitations to provide "infinite context" - deep understanding of large, evolving codebases that goes far beyond what fits in a context window. Through six memory types, sophisticated retrieval patterns, and knowledge graphs, agents maintain coherent understanding across millions of lines of code. This category explains the memory architecture, each memory type, retrieval strategies, knowledge management, and how memory enables agents to work effectively on complex projects.

## What Problems It Solves

LLM context windows create fundamental limitations:

- **Context ceiling**: Can't fit large codebases in context (typically ~128K tokens)
- **Loss of coherence**: Long projects lose context when conversations restart
- **Shallow understanding**: Without full context, suggestions are superficial
- **Repetitive explanations**: Agents forget previous decisions and explanations
- **No organizational memory**: Knowledge doesn't persist between sessions

CodeBolt's memory system solves these:
- **Six memory types**: Different storage for different kinds of information
- **Vector databases**: Semantic search across entire codebases
- **Persistent memory**: Knowledge persists across sessions
- **Intelligent retrieval**: Find relevant information regardless of context window size
- **Knowledge graphs**: Explicit representation of relationships

## Key Concepts

| Concept | Description | Deep Dive |
|---------|-------------|-----------|
| **Infinite Context** | How six memory types overcome LLM limitations | [Infinite Context](../features/memory-systems/infinite-context.md) |
| **Memory Architecture** | System design and integration | [Memory Architecture](../features/memory-systems/memory-architecture.md) |
| **Semantic Memory** | Vector-based code understanding | [Semantic Memory](../features/memory-systems/semantic-memory.md) |
| **Episodic Memory** | History of changes and decisions | [Episodic Memory](../features/memory-systems/episodic-memory.md) |
| **Retrieval Patterns** | How to find relevant information | [Retrieval Patterns](../features/memory-systems/retrieval-patterns.md) |
| **Knowledge Graph** | Explicit representation of relationships | [Knowledge Graph](../features/knowledge-management/knowledge-graph.md) |

## When to Use This Category

- ✅ **Understanding how agents "remember"** - Learn memory mechanisms
- ✅ **Optimizing context assembly** - Improve agent performance
- ✅ **Building knowledge systems** - Create and manage knowledge
- ✅ **Troubleshooting context issues** - Debug memory problems
- ❌ **Creating agents** - See Agent Systems instead
- ❌ **Managing swarms** - See Swarm Management instead

## The Six Memory Types

CodeBolt uses six memory types, each optimized for different kinds of information:

### 1. Semantic Memory
**What it stores**: Vector embeddings of code, documentation, conversations

**How it works**:
- Code and text are converted to vector embeddings
- Similar concepts cluster in vector space
- Semantic search finds related content regardless of exact wording

**Use cases**:
- Find relevant code without exact matches
- Discover similar implementations
- Understand code relationships

**Example**: Search for "authentication" and find login code, user sessions, JWT handling, even if word "authentication" never appears

### 2. Episodic Memory
**What it stores**: History of changes, decisions, and their outcomes

**How it works**:
- Records events with timestamps
- Stores context around each event
- Enables temporal queries ("what changed last week?")

**Use cases**:
- Understand why decisions were made
- Revert problematic changes
- Learn from past outcomes

**Example**: Query "database schema changes in January" to see all schema modifications and why they were made

### 3. Working Memory
**What it stores**: Current task context, immediate goals, active work

**How it works**:
- Short-term storage for active tasks
- Updated frequently as work progresses
- Cleared when task completes

**Use cases**:
- Track what agent is currently working on
- Maintain task-specific context
- Coordinate concurrent work

**Example**: Agent stores "implementing user registration" in working memory along with current progress, files modified, tests needed

### 4. Procedural Memory
**What it stores**: Patterns, conventions, best practices

**How it works**:
- Learned from project history and successful patterns
- Codifies conventions and standards
- Improves with use

**Use cases**:
- Follow project conventions consistently
- Apply best practices automatically
- Maintain code style

**Example**: Agent learns from procedural memory that "this project uses TypeScript strict mode, async/await, and functional components" and applies consistently

### 5. Social Memory
**What it stores**: Agent interactions, reputations, collaboration history

**How it works**:
- Tracks agent-agent and agent-human interactions
- Records performance and outcomes
- Builds reputation over time

**Use cases**:
- Know which agents to trust for which tasks
- Understand collaboration patterns
- Build effective teams

**Example**: Social memory indicates "Agent A excels at frontend React work" and "Agent B is great at database optimization"

### 6. Encyclopedia Memory
**What it stores**: Domain knowledge, documentation, external references

**How it works**:
- Stores structured knowledge
- Links to external resources
- Maintains authoritative information

**Use cases**:
- Access API documentation
- Understand domain concepts
- Reference standards and specifications

**Example**: Agent queries encyclopedia memory for "React hooks best practices" and retrieves official documentation and community guidelines

## Memory Architecture

### Memory Ingestion Pipelines
Information enters memory through multiple pipelines:

- **Code changes**: Triggers ingestion when files are modified
- **Agent actions**: Records decisions and outcomes
- **Human feedback**: Incorporates corrections and preferences
- **External sources**: Imports documentation and references
- **Conversation history**: Stores chat context for future reference

### Memory Processors
Different processors handle different content types:

- **Code processor**: Parses code, extracts structure, semantics
- **Document processor**: Handles markdown, text, documentation
- **Event processor**: Records actions, changes, decisions
- **Vector processor**: Creates embeddings for semantic search

### Memory Destinations
Processed information is routed to appropriate memory types:

- **Vector database**: Semantic memory storage
- **Event log**: Episodic memory storage
- **Knowledge graph**: Structured relationship storage
- **Working memory store**: Active task context

### Memory Triggers
Events trigger memory operations:

- **File change**: Update semantic and episodic memory
- **Agent action**: Record in episodic and social memory
- **Time interval**: Periodic memory maintenance
- **Query request**: Retrieve relevant information

## Retrieval Patterns

Finding the right information at the right time:

### Semantic Retrieval
- Search by meaning, not exact wording
- Find similar code, patterns, implementations
- Discover related concepts

### Temporal Retrieval
- Query by time ranges
- Understand evolution of code
- Track decision history

### Associative Retrieval
- Follow relationships in knowledge graph
- Discover connected information
- Explore concept networks

### Context-Based Retrieval
- Retrieve based on current task
- Get relevant previous decisions
- Access related examples

## Knowledge Management

### Knowledge Graph
Explicit representation of relationships:

- **Code relationships**: Calls, imports, dependencies
- **Concept relationships**: Abstractions, implementations
- **Decision relationships**: Rationale, outcomes
- **Agent relationships**: Collaborations, reputations

### Knowledge Panel
UI for exploring knowledge:

- **Visualize relationships**: Interactive graph view
- **Navigate connections**: Click to explore
- **Query patterns**: Find specific relationship types

### Knowledge Retrieval
Access knowledge when needed:

- **Context assembly**: Gather relevant knowledge for tasks
- **Query interface**: Ask questions of knowledge base
- **API access**: Programmatic knowledge access

## Integration with Agent Systems

### Context Assembly
Before acting, agents gather context from multiple memory types:

1. **Semantic search**: Find relevant code
2. **Episodic retrieval**: Get decision history
3. **Social memory**: Know which agents to consult
4. **Procedural memory**: Apply conventions
5. **Encyclopedia lookup**: Reference domain knowledge

### Memory During Execution
As agents work, they continuously update memory:

- **Working memory**: Track progress
- **Episodic memory**: Record decisions
- **Social memory**: Note collaborations
- **Semantic memory**: Index new code

### Memory After Completion
When tasks complete, agents consolidate memory:

- **Procedural memory**: Learn successful patterns
- **Episodic memory**: Store outcomes
- **Social memory**: Update reputations
- **Semantic memory**: Index results

## Quick Start

### Beginner: Understanding Memory
1. [Infinite Context](../features/memory-systems/infinite-context.md) - How memory overcomes context limits
2. [Memory Architecture](../features/memory-systems/memory-architecture.md) - System overview
3. [Semantic Memory](../features/memory-systems/semantic-memory.md) - Vector-based understanding

### Intermediate: Using Memory Effectively
1. [Episodic Memory](../features/memory-systems/episodic-memory.md) - Decision history
2. [Retrieval Patterns](../features/memory-systems/retrieval-patterns.md) - Finding information
3. [Context Memory](../features/memory-systems/context-memory.md) - Context assembly

### Advanced: Memory Optimization
1. [Memory Ingestion Pipelines](../features/memory-systems/memory-ingestion-pipelines.md) - How information enters memory
2. [Memory Triggers](../features/memory-systems/memory-triggers.md) - Controlling memory operations
3. [Vector Database](../features/memory-systems/vector-database.md) - Technical implementation

## Common Patterns

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| **Semantic Discovery** | Find related code by meaning | Understanding unfamiliar code |
| **Historical Analysis** | Review past decisions | Debugging, understanding rationale |
| **Pattern Application** | Apply learned conventions | Maintaining consistency |
| **Collaboration Lookup** | Find relevant expertise | Building effective teams |
| **Knowledge Exploration** | Follow concept relationships | Learning, discovery |

## Related Concepts

- **[Philosophy](01-philosophy.md)** - Why infinite context is fundamental
- **[Agent Systems](03-agent-systems.md)** - How agents use memory
- **[Context Assembly](../features/context-assembly/)** - Dynamic context gathering
- **[Knowledge Management](../features/knowledge-management/)** - Knowledge systems

## Common Questions

### "How is this different from just using RAG?"
RAG (Retrieval-Augmented Generation) typically uses vector search for semantic retrieval. CodeBolt's memory system goes beyond RAG with:
- **Multiple memory types**: Not just semantic, but episodic, procedural, social, etc.
- **Continuous ingestion**: Memory updates as code changes
- **Knowledge graphs**: Explicit relationships, not just similarity
- **Agent-specific memory**: Each agent has unique memory based on experience

### "Does memory slow down agents?"
Not significantly. Memory operations are highly optimized:
- **Vector search**: Milliseconds for semantic retrieval
- **Caching**: Frequently accessed memory is cached
- **Parallel processing**: Memory operations run in parallel
- **Selective loading**: Only load relevant memory for each task

### "How do agents know what memory to use?"
Agents use context assembly - a smart system that:
- Analyzes current task requirements
- Selects relevant memory types
- Retrieves most relevant information
- Assembles context for LLM

See [Context Assembly](../features/context-assembly/context-assembly.md) for details.

## Navigation

- [← Back to Executive Summary](../00-executive-summary.md)
- [← Previous Category: Coordination](04-coordination.md)
- [Next Category: Work Execution](06-work-execution.md)
- [Category Index](index.md)
- [Drill down to concept details](../features/memory-systems/)
