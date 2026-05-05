---
id: "memory-ingestion-pipelines"
title: "Memory Ingestion Pipelines"
category: "features"
subcategory: "memory-systems"
tags: ["memory", "ingestion", "pipelines", "automation", "extraction"]
audience: ["technical", "architect"]
difficulty: "intermediate"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["memory-processors", "memory-destinations", "memory-triggers", "application-event-system"]
content_type: "concept"
status: "published"
phase: 2
---

# Memory Ingestion Pipelines

## Executive Summary

Memory Ingestion Pipelines are declarative, event-driven data processing workflows that automatically extract, transform, and route information from application events into CodeBolt's memory systems. They enable continuous memory population without manual intervention, turning raw events like conversations, task completions, and code changes into structured, queryable knowledge.

## Overview

Memory Ingestion Pipelines provide a write-path for CodeBolt's memory systems. They define how data flows from application events through processing stages into canonical storage layers. Each pipeline is a reusable, composable unit that can be activated, deactivated, and modified without code changes.

### Core Value Proposition

- **Automatic Memory Creation**: Events automatically generate structured memory records
- **Declarative Configuration**: Define what to extract and where to store it in YAML
- **Event-Driven**: Respond to system events in real-time
- **Composable Processing**: Chain processors together for complex transformations
- **Flexible Routing**: Send processed data to multiple storage backends simultaneously

## Pipeline Anatomy

### Core Components

A Memory Ingestion Pipeline consists of:

1. **Trigger**: What event starts the pipeline
2. **Processors**: Sequential transformations applied to event data
3. **Routing**: Where processed data gets stored

### Pipeline Definition Structure

```yaml
id: conversation-memory-extractor
label: "Conversation Memory Extractor"
description: "Extracts facts, decisions, and activities from conversations"
version: "1.0.0"
status: "active"

# What triggers this pipeline
trigger: onConversationEnd
trigger_config:
  filter:
    conditions:
      - field: "source.threadId"
        op: "exists"
        value: true

# Processing stages
processors:
  - id: raw_storage
    type: blob_store
    params:
      bucket: conversations

  - id: chunker
    type: chunker
    input: event.payload.messages
    params:
      chunk_size: 500
      overlap: 50

  - id: embedder
    type: vector_embed
    input: chunker
    params:
      model: text-embedding-ada-002

  - id: extractor
    type: llm_extract
    input: event.payload.messages
    params:
      prompt_template: conversation_extraction
      output_schema: conversation_memory

# Where to send processed data
routing:
  - from: embedder
    write_to:
      type: vector
      collection: conversation_embeddings

  - from: extractor.facts
    write_to:
      type: graph
      instance: project-knowledge
      record_kind: fact

  - from: extractor.decisions
    write_to:
      type: graph
      instance: project-knowledge
      record_kind: decision
```

## Triggers

### Trigger Types

Pipelines can be triggered by:

- **Conversation Events**: `onConversationEnd`, `onConversationStart`
- **Task Events**: `onTaskStart`, `onTaskCompleted`, `onTaskFailure`
- **Agent Events**: `onAction`, `onError`
- **Manual**: `manual` - triggered on-demand via API

### Trigger Configuration

Triggers support advanced filtering:

```yaml
trigger_config:
  filter:
    and:
      - field: "source.swarmId"
        op: "exists"
        value: true
      - field: "payload.agentCount"
        op: ">="
        value: 3
    debounce_ms: 5000
```

This enables fine-grained control over when pipelines execute, preventing redundant processing and reducing noise.

## Processors

### Processor Categories

1. **Storage Processors**: Store raw data
   - `blob_store`: Persist raw event payloads

2. **Transform Processors**: Modify data structure
   - `chunker`: Split text into segments
   - `parser`: Parse structured formats (JSON, XML)
   - `normalizer`: Clean and normalize data

3. **Extraction Processors**: Derive semantic meaning
   - `llm_extract`: Extract entities using LLMs
   - `llm_extract_kb`: Knowledge base extraction with custom prompts

4. **Custom Processors**: User-defined logic
   - `custom`: Execute arbitrary code via ActionBlocks

### Processor Chaining

Processors form a directed acyclic graph (DAG):

