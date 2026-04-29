---
title: Socket Routes
category: Technical
subcategory: Real-Time Systems
tags: [websocket, routes, endpoints, api]
created: 2026-01-18
---

## Executive Summary

CodeBolt's WebSocket architecture implements 25+ specialized socket routes, each dedicated to a specific feature domain. This separation of concerns enables independent feature development, targeted message handling, and efficient resource management across the application's real-time capabilities.

## What and Why

### What It Is

A comprehensive routing system that maps WebSocket connection URLs to specialized handler implementations. Each route represents a distinct communication channel for features like AI chat, terminal execution, agent orchestration, knowledge management, and collaborative editing.

### Why It Exists

**Feature Isolation**: Different features have different communication patterns. Terminal output requires streaming, chat needs bidirectional messaging, and calendar events need broadcasts. Separate sockets optimize for each pattern.

**Scalability**: Individual sockets can be scaled independently. High-traffic features like chat can be optimized without affecting low-traffic features like debugging.

**Maintainability**: Developers can work on a feature's socket implementation without understanding the entire system. Clear boundaries make code easier to navigate and modify.

**Resource Management**: Connections can be tracked and managed per-feature. Features can enforce their own connection limits, cleanup policies, and state management.

**Error Containment**: Issues in one socket route don't cascade to others. A buggy calendar implementation won't crash the AI terminal.

### Why It Matters

The breadth of socket routes reflects CodeBolt's feature richness and real-time nature. Each route enables a specific capability that would be impossible or inefficient with HTTP polling:

- **AI Features**: Real-time streaming of LLM responses, terminal output, and agent deliberation
- **Collaboration**: Live code editing, calendar events, and job coordination
- **State Synchronization**: Instant updates to project structure, knowledge graph, and vector database
- **Multi-Agent Systems**: Swarm intelligence, background agents, and side execution coordination

## Key Concepts

### Route Categories

**Core Application Sockets**:
- Main application socket for general events and notifications
- Codebolt socket for primary AI communication
- Browser socket for web automation and scraping

**Chat & AI Sockets**:
- Chat socket for user-AI conversations
- Thread chat socket for conversation management
- AI terminal socket for command execution and output streaming
- Debug chat socket for development and troubleshooting

**Agent & Orchestration Sockets**:
- Swarm socket for multi-agent coordination
- Agent portfolio socket for agent management
- Background agent socket for async agent tasks
- Agent deliberation socket for agent reasoning communication
- Side execution support via codebolt socket

**Terminal & Execution Sockets**:
- Shell socket for command execution
- Tasks socket for task planning and management
- Job socket for job coordination and execution
- Auto-testing socket for test automation

**Knowledge & Memory Sockets**:
- Episodic memory socket for conversation history
- Persistent memory socket for long-term storage
- Knowledge socket for knowledge base operations
- Vector database socket for semantic search
- Memory ingestion socket for memory processing

**Project & Code Sockets**:
- Project structure socket for file tree updates
- Code map socket for code visualization
- Monaco (editor) socket for collaborative editing
- File update intent socket for change tracking
- Project structure update request socket for refresh triggers

**Planning & Coordination Sockets**:
- Roadmap socket for planning features
- Calendar socket for scheduling and events
- Context assembly socket for context gathering

**Utility & Service Sockets**:
- Language server socket for LSP integration
- Capability socket for feature discovery
- KV store socket for key-value storage
- Event log socket for activity tracking
- Icon view socket for UI state
- Local model socket for local LLM management
- System alert socket for notifications

### URL Pattern Structure

Socket routes follow consistent patterns for connection and identification:

**Basic Pattern**: `/socket/{route}?{params}`

**Common Query Parameters**:
- `token`: Authentication/session token
- `threadId`: Conversation thread identifier
- `agentId`: Agent instance identifier
- `parentId`: Parent agent ID (for hierarchical agents)
- `terminalId`: Terminal process identifier
- `IS_REMOTE_PROVIDER`: External service flag
- `IS_SIDE_EXECUTION`: Subprocess flag
- `SIDE_EXECUTION_ID`: Subprocess identifier
- `THREAD_ID`: Thread for subprocess
- `PARENT_AGENT_ID`: Parent of subprocess
- `PARENT_AGENT_INSTANCE_ID`: Parent instance of subprocess

