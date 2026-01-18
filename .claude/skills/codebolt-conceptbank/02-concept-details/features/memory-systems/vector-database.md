---
id: "vector-database"
title: Vector Database
category: Memory Systems
status: Active
tags: [vector, embeddings, semantic-search, similarity, retrieval]
---

# Vector Database

## Executive Summary
Vector Database enables semantic search and similarity-based retrieval through embeddings, allowing agents to find relevant content by meaning rather than exact keyword matches. This transforms memory from static storage into an intelligent knowledge discovery system.

## What It Is and Why It Matters

Vector Database is the "semantic brain" of CodeBolt's memory system. Instead of searching by exact keywords, it understands the meaning of content:
- **Semantic Similarity**: Find similar content by meaning
- **Embedding-Based**: Convert text to numerical vectors
- **Flexible Search**: Natural language queries
- **Cross-Modal Retrieval**: Search across different content types
- **Relevance Ranking**: Order results by similarity

**Why this matters:**
- **Intelligent Discovery**: Find relevant content without exact keywords
- **Knowledge Connection**: Discover related information across memory types
- **Natural Queries**: Ask questions in natural language
- **Context Assembly**: Build relevant context for agents
- **Recommendation**: Suggest related content and resources

## Key Capabilities

### Embedding Generation
- **Multiple Providers**: OpenAI, local models, custom providers
- **Flexible Models**: Choose embedding model per collection
- **Batch Processing**: Efficient bulk embedding
- **Caching**: Store embeddings to avoid recomputation
- **Local Support**: Run embeddings locally for privacy

### Vector Storage
- **Collections**: Organize documents by domain/purpose
- **Metadata**: Store additional context with vectors
- **Chunking**: Split large documents for better retrieval
- **Indexing**: Fast similarity search via HNSW
- **Persistence**: File-based storage for durability

### Similarity Search
- **Semantic Queries**: Natural language search
- **Top-K Results**: Retrieve most similar items
- **Threshold Filtering**: Set minimum similarity scores
- **Metadata Filters**: Combine semantic + structured queries
- **Diverse Results**: Retrieve varied relevant content

### Integration
- **Memory Ingestion**: Automatic embedding of new content
- **Hybrid Search**: Combine with keyword and graph search
- **Context Assembly**: Build relevant context for agents
- **Real-Time Updates**: Embed new content on the fly

## How It Works Conceptually

### Embedding Process

```
Text Content
     ↓
Embedding Model (e.g., text-embedding-ada-002)
     ↓
Vector Representation (e.g., 1536 dimensions)
     ↓
Stored in Vector Database
     ↓
Indexed for Fast Search
```

### Similarity Search

```
Query: "How to handle user authentication?"
     ↓
Convert to Embedding
     ↓
Compare with Stored Vectors
     ↓
Calculate Similarity Scores
     ↓
Return Most Similar Documents
```

### Storage Model

```typescript
VectorDbCollection {
  id: "collection_auth_docs"
  name: "Authentication Documentation"
  embeddingModel: "text-embedding-ada-002"
  embeddingProvider: "openai"
  documents: [
    {
      id: "doc_123",
      text: "JWT tokens provide secure authentication...",
      embedding: [0.1, -0.2, 0.5, ...], // 1536 dimensions
      metadata: {
        source: "markdown_memory",
        threadId: "thread_doc456",
        category: "security",
        created: "2024-01-15"
      }
    }
  ]
}
```

### File Organization

```
.codebolt/vectordb/
├── collection_auth_docs/
│   ├── collection.json
│   ├── vectors.bin
│   └── metadata.json
├── collection_api_docs/
│   ├── collection.json
│   ├── vectors.bin
│   └── metadata.json
```

## Use Cases

### Semantic Documentation Search
Find relevant docs without exact keywords:

```typescript
// Query
"how to refresh jwt tokens"

// Results (by semantic similarity)
1. "Token Refresh Strategy" (score: 0.92)
2. "JWT Best Practices" (score: 0.87)
3. "Authentication Flow" (score: 0.81)
```

### Context Assembly
Build relevant context for agents:

```typescript
// Agent task: "Implement user authentication"
// Retrieved relevant context:
- JWT implementation guide (0.94)
- Security considerations (0.89)
- Token storage options (0.85)
- Common authentication pitfalls (0.82)
```

### Knowledge Discovery
Find related information across memory types:

```typescript
// Search in: All collections
Query: "database connection pooling"

// Results from different sources:
- From markdown: "PostgreSQL Connection Guide" (0.91)
- From episodic: "Decision: Use connection pooling" (0.88)
- From code: "PoolConfig implementation" (0.85)
```

### Content Recommendation
Suggest related resources:

