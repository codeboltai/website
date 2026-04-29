---
title: Vector Database
category: Knowledge Management
status: Active
tags: [vector, embeddings, semantic-search, similarity, retrieval, vectra]
---

# Vector Database

## Executive Summary
Vector Database enables semantic search and similarity-based retrieval through embeddings, transforming how knowledge is discovered by finding relevant content based on meaning rather than exact keyword matches.

## What It Is and Why It Matters

Vector Database is CodeBolt's semantic search engine, using vector embeddings to understand the meaning of content:

- **Semantic Similarity**: Find content by meaning, not just keywords
- **Embedding-Based**: Convert text to numerical vector representations
- **Flexible Search**: Natural language queries that understand intent
- **Multi-Provider Support**: OpenAI, local models, and custom embeddings
- **Hybrid Search**: Combine semantic with keyword-based search (BM25)

**Why this matters:**
- **Intelligent Discovery**: Find relevant content without exact keywords
- **Knowledge Connection**: Discover related information across sources
- **Natural Queries**: Ask questions in plain language
- **Context Assembly**: Build relevant context for AI agents
- **Recommendation**: Suggest related content and resources

## Key Capabilities

### Embedding Generation
- **Multiple Providers**: OpenAI, local models, custom endpoints
- **Flexible Models**: Choose embedding model per collection
- **Batch Processing**: Efficient bulk embedding generation
- **Embedding Caching**: Store embeddings to avoid recomputation
- **Local Support**: Run embeddings locally for privacy and cost savings

### Vector Storage
- **Collections**: Organize documents by domain or purpose
- **Metadata**: Store additional context with vectors
- **Chunking**: Split large documents for optimal retrieval
- **Fast Indexing**: HNSW (Hierarchical Navigable Small World) for speed
- **File Persistence**: Durable storage in `.codebolt/vectordb/`

### Search Capabilities
- **Semantic Queries**: Natural language understanding
- **Top-K Results**: Retrieve most similar items
- **Threshold Filtering**: Set minimum similarity scores
- **Metadata Filters**: Combine semantic with structured queries
- **Hybrid Search**: Blend vector (semantic) and BM25 (keyword) search

### Document Management
- **Upsert**: Add or update documents efficiently
- **Chunking**: Automatic text splitting for better retrieval
- **Tokenization**: GPT tokenizer for accurate token counts
- **Progress Tracking**: Real-time indexing progress
- **Batch Operations**: Process multiple documents efficiently

## How It Works Conceptually

### Embedding Process

```
1. Text Content
   "Authentication tokens should be refreshed every 30 minutes"
   ↓
2. Tokenization
   ["Authentication", "tokens", "should", "be", "refreshed", ...]
   ↓
3. Embedding Model
   (e.g., text-embedding-ada-002, 1536 dimensions)
   ↓
4. Vector Representation
   [0.123, -0.456, 0.789, ..., 0.234]  (1536 floats)
   ↓
5. Storage
   - Vector stored in index
   - Metadata preserved
   - Document reference maintained
```

### Similarity Search

```
Query: "how often should I refresh jwt tokens?"
   ↓
1. Convert Query to Embedding
   [0.145, -0.423, 0.801, ..., 0.198]
   ↓
2. Compare with Stored Vectors
   Calculate cosine similarity for all vectors
   ↓
3. Rank by Similarity Score
   - "Token refresh strategy" (0.94)
   - "JWT best practices" (0.87)
   - "Authentication guide" (0.82)
   ↓
4. Return Top-K Results
   Most similar documents with scores
```

### Hybrid Search

```
Query: "token refresh"
   ↓
1. Semantic Search (Vector)
   Find documents meaningfully similar
   ↓
2. Keyword Search (BM25)
   Find documents containing "token" and "refresh"
   ↓
3. Combine Scores
   final_score = α × semantic_score + (1-α) × bm25_score
   (default α = 0.7, favoring semantic)
   ↓
4. Return Reranked Results
   Best of both approaches
```

