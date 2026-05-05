---
title: Infinite Context
category: Memory Systems
status: Active
tags: [context-window, llm, retrieval, assembly]
---

# Infinite Context

## Executive Summary
Infinite Context solves the fundamental context window limitation of LLMs by intelligently retrieving, summarizing, and assembling relevant information from persistent memory. This enables agents to access unlimited historical context despite fixed LLM context windows.

## What It Is and Why It Matters

**The Problem**: LLMs have fixed context windows (e.g., 4K, 8K, 32K tokens). Once filled, older information is lost, making long-running tasks and complex reasoning impossible.

**The Solution**: Instead of stuffing everything into the context window, Infinite Context:
1. **Persists** all information to memory systems
2. **Retrieves** only relevant information for current task
3. **Summarizes** and compresses when needed
4. **Assembles** coherent context from multiple sources
5. **Updates** dynamically as conversation progresses

**Why this matters:**
- **Long-Running Tasks**: Work on projects over days/weeks
- **Complex Reasoning**: Access all relevant information
- **Cost Efficiency**: Reduce token usage and API costs
- **Better Quality**: Focused, relevant context
- **Scalability**: Handle unlimited information

## Key Capabilities

### Dynamic Context Management
- **Relevance-Based Retrieval**: Fetch what matters for current task
- **Context Prioritization**: Rank information by importance
- **Progressive Disclosure**: Add context as needed
- **Context Rotation**: Swap out less relevant context
- **Summary Compression**: Condense older information

### Multi-Source Assembly
- **Semantic Search**: Find relevant content by meaning
- **Temporal Filters**: Prioritize recent information
- **Graph Traversal**: Include related entities
- **Event History**: Include relevant past events
- **Configuration Data**: Access settings and state

### Context Optimization
- **Token Budgeting**: Allocate context space efficiently
- **Deduplication**: Remove redundant information
- **Coherence Checking**: Ensure context consistency
- **Conflict Resolution**: Handle contradictory information
- **Quality Scoring**: Prioritize high-quality content

### Adaptive Strategies
- **Query Intent Detection**: Match retrieval to intent
- **Performance Tuning**: Balance speed vs. quality
- **Cost Management**: Optimize API usage
- **Quality Feedback**: Improve based on results

## How It Works Conceptually

### The Infinite Context Pipeline

```
User Query
    ↓
Intent Analysis
    ↓
Relevance Retrieval (from all memory types)
    ↓
Context Assembly
    ↓
Token Budget Check
    ↓
Summary Compression (if needed)
    ↓
Context Window Fill
    ↓
LLM Processing
    ↓
Response Generation
```

### Context Assembly Strategy

```typescript
// 1. Analyze intent
intent = analyzeQuery(query)

// 2. Determine context budget
budget = calculateBudget(intent, window_size)

// 3. Retrieve from memory
retrieved = {
  recent: getContextMemory(last_n=10),
  relevant: vectorSearch(query, top_k=5),
  related: graphQuery(expand=depth_2),
  events: eventSearch(window="1h"),
  config: kvGet(["settings"])
}

// 4. Rank by relevance
ranked = rankByRelevance(retrieved, query)

// 5. Fit to budget
context = fitToBudget(ranked, budget)

// 6. Add to context window
addToContextWindow(context)
```

### Progressive Context Loading

```
Initial Context (2000 tokens):
├── Recent messages (500 tokens)
├── Relevant docs (1000 tokens)
└── Related events (500 tokens)

User Follow-up Question
    ↓
Add More Context (+1500 tokens):
├── Deeper doc details (800 tokens)
├── Related code (500 tokens)
└── Event history (200 tokens)

Total: 3500 tokens (within 4000 token window)
```

### Context Compression

```typescript
// When approaching context limit:
if (current_tokens > threshold * window_size) {
  // Summarize oldest context
  old_context = context.slice(0, 1000)
  summary = summarize(old_context)
  
  // Replace with summary
  context = summary + context.slice(1000)
  
  // Save full context to memory
  saveToMemory(old_context)
}
```