```yaml
processors:
  # Stage 1: Store raw data
  - id: raw
    type: blob_store
    output: raw_ref

  # Stage 2: Transform (runs in parallel with stage 1)
  - id: chunk
    type: chunker
    input: event.payload.text
    output: chunks

  # Stage 3: Extract (depends on stage 2)
  - id: embed
    type: vector_embed
    input: chunks
    output: embedded
```

Outputs from one processor become inputs to another, enabling complex multi-stage processing pipelines.

## Routing

### Destination Types

Processed data can be routed to:

1. **Graph Storage** (`graph`): Knowledge graphs with nodes and edges
2. **Vector Storage** (`vector`): Semantic search collections
3. **KV Storage** (`kv`): Key-value stores for fast lookups
4. **Blob Storage** (`blob`): Raw data archival
5. **Event Log** (`log`): Time-series event streams

### Routing Rules

```yaml
routing:
  # Simple routing
  - from: extractor.facts
    write_to:
      type: graph
      instance: project-knowledge
      record_kind: fact

  # Array iteration
  - from: chunker
    foreach: true
    write_to:
      type: vector
      collection: conversation_chunks

  # Conditional routing
  - from: extractor.incidents
    condition: "severity === 'high'"
    write_to:
      type: graph
      instance: incidents
      record_kind: critical_incident
```

### Multi-Destination Routing

Single processor outputs can route to multiple destinations:

```yaml
routing:
  - from: extractor
    write_to:
      type: graph
      instance: primary

  - from: extractor
    write_to:
      type: vector
      collection: semantic_search

  - from: extractor
    write_to:
      type: blob
      bucket: backup
```

This enables use cases like simultaneously storing entities in a knowledge graph while creating searchable embeddings.

## Pipeline Lifecycle

### States

Pipelines have three states:

- **`draft`**: Under development, not executed
- **`active`**: Subscribed to events and executing
- **`disabled`**: Configured but not executing

### Management Operations

Pipelines support full CRUD operations:

- **Create**: Define new pipeline with validation
- **Read**: Retrieve pipeline definitions
- **Update**: Modify processors, routing, or configuration
- **Delete**: Remove pipeline and unsubscribe from events
- **Activate/Disable**: Control execution without deletion
- **Duplicate**: Clone existing pipelines for variation

### Validation

Pipelines are validated before activation:

- **Structural Validation**: Required fields present
- **Reference Validation**: Processor inputs reference valid outputs
- **Destination Validation**: Storage instances exist
- **Type Validation**: Parameters match processor schemas

## Execution Model

### Event Flow

```
1. Application Event Occurs
   ↓
2. Memory Ingestion Event Bridge
   - Maps trigger to application event type
   - Resolves full domain data
   ↓
3. Pipeline Matcher
   - Finds all active pipelines matching trigger
   - Evaluates trigger filters
   ↓
4. Pipeline Execution
   - Executes processors sequentially
   - Accumulates outputs
   ↓
5. Routing Engine
   - Evaluates routing rules
   - Writes data to destinations
   ↓
6. Result Emitted
   - Success/failure events
   - Performance metrics
```

### Error Handling

Processor failures are tracked but don't stop pipeline execution by default. Each processor result includes success status, error messages, and execution time.

## Data Resolution

### Event Enrichment

Before pipeline execution, events are enriched with full domain data:

```typescript
// Original event payload
{
  "threadId": "abc-123",
  "messageCount": 15
}

// After resolution
{
  "threadId": "abc-123",
  "messageCount": 15,
  "messages": [...],  // Full conversation
  "thread": {...},    // Thread metadata
  "participants": [...] // Agent information
}
```

This ensures pipelines have access to complete context without manual data fetching.

### Schema Availability

Each event type has a known schema:

- **`conversation.full`**: Complete conversation with messages
- **`job.full`**: Job with pheromones and dependencies
- **`task.full`**: Task with status and history
- **`agent.event`**: Agent state and context

Pipelines can reference any field in the schema.

## Use Cases

### 1. Conversation Memory Extraction

Extract structured memories from AI conversations:

```yaml
trigger: onConversationEnd
processors:
  - id: extract
    type: llm_extract
    params:
      prompt_template: conversation_extraction
      output_schema: conversation_memory
routing:
  - from: extract.facts
    write_to:
      type: graph
      record_kind: fact
  - from: extract.decisions
    write_to:
      type: graph
      record_kind: decision
```

