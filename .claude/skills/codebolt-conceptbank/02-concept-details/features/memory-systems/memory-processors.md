---
id: "memory-processors"
title: "Memory Processors"
category: "features"
subcategory: "memory-systems"
tags: ["memory", "processors", "transformation", "extraction", "chunking", "embedding"]
audience: ["technical", "developer"]
difficulty: "intermediate"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["memory-ingestion-pipelines", "memory-destinations", "vector-database", "llm-integration"]
content_type: "concept"
status: "published"
phase: 2
---

# Memory Processors

## Executive Summary

Memory Processors are modular data transformation units within Memory Ingestion Pipelines that perform specific operations on event data—ranging from text chunking and embedding generation to LLM-based semantic extraction. Each processor encapsulates a well-defined transformation, enabling complex data processing workflows through simple composition.

## Overview

Processors are the building blocks of Memory Ingestion Pipelines. They take inputs from event payloads or previous processors, apply transformations, and produce outputs that can be consumed by subsequent processors or routed to storage destinations.

### Core Design Principles

- **Single Responsibility**: Each processor does one thing well
- **Composability**: Outputs become inputs to other processors
- **Reusability**: Same processor can be used in multiple pipelines
- **Extensibility**: Custom processors can be added via ActionBlocks

## Processor Categories

### 1. Storage Processors

#### Blob Store Processor

**Purpose**: Persist raw event data for archival and replay

**Use Cases**:
- Storing complete conversation transcripts
- Archiving file contents before processing
- Maintaining raw event logs for debugging

**Configuration**:
```yaml
type: blob_store
params:
  bucket: conversations  # Storage bucket name
  metadata:
    retention_days: 90
```

**Output**:
```json
{
  "bucket": "conversations",
  "key": "conversation:ended/2024-01-15/abc-123",
  "timestamp": "2024-01-15T10:30:00Z",
  "size": 45000
}
```

### 2. Transform Processors

#### Chunker Processor

**Purpose**: Split text into manageable segments for embedding and analysis

**Use Cases**:
- Preparing conversations for vector embedding
- Breaking long documents into searchable chunks
- Creating overlapping segments for context preservation

**Configuration**:
```yaml
type: chunker
input: event.payload.messages
params:
  chunk_size: 500      # Characters per chunk
  overlap: 50          # Overlap between chunks
  separator: "\n\n"    # Split separator
```

**Smart Input Handling**:

The chunker intelligently handles different input types:

- **String**: Direct chunking
- **Array of Objects**: Joins text content from objects
  ```yaml
  # Input: event.payload.messages (array of message objects)
  # Extracts: message.text or message.content
  # Joins with: "\n\n"
  ```

- **Single Object**: Extracts text field
  ```yaml
  # Input: event.payload (object)
  # Extracts: payload.text or payload.content
  ```

**Output**:
```json
[
  {
    "text": "First segment of conversation...",
    "index": 0,
    "metadata": {
      "source": "event.payload.messages",
      "eventType": "conversation:ended",
      "threadId": "abc-123",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  },
  {
    "text": "Second segment with 50 char overlap...",
    "index": 1,
    "metadata": {...}
  }
]
```

**Metadata Enrichment**:

Chunks automatically include:
- Source path
- Event type
- Timestamp
- Thread/Agent/Swarm IDs (if available)
- Project ID

#### Parser Processor

**Purpose**: Parse structured data formats

**Use Cases**:
- Extracting JSON from API responses
- Parsing XML configurations
- Reading YAML metadata files

**Configuration**:
```yaml
type: parser
input: event.payload.data
params:
  format: json  # json, xml, yaml
  path: "$.items[*]"  # JSONPath expression
```

#### Normalizer Processor

**Purpose**: Clean and normalize extracted data

**Use Cases**:
- Standardizing text case
- Trimming whitespace
- Removing null values

**Configuration**:
```yaml
type: normalizer
input: extractor.entities
params:
  lowercase: true
  trim: true
  remove_nulls: true
```

### 3. Transform with AI Processors

#### Vector Embed Processor

**Purpose**: Generate vector embeddings for semantic search

**Use Cases**:
- Creating semantic search indexes
- Similarity-based recommendation
- Clustering and categorization

**Configuration**:
```yaml
type: vector_embed
input: chunker  # Array of text chunks
params:
  model: text-embedding-ada-002
  batch_size: 10
```

**Embedding Model Support**:

- **Cloud Models**: OpenAI, Anthropic, Cohere
- **Local Models**: Via CodeBolt's local embedding service
- **Auto-routing**: Based on project settings