### Storage Model

```typescript
Collection: "Authentication Docs"
{
  id: "col_auth_123",
  name: "Authentication Documentation",
  embeddingModel: "text-embedding-ada-002",
  embeddingProvider: "openai",
  settings: {
    chunkSize: 512,
    chunkOverlap: 50,
    bm25Enabled: true,
    hybridAlpha: 0.7
  },
  documents: [
    {
      id: "doc_jwt_guide",
      uri: "jwt-authentication.md",
      metadata: {
        category: "security",
        author: "Alice",
        updated: "2024-01-15"
      },
      chunks: [
        {
          id: "chunk_001",
          content: "JWT tokens should be refreshed...",
          vector: [0.123, -0.456, ...],  // 1536 dimensions
          metadata: {
            documentId: "doc_jwt_guide",
            startPos: 0,
            endPos: 512,
            tokens: [15343, 292, ...]
          },
          score: 0.94  // similarity score
        }
      ]
    }
  ]
}
```

### File Organization

```
.codebolt/vectordb/
├── collection_{id}/
│   ├── collection.json       # Collection metadata
│   ├── vectors.bin           # HNSW index (vectors)
│   ├── metadata.json         # Document catalog
│   └── index.json            # Search index stats
```

## Use Cases

### Semantic Documentation Search
Find relevant docs without exact keywords:

```typescript
Query: "how to refresh jwt tokens automatically"

Results (ranked by semantic similarity):
1. "Token Refresh Strategy" (score: 0.94)
   - Discusses automatic refresh mechanisms
2. "JWT Best Practices" (score: 0.87)
   - Covers refresh token rotation
3. "Authentication Flow" (score: 0.81)
   - Explains token lifecycle
```

### Context Assembly for Agents
Build relevant context for AI tasks:

```typescript
Agent Task: "Implement user authentication"

Retrieved Context:
- JWT implementation guide (0.94)
  → Explains token format and validation
- Security considerations (0.89)
  → Covers common vulnerabilities
- Token storage options (0.85)
  → Discusses localStorage vs cookies
- Common pitfalls (0.82)
  → Lists frequent mistakes
```

### Cross-Source Knowledge Discovery
Find related information across different sources:

```typescript
Query: "database connection pooling"

Results from multiple sources:
- From markdown: "PostgreSQL Connection Guide" (0.91)
- From episodic: "Decision: Use connection pooling" (0.88)
- From code: "PoolConfig implementation" (0.85)
- From JSON: "database config schema" (0.80)
```

### Code Search by Functionality
Search code by what it does, not how it's named:

```typescript
Query: "handle file upload errors"

Results:
- FileUploadError.ts (0.93)
  → Error handler for uploads
- uploadHandler.ts (0.88)
  → Main upload logic
- errorMiddleware.ts (0.82)
  → Global error handling
```

### Content Recommendation
Suggest related resources:

```typescript
Current Document: "REST API Design"

Recommendations:
- "GraphQL vs REST" (0.89)
- "API Versioning Strategies" (0.84)
- "Authentication for APIs" (0.81)
- "Rate Limiting" (0.78)
```

### Decision Support
Find past decisions and rationale:

```typescript
Query: "why did we choose postgres over mongodb"

Results:
- "Database Selection Decision" (0.92)
  → Rationale: ACID compliance, complex queries
- "Data Modeling Approach" (0.85)
  → Related: Schema design decisions
- "Migration Strategy" (0.79)
  → Context: Migration from NoSQL
```

## Embedding Models

### OpenAI Models
- **text-embedding-ada-002**: 1536 dimensions, good balance of quality/speed
- **text-embedding-3-small**: Faster, cheaper, good for most use cases
- **text-embedding-3-large**: Highest quality, more expensive

### Local Models
- **Sentence Transformers**: Run locally, privacy-focused
  - `all-MiniLM-L6-v2`: Fast, 384 dimensions
  - `all-mpnet-base-v2`: High quality, 768 dimensions
