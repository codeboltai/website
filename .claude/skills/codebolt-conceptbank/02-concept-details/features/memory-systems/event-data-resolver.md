---
id: "event-data-resolver"
title: "Event Data Resolver"
category: "features"
subcategory: "memory-systems"
tags: ["events", "data-resolution", "enrichment", "memory-ingestion"]
audience: ["technical", "architect"]
difficulty: "advanced"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["memory-triggers", "application-event-system", "memory-ingestion-pipelines"]
content_type: "concept"
status: "published"
phase: 2
---

# Event Data Resolver

## Executive Summary

The Event Data Resolver is a registry-based service that bridges the gap between lightweight Application Events and full domain data. When Memory Ingestion Pipelines are triggered, the Resolver fetches complete domain objects—like full conversation histories, job details with pheromones, or task completion states—ensuring pipelines have rich context without manual data fetching.

## Overview

Application Events on the bus are intentionally lightweight—they contain just enough metadata to identify what happened. The Event Data Resolver enriches these events by fetching complete domain data from services like ChatManager, JobService, and TaskManager before passing events to Memory Ingestion Pipelines.

### The Problem Solved

```typescript
// Application Event (lightweight)
{
  "type": "conversation:ended",
  "payload": {
    "threadId": "abc-123",
    "messageCount": 15
  }
}

// Resolved Event (enriched)
{
  "type": "conversation:ended",
  "payload": {
    "threadId": "abc-123",
    "messageCount": 15,
    "messages": [...],      // Full conversation
    "thread": {...},        // Thread metadata
    "participants": [...]   // Agent information
  }
}
```

### Core Benefits

- **Automatic Enrichment**: No manual data fetching in pipelines
- **Consistent Data**: All pipelines use same enrichment logic
- **Performance**: Cached and optimized data fetching
- **Extensibility**: Register new resolvers for new event types

## Architecture

### Resolution Flow

```
1. Application Event Published
   - Lightweight event payload
   - Only contains IDs and metadata
   ↓
2. Memory Ingestion Event Bridge
   - Receives event for pipeline
   - Identifies resolver for event type
   ↓
3. Event Data Resolver
   - Looks up resolver by event type
   - Calls resolver with event
   ↓
4. Domain Service Call
   - JobService for job events
   - ChatManager for conversation events
   - TaskManager for task events
   ↓
5. Data Enrichment
   - Merges original payload with resolved data
   - Adds resolution metadata
   ↓
6. Enriched Event
   - Passed to Memory Ingestion Pipeline
   - Contains full domain context
```

### Bridge Pattern

The Resolver sits between the Application Event Bus and Memory Ingestion:

```typescript
Application Event Bus
    ↓ (lightweight events)
Memory Ingestion Event Bridge
    ↓ (invokes resolver)
Event Data Resolver
    ↓ (fetches domain data)
Domain Services (JobService, ChatManager, etc.)
    ↓ (returns full data)
Event Data Resolver
    ↓ (enriches event)
Memory Ingestion Pipeline
```

This ensures Memory Ingestion never directly accesses domain services—all data flows through the Resolver.

## Resolver Registry

### Resolver Function Signature

```typescript
type DataResolverFunction = (
  event: ApplicationEvent
) => Promise<{
  schema: string;
  data: Record<string, any>;
}>;
```

### Resolver Registration

```typescript
// Register resolver for event type
function registerResolver(
  eventType: ApplicationEventType,
  name: string,
  resolver: DataResolverFunction
): void {
  resolverRegistry.set(eventType, { resolver, name });
}
```

### Built-in Resolvers

#### Job Resolver

**Event Types**:
- `job:created`
- `job:status:changed`
- `job:assigned`
- `job:locked`
- `job:unlocked`
- `job:pheromone:deposited`
- `job:blocker:added`
- `job:blocker:resolved`

**Schema**: `job.full`