**Output**:
```json
[
  {
    "text": "Original chunk text...",
    "index": 0,
    "embedding": [0.123, -0.456, ...],  // 384-dim vector
    "model": "text-embedding-ada-002",
    "metadata": {...}
  }
]
```

**Performance Considerations**:

- Batch processing reduces API calls
- Local models provide privacy and offline operation
- Embeddings are cached to avoid re-computation

### 4. Extraction Processors

#### LLM Extract Processor

**Purpose**: Extract semantic entities using LLM prompts

**Use Cases**:
- Extracting facts from conversations
- Identifying decisions and rationale
- Detecting incidents and issues

**Configuration**:
```yaml
type: llm_extract
input: event.payload.messages
params:
  model: gpt-4
  prompt_template: conversation_extraction
  output_schema: conversation_memory
  temperature: 0.3
  max_tokens: 2000
```

**Prompt Templates**:

Reusable prompt definitions:
```yaml
# conversation_extraction template
Extract from this conversation:
- Facts: Objective truths with confidence scores
- Decisions: Choices made with rationale
- Activities: Actions taken by agents
- Incidents: Problems or errors encountered

Conversation:
{messages}
```

**Standard Output Schema**:
```json
{
  "agent_states": [
    {
      "agent_id": "agent-1",
      "status": "working",
      "current_task": "Implement API",
      "metadata": {}
    }
  ],
  "activities": [
    {
      "agent_id": "agent-1",
      "action": "created_file",
      "timestamp": "2024-01-15T10:30:00Z",
      "metadata": {"file": "api.ts"}
    }
  ],
  "facts": [
    {
      "statement": "API uses REST architecture",
      "confidence": 0.95,
      "source": "conversation",
      "tags": ["architecture", "api"]
    }
  ],
  "decisions": [
    {
      "decision": "Use PostgreSQL for database",
      "scope": "project",
      "rationale": "ACID compliance required"
    }
  ],
  "incidents": [
    {
      "description": "Memory leak in worker process",
      "severity": "high",
      "resolution": "Implemented connection pooling"
    }
  ],
  "chunks": [...]  // Alternative to chunker processor
}
```

#### LLM Extract KB Processor

**Purpose**: Extract entities for knowledge graphs with custom schemas

**Use Cases**:
- Populating knowledge graphs from conversations
- Extracting domain-specific entities
- Creating structured representations

**Configuration**:
```yaml
type: llm_extract_kb
input: event.payload.messages
params:
  model: gpt-4
  prompt: |
    Extract entities related to software architecture:
    - Components (services, databases, queues)
    - Dependencies between components
    - Configuration details
  kg_template_id: architecture_template
  output_format:
    nodes:
      - kind: component
        name: string
        type: string
      - kind: database
        name: string
        engine: string
    edges:
      - kind: depends_on
        from_node_name: string
        to_node_name: string
```

**Template-Based Extraction**:

When `kg_template_id` is provided:
1. Fetches template schema (node/edge types)
2. Builds output format from template
3. Instructs LLM to use template structure
4. Validates output matches schema

**Output**:
```json
{
  "nodes": [
    {
      "kind": "component",
      "name": "API Gateway",
      "type": "service"
    },
    {
      "kind": "database",
      "name": "Users DB",
      "engine": "PostgreSQL"
    }
  ],
  "edges": [
    {
      "kind": "depends_on",
      "from_node_name": "API Gateway",
      "to_node_name": "Users DB"
    }
  ]
}
```

### 5. Custom Processors

#### Custom Processor

**Purpose**: Execute arbitrary code via ActionBlocks

**Use Cases**:
- Domain-specific transformations
- Integration with external services
- Complex business logic

**Configuration**:
```yaml
type: custom
input: event.payload
handler: myCustomProcessor
actionBlockPath: .codebolt/actionblocks/custom-processor.js
inlineCode: |
  // JavaScript code
  const result = transform(input);
  return result;
```

**Execution Context**:

Custom processors run in:
- SideExecution environment
- Access to CodeBolt APIs
- Can call external services
- Timeboxed for safety

## Processor Reference

### Complete Processor Specs

| Type | Category | Input Required | Description |
|------|----------|----------------|-------------|
| `blob_store` | Storage | No | Store raw data in blob storage |
| `chunker` | Transform | Yes | Split text into chunks |
| `vector_embed` | Transform | Yes | Generate vector embeddings |
| `llm_extract` | Extraction | No | Extract entities via LLM |
| `llm_extract_kb` | Extraction | No | Extract for knowledge base |
| `parser` | Transform | Yes | Parse structured data |
| `normalizer` | Transform | Yes | Normalize/clean data |
| `custom` | Custom | No | Execute custom code |