### Route Handler Pattern

Each socket route follows a consistent implementation pattern:

1. Create WebSocket server with `noServer: true` option
2. Set up connection event handler
3. Parse URL parameters for context
4. Register connection with connection manager
5. Set up message handler with business logic
6. Set up close handler for cleanup
7. Set up error handler
8. Export for router registration

### Connection Manager Integration

All socket routes integrate with the centralized connection manager:

**Registration**: Each socket calls `wsconnectionManager.addConnection()` on connection
**Tracking**: Manager maintains references to all active connections
**Querying**: Sockets can find connections by ID, agent ID, or thread ID
**Cleanup**: Sockets call `wsconnectionManager.removeConnection()` on disconnect
**Cross-Socket Communication**: Manager enables routing messages between different socket types

### Message Type Patterns

Different socket types use different message patterns:

**Request-Response**: Client sends request, server responds with result
**Streaming**: Server continuously sends data (terminal output, AI responses)
**Broadcast**: Server sends update to all connected clients (calendar, jobs)
**Event Notifications**: Server pushes events (system alerts, agent status)
**Bidirectional**: Both client and server send messages independently

## How It Works (High Level)

### Route Registration

Sockets are registered in a centralized route map. Each route maps a string identifier to its socket handler implementation. When a client connects, the router extracts the route from the URL and looks up the corresponding handler.

### Connection Routing Flow

1. **Client Request**: Renderer process initiates WebSocket connection to `/socket/{route}`
2. **HTTP Upgrade**: Server receives upgrade request for WebSocket connection
3. **Route Extraction**: Router extracts route name from URL path
4. **Handler Lookup**: Route maps to socket handler in route registry
5. **Upgrade Handling**: Handler's `handleUpgrade` method accepts the connection
6. **Connection Event**: Handler emits `connection` event with WebSocket instance
7. **Setup Complete**: Socket-specific handlers begin processing messages

### Specialized Handler Examples

**Chat Socket**: Manages conversation threads, routes messages to AI, handles context assembly
**AI Terminal Socket**: Spawns PTY processes, streams command output, handles terminal resizing
**Swarm Socket**: Coordinates multi-agent communication, manages agent lifecycle, broadcasts swarm events
**Calendar Socket**: Handles event CRUD operations, broadcasts updates to all connected clients
**Job Socket**: Manages job queue operations, broadcasts job status changes, handles pheromone updates
**Browser Socket**: Receives browser automation events, forwards to browser service, returns results

### Cross-Socket Communication

Some operations require coordination between socket types:

**Agent Execution**: Chat socket triggers agent launch via codebolt socket
**Terminal Commands**: Agent execution spawns terminal process via AI terminal socket
**Context Assembly**: Chat socket requests context via context assembly socket
**Memory Operations**: Agent deliberation uses episodic memory and knowledge sockets

The connection manager enables this by providing methods to query and send messages to connections across different socket routes.

## Socket Route Capabilities

### High-Volume Sockets
- **Chat**: Handles user messages and AI streaming responses
- **AI Terminal**: Streams command output in real-time
- **Codebolt**: Primary AI agent communication channel

### Broadcast Sockets
- **Calendar**: Event updates broadcast to all connected clients
- **Jobs**: Job status changes broadcast to workers
- **System Alerts**: Notifications sent to all active sessions

### Low-Latency Sockets
- **Monaco Editor**: Collaborative editing requires minimal delay
- **Browser**: Web automation needs quick response times
- **Swarm**: Multi-agent coordination depends on fast communication

### Background Sockets
- **Background Agent**: Long-running agent task communication
- **Memory Ingestion**: Async memory processing updates
- **Event Log**: Activity tracking and logging

## Related Concepts

- [WebSocket Architecture](./websocket-architecture.md) - Overall WebSocket system design
- [Message Routing](./message-routing.md) - How messages are routed to handlers
- [Event-Driven Communication](./event-driven-comms.md) - Real-time event propagation
- [Agent Management](../../features/agent-management/README.md) - Agent-related socket routes
- [Job Coordination](../../features/job-coordination/README.md) - Job socket implementation
