---
title: Embeddings Generation
category: Technical
subcategory: AI Integration
tags: [embeddings, vectors, semantic-search, similarity]
---

## Executive Summary

CodeBolt provides unified embedding generation supporting both cloud providers (OpenAI, etc.) and local ONNX models, enabling semantic search, similarity matching, and intelligent document retrieval throughout the application.

## What Are Embeddings?

Embeddings are numerical representations (vectors) of text that capture semantic meaning. Similar concepts have similar embeddings, making them perfect for:
- Semantic search (find by meaning, not keywords)
- Document similarity (find related documents)
- Clustering (group similar items)
- Recommendation (suggest relevant content)
- Classification (categorize content)

## Why It Matters

- **Intelligent Search**: Find what you mean, not just what you type
- **Context Awareness**: Understand relationships between documents
- **Memory Systems**: Enable AI to remember and retrieve relevant context
- **Code Understanding**: Find semantically similar code snippets
- **Multi-Modal**: Works with code, text, and other content

## Key Concepts

### Embedding Vectors
- **Numerical Representation**: Text converted to array of numbers
- **Fixed Dimension**: Same length for all texts (e.g., 384, 1536)
- **Semantic Proximity**: Similar concepts have similar vectors
- **Distance Metrics**: Cosine similarity, Euclidean distance

### Cloud vs Local Embeddings

**Cloud Embeddings** (OpenAI, etc.):
- Higher dimensions (1536+)
- Better quality/accuracy
- Requires internet connection
- Per-token API costs

**Local Embeddings** (ONNX):
- Lower dimensions (384)
- Good quality for many tasks
- Works offline
- No ongoing costs

### Embedding Service Architecture

```
┌─────────────────────────────────────┐
│   Application Request               │
│   "Get embedding for text"          │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   Embedding Service                 │
│   - Checks configuration            │
│   - Routes to local or cloud        │
│   - Caches results                  │
└─────┬───────────────┬───────────────┘
      │               │
┌─────▼─────┐   ┌───▼──────────┐
│  Local    │   │   Cloud      │
│  ONNX     │   │   Provider   │
│  Model    │   │   (OpenAI)   │
└───────────┘   └──────────────┘
```

## How It Works

### 1. Configuration Selection

The embedding service determines which provider to use:
```typescript
// Check user settings
const config = {
  provider: "local",  // or "openai", "anthropic", etc.
  model: "all-MiniLM-L6-v2",  // or "text-embedding-ada-002"
  isLocal: true
}
```

### 2. Text Preprocessing

Before generating embeddings:
- **Tokenization**: Convert text to tokens
- **Truncation**: Handle long texts (max sequence length)
- **Normalization**: Clean and standardize text
- **Batching**: Process multiple texts efficiently

### 3. Embedding Generation

**Local Models** (ONNX):
1. Load model if not in memory
2. Tokenize input text
3. Create input tensors
4. Run model inference
5. Extract embeddings from output
6. Apply mean pooling and normalization

**Cloud Models** (API):
1. Prepare API request
2. Send to provider (OpenAI, etc.)
3. Receive embedding vector
4. Parse and validate response

### 4. Post-Processing

After generation:
- **Normalization**: L2 normalize for consistent similarity
- **Storage**: Save to vector database
- **Caching**: Store for future use
- **Indexing**: Add to search index

## Configuration

### Provider Selection

Choose embedding provider in Settings:
```typescript
// Using local model
{
  embeddingProvider: "local",
  embeddingModel: "all-MiniLM-L6-v2"
}

// Using cloud provider
{
  embeddingProvider: "openai",
  embeddingModel: "text-embedding-ada-002"
}
```

### Model Characteristics

**all-MiniLM-L6-v2** (Local):
- Dimensions: 384
- Max Sequence: 256 tokens
- Size: ~90MB
- Speed: Fast (50-200ms per text)

**text-embedding-ada-002** (OpenAI):
- Dimensions: 1536
- Max Sequence: 8191 tokens
- Quality: High
- Cost: ~$0.0001 per 1K tokens

## Usage Patterns

### Single Text Embedding
```typescript
const embedding = await embeddingService.getEmbedding("Hello world");
// Returns: [0.123, -0.456, 0.789, ...] (384 or 1536 dimensions)
```

