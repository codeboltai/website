---
id: "application-event-system"
title: "Application Event System"
category: "features"
subcategory: "memory-systems"
tags: ["events", "pubsub", "event-bus", "architecture", "integration"]
audience: ["technical", "architect"]
difficulty: "advanced"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["memory-triggers", "event-data-resolver", "memory-ingestion-pipelines", "agent-hooks"]
content_type: "concept"
status: "published"
phase: 2
---

# Application Event System

## Executive Summary

The Application Event System is CodeBolt's centralized publish-subscribe event bus that enables real-time communication between system components. It provides a unified mechanism for emitting, subscribing to, and filtering events—serving as the foundational infrastructure for Memory Ingestion, Hooks, and other event-driven features.

## Overview

The Application Event System implements a classic pub-sub pattern where event producers emit events without knowledge of consumers, and event consumers subscribe to specific event types without knowledge of producers. This decoupling enables flexible, extensible system architecture.

### Core Architecture

```
┌─────────────┐
│ Event Source │
│  (Any Code)  │
└──────┬──────┘
       │ Emits
       ↓
┌──────────────────┐
│  Event Bus       │
│  - Validate      │
│  - Persist       │
│  - Route         │
│  - Filter        │
└──────┬───────────┘
       │ Notifies
       ↓
┌─────────────────────────────┐
│  Subscribers                │
│  - Memory Ingestion         │
│  - Hooks                    │
│  - Plugins                  │
│  - Internal Services        │
└─────────────────────────────┘
```

### Key Benefits

- **Decoupling**: Producers and consumers independent
- **Extensibility**: Add subscribers without modifying producers
- **Reliability**: Event persistence ensures no lost events
- **Observability**: Complete event log for debugging
- **Scalability**: Asynchronous event processing

## Event Structure

### Standard Event Format

All events follow a consistent structure:

```typescript
interface ApplicationEvent {
  id: string;                    // Unique event ID (UUID)
  type: ApplicationEventType;    // Event type (e.g., "conversation:ended")
  timestamp: string;             // ISO 8601 timestamp
  source: EventSource;           // Source context
  payload: Record<string, any>;  // Event-specific data
  metadata?: Record<string, any>; // Optional metadata
}
```

### Event Source

Identifies where the event originated:

```typescript
interface EventSource {
  projectId?: string;  // Project context
  threadId?: string;   // Conversation context
  agentId?: string;    // Agent context
  swarmId?: string;    // Swarm context
  jobId?: string;      // Job context
}
```

### Example Event

```json
{
  "id": "evt_abc123",
  "type": "conversation:ended",
  "timestamp": "2024-01-15T10:30:00Z",
  "source": {
    "projectId": "project-456",
    "threadId": "thread-789"
  },
  "payload": {
    "messageCount": 25,
    "duration": 1800,
    "participantCount": 2
  },
  "metadata": {
    "version": "1.0.0"
  }
}
```

## Event Types

### Conversation Events

| Event Type | Description | Typical Payload |
|------------|-------------|-----------------|
| `conversation:started` | New conversation created | `threadId`, `initialMessage` |
| `conversation:ended` | Conversation completed | `threadId`, `messageCount`, `duration` |
| `conversation:message:added` | Message added to conversation | `threadId`, `messageId`, `message` |

### Task/Thread Events

| Event Type | Description | Typical Payload |
|------------|-------------|-----------------|
| `task:created` | Task created | `taskId`, `taskType`, `assignee` |
| `task:started` | Task started | `taskId`, `startTime` |
| `task:completed` | Task completed | `taskId`, `result`, `duration` |
| `task:failed` | Task failed | `taskId`, `error`, `stackTrace` |
| `thread:created` | Thread created | `threadId`, `initialContext` |
| `thread:completed` | Thread completed | `threadId`, `finalState` |

### Job Events

