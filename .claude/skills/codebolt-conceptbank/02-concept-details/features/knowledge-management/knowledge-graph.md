---
id: "knowledge-graph"
title: Knowledge Graph
category: Knowledge Management
status: Active
tags: [graph-database, kuzu, entities, relationships, semantic-memory, cypher]
---

# Knowledge Graph

## Executive Summary
Knowledge Graph provides a graph-based representation of entities and their relationships, enabling powerful inference, traversal, and pattern matching capabilities that transform flat data into interconnected knowledge networks.

## What It Is and Why It Matters

Knowledge Graph is CodeBolt's semantic memory system, using Kuzu embedded graph database to model complex relationships between entities:

- **Graph Structure**: Nodes represent entities, edges represent relationships
- **Schema Flexibility**: Define custom entity types and relationship kinds
- **Temporal Support**: Track when knowledge is valid (valid_from, valid_to)
- **Query Power**: Cypher-based graph queries for complex patterns
- **Instance Isolation**: Multiple independent graph instances

**Why this matters:**
- **Relationship Discovery**: Find connections between entities
- **Inference**: Derive new knowledge from existing relationships
- **Contextual Understanding**: See entities in their relationship network
- **Pattern Matching**: Query for complex structural patterns
- **Knowledge Evolution**: Track how relationships change over time

## Key Capabilities

### Graph Modeling
- **Custom Schemas**: Define entity types (record kinds) and relationship types
- **Typed Nodes**: Entities with structured attributes
- **Typed Edges**: Relationships with defined semantics
- **Rich Attributes**: Store arbitrary metadata on nodes and edges
- **Instance Templates**: Reusable schema definitions

### Graph Operations
- **Node CRUD**: Create, read, update, delete entities
- **Edge CRUD**: Create, read, delete relationships
- **Bulk Operations**: Efficient batch inserts
- **Subgraph Extraction**: Retrieve focused graph regions
- **Neighborhood Expansion**: Explore connected entities

### Query Capabilities
- **Cypher Queries**: Industry-standard graph query language
- **Pattern Matching**: Find specific graph structures
- **Traversal**: Walk relationships to arbitrary depth
- **Aggregation**: Count, group, and analyze graph data
- **Filtering**: Complex WHERE conditions on attributes

### Temporal Features
- **Valid From/To**: Track when knowledge is current
- **Created At**: Audit trail for knowledge additions
- **Historical Queries**: Query knowledge as of specific times
- **Temporal Transitions**: Update validity windows

### Visualization
- **Interactive Graph Viewer**: Visual exploration of knowledge
- **Force-Directed Layout**: Automatic graph layout
- **Node Coloring**: Color by entity type
- **Edge Labels**: Show relationship types
- **Expandable Nodes**: Reveal connections on demand

## How It Works Conceptually

### Graph Structure

```
[Person: Alice] --WORKS_AT--> [Company: Acme Inc]
      |                              |
      MANAGES                        HAS_PROJECT
      ↓                              ↓
[Project: Apollo] <--PART_OF-- [Project: Moonshot]
      |
      DEPENDS_ON
      ↓
[Technology: React] <--BUILT_WITH-- [Project: Website]
```

### Schema Definition

```typescript
Instance Template: "Project Management"
{
  record_kinds: {
    "Person": {
      fields: {
        name: { type: "STRING" },
        role: { type: "STRING" }
      }
    },
    "Project": {
      fields: {
        name: { type: "STRING" },
        status: { type: "STRING" },
        priority: { type: "INT32" }
      }
    },
    "Technology": {
      fields: {
        name: { type: "STRING" },
        category: { type: "STRING" }
      }
    }
  },
  edge_types: {
    "WORKS_AT": {
      from: "Person",
      to: "Company",
      description: "Employment relationship"
    },
    "MANAGES": {
      from: "Person",
      to: "Project",
      description: "Management responsibility"
    },
    "DEPENDS_ON": {
      from: "Project",
      to: "Technology",
      description: "Technology dependency"
    }
  }
}
```

