---
title: WebSocket Architecture
category: Technical
subcategory: Real-Time Systems
tags: [websocket, real-time, communication, infrastructure]
created: 2026-01-18
---

## Executive Summary

CodeBolt uses native WebSocket (not Socket.io) to enable real-time bidirectional communication between the Electron main process and renderer process. This architecture supports 25+ specialized socket routes for features ranging from AI chat to job coordination, using a centralized connection manager and message routing system.

## What and Why

### What It Is

A native WebSocket implementation built on the `ws` library that provides persistent, low-latency connections for real-time features. The system handles everything from terminal output streaming to agent orchestration, event-driven notifications, and collaborative editing.

### Why Native WebSockets Were Chosen

**Performance & Latency**: Native WebSockets provide lower overhead compared to Socket.io, with no additional protocol layer. This is critical for features like AI terminal output streaming and real-time code collaboration where every millisecond matters.

**Simplicity & Control**: Direct WebSocket access gives fine-grained control over connection lifecycle, message serialization, and error handling. No automatic reconnection magic that could interfere with custom logic.

**Electron Compatibility**: In Electron's main-renderer architecture, native WebSockets integrate seamlessly without the browser-specific concerns that Socket.io was designed to address.

**Minimal Dependencies**: Socket.io adds significant bundle size and complexity. The `ws` library is lightweight and purpose-built for Node.js WebSocket servers.

### Why It Matters

Real-time communication is the backbone of CodeBolt's AI-powered development experience. Features like live terminal output, streaming AI responses, multi-agent coordination, and collaborative browsing all depend on reliable, low-latency WebSocket connections. The architecture enables:

- **Instant Feedback**: Terminal commands, AI responses, and code changes appear immediately
- **Multi-Agent Orchestration**: Swarm intelligence requires real-time agent-to-agent communication
- **Collaborative Features**: Calendar events, job coordination, and knowledge sharing happen live
- **State Synchronization**: Project structure, episodic memory, and vector database updates propagate instantly

## Key Concepts

### Socket Server Architecture

- **Centralized Router**: Single WebSocket router in `/src/main/server/sockets/index.ts` that routes connections to specialized socket handlers based on URL patterns
- **NoServer Upgrade**: Uses `WebSocketServer({ noServer: true })` pattern to attach to existing HTTP server via upgrade requests
- **Connection Manager**: Centralized `wsconnectionManager` tracks all active connections across socket types, enabling cross-socket communication

### Specialized Socket Routes

Each major feature domain has its own dedicated socket:

- **Chat & AI**: `chat`, `codebolt`, `aiShell` sockets for AI conversations and agent communication
- **Terminal & Execution**: `shell`, `aiTerminal`, `tasks` sockets for command execution and task planning
- **Agents & Orchestration**: `swarm`, `agentPortfolio`, `backgroundAgent`, `agentDeliberation` sockets
- **Knowledge & Memory**: `episodicMemory`, `persistentMemory`, `knowledge`, `vectordb` sockets
- **Project & Code**: `projectStructure`, `codemap`, `editor` (monaco) sockets
- **Planning & Jobs**: `roadmap`, `jobs`, `calendar` sockets
- **Utilities**: `browser`, `debug`, `eventLog`, `kvStore` sockets

### Connection Lifecycle

1. **Upgrade Request**: HTTP server receives WebSocket upgrade request
2. **Route Detection**: Router extracts socket route from URL (e.g., `/socket/chat?token=xxx`)
3. **Handler Assignment**: Route maps to specialized socket handler in `socketMap`
4. **Connection Establishment**: Handler's `handleUpgrade` creates WebSocket connection
5. **Registration**: Connection added to `wsconnectionManager` for tracking
6. **Message Handling**: Socket-specific message handlers process incoming data
7. **Cleanup**: On close, connection removed from manager

### Message Flow Patterns

**Direct Client-Server**: Simple request-response with immediate replies
**Broadcast**: Server pushes updates to all connected clients in a socket namespace
**Cross-Socket**: Messages routed between different socket types via connection manager
**Event-Driven**: Backend events trigger WebSocket broadcasts (e.g., job status changes)

### Custom WebSocket Extensions

- **Unique Connection IDs**: Each connection assigned UUID for tracking
- **Agent Association**: Connections tagged with agent IDs for multi-agent scenarios
- **Thread Binding**: Chat connections bound to thread IDs for conversation continuity
- **Side Execution**: Special handling for spawned agent subprocesses
- **Remote Providers**: Support for external AI service connections

## How It Works (High Level)

### Server-Side Architecture

The WebSocket system is organized into layers:

**Router Layer** (`index.ts`):
- Intercepts HTTP upgrade requests
- Parses URL to determine socket route
- Delegates to appropriate socket handler

**Handler Layer** (Individual socket files):
- Each socket is a `WebSocketServer` instance with `noServer: true`
- Implements `handleUpgrade` to accept connections
- Sets up event listeners (`connection`, `message`, `close`, `error`)
- Contains business logic for its feature domain

**Manager Layer** (`socketManager.ts`):
- Tracks all active connections across socket types
- Provides methods to add, remove, and query connections
- Manages active agent state for multi-agent scenarios
- Enables cross-socket message routing

**Supporting Infrastructure**:
- **Message Router**: Routes incoming messages to appropriate handlers based on type
- **Message Handlers**: Individual handler classes for different message types
- **Error Handler**: Centralized error handling and logging
- **Type System**: Strong TypeScript typing for messages and sockets

### Client-Side Architecture

**WebSocket Store** (Zustand):
- Global state management for WebSocket connections
- Stores connection references and connection state
- Enables components to access WebSocket instances

**Reconnecting Wrapper**:
- Automatic reconnection with exponential backoff
- Ping/pong keep-alive mechanism
- Graceful close handling
- Connection state tracking

**Integration Points**:
- Editor components connect to Monaco socket for collaborative editing
- Chat components connect to chat socket for AI conversations
- Terminal components connect to AI terminal socket for command output
- Calendar, jobs, and other features have dedicated socket connections

### Message Serialization

All WebSocket messages are JSON-serialized with a consistent structure:

```typescript
{
  type: string,        // Message type identifier
  data?: any,          // Message payload
  requestId?: string,  // For request-response correlation
  timestamp?: string   // Event timestamp
}
```

### Error Handling Strategy

- **Connection Errors**: Logged and connection cleaned up
- **Message Parse Errors**: Send error response to client, log details
- **Handler Errors**: Caught and reported without crashing socket
- **Network Interruptions**: Automatic reconnection with backoff
- **Graceful Degradation**: Features fail safely if WebSocket unavailable

## Related Concepts

- [Socket Routes](./socket-routes.md) - Overview of 25+ specialized socket endpoints
- [Message Routing](./message-routing.md) - Message handler classes and routing patterns
- [Event-Driven Communication](./event-driven-comms.md) - Real-time features and event propagation
- [Agent Management](../../features/agent-management/README.md) - Multi-agent WebSocket coordination
- [Memory Systems](../../features/memory-systems/README.md) - Real-time memory synchronization
- [Job Coordination](../../features/job-coordination/README.md) - WebSocket-based job status updates