**Result**: Conversations automatically populate project knowledge graphs.

### 2. Semantic Search Indexing

Build searchable embeddings from documentation:

```yaml
trigger: onFileUpdated
trigger_config:
  filter:
    conditions:
      - field: "payload.extension"
        op: "in"
        value: [".md", ".txt"]
processors:
  - id: chunk
    type: chunker
    input: event.payload.content
  - id: embed
    type: vector_embed
    input: chunk
routing:
  - from: embed
    write_to:
      type: vector
      collection: docs_search
```

**Result**: Documentation becomes semantically searchable.

### 3. Task State Tracking

Track task evolution in knowledge graphs:

```yaml
trigger: onTaskCompleted
processors:
  - id: extract
    type: llm_extract_kb
    params:
      prompt: "Extract solution approach and challenges"
      output_format:
        solution: string
        challenges: array
routing:
  - from: extract
    write_to:
      type: graph
      instance: task_history
      record_kind: completed_task
```

**Result**: Task completion patterns become queryable knowledge.

### 4. Incident Detection

Automatically detect and log incidents:

```yaml
trigger: onError
processors:
  - id: analyze
    type: llm_extract
    params:
      prompt_template: incident_analysis
routing:
  - from: analyze
    write_to:
      type: graph
      instance: incidents
      record_kind: incident
  - from: analyze
    write_to:
      type: log
      event_type: incident_detected
```

**Result**: Errors are automatically analyzed and categorized.

## Best Practices

### Pipeline Design

1. **Single Responsibility**: Each pipeline should have one clear purpose
2. **Idempotency**: Pipelines should produce same results on re-execution
3. **Graceful Degradation**: Use optional processors for non-critical extraction
4. **Explicit Routing**: Clearly document where data goes

### Performance

1. **Filter Early**: Use trigger filters to avoid unnecessary executions
2. **Batch Processing**: Use `foreach: true` for array operations
3. **Debounce**: Add debounce for high-frequency events
4. **Selective Extraction**: Only extract what you'll use

### Monitoring

1. **Track Execution Metrics**: Monitor pipeline performance
2. **Log Failures**: Capture processor and routing errors
3. **Validate Outputs**: Spot-check extracted data quality
4. **Version Control**: Track pipeline changes over time

### Naming Conventions

```
<trigger>-<purpose>-<target>
Examples:
- conversation-end-fact-extraction
- task-completed-lesson-learning
- file-updated-doc-indexing
```

## Advanced Features

### Conditional Routing

Route data based on conditions:

```yaml
routing:
  - from: extractor
    condition: "confidence > 0.8"
    write_to:
      type: graph
      record_kind: high_confidence_fact
```

### Dynamic Destination Selection

Use template variables in destinations:

```yaml
routing:
  - from: extractor
    write_to:
      type: graph
      instance: "project-{source.projectId}"
      record_kind: memory
```

### Template Reuse

Reference existing templates:

```yaml
processors:
  - id: extract
    type: llm_extract_kb
    params:
      kg_template_id: project_memory_template
      prompt: |
        Extract key entities from:
        {input_text}
```

## Troubleshooting

### Pipeline Not Executing

1. Check pipeline status is `active`
2. Verify trigger matches event type
3. Review trigger filter conditions
4. Check event bridge subscription status

### Processor Failures

1. Validate input references exist
2. Check processor parameter types
3. Review processor execution logs
4. Test processor in isolation

### Routing Failures

1. Verify destination instances exist
2. Check data structure matches destination schema
3. Validate routing rule syntax
4. Test destination connectivity

## Related Concepts

- **[Memory Processors](/conceptbank/features/memory-systems/memory-processors.md)**: Detailed processor reference
- **[Memory Destinations](/conceptbank/features/memory-systems/memory-destinations.md)**: Storage backend options
- **[Memory Triggers](/conceptbank/features/memory-systems/memory-triggers.md)**: Event trigger system
- **[Application Event System](/conceptbank/features/memory-systems/application-event-system.md)**: Event bus architecture
- **[Event Data Resolver](/conceptbank/features/memory-systems/event-data-resolver.md)**: Data enrichment layer