**Data Retrieved**:
```typescript
{
  schema: 'job.full',
  data: {
    id: 'job-123',
    name: 'Implement API endpoint',
    status: 'in_progress',
    priority: 'high',
    labels: ['backend', 'api'],
    assignees: ['agent-1', 'agent-2'],
    dependencies: ['job-456'],
    pheromoneAggregation: {
      attraction: 0.8,
      confidence: 0.9
    },
    eventContext: {
      eventType: 'job:status:changed',
      oldStatus: 'pending',
      newStatus: 'in_progress'
    }
  }
}
```

**Includes**:
- Complete job object
- Aggregated pheromones
- Event-specific context
- Dependencies and relationships

#### Conversation End Resolver

**Event Type**: `conversation:ended`

**Schema**: `conversation.full`

**Data Retrieved**:
```typescript
{
  schema: 'conversation.full',
  data: {
    threadId: 'thread-789',
    thread: {
      id: 'thread-789',
      title: 'API Implementation',
      createdAt: '2024-01-15T10:00:00Z'
    },
    messages: [
      {
        messageId: 'msg-1',
        role: 'user',
        content: 'Implement REST API',
        timestamp: '2024-01-15T10:00:00Z'
      },
      {
        messageId: 'msg-2',
        role: 'assistant',
        content: 'I'll create the endpoints...',
        timestamp: '2024-01-15T10:01:00Z'
      }
      // ... all messages
    ],
    messageCount: 25,
    eventPayload: {
      // Original event payload
      threadId: 'thread-789',
      messageCount: 25
    }
  }
}
```

**Includes**:
- Complete message history
- Thread metadata
- Participant information
- Message count and stats

#### Conversation Start Resolver

**Event Type**: `conversation:started`

**Schema**: `conversation.start`

**Data Retrieved**:
```typescript
{
  schema: 'conversation.start',
  data: {
    threadId: 'thread-789',
    thread: {...},
    eventPayload: {...}
  }
}
```

**Note**: Conversation just started—limited data available.

#### Task Resolver

**Event Types**:
- `task:created`
- `task:started`
- `task:completed`
- `task:failed`

**Schema**: `task.full`

**Data Retrieved**:
```typescript
{
  schema: 'task.full',
  data: {
    taskId: 'task-456',
    taskType: 'code_generation',
    status: 'completed',
    assignee: 'agent-1',
    result: {
      files: ['api.ts', 'types.ts'],
      success: true
    },
    history: [...],
    eventContext: {
      eventType: 'task:completed',
      duration: 450
    }
  }
}
```

**Includes**:
- Complete task object
- Execution history
- Result details
- Event-specific context

#### Message Added Resolver

**Event Type**: `conversation:message:added`

**Schema**: `message.full`

**Data Retrieved**:
```typescript
{
  schema: 'message.full',
  data: {
    threadId: 'thread-789',
    messageId: 'msg-25',
    message: {
      messageId: 'msg-25',
      role: 'assistant',
      content: 'Here's the implementation...',
      timestamp: '2024-01-15T10:25:00Z'
    },
    recentMessages: [...],  // Last N messages for context
    eventPayload: {...}
  }
}
```

**Includes**:
- The specific message
- Recent message context
- Thread information

#### Passthrough Resolvers

**Event Types**:
- `agent:started`, `agent:completed`, `agent:error`
- `swarm:started`, `swarm:finished`, `swarm:agent:spawned`, `swarm:agent:terminated`
- `file:created`, `file:updated`, `file:deleted`
- `git:commit`, `git:push`

**Schema**: Event-specific (e.g., `agent.event`, `swarm.event`)

**Data Retrieved**: Original event payload (already contains full data)

```typescript
{
  schema: 'agent.event',
  data: {
    ...event.payload,
    source: event.source
  }
}
```

**Rationale**: These events already carry all relevant data—no enrichment needed.

## Resolution Process

### Step-by-Step Resolution

