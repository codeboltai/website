---
title: Semantic Memory
category: Memory Systems
status: Active
tags: [knowledge-graph, semantic, kuzu, relationships, graph-database]
---

# Semantic Memory

## Executive Summary
Semantic Memory provides a graph-based knowledge storage system using Kuzu database, enabling agents to store and query structured relationships between entities. This transforms raw information into connected knowledge networks.

## What It Is and Why It Matters

Semantic memory represents the "what" of knowledge - facts, concepts, and relationships - as opposed to episodic memory's "when" and "where." It's the difference between knowing that Paris is the capital of France (semantic) vs. remembering your trip there (episodic).

**Why semantic memory matters:**
- **Relationship Modeling**: Capture connections between entities
- **Inference and Reasoning**: Derive new knowledge from existing relationships
- **Flexible Querying**: Navigate complex graph structures
- **Knowledge Evolution**: Grow and refine knowledge over time
- **Cross-Domain Links**: Connect concepts across different domains

## Key Capabilities

### Graph-Based Storage
- **Nodes (Record Kinds)**: Entities with typed attributes
- **Edges**: Relationships between entities
- **Schema Validation**: Enforce data structure constraints
- **Type Safety**: Kuzu-compatible field types (STRING, INT64, BOOL, etc.)
- **Temporal Support**: Track when knowledge was valid

### Instance Management
- **Multiple Graph Instances**: Separate knowledge graphs for different domains
- **Templates**: Reusable schema definitions
- **Versioning**: Track knowledge evolution over time
- **Import/Export**: Share and backup knowledge graphs

### Query Capabilities
- **Pattern Matching**: Find specific graph patterns
- **Traversal**: Navigate relationships (neighbors, paths)
- **Filters**: Query nodes/edges by attribute values
- **Subgraph Extraction**: Retrieve connected knowledge sections
- **View Templates**: Predefined query patterns

### Kuzu Integration
- **Native Graph Database**: Optimized for graph operations
- **Cypher Query Language**: Expressive graph queries
- **ACID Transactions**: Reliable knowledge updates
- **Indexing**: Fast lookups on common attributes
- **Scalability**: Handle large knowledge graphs

## How It Works Conceptually

### Knowledge Graph Structure

```
[Person: Alice] --WORKS_AT--> [Company: CodeBolt]
       │                              │
       |KNOWS                         |BUILDS
       ▼                              ▼
[Person: Bob]              [Project: CodeBolt]
       │                              │
       |WORKS_ON                      |USES
       ▼                              ▼
[Task: Frontend] --REQUIRES--> [Skill: React]
```

### Schema Definition

Knowledge graphs are defined with templates:

```typescript
{
  record_kinds: {
    Person: {
      fields: {
        name: { type: "STRING", required: true },
        role: { type: "STRING" },
        joined: { type: "TIMESTAMP" }
      }
    },
    Company: {
      fields: {
        name: { type: "STRING", required: true },
        industry: { type: "STRING" }
      }
    }
  },
  edge_types: {
    WORKS_AT: {
      from: "Person",
      to: "Company",
      description: "Employment relationship"
    }
  }
}
```

### Knowledge Evolution

Semantic memory supports temporal knowledge:

```typescript
{
  id: "relation_123",
  kind: "WORKS_AT",
  from_node_id: "alice",
  to_node_id: "codebolt",
  valid_from: "2024-01-01T00:00:00Z",
  valid_to: "2024-12-31T23:59:59Z"  // NULL if still valid
}
```

This enables:
- Historical queries: "Who worked here in Q1?"
- Future planning: "Who will be available next month?"
- Knowledge versioning: Track changes over time

## Use Cases

### Project Knowledge Management
- Track dependencies between components
- Map relationships between team members
- Document architecture decisions
- Maintain requirement traceability

### Agent Coordination
- Share understanding of domain concepts
- Coordinate around shared entity references
- Resolve naming conflicts
- Build common ground

### Learning and Adaptation
- Extract patterns from successful projects
- Identify anti-patterns from failures
- Build best-practice knowledge bases
- Enable knowledge transfer

### Codebase Understanding
- Model code dependencies
- Track ownership and responsibility
- Document API relationships
- Map architectural patterns

### Domain Modeling
```typescript
// Software Architecture Graph
Nodes: Service, Database, API, Team, Deployment
Edges: DEPENDS_ON, OWNS, DEPLOYS_TO, EXPOSES

// Skill Graph
Nodes: Person, Skill, Project, Technology
Edges: KNOWS, USED_IN, REQUIRES, TEACHES

// Requirements Graph
Nodes: Feature, Requirement, Stakeholder, Risk
Edges: DEPENDS_ON, ADDRESSES, OWNED_BY, MITIGATES
```

## Query Patterns

### Direct Lookup
```typescript
// Find a person by name
query: {
  kind: "Person",
  filters: { name: "Alice" }
}
```

### Relationship Traversal
```typescript
// Find all people who work at CodeBolt
pattern: {
  from: { kind: "Person" },
  edge: "WORKS_AT",
  to: { kind: "Company", name: "CodeBolt" }
}
```

### Multi-Hop Queries
```typescript
// Find skills required by projects Alice works on
path: Person:Alice --WORKS_ON--> Project --REQUIRES--> Skill
```

### Subgraph Extraction
```typescript
// Get entire neighborhood around a node
expand: {
  node: "alice",
  depth: 2,
  edges: ["WORKS_WITH", "KNOWS", "MANAGES"]
}
```

### Temporal Queries
```typescript
// Who worked here in Q1 2024?
query: {
  kind: "Person",
  filters: {
    valid_from: { $lte: "2024-01-01" },
    valid_to: { $gte: "2024-03-31" }
  }
}
```

## Best Practices

### Schema Design
- Start with clear entity types
- Define relationship cardinality (1:1, 1:N, N:M)
- Use descriptive edge types
- Plan for future schema evolution

### Knowledge Ingestion
- Validate against schema before insertion
- Handle duplicate entities (merge vs. reject)
- Maintain referential integrity
- Bulk load for efficiency

### Query Optimization
- Create indexes on frequently queried attributes
- Use selective filters to reduce result sets
- Limit traversal depth for performance
- Cache common query patterns

### Knowledge Maintenance
- Periodic validation of constraints
- Cleanup orphaned nodes
- Archive old knowledge
- Version schema changes

## Integration with Other Memory Types

### With Episodic Memory
- Extract entities from events
- Build knowledge from experiences
- Track how knowledge evolved

### With Vector Database
- Combine semantic similarity with graph structure
- Enhance search with relationship context
- Enable hybrid queries

### With PersistentMemory DSL
- Define graph views as memory types
- Pipeline graph queries
- Combine with other retrieval methods

## Related Concepts

- **[Episodic Memory](./episodic-memory.md)**: Extract knowledge from events
- **[Vector Database](./vector-database.md)**: Semantic similarity search
- **[Memory Integration](./memory-integration.md)**: Combining knowledge sources
- **[Retrieval Patterns](./retrieval-patterns.md)**: Graph query patterns

## Technical Details

**Storage:** `.codebolt/knowledge-graph/{instanceId}/`
**Database:** Kuzu (native graph database)
**Service:** `kgInstanceService.ts`
**Types:** `src/types/knowledgeGraph.ts`
**UI:** Knowledge graph visualization panels

**Key Operations:**
- `createInstance()`: Create new knowledge graph
- `createNode()`: Add entity to graph
- `createEdge()`: Add relationship
- `query()`: Execute graph queries
- `expand()`: Traverse relationships
