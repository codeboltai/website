---
id: "memory-destinations"
title: "Memory Destinations"
category: "features"
subcategory: "memory-systems"
tags: ["memory", "storage", "destinations", "routing", "knowledge-graph", "vector-database"]
audience: ["technical", "architect"]
difficulty: "intermediate"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["memory-ingestion-pipelines", "memory-processors", "knowledge-graph", "vector-database"]
content_type: "concept"
status: "published"
phase: 2
---

# Memory Destinations

## Executive Summary

Memory Destinations are the storage targets where processed data from Memory Ingestion Pipelines is persisted. CodeBolt supports five destination types—Knowledge Graphs, Vector Databases, Key-Value Stores, Blob Storage, and Event Logs—each optimized for specific access patterns and query requirements. Understanding these destinations enables proper data architecture design for memory systems.

## Overview

Memory Destinations represent the "write side" of CodeBolt's memory architecture. After processors transform and enrich event data, routing rules determine which destinations receive the data. Each destination type provides different capabilities:

- **Graph Storage**: Structured relationships and entity modeling
- **Vector Storage**: Semantic similarity search
- **KV Storage**: Fast key-based lookups
- **Blob Storage**: Raw data archival
- **Event Log**: Time-series event streaming

## Destination Types

### 1. Graph Storage (Knowledge Graphs)

**Purpose**: Store entities and relationships for structured knowledge representation

**Best For**:
- Facts and decisions from conversations
- Entity relationships (dependencies, hierarchies)
- Domain knowledge representation
- Complex graph queries

**Configuration**:
```yaml
write_to:
  type: graph
  instance: project-knowledge  # Instance name or ID
  record_kind: fact            # Node type
  edge_kind: RELATED_TO        # Optional edge type
  template_id: memory_template # Optional template
```

**Data Format**:

```json
{
  "nodes": [
    {
      "id": "uuid-1",
      "kind": "fact",
      "name": "API uses REST",
      "attributes": {
        "confidence": 0.95,
        "source": "conversation",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    }
  ],
  "edges": [
    {
      "kind": "RELATED_TO",
      "from": "uuid-1",
      "to": "uuid-2",
      "attributes": {
        "relationship_type": "supports"
      }
    }
  ]
}
```

**Auto-Creation**:

If the instance doesn't exist, the routing engine:
1. Looks for a template (specified or discovered)
2. Creates instance from template
3. Adds records to new instance

**Example: Conversation Facts**

```yaml
routing:
  - from: extractor.facts
    write_to:
      type: graph
      instance: conversation_memory
      record_kind: fact
```

**Result**: Facts stored as nodes, searchable via graph queries.

### 2. Vector Storage (Semantic Search)

**Purpose**: Store embeddings for semantic similarity search

**Best For**:
- Conversation chunks for semantic search
- Document sections for content discovery
- Similarity-based recommendations
- Context retrieval for RAG

**Configuration**:
```yaml
write_to:
  type: vector
  collection: conversation_embeddings  # Collection name
  metadata:
    index_type: HNSW  # Index type
    dimension: 1536   # Embedding dimension
```

**Data Format**:

```json
[
  {
    "id": "chunk-0",
    "values": [0.123, -0.456, ...],  // Embedding vector
    "metadata": {
      "text": "Original chunk text...",
      "threadId": "abc-123",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  }
]
```

**Indexing**:

Vectors are automatically indexed for similarity search:
- **HNSW**: Hierarchical navigable small world (fast, approximate)
- **IVF**: Inverted file index (balanced)
- **Flat**: Exact search (slow, precise)

**Querying** (via Vector DB service):
```typescript
// Semantic search
results = await vectorDB.search({
  collection: "conversation_embeddings",
  queryVector: embedding,
  topK: 10,
  filter: { threadId: "abc-123" }
});
```

**Example: Searchable Conversations**

```yaml
routing:
  - from: embedder
    foreach: true  # Handle array of chunks
    write_to:
      type: vector
      collection: semantic_search
```

**Result**: Conversations searchable by meaning, not just keywords.

### 3. KV Storage (Key-Value)

**Purpose**: Fast key-based lookups for state and configuration

**Best For**:
- Agent state snapshots
- Configuration values
- Caching computed results
- Quick metadata lookups

**Configuration**:
```yaml
write_to:
  type: kv
  namespace: agent_state  # Namespace prefix
  key_template: "{agent_id}:snapshot"  # Key pattern
  instanceId: project-state  # Optional instance
```