### Batch Embedding
```typescript
const embeddings = await embeddingService.getEmbeddings([
  "Text 1",
  "Text 2",
  "Text 3"
]);
// Returns: [[...], [...], [...]]
```

### Similarity Calculation
```typescript
// Cosine similarity
function similarity(embedding1, embedding2) {
  return dotProduct(embedding1, embedding2) /
    (magnitude(embedding1) * magnitude(embedding2));
}
```

## Applications in CodeBolt

### Semantic Code Search
- Find code by functionality, not just keywords
- Search for "sort array" and find sorting implementations
- Discover similar code patterns across projects

### Document Retrieval
- Retrieve relevant documentation based on query
- Find related issues and discussions
- Match similar bug reports

### Memory Systems
- Store conversation context as embeddings
- Retrieve relevant past interactions
- Maintain semantic memory of user preferences

### Agent Context
- Provide agents with relevant context
- Find similar previous tasks
- Retrieve related code snippets

### Code Navigation
- Navigate to semantically related code
- Find implementations of similar concepts
- Discover related files and functions

## Storage and Retrieval

### Vector Database
Embeddings are stored in a vector database:
- **ChromaDB**: Local vector database (default)
- **Custom Storage**: Extensible to other databases
- **Persistence**: Saved across sessions
- **Indexing**: Fast similarity search

### Search Operations
```typescript
// Find similar items
const results = await vectorDatabase.search(
  queryEmbedding,
  { topK: 10, threshold: 0.7 }
);
```

## Performance Optimization

### Caching Strategy
- **Memory Cache**: Recent embeddings in memory
- **Disk Cache**: Persistent cache on disk
- **Cache Key**: Hash of input text
- **TTL**: Configurable cache expiration

### Batch Processing
- **Multiple Texts**: Process multiple texts in one call
- **Efficiency**: Reduces overhead
- **Parallelization**: Process batches concurrently

### Model Selection
- **Quality vs Speed**: Choose model based on task
- **Local vs Cloud**: Balance cost and quality
- **Context Size**: Consider sequence length limits

## Trade-offs

### Local Embeddings
**Pros**:
- Free (no API costs)
- Private (data stays local)
- Fast (no network latency)
- Offline capable

**Cons**:
- Lower dimensions (less precise)
- Limited to available models
- CPU-bound (slower for large batches)
- Smaller context windows

### Cloud Embeddings
**Pros**:
- Higher quality (larger dimensions)
- More model options
- Faster for large batches (cloud infrastructure)
- Longer context windows

**Cons**:
- Per-token costs
- Requires internet
- Data leaves your machine
- Latency from network calls

## Best Practices

### When to Use Local
- High volume of embeddings
- Cost-sensitive applications
- Privacy requirements
- Offline scenarios
- Simple semantic tasks

### When to Use Cloud
- Need highest accuracy
- Complex semantic understanding
- Large context windows
- Have reliable internet
- Cost is not a concern

### Optimization Tips
1. **Cache Embeddings**: Store for frequently used texts
2. **Batch Requests**: Process multiple texts together
3. **Choose Right Model**: Match model to task complexity
4. **Monitor Costs**: Track cloud API usage
5. **Consider Hybrid**: Use local for simple, cloud for complex

## Future Enhancements

### Capabilities
- **Code Embeddings**: Models trained specifically on code
- **Multilingual**: Support for multiple languages
- **Domain-Specific**: Models for specific domains (medical, legal)
- **Larger Context**: Handle longer texts

### Features
- **Streaming Embeddings**: Real-time embedding generation
- **Incremental Updates**: Update embeddings as code changes
- **Federated Learning**: Improve models from usage
- **Model Quantization**: Smaller, faster local models

### Integration
- **More Providers**: Additional cloud embedding services
- **Custom Models**: Support for fine-tuned models
- **Hybrid Search**: Combine semantic and keyword search
- **Multi-Modal**: Image and code embeddings

## Related Concepts

- [LLM Integration](./llm-integration.md) - Overall AI integration
- [Local Models](./local-models.md) - ONNX-based local embeddings
- [Memory Systems](../../features/memory-systems/) - Embedding usage for AI memory
- [Vector Database](../data/vector-database.md) - Embedding storage and search