- **Custom Models**: Domain-specific embeddings
- **Multilingual**: Support for multiple languages

### Model Selection Considerations

| Factor | Cloud Models | Local Models |
|--------|--------------|--------------|
| **Quality** | High | Good to High |
| **Cost** | Per-API cost | Compute cost |
| **Privacy** | Data sent to API | Fully local |
| **Speed** | Network latency | Local compute |
| **Offline** | Requires internet | Works offline |
| **Setup** | Simple setup | Requires installation |

## Query Patterns

### Basic Semantic Search
```typescript
{
  collectionId: "docs",
  query: "how to implement oauth2",
  maxDocuments: 5,
  maxChunks: 20
}
```

### Similarity Threshold
```typescript
{
  collectionId: "docs",
  query: "authentication patterns",
  maxDocuments: 10,
  minScore: 0.80  // Only return results > 80% similar
}
```

### Metadata Filtering
```typescript
{
  collectionId: "docs",
  query: "user authentication",
  filter: {
    category: "security",
    author: "Alice",
    created: { $gte: "2024-01-01" }
  },
  maxDocuments: 5
}
```

### Hybrid Search (Semantic + Keyword)
```typescript
{
  collectionId: "docs",
  query: "jwt tokens",
  bm25Enabled: true,
  hybridAlpha: 0.7,  // 70% semantic, 30% keyword
  maxDocuments: 5
}
```

### Cross-Collection Search
```typescript
// Search across multiple collections
const results = await Promise.all([
  vectorDbService.queryDocuments("docs", query),
  vectorDbService.queryDocuments("code", query),
  vectorDbService.queryDocuments("episodic", query)
]).then(all => all.flat());
```

## Configuration Options

### Collection Settings

```typescript
{
  // Embedding configuration
  embeddingModel: "text-embedding-ada-002",
  embeddingProvider: "openai",

  // Text splitting
  chunkSize: 512,          // tokens per chunk
  chunkOverlap: 50,        // overlap tokens

  // Search configuration
  bm25Enabled: true,       // enable keyword search
  hybridAlpha: 0.7,        // semantic weight (0-1)

  // Query defaults
  maxDocuments: 10,
  maxChunks: 50
}
```

### Chunking Guidelines

| Content Type | Chunk Size | Overlap | Rationale |
|--------------|------------|---------|-----------|
| Documentation | 400-600 | 50-75 | Complete thoughts |
| Code | 300-500 | 20-50 | Function-level |
| Reference | 300-400 | 30-50 | Quick lookup |
| Articles | 500-700 | 75-100 | Narrative flow |
| Data | 800-1000 | 100-150 | Context preservation |

## Best Practices

### Collection Design
- **Purpose-Driven**: Create collections for specific domains
- **Model Consistency**: Use same embedding model within collection
- **Size Management**: Keep collections focused (<10K documents)
- **Clear Naming**: Descriptive names for discoverability

### Chunking Strategy
- **Context Balance**: Larger chunks for more context
- **Overlap Use**: Maintain context between chunks
- **Boundary Respect**: Don't split code blocks or sentences
- **Token Accuracy**: Use GPT tokenizer for precision

### Query Optimization
- **Specific Queries**: More specific = better results
- **Appropriate K**: Set realistic topK values
- **Threshold Filtering**: Use minScore for quality
- **Query Caching**: Cache frequent queries

### Performance
- **Batch Operations**: Embed multiple documents at once
- **Local Models**: Use local for privacy/cost savings
- **Index Maintenance**: Reindex after bulk updates
- **Cost Monitoring**: Track API usage for cloud models

### Metadata Design
```typescript
Good metadata:
{
  source: "markdown",
  category: "authentication",
  author: "alice@codebolt.dev",
  project: "user-service",
  tags: ["security", "jwt", "oauth"],
  updated: "2024-01-15",
  language: "typescript"
}

Enables:
- Filtering by source type
- Category-specific searches
- Author-based queries
- Project context
- Tag-based filtering
- Temporal queries
- Technology-specific search
```