| Event Type | Description | Typical Payload |
|------------|-------------|-----------------|
| `job:created` | Job created | `jobId`, `name`, `priority` |
| `job:status:changed` | Job status changed | `jobId`, `oldStatus`, `newStatus` |
| `job:assigned` | Job assigned | `jobId`, `assignee` |
| `job:locked` | Job locked | `jobId`, `lockedBy` |
| `job:unlocked` | Job unlocked | `jobId`, `unlockedBy` |
| `job:pheromone:deposited` | Pheromone deposited | `jobId`, `pheromoneType`, `value` |
| `job:blocker:added` | Blocker added | `jobId`, `blocker` |
| `job:blocker:resolved` | Blocker resolved | `jobId`, `blockerId` |

### Swarm Events

| Event Type | Description | Typical Payload |
|------------|-------------|-----------------|
| `swarm:started` | Swarm started | `swarmId`, `agentCount` |
| `swarm:finished` | Swarm finished | `swarmId`, `finalState` |
| `swarm:agent:spawned` | Agent spawned | `swarmId`, `agentId` |
| `swarm:agent:terminated` | Agent terminated | `swarmId`, `agentId`, `reason` |

### Agent Events

| Event Type | Description | Typical Payload |
|------------|-------------|-----------------|
| `agent:started` | Agent started | `agentId`, `task` |
| `agent:completed` | Agent completed | `agentId`, `result` |
| `agent:error` | Agent error | `agentId`, `error`, `context` |

### File Events

| Event Type | Description | Typical Payload |
|------------|-------------|-----------------|
| `file:created` | File created | `path`, `size`, `content` |
| `file:updated` | File updated | `path`, `changes` |
| `file:deleted` | File deleted | `path`, `reason` |

### Git Events

| Event Type | Description | Typical Payload |
|------------|-------------|-----------------|
| `git:commit` | Git commit | `commitHash`, `message`, `files` |
| `git:push` | Git push | `branch`, `commitCount` |

## Publishing Events

### Emitting Events

```typescript
// Simple event emit
await applicationEventBus.emit(
  'conversation:ended',
  {
    messageCount: 25,
    duration: 1800
  },
  {
    threadId: 'thread-789',
    projectId: 'project-456'
  }
);

// Full event publish
await applicationEventBus.publish({
  type: 'task:completed',
  source: {
    projectId: 'project-456',
    taskId: 'task-123'
  },
  payload: {
    result: 'success',
    duration: 450
  },
  metadata: {
    version: '1.0.0'
  }
});
```

### Event Validation

Events are validated before publication:
- **Type Checking**: Event type must be registered
- **Structure Checking**: Required fields present
- **Schema Validation**: Payload matches event schema

### Event Persistence

All events are persisted to `.codebolt/events.json`:

```json
{
  "events": [
    {
      "id": "evt_abc123",
      "type": "conversation:ended",
      "timestamp": "2024-01-15T10:30:00Z",
      "source": {...},
      "payload": {...}
    }
  ]
}
```

**Benefits**:
- Audit trail
- Replay capability
- Debugging support
- Offline analysis

## Subscribing to Events

### Subscription Structure

```typescript
interface EventSubscription {
  id: string;                    // Subscription ID (UUID)
  subscriberId: string;          // Subscriber identifier
  subscriberType: SubscriberType; // Type of subscriber
  eventTypes: ApplicationEventType[]; // Subscribed event types
  filter?: TriggerFilter;        // Optional filter
  enabled: boolean;              // Active status
  createdAt: string;             // Creation timestamp
}
```

### Subscriber Types

- **`memoryIngestion`**: Memory Ingestion Pipelines
- **`hook`**: Hook system
- **`plugin`**: Plugin system
- **`internal`**: Internal services

### Creating Subscriptions

```typescript
// Simple subscription
const subscriptionId = applicationEventBus.subscribe(
  {
    subscriberId: 'my-pipeline',
    subscriberType: 'memoryIngestion',
    eventTypes: ['conversation:ended'],
    enabled: true
  },
  async (event) => {
    console.log('Conversation ended:', event.payload);
  }
);

// Subscription with filter
const subscriptionId = applicationEventBus.subscribe(
  {
    subscriberId: 'filtered-pipeline',
    subscriberType: 'memoryIngestion',
    eventTypes: ['conversation:ended'],
    filter: {
      conditions: [
        {
          field: 'payload.messageCount',
          op: '>=',
          value: 10
        }
      ],
      debounce_ms: 5000
    },
    enabled: true
  },
  async (event) => {
    // Only conversations with 10+ messages
    // Debounced by 5 seconds
  }
);
```