## Retrieval Strategies

### Semantic Relevance
Find content by meaning:

```typescript
// Query: "How to handle user authentication?"
// Retrieved (by semantic similarity):
1. "JWT Implementation Guide" (0.94)
2. "OAuth2.0 Setup" (0.89)
3. "Security Best Practices" (0.85)
4. "Session Management" (0.81)
```

### Temporal Priority
Prioritize recent information:

```typescript
// Weight by recency
score = semantic_similarity * recency_boost

// Recency decay
boost = exp(-time_diff / decay_hours)

// Recent events get higher score
```

### Relationship Expansion
Include related entities:

```typescript
// Start: Query about "UserService"
// Expand: Include related entities
├── UserService (main)
├── AuthController (depends on UserService)
├── UserRepository (used by UserService)
└── UserAPI (implements UserService)
```

### Diversity Sampling
Get varied relevant content:

```typescript
// Cluster similar results
clusters = cluster(results, threshold=0.8)

// Sample from each cluster
diverse = sampleFromClusters(clusters, per_cluster=2)

// Ensures breadth of coverage
```

## Context Assembly Patterns

### Hierarchical Assembly
Build context in layers:

```typescript
// Layer 1: Immediate context (recent messages)
context += getRecentMessages(n=5)

// Layer 2: Directly relevant (semantic search)
context += getRelevantDocs(query, top_k=3)

// Layer 3: Related context (graph expansion)
context += getRelatedEntities(query, depth=1)

// Layer 4: Background (summarized)
context += getBackgroundSummary()
```

### Query-Driven Assembly
Assemble based on query:

```typescript
if (query.type === "lookup") {
  // Quick reference
  context = [
    getConfig(),
    getAPIReference(query.target)
  ]
} else if (query.type === "analysis") {
  // Deep analysis
  context = [
    getRecentEvents(window="1d"),
    getRelevantDocs(query, top_k=10),
    getRelatedGraph(query, depth=2),
    getHistoricalContext()
  ]
} else if (query.type === "creation") {
  // Creative work
  context = [
    getRequirements(),
    getSimilarExamples(query, top_k=5),
    getBestPractices(),
    getTemplates()
  ]
}
```

### Dynamic Context Updating
Update context as conversation progresses:

```typescript
// Initial context
context = assembleContext(initial_query)

// User follow-up
followup_context = retrieveRelevant(followup_query)

// Merge and prioritize
merged = mergeContexts(context, followup_context)

// Re-rank by current relevance
context = rerankByRecency(merged)

// Add to context window
updateContextWindow(context)
```

## Token Management

### Budget Allocation

```typescript
{
  system_prompt: 500,      // Fixed
  recent_messages: 1000,   // High priority
  retrieved_docs: 1500,    // Medium priority
  related_context: 500,    // Low priority
  buffer: 500,             // Safety margin
  total: 4000              // Context window
}
```

### Prioritization Strategy

```typescript
// Priority levels
priority = {
  critical: 1.0,    // System prompt, current task
  high: 0.8,        // Recent messages
  medium: 0.6,      // Relevant docs
  low: 0.4,         // Related context
  background: 0.2   // Historical
}

// Calculate score
score = relevance_score * priority_level

// Sort and fill context
sorted = sortByScore(items)
context = fillBudget(sorted, budget)
```

### Compression Techniques

```typescript
// 1. Remove redundancy
deduplicated = removeDuplicates(context)

// 2. Summarize old content
summary = summarize(old_context, target_length=200)

// 3. Extract key points
key_points = extractKeyPoints(context)

// 4. Maintain references
compressed = [
  summary,
  key_points,
  references_to_full_content
]
```

## Use Cases

### Long-Running Development
Maintain context across days:

```typescript
// Day 1: Initial implementation
context = [
  getRequirements(),
  getArchitecture(),
  getCurrentCode()
]

// Day 2: Continue work
context = [
  getPreviousWork(),  // Retrieved from memory
  getRecentChanges(),
  getCurrentTask()
]

// Day 3: Bug fix
context = [
  getBugReport(),
  getRelatedCode(),  // From graph
  getPastDecisions(),  // From episodic
  getFixHistory()  // From events
]
```

