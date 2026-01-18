---
title: Memory Integration
category: Memory Systems
status: Active
tags: [integration, orchestration, pipeline, dsl]
---

# Memory Integration

## Executive Summary
Memory Integration orchestrates all six memory types to work together seamlessly, enabling sophisticated context assembly and retrieval patterns. The PersistentMemory DSL provides a declarative way to define how different memory types combine for specific use cases.

## What It Is and Why It Matters

Individual memory types are powerful, but their true potential emerges when integrated. Memory Integration enables:
- **Cross-Type Queries**: Search across all memory types simultaneously
- **Context Assembly**: Build rich context from multiple sources
- **Pipeline Processing**: Transform and enrich retrieved data
- **Declarative Definitions**: Define memory types without code
- **Intelligent Routing**: Route queries to optimal storage backends

**Why this matters:**
- **Holistic Context**: Combine structured, unstructured, and semantic knowledge
- **Flexible Retrieval**: Adapt to different query patterns
- **Composability**: Build complex memory behaviors from simple primitives
- **Maintainability**: Declarative definitions are easier to understand
- **Extensibility**: Add new memory types and pipeline steps

## Key Capabilities

### PersistentMemory DSL
- **Declarative Definitions**: JSON-based memory type specifications
- **Pipeline Steps**: Composable retrieval and processing operations
- **Template Variables**: Dynamic context substitution
- **Multiple Storage Backends**: Vector DB, Knowledge Graph, KV Store, Event Log
- **Input Scopes**: Swarm, agent, project, thread, task variables

### Pipeline Processing
- **Input Steps**: Derive queries, rewrite for optimization
- **Retrieval Steps**: Vector search, graph queries, KV lookups, event search
- **Expansion Steps**: Graph traversal, neighbor expansion
- **Processing Steps**: Filter, deduplicate, group, aggregate, rank
- **Output Steps**: Format, summarize, annotate, derive

### Context Assembly
- **Multi-Source Collection**: Gather from all memory types
- **Rule-Based Filtering**: Apply assembly rules
- **Relevance Ranking**: Prioritize by multiple criteria
- **Coherence Synthesis**: Build unified context
- **Conflict Resolution**: Handle contradictory information

### Memory Ingestion
- **Automated Capture**: Trigger on events (conversation end, task completion)
- **Extraction Patterns**: Pull relevant data from sources
- **Processor Pipeline**: Transform and enrich data
- **Multi-Destination**: Write to multiple storage backends
- **Event Bridge**: Connect to application events

## How It Works Conceptually

### PersistentMemory Definition

```typescript
{
  id: "project_context",
  label: "Project Context Memory",
  description: "Comprehensive project context for agents",
  
  // Available context variables
  inputs_scope: ["project", "thread", "task"],
  additional_variables: [
    { name: "feature_name", required: true }
  ],
  
  // Ingestion configuration
  ingestion: {
    triggers: ["onConversationEnd", "onTaskCompleted"],
    extract: {
      from: "messages",
      patterns: ["decisions", "outcomes", "issues"]
    }
  },
  
  // Retrieval pipeline
  retrieval: {
    pipeline: [
      {
        step: "derive_query",
        params: {
          source: "intent",
          fields: ["query", "feature_name"],
          strategy: "template",
          template: "${query} ${feature_name}"
        }
      },
      {
        step: "vector_search",
        params: {
          collection: "project_docs",
          query_from: "query",
          top_k: 5
        }
      },
      {
        step: "graph_view_read",
        params: {
          view: "component_dependencies",
          filters: { feature: "${feature_name}" }
        }
      },
      {
        step: "merge",
        params: {
          sources: ["vector_search", "graph_view_read"]
        }
      },
      {
        step: "rank",
        params: {
          by: "relevance",
          method: "weighted_score",
          weights: { semantic: 0.7, structural: 0.3 }
        }
      }
    ]
  }
}
```

### Pipeline Execution Flow

```
User Intent
    ↓
Template Variable Resolution
    ↓
Step 1: Derive Query
    ↓
Step 2: Vector Search
    ↓
Step 3: Graph Query
    ↓
Step 4: Merge Results
    ↓
Step 5: Rank and Filter
    ↓
Step 6: Format Output
    ↓
Assembled Context
```

### Memory Ingestion Pipeline

```
Application Event
    ↓
Routing (based on triggers)
    ↓
Extraction (pull relevant data)
    ↓
Processing (chunking, embedding)
    ↓
Multi-Write (vector DB, graph, KV)
    ↓
Confirmation
```

## Integration Patterns

### Semantic + Structural Search
Combine vector search with graph queries:

```typescript
pipeline: [
  {
    step: "vector_search",
    alias: "semantic_results",
    params: { collection: "docs", top_k: 10 }
  },
  {
    step: "graph_neighbor_expand",
    params: {
      seed_from: "semantic_results",
      edges: ["DEPENDS_ON", "RELATES_TO"],
      depth: 2
    }
  },
  {
    step: "merge",
    params: { sources: ["semantic_results", "expand"] }
  }
]
```

### Event-Based Context Assembly
Extract context from episodic events:

```typescript
pipeline: [
  {
    step: "log_search",
    alias: "recent_events",
    params: {
      query: "${query}",
      window: "1h",
      eventTypes: ["decision", "artifact_created"]
    }
  },
  {
    step: "derive_query",
    alias: "derived_query",
    params: {
      source: "recent_events",
      fields: ["payload.decision", "payload.artifact_type"],
      strategy: "concat"
    }
  },
  {
    step: "vector_search",
    params: {
      collection: "related_docs",
      query_from: "derived_query",
      top_k: 5
    }
  }
]
```