**Data Format**:

```json
{
  "agent_id": "agent-1",
  "status": "working",
  "current_task": "Implement API",
  "last_updated": "2024-01-15T10:30:00Z"
}
```

**Key Resolution**:

Template variables are replaced:
- `{agent_id}` → From data
- `{timestamp}` → Event timestamp
- `{source.*}` → Event source fields

**Example Key**:
```
agent_state:agent-1:snapshot
```

**Querying** (via KV Store service):
```typescript
// Fast lookup
state = await kvStore.get("agent_state:agent-1:snapshot");

// Pattern scan
states = await kvStore.scan("agent_state:*");
```

**Example: Agent State Tracking**

```yaml
routing:
  - from: extractor.agent_states
    foreach: true
    write_to:
      type: kv
      namespace: agent_state
      key_template: "{agent_id}:status"
```

**Result**: Agent states instantly accessible via key lookup.

### 4. Blob Storage (Archival)

**Purpose**: Store raw data for archival and replay

**Best For**:
- Complete conversation transcripts
- File contents at point in time
- Large binary data
- Debug and audit logs

**Configuration**:
```yaml
write_to:
  type: blob
  bucket: conversations  # Bucket/container name
  path_template: "{date}/{threadId}/{timestamp}"  # Path pattern
```

**Data Format**:

Any JSON-serializable data:
```json
{
  "messages": [...],
  "metadata": {...},
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Storage Reference**:

```json
{
  "bucket": "conversations",
  "key": "2024/01/15/abc-123/1705307800.json",
  "size": 45000,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Path Template Variables**:
- `{date}`: Event date (YYYY-MM-DD)
- `{threadId}`: Thread ID
- `{timestamp}`: Unix timestamp
- `{eventType}`: Event type

**Retrieving** (via Blob Storage service):
```typescript
// Fetch archived data
data = await blobStorage.get("conversations", "2024/01/15/...");
```

**Example: Conversation Archival**

```yaml
routing:
  - from: event
    write_to:
      type: blob
      bucket: conversation_archive
      path_template: "{year}/{month}/{day}/{threadId}"
```

**Result**: Complete conversations preserved for replay.

### 5. Event Log (Time-Series)

**Purpose**: Append-only event stream for time-series analysis

**Best For**:
- Event history and replay
- Temporal queries
- Audit trails
- Event sourcing

**Configuration**:
```yaml
write_to:
  type: log
  event_type: memory_extracted  # Event type label
  instanceId: project_events  # Optional stream ID
```

**Data Format**:

```json
{
  "event_type": "memory_extracted",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "facts": [...],
    "decisions": [...]
  },
  "metadata": {
    "pipelineId": "conversation-extractor",
    "threadId": "abc-123"
  }
}
```

**Properties**:
- **Append-Only**: Events never mutated
- **Ordered**: Strict temporal ordering
- **Queryable**: By time range, type, metadata

**Querying** (via Event Log service):
```typescript
// Time-range query
events = await eventLog.query({
  eventTypes: ["memory_extracted"],
  startTime: "2024-01-01T00:00:00Z",
  endTime: "2024-01-31T23:59:59Z",
  filter: { "metadata.threadId": "abc-123" }
});
```

**Example: Extraction Audit Trail**

```yaml
routing:
  - from: extractor
    write_to:
      type: log
      event_type: conversation_memory_extracted
```

**Result**: Complete audit trail of all extractions.

## Routing Patterns

### Single Destination

```yaml
routing:
  - from: extractor.facts
    write_to:
      type: graph
      instance: knowledge
      record_kind: fact
```

### Multiple Destinations

```yaml
routing:
  - from: extractor.facts
    write_to:
      type: graph
      record_kind: fact

  - from: extractor.facts
    write_to:
      type: vector
      collection: fact_embeddings

  - from: extractor.facts
    write_to:
      type: log
      event_type: fact_created
```

Same data goes to three destinations simultaneously.

### Conditional Routing

```yaml
routing:
  - from: extractor
    condition: "confidence > 0.8"
    write_to:
      type: graph
      record_kind: high_confidence_fact

  - from: extractor
    condition: "confidence <= 0.8"
    write_to:
      type: graph
      record_kind: low_confidence_fact
```

Route based on data characteristics.

### Array Iteration

```yaml
routing:
  - from: chunker
    foreach: true  # Iterate over array
    write_to:
      type: vector
      collection: chunks
```

Each chunk stored separately.

### Nested Field Reference

```yaml
routing:
  - from: extractor.facts
    write_to:
      type: graph
      record_kind: fact

  - from: extractor.decisions
    write_to:
      type: graph
      record_kind: decision
```

Route different fields to different destinations.

## Instance Management

### Instance Discovery

```yaml
write_to:
  type: graph
  instance: project-knowledge  # Name lookup
```

Routing engine:
1. Looks up instance by name
2. Uses instance ID for operations
3. Creates if doesn't exist (with template)

### Instance Creation

When routing to non-existent instance:

```yaml
write_to:
  type: graph
  instance: new-instance
  template_id: memory_template  # Use this template
```

Engine creates instance from template automatically.

### Dynamic Instance Selection

```yaml
write_to:
  type: graph
  instance: "project-{source.projectId}"
  record_kind: memory
```

Template variables enable dynamic routing.

## Destination Selection Guide

### Use Graph Storage When:

- Data has relationships (entities, dependencies)
- Need complex queries (traversals, paths)
- Representing domain knowledge
- Schema is structured

**Examples**:
- Facts from conversations
- Architecture dependencies
- User preferences and relationships

### Use Vector Storage When:

- Need semantic similarity search
- Finding related content
- RAG (retrieval-augmented generation)
- Unstructured text search

**Examples**:
- Conversation chunks
- Documentation sections
- Code snippets

### Use KV Storage When:

- Need fast key-based lookups
- Simple state storage
- Configuration values
- Caching computed results

**Examples**:
- Agent states
- User settings
- Session data

### Use Blob Storage When:

- Preserving raw data
- Large file storage
- Archival and compliance
- Debug and replay

**Examples**:
- Conversation transcripts
- File snapshots
- Export dumps

### Use Event Log When:

- Building audit trails
- Event sourcing
- Temporal queries
- Replay scenarios

**Examples**:
- Extraction history
- State changes
- User actions

## Performance Considerations

### Write Performance

1. **Batch Writes**: Use `foreach: true` for bulk operations
2. **Async Writes**: Destinations accept writes asynchronously
3. **Index Later**: Defer heavy index building
4. **Partition**: Distribute across instances

### Query Performance

1. **Choose Right Destination**: Match access pattern
2. **Index Appropriately**: Set up indexes for query patterns
3. **Partition Strategies**: Separate hot/cold data
4. **Cache Frequently Accessed**: Use KV cache layer

### Storage Optimization

1. **TTL Policies**: Auto-expire old data
2. **Compression**: Compress blob storage
3. **Deduplication**: Avoid duplicate storage
4. **Archive Old Data**: Move to cheaper storage

## Best Practices

### Destination Design

1. **Separate Concerns**: Different data in different destinations
2. **Reference by ID**: Store IDs, not full objects
3. **Version Schemas**: Track schema evolution
4. **Document Purpose**: Clear naming and documentation

### Routing Rules

1. **Explicit Paths**: Clear data flow
2. **Handle Errors**: Log routing failures
3. **Monitor Performance**: Track write latencies
4. **Test Routes**: Verify data arrives correctly

### Instance Management

1. **Name Conventions**: Consistent instance naming
2. **Template Reuse**: Share templates across instances
3. **Access Control**: Restrict instance access
4. **Backup Strategy**: Regular instance backups

## Troubleshooting

### Routing Failures

1. Check destination instance exists
2. Verify data structure matches schema
3. Validate permission/access rights
4. Test destination connectivity

### Performance Issues

1. Monitor write queue depth
2. Check indexing overhead
3. Verify network latency
4. Review storage capacity

### Data Quality Issues

1. Validate processor outputs
2. Check data transformation logic
3. Review routing rule syntax
4. Audit destination contents

## Related Concepts

- **[Memory Ingestion Pipelines](/conceptbank/features/memory-systems/memory-ingestion-pipelines.md)**: How data flows to destinations
- **[Memory Processors](/conceptbank/features/memory-systems/memory-processors.md)**: Data transformation before routing
- **[Knowledge Graphs](/conceptbank/features/knowledge-management/knowledge-graphs.md)**: Graph storage details
- **[Vector Databases](/conceptbank/features/knowledge-management/vector-databases.md)**: Vector storage details