### Managing Subscriptions

```typescript
// Unsubscribe by ID
applicationEventBus.unsubscribe(subscriptionId);

// Unsubscribe all for subscriber
applicationEventBus.unsubscribeAll('my-pipeline');

// Enable/disable subscription
applicationEventBus.setSubscriptionEnabled(subscriptionId, false);

// List subscriptions
const subs = applicationEventBus.getSubscriptions('memoryIngestion');
```

### Subscription Persistence

Subscriptions persisted to `.codebolt/subscriptions.json`:

```json
{
  "subscriptions": [
    {
      "id": "sub_abc123",
      "subscriberId": "pipeline-1",
      "subscriberType": "memoryIngestion",
      "eventTypes": ["conversation:ended"],
      "filter": {...},
      "enabled": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Note**: Handlers are NOT persisted—must be re-registered on restart.

## Filter System

### Filter Structure

```typescript
interface TriggerFilter {
  and?: (FilterCondition | TriggerFilter)[];
  or?: (FilterCondition | TriggerFilter)[];
  not?: TriggerFilter;
  conditions?: FilterCondition[];
  debounce_ms?: number;
}
```

### Filter Conditions

```typescript
interface FilterCondition {
  field: string;  // Dot-notation path
  op: FilterOperator;
  value: any;
}
```

### Dot Notation Paths

Access nested fields:

```typescript
// Event payload
{
  "source": {
    "threadId": "thread-789"
  },
  "payload": {
    "messages": [
      {"role": "user", "content": "..."},
      {"role": "assistant", "content": "..."}
    ]
  }
}

// Filter conditions
{ "field": "source.threadId", "op": "exists", "value": true }
{ "field": "payload.messages.length", "op": ">=", "value": 5 }
```

### Filter Evaluation

```typescript
// AND logic
filter: {
  and: [
    { field: "source.swarmId", op: "exists", value: true },
    { field: "payload.agentCount", op: ">=", value: 3 }
  ]
}

// OR logic
filter: {
  or: [
    { field: "payload.status", op: "=", value: "completed" },
    { field: "payload.status", op: "=", value: "failed" }
  ]
}

// NOT logic
filter: {
  not: {
    conditions: [
      { field: "payload.environment", op: "=", value: "test" }
    ]
  }
}

// Complex
filter: {
  and: [
    { field: "source.projectId", op: "=", value: "my-project" },
    {
      or: [
        { field: "payload.type", op: "=", value: "conversation" },
        { field: "payload.type", op: "=", value: "task" }
      ]
    }
  ]
}
```

### Debouncing

Prevent redundant processing:

```typescript
filter: {
  conditions: [...],
  debounce_ms: 5000  // Wait 5s after last matching event
}
```

**Behavior**:
1. First matching event → Start timer
2. Subsequent matching events → Reset timer
3. Timer expires → Execute handler

## Event Schemas

### Schema Structure

```typescript
interface EventSchema {
  eventType: ApplicationEventType;
  description: string;
  fields: EventFieldSchema[];
}
```

### Field Schema

```typescript
interface EventFieldSchema {
  name: string;           // Dot-notation path
  type: EventFieldType;   // Data type
  description?: string;   // Human-readable description
  enum?: any[];          // Allowed values
  required?: boolean;    // Always present?
  itemType?: EventFieldType; // For arrays
}
```

### Example Schema

```typescript
{
  eventType: 'conversation:ended',
  description: 'Fired when a conversation completes',
  fields: [
    {
      name: 'source.threadId',
      type: 'string',
      description: 'Conversation thread ID',
      required: true
    },
    {
      name: 'source.projectId',
      type: 'string',
      description: 'Project ID',
      required: false
    },
    {
      name: 'payload.messageCount',
      type: 'number',
      description: 'Number of messages in conversation',
      required: true
    },
    {
      name: 'payload.duration',
      type: 'number',
      description: 'Conversation duration in seconds',
      required: false
    }
  ]
}
```

### Schema API

```typescript
// Get schema for specific event type
const schema = applicationEventBus.getSchema('conversation:ended');

// Get all schemas
const allSchemas = applicationEventBus.getAllSchemas();

