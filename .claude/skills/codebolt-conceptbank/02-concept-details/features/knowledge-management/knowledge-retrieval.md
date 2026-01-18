---
title: Knowledge Retrieval
category: Knowledge Management
status: Active
tags: [retrieval, search, hybrid, context-assembly, multi-source]
---

# Knowledge Retrieval

## Executive Summary
Knowledge Retrieval provides unified search and access patterns across all knowledge systems, enabling intelligent context assembly by combining semantic search, graph traversal, and structured queries to deliver the most relevant information for any task.

## What It Is and Why It Matters

Knowledge Retrieval is CodeBolt's intelligent search and context assembly system that orchestrates multiple knowledge sources:

- **Unified Search**: Single interface for all knowledge types
- **Multi-Strategy**: Semantic, keyword, graph, and hybrid approaches
- **Context Assembly**: Build rich context from multiple sources
- **Query Optimization**: Automatically choose best retrieval strategy
- **Result Fusion**: Combine and rank results from different sources

**Why this matters:**
- **Comprehensive Access**: Find knowledge regardless of storage type
- **Intelligent Selection**: Use the right search method for each query
- **Rich Context**: Assemble complete context from diverse sources
- **Efficient Retrieval**: Get relevant results without manual searching
- **Agent Empowerment**: Provide agents with curated knowledge

## Key Capabilities

### Unified Query Interface
- **Natural Language**: Ask questions in plain text
- **Structured Queries**: Use filters and conditions
- **Multi-Source**: Search across all knowledge types
- **Query Planning**: Optimize search strategy automatically
- **Result Aggregation**: Combine results from multiple sources

### Retrieval Strategies
- **Semantic Search**: Vector-based similarity search
- **Keyword Search**: BM25 and exact matching
- **Graph Traversal**: Follow relationships in knowledge graph
- **Hybrid Search**: Combine multiple approaches
- **Adaptive Selection**: Choose best strategy based on query

### Context Assembly
- **Multi-Source Gathering**: Collect from documents, graph, episodic
- **Relevance Ranking**: Sort by relevance and importance
- **Deduplication**: Remove duplicate information
- **Summarization**: Condense large result sets
- **Progressive Disclosure**: Provide most relevant first

### Query Optimization
- **Query Analysis**: Understand intent and context
- **Source Selection**: Choose relevant knowledge sources
- **Strategy Selection**: Pick optimal retrieval method
- **Result Filtering**: Apply domain-specific filters
- **Performance Tuning**: Balance speed vs. comprehensiveness

### Result Presentation
- **Unified Format**: Consistent result structure
- **Source Attribution**: Clear provenance information
- **Relevance Scoring**: Numerical relevance indicators
- **Metadata**: Rich context about results
- **Actionable Links**: Direct access to source content

## How It Works Conceptually

### Unified Retrieval Pipeline

```
User Query
   ↓
Query Analysis
   - Understand intent
   - Extract entities
   - Identify context
   ↓
Query Planning
   - Select sources (documents, graph, vector)
   - Choose strategies (semantic, keyword, graph)
   - Plan execution order
   ↓
Parallel Execution
   - Vector Database (semantic search)
   - Knowledge Panel (document metadata)
   - Knowledge Graph (relationship traversal)
   - Episodic Memory (event search)
   ↓
Result Fusion
   - Combine results
   - Remove duplicates
   - Re-rank by relevance
   - Apply domain weights
   ↓
Context Assembly
   - Organize by theme
   - Add connections
   - Summarize if needed
   ↓
Return Unified Results
```

### Multi-Source Query Example

```
Query: "How does JWT authentication work in our system?"

Retrieval Strategy:
1. Semantic Search (Vector DB)
   - Find docs about JWT and authentication
   - Results: JWT guide, auth flow, security docs

2. Graph Traversal (Knowledge Graph)
   - Start: JWT entity
   - Follow: IMPLEMENTED_BY, USES, SECURES
   - Results: Services using JWT, related entities

3. Document Metadata (Knowledge Panel)
   - Filter by category: "security", "authentication"
   - Results: Auth-related documents with metadata

4. Episodic Search
   - Find events: "JWT", "authentication", "token"
   - Results: Past decisions, implementation events

Fused Results:
- JWT Implementation Guide (vector: 0.94, graph: related)
- Authentication Flow Diagram (vector: 0.89)
- Security Decision Log (episodic: JWT choice)
- Service Dependencies (graph: JWT → AuthService)
- Common Pitfalls (vector: 0.82, episodic: referenced)
```

### Query Analysis

