---
id: "memory-triggers"
title: "Memory Triggers and Event-Based Ingestion"
category: "features"
subcategory: "memory-systems"
tags: ["memory", "triggers", "events", "automation", "ingestion"]
audience: ["technical", "developer"]
difficulty: "beginner"
last_updated: "2026-01-18"
version: "1.0.0"
related_concepts: ["memory-ingestion-pipelines", "application-event-system", "event-data-resolver"]
content_type: "concept"
status: "published"
phase: 2
---

# Memory Triggers and Event-Based Ingestion

## Executive Summary

Memory Triggers are the event-driven mechanism that automatically activates Memory Ingestion Pipelines when specific system events occur. By mapping application events to pipeline execution, triggers enable continuous, automated memory population without manual intervention—transforming transient events into persistent knowledge.

## Overview

Triggers define **when** memory ingestion happens. They listen to the Application Event Bus and launch pipelines in response to relevant events. This event-driven architecture ensures memory systems stay synchronized with application state in real-time.

### Core Benefits

- **Automation**: No manual memory creation required
- **Timeliness**: Memory updates immediately after events
- **Consistency**: All events processed through same pipelines
- **Scalability**: Decoupled event producers from memory consumers

## Trigger Types

### Conversation Triggers

#### `onConversationStart`

**Fires**: When a new conversation thread is created

**Use Cases**:
- Initialize conversation context
- Set up tracking metadata
- Capture initial state

**Event Data**:
```json
{
  "threadId": "abc-123",
  "timestamp": "2024-01-15T10:30:00Z",
  "initialContext": {...}
}
```

#### `onConversationEnd`

**Fires**: When a conversation completes or is closed

**Use Cases**:
- Extract conversation summary
- Identify facts and decisions
- Archive complete transcript

**Event Data**:
```json
{
  "threadId": "abc-123",
  "messageCount": 25,
  "duration": 1800,
  "messages": [...]
}
```

**Most Common Trigger**: Captures full conversation for memory extraction.

### Task Triggers

#### `onTaskStart`

**Fires**: When a task begins execution

**Use Cases**:
- Record task intentions
- Track task lifecycle
- Initialize task state