### Multi-Source Context
Assemble from all memory types:

```typescript
pipeline: [
  // Get semantic matches
  {
    step: "vector_search",
    alias: "semantic",
    params: { collection: "docs", top_k: 5 }
  },
  
  // Get structured data
  {
    step: "kv_get",
    alias: "config",
    params: {
      keys: ["project_config", "feature_flags"]
    }
  },
  
  // Get related events
  {
    step: "log_search",
    alias: "events",
    params: { query: "${query}", lastCount: 10 }
  },
  
  // Get graph context
  {
    step: "graph_view_read",
    alias: "graph",
    params: { view: "dependencies" }
  },
  
  // Combine and rank
  {
    step: "merge",
    params: { sources: ["semantic", "config", "events", "graph"] }
  },
  {
    step: "rank",
    params: { by: "relevance", method: "recency_weighted" }
  }
]
```

## Pipeline Step Categories

### Input Steps
- **derive_query**: Build query from intent/context
- **rewrite_query**: Optimize query (synonyms, normalization)

### Retrieval Steps
- **vector_search**: Semantic similarity search
- **graph_view_read**: Query predefined graph views
- **kv_get**: Fetch key-value pairs
- **log_search**: Search event logs

### Expansion Steps
- **graph_view_expand**: Expand graph view
- **graph_neighbor_expand**: Traverse graph relationships

### Processing Steps
- **filter**: Filter by conditions
- **deduplicate**: Remove duplicates
- **group_by**: Group by field
- **reduce_latest**: Keep most recent per group
- **merge**: Combine multiple sources

### Ranking Steps
- **rank**: Order by criteria
- **score**: Calculate relevance scores
- **summarize**: Generate summaries

### Output Steps
- **format**: Transform output format
- **annotate**: Add metadata
- **derive**: Derive new fields

## Use Cases

### Project Context Memory
Provide comprehensive project context:

```typescript
{
  id: "project_context",
  inputs_scope: ["project", "task"],
  retrieval: {
    pipeline: [
      {
        step: "vector_search",
        params: { collection: "project_docs", top_k: 10 }
      },
      {
        step: "graph_view_read",
        params: { view: "architecture" }
      },
      {
        step: "kv_get",
        params: { keys: ["config", "env"] }
      }
    ]
  }
}
```

### Agent Knowledge Base
Build agent-specific knowledge:

```typescript
{
  id: "agent_knowledge",
  inputs_scope: ["agent", "swarm"],
  retrieval: {
    pipeline: [
      {
        step: "vector_search",
        params: { collection: "agent_docs", top_k: 5 }
      },
      {
        step: "log_search",
        params: {
          query: "${task_type}",
          eventTypes: ["decision", "outcome"]
        }
      }
    ]
  }
}
```

### Decision Support
Support decision-making with context:

```typescript
{
  id: "decision_support",
  retrieval: {
    pipeline: [
      {
        step: "derive_query",
        params: { source: "intent", strategy: "template" }
      },
      {
        step: "vector_search",
        params: { collection: "past_decisions", top_k: 5 }
      },
      {
        step: "graph_view_read",
        params: { view: "decision_impact" }
      },
      {
        step: "summarize",
        params: { format: "bullet_points" }
      }
    ]
  }
}
```

## Best Practices

### Pipeline Design
- Start simple, add complexity gradually
- Use aliases for intermediate results
- Limit pipeline depth (< 10 steps)
- Profile performance bottlenecks

### Variable Management
- Use clear, descriptive variable names
- Document required variables
- Validate variable resolution
- Handle missing variables gracefully

### Error Handling
- Use conditional steps for fallbacks
- Set timeouts for external calls
- Validate data between steps
- Provide meaningful error messages

### Performance Optimization
- Cache expensive operations
- Use parallel independent steps
- Filter early to reduce data volume
- Monitor pipeline execution time

## Template Variables

### Scope Variables
- `${swarm_id}`, `${swarm_name}`
- `${agent_id}`, `${agent_name}`, `${agent_type}`
- `${project_id}`, `${project_path}`
- `${thread_id}`
- `${task_id}`, `${task_type}`
- `${user_id}`
- `${org_id}`

### Query Variables
- `${query}`: User query text
- `${query.keywords}`: Extracted keywords

### Custom Variables
User-defined via `additional_variables`

## Related Concepts

- **[Memory Architecture](./memory-architecture.md)**: Overall system design
- **[Episodic Memory](./episodic-memory.md)**: Event logs
- **[Semantic Memory](./semantic-memory.md)**: Knowledge graphs
- **[Vector Database](./vector-database.md)**: Semantic search
- **[Retrieval Patterns](./retrieval-patterns.md)**: Query strategies
- **[Infinite Context](./infinite-context.md)**: Context assembly

## Technical Details

**DSL Definition:** `src/types/persistentMemory.ts`
**Pipeline Service:** `persistentMemoryPipelineService.ts`
**Instance Service:** `persistentMemoryInstanceService.ts`
**Data Service:** `persistentMemoryDataService.ts`
**Ingestion Service:** `memoryIngestionExecutionService.ts`

**Key Operations:**
- `createPersistentMemory()`: Define new memory type
- `executePipeline()`: Run retrieval pipeline
- `ingest()`: Process incoming data
- `query()`: Query memory type