```typescript
function analyzeQuery(query: string) {
  return {
    intent: "how_to",  // what, how, why, find, compare
    entities: ["JWT", "authentication"],
    context: "our system",
    scope: "technical",
    timeSensitivity: "current",
    complexity: "intermediate"
  };
}
```

### Strategy Selection

```typescript
function selectStrategy(analysis: QueryAnalysis) {
  if (analysis.entities.length > 1) {
    return "graph_traversal";  // Explore relationships
  } else if (analysis.intent === "find") {
    return "semantic_search";  // Similarity-based
  } else if (analysis.intent === "how_to") {
    return "hybrid";  // Multiple approaches
  } else {
    return "keyword_search";  // Exact matches
  }
}
```

### Result Fusion Algorithm

```typescript
function fuseResults(results: MultiSourceResults) {
  // 1. Collect all results
  const all = [
    ...results.vector.map(r => ({ ...r, source: 'vector', weight: 0.4 })),
    ...results.graph.map(r => ({ ...r, source: 'graph', weight: 0.3 })),
    ...results.documents.map(r => ({ ...r, source: 'documents', weight: 0.2 })),
    ...results.episodic.map(r => ({ ...r, source: 'episodic', weight: 0.1 }))
  ];

  // 2. Deduplicate by content
  const unique = deduplicateByContent(all);

  // 3. Weight by source and relevance
  const scored = unique.map(r => ({
    ...r,
    finalScore: r.score * r.weight + boost(r)
  }));

  // 4. Sort by final score
  return scored.sort((a, b) => b.finalScore - a.finalScore);
}
```

## Use Cases

### Agent Context Building
Provide comprehensive context for AI agent tasks:

```typescript
Agent Task: "Implement user authentication"

Retrieved Context:
{
  summary: "Authentication uses JWT tokens with 30min expiration",
  documents: [
    { source: "JWT Guide", relevance: 0.94 },
    { source: "Auth Flow", relevance: 0.89 }
  ],
  graph: {
    entities: ["AuthService", "JWT", "User"],
    relationships: ["AuthService-USES-JWT", "User-HAS-JWT"]
  },
  decisions: [
    { event: "Chose JWT over sessions", date: "2024-01-15" }
  ],
  code: [
    { file: "auth.ts", snippet: "jwt.verify(...)" }
  ]
}
```

### Documentation Search
Find relevant documentation across all sources:

```typescript
Query: "database connection pooling"

Unified Results:
1. "PostgreSQL Connection Guide" (vector: 0.91)
   - From: Documentation
   - Also found in: Graph (linked to Project X)

2. "Database Architecture Decision" (episodic: 0.88)
   - Event: Decision to use pooling
   - Related docs: Connection Guide

3. "PoolConfig Implementation" (code: 0.85)
   - File: src/db/pool.ts
   - Linked from: Architecture Decision

4. "Performance Testing Results" (vector: 0.82)
   - Shows pooling impact
   - Related to: Architecture Decision
```

### Knowledge Discovery
Discover related information across systems:

```typescript
Query: "microservices communication patterns"

Cross-System Insights:
From Documents:
- "API Design Guide" (0.93)
- "Service Communication" (0.87)

From Graph:
- Service --USES--> MessageQueue
- Service --CALLS--> Service
- MessageQueue --IMPLEMENTED_BY--> RabbitMQ

From Episodic:
- Decision: Use async messaging (2024-01-10)
- Decision: Adopt GraphQL for APIs (2024-01-15)

Connections:
- GraphQL mentioned in API Design Guide
- RabbitMQ chosen based on performance tests
```

### Problem Solving
Find solutions and related context:

```typescript
Query: "fix race condition in user creation"

Comprehensive Results:
From Vector DB:
- "Concurrency Issues" (0.92)
- "User Creation Flow" (0.88)

From Graph:
- UserCreation --DEPENDS_ON--> Database
- UserCreation --TRIGGERS--> EmailService
- EmailService --CAUSES--> RaceCondition

From Episodic:
- Bug Report: Race in user creation (2024-01-20)
- Fix: Added database transaction (2024-01-21)
- Test: Added concurrency test (2024-01-22)

Solution Assembly:
1. Use database transactions
2. Make email sending async
3. Add concurrency tests
4. Monitor for recurrence
```

### Decision Support
Support decisions with comprehensive context:

```typescript
Query: "should we migrate to microservices"

Retrieved Context:
From Documentation:
- "Microservices Pros/Cons" (0.94)
- "Current Monolith Architecture" (0.89)

From Graph:
- Monolith --CONTAINS--> 50 modules
- Module --HAS_DEPENDENCY--> Module (complex web)

From Episodic:
- Decision: Built as monolith (2023-01-01)
- Pain point: Slow deployments (ongoing)
- Pain point: Difficult to scale (ongoing)

Analysis:
- Current: Monolithic, 50 modules, complex dependencies
- Issues: Deployment speed, scaling
- Considerations: Team size, traffic patterns, complexity cost
```