### Node and Edge Structure

```typescript
Node (Entity):
{
  id: "person_alice_123",
  name: "Alice Johnson",
  memory_instance_id: "proj_mgmt_456",
  kind: "Person",
  attributes: {
    role: "Senior Developer",
    department: "Engineering",
    hire_date: "2023-01-15"
  },
  valid_from: "2023-01-15T00:00:00Z",
  valid_to: null,  // Currently valid
  created_at: "2023-01-15T09:30:00Z"
}

Edge (Relationship):
{
  id: "edge_alice_manages_apollo",
  memory_instance_id: "proj_mgmt_456",
  kind: "MANAGES",
  from_node_id: "person_alice_123",
  to_node_id: "project_apollo_456",
  created_at: "2023-02-01T10:00:00Z"
}
```

### Cypher Query Patterns

**Pattern Matching:**
```cypher
MATCH (p:Person)-[r:MANAGES]->(pr:Project)
WHERE p.role = 'Senior Developer'
RETURN p.name, pr.name, pr.priority
ORDER BY pr.priority DESC
```

**Multi-Hop Traversal:**
```cypher
MATCH (p:Person)-[:MANAGES]->(pr:Project)-[:DEPENDS_ON]->(t:Technology)
RETURN p.name as Developer,
       collect(DISTINCT pr.name) as Projects,
       collect(DISTINCT t.name) as Technologies
```

**Aggregation:**
```cypher
MATCH (p:Person)-[:MANAGES]->(pr:Project)
WHERE pr.status = 'Active'
RETURN p.name, count(pr) as ActiveProjects
ORDER BY ActiveProjects DESC
```

### Storage Organization

```
.codebolt/knowledgegraph/kuzu/
├── database files          # Kuzu embedded DB
├── instances/
│   ├── instance_{id}/
│   │   ├── instance.json   # Instance metadata
│   │   └── template.json   # Schema template
```

## Use Cases

### Project Management
Track people, projects, and dependencies:

```typescript
Entities: Person, Project, Technology, Task
Relationships:
  - Person --MANAGES--> Project
  - Project --DEPENDS_ON--> Technology
  - Project --CONTAINS--> Task
  - Task --ASSIGNED_TO--> Person

Queries:
  - "Who manages the most critical projects?"
  - "What technologies do my projects depend on?"
  - "Find all tasks assigned to developers working on React projects"
```

### Software Architecture
Model system components and relationships:

```typescript
Entities: Service, Database, API, Team
Relationships:
  - Service --CALLS--> Service
  - Service --READS_FROM--> Database
  - Service --EXPOSES--> API
  - Team --OWNS--> Service

Queries:
  - "Find all services that depend on the User Database"
  - "What APIs are exposed by services owned by the Backend team?"
  - "Detect circular dependencies between services"
```

### Knowledge Management
Build organizational knowledge networks:

```typescript
Entities: Document, Topic, Expert, Concept
Relationships:
  - Document --COVERS--> Topic
  - Document --AUTHORED_BY--> Expert
  - Topic --RELATED_TO--> Topic
  - Expert --SPECIALIZES_IN--> Topic

Queries:
  - "Find all documents related to authentication"
  - "Who are the experts in microservices architecture?"
  - "What topics are covered in documents authored by Alice?"
```

### Social Networks
Model relationships and influence:

```typescript
Entities: Person, Group, Event, Interest
Relationships:
  - Person --MEMBER_OF--> Group
  - Person --ATTENDED--> Event
  - Person --INTERESTED_IN--> Interest
  - Person --CONNECTED_TO--> Person

Queries:
  - "Find people who share interests with me"
  - "Who are the most connected people in the network?"
  - "Suggest events based on my interests and connections"
```

### Dependency Tracking
Manage complex dependencies:

```typescript
Entities: Package, Module, Function, Test
Relationships:
  - Package --CONTAINS--> Module
  - Module --IMPORTS--> Module
  - Module --CALLS--> Function
  - Test --TESTS--> Function

Queries:
  - "Find all modules that indirectly import utils/http"
  - "What tests would be affected by changing this function?"
  - "Detect circular import dependencies"
```

## Graph Query Patterns

### Neighbor Discovery
Find directly connected entities:

```cypher
MATCH (e:Entity {id: $entityId})-[r]-(neighbor)
RETURN neighbor, r
```

### Multi-Hop Traversal
Explore relationships to depth N:

```cypher
MATCH path = (start:Entity {id: $startId})-[*1..3]-(end:Entity)
RETURN [node in nodes(path) | node.name] as Path,
       [rel in relationships(path) | rel.kind] as Relationships
```

### Shortest Path
Find shortest connection between entities:

```cypher
MATCH path = shortestPath(
  (a:Entity {id: $idA})-[*]-(b:Entity {id: $idB})
)
RETURN path
```

### Pattern Matching
Find specific graph structures:

```cypher
MATCH (a:Entity)-[:RELATIONSHIP_A]->(b:Entity)
       <-[:RELATIONSHIP_B]-(c:Entity)
WHERE a.attribute = $value
RETURN a, b, c
```

### Centrality Analysis
Find important nodes:

```cypher
MATCH (e:Entity)
WITH e, size((e)-[]-()) as connections
RETURN e, connections
ORDER BY connections DESC
LIMIT 10
```

### Community Detection
Find clusters of connected entities:

```cypher
MATCH (e:Entity)
WHERE size((e)-[:CONNECTED_TO]-()) > $threshold
RETURN e
```

## Schema Design

### Instance Templates

Reusable schema definitions:

```typescript
Template: "Software Architecture"
{
  record_kinds: {
    "Service": {
      fields: {
        name: { type: "STRING", required: true },
        version: { type: "STRING" },
        status: { type: "STRING" }
      }
    },
    "Database": {
      fields: {
        name: { type: "STRING" },
        type: { type: "STRING" },
        size_gb: { type: "DOUBLE" }
      }
    }
  },
  edge_types: {
    "CALLS": {
      from: "Service",
      to: "Service",
      description: "Service-to-service communication"
    },
    "WRITES_TO": {
      from: "Service",
      to: "Database",
      description: "Database write access"
    }
  }
}
```

### Field Types

Kuzu-supported types:
- **STRING**: Text data
- **INT64/INT32/INT16/INT8**: Signed integers
- **UINT64/UINT32/UINT16/UINT8**: Unsigned integers
- **DOUBLE/FLOAT**: Floating-point numbers
- **BOOL**: Boolean values
- **DATE/TIMESTAMP**: Temporal data
- **UUID**: Unique identifiers
- **LIST**: Arrays of values
- **MAP**: Key-value pairs
- **STRUCT**: Nested structures
- **BLOB**: Binary data

## View Templates

### Predefined Query Patterns

```typescript
View Template: "Critical Projects"
{
  name: "Critical Projects",
  match: {
    recordKind: "Person",
    alias: "p"
  },
  patterns: [
    {
      edge: "MANAGES",
      direction: "outgoing",
      targetKind: "Project",
      targetAlias: "pr"
    }
  ],
  where: [
    {
      field: "pr.priority",
      operator: ">=",
      value: 8
    }
  ],
  return: [
    { field: "p.name", alias: "Manager" },
    { field: "pr.name", alias: "Project" },
    { field: "pr.priority", alias: "Priority" }
  ],
  orderBy: [
    { field: "pr.priority", direction: "DESC" }
  ]
}
```

### View Execution

```typescript
Execute View:
1. Load template
2. Match instance data
3. Build Cypher query
4. Execute against Kuzu
5. Return formatted results
```

## Integration Patterns

### With Knowledge Panel
- Extract entities from documents
- Build concept graphs from documentation
- Link documents to graph entities
- Enrich document metadata with graph relationships

