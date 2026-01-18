---
title: Retrieval Patterns
category: Memory Systems
status: Active
tags: [retrieval, querying, search, patterns]
---

# Retrieval Patterns

## Executive Summary
Retrieval Patterns define the strategies and techniques for querying and accessing memory in CodeBolt. These patterns enable efficient context assembly, intelligent knowledge discovery, and adaptive memory usage based on query intent and performance requirements.

## What It Is and Why It Matters

With six memory types and multiple integration options, knowing how to query memory effectively is crucial. Retrieval Patterns provide:
- **Optimized Queries**: Choose the right memory type for each query
- **Hybrid Search**: Combine multiple retrieval methods
- **Context Assembly**: Build rich context from multiple sources
- **Performance Optimization**: Balance speed, quality, and cost
- **Adaptive Strategies**: Adjust based on query characteristics

**Why this matters:**
- **Efficient Access**: Get the right data fast
- **High Quality**: Retrieve relevant, contextual information
- **Cost Effective**: Optimize API calls and computation
- **Scalable**: Handle growing memory collections
- **Flexible**: Adapt to different use cases

## Core Retrieval Patterns

### 1. Semantic Retrieval
**Use when**: Meaning matters more than exact keywords

**How it works**:
```
Query → Embedding → Vector Search → Similarity Ranking
```

**Best for**:
- Documentation search
- Related content discovery
- Natural language queries
- Cross-domain knowledge

**Example**:
```typescript
// Query: "how to handle authentication"
// Returns: JWT implementation, OAuth guide, security best practices
```

### 2. Keyword Retrieval
**Use when**: Exact terms or specific identifiers needed

**How it works**:
```
Query → Tokenize → Index Lookup → Exact Match
```

**Best for**:
- Code search
- API endpoint lookup
- Error message matching
- ID-based queries

**Example**:
```typescript
// Query: "function authenticateUser"
// Returns: Exact function definition, usage examples
```

### 3. Graph Traversal
**Use when**: Relationships and structure matter

**How it works**:
```
Start Node → Follow Edges → Traverse Graph → Collect Results
```

**Best for**:
- Dependency analysis
- Impact assessment
- Relationship discovery
- Hierarchical queries

**Example**:
```typescript
// Query: "What depends on UserService?"
// Returns: AuthController, UserAPI, ProfileManager
```

### 4. Temporal Retrieval
**Use when**: Time and recency matter

**How it works**:
```
Query → Time Filter → Sort by Timestamp → Return Recent
```

**Best for**:
- Recent events
- Progress tracking
- Trend analysis
- Change detection

**Example**:
```typescript
// Query: "What happened in the last hour?"
// Returns: Events from last 60 minutes
```

### 5. Pattern Matching
**Use when**: Complex criteria or structure needed

**How it works**:
```
Query → Pattern Definition → Match Against Data → Filter Results
```

**Best for**:
- Complex filters
- Multi-field queries
- Structured data
- Event patterns

**Example**:
```typescript
// Query: "Events where agent='agent_1' and type='decision'"
// Returns: Filtered event list
```

## Hybrid Patterns

### Semantic + Keyword
Combine meaning and exact terms:

```typescript
// Step 1: Semantic search
semantic = vectorSearch(query, top_k=20)

// Step 2: Keyword filter
filtered = keywordFilter(semantic, terms)

// Step 3: Rerank
results = rerank(filtered, weights={semantic: 0.7, keyword: 0.3})
```

### Graph + Semantic
Combine relationships and meaning:

```typescript
// Step 1: Find related entities
entities = graphQuery(start_node, depth=2)

// Step 2: Search their content
content = vectorSearch(query, filter={entities: entities})

// Step 3: Combine
results = merge(entities, content)
```

### Temporal + Semantic
Time-aware semantic search:

```typescript
// Step 1: Get recent items
recent = temporalQuery(window="1d")

// Step 2: Semantic search within recent
relevant = semanticSearch(query, filter=recent)

// Step 3: Boost recent results
results = boost(relevant, recency_weight=0.3)
```

### Event + Context
Extract context from events:

```typescript
// Step 1: Find relevant events
events = eventSearch(query, window="1h")

// Step 2: Extract entities/entities
entities = extractEntities(events)

// Step 3: Get entity context
context = graphQuery(entities)

// Step 4: Assemble
results = assemble(events, context)
```

## Context Assembly Patterns

### Multi-Source Assembly
Build context from all memory types:

```typescript
// Collect from all sources
sources = {
  semantic: vectorSearch(query),
  structural: graphQuery(query),
  events: eventSearch(query),
  config: kvGet(["config", "settings"])
}

// Merge and rank
results = mergeAndRank(sources, weights={
  semantic: 0.4,
  structural: 0.3,
  events: 0.2,
  config: 0.1
})
```

### Progressive Refinement
Narrow down gradually:

```typescript
// Step 1: Broad search
broad = vectorSearch(query, top_k=50)

// Step 2: Filter by metadata
filtered = filter(broad, {category: "security"})

// Step 3: Re-rank by relevance
ranked = rerank(filtered, query)

// Step 4: Select top results
results = top(ranked, k=10)
```

### Diversified Retrieval
Get varied relevant content:

```typescript
// Step 1: Semantic search
semantic = vectorSearch(query, top_k=20)

// Step 2: Cluster by similarity
clusters = cluster(semantic)

// Step 3: Select from each cluster
diverse = selectFromClusters(clusters, per_cluster=2)

// Step 4: Re-rank
results = rerank(diverse)
```

## Query Optimization Strategies

### Early Filtering
Reduce data volume early:

```typescript
// Bad: Search everything, filter later
results = filter(vectorSearch(query, top_k=100), {date: "2024"})

// Good: Filter before search
results = vectorSearch(query, top_k=10, filter={date: "2024"})
```

### Caching
Cache frequent queries:

```typescript
// Check cache first
if (cache.has(query)) {
  return cache.get(query)
}

// Execute query
results = executeQuery(query)

// Cache results
cache.set(query, results, ttl=300)
return results
```

### Parallel Execution
Run independent queries in parallel:

```typescript
// Parallel independent searches
[semantic, graph, events] = parallel([
  vectorSearch(query),
  graphQuery(query),
  eventSearch(query)
])

// Merge results
results = merge(semantic, graph, events)
```

### Batch Processing
Process multiple queries together:

```typescript
// Single API call for multiple queries
embeddings = embed([query1, query2, query3])

// Search in parallel
results = parallel([
  vectorSearch(embeddings[0]),
  vectorSearch(embeddings[1]),
  vectorSearch(embeddings[2])
])
```

## Adaptive Retrieval

### Query Intent Detection
Adjust strategy based on intent:

```typescript
intent = detectIntent(query)

if (intent === "lookup") {
  // Exact match needed
  return keywordSearch(query)
} else if (intent === "explore") {
  // Broad discovery
  return vectorSearch(query, top_k=20)
} else if (intent === "analyze") {
  // Deep dive
  return graphQuery(query, depth=3)
}
```

### Performance-Based Selection
Choose based on SLA:

```typescript
if (timeout < 100ms) {
  // Fast path: KV lookup
  return kvGet(cache_key)
} else if (timeout < 1000ms) {
  // Medium path: Semantic search
  return vectorSearch(query, top_k=5)
} else {
  // Full path: Hybrid search
  return hybridSearch(query)
}
```

### Quality Feedback Loop
Improve based on feedback:

```typescript
results = search(query)

if (userFeedback === "not_relevant") {
  // Adjust weights
  updateWeights(query, results, feedback)
  
  // Try alternative pattern
  return alternativeSearch(query)
}

return results
```

## Use Case Examples

### Code Assistant
```typescript
// 1. Find similar code (semantic)
similar = vectorSearch(query, collection="code")

// 2. Get dependencies (graph)
deps = graphQuery(similar, edge="DEPENDS_ON")

// 3. Get docs (semantic)
docs = vectorSearch(query, collection="docs")

// 4. Get recent changes (temporal)
recent = eventSearch(query, window="1d")

// 5. Assemble context
context = assemble(similar, deps, docs, recent)
```

### Project Manager
```typescript
// 1. Get project status (kv)
status = kvGet(["project_status", "metrics"])

// 2. Get recent decisions (temporal)
decisions = eventSearch({type: "decision"}, window="1w")

// 3. Get team context (graph)
team = graphQuery({type: "Person"}, edge="WORKS_ON")

// 4. Get documentation (semantic)
docs = vectorSearch(query, collection="docs")

// 5. Assemble overview
overview = assemble(status, decisions, team, docs)
```

### Debug Assistant
```typescript
// 1. Find error messages (keyword)
errors = keywordSearch(error_message)

// 2. Get related code (graph)
code = graphQuery(errors, edge="DEFINED_IN")

// 3. Get similar issues (semantic)
similar = vectorSearch(error_description, collection="issues")

// 4. Get recent events (temporal)
events = eventSearch({error_id}, window="1h")

// 5. Assemble diagnosis
diagnosis = assemble(errors, code, similar, events)
```

## Best Practices

### Pattern Selection
- Understand query intent first
- Consider performance requirements
- Match pattern to memory type
- Profile and optimize

### Hybrid Strategies
- Start simple, add complexity
- Weigh trade-offs (speed vs. quality)
- Test with real queries
- Monitor performance metrics

### Context Assembly
- Prioritize relevant sources
- Avoid information overload
- Maintain coherence
- Handle conflicts

### Performance
- Cache when possible
- Filter early
- Parallelize independent operations
- Monitor and optimize

## Related Concepts

- **[Memory Integration](./memory-integration.md)**: Pipeline-based retrieval
- **[Vector Database](./vector-database.md)**: Semantic search
- **[Semantic Memory](./semantic-memory.md)**: Graph queries
- **[Episodic Memory](./episodic-memory.md)**: Event search
- **[Infinite Context](./infinite-context.md)**: Context assembly

## Technical Details

**Pipeline Execution:** `persistentMemoryPipelineService.ts`
**Query Services:** Individual memory type services
**Router:** Intent-based query routing
**Cache:** Redis/memory caching layer

**Key Functions:**
- `detectIntent()`: Determine query type
- `selectPattern()`: Choose retrieval strategy
- `executePattern()`: Run retrieval pipeline
- `assembleContext()`: Combine results