### Complex Troubleshooting
Access extensive history:

```typescript
// Query: "Why is authentication failing?"
context = [
  getErrorHistory(),  // Recent errors
  getAuthCode(),  // Current implementation
  getPastIssues(),  // Similar past issues
  getDependencies(),  // Related components
  getConfigChanges(),  // Recent config changes
  getDeployHistory()  // Deployment timeline
]
```

### Multi-Step Planning
Maintain planning context:

```typescript
// Step 1: High-level plan
context = [
  getProjectGoals(),
  getConstraints(),
  getRequirements()
]

// Step 2: Detailed design
context = [
  getPlanSummary(),  // Compressed step 1
  getDesignDocs(),
  getArchitecture(),
  getAPIContracts()
]

// Step 3: Implementation
context = [
  getDesignSummary(),  // Compressed step 2
  getCurrentTask(),
  getCodeReference(),
  getTestRequirements()
]
```

## Performance Optimization

### Retrieval Caching
```typescript
// Cache frequent retrievals
if (cache.has(query)) {
  return cache.get(query)
}

// Execute retrieval
results = retrieve(query)

// Cache with TTL
cache.set(query, results, ttl=300)
```

### Parallel Retrieval
```typescript
// Fetch from multiple sources in parallel
[semantic, graph, events] = parallel([
  vectorSearch(query),
  graphQuery(query),
  eventSearch(query)
])

// Merge results
results = merge(semantic, graph, events)
```

### Lazy Loading
```typescript
// Load critical context first
context = getCriticalContext()

// Load additional as needed
onUserFollowup((query) => {
  additional = retrieveRelevant(query)
  addToContext(additional)
})
```

## Best Practices

### Context Design
- Start with high-relevance, low-volume context
- Add detail progressively
- Maintain context coherence
- Monitor context quality

### Retrieval Strategy
- Understand query intent
- Use appropriate memory types
- Balance breadth vs. depth
- Consider performance cost

### Token Management
- Budget tokens strategically
- Prioritize critical information
- Compress aggressively when needed
- Maintain references for detail access

### Quality Assurance
- Validate context relevance
- Check for contradictions
- Ensure temporal coherence
- Monitor user satisfaction

## Metrics and Monitoring

### Effectiveness Metrics
- **Context Hit Rate**: How often retrieved context is used
- **Relevance Score**: Average relevance of retrieved context
- **Compression Ratio**: Token reduction from compression
- **User Satisfaction**: Feedback on context quality

### Performance Metrics
- **Retrieval Latency**: Time to assemble context
- **Token Efficiency**: Useful tokens / total tokens
- **Cache Hit Rate**: Percentage of cache hits
- **Cost per Query**: API cost per interaction

### Quality Metrics
- **Coherence Score**: Context consistency
- **Coverage**: How well context addresses query
- **Redundancy**: Duplicate information
- **Completeness**: Missing critical information

## Related Concepts

- **[Memory Architecture](./memory-architecture.md)**: Overall system design
- **[Memory Integration](./memory-integration.md)**: Combining memory types
- **[Retrieval Patterns](./retrieval-patterns.md)**: Query strategies
- **[Context Memory](./context-memory.md)**: Working memory
- **[Vector Database](./vector-database.md)**: Semantic search

## Technical Implementation

**Context Assembly:** `contextAssemblyService.ts`
**Retrieval Router:** `retrievalRouter.ts`
**Token Manager:** `tokenBudgetManager.ts`
**Summarization:** `llmService.ts` (via LLM)
**Cache Layer:** Redis/memory cache

**Key Operations:**
- `assembleContext()`: Build context from memory
- `manageTokenBudget()`: Allocate token space
- `compressContext()`: Summarize and compress
- `updateContext()`: Dynamic context updates
- `monitorPerformance()`: Track metrics