**Event Data**:
```json
{
  "taskId": "task-456",
  "taskType": "code_generation",
  "assignee": "agent-1",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### `onTaskCompleted`

**Fires**: When a task finishes successfully

**Use Cases**:
- Extract solution approach
- Record lessons learned
- Update task metrics

**Event Data**:
```json
{
  "taskId": "task-456",
  "result": "success",
  "duration": 450,
  "output": {...}
}
```

#### `onTaskFailure`

**Fires**: When a task fails or errors

**Use Cases**:
- Capture error context
- Extract failure patterns
- Trigger incident workflows

**Event Data**:
```json
{
  "taskId": "task-456",
  "error": "Timeout waiting for API",
  "stackTrace": "...",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Agent Triggers

#### `onAction`

**Fires**: When an agent completes an action

**Use Cases**:
- Track agent behavior
- Record tool usage
- Build agent activity timeline

**Event Data**:
```json
{
  "agentId": "agent-1",
  "action": "file_created",
  "tool": "filesystem",
  "result": {...}
}
```

#### `onError`

**Fires**: When an agent encounters an error

**Use Cases**:
- Detect recurring issues
- Extract error patterns
- Trigger remediation workflows

**Event Data**:
```json
{
  "agentId": "agent-1",
  "errorType": "api_timeout",
  "message": "Request timed out after 30s",
  "context": {...}
}
```

### Manual Trigger

#### `manual`

**Fires**: On-demand via API call

**Use Cases**:
- Bulk data import
- Retroactive memory creation
- Testing and debugging

**Invocation**:
```typescript
await memoryIngestionService.executePipeline(
  "my-pipeline",
  {
    type: "manual",
    payload: {...}
  }
);
```

## Trigger Configuration

### Basic Trigger

```yaml
trigger: onConversationEnd
```

Simplest form—pipeline executes on every event of this type.

### Trigger with Filters

```yaml
trigger: onConversationEnd
trigger_config:
  filter:
    conditions:
      - field: "source.swarmId"
        op: "exists"
        value: true
      - field: "payload.messageCount"
        op: ">="
        value: 10
```

Only executes when filter conditions match.

### Filter Operators

Supported operators:

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equals | `{ field: "status", op: "=", value: "completed" }` |
| `!=` | Not equals | `{ field: "type", op: "!=", value: "test" }` |
| `>` | Greater than | `{ field: "count", op: ">", value: 5 }` |
| `<` | Less than | `{ field: "priority", op: "<", value: 3 }` |
| `>=` | Greater or equal | `{ field: "duration", op: ">=", value: 100 }` |
| `<=` | Less or equal | `{ field: "retries", op: "<=", value: 3 }` |
| `in` | In array | `{ field: "type", op: "in", value: ["a", "b"] }` |
| `notIn` | Not in array | `{ field: "status", op: "notIn", value: ["deleted"] }` |
| `contains` | Contains value | `{ field: "tags", op: "contains", value: "production" }` |
| `notContains` | Doesn't contain | `{ field: "tags", op: "notContains", value: "test" }` |
| `startsWith` | Starts with | `{ field: "path", op: "startsWith", value: "/src/" }` |
| `endsWith` | Ends with | `{ field: "file", op: "endsWith", value: ".ts" }` |
| `matches` | Regex match | `{ field: "email", op: "matches", value: ".*@example.com" }` |
| `exists` | Field exists | `{ field: "threadId", op: "exists", value: true }` |

### Compound Filters

#### AND Logic

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
```

All conditions must match.

#### OR Logic

```yaml
trigger_config:
  filter:
    or:
      - field: "payload.status"
        op: "="
        value: "completed"
      - field: "payload.status"
        op: "="
        value: "failed"
```

At least one condition must match.

#### NOT Logic

```yaml
trigger_config:
  filter:
    not:
      conditions:
        - field: "payload.environment"
          op: "="
        value: "test"
```

Negates the contained filter.

#### Complex Combinations

```yaml
trigger_config:
  filter:
    and:
      - field: "source.projectId"
        op: "="
        value: "my-project"
      - or:
          - field: "payload.type"
            op: "="
            value: "conversation"
          - field: "payload.type"
            op: "="
            value: "task"
      - not:
          conditions:
            - field: "payload.tags"
              op: "contains"
              value: "debug"
```

### Debouncing

Prevent redundant executions for high-frequency events:

```yaml
trigger: onAction
trigger_config:
  filter:
    debounce_ms: 5000  # Wait 5s after last event
```

**Behavior**:
- Event occurs → Start 5s timer
- Another event within 5s → Reset timer
- After 5s with no events → Execute pipeline

**Use Cases**:
- Rapid file updates
- Agent status changes
- High-frequency metrics

## Event Enrichment

### Automatic Data Resolution

Before pipeline execution, triggers automatically enrich event data with full domain information:

```typescript
// Original event (metadata only)
{
  "threadId": "abc-123",
  "messageCount": 15
}

// Enriched event (full domain data)
{
  "threadId": "abc-123",
  "messageCount": 15,
  "messages": [...],      // Full conversation
  "thread": {...},        // Thread metadata
  "participants": [...],  // Agent info
  "swarm": {...}          // Swarm context (if applicable)
}
```

### Resolution Schema

Each trigger type has a known resolution schema:

| Trigger | Schema | Contents |
|---------|--------|----------|
| `onConversationEnd` | `conversation.full` | Complete conversation with all messages |
| `onTaskCompleted` | `task.full` | Task with history, result, metadata |
| `onAction` | `agent.event` | Agent state, action details, context |
| `onError` | `agent.event` | Error details, stack trace, context |

### Resolver Types

1. **Full Resolvers**: Fetch complete domain objects
   - Conversations → All messages
   - Tasks → Full task history

2. **Partial Resolvers**: Use available metadata
   - Agent events → Event payload only
   - File events → File metadata

3. **Passthrough Resolvers**: Use event as-is
   - Swarm events → Already contain full data

## Trigger-to-Pipeline Flow

### Event Flow Diagram

```
1. Application Event
   ↓
2. Application Event Bus
   - Validates event structure
   - Persists to event log
   ↓
3. Memory Ingestion Event Bridge
   - Maps trigger to event type
   - Checks active pipeline subscriptions
   ↓
4. Trigger Filter Evaluation
   - Evaluates filter conditions
   - Checks debounce timer
   ↓
5. Event Data Resolution
   - Fetches full domain data
   - Enriches event payload
   ↓
6. Pipeline Execution
   - Runs processors
   - Routes to destinations
   ↓
7. Result Emission
   - Success/failure events
   - Performance metrics
```

### Subscription Model

```yaml
# Pipeline A: Subscribed to onConversationEnd
trigger: onConversationEnd
status: active

# Pipeline B: Subscribed to onConversationEnd with filter
trigger: onConversationEnd
trigger_config:
  filter:
    conditions:
      - field: "source.swarmId"
        op: "exists"
        value: true
status: active

# Pipeline C: Subscribed to onTaskCompleted
trigger: onTaskCompleted
status: active
```

**Single Event** → **Multiple Pipelines**

One `onConversationEnd` event triggers both Pipeline A and Pipeline B (if filter matches).

## Use Cases

### 1. Continuous Knowledge Building

```yaml
trigger: onConversationEnd
processors:
  - id: extract
    type: llm_extract
    params:
      prompt_template: conversation_extraction
routing:
  - from: extract.facts
    write_to:
      type: graph
      record_kind: fact
```

**Result**: Every conversation automatically adds to project knowledge.

### 2. Error Pattern Detection

```yaml
trigger: onError
trigger_config:
  filter:
    conditions:
      - field: "payload.severity"
        op: "="
        value: "high"
processors:
  - id: analyze
    type: llm_extract
    params:
      prompt: "Extract error pattern and suggested fix"
routing:
  - from: analyze
    write_to:
      type: graph
      record_kind: error_pattern
```

**Result**: High-severity errors automatically analyzed for patterns.

### 3. Semantic Search Indexing

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
  - id: embed
    type: vector_embed
    input: chunk
routing:
  - from: embed
    write_to:
      type: vector
      collection: docs_search
```

**Result**: Documentation updates immediately searchable.

### 4. Task Lifecycle Tracking

```yaml
trigger: onTaskCompleted
processors:
  - id: extract
    type: llm_extract_kb
    params:
      prompt: "Extract solution approach and challenges"
routing:
  - from: extract
    write_to:
      type: graph
      record_kind: completed_task
```

**Result**: Task completions build solution knowledge base.

## Best Practices

### Trigger Selection

1. **Choose Right Granularity**: Not too broad, not too narrow
2. **Consider Frequency**: High-frequency events need debouncing
3. **Think About Data**: What data is available when trigger fires?

### Filter Design

1. **Filter Early**: Reduce unnecessary pipeline executions
2. **Use Exists Checks**: Validate data presence
3. **Combine Conditions**: AND/OR for precise targeting
4. **Test Filters**: Verify filter logic matches intended events

### Performance

1. **Debounce High-Frequency Events**: Prevent redundant executions
2. **Keep Filters Simple**: Complex filters slow evaluation
3. **Monitor Trigger Rates**: Track pipeline execution frequency
4. **Set Resource Limits**: Prevent runaway pipelines

### Debugging

1. **Log Trigger Events**: See what triggers pipelines
2. **Trace Filter Evaluation**: Understand why events match/don't match
3. **Monitor Enrichment**: Check resolved data quality
4. **Profile Execution**: Measure trigger-to-completion time

## Troubleshooting

### Pipeline Not Triggering

1. Check pipeline status is `active`
2. Verify trigger type matches event type
3. Review filter conditions
4. Check event bridge subscription

### Too Many Executions

1. Add debounce timer
2. Strengthen filter conditions
3. Review trigger frequency
4. Consider batching strategy

### Missing Event Data

1. Check resolver is registered for event type
2. Verify resolver can fetch required data
3. Review enriched event payload
4. Test resolver in isolation

### Filter Not Matching

1. Check field paths are correct
2. Verify operator usage
3. Test filter conditions
4. Use wildcards for testing

## Advanced Features

### Conditional Triggers

```yaml
trigger: onConversationEnd
trigger_config:
  filter:
    and:
      - field: "payload.messageCount"
        op: ">="
        value: 5
      - field: "payload.hasCode"
        op: "="
        value: true
```

Only triggers for substantial conversations with code.

### Multi-Trigger Pipelines

Create multiple pipelines for same trigger:

```yaml
# Pipeline 1: Extract facts
trigger: onConversationEnd
processors:
  - type: llm_extract
    params:
      output_schema: facts_only

# Pipeline 2: Extract decisions
trigger: onConversationEnd
processors:
  - type: llm_extract
    params:
      output_schema: decisions_only
```

Separates concerns while using same trigger.

### Trigger Chaining

```yaml
# Pipeline 1: On task completion
trigger: onTaskCompleted
processors:
  - id: extract
    type: llm_extract
routing:
  - from: extract
    write_to:
      type: log
      event_type: task_analyzed

# Pipeline 2: On analysis complete
trigger: manual  # Invoked by Pipeline 1
processors:
  - id: notify
    type: custom
```

One pipeline's output triggers another.

## Related Concepts

- **[Memory Ingestion Pipelines](/conceptbank/features/memory-systems/memory-ingestion-pipelines.md)**: Triggered pipeline execution
- **[Application Event System](/conceptbank/features/memory-systems/application-event-system.md)**: Event bus architecture
- **[Event Data Resolver](/conceptbank/features/memory-systems/event-data-resolver.md)**: Event enrichment layer
- **[Memory Processors](/conceptbank/features/memory-systems/memory-processors.md)**: Data processing logic