### Input/Output Patterns

#### No Input (Event-Only)

```yaml
processors:
  - id: extract
    type: llm_extract
    # Uses event.payload implicitly
    output: extracted
```

#### Single Input

```yaml
processors:
  - id: chunk
    type: chunker
    input: event.payload.text
    output: chunks
```

#### Processor Reference

```yaml
processors:
  - id: chunk
    type: chunker
    output: chunks

  - id: embed
    type: vector_embed
    input: chunks  # References previous processor output
    output: embedded
```

#### Nested Reference

```yaml
processors:
  - id: extract
    type: llm_extract
    output: extracted

  - id: facts
    type: normalizer
    input: extracted.facts  # References nested field
    output: facts
```

#### Array Input

```yaml
processors:
  - id: embed
    type: vector_embed
    input:
      - event.payload.text1
      - event.payload.text2
    output: embedded
```

## Processor Execution

### Sequential Execution

```yaml
processors:
  - id: step1
    type: chunker
    output: chunks

  - id: step2
    type: vector_embed
    input: chunks
    output: embedded

  - id: step3
    type: llm_extract
    input: event.payload
    output: extracted
```

Execution order: `step1 → step2 → step3`

### Parallel Execution

```yaml
processors:
  - id: path1
    type: chunker
    input: event.payload.text
    output: chunks

  - id: path2
    type: llm_extract
    input: event.payload
    output: extracted
```

Execution: `path1` and `path2` run in parallel

### Output Accumulation

All processor outputs are accumulated:

```yaml
context.outputs = {
  "chunks": [...],
  "embedded": [...],
  "extracted": {...}
}
```

Routing rules reference these outputs.

## Error Handling

### Processor-Level Errors

Each processor result includes:

```json
{
  "processorId": "extract",
  "success": false,
  "error": "LLM API timeout",
  "durationMs": 5000
}
```

Pipeline continues despite individual processor failures.

### Graceful Degradation

```yaml
processors:
  - id: optional
    type: llm_extract
    # Failure doesn't stop pipeline

  - id: critical
    type: blob_store
    # Must succeed
```

## Best Practices

### Performance

1. **Batch When Possible**: Use batch processing for embeddings
2. **Filter Early**: Reduce data volume before expensive operations
3. **Cache Results**: Avoid redundant LLM calls
4. **Use Local Models**: For privacy and latency

### Quality

1. **Validate Outputs**: Check processor results
2. **Handle Edge Cases**: Empty inputs, malformed data
3. **Set Timeouts**: Prevent runaway processors
4. **Monitor Costs**: Track LLM token usage

### Composition

1. **Single Purpose**: Each processor does one thing
2. **Clear Outputs**: Document output structure
3. **Test Isolation**: Verify processors independently
4. **Version Templates**: Track prompt changes

## Use Case Examples

### Complete Conversation Processing Pipeline

```yaml
processors:
  # 1. Store raw conversation
  - id: raw
    type: blob_store
    params:
      bucket: conversations

  # 2. Extract semantic entities
  - id: extract
    type: llm_extract
    params:
      prompt_template: conversation_extraction

  # 3. Chunk for embedding
  - id: chunk
    type: chunker
    params:
      chunk_size: 500
      overlap: 50

  # 4. Generate embeddings
  - id: embed
    type: vector_embed
    input: chunk

  # 5. Normalize entities
  - id: normalize
    type: normalizer
    input: extract.facts
```

### Document Analysis Pipeline

```yaml
processors:
  # 1. Parse document structure
  - id: parse
    type: parser
    input: event.payload.content
    params:
      format: json
      path: "$.sections[*]"

  # 2. Extract key concepts
  - id: concepts
    type: llm_extract_kb
    input: parse
    params:
      kg_template_id: document_concepts
      prompt: "Extract main concepts and relationships"

  # 3. Create searchable chunks
  - id: chunk
    type: chunker
    input: event.payload.content

  # 4: Generate embeddings
  - id: embed
    type: vector_embed
    input: chunk
```

## Related Concepts

- **[Memory Ingestion Pipelines](/conceptbank/features/memory-systems/memory-ingestion-pipelines.md)**: How processors fit into pipelines
- **[Memory Destinations](/conceptbank/features/memory-systems/memory-destinations.md)**: Where processor outputs go
- **[Vector Databases](/conceptbank/features/knowledge-management/vector-databases.md)**: Embedding storage and search
- **[LLM Integration](/conceptbank/core/terminology/llm-providers.md)**: LLM service configuration
