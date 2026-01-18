---
title: Episodic Memory
category: Memory Systems
status: Active
tags: [episodic, events, history, swarm, append-only]
---

# Episodic Memory

## Executive Summary
Episodic Memory provides an append-only, immutable event log that records swarm experiences and agent interactions. This enables agents to understand history, track progress, and learn from past events without explicit coordination.

## What It Is and Why It Matters

Episodic memory is inspired by human psychology - it's the memory of personal experiences and events. In multi-agent systems, episodic memory serves as the "collective consciousness" of the swarm, recording:
- What decisions were made and why
- Which agents participated in tasks
- What outcomes occurred
- How situations evolved over time

**Why this matters:**
- **Stigmergic Coordination**: Agents observe history to understand current state
- **Cross-Generational Learning**: New agents learn from past experiences
- **Progress Tracking**: Understand swarm evolution without explicit communication
- **Debugging and Analysis**: Replay and analyze swarm behavior
- **Collective Intelligence**: System learns from aggregate experiences

## Key Capabilities

### Event Recording
- **Append-Only Log**: Events cannot be modified, only appended
- **Immutable History**: Provides trustworthy audit trail
- **Multiple Event Types**: Decisions, artifacts, signals, conflicts
- **Rich Metadata**: Timestamps, agent IDs, tags, structured payloads
- **Agent Attribution**: Track which agent/user emitted each event

### Event Structure
Each event contains:
- **ID**: Unique event identifier
- **Timestamp**: ISO 8601 time of creation
- **Event Type**: User-defined category (e.g., "decision", "artifact_created")
- **Emitting Agent**: Agent ID or "user"
- **Team Context**: Optional team/swarm ID
- **Tags**: User-defined labels for filtering
- **Payload**: String message or structured JSON data

### Query and Retrieval
- **Time-Based Queries**: Last X minutes, last Y events, since timestamp
- **Filter by Tags**: Find events with specific labels
- **Filter by Type**: Retrieve specific event categories
- **Filter by Agent**: See what a specific agent did
- **Team Context**: Query within team scope

### Thread Organization
- **Multiple Memory Threads**: Separate logs for different purposes
- **Archival**: Archive old memories while preserving data
- **Thread Metadata**: Titles, creation dates, event counts

## How It Works Conceptually

### Event Flow

```
Agent Action
     │
     ▼
Event Emitted
     │
     ▼
Appended to Log
     │
     ▼
Indexed by Tags/Type/Agent
     │
     ▼
Available for Query
     │
     ▼
Agents Observe and Learn
```

### Storage Model

Events are stored in chronological order within memory threads:

```
EpisodicMemoryThread {
  id: "memory_123"
  type: "episodic"
  title: "Swarm Run - Feature Implementation"
  events: [
    Event 1 (oldest) ─┐
    Event 2           │
    Event 3           │ Immutable
    Event 4           │ Append-only
    Event 5 (newest) ─┘
  ]
}
```

### Use Case: Swarm Coordination

**Without Episodic Memory:**
```
Agent A: "What's the current state?"
Agent B: "I don't know, let me check..."
Agent C: "I'm new, what happened before?"
Result: Confusion, redundant work, poor coordination
```

**With Episodic Memory:**
```
Agent A: Reads last 10 events
Agent B: Already knows from history
Agent C: Reads entire event log
Result: Shared understanding, no explicit coordination needed
```

## Use Cases

### Swarm Progress Tracking
- Track decision-making history
- Monitor task completion status
- Identify bottlenecks and conflicts
- Understand swarm evolution

### Agent Onboarding
- New agents read event history
- Learn past decisions and rationale
- Understand current context
- Avoid repeating mistakes

### Debugging and Analysis
- Replay swarm execution
- Identify failure modes
- Analyze coordination patterns
- Extract successful strategies

### Collective Learning
- Aggregate experiences across runs
- Identify patterns in successful outcomes
- Learn from failure modes
- Build strategy library

### Event Types Examples

```typescript
// Decision event
{
  event_type: "decision",
  emitting_agent_id: "agent_1",
  payload: {
    decision: "Use REST API for communication",
    alternatives: ["GraphQL", "gRPC"],
    rationale: "Simpler integration with existing systems"
  }
}

// Artifact created
{
  event_type: "artifact_created",
  emitting_agent_id: "agent_2",
  payload: {
    artifact_type: "file",
    path: "/src/components/Button.tsx",
    description: "Reusable button component"
  }
}

// Conflict detected
{
  event_type: "conflict",
  tags: ["blocking", "needs_resolution"],
  emitting_agent_id: "agent_3",
  payload: {
    conflict_type: "resource_contention",
    resource: "database_connection",
    competing_agents: ["agent_1", "agent_2"]
  }
}
```

## Query Patterns

### Recent Events
```typescript
// Get last 10 events
filter: { lastCount: 10 }
```

### Time Window
```typescript
// Get events from last 5 minutes
filter: { lastMinutes: 5 }
```

### Tag-Based Filtering
```typescript
// Get all important events
filter: { tags: ["important"] }
```

### Agent-Specific
```typescript
// Get events from specific agent
filter: { emitting_agent_id: "agent_1" }
```

### Complex Queries
```typescript
// Get important decisions from last hour
filter: {
  lastMinutes: 60,
  event_type: "decision",
  tags: ["important"]
}
```

## Best Practices

### Event Design
- Use descriptive event types
- Include rich structured payloads
- Add relevant tags for filtering
- Always include agent attribution

### Thread Organization
- Create separate threads for different swarms/runs
- Use descriptive titles
- Archive old threads to keep active set manageable
- Export/import threads for analysis

### Query Optimization
- Use time-based queries for recent events
- Filter by tags to reduce result set
- Avoid querying entire history unless necessary
- Cache frequently accessed event sequences

## Related Concepts

- **[Semantic Memory](./semantic-memory.md)**: Extract structured knowledge from events
- **[Context Memory](./context-memory.md)**: Active working memory
- **[Memory Integration](./memory-integration.md)**: Combining episodic with other memory types
- **[Retrieval Patterns](./retrieval-patterns.md)**: Querying episodic events
- **[Infinite Context](./infinite-context.md)**: Using events for context assembly

## Technical Details

**Storage:** `.codebolt/memory/episodic/{memoryId}.json`
**Service:** `episodicMemoryDataService.ts`
**Types:** `src/types/episodicMemory.ts`
**UI:** `EpisodicThreadDetail.tsx`

**Key Operations:**
- `createMemory()`: Create new event log
- `appendEvent()`: Add event to log
- `getEvents()`: Query events with filters
- `listMemories()`: Get all memory threads