## Retrieval Patterns

### Semantic Pattern
For meaning-based queries:

```typescript
async function semanticRetrieval(query: string) {
  // 1. Convert query to embedding
  const vector = await embed(query);

  // 2. Search vector database
  const results = await vectorDb.search(vector, {
    topK: 20,
    minScore: 0.75
  });

  // 3. Expand with related content
  const expanded = await expandWithRelated(results);

  // 4. Re-rank by diversity
  return rerankByDiversity(expanded);
}
```

### Graph Traversal Pattern
For relationship queries:

```typescript
async function graphRetrieval(entity: string, depth: number) {
  // 1. Find starting node
  const startNode = await graph.findNode(entity);

  // 2. Traverse to specified depth
  const neighborhood = await graph.traverse(startNode, {
    maxDepth: depth,
    direction: 'both'
  });

  // 3. Filter and rank by importance
  const ranked = rankByCentrality(neighborhood);

  // 4. Return with paths
  return formatWithPaths(ranked);
}
```

### Hybrid Pattern
Combine multiple approaches:

```typescript
async function hybridRetrieval(query: string) {
  // Parallel execution
  const [semantic, keyword, graph] = await Promise.all([
    semanticRetrieval(query),
    keywordRetrieval(query),
    graphRetrieval(extractEntities(query))
  ]);

  // Fuse results
  return fuseResults({
    semantic: semantic,
    keyword: keyword,
    graph: graph,
    weights: { semantic: 0.5, keyword: 0.3, graph: 0.2 }
  });
}
```

### Context Assembly Pattern
Build comprehensive context:

```typescript
async function assembleContext(task: string) {
  // 1. Analyze task
  const analysis = analyzeTask(task);

  // 2. Retrieve from multiple sources
  const results = await Promise.all([
    retrieveFromVector(analysis),
    retrieveFromGraph(analysis),
    retrieveFromDocuments(analysis),
    retrieveFromEpisodic(analysis)
  ]);

  // 3. Organize by theme
  const themed = organizeByTheme(results);

  // 4. Summarize if large
  const context = themed.length > 10
    ? await summarize(themed)
    : themed;

  // 5. Add connections
  return addConnections(context);
}
```

### Progressive Disclosure Pattern
Provide results incrementally:

```typescript
async function progressiveRetrieval(query: string) {
  // First pass: quick, limited results
  const quick = await quickSearch(query, { topK: 5 });

  // Return immediately
  yield quick;

  // Second pass: comprehensive search
  const comprehensive = await comprehensiveSearch(query, {
    topK: 50,
    sources: 'all'
  });

  // Return additional results
  yield comprehensive;
}
```

## Query Optimization

### Intent Classification

```typescript
enum QueryIntent {
  FACTUAL = "factual",      // "What is X?"
  PROCEDURAL = "procedural",  // "How to do X?"
  COMPARATIVE = "comparative", // "X vs Y?"
  EXPLORATORY = "exploratory", // "Tell me about X"
  OPERATIONAL = "operational"  // "Find X related to Y"
}
```

### Source Selection

```typescript
function selectSources(intent: QueryIntent, entities: string[]) {
  const sources = [];

  // Always include vector DB for semantic search
  sources.push('vector');

  // Include graph if entities are mentioned
  if (entities.length > 0) {
    sources.push('graph');
  }

  // Include episodic for procedural queries
  if (intent === QueryIntent.PROCEDURAL) {
    sources.push('episodic');
  }

  // Include documents for factual queries
  if (intent === QueryIntent.FACTUAL) {
    sources.push('documents');
  }

  return sources;
}
```

### Performance Tuning

```typescript
interface RetrievalConfig {
  // Speed vs. quality trade-off
  mode: 'fast' | 'balanced' | 'comprehensive';

  // Result limits
  maxResults: number;
  maxPerSource: number;

  // Parallelization
  parallelSources: boolean;

  // Caching
  useCache: boolean;
  cacheTTL: number;
}
```

## Integration Patterns

### With Agents
Provide agents with intelligent context:

```typescript
// Agent requests context
const context = await knowledgeRetrieval.getContext(agent.task);

// Agent uses context for reasoning
const response = await agent.reason(context);

// Agent contributes back to knowledge
await knowledgeRetrieval.ingest(agent.learnings);
```

### With UI Panels
Support UI search functionality:

```typescript
// Unified search bar
const results = await knowledgeRetrieval.search(query, {
  sources: ['documents', 'graph', 'vector'],
  ui: true  // Format for UI display
});

// Display results with tabs
displayResults({
  all: results.all,
  documents: results.documents,
  graph: results.graph,
  vector: results.vector
});
```

