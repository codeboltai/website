---
title: JSON Memory
category: Memory Systems
status: Active
tags: [json, structured-data, programmatic, serialization]
---

# JSON Memory

## Executive Summary
JSON Memory provides structured, schema-flexible storage for programmatic data access. It enables agents to store and retrieve complex nested data structures, making it ideal for configuration, state management, and structured knowledge representation.

## What It Is and Why It Matters

JSON Memory is the workhorse of CodeBolt's memory system - it's where structured data lives. Unlike episodic memory's append-only logs or semantic memory's graph relationships, JSON memory provides free-form structured storage that:
- Preserves complex data hierarchies
- Enables programmatic access and manipulation
- Supports schema evolution without migration
- Integrates with code-level data structures

**Why this matters:**
- **Structured State Management**: Store complex application state
- **Configuration Storage**: Maintain settings and preferences
- **Data Exchange**: Transfer structured data between agents
- **Schema Flexibility**: Evolve data structures without breaking changes
- **Code Integration**: Direct mapping to JSON-serializable objects

## Key Capabilities

### Thread-Based Storage
- **Individual Threads**: Each JSON memory is a separate thread
- **File-Based Persistence**: Stored as `.json` files
- **Atomic Updates**: Write operations use temp files for safety
- **Thread Metadata**: Titles, creation dates, archive status

### Data Structure Support
- **Nested Objects**: Support for arbitrary depth
- **Arrays**: Lists and collections
- **Primitive Types**: Strings, numbers, booleans, null
- **Mixed Types**: Flexible schema per thread
- **Large Data**: Handle sizable JSON documents

### Operations
- **CRUD**: Create, read, update, delete threads
- **Query**: List and filter threads
- **Update**: Partial or full object replacement
- **Archive**: Mark threads as archived
- **Delete**: Remove threads permanently

### Integration
- **Type Safety**: TypeScript interfaces for validation
- **Serialization**: Automatic JSON stringify/parse
- **Validation**: Optional schema validation
- **API Access**: RESTful endpoints for manipulation

## How It Works Conceptually

### Storage Model

Each JSON memory thread stores a single JSON object:

```typescript
JsonMemoryThread {
  id: "thread_abc123"
  type: "json"
  title: "Project Configuration"
  archived: false
  data: {
    // Arbitrary JSON structure
    projectName: "MyApp",
    version: "1.0.0",
    settings: {
      theme: "dark",
      language: "typescript"
    },
    dependencies: ["react", "typescript"],
    metadata: {
      lastUpdated: "2024-01-15",
      author: "agent_1"
    }
  }
}
```

### File Organization

```
.codebolt/memory/json/
├── thread_abc123.json
├── thread_def456.json
└── thread_ghi789.json
```

### Update Flow

```
1. Read existing thread
   ↓
2. Modify data in memory
   ↓
3. Validate (optional)
   ↓
4. Write to temp file
   ↓
5. Atomic rename
   ↓
6. Update complete
```

## Use Cases

### Configuration Management
Store application and agent configurations:

```json
{
  "agentConfig": {
    "name": "CodeReviewAgent",
    "model": "gpt-4",
    "temperature": 0.7,
    "maxTokens": 2000,
    "capabilities": ["review", "suggest", "document"]
  }
}
```

### State Persistence
Maintain application state across sessions:

```json
{
  "workflowState": {
    "currentStep": "code_review",
    "completedSteps": ["analysis", "planning"],
    "pendingTasks": ["fix_issues", "generate_docs"],
    "context": {
      "targetBranch": "main",
      "reviewers": ["alice", "bob"]
    }
  }
}
```

### Data Aggregation
Collect and organize structured data:

```json
{
  "metrics": {
    "codeQuality": 8.5,
    "testCoverage": 0.78,
    "performance": {
      "responseTime": 120,
      "throughput": 1000
    },
    "trends": [
      {"date": "2024-01-01", "score": 8.0},
      {"date": "2024-01-02", "score": 8.5}
    ]
  }
}
```

### Knowledge Representation
Store structured domain knowledge:

```json
{
  "apiDocumentation": {
    "endpoints": [
      {
        "path": "/api/users",
        "method": "GET",
        "auth": true,
        "response": {"type": "array", "items": "User"}
      }
    ],
    "schemas": {
      "User": {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    }
  }
}
```

### Inter-Agent Communication
Transfer structured messages between agents:

```json
{
  "taskAssignment": {
    "taskId": "task_123",
    "assignedTo": "agent_2",
    "priority": "high",
    "deadline": "2024-01-20",
    "requirements": {
      "skills": ["typescript", "react"],
      "estimatedHours": 8
    }
  }
}
```

## Best Practices

### Schema Design
- Use consistent naming conventions
- Document expected structure in comments
- Version your schemas for evolution
- Use TypeScript interfaces for validation

### Data Organization
- Keep related data together
- Use descriptive thread titles
- Archive old data rather than deleting
- Consider thread size for performance

### Update Patterns
- Read before write to avoid data loss
- Use partial updates for large objects
- Validate data before saving
- Handle concurrent updates carefully

### Performance
- Keep thread sizes reasonable (< 1MB recommended)
- Split large data into multiple threads
- Cache frequently accessed data
- Use indexes for querying (if needed)

## Integration Patterns

### With Context Memory
- Store conversation context in JSON
- Maintain message metadata
- Track conversation state

### With Vector Database
- Store structured data alongside embeddings
- Use JSON for metadata in vector search
- Combine structured filters with semantic search

### With Episodic Memory
- Extract structured data from events
- Build aggregated views from event logs
- Maintain computed statistics

## Common Patterns

### Configuration Object
```typescript
interface Config {
  version: string;
  settings: Record<string, any>;
  overrides?: Record<string, any>;
}
```

### State Machine
```typescript
interface State {
  current: string;
  history: string[];
  context: Record<string, any>;
}
```

### Collection Wrapper
```typescript
interface Collection<T> {
  items: T[];
  metadata: {
    total: number;
    page: number;
    filtered: number;
  };
}
```

### Time-Series Data
```typescript
interface TimeSeries {
  metric: string;
  dataPoints: Array<{
    timestamp: string;
    value: number;
  }>;
}
```

## Related Concepts

- **[Markdown Memory](./markdown-memory.md)**: Unstructured documentation
- **[Context Memory](./context-memory.md)**: Conversation state
- **[Episodic Memory](./episodic-memory.md)**: Event logs
- **[Semantic Memory](./semantic-memory.md)**: Graph relationships
- **[Memory Integration](./memory-integration.md)**: Combining memory types

## Technical Details

**Storage:** `.codebolt/memory/json/{threadId}.json`
**Service:** `jsonMemoryService.ts`
**Types:** `src/types/chatTypes.ts` (JsonMemoryThread)
**UI:** `JsonThreadDetail.tsx`

**Key Operations:**
- `readThread()`: Get thread data
- `writeThread()`: Save/update thread
- `listThreadIds()`: List all threads
- `deleteThread()`: Remove thread