### With Vector Database
- Combine graph traversal with semantic search
- Use graph structure to guide vector queries
- Enhance embeddings with graph context
- Find related entities through similarity

### With Episodic Memory
- Track graph changes over time
- Record when relationships were created
- Audit graph modifications
- Historical graph state queries

### With Agent Memory
- Provide structured knowledge context
- Support reasoning over relationships
- Enable inference and deduction
- Guide agent decision-making

## Best Practices

### Schema Design
- **Start Simple**: Begin with core entity types
- **Iterative Refinement**: Add complexity as needed
- **Clear Semantics**: Define relationship meanings clearly
- **Consistent Naming**: Use standard naming conventions

### Query Optimization
- **Use Indexes**: Index frequently queried attributes
- **Limit Traversal Depth**: Avoid unlimited path queries
- **Filter Early**: Apply WHERE clauses early in queries
- **Batch Operations**: Group multiple operations

### Graph Maintenance
- **Regular Cleanup**: Remove obsolete nodes/edges
- **Update Validity**: Mark outdated knowledge
- **Schema Evolution**: Migrate schemas when needed
- **Monitor Growth**: Track graph size and complexity

### Performance
- **Subgraph Queries**: Query focused graph regions
- **Pagination**: Limit result set sizes
- **Caching**: Cache frequent query results
- **Batch Inserts**: Use bulk operations for loading

## Advanced Features

### Temporal Queries
Query knowledge as of specific time:

```cypher
MATCH (e:Entity)
WHERE e.valid_from <= $timestamp
  AND (e.valid_to >= $timestamp OR e.valid_to IS NULL)
RETURN e
```

### Graph Algorithms
Implement custom graph traversals:

```typescript
function findInfluentialNodes(instanceId: string, maxDepth: number) {
  // Custom centrality calculation
  // Consider edge weights, directions, types
  // Return ranked nodes
}
```

### Dynamic Schema
Update schema at runtime:

```typescript
// Add new entity type
await instanceService.addRecordKind(instanceId, {
  name: "NewEntityType",
  fields: { /* ... */ }
});

// Add new relationship type
await instanceService.addEdgeType(instanceId, {
  name: "NEW_RELATIONSHIP",
  from: "SourceType",
  to: "TargetType"
});
```

## Troubleshooting

### Common Issues

**Slow Queries**
- Add indexes on queried attributes
- Limit traversal depth
- Filter results early
- Use specific match patterns

**Schema Conflicts**
- Validate schema changes
- Migrate existing data
- Test queries after changes
- Document schema evolution

**Memory Issues**
- Limit query result sizes
- Use pagination
- Close unused instances
- Monitor graph growth

**Corrupted Database**
- Kuzu auto-recovery on restart
- Backup before schema changes
- Export critical data regularly
- Monitor database health

## Related Concepts

- **[Knowledge Panel](./knowledge-panel.md)**: Document management
- **[Vector Database](./vector-db.md)**: Semantic search
- **[Knowledge Retrieval](./knowledge-retrieval.md)**: Unified search
- **[Semantic Memory](../memory-systems/semantic-memory.md)**: Graph-based memory
- **[Memory Integration](../memory-systems/memory-integration.md)**: Multi-memory coordination

## Technical Details

**Database:** Kuzu Embedded Graph Database
**Service:** `src/main/server/services/kuzuDbService.ts`
**UI Panel:** `src/renderer/Pages/Panels/KnowledgeGraphPanel/`
**Types:** `src/types/knowledgeGraph.ts`
**Storage:** `.codebolt/knowledgegraph/kuzu/`
**Query Language:** Cypher (Kuzu dialect)

**Key Operations:**
- `insertNode()`: Add entity to graph
- `insertEdge()`: Add relationship to graph
- `queryNodes()`: Query entities by filters
- `queryEdges()`: Query relationships by filters
- `getSubgraph()`: Extract graph region
- `expandNode()`: Get node neighborhood
- `executeQuery()`: Execute raw Cypher query