### With Memory Systems
Coordinate with memory ingestion:

```typescript
// When new content is added
await memorySystem.ingest(content);

// Automatically index in vector DB
await vectorDb.index(content);

// Extract entities for graph
await knowledgeGraph.extractEntities(content);

// Update retrieval index
await knowledgeRetrieval.updateIndex(content);
```

## Best Practices

### Query Formulation
- **Specific Over General**: More specific queries get better results
- **Include Context**: Provide relevant background
- **Use Entities**: Mention specific entities when known
- **Natural Language**: Ask questions naturally
- **Iterate**: Refine based on results

### Result Interpretation
- **Check Scores**: Higher scores = more relevant
- **Verify Sources**: Cross-reference multiple sources
- **Follow Links**: Explore related content
- **Consider Context**: Results depend on query context
- **Trust but Verify**: Validate critical information

### Performance Optimization
- **Use Caching**: Cache frequent queries
- **Limit Scope**: Restrict to relevant sources
- **Parallel Execution**: Run independent queries in parallel
- **Progressive Loading**: Show quick results first
- **Result Limits**: Set reasonable topK values

### Context Assembly
- **Prioritize**: Most relevant first
- **Summarize**: Condense large result sets
- **Connect**: Show relationships between results
- **Attribute**: Clearly mark source of each result
- **Organize**: Group by theme or topic

## Advanced Features

### Query Expansion
Automatically improve queries:

```typescript
async function expandQuery(query: string) {
  // Extract entities
  const entities = await extractEntities(query);

  // Generate synonyms
  const synonyms = await getSynonyms(query);

  // Find related concepts
  const related = await findRelated(query);

  // Build expanded query
  return {
    original: query,
    entities: entities,
    expanded: [query, ...synonyms, ...related]
  };
}
```

### Re-Ranking
Improve result quality:

```typescript
async function rerank(results: SearchResult[], query: string) {
  // Initial scores from retrieval
  const initialScores = results.map(r => r.score);

  // Diversity penalty
  const diversityPenalty = calculateDiversity(results);

  // Freshness boost
  const freshnessBoost = calculateFreshness(results);

  // Authority boost
  const authorityBoost = calculateAuthority(results);

  // Combine
  return results.map((r, i) => ({
    ...r,
    finalScore: initialScores[i]
      + diversityPenalty[i]
      + freshnessBoost[i]
      + authorityBoost[i]
  }));
}
```

### Learning from Feedback
Improve over time:

```typescript
// Track user interactions
trackInteraction({
  query: query,
  results: results,
  clicked: [2, 5, 8],  // Which results were clicked
  satisfied: true
});

// Learn preferences
learnPreferences({
  preferredSources: ['documents', 'graph'],
  preferredResults: 'comprehensive',
  ignoreScoresBelow: 0.75
});

// Adjust future queries
adjustQueryStrategy(learnedPreferences);
```

## Troubleshooting

### Common Issues

**No Relevant Results**
- Check query specificity
- Try different phrasing
- Expand search scope
- Check available sources
- Verify content exists

**Slow Response**
- Reduce result limits
- Use specific sources
- Enable caching
- Check network latency
- Optimize query

**Poor Result Quality**
- Refine query terms
- Use more context
- Try different strategy
- Check source quality
- Provide feedback

**Missing Sources**
- Verify source is available
- Check indexing status
- Confirm permissions
- Review query filters
- Check source configuration

## Related Concepts

- **[Knowledge Panel](./knowledge-panel.md)**: Document management
- **[Knowledge Graph](./knowledge-graph.md)**: Entity relationships
- **[Vector Database](./vector-db.md)**: Semantic search
- **[Memory Integration](../memory-systems/memory-integration.md)**: Multi-memory coordination
- **[Retrieval Patterns](../memory-systems/retrieval-patterns.md)**: Query strategies

## Technical Details

**Orchestration:** Coordinate multiple retrieval services
**Vector DB:** `src/main/server/services/vectordbService.ts`
**Knowledge Graph:** `src/main/server/services/kuzuDbService.ts`
**Knowledge Panel:** `src/main/server/services/knowledgeService.ts`
**Episodic Memory:** `src/main/server/services/episodicMemoryDataService.ts`
**Types:** `src/types/knowledge*.ts`

**Key Operations:**
- `unifiedSearch()`: Search across all sources
- `getContext()`: Assemble context for agents
- `hybridQuery()`: Combine retrieval strategies
- `fuseResults()`: Merge and rank results
- `optimizeQuery()`: Improve query performance