```typescript
// 1. Application Event received
const event: ApplicationEvent = {
  id: 'evt_abc123',
  type: 'conversation:ended',
  payload: {
    threadId: 'thread-789',
    messageCount: 25
  }
};

// 2. Resolver lookup
const resolverEntry = getResolver('conversation:ended');
// Returns: { resolver: conversationEndResolver, name: 'conversationEndResolver' }

// 3. Execute resolver
const startTime = Date.now();
const resolved = await resolverEntry.resolver(event);

// 4. Build enriched event
const enrichedEvent: ResolvedEventData = {
  eventType: 'conversation:ended',
  eventId: 'evt_abc123',
  timestamp: event.timestamp,
  source: event.source,
  eventPayload: event.payload,
  resolvedData: {
    schema: 'conversation.full',
    data: {
      threadId: 'thread-789',
      messages: [...],  // Fetched from ChatManager
      thread: {...},
      messageCount: 25
    }
  },
  resolverUsed: 'conversationEndResolver',
  resolutionDurationMs: Date.now() - startTime
};
```

### Error Handling

```typescript
// Resolver fails
try {
  const resolved = await resolver(event);
} catch (error) {
  // Return error schema
  return {
    schema: 'error',
    data: {
      error: error.message,
      originalPayload: event.payload
    }
  };
}
```

**Behavior**:
- Resolver failures don't block pipeline execution
- Original event payload always available
- Error metadata logged for debugging

### Fallback Behavior

```typescript
// No resolver registered
if (!resolverEntry) {
  // Use passthrough
  return {
    schema: 'unknown',
    data: event.payload
  };
}
```

## Available Schemas

### Schema Registry

Each resolver declares its output schema:

```typescript
interface ResolvedSchemaInfo {
  eventType: ApplicationEventType;
  schema: string;
  description: string;
  fields: string[];
}
```

### Schema Examples

#### `job.full`

**Events**: All job events

**Description**: Full job data with pheromones and group info

**Fields**:
- `id`, `name`, `status`, `priority`
- `labels`, `assignees`, `dependencies`
- `pheromones`, `groupId`
- `eventContext`

#### `conversation.full`

**Events**: `conversation:ended`

**Description**: Complete conversation with all messages

**Fields**:
- `threadId`, `thread`
- `messages` (array)
- `messageCount`
- `participants`

#### `conversation.start`

**Events**: `conversation:started`

**Description**: Conversation initialization data

**Fields**:
- `threadId`, `thread`
- `initialContext`

#### `task.full`

**Events**: All task events

**Description**: Complete task with status and history

**Fields**:
- `taskId`, `taskType`, `status`
- `assignee`, `result`
- `history`, `duration`
- `eventContext`

#### `message.full`

**Events**: `conversation:message:added`

**Description**: Message with recent context

**Fields**:
- `threadId`, `messageId`
- `message`
- `recentMessages`

### Schema API

```typescript
// Get all available schemas
const schemas = eventDataResolverService.getAvailableSchemas();

// Example output
[
  {
    eventType: 'job:created',
    schema: 'job.full',
    description: 'Full job data with pheromones',
    fields: ['id', 'name', 'status', 'pheromones', ...]
  },
  {
    eventType: 'conversation:ended',
    schema: 'conversation.full',
    description: 'Complete conversation with messages',
    fields: ['threadId', 'messages', 'thread', ...]
  }
]
```

## Integration with Memory Ingestion

### Event Bridge Integration

```typescript
// Memory Ingestion Event Bridge
async function handlePipelineEvent(
  pipeline: IngestionPipeline,
  appEvent: ApplicationEvent
): Promise<void> {
  // 1. Resolve event data
  const resolved = await eventDataResolverService.resolveEventData(appEvent);

  logger.debug(
    `Resolved ${appEvent.type}: ` +
    `schema=${resolved.resolvedData.schema}, ` +
    `resolver=${resolved.resolverUsed}, ` +
    `duration=${resolved.resolutionDurationMs}ms`
  );

  // 2. Build enriched event
  const enrichedEvent: EnrichedIngestionEventData = {
    type: resolved.eventType,
    timestamp: resolved.timestamp,
    source: resolved.source,
    payload: {
      ...resolved.eventPayload,
      ...resolved.resolvedData.data  // Enriched data merged in
    },
    eventSchema: getEventSchema(resolved.eventType),
    resolvedData: resolved.resolvedData,
    resolution: {
      resolverUsed: resolved.resolverUsed,
      resolutionDurationMs: resolved.resolutionDurationMs,
      originalEventId: resolved.eventId
    }
  };

  // 3. Pass to pipeline execution
  await memoryIngestionExecutionService.executePipeline(
    pipeline.id,
    enrichedEvent
  );
}
```