```typescript
// Current document: "REST API Design"
// Recommendations:
- "GraphQL vs REST" (0.89)
- "API Versioning Strategies" (0.84)
- "Authentication for APIs" (0.81)
```

### Code Search
Search code by functionality:

```typescript
// Query
"handle file upload errors"

// Results:
- FileUploadError.ts (0.93)
- uploadHandler.ts (0.88)
- errorMiddleware.ts (0.82)
```

## Embedding Models

### OpenAI Models
- **text-embedding-ada-002**: 1536 dimensions, good balance
- **text-embedding-3-small**: Faster, cheaper
- **text-embedding-3-large**: Higher quality

### Local Models
- **Sentence Transformers**: Run locally, privacy-focused
- **Custom Models**: Domain-specific embeddings
- **Multilingual**: Support for multiple languages

### Model Selection Considerations
- **Performance**: Speed vs. quality trade-off
- **Cost**: API costs vs. local compute
- **Privacy**: On-premises vs. cloud
- **Domain**: General vs. specialized models

## Query Patterns

### Basic Semantic Search
```typescript
{
  collection: "docs",
  query: "how to implement oauth",
  topK: 5
}
```

### Similarity Threshold
```typescript
{
  collection: "docs",
  query: "authentication patterns",
  topK: 10,
  minScore: 0.80  // Only return results > 80% similar
}
```

### Metadata Filtering
```typescript
{
  collection: "docs",
  query: "user authentication",
  filters: {
    category: "security",
    created: { $gte: "2024-01-01" }
  },
  topK: 5
}
```

### Hybrid Search
```typescript
{
  collection: "docs",
  query: "jwt tokens",
  semantic: true,  // Vector search
  keyword: "refresh",  // Keyword filter
  topK: 5
}
```

### Cross-Collection Search
```typescript
{
  collections: ["docs", "code", "episodic"],
  query: "database optimization",
  topK: 10
}
```

## Best Practices

### Collection Design
- Group related content together
- Use descriptive collection names
- Consider embedding model compatibility
- Plan for collection growth

### Chunking Strategy
- **Size**: 500-1000 tokens per chunk
- **Overlap**: 50-100 tokens between chunks
- **Boundaries**: Respect sentence/paragraph boundaries
- **Context**: Include surrounding context

### Metadata Design
- Include source information
- Add timestamps for temporal queries
- Use consistent field names
- Index frequently filtered fields

### Query Optimization
- Use specific queries over broad ones
- Set appropriate topK values
- Use minScore to filter low-quality results
- Cache frequent queries

### Performance
- Batch embedding requests
- Use local models for privacy/cost
- Index collections after updates
- Monitor embedding costs

## Integration Patterns

### With Markdown Memory
- Index documentation for semantic search
- Find related docs by meaning
- Build documentation recommendation

### With Episodic Memory
- Search events by semantic content
- Find similar past decisions
- Discover relevant experiences

### With JSON Memory
- Embed JSON content for search
- Search by data meaning
- Find similar configurations

### With Semantic Memory
- Combine graph and vector search
- Enhance graph queries with similarity
- Find related entities

## Advanced Features

### Hybrid Search
Combine semantic and keyword search:
```typescript
results = semanticSearch(query) ∩ keywordSearch(query)
rank(results, semantic_weight=0.7, keyword_weight=0.3)
```

### Re-Ranking
Improve result quality:
```typescript
initial = vectorSearch(query)
refined = reRank(initial, query, diversity_factor=0.3)
```

### Query Expansion
Improve recall:
```typescript
expanded = [query]
expanded.extend(generate_synonyms(query))
expanded.extend(generate_related_queries(query))
results = search(expanded)
```

### Multi-Vector Search
Search across multiple query vectors:
```typescript
vectors = [
  embed(query),
  embed(context),
  embed(related_terms)
]
results = search(vectors, aggregation="avg")
```

## Related Concepts

- **[Semantic Memory](./semantic-memory.md)**: Knowledge graph relationships
- **[Episodic Memory](./episodic-memory.md)**: Event-based search
- **[Memory Integration](./memory-integration.md)**: Combining retrieval methods
- **[Retrieval Patterns](./retrieval-patterns.md)**: Query strategies
- **[Infinite Context](./infinite-context.md)**: Context assembly

## Technical Details

**Storage:** `.codebolt/vectordb/{collectionId}/`
**Service:** `vectordbDataService.ts`
**Types:** `src/types/vectordb.ts`
**Indexing:** HNSW (Hierarchical Navigable Small World)
**Embedding:** Multiple providers (OpenAI, local, custom)

**Key Operations:**
- `createCollection()`: Create new vector collection
- `upsertDocument()`: Add/update document with embedding
- `similaritySearch()`: Find similar documents
- `deleteDocument()`: Remove document from index
- `query()`: Execute semantic search
