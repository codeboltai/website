---
title: Event-Driven Communication
category: Technical
subcategory: Real-Time Systems
tags: [websocket, events, real-time, pub-sub]
created: 2026-01-18
---

## Executive Summary

CodeBolt's WebSocket architecture enables event-driven, real-time communication across the application. Backend services emit events that trigger WebSocket broadcasts, allowing instant updates to flow to connected clients without polling. This pattern powers everything from job status updates to calendar notifications and multi-agent coordination.

## What and Why

### What It Is

An event propagation system where backend services emit events that are automatically broadcast to relevant WebSocket clients. The system supports targeted broadcasts (specific users), domain broadcasts (all clients in a feature area), and global broadcasts (system-wide notifications).

### Why It Exists

**Real-Time Responsiveness**: Users see changes immediately without refreshing. Job status, agent updates, and calendar events appear the moment they happen.

**Decoupling**: Services don't need to know about WebSocket connections. They emit events, and the WebSocket layer handles delivery. This keeps business logic separate from communication logic.

**Efficiency**: No polling overhead. Connections stay open, and updates are pushed only when relevant events occur.

**Scalability**: Broadcasts can be optimized based on event type. Some events go to all clients, others only to relevant subsets.

**Multi-Agent Coordination**: Agents need to coordinate in real-time. Event-driven communication enables swarm intelligence and agent deliberation.

### Why It Matters

Event-driven communication is essential for CodeBolt's AI-powered development experience:

- **Job Coordination**: Workers see job updates instantly, enabling parallel development
- **Calendar Collaboration**: Event changes broadcast to all participants in real-time
- **Agent Swarms**: Agents coordinate through events, enabling emergent behavior
- **Terminal Output**: Commands stream output as it happens, not in batches
- **Code Collaboration**: Editor changes broadcast to collaborators instantly
- **Memory Operations**: Knowledge graph updates propagate to all connected sessions

## Key Concepts

### Event Sources

**Service Events**: Backend services emit events when state changes
  - Job service emits job status changes
  - Calendar service emits event CRUD operations
  - Agent services emit lifecycle events
  - Memory services emit knowledge updates

**Agent Events**: AI agents emit events during execution
  - Deliberation events for reasoning steps
  - Tool invocation events for actions
  - Completion events for finished tasks
  - Error events for failures

**User Events**: User actions trigger events
  - Chat messages trigger agent events
  - Code edits trigger collaboration events
  - Calendar actions trigger notification events

### Event Propagation Patterns

**Direct Broadcast**: Service directly sends WebSocket message
  - Simple, fast, low latency
  - Service maintains list of connections
  - Used for high-frequency events

**Emitter Pattern**: Service emits event, listener broadcasts
  - Decoupled, flexible
  - Multiple listeners can subscribe
  - Used for complex event flows

**Cross-Socket Events**: Events trigger actions in other sockets
  - Chat socket triggers agent execution
  - Agent socket triggers terminal operations
  - Coordination across feature boundaries

### Event Types

**State Change Events**: Domain model state changes
  - Job created, updated, completed
  - Calendar event added, modified, deleted
  - Agent spawned, terminated, status changed

**Progress Events**: Long-running operation progress
  - Terminal output streaming
  - AI response streaming
  - Task execution progress

**Notification Events**: User-facing notifications
  - System alerts
  - Agent completion notices
  - Error notifications

**Coordination Events**: Multi-component coordination
  - Swarm agent coordination
  - Side execution spawning
  - Process lifecycle management

### Broadcast Targets

**Single Connection**: Send to specific client
  - Response to client request
  - Personal notifications
  - Private agent communication

**Feature Broadcast**: All clients in a feature area
  - Calendar updates to all calendar users
  - Job updates to all workers
  - Project structure to all project viewers

**Global Broadcast**: All connected clients
  - System alerts
  - Critical notifications
  - System shutdown notices

### Event Payload Structure

Events carry structured data:

```typescript
{
  type: string,           // Event type identifier
  data?: any,             // Event payload
  timestamp?: string,     // When event occurred
  source?: string,        // Event source (service, agent, user)
  metadata?: {            // Additional context
    threadId?: string,
    agentId?: string,
    userId?: string
  }
}
```

## How It Works (High Level)

### Event Emission Flow

1. **State Change**: Backend service detects state change
2. **Event Creation**: Service creates event object with relevant data
3. **Event Emission**: Service emits event or calls broadcast method
4. **Event Listener**: WebSocket layer receives event
5. **Connection Lookup**: Finds relevant connections for broadcast
6. **Message Serialization**: Event converted to WebSocket message
7. **Broadcast**: Message sent to all relevant connections
8. **Client Processing**: Client receives and processes update

### Service Integration Examples

**Job Service**:
- Emits events when jobs are created, updated, completed
- Job socket listens and broadcasts to all job socket connections
- Workers see job updates instantly without polling

**Calendar Service**:
- Emits events for calendar CRUD operations
- Calendar socket broadcasts to all connected calendar clients
- All participants see event changes immediately

**Agent Services**:
- Emit events for agent lifecycle (spawn, deliberate, complete)
- Swarm socket broadcasts to all agents in swarm
- Agents coordinate in real-time through events

**Memory Services**:
- Emit events when knowledge is added, updated, deleted
- Relevant sockets broadcast to connected clients
- Knowledge graph updates propagate instantly

### Real-Time Features

**Terminal Output Streaming**:
- PTY process output events
- AI terminal socket broadcasts output chunks
- Terminal UI updates line-by-line as output appears

**AI Response Streaming**:
- LLM response chunked into tokens
- Chat socket streams tokens to client
- User sees response generate in real-time

**Collaborative Editing**:
- Editor changes captured as events
- Monaco socket broadcasts to collaborators
- Changes appear instantly in all editors

**Job Coordination**:
- Job status change events
- Job socket broadcasts to workers
- Workers see job availability and status immediately

**Calendar Collaboration**:
- Event CRUD operations
- Calendar socket broadcasts to participants
- All participants see changes instantly

### Cross-Socket Event Coordination

Some operations require coordinated events across sockets:

**Agent Execution Flow**:
1. Chat socket receives user message
2. Emits agent start event
3. Codebolt socket catches event, spawns agent
4. Agent emits deliberation events
5. Terminal socket receives terminal command events
6. Agent completion event propagates back
7. Chat socket receives and displays result

**Memory Operations**:
1. Agent completes task with new knowledge
2. Emits memory update event
3. Memory socket broadcasts to memory clients
4. Knowledge socket updates knowledge graph
5. Vector database socket updates search index
6. All relevant clients receive updates

## Event Broadcasting Strategies

### Connection Filtering

Services can filter which connections receive events:

**By Thread ID**: Only connections with matching thread ID
**By Agent ID**: Only connections for specific agent
**By User ID**: Only connections for specific user
**By Feature**: Only connections in a feature area

### Batch Broadcasting

For high-frequency events, batching reduces overhead:

**Windowed Batching**: Collect events in time window, send batch
**Count-Based Batching**: Collect N events, send batch
**Priority Batching**: High-priority events sent immediately

### Event Ordering

Some events require ordering guarantees:

**Sequence Numbers**: Events include sequence numbers
**Timestamp Ordering**: Events ordered by timestamp
**Causal Ordering**: Events ordered by causal relationships

## Related Concepts

- [WebSocket Architecture](./websocket-architecture.md) - Foundation for event broadcasting
- [Socket Routes](./socket-routes.md) - Event sources and targets
- [Message Routing](./message-routing.md) - Request-response vs events
- [Agent Management](../../features/agent-management/README.md) - Agent event coordination
- [Job Coordination](../../features/job-coordination/README.md) - Job event broadcasting
- [Planning Roadmap](../../features/planning-roadmap/README.md) - Task status events