## Integration Patterns

### With Knowledge Panel
- Index document chunks for semantic search
- Automatic embedding on document addition
- Chunk-level search granularity
- Metadata from documents preserved

### With Knowledge Graph
- Combine graph traversal with similarity
- Find related entities by meaning
- Enhance graph queries with vector search
- Discover implicit relationships

### With Episodic Memory
- Search events by semantic content
- Find similar past decisions
- Discover relevant experiences
- Contextual event retrieval

### With Agent Memory
- Provide semantic context for tasks
- Retrieve relevant knowledge automatically
- Support multi-source context assembly
- Enable knowledge-grounded responses

### With Markdown Memory
- Index documentation for search
- Find related docs by meaning
- Build recommendation systems
- Semantic documentation navigation

## Advanced Features

### Query Expansion
Improve recall by expanding queries:

```typescript
async function expandQuery(query: string) {
  // Generate related terms
  const synonyms = await getSynonyms(query);
  const related = await getRelatedConcepts(query);

  // Combine and deduplicate
  const expanded = [query, ...synonyms, ...related];

  // Search with all terms
  return await searchMultiple(expanded);
}
```

### Re-Ranking
Improve result quality:

```typescript
// Initial vector search
const initial = await vectorSearch(query, topK: 50);

// Re-rank by diversity
const refined = reRank(initial, {
  diversityFactor: 0.3,
  relevanceWeight: 0.7
});

// Return top N from reranked
return refined.slice(0, 10);
```

### Multi-Vector Search
Search with multiple query vectors:

```typescript
const vectors = [
  await embed(query),
  await embed(context),
  await embed(relatedTerms)
];

// Aggregate by average
const results = await search(vectors, {
  aggregation: "average"
});
```

### Adaptive Hybrid Search
 dynamically adjust weights:

```typescript
function calculateAlpha(query: string) {
  // More keyword-heavy = lower alpha
  const keywordRatio = countKeywords(query) / query.length;

  if (keywordRatio > 0.5) {
    return 0.5;  // Balance
  } else {
    return 0.8;  // Favor semantic
  }
}
```

## Troubleshooting

### Common Issues

**Poor Search Results**
- Adjust chunk size (may be too small/large)
- Increase overlap for more context
- Try different embedding model
- Improve query specificity
- Check chunk boundaries

**High API Costs**
- Switch to local models
- Increase chunk size (fewer embeddings)
- Cache embeddings
- Use smaller models (3-small vs ada-002)

**Slow Indexing**
- Use batch embedding
- Reduce chunk count
- Try faster models
- Check network latency

**Memory Issues**
- Limit collection size
- Use smaller vector dimensions
- Process in batches
- Close unused collections

## Related Concepts

- **[Knowledge Panel](./knowledge-panel.md)**: Document management
- **[Knowledge Graph](./knowledge-graph.md)**: Entity relationships
- **[Knowledge Retrieval](./knowledge-retrieval.md)**: Unified search
- **[Semantic Memory](../memory-systems/semantic-memory.md)**: Graph + vector
- **[Retrieval Patterns](../memory-systems/retrieval-patterns.md)**: Query strategies

## Technical Details

**Service:** `src/main/server/services/vectordbService.ts`
**Data Service:** `src/main/server/services/vectordbDataService.ts`
**Embedding Service:** `src/main/server/services/embeddingService.ts`
**Types:** `src/main/server/types/vectordb.ts`
**Storage:** `.codebolt/vectordb/{collectionId}/`
**Indexing:** HNSW (Hierarchical Navigable Small World)
**Tokenizer:** gpt-tokenizer

**Key Operations:**
- `createCollection()`: Create vector collection
- `upsertDocument()`: Add/update document with embedding
- `queryDocuments()`: Semantic similarity search
- `addChunk()`: Add individual chunk
- `deleteDocument()`: Remove from index
- `getVector()`: Generate embedding for text
- `getVectors()`: Batch embedding generation