### Pipeline Access to Resolved Data

```yaml
# Pipeline can access both original and resolved data
processors:
  - id: extract
    type: llm_extract
    input: event.payload.messages  # Resolved from conversation:ended
    params:
      prompt: |
        Analyze this conversation:
        {messages}
        
        Thread: {threadId}
        Participants: {participants}
```

All resolved fields are available at `event.payload.*`.

## Performance Considerations

### Caching

Resolvers should cache results:

```typescript
const jobResolver: DataResolverFunction = async (event) => {
  const jobId = event.payload.jobId;

  // Check cache
  const cached = jobCache.get(jobId);
  if (cached && Date.now() - cached.timestamp < 60000) {
    return cached.data;
  }

  // Fetch from service
  const job = await jobService.getJob(jobId);

  // Cache result
  jobCache.set(jobId, {
    data: { schema: 'job.full', data: job },
    timestamp: Date.now()
  });

  return { schema: 'job.full', data: job };
};
```

### Batch Resolution

For multiple events, resolve in parallel:

```typescript
const resolvedEvents = await Promise.all(
  events.map(event => eventDataResolverService.resolveEventData(event))
);
```

### Resolution Timeout

Prevent runaway resolvers:

```typescript
const resolved = await Promise.race([
  resolver(event),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Resolver timeout')), 5000)
  )
]);
```

## Best Practices

### Resolver Design

1. **Idempotent**: Same input → same output
2. **Error Tolerant**: Fail gracefully, return partial data
3. **Cached**: Cache frequently accessed data
4. **Timeout**: Prevent hanging resolvers

### Schema Design

1. **Consistent**: Same event → same schema
2. **Documented**: Clear field descriptions
3. **Versioned**: Track schema evolution
4. **Validated**: Validate returned data

### Error Handling

1. **Log Failures**: Track resolver errors
2. **Return Partial**: Provide whatever data available
3. **Include Original**: Always include event payload
4. **Monitor Performance**: Track resolution times

## Extending the Resolver

### Adding Custom Resolvers

```typescript
// Register custom resolver
eventDataResolverService.registerResolver(
  'custom:event',
  'myCustomResolver',
  async (event) => {
    // Fetch data from custom service
    const data = await myCustomService.getData(event.payload.id);

    return {
      schema: 'custom.full',
      data: {
        ...data,
        eventContext: event.payload
      }
    };
  }
);
```

### Resolving Complex Data

```typescript
// Multi-source resolver
const complexResolver: DataResolverFunction = async (event) => {
  const [data1, data2] = await Promise.all([
    service1.getData(event.payload.id1),
    service2.getData(event.payload.id2)
  ]);

  return {
    schema: 'complex.full',
    data: {
      ...data1,
      ...data2,
      merged: true
    }
  };
};
```

## Troubleshooting

### Resolver Not Found

1. Check resolver is registered
2. Verify event type matches
3. Review resolver registration order

### Resolution Slow

1. Check for N+1 queries
2. Implement caching
3. Review service call performance
4. Consider batch fetching

### Missing Data

1. Verify service returns expected data
2. Check IDs are valid
3. Review resolver logic
4. Check service initialization

## Related Concepts

- **[Memory Triggers](/conceptbank/features/memory-systems/memory-triggers.md)**: Trigger-based pipeline execution
- **[Application Event System](/conceptbank/features/memory-systems/application-event-system.md)**: Event bus architecture
- **[Memory Ingestion Pipelines](/conceptbank/features/memory-systems/memory-ingestion-pipelines.md)**: Event-driven memory creation
- **[Memory Processors](/conceptbank/features/memory-systems/memory-processors.md)**: Data transformation logic