// Get all event types
const eventTypes = applicationEventBus.getEventTypes();
```

## Use Cases

### 1. Memory Ingestion

```typescript
// Memory Ingestion subscribes to events
applicationEventBus.subscribe(
  {
    subscriberId: 'conversation-extractor',
    subscriberType: 'memoryIngestion',
    eventTypes: ['conversation:ended'],
    filter: {
      conditions: [
        { field: 'source.threadId', op: 'exists', value: true }
      ]
    }
  },
  async (event) => {
    // Extract memory from conversation
    await memoryIngestionService.executePipeline('conversation-extractor', event);
  }
);
```

### 2. Hooks System

```typescript
// Hooks subscribe to file events
applicationEventBus.subscribe(
  {
    subscriberId: 'lint-on-save',
    subscriberType: 'hook',
    eventTypes: ['file:updated'],
    filter: {
      conditions: [
        { field: 'payload.extension', op: 'in', value: ['.ts', '.js'] }
      ]
    }
  },
  async (event) => {
    // Run linter
    await hookService.executeHook('lint-on-save', event);
  }
);
```

### 3. Observability

```typescript
// Internal service subscribes to all events
applicationEventBus.subscribe(
  {
    subscriberId: 'metrics-collector',
    subscriberType: 'internal',
    eventTypes: ['*'],  // Wildcard
  },
  async (event) => {
    // Collect metrics
    await metricsService.recordEvent(event);
  }
);
```

### 4. Plugin Integration

```typescript
// Plugin subscribes to task events
applicationEventBus.subscribe(
  {
    subscriberId: 'task-notifier-plugin',
    subscriberType: 'plugin',
    eventTypes: ['task:completed', 'task:failed'],
    filter: {
      conditions: [
        { field: 'source.projectId', op: '=', value: 'my-project' }
      ]
    }
  },
  async (event) => {
    // Send notification
    await pluginService.notify(event);
  }
);
```

## Performance Considerations

### Async Processing

Event handlers are async:
- Don't block event bus
- Long-running operations should be queued
- Use worker threads for CPU-intensive work

### Subscription Management

- **Unsubscribe Unused**: Remove inactive subscriptions
- **Filter Early**: Use filters to reduce handler calls
- **Batch Processing**: Aggregate events when possible
- **Monitor Queue Depth**: Track event processing lag

### Event Persistence

- **Rotate Log Files**: Prevent unlimited growth
- **Archive Old Events**: Move to cold storage
- **Index for Query**: Enable fast event lookup
- **Compact Periodically**: Remove processed events

## Best Practices

### Event Design

1. **Immutable Events**: Never modify published events
2. **Complete Context**: Include all relevant data
3. **Clear Types**: Use specific event types
4. **Version Payloads**: Track schema evolution

### Subscription Design

1. **Specific Filters**: Reduce unnecessary handler calls
2. **Debounce High-Frequency**: Prevent redundant processing
3. **Handle Errors**: Catch and log handler exceptions
4. **Timeout Handlers**: Prevent runaway handlers

### Filter Design

1. **Use Exists Checks**: Validate data presence
2. **Combine Conditions**: AND/OR for precision
3. **Test Filters**: Verify matching logic
4. **Document Intent**: Comment complex filters

## Troubleshooting

### Events Not Received

1. Check subscription is enabled
2. Verify event type matches
3. Review filter conditions
4. Check handler registration

### Slow Event Processing

1. Monitor handler execution time
2. Check for blocking operations
3. Review subscription count
4. Profile handler code

### High Memory Usage

1. Rotate event log files
2. Archive old events
3. Clean up completed subscriptions
4. Monitor queue depth

## Related Concepts

- **[Memory Triggers](/conceptbank/features/memory-systems/memory-triggers.md)**: Trigger-based pipeline execution
- **[Event Data Resolver](/conceptbank/features/memory-systems/event-data-resolver.md)**: Event enrichment layer
- **[Memory Ingestion Pipelines](/conceptbank/features/memory-systems/memory-ingestion-pipelines.md)**: Event-driven memory creation
- **[Hooks System](/conceptbank/features/integrations/hooks.md)**: Event-driven automation
