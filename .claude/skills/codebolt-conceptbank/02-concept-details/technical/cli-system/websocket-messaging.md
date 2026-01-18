---
title: "WebSocket Messaging Protocol"
category: technical
subcategory: cli-system
tags:
  - websocket
  - messaging
  - protocol
  - json
last_updated: 2025-01-18
---

## Executive Summary

The CodeBolt CLI System uses a JSON-based WebSocket messaging protocol that standardizes communication between external agents and the CodeBolt core. The protocol defines message structures, routing metadata, response formats, and state management for bidirectional communication.

## What is the Messaging Protocol

The messaging protocol is the contract that defines how WebSocket messages are structured, routed, and processed. It specifies the JSON schema for requests and responses, metadata fields for routing, and conventions for different message types.

## Why It Matters

The messaging protocol matters because it:

- **Enables Interoperability**: Provides a standard interface any client can implement
- **Supports Routing**: Enables precise message targeting using thread and agent IDs
- **Manages State**: Tracks operation state through confirmation workflows
- **Ensures Reliability**: Includes request/response correlation and error handling
- **Facilitates Scaling**: Supports concurrent operations across multiple agents

## Key Concepts

### Message Structure

All WebSocket messages follow a common JSON structure:

```json
{
  "type": "messageType",
  "action": "specificAction",
  "message": "payload or parameters",
  "messageId": "unique-message-id",
  "threadId": "conversation-thread-id",
  "agentId": "agent-identifier",
  "agentInstanceId": "agent-instance-id",
  "parentAgentInstanceId": "parent-agent-id",
  "parentId": "parent-id",
  "requestId": "request-tracking-id",
  "timestamp": "2025-01-18T10:00:00.000Z"
}
```

### Core Message Fields

#### Routing Fields

- **type**: Message type category (e.g., `fsEvent`, `gitEvent`, `agentEvent`)
- **action**: Specific operation within the type (e.g., `readFile`, `commit`)
- **threadId**: Conversation thread identifier for context
- **agentId**: Agent identifier for routing
- **agentInstanceId**: Specific agent instance for multi-instance scenarios
- **parentAgentInstanceId**: Parent agent ID for hierarchical agent relationships
- **parentId**: Parent identifier for nested operations

#### Metadata Fields

- **messageId**: Unique message identifier for correlation
- **requestId**: Request tracking ID for end-to-end tracing
- **timestamp**: ISO 8601 timestamp for message creation time

#### Payload Fields

- **message**: Operation-specific parameters or context
- **params**: Alternative parameter field (used interchangeably with message)
- **payload**: Additional metadata or context

### Message Types

#### Request Message Types

**File System** (`FSEvent`, `FileSystemEvent`)
```json
{
  "type": "fsEvent",
  "action": "readFile",
  "message": {
    "filePath": "/path/to/file.txt"
  }
}
```

**Git Operations** (`gitEvent`)
```json
{
  "type": "gitEvent",
  "action": "commit",
  "message": {
    "message": "Commit message",
    "files": ["file1.js", "file2.js"]
  }
}
```

**Terminal Execution** (`ExecuteCommand`)
```json
{
  "type": "executeCommand",
  "action": "executeCommand",
  "message": {
    "command": "npm install"
  }
}
```

**Agent Operations** (`AgentEvent`)
```json
{
  "type": "agentEvent",
  "action": "startAgent",
  "message": {
    "agentToStartId": "agent-uuid",
    "task": "Complete the user request"
  }
}
```

**Tool Execution** (`ExecuteToolEvent`)
```json
{
  "type": "executeToolEvent",
  "action": "executeTool",
  "message": {
    "toolName": "server--tool",
    "params": {
      "param1": "value1"
    }
  }
}
```

#### Response Message Types

**Success Response**
```json
{
  "type": "readFileResponse",
  "success": true,
  "data": {
    "content": "File contents here"
  },
  "message": "File read successfully",
  "timestamp": "2025-01-18T10:00:01.000Z",
  "requestId": "original-request-id"
}
```

**Error Response**
```json
{
  "type": "error",
  "success": false,
  "error": {
    "code": "FILE_NOT_FOUND",
    "details": "File not found at specified path"
  },
  "message": "Operation failed",
  "timestamp": "2025-01-18T10:00:01.000Z",
  "requestId": "original-request-id"
}
```

### State Management Messages

#### Confirmation Flow

**Request Confirmation**
```json
{
  "type": "message",
  "actionType": "mcp_tool",
  "sender": "agent",
  "templateType": "mcp_tool",
  "payload": {
    "type": "git",
    "toolName": "commit",
    "serverName": "codebolt-git",
    "params": { "message": "Commit" },
    "stateEvent": "ask_for_confirmation"
  }
}
```

**Executing State**
```json
{
  "payload": {
    "stateEvent": "executing"
  }
}
```

**Success State**
```json
{
  "payload": {
    "stateEvent": "execution_success",
    "result": { /* operation result */ }
  }
}
```

**Error State**
```json
{
  "payload": {
    "stateEvent": "execution_error",
    "result": "Error message"
  }
}
```

**Rejected State**
```json
{
  "payload": {
    "stateEvent": "rejected"
  }
}
```

### Notification Messages

Notifications follow the pattern `{service}notify`:

```json
{
  "type": "fsnotify",
  "action": "fileRead",
  "message": {
    "filePath": "/path/to/file.txt",
    "status": "completed"
  }
}
```

Notification types:
- `fsnotify` - File system events
- `gitnotify` - Git operations
- `terminalnotify` - Terminal events
- `agentnotify` - Agent lifecycle
- `chatnotify` - Chat events
- `browsernotify` - Browser events
- `tasknotify` - Task updates
- `mcpnotify` - MCP tool events
- `systemnotify` - System events
- `swarmnotify` - Swarm events

### Message Routing

#### Target Selection

The CLI system routes messages using this priority:

1. **Explicit Socket ID**: Direct routing by socket identifier
2. **Thread + Agent ID**: Most specific routing
3. **Thread ID Only**: Thread-level routing
4. **Agent ID Only**: Agent-level routing
5. **Active Agent**: Fallback to currently active agent

#### Retry Logic

When targeted socket is unavailable:

1. **Immediate Retry**: Check for socket availability
2. **Fixed Interval Retries**: 5 attempts at 50ms intervals
3. **Fallback**: Use active agent socket
4. **Failure**: Log warning and skip message

### Message Lifecycle

1. **Creation**: Client creates JSON message with required fields
2. **Sending**: Message sent via WebSocket connection
3. **Reception**: Server receives and parses message
4. **Enrichment**: Server adds routing metadata if missing
5. **Routing**: Message routed to appropriate service handler
6. **Processing**: Handler executes operation
7. **Response**: Handler creates response message
8. **Delivery**: Response sent back via WebSocket

### Special Message Patterns

#### Namespace Prefixing

Commands use dot-notation for service specification:

```
{service}.{action}
```

Examples:
- `git.init` → Git initialization
- `fs.readFile` → File reading
- `agent.start` → Agent starting

#### Batch Operations

Batch operations use array parameters:

```json
{
  "type": "fsEvent",
  "action": "readManyFiles",
  "message": {
    "paths": [
      "/path/to/file1.txt",
      "/path/to/file2.txt"
    ]
  }
}
```

#### Mention Parsing

Special syntax for file and tool mentions:

- **File Mentions**: `@file/path` or `@~file/path~`
- **MCP Mentions**: `toolbox--tool` or `toolbox.*` for wildcard

### Error Handling

#### Error Response Format

```json
{
  "type": "error",
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "details": "Human-readable error details",
    "field": "optional_field_name"
  }
}
```

#### Common Error Codes

- `FILE_NOT_FOUND` - Requested file doesn't exist
- `INVALID_PARAMETERS` - Missing or invalid parameters
- `PERMISSION_DENIED` - Operation not permitted
- `AGENT_NOT_FOUND` - Specified agent doesn't exist
- `EXECUTION_FAILED` - Operation execution failed

### Message Validation

#### Required Fields

All messages must include:
- `type`: Message type category
- `messageId`: Unique identifier (auto-generated if missing)
- `threadId`: Thread context (auto-populated from connection)

#### Optional Fields

- `action`: Specific operation (may be inferred from type)
- `agentId`: Agent identifier (populated from connection)
- `requestId`: Request tracking (new UUID if missing)
- `timestamp`: Creation time (auto-added if missing)

### Connection Management

#### Connection Registration

```json
{
  "type": "register",
  "agentId": "agent-uuid",
  "threadId": "thread-uuid",
  "parentId": "parent-agent-id"
}
```

#### Heartbeat

```json
{
  "type": "ping"
}
```

Response:
```json
{
  "type": "pong"
}
```

## Related Concepts

- [CLI Architecture](./cli-architecture.md) - How messages are routed and processed
- [CLI Commands](./cli-commands.md) - Message types and their actions
- [CLI Services](./cli-services.md) - Handlers that process messages
- [Agent Management](../features/agent-management.md) - Agent-related messaging patterns
